'use client'

import { motion } from 'motion/react'
import { MapPin } from 'lucide-react'
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

const NEON_DEFAULTS = {
  bg: '#0A0A0F',
  surface: '#14141F',
  primary: '#FF2D95',
  secondary: '#00D4FF',
  text: '#F0F0F0',
  muted: '#888888',
} as const

const fontDisplay = { fontFamily: 'var(--font-space-grotesk, "Space Grotesk", sans-serif)' }
const fontBody = { fontFamily: 'var(--font-inter, "Inter", sans-serif)' }

function neonGlow(color: string) {
  return { textShadow: `0 0 10px ${color}, 0 0 30px ${color}, 0 0 60px ${color}40` }
}

function boxGlow(color: string) {
  return { boxShadow: `0 0 20px ${color}40, 0 0 40px ${color}20` }
}

const TILE_ICONS = ['🎵', '🥂', '💃', '🎮', '🎤', '🎊']
const TILE_LABELS = ['Music', 'Drinks', 'Dance', 'Games', 'Karaoke', 'Surprise']

export default function NeonTemplate({ event, branding, onRsvpSubmit, colors, disableEffects }: TemplateProps) {
  const raw = resolveColors(colors, NEON_DEFAULTS)
  const C = {
    bg: raw.bg,
    surface: raw.surface,
    pink: raw.primary,
    cyan: raw.secondary,
    purple: raw.primary,
    text: raw.text,
    muted: raw.muted,
  }

  const TILE_COLORS = [C.pink, C.cyan, C.purple, C.pink, C.pink, C.cyan]

  const { personName, title, eventDate, subEvents, gallery, coverImage, sections } = event
  const placeholders = PLACEHOLDER_IMAGES.birthday

  const name = personName ?? title.split("'s")[0] ?? 'The Star'

  return (
    <div style={{ background: C.bg, color: C.text, ...fontBody }} className="@container min-h-screen overflow-x-hidden">
      {!disableEffects && (
        <style>{`
          @keyframes neon-flicker {
            0%, 95%, 100% { opacity: 1; }
            96% { opacity: 0.6; }
            97% { opacity: 1; }
            98% { opacity: 0.4; }
          }
          .neon-flicker { animation: neon-flicker 5s ease-in-out infinite; }
        `}</style>
      )}

      {/* Grid background */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* ── 1. NEON HERO ─────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 text-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 200, damping: 20 }}
            className={`${!disableEffects ? 'neon-flicker' : ''} text-5xl @sm:text-6xl @md:text-7xl @lg:text-8xl font-black leading-none mb-2`}
            style={{ ...fontDisplay, color: C.pink, ...neonGlow(C.pink) }}
          >
            {name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-2xl @sm:text-3xl font-semibold mt-4"
            style={{ color: C.cyan, ...neonGlow(C.cyan) }}
          >
            is turning {new Date(eventDate).getFullYear() - 2005}
          </motion.p>

          {subEvents[0] && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="mt-10 rounded-2xl px-6 py-4 inline-block"
              style={{ background: C.surface, border: `1px solid ${C.pink}`, ...boxGlow(C.pink) }}
            >
              <p style={{ color: C.pink }} className="font-bold">{subEvents[0].date} · {subEvents[0].time}</p>
              <p style={{ color: C.muted }} className="text-sm mt-1">{subEvents[0].venue}</p>
            </motion.div>
          )}
        </motion.div>
      </section>

      {/* ── 2. INFO CARDS ────────────────────────────────────────────── */}
      {subEvents.length > 0 && (
        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={viewport}
          variants={staggerContainer}
          className="px-4 @sm:px-8 py-16"
        >
          <div className="max-w-4xl mx-auto grid grid-cols-1 @sm:grid-cols-3 gap-4">
            {[
              { label: 'DATE', value: subEvents[0].date, color: C.pink },
              { label: 'TIME', value: subEvents[0].time, color: C.cyan },
              { label: 'VENUE', value: subEvents[0].venue, color: C.purple },
            ].map((card) => (
              <motion.div
                key={card.label}
                variants={staggerItem}
                className="rounded-2xl p-5"
                style={{
                  background: C.surface,
                  borderLeft: `4px solid ${card.color}`,
                  ...boxGlow(card.color),
                }}
              >
                <p className="text-xs uppercase tracking-widest mb-1" style={{ color: card.color }}>{card.label}</p>
                <p className="font-bold text-sm" style={{ color: C.text }}>{card.value}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}

      {/* ── 3. COUNTDOWN ─────────────────────────────────────────────── */}
      {sections.countdown !== false && (
        <section className="px-4 py-12">
          <p className="text-center text-xs uppercase tracking-widest mb-8" style={{ color: C.muted }}>
            Dropping in
          </p>
          <div className="max-w-2xl mx-auto">
            <CountdownTimer
              targetDate={eventDate}
              boxStyle="boxed"
              colors={{ box: C.surface, number: C.cyan, label: C.muted, border: '#2A2A3F' }}
            />
          </div>
        </section>
      )}

      {/* ── 4. PARTY VIBES ───────────────────────────────────────────── */}
      <section className="px-4 @sm:px-8 py-16">
        <h2
          style={{ ...fontDisplay, color: C.cyan, ...neonGlow(C.cyan) }}
          className="text-2xl font-bold text-center uppercase tracking-widest mb-10"
        >
          What to Expect
        </h2>
        <div className="max-w-3xl mx-auto grid grid-cols-2 @sm:grid-cols-3 gap-4">
          {TILE_ICONS.map((icon, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, rotateY: -90 }}
              whileInView={{ opacity: 1, rotateY: 0 }}
              viewport={viewport}
              transition={{ delay: i * 0.08 }}
              className="rounded-2xl p-6 text-center cursor-default group transition-all"
              style={{
                background: C.surface,
                border: `1px solid ${TILE_COLORS[i]}30`,
              }}
            >
              <p className="text-3xl mb-2">{icon}</p>
              <p
                style={{ color: TILE_COLORS[i] }}
                className="text-sm font-semibold uppercase tracking-wide"
              >
                {TILE_LABELS[i]}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── 5. GALLERY ───────────────────────────────────────────────── */}
      {sections.gallery !== false && (
        <section className="px-4 @sm:px-8 py-16">
          <h2 style={{ ...fontDisplay, color: C.purple, ...neonGlow(C.purple) }}
            className="text-2xl font-bold uppercase tracking-widest text-center mb-10">
            Gallery
          </h2>
          <div className="max-w-xs mx-auto mb-10" style={{ border: `1px solid ${C.pink}`, borderRadius: '1rem', overflow: 'hidden' }}>
            <CoverPhoto src={coverImage} fallback={placeholders.cover} alt={title} shape="portrait" />
          </div>
          <div className="max-w-4xl mx-auto">
            <Gallery images={gallery} fallbackImages={placeholders.gallery} variant="grid" columns={3}
              colors={{ border: C.pink, overlay: `rgba(255, 45, 149, 0.2)` }} />
          </div>
        </section>
      )}

      {/* ── 6. RSVP ──────────────────────────────────────────────────── */}
      {sections.rsvp !== false && (
        <section className="px-4 @sm:px-8 py-20">
          <div className="max-w-lg mx-auto">
            <h2
              style={{ ...fontDisplay, color: C.pink, ...neonGlow(C.pink) }}
              className="text-4xl font-black uppercase text-center mb-10"
            >
              ARE YOU IN?
            </h2>
            <div
              className="rounded-3xl p-6 @sm:p-8"
              style={{ background: C.surface, border: `1px solid ${C.pink}`, ...boxGlow(C.pink) }}
            >
              <RSVPForm
                subEvents={subEvents}
                onSubmit={onRsvpSubmit}
                colors={{ button: C.pink, buttonText: '#FFFFFF', label: C.text, checkboxAccent: C.pink }}
                inputStyle="underline"
                successMessage="SEE YOU THERE ⚡"
              />
            </div>
          </div>
        </section>
      )}

      {/* ── 7. FOOTER ────────────────────────────────────────────────── */}
      <footer className="px-4 py-8 text-center">
        <div className="h-px w-full mb-6" style={{ background: `linear-gradient(90deg, ${C.pink}, ${C.cyan}, ${C.purple})` }} />
        <p className="text-sm" style={{ color: C.muted }}>
          {name}&apos;s Birthday · {new Date(eventDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
        <DawatBranding show={branding.showDawatBranding} colors={{ text: C.muted }} />
      </footer>

      <ShareBar colors={{ bar: C.surface, buttonText: C.text, button: C.pink, border: '#2A2A3F' }} floating />
    </div>
  )
}
