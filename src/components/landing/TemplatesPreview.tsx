'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import { Lock, Eye } from 'lucide-react'
import Link from 'next/link'
import { TEMPLATES, Template, DawatEvent } from '@/lib/dummy-data'
import { easeOut } from '@/lib/motion'
import { TemplateRenderer, getPreviewEvent } from '@/lib/template-utils'
import { TemplatePreviewSheet } from '@/components/create/TemplatePreviewSheet'

type PreviewState = { template: Template; event: DawatEvent } | null

const THUMB_SCALE = 0.77
const PREVIEW_COUNT = 6

export default function TemplatesPreview() {
  const [preview, setPreview] = useState<PreviewState>(null)
  const [selectedScheme, setSelectedScheme] = useState(1)

  function openPreview(template: Template, event: DawatEvent) {
    setSelectedScheme(1)
    setPreview({ template, event })
  }

  const shown = TEMPLATES.slice(0, PREVIEW_COUNT)

  return (
    <section className="relative py-24 px-4 bg-cream overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.35] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #C9622F 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="relative max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: easeOut }}
        >
          <p className="text-accent text-sm font-medium tracking-wide uppercase mb-3">Templates</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-ink mb-4">
            Beautiful templates for every occasion
          </h2>
          <p className="text-ink-muted text-sm">Choose from {TEMPLATES.length} designs — free and premium</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {shown.map((template, i) => {
            const cardEvent = getPreviewEvent(template)
            return (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05, ease: easeOut }}
                whileHover={{ scale: 1.02, y: -3 }}
                className="relative group rounded-2xl overflow-hidden shadow-(--shadow-card) bg-surface cursor-pointer"
              >
                <div className="h-72 relative overflow-hidden bg-white">
                  <div
                    className="absolute top-0 left-0 origin-top-left pointer-events-none select-none"
                    style={{ width: '390px', transform: `scale(${THUMB_SCALE})` }}
                  >
                    <TemplateRenderer event={cardEvent} disableEffects />
                  </div>

                  <div className="absolute inset-0 bg-black/55 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center gap-3">
                    <button
                      onClick={() => openPreview(template, cardEvent)}
                      className="cursor-pointer flex items-center gap-2 border border-white/70 text-white text-sm font-medium px-5 py-2 rounded-full hover:bg-white/10 transition-colors"
                    >
                      <Eye className="w-4 h-4" /> Preview
                    </button>
                    <Link
                      href="/register"
                      className="flex items-center gap-2 bg-accent text-white text-sm font-semibold px-5 py-2 rounded-full hover:bg-accent-hover transition-colors"
                    >
                      Use Template
                    </Link>
                  </div>
                </div>

                <div className="bg-surface px-4 py-3 flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-ink text-sm">{template.name}</p>
                    <p className="text-xs text-ink-muted capitalize">
                      {template.category === 'all' ? 'All events' : template.category}
                    </p>
                  </div>
                  {template.isPremium ? (
                    <span className="flex items-center gap-1 text-xs bg-ink text-white rounded-full px-2.5 py-1 font-medium">
                      <Lock className="w-3 h-3" /> Premium
                    </span>
                  ) : (
                    <span className="text-xs bg-green-100 text-success rounded-full px-2.5 py-1 font-medium">
                      Free
                    </span>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: easeOut }}
        >
          <Link
            href="/templates"
            className="inline-flex items-center gap-2 bg-ink text-white px-8 py-3 rounded-full text-sm font-semibold hover:bg-ink/80 transition-colors"
          >
            View all {TEMPLATES.length} templates →
          </Link>
        </motion.div>
      </div>

      <TemplatePreviewSheet
        preview={preview}
        onClose={() => setPreview(null)}
        selectedScheme={selectedScheme}
        onSchemeChange={setSelectedScheme}
      />
    </section>
  )
}
