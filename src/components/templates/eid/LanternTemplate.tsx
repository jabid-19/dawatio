'use client'

import { motion } from 'motion/react'
import { MapPin } from 'lucide-react'
import type { TemplateProps } from '@/lib/templates-data'
import CountdownTimer from '../shared/CountdownTimer'
import RSVPForm from '../shared/RSVPForm'
import DawatBranding from '../shared/DawatBranding'
import ShareBar from '../shared/ShareBar'
import { viewport, staggerContainer, staggerItem } from '@/lib/motion'

const fontDisplay = { fontFamily: 'var(--font-playfair, "Playfair Display", serif)' }
const fontBody = { fontFamily: 'var(--font-dm-sans, "DM Sans", sans-serif)' }

const LANTERNS = [
  { x: '15%', delay: '0s', dur: '4s', scale: 1 },
  { x: '35%', delay: '0.8s', dur: '5s', scale: 0.8 },
  { x: '55%', delay: '1.5s', dur: '3.5s', scale: 1.1 },
  { x: '75%', delay: '0.4s', dur: '4.5s', scale: 0.9 },
  { x: '88%', delay: '2s', dur: '4s', scale: 0.7 },
]

function Lantern({ x, delay, dur, scale, amber, teal, amberLight }: {
  x: string; delay: string; dur: string; scale: number;
  amber: string; teal: string; amberLight: string
}) {
  return (
    <div
      className="absolute pointer-events-none"
      style={{ left: x, top: -20, animation: `lantern-float ${dur} ease-in-out ${delay} infinite` }}
    >
      <svg viewBox="0 0 30 50" style={{ width: 30 * scale, height: 50 * scale }} fill="none">
        {/* String */}
        <line x1="15" y1="0" x2="15" y2="8" stroke={amber} strokeWidth="1" />
        {/* Lantern body */}
        <ellipse cx="15" cy="28" rx="10" ry="18" fill={amber} opacity="0.85" />
        {/* Glow */}
        <ellipse cx="15" cy="28" rx="7" ry="14" fill={amberLight} opacity="0.4" />
        {/* Cap top */}
        <rect x="8" y="8" width="14" height="4" rx="2" fill={teal} />
        {/* Cap bottom */}
        <rect x="8" y="42" width="14" height="4" rx="2" fill={teal} />
        {/* Tassel */}
        <line x1="15" y1="46" x2="12" y2="50" stroke={amber} strokeWidth="1" />
        <line x1="15" y1="46" x2="15" y2="50" stroke={amber} strokeWidth="1" />
        <line x1="15" y1="46" x2="18" y2="50" stroke={amber} strokeWidth="1" />
      </svg>
    </div>
  )
}

function GlowDivider({ amber }: { amber: string }) {
  return (
    <div className="flex items-center gap-3 my-4">
      <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, transparent, ${amber}80, transparent)` }} />
      <svg viewBox="0 0 20 20" className="w-5 h-5" fill={amber}>
        <path d="M10 2 L11.8 8.2 L18 10 L11.8 11.8 L10 18 L8.2 11.8 L2 10 L8.2 8.2 Z" />
      </svg>
      <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, transparent, ${amber}80, transparent)` }} />
    </div>
  )
}

export default function LanternTemplate({ event, branding, onRsvpSubmit, colors }: TemplateProps) {
  const C = {
    bg: colors?.bg ?? '#F5F9F9',
    teal: colors?.primary ?? '#1A6B6B',
    tealLight: colors?.surface ?? '#E0F0F0',
    amber: colors?.secondary ?? '#D4841A',
    amberLight: '#FDF0DC',
    text: colors?.text ?? '#1A2E2E',
    muted: colors?.muted ?? '#5A7A7A',
    card: '#FFFFFF',
    border: '#C5DFE0',
  }

  const { title, eventDate, subEvents, description, hostName, message } = event

  return (
    <div style={{ background: C.bg, color: C.text, ...fontBody }} className="min-h-screen overflow-x-hidden">
      <style>{`
        @keyframes lantern-float { 0%, 100% { transform: translateY(0) rotate(-3deg); } 50% { transform: translateY(8px) rotate(3deg); } }
        @keyframes lantern-glow { 0%, 100% { opacity: 0.7; } 50% { opacity: 1; } }
      `}</style>

      {/* ── 1. HERO ──────────────────────────────────────────────────── */}
      <section
        className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24 text-center overflow-hidden"
        style={{ background: `linear-gradient(180deg, ${C.teal} 0%, ${C.tealLight} 70%, ${C.bg} 100%)` }}
      >
        {/* Floating lanterns */}
        {LANTERNS.map((l, i) => (
          <Lantern key={i} {...l} amber={C.amber} teal={C.teal} amberLight={C.amberLight} />
        ))}

        {/* Glow */}
        <div
          className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
          style={{ background: `linear-gradient(0deg, ${C.bg} 0%, transparent 100%)` }}
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 max-w-xl"
        >
          <p className="text-xs uppercase tracking-[0.4em] mb-4" style={{ color: `${C.amberLight}CC` }}>
            You are invited
          </p>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1" style={{ background: `${C.amberLight}60` }} />
            <span style={{ color: C.amber }}>☽</span>
            <div className="h-px flex-1" style={{ background: `${C.amberLight}60` }} />
          </div>
          <h1 style={{ ...fontDisplay, color: '#FFFFFF' }} className="text-5xl sm:text-7xl leading-tight mb-4">
            {title}
          </h1>
          <p style={{ ...fontDisplay, color: C.amber }} className="text-2xl italic">
            Eid Celebrations
          </p>
          {hostName && (
            <p className="mt-4 text-sm" style={{ color: `${C.amberLight}CC` }}>
              Hosted by <span className="font-semibold">{hostName}</span>
            </p>
          )}
          <p className="mt-4 text-sm uppercase tracking-widest" style={{ color: `${C.amberLight}99` }}>
            {new Date(eventDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </motion.div>
      </section>

      {/* ── 2. COUNTDOWN ─────────────────────────────────────────────── */}
      <section className="px-4 py-12" style={{ background: C.amberLight }}>
        <div className="max-w-2xl mx-auto">
          <CountdownTimer targetDate={eventDate} boxStyle="boxed"
            colors={{ box: C.card, number: C.amber, label: C.muted, border: C.border }} />
        </div>
      </section>

      {/* ── 3. MESSAGE ───────────────────────────────────────────────── */}
      <section className="px-6 sm:px-8 py-20 max-w-2xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewport}>
          <GlowDivider amber={C.amber} />
          <p style={{ ...fontDisplay, color: C.text }} className="text-2xl mt-6 leading-relaxed">
            {message || description || 'As the lights of Eid illuminate the night sky, we invite you to celebrate with warmth, joy, and gratitude. May this occasion strengthen the bonds that unite us.'}
          </p>
          <GlowDivider amber={C.amber} />
        </motion.div>
      </section>

      {/* ── 4. EVENTS ────────────────────────────────────────────────── */}
      {subEvents.length > 0 && (
        <motion.section
          initial="initial" whileInView="animate" viewport={viewport} variants={staggerContainer}
          className="px-4 sm:px-8 py-16"
          style={{ background: C.tealLight }}
        >
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <GlowDivider amber={C.amber} />
              <h2 style={{ ...fontDisplay, color: C.teal }} className="text-3xl mt-4">Programme</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {subEvents.map((se, i) => (
                <motion.div
                  key={se.id}
                  variants={staggerItem}
                  className="rounded-2xl p-5"
                  style={{ background: C.card, border: `1px solid ${C.border}`, borderTop: `3px solid ${i % 2 === 0 ? C.teal : C.amber}` }}
                >
                  <p style={{ ...fontDisplay, color: C.teal }} className="text-lg mb-2">{se.name}</p>
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
        <div className="max-w-lg mx-auto text-center">
          <GlowDivider amber={C.amber} />
          <h2 style={{ ...fontDisplay, color: C.teal }} className="text-3xl mt-4 mb-8">Kindly RSVP</h2>
          <RSVPForm subEvents={subEvents} onSubmit={onRsvpSubmit}
            colors={{ button: C.teal, buttonText: '#FFFFFF', label: C.text, checkboxAccent: C.amber }}
            successMessage="Eid Mubarak! We look forward to celebrating with you 🌙" />
        </div>
      </section>

      {/* ── 6. FOOTER ────────────────────────────────────────────────── */}
      <footer
        className="px-4 py-10 text-center"
        style={{ background: C.teal, borderTop: `2px solid ${C.amber}40` }}
      >
        <p style={{ ...fontDisplay, color: C.amberLight }} className="text-xl">{title}</p>
        <p className="text-xs uppercase tracking-widest mt-1" style={{ color: `${C.amberLight}80` }}>
          Eid Mubarak ☽
        </p>
        <DawatBranding show={branding.showDawatBranding} colors={{ text: `${C.amberLight}60` }} />
      </footer>

      <ShareBar colors={{ bar: C.card, buttonText: C.text, button: C.teal, border: C.border }} floating />
    </div>
  )
}
