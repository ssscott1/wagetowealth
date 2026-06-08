import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AuthProvider, useAuth } from './hooks/useAuth'
import Layout from './components/layout/Layout'
import KidsLayout from './components/kids/KidsLayout'
import Landing from './pages/Landing'
import Login from './pages/auth/Login'
import RegisterEmployer from './pages/auth/RegisterEmployer'
import RegisterEmployee from './pages/auth/RegisterEmployee'
import ForgotPassword from './pages/auth/ForgotPassword'
import Dashboard from './pages/Dashboard'
import ModuleList from './pages/ModuleList'
import ModulePage from './pages/ModulePage'
import Calculators from './pages/Calculators'
import GetHelp from './pages/GetHelp'
import Account from './pages/Account'
import EmployerAdmin from './pages/admin/EmployerAdmin'
import SuperAdmin from './pages/admin/SuperAdmin'
import Pricing from './pages/Pricing'
import About from './pages/About'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import Demo from './pages/Demo'
import CheckoutSuccess from './pages/auth/CheckoutSuccess'
import Contact from './pages/Contact'
import KidsHome from './pages/kids/KidsHome'
import KidsModuleList from './pages/kids/KidsModuleList'
import KidsModulePage from './pages/kids/KidsModulePage'

function ProtectedRoute({ children, allowedRoles }) {
  const { user, role, loading } = useAuth()
  if (loading) return <div className="flex items-center justify-center min-h-64 text-gray-400 text-sm">Loading...</div>
  if (!user) return <Navigate to="/login" replace />
  if (allowedRoles && !allowedRoles.includes(role)) return <Navigate to="/dashboard" replace />
  return children
}

function AppRoutes() {
  const location = useLocation()
  const isKids = location.pathname.startsWith('/kids')

  if (isKids) {
    return (
      <Routes>
        <Route path="/kids" element={<KidsLayout><KidsHome /></KidsLayout>} />
        <Route path="/kids/modules" element={<KidsLayout><KidsModuleList /></KidsLayout>} />
        <Route path="/kids/modules/:slug" element={<KidsLayout><KidsModulePage /></KidsLayout>} />
        <Route path="*" element={<Navigate to="/kids" replace />} />
      </Routes>
    )
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/about" element={<About />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register/employer" element={<RegisterEmployer />} />
        <Route path="/register/employee" element={<RegisterEmployee />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/demo" element={<Demo />} />
        <Route path="/checkout/success" element={<CheckoutSuccess />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/modules" element={<ProtectedRoute><ModuleList /></ProtectedRoute>} />
        <Route path="/modules/:slug" element={<ProtectedRoute><ModulePage /></ProtectedRoute>} />
        <Route path="/calculators" element={<ProtectedRoute><Calculators /></ProtectedRoute>} />
        <Route path="/get-help" element={<GetHelp />} />
        <Route path="/account" element={<ProtectedRoute><Account /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute allowedRoles={['employer_admin', 'super_admin']}><EmployerAdmin /></ProtectedRoute>} />
        <Route path="/superadmin" element={<ProtectedRoute allowedRoles={['super_admin']}><SuperAdmin /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}
