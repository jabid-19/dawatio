'use client'

import { motion } from 'motion/react'
import { MapPin } from 'lucide-react'
import type { TemplateProps } from '@/lib/templates-data'
import CountdownTimer from '../shared/CountdownTimer'
import RSVPForm from '../shared/RSVPForm'
import DawatBranding from '../shared/DawatBranding'
import ShareBar from '../shared/ShareBar'
import { viewport, staggerContainer, staggerItem } from '@/lib/motion'

const C = {
  bg: '#F5FAF5',
  emerald: '#1A5C3A',
  emeraldLight: '#E8F5EE',
  gold: '#C9A84C',
  goldLight: '#F5EDD0',
  text: '#1A2E1A',
  muted: '#5A7A5A',
  card: '#FFFFFF',
  border: '#D0E8D8',
} as const

const fontDisplay = { fontFamily: 'var(--font-amiri, "Amiri", serif)' }
const fontBody = { fontFamily: 'var(--font-dm-sans, "DM Sans", sans-serif)' }

function CrescentMoon() {
  return (
    <div className="flex items-center justify-center my-6">
      <motion.div
        initial={{ rotate: -20, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      >
        <svg viewBox="0 0 80 80" className="w-20 h-20">
          {/* Crescent */}
          <path
            d="M55 40 C55 54.36 43.36 66 29 66 C22.5 66 16.5 63.5 12 59.3 C17.5 61.3 23.5 62 30 60 C46 55 55 44 55 40Z"
            fill={C.gold}
            opacity="0.2"
          />
          <path
            d="M40 10 C25 10 13 22 13 37 C13 52 25 64 40 64 C30 64 22 55 22 44 C22 28 33 16 40 10Z"
            fill={C.gold}
          />
          {/* Star */}
          <polygon
            points="58,20 60,26 66,26 61,30 63,36 58,32 53,36 55,30 50,26 56,26"
            fill={C.gold}
            transform="scale(0.8) translate(12, 0)"
          />
        </svg>
      </motion.div>
    </div>
  )
}

function IslamicBorder() {
  return (
    <div className="flex items-center gap-2 my-3">
      <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, transparent, ${C.gold})` }} />
      <svg viewBox="0 0 40 20" className="w-10 h-5" fill={C.gold}>
        <polygon points="20,2 22,8 28,8 23,12 25,18 20,14 15,18 17,12 12,8 18,8" />
      </svg>
      <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, ${C.gold}, transparent)` }} />
    </div>
  )
}

export default function CrescentTemplate({ event, branding, onRsvpSubmit }: TemplateProps) {
  const { title, eventDate, subEvents, description, hostName, message } = event

  return (
    <div style={{ background: C.bg, color: C.text, ...fontBody }} className="min-h-screen overflow-x-hidden">

      {/* ── 1. HERO ──────────────────────────────────────────────────── */}
      <section
        className="min-h-screen flex flex-col items-center justify-center px-6 py-20 text-center"
        style={{ background: `linear-gradient(160deg, ${C.emeraldLight} 0%, ${C.bg} 100%)` }}
      >
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          <p style={{ ...fontDisplay, color: C.gold }} className="text-4xl mb-2">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </p>
          <p className="text-xs uppercase tracking-widest mb-4" style={{ color: C.muted }}>In the name of Allah</p>
          <IslamicBorder />
          <CrescentMoon />
          <h1 style={{ ...fontDisplay, color: C.emerald }} className="text-5xl sm:text-7xl mt-2 mb-2">
            {title}
          </h1>
          <IslamicBorder />
          <p style={{ ...fontDisplay, color: C.gold }} className="text-2xl italic mt-4">
            عيد مبارك
          </p>
          <p className="text-sm mt-1 tracking-wider" style={{ color: C.muted }}>Eid Mubarak</p>
          {hostName && (
            <p className="mt-6 text-base" style={{ color: C.muted }}>
              Hosted by <span style={{ color: C.emerald, fontWeight: 600 }}>{hostName}</span>
            </p>
          )}
          <p className="mt-3 text-sm uppercase tracking-widest" style={{ color: C.muted }}>
            {new Date(eventDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </motion.div>
      </section>

      {/* ── 2. COUNTDOWN ─────────────────────────────────────────────── */}
      <section className="px-4 py-12" style={{ background: C.emerald }}>
        <div className="max-w-2xl mx-auto">
          <p className="text-center text-xs uppercase tracking-widest mb-4" style={{ color: `${C.goldLight}AA` }}>
            Counting down
          </p>
          <CountdownTimer targetDate={eventDate} boxStyle="boxed"
            colors={{ box: `${C.emerald}CC`, number: C.gold, label: `${C.goldLight}99`, border: `${C.gold}40` }} />
        </div>
      </section>

      {/* ── 3. MESSAGE ───────────────────────────────────────────────── */}
      <section className="px-6 sm:px-8 py-20 max-w-2xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewport}>
          <IslamicBorder />
          <p style={{ ...fontDisplay, color: C.emerald }} className="text-2xl mt-6 mb-4 leading-relaxed">
            {message || description || 'May this blessed occasion bring joy, peace, and prosperity to you and your family. With warm Eid greetings, we invite you to share in our celebration.'}
          </p>
          <IslamicBorder />
        </motion.div>
      </section>

      {/* ── 4. EVENTS ────────────────────────────────────────────────── */}
      {subEvents.length > 0 && (
        <motion.section
          initial="initial" whileInView="animate" viewport={viewport} variants={staggerContainer}
          className="px-4 sm:px-8 py-16"
          style={{ background: C.emeraldLight }}
        >
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 style={{ ...fontDisplay, color: C.emerald }} className="text-3xl">Programme</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {subEvents.map((se) => (
                <motion.div
                  key={se.id}
                  variants={staggerItem}
                  className="rounded-2xl p-5"
                  style={{ background: C.card, border: `1px solid ${C.border}`, borderTop: `3px solid ${C.emerald}` }}
                >
                  <p style={{ ...fontDisplay, color: C.emerald }} className="text-lg mb-2">{se.name}</p>
                  <p className="text-sm" style={{ color: C.muted }}>{se.date} · {se.time}</p>
                  <p className="text-sm flex items-center gap-1 mt-1" style={{ color: C.muted }}>
                    <MapPin className="w-3.5 h-3.5" />{se.venue}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      )}

      {/* ── 5. RSVP ──────────────────────────────────────────────────── */}
      <section className="px-4 sm:px-8 py-16">
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-6">
            <h2 style={{ ...fontDisplay, color: C.emerald }} className="text-3xl">Kindly Confirm</h2>
          </div>
          <RSVPForm subEvents={subEvents} onSubmit={onRsvpSubmit}
            colors={{ button: C.emerald, buttonText: '#FFFFFF', label: C.text, checkboxAccent: C.gold }}
            successMessage="Jazak Allah Khair — we look forward to celebrating with you!" />
        </div>
      </section>

      {/* ── 6. FOOTER ────────────────────────────────────────────────── */}
      <footer className="px-4 py-10 text-center" style={{ background: C.emerald, borderTop: `2px solid ${C.gold}40` }}>
        <CrescentMoon />
        <p style={{ ...fontDisplay, color: C.goldLight }} className="text-xl">{title}</p>
        <p className="text-xs mt-1 uppercase tracking-widest" style={{ color: `${C.goldLight}99` }}>Eid Mubarak</p>
        <DawatBranding show={branding.showDawatBranding} colors={{ text: `${C.goldLight}80` }} />
      </footer>

      <ShareBar colors={{ bar: C.card, buttonText: C.text, button: C.emerald, border: C.border }} floating />
    </div>
  )
}
