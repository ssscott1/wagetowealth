import { useState, useMemo } from 'react'

const fmt = (n) => new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', maximumFractionDigits: 0 }).format(n)

// 2025-26 resident brackets
function calcTax(income) {
  if (income <= 18200) return 0
  if (income <= 45000) return (income - 18200) * 0.16
  if (income <= 135000) return 4288 + (income - 45000) * 0.30
  if (income <= 190000) return 31288 + (income - 135000) * 0.37
  return 51638 + (income - 190000) * 0.45
}

// LITO 2025-26
function calcLITO(income) {
  if (income <= 37500) return 700
  if (income <= 45000) return 700 - (income - 37500) * 0.05
  if (income <= 66667) return 325 - (income - 45000) * 0.015
  return 0
}

// HECS 2025-26 repayment rates (simplified)
const HECS_RATES = [
  { min: 0, max: 54434, rate: 0 },
  { min: 54435, max: 62850, rate: 0.01 },
  { min: 62851, max: 70618, rate: 0.02 },
  { min: 70619, max: 74999, rate: 0.025 },
  { min: 75000, max: 80000, rate: 0.03 },
  { min: 80001, max: 90000, rate: 0.035 },
  { min: 90001, max: 100000, rate: 0.04 },
  { min: 100001, max: 110000, rate: 0.045 },
  { min: 110001, max: 130000, rate: 0.05 },
  { min: 130001, max: 150000, rate: 0.055 },
  { min: 150001, max: 999999, rate: 0.06 },
]

function calcHECS(income) {
  const tier = HECS_RATES.find(r => income >= r.min && income <= r.max)
  return tier ? income * tier.rate : 0
}

export default function PaygTakeHome() {
  const [salary, setSalary] = useState(80000)
  const [hasHECS, setHasHECS] = useState(false)
  const [hasPrivateHealth, setHasPrivateHealth] = useState(false)

  const result = useMemo(() => {
    const taxBeforeOffset = calcTax(salary)
    const lito = calcLITO(salary)
    const incomeTax = Math.max(0, taxBeforeOffset - lito)
    const medicare = salary * 0.02
    // MLS thresholds (approx 2025-26)
    const mlsThreshold = 93000
    const mls = (!hasPrivateHealth && salary > mlsThreshold) ? salary * 0.01 : 0
    const hecs = hasHECS ? calcHECS(salary) : 0
    const totalDeductions = incomeTax + medicare + mls + hecs
    const net = salary - totalDeductions
    const effectiveRate = salary > 0 ? ((totalDeductions / salary) * 100).toFixed(1) : 0
    return { incomeTax, medicare, mls, hecs, totalDeductions, net, effectiveRate }
  }, [salary, hasHECS, hasPrivateHealth])

  const periods = [
    { label: 'Annual', divisor: 1 },
    { label: 'Monthly', divisor: 12 },
    { label: 'Fortnightly', divisor: 26 },
    { label: 'Weekly', divisor: 52 },
  ]

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1.5">
              <label className="text-sm font-semibold text-gray-700">Gross Annual Salary</label>
              <span className="text-sm font-bold text-[#0F2B5B]">{fmt(salary)}</span>
            </div>
            <input type="range" min={15000} max={400000} step={1000} value={salary} onChange={e => setSalary(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-[#0F2B5B]" />
            <input type="number" value={salary} onChange={e => setSalary(Number(e.target.value))}
              className="w-full mt-2 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2B5B]" />
          </div>
          <div className="space-y-2">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={hasHECS} onChange={e => setHasHECS(e.target.checked)} className="accent-[#0F2B5B] w-4 h-4" />
              <span className="text-sm text-gray-700 font-medium">I have a HECS-HELP debt</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={hasPrivateHealth} onChange={e => setHasPrivateHealth(e.target.checked)} className="accent-[#0F2B5B] w-4 h-4" />
              <span className="text-sm text-gray-700 font-medium">I have private hospital cover</span>
            </label>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-700">
            Based on estimated 2025–26 Australian resident tax brackets. Verify current rates at <a href="https://ato.gov.au" target="_blank" rel="noopener noreferrer" className="underline">ato.gov.au</a>.
          </div>
        </div>

        <div>
          <div className="bg-[#0F2B5B] text-white rounded-xl p-5 mb-4">
            <div className="text-white/70 text-sm mb-1">Annual Take-Home Pay</div>
            <div className="text-4xl font-bold" style={{ fontFamily: 'DM Sans' }}>{fmt(result.net)}</div>
            <div className="text-white/50 text-xs mt-1">Effective tax rate: {result.effectiveRate}%</div>
          </div>

          <div className="bg-white border border-gray-100 rounded-xl p-4 mb-4 space-y-2 text-sm">
            {[
              { label: 'Gross Salary', value: salary, cls: 'font-semibold text-gray-800' },
              { label: '— Income Tax', value: -result.incomeTax, cls: 'text-red-600' },
              { label: '— Medicare Levy (2%)', value: -result.medicare, cls: 'text-red-600' },
              ...(result.mls > 0 ? [{ label: '— Medicare Levy Surcharge', value: -result.mls, cls: 'text-red-600' }] : []),
              ...(result.hecs > 0 ? [{ label: '— HECS-HELP Repayment', value: -result.hecs, cls: 'text-red-600' }] : []),
              { label: '= Net Take-Home', value: result.net, cls: 'font-bold text-green-700 border-t border-gray-100 pt-2 mt-1' },
            ].map(r => (
              <div key={r.label} className={`flex justify-between ${r.cls}`}>
                <span>{r.label}</span><span>{fmt(Math.abs(r.value))}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-2">
            {periods.slice(1).map(p => (
              <div key={p.label} className="bg-gray-50 rounded-xl p-3 text-center">
                <div className="text-xs text-gray-400 mb-0.5">{p.label}</div>
                <div className="font-bold text-[#0F2B5B] text-sm">{fmt(result.net / p.divisor)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <p className="text-xs text-gray-400 mt-3">General estimate based on resident individual tax rates. Does not account for all offsets, deductions, or individual circumstances. Verify at ato.gov.au.</p>
    </div>
  )
}
