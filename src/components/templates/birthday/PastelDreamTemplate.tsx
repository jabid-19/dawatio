'use client'

import { motion } from 'motion/react'
import type { TemplateProps } from '@/lib/templates-data'
import CountdownTimer from '../shared/CountdownTimer'
import RSVPForm from '../shared/RSVPForm'
import Gallery from '../shared/Gallery'
import DawatBranding from '../shared/DawatBranding'
import ShareBar from '../shared/ShareBar'
import { viewport, staggerContainer, staggerItem } from '@/lib/motion'

const fontDisplay = { fontFamily: 'var(--font-josefin, "Josefin Sans", sans-serif)' }
const fontBody = { fontFamily: 'var(--font-poppins, "Poppins", sans-serif)' }

function FloatingBubble({ style }: { style?: React.CSSProperties }) {
  return (
    <div
      className="absolute rounded-full pointer-events-none opacity-30"
      style={{ animation: 'pastel-float 6s ease-in-out infinite', ...style }}
    />
  )
}

export default function PastelDreamTemplate({ event, branding, onRsvpSubmit, colors }: TemplateProps) {
  const C = {
    bg: colors?.bg ?? '#FFF9FB',
    pink: colors?.primary ?? '#F8B4D9',
    peach: colors?.secondary ?? '#FFD4B8',
    mint: colors?.secondary ?? '#B8E8D0',
    lavender: colors?.surface ?? '#D4B8FF',
    text: colors?.text ?? '#4A4A4A',
    muted: colors?.muted ?? '#9A9A9A',
    white: '#FFFFFF',
  }

  const BUBBLE_COLORS = [C.pink, C.peach, C.mint, C.lavender, C.pink, C.mint, C.peach, C.lavender, C.mint, C.pink]

  const { personName, title, eventDate, subEvents, description, gallery } = event
  const name = personName ?? title.split("'s")[0] ?? 'The Birthday Star'

  return (
    <div style={{ background: C.bg, color: C.text, ...fontBody }} className="min-h-screen overflow-x-hidden">
      <style>{`
        @keyframes pastel-float {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-20px) scale(1.05); }
        }
        @keyframes pastel-sway {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
      `}</style>

      {/* ── 1. DREAMY HERO ───────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 text-center overflow-hidden">
        {/* Gradient background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, #FFF0F6 0%, #FFF9F6 30%, #F0FFF8 70%, #F8F0FF 100%)',
          }}
        />
        {/* Floating bubbles */}
        {BUBBLE_COLORS.slice(0, 8).map((color, i) => (
          <FloatingBubble
            key={i}
            style={{
              background: color,
              width: 40 + (i * 12) % 60,
              height: 40 + (i * 12) % 60,
              left: `${(i * 13) % 90}%`,
              top: `${(i * 17) % 80}%`,
              animationDelay: `${i * 0.7}s`,
              animationDuration: `${4 + (i % 3)}s`,
            }}
          />
        ))}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="relative z-10"
        >
          <p style={{ ...fontDisplay, color: C.muted }} className="text-sm uppercase tracking-widest mb-3">
            You&apos;re invited to
          </p>
          <h1 style={{ ...fontDisplay, color: C.text }} className="text-5xl sm:text-6xl font-bold leading-tight">
            {name}
          </h1>
          <p style={{ ...fontDisplay, color: C.pink }} className="text-2xl sm:text-3xl mt-2">
            Birthday Celebration ✨
          </p>

          {subEvents[0] && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-8 inline-flex items-center gap-3 rounded-full px-6 py-3"
              style={{ background: C.lavender, color: C.text }}
            >
              <span className="font-semibold">{subEvents[0].date}</span>
              <span className="opacity-40">·</span>
              <span className="font-semibold">{subEvents[0].time}</span>
            </motion.div>
          )}
        </motion.div>
      </section>

      {/* ── 2. COUNTDOWN ─────────────────────────────────────────────── */}
      <section className="px-4 py-14">
        <div className="max-w-2xl mx-auto">
          <CountdownTimer
            targetDate={eventDate}
            boxStyle="boxed"
            colors={{ box: C.pink, number: '#FFFFFF', label: '#FFE8F4', border: 'transparent' }}
          />
        </div>
      </section>

      {/* ── 3. WISHES NOTE ───────────────────────────────────────────── */}
      {description && (
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          className="px-4 sm:px-8 py-14 max-w-2xl mx-auto"
        >
          <div
            className="rounded-3xl p-8 text-center relative"
            style={{ background: C.pink, color: C.text }}
          >
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full" style={{ background: C.pink }} />
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-2xl">💬</div>
            <h3 style={{ ...fontDisplay }} className="text-2xl font-bold mb-3">A Little Note</h3>
            <p className="leading-relaxed">{description}</p>
          </div>
        </motion.section>
      )}

      {/* ── 4. GALLERY POLAROIDS ─────────────────────────────────────── */}
      <section className="px-4 sm:px-8 py-14 max-w-4xl mx-auto">
        <h2 style={{ ...fontDisplay, color: C.text }} className="text-3xl font-bold text-center mb-10">
          Sweet Memories 📸
        </h2>
        <Gallery images={gallery} variant="polaroid" />
      </section>

      {/* ── 5. DETAILS ───────────────────────────────────────────────── */}
      {subEvents[0] && (
        <section className="px-4 sm:px-8 py-14" style={{ background: C.mint + '40' }}>
          <div className="max-w-md mx-auto rounded-3xl p-6 sm:p-8" style={{ background: C.white }}>
            <h3 style={{ ...fontDisplay, color: C.text }} className="text-2xl font-bold mb-4">Party Details</h3>
            {subEvents.map((se) => (
              <div key={se.id} className="py-3" style={{ borderBottom: `1px solid ${C.lavender}` }}>
                <p className="font-semibold">{se.name}</p>
                <p className="text-sm mt-1" style={{ color: C.muted }}>{se.date} · {se.time}</p>
                <p className="text-sm" style={{ color: C.muted }}>{se.venue}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── 6. RSVP ──────────────────────────────────────────────────── */}
      <section className="px-4 sm:px-8 py-16">
        <div className="max-w-lg mx-auto">
          <h2 style={{ ...fontDisplay, color: C.text }} className="text-3xl font-bold text-center mb-8">
            Can You Come? 🌸
          </h2>
          <div
            className="rounded-3xl p-6 sm:p-8"
            style={{ background: C.white, border: `2px solid ${C.lavender}` }}
          >
            <RSVPForm
              subEvents={subEvents}
              onSubmit={onRsvpSubmit}
              colors={{
                button: `linear-gradient(135deg, ${C.pink}, ${C.peach})`,
                buttonText: '#FFFFFF',
                label: C.text,
                checkboxAccent: C.lavender,
              }}
              inputStyle="bordered"
              successMessage="Wonderful! We can't wait to celebrate with you! ✨"
            />
          </div>
        </div>
      </section>

      {/* ── 7. FOOTER ────────────────────────────────────────────────── */}
      <footer className="px-4 py-8 text-center">
        <div className="h-px w-full mb-6"
          style={{ background: `linear-gradient(90deg, ${C.pink}, ${C.lavender}, ${C.mint})` }} />
        <p style={{ ...fontDisplay, color: C.text }} className="text-lg font-bold">{name}&apos;s Birthday</p>
        <p className="text-sm mt-1" style={{ color: C.muted }}>
          {new Date(eventDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
        <DawatBranding show={branding.showDawatBranding} colors={{ text: C.muted }} />
      </footer>

      <ShareBar colors={{ bar: C.white, buttonText: C.text, button: C.pink, border: C.lavender }} floating />
    </div>
  )
}
