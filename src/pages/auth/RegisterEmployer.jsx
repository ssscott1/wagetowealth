import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { supabase } from '../../lib/supabase'

const FREE_DOMAINS = new Set([
  'gmail.com','googlemail.com','yahoo.com','yahoo.com.au','hotmail.com','hotmail.com.au',
  'outlook.com','outlook.com.au','live.com','live.com.au','icloud.com','me.com','mac.com',
  'aol.com','protonmail.com','proton.me','zoho.com','ymail.com','bigpond.com','bigpond.net.au',
  'optusnet.com.au','tpg.com.au','internode.on.net','iinet.net.au','westnet.com.au',
  'dodo.com.au','adam.com.au','exemail.com.au','fastmail.com','hey.com',
])

function domainToCompanyName(domain) {
  // Strip TLD(s): sierrabravo.com.au -> sierrabravo, acme-corp.com -> acme corp
  const withoutTld = domain.replace(/\.(com\.au|net\.au|org\.au|edu\.au|gov\.au|com|net|org|io|co)$/, '')
  return withoutTld
    .replace(/[-_]/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/\b\w/g, c => c.toUpperCase())
    .trim()
}

export default function RegisterEmployer() {
  const { signUp } = useAuth()
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  const emailDomain = email.includes('@') ? email.split('@')[1].toLowerCase() : ''
  const isFreeDomain = emailDomain && FREE_DOMAINS.has(emailDomain)

  const handleStep1 = (e) => {
    e.preventDefault()
    if (isFreeDomain) {
      setError('Please use your company email address — not a personal email like Gmail or Hotmail.')
      return
    }
    if (!emailDomain) {
      setError('Please enter a valid email address.')
      return
    }
    setError('')
    setCompanyName(domainToCompanyName(emailDomain))
    setStep(2)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (step === 1) { handleStep1(e); return }
    setError('')
    setLoading(true)
    const { data, error: signUpError } = await signUp(email, password, 'employer')
    if (signUpError) { setError(signUpError.message); setLoading(false); return }
    if (data.user) {
      const slug = companyName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
      const { data: employer } = await supabase.from('employers').insert({
        name: companyName,
        slug,
        domain: emailDomain,
        subscription_status: 'trial',
      }).select().single()
      if (employer) {
        await supabase.from('employer_admins').insert({
          employer_id: employer.id, user_id: data.user.id, email,
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
            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-5">
              <span className="text-3xl">✅</span>
            </div>
            <h1 className="text-2xl font-bold text-[#0F2B5B] mb-3" style={{ fontFamily: 'DM Sans' }}>
              Account created!
            </h1>
            <p className="text-gray-500 text-sm mb-2">We've sent a confirmation link to</p>
            <p className="font-semibold text-[#0F2B5B] text-sm mb-2 break-all">{email}</p>
            <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mb-6">
              <span>🔐</span> Verified domain: {emailDomain}
            </div>
            <p className="text-gray-400 text-xs mb-6">
              Click the link in the email to activate your account. Check your spam folder if you don't see it within a minute.
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
            {step === 1 ? 'Create your employer account' : 'Confirm your company details'}
          </h1>
          <p className="text-gray-500 text-sm mt-1">Step {step} of 2 — Employer registration</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            {step === 1 ? (
              <>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Work Email</label>
                  <input type="email" required value={email} onChange={e => { setEmail(e.target.value); setError('') }}
                    className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2B5B] ${isFreeDomain ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}
                    placeholder="you@yourcompany.com.au" />
                  {isFreeDomain && (
                    <p className="text-red-500 text-xs mt-1.5">⚠️ Personal email addresses are not accepted. Please use your company email.</p>
                  )}
                  {emailDomain && !isFreeDomain && (
                    <p className="text-green-600 text-xs mt-1.5 flex items-center gap-1">
                      <span>✓</span> Company domain detected: <span className="font-semibold">{emailDomain}</span>
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
                  <input type="password" required minLength={8} value={password} onChange={e => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2B5B]"
                    placeholder="Minimum 8 characters" />
                </div>
                <div className="bg-blue-50 rounded-xl p-3 text-xs text-blue-700">
                  🔐 We verify employers using their company email domain. Personal email addresses (Gmail, Hotmail, etc.) are not accepted.
                </div>
              </>
            ) : (
              <>
                {/* Domain verified badge */}
                <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-xl px-4 py-3">
                  <span className="text-green-600 text-lg">✅</span>
                  <div>
                    <p className="text-xs font-bold text-green-700">Domain verified</p>
                    <p className="text-xs text-green-600">{emailDomain}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Company Name</label>
                  <input type="text" required value={companyName} onChange={e => setCompanyName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2B5B]"
                    placeholder="Acme Corporation" />
                  <p className="text-xs text-gray-400 mt-1.5">
                    We've suggested a name from your domain — update it if needed.
                  </p>
                </div>
              </>
            )}

            {error && <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</p>}
            <button type="submit" disabled={loading || (step === 1 && isFreeDomain)}
              className="w-full bg-[#0F2B5B] text-white py-3 rounded-xl font-semibold text-sm hover:bg-[#1a3d7c] transition-colors disabled:opacity-50">
              {loading ? 'Creating account...' : step === 1 ? 'Continue →' : 'Create Employer Account'}
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
