import { useState } from 'react'

const CATEGORIES = [
  { key: 'income', label: 'Weekly income / pocket money', emoji: '💰', color: 'green' },
  { key: 'food', label: 'Food & drinks (outside home)', emoji: '🍔', color: 'orange' },
  { key: 'transport', label: 'Transport', emoji: '🚌', color: 'blue' },
  { key: 'entertainment', label: 'Entertainment & apps', emoji: '🎮', color: 'purple' },
  { key: 'clothes', label: 'Clothes & shoes', emoji: '👟', color: 'pink' },
  { key: 'savings', label: 'Savings (pay yourself first!)', emoji: '🐷', color: 'teal' },
  { key: 'other', label: 'Everything else', emoji: '📦', color: 'gray' },
]

export default function TeenBudget() {
  const [values, setValues] = useState({ income: '', food: '', transport: '', entertainment: '', clothes: '', savings: '', other: '' })

  const income = parseFloat(values.income) || 0
  const spending = ['food', 'transport', 'entertainment', 'clothes', 'other'].reduce((s, k) => s + (parseFloat(values[k]) || 0), 0)
  const savings = parseFloat(values.savings) || 0
  const total = spending + savings
  const leftover = income - total

  return (
    <div className="bg-white rounded-2xl border-2 border-purple-100 p-6 max-w-lg mx-auto">
      <div className="flex items-center gap-2 mb-5">
        <span className="text-2xl">💰</span>
        <h3 className="font-black text-purple-700 text-lg" style={{ fontFamily: 'DM Sans' }}>Teen Budget Planner</h3>
      </div>
      <p className="text-xs text-gray-500 mb-4">Enter your weekly amounts to see where your money goes</p>

      <div className="space-y-3 mb-6">
        {CATEGORIES.map(c => (
          <div key={c.key} className="flex items-center gap-3">
            <span className="text-xl w-8 text-center">{c.emoji}</span>
            <label className="flex-1 text-sm text-gray-600">{c.label}</label>
            <div className="relative w-28">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
              <input type="number" min="0" placeholder="0"
                value={values[c.key]}
                onChange={e => setValues(v => ({ ...v, [c.key]: e.target.value }))}
                className="w-full pl-7 pr-2 py-2 border border-gray-200 rounded-lg text-sm text-right focus:outline-none focus:border-purple-400" />
            </div>
          </div>
        ))}
      </div>

      {income > 0 && (
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4">
          <div className="grid grid-cols-3 gap-3 text-center mb-3">
            {[
              { label: 'Income', val: income, color: 'text-green-600' },
              { label: 'Spending', val: spending, color: 'text-red-500' },
              { label: 'Savings', val: savings, color: 'text-purple-600' },
            ].map(row => (
              <div key={row.label}>
                <div className={`text-lg font-black ${row.color}`} style={{ fontFamily: 'DM Sans' }}>${row.val.toFixed(2)}</div>
                <div className="text-xs text-gray-500">{row.label}</div>
              </div>
            ))}
          </div>

          <div className={`text-center p-3 rounded-lg font-bold text-sm ${leftover >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {leftover >= 0
              ? `✅ You have $${leftover.toFixed(2)} left over each week!`
              : `⚠️ You're overspending by $${Math.abs(leftover).toFixed(2)} per week`}
          </div>

          {savings > 0 && income > 0 && (
            <div className="mt-2 text-xs text-center text-purple-600 font-semibold">
              You're saving {Math.round((savings / income) * 100)}% of your income 🐷
            </div>
          )}
        </div>
      )}
    </div>
  )
}
