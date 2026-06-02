import { useState } from 'react'
import MortgageRateSaving from '../components/calculators/MortgageRateSaving'

const CHECKLIST = [
  'Know your current interest rate (check your statement or bank app)',
  'Check competitor rates on Canstar, RateCity, or Finder',
  'Know your loan balance and remaining term',
  'Review your repayment history — on-time payments strengthen your case',
  'Calculate your LVR (loan balance ÷ property value)',
  'Have your account number and loan details ready',
  'Be prepared to ask for a retention specialist if the first call fails',
]

export default function NegotiationGuide() {
  const [outcome, setOutcome] = useState({ reduced: '', oldRate: '', newRate: '' })
  const [saved, setSaved] = useState(false)

  const saving = outcome.oldRate && outcome.newRate
    ? ((parseFloat(outcome.oldRate) - parseFloat(outcome.newRate)) / 100) * 500000
    : null

  return (
    <div className="space-y-6">
      <div className="bg-[#0F2B5B] text-white rounded-2xl p-6">
        <h2 className="text-xl font-bold mb-2" style={{ fontFamily: 'DM Sans' }}>How to Negotiate Your Mortgage Rate</h2>
        <p className="text-white/70 text-sm">Banks want to keep your business. A 10-minute phone call can save you thousands.</p>
      </div>

      {/* Step 1: Checklist */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h3 className="font-bold text-[#0F2B5B] mb-4 flex items-center gap-2" style={{ fontFamily: 'DM Sans' }}>
          <span className="w-7 h-7 bg-[#D4A017] rounded-full flex items-center justify-center text-[#0F2B5B] font-bold text-sm">1</span>
          Prepare Before You Call
        </h3>
        <ul className="space-y-3">
          {CHECKLIST.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
              <input type="checkbox" className="mt-0.5 accent-[#0F2B5B]" />
              {item}
            </li>
          ))}
        </ul>
        <div className="mt-4 p-4 bg-blue-50 rounded-xl text-sm text-blue-700">
          <strong>Check rates:</strong> Visit{' '}
          <a href="https://www.rba.gov.au/statistics/interest-rates/" target="_blank" rel="noopener noreferrer" className="underline">RBA rates</a>
          {' '}or{' '}
          <a href="https://www.canstar.com.au" target="_blank" rel="noopener noreferrer" className="underline">Canstar</a>
          {' '}to find current market rates before calling.
        </div>
      </div>

      {/* Step 2: Script */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h3 className="font-bold text-[#0F2B5B] mb-4 flex items-center gap-2" style={{ fontFamily: 'DM Sans' }}>
          <span className="w-7 h-7 bg-[#D4A017] rounded-full flex items-center justify-center text-[#0F2B5B] font-bold text-sm">2</span>
          The Phone Script
        </h3>
        <div className="bg-[#0F2B5B]/5 border-l-4 border-[#0F2B5B] rounded-r-xl p-5 space-y-3 text-sm text-gray-700 font-mono">
          <p>"Hi, I'm calling about my home loan — account number [XXXXXXXX]."</p>
          <p>"I've been a customer for [X years] and I've always paid on time."</p>
          <p>"I've been doing some research and I can see that [Bank X / lenders like [Canstar comparator]] are currently offering rates of [Y%] to new customers."</p>
          <p>"I'd like to ask whether you're able to match or improve on that rate for my existing loan. I'd prefer to stay with you, but I am prepared to refinance if the rate isn't competitive."</p>
          <p><em className="text-gray-500">[Pause and listen.]</em></p>
          <p>"If you're not able to help me today, could you please put me through to your retention team?"</p>
        </div>

        <div className="mt-4 grid md:grid-cols-3 gap-3">
          {[
            { title: 'If they say yes', icon: '✅', text: 'Ask them to confirm the new rate in writing. Confirm the effective date. Ask if there are any fees.' },
            { title: 'If they say no', icon: '❌', text: 'Ask to speak with a retention specialist or home loan specialist. Mention you are actively considering refinancing.' },
            { title: 'Last resort', icon: '🔄', text: 'Contact a mortgage broker. They can often find better rates and may negotiate on your behalf for free.' },
          ].map(t => (
            <div key={t.title} className="bg-gray-50 rounded-xl p-4 text-sm">
              <div className="font-bold text-[#0F2B5B] mb-1">{t.icon} {t.title}</div>
              <p className="text-gray-600 text-xs">{t.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Step 3: Outcome tracker */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h3 className="font-bold text-[#0F2B5B] mb-4 flex items-center gap-2" style={{ fontFamily: 'DM Sans' }}>
          <span className="w-7 h-7 bg-[#D4A017] rounded-full flex items-center justify-center text-[#0F2B5B] font-bold text-sm">3</span>
          Track Your Outcome
        </h3>
        <div className="grid md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Did they reduce your rate?</label>
            <select value={outcome.reduced} onChange={e => setOutcome(o => ({ ...o, reduced: e.target.value }))}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2B5B]">
              <option value="">Select...</option>
              <option value="yes">Yes ✅</option>
              <option value="no">No — escalating</option>
              <option value="refinance">No — will refinance</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Old rate (%)</label>
            <input type="number" step="0.01" value={outcome.oldRate} onChange={e => setOutcome(o => ({ ...o, oldRate: e.target.value }))}
              placeholder="e.g. 6.50"
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2B5B]" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">New rate (%)</label>
            <input type="number" step="0.01" value={outcome.newRate} onChange={e => setOutcome(o => ({ ...o, newRate: e.target.value }))}
              placeholder="e.g. 5.90"
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2B5B]" />
          </div>
        </div>
        {saving !== null && saving > 0 && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-green-800">
            <strong>Estimated saving:</strong>{' '}
            ${Math.round(saving).toLocaleString()} per year on a $500,000 loan.
            That's ${Math.round(saving * 5).toLocaleString()} over 5 years. 🎉
          </div>
        )}
      </div>

      {/* Step 4: Rate saving calculator */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h3 className="font-bold text-[#0F2B5B] mb-4 flex items-center gap-2" style={{ fontFamily: 'DM Sans' }}>
          <span className="w-7 h-7 bg-[#D4A017] rounded-full flex items-center justify-center text-[#0F2B5B] font-bold text-sm">4</span>
          Rate Saving Calculator
        </h3>
        <MortgageRateSaving />
      </div>
    </div>
  )
}
