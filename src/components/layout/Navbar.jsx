import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { useState, useRef, useEffect } from 'react'

export default function Navbar() {
  const { user, role, signOut } = useAuth()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const [loginDropOpen, setLoginDropOpen] = useState(false)
  const dropRef = useRef(null)

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) setLoginDropOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <nav className="bg-[#0F2B5B] text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 bg-[#D4A017] rounded-lg flex items-center justify-center font-bold text-[#0F2B5B] text-sm">W</div>
            <span className="font-bold text-lg" style={{ fontFamily: 'DM Sans, sans-serif' }}>Wages to Wealth</span>
          </Link>

          {/* Desktop — not logged in */}
          {!user && (
            <div className="hidden md:flex items-center gap-5">
              <Link to="/demo" className="text-white/80 hover:text-white text-sm transition-colors">Try Demo</Link>
              <Link to="/pricing" className="text-white/80 hover:text-white text-sm transition-colors">Pricing</Link>
              <Link to="/about" className="text-white/80 hover:text-white text-sm transition-colors">About</Link>

              {/* Sign In dropdown */}
              <div className="relative" ref={dropRef}>
                <button
                  onClick={() => setLoginDropOpen(o => !o)}
                  className="flex items-center gap-1.5 text-white/90 hover:text-white text-sm font-semibold transition-colors"
                >
                  Sign In
                  <svg className={`w-3.5 h-3.5 transition-transform ${loginDropOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {loginDropOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50">
                    <Link to="/login?type=employer"
                      onClick={() => setLoginDropOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors group">
                      <div className="w-8 h-8 bg-[#0F2B5B]/10 rounded-lg flex items-center justify-center text-base">🏢</div>
                      <div>
                        <div className="text-sm font-bold text-[#0F2B5B]">Employer Login</div>
                        <div className="text-xs text-gray-400">Access your dashboard</div>
                      </div>
                    </Link>
                    <div className="mx-4 my-1 border-t border-gray-100" />
                    <Link to="/login?type=employee"
                      onClick={() => setLoginDropOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors group">
                      <div className="w-8 h-8 bg-[#D4A017]/20 rounded-lg flex items-center justify-center text-base">👤</div>
                      <div>
                        <div className="text-sm font-bold text-[#0F2B5B]">Employee Login</div>
                        <div className="text-xs text-gray-400">Continue your learning</div>
                      </div>
                    </Link>
                  </div>
                )}
              </div>

              <Link to="/register/employer"
                className="bg-[#D4A017] text-[#0F2B5B] px-4 py-2 rounded-lg text-sm font-bold hover:bg-yellow-400 transition-colors">
                Start Free Trial
              </Link>
            </div>
          )}

          {/* Desktop — logged in */}
          {user && (
            <div className="hidden md:flex items-center gap-4">
              {role === 'employee' && (
                <>
                  <Link to="/dashboard" className="text-white/80 hover:text-white text-sm transition-colors">Dashboard</Link>
                  <Link to="/modules" className="text-white/80 hover:text-white text-sm transition-colors">Modules</Link>
                  <Link to="/calculators" className="text-white/80 hover:text-white text-sm transition-colors">Calculators</Link>
                  <Link to="/get-help" className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors">
                    🆘 Get Help
                  </Link>
                </>
              )}
              {role === 'employer_admin' && (
                <Link to="/admin" className="text-white/80 hover:text-white text-sm transition-colors">Admin Dashboard</Link>
              )}
              {role === 'super_admin' && (
                <Link to="/superadmin" className="text-white/80 hover:text-white text-sm transition-colors">Super Admin</Link>
              )}
              <Link to="/account" className="text-white/80 hover:text-white text-sm transition-colors">Account</Link>
              <button onClick={handleSignOut} className="text-white/60 hover:text-white text-sm transition-colors">Sign Out</button>
            </div>
          )}

          {/* Hamburger */}
          <button className="md:hidden p-2 rounded-lg hover:bg-white/10" onClick={() => setMenuOpen(!menuOpen)}>
            <div className="w-5 h-0.5 bg-white mb-1" />
            <div className="w-5 h-0.5 bg-white mb-1" />
            <div className="w-5 h-0.5 bg-white" />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0a1f42] px-4 pb-4 space-y-1">
          {!user && (
            <>
              <Link to="/demo" className="block py-2.5 text-[#D4A017] text-sm border-b border-white/5 font-semibold" onClick={() => setMenuOpen(false)}>👀 Try Demo</Link>
              <Link to="/pricing" className="block py-2.5 text-white/80 text-sm border-b border-white/5" onClick={() => setMenuOpen(false)}>Pricing</Link>
              <Link to="/about" className="block py-2.5 text-white/80 text-sm border-b border-white/5" onClick={() => setMenuOpen(false)}>About</Link>
              <div className="py-2 border-b border-white/5">
                <p className="text-xs text-white/40 uppercase tracking-wide mb-2">Sign In As</p>
                <Link to="/login?type=employer" className="flex items-center gap-2 py-2 text-sm text-white/80" onClick={() => setMenuOpen(false)}>
                  🏢 <span>Employer Login</span>
                </Link>
                <Link to="/login?type=employee" className="flex items-center gap-2 py-2 text-sm text-white/80" onClick={() => setMenuOpen(false)}>
                  👤 <span>Employee Login</span>
                </Link>
              </div>
              <Link to="/register/employer" className="block py-2.5 text-[#D4A017] text-sm font-bold" onClick={() => setMenuOpen(false)}>Start Free Trial →</Link>
            </>
          )}
          {user && (
            <>
              {role === 'employee' && (
                <>
                  <Link to="/dashboard" className="block py-2.5 text-white/80 text-sm" onClick={() => setMenuOpen(false)}>Dashboard</Link>
                  <Link to="/modules" className="block py-2.5 text-white/80 text-sm" onClick={() => setMenuOpen(false)}>Modules</Link>
                  <Link to="/calculators" className="block py-2.5 text-white/80 text-sm" onClick={() => setMenuOpen(false)}>Calculators</Link>
                  <Link to="/get-help" className="block py-2.5 text-red-400 text-sm font-semibold" onClick={() => setMenuOpen(false)}>🆘 Get Help</Link>
                </>
              )}
              {role === 'employer_admin' && (
                <Link to="/admin" className="block py-2.5 text-white/80 text-sm" onClick={() => setMenuOpen(false)}>Admin Dashboard</Link>
              )}
              {role === 'super_admin' && (
                <Link to="/superadmin" className="block py-2.5 text-white/80 text-sm" onClick={() => setMenuOpen(false)}>Super Admin</Link>
              )}
              <Link to="/account" className="block py-2.5 text-white/80 text-sm" onClick={() => setMenuOpen(false)}>Account</Link>
              <button onClick={() => { handleSignOut(); setMenuOpen(false) }} className="block py-2.5 text-white/60 text-sm">Sign Out</button>
            </>
          )}
        </div>
      )}
    </nav>
  )
}
