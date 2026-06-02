import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { MODULES } from '../../data/modules'

export default function SuperAdmin() {
  const [employers, setEmployers] = useState([])
  const [stats, setStats] = useState({ totalEmployees: 0, totalAttempts: 0, avgScore: 0 })
  const [tab, setTab] = useState('employers')

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    const { data: emps } = await supabase.from('employers').select('*, employees(count)').order('created_at', { ascending: false })
    setEmployers(emps || [])
    const { count: empCount } = await supabase.from('employees').select('id', { count: 'exact', head: true })
    const { count: attemptCount } = await supabase.from('quiz_attempts').select('id', { count: 'exact', head: true })
    const { data: scores } = await supabase.from('employees').select('literacy_score')
    const avg = scores?.length ? Math.round(scores.reduce((s, e) => s + (e.literacy_score || 0), 0) / scores.length) : 0
    setStats({ totalEmployees: empCount || 0, totalAttempts: attemptCount || 0, avgScore: avg })
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-[#D4A017] rounded-xl flex items-center justify-center text-[#0F2B5B] font-bold">SA</div>
        <div>
          <h1 className="text-2xl font-bold text-[#0F2B5B]" style={{ fontFamily: 'DM Sans' }}>Super Admin</h1>
          <p className="text-gray-500 text-sm">Sierra Bravo Capital — Platform Overview</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Total Employees', value: stats.totalEmployees },
          { label: 'Total Quiz Attempts', value: stats.totalAttempts },
          { label: 'Avg Literacy Score', value: `${stats.avgScore}/100` },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="text-2xl font-bold text-[#0F2B5B]" style={{ fontFamily: 'DM Sans' }}>{s.value}</div>
            <div className="text-xs text-gray-400 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="flex gap-1 mb-5 border-b border-gray-200">
        {['employers', 'content'].map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-4 py-2.5 text-sm font-semibold border-b-2 -mb-px capitalize transition-colors ${tab === t ? 'border-[#0F2B5B] text-[#0F2B5B]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
            {t}
          </button>
        ))}
      </div>

      {tab === 'employers' && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wide">
              <tr>
                <th className="px-4 py-3 text-left">Employer</th>
                <th className="px-4 py-3 text-left">Employees</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Created</th>
              </tr>
            </thead>
            <tbody>
              {employers.map(emp => (
                <tr key={emp.id} className="border-t border-gray-50 hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="font-medium text-gray-800">{emp.name}</div>
                    <div className="text-xs text-gray-400">{emp.slug}</div>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{emp.employees?.[0]?.count || 0}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${emp.subscription_status === 'active' ? 'bg-green-100 text-green-700' : emp.subscription_status === 'trial' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-500'}`}>
                      {emp.subscription_status || 'inactive'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-400 text-xs">
                    {new Date(emp.created_at).toLocaleDateString('en-AU')}
                  </td>
                </tr>
              ))}
              {employers.length === 0 && (
                <tr><td colSpan={4} className="px-4 py-8 text-center text-gray-400">No employers yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'content' && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wide">
              <tr>
                <th className="px-4 py-3 text-left">Module</th>
                <th className="px-4 py-3 text-left">Category</th>
                <th className="px-4 py-3 text-left">Quiz Questions</th>
                <th className="px-4 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {MODULES.map(m => (
                <tr key={m.id} className="border-t border-gray-50 hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span>{m.icon}</span>
                      <span className="font-medium">{m.title}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-xs">{m.category}</td>
                  <td className="px-4 py-3 text-gray-500">{m.quiz.length}</td>
                  <td className="px-4 py-3">
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold">Published</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
