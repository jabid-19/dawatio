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

const fontDisplay = { fontFamily: 'var(--font-libre-baskerville, "Libre Baskerville", serif)' }
const fontBody = { fontFamily: 'var(--font-source-sans, "Source Sans 3", sans-serif)' }

const CHAPTERS = [
  { num: '01', title: 'The Beginning', icon: '✦' },
  { num: '02', title: 'We Fell', icon: '♡' },
  { num: '03', title: 'The Question', icon: '◇' },
  { num: '04', title: 'Forever Starts', icon: '∞' },
]

export default function StoryTemplate({ event, branding, onRsvpSubmit, colors }: TemplateProps) {
  const C = {
    bg: colors?.bg ?? '#FAF5EE',
    primary: colors?.primary ?? '#7B5C3A',
    secondary: colors?.secondary ?? '#C9A875',
    text: colors?.text ?? '#3A2E22',
    muted: colors?.muted ?? '#8A7A65',
    card: '#FFFFFF',
    border: '#E8DDD0',
    sepia: colors?.surface ?? '#F2EAE0',
  }

  const { coupleNames, title, eventDate, subEvents, description, gallery } = event
  const name1 = coupleNames?.partner1 ?? title.split('&')[0]?.trim() ?? 'Partner 1'
  const name2 = coupleNames?.partner2 ?? title.split('&')[1]?.trim().split(' ')[0] ?? 'Partner 2'

  return (
    <div style={{ background: C.bg, color: C.text, ...fontBody }} className="min-h-screen overflow-x-hidden">

      {/* ── 1. FULL-BLEED HERO ───────────────────────────────────────── */}
      <section
        className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 text-center"
        style={{ background: `linear-gradient(160deg, ${C.sepia} 0%, ${C.bg} 60%, ${C.border} 100%)` }}
      >
        {/* Decorative quotation mark */}
        <div
          className="absolute top-12 left-1/2 -translate-x-1/2 text-9xl opacity-5 pointer-events-none select-none"
          style={{ ...fontDisplay, color: C.primary, lineHeight: 1 }}
        >
          "
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 max-w-xl"
        >
          <p className="text-xs uppercase tracking-[0.4em] mb-6" style={{ color: C.muted }}>
            A love story
          </p>

          {/* Thin rule */}
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px flex-1" style={{ background: C.secondary }} />
            <span style={{ color: C.secondary }}>✦</span>
            <div className="h-px flex-1" style={{ background: C.secondary }} />
          </div>

          <h1 style={{ ...fontDisplay, color: C.text }} className="text-5xl sm:text-7xl leading-tight mb-4">
            {name1}
          </h1>
          <p style={{ ...fontDisplay, color: C.secondary }} className="text-4xl italic mb-4">&</p>
          <h1 style={{ ...fontDisplay, color: C.text }} className="text-5xl sm:text-7xl leading-tight">
            {name2}
          </h1>

          <div className="flex items-center gap-4 mt-8 mb-6">
            <div className="h-px flex-1" style={{ background: C.secondary }} />
            <span style={{ color: C.secondary }}>✦</span>
            <div className="h-px flex-1" style={{ background: C.secondary }} />
          </div>

          <p style={{ ...fontDisplay, color: C.muted }} className="text-lg italic">
            are engaged!
          </p>
          <p className="text-sm mt-4 uppercase tracking-widest" style={{ color: C.muted }}>
            {new Date(eventDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </motion.div>
      </section>

      {/* ── 2. CHAPTER MARKERS ──────────────────────────────────────────── */}
      <section className="px-4 py-12" style={{ background: C.primary }}>
        <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4">
          {CHAPTERS.map((ch, i) => (
            <motion.div
              key={ch.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ delay: i * 0.1 }}
              className="text-center py-4"
            >
              <p style={{ color: C.secondary }} className="text-2xl mb-1">{ch.icon}</p>
              <p className="text-xs uppercase tracking-widest mb-1" style={{ color: C.secondary + 'AA' }}>
                Chapter {ch.num}
              </p>
              <p style={{ ...fontDisplay, color: '#FFFFFF' }} className="text-sm">{ch.title}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── 3. COUNTDOWN ─────────────────────────────────────────────── */}
      <section className="px-4 py-12" style={{ background: C.sepia }}>
        <div className="max-w-2xl mx-auto">
          <p className="text-center text-xs uppercase tracking-widest mb-6" style={{ color: C.muted }}>Counting down</p>
          <CountdownTimer targetDate={eventDate} boxStyle="boxed"
            colors={{ box: C.card, number: C.primary, label: C.muted, border: C.border }} />
        </div>
      </section>

      {/* ── 4. OUR STORY ────────────────────────────────────────────────── */}
      <section className="px-6 sm:px-12 py-24 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
        >
          <p className="text-xs uppercase tracking-[0.4em] mb-3" style={{ color: C.muted }}>Our Love Story</p>
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px flex-1" style={{ background: C.border }} />
            <span style={{ color: C.secondary }}>✦</span>
            <div className="h-px flex-1" style={{ background: C.border }} />
          </div>
          <h2 style={{ ...fontDisplay, color: C.text }} className="text-3xl sm:text-4xl mb-8 leading-snug">
            "Every great love story begins with a chance encounter..."
          </h2>
          <p className="text-base leading-loose" style={{ color: C.muted }}>
            {description || 'From the moment we met, we knew something extraordinary was unfolding. Every shared laugh, every quiet evening, every adventure has led us to this — a promise to walk together through every chapter that follows. We are overjoyed to share this beautiful milestone with the people who have shaped our story.'}
          </p>
        </motion.div>
      </section>

      {/* ── 5. PHOTO GALLERY ─────────────────────────────────────────────── */}
      <section className="py-16" style={{ background: C.sepia }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-8">
          <div className="text-center mb-8">
            <p className="text-xs uppercase tracking-widest" style={{ color: C.muted }}>Our Moments</p>
          </div>
          <Gallery images={gallery} variant="masonry" columns={3}
            colors={{ overlay: `${C.primary}33`, border: C.border }} />
        </div>
      </section>

      {/* ── 6. EVENTS ────────────────────────────────────────────────── */}
      {subEvents.length > 0 && (
        <motion.section
          initial="initial" whileInView="animate" viewport={viewport} variants={staggerContainer}
          className="px-4 sm:px-8 py-16 max-w-3xl mx-auto"
        >
          <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-widest mb-2" style={{ color: C.muted }}>Join Our Story</p>
            <h2 style={{ ...fontDisplay, color: C.text }} className="text-3xl">Celebrate With Us</h2>
          </div>
          <div className="flex flex-col gap-4">
            {subEvents.map((se) => (
              <motion.div
                key={se.id}
                variants={staggerItem}
                className="flex gap-6 p-5 rounded-2xl"
                style={{ background: C.card, border: `1px solid ${C.border}`, borderLeft: `4px solid ${C.secondary}` }}
              >
                <div className="flex-1">
                  <p style={{ ...fontDisplay, color: C.text }} className="text-lg mb-1">{se.name}</p>
                  <p className="text-sm" style={{ color: C.muted }}>{se.date} · {se.time}</p>
                  <p className="text-sm flex items-center gap-1 mt-1" style={{ color: C.muted }}>
                    <MapPin className="w-3.5 h-3.5" />{se.venue}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}

      {/* ── 7. RSVP — LOVE LETTER STYLE ──────────────────────────────── */}
      <section className="px-4 sm:px-8 py-20" style={{ background: C.sepia }}>
        <div className="max-w-lg mx-auto">
          <div
            className="rounded-2xl p-8 sm:p-10"
            style={{ background: C.card, border: `1px solid ${C.border}`, boxShadow: `0 4px 24px ${C.primary}15` }}
          >
            <div className="text-center mb-8">
              <p style={{ color: C.secondary }} className="text-3xl mb-2">✦</p>
              <h2 style={{ ...fontDisplay, color: C.text }} className="text-2xl">Will You Join Our Story?</h2>
              <p className="text-sm mt-2" style={{ color: C.muted }}>Your presence would mean the world to us.</p>
            </div>
            <RSVPForm subEvents={subEvents} onSubmit={onRsvpSubmit}
              colors={{ button: C.primary, buttonText: '#FFFFFF', label: C.text, checkboxAccent: C.secondary }}
              inputStyle="underline"
              successMessage="We can't wait to celebrate with you!" />
          </div>
        </div>
      </section>

      {/* ── 8. FOOTER ────────────────────────────────────────────────── */}
      <footer className="px-4 py-10 text-center" style={{ borderTop: `1px solid ${C.border}` }}>
        <p style={{ ...fontDisplay, color: C.secondary }} className="text-2xl italic mb-1">
          {name1} & {name2}
        </p>
        <p className="text-xs uppercase tracking-widest" style={{ color: C.muted }}>Forever & Always</p>
        <DawatBranding show={branding.showDawatBranding} colors={{ text: C.muted }} />
      </footer>

      <ShareBar colors={{ bar: C.card, buttonText: C.text, button: C.primary, border: C.border }} floating />
    </div>
  )
}
