const { createClient } = require('@supabase/supabase-js')

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  }

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' }
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method Not Allowed' }) }
  }

  // Validate required env vars up front so we get a clear error
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
    return { statusCode: 500, headers, body: JSON.stringify({ error: 'Server configuration error. Please contact support.' }) }
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

  const supabaseAdmin = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  )

  try {
    // 1. Create Supabase auth user
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { user_type: 'employer' },
    })

    if (authError) {
      if (authError.message.includes('already been registered') || authError.message.includes('already exists')) {
        return { statusCode: 409, headers, body: JSON.stringify({ error: 'An account with this email already exists. Please sign in.' }) }
      }
      console.error('Auth error:', authError)
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

    if (empError) {
      console.error('Employer insert error:', empError)
      throw empError
    }

    // 3. Create employer_admin row
    const { error: adminError } = await supabaseAdmin
      .from('employer_admins')
      .insert({ employer_id: employer.id, user_id: userId, email })

    if (adminError) {
      console.error('Employer admin insert error:', adminError)
      throw adminError
    }

    // 4. Create Stripe Checkout session
    const stripeKey = process.env.STRIPE_SECRET_KEY
    if (stripeKey) {
      const priceMap = {
        micro: process.env.STRIPE_PRICE_MICRO,
        starter: process.env.STRIPE_PRICE_STARTER,
        growth: process.env.STRIPE_PRICE_GROWTH,
      }
      const priceId = priceMap[plan]

      if (!priceId) {
        console.error(`No price ID found for plan: ${plan}. Available: MICRO=${process.env.STRIPE_PRICE_MICRO}, STARTER=${process.env.STRIPE_PRICE_STARTER}, GROWTH=${process.env.STRIPE_PRICE_GROWTH}`)
      }

      if (priceId) {
        let stripe
        try {
          const StripeLib = require('stripe')
          stripe = new StripeLib(stripeKey)
        } catch (stripeInitErr) {
          console.error('Stripe init error:', stripeInitErr)
          throw new Error('Payment system initialisation failed.')
        }

        const siteUrl = process.env.SITE_URL || 'https://www.wagestowealth.com.au'

        let session
        try {
          session = await stripe.checkout.sessions.create({
            mode: 'subscription',
            payment_method_types: ['card'],
            line_items: [{ price: priceId, quantity: 1 }],
            customer_email: email,
            metadata: { employer_id: employer.id, user_id: userId },
            success_url: `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${siteUrl}/register/employer?cancelled=1`,
            subscription_data: { metadata: { employer_id: employer.id } },
          })
        } catch (stripeErr) {
          console.error('Stripe checkout session error:', stripeErr.message, stripeErr.type)
          throw new Error(`Payment setup failed: ${stripeErr.message}`)
        }

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

    // No Stripe key or no matching price — activate immediately
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
    console.error('register-employer unhandled error:', err.message, err.stack)
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: err.message || 'Registration failed. Please try again.' }),
    }
  }
}
