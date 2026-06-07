'use client'

import { motion } from 'motion/react'
import { MapPin } from 'lucide-react'
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

const MODERNLOVE_DEFAULTS = {
  bg: '#FFFFFF',
  primary: '#C9622F',
  secondary: '#3D6B4F',
  text: '#1A1A1A',
  muted: '#888888',
  surface: '#F8F8F5',
  border: '#E5E5E0',
}

const fontDisplay = { fontFamily: 'var(--font-syne, "Syne", sans-serif)' }
const fontBody = { fontFamily: 'var(--font-dm-sans, "DM Sans", sans-serif)' }

export default function ModernLoveTemplate({ event, branding, onRsvpSubmit, colors, disableEffects: _disableEffects }: TemplateProps) {
  const raw = resolveColors(colors, MODERNLOVE_DEFAULTS)
  const C = {
    bg: raw.bg,
    terracotta: raw.primary,
    sage: raw.secondary,
    text: raw.text,
    muted: raw.muted,
    light: raw.surface,
    border: raw.border,
  }

  const { coupleNames, title, eventDate, subEvents, description, gallery, coverImage, sections } = event
  const placeholders = PLACEHOLDER_IMAGES.engagement
  const name1 = coupleNames?.partner1 ?? title.split('&')[0]?.trim() ?? 'Partner 1'
  const name2 = coupleNames?.partner2 ?? title.split('&')[1]?.trim().split(' ')[0] ?? 'Partner 2'

  return (
    <div style={{ background: C.bg, color: C.text, ...fontBody }} className="@container min-h-screen overflow-x-hidden">

      {/* ── 1. SPLIT HERO ────────────────────────────────────────────── */}
      <section className="min-h-screen grid grid-cols-1 @md:grid-cols-3">
        {/* Partner 1 */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center justify-center py-20 px-8 text-center"
          style={{ background: C.light }}
        >
          <div className="w-32 h-32 rounded-full mb-6 flex items-center justify-center" style={{ background: C.border }}>
            <span style={{ ...fontDisplay, color: C.terracotta }} className="text-4xl font-black">{name1[0]}</span>
          </div>
          <h2 style={{ ...fontDisplay, color: C.text }} className="text-3xl font-black">{name1}</h2>
        </motion.div>

        {/* Center details */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="flex flex-col items-center justify-center py-12 px-6 text-center border-y @md:border-y-0 @md:border-x"
          style={{ background: C.bg, borderColor: C.border }}
        >
          <p style={{ ...fontDisplay, color: C.terracotta }} className="text-6xl font-black">
            ♥
          </p>
          <p className="text-sm uppercase tracking-widest mt-4 mb-2" style={{ color: C.muted }}>engaged</p>
          <div className="h-px w-12 my-4" style={{ background: C.border }} />
          <p className="text-sm font-semibold" style={{ color: C.text }}>
            {new Date(eventDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
          {subEvents[0] && (
            <p className="text-xs mt-1" style={{ color: C.muted }}>{subEvents[0].venue}</p>
          )}
        </motion.div>

        {/* Partner 2 */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center justify-center py-20 px-8 text-center"
          style={{ background: C.light }}
        >
          <div className="w-32 h-32 rounded-full mb-6 flex items-center justify-center" style={{ background: C.border }}>
            <span style={{ ...fontDisplay, color: C.sage }} className="text-4xl font-black">{name2[0]}</span>
          </div>
          <h2 style={{ ...fontDisplay, color: C.text }} className="text-3xl font-black">{name2}</h2>
        </motion.div>
      </section>

      {/* ── 2. COUNTDOWN ─────────────────────────────────────────────── */}
      {sections.countdown !== false && (
        <section className="px-4 py-12" style={{ background: C.light, borderTop: `1px solid ${C.border}` }}>
          <div className="max-w-2xl mx-auto">
            <CountdownTimer targetDate={eventDate} boxStyle="boxed"
              colors={{ box: C.bg, number: C.terracotta, label: C.muted, border: C.border }} />
          </div>
        </section>
      )}

      {/* ── 3. STORY ─────────────────────────────────────────────────── */}
      {sections.about !== false && (
        <section className="px-6 @sm:px-8 py-20 max-w-2xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewport}>
            <p className="text-xs uppercase tracking-widest mb-4" style={{ color: C.muted }}>Our Story</p>
            <div className="h-px w-12 mb-6" style={{ background: C.terracotta }} />
            <p className="text-base leading-relaxed" style={{ color: C.muted }}>
              {description || 'Two people, one extraordinary connection. We fell in love and now we\'re taking the next step. Join us as we celebrate this wonderful chapter.'}
            </p>
          </motion.div>
        </section>
      )}

      {/* ── 4. EVENTS ────────────────────────────────────────────────── */}
      {sections.schedule !== false && subEvents.length > 0 && (
        <motion.section
          initial="initial" whileInView="animate" viewport={viewport} variants={staggerContainer}
          className="px-4 @sm:px-8 py-16" style={{ background: C.light }}
        >
          <div className="max-w-4xl mx-auto">
            <motion.h2 variants={staggerItem} style={{ ...fontDisplay }}
              className="text-3xl font-black mb-8">Events</motion.h2>
            <div className="grid grid-cols-1 @sm:grid-cols-2 @lg:grid-cols-3 gap-4">
              {subEvents.map((se, i) => (
                <motion.div key={se.id} variants={staggerItem}
                  className="rounded-xl p-5"
                  style={{ background: C.bg, borderTop: `3px solid ${i % 2 === 0 ? C.terracotta : C.sage}` }}>
                  <p style={{ ...fontDisplay, color: C.text }} className="font-black text-lg">{se.name}</p>
                  <p className="text-sm mt-2" style={{ color: C.muted }}>{se.date}</p>
                  <p className="text-sm" style={{ color: C.muted }}>{se.time}</p>
                  <p className="text-sm flex items-center gap-1 mt-1" style={{ color: C.muted }}>
                    <MapPin className="w-3.5 h-3.5" />{se.venue}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      )}

      {/* ── 5. GALLERY ───────────────────────────────────────────────── */}
      {sections.gallery !== false && (
        <section className="px-4 @sm:px-8 py-16 max-w-4xl mx-auto">
          <div className="w-48 mx-auto mb-10">
            <CoverPhoto src={coverImage} fallback={placeholders.cover} alt={title} shape="circle" />
          </div>
          <Gallery images={gallery} fallbackImages={placeholders.gallery} variant="grid" columns={3}
            colors={{ overlay: `rgba(201, 98, 47, 0.2)` }} />
        </section>
      )}

      {/* ── 6. RSVP ──────────────────────────────────────────────────── */}
      {sections.rsvp !== false && (
        <section className="px-4 @sm:px-8 py-16" style={{ background: C.light }}>
          <div className="max-w-lg mx-auto">
            <h2 style={{ ...fontDisplay }} className="text-3xl font-black mb-8">RSVP</h2>
            <RSVPForm subEvents={subEvents} onSubmit={onRsvpSubmit}
              colors={{ button: C.terracotta, buttonText: '#FFFFFF', label: C.text, checkboxAccent: C.sage }}
              inputStyle="underline" successMessage="See you there!" />
          </div>
        </section>
      )}

      {/* ── 7. FOOTER ────────────────────────────────────────────────── */}
      <footer className="px-4 py-8 flex items-center justify-between gap-2 flex-wrap" style={{ borderTop: `1px solid ${C.border}` }}>
        <p style={{ ...fontDisplay }} className="font-black">{name1} & {name2}</p>
        <DawatBranding show={branding.showDawatBranding} colors={{ text: C.muted }} />
      </footer>

      <ShareBar colors={{ bar: C.bg, buttonText: C.text, button: C.terracotta, border: C.border }} floating />
    </div>
  )
}
