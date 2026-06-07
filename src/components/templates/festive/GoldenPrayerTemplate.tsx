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
  bg: '#FDFAF5',
  surface: '#F0E8D0',
  primary: '#8B1A2B',
  secondary: '#D4A853',
  text: '#2C1810',
  muted: '#8A7060',
} as const

function OmSymbol({ color }: { color: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: 'easeOut' }}
      className="flex items-center justify-center my-6"
    >
      <svg viewBox="0 0 80 80" className="w-20 h-20">
        <circle cx="40" cy="40" r="36" stroke={color} strokeWidth="1.5" fill="none" opacity="0.3" />
        <circle cx="40" cy="40" r="28" stroke={color} strokeWidth="1" fill="none" opacity="0.2" />
        <text x="40" y="52" textAnchor="middle" fontSize="32" fill={color} fontFamily="serif" opacity="0.9">ॐ</text>
      </svg>
    </motion.div>
  )
}

function GoldBorder({ color, accent }: { color: string; accent: string }) {
  return (
    <div className="flex items-center gap-2 my-4">
      <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, transparent, ${accent})` }} />
      <svg viewBox="0 0 40 20" className="w-10 h-5">
        <polygon points="20,2 22,8 28,8 23,12 25,18 20,14 15,18 17,12 12,8 18,8" fill={color} />
      </svg>
      <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }} />
    </div>
  )
}

export default function GoldenPrayerTemplate({ event, branding, onRsvpSubmit, colors, disableEffects: _disableEffects }: TemplateProps) {
  const C = resolveColors(colors, DEFAULTS)

  const { title, eventDate, subEvents, description, coverImage, sections } = event
  const placeholders = PLACEHOLDER_IMAGES.festive

  return (
    <div style={{ background: C.bg, color: C.text, fontFamily: 'var(--font-dm-sans, "DM Sans", sans-serif)' }} className="@container min-h-screen overflow-x-hidden">

      {/* ── HERO ── */}
      <section
        className="min-h-screen flex flex-col items-center justify-center px-6 py-20 text-center"
        style={{ background: `linear-gradient(180deg, ${C.surface} 0%, ${C.bg} 50%)` }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="max-w-lg w-full"
        >
          <OmSymbol color={C.secondary} />

          <p className="text-xs font-medium uppercase tracking-[0.3em] mb-3" style={{ color: C.muted }}>
            A Sacred Celebration
          </p>

          <h1
            className="text-4xl @sm:text-5xl font-bold leading-tight mb-4"
            style={{ fontFamily: 'var(--font-eb-garamond, "EB Garamond", serif)', color: C.primary }}
          >
            {title}
          </h1>

          <GoldBorder color={C.secondary} accent={C.secondary} />

          <p className="text-base mt-4" style={{ color: C.muted }}>
            {new Date(eventDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </motion.div>
      </section>

      {/* ── COUNTDOWN ── */}
      {sections.countdown !== false && (
        <section className="py-16 px-6 text-center" style={{ background: C.surface }}>
          <p className="text-sm font-semibold uppercase tracking-widest mb-6" style={{ color: C.primary }}>Blessings Await In</p>
          <CountdownTimer targetDate={eventDate} colors={{ number: C.secondary, label: C.muted }} />
        </section>
      )}

      {/* ── ABOUT ── */}
      {sections.about !== false && description && (
        <section className="py-16 px-6 max-w-xl mx-auto text-center">
          <GoldBorder color={C.secondary} accent={C.secondary} />
          <p className="text-base leading-relaxed mt-4" style={{ color: C.muted }}>{description}</p>
        </section>
      )}

      {/* ── cover photo ── */}
      <section className="px-4 @sm:px-8 py-8 max-w-xl mx-auto">
        <CoverPhoto src={coverImage} fallback={FESTIVE_COVER_BY_TEMPLATE.GoldenPrayerTemplate} alt={title} shape="landscape" />
      </section>

      {/* ── SUB-EVENTS ── */}
      {sections.schedule !== false && subEvents.length > 0 && (
        <section className="py-16 px-6" style={{ background: C.surface }}>
          <div className="max-w-xl mx-auto">
            <h2
              className="text-2xl font-bold text-center mb-8"
              style={{ fontFamily: 'var(--font-eb-garamond, "EB Garamond", serif)', color: C.primary }}
            >
              Puja Schedule
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
                  style={{ background: C.bg, borderColor: C.secondary + '50' }}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="w-2 h-2 rounded-full mt-2 shrink-0"
                      style={{ background: C.secondary }}
                    />
                    <div>
                      <h3 className="font-semibold text-base" style={{ color: C.primary }}>{se.name}</h3>
                      <p className="flex items-center gap-1.5 text-sm mt-1" style={{ color: C.muted }}>
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
      {sections.rsvp !== false && (
        <section className="py-16 px-6">
          <div className="max-w-md mx-auto">
            <h2
              className="text-2xl font-bold text-center mb-8"
              style={{ fontFamily: 'var(--font-eb-garamond, "EB Garamond", serif)', color: C.primary }}
            >
              Your Presence is Blessed
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
