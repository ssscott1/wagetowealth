import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { supabase } from '../../lib/supabase'

export default function RegisterEmployer() {
  const { signUp } = useAuth()
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (step === 1) { setStep(2); return }
    setError('')
    setLoading(true)
    const { data, error: signUpError } = await signUp(email, password)
    if (signUpError) { setError(signUpError.message); setLoading(false); return }
    if (data.user) {
      const slug = companyName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
      const { data: employer } = await supabase.from('employers').insert({
        name: companyName, slug, subscription_status: 'trial'
      }).select().single()
      if (employer) {
        await supabase.from('employer_admins').insert({
          employer_id: employer.id, user_id: data.user.id, email
        })
      }
    }
    setLoading(false)
    setDone(true)
  }

  if (done) {
    return (
      <div className="min-h-screen bg-[#F9F8F6] flex items-center justify-center px-4">
        <div className="w-full max-w-md text-center">
          <Link to="/" className="inline-flex items-center gap-2 justify-center mb-8">
            <div className="w-9 h-9 bg-[#0F2B5B] rounded-xl flex items-center justify-center font-bold text-white">W</div>
            <span className="font-bold text-xl text-[#0F2B5B]" style={{ fontFamily: 'DM Sans' }}>Wages to Wealth</span>
          </Link>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-5">
              <span className="text-3xl">📧</span>
            </div>
            <h1 className="text-2xl font-bold text-[#0F2B5B] mb-3" style={{ fontFamily: 'DM Sans' }}>
              Check your email
            </h1>
            <p className="text-gray-500 text-sm mb-2">
              We've sent a confirmation link to
            </p>
            <p className="font-semibold text-[#0F2B5B] text-sm mb-6 break-all">{email}</p>
            <p className="text-gray-400 text-xs mb-6">
              Click the link in the email to verify your address and activate your account. Check your spam folder if you don't see it within a minute.
            </p>
            <Link to="/login"
              className="inline-block bg-[#0F2B5B] text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-[#1a3d7c] transition-colors">
              Go to sign in
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F9F8F6] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-9 h-9 bg-[#0F2B5B] rounded-xl flex items-center justify-center font-bold text-white">W</div>
            <span className="font-bold text-xl text-[#0F2B5B]" style={{ fontFamily: 'DM Sans' }}>Wages to Wealth</span>
          </Link>
          <h1 className="text-2xl font-bold text-[#0F2B5B]" style={{ fontFamily: 'DM Sans' }}>
            {step === 1 ? 'Create your account' : 'Tell us about your company'}
          </h1>
          <p className="text-gray-500 text-sm mt-1">Step {step} of 2 — Employer registration</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            {step === 1 ? (
              <>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Work Email</label>
                  <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2B5B]"
                    placeholder="you@company.com" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
                  <input type="password" required minLength={8} value={password} onChange={e => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2B5B]"
                    placeholder="Minimum 8 characters" />
                </div>
              </>
            ) : (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Company Name</label>
                <input type="text" required value={companyName} onChange={e => setCompanyName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2B5B]"
                  placeholder="Acme Corporation" />
              </div>
            )}
            {error && <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</p>}
            <button type="submit" disabled={loading}
              className="w-full bg-[#0F2B5B] text-white py-3 rounded-xl font-semibold text-sm hover:bg-[#1a3d7c] transition-colors disabled:opacity-50">
              {loading ? 'Creating account...' : step === 1 ? 'Continue →' : 'Create Account'}
            </button>
          </form>
          <p className="text-center text-sm text-gray-500 mt-4">
            Already have an account?{' '}
            <Link to="/login" className="text-[#0F2B5B] font-semibold hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
