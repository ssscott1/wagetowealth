import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { supabase } from '../lib/supabase'
import { MODULES } from '../data/modules'
import LiteracyGauge from '../components/ui/LiteracyGauge'

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
      .select('*')
      .eq('employee_id', profile.id)
      .order('completed_at', { ascending: false })
      .limit(5)
      .then(({ data }) => setAttempts(data || []))
  }, [profile?.id])

  const completedModuleIds = [...new Set(attempts.map(a => a.module_id))]
  const firstName = user?.email?.split('@')[0] || 'there'

  const tier =
    literacyScore >= 90 ? 'Expert' :
    literacyScore >= 80 ? 'Confident' :
    literacyScore >= 60 ? 'Capable' :
    literacyScore >= 40 ? 'Building' : 'Beginner'

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Welcome */}
      <div className="bg-[#0F2B5B] text-white rounded-2xl p-6 mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold mb-1" style={{ fontFamily: 'DM Sans' }}>
            Welcome back, {firstName} 👋
          </h1>
          <p className="text-white/70 text-sm">Continue your financial literacy journey</p>
        </div>
        <Link to="/get-help" className="bg-red-500 hover:bg-red-600 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors flex-shrink-0">
          🆘 Get Help
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-6">
        {/* Score gauge */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col items-center">
          <h2 className="font-bold text-[#0F2B5B] text-sm uppercase tracking-wide mb-4">Financial Literacy Score</h2>
          <LiteracyGauge score={literacyScore} />
          <div className="mt-3 text-center">
            <span className="text-xs text-gray-400">{completedModuleIds.length} of {MODULES.length} modules completed</span>
          </div>
        </div>

        {/* Progress */}
        <div className="md:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-bold text-[#0F2B5B] text-sm uppercase tracking-wide mb-4">Module Progress</h2>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {MODULES.map(m => {
              const done = completedModuleIds.includes(m.id)
              return (
                <Link key={m.id} to={`/modules/${m.slug}`}
                  className={`rounded-xl p-3 text-center transition-all hover:shadow-md ${done ? 'bg-green-50 border-2 border-green-300' : 'bg-gray-50 border-2 border-transparent hover:border-gray-200'}`}>
                  <div className="text-2xl mb-1">{m.icon}</div>
                  <div className="text-xs font-medium text-gray-600 leading-tight">{m.title}</div>
                  {done && <div className="text-green-600 text-xs mt-1">✓ Done</div>}
                </Link>
              )
            })}
          </div>
        </div>
      </div>

      {/* Quick calculators */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-6">
        <h2 className="font-bold text-[#0F2B5B] text-sm uppercase tracking-wide mb-3">Quick Calculators</h2>
        <div className="flex gap-3 flex-wrap">
          {CALCULATORS.map(c => (
            <Link key={c.slug} to={`/calculators#${c.slug}`}
              className="flex items-center gap-2 bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-[#0F2B5B] px-4 py-2.5 rounded-xl text-sm font-medium transition-all">
              <span>{c.icon}</span><span>{c.label}</span>
            </Link>
          ))}
          <Link to="/calculators" className="text-[#0F2B5B] text-sm font-semibold px-4 py-2.5 hover:underline">
            All calculators →
          </Link>
        </div>
      </div>

      {/* Recent quiz results */}
      {attempts.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h2 className="font-bold text-[#0F2B5B] text-sm uppercase tracking-wide mb-3">Recent Quiz Results</h2>
          <div className="space-y-2">
            {attempts.map(a => {
              const mod = MODULES.find(m => m.id === a.module_id)
              const color = a.score >= 80 ? 'text-green-600' : a.score >= 60 ? 'text-yellow-600' : 'text-red-600'
              return (
                <div key={a.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                  <div className="flex items-center gap-2">
                    <span>{mod?.icon || '📝'}</span>
                    <span className="text-sm font-medium">{mod?.title || 'Unknown Module'}</span>
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
