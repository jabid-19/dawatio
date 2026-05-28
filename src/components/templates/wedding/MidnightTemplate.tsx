'use client'

import { motion } from 'motion/react'
import { MapPin, ExternalLink, ChevronDown } from 'lucide-react'
import type { TemplateProps } from '@/lib/templates-data'
import CountdownTimer from '../shared/CountdownTimer'
import RSVPForm from '../shared/RSVPForm'
import Gallery from '../shared/Gallery'
import DawatBranding from '../shared/DawatBranding'
import ShareBar from '../shared/ShareBar'
import { viewport, staggerContainer, staggerItem } from '@/lib/motion'

const C_DEFAULT = {
  bgDark: '#0C0F1A',
  bgLight: '#F8F7F4',
  gold: '#C5AA6A',
  goldLight: '#E8D5A3',
  surface: '#1C2036',
  textDark: '#F0EDE6',
  textLight: '#1A1714',
  muted: '#8A8070',
}

const fontDisplay = { fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)' }
const fontBody = { fontFamily: 'var(--font-outfit, "Outfit", sans-serif)' }

function GoldDivider({ gold }: { gold: string }) {
  return (
    <div className="flex items-center justify-center gap-3 my-3">
      <div className="h-px flex-1" style={{ background: gold, opacity: 0.4 }} />
      <div className="w-1.5 h-1.5 rounded-full" style={{ background: gold }} />
      <div className="w-2 h-2 rotate-45" style={{ background: gold }} />
      <div className="w-1.5 h-1.5 rounded-full" style={{ background: gold }} />
      <div className="h-px flex-1" style={{ background: gold, opacity: 0.4 }} />
    </div>
  )
}

function StarField({ color }: { color: string }) {
  const stars = Array.from({ length: 20 }, (_, i) => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    delay: Math.random() * 4,
  }))
  return (
    <div className="absolute inset-0 pointer-events-none">
      <style>{`
        @keyframes midnight-twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
      `}</style>
      {stars.map((s, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            background: color,
            animation: `midnight-twinkle ${2 + Math.random() * 2}s ease-in-out ${s.delay}s infinite`,
          }}
        />
      ))}
    </div>
  )
}

export default function MidnightTemplate({ event, branding, onRsvpSubmit, colors }: TemplateProps) {
  const C = {
    bgDark:   colors?.bg       ?? C_DEFAULT.bgDark,
    surface:  colors?.surface  ?? C_DEFAULT.surface,
    gold:     colors?.primary  ?? C_DEFAULT.gold,
    goldLight: colors?.secondary ?? C_DEFAULT.goldLight,
    textDark: colors?.text     ?? C_DEFAULT.textDark,
    muted:    colors?.muted    ?? C_DEFAULT.muted,
    bgLight:  C_DEFAULT.bgLight,
    textLight: C_DEFAULT.textLight,
  }
  const { coupleNames, title, eventDate, subEvents, description, gallery } = event

  const name1 = coupleNames?.partner1 ?? title.split('&')[0]?.trim() ?? 'Partner 1'
  const name2 = coupleNames?.partner2 ?? title.split('&')[1]?.trim().split(' ')[0] ?? 'Partner 2'

  return (
    <div style={{ ...fontBody, color: C.textDark }} className="min-h-screen overflow-x-hidden">

      {/* ── 1. CINEMATIC HERO (dark) ──────────────────────────────────── */}
      <section
        className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20"
        style={{ background: C.bgDark }}
      >
        <StarField color={C.goldLight} />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="relative z-10 text-center max-w-2xl mx-auto"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xs uppercase tracking-[0.4em] mb-8"
            style={{ color: C.muted }}
          >
            Together with their families
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 1 }}
            style={{ ...fontDisplay, color: C.gold, letterSpacing: '0.1em' }}
            className="text-5xl sm:text-7xl md:text-8xl leading-tight"
          >
            {name1}
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="h-px my-4 mx-auto w-32"
            style={{ background: C.gold }}
          />

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 1 }}
            style={{ ...fontDisplay, color: C.gold, letterSpacing: '0.1em' }}
            className="text-5xl sm:text-7xl md:text-8xl leading-tight"
          >
            {name2}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="mt-8 text-sm uppercase tracking-widest"
            style={{ color: C.muted }}
          >
            {new Date(eventDate).toLocaleDateString('en-US', {
              weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
            })}
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="absolute bottom-8 flex flex-col items-center gap-1"
          style={{ color: C.muted }}
        >
          <p className="text-xs uppercase tracking-widest">Scroll to explore</p>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </motion.div>
      </section>

      {/* ── 2. DATE REVEAL (light) ────────────────────────────────────── */}
      <section className="px-6 py-20 text-center" style={{ background: C.bgLight }}>
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={viewport}
          variants={staggerContainer}
          style={{ color: C.textLight }}
        >
          <motion.p variants={staggerItem} className="text-xs uppercase tracking-[0.3em] mb-6" style={{ color: C.muted }}>
            Save the Date
          </motion.p>
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
            {[
              new Date(eventDate).toLocaleDateString('en-US', { day: 'numeric' }),
              new Date(eventDate).toLocaleDateString('en-US', { month: 'long' }),
              new Date(eventDate).toLocaleDateString('en-US', { year: 'numeric' }),
            ].map((part, i) => (
              <motion.span
                key={i}
                variants={staggerItem}
                style={{ ...fontDisplay, color: C.textLight }}
                className="text-4xl sm:text-5xl md:text-6xl"
              >
                {part}
                {i < 2 && <span className="mx-3 md:mx-5 opacity-30">·</span>}
              </motion.span>
            ))}
          </div>
          <GoldDivider gold={C.gold} />
        </motion.div>
      </section>

      {/* ── 3. COUNTDOWN (dark) ──────────────────────────────────────── */}
      <section className="px-4 py-16" style={{ background: C.bgDark }}>
        <div className="max-w-2xl mx-auto">
          <p className="text-center text-xs uppercase tracking-widest mb-8" style={{ color: C.muted }}>
            Counting the days
          </p>
          <CountdownTimer
            targetDate={eventDate}
            boxStyle="boxed"
            colors={{ box: C.surface, number: C.gold, label: C.muted, border: '#2A2F4A' }}
          />
        </div>
      </section>

      {/* ── 4. CEREMONIES GRID (light) ───────────────────────────────── */}
      {subEvents.length > 0 && (
        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={viewport}
          variants={staggerContainer}
          className="px-4 sm:px-8 py-20"
          style={{ background: C.bgLight, color: C.textLight }}
        >
          <div className="max-w-4xl mx-auto">
            <motion.div variants={staggerItem} className="text-center mb-12">
              <p className="text-xs uppercase tracking-[0.3em] mb-4" style={{ color: C.muted }}>Schedule</p>
              <GoldDivider gold={C.gold} />
              <h2 style={{ ...fontDisplay, color: C.textLight }} className="text-3xl sm:text-4xl mt-4">
                The Celebrations
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {subEvents.map((se) => (
                <motion.div
                  key={se.id}
                  variants={staggerItem}
                  className="rounded-2xl p-6"
                  style={{
                    background: '#FFFFFF',
                    borderTop: `3px solid ${C.gold}`,
                    boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
                  }}
                >
                  <h3 style={{ ...fontDisplay, color: C.textLight }} className="text-2xl mb-3">{se.name}</h3>
                  <p className="text-sm" style={{ ...fontBody, color: C.muted }}>{se.date}</p>
                  <p className="text-sm" style={{ ...fontBody, color: C.muted }}>{se.time}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <MapPin className="w-3.5 h-3.5 flex-shrink-0" style={{ color: C.gold }} />
                    <p className="text-sm" style={{ ...fontBody, color: C.muted }}>{se.venue}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      )}

      {/* ── 5. FULL-BLEED QUOTE (dark) ───────────────────────────────── */}
      <section
        className="relative px-6 py-24 text-center overflow-hidden"
        style={{ background: C.bgDark }}
      >
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle at center, #C5AA6A 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
        <blockquote className="relative max-w-2xl mx-auto">
          <p style={{ ...fontDisplay, color: C.goldLight }} className="text-2xl sm:text-3xl md:text-4xl italic leading-relaxed">
            &ldquo;{description || 'In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine.'}&rdquo;
          </p>
        </blockquote>
      </section>

      {/* ── 6. GALLERY MOSAIC (dark) ─────────────────────────────────── */}
      <section className="px-4 sm:px-8 py-20" style={{ background: C.bgDark }}>
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            className="text-center mb-10"
          >
            <p className="text-xs uppercase tracking-[0.3em] mb-4" style={{ color: C.muted }}>Gallery</p>
            <GoldDivider gold={C.gold} />
            <h2 style={{ ...fontDisplay, color: C.gold }} className="text-3xl sm:text-4xl mt-4">
              Our Moments
            </h2>
          </motion.div>
          <Gallery
            images={gallery}
            variant="grid"
            columns={3}
            colors={{ border: C.gold, overlay: 'rgba(197, 170, 106, 0.2)' }}
          />
        </div>
      </section>

      {/* ── 7. RSVP (light) ──────────────────────────────────────────── */}
      <section className="px-4 sm:px-8 py-20" style={{ background: C.bgLight }}>
        <div className="max-w-lg mx-auto" style={{ color: C.textLight }}>
          <div className="text-center mb-8">
            <p className="text-xs uppercase tracking-[0.3em] mb-4" style={{ color: C.muted }}>RSVP</p>
            <GoldDivider gold={C.gold} />
            <h2 style={{ ...fontDisplay, color: C.textLight }} className="text-3xl sm:text-4xl mt-4">
              Kindly Respond
            </h2>
          </div>

          <div
            className="rounded-3xl p-6 sm:p-8"
            style={{
              background: '#FFFFFF',
              border: `1px solid ${C.gold}`,
              boxShadow: '0 2px 24px rgba(197, 170, 106, 0.1)',
            }}
          >
            <RSVPForm
              subEvents={subEvents}
              onSubmit={onRsvpSubmit}
              colors={{
                button: C.gold,
                buttonText: C.textLight,
                label: C.textLight,
                checkboxAccent: C.gold,
                successText: C.textLight,
              }}
              inputStyle="bordered"
              successMessage="We look forward to celebrating with you."
            />
          </div>
        </div>
      </section>

      {/* ── 8. FOOTER (dark) ─────────────────────────────────────────── */}
      <footer className="px-6 py-12 text-center" style={{ background: C.bgDark }}>
        <GoldDivider gold={C.gold} />
        <div
          className="mt-6 w-16 h-16 rounded-full border flex items-center justify-center mx-auto"
          style={{ borderColor: C.gold }}
        >
          <span style={{ ...fontDisplay, color: C.gold }} className="text-xl">
            {name1[0]}{name2[0]}
          </span>
        </div>
        <p style={{ ...fontDisplay, color: C.goldLight }} className="text-xl mt-4">
          {name1} & {name2}
        </p>
        <p className="text-sm mt-2" style={{ color: C.muted }}>
          {new Date(eventDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
        <DawatBranding show={branding.showDawatBranding} colors={{ text: C.muted, border: '#2A2F4A' }} />
      </footer>

      <ShareBar
        colors={{ bar: C.surface, buttonText: C.goldLight, button: C.gold, border: '#2A2F4A' }}
        floating
      />
    </div>
  )
}
