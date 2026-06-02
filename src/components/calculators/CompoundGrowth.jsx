import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

const fmt = (n) => new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', maximumFractionDigits: 0 }).format(n)

export default function CompoundGrowth() {
  const [principal, setPrincipal] = useState(10000)
  const [monthly, setMonthly] = useState(500)
  const [rate, setRate] = useState(8)
  const [years, setYears] = useState(20)

  const { finalValue, totalContributed, totalInterest, chartData } = useMemo(() => {
    const r = rate / 100 / 12
    const chartData = []
    let balance = principal
    let contributed = principal
    for (let yr = 0; yr <= years; yr++) {
      chartData.push({
        year: yr,
        balance: Math.round(balance),
        contributed: Math.round(contributed),
      })
      if (yr < years) {
        for (let m = 0; m < 12; m++) {
          balance = balance * (1 + r) + monthly
        }
        contributed += monthly * 12
      }
    }
    const finalValue = Math.round(balance)
    const totalContributed = Math.round(contributed)
    return { finalValue, totalContributed, totalInterest: finalValue - totalContributed, chartData }
  }, [principal, monthly, rate, years])

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          {[
            { label: 'Initial Investment ($)', value: principal, set: setPrincipal, min: 0, max: 500000, step: 1000 },
            { label: 'Monthly Contribution ($)', value: monthly, set: setMonthly, min: 0, max: 5000, step: 50 },
            { label: 'Annual Return (% p.a.)', value: rate, set: setRate, min: 1, max: 20, step: 0.5 },
            { label: 'Time Horizon (years)', value: years, set: setYears, min: 1, max: 50, step: 1 },
          ].map(({ label, value, set, min, max, step }) => (
            <div key={label}>
              <div className="flex justify-between mb-1.5">
                <label className="text-sm font-semibold text-gray-700">{label}</label>
                <span className="text-sm font-bold text-[#0F2B5B]">{value}</span>
              </div>
              <input type="range" min={min} max={max} step={step} value={value} onChange={e => set(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-[#0F2B5B]" />
            </div>
          ))}
        </div>

        <div>
          <div className="bg-[#0F2B5B] text-white rounded-xl p-5 mb-4">
            <div className="text-white/70 text-sm mb-1">Future Value after {years} years</div>
            <div className="text-4xl font-bold" style={{ fontFamily: 'DM Sans' }}>{fmt(finalValue)}</div>
            <div className="mt-3 pt-3 border-t border-white/20 grid grid-cols-2 gap-3 text-sm">
              <div><div className="text-white/60 text-xs">Total Contributed</div><div>{fmt(totalContributed)}</div></div>
              <div><div className="text-white/60 text-xs">Total Growth</div><div className="text-[#D4A017]">{fmt(totalInterest)}</div></div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <ResponsiveContainer width="100%" height={150}>
              <AreaChart data={chartData}>
                <XAxis dataKey="year" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} tickFormatter={v => `$${(v / 1000).toFixed(0)}k`} />
                <Tooltip formatter={(v, n) => [fmt(v), n === 'balance' ? 'Portfolio Value' : 'Contributed']} labelFormatter={v => `Year ${v}`} />
                <Area type="monotone" dataKey="contributed" stackId="1" stroke="#e5e7eb" fill="#f3f4f6" />
                <Area type="monotone" dataKey="balance" stroke="#D4A017" fill="#fef9ee" fillOpacity={0.8} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <p className="text-xs text-gray-400 mt-3">This calculator provides a general estimate only and is not financial advice. Past performance is not indicative of future results.</p>
    </div>
  )
}
