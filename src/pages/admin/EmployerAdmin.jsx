import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { supabase } from '../../lib/supabase'
import { MODULES } from '../../data/modules'
import CircularProgress from '../../components/ui/CircularProgress'

const TOTAL_MODULES = 18
const PASS_THRESHOLD = 60
const WORKPLACE_IDS = [11, 12, 13, 14, 15, 16, 17, 18]
const GENERAL_IDS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

function timeAgo(dateStr) {
  const diff = (Date.now() - new Date(dateStr)) / 1000
  if (diff < 60) return 'just now'
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  return `${Math.floor(diff / 86400)}d ago`
}

function StatCard({ icon, value, label, sub, color = '#0F2B5B', highlight }) {
  return (
    <div className={`bg-white rounded-2xl border shadow-sm p-5 ${highlight ? 'border-[#D4A017]/40' : 'border-gray-100'}`}>
      <div className="text-2xl mb-2">{icon}</div>
      <div className="text-3xl font-bold mb-0.5" style={{ fontFamily: 'DM Sans', color }}>{value}</div>
      <div className="text-xs font-semibold text-gray-600">{label}</div>
      {sub && <div className="text-xs text-gray-400 mt-0.5">{sub}</div>}
    </div>
  )
}

function ProgressBar({ value, max, color = '#0F2B5B', label, right }) {
  const pct = max > 0 ? Math.min(100, Math.round((value / max) * 100)) : 0
  return (
    <div>
      <div className="flex justify-between text-xs text-gray-500 mb-1">
        <span>{label}</span>
        <span className="font-semibold" style={{ color: right ? undefined : color }}>{right || `${pct}%`}</span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, backgroundColor: color }} />
      </div>
    </div>
  )
}

export default function EmployerAdmin() {
  const { profile } = useAuth()
  const employer = profile?.employers
  const [tab, setTab] = useState('overview')
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)

  // Data state
  const [empList, setEmpList] = useState([])
  const [allAttempts, setAllAttempts] = useState([])
  const [hardshipCount, setHardshipCount] = useState(0)
  const [employeeDetail, setEmployeeDetail] = useState([])
  const [moduleStats, setModuleStats] = useState([])  // per-module engagement

  const inviteLink = employer?.id
    ? `${window.location.origin}/register/employee?employer=${employer.id}`
    : ''

  const loadData = useCallback(async () => {
    if (!employer?.id) return
    setLoading(true)

    const { data: emps } = await supabase
      .from('employees')
      .select('id, email, preferred_name, onboarded_at, literacy_score')
      .eq('employer_id', employer.id)

    const employees = emps || []
    const empIds = employees.map(e => e.id)

    const [attemptsRes, hardshipRes] = await Promise.all([
      empIds.length
        ? supabase.from('quiz_attempts')
            .select('id, employee_id, module_id, score, completed_at')
            .in('employee_id', empIds)
            .order('completed_at', { ascending: false })
        : { data: [] },
      empIds.length
        ? supabase.from('hardship_referrals').select('id').in('employee_id', empIds)
        : { data: [] },
    ])

    const attempts = attemptsRes.data || []
    setHardshipCount((hardshipRes.data || []).length)

    // Per-employee detail map
    const detailMap = {}
    employees.forEach(e => {
      detailMap[e.id] = { ...e, bestByModule: {}, quizAttempts: 0, lastActive: null }
    })
    attempts.forEach(a => {
      const d = detailMap[a.employee_id]
      if (!d) return
      d.quizAttempts++
      d.bestByModule[a.module_id] = Math.max(d.bestByModule[a.module_id] || 0, a.score)
      if (!d.lastActive || a.completed_at > d.lastActive) d.lastActive = a.completed_at
    })

    const detail = Object.values(detailMap).map(d => ({
      ...d,
      modulesCompleted: Object.values(d.bestByModule).filter(s => s >= PASS_THRESHOLD).length,
      modulesStarted: Object.keys(d.bestByModule).length,
    }))

    // Per-module stats: how many employees attempted / passed each module
    const mStats = MODULES.map(m => {
      const attempters = new Set(attempts.filter(a => a.module_id === m.id).map(a => a.employee_id))
      const passers = Object.values(detailMap).filter(d => (d.bestByModule[m.id] || 0) >= PASS_THRESHOLD)
      return {
        ...m,
        attempted: attempters.size,
        passed: passers.length,
        attemptPct: employees.length > 0 ? Math.round((attempters.size / employees.length) * 100) : 0,
        passPct: employees.length > 0 ? Math.round((passers.length / employees.length) * 100) : 0,
      }
    })

    setEmpList(employees)
    setAllAttempts(attempts)
    setEmployeeDetail(detail.sort((a, b) => b.modulesCompleted - a.modulesCompleted))
    setModuleStats(mStats)
    setLoading(false)
  }, [employer?.id])

  useEffect(() => { loadData() }, [loadData])

  // Derived stats
  const enrolled = empList.length
  const activeLearners = employeeDetail.filter(e => e.modulesCompleted >= 1).length
  const engaged = employeeDetail.filter(e => e.modulesCompleted >= 3).length
  const avgScore = enrolled > 0
    ? Math.round(empList.reduce((s, e) => s + (e.literacy_score || 0), 0) / enrolled)
    : 0
  const totalAttempts = allAttempts.length
  const workplacePassed = new Set(
    allAttempts.filter(a => WORKPLACE_IDS.includes(a.module_id) && (
      (employeeDetail.find(e => e.id === a.employee_id)?.bestByModule?.[a.module_id] || 0) >= PASS_THRESHOLD
    )).map(a => a.employee_id)
  ).size

  const engagementRate = enrolled > 0 ? Math.round((activeLearners / enrolled) * 100) : 0
  const activeRate = enrolled > 0 ? Math.round((engaged / enrolled) * 100) : 0
  const workplaceRate = enrolled > 0 ? Math.round((workplacePassed / enrolled) * 100) : 0

  // Health score: weighted composite (engagement 40%, avg score 40%, workplace 20%)
  const healthScore = Math.round(engagementRate * 0.4 + avgScore * 0.4 + workplaceRate * 0.2)
  const healthLabel = healthScore >= 70 ? 'Thriving' : healthScore >= 50 ? 'Growing' : healthScore >= 30 ? 'Getting Started' : 'Just Beginning'
  const healthColor = healthScore >= 70 ? '#22c55e' : healthScore >= 50 ? '#D4A017' : healthScore >= 30 ? '#f97316' : '#9ca3af'

  // Recent activity (anonymous)
  const recentActivity = allAttempts.slice(0, 8).map(a => ({
    module: MODULES.find(m => m.id === a.module_id),
    score: a.score,
    at: a.completed_at,
  })).filter(a => a.module)

  // Top modules (by pass rate) and lowest modules
  const sortedByPass = [...moduleStats].sort((a, b) => b.passPct - a.passPct)
  const topModules = sortedByPass.filter(m => m.attempted > 0).slice(0, 5)
  const lowModules = sortedByPass.filter(m => m.attempted > 0).reverse().slice(0, 3)

  const copyLink = () => {
    navigator.clipboard.writeText(inviteLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const TABS = [
    { key: 'overview', label: '📊 Overview' },
    { key: 'insights', label: '💡 Insights' },
    { key: 'employees', label: `👥 Team (${enrolled})` },
    { key: 'invite', label: '📨 Invite' },
  ]

  const subStatus = employer?.subscription_status || 'pending'
  const subStyles = {
    active: 'bg-green-100 text-green-700',
    trial: 'bg-yellow-100 text-yellow-700',
    pending: 'bg-orange-100 text-orange-700',
    past_due: 'bg-red-100 text-red-700',
    cancelled: 'bg-gray-100 text-gray-500',
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">

      {/* Header */}
      <div className="bg-gradient-to-br from-[#0F2B5B] to-[#1a3d7c] text-white rounded-2xl p-6 mb-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <p className="text-white/50 text-xs uppercase tracking-widest mb-1">Employer Dashboard</p>
            <h1 className="text-2xl font-bold" style={{ fontFamily: 'DM Sans' }}>
              {employer?.name || 'Your Company'}
            </h1>
            <p className="text-white/60 text-sm mt-0.5">{employer?.domain}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className={`text-xs px-3 py-1.5 rounded-full font-bold capitalize ${subStyles[subStatus] || subStyles.pending}`}>
              {subStatus}
            </span>
            <button onClick={() => setTab('invite')}
              className="bg-[#D4A017] text-[#0F2B5B] px-4 py-2 rounded-xl text-sm font-bold hover:bg-yellow-400 transition-colors">
              + Invite Employees
            </button>
          </div>
        </div>

        {/* Quick metrics strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/10">
          {[
            { val: enrolled, label: 'Enrolled' },
            { val: `${activeLearners} (${engagementRate}%)`, label: 'Active Learners' },
            { val: avgScore, label: 'Avg Literacy Score' },
            { val: totalAttempts, label: 'Quiz Attempts' },
          ].map(s => (
            <div key={s.label} className="text-center">
              <div className="text-2xl font-black text-[#D4A017]" style={{ fontFamily: 'DM Sans' }}>{s.val}</div>
              <div className="text-xs text-white/50 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 border-b border-gray-200 overflow-x-auto">
        {TABS.map(t => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className={`px-4 py-2.5 text-sm font-semibold border-b-2 -mb-px whitespace-nowrap transition-colors ${
              tab === t.key ? 'border-[#0F2B5B] text-[#0F2B5B]' : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}>
            {t.label}
          </button>
        ))}
      </div>

      {loading && (
        <div className="flex items-center justify-center py-20 text-gray-400 text-sm">Loading team data…</div>
      )}

      {!loading && tab === 'overview' && (
        <div className="space-y-6">

          {/* Engagement funnel + health score */}
          <div className="grid md:grid-cols-3 gap-6">

            {/* Funnel rings */}
            <div className="md:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h3 className="font-bold text-[#0F2B5B] mb-1" style={{ fontFamily: 'DM Sans' }}>Engagement Funnel</h3>
              <p className="text-xs text-gray-400 mb-6">How far along the learning journey is your team?</p>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: 'Enrolled', sub: 'Registered via invite', val: enrolled, max: enrolled, color: '#9ca3af' },
                  { label: 'Active Learners', sub: '≥1 module completed', val: activeLearners, max: enrolled, color: '#D4A017' },
                  { label: 'Engaged', sub: '≥3 modules completed', val: engaged, max: enrolled, color: '#0F2B5B' },
                ].map(f => (
                  <div key={f.label} className="flex flex-col items-center">
                    <CircularProgress value={f.val} max={f.max || 1} size={110} stroke={10} color={f.color}>
                      <span className="text-2xl font-bold text-[#0F2B5B]" style={{ fontFamily: 'DM Sans' }}>{f.val}</span>
                    </CircularProgress>
                    <p className="text-xs font-bold text-gray-700 mt-2 text-center">{f.label}</p>
                    <p className="text-[10px] text-gray-400 text-center">{f.sub}</p>
                    <p className="text-xs font-semibold mt-1" style={{ color: f.color }}>
                      {enrolled > 0 ? Math.round((f.val / enrolled) * 100) : 0}% of team
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Team health score */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col items-center justify-center">
              <h3 className="font-bold text-[#0F2B5B] text-sm mb-4" style={{ fontFamily: 'DM Sans' }}>Team Health Score</h3>
              <CircularProgress value={healthScore} max={100} size={130} stroke={12} color={healthColor}>
                <span className="text-3xl font-bold text-[#0F2B5B]" style={{ fontFamily: 'DM Sans' }}>{healthScore}</span>
                <span className="text-[10px] text-gray-400">/100</span>
              </CircularProgress>
              <p className="font-bold text-sm mt-3" style={{ color: healthColor }}>{healthLabel}</p>
              <p className="text-[10px] text-gray-400 text-center mt-1 max-w-[140px]">
                Weighted: engagement, avg score & workplace module completion
              </p>
            </div>
          </div>

          {/* Engagement bars */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-bold text-[#0F2B5B] mb-4" style={{ fontFamily: 'DM Sans' }}>Engagement Breakdown</h3>
            <div className="space-y-4">
              <ProgressBar value={activeLearners} max={enrolled} color="#0F2B5B"
                label="Employees who have completed ≥1 module"
                right={`${activeLearners} / ${enrolled} (${engagementRate}%)`} />
              <ProgressBar value={avgScore} max={100} color="#D4A017"
                label="Average Financial Literacy Score"
                right={`${avgScore} / 100`} />
              <ProgressBar value={workplacePassed} max={enrolled} color="#7c3aed"
                label="Employees who completed ≥1 workplace module (11–18)"
                right={`${workplacePassed} / ${enrolled} (${workplaceRate}%)`} />
              <ProgressBar value={hardshipCount} max={Math.max(1, enrolled)} color="#ef4444"
                label="Hardship support accesses (anonymous)"
                right={`${hardshipCount} referral${hardshipCount !== 1 ? 's' : ''}`} />
            </div>
          </div>

          {/* Module heatmap */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-bold text-[#0F2B5B]" style={{ fontFamily: 'DM Sans' }}>Module Completion Heatmap</h3>
              <div className="flex items-center gap-3 text-[10px] text-gray-400">
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-gray-100 inline-block" /> 0%</span>
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-yellow-200 inline-block" /> 25%+</span>
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-green-300 inline-block" /> 50%+</span>
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-green-500 inline-block" /> 75%+</span>
              </div>
            </div>
            <p className="text-xs text-gray-400 mb-5">% of your team who have passed each module (≥60% score)</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
              {moduleStats.map(m => {
                const pct = m.passPct
                const bg = pct >= 75 ? 'bg-green-100 border-green-300' :
                           pct >= 50 ? 'bg-green-50 border-green-200' :
                           pct >= 25 ? 'bg-yellow-50 border-yellow-200' :
                           m.attempted > 0 ? 'bg-orange-50 border-orange-200' :
                           'bg-gray-50 border-gray-200'
                const isWorkplace = WORKPLACE_IDS.includes(m.id)
                return (
                  <div key={m.id}
                    className={`rounded-xl border-2 p-3 text-center transition-all ${bg} ${isWorkplace ? 'ring-1 ring-[#D4A017]/30' : ''}`}
                    title={`${m.title}: ${m.passed} passed, ${m.attempted} attempted`}>
                    <div className="text-xl mb-1">{m.icon}</div>
                    <div className="text-[10px] font-medium text-gray-600 leading-tight mb-1">{m.title}</div>
                    <div className={`text-sm font-bold ${pct >= 50 ? 'text-green-700' : pct >= 25 ? 'text-yellow-700' : 'text-gray-400'}`}>
                      {pct}%
                    </div>
                    {isWorkplace && <div className="text-[9px] text-[#D4A017] font-bold mt-0.5">WORKPLACE</div>}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Category split */}
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { label: 'Workplace Modules (11–18)', ids: WORKPLACE_IDS, color: '#D4A017', bg: 'from-yellow-50 to-amber-50', tag: 'Duty of Care' },
              { label: 'General Finance (1–10)', ids: GENERAL_IDS, color: '#0F2B5B', bg: 'from-blue-50 to-indigo-50', tag: null },
            ].map(cat => {
              const catStats = moduleStats.filter(m => cat.ids.includes(m.id))
              const avgPass = catStats.length > 0
                ? Math.round(catStats.reduce((s, m) => s + m.passPct, 0) / catStats.length)
                : 0
              const topModule = catStats.reduce((best, m) => m.passPct > (best?.passPct || -1) ? m : best, null)
              return (
                <div key={cat.label} className={`rounded-2xl bg-gradient-to-br ${cat.bg} border border-gray-100 shadow-sm p-5`}>
                  <div className="flex items-center gap-2 mb-3">
                    <h3 className="font-bold text-[#0F2B5B] text-sm">{cat.label}</h3>
                    {cat.tag && <span className="ml-auto text-[10px] bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full font-bold">{cat.tag}</span>}
                  </div>
                  <div className="flex items-center gap-4">
                    <CircularProgress value={avgPass} max={100} size={80} stroke={8} color={cat.color}>
                      <span className="text-lg font-bold text-[#0F2B5B]">{avgPass}%</span>
                    </CircularProgress>
                    <div className="flex-1 text-sm text-gray-600 space-y-1">
                      <p className="text-xs text-gray-500">Avg pass rate across {catStats.length} modules</p>
                      {topModule && topModule.passPct > 0 && (
                        <p className="text-xs"><span className="font-semibold text-[#0F2B5B]">Top:</span> {topModule.icon} {topModule.title} ({topModule.passPct}%)</p>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {!loading && tab === 'insights' && (
        <div className="grid md:grid-cols-2 gap-6">

          {/* Recent activity feed */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-bold text-[#0F2B5B] mb-1" style={{ fontFamily: 'DM Sans' }}>Recent Team Activity</h3>
            <p className="text-xs text-gray-400 mb-4">Anonymous — individual identities are never shown</p>
            {recentActivity.length === 0 ? (
              <p className="text-sm text-gray-400 py-6 text-center">No activity yet. Share your invite link to get started.</p>
            ) : (
              <div className="space-y-3">
                {recentActivity.map((a, i) => {
                  const passed = a.score >= PASS_THRESHOLD
                  return (
                    <div key={i} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0 ${passed ? 'bg-green-100' : 'bg-orange-100'}`}>
                        {a.module.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-gray-700 truncate">A team member completed</p>
                        <p className="text-xs text-gray-500 truncate">{a.module.title}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className={`text-sm font-bold ${passed ? 'text-green-600' : 'text-orange-500'}`}>{a.score}%</p>
                        <p className="text-[10px] text-gray-400">{timeAgo(a.at)}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Top & low performers */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h3 className="font-bold text-[#0F2B5B] mb-1" style={{ fontFamily: 'DM Sans' }}>🏆 Most Completed Modules</h3>
              <p className="text-xs text-gray-400 mb-4">Modules your team is engaging with most</p>
              {topModules.length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-4">No data yet</p>
              ) : (
                <div className="space-y-3">
                  {topModules.map(m => (
                    <div key={m.id} className="flex items-center gap-3">
                      <span className="text-xl">{m.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between text-xs mb-0.5">
                          <span className="font-medium text-gray-700 truncate">{m.title}</span>
                          <span className="font-bold text-green-600 ml-2">{m.passPct}%</span>
                        </div>
                        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-green-400 rounded-full" style={{ width: `${m.passPct}%` }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h3 className="font-bold text-[#0F2B5B] mb-1" style={{ fontFamily: 'DM Sans' }}>⚠️ Needs Attention</h3>
              <p className="text-xs text-gray-400 mb-4">Modules with lowest engagement — consider promoting these</p>
              {lowModules.length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-4">No data yet</p>
              ) : (
                <div className="space-y-3">
                  {lowModules.map(m => (
                    <div key={m.id} className="flex items-center gap-3">
                      <span className="text-xl">{m.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between text-xs mb-0.5">
                          <span className="font-medium text-gray-700 truncate">{m.title}</span>
                          <span className="font-bold text-orange-500 ml-2">{m.passPct}%</span>
                        </div>
                        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-orange-300 rounded-full" style={{ width: `${Math.max(2, m.passPct)}%` }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Nudge template */}
          <div className="md:col-span-2 bg-gradient-to-br from-[#0F2B5B] to-[#1a3d7c] rounded-2xl p-6 text-white">
            <h3 className="font-bold mb-1" style={{ fontFamily: 'DM Sans' }}>📣 Nudge Your Team</h3>
            <p className="text-white/60 text-xs mb-4">Copy this email template to encourage participation</p>
            <div className="bg-white/10 rounded-xl p-4 text-sm text-white/80 whitespace-pre-wrap font-mono text-xs leading-relaxed mb-4">
{`Hi team,

We've launched Wages to Wealth — a free financial literacy
benefit for everyone at ${employer?.name || 'our company'}.

It covers 18 topics from budgeting and super, to salary
packaging, tax and how to understand your payslip.

👉 Get started here: ${inviteLink}

It takes 5 minutes to sign up and all your data is private.
We only see aggregate trends — never your individual results.

Your financial wellbeing matters to us.`}
            </div>
            <button
              onClick={() => { navigator.clipboard.writeText(`Hi team,\n\nWe've launched Wages to Wealth — a free financial literacy benefit for everyone at ${employer?.name || 'our company'}.\n\nIt covers 18 topics from budgeting and super, to salary packaging, tax and how to understand your payslip.\n\n👉 Get started here: ${inviteLink}\n\nIt takes 5 minutes to sign up and all your data is private. We only see aggregate trends — never your individual results.\n\nYour financial wellbeing matters to us.`); setCopied(true); setTimeout(() => setCopied(false), 2000) }}
              className="bg-[#D4A017] text-[#0F2B5B] px-5 py-2 rounded-xl text-sm font-bold hover:bg-yellow-400 transition-colors">
              {copied ? '✓ Copied!' : 'Copy Email Template'}
            </button>
          </div>
        </div>
      )}

      {!loading && tab === 'employees' && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="font-bold text-[#0F2B5B]" style={{ fontFamily: 'DM Sans' }}>
                {enrolled} Enrolled · {activeLearners} Active · {engaged} Engaged
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">Sorted by progress. Individual quiz scores are never shown.</p>
            </div>
            <button onClick={() => setTab('invite')}
              className="bg-[#0F2B5B] text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-[#1a3d7c] transition-colors self-start sm:self-auto whitespace-nowrap">
              + Invite More
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wide">
                <tr>
                  <th className="px-4 py-3 text-left">Employee</th>
                  <th className="px-4 py-3 text-left">Enrolled</th>
                  <th className="px-4 py-3 text-left">Progress</th>
                  <th className="px-4 py-3 text-left">Quiz Attempts</th>
                  <th className="px-4 py-3 text-left">Last Active</th>
                  <th className="px-4 py-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {employeeDetail.map(emp => {
                  const pct = Math.round((emp.modulesCompleted / TOTAL_MODULES) * 100)
                  const status = emp.modulesCompleted >= 3 ? 'Engaged'
                    : emp.modulesCompleted >= 1 ? 'Active'
                    : emp.quizAttempts > 0 ? 'In Progress'
                    : 'Enrolled'
                  const statusStyle = status === 'Engaged' ? 'bg-green-100 text-green-700'
                    : status === 'Active' ? 'bg-blue-100 text-blue-700'
                    : status === 'In Progress' ? 'bg-orange-100 text-orange-700'
                    : 'bg-gray-100 text-gray-500'
                  return (
                    <tr key={emp.id} className="border-t border-gray-50 hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div className="font-medium text-gray-700 text-sm">{emp.preferred_name || '—'}</div>
                        <div className="text-xs text-gray-400">{emp.email}</div>
                      </td>
                      <td className="px-4 py-3 text-gray-400 text-xs">
                        {emp.onboarded_at ? new Date(emp.onboarded_at).toLocaleDateString('en-AU') : '—'}
                      </td>
                      <td className="px-4 py-3 min-w-[120px]">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full transition-all ${pct >= 50 ? 'bg-green-400' : pct > 0 ? 'bg-[#D4A017]' : 'bg-gray-200'}`}
                              style={{ width: `${pct}%` }} />
                          </div>
                          <span className="text-xs font-semibold text-gray-600 w-12 text-right">
                            {emp.modulesCompleted}/{TOTAL_MODULES}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-xs font-semibold text-gray-600">
                        {emp.quizAttempts || <span className="text-gray-300">0</span>}
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-400">
                        {emp.lastActive ? timeAgo(emp.lastActive) : '—'}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${statusStyle}`}>
                          {status}
                        </span>
                      </td>
                    </tr>
                  )
                })}
                {employeeDetail.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-12 text-center">
                      <div className="text-3xl mb-2">👥</div>
                      <p className="text-gray-500 text-sm font-semibold">No employees yet</p>
                      <p className="text-gray-400 text-xs mt-1 mb-4">Share your invite link to get your team started</p>
                      <button onClick={() => setTab('invite')}
                        className="bg-[#0F2B5B] text-white px-5 py-2 rounded-xl text-sm font-semibold hover:bg-[#1a3d7c] transition-colors">
                        Get Invite Link →
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {!loading && tab === 'invite' && (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-bold text-[#0F2B5B] mb-1" style={{ fontFamily: 'DM Sans' }}>Your Invite Link</h3>
            <p className="text-xs text-gray-400 mb-4">Share this with your employees. Anyone with the link can self-register under your organisation.</p>

            <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-xs text-gray-600 font-mono break-all mb-3">
              {inviteLink}
            </div>
            <button onClick={copyLink}
              className={`w-full py-3 rounded-xl text-sm font-bold transition-all ${copied ? 'bg-green-500 text-white' : 'bg-[#0F2B5B] text-white hover:bg-[#1a3d7c]'}`}>
              {copied ? '✓ Copied to Clipboard!' : 'Copy Invite Link'}
            </button>

            <div className="mt-5 pt-5 border-t border-gray-100 space-y-3">
              <h4 className="text-sm font-bold text-gray-700">Ways to share</h4>
              {[
                { icon: '📧', label: 'Email', desc: 'Paste into your next all-staff email or newsletter' },
                { icon: '💬', label: 'Slack / Teams', desc: 'Post in #general or #benefits channel' },
                { icon: '🌐', label: 'Intranet', desc: 'Add to your employee benefits or HR page' },
                { icon: '📋', label: 'Onboarding', desc: 'Include in new starter welcome packs' },
              ].map(s => (
                <div key={s.label} className="flex items-center gap-3 text-sm text-gray-600">
                  <span className="text-lg">{s.icon}</span>
                  <div>
                    <span className="font-semibold text-gray-700">{s.label}</span>
                    <span className="text-gray-400"> — {s.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            <div className="bg-[#0F2B5B] rounded-2xl p-6 text-white">
              <h3 className="font-bold mb-3" style={{ fontFamily: 'DM Sans' }}>What employees get</h3>
              <ul className="space-y-2.5">
                {[
                  '18 expert financial learning modules',
                  '17 live calculators (mortgage, super, budget & more)',
                  'A personal Financial Literacy Score out of 100',
                  'Gamified quizzes with instant feedback',
                  'Access to Money School for kids aged 12–16',
                  '🆘 Hardship support referrals when needed',
                ].map(item => (
                  <li key={item} className="flex items-start gap-2 text-sm text-white/80">
                    <span className="text-[#D4A017] font-bold mt-0.5 flex-shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
              <div className="flex items-start gap-2">
                <span className="text-amber-500 text-lg">🔒</span>
                <div>
                  <p className="text-sm font-bold text-amber-800 mb-1">Privacy by Design</p>
                  <p className="text-xs text-amber-700 leading-relaxed">
                    You see only aggregate, anonymous data — never individual scores, calculator inputs, or quiz answers. Employee data belongs to the employee.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Your stats</p>
              <div className="text-2xl font-bold text-[#0F2B5B]" style={{ fontFamily: 'DM Sans' }}>
                {enrolled} enrolled · {activeLearners} active
              </div>
              <p className="text-xs text-gray-400 mt-1">
                {enrolled === 0
                  ? 'Share the link above to get your first employee started.'
                  : engagementRate >= 50
                    ? `Great adoption! ${engagementRate}% of your team is actively learning.`
                    : `${engagementRate}% adoption so far — a nudge email usually boosts this significantly.`}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
