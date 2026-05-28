import type { Metadata } from 'next'
import Pricing from '@/components/landing/Pricing'
import Footer from '@/components/landing/Footer'

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Simple one-time pricing for digital invitation websites. Free plan available. Wedding packages from ৳599. No subscriptions, no surprises.',
  alternates: { canonical: '/pricing' },
}

export default function PricingPage() {
  return (
    <main>
      <h1 className="sr-only">Simple Pricing for Digital Invitations</h1>
      <Pricing />
      <Footer />
    </main>
  )
}
