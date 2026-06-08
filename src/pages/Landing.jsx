import { Link } from 'react-router-dom'
import SEO from '../components/ui/SEO'

const features = [
  { icon: '📚', title: '10 Expert Modules', desc: 'Budgeting, mortgages, super, shares — comprehensive financial education designed for Australian employees.' },
  { icon: '🧮', title: '10 Live Calculators', desc: 'Mortgage repayments, savings goals, debt payoff, and more — all fully functional and client-side.' },
  { icon: '🎮', title: 'Gamified Quizzes', desc: 'Earn badges, track your Financial Literacy Score, and climb the anonymous leaderboard.' },
  { icon: '✅', title: 'ASIC Compliant', desc: 'General information only. No personal advice, no product endorsements. Safe for employer distribution.' },
  { icon: '🏢', title: 'White-Label Ready', desc: 'Add your company logo and branding. Employees see your name, not ours.' },
  { icon: '🔒', title: 'Privacy First', desc: 'Employee financial data is never visible to employers. Full row-level security via Supabase.' },
]

const PLANS = [
  { name: 'Micro', price: '$149', period: '/mo + GST', employees: 'Up to 20 employees', features: ['All 18 modules', 'All 17 calculators', 'Quiz engine + Literacy Score', 'Employee & employer dashboards', 'Email support'], cta: 'Start Free Trial', id: 'micro' },
  { name: 'Starter', price: '$299', period: '/mo + GST', employees: 'Up to 200 employees', features: ['Everything in Micro', 'Custom employer branding', 'Shareable invite link', 'Standard analytics', 'Email + chat support'], cta: 'Start Free Trial', popular: true, id: 'starter' },
  { name: 'Growth', price: '$599', period: '/mo + GST', employees: 'Up to 500 employees', features: ['Everything in Starter', 'Advanced analytics + CSV export', 'Department-level reporting', 'Priority support', 'Quarterly review call'], cta: 'Get Started', id: 'growth' },
]

export default function Landing() {
  return (
    <div className="bg-[#F9F8F6]">
      <SEO
        path="/"
        description="Wages to Wealth is an ASIC-compliant financial literacy platform Australian employers provide to their workforce. 18 expert modules, 17 live calculators, gamified quizzes and a Financial Literacy Score — white-label ready."
      />
      {/* Hero */}
      <section className="bg-[#0F2B5B] text-white py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-block bg-[#D4A017]/20 text-[#D4A017] text-sm font-semibold px-4 py-1.5 rounded-full mb-5">
            ASIC-Compliant Financial Literacy for Employers
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5 leading-tight" style={{ fontFamily: 'DM Sans, sans-serif' }}>
            Give your team the financial skills to go from{' '}
            <span className="text-[#D4A017]">wages to wealth</span>
          </h1>
          <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
            A white-label financial literacy platform employers provide to their workforce. ASIC-safe, engaging, and measurable.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/demo" className="bg-[#D4A017] text-[#0F2B5B] px-8 py-3.5 rounded-xl font-bold text-lg hover:bg-yellow-500 transition-colors shadow-lg">
              👀 Try Employee Demo — Free
            </Link>
            <Link to="/register/employer" className="border-2 border-white/30 text-white px-8 py-3.5 rounded-xl font-semibold text-lg hover:bg-white/10 transition-colors">
              Set Up My Team →
            </Link>
          </div>
          <p className="text-white/40 text-sm mt-4">See exactly what your employees experience · Plans from $149/month + GST</p>
        </div>
      </section>

      {/* Social proof bar */}
      <div className="bg-white border-b border-gray-100 py-4">
        <div className="max-w-5xl mx-auto px-4 flex flex-wrap justify-center gap-8 text-gray-500 text-sm">
          <span>✓ ASIC General Advice Compliant</span>
          <span>✓ Sourced from MoneySmart.gov.au</span>
          <span>✓ Australian-built & hosted</span>
          <span>✓ SOC2-ready infrastructure</span>
        </div>
      </div>

      {/* How it works */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[#D4A017] font-semibold text-sm mb-2 uppercase tracking-wider">Simple Setup</p>
            <h2 className="text-3xl font-bold text-[#0F2B5B] mb-3" style={{ fontFamily: 'DM Sans' }}>Up and running in minutes</h2>
            <p className="text-gray-500 max-w-xl mx-auto">No IT project. No integration required. Just sign up, invite your team, and watch the learning begin.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* connector line desktop */}
            <div className="hidden md:block absolute top-10 left-[calc(16.6%+1rem)] right-[calc(16.6%+1rem)] h-0.5 bg-gray-200 z-0" />
            {[
              {
                step: '1',
                icon: '🏢',
                title: 'Employer signs up',
                desc: 'Register with your work email and verify your company domain. Takes under 5 minutes.',
              },
              {
                step: '2',
                icon: '📨',
                title: 'Invite your team',
                desc: 'Copy your unique invite link from the admin dashboard and share it via email, Slack, or your intranet.',
              },
              {
                step: '3',
                icon: '🚀',
                title: 'Employees start learning',
                desc: 'Staff click the link, create a password, and immediately access all 18 modules, 17 calculators and their Financial Literacy Score.',
              },
            ].map(item => (
              <div key={item.step} className="relative z-10 flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-white rounded-2xl shadow-md border border-gray-100 flex items-center justify-center text-3xl mb-4 relative">
                  {item.icon}
                  <span className="absolute -top-2.5 -right-2.5 w-6 h-6 bg-[#D4A017] text-[#0F2B5B] rounded-full text-xs font-black flex items-center justify-center">
                    {item.step}
                  </span>
                </div>
                <h3 className="font-bold text-[#0F2B5B] mb-2" style={{ fontFamily: 'DM Sans' }}>{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/register/employer" className="bg-[#0F2B5B] text-white px-8 py-3.5 rounded-xl font-bold hover:bg-[#1a3d7c] transition-colors inline-block">
              Get Started Free →
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0F2B5B] mb-3" style={{ fontFamily: 'DM Sans' }}>Everything your team needs</h2>
            <p className="text-gray-500 max-w-xl mx-auto">A complete financial wellness benefit — not a boring PDF, not a one-off webinar.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {features.map(f => (
              <div key={f.title} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="font-bold text-[#0F2B5B] mb-2" style={{ fontFamily: 'DM Sans' }}>{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Built for Employers — Workplace differentiator */}
      <section className="py-20 px-4 bg-gradient-to-br from-[#0F2B5B] to-[#1a3d7c] text-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-4">
            <div className="inline-block bg-[#D4A017]/20 text-[#D4A017] text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              The Only Platform Built Around the Employee Experience
            </div>
            <h2 className="text-3xl font-bold mb-3" style={{ fontFamily: 'DM Sans' }}>
              Not just budgeting — the topics your people <em>actually need at work</em>
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto text-lg">
              Wages to Wealth includes 8 employer-specific modules that generic financial literacy tools completely ignore.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-10 mb-10">
            {[
              { icon: '🧾', title: 'Understanding Your Pay Slip', desc: 'Check you\'re being paid correctly, decode PAYG, and know your legal rights.' },
              { icon: '📦', title: 'Salary Packaging & FBT', desc: 'Reduce taxable income with pre-tax benefits. NFP employees: maximise your $15,900 FBT-free cap.' },
              { icon: '💼', title: 'Super Contributions Strategy', desc: 'Salary sacrifice, FHSS, carry-forward, co-contributions — go beyond the SG rate.' },
              { icon: '🚘', title: 'Novated Leasing', desc: 'The most misunderstood benefit. EV? Now FBT-exempt. We explain it simply.' },
              { icon: '📊', title: 'Income Tax & Your Return', desc: 'Tax brackets, deductions, HECS, Medicare — lodge confidently with myTax.' },
              { icon: '⚖️', title: 'Workplace Entitlements', desc: 'Know your NES rights, award rates, super obligations, and redundancy entitlements.' },
              { icon: '📊', title: 'Employee Share Schemes', desc: 'RSUs, options, start-up concessions — understand the tax before you act.' },
              { icon: '🔄', title: 'Life Events', desc: 'Marriage, baby, separation, redundancy — practical financial steps for each.' },
            ].map(item => (
              <div key={item.title} className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10 hover:bg-white/15 transition-colors">
                <div className="text-2xl mb-2">{item.icon}</div>
                <h3 className="font-bold text-sm mb-1" style={{ fontFamily: 'DM Sans' }}>{item.title}</h3>
                <p className="text-white/60 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-white/10 border border-white/20 rounded-2xl p-6 text-center">
            <p className="text-white/80 text-sm mb-3">
              <strong className="text-white">Help your team understand their entitlements, benefits, and options.</strong><br />
              When employees know how to read a pay slip, use salary packaging, and plan for redundancy — they are less stressed, more productive, and more loyal.
            </p>
            <Link to="/register/employer" className="bg-[#D4A017] text-[#0F2B5B] px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-yellow-500 transition-colors inline-block">
              See All 18 Modules →
            </Link>
          </div>
        </div>
      </section>

      {/* Why employers */}
      <section className="bg-[#0F2B5B] text-white py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3" style={{ fontFamily: 'DM Sans' }}>Why employers choose Wages to Wealth</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { title: 'Duty of Care', desc: 'Financial stress is the #1 productivity killer in Australian workplaces. Providing financial education demonstrates genuine care.' },
              { title: 'ASIC-Safe by Design', desc: 'Every piece of content is general information only. No personal advice, no AFSL required. Legal from day one.' },
              { title: 'Staff Retention', desc: 'Financial wellness benefits rank in the top 5 most valued employee perks. Differentiate your employer brand.' },
              { title: 'EAP Extension', desc: 'Complement your existing Employee Assistance Program with proactive financial skills — before crisis hits.' },
            ].map(item => (
              <div key={item.title} className="flex gap-4">
                <div className="w-10 h-10 bg-[#D4A017] rounded-lg flex-shrink-0 flex items-center justify-center text-[#0F2B5B] font-bold">✓</div>
                <div>
                  <h3 className="font-bold mb-1" style={{ fontFamily: 'DM Sans' }}>{item.title}</h3>
                  <p className="text-white/70 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-4" id="pricing">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0F2B5B] mb-3" style={{ fontFamily: 'DM Sans' }}>Simple, transparent pricing</h2>
            <p className="text-gray-500">All plans include a 30-day free trial. No lock-in contracts.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {PLANS.map(plan => (
              <div key={plan.name} className={`rounded-2xl p-6 border-2 relative ${plan.popular ? 'border-[#D4A017] bg-white shadow-lg' : 'border-gray-100 bg-white shadow-sm'}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#D4A017] text-[#0F2B5B] text-xs font-bold px-4 py-1 rounded-full">
                    Most Popular
                  </div>
                )}
                <h3 className="text-xl font-bold text-[#0F2B5B] mb-1" style={{ fontFamily: 'DM Sans' }}>{plan.name}</h3>
                <div className="mb-1">
                  <span className="text-3xl font-bold text-[#0F2B5B]">{plan.price}</span>
                  <span className="text-gray-400 text-sm">{plan.period}</span>
                </div>
                <p className="text-gray-400 text-sm mb-4">{plan.employees}</p>
                <ul className="space-y-2 mb-6">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="text-green-500 mt-0.5">✓</span>{f}
                    </li>
                  ))}
                </ul>
                <Link to={`/register/employer?plan=${plan.id}`}
                  className={`block text-center py-2.5 rounded-xl font-semibold text-sm transition-colors ${plan.popular ? 'bg-[#D4A017] text-[#0F2B5B] hover:bg-yellow-400' : 'border border-[#0F2B5B] text-[#0F2B5B] hover:bg-blue-50'}`}>
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-[#0F2B5B] mb-10" style={{ fontFamily: 'DM Sans' }}>What HR teams are saying</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { quote: '"Our team engagement scores improved significantly after we launched Wages to Wealth. Financial stress is real and this helps."', name: 'Sarah T.', role: 'Head of People, Tech Co.' },
              { quote: '"Finally a financial benefit that\'s actually ASIC compliant. I can recommend it to employees without any legal hesitation."', name: 'Mark R.', role: 'HR Director, Manufacturing' },
              { quote: '"The calculators alone are worth it. Our employees use the mortgage calculator every week."', name: 'Jen L.', role: 'People Operations, Retail Group' },
            ].map(t => (
              <div key={t.name} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <p className="text-gray-600 text-sm italic mb-4">"{t.quote.replace(/^"|"$/g, '')}"</p>
                <div>
                  <div className="font-semibold text-[#0F2B5B] text-sm">{t.name}</div>
                  <div className="text-gray-400 text-xs">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-[#D4A017]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#0F2B5B] mb-3" style={{ fontFamily: 'DM Sans' }}>Ready to invest in your team's financial future?</h2>
          <p className="text-[#0F2B5B]/70 mb-6">Start your 30-day free trial today. Setup takes under 5 minutes.</p>
          <Link to="/register/employer" className="bg-[#0F2B5B] text-white px-8 py-3.5 rounded-xl font-bold text-lg hover:bg-[#1a3d7c] transition-colors inline-block">
            Get Started Free
          </Link>
        </div>
      </section>
    </div>
  )
}
