import { useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { KIDS_MODULES } from '../../data/kidsModules'
import KidsQuiz from '../../components/kids/KidsQuiz'
import TeenBudget from '../../components/kids/calculators/TeenBudget'
import KidsSavingsGoal from '../../components/kids/calculators/KidsSavingsGoal'
import KidsCompoundGrowth from '../../components/kids/calculators/KidsCompoundGrowth'
import KidsSuperProjection from '../../components/kids/calculators/KidsSuperProjection'

const CALC_MAP = {
  'teen-budget': <TeenBudget />,
  'savings-goal': <KidsSavingsGoal />,
  'compound-growth': <KidsCompoundGrowth />,
  'super-projection': <KidsSuperProjection />,
}

function renderBody(text) {
  return text.split('\n').map((line, i) => {
    if (!line.trim()) return null
    const formatted = line
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/^- /, '• ')
    return (
      <p key={i} className="text-gray-600 text-sm leading-relaxed mb-2"
        dangerouslySetInnerHTML={{ __html: formatted }} />
    )
  })
}

export default function KidsModulePage() {
  const { slug } = useParams()
  const mod = KIDS_MODULES.find(m => m.slug === slug)
  const [tab, setTab] = useState('learn')

  if (!mod) return <Navigate to="/kids/modules" />

  const idx = KIDS_MODULES.indexOf(mod)
  const next = KIDS_MODULES[idx + 1]
  const prev = KIDS_MODULES[idx - 1]

  const tabs = ['learn', mod.calculator && 'try-it', 'quiz'].filter(Boolean)

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-gray-400 mb-5">
        <Link to="/kids" className="hover:text-purple-600">Money School</Link>
        <span>›</span>
        <Link to="/kids/modules" className="hover:text-purple-600">Lessons</Link>
        <span>›</span>
        <span className="text-gray-600">{mod.title}</span>
      </div>

      {/* Header */}
      <div className={`bg-gradient-to-r ${mod.color} rounded-2xl p-6 text-white mb-6 relative overflow-hidden`}>
        <div className="absolute right-4 top-2 text-6xl opacity-30">{mod.emoji}</div>
        <div className="relative">
          <div className="text-xs font-bold opacity-80 mb-1">Lesson {idx + 1} of {KIDS_MODULES.length} · {mod.readTime}</div>
          <h1 className="text-2xl font-black mb-1" style={{ fontFamily: 'DM Sans' }}>{mod.title}</h1>
          <p className="text-white/80 text-sm">{mod.tagline}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-gray-200 mb-6">
        {tabs.map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-4 py-2.5 text-sm font-bold capitalize border-b-2 -mb-px transition-colors ${tab === t ? 'border-purple-500 text-purple-700' : 'border-transparent text-gray-400 hover:text-gray-700'}`}>
            {t === 'learn' ? '📖 Learn' : t === 'try-it' ? '🧮 Try It' : '🧠 Quiz'}
          </button>
        ))}
      </div>

      {/* Learn tab */}
      {tab === 'learn' && (
        <div>
          <div className="space-y-6 mb-8">
            {mod.overview.map((section, i) => (
              <div key={i}>
                <h2 className="font-black text-gray-800 text-lg mb-3" style={{ fontFamily: 'DM Sans' }}>
                  {section.heading}
                </h2>
                <div>{renderBody(section.body)}</div>
              </div>
            ))}
          </div>

          {/* Key points */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-5 mb-6">
            <h3 className="font-black text-purple-700 mb-3" style={{ fontFamily: 'DM Sans' }}>
              🔑 Key Takeaways
            </h3>
            <ul className="space-y-2">
              {mod.keyPoints.map((p, i) => (
                <li key={i} className="flex gap-2 text-sm text-gray-700">
                  <span className="text-purple-500 mt-0.5 flex-shrink-0">✓</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex justify-center">
            <button onClick={() => setTab('quiz')}
              className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-8 py-3.5 rounded-xl font-black hover:opacity-90 transition-opacity">
              Test Your Knowledge 🧠
            </button>
          </div>
        </div>
      )}

      {/* Calculator tab */}
      {tab === 'try-it' && mod.calculator && (
        <div>
          <p className="text-sm text-gray-500 mb-6">Put the lesson into practice with this calculator.</p>
          {CALC_MAP[mod.calculator] || <p className="text-gray-400">Calculator coming soon.</p>}
        </div>
      )}

      {/* Quiz tab */}
      {tab === 'quiz' && (
        <KidsQuiz quiz={mod.quiz} moduleTitle={mod.title} />
      )}

      {/* Nav between modules */}
      <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
        {prev ? (
          <Link to={`/kids/modules/${prev.slug}`}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-purple-600 transition-colors">
            <span>←</span>
            <span>{prev.emoji} {prev.title}</span>
          </Link>
        ) : <div />}
        {next ? (
          <Link to={`/kids/modules/${next.slug}`}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-purple-600 transition-colors">
            <span>{next.emoji} {next.title}</span>
            <span>→</span>
          </Link>
        ) : (
          <Link to="/kids" className="flex items-center gap-2 text-sm text-purple-600 font-bold hover:opacity-80">
            🏠 Back to Money School
          </Link>
        )}
      </div>
    </div>
  )
}
