'use client'

import { motion } from 'motion/react'
import { MapPin } from 'lucide-react'
import type { TemplateProps } from '@/lib/templates-data'
import CountdownTimer from '../shared/CountdownTimer'
import RSVPForm from '../shared/RSVPForm'
import DawatBranding from '../shared/DawatBranding'
import ShareBar from '../shared/ShareBar'
import { viewport, staggerContainer, staggerItem } from '@/lib/motion'

const fontDisplay = { fontFamily: 'var(--font-plus-jakarta, "Plus Jakarta Sans", sans-serif)' }
const fontBody = { fontFamily: 'var(--font-plus-jakarta, "Plus Jakarta Sans", sans-serif)' }

function IslamicPattern({ gold, emerald }: { gold: string; emerald: string }) {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full" fill="none">
      {/* 8-pointed star pattern tile */}
      {[0, 1, 2, 3].map((row) =>
        [0, 1, 2, 3].map((col) => {
          const cx = col * 50 + 25
          const cy = row * 50 + 25
          return (
            <g key={`${row}-${col}`} transform={`translate(${cx}, ${cy})`}>
              <polygon
                points="0,-15 5.6,-5.6 15,0 5.6,5.6 0,15 -5.6,5.6 -15,0 -5.6,-5.6"
                fill="none" stroke={gold} strokeWidth="0.5" opacity="0.3"
              />
              <polygon
                points="0,-10 3.8,-3.8 10,0 3.8,3.8 0,10 -3.8,3.8 -10,0 -3.8,-3.8"
                fill="none" stroke={emerald} strokeWidth="0.5" opacity="0.2"
              />
            </g>
          )
        })
      )}
    </svg>
  )
}

function GeoDivider({ gold }: { gold: string }) {
  return (
    <div className="flex items-center gap-2 my-4">
      <div className="h-px flex-1" style={{ background: gold, opacity: 0.3 }} />
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill={gold}>
        <polygon points="12,2 14.5,9 22,9 16,14 18.5,21 12,16.5 5.5,21 8,14 2,9 9.5,9" />
      </svg>
      <div className="h-px flex-1" style={{ background: gold, opacity: 0.3 }} />
    </div>
  )
}

export default function GeometricTemplate({ event, branding, onRsvpSubmit, colors }: TemplateProps) {
  const C = {
    bg: colors?.bg ?? '#F5FAF0',
    emerald: colors?.primary ?? '#1A6B3A',
    emeraldLight: colors?.surface ?? '#E0F2E8',
    gold: colors?.secondary ?? '#C9A84C',
    goldLight: '#F5EDD0',
    text: colors?.text ?? '#1A2E1A',
    muted: colors?.muted ?? '#5A7A5A',
    card: '#FFFFFF',
    border: '#C5E0D0',
  }

  const { title, eventDate, subEvents, description, hostName, message } = event

  return (
    <div style={{ background: C.bg, color: C.text, ...fontBody }} className="min-h-screen overflow-x-hidden">

      {/* ── 1. HERO ──────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 text-center overflow-hidden">
        {/* Pattern background */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <IslamicPattern gold={C.gold} emerald={C.emerald} />
        </div>
        {/* Gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse 70% 70% at 50% 50%, transparent 30%, ${C.bg} 100%)` }}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          className="relative z-10 max-w-xl"
        >
          {/* Octagon frame */}
          <div
            className="relative w-32 h-32 mx-auto mb-6 flex items-center justify-center"
            style={{
              background: C.emerald,
              clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
            }}
          >
            <span className="text-4xl" style={{ color: C.goldLight }}>☽</span>
          </div>

          <p className="text-xs uppercase tracking-[0.5em] mb-4 font-semibold" style={{ color: C.muted }}>
            Eid Al-Fitr · Celebration
          </p>
          <GeoDivider gold={C.gold} />
          <h1 style={{ ...fontDisplay, color: C.emerald }} className="text-5xl sm:text-6xl font-black mt-4 mb-2 leading-tight">
            {title}
          </h1>
          <GeoDivider gold={C.gold} />
          {hostName && (
            <p className="text-sm mt-4" style={{ color: C.muted }}>
              Hosted by <span style={{ color: C.emerald, fontWeight: 700 }}>{hostName}</span>
            </p>
          )}
          <p className="mt-3 text-xs uppercase tracking-widest" style={{ color: C.muted }}>
            {new Date(eventDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </motion.div>
      </section>

      {/* ── 2. COUNTDOWN ─────────────────────────────────────────────── */}
      <section className="px-4 py-12" style={{ background: C.emerald }}>
        <div className="max-w-2xl mx-auto">
          <CountdownTimer targetDate={eventDate} boxStyle="boxed"
            colors={{ box: `${C.emerald}CC`, number: C.gold, label: `${C.goldLight}80`, border: `${C.gold}30` }} />
        </div>
      </section>

      {/* ── 3. MESSAGE ───────────────────────────────────────────────── */}
      <section className="px-6 sm:px-8 py-20 max-w-2xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewport}>
          <GeoDivider gold={C.gold} />
          <p style={{ ...fontDisplay, color: C.text }} className="text-xl font-medium mt-6 leading-relaxed">
            {message || description || 'Celebrating the blessings of Eid with those we cherish. Join us in gratitude, joy, and togetherness as we mark this sacred occasion.'}
          </p>
        </motion.div>
      </section>

      {/* ── 4. GEOMETRIC STATS ───────────────────────────────────────── */}
      <section className="px-4 py-12" style={{ background: C.emeraldLight }}>
        <div className="max-w-3xl mx-auto grid grid-cols-3 gap-4 text-center">
          {[
            { icon: '☽', label: 'Eid al-Fitr', value: 'Celebration' },
            { icon: '🌟', label: 'Guests', value: 'Welcome All' },
            { icon: '🕌', label: 'In Faith', value: '& Gratitude' },
          ].map((item) => (
            <div key={item.label}
              className="p-4 rounded-xl"
              style={{ background: C.card, border: `1px solid ${C.border}` }}
            >
              <p className="text-3xl mb-1">{item.icon}</p>
              <p className="text-xs uppercase tracking-widest mb-1 font-semibold" style={{ color: C.gold }}>{item.label}</p>
              <p className="text-sm font-bold" style={{ color: C.emerald }}>{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 5. EVENTS ────────────────────────────────────────────────── */}
      {subEvents.length > 0 && (
        <motion.section
          initial="initial" whileInView="animate" viewport={viewport} variants={staggerContainer}
          className="px-4 sm:px-8 py-16 max-w-4xl mx-auto"
        >
          <div className="text-center mb-8">
            <GeoDivider gold={C.gold} />
            <h2 style={{ ...fontDisplay, color: C.emerald }} className="text-3xl font-black mt-4">Events</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {subEvents.map((se, i) => (
              <motion.div
                key={se.id}
                variants={staggerItem}
                className="p-5"
                style={{
                  background: C.card,
                  border: `1px solid ${C.border}`,
                  clipPath: i === 0 ? 'polygon(0 0, 100% 0, 95% 100%, 0 100%)' : 'none',
                  borderLeft: `4px solid ${i % 2 === 0 ? C.emerald : C.gold}`,
                  borderRadius: 12,
                }}
              >
                <p style={{ ...fontDisplay, color: C.emerald }} className="font-bold text-lg">{se.name}</p>
                <p className="text-sm mt-2" style={{ color: C.muted }}>{se.date} · {se.time}</p>
                <p className="text-sm flex items-center gap-1 mt-1" style={{ color: C.muted }}>
                  <MapPin className="w-3.5 h-3.5" />{se.venue}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}

      {/* ── 6. RSVP ──────────────────────────────────────────────────── */}
      <section className="px-4 sm:px-8 py-16" style={{ background: C.emeraldLight }}>
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-6">
            <GeoDivider gold={C.gold} />
            <h2 style={{ ...fontDisplay, color: C.emerald }} className="text-3xl font-black mt-4">Confirm Your Attendance</h2>
          </div>
          <RSVPForm subEvents={subEvents} onSubmit={onRsvpSubmit}
            colors={{ button: C.emerald, buttonText: '#FFFFFF', label: C.text, checkboxAccent: C.gold }}
            successMessage="Eid Mubarak! We look forward to seeing you ☽" />
        </div>
      </section>

      {/* ── 7. FOOTER ────────────────────────────────────────────────── */}
      <footer className="px-4 py-10 text-center" style={{ background: C.emerald }}>
        <GeoDivider gold={C.gold} />
        <p style={{ ...fontDisplay, color: C.goldLight }} className="text-xl font-black mt-4">{title}</p>
        <p className="text-xs uppercase tracking-widest mt-1" style={{ color: `${C.goldLight}80` }}>Eid Mubarak</p>
        <DawatBranding show={branding.showDawatBranding} colors={{ text: `${C.goldLight}60` }} />
      </footer>

      <ShareBar colors={{ bar: C.card, buttonText: C.text, button: C.emerald, border: C.border }} floating />
    </div>
  )
}
