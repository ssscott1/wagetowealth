import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

const fmt = (n) => new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', maximumFractionDigits: 0 }).format(n)

function calcTax(income) {
  if (income <= 18200) return 0
  if (income <= 45000) return (income - 18200) * 0.16
  if (income <= 135000) return 4288 + (income - 45000) * 0.30
  if (income <= 190000) return 31288 + (income - 135000) * 0.37
  return 51638 + (income - 190000) * 0.45
}
function calcLITO(income) {
  if (income <= 37500) return 700
  if (income <= 45000) return 700 - (income - 37500) * 0.05
  if (income <= 66667) return 325 - (income - 45000) * 0.015
  return 0
}

export default function SuperSacrificeProjection() {
  const [salary, setSalary] = useState(90000)
  const [sacrifice, setSacrifice] = useState(10000)
  const [currentBalance, setCurrentBalance] = useState(80000)
  const [years, setYears] = useState(20)
  const [returnRate, setReturnRate] = useState(7)

  const result = useMemo(() => {
    const sg = salary * 0.12
    const r = returnRate / 100

    // Tax saving
    const taxBefore = Math.max(0, calcTax(salary) - calcLITO(salary)) + salary * 0.02
    const taxAfter = Math.max(0, calcTax(salary - sacrifice) - calcLITO(salary - sacrifice)) + (salary - sacrifice) * 0.02
    const annualTaxSaving = taxBefore - taxAfter

    // Super projection without sacrifice
    const annualContribWithout = sg * (1 - 0.15)
    const annualContribWith = (sg + sacrifice) * (1 - 0.15)

    const chartData = []
    let balWithout = currentBalance
    let balWith = currentBalance
    for (let y = 0; y <= years; y++) {
      chartData.push({ year: y, without: Math.round(balWithout), with: Math.round(balWith) })
      if (y < years) {
        balWithout = balWithout * (1 + r) + annualContribWithout
        balWith = balWith * (1 + r) + annualContribWith
      }
    }
    return { annualTaxSaving, balWithout: Math.round(balWithout), balWith: Math.round(balWith), diff: Math.round(balWith - balWithout), chartData }
  }, [salary, sacrifice, currentBalance, years, returnRate])

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-3">
          {[
            { label: 'Gross Annual Salary ($)', value: salary, set: setSalary },
            { label: 'Annual Salary Sacrifice into Super ($)', value: sacrifice, set: setSacrifice },
            { label: 'Current Super Balance ($)', value: currentBalance, set: setCurrentBalance },
          ].map(({ label, value, set }) => (
            <div key={label}>
              <label className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>
              <input type="number" value={value} onChange={e => set(Number(e.target.value))}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2B5B]" />
            </div>
          ))}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Years</label>
              <input type="number" value={years} min={1} max={40} onChange={e => setYears(Number(e.target.value))}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2B5B]" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Return (% p.a.)</label>
              <input type="number" value={returnRate} step={0.5} onChange={e => setReturnRate(Number(e.target.value))}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2B5B]" />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <div className="text-sm text-green-700 mb-1 font-semibold">Annual Income Tax Saving</div>
            <div className="text-3xl font-bold text-green-800" style={{ fontFamily: 'DM Sans' }}>{fmt(result.annualTaxSaving)}</div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="text-xs text-gray-400 mb-1">Without sacrifice ({years}y)</div>
              <div className="font-bold text-gray-700 text-lg">{fmt(result.balWithout)}</div>
            </div>
            <div className="bg-[#0F2B5B] rounded-xl p-4">
              <div className="text-xs text-white/60 mb-1">With sacrifice ({years}y)</div>
              <div className="font-bold text-white text-lg">{fmt(result.balWith)}</div>
            </div>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 text-sm text-yellow-800">
            <strong>Super boost:</strong> {fmt(result.diff)} extra at retirement
          </div>
          <div className="bg-white border border-gray-100 rounded-xl p-3">
            <ResponsiveContainer width="100%" height={130}>
              <AreaChart data={result.chartData}>
                <XAxis dataKey="year" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} tickFormatter={v => `$${(v / 1000).toFixed(0)}k`} />
                <Tooltip formatter={(v, n) => [fmt(v), n === 'with' ? 'With sacrifice' : 'Without']} labelFormatter={v => `Year ${v}`} />
                <Area type="monotone" dataKey="without" stroke="#e5e7eb" fill="#f9fafb" />
                <Area type="monotone" dataKey="with" stroke="#D4A017" fill="#fef9ee" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <p className="text-xs text-gray-400 mt-3">Projection is indicative only. Check current concessional caps at ato.gov.au. Not financial advice.</p>
    </div>
  )
}
