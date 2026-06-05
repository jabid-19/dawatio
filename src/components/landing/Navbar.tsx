'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, useScroll, useTransform, useSpring, useMotionTemplate, AnimatePresence } from 'motion/react'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Templates', href: '/templates' },
  { label: 'Pricing', href: '/pricing' },
]

export default function Navbar() {
  const pathname = usePathname()
  const { scrollY } = useScroll()
  const [menuOpen, setMenuOpen] = useState(false)

  const spring = { stiffness: 180, damping: 28, mass: 0.6 }

  const rawLogoTop  = useTransform(scrollY, [0, 90], [-20,  6])
  const rawLogoSize = useTransform(scrollY, [0, 90], [ 95, 40])
  const rawMaxWidth = useTransform(scrollY, [0, 90], [780, 660])
  const rawGap      = useTransform(scrollY, [0, 90], [ 28, 18])
  const rawBgAlpha  = useTransform(scrollY, [0, 90], [0.72, 0.96])

  const logoTop  = useSpring(rawLogoTop,  spring)
  const logoSize = useSpring(rawLogoSize, spring)
  const maxWidth = useSpring(rawMaxWidth, spring)
  const gap      = useSpring(rawGap,      spring)
  const bgAlpha  = useSpring(rawBgAlpha,  spring)
  const background = useMotionTemplate`rgba(250,248,244,${bgAlpha})`

  return (
    <div className="fixed top-10 inset-x-0 z-50 flex flex-col items-center px-4 pointer-events-none">

      {/* ── Pill ── */}
      <motion.nav
        className="relative flex items-center pointer-events-auto border border-accent w-full"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
        style={{
          height: '52px',
          paddingLeft: '20px',
          paddingRight: '20px',
          borderRadius: '9999px',
          background,
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          maxWidth,
          minWidth: 0,
        }}
      >

        {/* Mobile logo — left side */}
        <Link href="/" className="flex sm:hidden items-center cursor-pointer shrink-0">
          <div
            className="flex items-center justify-center bg-accent overflow-hidden"
            style={{ width: 36, height: 36, borderRadius: '9999px' }}
          >
            <img src="/logo.png" alt="Dawatio" style={{ width: '65%', height: '65%', objectFit: 'contain' }} />
          </div>
        </Link>

        {/* Desktop: left links */}
        <motion.div className="hidden sm:flex items-center flex-1" style={{ gap }}>
          {NAV_LINKS.map(({ label, href }, i) => {
            const isActive = pathname === href
            return (
              <motion.div
                key={href}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15 + i * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <Link
                  href={href}
                  className="relative flex items-center text-sm font-medium cursor-pointer whitespace-nowrap px-3 py-1.5 rounded-full group"
                  style={{ color: isActive ? '#1A1714' : '#6B6560', transition: 'color 0.15s ease' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#1A1714' }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.color = isActive ? '#1A1714' : '#6B6560'
                  }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeNavPill"
                      className="absolute inset-0 rounded-full"
                      style={{ background: 'rgba(201,98,47,0.10)', border: '1px solid rgba(201,98,47,0.18)' }}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <motion.span
                    className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100"
                    style={{ background: 'rgba(26,23,20,0.055)', transition: 'opacity 0.15s ease' }}
                  />
                  <span className="relative">{label}</span>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Center logo — morphs on scroll */}
        <motion.div
          initial={{ opacity: 0, scale: 0.75 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.34, 1.56, 0.64, 1] }}
          className="hidden sm:block absolute left-1/2 -translate-x-1/2"
          style={{ top: logoTop, zIndex: 10 }}
        >
          <Link href="/" className="cursor-pointer block">
            <motion.div
              className="flex items-center justify-center bg-accent overflow-hidden"
              style={{ width: logoSize, height: logoSize, borderRadius: '9999px' }}
            >
              <img
                src="/logo.png"
                alt="Dawatio"
                style={{ width: '95%', height: '95%', objectFit: 'contain' }}
              />
            </motion.div>
          </Link>
        </motion.div>

        {/* Right actions */}
        <div className="flex items-center gap-3 sm:gap-5 flex-1 justify-end">
          <motion.div
            className="hidden sm:block"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.31, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <Link
              href="/login"
              className="relative flex items-center text-sm font-medium cursor-pointer whitespace-nowrap px-3 py-1.5 rounded-full group"
              style={{ color: pathname === '/login' ? '#1A1714' : '#6B6560', transition: 'color 0.15s ease' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#1A1714' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = pathname === '/login' ? '#1A1714' : '#6B6560' }}
            >
              {pathname === '/login' && (
                <motion.span
                  layoutId="activeNavPill"
                  className="absolute inset-0 rounded-full"
                  style={{ background: 'rgba(201,98,47,0.10)', border: '1px solid rgba(201,98,47,0.18)' }}
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <motion.span
                className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100"
                style={{ background: 'rgba(26,23,20,0.055)', transition: 'opacity 0.15s ease' }}
              />
              <span className="relative">Login</span>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.38, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <Link
              href="/register"
              className="text-xs sm:text-sm font-semibold cursor-pointer whitespace-nowrap"
              style={{
                padding: '6px 14px',
                borderRadius: '9999px',
                background: 'linear-gradient(135deg, #C9622F 0%, #D4A853 100%)',
                color: '#fff',
                letterSpacing: '0.01em',
                display: 'block',
                transition: 'opacity 0.15s ease, transform 0.15s ease',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement
                el.style.opacity = '0.88'
                el.style.transform = 'translateY(-1px)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement
                el.style.opacity = '1'
                el.style.transform = 'translateY(0)'
              }}
            >
              Get started
            </Link>
          </motion.div>

          {/* Mobile: hamburger — right side */}
          <button
            className="flex sm:hidden items-center justify-center cursor-pointer shrink-0"
            style={{ color: '#1A1714', background: 'none', border: 'none', padding: 0 }}
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              {menuOpen ? (
                <motion.span key="x"
                  initial={{ rotate: -45, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 45, opacity: 0 }} transition={{ duration: 0.18 }}
                >
                  <X size={20} />
                </motion.span>
              ) : (
                <motion.span key="menu"
                  initial={{ rotate: 45, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -45, opacity: 0 }} transition={{ duration: 0.18 }}
                >
                  <Menu size={20} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.nav>

      {/* ── Mobile dropdown ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="pointer-events-auto w-full mt-2 sm:hidden"
            style={{
              borderRadius: '20px',
              background: 'rgba(250,248,244,0.97)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(201,98,47,0.25)',
            }}
            initial={{ opacity: 0, y: -8, scaleY: 0.92 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -8, scaleY: 0.92 }}
            transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="flex flex-col py-2">
              {NAV_LINKS.map(({ label, href }, i) => (
                <motion.div
                  key={href}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.2 }}
                >
                  <Link
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className="block px-5 py-3 text-sm font-medium"
                    style={{ color: pathname === href ? '#C9622F' : '#1A1714', fontWeight: pathname === href ? 600 : 500 }}
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}
              <div style={{ height: '1px', background: 'rgba(26,23,20,0.07)', margin: '4px 20px' }} />
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="block px-5 py-3 text-sm font-medium"
                style={{ color: '#6B6560' }}
              >
                Login
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}
