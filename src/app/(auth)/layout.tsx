import type { Metadata } from 'next'
import { ReactNode } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Check } from 'lucide-react'

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

const invitationCards = [
  {
    title: 'Wedding Ceremony',
    subtitle: 'June 14, 2026 · Garden Venue',
    topColor: 'from-rose-400 to-pink-500',
    rotate: '-rotate-6',
    offset: '-translate-x-8 translate-y-2',
  },
  {
    title: 'Birthday Bash',
    subtitle: 'July 4, 2026 · Rooftop Lounge',
    topColor: 'from-amber-400 to-orange-500',
    rotate: 'rotate-0',
    offset: 'translate-x-0 -translate-y-4',
  },
  {
    title: 'Dinner Party',
    subtitle: 'Aug 20, 2026 · Private Dining',
    topColor: 'from-violet-400 to-purple-500',
    rotate: 'rotate-6',
    offset: 'translate-x-8 translate-y-2',
  },
]

const features = [
  '50+ gorgeous templates',
  'Share with one link',
  'Free to get started',
]

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh grid grid-cols-1 lg:grid-cols-2">
      {/* Left panel */}
      <div
        className="flex flex-col px-8 py-12 lg:px-16 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #ffffff 0%, #FAF8F4 100%)' }}
      >
        {/* Subtle decorative corner blobs */}
        <div
          className="absolute -top-16 -left-16 w-48 h-48 rounded-full pointer-events-none"
          style={{ backgroundColor: '#F5E8E0', opacity: 0.5 }}
        />
        <div
          className="absolute -bottom-12 -right-12 w-40 h-40 rounded-full pointer-events-none"
          style={{ backgroundColor: '#F5E8E0', opacity: 0.35 }}
        />

        <div className="mb-12 relative z-10">
          <Link href="/" className="inline-flex items-center justify-center">
            <Image src="/logo.png" alt="Dawatio" width={90} height={30} style={{ objectFit: 'contain' }} />
          </Link>
        </div>
        <div className="flex-1 flex items-center justify-center relative z-10">
          <div className="w-full max-w-[400px]">
            {children}
          </div>
        </div>
      </div>

      {/* Right decorative panel */}
      <div
        className="hidden lg:flex flex-col items-center justify-center relative overflow-hidden px-12"
        style={{
          background: 'radial-gradient(ellipse at 60% 40%, #B05525 0%, #C9622F 60%, #8B3A1A 100%)',
        }}
      >
        {/* Ambient glow */}
        <div
          className="absolute rounded-full pointer-events-none blur-3xl"
          style={{ width: 400, height: 400, backgroundColor: '#D4A853', opacity: 0.15, top: '10%', right: '-10%' }}
        />
        <div
          className="absolute rounded-full pointer-events-none blur-3xl"
          style={{ width: 300, height: 300, backgroundColor: '#F5E8E0', opacity: 0.1, bottom: '5%', left: '-5%' }}
        />

        {/* Stacked invitation card mockups */}
        <div className="relative flex items-center justify-center mb-10" style={{ height: 160, width: 280 }}>
          {invitationCards.map((card, i) => (
            <div
              key={i}
              className={`absolute w-52 rounded-2xl overflow-hidden shadow-2xl ${card.rotate} ${card.offset}`}
              style={{
                background: 'rgba(255,255,255,0.12)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.2)',
                zIndex: i + 1,
              }}
            >
              {/* Card top color bar */}
              <div className={`h-2 bg-linear-to-r ${card.topColor}`} />
              {/* Card body */}
              <div className="px-4 py-3">
                <p className="text-white text-sm font-semibold leading-tight" style={{ fontFamily: 'var(--font-playfair)' }}>
                  {card.title}
                </p>
                <p className="text-white/60 text-xs mt-0.5">{card.subtitle}</p>
                {/* Decorative lines */}
                <div className="mt-3 space-y-1.5">
                  <div className="h-1 rounded-full bg-white/20 w-full" />
                  <div className="h-1 rounded-full bg-white/20 w-3/4" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tagline */}
        <p
          className="text-white text-3xl text-center leading-snug mb-6"
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          Beautiful invitations,<br />made simple
        </p>

        {/* Feature bullets */}
        <ul className="space-y-2">
          {features.map((f) => (
            <li key={f} className="flex items-center gap-3 text-white/80 text-sm">
              <span className="shrink-0 w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                <Check className="w-3 h-3 text-white" strokeWidth={2.5} />
              </span>
              {f}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
