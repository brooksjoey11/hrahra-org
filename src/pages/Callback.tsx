import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Callback() {
  const navigate = useNavigate()

  useEffect(() => {
    // Check if authentication was successful
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth/user', { credentials: 'include' })
        if (res.ok) {
          const user = await res.json()
          if (user) {
            navigate('/dashboard')
          } else {
            navigate('/')
          }
        } else {
          navigate('/')
        }
      } catch (error) {
        console.error('Auth callback error:', error)
        navigate('/')
      }
    }

    checkAuth()
  }, [navigate])

  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl mb-4">Completing authentication</h2>
        <p className="text-slate-400">Please wait...</p>
        <div className="mt-6 w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
      </div>
    </div>
  )
}
