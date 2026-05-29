import type { Metadata } from 'next'
import Hero from '@/components/landing/Hero'
import HowItWorks from '@/components/landing/HowItWorks'
import TemplatesPreview from '@/components/landing/TemplatesPreview'
import Pricing from '@/components/landing/Pricing'
import Testimonials from '@/components/landing/Testimonials'
import Footer from '@/components/landing/Footer'

export const metadata: Metadata = {
  title: 'Dawatio — Invite with elegance',
  description: 'Create beautiful digital invitation websites for weddings, birthdays, and every celebration — in minutes. Free to start, no subscription.',
  alternates: { canonical: '/' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Dawatio',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Web',
  description: 'Create beautiful digital invitation websites for weddings, birthdays, and every celebration — in minutes.',
  url: 'https://dawatio.vercel.app',
  offers: [
    { '@type': 'Offer', name: 'Free', price: '0', priceCurrency: 'BDT' },
    { '@type': 'Offer', name: 'Basic', price: '299', priceCurrency: 'BDT' },
    { '@type': 'Offer', name: 'Wedding', price: '599', priceCurrency: 'BDT' },
    { '@type': 'Offer', name: 'Premium', price: '999', priceCurrency: 'BDT' },
  ],
}

export default function HomePage() {
  return (
    <main className='pt-20'>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <HowItWorks />
      <TemplatesPreview />
      <Testimonials />
      <Pricing />
      <Footer />
    </main>
  )
}
