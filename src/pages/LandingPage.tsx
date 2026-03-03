import { memo } from 'react'
import { useAuth } from '../contexts/AuthContext'
import GoogleSignInButton from '../components/GoogleSignInButton'

const LandingPage = memo(() => {
  const { login, isLoading } = useAuth()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4">
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />
      
      <div className="relative z-10 text-center max-w-2xl mx-auto">
        <h1 className="text-7xl font-bold mb-4 tracking-tight bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
          HRAHRA
        </h1>
        <p className="text-slate-400 text-xl mb-12 font-light tracking-wide">
          Secure AI Control & Operations
        </p>
        
        <div className="space-y-4">
          <GoogleSignInButton 
            onClick={login}
            isLoading={isLoading}
            className="w-full max-w-xs mx-auto"
          />
          
          <p className="text-xs text-slate-600 mt-8">
            © 2026 HRAHRA. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  )
})

LandingPage.displayName = 'LandingPage'
export default LandingPage
