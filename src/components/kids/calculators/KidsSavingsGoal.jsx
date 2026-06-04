import { useState } from 'react'

export default function KidsSavingsGoal() {
  const [goal, setGoal] = useState('')
  const [saved, setSaved] = useState('')
  const [weekly, setWeekly] = useState('')

  const goalAmt = parseFloat(goal) || 0
  const savedAmt = parseFloat(saved) || 0
  const weeklyAmt = parseFloat(weekly) || 0
  const remaining = Math.max(0, goalAmt - savedAmt)
  const weeks = weeklyAmt > 0 ? Math.ceil(remaining / weeklyAmt) : null
  const pct = goalAmt > 0 ? Math.min(100, Math.round((savedAmt / goalAmt) * 100)) : 0

  const formatTime = (w) => {
    if (w <= 4) return `${w} week${w !== 1 ? 's' : ''}`
    if (w < 52) return `${Math.ceil(w / 4)} month${Math.ceil(w / 4) !== 1 ? 's' : ''}`
    return `${(w / 52).toFixed(1)} years`
  }

  return (
    <div className="bg-white rounded-2xl border-2 border-purple-100 p-6 max-w-lg mx-auto">
      <div className="flex items-center gap-2 mb-5">
        <span className="text-2xl">🎯</span>
        <h3 className="font-black text-purple-700 text-lg" style={{ fontFamily: 'DM Sans' }}>Savings Goal Tracker</h3>
      </div>

      <div className="space-y-4 mb-6">
        {[
          { label: "What I'm saving for (e.g. AirPods, a car, travel)", val: goal, set: setGoal, placeholder: '250' },
          { label: "I've already saved", val: saved, set: setSaved, placeholder: '0' },
          { label: "I can save each week", val: weekly, set: setWeekly, placeholder: '20' },
        ].map(({ label, val, set, placeholder }) => (
          <div key={label}>
            <label className="block text-sm text-gray-600 mb-1">{label}</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
              <input type="number" min="0" placeholder={placeholder} value={val}
                onChange={e => set(e.target.value)}
                className="w-full pl-7 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-purple-400" />
            </div>
          </div>
        ))}
      </div>

      {goalAmt > 0 && (
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4">
          <div className="flex justify-between text-xs text-gray-500 mb-1.5">
            <span>Progress</span>
            <span className="font-bold text-purple-700">{pct}% there!</span>
          </div>
          <div className="h-4 bg-white rounded-full overflow-hidden mb-4">
            <div className="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all"
              style={{ width: `${pct}%` }} />
          </div>

          <div className="grid grid-cols-2 gap-3 text-center">
            <div>
              <div className="text-lg font-black text-purple-700" style={{ fontFamily: 'DM Sans' }}>${remaining.toFixed(0)}</div>
              <div className="text-xs text-gray-500">Still needed</div>
            </div>
            <div>
              <div className="text-lg font-black text-pink-600" style={{ fontFamily: 'DM Sans' }}>
                {weeks ? formatTime(weeks) : '—'}
              </div>
              <div className="text-xs text-gray-500">Time to goal</div>
            </div>
          </div>

          {weeks && weeks <= 4 && (
            <div className="mt-3 text-center text-sm font-bold text-green-600">🎉 Almost there! Keep going!</div>
          )}
        </div>
      )}
    </div>
  )
}
