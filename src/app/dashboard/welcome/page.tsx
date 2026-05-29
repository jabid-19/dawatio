'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'motion/react'
import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'
import { useRequireAuth } from '@/lib/auth-context'
import Button from '@/components/ui/Button'

const STEPS = [
  { num: '1', label: 'Choose a template' },
  { num: '2', label: 'Add your event details' },
  { num: '3', label: 'Share your invite link' },
]

export default function WelcomePage() {
  const { user, isLoading } = useRequireAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && user) {
      const seen = localStorage.getItem('dawat_welcomed')
      if (seen === 'true') {
        router.replace('/dashboard')
      }
    }
  }, [user, isLoading, router])

  function handleContinue() {
    localStorage.setItem('dawat_welcomed', 'true')
    router.push('/dashboard/create')
  }

  if (isLoading || !user) return null

  const firstName = user.name.split(' ')[0]

  return (
    <div className="min-h-dvh bg-cream flex items-center justify-center px-4 py-16">
      <motion.div
        className="w-full max-w-md text-center"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Icon */}
        <motion.div
          className="w-20 h-20 rounded-3xl bg-accent-light mx-auto mb-8 flex items-center justify-center"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Sparkles className="w-9 h-9 text-accent" />
        </motion.div>

        {/* Heading */}
        <motion.h1
          className="text-4xl font-bold text-ink mb-3 leading-tight"
          style={{ fontFamily: 'var(--font-playfair)' }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          Welcome, {firstName}!
        </motion.h1>
        <motion.p
          className="text-ink-muted mb-10 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          Dawatio lets you create beautiful digital invitation websites for any celebration — in minutes.
        </motion.p>

        {/* Steps */}
        <motion.div
          className="bg-surface rounded-2xl border border-border p-6 mb-8 text-left"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <p className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-4">How it works</p>
          <div className="space-y-4">
            {STEPS.map(({ num, label }) => (
              <div key={num} className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-accent-light flex items-center justify-center shrink-0">
                  <span className="text-sm font-bold text-accent">{num}</span>
                </div>
                <p className="text-sm font-medium text-ink">{label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="flex flex-col items-center gap-3"
        >
          <Button size="lg" className="w-full justify-center gap-2" onClick={handleContinue}>
            Create my first invite
            <ArrowRight className="w-4 h-4" />
          </Button>
          <Link
            href="/dashboard"
            onClick={() => localStorage.setItem('dawat_welcomed', 'true')}
            className="text-sm text-ink-muted hover:text-ink transition-colors"
          >
            Go to dashboard instead
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}
