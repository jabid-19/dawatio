'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { CalendarDays, PlusCircle, User, LogOut } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { label: 'Events', href: '/dashboard', icon: CalendarDays },
  { label: 'Create New', href: '/dashboard/create', icon: PlusCircle },
  { label: 'Account', href: '/dashboard/account', icon: User },
]

function UserAvatar({ name }: { name: string }) {
  const initials = name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
  return (
    <div className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center text-xs font-bold">
      {initials}
    </div>
  )
}

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout } = useAuth()

  function handleLogout() {
    logout()
    router.push('/')
  }

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col fixed left-0 top-0 h-full w-60 bg-surface border-r border-border z-30">
        <div className="p-6 border-b border-border">
          <Link href="/" className="inline-flex items-center justify-center bg-accent rounded-xl px-4 py-2">
            <Image src="/logo.png" alt="Dawatio" width={90} height={30} style={{ objectFit: 'contain' }} />
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
            const active = href === '/dashboard'
              ? pathname === '/dashboard'
              : pathname.startsWith(href)
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors',
                  active
                    ? 'bg-accent-light text-accent'
                    : 'text-ink-muted hover:bg-cream hover:text-ink'
                )}
              >
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-border">
          {user && (
            <div className="flex items-center gap-3 mb-3 px-3 py-2">
              <UserAvatar name={user.name} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-ink truncate">{user.name}</p>
                <p className="text-xs text-ink-muted truncate">{user.email}</p>
              </div>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-ink-muted hover:bg-red-50 hover:text-danger transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            Log out
          </button>
        </div>
      </aside>

      {/* Mobile top bar */}
      <header className="md:hidden fixed top-0 left-0 right-0 bg-surface border-b border-border z-30 px-4 h-14 flex items-center justify-between">
        <Link href="/" className="inline-flex items-center justify-center bg-accent rounded-lg px-3 py-1.5">
          <Image src="/logo.png" alt="Dawatio" width={70} height={24} style={{ objectFit: 'contain' }} />
        </Link>
        {user && <UserAvatar name={user.name} />}
      </header>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-surface border-t border-border z-30 flex">
        {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
          const active = href === '/dashboard'
            ? pathname === '/dashboard'
            : pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex-1 flex flex-col items-center justify-center gap-1 py-2 text-[10px] font-medium transition-colors',
                active ? 'text-accent' : 'text-ink-muted'
              )}
            >
              <Icon className="w-5 h-5" />
              {label}
            </Link>
          )
        })}
      </nav>
    </>
  )
}
