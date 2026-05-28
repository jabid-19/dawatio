'use client'

import { motion } from 'motion/react'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import { Sparkles, Star } from 'lucide-react'
import { stagger, fadeUp } from '@/lib/motion'

const AVATARS = [
  { bg: 'linear-gradient(135deg, #C9622F 0%, #D4A853 100%)' },
  { bg: 'linear-gradient(135deg, #E85D9A 0%, #F8A97A 100%)' },
  { bg: 'linear-gradient(135deg, #2D1B69 0%, #9B59B6 100%)' },
]

const TAGS = ['Wedding', 'Birthday', 'Engagement', 'Anniversary', 'Graduation']

function CenterInviteCard() {
  const NUM_RINGS = 7
  const DURATION = 5.5
  return (
    <svg
      viewBox="0 0 300 400"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="weddingBg" x1="0%" y1="0%" x2="60%" y2="100%">
          <stop offset="0%" stopColor="#C9622F" />
          <stop offset="55%" stopColor="#D4A853" />
          <stop offset="100%" stopColor="#E8C87A" />
        </linearGradient>
      </defs>
      <rect width="300" height="400" fill="url(#weddingBg)" />
      {Array.from({ length: NUM_RINGS }, (_, i) => (
        <motion.circle
          key={i}
          cx="150" cy="185"
          fill="none" stroke="white" strokeWidth="0.9"
          animate={{ r: [8, 168], strokeOpacity: [0.32, 0] }}
          transition={{
            duration: DURATION,
            repeat: Infinity,
            delay: i * (DURATION / NUM_RINGS),
            ease: [0.2, 0, 0.8, 1],
          }}
        />
      ))}
      <text x="150" y="52" textAnchor="middle" fill="white" fillOpacity="0.55"
        fontSize="8" letterSpacing="3" fontFamily="system-ui, sans-serif">
        WEDDING INVITATION
      </text>
      <text x="150" y="152" textAnchor="middle" fill="white"
        fontSize="38" fontWeight="700" fontFamily="Georgia, 'Playfair Display', serif">
        Nadia
      </text>
      <text x="150" y="185" textAnchor="middle" fill="white" fillOpacity="0.55"
        fontSize="18" fontWeight="300" fontFamily="Georgia, 'Playfair Display', serif">
        &amp;
      </text>
      <text x="150" y="222" textAnchor="middle" fill="white"
        fontSize="38" fontWeight="700" fontFamily="Georgia, 'Playfair Display', serif">
        Rafiq
      </text>
      <text x="150" y="262" textAnchor="middle" fill="white" fillOpacity="0.8"
        fontSize="10" letterSpacing="1.5" fontFamily="system-ui, sans-serif">
        December 14, 2025
      </text>
      <text x="150" y="280" textAnchor="middle" fill="white" fillOpacity="0.5"
        fontSize="8.5" fontFamily="system-ui, sans-serif">
        The Grand Ballroom, Dhaka
      </text>
      <line x1="80" y1="358" x2="220" y2="358" stroke="white" strokeOpacity="0.2" strokeWidth="0.8" />
      <text x="150" y="374" textAnchor="middle" fill="white" fillOpacity="0.3"
        fontSize="7.5" letterSpacing="3" fontFamily="system-ui, sans-serif">
        DAWAT.APP
      </text>
    </svg>
  )
}

function BirthdayCard() {
  const spokes = Array.from({ length: 24 }, (_, i) => (i * 360) / 24)
  return (
    <svg
      viewBox="0 0 400 300"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="birthdayBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E85D9A" />
          <stop offset="100%" stopColor="#F5C842" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#birthdayBg)" />
      <motion.g
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        animate={{ rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
      >
        {spokes.map((deg, i) => {
          const rad = (deg * Math.PI) / 180
          const x1 = 200 + Math.cos(rad) * 55
          const y1 = 150 + Math.sin(rad) * 55
          const x2 = 200 + Math.cos(rad) * 195
          const y2 = 150 + Math.sin(rad) * 195
          return (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
              stroke="white" strokeOpacity={i % 2 === 0 ? 0.22 : 0.12} strokeWidth="1" />
          )
        })}
      </motion.g>
      <text x="200" y="95" textAnchor="middle" fill="white" fillOpacity="0.6"
        fontSize="14" letterSpacing="3" fontFamily="system-ui, sans-serif">
        BIRTHDAY PARTY
      </text>
      <text x="200" y="142" textAnchor="middle" fill="white"
        fontSize="30" fontWeight="700" fontFamily="Georgia, 'Playfair Display', serif">
        Aryan&apos;s
      </text>
      <text x="200" y="174" textAnchor="middle" fill="white"
        fontSize="28" fontWeight="700" fontFamily="Georgia, 'Playfair Display', serif">
        25th Birthday
      </text>
      <text x="200" y="204" textAnchor="middle" fill="white" fillOpacity="0.75"
        fontSize="9.5" letterSpacing="1.5" fontFamily="system-ui, sans-serif">
        January 5, 2026
      </text>
    </svg>
  )
}

function EngagementCard() {
  return (
    <svg
      viewBox="0 0 400 300"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="engagementBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2D1B69" />
          <stop offset="100%" stopColor="#7B5EA7" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#engagementBg)" />
      <motion.circle cx="168" cy="148" r="82" fill="white" stroke="white" strokeWidth="1.5"
        animate={{ fillOpacity: [0.03, 0.1, 0.03], strokeOpacity: [0.25, 0.55, 0.25] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }} />
      <motion.circle cx="232" cy="148" r="82" fill="white" stroke="white" strokeWidth="1.5"
        animate={{ fillOpacity: [0.03, 0.1, 0.03], strokeOpacity: [0.25, 0.55, 0.25] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1.75 }} />
      <text x="200" y="68" textAnchor="middle" fill="white" fillOpacity="0.55"
        fontSize="16" letterSpacing="3" fontFamily="system-ui, sans-serif">
        ENGAGEMENT
      </text>
      <text x="200" y="140" textAnchor="middle" fill="white"
        fontSize="32" fontWeight="700" fontFamily="Georgia, 'Playfair Display', serif">
        Hasan
      </text>
      <text x="200" y="168" textAnchor="middle" fill="white" fillOpacity="0.55"
        fontSize="18" fontWeight="300" fontFamily="Georgia, 'Playfair Display', serif">
        &amp; Mitu
      </text>
      <text x="200" y="218" textAnchor="middle" fill="white" fillOpacity="0.75"
        fontSize="9.5" letterSpacing="1.5" fontFamily="system-ui, sans-serif">
        February 20, 2026
      </text>
    </svg>
  )
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-cream">
      <div
        className="absolute inset-0 pointer-events-none"
       
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: stagger } }}
        >
          <motion.h1
            variants={fadeUp}
            className="text-5xl sm:text-6xl lg:text-[72px] font-bold text-accent leading-[1.1] tracking-tight"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            Celebrate Every Moment
          </motion.h1>
          <motion.h2
            variants={fadeUp}
            className="flex flex-wrap items-center justify-center gap-3 text-5xl sm:text-6xl lg:text-[72px] font-bold text-gray-600 leading-[1.1] tracking-tight mt-1"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            The Digital Invitation Studio
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.7fr_1fr] gap-6 lg:gap-10 items-start">

          <motion.div
            className="flex flex-col lg:pt-10"
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <p className="text-ink-muted leading-relaxed mb-8 text-base max-w-xs">
              Create beautiful digital invitation websites for weddings, birthdays, and every
              celebration — in minutes.
            </p>
            <Link href="/register" className="self-start mb-10">
              <Button size="lg">Create Free Invite</Button>
            </Link>
            <div className="flex items-center gap-3 mb-7">
              <div className="flex">
                {AVATARS.map((av, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-[2.5px] border-cream shadow-sm"
                    style={{
                      background: av.bg,
                      marginLeft: i === 0 ? 0 : '-10px',
                      position: 'relative',
                      zIndex: 10 + i,
                    }}
                  />
                ))}
              </div>
              <div>
                <div className="font-bold text-ink text-lg leading-none">4K +</div>
                <div className="text-ink-muted text-xs mt-0.5">Invitations Sent</div>
              </div>
            </div>
            <p className="text-ink text-sm font-medium mb-2.5">Perfect for:</p>
            <div className="flex flex-wrap gap-2">
              {TAGS.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 rounded-full border border-border bg-surface text-ink-muted text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div
              className="relative w-full overflow-hidden border-2 border-ink/10"
              style={{
                borderRadius: '9999px 9999px 28px 28px',
                aspectRatio: '3/4',
                // boxShadow: '0 24px 64px rgba(26,23,20,0.18)',
              }}
            >
              <CenterInviteCard />
            </div>
            <motion.div
              className="absolute bottom-5 left-4 right-4 rounded-2xl p-3.5"
              style={{
                background: 'rgba(255,255,255,0.9)',
                backdropFilter: 'blur(12px)',
                // boxShadow: '0 8px 32px rgba(26,23,20,0.14)',
              }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.65 }}
            >
              <div className="flex items-start gap-3">
                <div
                  className="w-9 h-9 rounded-full shrink-0"
                  style={{ background: 'linear-gradient(135deg, #C9622F, #D4A853)' }}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-ink text-xs leading-snug mb-1.5">
                    &ldquo;Absolutely stunning! All my guests loved it.&rdquo;
                  </p>
                  <div className="flex items-center gap-0.5 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-gold text-gold" />
                    ))}
                  </div>
                  <p className="text-ink-muted text-[11px] font-medium">Nadia · Bride from Bangladesh</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="hidden lg:flex flex-col gap-5 pt-8"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div
              className="w-full overflow-hidden rounded-3xl"
              style={{ aspectRatio: '4/3' }}
            >
              <BirthdayCard />
            </div>
            <div
              className="w-full overflow-hidden rounded-3xl"
              style={{ aspectRatio: '4/3' }}
            >
              <EngagementCard />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
