# Login Page Split-Screen Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign auth pages (`/login`, `/register`) from a centered card layout to a full-screen two-column split — white form panel on the left, terracotta decorative geometric panel on the right.

**Architecture:** The auth layout (`(auth)/layout.tsx`) is rewritten to a CSS grid — left column holds the logo and `{children}`, right column is an inline decorative panel. Both login and register pages have their outer card wrappers removed since the left panel provides the white surface. No new component files needed.

**Tech Stack:** Next.js App Router, Tailwind CSS v4 (via inline `style` for exact hex values not in the design token set), Motion (Framer Motion) for existing animations, React 19.

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `src/app/(auth)/layout.tsx` | Rewrite | Two-column grid, left panel + logo, right decorative panel |
| `src/app/(auth)/login/page.tsx` | Modify | Remove outer `max-w` wrapper + card `motion.div` |
| `src/app/(auth)/register/page.tsx` | Modify | Remove outer `max-w` container + card `motion.div` |

---

### Task 1: Rewrite auth layout to two-column split

**Files:**
- Modify: `src/app/(auth)/layout.tsx`

- [ ] **Step 1: Replace layout.tsx with the two-column grid**

Replace the entire file content with:

```tsx
import { ReactNode } from 'react'
import Link from 'next/link'

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh grid grid-cols-1 lg:grid-cols-2">
      {/* Left panel */}
      <div className="bg-surface flex flex-col px-8 py-12 lg:px-16">
        <div className="mb-12">
          <Link
            href="/"
            className="text-2xl font-bold text-ink hover:text-accent transition-colors"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            Dawat
          </Link>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-[400px]">
            {children}
          </div>
        </div>
      </div>

      {/* Right decorative panel */}
      <div
        className="hidden lg:block relative overflow-hidden"
        style={{
          background: 'radial-gradient(ellipse at 60% 40%, #B05525 0%, #C9622F 60%, #8B3A1A 100%)',
        }}
      >
        {/* Circle 1 — gold, top-right */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{ width: 320, height: 320, backgroundColor: '#D4A853', opacity: 0.35, top: -60, right: -40 }}
        />
        {/* Circle 2 — white, bottom-left */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{ width: 200, height: 200, backgroundColor: 'white', opacity: 0.1, bottom: -30, left: -60 }}
        />
        {/* Circle 3 — accent-light, center */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{ width: 120, height: 120, backgroundColor: '#F5E8E0', opacity: 0.25, top: '40%', left: '30%' }}
        />
        {/* Circle 4 — gold, bottom-right area */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{ width: 80, height: 80, backgroundColor: '#D4A853', opacity: 0.5, bottom: 60, right: '20%' }}
        />
        {/* Circle 5 — blurred white, center-low */}
        <div
          className="absolute rounded-full pointer-events-none blur-2xl"
          style={{ width: 240, height: 240, backgroundColor: 'white', opacity: 0.08, top: '60%', left: '50%', transform: 'translate(-50%, -50%)' }}
        />

        {/* Tagline */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-12">
          <p
            className="text-white text-3xl text-center leading-snug"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            Beautiful invitations,<br />made simple
          </p>
          <p className="mt-4 text-sm font-mono tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Dawat
          </p>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Start dev server and verify layout renders**

```bash
yarn dev
```

Open `http://localhost:3000/login` in browser. Verify:
- Desktop (≥1024px): two columns visible — white left, terracotta right
- Mobile (<1024px): single column, right panel hidden
- Logo "Dawat" top-left links to `/`

- [ ] **Step 3: Commit**

```bash
git add src/app/\(auth\)/layout.tsx
git commit -m "feat: rewrite auth layout to two-column split-screen"
```

---

### Task 2: Remove card wrapper from login page

**Files:**
- Modify: `src/app/(auth)/login/page.tsx`

Context: The current login page has two nested wrappers — an outer `motion.div` (`max-w-[420px]`, provides stagger context) and an inner `motion.div` (the white card with `bg-surface rounded-2xl shadow border`). The left panel now provides the white surface, so both wrappers are removed and the stagger animation context moves to the outermost returned element.

- [ ] **Step 1: Replace login/page.tsx**

Replace the entire file content with:

```tsx
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
```

- [ ] **Step 2: Verify login page in browser**

Navigate to `http://localhost:3000/login`. Verify:
- No floating card — form sits directly in white left panel
- Heading, inputs, sign-in button, demo hint all visible
- Stagger fade-up animation still plays on load
- Error message appears on wrong credentials
- Successful login with `demo@dawat.app` / `demo1234` redirects to `/dashboard`

- [ ] **Step 3: Commit**

```bash
git add src/app/\(auth\)/login/page.tsx
git commit -m "feat: remove card wrapper from login page for split-screen layout"
```

---

### Task 3: Remove card wrapper from register page

**Files:**
- Modify: `src/app/(auth)/register/page.tsx`

Context: The register page has an outer `div` (`max-w-[420px]`) and an inner `motion.div` card (`bg-surface rounded-2xl shadow border`). Remove both; keep the decorative illustration and `AnimatePresence` form content intact.

- [ ] **Step 1: Replace register/page.tsx**

Replace the entire file content with:

```tsx
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
```

- [ ] **Step 2: Verify register page in browser**

Navigate to `http://localhost:3000/register`. Verify:
- Floating icon illustration renders above the form
- No card border/shadow — form sits directly in white panel
- Validation errors display correctly (submit empty form)
- Success state (green checkmark) animates correctly on valid submit

- [ ] **Step 3: Commit**

```bash
git add src/app/\(auth\)/register/page.tsx
git commit -m "feat: remove card wrapper from register page for split-screen layout"
```

---

### Task 4: Final cross-check

- [ ] **Step 1: Verify responsive behavior**

Resize browser window below 1024px. Confirm:
- Right decorative panel disappears
- Left panel fills full width
- Logo still shows at top

- [ ] **Step 2: Verify no TypeScript errors**

```bash
yarn tsc --noEmit
```

Expected: no errors.
