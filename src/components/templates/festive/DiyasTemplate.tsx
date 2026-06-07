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
  bg: '#FDF6EE',
  surface: '#F5E0C8',
  primary: '#D4622F',
  secondary: '#E8A030',
  text: '#2C1810',
  muted: '#8A6A50',
} as const

function DiyaFlame({ color }: { color: string }) {
  return (
    <motion.div
      animate={{ scaleY: [1, 1.15, 0.95, 1.1, 1], scaleX: [1, 0.9, 1.05, 0.95, 1] }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      style={{ originY: 1 }}
    >
      <svg viewBox="0 0 24 36" className="w-6 h-9">
        <ellipse cx="12" cy="30" rx="8" ry="5" fill={color} opacity="0.3" />
        <path d="M12 28 C8 24 6 18 8 12 C10 6 12 2 12 2 C12 2 14 6 16 12 C18 18 16 24 12 28Z" fill={color} />
        <ellipse cx="12" cy="14" rx="3" ry="4" fill="#FFF8E0" opacity="0.6" />
      </svg>
    </motion.div>
  )
}

function DiwasDiyas({ primary, secondary }: { primary: string; secondary: string }) {
  return (
    <div className="flex items-end justify-center gap-4 my-8">
      {[secondary, primary, secondary].map((color, i) => (
        <div key={i} className="flex flex-col items-center">
          <DiyaFlame color={color} />
          <svg viewBox="0 0 40 20" className="w-10 h-5" fill={primary} opacity={i === 1 ? 1 : 0.7}>
            <ellipse cx="20" cy="12" rx="18" ry="8" />
            <rect x="8" y="8" width="24" height="6" rx="2" fill={secondary} opacity="0.5" />
          </svg>
        </div>
      ))}
    </div>
  )
}

function OrnamantLine({ color }: { color: string }) {
  return (
    <div className="flex items-center gap-2 my-4">
      <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, transparent, ${color})` }} />
      <svg viewBox="0 0 32 16" className="w-8 h-4" fill={color}>
        <circle cx="16" cy="8" r="4" />
        <circle cx="6" cy="8" r="2" opacity="0.5" />
        <circle cx="26" cy="8" r="2" opacity="0.5" />
      </svg>
      <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, ${color}, transparent)` }} />
    </div>
  )
}

export default function DiyasTemplate({ event, branding, onRsvpSubmit, colors, disableEffects: _disableEffects }: TemplateProps) {
  const C = resolveColors(colors, DEFAULTS)

  const { title, eventDate, subEvents, description, coverImage, sections } = event
  const placeholders = PLACEHOLDER_IMAGES.festive

  return (
    <div style={{ background: C.bg, color: C.text, fontFamily: 'var(--font-dm-sans, "DM Sans", sans-serif)' }} className="@container min-h-screen overflow-x-hidden">

      {/* ── HERO ── */}
      <section
        className="min-h-screen flex flex-col items-center justify-center px-6 py-20 text-center"
        style={{ background: `linear-gradient(160deg, ${C.surface} 0%, ${C.bg} 60%)` }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-lg w-full"
        >
          <p className="text-sm font-medium uppercase tracking-widest mb-2" style={{ color: C.muted }}>
            You are cordially invited
          </p>

          <DiwasDiyas primary={C.primary} secondary={C.secondary} />

          <h1
            className="text-4xl @sm:text-5xl font-bold mb-4 leading-tight"
            style={{ fontFamily: 'var(--font-playfair, serif)', color: C.primary }}
          >
            {title}
          </h1>

          <OrnamantLine color={C.secondary} />

          <p className="text-base mt-4" style={{ color: C.muted }}>
            {new Date(eventDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </motion.div>
      </section>

      {/* ── COUNTDOWN ── */}
      {sections.countdown !== false && (
        <section className="py-16 px-6 text-center" style={{ background: C.surface }}>
          <p className="text-sm font-semibold uppercase tracking-widest mb-6" style={{ color: C.primary }}>Celebrations Begin In</p>
          <CountdownTimer targetDate={eventDate} colors={{ number: C.primary, label: C.muted }} />
        </section>
      )}

      {/* ── ABOUT ── */}
      {sections.about !== false && description && (
        <section className="py-16 px-6 max-w-xl mx-auto text-center">
          <OrnamantLine color={C.secondary} />
          <p className="text-base leading-relaxed mt-4" style={{ color: C.muted }}>{description}</p>
        </section>
      )}

      {/* ── cover photo ── */}
      <section className="px-4 @sm:px-8 py-8 max-w-xl mx-auto">
        <CoverPhoto src={coverImage} fallback={FESTIVE_COVER_BY_TEMPLATE.DiyasTemplate} alt={title} shape="landscape" />
      </section>

      {/* ── SUB-EVENTS ── */}
      {sections.schedule !== false && subEvents.length > 0 && (
        <section className="py-16 px-6" style={{ background: C.surface }}>
          <div className="max-w-xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8" style={{ fontFamily: 'var(--font-playfair, serif)', color: C.primary }}>
              Programme
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
                  style={{ background: C.bg, borderColor: C.secondary + '40' }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-semibold text-base" style={{ color: C.primary }}>{se.name}</h3>
                      <span className="flex items-center gap-1.5 text-sm mt-1" style={{ color: C.muted }}>
                        <Clock className="w-3.5 h-3.5" />
                        {se.date} · {se.time}
                      </span>
                      <span className="flex items-center gap-1.5 text-sm mt-1" style={{ color: C.muted }}>
                        <MapPin className="w-3.5 h-3.5" />
                        {se.venue}
                      </span>
                    </div>
                    <DiyaFlame color={C.secondary} />
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
            <h2 className="text-2xl font-bold text-center mb-8" style={{ fontFamily: 'var(--font-playfair, serif)', color: C.primary }}>
              Join the Celebration
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
