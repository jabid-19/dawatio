'use client'

import { motion } from 'motion/react'
import { MapPin } from 'lucide-react'
import type { TemplateProps } from '@/lib/templates-data'
import CountdownTimer from '../shared/CountdownTimer'
import RSVPForm from '../shared/RSVPForm'
import Gallery from '../shared/Gallery'
import DawatBranding from '../shared/DawatBranding'
import ShareBar from '../shared/ShareBar'
import { viewport, staggerContainer, staggerItem } from '@/lib/motion'

const fontDisplay = { fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)' }
const fontBody = { fontFamily: 'var(--font-raleway, "Raleway", sans-serif)' }

const STARS = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  size: Math.random() * 3 + 1,
  x: Math.random() * 100,
  y: Math.random() * 100,
  delay: Math.random() * 4,
  dur: Math.random() * 3 + 2,
}))

function StarField({ stardust }: { stardust: string }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {STARS.map((s) => (
        <div
          key={s.id}
          className="absolute rounded-full"
          style={{
            width: s.size,
            height: s.size,
            left: `${s.x}%`,
            top: `${s.y}%`,
            background: stardust,
            opacity: 0.6,
            animation: `celestial-twinkle ${s.dur}s ease-in-out ${s.delay}s infinite`,
          }}
        />
      ))}
    </div>
  )
}

function ConstellationLine({ primary, gold }: { primary: string; gold: string }) {
  return (
    <div className="flex items-center gap-3 my-4">
      <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, transparent, ${primary}60, transparent)` }} />
      <svg viewBox="0 0 30 12" className="w-8 h-3" fill="none">
        <circle cx="2" cy="6" r="1.5" fill={primary} />
        <line x1="3.5" y1="6" x2="8" y2="2" stroke={primary} strokeWidth="0.5" opacity="0.5" />
        <circle cx="9" cy="2" r="1.5" fill={gold} />
        <line x1="10.5" y1="2" x2="15" y2="6" stroke={primary} strokeWidth="0.5" opacity="0.5" />
        <circle cx="15" cy="6" r="2" fill={primary} />
        <line x1="17" y1="6" x2="21" y2="10" stroke={primary} strokeWidth="0.5" opacity="0.5" />
        <circle cx="22" cy="10" r="1.5" fill={gold} />
        <line x1="23.5" y1="10" x2="27" y2="6" stroke={primary} strokeWidth="0.5" opacity="0.5" />
        <circle cx="28" cy="6" r="1.5" fill={primary} />
      </svg>
      <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, transparent, ${primary}60, transparent)` }} />
    </div>
  )
}

export default function CelestialTemplate({ event, branding, onRsvpSubmit, colors }: TemplateProps) {
  const C = {
    bg: colors?.bg ?? '#080C1A',
    navy: colors?.surface ?? '#0D1635',
    primary: colors?.primary ?? '#8B7BD4',
    gold: colors?.secondary ?? '#C9A84C',
    stardust: colors?.text ?? '#D4C9F0',
    text: colors?.text ?? '#E8E4F8',
    muted: colors?.muted ?? '#7A7499',
    card: '#0F1528',
    border: '#1E2444',
  }

  const { coupleNames, title, eventDate, subEvents, description, gallery } = event
  const name1 = coupleNames?.partner1 ?? title.split('&')[0]?.trim() ?? 'Partner 1'
  const name2 = coupleNames?.partner2 ?? title.split('&')[1]?.trim().split(' ')[0] ?? 'Partner 2'

  return (
    <div style={{ background: C.bg, color: C.text, ...fontBody }} className="min-h-screen overflow-x-hidden">
      <style>{`
        @keyframes celestial-twinkle { 0%, 100% { opacity: 0.2; transform: scale(1); } 50% { opacity: 0.9; transform: scale(1.4); } }
        @keyframes celestial-orbit { from { transform: rotate(0deg) translateX(60px) rotate(0deg); } to { transform: rotate(360deg) translateX(60px) rotate(-360deg); } }
      `}</style>

      {/* ── 1. STAR FIELD HERO ───────────────────────────────────────── */}
      <section
        className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 text-center overflow-hidden"
        style={{ background: `radial-gradient(ellipse 80% 80% at 50% 50%, ${C.navy} 0%, ${C.bg} 100%)` }}
      >
        <StarField stardust={C.stardust} />

        {/* Orbiting dot */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="relative w-1 h-1">
            <div
              className="absolute w-2 h-2 rounded-full"
              style={{ background: C.gold, animation: 'celestial-orbit 12s linear infinite', opacity: 0.6 }}
            />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="relative z-10 max-w-xl"
        >
          <p className="text-xs uppercase tracking-[0.5em] mb-6" style={{ color: C.muted }}>
            Written in the stars
          </p>
          <ConstellationLine primary={C.primary} gold={C.gold} />
          <h1 style={{ ...fontDisplay, color: C.text }} className="text-5xl sm:text-7xl mt-6 leading-tight">
            {name1}
          </h1>
          <p style={{ ...fontDisplay, color: C.primary }} className="text-4xl italic my-2">&</p>
          <h1 style={{ ...fontDisplay, color: C.text }} className="text-5xl sm:text-7xl leading-tight">
            {name2}
          </h1>
          <ConstellationLine primary={C.primary} gold={C.gold} />
          <p style={{ ...fontDisplay, color: C.stardust }} className="text-xl italic mt-4">
            are engaged!
          </p>
          <p className="mt-4 text-sm uppercase tracking-widest" style={{ color: C.muted }}>
            {new Date(eventDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </motion.div>
      </section>

      {/* ── 2. COUNTDOWN ─────────────────────────────────────────────── */}
      <section className="px-4 py-12" style={{ background: C.navy }}>
        <div className="max-w-2xl mx-auto">
          <p className="text-center text-xs uppercase tracking-widest mb-4" style={{ color: C.muted }}>
            Until We Celebrate
          </p>
          <CountdownTimer targetDate={eventDate} boxStyle="boxed"
            colors={{ box: C.card, number: C.primary, label: C.muted, border: C.border }} />
        </div>
      </section>

      {/* ── 3. STORY ─────────────────────────────────────────────────── */}
      <section className="px-6 sm:px-12 py-24 max-w-2xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewport}>
          <ConstellationLine primary={C.primary} gold={C.gold} />
          <h2 style={{ ...fontDisplay, color: C.stardust }} className="text-3xl sm:text-4xl mt-6 mb-6">
            Our Constellation
          </h2>
          <p className="text-base leading-relaxed" style={{ color: C.muted }}>
            {description || 'Like stars drawn together by gravity, we found each other across the vast universe of possibility. Our love burns bright and eternal — and now we invite you to witness the moment we pledge to navigate life\'s cosmos together.'}
          </p>
        </motion.div>
      </section>

      {/* ── 4. EVENTS ────────────────────────────────────────────────── */}
      {subEvents.length > 0 && (
        <motion.section
          initial="initial" whileInView="animate" viewport={viewport} variants={staggerContainer}
          className="px-4 sm:px-8 py-16"
          style={{ background: C.navy }}
        >
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <ConstellationLine primary={C.primary} gold={C.gold} />
              <h2 style={{ ...fontDisplay, color: C.stardust }} className="text-3xl mt-4">Celebrate With Us</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {subEvents.map((se) => (
                <motion.div
                  key={se.id}
                  variants={staggerItem}
                  className="rounded-2xl p-5"
                  style={{ background: C.card, border: `1px solid ${C.border}` }}
                >
                  <p style={{ ...fontDisplay, color: C.primary }} className="text-xl mb-2">{se.name}</p>
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

      {/* ── 5. GALLERY ───────────────────────────────────────────────── */}
      <section className="px-4 sm:px-8 py-16 max-w-4xl mx-auto">
        <Gallery images={gallery} variant="grid" columns={3}
          colors={{ overlay: `${C.primary}33`, border: C.border }} />
      </section>

      {/* ── 6. RSVP ──────────────────────────────────────────────────── */}
      <section className="px-4 sm:px-8 py-20" style={{ background: C.navy }}>
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-8">
            <ConstellationLine primary={C.primary} gold={C.gold} />
            <h2 style={{ ...fontDisplay, color: C.stardust }} className="text-3xl mt-4">Join Our Galaxy</h2>
          </div>
          <div className="rounded-3xl p-6 sm:p-8" style={{ background: C.card, border: `1px solid ${C.border}` }}>
            <RSVPForm subEvents={subEvents} onSubmit={onRsvpSubmit}
              colors={{ button: C.primary, buttonText: '#FFFFFF', label: C.text, checkboxAccent: C.gold, successText: C.stardust }}
              inputStyle="underline"
              successMessage="Your star joins our constellation ✦" />
          </div>
        </div>
      </section>

      {/* ── 7. FOOTER ────────────────────────────────────────────────── */}
      <footer className="px-4 py-10 text-center" style={{ borderTop: `1px solid ${C.border}` }}>
        <ConstellationLine primary={C.primary} gold={C.gold} />
        <p style={{ ...fontDisplay, color: C.stardust }} className="text-2xl mt-4">{name1} & {name2}</p>
        <DawatBranding show={branding.showDawatBranding} colors={{ text: C.muted }} />
      </footer>

      <ShareBar colors={{ bar: C.card, buttonText: C.text, button: C.primary, border: C.border }} floating />
    </div>
  )
}
