'use client'

import { motion } from 'motion/react'
import type { TemplateProps } from '@/lib/templates-data'
import CountdownTimer from '../shared/CountdownTimer'
import RSVPForm from '../shared/RSVPForm'
import Gallery from '../shared/Gallery'
import DawatBranding from '../shared/DawatBranding'
import ShareBar from '../shared/ShareBar'
import { viewport, staggerContainer, staggerItem } from '@/lib/motion'

const fontDisplay = { fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)' }
const fontBody = { fontFamily: 'var(--font-raleway, "Raleway", sans-serif)' }

const AGE = 40

const MILESTONES = [
  { year: '1985', label: 'Born' },
  { year: '2003', label: 'Graduated' },
  { year: '2008', label: 'Career Started' },
  { year: '2012', label: 'Married' },
  { year: `${new Date().getFullYear()}`, label: `Turning ${AGE}` },
]

export default function ElegantAgeTemplate({ event, branding, onRsvpSubmit, colors }: TemplateProps) {
  const C = {
    bg: colors?.bg ?? '#FDFBF7',
    primary: colors?.primary ?? '#1A1A2E',
    rose: colors?.secondary ?? '#B76E79',
    gold: colors?.secondary ?? '#C9A84C',
    text: colors?.text ?? '#1A1A2E',
    muted: colors?.muted ?? '#8A8698',
    card: '#FFFFFF',
    border: '#E8E0D8',
  }

  const { personName, title, eventDate, subEvents, description, gallery, hostName } = event
  const name = personName ?? title.split("'s")[0] ?? 'The Guest of Honour'
  const initials = name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()

  return (
    <div style={{ background: C.bg, color: C.text, ...fontBody }} className="min-h-screen overflow-x-hidden">

      {/* ── 1. MONOGRAM HERO ─────────────────────────────────────────── */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Monogram circle */}
          <motion.div
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            className="relative mx-auto mb-8"
            style={{ width: 120, height: 120 }}
          >
            <svg viewBox="0 0 120 120" className="w-full h-full">
              <motion.circle
                cx="60" cy="60" r="56"
                fill="none"
                stroke={C.gold}
                strokeWidth="1.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span style={{ ...fontDisplay, color: C.gold }} className="text-4xl">{initials}</span>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            style={{ ...fontDisplay, color: C.muted }}
            className="text-base italic mb-2"
          >
            Celebrating
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            style={{ ...fontDisplay, color: C.text }}
            className="text-3xl sm:text-4xl font-semibold mb-2 tracking-widest"
          >
            {name}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            style={{ ...fontDisplay, color: C.gold }}
            className="text-2xl sm:text-3xl italic"
          >
            {AGE} Beautiful Years
          </motion.p>

          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="h-px w-16" style={{ background: C.gold, opacity: 0.5 }} />
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: C.gold }} />
            <div className="h-px w-16" style={{ background: C.gold, opacity: 0.5 }} />
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="mt-4 text-sm uppercase tracking-widest"
            style={{ color: C.muted }}
          >
            {new Date(eventDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </motion.p>
        </motion.div>
      </section>

      {/* ── 2. COUNTDOWN ─────────────────────────────────────────────── */}
      <section className="px-4 py-12" style={{ background: C.card }}>
        <div className="max-w-2xl mx-auto">
          <div className="h-px mb-8" style={{ background: C.border }} />
          <CountdownTimer
            targetDate={eventDate}
            boxStyle="inline"
            colors={{ number: C.primary, label: C.muted }}
          />
          <div className="h-px mt-8" style={{ background: C.border }} />
        </div>
      </section>

      {/* ── 3. PERSONAL LETTER ───────────────────────────────────────── */}
      <section className="px-4 sm:px-8 py-16 max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, rotate: -1 }}
          whileInView={{ opacity: 1, rotate: 0 }}
          viewport={viewport}
          transition={{ duration: 0.6 }}
          className="rounded-2xl p-8 sm:p-10"
          style={{ background: C.card, border: `1px solid ${C.border}`, boxShadow: '0 4px 24px rgba(0,0,0,0.05)' }}
        >
          <p style={{ ...fontDisplay, color: C.muted }} className="italic mb-4 text-lg">Dear friends and family,</p>
          <p className="leading-relaxed text-base mb-6" style={{ color: C.text }}>
            {description || `It is with immense joy that we celebrate this milestone. ${name}'s ${AGE} years have been a journey filled with love, growth, and countless beautiful memories. Please join us as we honour this extraordinary person.`}
          </p>
          <p style={{ ...fontDisplay, color: C.muted }} className="italic text-right">— With love, {hostName ?? name}</p>
        </motion.div>
      </section>

      {/* ── 4. MILESTONE TIMELINE ────────────────────────────────────── */}
      <section className="px-4 sm:px-8 py-16" style={{ background: '#F5F0F8' }}>
        <div className="max-w-4xl mx-auto">
          <h2 style={{ ...fontDisplay, color: C.text }} className="text-3xl text-center mb-10">A Life Well Lived</h2>

          {/* Desktop horizontal timeline */}
          <div className="hidden md:flex items-center">
            {MILESTONES.map((m, i) => (
              <div key={i} className="flex-1 relative">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewport}
                  transition={{ delay: i * 0.12 }}
                  className="flex flex-col items-center"
                >
                  <p className="text-xs mb-3" style={{ color: C.muted }}>{m.year}</p>
                  <div className="w-3 h-3 rounded-full border-2 z-10" style={{ background: C.bg, borderColor: C.gold }} />
                  <p className="text-xs mt-3 text-center font-medium" style={{ color: C.primary }}>{m.label}</p>
                </motion.div>
                {i < MILESTONES.length - 1 && (
                  <div className="absolute top-[52px] left-1/2 right-0 h-px" style={{ background: C.gold, opacity: 0.4 }} />
                )}
              </div>
            ))}
          </div>

          {/* Mobile vertical timeline */}
          <div className="md:hidden flex flex-col gap-4">
            {MILESTONES.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={viewport}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4"
              >
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full border-2" style={{ background: C.bg, borderColor: C.gold }} />
                  {i < MILESTONES.length - 1 && <div className="w-px h-8" style={{ background: C.gold, opacity: 0.4 }} />}
                </div>
                <div>
                  <p className="text-xs" style={{ color: C.muted }}>{m.year}</p>
                  <p className="font-medium" style={{ color: C.primary }}>{m.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. EVENT DETAILS ─────────────────────────────────────────── */}
      {subEvents.length > 0 && (
        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={viewport}
          variants={staggerContainer}
          className="px-4 sm:px-8 py-16 max-w-3xl mx-auto"
        >
          {subEvents.map((se) => (
            <motion.div
              key={se.id}
              variants={staggerItem}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3 py-4"
              style={{ borderBottom: `1px solid ${C.border}` }}
            >
              <p style={{ ...fontDisplay, color: C.gold }} className="text-lg italic">{se.name}</p>
              <div>
                <p className="text-sm" style={{ color: C.muted }}>{se.date}</p>
                <p className="text-sm" style={{ color: C.muted }}>{se.time}</p>
              </div>
              <p className="text-sm" style={{ color: C.muted }}>{se.venue}</p>
            </motion.div>
          ))}
        </motion.section>
      )}

      {/* ── 6. GALLERY ───────────────────────────────────────────────── */}
      <section className="px-4 sm:px-8 py-16 max-w-4xl mx-auto">
        <h2 style={{ ...fontDisplay, color: C.text }} className="text-3xl text-center mb-10">Gallery</h2>
        <Gallery images={gallery} variant="grid" columns={3}
          colors={{ border: C.gold, overlay: `rgba(201,168,76,0.2)` }} />
      </section>

      {/* ── 7. RSVP ──────────────────────────────────────────────────── */}
      <section className="px-4 sm:px-8 py-16" style={{ background: C.card }}>
        <div className="max-w-lg mx-auto">
          <h2 style={{ ...fontDisplay, color: C.text }} className="text-3xl text-center mb-8">Please RSVP</h2>
          <RSVPForm
            subEvents={subEvents}
            onSubmit={onRsvpSubmit}
            colors={{
              button: C.primary,
              buttonText: '#FFFFFF',
              label: C.text,
              checkboxAccent: C.gold,
              successText: C.text,
            }}
            inputStyle="underline"
            successMessage="Thank you for honouring us with your response."
          />
        </div>
      </section>

      {/* ── 8. FOOTER ────────────────────────────────────────────────── */}
      <footer className="px-4 py-10 text-center" style={{ borderTop: `1px solid ${C.gold}` }}>
        <div
          className="w-12 h-12 rounded-full border flex items-center justify-center mx-auto mb-4"
          style={{ borderColor: C.gold }}
        >
          <span style={{ ...fontDisplay, color: C.gold }} className="text-lg">{initials}</span>
        </div>
        <p style={{ ...fontDisplay, color: C.text }} className="text-2xl">{name}</p>
        <p className="text-sm mt-1" style={{ color: C.muted }}>
          {new Date(eventDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
        <DawatBranding show={branding.showDawatBranding} colors={{ text: C.muted, border: C.border }} />
      </footer>

      <ShareBar colors={{ bar: C.bg, buttonText: C.text, button: C.gold, border: C.border }} floating />
    </div>
  )
}
