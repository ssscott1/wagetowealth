import { Link } from 'react-router-dom'
import SEO from '../components/ui/SEO'

const VALUES = [
  { icon: '🎯', title: 'Honest, not salesy', desc: 'No product recommendations, no commission referrals, no hidden agenda. Just clear information that helps people make better decisions.' },
  { icon: '🔒', title: 'Privacy first', desc: 'Employees\' financial data is theirs. Employers see anonymous, aggregate stats only — never individual scores or calculator inputs.' },
  { icon: '✅', title: 'ASIC compliant', desc: 'General advice only. We don\'t hold an AFSL and we don\'t give personal advice. Safe for employers to provide as a workplace benefit.' },
  { icon: '🇦🇺', title: 'Built for Australia', desc: 'SGC rates, PAYG brackets, NES entitlements, salary packaging FBT — every calculator and module is built for the Australian context.' },
]

export default function About() {
  return (
    <div className="bg-[#F9F8F6]">
      <SEO
        title="About"
        path="/about"
        description="Wages to Wealth is built by Australians for Australian workplaces. We provide ASIC-compliant financial literacy education as an employee benefit — helping workers go from wages to wealth."
      />

      {/* Hero */}
      <div className="bg-[#0F2B5B] text-white py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[#D4A017] font-semibold text-sm mb-4 uppercase tracking-wider">Our Story</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-5 leading-tight" style={{ fontFamily: 'DM Sans' }}>
            We believe financial literacy is a right, not a luxury
          </h1>
          <p className="text-white/70 text-lg max-w-xl mx-auto">
            Built by Australians, for Australian workplaces — because most employees leave school having never learned how money actually works.
          </p>
        </div>
      </div>

      {/* Story */}
      <div className="max-w-3xl mx-auto px-4 py-16">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 mb-10 space-y-5 text-gray-600 leading-relaxed">
          <p className="text-lg text-gray-700 font-medium">
            Financial stress is one of the biggest productivity drains in modern workplaces. Research consistently shows it affects focus, absenteeism, and retention — yet most employer wellness programs completely overlook it.
          </p>
          <p>
            Wages to Wealth was created by <strong className="text-gray-800">Sierra Bravo Capital</strong> to fix that. We set out to build the financial literacy platform we wished existed — one that's genuinely useful, completely transparent, and safe for employers to provide without legal risk.
          </p>
          <p>
            Every piece of content is sourced from publicly available educational resources including <a href="https://moneysmart.gov.au" target="_blank" rel="noopener noreferrer" className="text-[#0F2B5B] font-semibold hover:underline">MoneySmart.gov.au</a> — Australia's own government financial guidance. We don't recommend products. We don't take referral fees. We just teach.
          </p>
          <p>
            We also believe financial education shouldn't stop at the workplace. That's why we built <strong className="text-gray-800">Money School</strong> — a free section for employees to share with their kids aged 12–16, so the next generation starts with the knowledge we all wish we'd had earlier.
          </p>
        </div>

        {/* Values */}
        <h2 className="text-2xl font-bold text-[#0F2B5B] mb-6" style={{ fontFamily: 'DM Sans' }}>What we stand for</h2>
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          {VALUES.map(v => (
            <div key={v.title} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <div className="text-3xl mb-3">{v.icon}</div>
              <h3 className="font-bold text-[#0F2B5B] mb-1" style={{ fontFamily: 'DM Sans' }}>{v.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="bg-[#0F2B5B] rounded-2xl p-8 text-white text-center mb-12">
          <h2 className="text-xl font-bold mb-6" style={{ fontFamily: 'DM Sans' }}>What's inside</h2>
          <div className="grid grid-cols-3 gap-6">
            {[
              { val: '18', label: 'Learning modules' },
              { val: '17', label: 'Live calculators' },
              { val: '90+', label: 'Quiz questions' },
            ].map(s => (
              <div key={s.label}>
                <div className="text-4xl font-black text-[#D4A017]" style={{ fontFamily: 'DM Sans' }}>{s.val}</div>
                <div className="text-white/70 text-sm mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#0F2B5B] mb-3" style={{ fontFamily: 'DM Sans' }}>Ready to invest in your people?</h2>
          <p className="text-gray-500 text-sm mb-6">30-day free trial. No credit card. No lock-in.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/register/employer"
              className="bg-[#0F2B5B] text-white px-8 py-3.5 rounded-xl font-bold hover:bg-[#1a3d7c] transition-colors">
              Start Free Trial →
            </Link>
            <Link to="/pricing"
              className="border-2 border-[#0F2B5B] text-[#0F2B5B] px-8 py-3.5 rounded-xl font-bold hover:bg-[#0F2B5B] hover:text-white transition-colors">
              View Pricing
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
