'use client'

import { motion } from 'motion/react'
import { MapPin } from 'lucide-react'
import type { TemplateProps } from '@/lib/templates-data'
import CountdownTimer from '../shared/CountdownTimer'
import RSVPForm from '../shared/RSVPForm'
import DawatBranding from '../shared/DawatBranding'
import ShareBar from '../shared/ShareBar'
import { viewport, staggerContainer, staggerItem } from '@/lib/motion'

const fontDisplay = { fontFamily: 'var(--font-lora, "Lora", serif)' }
const fontBody = { fontFamily: 'var(--font-quicksand, "Quicksand", sans-serif)' }

const DISHES = ['🥘 Biryani', '🍲 Haleem', '🥗 Fresh Salads', '🍰 Desserts', '☕ Dates & Drinks']

function WarmDivider({ amber, orange }: { amber: string; orange: string }) {
  return (
    <div className="flex items-center gap-3 my-4">
      <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, transparent, ${amber}80, transparent)` }} />
      <span style={{ color: orange }} className="text-lg">✦</span>
      <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, transparent, ${amber}80, transparent)` }} />
    </div>
  )
}

export default function IftarTableTemplate({ event, branding, onRsvpSubmit, colors }: TemplateProps) {
  const C = {
    bg: colors?.bg ?? '#FAF5EE',
    orange: colors?.primary ?? '#C9622F',
    brown: colors?.secondary ?? '#6B3A1A',
    brownLight: colors?.surface ?? '#F5EDE0',
    amber: colors?.secondary ?? '#D4A84C',
    text: colors?.text ?? '#2E1A0A',
    muted: colors?.muted ?? '#8A6A4A',
    card: '#FFFFFF',
    border: '#E8D5C0',
  }

  const { title, eventDate, subEvents, description, hostName, message } = event

  return (
    <div style={{ background: C.bg, color: C.text, ...fontBody }} className="min-h-screen overflow-x-hidden">

      {/* ── 1. HERO ──────────────────────────────────────────────────── */}
      <section
        className="min-h-screen flex flex-col items-center justify-center px-6 py-20 text-center"
        style={{ background: `linear-gradient(160deg, ${C.brownLight} 0%, ${C.bg} 100%)` }}
      >
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          <p className="text-4xl mb-4">🌙</p>
          <p className="text-xs uppercase tracking-[0.4em] mb-2" style={{ color: C.muted }}>You are warmly invited to</p>
          <WarmDivider amber={C.amber} orange={C.orange} />
          <h1 style={{ ...fontDisplay, color: C.brown }} className="text-5xl sm:text-7xl leading-tight mt-4 mb-2">
            Iftar Dinner
          </h1>
          {title && title !== 'Iftar Dinner' && (
            <p style={{ ...fontDisplay, color: C.orange }} className="text-2xl italic">{title}</p>
          )}
          <WarmDivider amber={C.amber} orange={C.orange} />
          {hostName && (
            <p className="text-base mt-4" style={{ color: C.muted }}>
              Hosted by <span style={{ color: C.brown, fontWeight: 700 }}>{hostName}</span>
            </p>
          )}
          <p className="mt-3 text-sm uppercase tracking-widest" style={{ color: C.muted }}>
            {new Date(eventDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </motion.div>
      </section>

      {/* ── 2. COUNTDOWN ─────────────────────────────────────────────── */}
      <section className="px-4 py-12" style={{ background: C.orange }}>
        <div className="max-w-2xl mx-auto">
          <CountdownTimer targetDate={eventDate} boxStyle="boxed"
            colors={{ box: `${C.brown}CC`, number: '#FFFFFF', label: `${C.brownLight}99`, border: `${C.amber}40` }} />
        </div>
      </section>

      {/* ── 3. THE TABLE ─────────────────────────────────────────────── */}
      <section className="px-6 sm:px-8 py-20 max-w-3xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewport}>
          <p className="text-xs uppercase tracking-widest mb-2" style={{ color: C.muted }}>What's on the table</p>
          <WarmDivider amber={C.amber} orange={C.orange} />
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            {DISHES.map((dish) => (
              <span
                key={dish}
                className="px-4 py-2 rounded-full text-sm font-semibold"
                style={{ background: C.brownLight, color: C.brown, border: `1px solid ${C.border}` }}
              >
                {dish}
              </span>
            ))}
          </div>
          <p className="text-base leading-relaxed mt-8" style={{ color: C.muted }}>
            {message || description || 'Join us as we break our fast together around a table filled with warmth, food, and the blessings of Ramadan. Your presence is the greatest gift.'}
          </p>
        </motion.div>
      </section>

      {/* ── 4. EVENTS ────────────────────────────────────────────────── */}
      {subEvents.length > 0 && (
        <motion.section
          initial="initial" whileInView="animate" viewport={viewport} variants={staggerContainer}
          className="px-4 sm:px-8 py-16"
          style={{ background: C.brownLight }}
        >
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 style={{ ...fontDisplay, color: C.brown }} className="text-3xl">Programme</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {subEvents.map((se, i) => (
                <motion.div
                  key={se.id}
                  variants={staggerItem}
                  className="rounded-2xl p-5"
                  style={{ background: C.card, border: `1px solid ${C.border}`, borderLeft: `4px solid ${i % 2 === 0 ? C.orange : C.amber}` }}
                >
                  <p style={{ ...fontDisplay, color: C.brown }} className="text-lg mb-2">{se.name}</p>
                  <p className="text-sm font-semibold" style={{ color: C.orange }}>{se.time}</p>
                  <p className="text-sm mt-1" style={{ color: C.muted }}>{se.date}</p>
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
            <WarmDivider amber={C.amber} orange={C.orange} />
            <h2 style={{ ...fontDisplay, color: C.brown }} className="text-3xl mt-4">Will You Join Us?</h2>
          </div>
          <div className="rounded-2xl p-6 sm:p-8" style={{ background: C.card, border: `1px solid ${C.border}` }}>
            <RSVPForm subEvents={subEvents} onSubmit={onRsvpSubmit}
              colors={{ button: C.orange, buttonText: '#FFFFFF', label: C.text, checkboxAccent: C.amber }}
              successMessage="Jazak Allah Khair! We'll see you at the table 🌙" />
          </div>
        </div>
      </section>

      {/* ── 6. FOOTER ────────────────────────────────────────────────── */}
      <footer className="px-4 py-10 text-center" style={{ borderTop: `1px solid ${C.border}` }}>
        <p className="text-3xl mb-2">🌙</p>
        <p style={{ ...fontDisplay, color: C.brown }} className="text-xl">Eid Mubarak</p>
        {hostName && <p className="text-sm mt-1" style={{ color: C.muted }}>from {hostName}</p>}
        <DawatBranding show={branding.showDawatBranding} colors={{ text: C.muted }} />
      </footer>

      <ShareBar colors={{ bar: C.card, buttonText: C.text, button: C.orange, border: C.border }} floating />
    </div>
  )
}
