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

  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
    return { statusCode: 500, headers, body: JSON.stringify({ error: 'Server configuration error.' }) }
  }

  let body
  try {
    body = JSON.parse(event.body)
  } catch {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'Invalid request body' }) }
  }

  const { email, password, companyName, domain, accessCode, verifyOnly } = body

  // Validate access code first — used by the client gate (verifyOnly=true) and full submit
  const expectedCode = process.env.FREE_TRIAL_CODE
  if (!expectedCode || accessCode !== expectedCode) {
    return { statusCode: 403, headers, body: JSON.stringify({ error: 'Invalid access code.' }) }
  }

  // Client is just verifying the code — return early before touching Supabase
  if (verifyOnly) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'Missing required fields' }) }
  }

  if (!email || !password || !companyName || !domain) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'Missing required fields' }) }
  }

  const supabaseAdmin = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  )

  try {
    // 1. Create auth user
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { user_type: 'employer' },
    })

    if (authError) {
      if (authError.message.includes('already been registered') || authError.message.includes('already exists')) {
        return { statusCode: 409, headers, body: JSON.stringify({ error: 'An account with this email already exists.' }) }
      }
      console.error('Auth error:', authError)
      throw authError
    }

    const userId = authData.user.id
    const slug = companyName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') + '-' + Date.now().toString(36)

    // 2. Create employer row — active immediately, no Stripe
    const { data: employer, error: empError } = await supabaseAdmin
      .from('employers')
      .insert({
        name: companyName,
        slug,
        domain,
        subscription_status: 'active',
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

    console.log(`Free trial account created: ${email} / ${companyName} (employer_id: ${employer.id})`)

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, employerId: employer.id }),
    }
  } catch (err) {
    console.error('free-employer unhandled error:', err.message, err.stack)
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: err.message || 'Account creation failed. Please try again.' }),
    }
  }
}
