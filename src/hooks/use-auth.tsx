import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import pb from '@/lib/pocketbase/client'

interface AuthContextType {
  user: any | null
  isAuthenticated: boolean
  requires2FA: boolean
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signUp: (email: string, password: string, name?: string) => Promise<{ error: any }>
  verify2FA: (code: string) => void
  signOut: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any | null>(pb.authStore.record)
  const [isAuthenticated, setIsAuthenticated] = useState(
    pb.authStore.isValid && sessionStorage.getItem('2fa_verified') === 'true',
  )
  const [requires2FA, setRequires2FA] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = pb.authStore.onChange((_token, record) => {
      setUser(record)
    })

    if (pb.authStore.isValid) {
      if (sessionStorage.getItem('2fa_verified') === 'true') {
        setIsAuthenticated(true)
      } else {
        setRequires2FA(true)
      }
      pb.collection('users')
        .authRefresh()
        .catch(() => {
          pb.authStore.clear()
          sessionStorage.removeItem('2fa_verified')
          setUser(null)
          setIsAuthenticated(false)
          setRequires2FA(false)
        })
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }

    return () => {
      unsubscribe()
    }
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      await pb.collection('users').authWithPassword(email, password)
      setUser(pb.authStore.record)
      setRequires2FA(true)
      return { error: null }
    } catch (error) {
      return { error }
    }
  }

  const signUp = async (email: string, password: string, name?: string) => {
    try {
      await pb.collection('users').create({ email, password, passwordConfirm: password, name })
      await pb.collection('users').authWithPassword(email, password)
      setUser(pb.authStore.record)
      sessionStorage.setItem('2fa_verified', 'true')
      setIsAuthenticated(true)
      setRequires2FA(false)
      return { error: null }
    } catch (error) {
      return { error }
    }
  }

  const verify2FA = (_code: string) => {
    sessionStorage.setItem('2fa_verified', 'true')
    setRequires2FA(false)
    setIsAuthenticated(true)
  }

  const signOut = () => {
    sessionStorage.removeItem('2fa_verified')
    pb.authStore.clear()
    setUser(null)
    setIsAuthenticated(false)
    setRequires2FA(false)
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, requires2FA, loading, signIn, signUp, verify2FA, signOut }}
    >
      {children}
    </AuthContext.Provider>
  )
}
