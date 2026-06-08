import { useState } from 'react'
import { Link } from 'react-router-dom'

const FREE_DOMAINS = new Set([
  'gmail.com','googlemail.com','yahoo.com','yahoo.com.au','hotmail.com','hotmail.com.au',
  'outlook.com','outlook.com.au','live.com','live.com.au','icloud.com','me.com','mac.com',
  'aol.com','protonmail.com','proton.me','zoho.com','ymail.com','bigpond.com','bigpond.net.au',
  'optusnet.com.au','tpg.com.au','internode.on.net','iinet.net.au','westnet.com.au',
  'dodo.com.au','adam.com.au','exemail.com.au','fastmail.com','hey.com',
])

function domainToCompanyName(domain) {
  const withoutTld = domain.replace(/\.(com\.au|net\.au|org\.au|edu\.au|gov\.au|asn\.au|com|net|org|io|co|app)$/, '')
  return withoutTld
    .replace(/[-_]/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/\b\w/g, c => c.toUpperCase())
    .trim()
}

const PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    price: '$299',
    period: '/month',
    tag: null,
    employees: 'Up to 50 employees',
    features: [
      'All 18 learning modules',
      '17 live calculators',
      'Gamified quiz engine',
      'Financial Literacy Scores',
      'Aggregate team analytics',
      'Email support',
    ],
  },
  {
    id: 'growth',
    name: 'Growth',
    price: '$599',
    period: '/month',
    tag: 'Most Popular',
    employees: 'Up to 200 employees',
    features: [
      'Everything in Starter',
      'White-label branding',
      'Hardship referral tracker',
      'Priority support',
      'Onboarding call included',
      'Quarterly usage reports',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    tag: null,
    employees: 'Unlimited employees',
    features: [
      'Everything in Growth',
      'Custom content modules',
      'SSO / SAML',
      'Dedicated success manager',
      'SLA guarantee',
      'Custom invoicing',
    ],
  },
]

const EMPLOYEE_SIZES = [
  '1–10', '11–50', '51–200', '201–500', '500+'
]

export default function RegisterEmployer() {
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [companyName, setCompanyName] = useState('')
  const [employeeCount, setEmployeeCount] = useState('')
  const [selectedPlan, setSelectedPlan] = useState('growth')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const emailDomain = email.includes('@') ? email.split('@')[1].toLowerCase() : ''
  const isFreeDomain = emailDomain && FREE_DOMAINS.has(emailDomain)
  const domainOk = emailDomain && !isFreeDomain

  const handleStep1 = (e) => {
    e.preventDefault()
    if (isFreeDomain) {
      setError('Please use your company email address — personal emails like Gmail are not accepted.')
      return
    }
    if (!domainOk) { setError('Please enter a valid work email address.'); return }
    if (password.length < 8) { setError('Password must be at least 8 characters.'); return }
    setError('')
    setCompanyName(domainToCompanyName(emailDomain))
    setStep(2)
  }

  const handleStep2 = (e) => {
    e.preventDefault()
    if (!companyName.trim()) { setError('Please enter your company name.'); return }
    setError('')
    setStep(3)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (selectedPlan === 'enterprise') {
      window.location.href = 'mailto:hello@wagestowealth.com.au?subject=Enterprise Enquiry'
      setLoading(false)
      return
    }

    try {
      const res = await fetch('/api/register-employer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          companyName: companyName.trim(),
          domain: emailDomain,
          employeeCount,
          plan: selectedPlan,
        }),
      })

      const json = await res.json()

      if (!res.ok) {
        setError(json.error || 'Registration failed. Please try again.')
        setLoading(false)
        return
      }

      if (json.checkoutUrl) {
        // Redirect to Stripe Checkout
        window.location.href = json.checkoutUrl
      } else {
        // No Stripe configured (dev mode) — go straight to login
        window.location.href = '/login?type=employer&registered=1'
      }
    } catch {
      setError('Unable to connect. Please check your internet connection and try again.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#F9F8F6]">
      {/* Top bar */}
      <div className="bg-[#0F2B5B] px-4 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#D4A017] rounded-lg flex items-center justify-center font-bold text-[#0F2B5B] text-sm">W</div>
            <span className="font-bold text-white text-lg" style={{ fontFamily: 'DM Sans' }}>Wages to Wealth</span>
          </Link>
          <div className="text-white/50 text-sm hidden sm:block">
            Already have an account?{' '}
            <Link to="/login?type=employer" className="text-[#D4A017] font-semibold hover:underline">Sign in →</Link>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="bg-white border-b border-gray-100 px-4 py-4">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center gap-2">
            {[
              { n: 1, label: 'Your account' },
              { n: 2, label: 'Company details' },
              { n: 3, label: 'Choose a plan' },
            ].map((s, i) => (
              <div key={s.n} className="flex items-center gap-2 flex-1">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-all ${
                  step > s.n ? 'bg-green-500 text-white' :
                  step === s.n ? 'bg-[#0F2B5B] text-white' :
                  'bg-gray-100 text-gray-400'
                }`}>
                  {step > s.n ? '✓' : s.n}
                </div>
                <span className={`text-xs font-semibold hidden sm:block ${step === s.n ? 'text-[#0F2B5B]' : 'text-gray-400'}`}>{s.label}</span>
                {i < 2 && <div className={`flex-1 h-0.5 mx-1 ${step > s.n ? 'bg-green-400' : 'bg-gray-200'}`} />}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-4 py-10">
        {/* Step 1: Account */}
        {step === 1 && (
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <div className="inline-block bg-[#D4A017]/15 text-[#D4A017] font-bold text-xs px-3 py-1 rounded-full mb-3 uppercase tracking-wide">Step 1 of 3</div>
              <h1 className="text-2xl font-bold text-[#0F2B5B]" style={{ fontFamily: 'DM Sans' }}>Create your employer account</h1>
              <p className="text-gray-500 text-sm mt-1">Use your company email to verify your organisation</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <form onSubmit={handleStep1} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Work Email</label>
                  <input
                    type="email" required value={email}
                    onChange={e => { setEmail(e.target.value); setError('') }}
                    className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2B5B] transition-colors ${
                      isFreeDomain ? 'border-red-300 bg-red-50' : domainOk ? 'border-green-400 bg-green-50' : 'border-gray-200'
                    }`}
                    placeholder="you@yourcompany.com.au"
                  />
                  {isFreeDomain && (
                    <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                      <span>⚠️</span> Personal emails not accepted. Please use your company email.
                    </p>
                  )}
                  {domainOk && (
                    <p className="text-green-600 text-xs mt-1.5 flex items-center gap-1">
                      <span>✅</span> Company domain verified: <strong>{emailDomain}</strong>
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required minLength={8} value={password}
                      onChange={e => setPassword(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2B5B] pr-12"
                      placeholder="Minimum 8 characters"
                    />
                    <button type="button" onClick={() => setShowPassword(v => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs font-semibold">
                      {showPassword ? 'Hide' : 'Show'}
                    </button>
                  </div>
                  {password.length > 0 && (
                    <div className="mt-1.5 flex gap-1">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${
                          password.length >= [8, 12, 16, 20][i]
                            ? ['bg-red-400', 'bg-yellow-400', 'bg-blue-400', 'bg-green-500'][i]
                            : 'bg-gray-200'
                        }`} />
                      ))}
                    </div>
                  )}
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3 flex items-start gap-2">
                    <span>⚠️</span><span>{error}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isFreeDomain}
                  className="w-full bg-[#0F2B5B] text-white py-3.5 rounded-xl font-bold text-sm hover:bg-[#1a3d7c] transition-colors disabled:opacity-40">
                  Continue to Company Details →
                </button>
              </form>

              <div className="mt-5 pt-5 border-t border-gray-100 text-center">
                <p className="text-xs text-gray-400">🔐 Company verification via email domain — no personal emails accepted</p>
              </div>
            </div>

            <p className="text-center text-sm text-gray-500 mt-5">
              Want to see it first?{' '}
              <Link to="/demo" className="text-[#0F2B5B] font-semibold hover:underline">Try the employee demo →</Link>
            </p>
          </div>
        )}

        {/* Step 2: Company Details */}
        {step === 2 && (
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <div className="inline-block bg-[#D4A017]/15 text-[#D4A017] font-bold text-xs px-3 py-1 rounded-full mb-3 uppercase tracking-wide">Step 2 of 3</div>
              <h1 className="text-2xl font-bold text-[#0F2B5B]" style={{ fontFamily: 'DM Sans' }}>About your company</h1>
              <p className="text-gray-500 text-sm mt-1">We've pulled your company details from your email domain</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-xl px-4 py-3 mb-5">
                <span className="text-lg">✅</span>
                <div>
                  <p className="text-xs font-bold text-green-700">Domain verified</p>
                  <p className="text-xs text-green-600">{emailDomain}</p>
                </div>
              </div>

              <form onSubmit={handleStep2} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Company Name</label>
                  <input
                    type="text" required value={companyName}
                    onChange={e => setCompanyName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2B5B]"
                    placeholder="Acme Corporation"
                  />
                  <p className="text-xs text-gray-400 mt-1">Suggested from your domain — edit if needed</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Estimated Team Size</label>
                  <div className="grid grid-cols-5 gap-2">
                    {EMPLOYEE_SIZES.map(size => (
                      <button
                        key={size} type="button"
                        onClick={() => setEmployeeCount(size)}
                        className={`py-2 rounded-xl text-xs font-semibold border-2 transition-all ${
                          employeeCount === size
                            ? 'border-[#0F2B5B] bg-[#0F2B5B] text-white'
                            : 'border-gray-200 text-gray-500 hover:border-gray-300'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">{error}</div>
                )}

                <div className="flex gap-3">
                  <button type="button" onClick={() => setStep(1)}
                    className="flex-1 border-2 border-gray-200 text-gray-500 py-3 rounded-xl font-semibold text-sm hover:border-gray-300 transition-colors">
                    ← Back
                  </button>
                  <button type="submit"
                    className="flex-[2] bg-[#0F2B5B] text-white py-3 rounded-xl font-bold text-sm hover:bg-[#1a3d7c] transition-colors">
                    Continue to Plans →
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Step 3: Plan Selection */}
        {step === 3 && (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-block bg-[#D4A017]/15 text-[#D4A017] font-bold text-xs px-3 py-1 rounded-full mb-3 uppercase tracking-wide">Step 3 of 3</div>
              <h1 className="text-2xl font-bold text-[#0F2B5B]" style={{ fontFamily: 'DM Sans' }}>Choose your plan</h1>
              <p className="text-gray-500 text-sm mt-1">All plans include full platform access. Cancel anytime. Billed monthly in AUD.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-5 mb-6">
              {PLANS.map(plan => (
                <button
                  key={plan.id}
                  type="button"
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`relative text-left rounded-2xl border-2 p-6 transition-all ${
                    selectedPlan === plan.id
                      ? 'border-[#0F2B5B] shadow-lg bg-white'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  {plan.tag && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#D4A017] text-[#0F2B5B] text-xs font-bold px-3 py-1 rounded-full">
                      {plan.tag}
                    </div>
                  )}
                  {selectedPlan === plan.id && (
                    <div className="absolute top-3 right-3 w-5 h-5 bg-[#0F2B5B] rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                  <h3 className="text-lg font-bold text-[#0F2B5B] mb-1" style={{ fontFamily: 'DM Sans' }}>{plan.name}</h3>
                  <div className="mb-1">
                    <span className="text-3xl font-black text-[#0F2B5B]">{plan.price}</span>
                    <span className="text-gray-400 text-sm">{plan.period}</span>
                  </div>
                  <p className="text-xs text-gray-400 mb-4">{plan.employees}</p>
                  <ul className="space-y-1.5">
                    {plan.features.map(f => (
                      <li key={f} className="flex items-start gap-2 text-xs text-gray-600">
                        <span className="text-green-500 mt-0.5 flex-shrink-0">✓</span>{f}
                      </li>
                    ))}
                  </ul>
                </button>
              ))}
            </div>

            {/* Summary bar */}
            <div className="bg-[#0F2B5B] rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
              <div className="text-white text-center sm:text-left">
                <p className="text-sm text-white/60">Registering as</p>
                <p className="font-bold">{companyName} <span className="text-white/50 font-normal text-sm">· {emailDomain}</span></p>
                <p className="text-[#D4A017] text-sm font-semibold mt-0.5">
                  {PLANS.find(p => p.id === selectedPlan)?.name} plan — {PLANS.find(p => p.id === selectedPlan)?.price}{PLANS.find(p => p.id === selectedPlan)?.period}
                </p>
              </div>
              <form onSubmit={handleSubmit}>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#D4A017] text-[#0F2B5B] px-8 py-3.5 rounded-xl font-bold hover:bg-yellow-400 transition-colors disabled:opacity-50 whitespace-nowrap text-sm">
                  {loading ? 'Setting up account…' :
                   selectedPlan === 'enterprise' ? 'Contact Sales →' :
                   '🔒 Subscribe & Activate →'}
                </button>
              </form>
            </div>

            {selectedPlan !== 'enterprise' && (
              <p className="text-center text-xs text-gray-400">
                You'll be redirected to Stripe's secure payment page. Your account is created instantly after payment.
              </p>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3 mt-4 flex items-start gap-2">
                <span>⚠️</span><span>{error}</span>
              </div>
            )}

            <div className="text-center mt-4">
              <button onClick={() => setStep(2)} className="text-gray-400 text-sm hover:text-gray-600">← Back to company details</button>
            </div>
          </div>
        )}
      </div>

      {/* Trust footer */}
      <div className="border-t border-gray-100 bg-white py-6 px-4 mt-auto">
        <div className="max-w-3xl mx-auto flex flex-wrap justify-center gap-6 text-xs text-gray-400">
          <span>🔒 Payments secured by Stripe</span>
          <span>✅ ASIC General Advice Compliant</span>
          <span>🇦🇺 Australian-built & hosted</span>
          <span>📧 Cancel anytime at hello@wagestowealth.com.au</span>
        </div>
      </div>
    </div>
  )
}
