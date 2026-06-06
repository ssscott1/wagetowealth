import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import EmployeeDashboard from './EmployeeDashboard'
import EmployerAdmin from './admin/EmployerAdmin'
import SuperAdmin from './admin/SuperAdmin'

export default function Dashboard() {
  const { role, loading } = useAuth()

  if (loading) return (
    <div className="flex items-center justify-center min-h-64">
      <div className="text-gray-400 text-sm">Loading...</div>
    </div>
  )

  if (role === 'super_admin') return <SuperAdmin />
  if (role === 'employer_admin') return <EmployerAdmin />
  if (role === 'employee') return <EmployeeDashboard />

  // Logged in but role not yet resolved — show a helpful message rather than redirect loop
  return (
    <div className="flex flex-col items-center justify-center min-h-64 gap-4 text-center px-4">
      <div className="text-4xl">🔍</div>
      <h2 className="text-xl font-bold text-[#0F2B5B]">Account not linked</h2>
      <p className="text-gray-500 text-sm max-w-sm">
        Your account exists but isn't connected to an employer yet. If you registered as an employer, check your email for a confirmation link or contact support.
      </p>
      <a href="mailto:hello@wagestowealth.com.au" className="text-[#0F2B5B] font-semibold text-sm hover:underline">Contact support →</a>
    </div>
  )
}
