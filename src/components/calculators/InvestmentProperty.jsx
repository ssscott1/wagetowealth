import { useState, useMemo } from 'react'

const fmt = (n) => new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', maximumFractionDigits: 0 }).format(n)
const pct = (n) => `${n.toFixed(2)}%`

export default function InvestmentProperty() {
  const [price, setPrice] = useState(700000)
  const [weeklyRent, setWeeklyRent] = useState(600)
  const [loanRate, setLoanRate] = useState(6.5)
  const [deposit, setDeposit] = useState(140000)
  const [rates, setRates] = useState(2500)
  const [insurance, setInsurance] = useState(1500)
  const [management, setManagement] = useState(8)
  const [maintenance, setMaintenance] = useState(3000)
  const [taxRate, setTaxRate] = useState(37)

  const result = useMemo(() => {
    const annualRent = weeklyRent * 52
    const loanAmount = price - deposit
    const r = loanRate / 100 / 12
    const n = 30 * 12
    const monthlyRepayment = loanAmount * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
    const annualInterest = loanAmount * (loanRate / 100)
    const mgmtCost = annualRent * (management / 100)
    const totalExpenses = rates + insurance + mgmtCost + maintenance + annualInterest
    const netCashflow = annualRent - totalExpenses
    const taxSaving = netCashflow < 0 ? Math.abs(netCashflow) * (taxRate / 100) : 0
    const afterTaxCashflow = netCashflow + taxSaving
    const grossYield = (annualRent / price) * 100
    const netYield = ((annualRent - rates - insurance - mgmtCost - maintenance) / price) * 100

    return { annualRent, loanAmount, monthlyRepayment, annualInterest, totalExpenses, netCashflow, taxSaving, afterTaxCashflow, grossYield, netYield }
  }, [price, weeklyRent, loanRate, deposit, rates, insurance, management, maintenance, taxRate])

  return (
    <div>
      <div className="grid md:grid-cols-3 gap-4 mb-4">
        {[
          { label: 'Purchase Price ($)', value: price, set: setPrice },
          { label: 'Weekly Rent ($)', value: weeklyRent, set: setWeeklyRent },
          { label: 'Deposit ($)', value: deposit, set: setDeposit },
          { label: 'Loan Rate (% p.a.)', value: loanRate, set: setLoanRate, step: 0.1 },
          { label: 'Council Rates (annual $)', value: rates, set: setRates },
          { label: 'Insurance (annual $)', value: insurance, set: setInsurance },
          { label: 'Mgt Fee (%)', value: management, set: setManagement, step: 0.5 },
          { label: 'Maintenance (annual $)', value: maintenance, set: setMaintenance },
          { label: 'Marginal Tax Rate (%)', value: taxRate, set: setTaxRate },
        ].map(({ label, value, set, step = 1 }) => (
          <div key={label}>
            <label className="block text-xs font-semibold text-gray-600 mb-1">{label}</label>
            <input type="number" value={value} step={step} onChange={e => set(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2B5B]" />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Gross Yield', value: pct(result.grossYield), color: 'bg-blue-50 text-blue-800' },
          { label: 'Net Yield', value: pct(result.netYield), color: 'bg-indigo-50 text-indigo-800' },
          { label: 'Annual Cashflow', value: fmt(result.netCashflow), color: result.netCashflow >= 0 ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800' },
          { label: 'After-Tax Cashflow', value: fmt(result.afterTaxCashflow), color: result.afterTaxCashflow >= 0 ? 'bg-green-50 text-green-800' : 'bg-orange-50 text-orange-800' },
        ].map(({ label, value, color }) => (
          <div key={label} className={`rounded-xl p-4 ${color}`}>
            <div className="text-xs font-semibold mb-1 opacity-70">{label}</div>
            <div className="text-xl font-bold" style={{ fontFamily: 'DM Sans' }}>{value}</div>
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-400 mt-3">General estimate only. Does not constitute financial, tax, or investment advice. Consult a licensed adviser for your circumstances.</p>
    </div>
  )
}
