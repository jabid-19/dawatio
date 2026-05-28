'use client'

import { motion } from 'motion/react'
import { MapPin, Car, Shirt } from 'lucide-react'
import type { TemplateProps } from '@/lib/templates-data'
import RSVPForm from '../shared/RSVPForm'
import DawatBranding from '../shared/DawatBranding'
import ShareBar from '../shared/ShareBar'
import { viewport, staggerContainer, staggerItem } from '@/lib/motion'

const fontDisplay = { fontFamily: 'var(--font-source-serif, "Source Serif 4", serif)' }
const fontBody = { fontFamily: 'var(--font-source-sans, "Source Sans 3", sans-serif)' }

const LOGISTICS = [
  { icon: MapPin, label: 'Venue', value: 'Grand Ballroom, Radisson Blu' },
  { icon: Car, label: 'Parking', value: 'Complimentary valet available' },
  { icon: Shirt, label: 'Dress Code', value: 'Business Formal' },
]

export default function BoardroomTemplate({ event, branding, onRsvpSubmit, colors }: TemplateProps) {
  const C = {
    bg: colors?.bg ?? '#FDFDFC',
    primary: colors?.primary ?? '#1C1C1C',
    gold: colors?.secondary ?? '#B8860B',
    surface: colors?.surface ?? '#F5F4F0',
    text: colors?.text ?? '#1C1C1C',
    muted: colors?.muted ?? '#6B6B6B',
    border: '#E0DDD8',
    card: '#FFFFFF',
  }

  const { companyName, title, eventDate, subEvents, description } = event
  const company = companyName ?? title
  const firstSub = subEvents[0]

  return (
    <div style={{ background: C.bg, color: C.text, ...fontBody }} className="min-h-screen overflow-x-hidden">

      {/* ── 1. FORMAL HEADER ─────────────────────────────────────────── */}
      <header className="px-6 sm:px-12 md:px-20 py-12 text-center max-w-4xl mx-auto">
        {/* Logo area */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6">
          <div
            className="w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-3"
            style={{ background: C.primary }}
          >
            <span className="text-white font-bold text-lg" style={{ fontFamily: fontDisplay.fontFamily }}>
              {company.slice(0, 2).toUpperCase()}
            </span>
          </div>
          <p className="font-bold tracking-widest uppercase text-sm" style={{ color: C.primary }}>{company}</p>
        </motion.div>

        <div className="h-px w-full mb-8" style={{ background: C.border }} />

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <p style={{ ...fontDisplay, color: C.muted }} className="italic text-base mb-3">
            You are cordially invited to
          </p>
          <h1 style={{ ...fontDisplay, color: C.text }} className="text-3xl sm:text-5xl font-bold leading-tight">
            {title}
          </h1>
        </motion.div>

        <div className="h-px w-full mt-8 mb-6" style={{ background: C.border }} />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row justify-center gap-6 text-sm"
          style={{ color: C.muted }}
        >
          {firstSub && (
            <>
              <span>{firstSub.date}</span>
              <span className="hidden sm:block opacity-30">|</span>
              <span>{firstSub.time}</span>
              <span className="hidden sm:block opacity-30">|</span>
              <span>{firstSub.venue}</span>
            </>
          )}
        </motion.div>
      </header>

      {/* ── 2. OVERVIEW ──────────────────────────────────────────────── */}
      <section className="px-6 sm:px-12 md:px-20 py-12 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <h2 style={{ ...fontDisplay }} className="text-2xl font-bold mb-4">Event Overview</h2>
            <p className="leading-relaxed text-base" style={{ color: C.muted }}>
              {description || 'An exclusive gathering of senior executives and decision-makers to address key strategic imperatives and forge new partnerships.'}
            </p>
          </div>
          <div
            className="rounded-2xl p-5"
            style={{ background: C.surface, borderLeft: `3px solid ${C.gold}` }}
          >
            <p style={{ ...fontDisplay }} className="font-bold text-sm mb-3">Key Highlights</p>
            {['Strategic Keynotes', 'Executive Roundtables', 'Networking Dinner', 'Award Recognition'].map((h) => (
              <p key={h} className="text-sm py-1.5 flex items-center gap-2" style={{ color: C.muted }}>
                <span style={{ color: C.gold }}>·</span> {h}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. AGENDA TABLE ──────────────────────────────────────────── */}
      {subEvents.length > 0 && (
        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={viewport}
          variants={staggerContainer}
          className="px-6 sm:px-12 md:px-20 py-12 max-w-4xl mx-auto"
        >
          <motion.h2 variants={staggerItem} style={{ ...fontDisplay }} className="text-2xl font-bold mb-6">
            Programme
          </motion.h2>
          <div className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${C.border}` }}>
            {subEvents.map((se, i) => (
              <motion.div
                key={se.id}
                variants={staggerItem}
                className="grid grid-cols-3 sm:grid-cols-4 gap-4 px-6 py-4"
                style={{
                  background: i % 2 === 0 ? C.card : C.surface,
                  borderBottom: i < subEvents.length - 1 ? `1px solid ${C.border}` : 'none',
                }}
              >
                <p className="text-sm font-semibold" style={{ color: C.gold }}>{se.time}</p>
                <p className="sm:col-span-2 text-sm font-medium">{se.name}</p>
                <p className="text-sm hidden sm:block" style={{ color: C.muted }}>{se.venue}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}

      {/* ── 4. LOGISTICS ─────────────────────────────────────────────── */}
      <section className="px-6 sm:px-12 md:px-20 py-12 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {LOGISTICS.map((l) => (
            <div
              key={l.label}
              className="rounded-2xl p-5"
              style={{ background: C.surface }}
            >
              <l.icon className="w-5 h-5 mb-3" style={{ color: C.gold }} />
              <p style={{ ...fontDisplay }} className="font-bold text-sm mb-1">{l.label}</p>
              <p className="text-sm" style={{ color: C.muted }}>{l.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 5. RSVP ──────────────────────────────────────────────────── */}
      <section className="px-6 sm:px-12 md:px-20 py-16" style={{ background: C.surface }}>
        <div className="max-w-lg mx-auto">
          <h2 style={{ ...fontDisplay }} className="text-2xl font-bold mb-8">Confirm Your Attendance</h2>
          <div className="rounded-2xl p-6 sm:p-8" style={{ background: C.card, border: `1px solid ${C.border}` }}>
            <RSVPForm
              subEvents={subEvents}
              onSubmit={onRsvpSubmit}
              colors={{ button: C.primary, buttonText: C.gold, label: C.text, checkboxAccent: C.gold }}
              inputStyle="bordered"
              successMessage="Your attendance has been confirmed. We look forward to your presence."
            />
          </div>
        </div>
      </section>

      {/* ── 6. FOOTER ────────────────────────────────────────────────── */}
      <footer className="px-6 sm:px-12 md:px-20 py-8 flex flex-col sm:flex-row items-center justify-between gap-4"
        style={{ borderTop: `1px solid ${C.border}` }}>
        <div>
          <p style={{ ...fontDisplay }} className="font-bold text-sm">{company}</p>
          <p className="text-xs mt-0.5 italic" style={{ color: C.muted }}>Strictly by invitation only</p>
        </div>
        <DawatBranding show={branding.showDawatBranding} colors={{ text: C.muted }} />
      </footer>

      <ShareBar colors={{ bar: C.card, buttonText: C.text, button: C.primary, border: C.border }} floating />
    </div>
  )
}
