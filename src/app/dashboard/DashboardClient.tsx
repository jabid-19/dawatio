'use client'

import { ReactNode, useState, useEffect } from 'react'
import Sidebar from '@/components/dashboard/Sidebar'
import { useRequireAuth } from '@/lib/auth-context'
import { cn } from '@/lib/utils'

export default function DashboardClient({ children }: { children: ReactNode }) {
  const { isLoading } = useRequireAuth()
  const [collapsed, setCollapsed] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('sidebar-collapsed')
    if (stored === 'true') setCollapsed(true)
    setMounted(true)
  }, [])

  function handleToggle() {
    const next = !collapsed
    setCollapsed(next)
    localStorage.setItem('sidebar-collapsed', String(next))
  }

  if (isLoading) {
    return (
      <div className="min-h-dvh flex items-center justify-center bg-cream">
        <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-dvh bg-cream">
      <Sidebar collapsed={collapsed} onToggle={handleToggle} />
      <main
        className={cn(
          'pt-14 md:pt-0 pb-20 md:pb-0 min-h-dvh transition-[margin] duration-300 ease-in-out',
          !mounted
            ? 'md:ml-[220px]'
            : collapsed ? 'md:ml-[64px]' : 'md:ml-[220px]'
        )}
      >
        {children}
      </main>
    </div>
  )
}
