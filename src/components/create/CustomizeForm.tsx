'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import Button from '@/components/ui/Button'
import { LivePreview } from './LivePreview'
import { StickyPreviewMobile } from './StickyPreviewMobile'
import { GalleryUploader } from './GalleryUploader'
import type { CreateFormState } from './LivePreview'
import type { TemplateSectionKey } from '@/lib/dummy-data'
import type { TemplateConfig } from '@/lib/templates-data'
import type { SectionKey } from '@/lib/schemas/event'

const SECTION_LABELS: Record<SectionKey, string> = {
  about:     'About',
  countdown: 'Countdown',
  schedule:  'Schedule',
  location:  'Location',
  gallery:   'Gallery',
  rsvp:      'RSVP',
}

function SectionToggle({
  label,
  checked,
  onChange,
}: {
  label: string
  checked: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <div className="flex items-center justify-between">
      <p className="text-sm font-semibold text-ink">{label}</p>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn(
          'relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200',
          checked ? 'bg-accent' : 'bg-black/15'
        )}
        aria-label={`${checked ? 'Hide' : 'Show'} ${label}`}
      >
        <span
          className={cn(
            'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-lg transition-transform duration-200',
            checked ? 'translate-x-5' : 'translate-x-0'
          )}
        />
      </button>
    </div>
  )
}

interface CustomizeFormProps {
  form: CreateFormState
  templateConfig: TemplateConfig | undefined
  onChange: (form: CreateFormState) => void
  onBack: () => void
  onSubmit: () => void
  submitting: boolean
}

export function CustomizeForm({ form, templateConfig, onChange, onBack, onSubmit, submitting }: CustomizeFormProps) {
  const supportedSections = templateConfig?.supportedSections ?? []
  const hasGallery = supportedSections.includes('gallery')

  const tabs = hasGallery ? (['Gallery', 'Sections'] as const) : (['Sections'] as const)
  type Tab = typeof tabs[number]
  const [activeTab, setActiveTab] = useState<Tab>(tabs[0])

  function updateSection(section: TemplateSectionKey, visible: boolean) {
    onChange({
      ...form,
      sections: { ...form.sections, [section]: visible },
    })
  }

  function getSectionVisible(key: SectionKey): boolean {
    if (key in form.sections) return !!form.sections[key]
    return supportedSections.includes(key)
  }

  return (
    <>
      {/* Mobile sticky preview */}
      <StickyPreviewMobile form={form} className="lg:hidden" />

      <div className="lg:flex lg:gap-8">
        {/* Left column */}
        <div className="flex-[0_0_60%] min-w-0 space-y-6 py-6 lg:py-0">

          {/* Tab bar — only shown when there are multiple tabs */}
          {tabs.length > 1 && (
            <div className="flex gap-1 bg-cream rounded-xl p-1 border border-border">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab as Tab)}
                  className={cn(
                    'flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap cursor-pointer',
                    activeTab === tab
                      ? 'bg-surface text-ink shadow-(--shadow-card)'
                      : 'text-ink-muted hover:text-ink'
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>
          )}

          {/* ── Gallery tab ────────────────────────────────────── */}
          {activeTab === 'Gallery' && hasGallery && (
            <div className="space-y-4">
              <p className="text-sm text-ink-muted">
                Photos will appear in your invite&apos;s gallery section.
              </p>
              <GalleryUploader
                images={form.galleryImages}
                onChange={(imgs) => onChange({ ...form, galleryImages: imgs })}
              />
            </div>
          )}

          {/* ── Sections tab ───────────────────────────────────── */}
          {activeTab === 'Sections' && (
            <div className="space-y-3">
              <p className="text-sm text-ink-muted">
                Choose which sections appear on your invite page.
              </p>
              {supportedSections.map((key) => (
                <div key={key} className="bg-cream rounded-xl border border-border p-4">
                  <SectionToggle
                    label={SECTION_LABELS[key]}
                    checked={getSectionVisible(key)}
                    onChange={(v) => updateSection(key as TemplateSectionKey, v)}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Action buttons */}
          <div className="flex gap-3 mt-8">
            <Button variant="ghost" onClick={onBack} className="border border-border">
              ← Back
            </Button>
            <Button
              className="flex-1 justify-center gap-2"
              size="lg"
              onClick={onSubmit}
              loading={submitting}
            >
              Create My Invite →
            </Button>
          </div>
        </div>

        {/* Right column: live preview — desktop only */}
        <div className="hidden lg:block flex-[0_0_40%] min-w-0">
          <div className="sticky top-8">
            <LivePreview form={form} />
          </div>
        </div>
      </div>
    </>
  )
}
