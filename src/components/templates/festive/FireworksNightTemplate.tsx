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
  bg: '#030818',
  surface: '#0D1830',
  primary: '#D4A853',
  secondary: '#F0D890',
  text: '#E8EAF6',
  muted: '#8A8AB0',
} as const

function Firework({ x, y, color, delay }: { x: number; y: number; color: string; delay: number }) {
  const rays = Array.from({ length: 8 }, (_, i) => {
    const angle = (i / 8) * 2 * Math.PI
    return { dx: Math.cos(angle) * 20, dy: Math.sin(angle) * 20 }
  })
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: [0, 1, 0], scale: [0, 1, 1.2] }}
      transition={{ duration: 2, delay, repeat: Infinity, repeatDelay: 3 }}
    >
      <circle cx={x} cy={y} r="3" fill={color} />
      {rays.map((ray, i) => (
        <line key={i} x1={x} y1={y} x2={x + ray.dx} y2={y + ray.dy} stroke={color} strokeWidth="1.5" opacity="0.7" />
      ))}
    </motion.g>
  )
}

function FireworksDisplay({ primary, secondary }: { primary: string; secondary: string }) {
  return (
    <svg viewBox="0 0 200 120" className="w-full max-w-xs mx-auto my-6">
      <Firework x={40} y={30} color={primary} delay={0} />
      <Firework x={100} y={20} color={secondary} delay={0.7} />
      <Firework x={160} y={35} color={primary} delay={1.4} />
      <Firework x={70} y={70} color={secondary} delay={2} />
      <Firework x={140} y={80} color={primary} delay={0.4} />
    </svg>
  )
}

function StarDivider({ color }: { color: string }) {
  return (
    <div className="flex items-center gap-2 my-6">
      <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, transparent, ${color}80)` }} />
      <div className="flex gap-2">
        {[1, 2, 3].map((i) => (
          <svg key={i} viewBox="0 0 16 16" className="w-4 h-4" fill={color} opacity={i === 2 ? 1 : 0.5}>
            <polygon points="8,1 9.5,6 14.5,6 10.5,9 12,14 8,11 4,14 5.5,9 1.5,6 6.5,6" />
          </svg>
        ))}
      </div>
      <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, ${color}80, transparent)` }} />
    </div>
  )
}

export default function FireworksNightTemplate({ event, branding, onRsvpSubmit, colors }: TemplateProps) {
  const C = colors ? {
    bg: colors.bg, surface: colors.surface, primary: colors.primary,
    secondary: colors.secondary, text: colors.text, muted: colors.muted,
  } : DEFAULTS

  const { title, eventDate, subEvents, description } = event

  return (
    <div style={{ background: C.bg, color: C.text, fontFamily: 'var(--font-inter, "Inter", sans-serif)' }} className="min-h-screen overflow-x-hidden">

      {/* ── HERO ── */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20 text-center relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ background: `radial-gradient(ellipse at 50% 0%, ${C.primary}20 0%, transparent 60%)` }}
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="max-w-lg w-full relative z-10"
        >
          <p className="text-xs font-bold uppercase tracking-[0.4em] mb-4" style={{ color: C.primary }}>
            New Year Celebration
          </p>

          <FireworksDisplay primary={C.primary} secondary={C.secondary} />

          <h1
            className="text-4xl sm:text-5xl font-bold leading-tight mb-4"
            style={{ fontFamily: 'var(--font-syne, "Syne", sans-serif)', color: C.secondary }}
          >
            {title}
          </h1>

          <StarDivider color={C.primary} />

          <p className="text-base" style={{ color: C.muted }}>
            {new Date(eventDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </motion.div>
      </section>

      {/* ── COUNTDOWN ── */}
      <section className="py-16 px-6 text-center" style={{ background: C.surface }}>
        <p className="text-sm font-semibold uppercase tracking-widest mb-6" style={{ color: C.primary }}>Time Until Midnight</p>
        <CountdownTimer targetDate={eventDate} colors={{ number: C.primary, label: C.muted }} />
      </section>

      {/* ── ABOUT ── */}
      {description && (
        <section className="py-16 px-6 max-w-xl mx-auto text-center">
          <StarDivider color={C.primary} />
          <p className="text-base leading-relaxed mt-4" style={{ color: C.muted }}>{description}</p>
        </section>
      )}

      {/* ── SUB-EVENTS ── */}
      {subEvents.length > 0 && (
        <section className="py-16 px-6" style={{ background: C.surface }}>
          <div className="max-w-xl mx-auto">
            <h2
              className="text-2xl font-bold text-center mb-8"
              style={{ fontFamily: 'var(--font-syne, "Syne", sans-serif)', color: C.secondary }}
            >
              Night Schedule
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
            style={{ fontFamily: 'var(--font-syne, "Syne", sans-serif)', color: C.secondary }}
          >
            Join the Countdown
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
