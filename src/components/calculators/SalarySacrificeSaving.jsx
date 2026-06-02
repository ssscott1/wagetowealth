import { useState, useMemo } from 'react'

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
function netAfterTax(gross) {
  const tax = Math.max(0, calcTax(gross) - calcLITO(gross))
  const medicare = gross * 0.02
  return gross - tax - medicare
}

export default function SalarySacrificeSaving() {
  const [salary, setSalary] = useState(90000)
  const [packageAmount, setPackageAmount] = useState(10000)
  const [isFbtFree, setIsFbtFree] = useState(false)
  const [fbtRate] = useState(47) // employer FBT rate - informational

  const result = useMemo(() => {
    const beforeNet = netAfterTax(salary)
    const reducedSalary = salary - packageAmount
    const afterNet = netAfterTax(reducedSalary)
    const taxSaving = beforeNet - afterNet
    // FBT cost estimate (if not FBT-free): benefit value / (1 - 0.47) * 0.47
    const fbtCost = isFbtFree ? 0 : packageAmount * (fbtRate / (100 - fbtRate))
    const marginalRate =
      salary > 190000 ? 47 :
      salary > 135000 ? 39 :
      salary > 45000 ? 32 :
      salary > 18200 ? 18 : 0
    return { beforeNet, afterNet, taxSaving, fbtCost, reducedSalary, marginalRate }
  }, [salary, packageAmount, isFbtFree, fbtRate])

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          {[
            { label: 'Gross Annual Salary ($)', value: salary, set: setSalary },
            { label: 'Annual Packaging Amount ($)', value: packageAmount, set: setPackageAmount },
          ].map(({ label, value, set }) => (
            <div key={label}>
              <label className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>
              <input type="number" value={value} onChange={e => set(Number(e.target.value))}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2B5B]" />
            </div>
          ))}
          <label className="flex items-center gap-3 cursor-pointer p-3 bg-green-50 border border-green-200 rounded-xl">
            <input type="checkbox" checked={isFbtFree} onChange={e => setIsFbtFree(e.target.checked)} className="accent-[#0F2B5B] w-4 h-4" />
            <div>
              <div className="text-sm font-semibold text-green-800">FBT-exempt benefit (e.g. laptop, work phone)</div>
              <div className="text-xs text-green-600">No FBT cost to employer</div>
            </div>
          </label>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-xs text-blue-700">
            <strong>Your estimated marginal rate:</strong> {result.marginalRate}% (incl. Medicare). Packaging saves the difference between this and the FBT/contributions tax rate.
          </div>
        </div>

        <div className="space-y-3">
          <div className="bg-[#0F2B5B] text-white rounded-xl p-5">
            <div className="text-white/70 text-sm mb-1">Estimated Annual Tax Saving</div>
            <div className="text-4xl font-bold" style={{ fontFamily: 'DM Sans' }}>{fmt(result.taxSaving)}</div>
            <div className="text-white/50 text-xs mt-1">Monthly: {fmt(result.taxSaving / 12)}</div>
          </div>

          <div className="bg-white border border-gray-100 rounded-xl p-4 text-sm space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-500">Take-home without packaging</span>
              <span className="font-medium">{fmt(result.beforeNet)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Taxable salary after packaging</span>
              <span className="font-medium">{fmt(result.reducedSalary)}</span>
            </div>
            <div className="flex justify-between border-t border-gray-100 pt-2">
              <span className="text-gray-500">Take-home after packaging</span>
              <span className="font-medium">{fmt(result.afterNet)}</span>
            </div>
            {!isFbtFree && result.fbtCost > 0 && (
              <div className="flex justify-between text-amber-600 text-xs">
                <span>Indicative FBT cost to employer</span>
                <span>{fmt(result.fbtCost)}</span>
              </div>
            )}
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-700">
            Effective cash value = {fmt(packageAmount)} benefit + {fmt(result.taxSaving)} tax saving = <strong>{fmt(packageAmount + result.taxSaving)}</strong> of value for {fmt(packageAmount)} of packaging.
          </div>
        </div>
      </div>
      <p className="text-xs text-gray-400 mt-3">General estimate only. Actual savings depend on your individual tax position, employer FBT obligations, and specific benefit type. Not financial advice.</p>
    </div>
  )
}
