import { useState, useMemo } from 'react'

const fmt = (n) => new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', maximumFractionDigits: 0 }).format(n)

function calcTax(income) {
  if (income <= 18200) return 0
  if (income <= 45000) return (income - 18200) * 0.16
  if (income <= 135000) return 4288 + (income - 45000) * 0.30
  if (income <= 190000) return 31288 + (income - 135000) * 0.37
  return 51638 + (income - 190000) * 0.45
}
function calcLITO(i) {
  if (i <= 37500) return 700
  if (i <= 45000) return 700 - (i - 37500) * 0.05
  if (i <= 66667) return 325 - (i - 45000) * 0.015
  return 0
}

export default function NovatedVsLoan() {
  const [vehiclePrice, setVehiclePrice] = useState(40000)
  const [salary, setSalary] = useState(90000)
  const [annualKm, setAnnualKm] = useState(15000)
  const [leaseTerm, setLeaseTerm] = useState(3)
  const [leaseRate, setLeaseRate] = useState(7.5)
  const [loanRate, setLoanRate] = useState(8.5)
  const [isEV, setIsEV] = useState(false)
  const [fuelCostPerL, setFuelCostPerL] = useState(2.00)
  const [fuelEfficiency, setFuelEfficiency] = useState(9) // L/100km

  const result = useMemo(() => {
    const r = leaseRate / 100 / 12
    const loanR = loanRate / 100 / 12
    const n = leaseTerm * 12
    const residual = vehiclePrice * 0.25 // approx 25% residual

    // Lease payment
    const leasePayment = (vehiclePrice - residual * Math.pow(1 + r, -n)) * r / (1 - Math.pow(1 + r, -n))

    // Annual running costs
    const annualFuel = isEV ? annualKm * 0.02 * 0.30 : (annualKm / 100) * fuelEfficiency * fuelCostPerL // EV: ~$0.006/km
    const annualReg = 800
    const annualInsurance = 1400
    const annualServicing = 600

    const annualRunning = annualFuel + annualReg + annualInsurance + annualServicing
    const annualLeaseRepayments = leasePayment * 12

    // Novated: pre-tax
    const totalNovatedPackage = annualLeaseRepayments + annualRunning
    const taxBeforeNovated = Math.max(0, calcTax(salary) - calcLITO(salary)) + salary * 0.02
    const taxAfterNovated = Math.max(0, calcTax(salary - totalNovatedPackage) - calcLITO(salary - totalNovatedPackage)) + (salary - totalNovatedPackage) * 0.02

    // EV: FBT exempt — no ECM post-tax contribution needed
    // Non-EV: employee contributes post-tax for personal use (statutory method ~20% of cost)
    const statutoryFBT = isEV ? 0 : vehiclePrice * 0.20
    const novatedTaxSaving = taxBeforeNovated - taxAfterNovated
    const annualNovatedNetCost = totalNovatedPackage - novatedTaxSaving + statutoryFBT

    // Car loan: post-tax
    const loanMonthly = vehiclePrice * (loanR * Math.pow(1 + loanR, n)) / (Math.pow(1 + loanR, n) - 1)
    const annualLoanCost = loanMonthly * 12 + annualRunning

    const annualSaving = annualLoanCost - annualNovatedNetCost
    const totalSavingOverTerm = annualSaving * leaseTerm

    return {
      annualNovatedNetCost,
      annualLoanCost,
      annualSaving,
      totalSavingOverTerm,
      leasePayment,
      loanMonthly,
      novatedTaxSaving,
      statutoryFBT,
    }
  }, [vehiclePrice, salary, annualKm, leaseTerm, leaseRate, loanRate, isEV, fuelCostPerL, fuelEfficiency])

  return (
    <div>
      <div className="grid md:grid-cols-3 gap-3 mb-4">
        {[
          { label: 'Vehicle Price ($)', value: vehiclePrice, set: setVehiclePrice },
          { label: 'Gross Annual Salary ($)', value: salary, set: setSalary },
          { label: 'Annual KM', value: annualKm, set: setAnnualKm },
          { label: 'Lease Term (years)', value: leaseTerm, set: setLeaseTerm, min: 1, max: 5 },
          { label: 'Lease Rate (% p.a.)', value: leaseRate, set: setLeaseRate, step: 0.1 },
          { label: 'Car Loan Rate (% p.a.)', value: loanRate, set: setLoanRate, step: 0.1 },
        ].map(({ label, value, set, step = 1, min = 0, max = 999999 }) => (
          <div key={label}>
            <label className="block text-xs font-semibold text-gray-600 mb-1">{label}</label>
            <input type="number" value={value} step={step} min={min} max={max} onChange={e => set(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2B5B]" />
          </div>
        ))}
      </div>

      <label className="flex items-center gap-3 cursor-pointer mb-4 p-3 bg-green-50 border border-green-200 rounded-xl">
        <input type="checkbox" checked={isEV} onChange={e => setIsEV(e.target.checked)} className="accent-[#0F2B5B] w-4 h-4" />
        <div>
          <div className="text-sm font-semibold text-green-800">🔋 Electric Vehicle (EV) or eligible PHEV</div>
          <div className="text-xs text-green-600">FBT-exempt — no personal-use FBT contribution required</div>
        </div>
      </label>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Novated Annual Net Cost', value: fmt(result.annualNovatedNetCost), color: 'bg-[#0F2B5B] text-white' },
          { label: 'Car Loan Annual Cost', value: fmt(result.annualLoanCost), color: 'bg-gray-100 text-gray-800' },
          { label: 'Annual Saving (Novated)', value: fmt(result.annualSaving), color: result.annualSaving > 0 ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200' },
          { label: `${leaseTerm}-Year Total Saving`, value: fmt(result.totalSavingOverTerm), color: result.totalSavingOverTerm > 0 ? 'bg-yellow-50 text-yellow-800 border border-yellow-200' : 'bg-gray-50 text-gray-600' },
        ].map(({ label, value, color }) => (
          <div key={label} className={`rounded-xl p-4 ${color}`}>
            <div className="text-xs opacity-70 mb-1">{label}</div>
            <div className="text-xl font-bold" style={{ fontFamily: 'DM Sans' }}>{value}</div>
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-400 mt-3">Simplified model. Actual novated lease costs depend on provider, FBT method, and employer policy. FBT-exempt EV eligibility subject to ATO criteria. Not financial advice.</p>
    </div>
  )
}
