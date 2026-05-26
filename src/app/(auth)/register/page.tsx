'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, CheckCircle2, Mail, Star, Heart, Sparkles } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

const floatingIcons = [
  { icon: Heart, x: -52, y: -16, rotate: -15, delay: 0, color: 'text-rose-400' },
  { icon: Star, x: 48, y: -20, rotate: 12, delay: 0.1, color: 'text-amber-400' },
  { icon: Sparkles, x: -36, y: 20, rotate: -8, delay: 0.2, color: 'text-accent' },
  { icon: Mail, x: 40, y: 18, rotate: 10, delay: 0.15, color: 'text-sky-400' },
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
      {/* Decorative illustration */}
      <motion.div
        className="relative mb-6 flex items-center justify-center"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {floatingIcons.map(({ icon: Icon, x, y, rotate, delay, color }, i) => (
          <motion.div
            key={i}
            className={`absolute ${color}`}
            style={{ x, y, rotate }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay, duration: 0.4, type: 'spring', stiffness: 200 }}
          >
            <Icon className="w-5 h-5" strokeWidth={1.5} />
          </motion.div>
        ))}
        <motion.div
          className="w-16 h-16 rounded-2xl bg-accent-light flex items-center justify-center shadow-(--shadow-card)"
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span
            className="text-2xl font-bold text-accent"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            D
          </span>
        </motion.div>
      </motion.div>

      {/* Form content — no card wrapper */}
      <div className="w-full">
        <AnimatePresence mode="wait">
          {success ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center py-8 gap-4"
            >
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-success" />
              </div>
              <p className="text-lg font-semibold text-ink">Account created!</p>
              <p className="text-sm text-ink-muted">Taking you to your dashboard…</p>
            </motion.div>
          ) : (
            <motion.div key="form">
              <h1
                className="text-2xl font-bold text-ink mb-1"
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
