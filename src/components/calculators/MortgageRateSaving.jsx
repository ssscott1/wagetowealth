import { useState, useMemo } from 'react'

const fmt = (n) => new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', maximumFractionDigits: 0 }).format(n)

function annualInterest(balance, rate) {
  const r = rate / 100 / 12
  const n = 30 * 12
  const monthly = balance * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
  return monthly * 12
}

export default function MortgageRateSaving() {
  const [balance, setBalance] = useState(500000)
  const [oldRate, setOldRate] = useState(6.5)
  const [newRate, setNewRate] = useState(5.9)

  const result = useMemo(() => {
    const oldAnnual = annualInterest(balance, oldRate)
    const newAnnual = annualInterest(balance, newRate)
    const annualSaving = oldAnnual - newAnnual
    return { annualSaving, fiveYearSaving: annualSaving * 5, monthlyOld: oldAnnual / 12, monthlyNew: newAnnual / 12 }
  }, [balance, oldRate, newRate])

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          {[
            { label: 'Loan Balance ($)', value: balance, set: setBalance },
            { label: 'Current Rate (% p.a.)', value: oldRate, set: setOldRate, step: 0.05 },
            { label: 'New Rate (% p.a.)', value: newRate, set: setNewRate, step: 0.05 },
          ].map(({ label, value, set, step = 1 }) => (
            <div key={label}>
              <label className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>
              <input type="number" value={value} step={step} onChange={e => set(Number(e.target.value))}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2B5B]" />
            </div>
          ))}
          <div className="text-sm text-gray-500">
            Rate reduction: <strong className="text-green-700">{(oldRate - newRate).toFixed(2)}% p.a.</strong>
          </div>
        </div>
        <div className="space-y-3">
          <div className="bg-green-50 border border-green-200 rounded-xl p-5">
            <div className="text-sm text-green-700 mb-1 font-semibold">Annual Interest Saving</div>
            <div className="text-4xl font-bold text-green-800" style={{ fontFamily: 'DM Sans' }}>{fmt(result.annualSaving)}</div>
          </div>
          <div className="bg-[#0F2B5B] text-white rounded-xl p-5">
            <div className="text-white/70 text-sm mb-1">5-Year Saving</div>
            <div className="text-3xl font-bold" style={{ fontFamily: 'DM Sans' }}>{fmt(result.fiveYearSaving)}</div>
          </div>
          <div className="bg-white border border-gray-100 rounded-xl p-4 grid grid-cols-2 gap-3 text-sm">
            <div><div className="text-gray-400 text-xs">Old Monthly Repayment</div><div className="font-semibold text-red-600">{fmt(result.monthlyOld)}</div></div>
            <div><div className="text-gray-400 text-xs">New Monthly Repayment</div><div className="font-semibold text-green-600">{fmt(result.monthlyNew)}</div></div>
          </div>
        </div>
      </div>
      <p className="text-xs text-gray-400 mt-3">This calculator provides a general estimate only and is not financial advice.</p>
    </div>
  )
}
