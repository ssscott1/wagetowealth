const { createClient } = require('@supabase/supabase-js')
const Stripe = require('stripe')

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  }

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' }
  }

  let body
  try {
    body = JSON.parse(event.body)
  } catch {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'Invalid request body' }) }
  }

  const { email, password, companyName, domain, employeeCount, plan } = body

  if (!email || !password || !companyName || !domain || !plan) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'Missing required fields' }) }
  }

  try {
    // 1. Create Supabase auth user (service role bypasses email confirmation)
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // auto-confirm so they can log in immediately
      user_metadata: { user_type: 'employer' },
    })

    if (authError) {
      // Handle duplicate user gracefully
      if (authError.message.includes('already been registered')) {
        return { statusCode: 409, headers, body: JSON.stringify({ error: 'An account with this email already exists. Please sign in.' }) }
      }
      throw authError
    }

    const userId = authData.user.id
    const slug = companyName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') + '-' + Date.now().toString(36)

    // 2. Create employer row
    const { data: employer, error: empError } = await supabaseAdmin
      .from('employers')
      .insert({
        name: companyName,
        slug,
        domain,
        employee_count_estimate: employeeCount || null,
        subscription_status: 'pending',
      })
      .select()
      .single()

    if (empError) throw empError

    // 3. Create employer_admin row
    const { error: adminError } = await supabaseAdmin
      .from('employer_admins')
      .insert({ employer_id: employer.id, user_id: userId, email })

    if (adminError) throw adminError

    // 4. Create Stripe Checkout session (if Stripe is configured)
    if (process.env.STRIPE_SECRET_KEY) {
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

      const priceMap = {
        micro: process.env.STRIPE_PRICE_MICRO,
        starter: process.env.STRIPE_PRICE_STARTER,
        growth: process.env.STRIPE_PRICE_GROWTH,
      }
      const priceId = priceMap[plan]

      if (priceId) {
        const siteUrl = process.env.SITE_URL || 'https://www.wagestowealth.com.au'
        const session = await stripe.checkout.sessions.create({
          mode: 'subscription',
          payment_method_types: ['card'],
          line_items: [{ price: priceId, quantity: 1 }],
          customer_email: email,
          metadata: {
            employer_id: employer.id,
            user_id: userId,
          },
          success_url: `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${siteUrl}/register/employer?cancelled=1`,
          subscription_data: {
            metadata: { employer_id: employer.id },
          },
        })

        // Store Stripe customer data
        await supabaseAdmin
          .from('employers')
          .update({ stripe_customer_id: session.customer })
          .eq('id', employer.id)

        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({ checkoutUrl: session.url, employerId: employer.id }),
        }
      }
    }

    // No Stripe configured — activate immediately (dev/enterprise mode)
    await supabaseAdmin
      .from('employers')
      .update({ subscription_status: 'active' })
      .eq('id', employer.id)

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ checkoutUrl: null, employerId: employer.id }),
    }
  } catch (err) {
    console.error('register-employer error:', err)
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: err.message || 'Registration failed. Please try again.' }),
    }
  }
}
