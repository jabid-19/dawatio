'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { fadeUp, stagger } from '@/lib/motion'

export default function LoginPage() {
  const { login } = useAuth()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    await new Promise((r) => setTimeout(r, 600))
    const ok = login(email, password)
    if (ok) {
      router.push('/dashboard')
    } else {
      setError('Incorrect email or password.')
      setLoading(false)
    }
  }

  return (
    <motion.div
      className="w-full"
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: stagger } }}
    >
      <motion.h1
        variants={fadeUp}
        className="text-3xl font-bold text-ink mb-2"
        style={{ fontFamily: 'var(--font-playfair)' }}
      >
        Welcome back
      </motion.h1>
      <motion.p variants={fadeUp} className="text-ink-muted text-sm mb-8">
        Sign in to manage your invitations
      </motion.p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          id="email"
          label="Email"
          type="email"
          placeholder="demo@dawat.app"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />

        <div className="relative">
          <Input
            id="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 bottom-2.5 p-1 text-ink-muted hover:text-ink transition-colors cursor-pointer"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>

        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            role="alert"
            className="text-sm text-danger bg-red-50 border border-red-100 rounded-xl px-4 py-3"
          >
            {error}
          </motion.p>
        )}

        <Button type="submit" className="w-full justify-center mt-2" loading={loading} size="lg">
          Sign in
        </Button>
      </form>

      <p className="text-center text-sm text-ink-muted mt-6">
        Don&apos;t have an account?{' '}
        <Link href="/register" className="text-accent hover:text-accent-hover font-medium">
          Create one free
        </Link>
      </p>

      <div className="mt-6 pt-6 border-t border-border">
        <p className="text-center text-xs text-ink-light font-mono">
          Demo: demo@dawat.app / demo1234
        </p>
      </div>
    </motion.div>
  )
}
