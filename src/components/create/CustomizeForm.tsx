'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { LivePreview, formToEvent } from './LivePreview'
import { StickyPreviewMobile } from './StickyPreviewMobile'
import { GalleryUploader } from './GalleryUploader'
import type { CreateFormState } from './LivePreview'
import type { TemplateContent, TemplateSectionKey } from '@/lib/dummy-data'
import { resolveContent } from '@/lib/template-content'

const CUSTOMIZE_TABS = ['Content', 'Gallery', 'Sections'] as const
type CustomizeTab = typeof CUSTOMIZE_TABS[number]

const SECTION_LABELS: Record<TemplateSectionKey, string> = {
  about: 'About',
  countdown: 'Countdown',
  schedule: 'Schedule',
  location: 'Location',
  gallery: 'Gallery',
  gift: 'Gifts',
  rsvp: 'RSVP',
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
  onChange: (form: CreateFormState) => void
  onBack: () => void
  onSubmit: () => void
  submitting: boolean
}

export function CustomizeForm({ form, onChange, onBack, onSubmit, submitting }: CustomizeFormProps) {
  const [activeTab, setActiveTab] = useState<CustomizeTab>('Content')

  function update<K extends keyof CreateFormState>(key: K, value: CreateFormState[K]) {
    onChange({ ...form, [key]: value })
  }

  function updateContent<K extends keyof TemplateContent>(key: K, value: TemplateContent[K]) {
    update('templateContent', { ...form.templateContent, [key]: value })
  }

  function updateSection(section: TemplateSectionKey, visible: boolean) {
    update('templateContent', {
      ...form.templateContent,
      sections: { ...form.templateContent?.sections, [section]: visible },
    })
  }

  const resolved = resolveContent(formToEvent(form))
  const sections = resolved.sections

  return (
    <>
      {/* Mobile sticky preview */}
      <StickyPreviewMobile form={form} className="lg:hidden" />

      <div className="lg:flex lg:gap-8">
        {/* Left column: form */}
        <div className="flex-[0_0_60%] min-w-0 space-y-6 py-6 lg:py-0">

          {/* Tab bar */}
          <div className="flex gap-1 bg-cream rounded-xl p-1 overflow-x-auto border border-border">
            {CUSTOMIZE_TABS.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={cn(
                  'flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap cursor-pointer',
                  activeTab === tab
                    ? 'bg-surface text-ink shadow-[var(--shadow-card)]'
                    : 'text-ink-muted hover:text-ink'
                )}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* ── Content tab ─────────────────────────────────────────────── */}
          {activeTab === 'Content' && (
            <div className="space-y-4">
              {/* Dynamic name fields by event type */}
              {(form.type === 'wedding' || form.type === 'engagement') && (
                <div className="bg-cream rounded-xl border border-border p-4 space-y-3">
                  <p className="text-sm font-semibold text-ink">Names</p>
                  <Input
                    id="partner1"
                    label="Partner 1 name"
                    value={form.coupleNames?.partner1 ?? ''}
                    placeholder={form.title.split('&')[0]?.trim() || 'Partner 1'}
                    onChange={(e) =>
                      update('coupleNames', {
                        partner1: e.target.value,
                        partner2: form.coupleNames?.partner2 ?? '',
                      })
                    }
                  />
                  <Input
                    id="partner2"
                    label="Partner 2 name"
                    value={form.coupleNames?.partner2 ?? ''}
                    placeholder={form.title.split('&')[1]?.trim().split(' ')[0] || 'Partner 2'}
                    onChange={(e) =>
                      update('coupleNames', {
                        partner1: form.coupleNames?.partner1 ?? '',
                        partner2: e.target.value,
                      })
                    }
                  />
                </div>
              )}

              {form.type === 'birthday' && (
                <div className="bg-cream rounded-xl border border-border p-4 space-y-3">
                  <p className="text-sm font-semibold text-ink">Birthday person</p>
                  <Input
                    id="personName"
                    label="Name"
                    value={form.personName ?? ''}
                    placeholder={form.title.split("'s")[0] || form.title || 'Name'}
                    onChange={(e) => update('personName', e.target.value)}
                  />
                </div>
              )}

              {form.type === 'corporate' && (
                <div className="bg-cream rounded-xl border border-border p-4 space-y-3">
                  <p className="text-sm font-semibold text-ink">Organisation</p>
                  <Input
                    id="companyName"
                    label="Company name"
                    value={form.companyName ?? ''}
                    placeholder={form.title || 'Company name'}
                    onChange={(e) => update('companyName', e.target.value)}
                  />
                </div>
              )}

              {(form.type === 'festive' || form.type === 'other') && (
                <div className="bg-cream rounded-xl border border-border p-4 space-y-3">
                  <p className="text-sm font-semibold text-ink">Host details</p>
                  <Input
                    id="hostName"
                    label="Host name"
                    value={form.hostName ?? ''}
                    placeholder={form.title || 'Host name'}
                    onChange={(e) => update('hostName', e.target.value)}
                  />
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="message" className="text-sm font-medium text-ink">
                      Welcome message{' '}
                      <span className="text-ink-light font-normal">(optional)</span>
                    </label>
                    <textarea
                      id="message"
                      rows={3}
                      value={form.message ?? ''}
                      placeholder="A warm message for your guests…"
                      onChange={(e) => update('message', e.target.value)}
                      className="rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-ink placeholder:text-ink-light focus:outline-none focus-visible:ring-2 focus-visible:ring-accent resize-none"
                    />
                  </div>
                </div>
              )}

              {/* Hero */}
              <div className="bg-cream rounded-xl border border-border p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-ink">Hero</p>
                  <span className="text-xs text-ink-muted bg-border/60 rounded-full px-2 py-0.5">
                    Always visible
                  </span>
                </div>
                <Input
                  id="heroTagline"
                  label="Tagline"
                  value={form.templateContent?.heroTagline ?? ''}
                  placeholder={resolved.heroTagline}
                  onChange={(e) => updateContent('heroTagline', e.target.value)}
                />
              </div>

              {/* About */}
              <div className="bg-cream rounded-xl border border-border p-4 space-y-3">
                <SectionToggle
                  label="About section"
                  checked={sections.about}
                  onChange={(v) => updateSection('about', v)}
                />
                {sections.about && (
                  <>
                    <Input
                      id="aboutLabel"
                      label="Section label"
                      value={form.templateContent?.aboutLabel ?? ''}
                      placeholder={resolved.aboutLabel}
                      onChange={(e) => updateContent('aboutLabel', e.target.value)}
                    />
                    <Input
                      id="aboutHeading"
                      label="Section heading"
                      value={form.templateContent?.aboutHeading ?? ''}
                      placeholder={resolved.aboutHeading || 'Heading (optional)'}
                      onChange={(e) => updateContent('aboutHeading', e.target.value)}
                    />
                    <p className="text-xs text-ink-muted">
                      Body text is the event description — edit it in Step 2.
                    </p>
                  </>
                )}
              </div>

              {/* Countdown */}
              <div className="bg-cream rounded-xl border border-border p-4 space-y-3">
                <SectionToggle
                  label="Countdown"
                  checked={sections.countdown}
                  onChange={(v) => updateSection('countdown', v)}
                />
                {sections.countdown && (
                  <>
                    <Input
                      id="countdownLabel"
                      label="Label"
                      value={form.templateContent?.countdownLabel ?? ''}
                      placeholder={resolved.countdownLabel}
                      onChange={(e) => updateContent('countdownLabel', e.target.value)}
                    />
                    <p className="text-xs text-ink-muted">Shown in Bloom template only.</p>
                  </>
                )}
              </div>

              {/* Schedule */}
              <div className="bg-cream rounded-xl border border-border p-4 space-y-3">
                <SectionToggle
                  label="Schedule section"
                  checked={sections.schedule}
                  onChange={(v) => updateSection('schedule', v)}
                />
                {sections.schedule && (
                  <>
                    <Input
                      id="scheduleLabel"
                      label="Section label"
                      value={form.templateContent?.scheduleLabel ?? ''}
                      placeholder={resolved.scheduleLabel}
                      onChange={(e) => updateContent('scheduleLabel', e.target.value)}
                    />
                    <Input
                      id="scheduleHeading"
                      label="Section heading"
                      value={form.templateContent?.scheduleHeading ?? ''}
                      placeholder={resolved.scheduleHeading || 'Heading (optional)'}
                      onChange={(e) => updateContent('scheduleHeading', e.target.value)}
                    />
                    <p className="text-xs text-ink-muted">
                      Schedule entries come from the ceremonies in Step 2.
                    </p>
                  </>
                )}
              </div>

              {/* Location */}
              <div className="bg-cream rounded-xl border border-border p-4 space-y-3">
                <SectionToggle
                  label="Location section"
                  checked={sections.location}
                  onChange={(v) => updateSection('location', v)}
                />
                {sections.location && (
                  <Input
                    id="locationLabel"
                    label="Section label"
                    value={form.templateContent?.locationLabel ?? ''}
                    placeholder={resolved.locationLabel}
                    onChange={(e) => updateContent('locationLabel', e.target.value)}
                  />
                )}
              </div>

              {/* Gallery */}
              <div className="bg-cream rounded-xl border border-border p-4 space-y-3">
                <SectionToggle
                  label="Gallery section"
                  checked={sections.gallery}
                  onChange={(v) => updateSection('gallery', v)}
                />
                {sections.gallery && (
                  <>
                    <Input
                      id="galleryLabel"
                      label="Section label"
                      value={form.templateContent?.galleryLabel ?? ''}
                      placeholder={resolved.galleryLabel}
                      onChange={(e) => updateContent('galleryLabel', e.target.value)}
                    />
                    <Input
                      id="galleryHeading"
                      label="Section heading"
                      value={form.templateContent?.galleryHeading ?? ''}
                      placeholder={resolved.galleryHeading || 'Heading (optional)'}
                      onChange={(e) => updateContent('galleryHeading', e.target.value)}
                    />
                    <p className="text-xs text-ink-muted">
                      Upload gallery photos in the Gallery tab.
                    </p>
                  </>
                )}
              </div>

              {/* Gift */}
              <div className="bg-cream rounded-xl border border-border p-4 space-y-3">
                <SectionToggle
                  label="Gift section"
                  checked={sections.gift}
                  onChange={(v) => updateSection('gift', v)}
                />
                {sections.gift && (
                  <>
                    <Input
                      id="giftLabel"
                      label="Section label"
                      value={form.templateContent?.giftLabel ?? ''}
                      placeholder={resolved.giftLabel}
                      onChange={(e) => updateContent('giftLabel', e.target.value)}
                    />
                    <Input
                      id="giftHeading"
                      label="Heading"
                      value={form.templateContent?.giftHeading ?? ''}
                      placeholder={resolved.giftHeading}
                      onChange={(e) => updateContent('giftHeading', e.target.value)}
                    />
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="giftBody" className="text-sm font-medium text-ink">
                        Message
                      </label>
                      <textarea
                        id="giftBody"
                        rows={3}
                        value={form.templateContent?.giftBody ?? ''}
                        placeholder={resolved.giftBody}
                        onChange={(e) => updateContent('giftBody', e.target.value)}
                        className="rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-ink placeholder:text-ink-light focus:outline-none focus-visible:ring-2 focus-visible:ring-accent resize-none"
                      />
                    </div>
                  </>
                )}
              </div>

              {/* RSVP */}
              <div className="bg-cream rounded-xl border border-border p-4 space-y-3">
                <SectionToggle
                  label="RSVP section"
                  checked={sections.rsvp}
                  onChange={(v) => updateSection('rsvp', v)}
                />
                {sections.rsvp && (
                  <>
                    <Input
                      id="rsvpLabel"
                      label="Section label"
                      value={form.templateContent?.rsvpLabel ?? ''}
                      placeholder={resolved.rsvpLabel}
                      onChange={(e) => updateContent('rsvpLabel', e.target.value)}
                    />
                    <Input
                      id="rsvpHeading"
                      label="Heading"
                      value={form.templateContent?.rsvpHeading ?? ''}
                      placeholder={resolved.rsvpHeading}
                      onChange={(e) => updateContent('rsvpHeading', e.target.value)}
                    />
                  </>
                )}
              </div>
            </div>
          )}

          {/* ── Gallery tab ──────────────────────────────────────────────── */}
          {activeTab === 'Gallery' && (
            <div className="space-y-4">
              <p className="text-sm text-ink-muted">
                Photos will appear in your invite&apos;s gallery section.
              </p>
              <GalleryUploader
                images={form.templateContent?.galleryImages ?? []}
                onChange={(imgs) => updateContent('galleryImages', imgs)}
              />
            </div>
          )}

          {/* ── Sections tab ─────────────────────────────────────────────── */}
          {activeTab === 'Sections' && (
            <div className="space-y-3">
              <p className="text-sm text-ink-muted">
                Toggle which sections appear on your invite page.
              </p>
              {(Object.keys(SECTION_LABELS) as TemplateSectionKey[]).map((key) => {
                const visible = form.templateContent?.sections?.[key] ?? sections[key]
                return (
                  <div key={key} className="bg-cream rounded-xl border border-border p-4">
                    <SectionToggle
                      label={SECTION_LABELS[key]}
                      checked={visible}
                      onChange={(v) => updateSection(key, v)}
                    />
                  </div>
                )
              })}
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
