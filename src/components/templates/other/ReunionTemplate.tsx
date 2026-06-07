'use client'

import { motion } from 'motion/react'
import { MapPin } from 'lucide-react'
import type { TemplateProps } from '@/lib/templates-data'
import { resolveColors } from '@/lib/template-colors'
import CountdownTimer from '../shared/CountdownTimer'
import RSVPForm from '../shared/RSVPForm'
import Gallery from '../shared/Gallery'
import CoverPhoto from '../shared/CoverPhoto'
import DawatBranding from '../shared/DawatBranding'
import { PLACEHOLDER_IMAGES } from '@/lib/placeholder-images'
import ShareBar from '../shared/ShareBar'
import { viewport, staggerContainer, staggerItem } from '@/lib/motion'

const fontDisplay = { fontFamily: 'var(--font-merriweather, "Merriweather", serif)' }
const fontBody = { fontFamily: 'var(--font-dm-sans, "DM Sans", sans-serif)' }

const MEMORIES = ['📸 Old Photos', '🎵 Our Songs', '🍽️ Shared Meals', '😂 Old Stories', '🤝 Old Friends']

function WarmRule({ primary, secondary }: { primary: string; secondary: string }) {
  return (
    <div className="flex items-center gap-3 my-4">
      <div className="h-px flex-1" style={{ background: secondary, opacity: 0.4 }} />
      <div className="w-2 h-2 rounded-full" style={{ background: secondary }} />
      <div className="h-px flex-1" style={{ background: secondary, opacity: 0.4 }} />
    </div>
  )
}

const REUNION_DEFAULTS = {
  bg: '#FAF6F0',
  primary: '#7B4A1E',
  surface: '#F2E8DC',
  secondary: '#C9956A',
  text: '#2E1A0A',
  muted: '#8A6A4A',
  card: '#FFFFFF',
  border: '#E8D5C0',
}

export default function ReunionTemplate({ event, branding, onRsvpSubmit, colors, disableEffects: _disableEffects }: TemplateProps) {
  const { bg, primary: brown, surface: brownLight, secondary: tan, text, muted, card, border } = resolveColors(colors, REUNION_DEFAULTS)
  const C = { bg, brown, brownLight, tan, text, muted, card, border }

  const { title, eventDate, subEvents, description, hostName, gallery, message, coverImage, sections } = event
  const placeholders = PLACEHOLDER_IMAGES.reunion

  return (
    <div style={{ background: C.bg, color: C.text, ...fontBody }} className="@container min-h-screen overflow-x-hidden">

      {/* ── 1. NOSTALGIC HERO ────────────────────────────────────────── */}
      <section
        className="min-h-screen flex flex-col items-center justify-center px-6 py-20 text-center"
        style={{ background: `linear-gradient(160deg, ${C.brownLight} 0%, ${C.bg} 100%)` }}
      >
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          <p className="text-5xl mb-6">🎉</p>
          <p className="text-xs uppercase tracking-[0.4em] mb-4" style={{ color: C.muted }}>
            You&apos;re invited to
          </p>
          <WarmRule primary={C.brown} secondary={C.tan} />
          <h1 style={{ ...fontDisplay, color: C.brown }} className="text-4xl @sm:text-6xl mt-4 mb-2 leading-snug font-black">
            {title}
          </h1>
          <WarmRule primary={C.brown} secondary={C.tan} />
          {hostName && (
            <p className="text-base mt-4" style={{ color: C.muted }}>
              Organised by <span style={{ color: C.brown, fontWeight: 700 }}>{hostName}</span>
            </p>
          )}
          <p className="mt-3 text-sm uppercase tracking-widest" style={{ color: C.muted }}>
            {new Date(eventDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </motion.div>
      </section>

      {/* ── 2. COUNTDOWN ─────────────────────────────────────────────── */}
      {sections.countdown !== false && (
        <section className="px-4 py-12" style={{ background: C.brown }}>
          <div className="max-w-2xl mx-auto">
            <p className="text-center text-xs uppercase tracking-widest mb-4" style={{ color: `${C.brownLight}AA` }}>
              Until We Reunite
            </p>
            <CountdownTimer targetDate={eventDate} boxStyle="boxed"
              colors={{ box: `${C.brown}CC`, number: C.tan, label: `${C.brownLight}80`, border: `${C.tan}40` }} />
          </div>
        </section>
      )}

      {/* ── 3. MEMORY TAGS ───────────────────────────────────────────── */}
      {sections.about !== false && (
        <section className="px-6 @sm:px-8 py-16 max-w-2xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewport}>
            <WarmRule primary={C.brown} secondary={C.tan} />
            <p style={{ ...fontDisplay, color: C.brown }} className="text-2xl mt-6 mb-4">What we&apos;re bringing back</p>
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              {MEMORIES.map((m) => (
                <span
                  key={m}
                  className="px-4 py-2 rounded-full text-sm font-semibold"
                  style={{ background: C.brownLight, color: C.brown, border: `1px solid ${C.border}` }}
                >
                  {m}
                </span>
              ))}
            </div>
            <p className="text-base leading-relaxed" style={{ color: C.muted }}>
              {message || description || 'Life gets busy, but the bonds we share are timeless. Let\'s come together, relive old memories, and make new ones. It\'s been too long — and that changes now.'}
            </p>
          </motion.div>
        </section>
      )}

      {/* ── 4. GALLERY ───────────────────────────────────────────────── */}
      <section className="px-4 @sm:px-8 py-8 max-w-xl mx-auto">
        <CoverPhoto src={coverImage} fallback={placeholders.cover} alt={title} shape="landscape" />
      </section>
      {sections.gallery !== false && gallery && gallery.length > 0 && (
        <section className="px-4 py-12" style={{ background: C.brownLight }}>
          <div className="max-w-4xl mx-auto">
            <p className="text-xs uppercase tracking-widest text-center mb-6" style={{ color: C.muted }}>
              Throwback
            </p>
            <Gallery images={gallery} fallbackImages={placeholders.gallery} variant="polaroid" columns={3}
              colors={{ overlay: `${C.brown}20`, border: C.border }} />
          </div>
        </section>
      )}

      {/* ── 5. EVENTS ────────────────────────────────────────────────── */}
      {sections.schedule !== false && subEvents.length > 0 && (
        <motion.section
          initial="initial" whileInView="animate" viewport={viewport} variants={staggerContainer}
          className="px-4 @sm:px-8 py-16 max-w-3xl mx-auto"
        >
          <div className="text-center mb-8">
            <WarmRule primary={C.brown} secondary={C.tan} />
            <h2 style={{ ...fontDisplay, color: C.brown }} className="text-3xl mt-4">The Plan</h2>
          </div>
          <div className="flex flex-col gap-3">
            {subEvents.map((se, i) => (
              <motion.div
                key={se.id}
                variants={staggerItem}
                className="flex gap-4 p-4 rounded-xl"
                style={{ background: C.card, border: `1px solid ${C.border}`, borderLeft: `4px solid ${C.tan}` }}
              >
                <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-sm font-bold" style={{ background: C.brownLight, color: C.brown }}>
                  {i + 1}
                </div>
                <div>
                  <p className="font-semibold" style={{ ...fontDisplay, color: C.brown }}>{se.name}</p>
                  <p className="text-sm mt-1" style={{ color: C.muted }}>{se.date} · {se.time}</p>
                  <p className="text-sm flex items-center gap-1 mt-0.5" style={{ color: C.muted }}>
                    <MapPin className="w-3 h-3" />{se.venue}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}

      {/* ── 6. RSVP ──────────────────────────────────────────────────── */}
      {sections.rsvp !== false && (
        <section className="px-4 @sm:px-8 py-16" style={{ background: C.brownLight }}>
          <div className="max-w-lg mx-auto">
            <div className="text-center mb-6">
              <WarmRule primary={C.brown} secondary={C.tan} />
              <h2 style={{ ...fontDisplay, color: C.brown }} className="text-3xl mt-4">Are You In?</h2>
            </div>
            <div className="rounded-2xl p-6 @sm:p-8" style={{ background: C.card, border: `1px solid ${C.border}` }}>
              <RSVPForm subEvents={subEvents} onSubmit={onRsvpSubmit}
                colors={{ button: C.brown, buttonText: '#FFFFFF', label: C.text, checkboxAccent: C.tan }}
                successMessage="Can't wait to see you again! 🎉" />
            </div>
          </div>
        </section>
      )}

      {/* ── 7. FOOTER ────────────────────────────────────────────────── */}
      <footer className="px-4 py-10 text-center" style={{ borderTop: `1px solid ${C.border}` }}>
        <p className="text-4xl mb-2">🤝</p>
        <p style={{ ...fontDisplay, color: C.brown }} className="text-xl">{title}</p>
        <DawatBranding show={branding.showDawatBranding} colors={{ text: C.muted }} />
      </footer>

      <ShareBar colors={{ bar: C.card, buttonText: C.text, button: C.brown, border: C.border }} floating />
    </div>
  )
}
