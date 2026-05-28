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
const fontBody = { fontFamily: 'var(--font-dm-sans, "DM Sans", sans-serif)' }

const HOME_ICONS = [
  { icon: '🏡', label: 'New Home' },
  { icon: '🌿', label: 'Fresh Start' },
  { icon: '☕', label: 'Warm Drinks' },
  { icon: '🕯️', label: 'Cozy Vibes' },
]

function CozyRule({ primary }: { primary: string }) {
  return (
    <div className="flex items-center gap-3 my-4">
      <div className="h-px flex-1" style={{ background: primary, opacity: 0.3 }} />
      <span style={{ color: primary }} className="text-lg">🏡</span>
      <div className="h-px flex-1" style={{ background: primary, opacity: 0.3 }} />
    </div>
  )
}

export default function HousewarmingTemplate({ event, branding, onRsvpSubmit, colors }: TemplateProps) {
  const C = {
    bg: colors?.bg ?? '#FAF7F3',
    terracotta: colors?.primary ?? '#C9622F',
    terracottaLight: colors?.surface ?? '#F5EAE0',
    sage: colors?.secondary ?? '#3D6B4F',
    sageLight: '#E0EDE5',
    text: colors?.text ?? '#2E1A0A',
    muted: colors?.muted ?? '#8A6A4A',
    card: '#FFFFFF',
    border: '#E5D8C8',
  }

  const { title, eventDate, subEvents, description, hostName, message } = event

  return (
    <div style={{ background: C.bg, color: C.text, ...fontBody }} className="min-h-screen overflow-x-hidden">

      {/* ── 1. COZY HERO ─────────────────────────────────────────────── */}
      <section
        className="min-h-screen flex flex-col items-center justify-center px-6 py-20 text-center"
        style={{ background: `linear-gradient(160deg, ${C.terracottaLight} 0%, ${C.bg} 60%, ${C.sageLight} 100%)` }}
      >
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          <p className="text-xs uppercase tracking-[0.4em] mb-4" style={{ color: C.muted }}>
            {hostName ? `${hostName} invites you to` : 'You\'re invited to'}
          </p>
          <CozyRule primary={C.terracotta} />
          <h1 style={{ ...fontDisplay, color: C.terracotta }} className="text-5xl sm:text-7xl mt-4 mb-2 leading-tight">
            Housewarming
          </h1>
          {title && title !== 'Housewarming' && (
            <p style={{ ...fontDisplay, color: C.sage }} className="text-2xl italic">{title}</p>
          )}
          <CozyRule primary={C.terracotta} />
          <p className="mt-4 text-sm uppercase tracking-widest" style={{ color: C.muted }}>
            {new Date(eventDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
          {subEvents[0] && (
            <div className="flex items-center justify-center gap-2 mt-2 text-sm" style={{ color: C.muted }}>
              <MapPin className="w-3.5 h-3.5" />
              <span>{subEvents[0].venue}</span>
            </div>
          )}
        </motion.div>
      </section>

      {/* ── 2. HOME ICONS ────────────────────────────────────────────── */}
      <section className="px-4 py-10" style={{ background: C.terracotta }}>
        <div className="max-w-2xl mx-auto grid grid-cols-4 gap-4 text-center">
          {HOME_ICONS.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ delay: i * 0.1 }}
            >
              <p className="text-3xl mb-1">{item.icon}</p>
              <p className="text-xs font-semibold" style={{ color: '#FFFFFF99' }}>{item.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── 3. COUNTDOWN ─────────────────────────────────────────────── */}
      <section className="px-4 py-12" style={{ background: C.terracottaLight }}>
        <div className="max-w-2xl mx-auto">
          <p className="text-center text-xs uppercase tracking-widest mb-4" style={{ color: C.muted }}>
            Opening Our Doors In
          </p>
          <CountdownTimer targetDate={eventDate} boxStyle="boxed"
            colors={{ box: C.card, number: C.terracotta, label: C.muted, border: C.border }} />
        </div>
      </section>

      {/* ── 4. MESSAGE ───────────────────────────────────────────────── */}
      <section className="px-6 sm:px-8 py-20 max-w-2xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewport}>
          <CozyRule primary={C.terracotta} />
          <p style={{ ...fontDisplay, color: C.text }} className="text-xl mt-6 leading-relaxed">
            {message || description || 'We\'ve found our corner of the world and we want to share it with the people who matter most. Come celebrate our new chapter, fill our home with warmth, and let\'s make new memories together.'}
          </p>
        </motion.div>
      </section>

      {/* ── 5. EVENTS ────────────────────────────────────────────────── */}
      {subEvents.length > 0 && (
        <motion.section
          initial="initial" whileInView="animate" viewport={viewport} variants={staggerContainer}
          className="px-4 sm:px-8 py-16"
          style={{ background: C.sageLight }}
        >
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 style={{ ...fontDisplay, color: C.sage }} className="text-3xl">The Details</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {subEvents.map((se, i) => (
                <motion.div
                  key={se.id}
                  variants={staggerItem}
                  className="rounded-2xl p-5"
                  style={{ background: C.card, border: `1px solid ${C.border}`, borderLeft: `4px solid ${i % 2 === 0 ? C.terracotta : C.sage}` }}
                >
                  <p style={{ ...fontDisplay, color: C.text }} className="text-lg mb-2">{se.name}</p>
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

      {/* ── 6. RSVP ──────────────────────────────────────────────────── */}
      <section className="px-4 sm:px-8 py-16">
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-6">
            <CozyRule primary={C.terracotta} />
            <h2 style={{ ...fontDisplay, color: C.terracotta }} className="text-3xl mt-4">Come On In</h2>
          </div>
          <div className="rounded-2xl p-6 sm:p-8" style={{ background: C.card, border: `1px solid ${C.border}` }}>
            <RSVPForm subEvents={subEvents} onSubmit={onRsvpSubmit}
              colors={{ button: C.terracotta, buttonText: '#FFFFFF', label: C.text, checkboxAccent: C.sage }}
              successMessage="Welcome home! We can't wait to see you 🏡" />
          </div>
        </div>
      </section>

      {/* ── 7. FOOTER ────────────────────────────────────────────────── */}
      <footer className="px-4 py-10 text-center" style={{ borderTop: `1px solid ${C.border}` }}>
        <p className="text-4xl mb-2">🏡</p>
        <p style={{ ...fontDisplay, color: C.terracotta }} className="text-xl">Home is where the heart is.</p>
        {hostName && <p className="text-sm mt-1" style={{ color: C.muted }}>— {hostName}</p>}
        <DawatBranding show={branding.showDawatBranding} colors={{ text: C.muted }} />
      </footer>

      <ShareBar colors={{ bar: C.card, buttonText: C.text, button: C.terracotta, border: C.border }} floating />
    </div>
  )
}
