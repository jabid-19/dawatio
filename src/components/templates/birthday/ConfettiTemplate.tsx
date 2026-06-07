'use client'

import { motion } from 'motion/react'
import type { TemplateProps } from '@/lib/templates-data'
import CountdownTimer from '../shared/CountdownTimer'
import RSVPForm from '../shared/RSVPForm'
import Gallery from '../shared/Gallery'
import CoverPhoto from '../shared/CoverPhoto'
import DawatBranding from '../shared/DawatBranding'
import ShareBar from '../shared/ShareBar'
import { viewport, staggerContainer, staggerItem } from '@/lib/motion'
import { resolveColors } from '@/lib/template-colors'
import { PLACEHOLDER_IMAGES } from '@/lib/placeholder-images'

const CONFETTI_DEFAULTS = {
  bg: '#FFFDF7',
  primary: '#E85D9A',
  secondary: '#47C1BF',
  surface: '#FFFFFF',
  text: '#2D2D2D',
  muted: '#777777',
  // template-specific extras
  yellow: '#F5C842',
  purple: '#9B59B6',
  card: '#FFFFFF',
} as const

const fontDisplay = { fontFamily: 'var(--font-fredoka, "Fredoka", sans-serif)' }
const fontBody = { fontFamily: 'var(--font-quicksand, "Quicksand", sans-serif)' }

const STATIC_CONFETTI_EXTRA_COLORS = ['#FF8C42', '#4ECDC4']
const SHAPES = ['rounded-full', 'rounded-sm rotate-45', 'rounded-none rotate-12']

function ConfettiPieces({ disableEffects, colors }: { disableEffects?: boolean; colors: typeof CONFETTI_DEFAULTS }) {
  const CONFETTI_COLORS = [colors.primary, colors.secondary, colors.yellow, colors.purple, ...STATIC_CONFETTI_EXTRA_COLORS]

  const pieces = Array.from({ length: 25 }, (_, i) => ({
    color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
    shape: SHAPES[i % SHAPES.length],
    left: `${(i * 4) % 100}%`,
    delay: `${(i * 0.25) % 4}s`,
    duration: `${4 + (i % 3)}s`,
    size: 6 + (i % 6),
  }))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {!disableEffects && (
        <style>{`
          @keyframes confetti-fall {
            0%   { transform: translateY(-20px) rotate(0deg); opacity: 0; }
            10%  { opacity: 1; }
            90%  { opacity: 0.8; }
            100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
          }
        `}</style>
      )}
      {pieces.map((p, i) => (
        <div
          key={i}
          className={`absolute ${p.shape}`}
          style={{
            left: p.left,
            top: '-20px',
            width: p.size,
            height: p.size,
            background: p.color,
            animation: disableEffects ? undefined : `confetti-fall ${p.duration} ease-in ${p.delay} infinite`,
          }}
        />
      ))}
    </div>
  )
}

const ACTIVITY_PILLS = ['🎂 Cake Cutting', '🎮 Games', '💃 Dance', '🎁 Gifts', '📸 Photos', '🎈 Balloons']

export default function ConfettiTemplate({ event, branding, onRsvpSubmit, colors, disableEffects }: TemplateProps) {
  const C = resolveColors(colors, CONFETTI_DEFAULTS)
  const PILL_COLORS = [C.primary, C.secondary, C.yellow, C.purple, '#FF8C42', '#4ECDC4']

  const { personName, title, eventDate, subEvents, description, gallery, coverImage, sections } = event
  const placeholders = PLACEHOLDER_IMAGES.birthday

  const name = personName ?? title.split("'s")[0] ?? 'The Birthday Star'
  const firstSub = subEvents[0]

  return (
    <div style={{ background: C.bg, color: C.text, ...fontBody }} className="@container min-h-screen overflow-x-hidden">

      {/* ── 1. CONFETTI HERO ─────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20 overflow-hidden text-center">
        <ConfettiPieces disableEffects={disableEffects} colors={C} />

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="relative z-10"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{ ...fontDisplay, color: C.primary }}
            className="text-2xl @sm:text-3xl mb-2"
          >
            You&apos;re Invited! 🎉
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, type: 'spring', stiffness: 400, damping: 15 }}
            style={{ ...fontDisplay, color: C.text }}
            className="text-5xl @sm:text-7xl leading-tight mb-2"
          >
            {name}&apos;s
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            style={{ ...fontDisplay, color: C.primary }}
            className="text-4xl @sm:text-5xl"
          >
            Birthday! 🎂
          </motion.p>

          {/* Date & venue */}
          {firstSub && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-8 rounded-3xl px-8 py-4 inline-block"
              style={{ background: C.yellow, color: C.text }}
            >
              <p className="font-bold">{firstSub.date} · {firstSub.time}</p>
              <p className="text-sm">{firstSub.venue}</p>
            </motion.div>
          )}
        </motion.div>
      </section>

      {/* ── 2. COUNTDOWN ─────────────────────────────────────────────── */}
      {sections.countdown !== false && (
        <section className="px-4 py-12" style={{ background: C.card }}>
          <p className="text-center font-bold text-lg mb-6" style={{ ...fontDisplay, color: C.primary }}>
            Counting Down 🎈
          </p>
          <div className="max-w-2xl mx-auto">
            <CountdownTimer
              targetDate={eventDate}
              boxStyle="circular"
              colors={{ box: C.primary, number: '#FFFFFF', label: '#FFDDEE' }}
            />
          </div>
        </section>
      )}

      {/* ── 3. MESSAGE ───────────────────────────────────────────────── */}
      {sections.about !== false && description && (
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          className="px-4 @sm:px-8 py-16 max-w-2xl mx-auto text-center"
        >
          <h2 style={{ ...fontDisplay, color: C.secondary }} className="text-3xl mb-4">Let&apos;s Celebrate! 🎊</h2>
          <p className="text-base leading-relaxed" style={{ color: C.muted }}>{description}</p>
        </motion.section>
      )}

      {/* ── 4. ACTIVITY PILLS ────────────────────────────────────────── */}
      <section className="px-4 @sm:px-8 py-14 text-center" style={{ background: '#FFFBEE' }}>
        <h2 style={{ ...fontDisplay, color: C.purple }} className="text-3xl mb-8">What&apos;s Planned? 🎪</h2>
        <div className="flex flex-wrap justify-center gap-3 max-w-lg mx-auto">
          {ACTIVITY_PILLS.map((pill, i) => (
            <motion.span
              key={pill}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={viewport}
              transition={{ delay: i * 0.1, type: 'spring', stiffness: 400, damping: 15 }}
              className="px-5 py-2 rounded-full text-sm font-bold text-white"
              style={{ background: PILL_COLORS[i] }}
            >
              {pill}
            </motion.span>
          ))}
        </div>
      </section>

      {/* ── 5. GALLERY ───────────────────────────────────────────────── */}
      {sections.gallery !== false && (
        <section className="px-4 @sm:px-8 py-16 max-w-4xl mx-auto">
          <h2 style={{ ...fontDisplay, color: C.primary }} className="text-3xl text-center mb-8">Sweet Memories 📸</h2>
          <div className="max-w-xs mx-auto mb-10">
            <CoverPhoto src={coverImage} fallback={placeholders.cover} alt={title} shape="portrait" />
          </div>
          <Gallery images={gallery} fallbackImages={placeholders.gallery} variant="grid" columns={3} colors={{ overlay: `rgba(232, 93, 154, 0.2)` }} />
        </section>
      )}

      {/* ── 6. RSVP ──────────────────────────────────────────────────── */}
      {sections.rsvp !== false && (
        <section className="px-4 @sm:px-8 py-16" style={{ background: C.card }}>
          <div className="max-w-lg mx-auto">
            <h2 style={{ ...fontDisplay, color: C.secondary }} className="text-3xl text-center mb-8">Can You Make It? 🥳</h2>
            <div
              className="rounded-3xl p-6 @sm:p-8"
              style={{ background: C.bg, border: `3px solid ${C.yellow}` }}
            >
              <RSVPForm
                subEvents={subEvents}
                onSubmit={onRsvpSubmit}
                colors={{ button: C.primary, buttonText: '#FFFFFF', label: C.text, checkboxAccent: C.primary }}
                inputStyle="bordered"
                successMessage="Yay! We can't wait to see you there! 🎉"
              />
            </div>
          </div>
        </section>
      )}

      {/* ── 7. FOOTER ────────────────────────────────────────────────── */}
      <footer className="px-4 py-8 text-center" style={{ borderTop: `3px dashed ${C.yellow}` }}>
        <p style={{ ...fontDisplay, color: C.primary }} className="text-xl">
          {name}&apos;s Birthday 🎂
        </p>
        <p className="text-sm mt-1" style={{ color: C.muted }}>
          {new Date(eventDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
        <DawatBranding show={branding.showDawatBranding} colors={{ text: C.muted }} />
      </footer>

      <ShareBar colors={{ bar: C.card, buttonText: C.text, button: C.primary, border: C.yellow }} floating />
    </div>
  )
}
