'use client'

import { motion } from 'motion/react'
import { MapPin, Mail, Clock } from 'lucide-react'
import type { TemplateProps } from '@/lib/templates-data'
import CountdownTimer from '../shared/CountdownTimer'
import RSVPForm from '../shared/RSVPForm'
import Gallery from '../shared/Gallery'
import DawatBranding from '../shared/DawatBranding'
import ShareBar from '../shared/ShareBar'
import { viewport, staggerContainer, staggerItem } from '@/lib/motion'

const C = {
  bg: '#FFFFFF',
  navy: '#1E3A5F',
  blue: '#2C7BE5',
  light: '#F0F4F8',
  text: '#1A202C',
  muted: '#718096',
  border: '#E2E8F0',
  card: '#FFFFFF',
} as const

const fontDisplay = { fontFamily: 'var(--font-dm-sans, "DM Sans", sans-serif)' }

const DUMMY_SPEAKERS = [
  { name: 'Dr. Aisha Rahman', title: 'CEO, TechBD', topic: 'Future of Innovation' },
  { name: 'Md. Rafiq Hassan', title: 'Director, DCCI', topic: 'Market Expansion' },
  { name: 'Priya Sharma', title: 'CTO, StartupHub', topic: 'Digital Transformation' },
]

export default function CleanDeskTemplate({ event, branding, onRsvpSubmit }: TemplateProps) {
  const { companyName, title, eventDate, subEvents, description, gallery, hostName } = event

  const company = companyName ?? title
  const firstSub = subEvents[0]

  return (
    <div style={{ background: C.bg, color: C.text, ...fontDisplay }} className="min-h-screen overflow-x-hidden">

      {/* ── 1. CORPORATE HERO ────────────────────────────────────────── */}
      <section className="px-4 sm:px-8 md:px-16 py-16" style={{ background: C.light }}>
        <div className="max-w-4xl mx-auto">
          {/* Logo placeholder */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8 flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: C.navy }}>
              <span className="text-white font-bold text-sm">{company.slice(0, 2).toUpperCase()}</span>
            </div>
            <span className="font-bold text-lg" style={{ color: C.navy }}>{company}</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span
              className="inline-block text-xs uppercase tracking-widest px-3 py-1 rounded-full mb-4 font-semibold"
              style={{ background: C.blue + '15', color: C.blue }}
            >
              {event.type === 'corporate' ? 'Corporate Event' : 'Professional Event'}
            </span>
            <h1 className="text-3xl sm:text-5xl font-bold leading-tight mb-4">{title}</h1>
            <p className="text-base max-w-2xl leading-relaxed" style={{ color: C.muted }}>
              {description || 'Join us for an exclusive event bringing together industry leaders and innovators.'}
            </p>
          </motion.div>

          {/* Info bar */}
          {firstSub && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-8 flex flex-wrap gap-4 sm:gap-8 py-4 px-6 rounded-2xl"
              style={{
                background: C.card,
                borderLeft: `4px solid ${C.blue}`,
                boxShadow: '0 2px 12px rgba(44, 123, 229, 0.08)',
              }}
            >
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" style={{ color: C.blue }} />
                <span className="text-sm font-medium">{firstSub.date} · {firstSub.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" style={{ color: C.blue }} />
                <span className="text-sm font-medium">{firstSub.venue}</span>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* ── 2. ABOUT ─────────────────────────────────────────────────── */}
      {description && (
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          className="px-4 sm:px-8 md:px-16 py-16 max-w-4xl mx-auto"
        >
          <h2 className="text-2xl font-bold mb-4">About This Event</h2>
          <p className="text-base leading-relaxed max-w-2xl" style={{ color: C.muted }}>{description}</p>
        </motion.section>
      )}

      {/* ── 3. AGENDA TIMELINE ───────────────────────────────────────── */}
      {subEvents.length > 0 && (
        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={viewport}
          variants={staggerContainer}
          className="px-4 sm:px-8 md:px-16 py-16"
          style={{ background: C.light }}
        >
          <div className="max-w-4xl mx-auto">
            <motion.h2 variants={staggerItem} className="text-2xl font-bold mb-8">Agenda</motion.h2>
            <div className="relative">
              <div className="absolute left-20 sm:left-24 top-0 bottom-0 w-px" style={{ background: C.border }} />
              {subEvents.map((se) => (
                <motion.div
                  key={se.id}
                  variants={staggerItem}
                  className="flex gap-6 sm:gap-8 mb-6 relative"
                >
                  <div className="w-20 sm:w-24 text-right flex-shrink-0">
                    <p className="text-sm font-semibold" style={{ color: C.blue }}>{se.time}</p>
                    <p className="text-xs" style={{ color: C.muted }}>{se.date}</p>
                  </div>
                  {/* Timeline dot */}
                  <div
                    className="w-3 h-3 rounded-full mt-1 flex-shrink-0 z-10 -ml-1.5"
                    style={{ background: C.blue, border: `2px solid ${C.bg}` }}
                  />
                  <div className="flex-1 pb-6">
                    <p className="font-semibold">{se.name}</p>
                    <p className="text-sm mt-1" style={{ color: C.muted }}>{se.venue}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      )}

      {/* ── 4. SPEAKERS ──────────────────────────────────────────────── */}
      <section className="px-4 sm:px-8 md:px-16 py-16 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-8">Speakers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {DUMMY_SPEAKERS.map((speaker) => (
            <div key={speaker.name} className="rounded-2xl p-5" style={{ background: C.light }}>
              <div
                className="w-12 h-12 rounded-full mb-3 flex items-center justify-center"
                style={{ background: C.navy }}
              >
                <span className="text-white font-bold">{speaker.name.split(' ').map((n) => n[0]).join('')}</span>
              </div>
              <p className="font-semibold">{speaker.name}</p>
              <p className="text-sm mt-0.5" style={{ color: C.blue }}>{speaker.title}</p>
              <p className="text-xs mt-1" style={{ color: C.muted }}>{speaker.topic}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 5. COUNTDOWN ─────────────────────────────────────────────── */}
      <section className="px-4 sm:px-8 md:px-16 py-12" style={{ background: C.light }}>
        <div className="max-w-2xl mx-auto">
          <p className="text-center text-xs uppercase tracking-widest mb-6 font-semibold" style={{ color: C.muted }}>
            Event starts in
          </p>
          <CountdownTimer
            targetDate={eventDate}
            boxStyle="boxed"
            colors={{ box: C.card, number: C.navy, label: C.muted, border: C.border }}
          />
        </div>
      </section>

      {/* ── 6. VENUE ─────────────────────────────────────────────────── */}
      {firstSub && (
        <section className="px-4 sm:px-8 md:px-16 py-16 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Venue</h2>
          <div className="rounded-2xl overflow-hidden p-6" style={{ background: C.light, border: `1px solid ${C.border}` }}>
            <div className="h-32 rounded-xl mb-4 flex items-center justify-center" style={{ background: C.border }}>
              <MapPin className="w-8 h-8" style={{ color: C.muted }} />
            </div>
            <p className="font-bold">{firstSub.name}</p>
            <p className="text-sm mt-1" style={{ color: C.muted }}>{firstSub.venue}</p>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(firstSub.venue)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm font-medium mt-3 hover:underline"
              style={{ color: C.blue }}
            >
              Get Directions →
            </a>
          </div>
        </section>
      )}

      {/* ── 7. RSVP ──────────────────────────────────────────────────── */}
      <section className="px-4 sm:px-8 md:px-16 py-16" style={{ background: C.light }}>
        <div className="max-w-lg mx-auto">
          <h2 className="text-2xl font-bold mb-8">Register Your Attendance</h2>
          <div className="rounded-2xl p-6 sm:p-8" style={{ background: C.card, border: `1px solid ${C.border}` }}>
            <RSVPForm
              subEvents={subEvents}
              onSubmit={onRsvpSubmit}
              colors={{ button: C.navy, buttonText: '#FFFFFF', label: C.text, checkboxAccent: C.blue }}
              inputStyle="bordered"
              successMessage="You're registered! We look forward to seeing you."
            />
          </div>
        </div>
      </section>

      {/* ── 8. FOOTER ────────────────────────────────────────────────── */}
      <footer className="px-4 sm:px-8 md:px-16 py-8" style={{ borderTop: `1px solid ${C.border}` }}>
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <p className="font-bold">{company}</p>
            <p className="text-sm" style={{ color: C.muted }}>info@{company.toLowerCase().replace(/\s+/g, '')}.com</p>
          </div>
          <DawatBranding show={branding.showDawatBranding} colors={{ text: C.muted }} />
        </div>
      </footer>

      <ShareBar colors={{ bar: C.card, buttonText: C.text, button: C.navy, border: C.border }} floating />
    </div>
  )
}
