import { useMemo } from 'react'
import { useState } from 'react'

const fmt = (n) => new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', maximumFractionDigits: 0 }).format(n)

// NES redundancy pay scale
const NES_SCALE = [
  { min: 1, max: 2, weeks: 4 },
  { min: 2, max: 3, weeks: 6 },
  { min: 3, max: 4, weeks: 7 },
  { min: 4, max: 5, weeks: 8 },
  { min: 5, max: 6, weeks: 10 },
  { min: 6, max: 7, weeks: 11 },
  { min: 7, max: 8, weeks: 13 },
  { min: 8, max: 9, weeks: 14 },
  { min: 9, max: 10, weeks: 16 },
  { min: 10, max: 999, weeks: 12 }, // capped at 12 for 10+ years (NES cap)
]

// Actually NES caps at 16 weeks for 9-10, then no further increase
const NES_TABLE = [
  { years: 1, weeks: 4 },
  { years: 2, weeks: 6 },
  { years: 3, weeks: 7 },
  { years: 4, weeks: 8 },
  { years: 5, weeks: 10 },
  { years: 6, weeks: 11 },
  { years: 7, weeks: 13 },
  { years: 8, weeks: 14 },
  { years: 9, weeks: 16 },
  { years: 10, weeks: 16 }, // NES caps at 16 weeks
]

export default function RedundancyEstimator() {
  const [yearsOfService, setYearsOfService] = useState(5)
  const [weeklyEarnings, setWeeklyEarnings] = useState(1500)
  const [annualLeaveWeeks, setAnnualLeaveWeeks] = useState(3)
  const [noticePeriodWeeks, setNoticePeriodWeeks] = useState(4)

  const result = useMemo(() => {
    const completedYears = Math.floor(yearsOfService)
    const row = NES_TABLE.find(r => r.years === Math.min(completedYears, 10)) || NES_TABLE[NES_TABLE.length - 1]
    const redundancyWeeks = completedYears >= 1 ? (completedYears >= 10 ? 16 : row.weeks) : 0
    const redundancyPay = redundancyWeeks * weeklyEarnings
    const annualLeavePayout = annualLeaveWeeks * weeklyEarnings
    const noticePay = noticePeriodWeeks * weeklyEarnings
    const total = redundancyPay + annualLeavePayout + noticePay
    // Tax-free limit (approx 2025 - verify at ato.gov.au)
    const taxFreeBase = 11985
    const taxFreePerYear = 5994
    const taxFreeLimit = taxFreeBase + taxFreePerYear * completedYears
    const taxableRedundancy = Math.max(0, redundancyPay - taxFreeLimit)
    return { redundancyWeeks, redundancyPay, annualLeavePayout, noticePay, total, taxFreeLimit, taxableRedundancy }
  }, [yearsOfService, weeklyEarnings, annualLeaveWeeks, noticePeriodWeeks])

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-3">
          {[
            { label: 'Years of Continuous Service', value: yearsOfService, set: setYearsOfService, step: 0.5, max: 20 },
            { label: 'Weekly Ordinary Time Earnings ($)', value: weeklyEarnings, set: setWeeklyEarnings },
            { label: 'Accrued Annual Leave (weeks)', value: annualLeaveWeeks, set: setAnnualLeaveWeeks, step: 0.5 },
            { label: 'Notice Period (weeks)', value: noticePeriodWeeks, set: setNoticePeriodWeeks },
          ].map(({ label, value, set, step = 1, max = 999 }) => (
            <div key={label}>
              <label className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>
              <input type="number" value={value} step={step} min={0} max={max} onChange={e => set(Number(e.target.value))}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2B5B]" />
            </div>
          ))}
        </div>

        <div>
          <div className="bg-[#0F2B5B] text-white rounded-xl p-5 mb-4">
            <div className="text-white/70 text-sm mb-1">Total Estimated Payout</div>
            <div className="text-4xl font-bold" style={{ fontFamily: 'DM Sans' }}>{fmt(result.total)}</div>
          </div>

          <div className="bg-white border border-gray-100 rounded-xl p-4 space-y-2 text-sm mb-3">
            <div className="flex justify-between">
              <span className="text-gray-500">Redundancy pay ({result.redundancyWeeks} weeks)</span>
              <span className="font-medium">{fmt(result.redundancyPay)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Annual leave payout</span>
              <span className="font-medium">{fmt(result.annualLeavePayout)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Notice pay</span>
              <span className="font-medium">{fmt(result.noticePay)}</span>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-xs text-green-700 mb-2">
            <strong>Tax-free limit (approx):</strong> {fmt(result.taxFreeLimit)} for genuine redundancy. Redundancy pay above this is taxed at a concessional rate. Annual leave and PILON are taxed at marginal rates. Verify at ato.gov.au.
          </div>

          <div className="bg-gray-50 rounded-xl p-3 text-xs text-gray-500">
            NES minimum redundancy scale based on Fair Work Act. Enterprise agreements or contracts may provide more. Employees of small businesses (under 15 employees) are not entitled to redundancy pay.
          </div>
        </div>
      </div>
      <p className="text-xs text-gray-400 mt-3">General estimate only. Verify tax-free limits and entitlements at ato.gov.au and fairwork.gov.au. Not financial or legal advice.</p>
    </div>
  )
}
