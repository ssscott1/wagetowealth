import { Link } from 'react-router-dom'
import { MODULES } from '../data/modules'

const GENERAL_CATEGORIES = ['Foundations', 'Property', 'Borrowing', 'Investing', 'Retirement']

function ModuleCard({ m }) {
  return (
    <Link to={`/modules/${m.slug}`}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md hover:border-[#0F2B5B]/20 transition-all group">
      <div className="text-4xl mb-3">{m.icon}</div>
      <h3 className="font-bold text-[#0F2B5B] mb-1 group-hover:text-[#D4A017] transition-colors" style={{ fontFamily: 'DM Sans' }}>{m.title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">{m.description}</p>
      <div className="mt-3 text-[#0F2B5B] text-sm font-semibold">Start module →</div>
    </Link>
  )
}

export default function ModuleList() {
  const workplaceMods = MODULES.filter(m => m.category === 'Workplace')

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#0F2B5B]" style={{ fontFamily: 'DM Sans' }}>Learning Modules</h1>
        <p className="text-gray-500 mt-2">18 modules covering personal finance and your workplace financial life</p>
      </div>

      {/* Workplace modules — featured */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-1 h-6 bg-[#D4A017] rounded-full inline-block"></span>
          <h2 className="text-lg font-bold text-[#0F2B5B]" style={{ fontFamily: 'DM Sans' }}>Workplace & Employment</h2>
          <span className="text-xs bg-[#D4A017] text-[#0F2B5B] px-2 py-0.5 rounded-full font-bold">NEW</span>
        </div>
        <div className="bg-gradient-to-r from-[#0F2B5B]/5 to-[#D4A017]/5 border border-[#D4A017]/20 rounded-2xl p-4 mb-4 text-sm text-gray-600">
          🏢 These modules are unique to Wages to Wealth — covering the financial topics that matter most in the workplace, from reading your pay slip to understanding salary packaging, novated leases, and your entitlements.
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {workplaceMods.map(m => <ModuleCard key={m.id} m={m} />)}
        </div>
      </div>

      {/* General finance modules */}
      {GENERAL_CATEGORIES.map(cat => {
        const mods = MODULES.filter(m => m.category === cat)
        if (!mods.length) return null
        return (
          <div key={cat} className="mb-8">
            <h2 className="text-lg font-bold text-[#0F2B5B] mb-4 flex items-center gap-2" style={{ fontFamily: 'DM Sans' }}>
              <span className="w-1 h-5 bg-[#0F2B5B] rounded-full inline-block"></span>
              {cat}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {mods.map(m => <ModuleCard key={m.id} m={m} />)}
            </div>
          </div>
        )
      })}
    </div>
  )
}
