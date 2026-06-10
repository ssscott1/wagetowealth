import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const FREE_DOMAINS = new Set([
  'gmail.com','googlemail.com','yahoo.com','yahoo.com.au','hotmail.com','hotmail.com.au',
  'outlook.com','outlook.com.au','live.com','live.com.au','icloud.com','me.com','mac.com',
  'aol.com','protonmail.com','proton.me','zoho.com','ymail.com','bigpond.com','bigpond.net.au',
  'optusnet.com.au','tpg.com.au','internode.on.net','iinet.net.au','westnet.com.au',
])

function domainToCompanyName(domain) {
  const withoutTld = domain.replace(/\.(com\.au|net\.au|org\.au|edu\.au|gov\.au|com|net|org|io|co|app)$/, '')
  return withoutTld
    .replace(/[-_.]/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/\b\w/g, c => c.toUpperCase())
    .trim()
}

export default function FreeTrialSetup() {
  const navigate = useNavigate()
  const [accessCode, setAccessCode] = useState('')
  const [codeVerified, setCodeVerified] = useState(false)
  const [codeError, setCodeError] = useState('')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [companyName, setCompanyName] = useState('')
  const [domain, setDomain] = useState('')
  const [domainError, setDomainError] = useState('')

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)

  function handleEmailChange(val) {
    setEmail(val)
    const parts = val.split('@')
    if (parts.length === 2 && parts[1].includes('.')) {
      const d = parts[1].toLowerCase()
      if (!FREE_DOMAINS.has(d)) {
        setDomain(d)
        if (!companyName) setCompanyName(domainToCompanyName(d))
      } else {
        setDomain('')
      }
    }
  }

  function validateDomain(val) {
    if (!val) { setDomainError('Required'); return false }
    if (FREE_DOMAINS.has(val.toLowerCase())) { setDomainError('Please use a work domain, not a personal email provider'); return false }
    if (!/^[a-z0-9.-]+\.[a-z]{2,}$/.test(val.toLowerCase())) { setDomainError('Enter a valid domain, e.g. acme.com.au'); return false }
    setDomainError('')
    return true
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!validateDomain(domain)) return
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/free-employer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, companyName, domain, accessCode }),
      })
      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Something went wrong.')
        setLoading(false)
        return
      }

      setDone(true)
    } catch {
      setError('Network error. Please try again.')
      setLoading(false)
    }
  }

  // Gate: verify access code before showing the form
  if (!codeVerified) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-[#D4A017] rounded-lg flex items-center justify-center font-bold text-[#0F2B5B] text-sm">W</div>
            <span className="font-bold text-[#0F2B5B]" style={{ fontFamily: 'DM Sans, sans-serif' }}>Wages to Wealth</span>
          </div>
          <h1 className="text-lg font-bold text-[#0F2B5B] mb-1">Internal Setup</h1>
          <p className="text-sm text-gray-500 mb-6">Enter your access code to continue.</p>
          <form onSubmit={async e => {
            e.preventDefault()
            if (!accessCode.trim()) { setCodeError('Enter your access code.'); return }
            setCodeError('Checking…')
            try {
              const res = await fetch('/api/free-employer', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ verifyOnly: true, accessCode }),
              })
              const data = await res.json()
              if (res.status === 403) { setCodeError('Incorrect access code.'); return }
              if (!res.ok && res.status !== 400) { setCodeError('Server error. Try again.'); return }
              // 400 = missing fields (expected for verifyOnly), means code was accepted
              setCodeError('')
              setCodeVerified(true)
            } catch {
              setCodeError('Network error. Try again.')
            }
          }}>
            <input
              type="password"
              value={accessCode}
              onChange={e => setAccessCode(e.target.value)}
              placeholder="Access code"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2B5B] mb-3"
            />
            {codeError && <p className="text-red-500 text-xs mb-3">{codeError}</p>}
            <button
              type="submit"
              className="w-full bg-[#0F2B5B] text-white rounded-xl py-3 text-sm font-bold hover:bg-[#1a3d7c] transition-colors"
            >
              Continue →
            </button>
          </form>
        </div>
      </div>
    )
  }

  // Success state
  if (done) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm text-center">
          <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">✓</div>
          <h2 className="text-lg font-bold text-[#0F2B5B] mb-2">Account Created</h2>
          <p className="text-sm text-gray-600 mb-1">
            Employer account for <strong>{companyName}</strong> is ready.
          </p>
          <div className="bg-gray-50 rounded-xl p-4 my-4 text-left text-sm space-y-1">
            <p><span className="text-gray-400">Login URL:</span> <span className="font-mono text-xs">wagestowealth.com.au/login?type=employer</span></p>
            <p><span className="text-gray-400">Email:</span> <strong>{email}</strong></p>
            <p><span className="text-gray-400">Password:</span> <strong>{password}</strong></p>
          </div>
          <p className="text-xs text-gray-400 mb-6">Share these credentials with the employer admin. They can change their password from Account settings.</p>
          <button
            onClick={() => {
              setDone(false)
              setEmail('')
              setPassword('')
              setCompanyName('')
              setDomain('')
            }}
            className="w-full border border-[#0F2B5B] text-[#0F2B5B] rounded-xl py-2.5 text-sm font-bold hover:bg-[#0F2B5B] hover:text-white transition-colors"
          >
            Create Another Account
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 bg-[#D4A017] rounded-lg flex items-center justify-center font-bold text-[#0F2B5B] text-sm">W</div>
          <span className="font-bold text-[#0F2B5B]" style={{ fontFamily: 'DM Sans, sans-serif' }}>Wages to Wealth</span>
        </div>

        <h1 className="text-xl font-bold text-[#0F2B5B] mb-1">Create Employer Account</h1>
        <p className="text-sm text-gray-500 mb-6">Full access — no payment required. Account is activated immediately.</p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm mb-4">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Admin Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={e => handleEmailChange(e.target.value)}
              placeholder="admin@company.com.au"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2B5B]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                minLength={8}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Minimum 8 characters"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2B5B] pr-20"
              />
              <button
                type="button"
                onClick={() => setShowPassword(s => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-600"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Company Name</label>
            <input
              type="text"
              required
              value={companyName}
              onChange={e => setCompanyName(e.target.value)}
              placeholder="Acme Corp"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2B5B]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Company Domain</label>
            <input
              type="text"
              required
              value={domain}
              onChange={e => { setDomain(e.target.value); if (domainError) validateDomain(e.target.value) }}
              onBlur={e => validateDomain(e.target.value)}
              placeholder="acme.com.au"
              className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2B5B] ${domainError ? 'border-red-300' : 'border-gray-200'}`}
            />
            {domainError && <p className="text-red-500 text-xs mt-1">{domainError}</p>}
            <p className="text-gray-400 text-xs mt-1">Employees register using their @{domain || 'company.com.au'} email address.</p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0F2B5B] text-white rounded-xl py-3 text-sm font-bold hover:bg-[#1a3d7c] transition-colors disabled:opacity-60 mt-2"
          >
            {loading ? 'Creating account…' : 'Create Account →'}
          </button>
        </form>
      </div>
    </div>
  )
}
