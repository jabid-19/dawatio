'use client'

import { motion } from 'motion/react'
import { MapPin, ExternalLink } from 'lucide-react'
import type { TemplateProps } from '@/lib/templates-data'
import CountdownTimer from '../shared/CountdownTimer'
import RSVPForm from '../shared/RSVPForm'
import Gallery from '../shared/Gallery'
import CoverPhoto from '../shared/CoverPhoto'
import DawatBranding from '../shared/DawatBranding'
import ShareBar from '../shared/ShareBar'
import { viewport, staggerContainer, staggerItem } from '@/lib/motion'
import { PLACEHOLDER_IMAGES } from '@/lib/placeholder-images'

const fontDisplay = { fontFamily: 'var(--font-lora, "Lora", serif)' }
const fontBody = { fontFamily: 'var(--font-nunito, "Nunito Sans", sans-serif)' }

function LeafDivider({ accent, primary }: { accent: string; primary: string }) {
  return (
    <div className="flex items-center justify-center gap-3 my-2">
      <div className="h-px flex-1" style={{ background: accent, opacity: 0.4 }} />
      <svg viewBox="0 0 60 20" className="w-16 h-5" fill={accent} opacity="0.6">
        <path d="M30 10 C30 10 20 3 10 8 C5 10 5 14 10 14 C20 14 30 10 30 10Z" />
        <path d="M30 10 C30 10 40 3 50 8 C55 10 55 14 50 14 C40 14 30 10 30 10Z" />
        <circle cx="30" cy="10" r="2" fill={primary} />
      </svg>
      <div className="h-px flex-1" style={{ background: accent, opacity: 0.4 }} />
    </div>
  )
}

function VineBorder({ accent }: { accent: string }) {
  return (
    <div className="hidden @md:block absolute left-0 top-0 bottom-0 w-12 pointer-events-none overflow-hidden">
      <svg viewBox="0 0 40 800" className="h-full w-full" fill="none" style={{ color: accent, opacity: 0.18 }}>
        <path
          d="M20 0 C20 0 5 50 20 100 C35 150 5 200 20 250 C35 300 5 350 20 400 C35 450 5 500 20 550 C35 600 5 650 20 700 C35 750 5 800 20 800"
          stroke="currentColor"
          strokeWidth="2"
        />
        {[100, 200, 300, 400, 500].map((y) => (
          <g key={y}>
            <ellipse cx="28" cy={y} rx="10" ry="6" transform={`rotate(-30 28 ${y})`} fill="currentColor" />
            <ellipse cx="12" cy={y + 50} rx="8" ry="5" transform={`rotate(30 12 ${y + 50})`} fill="currentColor" />
          </g>
        ))}
      </svg>
    </div>
  )
}

export default function GardenTemplate({ event, branding, onRsvpSubmit, colors, disableEffects: _disableEffects }: TemplateProps) {
  const C = {
    bg:       colors?.bg        ?? '#F4F7F0',
    primary:  colors?.primary   ?? '#3D6B4F',
    secondary: colors?.secondary ?? '#D4A853',
    accent:   colors?.primary   ?? '#8CB369',
    light:    colors?.surface   ?? '#E8F0E0',
    text:     colors?.text      ?? '#2A3C2E',
    muted:    colors?.muted     ?? '#6B7D6F',
    white:    '#FFFFFF',
  }
  const { coupleNames, title, eventDate, subEvents, description, gallery, coverImage, sections } = event
  const placeholders = PLACEHOLDER_IMAGES.wedding

  const name1 = coupleNames?.partner1 ?? title.split('&')[0]?.trim() ?? 'Partner 1'
  const name2 = coupleNames?.partner2 ?? title.split('&')[1]?.trim().split(' ')[0] ?? 'Partner 2'

  return (
    <div style={{ background: C.bg, color: C.text, ...fontBody }} className="@container min-h-screen overflow-x-hidden">

      {/* ── 1. GARDEN HERO ───────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 overflow-hidden">
        <VineBorder accent={C.accent} />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center max-w-xl mx-auto relative @md:pl-8"
        >
          <p className="text-xs uppercase tracking-[0.3em] mb-4" style={{ color: C.muted }}>
            You are warmly invited
          </p>
          <h1 style={{ ...fontDisplay, color: C.text }} className="text-5xl @sm:text-6xl italic leading-tight mb-2">
            {name1}
          </h1>
          <p style={{ ...fontDisplay, color: C.secondary }} className="text-3xl italic my-1">&</p>
          <h1 style={{ ...fontDisplay, color: C.text }} className="text-5xl @sm:text-6xl italic leading-tight mb-8">
            {name2}
          </h1>

          <LeafDivider accent={C.accent} primary={C.primary} />

          <p className="mt-6 text-sm uppercase tracking-widest" style={{ color: C.muted }}>
            {new Date(eventDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
          {subEvents[0] && (
            <p className="mt-2 text-sm flex items-center justify-center gap-1" style={{ color: C.muted }}>
              <MapPin className="w-3.5 h-3.5" style={{ color: C.accent }} />
              {subEvents[0].venue}
            </p>
          )}
        </motion.div>
      </section>

      {/* ── 2. COUNTDOWN ─────────────────────────────────────────────── */}
      {sections.countdown !== false && (
        <section className="px-4 py-12" style={{ background: C.light }}>
          <div className="max-w-2xl mx-auto">
            <p className="text-center text-xs uppercase tracking-widest mb-6" style={{ color: C.muted }}>Counting the days</p>
            <CountdownTimer
              targetDate={eventDate}
              boxStyle="boxed"
              colors={{ box: C.bg, number: C.primary, label: C.muted, border: '#C8DCC0' }}
            />
          </div>
        </section>
      )}

      {/* ── 3. WELCOME NOTE ──────────────────────────────────────────── */}
      {sections.about !== false && (
        <section className="px-6 @sm:px-8 py-20">
          <div className="max-w-4xl mx-auto grid grid-cols-1 @md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewport}
              transition={{ duration: 0.7 }}
            >
              <h2 style={{ ...fontDisplay, color: C.text }} className="text-3xl @sm:text-4xl italic mb-6">
                With hearts full of joy
              </h2>
              <div className="space-y-4 text-base leading-relaxed" style={{ color: C.muted }}>
                <p>
                  {description || 'Together with our families, we joyfully invite you to share in the celebration of our wedding.'}
                </p>
                <p>Your presence and blessings mean the world to us as we begin this beautiful chapter.</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={viewport}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="rounded-3xl overflow-hidden"
            >
              <CoverPhoto src={coverImage} fallback={placeholders.cover} alt={title} shape="landscape" className="rounded-3xl" />
            </motion.div>
          </div>
        </section>
      )}

      {/* ── 4. EVENT CARDS ───────────────────────────────────────────── */}
      {sections.schedule !== false && subEvents.length > 0 && (
        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={viewport}
          variants={staggerContainer}
          className="px-4 @sm:px-8 py-20"
          style={{ background: C.light }}
        >
          <div className="max-w-4xl mx-auto">
            <motion.div variants={staggerItem} className="text-center mb-12">
              <p className="text-xs uppercase tracking-widest mb-2" style={{ color: C.muted }}>Schedule</p>
              <LeafDivider accent={C.accent} primary={C.primary} />
              <h2 style={{ ...fontDisplay, color: C.text }} className="text-3xl @sm:text-4xl italic mt-4">
                The Celebrations
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 @sm:grid-cols-2 @lg:grid-cols-3 gap-5">
              {subEvents.map((se) => (
                <motion.div
                  key={se.id}
                  variants={staggerItem}
                  className="rounded-2xl p-5 flex flex-col gap-2"
                  style={{
                    background: C.bg,
                    borderBottom: `3px solid ${C.secondary}`,
                    boxShadow: '0 2px 12px rgba(61, 107, 79, 0.06)',
                  }}
                >
                  <div className="w-8 h-8 mb-1">
                    <svg viewBox="0 0 30 30" fill={C.accent} opacity="0.7">
                      <path d="M15 3 C15 3 5 10 5 20 C5 25 10 27 15 27 C20 27 25 25 25 20 C25 10 15 3 15 3Z" />
                    </svg>
                  </div>
                  <h3 style={{ ...fontDisplay, color: C.primary }} className="text-xl italic">{se.name}</h3>
                  <p className="text-sm" style={{ color: C.muted }}>{se.date}</p>
                  <p className="text-sm" style={{ color: C.muted }}>{se.time}</p>
                  <p className="text-sm flex items-center gap-1" style={{ color: C.muted }}>
                    <MapPin className="w-3.5 h-3.5" style={{ color: C.accent }} />
                    {se.venue}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      )}

      {/* ── 5. GALLERY ───────────────────────────────────────────────── */}
      <section className="px-4 @sm:px-8 py-20 max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <LeafDivider accent={C.accent} primary={C.primary} />
          <h2 style={{ ...fontDisplay, color: C.text }} className="text-3xl italic mt-4">Gallery</h2>
        </div>
        <Gallery images={gallery} fallbackImages={placeholders.gallery} variant="polaroid" colors={{ overlay: 'rgba(61,107,79,0.2)' }} />
      </section>

      {/* ── 6. RSVP ──────────────────────────────────────────────────── */}
      <section className="px-4 @sm:px-8 py-20" style={{ background: C.light }}>
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-8">
            <LeafDivider accent={C.accent} primary={C.primary} />
            <h2 style={{ ...fontDisplay, color: C.text }} className="text-3xl italic mt-4">
              Will You Join Us?
            </h2>
          </div>
          <div
            className="rounded-3xl p-6 @sm:p-8"
            style={{ background: C.white, border: `1px solid #C8DCC0` }}
          >
            <RSVPForm
              subEvents={subEvents}
              onSubmit={onRsvpSubmit}
              colors={{
                button: C.primary,
                buttonText: '#FFFFFF',
                label: C.text,
                checkboxAccent: C.primary,
                successText: C.text,
              }}
              inputStyle="bordered"
              successMessage="You're part of our garden! See you there."
            />
          </div>
        </div>
      </section>

      {/* ── 7. FOOTER ────────────────────────────────────────────────── */}
      <footer className="px-6 py-10 text-center" style={{ borderTop: `1px solid #C8DCC0` }}>
        <LeafDivider accent={C.accent} primary={C.primary} />
        <p style={{ ...fontDisplay, color: C.text }} className="text-xl italic mt-4">
          {name1} & {name2}
        </p>
        <p className="text-sm mt-1" style={{ color: C.muted }}>
          {new Date(eventDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
        <DawatBranding show={branding.showDawatBranding} colors={{ text: C.muted, border: '#C8DCC0' }} />
      </footer>

      <ShareBar colors={{ bar: C.bg, buttonText: C.text, button: C.primary, border: '#C8DCC0' }} floating />
    </div>
  )
}
