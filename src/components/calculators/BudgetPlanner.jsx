import { useState } from 'react'

const fmt = (n) => new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', maximumFractionDigits: 0 }).format(n)

const EXPENSE_CATEGORIES = [
  { key: 'rent', label: 'Rent/Mortgage', type: 'need' },
  { key: 'utilities', label: 'Utilities', type: 'need' },
  { key: 'groceries', label: 'Groceries', type: 'need' },
  { key: 'transport', label: 'Transport', type: 'need' },
  { key: 'insurance', label: 'Insurance', type: 'need' },
  { key: 'dining', label: 'Dining Out', type: 'want' },
  { key: 'entertainment', label: 'Entertainment', type: 'want' },
  { key: 'subscriptions', label: 'Subscriptions', type: 'want' },
  { key: 'clothing', label: 'Clothing', type: 'want' },
  { key: 'savings', label: 'Savings', type: 'saving' },
  { key: 'debt', label: 'Debt Repayments', type: 'saving' },
  { key: 'other', label: 'Other', type: 'need' },
]

const PERIODS = { weekly: 52, fortnightly: 26, monthly: 12 }

export default function BudgetPlanner() {
  const [period, setPeriod] = useState('monthly')
  const [income, setIncome] = useState(5000)
  const [expenses, setExpenses] = useState(Object.fromEntries(EXPENSE_CATEGORIES.map(c => [c.key, 0])))

  const mult = PERIODS[period]
  const annualIncome = income * mult
  const totalExpenses = Object.values(expenses).reduce((s, v) => s + Number(v), 0)
  const annualExpenses = totalExpenses * mult
  const surplus = income - totalExpenses

  const needs = EXPENSE_CATEGORIES.filter(c => c.type === 'need').reduce((s, c) => s + Number(expenses[c.key]), 0)
  const wants = EXPENSE_CATEGORIES.filter(c => c.type === 'want').reduce((s, c) => s + Number(expenses[c.key]), 0)
  const saving = EXPENSE_CATEGORIES.filter(c => c.type === 'saving').reduce((s, c) => s + Number(expenses[c.key]), 0)

  const pctOf = (v) => income > 0 ? Math.round((v / income) * 100) : 0

  return (
    <div>
      <div className="flex gap-2 mb-5">
        {Object.keys(PERIODS).map(p => (
          <button key={p} onClick={() => setPeriod(p)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold capitalize transition-colors ${period === p ? 'bg-[#0F2B5B] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
            {p}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              {period.charAt(0).toUpperCase() + period.slice(1)} Income (after tax)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-gray-500 text-sm">$</span>
              <input type="number" value={income} onChange={e => setIncome(Number(e.target.value))}
                className="w-full pl-7 pr-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F2B5B] text-sm" />
            </div>
          </div>

          <h4 className="text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Expenses</h4>
          <div className="space-y-2">
            {EXPENSE_CATEGORIES.map(c => (
              <div key={c.key} className="flex items-center gap-2">
                <span className="text-xs w-3 h-3 rounded-full flex-shrink-0 mt-0.5"
                  style={{ backgroundColor: c.type === 'need' ? '#0F2B5B' : c.type === 'want' ? '#D4A017' : '#22c55e' }} />
                <label className="text-sm text-gray-600 w-36 flex-shrink-0">{c.label}</label>
                <div className="relative flex-1">
                  <span className="absolute left-2 top-2 text-gray-400 text-xs">$</span>
                  <input type="number" value={expenses[c.key] || ''}
                    onChange={e => setExpenses(prev => ({ ...prev, [c.key]: Number(e.target.value) }))}
                    className="w-full pl-5 pr-2 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#0F2B5B]" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className={`rounded-xl p-5 mb-4 ${surplus >= 0 ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
            <div className="text-sm text-gray-500 mb-1">Monthly Surplus / Deficit</div>
            <div className={`text-3xl font-bold ${surplus >= 0 ? 'text-green-700' : 'text-red-700'}`} style={{ fontFamily: 'DM Sans' }}>
              {fmt(surplus)}
            </div>
            <div className="text-xs text-gray-500 mt-1">Annual: {fmt(surplus * mult)}</div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <h4 className="font-semibold text-sm text-gray-700 mb-3" style={{ fontFamily: 'DM Sans' }}>50/30/20 Analysis</h4>
            {[
              { label: 'Needs', value: needs, target: 50, color: '#0F2B5B' },
              { label: 'Wants', value: wants, target: 30, color: '#D4A017' },
              { label: 'Savings & Debt', value: saving, target: 20, color: '#22c55e' },
            ].map(row => {
              const pct = pctOf(row.value)
              const ok = pct <= row.target
              return (
                <div key={row.label} className="mb-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-600">{row.label}</span>
                    <span className={ok ? 'text-green-600' : 'text-orange-600'}>
                      {pct}% <span className="text-gray-400">(target: {row.target}%)</span>
                    </span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all" style={{ width: `${Math.min(pct, 100)}%`, backgroundColor: row.color }} />
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-3 text-xs text-gray-400 bg-gray-50 rounded-lg p-3">
            This calculator provides a general estimate only and is not financial advice. Actual results depend on your individual circumstances.
          </div>
        </div>
      </div>
    </div>
  )
}
