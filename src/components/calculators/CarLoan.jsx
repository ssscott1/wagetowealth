import { useState, useMemo } from 'react'

const fmt = (n) => new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', maximumFractionDigits: 0 }).format(n)

export default function CarLoan() {
  const [carPrice, setCarPrice] = useState(35000)
  const [depositAmt, setDepositAmt] = useState(5000)
  const [rate, setRate] = useState(7.5)
  const [term, setTerm] = useState(5)
  const [balloon, setBalloon] = useState(0)

  const result = useMemo(() => {
    const loanAmount = carPrice - depositAmt
    const balloonAmt = loanAmount * (balloon / 100)
    const r = rate / 100 / 12
    const n = term * 12
    let monthly
    if (r === 0) {
      monthly = (loanAmount - balloonAmt) / n
    } else {
      monthly = (loanAmount - balloonAmt * Math.pow(1 + r, -n)) * r / (1 - Math.pow(1 + r, -n))
    }
    const totalPaid = monthly * n + balloonAmt + depositAmt
    const totalInterest = totalPaid - carPrice
    return { loanAmount, monthly, balloonAmt, totalPaid, totalInterest }
  }, [carPrice, depositAmt, rate, term, balloon])

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-3">
          {[
            { label: 'Car Price ($)', value: carPrice, set: setCarPrice },
            { label: 'Deposit ($)', value: depositAmt, set: setDepositAmt },
            { label: 'Interest Rate (% p.a.)', value: rate, set: setRate, step: 0.1 },
            { label: 'Loan Term (years)', value: term, set: setTerm, min: 1, max: 7 },
            { label: 'Balloon Payment (%)', value: balloon, set: setBalloon, max: 40 },
          ].map(({ label, value, set, step = 1, min = 0, max = 999999 }) => (
            <div key={label}>
              <label className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>
              <input type="number" value={value} step={step} min={min} max={max} onChange={e => set(Number(e.target.value))}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2B5B]" />
            </div>
          ))}
        </div>
        <div>
          <div className="bg-[#0F2B5B] text-white rounded-xl p-6">
            <div className="text-white/70 text-sm mb-1">Monthly Repayment</div>
            <div className="text-4xl font-bold" style={{ fontFamily: 'DM Sans' }}>{fmt(result.monthly)}</div>
            <div className="mt-4 pt-4 border-t border-white/20 space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-white/60">Loan Amount</span><span>{fmt(result.loanAmount)}</span></div>
              {balloon > 0 && <div className="flex justify-between"><span className="text-white/60">Balloon Payment</span><span className="text-yellow-300">{fmt(result.balloonAmt)}</span></div>}
              <div className="flex justify-between"><span className="text-white/60">Total Interest</span><span className="text-red-300">{fmt(result.totalInterest)}</span></div>
              <div className="flex justify-between font-semibold border-t border-white/20 pt-2"><span>Total Cost</span><span>{fmt(result.totalPaid)}</span></div>
            </div>
          </div>
          {balloon > 0 && (
            <div className="mt-3 bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-700">
              <strong>Balloon payment:</strong> {fmt(result.balloonAmt)} due at end of term. Ensure you have a plan to pay this — via savings, refinancing, or selling the vehicle.
            </div>
          )}
        </div>
      </div>
      <p className="text-xs text-gray-400 mt-3">This calculator provides a general estimate only and is not a credit quote or financial advice.</p>
    </div>
  )
}
