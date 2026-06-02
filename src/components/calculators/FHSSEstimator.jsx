import { useState, useMemo } from 'react'

const fmt = (n) => new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', maximumFractionDigits: 0 }).format(n)

export default function FHSSEstimator() {
  const [monthlyContrib, setMonthlyContrib] = useState(1000)
  const [years, setYears] = useState(3)
  const [marginalRate, setMarginalRate] = useState(32.5)
  const [superReturnRate, setSuperReturnRate] = useState(7)
  const [savingsRate, setSavingsRate] = useState(4.5)

  const result = useMemo(() => {
    const annualContrib = monthlyContrib * 12
    // FHSS annual limit is $15,000, lifetime $50,000 — verify at ato.gov.au
    const annualFHSS = Math.min(annualContrib, 15000)
    const totalContributed = Math.min(annualFHSS * years, 50000)

    // Super growth
    const r = superReturnRate / 100 / 12
    let superBalance = 0
    for (let m = 0; m < years * 12; m++) {
      superBalance = superBalance * (1 + r) + monthlyContrib * (1 - 0.15)
    }
    // On withdrawal: taxed at marginal rate - 30% offset
    const effectiveTaxOnWithdrawal = Math.max(0, (marginalRate - 30) / 100)
    const fhssWithdrawal = superBalance * (1 - effectiveTaxOnWithdrawal)

    // Standard savings account
    const sr = savingsRate / 100 / 12
    let savingsBalance = 0
    for (let m = 0; m < years * 12; m++) {
      const interest = savingsBalance * sr
      const taxOnInterest = interest * (marginalRate / 100)
      savingsBalance = savingsBalance + interest - taxOnInterest + monthlyContrib
    }

    const benefit = fhssWithdrawal - savingsBalance
    return { fhssWithdrawal, savingsBalance, benefit, totalContributed, annualFHSS }
  }, [monthlyContrib, years, marginalRate, superReturnRate, savingsRate])

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-3">
          {[
            { label: 'Monthly Contribution ($)', value: monthlyContrib, set: setMonthlyContrib },
            { label: 'Years Saving', value: years, set: setYears, min: 1, max: 10 },
            { label: 'Marginal Tax Rate (%)', value: marginalRate, set: setMarginalRate, step: 0.5 },
            { label: 'Super Fund Return (% p.a.)', value: superReturnRate, set: setSuperReturnRate, step: 0.5 },
            { label: 'Savings Account Rate (% p.a.)', value: savingsRate, set: setSavingsRate, step: 0.1 },
          ].map(({ label, value, set, step = 1, min = 0, max = 999 }) => (
            <div key={label}>
              <label className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>
              <input type="number" value={value} step={step} min={min} max={max} onChange={e => set(Number(e.target.value))}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2B5B]" />
            </div>
          ))}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-700">
            FHSS cap: $15,000/year and $50,000 lifetime (verify at ato.gov.au). Annual cap used in this calculation: {fmt(result.annualFHSS)}/year.
          </div>
        </div>

        <div className="space-y-3">
          <div className="bg-[#0F2B5B] text-white rounded-xl p-5">
            <div className="text-white/70 text-sm mb-1">FHSS After-Tax Withdrawal</div>
            <div className="text-4xl font-bold" style={{ fontFamily: 'DM Sans' }}>{fmt(result.fhssWithdrawal)}</div>
            <div className="text-white/50 text-xs mt-1">vs {fmt(result.savingsBalance)} in a savings account</div>
          </div>
          <div className={`rounded-xl p-4 ${result.benefit > 0 ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
            <div className="text-sm font-semibold text-gray-700 mb-1">FHSS advantage over savings account</div>
            <div className={`text-2xl font-bold ${result.benefit > 0 ? 'text-green-700' : 'text-red-700'}`}>
              {result.benefit > 0 ? '+' : ''}{fmt(result.benefit)}
            </div>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-xs text-blue-700 space-y-1">
            <p><strong>How it works:</strong> Contributions go into super taxed at 15%. On withdrawal for a first home, you pay marginal rate minus 30% offset — usually much lower than saving in a bank account after tax.</p>
            <p><strong>Important:</strong> Apply to ATO BEFORE signing a purchase contract. The determination is irrevocable. First home buyer eligibility criteria apply.</p>
          </div>
        </div>
      </div>
      <p className="text-xs text-gray-400 mt-3">Estimate only. FHSS rules are complex — verify current limits, eligibility, and withdrawal process at ato.gov.au. Not financial advice.</p>
    </div>
  )
}
