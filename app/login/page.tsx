'use client'

import { useState } from 'react'
import { useAuth } from '@/components/AuthProvider'

export default function LoginPage() {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Please enter both email and password.')
      return
    }

    const err = login(email, password)
    if (err) {
      setError(err)
    }
  }

  const fillDemo = (role: 'student' | 'organizer') => {
    if (role === 'student') {
      setEmail('student@campus.com')
      setPassword('student123')
    } else {
      setEmail('organizer@campus.com')
      setPassword('admin123')
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-surface px-margin-mobile">
      <div className="w-full max-w-md bg-surface-white border border-divider-hairline rounded-xl p-space-lg shadow-sm">
        
        {/* Branding Header */}
        <div className="flex flex-col items-center mb-space-lg text-center">
          <div className="flex items-center gap-space-xs mb-space-xs text-primary">
            <span className="material-symbols-outlined text-[28px]">emergency</span>
          </div>
          <h1 className="font-headline-lg text-headline-lg tracking-tight text-primary">
            Campus Connect
          </h1>
          <p className="font-body-sm text-body-sm text-cocoa-sand mt-1">
            Sign in to access your campus portal
          </p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-space-md">
          {error && (
            <div className="p-3 bg-error-container text-on-error-container font-body-sm text-body-sm rounded-lg border border-error/20">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-1">
            <label className="font-label-sm text-label-sm text-primary font-semibold">Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-surface-white border border-divider-hairline text-primary font-body-md text-body-md placeholder:text-cocoa-sand/60 focus:outline-none focus:border-primary transition-all"
              placeholder="name@campus.com"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-label-sm text-label-sm text-primary font-semibold">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-surface-white border border-divider-hairline text-primary font-body-md text-body-md placeholder:text-cocoa-sand/60 focus:outline-none focus:border-primary transition-all"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit"
            className="w-full mt-2 py-3 rounded-full bg-primary text-canvas-cream font-label-md text-label-md font-semibold hover:bg-muted-aubergine transition-all active:translate-y-0.5 shadow-sm"
          >
            Sign In
          </button>
        </form>

        <div className="mt-space-lg pt-space-md border-t border-divider-hairline">
          <p className="font-meta-caps text-meta-caps text-cocoa-sand text-center mb-space-sm">
            Prototype Demo Accounts
          </p>
          <div className="flex gap-2">
            <button 
              type="button"
              onClick={() => fillDemo('student')}
              className="flex-1 py-2 px-3 rounded-lg bg-surface-tint border border-divider-hairline text-primary font-label-sm text-label-sm hover:bg-secondary-container transition-colors"
            >
              Fill Student
            </button>
            <button 
              type="button"
              onClick={() => fillDemo('organizer')}
              className="flex-1 py-2 px-3 rounded-lg bg-surface-tint border border-divider-hairline text-primary font-label-sm text-label-sm hover:bg-secondary-container transition-colors"
            >
              Fill Organizer
            </button>
          </div>
        </div>

        {/* Developer Note */}
        <p className="mt-space-md text-center text-xs text-cocoa-sand italic font-body-sm">
          *Note: This is a prototype authentication system using localStorage. 
          A production release must implement a secure authentication provider (e.g. NextAuth/Supabase).
        </p>
      </div>
    </div>
  )
}
