import { useState, useMemo } from 'react'

const fmt = (n) => new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', maximumFractionDigits: 0 }).format(n)

export default function EssTaxEstimator() {
  const [discountValue, setDiscountValue] = useState(20000)
  const [marginalRate, setMarginalRate] = useState(34.5)
  const [isDeferred, setIsDeferred] = useState(false)
  const [isStartup, setIsStartup] = useState(false)
  const [heldOver12Months, setHeldOver12Months] = useState(true)
  const [saleValue, setSaleValue] = useState(30000)
  const [costBase, setCostBase] = useState(20000)

  const result = useMemo(() => {
    // Non-deferred: taxed as income at grant
    const incomeAtGrant = isDeferred ? 0 : discountValue * (marginalRate / 100)

    // CGT on eventual sale
    const capitalGain = Math.max(0, saleValue - costBase)
    let cgtTax = 0
    if (isStartup) {
      // Start-up concession: taxed as CGT at sale
      const assessableCGT = heldOver12Months ? capitalGain * 0.5 : capitalGain
      cgtTax = assessableCGT * (marginalRate / 100)
    } else if (isDeferred) {
      // Deferred: income tax at taxing point (approximated by discount value), then CGT on additional growth
      const incomeAtTaxingPoint = discountValue * (marginalRate / 100)
      const growthGain = Math.max(0, saleValue - costBase - discountValue)
      const assessableGrowth = heldOver12Months ? growthGain * 0.5 : growthGain
      cgtTax = incomeAtTaxingPoint + assessableGrowth * (marginalRate / 100)
      return { incomeAtGrant: 0, deferredTax: incomeAtTaxingPoint, cgtTax: assessableGrowth * (marginalRate / 100), totalTax: cgtTax, note: 'deferred' }
    } else {
      const growthGain = Math.max(0, saleValue - costBase)
      const assessable = heldOver12Months ? growthGain * 0.5 : growthGain
      cgtTax = assessable * (marginalRate / 100)
    }

    const totalTax = incomeAtGrant + cgtTax
    return { incomeAtGrant, cgtTax, totalTax, note: isStartup ? 'startup' : isDeferred ? 'deferred' : 'standard' }
  }, [discountValue, marginalRate, isDeferred, isStartup, heldOver12Months, saleValue, costBase])

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Discount Value of Shares / Options ($)</label>
            <input type="number" value={discountValue} onChange={e => setDiscountValue(Number(e.target.value))}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2B5B]" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Marginal Tax Rate (incl. Medicare, %)</label>
            <input type="number" value={marginalRate} step={0.5} onChange={e => setMarginalRate(Number(e.target.value))}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2B5B]" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Sale Value ($)</label>
              <input type="number" value={saleValue} onChange={e => setSaleValue(Number(e.target.value))}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2B5B]" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Cost Base ($)</label>
              <input type="number" value={costBase} onChange={e => setCostBase(Number(e.target.value))}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2B5B]" />
            </div>
          </div>
          <div className="space-y-2">
            {[
              { checked: isDeferred, set: setIsDeferred, label: 'Deferred tax scheme (tax deferred until taxing point)' },
              { checked: isStartup, set: setIsStartup, label: 'Start-up ESS (CGT treatment on sale, not income at grant)' },
              { checked: heldOver12Months, set: setHeldOver12Months, label: 'Held 12+ months (50% CGT discount eligible)' },
            ].map(({ checked, set, label }) => (
              <label key={label} className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" checked={checked} onChange={e => set(e.target.checked)} className="accent-[#0F2B5B] mt-0.5 w-4 h-4 flex-shrink-0" />
                <span className="text-sm text-gray-700">{label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <div className="bg-[#0F2B5B] text-white rounded-xl p-5">
            <div className="text-white/70 text-sm mb-1">Estimated Total Tax</div>
            <div className="text-4xl font-bold" style={{ fontFamily: 'DM Sans' }}>{fmt(result.totalTax)}</div>
          </div>
          <div className="bg-white border border-gray-100 rounded-xl p-4 text-sm space-y-2">
            {result.incomeAtGrant > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-500">Income tax at grant</span>
                <span className="font-medium text-orange-600">{fmt(result.incomeAtGrant)}</span>
              </div>
            )}
            {result.deferredTax > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-500">Tax at deferred taxing point</span>
                <span className="font-medium text-orange-600">{fmt(result.deferredTax)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-gray-500">CGT on growth {heldOver12Months ? '(50% discount)' : ''}</span>
              <span className="font-medium text-orange-600">{fmt(result.cgtTax)}</span>
            </div>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-xs text-blue-700">
            ESS tax rules are complex. Check your ESS statement from your employer and verify treatment at ato.gov.au/ess. Consider consulting a tax agent if the amounts are significant.
          </div>
        </div>
      </div>
      <p className="text-xs text-gray-400 mt-3">Simplified estimate only. Actual tax treatment depends on scheme type, employment conditions, and ATO rulings. Not tax advice.</p>
    </div>
  )
}
