'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { CalendarDays, PlusCircle, User, LogOut, PanelLeftClose, PanelLeftOpen } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { label: 'Events', href: '/dashboard', icon: CalendarDays },
  { label: 'Create New', href: '/dashboard/create', icon: PlusCircle },
  { label: 'Account', href: '/dashboard/account', icon: User },
]

function UserAvatar({ name, size = 'md' }: { name: string; size?: 'sm' | 'md' }) {
  const initials = name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
  return (
    <div className={cn(
      'rounded-full bg-accent text-white flex items-center justify-center font-bold shrink-0',
      size === 'sm' ? 'w-7 h-7 text-[10px]' : 'w-8 h-8 text-xs'
    )}>
      {initials}
    </div>
  )
}

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
}

export default function Sidebar({ collapsed, onToggle }: SidebarProps) {
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
      <aside
        className={cn(
          'hidden md:flex flex-col fixed left-0 top-0 h-full bg-surface border-r border-border z-30',
          'transition-[width] duration-300 ease-in-out overflow-hidden',
          'shadow-(--shadow-float)',
          collapsed ? 'w-[64px]' : 'w-[220px]'
        )}
      >
        {/* Logo */}
        <div className={cn(
          'flex items-center shrink-0 h-14 py-16',
          collapsed ? 'justify-center' : 'px-4'
        )}>
          {collapsed ? (
            <Link href="/" className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center shrink-0 hover:opacity-80 transition-opacity duration-150">
              <span className="text-white text-sm font-bold leading-none">D</span>
            </Link>
          ) : (
            <Link href="/" className="flex items-center hover:opacity-80 transition-opacity duration-150 py-16" >
              <Image
                src="/logo.png"
                alt="Dawatio"
                width={80}
                height={26}
                className="object-contain"
              />
            </Link>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 p-2 overflow-y-auto">
         
          <div className="space-y-0.5">
            {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
              const active = href === '/dashboard'
                ? pathname === '/dashboard'
                : pathname.startsWith(href)
              return (
                <Link
                  key={href}
                  href={href}
                  title={collapsed ? label : undefined}
                  className={cn(
                    'flex items-center rounded-lg text-sm font-medium transition-colors duration-150',
                    collapsed ? 'justify-center p-2 mx-auto w-fit' : 'gap-3 px-3 py-2',
                    active
                      ? 'bg-accent-light text-accent [box-shadow:inset_3px_0_0_#C9622F]'
                      : 'text-ink-muted hover:bg-cream hover:text-ink'
                  )}
                >
                  <Icon className="w-[18px] h-[18px] shrink-0" />
                  {!collapsed && <span className="truncate">{label}</span>}
                </Link>
              )
            })}
          </div>
        </nav>

        {/* Bottom section */}
        <div className="border-t border-border p-2 space-y-1 shrink-0">
          {/* User card */}
          {user && (
            collapsed ? (
              <div className="flex justify-center py-1.5" title={user.name}>
                <UserAvatar name={user.name} size="sm" />
              </div>
            ) : (
              <div className="mx-1 mb-1 flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-cream border border-border">
                <UserAvatar name={user.name} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-ink truncate leading-tight">{user.name}</p>
                  <p className="text-[11px] text-ink-muted truncate leading-tight">{user.email}</p>
                </div>
              </div>
            )
          )}

          {/* Logout */}
          <div className="border-t border-border pt-1 mt-1">
            <button
              onClick={handleLogout}
              title={collapsed ? 'Log out' : undefined}
              className={cn(
                'flex items-center w-full rounded-lg text-sm font-medium transition-colors duration-150 cursor-pointer',
                'text-ink-muted hover:bg-red-50 hover:text-danger',
                collapsed ? 'justify-center p-2' : 'gap-3 px-3 py-2'
              )}
            >
              <LogOut className="w-[18px] h-[18px] shrink-0" />
              {!collapsed && <span className="truncate">Log out</span>}
            </button>
          </div>

          {/* Collapse toggle */}
          <button
            onClick={onToggle}
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            className={cn(
              'flex items-center w-full rounded-lg text-xs font-medium transition-colors duration-150 cursor-pointer',
              'text-ink-light hover:bg-cream hover:text-ink-muted',
              collapsed ? 'justify-center p-2' : 'gap-3 px-3 py-2'
            )}
          >
            <span className="transition-transform duration-300">
              {collapsed
                ? <PanelLeftOpen className="w-[16px] h-[16px] shrink-0" />
                : <PanelLeftClose className="w-[16px] h-[16px] shrink-0" />
              }
            </span>
            {!collapsed && <span className="text-[11px]">Collapse</span>}
          </button>
        </div>
      </aside>

      {/* Mobile top bar */}
      <header className="md:hidden fixed top-0 left-0 right-0 bg-surface border-b border-border z-30 px-4 h-14 flex items-center justify-between shadow-(--shadow-card)">
        <Link href="/" className="inline-flex items-center justify-center bg-accent rounded-lg px-3 py-1.5 hover:opacity-80 transition-opacity duration-150">
          <Image src="/logo.png" alt="Dawatio" width={70} height={24} style={{ objectFit: 'contain' }} />
        </Link>
        {user && <UserAvatar name={user.name} />}
      </header>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-surface border-t border-border z-30 flex shadow-(--shadow-float)">
        {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
          const active = href === '/dashboard'
            ? pathname === '/dashboard'
            : pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex-1 flex flex-col items-center justify-center gap-1 py-2 text-[10px] font-medium transition-colors duration-150',
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
