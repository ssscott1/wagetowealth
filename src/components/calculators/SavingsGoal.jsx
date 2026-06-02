import { useState, useMemo } from 'react'

const fmt = (n) => new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', maximumFractionDigits: 0 }).format(n)

export default function SavingsGoal() {
  const [goal, setGoal] = useState(50000)
  const [current, setCurrent] = useState(5000)
  const [monthly, setMonthly] = useState(1000)
  const [rate, setRate] = useState(4.5)

  const result = useMemo(() => {
    const r = rate / 100 / 12
    const needed = goal - current
    if (needed <= 0) return { months: 0, totalContributed: current, interest: 0 }
    if (r === 0) {
      const months = Math.ceil(needed / monthly)
      return { months, totalContributed: current + monthly * months, interest: 0 }
    }
    // FV = PV*(1+r)^n + PMT*((1+r)^n - 1)/r = goal
    // Solve for n numerically
    let balance = current
    let months = 0
    while (balance < goal && months < 1200) {
      balance = balance * (1 + r) + monthly
      months++
    }
    const interest = balance - current - monthly * months
    return { months, totalContributed: current + monthly * months, interest: Math.max(0, interest) }
  }, [goal, current, monthly, rate])

  const years = Math.floor(result.months / 12)
  const months = result.months % 12

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          {[
            { label: 'Savings Goal ($)', value: goal, set: setGoal },
            { label: 'Current Savings ($)', value: current, set: setCurrent },
            { label: 'Monthly Contribution ($)', value: monthly, set: setMonthly },
          ].map(({ label, value, set }) => (
            <div key={label}>
              <label className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>
              <input type="number" value={value} onChange={e => set(Number(e.target.value))}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2B5B]" />
            </div>
          ))}
          <div>
            <div className="flex justify-between mb-1.5">
              <label className="text-sm font-semibold text-gray-700">Interest Rate (% p.a.)</label>
              <span className="text-sm font-bold text-[#0F2B5B]">{rate}%</span>
            </div>
            <input type="range" min={0} max={10} step={0.1} value={rate} onChange={e => setRate(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-[#0F2B5B]" />
          </div>
        </div>

        <div>
          {result.months === 0 ? (
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
              <div className="text-4xl mb-2">🎉</div>
              <div className="text-lg font-bold text-green-700">You've already reached your goal!</div>
            </div>
          ) : (
            <div className="bg-[#0F2B5B] text-white rounded-xl p-6">
              <div className="text-white/70 text-sm mb-1">Time to Goal</div>
              <div className="text-4xl font-bold" style={{ fontFamily: 'DM Sans' }}>
                {years > 0 && `${years}y `}{months > 0 && `${months}m`}
              </div>
              <div className="mt-4 pt-4 border-t border-white/20 grid grid-cols-2 gap-3 text-sm">
                <div>
                  <div className="text-white/60 text-xs">Total Contributed</div>
                  <div className="font-semibold">{fmt(result.totalContributed)}</div>
                </div>
                <div>
                  <div className="text-white/60 text-xs">Interest Earned</div>
                  <div className="font-semibold">{fmt(result.interest)}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <p className="text-xs text-gray-400 mt-3">This calculator provides a general estimate only and is not financial advice.</p>
    </div>
  )
}
