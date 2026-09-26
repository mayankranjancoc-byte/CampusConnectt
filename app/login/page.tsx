'use client'

import { useState } from 'react'
import { useAuth } from '@/components/AuthProvider'

export default function LoginPage() {
  const { login } = useAuth()
  const [error, setError] = useState('')

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

        {error && (
          <div className="mb-4 p-3 bg-error-container text-on-error-container font-body-sm text-body-sm rounded-lg border border-error/20">
            {error}
          </div>
        )}

        <div className="flex flex-col gap-3">
          <button 
            type="button"
            onClick={() => login('student@campus.com', 'student123')}
            className="w-full py-3.5 px-4 rounded-xl bg-surface-tint border border-divider-hairline text-primary font-label-lg text-label-lg hover:bg-secondary-container transition-colors shadow-sm flex items-center justify-between group"
          >
            <div className="flex flex-col items-start">
              <span>Student Portal</span>
              <span className="font-body-sm text-cocoa-sand text-xs mt-0.5">student@campus.com</span>
            </div>
            <span className="material-symbols-outlined text-cocoa-sand group-hover:text-primary transition-colors">arrow_forward</span>
          </button>
          
          <button 
            type="button"
            onClick={() => login('organizer@campus.com', 'admin123')}
            className="w-full py-3.5 px-4 rounded-xl bg-surface-tint border border-divider-hairline text-primary font-label-lg text-label-lg hover:bg-secondary-container transition-colors shadow-sm flex items-center justify-between group"
          >
            <div className="flex flex-col items-start">
              <span>Organizer Portal</span>
              <span className="font-body-sm text-cocoa-sand text-xs mt-0.5">organizer@campus.com</span>
            </div>
            <span className="material-symbols-outlined text-cocoa-sand group-hover:text-primary transition-colors">arrow_forward</span>
          </button>
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
