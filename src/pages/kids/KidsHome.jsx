import { Link } from 'react-router-dom'
import { KIDS_MODULES } from '../../data/kidsModules'

export default function KidsHome() {
  return (
    <div>
      {/* Hero */}
      <div className="relative overflow-hidden py-16 px-4 text-center">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-8 left-[10%] text-5xl opacity-20 animate-bounce" style={{ animationDelay: '0s' }}>💰</div>
          <div className="absolute top-16 right-[15%] text-4xl opacity-20 animate-bounce" style={{ animationDelay: '0.3s' }}>🌟</div>
          <div className="absolute bottom-8 left-[20%] text-3xl opacity-20 animate-bounce" style={{ animationDelay: '0.6s' }}>📈</div>
          <div className="absolute bottom-12 right-[10%] text-4xl opacity-20 animate-bounce" style={{ animationDelay: '0.9s' }}>🎯</div>
        </div>

        <div className="relative max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-1.5 rounded-full text-sm font-bold mb-6">
            <span>🐷</span> Free for kids of Wages to Wealth members
          </div>

          <h1 className="text-5xl font-black mb-4 leading-tight" style={{ fontFamily: 'DM Sans' }}>
            <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent">
              Learn about money
            </span>
            <br />
            <span className="text-gray-800">before school teaches you nothing</span>
          </h1>

          <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
            8 fun lessons on earning, saving, investing and avoiding money traps — built for teens aged 12–16. No boring textbooks. No jargon.
          </p>

          <Link to="/kids/modules"
            className="inline-block bg-gradient-to-r from-purple-600 to-pink-500 hover:opacity-90 text-white px-8 py-4 rounded-2xl font-black text-lg transition-opacity shadow-lg shadow-purple-200">
            Start Learning 🚀
          </Link>
        </div>
      </div>

      {/* Stats bar */}
      <div className="bg-white/70 backdrop-blur-sm border-y border-purple-100 py-6 mb-10">
        <div className="max-w-3xl mx-auto px-4 grid grid-cols-3 gap-4 text-center">
          {[
            { val: '8', label: 'Lessons', emoji: '📚' },
            { val: '40+', label: 'Quiz questions', emoji: '🧠' },
            { val: '100%', label: 'Free for employees\' kids', emoji: '🎁' },
          ].map(s => (
            <div key={s.label}>
              <div className="text-2xl font-black text-purple-700" style={{ fontFamily: 'DM Sans' }}>{s.emoji} {s.val}</div>
              <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Module cards */}
      <div className="max-w-5xl mx-auto px-4 mb-16">
        <h2 className="text-2xl font-black text-center text-gray-800 mb-2" style={{ fontFamily: 'DM Sans' }}>
          What you'll learn 👇
        </h2>
        <p className="text-center text-gray-500 text-sm mb-8">Click any lesson to start — no sign-up needed</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {KIDS_MODULES.map((m, i) => (
            <Link key={m.id} to={`/kids/modules/${m.slug}`}
              className="group relative bg-white rounded-2xl border-2 border-transparent hover:border-purple-300 shadow-sm hover:shadow-lg transition-all overflow-hidden">
              <div className={`h-2 w-full bg-gradient-to-r ${m.color}`} />
              <div className="p-5">
                <div className="text-3xl mb-2">{m.emoji}</div>
                <div className="text-xs font-bold text-purple-500 mb-1">Lesson {i + 1}</div>
                <h3 className="font-black text-gray-800 text-sm leading-snug mb-2 group-hover:text-purple-700 transition-colors" style={{ fontFamily: 'DM Sans' }}>
                  {m.title}
                </h3>
                <p className="text-xs text-gray-500 line-clamp-2">{m.tagline}</p>
                <div className="mt-3 text-purple-600 text-xs font-bold">Start lesson →</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Parent callout */}
      <div className="max-w-3xl mx-auto px-4 mb-12">
        <div className="bg-gradient-to-r from-[#0F2B5B] to-[#1a3d7c] text-white rounded-2xl p-8 text-center">
          <div className="text-3xl mb-3">👨‍👩‍👧‍👦</div>
          <h3 className="text-xl font-black mb-2" style={{ fontFamily: 'DM Sans' }}>For Parents</h3>
          <p className="text-white/70 text-sm max-w-lg mx-auto mb-4">
            Money School is a free benefit for children of employees at businesses using Wages to Wealth. All content is age-appropriate, ASIC-aligned general information, and reviewed for accuracy.
          </p>
          <Link to="/" className="inline-block bg-[#D4A017] text-[#0F2B5B] px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-yellow-400 transition-colors">
            Learn about Wages to Wealth →
          </Link>
        </div>
      </div>
    </div>
  )
}
