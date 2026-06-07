'use client'

import { motion } from 'motion/react'
import { MapPin } from 'lucide-react'
import type { TemplateProps } from '@/lib/templates-data'
import { resolveColors } from '@/lib/template-colors'
import CountdownTimer from '../shared/CountdownTimer'
import RSVPForm from '../shared/RSVPForm'
import CoverPhoto from '../shared/CoverPhoto'
import DawatBranding from '../shared/DawatBranding'
import { PLACEHOLDER_IMAGES } from '@/lib/placeholder-images'
import ShareBar from '../shared/ShareBar'
import { viewport, staggerContainer, staggerItem } from '@/lib/motion'

const fontDisplay = { fontFamily: 'var(--font-syne, "Syne", sans-serif)' }
const fontBody = { fontFamily: 'var(--font-dm-sans, "DM Sans", sans-serif)' }

const ACHIEVEMENTS = [
  { icon: '🎓', label: 'Graduate' },
  { icon: '📜', label: 'Degree' },
  { icon: '⭐', label: 'Honours' },
  { icon: '🔬', label: 'Research' },
]

function NavyGoldRule({ navy, gold }: { navy: string; gold: string }) {
  return (
    <div className="flex items-center gap-3 my-4">
      <div className="h-0.5 flex-1" style={{ background: navy, opacity: 0.2 }} />
      <div className="w-3 h-3 rotate-45" style={{ background: gold }} />
      <div className="h-0.5 flex-1" style={{ background: navy, opacity: 0.2 }} />
    </div>
  )
}

const GRADUATION_DEFAULTS = {
  bg: '#F8F9FD',
  primary: '#1E3A5F',
  surface: '#E8EEF5',
  secondary: '#C9A84C',
  goldLight: '#F5EDD0',
  text: '#1A2035',
  muted: '#6A7A90',
  card: '#FFFFFF',
  border: '#D5DEE8',
}

export default function GraduationTemplate({ event, branding, onRsvpSubmit, colors, disableEffects: _disableEffects }: TemplateProps) {
  const { bg, primary: navy, surface: navyLight, secondary: gold, goldLight, text, muted, card, border } = resolveColors(colors, GRADUATION_DEFAULTS)
  const C = { bg, navy, navyLight, gold, goldLight, text, muted, card, border }

  const { title, eventDate, subEvents, description, personName, hostName, message, coverImage, sections } = event
  const placeholders = PLACEHOLDER_IMAGES.graduation
  const graduateName = personName ?? hostName ?? title.split("'s")[0]

  return (
    <div style={{ background: C.bg, color: C.text, ...fontBody }} className="@container min-h-screen overflow-x-hidden">

      {/* ── 1. ACHIEVEMENT HERO ──────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 text-center overflow-hidden">
        {/* Background decoration */}
        <div
          className="absolute top-0 left-0 right-0 h-2"
          style={{ background: `linear-gradient(90deg, ${C.navy}, ${C.gold}, ${C.navy})` }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse 60% 50% at 50% 30%, ${C.navyLight} 0%, transparent 70%)` }}
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 max-w-xl"
        >
          {/* Mortarboard */}
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8, type: 'spring' }}
            className="text-7xl mb-6"
          >
            🎓
          </motion.div>

          <p className="text-xs uppercase tracking-[0.5em] mb-4 font-semibold" style={{ color: C.gold }}>
            Class of {new Date(eventDate).getFullYear()}
          </p>
          <NavyGoldRule navy={C.navy} gold={C.gold} />
          <h1 style={{ ...fontDisplay, color: C.navy }} className="text-5xl @sm:text-7xl font-black mt-4 mb-2 leading-tight">
            {graduateName}
          </h1>
          <p style={{ ...fontDisplay, color: C.gold }} className="text-2xl font-bold mb-4">
            has graduated!
          </p>
          <NavyGoldRule navy={C.navy} gold={C.gold} />
          <p className="mt-4 text-sm uppercase tracking-widest" style={{ color: C.muted }}>
            {new Date(eventDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </motion.div>
      </section>

      {/* ── 2. ACHIEVEMENT BADGES ────────────────────────────────────── */}
      <section className="px-4 py-12" style={{ background: C.navy }}>
        <div className="max-w-3xl mx-auto grid grid-cols-2 @sm:grid-cols-4 gap-4 text-center">
          {ACHIEVEMENTS.map((a, i) => (
            <motion.div
              key={a.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ delay: i * 0.1 }}
              className="py-4"
            >
              <p className="text-3xl mb-1">{a.icon}</p>
              <p className="text-xs uppercase tracking-wider font-semibold" style={{ color: C.gold }}>{a.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── 3. COUNTDOWN ─────────────────────────────────────────────── */}
      {sections.countdown !== false && (
        <section className="px-4 py-12" style={{ background: C.goldLight }}>
          <div className="max-w-2xl mx-auto">
            <p className="text-center text-xs uppercase tracking-widest mb-4" style={{ color: C.muted }}>Celebration in</p>
            <CountdownTimer targetDate={eventDate} boxStyle="boxed"
              colors={{ box: C.card, number: C.navy, label: C.muted, border: C.border }} />
          </div>
        </section>
      )}

      {/* ── 4. MESSAGE ───────────────────────────────────────────────── */}
      {sections.about !== false && (
        <section className="px-6 @sm:px-8 py-20 max-w-2xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewport}>
            <NavyGoldRule navy={C.navy} gold={C.gold} />
            <p style={{ ...fontDisplay, color: C.navy }} className="text-2xl font-bold mt-6 mb-4">
              Years of hard work, finally celebrated.
            </p>
            <p className="text-base leading-relaxed" style={{ color: C.muted }}>
              {message || description || `Please join us in celebrating ${graduateName}'s incredible achievement. Your presence would mean the world as we mark this milestone together.`}
            </p>
          </motion.div>
        </section>
      )}

      {/* ── cover photo ──────────────────────────────────────────────── */}
      <section className="px-4 @sm:px-8 py-8 max-w-xl mx-auto">
        <div className="max-w-xs mx-auto">
          <CoverPhoto src={coverImage} fallback={placeholders.cover} alt={title} shape="portrait" />
        </div>
      </section>

      {/* ── 5. EVENTS ────────────────────────────────────────────────── */}
      {sections.schedule !== false && subEvents.length > 0 && (
        <motion.section
          initial="initial" whileInView="animate" viewport={viewport} variants={staggerContainer}
          className="px-4 @sm:px-8 py-16"
          style={{ background: C.navyLight }}
        >
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <NavyGoldRule navy={C.navy} gold={C.gold} />
              <h2 style={{ ...fontDisplay, color: C.navy }} className="text-3xl font-black mt-4">Celebration Details</h2>
            </div>
            <div className="grid grid-cols-1 @sm:grid-cols-2 gap-4">
              {subEvents.map((se, i) => (
                <motion.div
                  key={se.id}
                  variants={staggerItem}
                  className="rounded-2xl p-5"
                  style={{ background: C.card, border: `1px solid ${C.border}`, borderTop: `3px solid ${i % 2 === 0 ? C.navy : C.gold}` }}
                >
                  <p style={{ ...fontDisplay, color: C.navy }} className="font-black text-lg">{se.name}</p>
                  <p className="text-sm mt-2" style={{ color: C.muted }}>{se.date} · {se.time}</p>
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
      {sections.rsvp !== false && (
        <section className="px-4 @sm:px-8 py-16">
          <div className="max-w-lg mx-auto">
            <div className="text-center mb-6">
              <NavyGoldRule navy={C.navy} gold={C.gold} />
              <h2 style={{ ...fontDisplay, color: C.navy }} className="text-3xl font-black mt-4">Will You Be There?</h2>
            </div>
            <RSVPForm subEvents={subEvents} onSubmit={onRsvpSubmit}
              colors={{ button: C.navy, buttonText: '#FFFFFF', label: C.text, checkboxAccent: C.gold }}
              successMessage="See you at the celebration! 🎓" />
          </div>
        </section>
      )}

      {/* ── 7. FOOTER ────────────────────────────────────────────────── */}
      <footer
        className="px-4 py-10 text-center"
        style={{ background: C.navy, borderTop: `3px solid ${C.gold}` }}
      >
        <p className="text-3xl mb-2">🎓</p>
        <p style={{ ...fontDisplay, color: '#FFFFFF' }} className="text-xl font-black">{graduateName}</p>
        <p className="text-xs uppercase tracking-widest mt-1" style={{ color: C.gold }}>
          Class of {new Date(eventDate).getFullYear()}
        </p>
        <DawatBranding show={branding.showDawatBranding} colors={{ text: `${C.gold}80` }} />
      </footer>

      <ShareBar colors={{ bar: C.card, buttonText: C.text, button: C.navy, border: C.border }} floating />
    </div>
  )
}
