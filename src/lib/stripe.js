import { loadStripe } from '@stripe/stripe-js'

export const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)

export const PLANS = {
  starter: {
    name: 'Starter',
    price: 299,
    employees: 50,
    priceId: import.meta.env.VITE_STRIPE_STARTER_PRICE_ID,
  },
  growth: {
    name: 'Growth',
    price: 599,
    employees: 200,
    priceId: import.meta.env.VITE_STRIPE_GROWTH_PRICE_ID,
  },
  enterprise: {
    name: 'Enterprise',
    price: null,
    employees: null,
    priceId: import.meta.env.VITE_STRIPE_ENTERPRISE_PRICE_ID,
  },
}
