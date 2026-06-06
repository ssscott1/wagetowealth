import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { useState } from 'react'

export default function Navbar() {
  const { user, role, signOut } = useAuth()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  return (
    <nav className="bg-[#0F2B5B] text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#D4A017] rounded-lg flex items-center justify-center font-bold text-[#0F2B5B] text-sm">W</div>
            <span className="font-bold text-lg" style={{ fontFamily: 'DM Sans, sans-serif' }}>Wages to Wealth</span>
          </Link>

          {/* Desktop nav — not logged in */}
          {!user && (
            <div className="hidden md:flex items-center gap-6">
              <Link to="/pricing" className="text-white/80 hover:text-white text-sm transition-colors">Pricing</Link>
              <Link to="/about" className="text-white/80 hover:text-white text-sm transition-colors">About</Link>
              <Link to="/login" className="text-white/80 hover:text-white text-sm transition-colors font-semibold">Login</Link>
              <Link to="/register/employer" className="bg-[#D4A017] text-[#0F2B5B] px-4 py-2 rounded-lg text-sm font-semibold hover:bg-yellow-500 transition-colors">
                Get Started
              </Link>
            </div>
          )}

          {/* Desktop nav — logged in */}
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

          <button className="md:hidden p-2 rounded-lg hover:bg-white/10" onClick={() => setMenuOpen(!menuOpen)}>
            <div className="w-5 h-0.5 bg-white mb-1"></div>
            <div className="w-5 h-0.5 bg-white mb-1"></div>
            <div className="w-5 h-0.5 bg-white"></div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0a1f42] px-4 pb-4 space-y-2">
          {!user && (
            <>
              <Link to="/pricing" className="block py-2 text-white/80 text-sm" onClick={() => setMenuOpen(false)}>Pricing</Link>
              <Link to="/about" className="block py-2 text-white/80 text-sm" onClick={() => setMenuOpen(false)}>About</Link>
              <Link to="/login" className="block py-2 text-white text-sm font-semibold" onClick={() => setMenuOpen(false)}>Login</Link>
              <Link to="/register/employer" className="block py-2 text-[#D4A017] text-sm font-semibold" onClick={() => setMenuOpen(false)}>Get Started →</Link>
            </>
          )}
          {user && (
            <>
              {role === 'employee' && (
                <>
                  <Link to="/dashboard" className="block py-2 text-white/80 text-sm" onClick={() => setMenuOpen(false)}>Dashboard</Link>
                  <Link to="/modules" className="block py-2 text-white/80 text-sm" onClick={() => setMenuOpen(false)}>Modules</Link>
                  <Link to="/calculators" className="block py-2 text-white/80 text-sm" onClick={() => setMenuOpen(false)}>Calculators</Link>
                  <Link to="/get-help" className="block py-2 text-red-400 text-sm font-semibold" onClick={() => setMenuOpen(false)}>🆘 Get Help</Link>
                </>
              )}
              {role === 'employer_admin' && (
                <Link to="/admin" className="block py-2 text-white/80 text-sm" onClick={() => setMenuOpen(false)}>Admin Dashboard</Link>
              )}
              {role === 'super_admin' && (
                <Link to="/superadmin" className="block py-2 text-white/80 text-sm" onClick={() => setMenuOpen(false)}>Super Admin</Link>
              )}
              <Link to="/account" className="block py-2 text-white/80 text-sm" onClick={() => setMenuOpen(false)}>Account</Link>
              <button onClick={() => { handleSignOut(); setMenuOpen(false) }} className="block py-2 text-white/60 text-sm">Sign Out</button>
            </>
          )}
        </div>
      )}
    </nav>
  )
}
