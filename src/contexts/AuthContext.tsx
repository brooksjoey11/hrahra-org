import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react'

interface AuthContextType {
  isAuthenticated: boolean
  user: any | null
  login: () => Promise<void>
  logout: () => Promise<void>
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  // Check auth status on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth/user', { credentials: 'include' })
        if (res.ok) {
          const userData = await res.json()
          if (userData) {
            setUser(userData)
            setIsAuthenticated(true)
          }
        }
      } catch (error) {
        console.error('Auth check failed:', error)
      }
    }
    checkAuth()
  }, [])

  const login = useCallback(async () => {
    setIsLoading(true)
    // Redirect happens, loading state will clear on return
    window.location.href = '/api/auth/google'
  }, [])

  const logout = useCallback(async () => {
    setIsLoading(true)
    try {
      await fetch('/api/auth/logout', { 
        method: 'POST',
        credentials: 'include' 
      })
      setIsAuthenticated(false)
      setUser(null)
    } catch (error) {
      console.error('Logout failed:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
