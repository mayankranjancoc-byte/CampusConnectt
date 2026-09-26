'use client'

import { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { users, AppUser } from '@/data/auth'

interface AuthContextValue {
  currentUser: AppUser | null
  login: (email: string, pass: string) => string | null // returns error message if any
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<AppUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Check localStorage on mount
    const storedUserId = localStorage.getItem('campusconnect_session_userid')
    if (storedUserId) {
      const user = users.find(u => u.id === storedUserId)
      if (user) {
        setCurrentUser(user)
      } else {
        localStorage.removeItem('campusconnect_session_userid')
      }
    }
    setIsLoading(false)
  }, [])

  useEffect(() => {
    // Client-side route protection
    if (isLoading) return
    
    const isLoginPage = pathname === '/login'
    
    if (!currentUser && !isLoginPage) {
      router.push('/login')
      return
    }

    if (currentUser && isLoginPage) {
      router.push('/')
      return
    }

    // Role-based protection: Student accessing organizer page
    if (currentUser?.role === 'student' && pathname.startsWith('/organizer')) {
      router.push('/')
    }
  }, [currentUser, isLoading, pathname, router])

  const login = (email: string, pass: string) => {
    // NOTE: This is a PROTOTYPE authentication system using mock data.
    // In production, use a proper backend authentication service (like Auth0, Supabase, NextAuth).
    if (email === 'student@campus.com' && pass === 'student123') {
      const u = users.find(u => u.id === 'stu-1')!
      setCurrentUser(u)
      localStorage.setItem('campusconnect_session_userid', u.id)
      return null
    }
    if (email === 'organizer@campus.com' && pass === 'admin123') {
      const u = users.find(u => u.id === 'org-1')!
      setCurrentUser(u)
      localStorage.setItem('campusconnect_session_userid', u.id)
      return null
    }
    return 'Invalid email or password.'
  }

  const logout = () => {
    setCurrentUser(null)
    localStorage.removeItem('campusconnect_session_userid')
    router.push('/login')
  }

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, isLoading }}>
      {/* Hide rendering until auth state is known to prevent hydration flashes */}
      {isLoading ? null : children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used inside an AuthProvider')
  }
  return context
}
