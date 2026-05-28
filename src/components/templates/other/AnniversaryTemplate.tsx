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

const fontDisplay = { fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)' }
const fontBody = { fontFamily: 'var(--font-raleway, "Raleway", sans-serif)' }

function RoseGoldRule({ rose, gold }: { rose: string; gold: string }) {
  return (
    <div className="flex items-center gap-3 my-4">
      <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, transparent, ${rose}60, ${gold}60, transparent)` }} />
      <svg viewBox="0 0 20 20" className="w-5 h-5" fill={gold}>
        <path d="M10 2 C10 2 5 6 5 10 C5 12.8 7.2 15 10 15 C12.8 15 15 12.8 15 10 C15 6 10 2 10 2Z" opacity="0.6" />
        <polygon points="10,3 11.5,8 16.5,8 12.5,11 14,16 10,13 6,16 7.5,11 3.5,8 8.5,8" />
      </svg>
      <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, transparent, ${gold}60, ${rose}60, transparent)` }} />
    </div>
  )
}

export default function AnniversaryTemplate({ event, branding, onRsvpSubmit, colors }: TemplateProps) {
  const C = {
    bg: colors?.bg ?? '#FBF5F8',
    rose: colors?.primary ?? '#9B3A5A',
    roseLight: colors?.surface ?? '#F5E0E8',
    gold: colors?.secondary ?? '#C9A84C',
    goldLight: '#F5EDD0',
    text: colors?.text ?? '#2E1020',
    muted: colors?.muted ?? '#8A6070',
    card: '#FFFFFF',
    border: '#EDD0DC',
  }

  const { coupleNames, title, eventDate, subEvents, description, gallery, message } = event
  const name1 = coupleNames?.partner1 ?? title.split('&')[0]?.trim() ?? 'Partner 1'
  const name2 = coupleNames?.partner2 ?? title.split('&')[1]?.trim().split(' ')[0] ?? 'Partner 2'

  // Extract anniversary number from title if present (e.g. "25th Anniversary")
  const yearMatch = title.match(/(\d+)/)
  const years = yearMatch ? yearMatch[1] : null

  return (
    <div style={{ background: C.bg, color: C.text, ...fontBody }} className="min-h-screen overflow-x-hidden">

      {/* ── 1. ROMANTIC HERO ─────────────────────────────────────────── */}
      <section
        className="min-h-screen flex flex-col items-center justify-center px-6 py-20 text-center"
        style={{ background: `radial-gradient(ellipse 80% 80% at 50% 30%, ${C.roseLight} 0%, ${C.bg} 70%)` }}
      >
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }}>
          {years && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
              className="w-24 h-24 rounded-full flex flex-col items-center justify-center mx-auto mb-6"
              style={{ background: C.rose, border: `3px solid ${C.gold}` }}
            >
              <span className="text-3xl font-black text-white leading-none">{years}</span>
              <span className="text-xs text-white font-semibold uppercase tracking-wider">Years</span>
            </motion.div>
          )}

          <p className="text-xs uppercase tracking-[0.5em] mb-6" style={{ color: C.muted }}>
            Celebrating love
          </p>
          <RoseGoldRule rose={C.rose} gold={C.gold} />
          <h1 style={{ ...fontDisplay, color: C.text }} className="text-5xl sm:text-7xl mt-4 leading-tight">
            {name1}
          </h1>
          <p style={{ ...fontDisplay, color: C.rose }} className="text-4xl italic my-2">&</p>
          <h1 style={{ ...fontDisplay, color: C.text }} className="text-5xl sm:text-7xl leading-tight">
            {name2}
          </h1>
          <RoseGoldRule rose={C.rose} gold={C.gold} />
          <p style={{ ...fontDisplay, color: C.rose }} className="text-2xl italic mt-4">
            {years ? `${years} beautiful years` : 'A milestone celebration'}
          </p>
          <p className="mt-4 text-sm uppercase tracking-widest" style={{ color: C.muted }}>
            {new Date(eventDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </motion.div>
      </section>

      {/* ── 2. COUNTDOWN ─────────────────────────────────────────────── */}
      <section className="px-4 py-12" style={{ background: C.rose }}>
        <div className="max-w-2xl mx-auto">
          <p className="text-center text-xs uppercase tracking-widest mb-4" style={{ color: `${C.goldLight}AA` }}>
            Until Our Celebration
          </p>
          <CountdownTimer targetDate={eventDate} boxStyle="boxed"
            colors={{ box: `${C.rose}AA`, number: C.gold, label: `${C.goldLight}80`, border: `${C.gold}30` }} />
        </div>
      </section>

      {/* ── 3. STORY ─────────────────────────────────────────────────── */}
      <section className="px-6 sm:px-8 py-20 max-w-2xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewport}>
          <RoseGoldRule rose={C.rose} gold={C.gold} />
          <p style={{ ...fontDisplay, color: C.text }} className="text-2xl italic mt-6 leading-relaxed">
            {message || description || `Every year together has been a gift. ${years ? `${years} years` : 'These years'} of laughter, love, and growth — and we're only just beginning. Join us as we celebrate the journey and look forward to all that lies ahead.`}
          </p>
        </motion.div>
      </section>

      {/* ── 4. GALLERY ───────────────────────────────────────────────── */}
      {gallery && gallery.length > 0 && (
        <section className="px-4 sm:px-8 py-16" style={{ background: C.roseLight }}>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-6">
              <p className="text-xs uppercase tracking-widest" style={{ color: C.muted }}>Through the Years</p>
            </div>
            <Gallery images={gallery} variant="grid" columns={3}
              colors={{ overlay: `${C.rose}22`, border: C.border }} />
          </div>
        </section>
      )}

      {/* ── 5. EVENTS ────────────────────────────────────────────────── */}
      {subEvents.length > 0 && (
        <motion.section
          initial="initial" whileInView="animate" viewport={viewport} variants={staggerContainer}
          className="px-4 sm:px-8 py-16 max-w-3xl mx-auto"
        >
          <div className="text-center mb-8">
            <RoseGoldRule rose={C.rose} gold={C.gold} />
            <h2 style={{ ...fontDisplay, color: C.text }} className="text-3xl mt-4">Celebrate With Us</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {subEvents.map((se) => (
              <motion.div
                key={se.id}
                variants={staggerItem}
                className="rounded-2xl p-5"
                style={{ background: C.card, border: `1px solid ${C.border}` }}
              >
                <p style={{ ...fontDisplay, color: C.rose }} className="text-xl mb-2">{se.name}</p>
                <p className="text-sm" style={{ color: C.muted }}>{se.date} · {se.time}</p>
                <p className="text-sm flex items-center gap-1 mt-1" style={{ color: C.muted }}>
                  <MapPin className="w-3.5 h-3.5" />{se.venue}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}

      {/* ── 6. RSVP ──────────────────────────────────────────────────── */}
      <section className="px-4 sm:px-8 py-16" style={{ background: C.goldLight }}>
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-6">
            <RoseGoldRule rose={C.rose} gold={C.gold} />
            <h2 style={{ ...fontDisplay, color: C.text }} className="text-3xl mt-4">Join Our Celebration</h2>
          </div>
          <div className="rounded-3xl p-6 sm:p-8" style={{ background: C.card, border: `1px solid ${C.border}` }}>
            <RSVPForm subEvents={subEvents} onSubmit={onRsvpSubmit}
              colors={{ button: C.rose, buttonText: '#FFFFFF', label: C.text, checkboxAccent: C.gold }}
              inputStyle="underline"
              successMessage="We're so glad you'll be celebrating with us! ❤️" />
          </div>
        </div>
      </section>

      {/* ── 7. FOOTER ────────────────────────────────────────────────── */}
      <footer className="px-4 py-10 text-center" style={{ borderTop: `1px solid ${C.border}` }}>
        <RoseGoldRule rose={C.rose} gold={C.gold} />
        <p style={{ ...fontDisplay, color: C.text }} className="text-2xl mt-4">{name1} & {name2}</p>
        {years && <p className="text-sm mt-1" style={{ color: C.muted }}>{years} Years Strong</p>}
        <DawatBranding show={branding.showDawatBranding} colors={{ text: C.muted }} />
      </footer>

      <ShareBar colors={{ bar: C.card, buttonText: C.text, button: C.rose, border: C.border }} floating />
    </div>
  )
}
