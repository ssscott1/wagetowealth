import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { supabase } from '../lib/supabase'
import { MODULES } from '../data/modules'
import LiteracyGauge from '../components/ui/LiteracyGauge'
import CircularProgress from '../components/ui/CircularProgress'
import { bestScoresByModule, TOTAL_MODULES, literacyTier } from '../lib/literacy'

const PASS_THRESHOLD = 60

const CALCULATORS = [
  { label: 'Budget', icon: '💰', slug: 'budget-planner' },
  { label: 'Mortgage', icon: '🏠', slug: 'mortgage-repayment' },
  { label: 'Savings', icon: '🎯', slug: 'savings-goal' },
  { label: 'Debt', icon: '💳', slug: 'debt-payoff' },
  { label: 'Super', icon: '🧓', slug: 'superannuation' },
]

export default function EmployeeDashboard() {
  const { user, profile } = useAuth()
  const [attempts, setAttempts] = useState([])
  const literacyScore = profile?.literacy_score || 0

  useEffect(() => {
    if (!profile?.id) return
    supabase.from('quiz_attempts')
      .select('id, module_id, score, completed_at')
      .eq('employee_id', profile.id)
      .order('completed_at', { ascending: false })
      .then(({ data }) => setAttempts(data || []))
  }, [profile?.id])

  const firstName = profile?.preferred_name || user?.email?.split('@')[0] || 'there'

  // Best score per module → a module counts as "completed" at >= 60%
  const bestByModule = bestScoresByModule(attempts)
  const completedModuleIds = Object.entries(bestByModule)
    .filter(([, score]) => score >= PASS_THRESHOLD)
    .map(([id]) => Number(id))
  const startedModuleIds = Object.keys(bestByModule).map(Number)
  const completedCount = completedModuleIds.length
  const progressPct = Math.round((completedCount / TOTAL_MODULES) * 100)

  const tier = literacyTier(literacyScore)

  // "Up Next" — first module not yet completed (prefer untouched, then in-progress)
  const upNext =
    MODULES.find(m => !startedModuleIds.includes(m.id)) ||
    MODULES.find(m => !completedModuleIds.includes(m.id)) ||
    null

  const recentAttempts = attempts.slice(0, 5)

  const ACHIEVEMENTS = [
    { icon: '🌱', label: 'First Steps', desc: 'Complete your first module', earned: completedCount >= 1 },
    { icon: '🔥', label: 'On a Roll', desc: 'Complete 5 modules', earned: completedCount >= 5 },
    { icon: '⭐', label: 'Perfect Score', desc: 'Get 100% on any quiz', earned: attempts.some(a => a.score === 100) },
    { icon: '🎓', label: 'Halfway Hero', desc: 'Complete 9 modules', earned: completedCount >= 9 },
    { icon: '🏆', label: 'Master', desc: 'Complete all 18 modules', earned: completedCount >= TOTAL_MODULES },
  ]
  const earnedCount = ACHIEVEMENTS.filter(a => a.earned).length

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Completion celebration banner */}
      {completedCount >= TOTAL_MODULES && (
        <div className="bg-gradient-to-r from-[#D4A017] to-yellow-400 rounded-2xl p-5 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
          <div className="flex items-center gap-4">
            <span className="text-4xl">🎓</span>
            <div>
              <h2 className="font-bold text-[#0F2B5B] text-lg" style={{ fontFamily: 'DM Sans' }}>You've completed the program!</h2>
              <p className="text-[#0F2B5B]/70 text-sm">Your Certificate of Completion is ready to download.</p>
            </div>
          </div>
          <Link to="/certificate"
            className="flex-shrink-0 bg-[#0F2B5B] text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-[#1a3d7c] transition-colors whitespace-nowrap">
            View Certificate →
          </Link>
        </div>
      )}

      {/* Welcome */}
      <div className="bg-[#0F2B5B] text-white rounded-2xl p-6 mb-6">
        <h1 className="text-2xl font-bold mb-1" style={{ fontFamily: 'DM Sans' }}>
          Welcome back, {firstName} 👋
        </h1>
        <p className="text-white/70 text-sm">
          {completedCount === 0
            ? "Let's get started on your first module"
            : completedCount === TOTAL_MODULES
              ? "You've completed every module — incredible work! 🏆"
              : `You've completed ${completedCount} of ${TOTAL_MODULES} modules. Keep it up!`}
        </p>
      </div>

      {/* Top stat row */}
      <div className="grid md:grid-cols-3 gap-6 mb-6">
        {/* Literacy score */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col items-center">
          <h2 className="font-bold text-[#0F2B5B] text-sm uppercase tracking-wide mb-4">Financial Literacy Score</h2>
          <LiteracyGauge score={literacyScore} />
          <p className="mt-3 text-center text-xs text-gray-400 max-w-[14rem]">
            Grows as you complete modules and improve your quiz scores across all {TOTAL_MODULES} topics.
          </p>
        </div>

        {/* Modules completed progress ring */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col items-center justify-center">
          <h2 className="font-bold text-[#0F2B5B] text-sm uppercase tracking-wide mb-4">Modules Completed</h2>
          <CircularProgress value={completedCount} max={TOTAL_MODULES} size={130} stroke={11} color={tier.color}>
            <span className="text-3xl font-bold text-[#0F2B5B]" style={{ fontFamily: 'DM Sans' }}>{completedCount}</span>
            <span className="text-xs text-gray-400">of {TOTAL_MODULES}</span>
          </CircularProgress>
          <p className="mt-3 text-center text-xs font-semibold" style={{ color: tier.color }}>{progressPct}% complete</p>
        </div>

        {/* Up next */}
        <div className="bg-gradient-to-br from-[#0F2B5B] to-[#1a3d7c] rounded-2xl shadow-sm p-6 flex flex-col text-white">
          <h2 className="font-bold text-sm uppercase tracking-wide mb-3 text-white/70">
            {completedCount === 0 ? 'Start Here' : 'Up Next'}
          </h2>
          {upNext ? (
            <>
              <div className="text-4xl mb-2">{upNext.icon}</div>
              <div className="text-xs text-[#D4A017] font-semibold uppercase tracking-wide mb-0.5">{upNext.category}</div>
              <h3 className="font-bold text-lg leading-tight mb-2" style={{ fontFamily: 'DM Sans' }}>{upNext.title}</h3>
              <p className="text-white/60 text-xs mb-4 flex-1">{upNext.description}</p>
              <Link to={`/modules/${upNext.slug}`}
                className="bg-[#D4A017] text-[#0F2B5B] px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-yellow-400 transition-colors text-center">
                {startedModuleIds.includes(upNext.id) ? 'Continue →' : 'Start Module →'}
              </Link>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <div className="text-4xl mb-2">🏆</div>
              <p className="text-sm text-white/80 font-semibold">All modules complete!</p>
              <p className="text-white/50 text-xs mt-1 mb-4">Your certificate is ready to download.</p>
              <Link to="/certificate"
                className="bg-[#D4A017] text-[#0F2B5B] px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-yellow-400 transition-colors">
                View Certificate 🎓
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bold text-[#0F2B5B] text-sm uppercase tracking-wide">Achievements</h2>
          <span className="text-xs text-gray-400 font-semibold">{earnedCount} / {ACHIEVEMENTS.length} unlocked</span>
        </div>
        <div className="grid grid-cols-5 gap-2">
          {ACHIEVEMENTS.map(a => (
            <div key={a.label}
              title={a.desc}
              className={`rounded-xl p-3 text-center transition-all ${a.earned ? 'bg-yellow-50 border-2 border-[#D4A017]/40' : 'bg-gray-50 border-2 border-transparent opacity-50'}`}>
              <div className={`text-2xl mb-1 ${a.earned ? '' : 'grayscale'}`}>{a.icon}</div>
              <div className="text-xs font-semibold text-gray-600 leading-tight">{a.label}</div>
              <div className="text-[10px] text-gray-400 mt-0.5 leading-tight hidden sm:block">{a.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Calculators */}
      <div className="bg-gradient-to-r from-[#0F2B5B] to-[#1a3d7c] rounded-2xl p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-bold text-white text-base" style={{ fontFamily: 'DM Sans' }}>17 Live Calculators</h2>
            <p className="text-white/60 text-xs mt-0.5">Mortgage, super, salary packaging, debt payoff and more — all instant, all private</p>
          </div>
          <Link to="/calculators" className="text-[#D4A017] text-sm font-bold hover:underline whitespace-nowrap">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {CALCULATORS.map(c => (
            <Link key={c.slug} to={`/calculators#${c.slug}`}
              className="flex flex-col items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/10 hover:border-[#D4A017]/50 px-3 py-4 rounded-xl transition-all text-center group">
              <span className="text-2xl">{c.icon}</span>
              <span className="text-white text-xs font-semibold group-hover:text-[#D4A017] transition-colors">{c.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Module progress grid */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
        <h2 className="font-bold text-[#0F2B5B] text-sm uppercase tracking-wide mb-4">All Modules</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {MODULES.map(m => {
            const best = bestByModule[m.id]
            const done = best >= PASS_THRESHOLD
            const inProgress = best !== undefined && best < PASS_THRESHOLD
            return (
              <Link key={m.id} to={`/modules/${m.slug}`}
                className={`relative rounded-xl p-3 text-center transition-all hover:shadow-md ${
                  done ? 'bg-green-50 border-2 border-green-300'
                    : inProgress ? 'bg-yellow-50 border-2 border-yellow-200'
                    : 'bg-gray-50 border-2 border-transparent hover:border-gray-200'
                }`}>
                <div className="text-2xl mb-1">{m.icon}</div>
                <div className="text-xs font-medium text-gray-600 leading-tight">{m.title}</div>
                {done && <div className="text-green-600 text-xs mt-1 font-semibold">✓ {best}%</div>}
                {inProgress && <div className="text-yellow-600 text-xs mt-1 font-semibold">{best}% · retry</div>}
              </Link>
            )
          })}
        </div>
      </div>

      {/* Kids section callout */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-500 rounded-2xl p-5 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="text-white font-bold text-base mb-0.5" style={{ fontFamily: 'DM Sans' }}>🐷 Money School for Kids</div>
          <p className="text-white/80 text-sm">Free for your children aged 12–16 — 8 fun lessons on money, saving and investing.</p>
        </div>
        <Link to="/kids" className="flex-shrink-0 bg-white text-purple-700 px-4 py-2.5 rounded-xl font-bold text-sm hover:bg-purple-50 transition-colors whitespace-nowrap">
          Share with your kids →
        </Link>
      </div>

      {/* Recent quiz results */}
      {recentAttempts.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h2 className="font-bold text-[#0F2B5B] text-sm uppercase tracking-wide mb-3">Recent Quiz Results</h2>
          <div className="space-y-2">
            {recentAttempts.map(a => {
              const mod = MODULES.find(m => m.id === a.module_id)
              const color = a.score >= 80 ? 'text-green-600' : a.score >= 60 ? 'text-yellow-600' : 'text-red-600'
              return (
                <div key={a.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                  <div className="flex items-center gap-2">
                    <span>{mod?.icon || '📝'}</span>
                    <span className="text-sm font-medium">{mod?.title || 'Unknown Module'}</span>
                    {a.completed_at && (
                      <span className="text-xs text-gray-400 hidden sm:inline">
                        · {new Date(a.completed_at).toLocaleDateString('en-AU')}
                      </span>
                    )}
                  </div>
                  <div className={`font-bold text-sm ${color}`}>{a.score}%</div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
