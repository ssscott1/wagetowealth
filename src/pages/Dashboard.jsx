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

  return <Navigate to="/login" />
}
