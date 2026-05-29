'use client'

import { motion } from 'motion/react'
import { MapPin, Clock } from 'lucide-react'
import type { TemplateProps } from '@/lib/templates-data'
import CountdownTimer from '../shared/CountdownTimer'
import RSVPForm from '../shared/RSVPForm'
import DawatBranding from '../shared/DawatBranding'
import ShareBar from '../shared/ShareBar'
import { viewport, staggerContainer, staggerItem } from '@/lib/motion'

const DEFAULTS = {
  bg: '#0A0A0A',
  surface: '#1A1A1A',
  primary: '#C0C0C8',
  secondary: '#E0E0E8',
  text: '#F5F5F8',
  muted: '#8A8A90',
} as const

function GlamBurst({ color }: { color: string }) {
  return (
    <motion.div
      className="flex items-center justify-center my-8"
      initial={{ opacity: 0, rotate: -30, scale: 0.6 }}
      animate={{ opacity: 1, rotate: 0, scale: 1 }}
      transition={{ duration: 1, ease: 'easeOut' }}
    >
      <svg viewBox="0 0 100 100" className="w-24 h-24">
        {Array.from({ length: 16 }, (_, i) => {
          const angle = (i / 16) * 360
          const len = i % 2 === 0 ? 40 : 28
          const rad = (angle * Math.PI) / 180
          return (
            <line
              key={i}
              x1="50" y1="50"
              x2={50 + Math.cos(rad) * len}
              y2={50 + Math.sin(rad) * len}
              stroke={color}
              strokeWidth={i % 2 === 0 ? 1.5 : 1}
              opacity={i % 2 === 0 ? 0.9 : 0.4}
            />
          )
        })}
        <circle cx="50" cy="50" r="6" fill={color} />
        <circle cx="50" cy="50" r="3" fill="#FFFFFF" opacity="0.8" />
      </svg>
    </motion.div>
  )
}

function SilverLine({ color }: { color: string }) {
  return (
    <div className="flex items-center gap-2 my-5">
      <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, transparent, ${color})` }} />
      <div className="w-2 h-2 rotate-45" style={{ background: color }} />
      <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, ${color}, transparent)` }} />
    </div>
  )
}

function GlitterDots({ color }: { color: string }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            background: color,
            width: i % 3 === 0 ? '3px' : '2px',
            height: i % 3 === 0 ? '3px' : '2px',
            left: `${5 + i * 4.5}%`,
            top: `${5 + (i % 5) * 18}%`,
          }}
          animate={{ opacity: [0.1, 0.8, 0.1], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 1.5 + (i % 3) * 0.5, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </div>
  )
}

export default function MidnightGlamTemplate({ event, branding, onRsvpSubmit, colors }: TemplateProps) {
  const C = colors ? {
    bg: colors.bg, surface: colors.surface, primary: colors.primary,
    secondary: colors.secondary, text: colors.text, muted: colors.muted,
  } : DEFAULTS

  const { title, eventDate, subEvents, description } = event

  return (
    <div style={{ background: C.bg, color: C.text, fontFamily: 'var(--font-dm-sans, "DM Sans", sans-serif)' }} className="min-h-screen overflow-x-hidden">

      {/* ── HERO ── */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20 text-center relative overflow-hidden">
        <GlitterDots color={C.primary} />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="max-w-lg w-full relative z-10"
        >
          <p className="text-xs font-bold uppercase tracking-[0.5em] mb-4" style={{ color: C.primary }}>
            New Year's Eve
          </p>

          <GlamBurst color={C.primary} />

          <h1
            className="text-4xl sm:text-5xl font-bold leading-tight mb-4"
            style={{ fontFamily: 'var(--font-space-grotesk, "Space Grotesk", sans-serif)', color: C.secondary }}
          >
            {title}
          </h1>

          <SilverLine color={C.primary} />

          <p className="text-base" style={{ color: C.muted }}>
            {new Date(eventDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </motion.div>
      </section>

      {/* ── COUNTDOWN ── */}
      <section className="py-16 px-6 text-center" style={{ background: C.surface }}>
        <p className="text-sm font-semibold uppercase tracking-widest mb-6" style={{ color: C.primary }}>Until the Ball Drops</p>
        <CountdownTimer targetDate={eventDate} colors={{ number: C.primary, label: C.muted }} />
      </section>

      {/* ── ABOUT ── */}
      {description && (
        <section className="py-16 px-6 max-w-xl mx-auto text-center">
          <SilverLine color={C.primary} />
          <p className="text-base leading-relaxed mt-4" style={{ color: C.muted }}>{description}</p>
        </section>
      )}

      {/* ── SUB-EVENTS ── */}
      {subEvents.length > 0 && (
        <section className="py-16 px-6" style={{ background: C.surface }}>
          <div className="max-w-xl mx-auto">
            <h2
              className="text-2xl font-bold text-center mb-8"
              style={{ fontFamily: 'var(--font-space-grotesk, "Space Grotesk", sans-serif)', color: C.secondary }}
            >
              Evening Itinerary
            </h2>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="space-y-4"
            >
              {subEvents.map((se) => (
                <motion.div
                  key={se.id}
                  variants={staggerItem}
                  className="rounded-2xl p-5 border"
                  style={{ background: C.bg, borderColor: C.primary + '40' }}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-1 h-full rounded-full shrink-0 mt-1 self-stretch" style={{ background: C.primary, minHeight: '40px' }} />
                    <div>
                      <h3 className="font-semibold text-base mb-2" style={{ color: C.primary }}>{se.name}</h3>
                      <p className="flex items-center gap-1.5 text-sm" style={{ color: C.muted }}>
                        <Clock className="w-3.5 h-3.5" />{se.date} · {se.time}
                      </p>
                      <p className="flex items-center gap-1.5 text-sm mt-1" style={{ color: C.muted }}>
                        <MapPin className="w-3.5 h-3.5" />{se.venue}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* ── RSVP ── */}
      <section className="py-16 px-6">
        <div className="max-w-md mx-auto">
          <h2
            className="text-2xl font-bold text-center mb-8"
            style={{ fontFamily: 'var(--font-space-grotesk, "Space Grotesk", sans-serif)', color: C.secondary }}
          >
            Secure Your Spot
          </h2>
          <RSVPForm subEvents={subEvents} onSubmit={onRsvpSubmit} colors={{ button: C.primary }} />
        </div>
      </section>

      {/* ── SHARE ── */}
      <section className="py-10 px-6 text-center" style={{ background: C.surface }}>
        <ShareBar />
      </section>

      <DawatBranding show={branding.showDawatBranding} />
    </div>
  )
}
