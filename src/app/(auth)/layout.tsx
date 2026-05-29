import type { Metadata } from 'next'
import { ReactNode } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh grid grid-cols-1 lg:grid-cols-2">
      {/* Left panel */}
      <div className="bg-surface flex flex-col px-8 py-12 lg:px-16">
        <div className="mb-12">
          <Link href="/" className="inline-flex items-center justify-center bg-accent rounded-xl px-4 py-2">
            <Image src="/logo.png" alt="Dawatio" width={90} height={30} style={{ objectFit: 'contain' }} />
          </Link>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-[400px]">
            {children}
          </div>
        </div>
      </div>

      {/* Right decorative panel */}
      <div
        className="hidden lg:block relative overflow-hidden"
        style={{
          background: 'radial-gradient(ellipse at 60% 40%, #B05525 0%, #C9622F 60%, #8B3A1A 100%)',
        }}
      >
        {/* Circle 1 — gold, top-right */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{ width: 320, height: 320, backgroundColor: '#D4A853', opacity: 0.35, top: -60, right: -40 }}
        />
        {/* Circle 2 — white, bottom-left */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{ width: 200, height: 200, backgroundColor: 'white', opacity: 0.1, bottom: -30, left: -60 }}
        />
        {/* Circle 3 — accent-light, center */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{ width: 120, height: 120, backgroundColor: '#F5E8E0', opacity: 0.25, top: '40%', left: '30%' }}
        />
        {/* Circle 4 — gold, bottom-right area */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{ width: 80, height: 80, backgroundColor: '#D4A853', opacity: 0.5, bottom: 60, right: '20%' }}
        />
        {/* Circle 5 — blurred white, center-low */}
        <div
          className="absolute rounded-full pointer-events-none blur-2xl"
          style={{ width: 240, height: 240, backgroundColor: 'white', opacity: 0.08, top: '60%', left: '50%', transform: 'translate(-50%, -50%)' }}
        />

        {/* Tagline */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-12">
          <p
            className="text-white text-3xl text-center leading-snug"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            Beautiful invitations,<br />made simple
          </p>
          <div className="mt-6 opacity-50">
            <Image src="/logo.png" alt="Dawatio" width={80} height={28} style={{ objectFit: 'contain' }} />
          </div>
        </div>
      </div>
    </div>
  )
}
