'use client'

import { motion } from 'motion/react'
import { MapPin, Clock } from 'lucide-react'
import type { TemplateProps } from '@/lib/templates-data'
import CountdownTimer from '../shared/CountdownTimer'
import RSVPForm from '../shared/RSVPForm'
import DawatBranding from '../shared/DawatBranding'
import ShareBar from '../shared/ShareBar'
import { viewport, staggerContainer, staggerItem } from '@/lib/motion'
import { resolveColors } from '@/lib/template-colors'
import CoverPhoto from '../shared/CoverPhoto'
import { PLACEHOLDER_IMAGES, FESTIVE_COVER_BY_TEMPLATE } from '@/lib/placeholder-images'

const DEFAULTS = {
  bg: '#FBF5EC',
  surface: '#F0E0C0',
  primary: '#C9622F',
  secondary: '#D4A853',
  text: '#2C2010',
  muted: '#8A7060',
} as const

function MandalaBorder({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 200 40" className="w-full max-w-xs mx-auto" fill="none">
      {[20, 60, 100, 140, 180].map((x, i) => (
        <g key={i}>
          <circle cx={x} cy="20" r="6" fill={color} opacity={i === 2 ? 1 : 0.5} />
          <circle cx={x} cy="20" r="10" stroke={color} strokeWidth="1" opacity={0.3} />
        </g>
      ))}
      <line x1="30" y1="20" x2="50" y2="20" stroke={color} strokeWidth="1" opacity="0.4" />
      <line x1="70" y1="20" x2="90" y2="20" stroke={color} strokeWidth="1" opacity="0.4" />
      <line x1="110" y1="20" x2="130" y2="20" stroke={color} strokeWidth="1" opacity="0.4" />
      <line x1="150" y1="20" x2="170" y2="20" stroke={color} strokeWidth="1" opacity="0.4" />
    </svg>
  )
}

function FloralCorner({ color, accent }: { color: string; accent: string }) {
  return (
    <svg viewBox="0 0 80 80" className="w-20 h-20" fill="none">
      <path d="M10 10 Q40 10 40 40 Q40 10 70 10" stroke={color} strokeWidth="1.5" fill="none" opacity="0.5" />
      <circle cx="10" cy="10" r="5" fill={color} opacity="0.6" />
      <circle cx="40" cy="10" r="4" fill={accent} opacity="0.8" />
      <circle cx="70" cy="10" r="5" fill={color} opacity="0.6" />
      <circle cx="40" cy="40" r="8" fill={color} opacity="0.3" />
      <path d="M35 40 Q40 30 45 40 Q40 50 35 40Z" fill={accent} opacity="0.7" />
    </svg>
  )
}

export default function FloralMandapTemplate({ event, branding, onRsvpSubmit, colors, disableEffects: _disableEffects }: TemplateProps) {
  const C = resolveColors(colors, DEFAULTS)

  const { title, eventDate, subEvents, description, coverImage, sections } = event
  const placeholders = PLACEHOLDER_IMAGES.festive

  return (
    <div style={{ background: C.bg, color: C.text, fontFamily: 'var(--font-nunito, "Nunito Sans", sans-serif)' }} className="@container min-h-screen overflow-x-hidden">

      {/* ── HERO ── */}
      <section
        className="min-h-screen flex flex-col items-center justify-center px-6 py-20 text-center relative overflow-hidden"
        style={{ background: `linear-gradient(160deg, ${C.surface} 0%, ${C.bg} 70%)` }}
      >
        {/* Corner florals */}
        <div className="absolute top-4 left-4 opacity-60">
          <FloralCorner color={C.primary} accent={C.secondary} />
        </div>
        <div className="absolute top-4 right-4 opacity-60 scale-x-[-1]">
          <FloralCorner color={C.primary} accent={C.secondary} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-lg w-full relative z-10"
        >
          <MandalaBorder color={C.secondary} />

          <p className="text-sm font-medium uppercase tracking-widest my-4" style={{ color: C.muted }}>
            With great joy we invite you
          </p>

          <h1
            className="text-4xl @sm:text-5xl font-bold mb-4 leading-tight"
            style={{ fontFamily: 'var(--font-lora, serif)', color: C.primary }}
          >
            {title}
          </h1>

          <MandalaBorder color={C.secondary} />

          <p className="text-base mt-6" style={{ color: C.muted }}>
            {new Date(eventDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </motion.div>

        {/* Bottom corners */}
        <div className="absolute bottom-4 left-4 opacity-60 scale-y-[-1]">
          <FloralCorner color={C.primary} accent={C.secondary} />
        </div>
        <div className="absolute bottom-4 right-4 opacity-60 scale-[-1]">
          <FloralCorner color={C.primary} accent={C.secondary} />
        </div>
      </section>

      {/* ── COUNTDOWN ── */}
      {sections.countdown !== false && (
        <section className="py-16 px-6 text-center" style={{ background: C.surface }}>
          <p className="text-sm font-semibold uppercase tracking-widest mb-6" style={{ color: C.primary }}>Counting Down</p>
          <CountdownTimer targetDate={eventDate} colors={{ number: C.primary, label: C.muted }} />
        </section>
      )}

      {/* ── ABOUT ── */}
      {sections.about !== false && description && (
        <section className="py-16 px-6 max-w-xl mx-auto text-center">
          <MandalaBorder color={C.secondary} />
          <p className="text-base leading-relaxed mt-6" style={{ color: C.muted }}>{description}</p>
        </section>
      )}

      {/* ── cover photo ── */}
      <section className="px-4 @sm:px-8 py-8 max-w-xl mx-auto">
        <CoverPhoto src={coverImage} fallback={FESTIVE_COVER_BY_TEMPLATE.FloralMandapTemplate} alt={title} shape="landscape" />
      </section>

      {/* ── SUB-EVENTS ── */}
      {sections.schedule !== false && subEvents.length > 0 && (
        <section className="py-16 px-6" style={{ background: C.surface }}>
          <div className="max-w-xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8" style={{ fontFamily: 'var(--font-lora, serif)', color: C.primary }}>
              Ceremony Schedule
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
                  className="rounded-2xl p-5 border-2"
                  style={{ background: C.bg, borderColor: C.secondary + '60' }}
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
      {sections.rsvp !== false && (
        <section className="py-16 px-6">
          <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8" style={{ fontFamily: 'var(--font-lora, serif)', color: C.primary }}>
              RSVP
            </h2>
            <RSVPForm subEvents={subEvents} onSubmit={onRsvpSubmit} colors={{ button: C.primary }} />
          </div>
        </section>
      )}

      {/* ── SHARE ── */}
      <section className="py-10 px-6 text-center" style={{ background: C.surface }}>
        <ShareBar />
      </section>

      <DawatBranding show={branding.showDawatBranding} />
    </div>
  )
}
