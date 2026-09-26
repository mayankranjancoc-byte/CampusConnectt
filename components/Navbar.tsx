'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from './AuthProvider'

const NAV_LINKS = [
  { href: '/events', label: 'Events', path: 'events' },
  { href: '/registrations', label: 'My Registrations', path: 'my-registrations' },
]

export default function Navbar() {
  const pathname = usePathname()
  const { currentUser, logout } = useAuth()

  // Do not render navbar on login page to keep it clean, or just render it empty
  if (pathname === '/login') {
    return null
  }

  // If we are not on login page, currentUser should exist because of AuthProvider redirects.
  // But just in case, return null to avoid crashes.
  if (!currentUser) return null

  return (
    <header className="fixed top-0 w-full z-50 bg-surface/90 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="h-20 max-w-[1320px] mx-auto px-margin-mobile lg:px-margin flex items-center justify-between gap-space-lg">
        {/* Logo + Nav */}
        <div className="flex items-center gap-space-xl">
          <Link href="/" className="flex items-center gap-space-xs group">
            <span className="material-symbols-outlined text-primary text-[22px] transition-transform duration-200 group-hover:rotate-45">
              emergency
            </span>
            <span className="font-headline-sm text-headline-sm tracking-tight text-on-surface">
              Campus Connect
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-space-lg">
            {NAV_LINKS.filter(link =>
              link.href !== '/organizer' || currentUser.role === 'organizer'
            ).map(link => {
              const active = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href)
              return active ? (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current="page"
                  className="transition-colors text-primary font-title-md text-title-md border-b-2 border-primary pb-0.5"
                >
                  {link.label}
                </Link>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors"
                >
                  {link.label}
                </Link>
              )
            })}
            <Link
              href="/events"
              className={`font-label-md text-label-md ${pathname.startsWith('/events') ? 'hidden' : ''} text-on-surface-variant hover:text-on-surface transition-colors`}
            >
              Collegiate Series
            </Link>
          </nav>
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-space-md">
          {currentUser.role === 'organizer' && (
            <Link
              href="/organizer"
              className="hidden sm:inline-flex items-center px-space-md py-space-xs rounded-full bg-secondary text-on-secondary font-label-md text-label-md hover:bg-secondary/90 transition-colors shadow-[0_1px_2px_rgba(35,32,29,0.03)]"
            >
              Organizer Portal
            </Link>
          )}

          {/* User Status */}
          <div className="hidden sm:flex flex-col items-end justify-center">
            <span className="font-label-md text-label-md text-on-surface">{currentUser.name}</span>
            <span className="font-label-sm text-[10px] text-on-surface-variant">{currentUser.email}</span>
          </div>

          <button
            onClick={logout}
            className="px-space-md py-space-xs rounded-full bg-surface-container-low text-primary font-label-md text-label-md border border-outline-variant hover:bg-surface-container transition-colors shadow-sm"
          >
            Log Out
          </button>
        </div>
      </div>
    </header>
  )
}
