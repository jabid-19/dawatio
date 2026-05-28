'use client'

import { motion } from 'motion/react'
import type { TemplateProps } from '@/lib/templates-data'
import CountdownTimer from '../shared/CountdownTimer'
import RSVPForm from '../shared/RSVPForm'
import DawatBranding from '../shared/DawatBranding'
import ShareBar from '../shared/ShareBar'
import { viewport, staggerContainer, staggerItem } from '@/lib/motion'

const fontDisplay = { fontFamily: 'var(--font-plus-jakarta, "Plus Jakarta Sans", sans-serif)' }

const FEATURES = [
  { icon: '🎯', title: 'Live Demo', desc: 'See the product in action' },
  { icon: '🤝', title: 'Networking', desc: 'Connect with peers' },
  { icon: '❓', title: 'Q&A Session', desc: 'Ask the experts' },
  { icon: '🎁', title: 'Swag Bags', desc: 'Exclusive launch gifts' },
]

const TEAM = [
  { name: 'Alex Kim', role: 'CEO' },
  { name: 'Jordan Lee', role: 'CTO' },
  { name: 'Morgan Chen', role: 'Head of Product' },
  { name: 'Sam Rivera', role: 'Lead Engineer' },
]

export default function LaunchTemplate({ event, branding, onRsvpSubmit, colors }: TemplateProps) {
  const C = {
    bg: colors?.bg ?? '#FFFFFF',
    dark: colors?.surface ?? '#0D4B5F',
    orange: colors?.primary ?? '#FF6B35',
    teal: colors?.secondary ?? '#0ABAB5',
    surface: colors?.surface ?? '#F0FDFA',
    text: colors?.text ?? '#0D1117',
    muted: colors?.muted ?? '#586069',
    border: '#D1FAF8',
    card: '#FFFFFF',
  }

  const FLOAT_SHAPES = [
    { size: 40, color: C.teal, x: '10%', y: '15%', delay: '0s' },
    { size: 25, color: C.orange, x: '85%', y: '20%', delay: '1s' },
    { size: 35, color: C.teal + '80', x: '70%', y: '60%', delay: '2s' },
    { size: 20, color: C.orange + '80', x: '20%', y: '75%', delay: '0.5s' },
    { size: 15, color: C.teal, x: '50%', y: '40%', delay: '1.5s' },
  ]

  const { companyName, title, eventDate, subEvents, description } = event
  const company = companyName ?? title
  const firstSub = subEvents[0]

  return (
    <div style={{ background: C.bg, color: C.text, ...fontDisplay }} className="min-h-screen overflow-x-hidden">
      <style>{`
        @keyframes launch-float { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-15px) rotate(5deg); } }
        @keyframes launch-type { from { width: 0; } to { width: 100%; } }
      `}</style>

      {/* ── 1. LAUNCH HERO ───────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-start justify-center px-6 sm:px-12 py-20 overflow-hidden">
        {/* Floating shapes */}
        {FLOAT_SHAPES.map((s, i) => (
          <div
            key={i}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: s.size, height: s.size,
              background: s.color, opacity: 0.15,
              left: s.x, top: s.y,
              animation: `launch-float ${3 + i}s ease-in-out ${s.delay} infinite`,
            }}
          />
        ))}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-3xl"
        >
          <p className="text-xs uppercase tracking-widest mb-4 font-semibold" style={{ color: C.teal }}>
            {company} presents
          </p>
          <h1 className="text-4xl sm:text-6xl font-black leading-tight mb-2" style={{ color: C.dark }}>
            LAUNCHING
          </h1>
          <h2 className="text-3xl sm:text-5xl font-black leading-tight mb-6" style={{ color: C.teal }}>
            {title}
          </h2>

          {firstSub && (
            <p className="text-lg font-semibold mb-8" style={{ color: C.orange }}>
              {firstSub.date} · {firstSub.time} · {firstSub.venue}
            </p>
          )}

          <motion.a
            href="#rsvp"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="inline-block px-8 py-3.5 rounded-full font-bold text-sm text-white"
            style={{ background: C.orange }}
          >
            Reserve Your Spot →
          </motion.a>
        </motion.div>
      </section>

      {/* ── 2. FEATURE GRID ──────────────────────────────────────────── */}
      <section className="px-4 sm:px-8 py-16" style={{ background: C.surface }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-black mb-10 text-center" style={{ color: C.dark }}>
            What to Expect
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={viewport}
                transition={{ delay: i * 0.08 }}
                className="rounded-2xl p-5 text-center"
                style={{
                  background: C.card,
                  borderTop: `3px solid ${i % 2 === 0 ? C.teal : C.orange}`,
                }}
              >
                <p className="text-3xl mb-2">{f.icon}</p>
                <p className="font-bold text-sm" style={{ color: C.dark }}>{f.title}</p>
                <p className="text-xs mt-1" style={{ color: C.muted }}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. COUNTDOWN BAR ─────────────────────────────────────────── */}
      <div className="px-4 py-6 text-center" style={{ background: C.teal }}>
        <p className="text-white font-bold mb-2 text-sm uppercase tracking-widest">Launches in</p>
        <CountdownTimer
          targetDate={eventDate}
          boxStyle="inline"
          colors={{ number: '#FFFFFF', label: '#CCFCF4' }}
        />
      </div>

      {/* ── 4. SCHEDULE ──────────────────────────────────────────────── */}
      {subEvents.length > 0 && (
        <section className="px-4 sm:px-8 py-16 max-w-4xl mx-auto">
          <h2 className="text-2xl font-black mb-8" style={{ color: C.dark }}>Schedule</h2>
          <div className="flex flex-col gap-3">
            {subEvents.map((se, i) => (
              <motion.div
                key={se.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={viewport}
                transition={{ delay: i * 0.1 }}
                className="flex gap-6 p-4 rounded-xl"
                style={{ background: C.surface, borderLeft: `4px solid ${i % 2 === 0 ? C.teal : C.orange}` }}
              >
                <p className="font-bold text-sm shrink-0 w-20" style={{ color: i % 2 === 0 ? C.teal : C.orange }}>
                  {se.time}
                </p>
                <div>
                  <p className="font-semibold text-sm" style={{ color: C.dark }}>{se.name}</p>
                  <p className="text-xs mt-0.5" style={{ color: C.muted }}>{se.venue}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* ── 5. TEAM ──────────────────────────────────────────────────── */}
      <section className="px-4 py-12 overflow-x-auto" style={{ background: C.surface }}>
        <div className="flex gap-6 pb-2" style={{ width: 'max-content', margin: '0 auto' }}>
          {TEAM.map((m) => (
            <div key={m.name} className="flex flex-col items-center gap-2 w-28">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center font-bold text-lg"
                style={{ background: C.dark, color: C.teal }}
              >
                {m.name.split(' ').map((n) => n[0]).join('')}
              </div>
              <p className="text-sm font-semibold text-center" style={{ color: C.text }}>{m.name}</p>
              <p className="text-xs text-center" style={{ color: C.muted }}>{m.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 6. RSVP ──────────────────────────────────────────────────── */}
      <section id="rsvp" className="px-4 sm:px-8 py-20" style={{ background: C.dark }}>
        <div className="max-w-lg mx-auto">
          <h2 className="text-3xl font-black mb-8 text-white">Get Your Pass 🚀</h2>
          <div className="rounded-2xl p-6 sm:p-8" style={{ background: C.card }}>
            <RSVPForm
              subEvents={subEvents}
              onSubmit={onRsvpSubmit}
              colors={{ button: C.teal, buttonText: '#FFFFFF', label: C.text, checkboxAccent: C.teal }}
              inputStyle="bordered"
              successMessage="You're on the list! 🚀 See you at launch."
            />
          </div>
        </div>
      </section>

      {/* ── 7. FOOTER ────────────────────────────────────────────────── */}
      <footer className="px-4 py-8 text-center" style={{ background: '#081820', borderTop: '1px solid #0A2030' }}>
        <p className="font-black text-white">{title}</p>
        <p className="text-sm mt-1" style={{ color: C.muted }}>{company}</p>
        <DawatBranding show={branding.showDawatBranding} colors={{ text: C.muted }} />
      </footer>

      <ShareBar colors={{ bar: C.dark, buttonText: '#FFFFFF', button: C.orange, border: '#0A2030' }} floating />
    </div>
  )
}
