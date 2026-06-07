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

const fontDisplay = { fontFamily: 'var(--font-eb-garamond, "EB Garamond", serif)' }
const fontBody = { fontFamily: 'var(--font-poppins, "Poppins", sans-serif)' }

function OrnamentalDivider({ gold }: { gold: string }) {
  return (
    <div className="flex items-center justify-center gap-3 my-2">
      <div className="h-px flex-1" style={{ background: gold, opacity: 0.5 }} />
      <svg viewBox="0 0 80 20" className="w-20 h-5" fill={gold}>
        <path d="M40 10 L35 2 L30 10 L35 18 Z" />
        <path d="M40 10 L45 2 L50 10 L45 18 Z" />
        <circle cx="40" cy="10" r="3" />
        <circle cx="20" cy="10" r="2" />
        <circle cx="60" cy="10" r="2" />
        <line x1="0" y1="10" x2="17" y2="10" stroke={gold} strokeWidth="1" />
        <line x1="63" y1="10" x2="80" y2="10" stroke={gold} strokeWidth="1" />
      </svg>
      <div className="h-px flex-1" style={{ background: gold, opacity: 0.5 }} />
    </div>
  )
}

function OrnateFrame({ children, gold }: { children: React.ReactNode; gold: string }) {
  return (
    <div className="relative p-4 @sm:p-8 @md:p-12">
      {['top-0 left-0', 'top-0 right-0 rotate-90', 'bottom-0 right-0 rotate-180', 'bottom-0 left-0 -rotate-90'].map((pos, i) => (
        <svg key={i} viewBox="0 0 40 40" className={`absolute w-10 h-10 ${pos}`} fill={gold} opacity="0.5">
          <path d="M0 0 L15 0 L15 3 L3 3 L3 15 L0 15 Z" />
          <rect x="5" y="5" width="3" height="3" />
        </svg>
      ))}
      <div className="absolute inset-x-10 top-0 h-px" style={{ background: gold, opacity: 0.4 }} />
      <div className="absolute inset-x-10 bottom-0 h-px" style={{ background: gold, opacity: 0.4 }} />
      <div className="absolute inset-y-10 left-0 w-px" style={{ background: gold, opacity: 0.4 }} />
      <div className="absolute inset-y-10 right-0 w-px" style={{ background: gold, opacity: 0.4 }} />
      {children}
    </div>
  )
}

export default function RoyalTemplate({ event, branding, onRsvpSubmit, colors, disableEffects: _disableEffects }: TemplateProps) {
  const C = {
    bg:       colors?.bg        ?? '#F9F5F0',
    primary:  colors?.primary   ?? '#5B2C6F',
    secondary: colors?.secondary ?? '#D4A853',
    accent:   colors?.primary   ?? '#8B1A2B',
    gold:     colors?.secondary ?? '#C9A84C',
    text:     colors?.text      ?? '#2C1810',
    muted:    colors?.muted     ?? '#7A6B62',
    card:     '#FFFFFF',
  }
  const { coupleNames, title, eventDate, subEvents, description, gallery, coverImage, sections } = event
  const placeholders = PLACEHOLDER_IMAGES.wedding

  const name1 = coupleNames?.partner1 ?? title.split('&')[0]?.trim() ?? 'Partner 1'
  const name2 = coupleNames?.partner2 ?? title.split('&')[1]?.trim().split(' ')[0] ?? 'Partner 2'

  return (
    <div style={{ background: C.bg, color: C.text, ...fontBody }} className="@container min-h-screen overflow-x-hidden">
      {/* Geometric background pattern */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Cpolygon points='30,5 55,20 55,40 30,55 5,40 5,20' fill='none' stroke='%235B2C6F' stroke-width='1'/%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* ── 1. ROYAL HERO ─────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 @sm:px-8 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="w-full max-w-2xl mx-auto"
        >
          <OrnateFrame gold={C.gold}>
            <div className="text-center">
              <p
                style={{ ...fontDisplay, color: C.gold }}
                className="text-sm italic mb-4"
              >
                In the name of God, Most Gracious, Most Merciful
              </p>
              <OrnamentalDivider gold={C.gold} />

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                style={{ ...fontDisplay, color: C.text }}
                className="text-4xl @sm:text-6xl mt-6"
              >
                {name1}
              </motion.h1>

              <p style={{ ...fontDisplay, color: C.muted }} className="my-3 text-base italic">
                cordially invite you to their wedding with
              </p>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                style={{ ...fontDisplay, color: C.text }}
                className="text-4xl @sm:text-6xl"
              >
                {name2}
              </motion.h1>

              <OrnamentalDivider gold={C.gold} />

              <p className="mt-4 text-sm uppercase tracking-widest" style={{ color: C.muted }}>
                {new Date(eventDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
              {subEvents[0] && (
                <p className="mt-1 text-sm" style={{ color: C.muted }}>{subEvents[0].venue}</p>
              )}
            </div>
          </OrnateFrame>
        </motion.div>
      </section>

      {/* ── 2. COUNTDOWN ─────────────────────────────────────────────── */}
      {sections.countdown !== false && (
        <section className="px-4 py-12" style={{ background: C.card }}>
          <OrnamentalDivider gold={C.gold} />
          <div className="max-w-2xl mx-auto mt-8">
            <CountdownTimer
              targetDate={eventDate}
              boxStyle="boxed"
              colors={{ box: C.bg, number: C.primary, label: C.muted, border: '#E8D5B8' }}
            />
          </div>
          <OrnamentalDivider gold={C.gold} />
        </section>
      )}

      {/* ── 3. CEREMONIES ────────────────────────────────────────────── */}
      {sections.schedule !== false && subEvents.length > 0 && (
        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={viewport}
          variants={staggerContainer}
          className="px-4 @sm:px-8 py-20 max-w-3xl mx-auto"
        >
          <motion.div variants={staggerItem} className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.3em] mb-2" style={{ color: C.muted }}>Schedule</p>
            <OrnamentalDivider gold={C.gold} />
            <h2 style={{ ...fontDisplay, color: C.text }} className="text-3xl @sm:text-4xl mt-4">
              The Ceremonies
            </h2>
          </motion.div>

          <div className="flex flex-col gap-6">
            {subEvents.map((se) => (
              <motion.div
                key={se.id}
                variants={staggerItem}
                className="rounded-2xl p-6 relative"
                style={{
                  background: C.card,
                  border: `1px solid #E8D5B8`,
                  boxShadow: '0 2px 16px rgba(91, 44, 111, 0.05)',
                }}
              >
                {/* Gold corner flourish */}
                <div className="absolute top-3 right-3 w-6 h-6">
                  <svg viewBox="0 0 20 20" fill={C.gold} opacity="0.5">
                    <path d="M20 0 L20 8 L17 8 L17 3 L12 3 L12 0 Z" />
                    <rect x="14" y="5" width="3" height="3" />
                  </svg>
                </div>
                <h3 style={{ ...fontDisplay, color: C.primary }} className="text-2xl mb-3">{se.name}</h3>
                <p className="text-sm" style={{ color: C.muted }}>{se.date} · {se.time}</p>
                <p className="text-sm flex items-center gap-1 mt-1" style={{ color: C.muted }}>
                  <MapPin className="w-3.5 h-3.5" style={{ color: C.gold }} />
                  {se.venue}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}

      {/* ── 4. BLESSINGS ─────────────────────────────────────────────── */}
      {sections.about !== false && (
        <section className="px-4 @sm:px-8 py-20" style={{ background: C.card }}>
          <OrnamentalDivider gold={C.gold} />
          <div className="max-w-2xl mx-auto text-center py-8">
            <p style={{ ...fontDisplay, color: C.gold }} className="text-5xl opacity-30">&ldquo;</p>
            <p style={{ ...fontDisplay, color: C.text }} className="text-xl @sm:text-2xl italic leading-relaxed -mt-4">
              {description || 'May this union be blessed with love, respect, and joy that lasts a lifetime. We are honored to share this occasion with you.'}
            </p>
            <p className="mt-4 text-sm" style={{ color: C.muted }}>— With blessings</p>
          </div>
          <OrnamentalDivider gold={C.gold} />
        </section>
      )}

      {/* ── 5. GALLERY ───────────────────────────────────────────────── */}
      {sections.gallery !== false && (
        <section className="px-4 @sm:px-8 py-20 max-w-4xl mx-auto">
          <div className="max-w-lg mx-auto mb-10">
            <CoverPhoto src={coverImage} fallback={placeholders.cover} alt={title} shape="landscape" />
          </div>
          <div className="text-center mb-10">
            <OrnamentalDivider gold={C.gold} />
            <h2 style={{ ...fontDisplay, color: C.text }} className="text-3xl mt-4">Gallery</h2>
          </div>
          <Gallery images={gallery} fallbackImages={placeholders.gallery} variant="grid" columns={3} colors={{ border: C.gold }} />
        </section>
      )}

      {/* ── 6. RSVP ──────────────────────────────────────────────────── */}
      {sections.rsvp !== false && (
        <section className="px-4 @sm:px-8 py-20" style={{ background: '#F2EBF7' }}>
          <div className="max-w-lg mx-auto">
            <div className="text-center mb-8">
              <OrnamentalDivider gold={C.gold} />
              <h2 style={{ ...fontDisplay, color: C.text }} className="text-3xl @sm:text-4xl mt-4">
                Grace Us With Your Presence
              </h2>
            </div>

            <OrnateFrame gold={C.gold}>
              <RSVPForm
                subEvents={subEvents}
                onSubmit={onRsvpSubmit}
                colors={{
                  button: C.primary,
                  buttonText: C.gold,
                  label: C.text,
                  checkboxAccent: C.gold,
                  successText: C.text,
                }}
                inputStyle="bordered"
                successMessage="We are honored by your response. See you there."
              />
            </OrnateFrame>
          </div>
        </section>
      )}

      {/* ── 7. FOOTER ────────────────────────────────────────────────── */}
      <footer className="px-6 py-10 text-center" style={{ borderTop: `1px solid #E8D5B8` }}>
        <OrnamentalDivider gold={C.gold} />
        <div
          className="w-16 h-16 rounded-full border-2 flex items-center justify-center mx-auto mt-4"
          style={{ borderColor: C.gold }}
        >
          <span style={{ ...fontDisplay, color: C.primary }} className="text-xl">
            {name1[0]}{name2[0]}
          </span>
        </div>
        <p style={{ ...fontDisplay, color: C.text }} className="text-2xl mt-3">{name1} & {name2}</p>
        <p className="text-sm mt-1" style={{ color: C.muted }}>
          {new Date(eventDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
        <p className="text-xs mt-2 italic" style={{ color: C.muted }}>May God bless this union</p>
        <DawatBranding show={branding.showDawatBranding} colors={{ text: C.muted, border: '#E8D5B8' }} />
      </footer>

      <ShareBar colors={{ bar: C.bg, buttonText: C.text, button: C.primary, border: '#E8D5B8' }} floating />
    </div>
  )
}
