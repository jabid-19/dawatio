import Templates from '@/components/landing/Templates'
import Footer from '@/components/landing/Footer'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Digital Invitation Templates',
  description: 'Browse 30+ beautiful templates for weddings, birthdays, Eid, engagements and more. Free and premium designs — ready in minutes.',
  alternates: { canonical: '/templates' },
}

export default function TemplatesPage() {
  return (
    <main>
      <Templates />
      <Footer />
    </main>
  )
}
