import { Link } from 'react-router-dom'

const PLANS = [
  { name: 'Starter', price: '$299', period: '/month', employees: 'Up to 50 employees', features: ['All 10 modules', 'All 10 calculators', 'Quiz engine + badges', 'Aggregate analytics', 'Email support'], cta: 'Start Free Trial' },
  { name: 'Growth', price: '$599', period: '/month', employees: 'Up to 200 employees', features: ['Everything in Starter', 'White-label branding', 'Anonymous leaderboard', 'Hardship access tracker', 'Priority support'], cta: 'Start Free Trial', popular: true },
  { name: 'Enterprise', price: 'Custom', period: '', employees: 'Unlimited employees', features: ['Everything in Growth', 'Custom content modules', 'SSO / SAML integration', 'Dedicated success manager', 'SLA & uptime guarantee'], cta: 'Contact Sales' },
]

export default function Pricing() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-[#0F2B5B] mb-3" style={{ fontFamily: 'DM Sans' }}>Simple, transparent pricing</h1>
        <p className="text-gray-500 text-lg">All plans include a 30-day free trial. No lock-in contracts. Cancel anytime.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {PLANS.map(plan => (
          <div key={plan.name} className={`rounded-2xl p-7 border-2 relative ${plan.popular ? 'border-[#D4A017] bg-white shadow-xl' : 'border-gray-100 bg-white shadow-sm'}`}>
            {plan.popular && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#D4A017] text-[#0F2B5B] text-xs font-bold px-4 py-1.5 rounded-full">
                Most Popular
              </div>
            )}
            <h3 className="text-xl font-bold text-[#0F2B5B] mb-2" style={{ fontFamily: 'DM Sans' }}>{plan.name}</h3>
            <div className="mb-1"><span className="text-4xl font-bold text-[#0F2B5B]">{plan.price}</span><span className="text-gray-400">{plan.period}</span></div>
            <p className="text-gray-400 text-sm mb-5">{plan.employees}</p>
            <ul className="space-y-2.5 mb-6">
              {plan.features.map(f => (
                <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="text-green-500 mt-0.5 flex-shrink-0">✓</span>{f}
                </li>
              ))}
            </ul>
            <Link to="/register/employer"
              className={`block text-center py-3 rounded-xl font-semibold text-sm transition-colors ${plan.popular ? 'bg-[#0F2B5B] text-white hover:bg-[#1a3d7c]' : 'border-2 border-[#0F2B5B] text-[#0F2B5B] hover:bg-blue-50'}`}>
              {plan.cta}
            </Link>
          </div>
        ))}
      </div>

      <div className="bg-gray-50 rounded-2xl p-6 text-center">
        <h2 className="font-bold text-[#0F2B5B] mb-2" style={{ fontFamily: 'DM Sans' }}>Questions? We're here to help.</h2>
        <p className="text-gray-500 text-sm mb-4">Book a 30-minute demo and we'll show you exactly how Wages to Wealth works for your team.</p>
        <a href="mailto:hello@wagetowealth.com.au" className="bg-[#0F2B5B] text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#1a3d7c] transition-colors inline-block">
          Contact Sales
        </a>
      </div>
    </div>
  )
}
