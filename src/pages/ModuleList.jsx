import { Link } from 'react-router-dom'
import { MODULES } from '../data/modules'

const CATEGORIES = ['Foundations', 'Property', 'Borrowing', 'Investing', 'Retirement']

export default function ModuleList() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#0F2B5B]" style={{ fontFamily: 'DM Sans' }}>Learning Modules</h1>
        <p className="text-gray-500 mt-2">10 modules covering every aspect of your financial life</p>
      </div>

      {CATEGORIES.map(cat => {
        const mods = MODULES.filter(m => m.category === cat)
        if (!mods.length) return null
        return (
          <div key={cat} className="mb-8">
            <h2 className="text-lg font-bold text-[#0F2B5B] mb-4 flex items-center gap-2" style={{ fontFamily: 'DM Sans' }}>
              <span className="w-1 h-5 bg-[#D4A017] rounded-full inline-block"></span>
              {cat}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {mods.map(m => (
                <Link key={m.id} to={`/modules/${m.slug}`}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md hover:border-[#0F2B5B]/20 transition-all group">
                  <div className="text-4xl mb-3">{m.icon}</div>
                  <h3 className="font-bold text-[#0F2B5B] mb-1 group-hover:text-[#D4A017] transition-colors" style={{ fontFamily: 'DM Sans' }}>{m.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">{m.description}</p>
                  <div className="mt-3 text-[#0F2B5B] text-sm font-semibold">Start module →</div>
                </Link>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
