import Hero from '@/components/landing/Hero'
import HowItWorks from '@/components/landing/HowItWorks'
import TemplatesPreview from '@/components/landing/TemplatesPreview'
import Pricing from '@/components/landing/Pricing'
import Testimonials from '@/components/landing/Testimonials'
import Footer from '@/components/landing/Footer'

export default function HomePage() {
  return (
    <main className='pt-20'>
      <Hero />
      <HowItWorks />
      <TemplatesPreview />
      <Testimonials />
      <Pricing />
      <Footer />
    </main>
  )
}
