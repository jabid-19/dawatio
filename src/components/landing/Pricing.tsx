'use client'

import { motion } from 'motion/react'
import { Check, X } from 'lucide-react'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import { stagger, fadeUp } from '@/lib/motion'

const PLANS = [
  {
    name: 'Free',
    price: '৳0',
    highlight: false,
    features: {
      'Create in advance': '7 days',
      'Save the Date page': false,
      'Events per invite': '1',
      'Edits after publish': '3',
      'Access after event': '7 days',
      'Premium templates': false,
      'Remove branding': false,
      'Custom domain': false,
      'RSVP management': 'Basic',
    },
  },
  {
    name: 'Basic',
    price: '৳299',
    highlight: false,
    features: {
      'Create in advance': '1 month',
      'Save the Date page': false,
      'Events per invite': '1',
      'Edits after publish': 'Unlimited',
      'Access after event': '1 month',
      'Premium templates': true,
      'Remove branding': false,
      'Custom domain': false,
      'RSVP management': 'Full',
    },
  },
  {
    name: 'Wedding',
    price: '৳599',
    highlight: true,
    features: {
      'Create in advance': '3 months',
      'Save the Date page': true,
      'Events per invite': '5',
      'Edits after publish': 'Unlimited',
      'Access after event': '3 months',
      'Premium templates': true,
      'Remove branding': true,
      'Custom domain': false,
      'RSVP management': 'Full',
    },
  },
  {
    name: 'Premium',
    price: '৳999',
    highlight: false,
    features: {
      'Create in advance': 'Anytime',
      'Save the Date page': true,
      'Events per invite': '5',
      'Edits after publish': 'Unlimited',
      'Access after event': '1 year',
      'Premium templates': true,
      'Remove branding': true,
      'Custom domain': true,
      'RSVP management': 'Full',
    },
  },
]

type FeatureValue = boolean | string

function FeatureCell({ value }: { value: FeatureValue }) {
  if (value === true) return <Check className="w-4 h-4 text-success mx-auto" />
  if (value === false) return <X className="w-4 h-4 text-ink-light mx-auto" />
  return <span className="text-xs text-ink-muted">{value}</span>
}

export default function Pricing() {
  const featureKeys = Object.keys(PLANS[0].features)

  return (
    <section id="pricing" className="py-24 px-4 bg-surface">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ visible: { transition: stagger } }}
        >
          <motion.p variants={fadeUp} className="text-accent text-sm font-medium tracking-wide uppercase mb-3">
            Pricing
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold text-ink mb-4">
            Simple, one-time pricing
          </motion.h2>
          <motion.p variants={fadeUp} className="text-ink-muted">
            Pay once per event. No subscriptions, no surprises.
          </motion.p>
        </motion.div>

        {/* Mobile: cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:hidden gap-6 mb-8">
          {PLANS.map((plan) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`rounded-2xl border p-6 ${
                plan.highlight ? 'border-accent bg-accent-light' : 'border-border bg-cream'
              }`}
            >
              {plan.highlight && (
                <span className="inline-block bg-accent text-white text-xs rounded-full px-3 py-0.5 mb-3 font-medium">
                  Most Popular
                </span>
              )}
              <h3 className="text-xl font-bold text-ink mb-1">{plan.name}</h3>
              <p className="text-3xl font-bold text-accent mb-4 font-mono">{plan.price}</p>
              <ul className="space-y-2">
                {featureKeys.map((key) => {
                  const val = plan.features[key as keyof typeof plan.features]
                  return (
                    <li key={key} className="flex items-center gap-3 text-sm">
                      {val === true ? (
                        <Check className="w-4 h-4 text-success shrink-0" />
                      ) : val === false ? (
                        <X className="w-4 h-4 text-ink-light shrink-0" />
                      ) : (
                        <Check className="w-4 h-4 text-success shrink-0" />
                      )}
                      <span className="text-ink-muted">
                        {key}{val !== true && val !== false && `: ${val}`}
                      </span>
                    </li>
                  )
                })}
              </ul>
              <Link href="/register" className="block mt-6">
                <Button variant={plan.highlight ? 'accent' : 'outline'} className="w-full justify-center">
                  Get started
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Desktop: table */}
        <motion.div
          className="hidden lg:block overflow-hidden rounded-2xl border border-border"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="text-left p-4 bg-cream font-semibold text-ink-muted w-48">Feature</th>
                {PLANS.map((plan) => (
                  <th
                    key={plan.name}
                    className={`p-4 text-center ${plan.highlight ? 'bg-accent-light' : 'bg-cream'}`}
                  >
                    {plan.highlight && (
                      <span className="inline-block bg-accent text-white text-xs rounded-full px-3 py-0.5 mb-2 font-medium">
                        Most Popular
                      </span>
                    )}
                    <div className="font-bold text-ink text-base">{plan.name}</div>
                    <div className="text-accent font-bold text-xl font-mono">{plan.price}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {featureKeys.map((key, i) => (
                <tr
                  key={key}
                  className={i % 2 === 0 ? 'bg-surface' : 'bg-cream/50'}
                >
                  <td className="p-4 text-ink-muted font-medium">{key}</td>
                  {PLANS.map((plan) => (
                    <td
                      key={plan.name}
                      className={`p-4 text-center ${plan.highlight ? 'bg-accent-light/40' : ''}`}
                    >
                      <FeatureCell value={plan.features[key as keyof typeof plan.features]} />
                    </td>
                  ))}
                </tr>
              ))}
              <tr className="bg-surface">
                <td className="p-4" />
                {PLANS.map((plan) => (
                  <td key={plan.name} className={`p-4 text-center ${plan.highlight ? 'bg-accent-light/40' : ''}`}>
                    <Link href="/register">
                      <Button
                        variant={plan.highlight ? 'accent' : 'outline'}
                        size="sm"
                        className="w-full justify-center"
                      >
                        Get started
                      </Button>
                    </Link>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  )
}
