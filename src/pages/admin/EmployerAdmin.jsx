import { useState, useEffect } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { supabase } from '../../lib/supabase'

const WORKPLACE_MODULE_IDS = [11, 12, 13, 14, 15, 16, 17, 18]
const GENERAL_MODULE_IDS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

export default function EmployerAdmin() {
  const { profile } = useAuth()
  const employer = profile?.employers
  const [employees, setEmployees] = useState([])
  const [stats, setStats] = useState({ total: 0, started: 0, avgScore: 0, hardship: 0 })
  const [moduleEngagement, setModuleEngagement] = useState({ workplace: 0, general: 0 })
  const [inviteLink, setInviteLink] = useState('')
  const [tab, setTab] = useState('overview')

  useEffect(() => {
    if (!employer?.id) return
    setInviteLink(`${window.location.origin}/register/employee?employer=${employer.id}`)
    loadData()
  }, [employer?.id])

  const loadData = async () => {
    const { data: emps } = await supabase
      .from('employees')
      .select('id, email, onboarded_at, literacy_score')
      .eq('employer_id', employer.id)

    const { data: attempts } = await supabase
      .from('quiz_attempts')
      .select('employee_id, score')

    const { data: hardship } = await supabase
      .from('hardship_referrals')
      .select('id')

    const empIds = (emps || []).map(e => e.id)
    const empAttempts = (attempts || []).filter(a => empIds.includes(a.employee_id))
    const started = new Set(empAttempts.map(a => a.employee_id)).size
    const scores = (emps || []).map(e => e.literacy_score || 0)
    const avgScore = scores.length ? Math.round(scores.reduce((s, v) => s + v, 0) / scores.length) : 0

    // Workplace vs General module engagement
    const { data: allAttempts } = await supabase
      .from('quiz_attempts')
      .select('employee_id, module_id')
    const empAttempts2 = (allAttempts || []).filter(a => empIds.includes(a.employee_id))
    const workplaceStarters = new Set(empAttempts2.filter(a => WORKPLACE_MODULE_IDS.includes(a.module_id)).map(a => a.employee_id)).size
    const generalStarters = new Set(empAttempts2.filter(a => GENERAL_MODULE_IDS.includes(a.module_id)).map(a => a.employee_id)).size
    const total = (emps || []).length

    setEmployees(emps || [])
    setStats({ total, started, avgScore, hardship: (hardship || []).length })
    setModuleEngagement({
      workplace: total > 0 ? Math.round((workplaceStarters / total) * 100) : 0,
      general: total > 0 ? Math.round((generalStarters / total) * 100) : 0,
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[
              { label: 'Total Employees', value: stats.total, icon: '👥' },
              { label: 'Started a Module', value: stats.started, icon: '📚' },
              { label: 'Avg Literacy Score', value: `${stats.avgScore}/100`, icon: '📊' },
              { label: 'Hardship Accesses', value: stats.hardship, icon: '🆘' },
            ].map(s => (
              <div key={s.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <div className="text-2xl mb-2">{s.icon}</div>
                <div className="text-2xl font-bold text-[#0F2B5B]" style={{ fontFamily: 'DM Sans' }}>{s.value}</div>
                <div className="text-xs text-gray-400 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Workplace Modules Engagement Widget */}
          <div className="bg-white rounded-2xl border-2 border-[#D4A017]/30 shadow-sm p-5 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">🏢</span>
              <h3 className="font-bold text-[#0F2B5B]" style={{ fontFamily: 'DM Sans' }}>Workplace Modules Adoption</h3>
              <span className="ml-auto text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full font-semibold">Duty of Care</span>
            </div>
            <p className="text-xs text-gray-400 mb-4">These modules cover pay slips, salary packaging, novated leasing, super contributions, tax, entitlements, ESS, and life events — the topics employees need most at work.</p>
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

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h3 className="font-bold text-[#0F2B5B] mb-3" style={{ fontFamily: 'DM Sans' }}>Engagement Overview</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Module adoption</span>
                  <span>{stats.total > 0 ? Math.round((stats.started / stats.total) * 100) : 0}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full">
                  <div className="h-full bg-[#0F2B5B] rounded-full" style={{ width: `${stats.total > 0 ? (stats.started / stats.total) * 100 : 0}%` }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Average literacy score</span>
                  <span>{stats.avgScore}/100</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full">
                  <div className="h-full bg-[#D4A017] rounded-full" style={{ width: `${stats.avgScore}%` }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === 'employees' && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-bold text-[#0F2B5B]">{employees.length} Employees</h3>
            <span className="text-xs text-gray-400">Individual scores not shown for privacy</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wide">
                <tr>
                  <th className="px-4 py-3 text-left">Email</th>
                  <th className="px-4 py-3 text-left">Joined</th>
                  <th className="px-4 py-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {employees.map(emp => (
                  <tr key={emp.id} className="border-t border-gray-50 hover:bg-gray-50">
                    <td className="px-4 py-3 text-gray-700">{emp.email}</td>
                    <td className="px-4 py-3 text-gray-400 text-xs">
                      {emp.onboarded_at ? new Date(emp.onboarded_at).toLocaleDateString('en-AU') : 'Pending'}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${emp.onboarded_at ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                        {emp.onboarded_at ? 'Active' : 'Invited'}
                      </span>
                    </td>
                  </tr>
                ))}
                {employees.length === 0 && (
                  <tr><td colSpan={3} className="px-4 py-8 text-center text-gray-400 text-sm">No employees yet. Share your invite link to get started.</td></tr>
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
              <li>✓ All 10 learning modules</li>
              <li>✓ All 10 calculators</li>
              <li>✓ Quiz results and badges</li>
              <li>🔒 Their data is never shared with you</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
