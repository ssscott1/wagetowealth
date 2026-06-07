import { useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/login`,
    })
    setLoading(false)
    if (error) { setError(error.message); return }
    setSent(true)
  }

  return (
    <div className="min-h-screen bg-[#F9F8F6] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-5">
            <div className="w-9 h-9 bg-[#0F2B5B] rounded-xl flex items-center justify-center font-bold text-white">W</div>
            <span className="font-bold text-xl text-[#0F2B5B]" style={{ fontFamily: 'DM Sans' }}>Wages to Wealth</span>
          </Link>
          <h1 className="text-2xl font-bold text-[#0F2B5B]" style={{ fontFamily: 'DM Sans' }}>Reset your password</h1>
          <p className="text-gray-500 text-sm mt-1">We'll send a reset link to your email</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          {sent ? (
            <div className="text-center">
              <div className="text-5xl mb-4">📧</div>
              <h2 className="font-bold text-[#0F2B5B] mb-2" style={{ fontFamily: 'DM Sans' }}>Check your inbox</h2>
              <p className="text-gray-500 text-sm mb-1">We sent a password reset link to</p>
              <p className="font-semibold text-[#0F2B5B] text-sm mb-6">{email}</p>
              <p className="text-xs text-gray-400 mb-6">Didn't receive it? Check your spam folder or try again.</p>
              <button onClick={() => setSent(false)} className="text-[#0F2B5B] text-sm font-semibold hover:underline">Try a different email</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email address</label>
                <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2B5B]"
                  placeholder="you@yourcompany.com" />
              </div>
              {error && <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-xl px-4 py-3">{error}</p>}
              <button type="submit" disabled={loading}
                className="w-full bg-[#0F2B5B] text-white py-3 rounded-xl font-semibold text-sm hover:bg-[#1a3d7c] transition-colors disabled:opacity-50">
                {loading ? 'Sending…' : 'Send Reset Link'}
              </button>
            </form>
          )}
          <p className="text-center text-sm text-gray-500 mt-5">
            <Link to="/login" className="text-[#0F2B5B] font-semibold hover:underline">← Back to sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
