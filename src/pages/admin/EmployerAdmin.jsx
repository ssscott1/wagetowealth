import { useState, useEffect } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { supabase } from '../../lib/supabase'

const WORKPLACE_MODULE_IDS = [11, 12, 13, 14, 15, 16, 17, 18]
const GENERAL_MODULE_IDS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const TOTAL_MODULES = 18

export default function EmployerAdmin() {
  const { profile } = useAuth()
  const employer = profile?.employers
  const [employees, setEmployees] = useState([])
  const [stats, setStats] = useState({
    enrolled: 0,
    started: 0,
    completionPct: 0,
    totalAttempts: 0,
    avgAttemptsPerEmployee: 0,
    avgScore: 0,
    hardship: 0,
  })
  const [moduleEngagement, setModuleEngagement] = useState({ workplace: 0, general: 0 })
  const [employeeDetail, setEmployeeDetail] = useState([])
  const [inviteLink, setInviteLink] = useState('')
  const [tab, setTab] = useState('overview')

  useEffect(() => {
    if (!employer?.id) return
    setInviteLink(`${window.location.origin}/register/employee?employer=${employer.id}`)
    loadData()
  }, [employer?.id])

  const loadData = async () => {
    // Employees for this employer
    const { data: emps } = await supabase
      .from('employees')
      .select('id, email, onboarded_at, literacy_score')
      .eq('employer_id', employer.id)

    const empList = emps || []
    const empIds = empList.map(e => e.id)
    const enrolled = empList.length

    // All quiz attempts for these employees only
    const { data: attempts } = empIds.length
      ? await supabase
          .from('quiz_attempts')
          .select('id, employee_id, module_id, score, completed_at')
          .in('employee_id', empIds)
      : { data: [] }

    const allAttempts = attempts || []
    const totalAttempts = allAttempts.length

    // Employees who have started at least one quiz
    const employeesWhoStarted = new Set(allAttempts.map(a => a.employee_id))
    const started = employeesWhoStarted.size

    // % of enrolled employees who have completed at least one module quiz
    const completionPct = enrolled > 0 ? Math.round((started / enrolled) * 100) : 0

    // Avg attempts per employee who has started
    const avgAttemptsPerEmployee = started > 0
      ? (totalAttempts / started).toFixed(1)
      : 0

    // Avg literacy score across enrolled employees
    const scores = empList.map(e => e.literacy_score || 0)
    const avgScore = scores.length
      ? Math.round(scores.reduce((s, v) => s + v, 0) / scores.length)
      : 0

    // Hardship referrals for these employees
    const { data: hardship } = empIds.length
      ? await supabase
          .from('hardship_referrals')
          .select('id')
          .in('employee_id', empIds)
      : { data: [] }

    // Workplace vs General engagement (% of enrolled who started each category)
    const workplaceStarters = new Set(
      allAttempts.filter(a => WORKPLACE_MODULE_IDS.includes(a.module_id)).map(a => a.employee_id)
    ).size
    const generalStarters = new Set(
      allAttempts.filter(a => GENERAL_MODULE_IDS.includes(a.module_id)).map(a => a.employee_id)
    ).size

    // Per-employee detail: modules started, quizzes attempted, latest score
    const detailMap = {}
    empList.forEach(e => {
      detailMap[e.id] = {
        ...e,
        modulesStarted: new Set(),
        quizAttempts: 0,
      }
    })
    allAttempts.forEach(a => {
      if (detailMap[a.employee_id]) {
        detailMap[a.employee_id].modulesStarted.add(a.module_id)
        detailMap[a.employee_id].quizAttempts += 1
      }
    })

    setEmployees(empList)
    setEmployeeDetail(
      Object.values(detailMap).map(e => ({
        ...e,
        modulesStarted: e.modulesStarted.size,
      }))
    )
    setStats({
      enrolled,
      started,
      completionPct,
      totalAttempts,
      avgAttemptsPerEmployee,
      avgScore,
      hardship: (hardship || []).length,
    })
    setModuleEngagement({
      workplace: enrolled > 0 ? Math.round((workplaceStarters / enrolled) * 100) : 0,
      general: enrolled > 0 ? Math.round((generalStarters / enrolled) * 100) : 0,
    })
  }

  const copyLink = () => {
    navigator.clipboard.writeText(inviteLink)
    alert('Invite link copied!')
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0F2B5B]" style={{ fontFamily: 'DM Sans' }}>
            {employer?.name || 'Employer'} Dashboard
          </h1>
          <p className="text-gray-500 text-sm">Manage your team's financial wellness program</p>
        </div>
        <div className="text-xs px-3 py-1.5 rounded-full font-semibold"
          style={{ background: employer?.subscription_status === 'active' ? '#dcfce7' : '#fef9c3', color: employer?.subscription_status === 'active' ? '#166534' : '#713f12' }}>
          {employer?.subscription_status || 'trial'}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 border-b border-gray-200">
        {['overview', 'employees', 'invite'].map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-4 py-2.5 text-sm font-semibold border-b-2 -mb-px capitalize transition-colors ${tab === t ? 'border-[#0F2B5B] text-[#0F2B5B]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
            {t}
          </button>
        ))}
      </div>

      {tab === 'overview' && (
        <div>
          {/* Stat cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[
              { label: 'Employees Enrolled', value: stats.enrolled, icon: '👥', sub: 'registered via invite' },
              { label: 'Started Learning', value: `${stats.started} (${stats.completionPct}%)`, icon: '📚', sub: 'of enrolled employees' },
              { label: 'Total Quiz Attempts', value: stats.totalAttempts, icon: '📝', sub: `avg ${stats.avgAttemptsPerEmployee} per learner` },
              { label: 'Hardship Accesses', value: stats.hardship, icon: '🆘', sub: 'anonymous referrals' },
            ].map(s => (
              <div key={s.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <div className="text-2xl mb-2">{s.icon}</div>
                <div className="text-2xl font-bold text-[#0F2B5B]" style={{ fontFamily: 'DM Sans' }}>{s.value}</div>
                <div className="text-xs text-gray-500 font-semibold mt-0.5">{s.label}</div>
                <div className="text-xs text-gray-400 mt-0.5">{s.sub}</div>
              </div>
            ))}
          </div>

          {/* Completion & score bars */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-6">
            <h3 className="font-bold text-[#0F2B5B] mb-4" style={{ fontFamily: 'DM Sans' }}>Engagement Overview</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Employees who have started at least one quiz</span>
                  <span className="font-semibold text-[#0F2B5B]">{stats.started} / {stats.enrolled} ({stats.completionPct}%)</span>
                </div>
                <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#0F2B5B] rounded-full transition-all" style={{ width: `${stats.completionPct}%` }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Average financial literacy score</span>
                  <span className="font-semibold text-[#D4A017]">{stats.avgScore} / 100</span>
                </div>
                <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#D4A017] rounded-full transition-all" style={{ width: `${stats.avgScore}%` }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Total quiz attempts (incl. retries)</span>
                  <span className="font-semibold text-gray-700">{stats.totalAttempts} attempts · {stats.avgAttemptsPerEmployee} avg per learner</span>
                </div>
                <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gray-400 rounded-full transition-all"
                    style={{ width: stats.enrolled > 0 ? `${Math.min(100, (parseFloat(stats.avgAttemptsPerEmployee) / 5) * 100)}%` : '0%' }} />
                </div>
                <p className="text-xs text-gray-400 mt-1">A higher attempt count means employees are engaging and retrying to improve their score.</p>
              </div>
            </div>
          </div>

          {/* Workplace Modules widget */}
          <div className="bg-white rounded-2xl border-2 border-[#D4A017]/30 shadow-sm p-5">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">🏢</span>
              <h3 className="font-bold text-[#0F2B5B]" style={{ fontFamily: 'DM Sans' }}>Workplace Modules Adoption</h3>
              <span className="ml-auto text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full font-semibold">Duty of Care</span>
            </div>
            <p className="text-xs text-gray-400 mb-4">These modules cover pay slips, salary packaging, novated leasing, super, tax, entitlements, ESS, and life events.</p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Workplace Modules (11–18)', value: moduleEngagement.workplace, color: '#D4A017', bg: 'bg-yellow-50' },
                { label: 'General Finance (1–10)', value: moduleEngagement.general, color: '#0F2B5B', bg: 'bg-blue-50' },
              ].map(row => (
                <div key={row.label} className={`${row.bg} rounded-xl p-4`}>
                  <div className="flex justify-between text-xs font-semibold mb-2">
                    <span className="text-gray-600">{row.label}</span>
                    <span style={{ color: row.color }}>{row.value}% started</span>
                  </div>
                  <div className="h-2.5 bg-white/80 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all" style={{ width: `${row.value}%`, backgroundColor: row.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === 'employees' && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex justify-between items-center">
            <div>
              <h3 className="font-bold text-[#0F2B5B]">{stats.enrolled} Enrolled · {stats.started} Started</h3>
              <p className="text-xs text-gray-400 mt-0.5">Individual quiz scores are not shown to protect employee privacy</p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wide">
                <tr>
                  <th className="px-4 py-3 text-left">Email</th>
                  <th className="px-4 py-3 text-left">Enrolled</th>
                  <th className="px-4 py-3 text-left">Modules Started</th>
                  <th className="px-4 py-3 text-left">Quiz Attempts</th>
                  <th className="px-4 py-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {employeeDetail.map(emp => (
                  <tr key={emp.id} className="border-t border-gray-50 hover:bg-gray-50">
                    <td className="px-4 py-3 text-gray-700">{emp.email}</td>
                    <td className="px-4 py-3 text-gray-400 text-xs">
                      {emp.onboarded_at ? new Date(emp.onboarded_at).toLocaleDateString('en-AU') : '—'}
                    </td>
                    <td className="px-4 py-3 text-gray-600 text-xs">
                      {emp.modulesStarted > 0
                        ? <span className="font-semibold text-[#0F2B5B]">{emp.modulesStarted} / {TOTAL_MODULES}</span>
                        : <span className="text-gray-400">None yet</span>}
                    </td>
                    <td className="px-4 py-3 text-gray-600 text-xs">
                      {emp.quizAttempts > 0
                        ? <span className="font-semibold">{emp.quizAttempts}</span>
                        : <span className="text-gray-400">0</span>}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                        emp.quizAttempts > 0 ? 'bg-green-100 text-green-700' :
                        emp.onboarded_at ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-500'
                      }`}>
                        {emp.quizAttempts > 0 ? 'Active' : emp.onboarded_at ? 'Enrolled' : 'Invited'}
                      </span>
                    </td>
                  </tr>
                ))}
                {employeeDetail.length === 0 && (
                  <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-400 text-sm">No employees yet. Share your invite link to get started.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'invite' && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 max-w-lg">
          <h3 className="font-bold text-[#0F2B5B] mb-4" style={{ fontFamily: 'DM Sans' }}>Invite Employees</h3>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Your Invite Link</label>
            <div className="flex gap-2">
              <input readOnly value={inviteLink}
                className="flex-1 px-3 py-2.5 border border-gray-200 rounded-xl text-xs bg-gray-50 text-gray-600" />
              <button onClick={copyLink}
                className="bg-[#0F2B5B] text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#1a3d7c] transition-colors whitespace-nowrap">
                Copy
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-1.5">Share this link with your employees via email or your intranet.</p>
          </div>
          <div className="border-t border-gray-100 pt-4">
            <h4 className="font-semibold text-sm text-gray-700 mb-3">What employees see</h4>
            <ul className="text-xs text-gray-500 space-y-1.5">
              <li>✓ Their own Financial Literacy Score</li>
              <li>✓ All 18 learning modules</li>
              <li>✓ All calculators</li>
              <li>✓ Quiz results and badges</li>
              <li>🔒 Their individual data is never shared with you</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
