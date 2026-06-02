import { useState, useMemo } from 'react'

const fmt = (n) => new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', maximumFractionDigits: 0 }).format(n)

export default function BorrowingPower() {
  const [grossIncome, setGrossIncome] = useState(90000)
  const [otherIncome, setOtherIncome] = useState(0)
  const [expenses, setExpenses] = useState(3000)
  const [existingDebt, setExistingDebt] = useState(0)
  const [dependants, setDependants] = useState(0)
  const [rate, setRate] = useState(6.5)

  const result = useMemo(() => {
    const monthlyGross = grossIncome / 12
    const monthlyNet = monthlyGross * 0.70 // rough after-tax
    const otherNet = (otherIncome / 12) * 0.80
    const totalNet = monthlyNet + otherNet
    const dependantCost = dependants * 500
    const bufferRate = (rate + 3) / 100 / 12
    const availableRepayment = totalNet - expenses - existingDebt - dependantCost
    if (availableRepayment <= 0) return 0
    const n = 30 * 12
    const borrowing = availableRepayment * (1 - Math.pow(1 + bufferRate, -n)) / bufferRate
    return Math.max(0, Math.round(borrowing))
  }, [grossIncome, otherIncome, expenses, existingDebt, dependants, rate])

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-3">
          {[
            { label: 'Gross Annual Income ($)', value: grossIncome, set: setGrossIncome },
            { label: 'Other Income (annual, $)', value: otherIncome, set: setOtherIncome },
            { label: 'Monthly Living Expenses ($)', value: expenses, set: setExpenses },
            { label: 'Existing Debt Repayments (monthly, $)', value: existingDebt, set: setExistingDebt },
          ].map(({ label, value, set }) => (
            <div key={label}>
              <label className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>
              <input type="number" value={value} onChange={e => set(Number(e.target.value))}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2B5B]" />
            </div>
          ))}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Dependants</label>
              <input type="number" value={dependants} onChange={e => setDependants(Number(e.target.value))} min={0} max={10}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2B5B]" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Interest Rate (%)</label>
              <input type="number" value={rate} onChange={e => setRate(Number(e.target.value))} step={0.1}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2B5B]" />
            </div>
          </div>
        </div>

        <div>
          <div className="bg-[#0F2B5B] text-white rounded-xl p-6 text-center">
            <div className="text-white/70 text-sm mb-2">Estimated Borrowing Capacity</div>
            <div className="text-4xl font-bold" style={{ fontFamily: 'DM Sans' }}>{fmt(result)}</div>
            <p className="text-white/60 text-xs mt-3">
              Calculated using APRA's 3% serviceability buffer (assessed at {(rate + 3).toFixed(1)}%).
              This is an estimate only — actual lending capacity varies by lender.
            </p>
          </div>
          <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-700">
            <strong>Note:</strong> This uses a simplified model. Actual borrowing power depends on your credit score, employment type, chosen lender's policies, and other factors. Speak with a mortgage broker for accurate pre-approval figures.
          </div>
        </div>
      </div>
      <p className="text-xs text-gray-400 mt-3">This calculator provides a general estimate only and is not a credit quote or financial advice.</p>
    </div>
  )
}
