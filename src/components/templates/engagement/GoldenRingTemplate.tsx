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

const GOLDENRING_DEFAULTS = {
  bg: '#FDFBF5',
  primary: '#C9A84C',
  surface: '#F2E6C9',
  secondary: '#B8960C',
  text: '#2C2010',
  muted: '#8A7A60',
  card: '#FFFFFF',
  border: '#EDE0C4',
}

const fontDisplay = { fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)' }
const fontBody = { fontFamily: 'var(--font-lato, "Lato", sans-serif)' }

function AnimatedRing({ gold, goldDark, disableEffects }: { gold: string; goldDark: string; disableEffects?: boolean }) {
  return (
    <div className="flex items-center justify-center my-6">
      <motion.div
        animate={disableEffects ? undefined : { rotateY: [0, 360] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        style={{ perspective: 200 }}
      >
        <svg viewBox="0 0 100 100" className="w-24 h-24">
          <circle cx="50" cy="50" r="35" fill="none" stroke={gold} strokeWidth="8" opacity="0.3" />
          <motion.circle
            cx="50" cy="50" r="35"
            fill="none" stroke={gold} strokeWidth="8"
            strokeDasharray="220"
            initial={{ strokeDashoffset: 220 }}
            animate={disableEffects ? { strokeDashoffset: 0 } : { strokeDashoffset: 0 }}
            transition={{ duration: disableEffects ? 0 : 2, ease: 'easeOut' }}
          />
          {/* Diamond */}
          <polygon points="50,25 56,38 50,44 44,38" fill={gold} />
          <polygon points="50,44 56,38 50,50 44,38" fill={goldDark} opacity="0.6" />
        </svg>
      </motion.div>
    </div>
  )
}

function GoldShimmer({ gold }: { gold: string }) {
  return (
    <div className="flex items-center justify-center gap-3 my-2">
      <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, transparent, ${gold}, transparent)` }} />
      <div className="w-2 h-2 rotate-45" style={{ background: gold }} />
      <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, transparent, ${gold}, transparent)` }} />
    </div>
  )
}

export default function GoldenRingTemplate({ event, branding, onRsvpSubmit, colors, disableEffects }: TemplateProps) {
  const raw = resolveColors(colors, GOLDENRING_DEFAULTS)
  const C = {
    bg: raw.bg,
    gold: raw.primary,
    goldLight: raw.surface,
    goldDark: raw.secondary,
    text: raw.text,
    muted: raw.muted,
    card: raw.card,
    border: raw.border,
  }

  const { coupleNames, title, eventDate, subEvents, description, gallery, coverImage, sections } = event
  const placeholders = PLACEHOLDER_IMAGES.engagement
  const name1 = coupleNames?.partner1 ?? title.split('&')[0]?.trim() ?? 'Partner 1'
  const name2 = coupleNames?.partner2 ?? title.split('&')[1]?.trim().split(' ')[0] ?? 'Partner 2'

  return (
    <div style={{ background: C.bg, color: C.text, ...fontBody }} className="@container min-h-screen overflow-x-hidden">

      {/* ── 1. HERO ──────────────────────────────────────────────────── */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          <p className="text-xs uppercase tracking-[0.4em] mb-4" style={{ color: C.muted }}>With great joy</p>
          <GoldShimmer gold={C.gold} />
          <AnimatedRing gold={C.gold} goldDark={C.goldDark} disableEffects={disableEffects} />
          <GoldShimmer gold={C.gold} />
          <h1 style={{ ...fontDisplay, color: C.text }} className="text-5xl @sm:text-7xl mt-4 leading-tight">
            {name1}
          </h1>
          <p style={{ ...fontDisplay, color: C.gold }} className="text-4xl italic my-2">&</p>
          <h1 style={{ ...fontDisplay, color: C.text }} className="text-5xl @sm:text-7xl leading-tight">
            {name2}
          </h1>
          <p style={{ ...fontDisplay, color: C.muted }} className="text-lg italic mt-4">
            are engaged!
          </p>
          <p className="mt-4 text-sm uppercase tracking-widest" style={{ color: C.muted }}>
            {new Date(eventDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </motion.div>
      </section>

      {/* ── 2. COUNTDOWN ─────────────────────────────────────────────── */}
      {sections.countdown !== false && (
        <section className="px-4 py-12" style={{ background: C.goldLight }}>
          <div className="max-w-2xl mx-auto">
            <CountdownTimer targetDate={eventDate} boxStyle="boxed"
              colors={{ box: C.card, number: C.gold, label: C.muted, border: C.border }} />
          </div>
        </section>
      )}

      {/* ── 3. STORY ─────────────────────────────────────────────────── */}
      {sections.about !== false && (
        <section className="px-6 @sm:px-8 py-20 max-w-2xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewport}>
            <GoldShimmer gold={C.gold} />
            <h2 style={{ ...fontDisplay, color: C.text }} className="text-3xl @sm:text-4xl mt-4 mb-6">Our Golden Moment</h2>
            <p className="text-base leading-relaxed" style={{ color: C.muted }}>
              {description || 'Two hearts, one beautiful promise. We are overjoyed to share this milestone and invite you to celebrate our engagement with us.'}
            </p>
          </motion.div>
        </section>
      )}

      {/* ── 4. EVENTS ────────────────────────────────────────────────── */}
      {sections.schedule !== false && subEvents.length > 0 && (
        <motion.section
          initial="initial" whileInView="animate" viewport={viewport} variants={staggerContainer}
          className="px-4 @sm:px-8 py-16" style={{ background: C.goldLight }}
        >
          <div className="max-w-3xl mx-auto">
            <GoldShimmer gold={C.gold} />
            <h2 style={{ ...fontDisplay, color: C.text }} className="text-3xl text-center mt-4 mb-8">Celebrate With Us</h2>
            <div className="grid grid-cols-1 @sm:grid-cols-2 gap-4">
              {subEvents.map((se) => (
                <motion.div key={se.id} variants={staggerItem}
                  className="rounded-2xl p-5" style={{ background: C.card, border: `1px solid ${C.border}` }}>
                  <p style={{ ...fontDisplay, color: C.gold }} className="text-xl mb-2">{se.name}</p>
                  <p className="text-sm" style={{ color: C.muted }}>{se.date} · {se.time}</p>
                  <p className="text-sm mt-1" style={{ color: C.muted }}>{se.venue}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      )}

      {/* ── 5. GALLERY ───────────────────────────────────────────────── */}
      {sections.gallery !== false && (
        <section className="px-4 @sm:px-8 py-16 max-w-4xl mx-auto">
          <GoldShimmer gold={C.gold} />
          <div className="w-48 mx-auto mb-10">
            <CoverPhoto src={coverImage} fallback={placeholders.cover} alt={title} shape="circle" />
          </div>
          <Gallery images={gallery} fallbackImages={placeholders.gallery} variant="grid" columns={3} colors={{ border: C.gold }} />
        </section>
      )}

      {/* ── 6. RSVP ──────────────────────────────────────────────────── */}
      {sections.rsvp !== false && (
        <section className="px-4 @sm:px-8 py-16" style={{ background: C.goldLight }}>
          <div className="max-w-lg mx-auto">
            <GoldShimmer gold={C.gold} />
            <h2 style={{ ...fontDisplay, color: C.text }} className="text-3xl text-center mt-4 mb-8">Join Our Celebration</h2>
            <div className="rounded-3xl p-6 @sm:p-8" style={{ background: C.card, border: `1px solid ${C.border}` }}>
              <RSVPForm subEvents={subEvents} onSubmit={onRsvpSubmit}
                colors={{ button: C.gold, buttonText: '#FFFFFF', label: C.text, checkboxAccent: C.gold }}
                successMessage="We're so glad you'll be there! 💍" />
            </div>
          </div>
        </section>
      )}

      {/* ── 7. FOOTER ────────────────────────────────────────────────── */}
      <footer className="px-4 py-10 text-center" style={{ borderTop: `1px solid ${C.border}` }}>
        <GoldShimmer gold={C.gold} />
        <p style={{ ...fontDisplay, color: C.text }} className="text-2xl mt-4">{name1} & {name2}</p>
        <DawatBranding show={branding.showDawatBranding} colors={{ text: C.muted }} />
      </footer>

      <ShareBar colors={{ bar: C.card, buttonText: C.text, button: C.gold, border: C.border }} floating />
    </div>
  )
}
