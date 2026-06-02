import { useState, useMemo } from 'react'

const fmt = (n) => new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', maximumFractionDigits: 0 }).format(n)

export default function DebtPayoff() {
  const [balance, setBalance] = useState(20000)
  const [rate, setRate] = useState(18)
  const [repayment, setRepayment] = useState(500)

  const result = useMemo(() => {
    const r = rate / 100 / 12
    const minRepayment = balance * r * 1.01
    if (repayment <= balance * r) return { months: null, totalInterest: null, totalPaid: null }

    let b = balance
    let months = 0
    let totalInterest = 0
    while (b > 0 && months < 1200) {
      const interest = b * r
      totalInterest += interest
      b = b + interest - repayment
      months++
    }
    return { months, totalInterest, totalPaid: balance + totalInterest, minRepayment }
  }, [balance, rate, repayment])

  const years = result.months ? Math.floor(result.months / 12) : null
  const months = result.months ? result.months % 12 : null

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          {[
            { label: 'Debt Balance ($)', value: balance, set: setBalance },
            { label: 'Interest Rate (% p.a.)', value: rate, set: setRate, step: 0.5 },
            { label: 'Monthly Repayment ($)', value: repayment, set: setRepayment },
          ].map(({ label, value, set, step = 1 }) => (
            <div key={label}>
              <label className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>
              <input type="number" value={value} step={step} onChange={e => set(Number(e.target.value))}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2B5B]" />
            </div>
          ))}
        </div>

        <div>
          {!result.months ? (
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center text-red-700">
              <div className="text-2xl mb-2">⚠️</div>
              <p className="font-semibold">Repayment too low</p>
              <p className="text-sm mt-1">Your repayment doesn't cover the monthly interest. Increase your repayment to pay off this debt.</p>
            </div>
          ) : (
            <div className="bg-[#0F2B5B] text-white rounded-xl p-6">
              <div className="text-white/70 text-sm mb-1">Time to Pay Off</div>
              <div className="text-4xl font-bold" style={{ fontFamily: 'DM Sans' }}>
                {years > 0 && `${years}y `}{months > 0 && `${months}m`}
              </div>
              <div className="mt-4 pt-4 border-t border-white/20 grid grid-cols-2 gap-3 text-sm">
                <div><div className="text-white/60 text-xs">Total Interest</div><div className="text-red-300">{fmt(result.totalInterest)}</div></div>
                <div><div className="text-white/60 text-xs">Total Paid</div><div>{fmt(result.totalPaid)}</div></div>
              </div>
            </div>
          )}
        </div>
      </div>
      <p className="text-xs text-gray-400 mt-3">This calculator provides a general estimate only and is not financial advice.</p>
    </div>
  )
}
