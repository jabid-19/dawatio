'use client'

import { motion } from 'motion/react'
import { PenSquare, Palette, Share2 } from 'lucide-react'
import { stagger, fadeUp } from '@/lib/motion'

const STEPS = [
  {
    number: '01',
    icon: PenSquare,
    title: 'Create',
    description: 'Choose your event type — wedding, birthday, or any celebration. Set the date, venue, and details.',
  },
  {
    number: '02',
    icon: Palette,
    title: 'Customize',
    description: 'Pick a beautiful template, add photos, and set up your sub-events for multi-day celebrations.',
  },
  {
    number: '03',
    icon: Share2,
    title: 'Share',
    description: 'Send your personalized link via WhatsApp, copy it anywhere, or show a QR code.',
  },
]

export default function HowItWorks() {
  return (
    <section className="py-24 px-4 bg-surface">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ visible: { transition: stagger } }}
        >
          <motion.p variants={fadeUp} className="text-accent text-sm font-medium tracking-wide uppercase mb-3">
            How it works
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-3xl sm:text-4xl font-bold text-ink"
          >
            Three steps to a perfect invitation
          </motion.h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={{ visible: { transition: stagger } }}
        >
          {STEPS.map((step) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.number}
                variants={fadeUp}
                className="flex flex-col items-start gap-4 p-8 rounded-2xl bg-cream border border-border"
              >
                <div className="flex items-start justify-between w-full">
                  <span
                    className="text-5xl font-bold text-accent/20 leading-none"
                    style={{ fontFamily: 'var(--font-playfair)' }}
                  >
                    {step.number}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-accent-light flex items-center justify-center">
                    <Icon className="w-5 h-5 text-accent" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-ink">{step.title}</h3>
                <p className="text-ink-muted leading-relaxed text-sm">{step.description}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
