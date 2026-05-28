'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  Heart, Cake, Gem, Moon, Briefcase, Sparkles, Star,
  Lock, Check, Eye, ArrowRight,
} from 'lucide-react'
import { TEMPLATES, EventType, Template, DawatEvent } from '@/lib/dummy-data'
import { TEMPLATE_CONFIGS, ColorScheme } from '@/lib/templates-data'
import { TemplateRenderer, getPreviewEvent } from '@/lib/template-utils'
import { easeOut } from '@/lib/motion'
import { TemplatePreviewSheet } from './TemplatePreviewSheet'

// ─── Types ────────────────────────────────────────────────────────────────────

interface TemplateGalleryProps {
  selected: string
  selectedScheme: number
  onSelect: (templateId: string, eventType: EventType) => void
  onSchemeChange: (scheme: number) => void
  onAdvance: () => void
}

type SectionType = {
  label: string
  types: readonly EventType[]
  icon: React.ComponentType<{ className?: string }>
  templates: Template[]
}

// ─── Constants ────────────────────────────────────────────────────────────────

const THUMB_SCALE = 0.77

const SECTION_DEFS: {
  label: string
  types: readonly EventType[]
  icon: React.ComponentType<{ className?: string }>
  filter: (t: Template) => boolean
}[] = [
  {
    label: 'Weddings',
    types: ['wedding'] as const,
    icon: Heart,
    filter: (t) => t.category === 'wedding',
  },
  {
    label: 'Birthdays',
    types: ['birthday'] as const,
    icon: Cake,
    filter: (t) => t.category === 'birthday',
  },
  {
    label: 'Engagements',
    types: ['engagement'] as const,
    icon: Gem,
    filter: (t) => t.category === 'engagement',
  },
  {
    label: 'Corporate',
    types: ['corporate'] as const,
    icon: Briefcase,
    filter: (t) => t.category === 'corporate',
  },
  {
    label: 'Eid',
    types: ['eid'] as const,
    icon: Moon,
    filter: (t) => t.category === 'eid',
  },
  {
    label: 'Other',
    types: ['other'] as const,
    icon: Star,
    filter: (t) => t.category === 'other',
  },
  {
    label: 'All Templates',
    types: ['other', 'wedding', 'birthday', 'eid', 'corporate', 'engagement'] as const,
    icon: Sparkles,
    filter: () => true,
  },
]

const SECTIONS: SectionType[] = SECTION_DEFS.map((def) => ({
  label: def.label,
  types: def.types,
  icon: def.icon,
  templates: TEMPLATES.filter(def.filter),
}))

// ─── Stagger variants ─────────────────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: easeOut } },
}

// ─── Template thumbnail ───────────────────────────────────────────────────────

function TemplateThumbnail({ template }: { template: Template }) {
  const event = getPreviewEvent(template)
  return (
    <div className="h-64 relative overflow-hidden bg-white">
      <div
        className="absolute top-0 left-0 origin-top-left pointer-events-none select-none"
        style={{ width: '390px', transform: `scale(${THUMB_SCALE})` }}
      >
        <TemplateRenderer event={event} disableEffects />
      </div>
    </div>
  )
}

// ─── Template card ────────────────────────────────────────────────────────────

function TemplateCard({
  template,
  isSelected,
  sectionEventType,
  selectedScheme,
  onSelect,
  onSchemeChange,
  onPreview,
}: {
  template: Template
  isSelected: boolean
  sectionEventType: EventType
  selectedScheme: number
  onSelect: (templateId: string, eventType: EventType) => void
  onSchemeChange: (n: number) => void
  onPreview: (template: Template, event: DawatEvent) => void
}) {
  const previewEvent = getPreviewEvent(template)
  const config = TEMPLATE_CONFIGS.find((t) => t.id === template.id)
  const schemes = config?.colorSchemes ?? []
  const hasSchemesAndSelected = isSelected && schemes.length > 0

  return (
    <motion.div
      variants={cardVariants}
      className={`relative group w-48 shrink-0 rounded-2xl overflow-hidden border-2 cursor-pointer transition-colors ${
        isSelected ? 'border-accent' : 'border-border hover:border-ink-muted'
      }`}
      onClick={() => onSelect(template.id, sectionEventType)}
    >
      <TemplateThumbnail template={template} />

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation()
            onPreview(template, previewEvent)
          }}
          className="cursor-pointer flex items-center gap-1.5 border border-white/70 text-white text-xs font-medium px-4 py-2.5 min-h-[44px] rounded-full hover:bg-white/10 transition-colors"
        >
          <Eye className="w-3.5 h-3.5" /> Preview
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation()
            onSelect(template.id, sectionEventType)
          }}
          className={`cursor-pointer flex items-center gap-1.5 text-xs font-semibold px-4 py-2.5 min-h-[44px] rounded-full transition-colors ${
            isSelected ? 'bg-success text-white' : 'bg-accent text-white hover:bg-accent-hover'
          }`}
        >
          {isSelected ? <><Check className="w-3.5 h-3.5" /> Selected</> : 'Use'}
        </button>
      </div>

      {/* Pro badge top-right */}
      {template.isPremium && (
        <div className="absolute top-2 right-2 bg-black/50 text-white text-[10px] rounded-full px-1.5 py-0.5 flex items-center gap-1">
          <Lock className="w-2.5 h-2.5" /> Pro
        </div>
      )}

      {/* Selected checkmark top-left */}
      {isSelected && (
        <div className="absolute top-2 left-2 w-5 h-5 rounded-full bg-accent flex items-center justify-center">
          <Check className="w-3 h-3 text-white" />
        </div>
      )}

      {/* Bottom label */}
      <div className="bg-surface px-3 py-2">
        <div className="flex items-center justify-between mb-1.5">
          <p className="text-xs font-medium text-ink truncate">{template.name}</p>
          {template.isPremium ? (
            <span className="text-[10px] bg-ink text-white rounded-full px-2 py-0.5 font-medium shrink-0 ml-1">Pro</span>
          ) : (
            <span className="text-[10px] bg-green-100 text-success rounded-full px-2 py-0.5 font-medium shrink-0 ml-1">Free</span>
          )}
        </div>
        {/* Scheme dots — always visible for premium templates */}
        {hasSchemesAndSelected && (
          <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
            {schemes.map((s) => (
              <button
                key={s.id}
                title={s.label}
                onClick={(e) => {
                  e.stopPropagation()
                  onSchemeChange(s.id)
                }}
                className={`w-5 h-5 rounded-full ring-2 transition-all cursor-pointer overflow-hidden flex ${
                  selectedScheme === s.id ? 'ring-accent scale-110' : 'ring-border/50 hover:ring-border'
                }`}
              >
                <div className="flex-1" style={{ background: s.bg }} />
                <div className="flex-1" style={{ background: s.primary }} />
              </button>
            ))}
            <span className="text-[9px] text-ink-muted ml-1">
              {schemes.find((s) => s.id === selectedScheme)?.label}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  )
}

// ─── Section row ──────────────────────────────────────────────────────────────

function SectionRow({
  section,
  selected,
  selectedScheme,
  onSelect,
  onSchemeChange,
  onPreview,
}: {
  section: SectionType
  selected: string
  selectedScheme: number
  onSelect: (templateId: string, eventType: EventType) => void
  onSchemeChange: (n: number) => void
  onPreview: (template: Template, event: DawatEvent) => void
}) {
  const Icon = section.icon
  const sectionEventType = section.types[0]

  return (
    <div>
      {/* Section header */}
      <div className="flex items-center gap-2 mb-4">
        <Icon className="w-5 h-5 text-ink-muted" />
        <h2
          className="text-xl font-bold text-ink"
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          {section.label}
        </h2>
      </div>

      {/* Horizontal scroll row */}
      <div className="overflow-x-auto -mx-6 px-6 [&::-webkit-scrollbar]:hidden pb-4">
        <motion.div
          className="flex gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {section.templates.map((template) => (
            <TemplateCard
              key={`${section.label}-${template.id}`}
              template={template}
              isSelected={selected === template.id}
              sectionEventType={sectionEventType}
              selectedScheme={selectedScheme}
              onSelect={onSelect}
              onSchemeChange={onSchemeChange}
              onPreview={onPreview}
            />
          ))}
        </motion.div>
      </div>
    </div>
  )
}

// ─── SchemeStrip ─────────────────────────────────────────────────────────────

function SchemeStrip({
  scheme,
  isSelected,
  onClick,
}: {
  scheme: ColorScheme
  isSelected: boolean
  onClick: () => void
}) {
  return (
    <div className="flex flex-col items-center gap-1">
      <button
        onClick={onClick}
        className={`relative rounded-lg overflow-hidden h-8 w-24 flex ring-2 transition-all cursor-pointer ${
          isSelected ? 'ring-accent scale-105' : 'ring-transparent hover:ring-border'
        }`}
      >
        {[scheme.bg, scheme.surface, scheme.primary, scheme.text].map((color, i) => (
          <div key={i} className="flex-1 h-full" style={{ background: color }} />
        ))}
        {isSelected && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Check className="w-3 h-3 text-white drop-shadow" />
          </div>
        )}
        <span className="sr-only">{scheme.label}</span>
      </button>
      <p className="text-[10px] text-ink-muted">{scheme.label}</p>
    </div>
  )
}

// ─── SchemePickerBar ──────────────────────────────────────────────────────────

function SchemePickerBar({
  templateName,
  schemes,
  selectedScheme,
  onSchemeChange,
  onAdvance,
}: {
  templateName: string
  schemes: ColorScheme[]
  selectedScheme: number
  onSchemeChange: (n: number) => void
  onAdvance: () => void
}) {
  return (
    <AnimatePresence>
      {schemes.length > 0 && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 320, damping: 30 }}
          className="fixed bottom-14 md:bottom-0 left-0 md:left-60 right-0 z-40 bg-white border-t border-border shadow-[0_-4px_24px_rgba(0,0,0,0.08)] px-4 py-4 flex items-center gap-4"
        >
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-ink truncate mb-2">{templateName}</p>
            <div className="flex items-center gap-3">
              {schemes.map((s) => (
                <SchemeStrip
                  key={s.id}
                  scheme={s}
                  isSelected={selectedScheme === s.id}
                  onClick={() => onSchemeChange(s.id)}
                />
              ))}
            </div>
          </div>
          <button
            onClick={onAdvance}
            className="shrink-0 flex items-center gap-1.5 bg-accent text-white text-sm font-semibold px-5 py-3 rounded-full hover:bg-accent-hover transition-colors cursor-pointer"
          >
            Next <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ─── TemplateGallery ─────────────────────────────────────────────────────────

export function TemplateGallery({ selected, selectedScheme, onSelect, onSchemeChange, onAdvance }: TemplateGalleryProps) {
  const [previewState, setPreviewState] = useState<{
    template: Template
    event: DawatEvent
  } | null>(null)

  const selectedConfig = TEMPLATE_CONFIGS.find((t) => t.id === selected)
  const selectedSchemes = selectedConfig?.colorSchemes ?? []
  const isPremiumSelected = selectedSchemes.length > 0

  function handlePreview(template: Template, event: DawatEvent) {
    setPreviewState({ template, event: { ...event, colorScheme: selectedScheme } })
  }

  function handlePreviewSelect(templateId: string) {
    const section = SECTIONS.find((s) =>
      s.templates.some((t) => t.id === templateId)
    )
    const eventType: EventType = section?.types[0] ?? 'other'
    onSelect(templateId, eventType)
  }

  return (
    <div className={isPremiumSelected ? 'pb-32' : ''}>
      {/* Header */}
      <div className="mb-8">
        <p className="text-sm text-ink-muted">
          Select a design — it sets your event type automatically.
        </p>
      </div>

      {/* Sections */}
      <div className="space-y-10">
        {SECTIONS.map((section) => (
          <SectionRow
            key={section.label}
            section={section}
            selected={selected}
            selectedScheme={selectedScheme}
            onSelect={onSelect}
            onSchemeChange={onSchemeChange}
            onPreview={handlePreview}
          />
        ))}
      </div>

      {/* Scheme picker bar — slides up when a premium template is selected */}
      <SchemePickerBar
        templateName={selectedConfig?.name ?? ''}
        schemes={selectedSchemes}
        selectedScheme={selectedScheme}
        onSchemeChange={onSchemeChange}
        onAdvance={onAdvance}
      />

      {/* Preview sheet */}
      <TemplatePreviewSheet
        preview={previewState}
        onClose={() => setPreviewState(null)}
        onSelect={handlePreviewSelect}
        selected={selected}
        selectedScheme={selectedScheme}
        onSchemeChange={onSchemeChange}
      />
    </div>
  )
}
