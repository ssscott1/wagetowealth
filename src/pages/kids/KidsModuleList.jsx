import { Link } from 'react-router-dom'
import { KIDS_MODULES } from '../../data/kidsModules'

export default function KidsModuleList() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="text-center mb-10">
        <div className="text-5xl mb-3">📚</div>
        <h1 className="text-3xl font-black text-gray-800 mb-2" style={{ fontFamily: 'DM Sans' }}>
          All 8 Money Lessons
        </h1>
        <p className="text-gray-500">Pick any lesson and start learning. No login. No cost. Just money smarts.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        {KIDS_MODULES.map((m, i) => (
          <Link key={m.id} to={`/kids/modules/${m.slug}`}
            className="group bg-white rounded-2xl border-2 border-gray-100 hover:border-purple-300 shadow-sm hover:shadow-lg transition-all flex gap-4 p-5 overflow-hidden relative">
            <div className={`absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b ${m.color} rounded-l-2xl`} />
            <div className="pl-2 flex-shrink-0">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br flex items-center justify-center text-3xl" style={{ background: 'linear-gradient(135deg, #f3e8ff, #fce7f3)' }}>
                {m.emoji}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-purple-500">Lesson {i + 1}</span>
                <span className="text-xs text-gray-400">· {m.readTime}</span>
              </div>
              <h3 className="font-black text-gray-800 mb-1 leading-snug group-hover:text-purple-700 transition-colors" style={{ fontFamily: 'DM Sans' }}>
                {m.title}
              </h3>
              <p className="text-sm text-gray-500 line-clamp-2">{m.tagline}</p>
              <div className="mt-2 text-purple-600 text-xs font-bold">Start lesson →</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
