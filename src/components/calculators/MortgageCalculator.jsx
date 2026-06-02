import { useState, useMemo } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

const fmt = (n) => new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', maximumFractionDigits: 0 }).format(n)

export default function MortgageCalculator() {
  const [amount, setAmount] = useState(600000)
  const [rate, setRate] = useState(6.0)
  const [term, setTerm] = useState(30)

  const { monthly, totalInterest, totalPaid, chartData } = useMemo(() => {
    const r = rate / 100 / 12
    const n = term * 12
    if (r === 0) return { monthly: amount / n, totalInterest: 0, totalPaid: amount, chartData: [] }
    const monthly = amount * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
    const totalPaid = monthly * n
    const totalInterest = totalPaid - amount

    const chartData = []
    let balance = amount
    for (let yr = 1; yr <= term; yr++) {
      for (let m = 0; m < 12; m++) {
        const interest = balance * r
        balance -= (monthly - interest)
      }
      chartData.push({ year: yr, balance: Math.max(0, Math.round(balance)) })
    }
    return { monthly, totalInterest, totalPaid, chartData }
  }, [amount, rate, term])

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          {[
            { label: 'Loan Amount', value: amount, set: setAmount, min: 50000, max: 3000000, step: 10000, prefix: '$' },
            { label: 'Interest Rate (% p.a.)', value: rate, set: setRate, min: 1, max: 15, step: 0.1, suffix: '%' },
            { label: 'Loan Term (years)', value: term, set: setTerm, min: 5, max: 30, step: 1, suffix: 'yrs' },
          ].map(({ label, value, set, min, max, step, prefix, suffix }) => (
            <div key={label}>
              <div className="flex justify-between mb-1.5">
                <label className="text-sm font-semibold text-gray-700">{label}</label>
                <span className="text-sm font-bold text-[#0F2B5B]">{prefix}{value}{suffix}</span>
              </div>
              <input type="range" min={min} max={max} step={step} value={value}
                onChange={e => set(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-[#0F2B5B]" />
              <div className="flex justify-between text-xs text-gray-400 mt-0.5">
                <span>{prefix}{min}{suffix}</span><span>{prefix}{max}{suffix}</span>
              </div>
            </div>
          ))}
        </div>

        <div>
          <div className="bg-[#0F2B5B] text-white rounded-xl p-5 mb-4">
            <div className="text-white/70 text-sm mb-1">Monthly Repayment</div>
            <div className="text-4xl font-bold" style={{ fontFamily: 'DM Sans' }}>{fmt(monthly)}</div>
            <div className="mt-3 pt-3 border-t border-white/20 grid grid-cols-2 gap-3 text-sm">
              <div>
                <div className="text-white/60 text-xs">Total Interest</div>
                <div className="font-semibold">{fmt(totalInterest)}</div>
              </div>
              <div>
                <div className="text-white/60 text-xs">Total Paid</div>
                <div className="font-semibold">{fmt(totalPaid)}</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">Outstanding Balance Over Time</h4>
            <ResponsiveContainer width="100%" height={140}>
              <LineChart data={chartData}>
                <XAxis dataKey="year" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} tickFormatter={v => `$${(v / 1000).toFixed(0)}k`} />
                <Tooltip formatter={(v) => [fmt(v), 'Balance']} labelFormatter={v => `Year ${v}`} />
                <Line type="monotone" dataKey="balance" stroke="#D4A017" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <p className="text-xs text-gray-400 mt-3">This calculator provides a general estimate only and is not a credit quote or financial advice. Actual results depend on your individual circumstances.</p>
    </div>
  )
}
