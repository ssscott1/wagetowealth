import { useState } from 'react'
import { Link, Navigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

export default function Login() {
  const { signIn, user } = useAuth()
  const [params] = useSearchParams()
  const type = params.get('type') || 'employee'
  const isEmployer = type === 'employer'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (user) return <Navigate to="/dashboard" replace />

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const { error } = await signIn(email, password)
    setLoading(false)
    if (error) setError(error.message)
  }

  return (
    <div className="min-h-screen bg-[#F9F8F6] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-5">
            <div className="w-9 h-9 bg-[#0F2B5B] rounded-xl flex items-center justify-center font-bold text-white">W</div>
            <span className="font-bold text-xl text-[#0F2B5B]" style={{ fontFamily: 'DM Sans' }}>Wages to Wealth</span>
          </Link>

          {/* Type switcher */}
          <div className="inline-flex bg-gray-100 rounded-xl p-1 mb-5">
            <Link to="/login?type=employer"
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${isEmployer ? 'bg-white text-[#0F2B5B] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
              🏢 Employer
            </Link>
            <Link to="/login?type=employee"
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${!isEmployer ? 'bg-white text-[#0F2B5B] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
              👤 Employee
            </Link>
          </div>

          <h1 className="text-2xl font-bold text-[#0F2B5B]" style={{ fontFamily: 'DM Sans' }}>
            {isEmployer ? 'Welcome back' : 'Continue learning'}
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {isEmployer
              ? 'Sign in to your employer dashboard'
              : 'Sign in to pick up where you left off'}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email address</label>
              <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2B5B] focus:border-transparent"
                placeholder={isEmployer ? 'you@yourcompany.com' : 'you@company.com'} />
            </div>
            <div>
              <div className="flex justify-between mb-1.5">
                <label className="text-sm font-semibold text-gray-700">Password</label>
                <Link to="/forgot-password" className="text-xs text-[#0F2B5B] hover:underline">Forgot password?</Link>
              </div>
              <input type="password" required value={password} onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2B5B] focus:border-transparent"
                placeholder="••••••••" />
            </div>
            {error && (
              <div className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-xl px-4 py-3 flex items-start gap-2">
                <span>⚠️</span>
                <span>{error}</span>
              </div>
            )}
            <button type="submit" disabled={loading}
              className="w-full bg-[#0F2B5B] text-white py-3 rounded-xl font-semibold text-sm hover:bg-[#1a3d7c] transition-colors disabled:opacity-50">
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-gray-100 text-center space-y-2">
            {isEmployer ? (
              <p className="text-sm text-gray-500">
                New to Wages to Wealth?{' '}
                <Link to="/register/employer" className="text-[#0F2B5B] font-semibold hover:underline">Start a free trial →</Link>
              </p>
            ) : (
              <p className="text-sm text-gray-500">
                New employee?{' '}
                <span className="text-gray-400">Use the invite link your employer shared with you.</span>
              </p>
            )}
          </div>
        </div>

        {/* Context hint */}
        <div className={`mt-4 rounded-xl px-4 py-3 text-xs text-center ${isEmployer ? 'bg-blue-50 text-blue-700' : 'bg-yellow-50 text-yellow-700'}`}>
          {isEmployer
            ? '🏢 Employer accounts have access to the admin dashboard, team analytics, and your invite link.'
            : '👤 Employees access all 18 learning modules, 17 calculators, and their personal Financial Literacy Score.'}
        </div>
      </div>
    </div>
  )
}
