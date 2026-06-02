import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { supabase } from '../lib/supabase'

export default function Account() {
  const { user, signOut } = useAuth()
  const [newPassword, setNewPassword] = useState('')
  const [msg, setMsg] = useState('')

  const updatePassword = async (e) => {
    e.preventDefault()
    const { error } = await supabase.auth.updateUser({ password: newPassword })
    if (error) setMsg('Error: ' + error.message)
    else { setMsg('Password updated successfully.'); setNewPassword('') }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-[#0F2B5B] mb-6" style={{ fontFamily: 'DM Sans' }}>Account Settings</h1>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-4">
        <h2 className="font-bold text-gray-700 mb-3">Your Account</h2>
        <div className="text-sm text-gray-600 mb-4">
          <span className="font-semibold">Email:</span> {user?.email}
        </div>
        <form onSubmit={updatePassword} className="space-y-3">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">New Password</label>
            <input type="password" minLength={8} value={newPassword} onChange={e => setNewPassword(e.target.value)}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2B5B]" />
          </div>
          {msg && <p className="text-sm text-green-600">{msg}</p>}
          <button type="submit" className="bg-[#0F2B5B] text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#1a3d7c] transition-colors">
            Update Password
          </button>
        </form>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h2 className="font-bold text-gray-700 mb-3">Sign Out</h2>
        <button onClick={signOut} className="border border-gray-300 text-gray-600 px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-colors">
          Sign Out
        </button>
      </div>
    </div>
  )
}
