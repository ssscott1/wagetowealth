import { useState } from 'react'

export default function KidsSuperProjection() {
  const [salary, setSalary] = useState('60000')
  const [startAge, setStartAge] = useState('18')
  const [retireAge, setRetireAge] = useState('67')

  const s = parseFloat(salary) || 0
  const start = parseInt(startAge) || 18
  const retire = parseInt(retireAge) || 67
  const years = Math.max(0, retire - start)

  const sgRate = 0.12
  const annualContrib = s * sgRate
  const monthlyContrib = annualContrib / 12
  const r = 0.07 / 12
  const n = years * 12

  const balance = r > 0
    ? monthlyContrib * ((Math.pow(1 + r, n) - 1) / r)
    : monthlyContrib * n

  const totalContrib = annualContrib * years
  const growth = balance - totalContrib

  return (
    <div className="bg-white rounded-2xl border-2 border-purple-100 p-6 max-w-lg mx-auto">
      <div className="flex items-center gap-2 mb-5">
        <span className="text-2xl">🧓</span>
        <h3 className="font-black text-purple-700 text-lg" style={{ fontFamily: 'DM Sans' }}>Super Balance Estimator</h3>
      </div>
      <p className="text-xs text-gray-500 mb-4">See how much super you could have by the time you retire (assumes 12% SGC, 7% p.a. growth)</p>

      <div className="space-y-3 mb-6">
        {[
          { label: 'Starting annual salary ($)', val: salary, set: setSalary, prefix: '$' },
          { label: 'Age you start working', val: startAge, set: setStartAge, prefix: null },
          { label: 'Retirement age', val: retireAge, set: setRetireAge, prefix: null },
        ].map(({ label, val, set, prefix }) => (
          <div key={label}>
            <label className="block text-sm text-gray-600 mb-1">{label}</label>
            <div className="relative">
              {prefix && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">{prefix}</span>}
              <input type="number" min="0" value={val}
                onChange={e => set(e.target.value)}
                className={`w-full py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-purple-400 ${prefix ? 'pl-7 pr-3' : 'px-3'}`} />
            </div>
          </div>
        ))}
      </div>

      {years > 0 && s > 0 && (
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4">
          <div className="text-center mb-4">
            <div className="text-3xl font-black text-purple-700 mb-0.5" style={{ fontFamily: 'DM Sans' }}>
              ${Math.round(balance).toLocaleString()}
            </div>
            <div className="text-xs text-gray-500">Estimated super balance at age {retire}</div>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            {[
              { label: 'Years of super', val: `${years} yrs` },
              { label: 'Employer contributes', val: `$${Math.round(annualContrib / 1000)}k/yr` },
              { label: 'Investment growth', val: `+$${Math.round(growth / 1000)}k` },
            ].map(r => (
              <div key={r.label} className="bg-white rounded-lg p-2">
                <div className="font-black text-gray-700">{r.val}</div>
                <div className="text-gray-400">{r.label}</div>
              </div>
            ))}
          </div>

          <p className="text-xs text-center text-purple-600 font-semibold mt-3">
            Starting super at {start} vs {start + 10} could mean ${Math.round(balance * 0.35 / 1000)}k more at retirement!
          </p>
        </div>
      )}
    </div>
  )
}
