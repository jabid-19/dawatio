'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, CheckCircle2, Mail, Star, Heart, Sparkles, PartyPopper } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'



const confettiDots = [
  { color: '#C9622F', x: -30, y: -30 },
  { color: '#D4A853', x:  30, y: -30 },
  { color: '#3D7A5A', x: -30, y:  30 },
  { color: '#7C3AED', x:  30, y:  30 },
]

export default function RegisterPage() {
  const { login } = useAuth()
  const router = useRouter()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  function update(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }))
    setErrors((e) => ({ ...e, [field]: '' }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs: Record<string, string> = {}
    if (!form.name.trim()) errs.name = 'Name is required'
    if (!form.email.includes('@')) errs.email = 'Enter a valid email'
    if (form.password.length < 6) errs.password = 'Password must be at least 6 characters'
    if (form.password !== form.confirm) errs.confirm = 'Passwords do not match'
    if (Object.keys(errs).length > 0) { setErrors(errs); return }

    setLoading(true)
    await new Promise((r) => setTimeout(r, 800))
    setSuccess(true)
    login('demo@dawat.app', 'demo1234')
    await new Promise((r) => setTimeout(r, 1000))
    router.push('/dashboard/welcome')
  }

  return (
    <div className="w-full flex flex-col items-center">

      <div className="w-full">
        <AnimatePresence mode="wait">
          {success ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center py-8 gap-4"
            >
              {/* Confetti dots */}
              <div className="relative">
                {confettiDots.map((dot, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-3 h-3 rounded-full"
                    style={{ backgroundColor: dot.color, top: '50%', left: '50%' }}
                    initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                    animate={{ x: dot.x, y: dot.y, opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
                  />
                ))}
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center relative z-10">
                  <CheckCircle2 className="w-8 h-8 text-success" />
                </div>
              </div>
              <p className="text-lg font-semibold text-ink">Account created!</p>
              <p className="text-sm text-ink-muted">Taking you to your dashboard…</p>
            </motion.div>
          ) : (
            <motion.div key="form">
              <h1
                className="text-3xl font-bold text-ink mb-1"
                style={{ fontFamily: 'var(--font-playfair)' }}
              >
                Create your account
              </h1>
              <p className="text-ink-muted text-sm mb-7">Start creating beautiful invitations for free</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  id="name"
                  label="Full name"
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) => update('name', e.target.value)}
                  error={errors.name}
                  required
                  autoComplete="name"
                />
                <Input
                  id="email"
                  label="Email"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => update('email', e.target.value)}
                  error={errors.email}
                  required
                  autoComplete="email"
                />
                <div className="relative">
                  <Input
                    id="password"
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="At least 6 characters"
                    value={form.password}
                    onChange={(e) => update('password', e.target.value)}
                    error={errors.password}
                    required
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 bottom-2.5 p-1 text-ink-muted hover:text-ink cursor-pointer"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <Input
                  id="confirm"
                  label="Confirm password"
                  type="password"
                  placeholder="Repeat your password"
                  value={form.confirm}
                  onChange={(e) => update('confirm', e.target.value)}
                  error={errors.confirm}
                  required
                  autoComplete="new-password"
                />

                <Button type="submit" className="w-full justify-center mt-2" loading={loading} size="lg">
                  Create free account
                </Button>
              </form>

              <p className="text-center text-sm text-ink-muted mt-6">
                Already have an account?{' '}
                <Link href="/login" className="text-accent hover:text-accent-hover font-medium">
                  Sign in
                </Link>
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
