'use client'

import { motion } from 'motion/react'
import { MapPin } from 'lucide-react'
import type { TemplateProps } from '@/lib/templates-data'
import CountdownTimer from '../shared/CountdownTimer'
import RSVPForm from '../shared/RSVPForm'
import DawatBranding from '../shared/DawatBranding'
import ShareBar from '../shared/ShareBar'
import { viewport, staggerContainer, staggerItem } from '@/lib/motion'

const fontDisplay = { fontFamily: 'var(--font-eb-garamond, "EB Garamond", serif)' }
const fontBody = { fontFamily: 'var(--font-outfit, "Outfit", sans-serif)' }

function GoldDiamond({ gold }: { gold: string }) {
  return (
    <div className="flex items-center gap-3 my-3">
      <div className="h-px flex-1" style={{ background: gold, opacity: 0.3 }} />
      <svg viewBox="0 0 16 16" className="w-4 h-4" fill={gold}>
        <path d="M8 1 L15 8 L8 15 L1 8 Z" />
      </svg>
      <div className="h-px flex-1" style={{ background: gold, opacity: 0.3 }} />
    </div>
  )
}

export default function FestiveNightTemplate({ event, branding, onRsvpSubmit, colors }: TemplateProps) {
  const C = {
    bg: colors?.bg ?? '#080808',
    surface: colors?.surface ?? '#111111',
    gold: colors?.primary ?? '#D4A853',
    ruby: colors?.secondary ?? '#9B1C1C',
    champagne: colors?.text ?? '#F2E6C9',
    text: colors?.text ?? '#F2E6C9',
    muted: colors?.muted ?? '#7A6A50',
    border: '#2A2010',
  }

  const FIREWORKS = [
    { x: '20%', y: '25%', delay: '0s', color: C.gold },
    { x: '75%', y: '15%', delay: '1.2s', color: C.ruby },
    { x: '50%', y: '10%', delay: '0.6s', color: C.champagne },
    { x: '85%', y: '40%', delay: '1.8s', color: C.gold },
    { x: '10%', y: '50%', delay: '2.4s', color: C.ruby },
  ]

  const { title, eventDate, subEvents, description, hostName, message } = event

  return (
    <div style={{ background: C.bg, color: C.text, ...fontBody }} className="min-h-screen overflow-x-hidden">
      <style>{`
        @keyframes festive-burst { 0% { opacity: 0; transform: scale(0) rotate(0deg); } 30% { opacity: 1; } 100% { opacity: 0; transform: scale(1.5) rotate(360deg); } }
        @keyframes festive-shimmer { 0%, 100% { opacity: 0.6; } 50% { opacity: 1; } }
      `}</style>

      {/* ── 1. GRAND HERO ────────────────────────────────────────────── */}
      <section
        className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 text-center overflow-hidden"
        style={{ background: `radial-gradient(ellipse 80% 60% at 50% 40%, #1A1205 0%, ${C.bg} 100%)` }}
      >
        {/* Firework sparks */}
        {FIREWORKS.map((f, i) => (
          <div
            key={i}
            className="absolute pointer-events-none"
            style={{ left: f.x, top: f.y }}
          >
            <svg viewBox="0 0 40 40" className="w-8 h-8" style={{ animation: `festive-burst 3s ease-out ${f.delay} infinite` }}>
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                <line
                  key={angle}
                  x1="20" y1="20"
                  x2={20 + 14 * Math.cos((angle * Math.PI) / 180)}
                  y2={20 + 14 * Math.sin((angle * Math.PI) / 180)}
                  stroke={f.color} strokeWidth="1.5" strokeLinecap="round"
                />
              ))}
            </svg>
          </div>
        ))}

        {/* Gold spotlight */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse 50% 40% at 50% 50%, ${C.gold}10 0%, transparent 70%)` }}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          className="relative z-10 max-w-2xl"
        >
          <p className="text-xs uppercase tracking-[0.6em] mb-4" style={{ color: C.muted }}>
            A Grand Celebration
          </p>
          <GoldDiamond gold={C.gold} />
          <h1 style={{ ...fontDisplay, color: C.gold }} className="text-5xl sm:text-7xl md:text-8xl mt-6 mb-2 leading-tight">
            {title}
          </h1>
          <p style={{ ...fontDisplay, color: C.champagne }} className="text-2xl italic mb-6">
            Eid Mubarak
          </p>
          <GoldDiamond gold={C.gold} />
          {hostName && (
            <p className="text-sm mt-4" style={{ color: C.muted }}>
              Hosted by <span style={{ color: C.gold }}>{hostName}</span>
            </p>
          )}
          <p className="mt-3 text-xs uppercase tracking-widest" style={{ color: C.muted }}>
            {new Date(eventDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </motion.div>
      </section>

      {/* ── 2. COUNTDOWN ─────────────────────────────────────────────── */}
      <section className="px-4 py-12" style={{ background: C.surface }}>
        <div className="max-w-2xl mx-auto">
          <p className="text-center text-xs uppercase tracking-widest mb-4" style={{ color: C.muted }}>Until Celebrations Begin</p>
          <CountdownTimer targetDate={eventDate} boxStyle="boxed"
            colors={{ box: C.bg, number: C.gold, label: C.muted, border: C.border }} />
        </div>
      </section>

      {/* ── 3. MESSAGE ───────────────────────────────────────────────── */}
      <section className="px-6 sm:px-12 py-20 max-w-2xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewport}>
          <GoldDiamond gold={C.gold} />
          <p style={{ ...fontDisplay, color: C.champagne }} className="text-2xl italic mt-6 leading-relaxed">
            {message || description || 'On this blessed night, we gather to celebrate the joy of Eid in grandeur. Your presence will make this occasion truly extraordinary.'}
          </p>
        </motion.div>
      </section>

      {/* ── 4. EVENTS ────────────────────────────────────────────────── */}
      {subEvents.length > 0 && (
        <motion.section
          initial="initial" whileInView="animate" viewport={viewport} variants={staggerContainer}
          className="px-4 sm:px-8 py-16"
          style={{ background: C.surface }}
        >
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <GoldDiamond gold={C.gold} />
              <h2 style={{ ...fontDisplay, color: C.gold }} className="text-3xl mt-4">The Evening</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {subEvents.map((se, i) => (
                <motion.div
                  key={se.id}
                  variants={staggerItem}
                  className="rounded-2xl p-5"
                  style={{ background: C.bg, border: `1px solid ${C.border}`, borderTop: `2px solid ${i % 2 === 0 ? C.gold : C.ruby}` }}
                >
                  <p style={{ ...fontDisplay, color: C.champagne }} className="text-xl mb-2">{se.name}</p>
                  <p className="text-sm font-semibold" style={{ color: C.gold }}>{se.time}</p>
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

      {/* ── 5. DRESS CODE ────────────────────────────────────────────── */}
      <section className="px-4 py-12 text-center">
        <div
          className="inline-block px-10 py-5 mx-auto"
          style={{ border: `1px solid ${C.gold}40` }}
        >
          <p style={{ ...fontDisplay, color: C.gold }} className="text-lg">Dress Code</p>
          <p className="text-sm mt-1 tracking-widest uppercase" style={{ color: C.champagne }}>Festive Elegance</p>
        </div>
      </section>

      {/* ── 6. RSVP ──────────────────────────────────────────────────── */}
      <section className="px-4 sm:px-8 py-16" style={{ background: C.surface }}>
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-8">
            <GoldDiamond gold={C.gold} />
            <h2 style={{ ...fontDisplay, color: C.gold }} className="text-3xl mt-4">Will You Attend?</h2>
          </div>
          <div className="rounded-2xl p-6 sm:p-8" style={{ background: C.bg, border: `1px solid ${C.border}` }}>
            <RSVPForm subEvents={subEvents} onSubmit={onRsvpSubmit}
              colors={{ button: C.gold, buttonText: C.bg, label: C.champagne, checkboxAccent: C.gold, successText: C.champagne }}
              inputStyle="underline"
              successMessage="Eid Mubarak! We look forward to celebrating together ✦" />
          </div>
        </div>
      </section>

      {/* ── 7. FOOTER ────────────────────────────────────────────────── */}
      <footer className="px-4 py-10 text-center" style={{ borderTop: `1px solid ${C.gold}20` }}>
        <GoldDiamond gold={C.gold} />
        <p style={{ ...fontDisplay, color: C.gold }} className="text-2xl mt-4">{title}</p>
        <p className="text-xs uppercase tracking-widest mt-1" style={{ color: C.muted }}>Eid Mubarak</p>
        <DawatBranding show={branding.showDawatBranding} colors={{ text: C.muted }} />
      </footer>

      <ShareBar colors={{ bar: C.surface, buttonText: C.champagne, button: C.gold, border: C.border }} floating />
    </div>
  )
}
