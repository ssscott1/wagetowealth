import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

const fmt = (n) => new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', maximumFractionDigits: 0 }).format(n)

export default function SuperProjection() {
  const [currentBalance, setCurrentBalance] = useState(80000)
  const [salary, setSalary] = useState(90000)
  const [age, setAge] = useState(35)
  const [retirementAge, setRetirementAge] = useState(67)
  const [returnRate, setReturnRate] = useState(7)
  const [extraContrib, setExtraContrib] = useState(0)

  const result = useMemo(() => {
    const yearsToRetirement = retirementAge - age
    if (yearsToRetirement <= 0) return { finalBalance: currentBalance, chartData: [] }
    const r = returnRate / 100
    const sgRate = 0.115
    const annualContrib = salary * sgRate + extraContrib * 12
    const chartData = []
    let balance = currentBalance
    for (let y = 0; y <= yearsToRetirement; y++) {
      chartData.push({ age: age + y, balance: Math.round(balance) })
      if (y < yearsToRetirement) {
        balance = balance * (1 + r) + annualContrib
      }
    }
    return { finalBalance: Math.round(balance), chartData, annualContrib }
  }, [currentBalance, salary, age, retirementAge, returnRate, extraContrib])

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-3">
          {[
            { label: 'Current Super Balance ($)', value: currentBalance, set: setCurrentBalance },
            { label: 'Annual Salary ($)', value: salary, set: setSalary },
            { label: 'Current Age', value: age, set: setAge, max: 65 },
            { label: 'Retirement Age', value: retirementAge, set: setRetirementAge, min: 55, max: 75 },
            { label: 'Expected Return (% p.a.)', value: returnRate, set: setReturnRate, step: 0.5, max: 15 },
            { label: 'Extra Monthly Contribution ($)', value: extraContrib, set: setExtraContrib },
          ].map(({ label, value, set, step = 1, min = 0, max = 999999 }) => (
            <div key={label}>
              <label className="block text-xs font-semibold text-gray-600 mb-1">{label}</label>
              <input type="number" value={value} step={step} min={min} max={max} onChange={e => set(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2B5B]" />
            </div>
          ))}
        </div>
        <div>
          <div className="bg-[#0F2B5B] text-white rounded-xl p-6 mb-4">
            <div className="text-white/70 text-sm mb-1">Projected Balance at {retirementAge}</div>
            <div className="text-4xl font-bold" style={{ fontFamily: 'DM Sans' }}>{fmt(result.finalBalance)}</div>
            <p className="text-white/50 text-xs mt-2">SG contributions: {fmt((salary * 0.115) / 12)}/mo + {fmt(extraContrib)}/mo extra</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <ResponsiveContainer width="100%" height={160}>
              <AreaChart data={result.chartData}>
                <XAxis dataKey="age" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} tickFormatter={v => `$${(v / 1000).toFixed(0)}k`} />
                <Tooltip formatter={(v) => [fmt(v), 'Balance']} labelFormatter={v => `Age ${v}`} />
                <Area type="monotone" dataKey="balance" stroke="#D4A017" fill="#fef9ee" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <p className="text-xs text-gray-400 mt-3">General projection only. Actual returns vary. This is not financial or superannuation advice. Fees and inflation not accounted for.</p>
    </div>
  )
}
