'use client'

import { motion } from 'motion/react'
import { MapPin, ExternalLink } from 'lucide-react'
import type { TemplateProps } from '@/lib/templates-data'
import CountdownTimer from '../shared/CountdownTimer'
import RSVPForm from '../shared/RSVPForm'
import Gallery from '../shared/Gallery'
import DawatBranding from '../shared/DawatBranding'
import ShareBar from '../shared/ShareBar'
import { viewport, staggerContainer, staggerItem } from '@/lib/motion'

// ─── SVG decorations ─────────────────────────────────────────────────────────

function FloralCorner({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={`absolute w-40 sm:w-56 md:w-64 pointer-events-none ${flip ? 'rotate-180' : ''}`}
      style={{ color: '#C9622F', opacity: 0.12 }}
      fill="currentColor"
    >
      <ellipse cx="40" cy="160" rx="30" ry="12" transform="rotate(-45 40 160)" />
      <ellipse cx="70" cy="130" rx="25" ry="10" transform="rotate(-30 70 130)" />
      <ellipse cx="30" cy="120" rx="20" ry="8" transform="rotate(-60 30 120)" />
      <ellipse cx="100" cy="100" rx="22" ry="9" transform="rotate(-20 100 100)" />
      <ellipse cx="60" cy="90" rx="18" ry="7" transform="rotate(-50 60 90)" />
      <line x1="40" y1="160" x2="110" y2="90" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="50" cy="170" r="6" />
      <circle cx="30" cy="145" r="4" />
      <circle cx="80" cy="115" r="5" />
      <circle cx="115" cy="85" r="4" />
    </svg>
  )
}

function PetalDivider() {
  return (
    <div className="flex items-center justify-center gap-3 my-2">
      <div className="h-px flex-1" style={{ background: '#D4A853', opacity: 0.4 }} />
      <svg viewBox="0 0 40 20" className="w-10 h-5" fill="#D4A853" opacity="0.7">
        <ellipse cx="20" cy="10" rx="18" ry="6" />
        <circle cx="20" cy="10" r="3" fill="#C9622F" />
      </svg>
      <div className="h-px flex-1" style={{ background: '#D4A853', opacity: 0.4 }} />
    </div>
  )
}

function Petal({ style }: { style?: React.CSSProperties }) {
  return (
    <div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: 8,
        height: 14,
        background: '#C9622F',
        opacity: 0.25,
        animation: 'bloom-petal-fall 6s ease-in infinite',
        ...style,
      }}
    />
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

const C = {
  bg: '#FAF6F0',
  primary: '#C9622F',
  secondary: '#D4A853',
  accent: '#8B5E3C',
  text: '#2C2420',
  muted: '#8A7D74',
  card: '#FDF2EE',
  border: '#E8D5C8',
} as const

const fontDisplay = { fontFamily: 'var(--font-playfair, "Playfair Display", serif)' }
const fontBody = { fontFamily: 'var(--font-dm-sans, "DM Sans", sans-serif)' }

export default function BloomTemplate({ event, branding, onRsvpSubmit }: TemplateProps) {
  const { coupleNames, title, eventDate, subEvents, description, gallery } = event

  const name1 = coupleNames?.partner1 ?? title.split('&')[0]?.trim() ?? 'Partner 1'
  const name2 = coupleNames?.partner2 ?? title.split('&')[1]?.trim().split(' ')[0] ?? 'Partner 2'

  const petalPositions = [
    { left: '10%', animationDelay: '0s', animationDuration: '7s' },
    { left: '25%', animationDelay: '1s', animationDuration: '6s' },
    { left: '40%', animationDelay: '2.5s', animationDuration: '8s' },
    { left: '60%', animationDelay: '0.5s', animationDuration: '6.5s' },
    { left: '75%', animationDelay: '1.8s', animationDuration: '7.5s' },
    { left: '88%', animationDelay: '3s', animationDuration: '6s' },
  ]

  return (
    <div style={{ background: C.bg, color: C.text, ...fontBody }} className="min-h-screen overflow-x-hidden">
      <style>{`
        @keyframes bloom-petal-fall {
          0%   { transform: translateY(-10px) rotate(0deg); opacity: 0; }
          10%  { opacity: 0.25; }
          90%  { opacity: 0.15; }
          100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
        }
      `}</style>

      {/* ── 1. FLORAL HERO ─────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 overflow-hidden">
        <FloralCorner />
        <div className="absolute top-0 right-0">
          <FloralCorner flip />
        </div>

        {/* Falling petals */}
        {petalPositions.map((p, i) => (
          <Petal key={i} style={p} />
        ))}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative z-10 text-center max-w-xl mx-auto"
        >
          <p className="text-xs uppercase tracking-[0.3em] mb-6" style={{ color: C.muted }}>
            Together with their families
          </p>

          <h1
            style={{ ...fontDisplay, color: C.text }}
            className="text-5xl sm:text-6xl md:text-7xl leading-tight mb-2"
          >
            {name1}
          </h1>

          <p style={{ ...fontDisplay, color: C.secondary }} className="text-4xl sm:text-5xl italic my-2">
            &
          </p>

          <h1
            style={{ ...fontDisplay, color: C.text }}
            className="text-5xl sm:text-6xl md:text-7xl leading-tight mb-8"
          >
            {name2}
          </h1>

          <PetalDivider />

          <p className="mt-6 text-sm uppercase tracking-widest" style={{ color: C.muted }}>
            {new Date(eventDate).toLocaleDateString('en-US', {
              weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
            })}
          </p>

          {subEvents[0] && (
            <p className="mt-2 text-sm" style={{ color: C.muted }}>
              {subEvents[0].venue}
            </p>
          )}
        </motion.div>
      </section>

      {/* ── 2. COUNTDOWN STRIP ─────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 py-10" style={{ background: '#FDF2EE' }}>
        <div className="max-w-2xl mx-auto">
          <p className="text-center text-xs uppercase tracking-widest mb-6" style={{ color: C.muted }}>
            Counting the days
          </p>
          <CountdownTimer
            targetDate={eventDate}
            boxStyle="boxed"
            colors={{
              box: C.bg,
              number: C.primary,
              label: C.muted,
              border: C.border,
            }}
          />
        </div>
      </section>

      {/* ── 3. COUPLE STORY ────────────────────────────────────────────── */}
      <motion.section
        initial="initial"
        whileInView="animate"
        viewport={viewport}
        variants={staggerContainer}
        className="px-4 sm:px-8 md:px-16 py-20 max-w-2xl mx-auto text-center"
      >
        <motion.div variants={staggerItem}>
          <p className="text-xs uppercase tracking-widest mb-2" style={{ color: C.muted }}>Our Story</p>
          <PetalDivider />
        </motion.div>

        <motion.h2
          variants={staggerItem}
          style={{ ...fontDisplay, color: C.text }}
          className="text-3xl sm:text-4xl mt-6 mb-6"
        >
          A Beautiful Journey Begins
        </motion.h2>

        <motion.div variants={staggerItem} className="space-y-4 text-base leading-relaxed" style={{ color: C.muted }}>
          <p>
            {description ||
              'Every love story is beautiful, but ours is our favourite. We started as strangers, became friends, and fell in love somewhere in between.'}
          </p>
          <p>
            Now we invite you — our dearest family and friends — to witness the beginning of our greatest adventure together.
          </p>
        </motion.div>

        {/* Photo placeholder */}
        <motion.div
          variants={staggerItem}
          className="mt-10 rounded-2xl overflow-hidden mx-auto"
          style={{ maxWidth: 400, background: C.border }}
        >
          <div className="aspect-[4/3] flex items-center justify-center opacity-30">
            <svg viewBox="0 0 80 60" className="w-20 h-16" fill={C.primary}>
              <rect x="10" y="15" width="60" height="40" rx="3" />
              <circle cx="40" cy="35" r="12" fill={C.bg} />
              <circle cx="40" cy="35" r="6" />
              <rect x="55" y="17" width="10" height="8" rx="2" />
            </svg>
          </div>
        </motion.div>
      </motion.section>

      {/* ── 4. EVENTS TIMELINE ─────────────────────────────────────────── */}
      {subEvents.length > 0 && (
        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={viewport}
          variants={staggerContainer}
          className="px-4 sm:px-8 py-20"
          style={{ background: C.card }}
        >
          <div className="max-w-3xl mx-auto">
            <motion.div variants={staggerItem} className="text-center mb-12">
              <p className="text-xs uppercase tracking-widest mb-2" style={{ color: C.muted }}>Schedule</p>
              <PetalDivider />
              <h2 style={{ ...fontDisplay, color: C.text }} className="text-3xl sm:text-4xl mt-4">
                Events & Celebrations
              </h2>
            </motion.div>

            <div className="relative">
              {/* Center timeline line (desktop) */}
              <div
                className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
                style={{ background: C.border }}
              />

              <div className="flex flex-col gap-8">
                {subEvents.map((se, i) => (
                  <motion.div
                    key={se.id}
                    variants={staggerItem}
                    className={`flex flex-col md:flex-row items-start gap-4 ${
                      i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                  >
                    {/* Card */}
                    <div
                      className={`flex-1 rounded-2xl p-6 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}
                      style={{ background: C.bg, border: `1px solid ${C.border}` }}
                    >
                      <h3 style={{ ...fontDisplay, color: C.primary }} className="text-xl mb-2">
                        {se.name}
                      </h3>
                      <p className="text-sm" style={{ color: C.muted }}>{se.date}</p>
                      <p className="text-sm" style={{ color: C.muted }}>{se.time}</p>
                      <p className="text-sm mt-1 flex items-center gap-1 justify-start md:justify-end" style={{ color: C.muted }}>
                        <MapPin className="w-3.5 h-3.5 flex-shrink-0" style={{ color: C.secondary }} />
                        {se.venue}
                      </p>
                    </div>

                    {/* Timeline dot */}
                    <div className="hidden md:flex items-center justify-center w-8 flex-shrink-0">
                      <div className="w-4 h-4 rounded-full border-2 z-10" style={{ background: C.bg, borderColor: C.primary }} />
                    </div>

                    {/* Spacer for alternating layout */}
                    <div className="hidden md:block flex-1" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>
      )}

      {/* ── 5. GALLERY ─────────────────────────────────────────────────── */}
      <motion.section
        initial="initial"
        whileInView="animate"
        viewport={viewport}
        variants={staggerContainer}
        className="px-4 sm:px-8 md:px-16 py-20 max-w-5xl mx-auto"
      >
        <motion.div variants={staggerItem} className="text-center mb-10">
          <p className="text-xs uppercase tracking-widest mb-2" style={{ color: C.muted }}>Gallery</p>
          <PetalDivider />
          <h2 style={{ ...fontDisplay, color: C.text }} className="text-3xl sm:text-4xl mt-4">
            Moments
          </h2>
        </motion.div>
        <Gallery
          images={gallery}
          variant="masonry"
          columns={3}
          colors={{ overlay: 'rgba(201, 98, 47, 0.25)' }}
        />
      </motion.section>

      {/* ── 6. RSVP ────────────────────────────────────────────────────── */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={{ duration: 0.7 }}
        className="px-4 sm:px-8 py-20"
        style={{ background: C.card }}
      >
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-8">
            <p className="text-xs uppercase tracking-widest mb-2" style={{ color: C.muted }}>
              RSVP
            </p>
            <PetalDivider />
            <h2 style={{ ...fontDisplay, color: C.text }} className="text-3xl sm:text-4xl mt-4">
              Join Our Celebration
            </h2>
          </div>

          <div
            className="rounded-3xl p-6 sm:p-8"
            style={{ background: C.bg, border: `1px solid ${C.border}` }}
          >
            <RSVPForm
              subEvents={subEvents}
              onSubmit={onRsvpSubmit}
              colors={{
                input: C.bg,
                button: C.primary,
                buttonText: '#FFFFFF',
                label: C.text,
                checkboxAccent: C.primary,
                successText: C.text,
              }}
              inputStyle="bordered"
              successMessage={`Thank you! We can't wait to celebrate with you.`}
            />
          </div>
        </div>
      </motion.section>

      {/* ── 7. VENUE ───────────────────────────────────────────────────── */}
      {subEvents.length > 0 && (
        <section className="px-4 sm:px-8 md:px-16 py-16 max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-xs uppercase tracking-widest mb-2" style={{ color: C.muted }}>Venue</p>
            <PetalDivider />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {subEvents.map((se) => (
              <div
                key={se.id}
                className="rounded-2xl p-5"
                style={{ background: C.card, border: `1px solid ${C.border}` }}
              >
                <p style={{ ...fontDisplay, color: C.primary }} className="text-lg mb-1">{se.name}</p>
                <p className="text-sm" style={{ color: C.muted }}>{se.date} · {se.time}</p>
                <p className="text-sm mt-1 flex items-center gap-1" style={{ color: C.muted }}>
                  <MapPin className="w-3.5 h-3.5" style={{ color: C.secondary }} />
                  {se.venue}
                </p>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(se.venue)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs mt-3 hover:underline"
                  style={{ color: C.primary }}
                >
                  <ExternalLink className="w-3 h-3" />
                  Open in Google Maps
                </a>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── 8. FOOTER ──────────────────────────────────────────────────── */}
      <footer className="px-4 py-10 text-center" style={{ borderTop: `1px solid ${C.border}` }}>
        <PetalDivider />
        <p style={{ ...fontDisplay, color: C.text }} className="text-lg mt-4">
          {name1} & {name2}
        </p>
        <p className="text-sm mt-1" style={{ color: C.muted }}>
          {new Date(eventDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
        <DawatBranding show={branding.showDawatBranding} colors={{ text: C.muted, border: C.border }} />
      </footer>

      <ShareBar
        colors={{ bar: C.bg, buttonText: C.text, button: C.primary, border: C.border }}
        floating
      />
    </div>
  )
}
