import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [role, setRole] = useState(null) // 'super_admin' | 'employer_admin' | 'employee'
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      if (session?.user) fetchProfile(session.user)
      else setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) fetchProfile(session.user)
      else {
        setProfile(null)
        setRole(null)
        setLoading(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  async function fetchProfile(user) {
    // Check super admin
    const superAdminEmails = (import.meta.env.VITE_SUPER_ADMIN_EMAILS || '').split(',')
    if (superAdminEmails.includes(user.email)) {
      setRole('super_admin')
      setProfile({ email: user.email })
      setLoading(false)
      return
    }

    // Check employer admin
    const { data: empAdmin } = await supabase
      .from('employer_admins')
      .select('*, employers(*)')
      .eq('user_id', user.id)
      .single()

    if (empAdmin) {
      setRole('employer_admin')
      setProfile(empAdmin)
      setLoading(false)
      return
    }

    // Check employee
    const { data: employee } = await supabase
      .from('employees')
      .select('*, employers(*)')
      .eq('user_id', user.id)
      .single()

    if (employee) {
      setRole('employee')
      setProfile(employee)
      setLoading(false)
      return
    }

    setRole(null)
    setProfile(null)
    setLoading(false)
  }

  async function signIn(email, password) {
    return supabase.auth.signInWithPassword({ email, password })
  }

  async function signUp(email, password, userType = 'employee') {
    return supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/login`,
        data: { user_type: userType },
      },
    })
  }

  async function signOut() {
    await supabase.auth.signOut()
  }

  return (
    <AuthContext.Provider value={{ user, profile, role, loading, signIn, signUp, signOut, fetchProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
