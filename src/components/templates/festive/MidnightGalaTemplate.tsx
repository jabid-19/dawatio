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
  primary: '#D4A853',
  secondary: '#F2E6C9',
  text: '#F2E6C9',
  muted: '#8A8070',
} as const

function Champagne({ color }: { color: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="flex items-center justify-center gap-6 my-8"
    >
      {[1, 2].map((i) => (
        <svg key={i} viewBox="0 0 40 80" className="w-10 h-20">
          <path d="M15 10 L10 40 Q10 50 20 50 Q30 50 30 40 L25 10Z" fill={color} opacity="0.15" stroke={color} strokeWidth="1" />
          <line x1="20" y1="50" x2="20" y2="70" stroke={color} strokeWidth="2" />
          <line x1="12" y1="70" x2="28" y2="70" stroke={color} strokeWidth="2" />
          {/* Bubbles */}
          <circle cx="17" cy="38" r="1.5" fill={color} opacity="0.6" />
          <circle cx="22" cy="30" r="1" fill={color} opacity="0.5" />
          <circle cx="19" cy="22" r="1.5" fill={color} opacity="0.4" />
        </svg>
      ))}
    </motion.div>
  )
}

function GoldDivider({ color }: { color: string }) {
  return (
    <div className="flex items-center gap-3 my-6">
      <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, transparent, ${color})` }} />
      <svg viewBox="0 0 20 20" className="w-5 h-5" fill={color}>
        <polygon points="10,1 12,7 18,7 13,11 15,17 10,13 5,17 7,11 2,7 8,7" />
      </svg>
      <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, ${color}, transparent)` }} />
    </div>
  )
}

function GoldParticles({ color }: { color: string }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{
            background: color,
            left: `${8 + i * 7.5}%`,
            top: `${10 + (i % 4) * 20}%`,
            opacity: 0.3 + (i % 3) * 0.2,
          }}
          animate={{ y: [0, -8, 0], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2 + i * 0.3, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </div>
  )
}

export default function MidnightGalaTemplate({ event, branding, onRsvpSubmit, colors }: TemplateProps) {
  const C = colors ? {
    bg: colors.bg, surface: colors.surface, primary: colors.primary,
    secondary: colors.secondary, text: colors.text, muted: colors.muted,
  } : DEFAULTS

  const { title, eventDate, subEvents, description } = event

  return (
    <div style={{ background: C.bg, color: C.text, fontFamily: 'var(--font-montserrat, "Montserrat", sans-serif)' }} className="min-h-screen overflow-x-hidden">

      {/* ── HERO ── */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20 text-center relative overflow-hidden">
        <GoldParticles color={C.primary} />
        <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at center, ${C.primary}15 0%, transparent 70%)` }} />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="max-w-lg w-full relative z-10"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.4em] mb-2" style={{ color: C.primary }}>
            Ring in the New Year
          </p>

          <Champagne color={C.primary} />

          <h1
            className="text-4xl sm:text-6xl font-bold leading-tight mb-4"
            style={{ fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)', color: C.primary }}
          >
            {title}
          </h1>

          <GoldDivider color={C.primary} />

          <p className="text-base" style={{ color: C.muted }}>
            {new Date(eventDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </motion.div>
      </section>

      {/* ── COUNTDOWN ── */}
      <section className="py-16 px-6 text-center" style={{ background: C.surface }}>
        <p className="text-sm font-semibold uppercase tracking-widest mb-6" style={{ color: C.primary }}>Countdown to Midnight</p>
        <CountdownTimer targetDate={eventDate} colors={{ number: C.primary, label: C.muted }} />
      </section>

      {/* ── ABOUT ── */}
      {description && (
        <section className="py-16 px-6 max-w-xl mx-auto text-center">
          <GoldDivider color={C.primary} />
          <p className="text-base leading-relaxed mt-4" style={{ color: C.muted }}>{description}</p>
        </section>
      )}

      {/* ── SUB-EVENTS ── */}
      {subEvents.length > 0 && (
        <section className="py-16 px-6" style={{ background: C.surface }}>
          <div className="max-w-xl mx-auto">
            <h2
              className="text-2xl font-bold text-center mb-8"
              style={{ fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)', color: C.primary }}
            >
              Evening Programme
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
                  <h3 className="font-semibold text-base mb-2" style={{ color: C.primary }}>{se.name}</h3>
                  <p className="flex items-center gap-1.5 text-sm" style={{ color: C.muted }}>
                    <Clock className="w-3.5 h-3.5" />{se.date} · {se.time}
                  </p>
                  <p className="flex items-center gap-1.5 text-sm mt-1" style={{ color: C.muted }}>
                    <MapPin className="w-3.5 h-3.5" />{se.venue}
                  </p>
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
            style={{ fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)', color: C.primary }}
          >
            Reserve Your Seat
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
