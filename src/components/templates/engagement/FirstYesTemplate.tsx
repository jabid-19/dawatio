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

const C = {
  bg: '#FFF8F6',
  primary: '#D4727A',
  rose: '#F0C4C8',
  gold: '#C9A84C',
  text: '#3A2525',
  muted: '#8A7070',
  card: '#FFFFFF',
  border: '#F0D8D8',
} as const

const fontDisplay = { fontFamily: 'var(--font-playfair, "Playfair Display", serif)' }
const fontBody = { fontFamily: 'var(--font-dm-sans, "DM Sans", sans-serif)' }

function HeartPulse() {
  return (
    <div className="flex items-center justify-center">
      <svg viewBox="0 0 60 60" className="w-16 h-16" fill={C.primary} opacity="0.8"
        style={{ animation: 'heart-pulse 1.5s ease-in-out infinite' }}>
        <path d="M30 52 C30 52 5 36 5 22 C5 14 12 8 20 8 C24.5 8 28.5 10 30 13 C31.5 10 35.5 8 40 8 C48 8 55 14 55 22 C55 36 30 52 30 52Z" />
      </svg>
    </div>
  )
}

export default function FirstYesTemplate({ event, branding, onRsvpSubmit }: TemplateProps) {
  const { coupleNames, title, eventDate, subEvents, description, gallery } = event
  const name1 = coupleNames?.partner1 ?? title.split('&')[0]?.trim() ?? 'Partner 1'
  const name2 = coupleNames?.partner2 ?? title.split('&')[1]?.trim().split(' ')[0] ?? 'Partner 2'

  return (
    <div style={{ background: C.bg, color: C.text, ...fontBody }} className="min-h-screen overflow-x-hidden">
      <style>{`@keyframes heart-pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.1); } }`}</style>

      {/* ── 1. HERO ──────────────────────────────────────────────────── */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <p className="text-xs uppercase tracking-widest mb-6" style={{ color: C.muted }}>
            She/He Said Yes!
          </p>
          <HeartPulse />
          <h1 style={{ ...fontDisplay, color: C.text }} className="text-5xl sm:text-6xl mt-6 leading-tight">
            {name1}
          </h1>
          <p style={{ ...fontDisplay, color: C.primary }} className="text-4xl italic my-2">&</p>
          <h1 style={{ ...fontDisplay, color: C.text }} className="text-5xl sm:text-6xl leading-tight">
            {name2}
          </h1>
          <p style={{ ...fontDisplay, color: C.primary }} className="text-xl italic mt-6">
            are getting engaged!
          </p>
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="h-px w-16" style={{ background: C.rose }} />
            <div className="w-2 h-2 rounded-full" style={{ background: C.gold }} />
            <div className="h-px w-16" style={{ background: C.rose }} />
          </div>
          <p className="mt-4 text-sm uppercase tracking-widest" style={{ color: C.muted }}>
            {new Date(eventDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </motion.div>
      </section>

      {/* ── 2. COUNTDOWN ─────────────────────────────────────────────── */}
      <section className="px-4 py-12" style={{ background: C.card }}>
        <div className="max-w-2xl mx-auto">
          <p className="text-center text-xs uppercase tracking-widest mb-6" style={{ color: C.muted }}>Counting down to</p>
          <CountdownTimer targetDate={eventDate} boxStyle="boxed"
            colors={{ box: C.bg, number: C.primary, label: C.muted, border: C.border }} />
        </div>
      </section>

      {/* ── 3. STORY ─────────────────────────────────────────────────── */}
      <section className="px-6 sm:px-8 py-20 max-w-2xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewport}>
          <p className="text-xs uppercase tracking-widest mb-4" style={{ color: C.muted }}>Our Story</p>
          <h2 style={{ ...fontDisplay, color: C.text }} className="text-3xl mb-6">A New Chapter Begins</h2>
          <p className="text-base leading-relaxed" style={{ color: C.muted }}>
            {description || 'With hearts overflowing with joy, we invite you to celebrate this beautiful milestone with us. Your love and blessings mean everything.'}
          </p>
        </motion.div>
      </section>

      {/* ── 4. EVENT DETAILS ─────────────────────────────────────────── */}
      {subEvents.length > 0 && (
        <section className="px-4 sm:px-8 py-16" style={{ background: '#FDF0F0' }}>
          <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
            {subEvents.map((se) => (
              <div key={se.id} className="rounded-2xl p-5" style={{ background: C.card, border: `1px solid ${C.border}` }}>
                <p style={{ ...fontDisplay, color: C.primary }} className="text-lg mb-2">{se.name}</p>
                <p className="text-sm" style={{ color: C.muted }}>{se.date} · {se.time}</p>
                <p className="text-sm flex items-center gap-1 mt-1" style={{ color: C.muted }}>
                  <MapPin className="w-3.5 h-3.5" style={{ color: C.gold }} />{se.venue}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── 5. GALLERY ───────────────────────────────────────────────── */}
      <section className="px-4 sm:px-8 py-16 max-w-4xl mx-auto">
        <Gallery images={gallery} variant="grid" columns={3} colors={{ overlay: 'rgba(212, 114, 122, 0.2)' }} />
      </section>

      {/* ── 6. RSVP ──────────────────────────────────────────────────── */}
      <section className="px-4 sm:px-8 py-16" style={{ background: '#FDF0F0' }}>
        <div className="max-w-lg mx-auto">
          <h2 style={{ ...fontDisplay, color: C.text }} className="text-3xl text-center mb-8">Join Our Joy</h2>
          <div className="rounded-3xl p-6 sm:p-8" style={{ background: C.card, border: `1px solid ${C.border}` }}>
            <RSVPForm subEvents={subEvents} onSubmit={onRsvpSubmit}
              colors={{ button: C.primary, buttonText: '#FFFFFF', label: C.text, checkboxAccent: C.gold }}
              successMessage="We're so happy you'll be celebrating with us! ❤️" />
          </div>
        </div>
      </section>

      {/* ── 7. FOOTER ────────────────────────────────────────────────── */}
      <footer className="px-4 py-10 text-center" style={{ borderTop: `1px solid ${C.border}` }}>
        <HeartPulse />
        <p style={{ ...fontDisplay, color: C.text }} className="text-xl mt-4">{name1} & {name2}</p>
        <DawatBranding show={branding.showDawatBranding} colors={{ text: C.muted }} />
      </footer>

      <ShareBar colors={{ bar: C.card, buttonText: C.text, button: C.primary, border: C.border }} floating />
    </div>
  )
}
