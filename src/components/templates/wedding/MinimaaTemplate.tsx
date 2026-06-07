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
import { PLACEHOLDER_IMAGES } from '@/lib/placeholder-images'

const fontDisplay = { fontFamily: 'var(--font-libre-baskerville, "Libre Baskerville", serif)' }
const fontBody = { fontFamily: 'var(--font-space-grotesk, "Space Grotesk", sans-serif)' }

export default function MinimaaTemplate({ event, branding, onRsvpSubmit, colors, disableEffects: _disableEffects }: TemplateProps) {
  const C = {
    bg:      colors?.bg      ?? '#FFFFFF',
    primary: colors?.primary ?? '#1A1A1A',
    accent:  colors?.secondary ?? '#C9622F',
    border:  '#E0E0E0',
    text:    colors?.text    ?? '#1A1A1A',
    muted:   colors?.muted   ?? '#999999',
  }
  const { coupleNames, title, eventDate, subEvents, description, gallery, coverImage, sections } = event
  const placeholders = PLACEHOLDER_IMAGES.wedding

  const name1 = coupleNames?.partner1 ?? title.split('&')[0]?.trim() ?? 'Partner 1'
  const name2 = coupleNames?.partner2 ?? title.split('&')[1]?.trim().split(' ')[0] ?? 'Partner 2'

  const dateFormatted = new Date(eventDate).toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  })

  return (
    <div style={{ background: C.bg, color: C.text, ...fontBody }} className="@container min-h-screen overflow-x-hidden">

      {/* ── 1. TYPOGRAPHY HERO ───────────────────────────────────────── */}
      <section className="px-6 @sm:px-12 @md:px-20 @lg:px-28 pt-20 pb-12">
        <div className="max-w-5xl">
          <motion.div
            initial={{ clipPath: 'inset(0 100% 0 0)', opacity: 0 }}
            animate={{ clipPath: 'inset(0 0% 0 0)', opacity: 1 }}
            transition={{ duration: 1.1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="flex flex-col @md:flex-row @md:items-end @md:justify-between gap-4 @md:gap-8">
              <h1
                style={{ ...fontDisplay }}
                className="text-5xl @sm:text-6xl @md:text-7xl @lg:text-8xl leading-none min-w-0"
              >
                {name1}
                <span style={{ color: C.accent }} className="ml-4">&</span>
              </h1>
              <p
                style={{ ...fontBody, color: C.muted }}
                className="text-sm uppercase tracking-widest @md:text-right @md:pb-4 shrink-0"
              >
                {dateFormatted}
              </p>
            </div>
            <h1
              style={{ ...fontDisplay }}
              className="text-5xl @sm:text-6xl @md:text-7xl @lg:text-8xl leading-none mt-2 min-w-0"
            >
              {name2}
            </h1>
          </motion.div>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-6 h-px w-full origin-left"
            style={{ background: C.primary }}
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.5 }}
            className="mt-4 text-xs uppercase tracking-[0.4em]"
            style={{ color: C.muted }}
          >
            Wedding Invitation
          </motion.p>
        </div>
      </section>

      {/* ── 2. INFORMATION BLOCK ─────────────────────────────────────── */}
      <motion.section
        initial="initial"
        whileInView="animate"
        viewport={viewport}
        variants={staggerContainer}
        className="px-6 @sm:px-12 @md:px-20 @lg:px-28 py-16 max-w-3xl"
      >
        {[
          { label: 'Date', value: new Date(eventDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) },
          { label: 'Time', value: subEvents[0]?.time ?? 'To be announced' },
          { label: 'Venue', value: subEvents[0]?.venue ?? 'To be announced' },
        ].map((row) => (
          <motion.div
            key={row.label}
            variants={staggerItem}
            className="grid grid-cols-1 @sm:grid-cols-3 gap-1 @sm:gap-4 py-4"
            style={{ borderBottom: `1px solid ${C.border}` }}
          >
            <p className="text-xs uppercase tracking-widest" style={{ color: C.muted }}>{row.label}</p>
            <p className="@sm:col-span-2 text-base" style={{ color: C.text }}>{row.value}</p>
          </motion.div>
        ))}
      </motion.section>

      {/* ── 3. COUNTDOWN ─────────────────────────────────────────────── */}
      {sections.countdown !== false && (
        <section className="px-6 @sm:px-12 @md:px-20 @lg:px-28 py-12">
          <div className="h-px w-full mb-8" style={{ background: C.border }} />
          <CountdownTimer
            targetDate={eventDate}
            boxStyle="inline"
            colors={{ number: C.primary, label: C.muted }}
          />
          <div className="h-px w-full mt-8" style={{ background: C.border }} />
        </section>
      )}

      {/* ── 4. EVENT LIST ────────────────────────────────────────────── */}
      {sections.schedule !== false && subEvents.length > 0 && (
        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={viewport}
          variants={staggerContainer}
          className="px-6 @sm:px-12 @md:px-20 @lg:px-28 py-16 max-w-3xl"
        >
          <motion.p
            variants={staggerItem}
            className="text-xs uppercase tracking-[0.4em] mb-8"
            style={{ color: C.muted }}
          >
            Events
          </motion.p>
          {subEvents.map((se, i) => (
            <motion.div
              key={se.id}
              variants={staggerItem}
              className="flex flex-col @sm:flex-row @sm:items-start gap-2 @sm:gap-8 py-5"
              style={{ borderBottom: `1px solid ${C.border}` }}
            >
              <span style={{ color: C.accent }} className="text-lg font-bold flex-shrink-0 w-8">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="flex-1">
                <p className="font-semibold text-base" style={{ fontFamily: fontDisplay.fontFamily }}>{se.name}</p>
                <p className="text-sm mt-1" style={{ color: C.muted }}>{se.date} · {se.time}</p>
                <p className="text-sm flex items-center gap-1 mt-0.5" style={{ color: C.muted }}>
                  <MapPin className="w-3.5 h-3.5" style={{ color: C.accent }} />
                  {se.venue}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.section>
      )}

      {/* ── 5. STATEMENT SECTION ─────────────────────────────────────── */}
      {sections.about !== false && (
        <section className="px-6 @sm:px-12 @md:px-20 @lg:px-28 py-20">
          <div className="max-w-3xl">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={viewport}
              transition={{ duration: 0.8 }}
              style={{ ...fontDisplay, color: C.text }}
              className="text-2xl @sm:text-3xl @md:text-4xl italic leading-relaxed"
            >
              {description ||
                <>We invite you to share in <span style={{ color: C.accent }}>our joy</span> as we begin this beautiful chapter together.</>}
            </motion.p>
          </div>
        </section>
      )}

      {/* ── 6. GALLERY ───────────────────────────────────────────────── */}
      {sections.gallery !== false && (
        <section className="px-6 @sm:px-12 @md:px-20 @lg:px-28 py-16">
          <div className="max-w-lg mx-auto mb-10">
            <CoverPhoto src={coverImage} fallback={placeholders.cover} alt={title} shape="landscape" />
          </div>
          <Gallery images={gallery} fallbackImages={placeholders.gallery} variant="grid" columns={3} />
        </section>
      )}

      {/* ── 7. RSVP ──────────────────────────────────────────────────── */}
      {sections.rsvp !== false && (
        <section className="px-6 @sm:px-12 @md:px-20 @lg:px-28 py-20" style={{ background: '#FAFAFA' }}>
          <div className="max-w-md">
            <p
              style={{ ...fontDisplay, color: C.primary }}
              className="text-5xl @sm:text-6xl mb-12"
            >
              RSVP
            </p>
            <RSVPForm
              subEvents={subEvents}
              onSubmit={onRsvpSubmit}
              colors={{
                button: C.accent,
                buttonText: '#FFFFFF',
                label: C.text,
                checkboxAccent: C.accent,
                successText: C.text,
              }}
              inputStyle="underline"
              successMessage="✓ Received. We look forward to your presence."
            />
          </div>
        </section>
      )}

      {/* ── 8. FOOTER ────────────────────────────────────────────────── */}
      <footer
        className="px-6 @sm:px-12 @md:px-20 @lg:px-28 py-8 flex flex-col @sm:flex-row items-start @sm:items-center justify-between gap-4"
        style={{ borderTop: `1px solid ${C.border}` }}
      >
        <p className="text-sm" style={{ color: C.muted }}>
          {name1} & {name2} · {new Date(eventDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
        <DawatBranding show={branding.showDawatBranding} colors={{ text: C.muted }} />
      </footer>

      <ShareBar colors={{ bar: C.bg, buttonText: C.primary, button: C.accent, border: C.border }} floating />
    </div>
  )
}
