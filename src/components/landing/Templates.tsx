'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Lock, Eye, Sparkles, Heart, Cake, Star, Gem, Briefcase, Flame } from 'lucide-react'
import { TEMPLATES, Template, DawatEvent } from '@/lib/dummy-data'
import { easeOut } from '@/lib/motion'
import { TemplateRenderer, getPreviewEvent } from '@/lib/template-utils'
import { TemplatePreviewSheet } from '@/components/create/TemplatePreviewSheet'

type Filter = 'all' | 'wedding' | 'birthday' | 'engagement' | 'corporate' | 'festive' | 'other'
type PreviewState = { template: Template; event: DawatEvent } | null

const FILTERS: { label: string; value: Filter; icon: React.ElementType }[] = [
  { label: 'All',        value: 'all',        icon: Sparkles },
  { label: 'Wedding',    value: 'wedding',    icon: Heart },
  { label: 'Birthday',   value: 'birthday',   icon: Cake },
  { label: 'Engagement', value: 'engagement', icon: Gem },
  { label: 'Corporate',  value: 'corporate',  icon: Briefcase },
  { label: 'Festive',    value: 'festive',    icon: Flame },
  { label: 'Other',      value: 'other',      icon: Star },
]

const THUMB_SCALE = 0.77

export default function Templates() {
  const [filter, setFilter] = useState<Filter>('all')
  const [preview, setPreview] = useState<PreviewState>(null)
  const [selectedScheme, setSelectedScheme] = useState(1)

  function openPreview(template: Template, event: DawatEvent) {
    setSelectedScheme(1)
    setPreview({ template, event })
  }

  const filtered = TEMPLATES.filter((t) =>
    filter === 'all' ? true : t.category === filter
  )

  return (
    <section id="templates" className="relative py-24 px-4 bg-cream overflow-hidden">
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
        </motion.div>

        {/* Filter tabs */}
        <div className="flex items-center justify-center mb-10 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden">
          <div className="flex items-center gap-1 bg-surface border border-border rounded-full p-1 shrink-0">
            {FILTERS.map((f) => {
              const Icon = f.icon
              const active = filter === f.value
              return (
                <button
                  key={f.value}
                  onClick={() => setFilter(f.value)}
                  className="relative px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer"
                >
                  {active && (
                    <motion.div
                      layoutId="filter-pill"
                      className="absolute inset-0 bg-accent rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className={`relative z-10 flex items-center gap-1.5 ${active ? 'text-white' : 'text-ink-muted hover:text-ink'}`}>
                    <Icon className="w-3.5 h-3.5" />
                    {f.label}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Template grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((template) => {
              const cardEvent = getPreviewEvent(template)
              return (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, ease: easeOut }}
                  whileHover={{ scale: 1.02, y: -3 }}
                  className="relative group rounded-2xl overflow-hidden shadow-(--shadow-card) bg-surface"
                >
                  <div className="h-72 relative overflow-hidden bg-white">
                    <div
                      className="absolute top-0 left-0 origin-top-left pointer-events-none select-none"
                      style={{ width: '383px', transform: `scale(${THUMB_SCALE})` }}
                    >
                      <TemplateRenderer event={cardEvent} disableEffects />
                    </div>

                    <div className="absolute inset-0 bg-black/55 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center gap-3">
                      <button
                        onClick={() => openPreview(template, cardEvent)}
                        className="cursor-pointer flex items-center gap-2 border border-white/70 text-white text-sm font-medium px-5 py-2 rounded-full hover:bg-white/10 transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                        Preview
                      </button>
                      <button className="cursor-pointer flex items-center gap-2 bg-accent text-white text-sm font-semibold px-5 py-2 rounded-full hover:bg-accent-hover transition-colors">
                        Use Template
                      </button>
                    </div>
                  </div>

                  <div className="bg-surface px-4 py-3 flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-ink text-sm">{template.name}</p>
                      <p className="text-xs text-ink-muted capitalize">{template.category}</p>
                    </div>
                    {template.isPremium ? (
                      <span className="flex items-center gap-1 text-xs bg-ink text-white rounded-full px-2.5 py-1 font-medium">
                        <Lock className="w-3 h-3" />
                        Premium
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
          </AnimatePresence>
        </div>
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
