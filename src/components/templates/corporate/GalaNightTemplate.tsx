'use client'

import { motion } from 'motion/react'
import type { TemplateProps } from '@/lib/templates-data'
import RSVPForm from '../shared/RSVPForm'
import CoverPhoto from '../shared/CoverPhoto'
import DawatBranding from '../shared/DawatBranding'
import ShareBar from '../shared/ShareBar'
import { viewport, staggerContainer, staggerItem } from '@/lib/motion'
import { resolveColors } from '@/lib/template-colors'
import { PLACEHOLDER_IMAGES } from '@/lib/placeholder-images'

const GALANIGHT_DEFAULTS = {
  bg: '#0A0A0A',
  primary: '#D4A853',
  secondary: '#F2E6C9',
  surface: '#1A1A1A',
  text: '#F2E6C9',
  muted: '#8A8070',
  border: '#2A2A2A',
}

const fontDisplay = { fontFamily: 'var(--font-bodoni, "Bodoni Moda", serif)' }
const fontBody = { fontFamily: 'var(--font-montserrat, "Montserrat", sans-serif)' }

function GoldDiamond({ gold }: { gold: string }) {
  return (
    <div className="flex items-center justify-center gap-3 my-2">
      <div className="h-px flex-1" style={{ background: gold, opacity: 0.3 }} />
      <svg viewBox="0 0 20 20" className="w-4 h-4" fill={gold}>
        <path d="M10 2 L18 10 L10 18 L2 10 Z" />
      </svg>
      <div className="h-px flex-1" style={{ background: gold, opacity: 0.3 }} />
    </div>
  )
}

const PROGRAM = [
  { time: '6:00 PM', activity: 'Cocktail Reception' },
  { time: '7:00 PM', activity: 'Welcome Dinner' },
  { time: '8:30 PM', activity: 'Awards Ceremony' },
  { time: '10:00 PM', activity: 'Dance Floor Opens' },
]

const HONOREES = [
  { name: 'Dr. Rafiq Ahmed', achievement: 'Lifetime Achievement Award' },
  { name: 'Nadia Sultana', achievement: 'Innovation Leader of the Year' },
  { name: 'Global Tech Corp', achievement: 'Corporate Excellence' },
]

export default function GalaNightTemplate({ event, branding, onRsvpSubmit, colors, disableEffects: _disableEffects }: TemplateProps) {
  const raw = resolveColors(colors, GALANIGHT_DEFAULTS)
  const C = {
    bg: raw.bg,
    gold: raw.primary,
    champagne: raw.text,
    surface: raw.surface,
    text: raw.text,
    muted: raw.muted,
    border: raw.border,
  }

  const { companyName, title, eventDate, subEvents, description, coverImage, sections } = event
  const placeholders = PLACEHOLDER_IMAGES.corporate
  const company = companyName ?? title
  const firstSub = subEvents[0]

  return (
    <div style={{ background: C.bg, color: C.text, ...fontBody }} className="@container min-h-screen overflow-x-hidden">

      {/* ── 1. GALA HERO ─────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 text-center overflow-hidden">
        {/* Spotlight */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(212, 168, 83, 0.08) 0%, transparent 70%)',
          }}
        />
        {/* Dot pattern */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.02]"
          style={{
            backgroundImage: 'radial-gradient(circle, #D4A853 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="relative z-10 max-w-2xl"
        >
          <p className="text-xs uppercase tracking-[0.5em] mb-6" style={{ color: C.muted }}>
            {company} presents
          </p>
          <GoldDiamond gold={C.gold} />
          <h1 style={{ ...fontDisplay, color: C.gold }} className="text-4xl @sm:text-5xl @md:text-6xl mt-6 mb-2 leading-tight">
            {title}
          </h1>
          <p style={{ ...fontDisplay, color: C.champagne }} className="text-lg italic mt-2 mb-6">
            An Evening of Excellence
          </p>
          <GoldDiamond gold={C.gold} />
          <p className="mt-6 text-sm uppercase tracking-widest" style={{ color: C.muted }}>
            {firstSub?.date ?? new Date(eventDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </motion.div>
      </section>

      {/* ── 2. EVENING PROGRAM ───────────────────────────────────────── */}
      {sections.schedule !== false && (
        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={viewport}
          variants={staggerContainer}
          className="px-4 @sm:px-8 @md:px-16 py-20 max-w-3xl mx-auto"
        >
          <motion.div variants={staggerItem} className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.4em] mb-4" style={{ color: C.muted }}>Programme</p>
            <GoldDiamond gold={C.gold} />
            <h2 style={{ ...fontDisplay, color: C.gold }} className="text-3xl mt-4">Evening Programme</h2>
          </motion.div>

          <div className="flex flex-col gap-4">
            {PROGRAM.map((item, i) => (
              <motion.div
                key={item.time}
                variants={staggerItem}
                className="flex items-center gap-6 px-6 py-4 rounded-2xl"
                style={{
                  background: C.surface,
                  borderLeft: `3px solid ${C.gold}`,
                }}
              >
                <p className="font-bold text-sm shrink-0 w-20" style={{ color: C.gold }}>{item.time}</p>
                <p className="text-sm" style={{ color: C.champagne }}>{item.activity}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}

      {/* ── 3. HONOREES ──────────────────────────────────────────────── */}
      <section className="px-4 @sm:px-8 @md:px-16 py-16" style={{ background: C.surface }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <GoldDiamond gold={C.gold} />
            <h2 style={{ ...fontDisplay, color: C.gold }} className="text-3xl mt-4">Honoring</h2>
          </div>
          <div className="grid grid-cols-1 @sm:grid-cols-3 gap-6">
            {HONOREES.map((h) => (
              <motion.div
                key={h.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewport}
                className="rounded-2xl p-6 text-center"
                style={{ background: C.bg, border: `1px solid ${C.gold}40` }}
              >
                <div
                  className="w-16 h-16 rounded-full border-2 flex items-center justify-center mx-auto mb-4"
                  style={{ borderColor: C.gold }}
                >
                  <span style={{ ...fontDisplay, color: C.gold }} className="text-xl">
                    {h.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                  </span>
                </div>
                <p style={{ ...fontDisplay, color: C.champagne }} className="text-lg mb-1">{h.name}</p>
                <p className="text-xs uppercase tracking-widest" style={{ color: C.gold }}>{h.achievement}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── cover photo ──────────────────────────────────────────────── */}
      <section className="px-4 @sm:px-8 py-8 max-w-4xl mx-auto">
        <CoverPhoto src={coverImage} fallback={placeholders.cover} alt={title} shape="landscape" />
      </section>

      {/* ── 4. DRESS CODE ────────────────────────────────────────────── */}
      <section className="px-4 @sm:px-8 py-12 text-center">
        <div
          className="inline-block px-10 py-5 mx-auto"
          style={{ border: `1px solid ${C.gold}50` }}
        >
          <p style={{ ...fontDisplay, color: C.gold }} className="text-lg">Dress Code</p>
          <p style={{ color: C.champagne }} className="text-sm mt-1 tracking-widest uppercase">Black Tie</p>
        </div>
      </section>

      {/* ── 5. VENUE ─────────────────────────────────────────────────── */}
      {sections.location !== false && firstSub && (
        <section className="px-4 @sm:px-8 @md:px-16 py-12 max-w-3xl mx-auto">
          <div className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${C.gold}30` }}>
            <div className="h-32 flex items-center justify-center" style={{ background: C.surface }}>
              <p style={{ ...fontDisplay, color: C.gold }} className="text-2xl">{firstSub.name}</p>
            </div>
            <div className="p-5" style={{ background: C.surface }}>
              <p className="text-sm" style={{ color: C.champagne }}>{firstSub.venue}</p>
              <p className="text-xs mt-1" style={{ color: C.muted }}>{firstSub.date} · {firstSub.time}</p>
            </div>
          </div>
        </section>
      )}

      {/* ── 6. RSVP ──────────────────────────────────────────────────── */}
      {sections.rsvp !== false && (
        <section className="px-4 @sm:px-8 py-20">
          <div className="max-w-lg mx-auto">
            <div className="text-center mb-8">
              <GoldDiamond gold={C.gold} />
              <h2 style={{ ...fontDisplay, color: C.gold }} className="text-3xl mt-4">
                Will You Be Joining Us?
              </h2>
            </div>
            <div
              className="rounded-2xl p-6 @sm:p-8"
              style={{ background: C.surface, border: `1px solid ${C.gold}40` }}
            >
              <RSVPForm
                subEvents={subEvents}
                onSubmit={onRsvpSubmit}
                colors={{
                  button: C.gold,
                  buttonText: C.bg,
                  label: C.champagne,
                  checkboxAccent: C.gold,
                  successText: C.champagne,
                }}
                inputStyle="underline"
                successMessage="We look forward to your presence at this elegant evening."
              />
            </div>
          </div>
        </section>
      )}

      {/* ── 7. FOOTER ────────────────────────────────────────────────── */}
      <footer className="px-4 py-10 text-center" style={{ borderTop: `1px solid ${C.gold}20` }}>
        <GoldDiamond gold={C.gold} />
        <p className="text-xs uppercase tracking-widest mt-4 mb-1" style={{ color: C.muted }}>An Exclusive Event</p>
        <p style={{ ...fontDisplay, color: C.gold }} className="text-xl">{title}</p>
        <p className="text-sm mt-1" style={{ color: C.muted }}>
          {firstSub?.date ?? new Date(eventDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
        <DawatBranding show={branding.showDawatBranding} colors={{ text: C.muted }} />
      </footer>

      <ShareBar colors={{ bar: C.surface, buttonText: C.champagne, button: C.gold, border: C.border }} floating />
    </div>
  )
}
