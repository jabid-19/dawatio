import type { Metadata } from 'next'
import { ReactNode } from 'react'
import DashboardClient from './DashboardClient'

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return <DashboardClient>{children}</DashboardClient>
}
