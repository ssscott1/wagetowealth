const { createClient } = require('@supabase/supabase-js')
const Stripe = require('stripe')

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

exports.handler = async (event) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
  const sig = event.headers['stripe-signature']

  let stripeEvent
  try {
    stripeEvent = stripe.webhooks.constructEvent(
      event.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    )
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message)
    return { statusCode: 400, body: `Webhook Error: ${err.message}` }
  }

  try {
    if (stripeEvent.type === 'checkout.session.completed') {
      const session = stripeEvent.data.object
      const { employer_id } = session.metadata || {}
      if (employer_id) {
        await supabaseAdmin
          .from('employers')
          .update({
            subscription_status: 'active',
            stripe_customer_id: session.customer,
            stripe_subscription_id: session.subscription,
          })
          .eq('id', employer_id)
      }
    }

    if (stripeEvent.type === 'customer.subscription.deleted') {
      const sub = stripeEvent.data.object
      const { employer_id } = sub.metadata || {}
      if (employer_id) {
        await supabaseAdmin
          .from('employers')
          .update({ subscription_status: 'cancelled' })
          .eq('id', employer_id)
      }
    }

    if (stripeEvent.type === 'invoice.payment_failed') {
      const invoice = stripeEvent.data.object
      const { employer_id } = invoice.subscription_details?.metadata || {}
      if (employer_id) {
        await supabaseAdmin
          .from('employers')
          .update({ subscription_status: 'past_due' })
          .eq('id', employer_id)
      }
    }

    return { statusCode: 200, body: JSON.stringify({ received: true }) }
  } catch (err) {
    console.error('Webhook handler error:', err)
    return { statusCode: 500, body: 'Internal error' }
  }
}
