import type { Metadata } from 'next'
import {
  Playfair_Display, DM_Sans, DM_Mono,
  Noto_Naskh_Arabic, Noto_Sans_Arabic,
  Poppins, Open_Sans,
  Crimson_Pro,
  Varela_Round, Nunito_Sans,
  Great_Vibes, Cormorant_Garamond,
  Outfit, Libre_Baskerville, Space_Grotesk,
  Lora, EB_Garamond, Fredoka, Quicksand,
  Inter, Josefin_Sans, Rubik, Raleway,
  Syne, Source_Serif_4, Source_Sans_3,
  Plus_Jakarta_Sans, Bodoni_Moda, Montserrat,
  Lato, Amiri, Merriweather,
} from 'next/font/google'
import { Toaster } from 'sonner'
import { AuthProvider } from '@/lib/auth-context'
import './globals.css'

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  display: 'swap',
})

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  display: 'swap',
})

const dmMono = DM_Mono({
  variable: '--font-dm-mono',
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
})

const notoNaskhArabic = Noto_Naskh_Arabic({
  variable: '--font-noto-naskh',
  subsets: ['arabic'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

const notoSansArabic = Noto_Sans_Arabic({
  variable: '--font-noto-sans-arabic',
  subsets: ['arabic'],
  weight: ['300', '400', '500', '700'],
  display: 'swap',
})

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

const openSans = Open_Sans({
  variable: '--font-open-sans',
  subsets: ['latin'],
  display: 'swap',
})

const crimsonPro = Crimson_Pro({
  variable: '--font-crimson',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

const varelaRound = Varela_Round({
  variable: '--font-varela',
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
})

const nunitoSans = Nunito_Sans({
  variable: '--font-nunito',
  subsets: ['latin'],
  display: 'swap',
})

const greatVibes = Great_Vibes({
  variable: '--font-great-vibes',
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
})

const cormorantGaramond = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin'],
  display: 'swap',
})

const libreBaskerville = Libre_Baskerville({
  variable: '--font-libre-baskerville',
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  display: 'swap',
})

const lora = Lora({
  variable: '--font-lora',
  subsets: ['latin'],
  display: 'swap',
})

const ebGaramond = EB_Garamond({
  variable: '--font-eb-garamond',
  subsets: ['latin'],
  display: 'swap',
})

const fredoka = Fredoka({
  variable: '--font-fredoka',
  subsets: ['latin'],
  display: 'swap',
})

const quicksand = Quicksand({
  variable: '--font-quicksand',
  subsets: ['latin'],
  display: 'swap',
})

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

const josefinSans = Josefin_Sans({
  variable: '--font-josefin',
  subsets: ['latin'],
  display: 'swap',
})

const rubik = Rubik({
  variable: '--font-rubik',
  subsets: ['latin'],
  display: 'swap',
})

const raleway = Raleway({
  variable: '--font-raleway',
  subsets: ['latin'],
  display: 'swap',
})

const syne = Syne({
  variable: '--font-syne',
  subsets: ['latin'],
  display: 'swap',
})

const sourceSerif4 = Source_Serif_4({
  variable: '--font-source-serif',
  subsets: ['latin'],
  display: 'swap',
})

const sourceSans3 = Source_Sans_3({
  variable: '--font-source-sans',
  subsets: ['latin'],
  display: 'swap',
})

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: '--font-plus-jakarta',
  subsets: ['latin'],
  display: 'swap',
})

const bodoniModa = Bodoni_Moda({
  variable: '--font-bodoni',
  subsets: ['latin'],
  display: 'swap',
})

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
  display: 'swap',
})

const lato = Lato({
  variable: '--font-lato',
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  display: 'swap',
})

const amiri = Amiri({
  variable: '--font-amiri',
  subsets: ['latin', 'arabic'],
  weight: ['400', '700'],
  display: 'swap',
})

const merriweather = Merriweather({
  variable: '--font-merriweather',
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Dawat — Invite with elegance',
  description: 'Create beautiful digital invitation websites for weddings, birthdays, and every celebration — in minutes.',
}

const fontVars = [
  playfair.variable, dmSans.variable, dmMono.variable,
  notoNaskhArabic.variable, notoSansArabic.variable,
  poppins.variable, openSans.variable,
  crimsonPro.variable,
  varelaRound.variable, nunitoSans.variable,
  greatVibes.variable, cormorantGaramond.variable,
  outfit.variable, libreBaskerville.variable, spaceGrotesk.variable,
  lora.variable, ebGaramond.variable, fredoka.variable, quicksand.variable,
  inter.variable, josefinSans.variable, rubik.variable, raleway.variable,
  syne.variable, sourceSerif4.variable, sourceSans3.variable,
  plusJakartaSans.variable, bodoniModa.variable, montserrat.variable,
  lato.variable, amiri.variable, merriweather.variable,
].join(' ')

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fontVars}>
      <body>
        <AuthProvider>
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: { fontFamily: 'var(--font-dm-sans, sans-serif)' },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  )
}
