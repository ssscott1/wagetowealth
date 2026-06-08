import { useState } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/ui/SEO'

// ─── Plan data ───────────────────────────────────────────────────────────────

const PLANS = [
  {
    id: 'micro',
    name: 'Micro',
    badge: null,
    monthlyPrice: 149,
    annualMonthly: 127,
    annualTotal: 1524,
    annualSaving: 264,
    employees: 'Up to 20 employees',
    cta: 'Start Free Trial',
    ctaStyle: 'gold',
    trial: '14-day free trial. No credit card required.',
    includes: [
      'Unlimited employee access (up to 20)',
      'All 18 financial literacy modules',
      'All 17 interactive calculators',
      'Gamified quiz engine + Financial Literacy Score',
      'Employee dashboard',
      'Employer admin dashboard',
      'Basic engagement reporting',
      'Email support',
    ],
    excludes: [
      'Custom branding / logo',
      'Advanced analytics',
      'Priority support',
      'Government tender documentation',
    ],
  },
  {
    id: 'starter',
    name: 'Starter',
    badge: 'Most Popular',
    monthlyPrice: 299,
    annualMonthly: 254,
    annualTotal: 3048,
    annualSaving: 540,
    employees: 'Up to 200 employees',
    cta: 'Start Free Trial',
    ctaStyle: 'gold',
    trial: '14-day free trial. No credit card required.',
    includes: [
      'Unlimited employee access (up to 200)',
      'All 18 financial literacy modules',
      'All 17 interactive calculators',
      'Gamified quiz engine + Financial Literacy Score',
      'Employee dashboard',
      'Employer admin dashboard',
      'Custom employer branding (logo + company name)',
      'Shareable employee invite link',
      'Standard engagement analytics',
      'Anonymous workforce leaderboard (optional)',
      'Email + chat support',
    ],
    excludes: [
      'Advanced analytics & exports',
      'Priority support',
      'Government tender documentation',
      'Custom module content',
    ],
  },
  {
    id: 'growth',
    name: 'Growth',
    badge: null,
    monthlyPrice: 599,
    annualMonthly: 509,
    annualTotal: 6108,
    annualSaving: 1080,
    employees: 'Up to 500 employees',
    cta: 'Get Started',
    ctaStyle: 'gold',
    trial: '14-day free trial. No credit card required.',
    includes: [
      'Unlimited employee access (up to 500)',
      'All 18 financial literacy modules',
      'All 17 interactive calculators',
      'Gamified quiz engine + Financial Literacy Score',
      'Employee dashboard',
      'Employer admin dashboard',
      'Custom employer branding (logo + company name)',
      'Shareable employee invite link',
      'Advanced engagement analytics + CSV export',
      'Anonymous workforce leaderboard (optional)',
      'Module completion reporting by team / department',
      'Priority email + chat support',
      'Quarterly engagement review call',
    ],
    excludes: [
      'Government tender documentation',
      'Custom module content',
      'Dedicated account manager',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    badge: 'For Large Organisations',
    monthlyPrice: null,
    annualMonthly: null,
    annualTotal: null,
    annualSaving: null,
    employees: '501+ employees — including government agencies',
    cta: 'Book a Demo',
    ctaStyle: 'outline',
    trial: 'Includes a personalised onboarding session.',
    includes: [
      'Unlimited employee access (volume-based)',
      'All 18 financial literacy modules',
      'All 17 interactive calculators',
      'Gamified quiz engine + Financial Literacy Score',
      'Employee + employer dashboards',
      'Custom employer branding',
      'Advanced analytics + API data export',
      'Anonymous workforce leaderboard (optional)',
      'Department / division-level reporting',
      'Priority phone, email + chat support',
      'Dedicated account manager',
      'Quarterly business review',
      'ASIC compliance documentation pack',
      'Government tender response support',
      'Custom module content (available as add-on)',
      'SSO / payroll system integration (available as add-on)',
    ],
    excludes: [],
  },
]

// ─── Comparison table data ────────────────────────────────────────────────────

const TABLE_ROWS = [
  { feature: 'Max employees', micro: '20', starter: '200', growth: '500', enterprise: 'Custom' },
  { feature: 'All 18 learning modules', micro: true, starter: true, growth: true, enterprise: true },
  { feature: '17 interactive calculators', micro: true, starter: true, growth: true, enterprise: true },
  { feature: 'Gamified quizzes + literacy score', micro: true, starter: true, growth: true, enterprise: true },
  { feature: 'Employee personal dashboard', micro: true, starter: true, growth: true, enterprise: true },
  { feature: 'Employer admin dashboard', micro: true, starter: true, growth: true, enterprise: true },
  { feature: 'Custom branding (logo)', micro: false, starter: true, growth: true, enterprise: true },
  { feature: 'Shareable employee invite link', micro: true, starter: true, growth: true, enterprise: true },
  { feature: 'Basic engagement reporting', micro: true, starter: true, growth: true, enterprise: true },
  { feature: 'Advanced analytics + CSV export', micro: false, starter: false, growth: true, enterprise: true },
  { feature: 'Department-level reporting', micro: false, starter: false, growth: true, enterprise: true },
  { feature: 'Anonymous leaderboard', micro: false, starter: true, growth: true, enterprise: true },
  { feature: 'Quarterly review call', micro: false, starter: false, growth: true, enterprise: true },
  { feature: 'Dedicated account manager', micro: false, starter: false, growth: false, enterprise: true },
  { feature: 'ASIC compliance documentation', micro: false, starter: false, growth: false, enterprise: true },
  { feature: 'Government tender support', micro: false, starter: false, growth: false, enterprise: true },
  { feature: 'Custom module content', micro: false, starter: false, growth: false, enterprise: 'Add-on' },
  { feature: 'SSO / payroll integration', micro: false, starter: false, growth: false, enterprise: 'Add-on' },
  { feature: 'Support level', micro: 'Email', starter: 'Email + chat', growth: 'Priority', enterprise: 'Phone + dedicated' },
]

// ─── FAQ data ─────────────────────────────────────────────────────────────────

const FAQS = [
  {
    q: 'Is there really a free trial with no credit card?',
    a: 'Yes. Every plan except Enterprise comes with a 14-day free trial. You can add employees, explore all the modules and calculators, and run quizzes — no credit card required. At the end of the trial you choose a plan and enter payment details to continue.',
  },
  {
    q: 'What happens if we grow past our employee limit?',
    a: "We'll notify you when you're approaching your limit. You can upgrade to the next tier at any time — your data, employee progress, and quiz history all carry over seamlessly. We never cut off employee access mid-month.",
  },
  {
    q: "Can employees see each other's financial data or quiz scores?",
    a: 'Never. Employee financial data and individual quiz scores are completely private. Employer admins only ever see aggregate, anonymised data — such as the percentage of staff who completed a module, or the average literacy score across the workforce. Individual results are only visible to the employee themselves.',
  },
  {
    q: 'Is the content ASIC-compliant?',
    a: "Yes. Every module, calculator, and piece of content on Wages to Wealth is general financial information and education only — never personal financial advice. Every content page displays a mandatory ASIC General Advice Warning. Content is aligned with ASIC's MoneySmart framework. Wages to Wealth does not hold an AFSL and does not provide personal financial advice.",
  },
  {
    q: 'Can we add our own company logo and branding?',
    a: 'Starter, Growth, and Enterprise plans all include custom employer branding — your logo and company name appear throughout your employees\' experience, making it feel like a native part of your benefits offering. Full white-label theming is available on Enterprise.',
  },
  {
    q: 'Do you offer discounts for not-for-profits or government agencies?',
    a: 'Yes. Not-for-profit organisations receive a 20% discount on any plan. Government agencies at state or federal level are eligible for our Enterprise tier with dedicated tender support. Contact us to discuss.',
  },
  {
    q: 'What\'s your cancellation policy?',
    a: "Monthly plans can be cancelled anytime — you retain access until the end of your billing period. Annual plans can be cancelled at renewal. We don't believe in locking you in — we'd rather earn your business every year.",
  },
  {
    q: 'Is employee data stored securely in Australia?',
    a: 'Yes. All data is stored on Australian servers via Supabase and is encrypted at rest and in transit. We never sell or share employee data. Full details are in our Privacy Policy.',
  },
  {
    q: 'Can we get a demo before we commit?',
    a: "Absolutely. Book a 30-minute demo with our team and we'll walk you through the platform, answer your questions, and help you work out which plan fits your organisation.",
  },
]

// ─── Sub-components ───────────────────────────────────────────────────────────

function TableCell({ value }) {
  if (value === true) return <span className="text-green-500 font-bold text-base">✅</span>
  if (value === false) return <span className="text-gray-300 font-bold text-base">❌</span>
  if (value === 'Add-on') return (
    <span className="text-xs bg-blue-50 text-blue-600 font-semibold px-2 py-0.5 rounded-full">Add-on</span>
  )
  return <span className="text-sm font-semibold text-gray-700">{value}</span>
}

function FaqItem({ q, a, open, onToggle }) {
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 py-4 text-left"
      >
        <span className="font-semibold text-[#0F2B5B] text-sm sm:text-base">{q}</span>
        <span className={`text-[#0F2B5B] text-xl flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-45' : ''}`}>+</span>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-96 pb-4' : 'max-h-0'}`}>
        <p className="text-gray-500 text-sm leading-relaxed">{a}</p>
      </div>
    </div>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function Pricing() {
  const [annual, setAnnual] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)

  const ctaLink = (plan) =>
    plan.id === 'enterprise'
      ? '/demo'
      : `/register/employer?plan=${plan.id}`

  return (
    <div className="bg-[#F9F8F6]">
      <SEO
        title="Pricing"
        path="/pricing"
        description="Simple, transparent pricing for Australian employers. From $149/month for up to 20 employees. 14-day free trial, no credit card required. ASIC-compliant financial literacy for your team."
      />

      {/* ── Hero ── */}
      <div className="bg-[#0F2B5B] text-white py-16 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-[#D4A017] font-semibold text-xs uppercase tracking-widest mb-3">Pricing</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight" style={{ fontFamily: 'DM Sans' }}>
            Simple, transparent pricing.<br className="hidden sm:block" /> No lock-in. No per-seat surprises.
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Wages to Wealth is priced per employer — not per employee. One flat monthly fee gives your entire workforce unlimited access to every module, calculator, quiz, and tool on the platform. Cancel anytime.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">

        {/* ── Billing toggle ── */}
        <div className="flex flex-col items-center mb-4">
          <div className="inline-flex items-center bg-white border border-gray-200 rounded-xl p-1 shadow-sm">
            <button
              onClick={() => setAnnual(false)}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${!annual ? 'bg-[#0F2B5B] text-white shadow' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${annual ? 'bg-[#0F2B5B] text-white shadow' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Annual
              <span className="ml-1.5 text-[10px] font-bold bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full">Save 15%</span>
            </button>
          </div>
        </div>

        {/* ── Annual savings bar ── */}
        <div className={`transition-all duration-300 overflow-hidden mb-8 ${annual ? 'max-h-12 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="bg-green-50 border border-green-200 text-green-800 text-sm font-semibold text-center py-2.5 rounded-xl">
            💡 Pay annually and save up to 15% — that's up to $1,080 back in your budget every year.
          </div>
        </div>

        {/* ── Pricing cards ── */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {PLANS.map(plan => (
            <div
              key={plan.id}
              className={`relative bg-white rounded-2xl border-2 flex flex-col ${
                plan.badge === 'Most Popular'
                  ? 'border-[#D4A017] shadow-xl'
                  : plan.badge === 'For Large Organisations'
                    ? 'border-[#0F2B5B]/30 shadow-sm'
                    : 'border-gray-100 shadow-sm'
              }`}
            >
              {/* Badge */}
              {plan.badge && (
                <div className={`absolute -top-3.5 right-4 text-xs font-bold px-3 py-1 rounded-full ${
                  plan.badge === 'Most Popular'
                    ? 'bg-[#D4A017] text-[#0F2B5B]'
                    : 'bg-[#0F2B5B] text-white'
                }`}>
                  {plan.badge}
                </div>
              )}

              <div className="p-6 flex-1 flex flex-col">
                {/* Plan name */}
                <h3 className="text-xl font-bold text-[#0F2B5B] mb-3" style={{ fontFamily: 'DM Sans' }}>{plan.name}</h3>

                {/* Price */}
                {plan.monthlyPrice ? (
                  <div className="mb-1">
                    <div className="flex items-end gap-1">
                      <span className="text-4xl font-black text-[#0F2B5B]" style={{ fontFamily: 'DM Sans' }}>
                        ${annual ? plan.annualMonthly : plan.monthlyPrice}
                      </span>
                      <span className="text-gray-400 text-sm mb-1">/mo incl. GST</span>
                    </div>
                    {annual ? (
                      <div className="space-y-0.5">
                        <p className="text-xs text-gray-400">Billed as ${plan.annualTotal?.toLocaleString()}/yr incl. GST</p>
                        <span className="inline-block text-[11px] bg-green-100 text-green-700 font-bold px-2 py-0.5 rounded-full">
                          Save ${plan.annualSaving?.toLocaleString()}/yr
                        </span>
                      </div>
                    ) : (
                      <p className="text-xs text-gray-400">Billed monthly</p>
                    )}
                  </div>
                ) : (
                  <div className="mb-1">
                    <div className="text-2xl font-bold text-[#0F2B5B] mb-1" style={{ fontFamily: 'DM Sans' }}>Custom pricing</div>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      From $999/mo incl. GST for 501–2,000 employees.<br />
                      Larger organisations — contact us for a quote.
                    </p>
                  </div>
                )}

                <p className="text-xs font-semibold text-[#D4A017] mt-3 mb-4">{plan.employees}</p>

                {/* Includes */}
                <ul className="space-y-1.5 mb-4 flex-1">
                  {plan.includes.map(f => (
                    <li key={f} className="flex items-start gap-2 text-xs text-gray-600">
                      <span className="text-green-500 mt-0.5 flex-shrink-0">✓</span>{f}
                    </li>
                  ))}
                  {plan.excludes.map(f => (
                    <li key={f} className="flex items-start gap-2 text-xs text-gray-400">
                      <span className="text-gray-300 mt-0.5 flex-shrink-0">✕</span>{f}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <div className="mt-auto pt-4 border-t border-gray-50">
                  <Link
                    to={ctaLink(plan)}
                    className={`block text-center py-3 rounded-xl font-bold text-sm transition-colors mb-2 ${
                      plan.ctaStyle === 'gold'
                        ? 'bg-[#D4A017] text-[#0F2B5B] hover:bg-yellow-400'
                        : 'border-2 border-[#0F2B5B] text-[#0F2B5B] hover:bg-[#0F2B5B] hover:text-white'
                    }`}
                  >
                    {plan.cta} →
                  </Link>
                  <p className="text-[10px] text-gray-400 text-center">{plan.trial}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Comparison table ── */}
        <div className="mb-14">
          <h2 className="text-2xl font-bold text-[#0F2B5B] mb-2 text-center" style={{ fontFamily: 'DM Sans' }}>
            What's included at every tier?
          </h2>
          <p className="text-gray-400 text-sm text-center mb-6">Full feature comparison across all plans</p>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#0F2B5B] text-white">
                    <th className="px-4 py-3 text-left font-semibold text-xs uppercase tracking-wide sticky left-0 bg-[#0F2B5B] min-w-[160px]">Feature</th>
                    {['Micro', 'Starter', 'Growth', 'Enterprise'].map(name => (
                      <th key={name} className="px-4 py-3 text-center font-bold text-sm min-w-[100px]">{name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {TABLE_ROWS.map((row, i) => (
                    <tr key={row.feature} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                      <td className={`px-4 py-3 text-xs font-medium text-gray-600 sticky left-0 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                        {row.feature}
                      </td>
                      {['micro', 'starter', 'growth', 'enterprise'].map(tier => (
                        <td key={tier} className="px-4 py-3 text-center">
                          <TableCell value={row[tier]} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ── FAQ ── */}
        <div className="max-w-3xl mx-auto mb-14">
          <h2 className="text-2xl font-bold text-[#0F2B5B] mb-2 text-center" style={{ fontFamily: 'DM Sans' }}>
            Frequently asked questions
          </h2>
          <p className="text-gray-400 text-sm text-center mb-8">Everything you need to know before getting started</p>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-6">
            {FAQS.map((faq, i) => (
              <FaqItem
                key={i}
                q={faq.q}
                a={faq.a}
                open={openFaq === i}
                onToggle={() => setOpenFaq(openFaq === i ? null : i)}
              />
            ))}
          </div>
        </div>

        {/* ── Trust strip ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm py-5 px-6 mb-8">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-gray-500">
            {[
              { icon: '🔒', text: 'Data stored in Australia' },
              { icon: '⚖️', text: 'ASIC-aligned content' },
              { icon: '🇦🇺', text: 'Built for Australian workplaces' },
              { icon: '💳', text: 'No lock-in contracts' },
              { icon: '🎓', text: '18 modules + 17 calculators' },
            ].map(t => (
              <span key={t.text} className="flex items-center gap-2">
                <span>{t.icon}</span><span className="font-medium">{t.text}</span>
              </span>
            ))}
          </div>
        </div>

        {/* ── NFP callout ── */}
        <div className="bg-[#0F2B5B] border-2 border-[#D4A017] rounded-2xl p-7 mb-10 text-center">
          <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: 'DM Sans' }}>
            Not-for-profit or government organisation?
          </h3>
          <p className="text-white/70 text-sm max-w-2xl mx-auto mb-5">
            Wages to Wealth offers a <strong className="text-[#D4A017]">20% discount</strong> for registered not-for-profits and tailored pricing for government agencies. We also provide full ASIC compliance documentation and government tender response support for public sector procurement.
          </p>
          <Link
            to="/contact?type=nfp"
            className="inline-block bg-[#D4A017] text-[#0F2B5B] px-6 py-3 rounded-xl font-bold text-sm hover:bg-yellow-400 transition-colors"
          >
            Contact us for NFP or Government pricing →
          </Link>
        </div>

        {/* ── Bottom CTA ── */}
        <div className="text-center py-8">
          <h2 className="text-3xl font-bold text-[#0F2B5B] mb-3" style={{ fontFamily: 'DM Sans' }}>
            Ready to give your team a financial advantage?
          </h2>
          <p className="text-gray-500 mb-7 max-w-xl mx-auto">
            Join forward-thinking Australian employers investing in their people's financial wellbeing. Start your free 14-day trial today.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/register/employer"
              className="bg-[#D4A017] text-[#0F2B5B] px-8 py-3.5 rounded-xl font-bold text-lg hover:bg-yellow-400 transition-colors shadow-md">
              Start Free Trial →
            </Link>
            <Link to="/demo"
              className="border-2 border-[#0F2B5B] text-[#0F2B5B] px-8 py-3.5 rounded-xl font-bold text-lg hover:bg-[#0F2B5B] hover:text-white transition-colors">
              Book a Demo
            </Link>
          </div>
          <p className="text-gray-400 text-xs mt-4">No credit card required. Setup takes less than 5 minutes. Cancel anytime.</p>
        </div>
      </div>
    </div>
  )
}
