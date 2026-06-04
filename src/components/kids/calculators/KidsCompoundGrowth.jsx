import { useState } from 'react'

export default function KidsCompoundGrowth() {
  const [start, setStart] = useState('1000')
  const [monthly, setMonthly] = useState('50')
  const [rate, setRate] = useState('8')
  const [years, setYears] = useState('10')

  const s = parseFloat(start) || 0
  const m = parseFloat(monthly) || 0
  const r = parseFloat(rate) / 100 / 12
  const n = parseInt(years) * 12

  const future = r > 0
    ? s * Math.pow(1 + r, n) + m * ((Math.pow(1 + r, n) - 1) / r)
    : s + m * n

  const totalContrib = s + m * n
  const growth = future - totalContrib

  return (
    <div className="bg-white rounded-2xl border-2 border-purple-100 p-6 max-w-lg mx-auto">
      <div className="flex items-center gap-2 mb-5">
        <span className="text-2xl">📈</span>
        <h3 className="font-black text-purple-700 text-lg" style={{ fontFamily: 'DM Sans' }}>Compound Growth Calculator</h3>
      </div>
      <p className="text-xs text-gray-500 mb-4">See how your money grows over time — the magic of compound interest!</p>

      <div className="grid grid-cols-2 gap-3 mb-6">
        {[
          { label: 'Starting amount ($)', val: start, set: setStart, prefix: '$' },
          { label: 'Monthly top-up ($)', val: monthly, set: setMonthly, prefix: '$' },
          { label: 'Annual return (%)', val: rate, set: setRate, prefix: '%', suffix: true },
          { label: 'Years to grow', val: years, set: setYears, prefix: null, placeholder: '10' },
        ].map(({ label, val, set, prefix, suffix }) => (
          <div key={label}>
            <label className="block text-xs text-gray-500 mb-1">{label}</label>
            <div className="relative">
              {!suffix && prefix && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">{prefix}</span>}
              <input type="number" min="0" value={val}
                onChange={e => set(e.target.value)}
                className={`w-full py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-purple-400 ${!suffix && prefix ? 'pl-6 pr-3' : 'px-3'}`} />
              {suffix && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">%</span>}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4">
        <div className="text-center mb-4">
          <div className="text-3xl font-black text-purple-700 mb-0.5" style={{ fontFamily: 'DM Sans' }}>
            ${Math.round(future).toLocaleString()}
          </div>
          <div className="text-xs text-gray-500">After {years} years</div>
        </div>

        <div className="grid grid-cols-2 gap-3 text-center">
          <div className="bg-white rounded-lg p-3">
            <div className="text-sm font-black text-gray-700">${Math.round(totalContrib).toLocaleString()}</div>
            <div className="text-xs text-gray-400">You put in</div>
          </div>
          <div className="bg-white rounded-lg p-3">
            <div className="text-sm font-black text-green-600">+${Math.round(growth).toLocaleString()}</div>
            <div className="text-xs text-gray-400">Free growth 🎉</div>
          </div>
        </div>

        {growth > 0 && (
          <p className="text-xs text-center text-purple-600 font-semibold mt-3">
            Compound interest added {Math.round((growth / totalContrib) * 100)}% extra on top of what you saved!
          </p>
        )}
      </div>
    </div>
  )
}
