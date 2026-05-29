'use client'

import { motion } from 'motion/react'
import { Star } from 'lucide-react'
import { stagger, fadeUp } from '@/lib/motion'

const TESTIMONIALS = [
  {
    name: 'Tasnim Hossain',
    role: 'Bride, Dhaka',
    quote: "Dawatio made our wedding invitations so beautiful! Everyone kept asking how we made such a gorgeous invite. Our guests loved being able to RSVP directly.",
    rating: 5,
  },
  {
    name: 'Arif Mahmud',
    role: 'Event organizer, Chittagong',
    quote: "I've organized dozens of events and this is the easiest invitation tool I've used. The WhatsApp sharing feature is perfect for Bangladeshi families.",
    rating: 5,
  },
  {
    name: 'Sumaiya Karim',
    role: 'Mom, Sylhet',
    quote: "Used Dawatio for my son's birthday party. Created the invite in under 10 minutes. The confetti template was a hit with all the kids!",
    rating: 5,
  },
]

export default function Testimonials() {
  return (
    <section className="py-24 px-4 bg-cream">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ visible: { transition: stagger } }}
        >
          <motion.p variants={fadeUp} className="text-accent text-sm font-medium tracking-wide uppercase mb-3">
            Testimonials
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold text-ink">
            Loved by families across Bangladesh
          </motion.h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={{ visible: { transition: stagger } }}
        >
          {TESTIMONIALS.map((t) => (
            <motion.div
              key={t.name}
              variants={fadeUp}
              whileHover={{ y: -2 }}
              className="bg-surface rounded-2xl p-6 border border-border"
            >
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
              </div>
              <p className="text-ink-muted text-sm leading-relaxed mb-6">&ldquo;{t.quote}&rdquo;</p>
              <div>
                <p className="font-semibold text-ink text-sm">{t.name}</p>
                <p className="text-xs text-ink-muted">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
