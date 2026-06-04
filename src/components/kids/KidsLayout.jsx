import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'

export default function KidsLayout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #f0f9ff 0%, #fef3c7 50%, #fdf2f8 100%)' }}>
      {/* Kids Navbar */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b-2 border-purple-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/kids" className="flex items-center gap-2 font-black text-xl" style={{ fontFamily: 'DM Sans' }}>
            <span className="text-2xl">🐷</span>
            <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              Money School
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link to="/kids" className={`text-sm font-semibold transition-colors ${location.pathname === '/kids' ? 'text-purple-600' : 'text-gray-600 hover:text-purple-600'}`}>
              Home
            </Link>
            <Link to="/kids/modules" className={`text-sm font-semibold transition-colors ${location.pathname.startsWith('/kids/modules') ? 'text-purple-600' : 'text-gray-600 hover:text-purple-600'}`}>
              Lessons
            </Link>
            <Link to="/" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
              ← Back to Wages to Wealth
            </Link>
          </div>

          <button className="md:hidden p-2 rounded-lg text-gray-600" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-purple-100 bg-white px-4 py-3 space-y-3">
            <Link to="/kids" className="block text-sm font-semibold text-gray-700" onClick={() => setMenuOpen(false)}>🏠 Home</Link>
            <Link to="/kids/modules" className="block text-sm font-semibold text-gray-700" onClick={() => setMenuOpen(false)}>📚 Lessons</Link>
            <Link to="/" className="block text-sm text-gray-400" onClick={() => setMenuOpen(false)}>← Wages to Wealth</Link>
          </div>
        )}
      </nav>

      <main>{children}</main>

      <footer className="bg-white/60 border-t-2 border-purple-100 py-8 mt-12 text-center">
        <div className="text-2xl mb-2">🐷💰🎓</div>
        <p className="text-sm font-bold text-purple-700" style={{ fontFamily: 'DM Sans' }}>Money School by Wages to Wealth</p>
        <p className="text-xs text-gray-400 mt-1">Fun, free financial education for young Australians aged 12–16</p>
        <p className="text-xs text-gray-400 mt-3 max-w-xl mx-auto">
          This content is general educational information only and is not financial advice. Always talk to your parents or a trusted adult before making money decisions.
        </p>
      </footer>
    </div>
  )
}
