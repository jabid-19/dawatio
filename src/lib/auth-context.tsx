'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { DUMMY_USER } from './dummy-data'

interface AuthUser {
  name: string
  email: string
}

interface AuthContextValue {
  user: AuthUser | null
  isLoading: boolean
  login: (email: string, password: string) => boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn')
    if (loggedIn === 'true') {
      setUser({ name: DUMMY_USER.name, email: DUMMY_USER.email })
    }
    setIsLoading(false)
  }, [])

  function login(email: string, password: string): boolean {
    if (email === DUMMY_USER.email && password === DUMMY_USER.password) {
      localStorage.setItem('isLoggedIn', 'true')
      setUser({ name: DUMMY_USER.name, email: DUMMY_USER.email })
      return true
    }
    return false
  }

  function logout() {
    localStorage.removeItem('isLoggedIn')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

export function useRequireAuth() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/login')
    }
  }, [user, isLoading, router])

  return { user, isLoading }
}
