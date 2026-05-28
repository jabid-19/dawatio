'use client'

import { ReactNode } from 'react'
import Sidebar from '@/components/dashboard/Sidebar'
import { useRequireAuth } from '@/lib/auth-context'

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { isLoading } = useRequireAuth()

  if (isLoading) {
    return (
      <div className="min-h-dvh flex items-center justify-center bg-cream">
        <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-dvh bg-cream">
      <Sidebar />
      <main className="md:ml-60 pt-14 md:pt-0 pb-20 md:pb-0 min-h-dvh">
        {children}
      </main>
    </div>
  )
}
