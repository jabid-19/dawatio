'use client'

import { motion } from 'motion/react'
import type { TemplateProps } from '@/lib/templates-data'
import CountdownTimer from '../shared/CountdownTimer'
import RSVPForm from '../shared/RSVPForm'
import Gallery from '../shared/Gallery'
import CoverPhoto from '../shared/CoverPhoto'
import DawatBranding from '../shared/DawatBranding'
import ShareBar from '../shared/ShareBar'
import { viewport, staggerContainer, staggerItem } from '@/lib/motion'
import { resolveColors } from '@/lib/template-colors'
import { PLACEHOLDER_IMAGES } from '@/lib/placeholder-images'

const BOLD_LOUD_DEFAULTS = {
  bg: '#FFFFFF',
  primary: '#FF6B2B',
  secondary: '#FF2D6B',
  surface: '#FFFFFF',
  text: '#111111',
  muted: '#999999',
  // template-specific extras
  lime: '#AAFF00',
  white: '#FFFFFF',
} as const

const fontDisplay = { fontFamily: 'var(--font-rubik, "Rubik", sans-serif)' }

const AGE = 25

export default function BoldLoudTemplate({ event, branding, onRsvpSubmit, colors, disableEffects }: TemplateProps) {
  const raw = resolveColors(colors, BOLD_LOUD_DEFAULTS)
  const C = {
    bg: raw.bg,
    orange: raw.primary,
    pink: raw.secondary,
    lime: raw.lime,
    black: raw.text,
    text: raw.text,
    white: raw.white,
  }

  const WORD_COLORS = [C.orange, C.pink, C.lime, C.orange]

  const { personName, title, eventDate, subEvents, gallery, coverImage, sections } = event
  const placeholders = PLACEHOLDER_IMAGES.birthday
  const name = personName ?? title.split("'s")[0] ?? 'THE STAR'
  const nameParts = name.toUpperCase().split(' ')

  return (
    <div style={{ background: C.bg, color: C.text, ...fontDisplay }} className="@container min-h-screen overflow-x-hidden">
      {!disableEffects && (
        <style>{`
          @keyframes bold-shake {
            0%, 100% { transform: translateX(0); }
            10% { transform: translateX(-4px) rotate(-1deg); }
            20% { transform: translateX(4px) rotate(1deg); }
            30% { transform: translateX(-2px); }
            40% { transform: translateX(2px); }
            50% { transform: translateX(0); }
          }
          @keyframes marquee-scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      )}

      {/* ── 1. BOLD HERO ─────────────────────────────────────────────── */}
      <section className="min-h-screen flex flex-col items-start justify-center px-4 @sm:px-8 py-20 overflow-hidden relative">
        {/* Color blocks background */}
        <div className="absolute top-0 right-0 w-1/3 h-1/3" style={{ background: C.orange, opacity: 0.15 }} />
        <div className="absolute bottom-0 left-0 w-1/4 h-1/4" style={{ background: C.lime, opacity: 0.2 }} />
        <div className="absolute top-1/2 right-1/4 w-1/5 h-1/5" style={{ background: C.pink, opacity: 0.1 }} />

        <div className="relative z-10 max-w-4xl">
          {nameParts.map((part, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -100 : 100, y: i % 3 === 0 ? -50 : 0 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: i * 0.15, type: 'spring', stiffness: 300, damping: 20 }}
            >
              <h1
                className="leading-none font-black"
                style={{ fontSize: 'clamp(36px, 12cqw, 120px)', color: WORD_COLORS[i % WORD_COLORS.length] }}
              >
                {part}
              </h1>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, type: 'spring', stiffness: 300 }}
            className="mt-4"
          >
            <p className="font-black" style={{ fontSize: 'clamp(32px, 6cqw, 64px)', color: C.black }}>
              IS TURNING
            </p>
            <p
              className="font-black"
              style={{ fontSize: 'clamp(48px, 18cqw, 160px)', color: C.lime, lineHeight: 1 }}
            >
              {AGE}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── 2. MARQUEE STRIP ─────────────────────────────────────────── */}
      <div className="overflow-hidden py-4" style={{ background: C.lime }}>
        <div
          style={{
            animation: disableEffects ? undefined : 'marquee-scroll 10s linear infinite',
            display: 'flex',
            width: 'max-content',
          }}
        >
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} className="font-black text-lg px-4 shrink-0 whitespace-nowrap" style={{ color: C.black }}>
              🎈 PARTY TIME · 🎂 {AGE} YEARS · 🎁 SURPRISES AHEAD · ⚡ LET&apos;S GO ·&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* ── 3. COUNTDOWN (oversized) ─────────────────────────────────── */}
      {sections.countdown !== false && (
        <section className="px-4 @sm:px-8 py-20">
          <div className="max-w-4xl mx-auto grid grid-cols-2 @sm:grid-cols-4 gap-6">
            {['DAYS', 'HRS', 'MIN', 'SEC'].map((label, i) => {
              const countdownColors = [C.orange, C.pink, C.lime, C.black]
              return (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={viewport}
                  transition={{ delay: i * 0.1, type: 'spring', stiffness: 400, damping: 15 }}
                  className="text-center"
                >
                  <p
                    className="font-black leading-none"
                    style={{ fontSize: 'clamp(48px, 10cqw, 100px)', color: countdownColors[i], WebkitTextStroke: i === 3 ? `3px ${C.lime}` : 'none' }}
                  >
                    --
                  </p>
                  <p className="font-black text-sm uppercase tracking-widest mt-2" style={{ color: countdownColors[i] }}>
                    {label}
                  </p>
                </motion.div>
              )
            })}
          </div>
          <p className="text-center text-xs uppercase tracking-widest mt-4" style={{ color: '#999' }}>
            live countdown on page load
          </p>
        </section>
      )}

      {/* ── 4. TILTED DETAILS ────────────────────────────────────────── */}
      {subEvents.length > 0 && (
        <section className="px-4 @sm:px-8 py-16 relative overflow-hidden">
          <div className="max-w-3xl mx-auto flex flex-col @sm:flex-row gap-4 items-start">
            {[
              { label: 'DATE', value: subEvents[0].date, bg: C.orange },
              { label: 'TIME', value: subEvents[0].time, bg: C.pink },
              { label: 'VENUE', value: subEvents[0].venue, bg: C.lime },
            ].map((card, i) => (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, rotate: -10 }}
                whileInView={{ opacity: 1, rotate: [-2, 2, 0][i] }}
                viewport={viewport}
                transition={{ delay: i * 0.1, type: 'spring' }}
                className="flex-1 rounded-2xl p-6 border-4"
                style={{
                  background: card.bg + (i === 2 ? '' : '20'),
                  borderColor: card.bg,
                  color: i === 2 ? C.black : C.text,
                }}
              >
                <p className="font-black text-xs uppercase tracking-widest opacity-60">{card.label}</p>
                <p className="font-bold text-base mt-1">{card.value}</p>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* ── 5. GALLERY ───────────────────────────────────────────────── */}
      {sections.gallery !== false && (
        <section className="px-4 @sm:px-8 py-16">
          <h2 className="font-black text-center mb-8" style={{ fontSize: 'clamp(32px, 6cqw, 60px)', color: C.pink }}>
            GALLERY
          </h2>
          <div className="max-w-xs mx-auto mb-10">
            <CoverPhoto src={coverImage} fallback={placeholders.cover} alt={title} shape="portrait" />
          </div>
          <div className="max-w-4xl mx-auto">
            <Gallery images={gallery} fallbackImages={placeholders.gallery} variant="grid" columns={3}
              colors={{ border: C.orange, overlay: 'rgba(255,107,43,0.3)' }} />
          </div>
        </section>
      )}

      {/* ── 6. RSVP ──────────────────────────────────────────────────── */}
      {sections.rsvp !== false && (
        <section className="px-4 @sm:px-8 py-20" style={{ background: '#F5F5F5' }}>
          <div className="max-w-lg mx-auto">
            <h2 className="font-black mb-10" style={{ fontSize: 'clamp(48px, 10cqw, 80px)', color: C.black }}>
              YOU IN?
            </h2>
            <div className="border-4 border-black rounded-2xl p-6 @sm:p-8" style={{ background: C.white }}>
              <RSVPForm
                subEvents={subEvents}
                onSubmit={onRsvpSubmit}
                colors={{ button: C.black, buttonText: C.lime, label: C.text, checkboxAccent: C.orange }}
                inputStyle="bordered"
                successMessage="LET'S GOOO! 🚀"
              />
            </div>
          </div>
        </section>
      )}

      {/* ── 7. FOOTER ────────────────────────────────────────────────── */}
      <footer className="px-4 py-8 text-center" style={{ borderTop: `6px solid ${C.lime}` }}>
        <p className="font-black uppercase tracking-widest" style={{ color: C.black }}>
          {name} · {new Date(eventDate).getFullYear()}
        </p>
        <DawatBranding show={branding.showDawatBranding} colors={{ text: '#999' }} />
      </footer>

      <ShareBar colors={{ bar: C.black, buttonText: C.lime, button: C.lime, border: '#333' }} floating />
    </div>
  )
}
