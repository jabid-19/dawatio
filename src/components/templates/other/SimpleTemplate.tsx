'use client'

import { motion } from 'motion/react'
import { MapPin, Calendar, Clock } from 'lucide-react'
import type { TemplateProps } from '@/lib/templates-data'
import { resolveColors } from '@/lib/template-colors'
import CountdownTimer from '../shared/CountdownTimer'
import RSVPForm from '../shared/RSVPForm'
import CoverPhoto from '../shared/CoverPhoto'
import DawatBranding from '../shared/DawatBranding'
import { PLACEHOLDER_IMAGES } from '@/lib/placeholder-images'
import ShareBar from '../shared/ShareBar'
import { viewport, staggerContainer, staggerItem } from '@/lib/motion'

const SIMPLE_DEFAULTS = {
  bg: '#FFFFFF',
  surface: '#F8F9FA',
  primary: '#3B82F6',
  secondary: '#3B82F6',
  text: '#111827',
  muted: '#6B7280',
  border: '#E5E7EB',
  card: '#FFFFFF',
}

const fontBody = { fontFamily: 'var(--font-dm-sans, "DM Sans", sans-serif)' }

export default function SimpleTemplate({ event, branding, onRsvpSubmit, colors, disableEffects: _disableEffects }: TemplateProps) {
  const C = resolveColors(colors, SIMPLE_DEFAULTS)
  const { title, eventDate, subEvents, description, hostName, message, coverImage, sections } = event
  const placeholders = PLACEHOLDER_IMAGES.other

  return (
    <div style={{ background: C.bg, color: C.text, ...fontBody }} className="@container min-h-screen overflow-x-hidden">

      {/* ── 1. HERO ──────────────────────────────────────────────────── */}
      <section className="px-6 py-20 max-w-2xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="h-1 w-12 mb-8 rounded-full" style={{ background: C.primary }} />
          <h1 className="text-4xl @sm:text-6xl font-bold leading-tight mb-4" style={{ color: C.text }}>
            {title}
          </h1>
          {hostName && (
            <p className="text-lg mb-2" style={{ color: C.muted }}>
              Hosted by <span style={{ color: C.text, fontWeight: 600 }}>{hostName}</span>
            </p>
          )}
          <div className="flex items-center gap-2 mt-4" style={{ color: C.muted }}>
            <Calendar className="w-4 h-4" />
            <span className="text-sm">
              {new Date(eventDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
          </div>
          {subEvents[0] && (
            <div className="flex items-center gap-2 mt-2 flex-wrap" style={{ color: C.muted }}>
              <Clock className="w-4 h-4" />
              <span className="text-sm">{subEvents[0].time}</span>
              <MapPin className="w-4 h-4 ml-2" />
              <span className="text-sm">{subEvents[0].venue}</span>
            </div>
          )}
        </motion.div>
      </section>

      {/* ── 2. COUNTDOWN ─────────────────────────────────────────────── */}
      {sections.countdown !== false && (
        <section className="px-4 py-10" style={{ background: C.surface }}>
          <div className="max-w-2xl mx-auto">
            <CountdownTimer targetDate={eventDate} boxStyle="boxed"
              colors={{ box: C.card, number: C.primary, label: C.muted, border: C.border }} />
          </div>
        </section>
      )}

      {/* ── 3. DESCRIPTION ───────────────────────────────────────────── */}
      {sections.about !== false && (description || message) && (
        <section className="px-6 py-16 max-w-2xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewport}>
            <p className="text-base leading-relaxed" style={{ color: C.muted }}>
              {message || description}
            </p>
          </motion.div>
        </section>
      )}

      {/* ── cover photo ──────────────────────────────────────────────── */}
      <section className="px-4 py-8 max-w-xl mx-auto">
        <CoverPhoto src={coverImage} fallback={placeholders.cover} alt={title} shape="landscape" />
      </section>

      {/* ── 4. EVENTS ────────────────────────────────────────────────── */}
      {sections.schedule !== false && subEvents.length > 1 && (
        <motion.section
          initial="initial" whileInView="animate" viewport={viewport} variants={staggerContainer}
          className="px-4 py-12 max-w-2xl mx-auto"
        >
          <h2 className="text-xl font-bold mb-6" style={{ color: C.text }}>Schedule</h2>
          <div className="flex flex-col gap-3">
            {subEvents.map((se) => (
              <motion.div
                key={se.id}
                variants={staggerItem}
                className="flex gap-4 p-4 rounded-xl"
                style={{ background: C.surface, border: `1px solid ${C.border}` }}
              >
                <div className="w-1 rounded-full self-stretch" style={{ background: C.primary }} />
                <div>
                  <p className="font-semibold text-sm" style={{ color: C.text }}>{se.name}</p>
                  <p className="text-xs mt-1" style={{ color: C.muted }}>{se.date} · {se.time}</p>
                  <p className="text-xs flex items-center gap-1 mt-0.5" style={{ color: C.muted }}>
                    <MapPin className="w-3 h-3" />{se.venue}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}

      {/* ── 5. RSVP ──────────────────────────────────────────────────── */}
      {sections.rsvp !== false && (
        <section className="px-4 py-16" style={{ background: C.surface }}>
          <div className="max-w-lg mx-auto">
            <h2 className="text-xl font-bold mb-6" style={{ color: C.text }}>RSVP</h2>
            <RSVPForm subEvents={subEvents} onSubmit={onRsvpSubmit}
              colors={{ button: C.primary, buttonText: '#FFFFFF', label: C.text, checkboxAccent: C.primary }}
              inputStyle="bordered"
              successMessage="See you there!" />
          </div>
        </section>
      )}

      {/* ── 6. FOOTER ────────────────────────────────────────────────── */}
      <footer className="px-4 py-8 text-center" style={{ borderTop: `1px solid ${C.border}` }}>
        <p className="font-semibold text-sm" style={{ color: C.text }}>{title}</p>
        <DawatBranding show={branding.showDawatBranding} colors={{ text: C.muted }} />
      </footer>

      <ShareBar colors={{ bar: C.card, buttonText: C.text, button: C.primary, border: C.border }} floating />
    </div>
  )
}
