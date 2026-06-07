'use client'

import { motion } from 'motion/react'
import { MapPin, Users, Calendar, Clock } from 'lucide-react'
import type { TemplateProps } from '@/lib/templates-data'
import CountdownTimer from '../shared/CountdownTimer'
import RSVPForm from '../shared/RSVPForm'
import CoverPhoto from '../shared/CoverPhoto'
import DawatBranding from '../shared/DawatBranding'
import ShareBar from '../shared/ShareBar'
import { viewport, staggerContainer, staggerItem } from '@/lib/motion'
import { resolveColors } from '@/lib/template-colors'
import { PLACEHOLDER_IMAGES } from '@/lib/placeholder-images'

const SUMMIT_DEFAULTS = {
  bg: '#FAFAFA',
  surface: '#0D0D0D',
  primary: '#3B82F6',
  secondary: '#00C2FF',
  text: '#0D0D0D',
  muted: '#6B7280',
  border: '#E5E7EB',
  card: '#FFFFFF',
}

const fontDisplay = { fontFamily: 'var(--font-syne, "Syne", sans-serif)' }
const fontBody = { fontFamily: 'var(--font-inter, "Inter", sans-serif)' }

const STATS = [
  { label: 'Attendees', value: '500+' },
  { label: 'Speakers', value: '12' },
  { label: 'Sessions', value: '8' },
  { label: 'Days', value: '2' },
]

const SPEAKERS = [
  { name: 'Sarah Chen', title: 'CEO, FutureTech', topic: 'AI & Society' },
  { name: 'Marcus Johnson', title: 'CTO, CloudBridge', topic: 'Infrastructure Scale' },
  { name: 'Dr. Amina Patel', title: 'Researcher, MIT', topic: 'Next-Gen Computing' },
  { name: 'Carlos Rivera', title: 'Founder, StartupX', topic: 'Building in Public' },
]

const SPONSORS = Array.from({ length: 6 }, (_, i) => `Sponsor ${i + 1}`)

export default function SummitTemplate({ event, branding, onRsvpSubmit, colors, disableEffects: _disableEffects }: TemplateProps) {
  const raw = resolveColors(colors, SUMMIT_DEFAULTS)
  const C = {
    bg: raw.bg,
    dark: raw.surface,
    blue: raw.primary,
    electric: raw.secondary,
    text: raw.text,
    textLight: '#FAFAFA',
    muted: raw.muted,
    border: raw.border,
    card: raw.card,
  }

  const { title, eventDate, subEvents, description, coverImage, sections } = event
  const placeholders = PLACEHOLDER_IMAGES.corporate
  const firstSub = subEvents[0]

  return (
    <div style={{ background: C.bg, color: C.text, ...fontBody }} className="@container min-h-screen overflow-x-hidden">

      {/* ── 1. SUMMIT HERO (dark) ─────────────────────────────────────── */}
      <section className="relative min-h-[85vh] flex flex-col items-start justify-end px-6 @sm:px-12 @md:px-16 pb-16 overflow-hidden"
        style={{ background: C.dark }}>
        {/* Geometric background */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{ backgroundImage: 'linear-gradient(45deg, #fff 1px, transparent 1px), linear-gradient(-45deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        {/* Black bars reveal animation */}
        <motion.div className="absolute inset-x-0 top-0 z-20 origin-top" style={{ background: C.dark, height: '50%' }}
          initial={{ scaleY: 1 }} animate={{ scaleY: 0 }} transition={{ duration: 0.8, delay: 0.2 }} />
        <motion.div className="absolute inset-x-0 bottom-0 z-20 origin-bottom" style={{ background: C.dark, height: '50%' }}
          initial={{ scaleY: 1 }} animate={{ scaleY: 0 }} transition={{ duration: 0.8, delay: 0.2 }} />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="relative z-10 max-w-3xl"
          style={{ color: C.textLight }}
        >
          <p className="text-xs uppercase tracking-[0.4em] mb-4" style={{ color: C.electric }}>
            {firstSub?.date}
          </p>
          <h1 style={{ ...fontDisplay }} className="text-4xl @sm:text-5xl @md:text-6xl @lg:text-7xl font-black leading-none mb-6">
            {title}
          </h1>
          <p className="text-base max-w-xl" style={{ color: '#9CA3AF' }}>
            {description || 'The premier conference for industry leaders and innovators.'}
          </p>
          <motion.a
            href="#rsvp"
            whileHover={{ scale: 1.05 }}
            className="inline-block mt-8 px-8 py-3 rounded-full font-semibold text-sm"
            style={{ background: C.electric, color: C.dark }}
          >
            Register Now →
          </motion.a>
        </motion.div>
      </section>

      {/* ── 2. STATS BAR ─────────────────────────────────────────────── */}
      <div className="px-6 py-6" style={{ background: C.blue }}>
        <div className="max-w-4xl mx-auto grid grid-cols-2 @sm:grid-cols-4 gap-4">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={viewport}
                className="text-2xl font-black"
                style={{ color: C.textLight, ...fontDisplay }}
              >
                {s.value}
              </motion.p>
              <p className="text-xs uppercase tracking-wide" style={{ color: '#BFDBFE' }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── 3. COUNTDOWN ─────────────────────────────────────────────── */}
      {sections.countdown !== false && (
        <section className="px-4 py-12" style={{ background: C.dark }}>
          <p className="text-center text-xs uppercase tracking-widest mb-6" style={{ color: C.muted }}>
            Event starts in
          </p>
          <div className="max-w-2xl mx-auto">
            <CountdownTimer
              targetDate={eventDate}
              boxStyle="boxed"
              colors={{ box: '#1F1F1F', number: C.electric, label: C.muted, border: '#2A2A2A' }}
            />
          </div>
        </section>
      )}

      {/* ── 4. SPEAKERS ──────────────────────────────────────────────── */}
      <section className="px-4 @sm:px-8 @md:px-16 py-20">
        <div className="max-w-4xl mx-auto">
          <h2 style={{ ...fontDisplay }} className="text-3xl font-black mb-12">Featured Speakers</h2>
          <div className="grid grid-cols-1 @sm:grid-cols-2 gap-6">
            {SPEAKERS.map((sp) => (
              <motion.div
                key={sp.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={viewport}
                className="rounded-2xl p-6 flex gap-4"
                style={{ background: C.card, border: `1px solid ${C.border}` }}
              >
                <div
                  className="w-14 h-14 rounded-full shrink-0 flex items-center justify-center font-bold"
                  style={{ background: C.dark, color: C.electric }}
                >
                  {sp.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div>
                  <p className="font-bold">{sp.name}</p>
                  <p className="text-sm" style={{ color: C.blue }}>{sp.title}</p>
                  <p className="text-xs mt-1" style={{ color: C.muted }}>{sp.topic}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── cover photo ──────────────────────────────────────────────── */}
      <section className="px-4 @sm:px-8 @md:px-16 py-8 max-w-4xl mx-auto">
        <CoverPhoto src={coverImage} fallback={placeholders.cover} alt={title} shape="landscape" />
      </section>

      {/* ── 5. SCHEDULE ──────────────────────────────────────────────── */}
      {sections.schedule !== false && subEvents.length > 0 && (
        <section className="px-4 @sm:px-8 @md:px-16 py-16" style={{ background: C.bg }}>
          <div className="max-w-4xl mx-auto">
            <h2 style={{ ...fontDisplay }} className="text-3xl font-black mb-8">Schedule</h2>
            <div className="flex flex-col gap-2">
              {subEvents.map((se) => (
                <div
                  key={se.id}
                  className="flex gap-4 @sm:gap-8 items-start py-4 px-6 rounded-xl"
                  style={{ borderLeft: `4px solid ${C.blue}`, background: C.card }}
                >
                  <p className="text-sm font-semibold w-20 shrink-0" style={{ color: C.blue }}>{se.time}</p>
                  <div className="flex-1">
                    <p className="font-semibold">{se.name}</p>
                    <p className="text-sm" style={{ color: C.muted }}>{se.venue}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 6. SPONSORS ──────────────────────────────────────────────── */}
      <section className="px-4 @sm:px-8 @md:px-16 py-12" style={{ background: '#F3F4F6' }}>
        <div className="max-w-4xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-center mb-8" style={{ color: C.muted }}>
            Sponsored By
          </p>
          <div className="grid grid-cols-3 @sm:grid-cols-6 gap-4">
            {SPONSORS.map((s) => (
              <div
                key={s}
                className="rounded-xl h-12 flex items-center justify-center text-xs font-medium"
                style={{ background: C.border, color: C.muted }}
              >
                {s}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. RSVP (dark) ───────────────────────────────────────────── */}
      {sections.rsvp !== false && (
        <section id="rsvp" className="px-4 @sm:px-8 @md:px-16 py-20" style={{ background: C.dark }}>
          <div className="max-w-lg mx-auto">
            <h2 style={{ ...fontDisplay, color: C.textLight }} className="text-3xl font-black mb-8">
              Get Your Pass
            </h2>
            <div
              className="rounded-2xl p-6 @sm:p-8"
              style={{ background: C.card }}
            >
              <RSVPForm
                subEvents={subEvents}
                onSubmit={onRsvpSubmit}
                colors={{ button: C.electric, buttonText: C.dark, label: C.text, checkboxAccent: C.electric }}
                inputStyle="bordered"
                successMessage="You're confirmed! See you at the summit."
              />
            </div>
          </div>
        </section>
      )}

      {/* ── 8. FOOTER ────────────────────────────────────────────────── */}
      <footer className="px-4 py-8 text-center" style={{ background: C.dark, borderTop: '1px solid #1F1F1F' }}>
        <p style={{ ...fontDisplay, color: C.textLight }} className="font-black">{title}</p>
        <p className="text-sm mt-1" style={{ color: C.muted }}>
          {firstSub?.date} · {firstSub?.venue}
        </p>
        <DawatBranding show={branding.showDawatBranding} colors={{ text: C.muted }} />
      </footer>

      <ShareBar colors={{ bar: '#1F1F1F', buttonText: C.textLight, button: C.electric, border: '#333' }} floating />
    </div>
  )
}
