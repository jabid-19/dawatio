'use client'

import { motion } from 'motion/react'
import { useRouter } from 'next/navigation'
import { LogOut } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'
import Button from '@/components/ui/Button'
import { fadeUp, stagger } from '@/lib/motion'

export default function AccountPage() {
  const { user, logout } = useAuth()
  const router = useRouter()

  function handleLogout() {
    logout()
    router.push('/')
  }

  if (!user) return null

  const initials = user.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)

  return (
    <div className="p-6 lg:p-8 max-w-xl">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: stagger } }}
      >
        <motion.h1 variants={fadeUp} className="text-2xl font-bold text-ink mb-8" style={{ fontFamily: 'var(--font-playfair)' }}>
          Account
        </motion.h1>

        <motion.div variants={fadeUp} className="bg-surface rounded-2xl border border-border p-6 flex items-center gap-5 mb-6">
          <div className="w-16 h-16 rounded-full bg-accent text-white flex items-center justify-center text-2xl font-bold">
            {initials}
          </div>
          <div>
            <p className="text-lg font-semibold text-ink">{user.name}</p>
            <p className="text-sm text-ink-muted">{user.email}</p>
          </div>
        </motion.div>

        <motion.div variants={fadeUp} className="bg-cream rounded-xl border border-border p-4 mb-6">
          <p className="text-xs text-ink-muted mb-1">Test credentials</p>
          <p className="text-sm font-mono text-ink">demo@dawat.app / demo1234</p>
        </motion.div>

        <motion.div variants={fadeUp}>
          <Button variant="danger" onClick={handleLogout} className="gap-2">
            <LogOut className="w-4 h-4" />
            Log out
          </Button>
        </motion.div>
      </motion.div>
    </div>
  )
}
