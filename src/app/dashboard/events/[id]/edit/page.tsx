'use client'

import { use, useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { toast } from 'sonner'
import { Plus, Trash2, Lock } from 'lucide-react'
import { getEventForEdit, saveEvent } from '@/lib/events-store'
import { DawatEvent, TEMPLATES, planSatisfies, TemplateContent, TemplateSectionKey } from '@/lib/dummy-data'
import { resolveContent } from '@/lib/template-content'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import PlanGate from '@/components/ui/PlanGate'
import { fadeUp, stagger } from '@/lib/motion'
import { cn } from '@/lib/utils'

const TABS = ['Basic Info', 'Sub-Events', 'Design', 'Content', 'Cover', 'Settings'] as const
type Tab = typeof TABS[number]

function SectionToggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-between">
      <p className="text-sm font-semibold text-ink">{label}</p>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn('relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200', checked ? 'bg-accent' : 'bg-black/15')}
        aria-label={`${checked ? 'Hide' : 'Show'} ${label}`}
      >
        <span className={cn('pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-lg transition-transform duration-200', checked ? 'translate-x-5' : 'translate-x-0')} />
      </button>
    </div>
  )
}

export default function EditEventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [event, setEvent] = useState<DawatEvent | null>(null)
  const [activeTab, setActiveTab] = useState<Tab>('Basic Info')
  const [saving, setSaving] = useState(false)
  const [premiumSelected, setPremiumSelected] = useState(false)

  useEffect(() => {
    const e = getEventForEdit(id)
    if (e) setEvent(e)
  }, [id])

  function updateField<K extends keyof DawatEvent>(key: K, value: DawatEvent[K]) {
    setEvent((prev) => prev ? { ...prev, [key]: value } : prev)
  }

  function updateContent<K extends keyof TemplateContent>(key: K, value: TemplateContent[K]) {
    setEvent((prev) => prev ? { ...prev, templateContent: { ...prev.templateContent, [key]: value } } : prev)
  }

  function updateSection(section: TemplateSectionKey, visible: boolean) {
    setEvent((prev) => prev ? {
      ...prev,
      templateContent: {
        ...prev.templateContent,
        sections: { ...prev.templateContent?.sections, [section]: visible },
      },
    } : prev)
  }

  async function handleSave() {
    if (!event) return
    setSaving(true)
    await new Promise((r) => setTimeout(r, 600))
    saveEvent(event)
    setSaving(false)
    toast.success('Changes saved')
  }

  if (!event) return null

  const selectedTemplate = TEMPLATES.find((t) => t.id === event.template)

  return (
    <div className="p-6 lg:p-8 max-w-3xl">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: stagger } }}
      >
        <motion.div variants={fadeUp} className="flex items-start justify-between gap-4 mb-8">
          <div>
            <p className="text-sm text-ink-muted mb-1">Editing</p>
            <h1 className="text-2xl font-bold text-ink" style={{ fontFamily: 'var(--font-playfair)' }}>
              {event.title}
            </h1>
          </div>
          <Button onClick={handleSave} loading={saving} size="sm">
            Save Changes
          </Button>
        </motion.div>

        {/* Tabs */}
        <motion.div variants={fadeUp} className="flex gap-1 bg-cream rounded-xl p-1 mb-8 overflow-x-auto">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === tab ? 'bg-surface text-ink shadow-[var(--shadow-card)]' : 'text-ink-muted hover:text-ink'
              }`}
            >
              {tab}
            </button>
          ))}
        </motion.div>

        <motion.div variants={fadeUp}>
          {/* Basic Info */}
          {activeTab === 'Basic Info' && (
            <div className="space-y-5">
              <Input
                id="title"
                label="Event title"
                value={event.title}
                onChange={(e) => updateField('title', e.target.value)}
                required
              />
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="type" className="text-sm font-medium text-ink">Event type</label>
                  <select
                    id="type"
                    value={event.type}
                    onChange={(e) => updateField('type', e.target.value as DawatEvent['type'])}
                    className="rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-ink h-11 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    {['wedding', 'birthday', 'engagement', 'festive', 'corporate', 'other'].map((t) => (
                      <option key={t} value={t} className="capitalize">{t.charAt(0).toUpperCase() + t.slice(1)}</option>
                    ))}
                  </select>
                </div>
                <Input
                  id="date"
                  label="Event date"
                  type="date"
                  value={event.eventDate}
                  onChange={(e) => updateField('eventDate', e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="desc" className="text-sm font-medium text-ink">Description</label>
                <textarea
                  id="desc"
                  rows={3}
                  value={event.description ?? ''}
                  onChange={(e) => updateField('description', e.target.value)}
                  placeholder="A brief description of your event..."
                  className="rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-ink placeholder:text-ink-light focus:outline-none focus-visible:ring-2 focus-visible:ring-accent resize-none"
                />
              </div>
            </div>
          )}

          {/* Sub-Events */}
          {activeTab === 'Sub-Events' && (
            <PlanGate requiredPlan="wedding" currentPlan={event.plan} featureName="Multiple sub-events">
              <div className="space-y-4">
                {event.subEvents.map((se, i) => (
                  <div key={se.id} className="bg-cream rounded-xl border border-border p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-ink">Event {i + 1}</p>
                      {event.subEvents.length > 1 && (
                        <button
                          onClick={() => updateField('subEvents', event.subEvents.filter((_, j) => j !== i))}
                          className="p-1 text-ink-muted hover:text-danger transition-colors cursor-pointer"
                          aria-label="Remove event"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <Input
                        id={`se-name-${i}`}
                        label="Name"
                        value={se.name}
                        onChange={(e) => {
                          const updated = [...event.subEvents]
                          updated[i] = { ...se, name: e.target.value }
                          updateField('subEvents', updated)
                        }}
                      />
                      <Input
                        id={`se-date-${i}`}
                        label="Date"
                        type="date"
                        value={se.date}
                        onChange={(e) => {
                          const updated = [...event.subEvents]
                          updated[i] = { ...se, date: e.target.value }
                          updateField('subEvents', updated)
                        }}
                      />
                      <Input
                        id={`se-time-${i}`}
                        label="Time"
                        value={se.time}
                        onChange={(e) => {
                          const updated = [...event.subEvents]
                          updated[i] = { ...se, time: e.target.value }
                          updateField('subEvents', updated)
                        }}
                      />
                      <Input
                        id={`se-venue-${i}`}
                        label="Venue"
                        value={se.venue}
                        onChange={(e) => {
                          const updated = [...event.subEvents]
                          updated[i] = { ...se, venue: e.target.value }
                          updateField('subEvents', updated)
                        }}
                      />
                    </div>
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateField('subEvents', [
                    ...event.subEvents,
                    { id: `se_new_${Date.now()}`, name: '', date: '', time: '', venue: '' },
                  ])}
                  className="gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Sub-Event
                </Button>
              </div>
            </PlanGate>
          )}

          {/* Design */}
          {activeTab === 'Design' && (
            <div className="space-y-4">
              {premiumSelected && !planSatisfies(event.plan, 'basic') && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
                  You&apos;ve selected a premium template. Upgrade your plan to publish with this design.
                </div>
              )}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {TEMPLATES.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      updateField('template', t.id)
                      if (t.isPremium) setPremiumSelected(true)
                    }}
                    className={`relative rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                      event.template === t.id ? 'border-accent' : 'border-border hover:border-ink-muted'
                    }`}
                  >
                    <div
                      className="h-24"
                      style={{ background: `linear-gradient(135deg, ${t.primaryColor}, ${t.accentColor})` }}
                    />
                    {t.isPremium && (
                      <div className="absolute top-2 right-2">
                        <div className="bg-black/40 text-white text-[10px] rounded-full px-1.5 py-0.5 flex items-center gap-1">
                          <Lock className="w-2.5 h-2.5" />
                          Pro
                        </div>
                      </div>
                    )}
                    {event.template === t.id && (
                      <div className="absolute top-2 left-2 w-4 h-4 rounded-full bg-accent flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-white" />
                      </div>
                    )}
                    <div className="bg-surface p-2 text-left">
                      <p className="text-xs font-medium text-ink">{t.name}</p>
                      <p className="text-[10px] text-ink-muted capitalize">{t.category === 'all' ? 'All' : t.category}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Content */}
          {activeTab === 'Content' && (() => {
            const resolved = resolveContent(event)
            const sections = resolved.sections
            const imgs = event.templateContent?.galleryImages ?? resolved.galleryImages
            return (
              <div className="space-y-4">
                {/* Hero */}
                <div className="bg-cream rounded-xl border border-border p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-ink">Hero</p>
                    <span className="text-xs text-ink-muted bg-border/60 rounded-full px-2 py-0.5">Always visible</span>
                  </div>
                  <Input id="heroTagline" label="Tagline" value={event.templateContent?.heroTagline ?? ''} placeholder={resolved.heroTagline} onChange={(e) => updateContent('heroTagline', e.target.value)} />
                </div>

                {/* About */}
                <div className="bg-cream rounded-xl border border-border p-4 space-y-3">
                  <SectionToggle label="About section" checked={sections.about} onChange={(v) => updateSection('about', v)} />
                  {sections.about && (
                    <>
                      <Input id="aboutLabel" label="Section label" value={event.templateContent?.aboutLabel ?? ''} placeholder={resolved.aboutLabel} onChange={(e) => updateContent('aboutLabel', e.target.value)} />
                      <Input id="aboutHeading" label="Section heading" value={event.templateContent?.aboutHeading ?? ''} placeholder={resolved.aboutHeading || 'Heading (optional)'} onChange={(e) => updateContent('aboutHeading', e.target.value)} />
                      <p className="text-xs text-ink-muted">Body text is the event description — edit it in Basic Info.</p>
                    </>
                  )}
                </div>

                {/* Countdown */}
                <div className="bg-cream rounded-xl border border-border p-4 space-y-3">
                  <SectionToggle label="Countdown" checked={sections.countdown} onChange={(v) => updateSection('countdown', v)} />
                  {sections.countdown && (
                    <>
                      <Input id="countdownLabel" label="Label" value={event.templateContent?.countdownLabel ?? ''} placeholder={resolved.countdownLabel} onChange={(e) => updateContent('countdownLabel', e.target.value)} />
                      <p className="text-xs text-ink-muted">Countdown section is shown in Bloom template only.</p>
                    </>
                  )}
                </div>

                {/* Schedule */}
                <div className="bg-cream rounded-xl border border-border p-4 space-y-3">
                  <SectionToggle label="Schedule section" checked={sections.schedule} onChange={(v) => updateSection('schedule', v)} />
                  {sections.schedule && (
                    <>
                      <Input id="scheduleLabel" label="Section label" value={event.templateContent?.scheduleLabel ?? ''} placeholder={resolved.scheduleLabel} onChange={(e) => updateContent('scheduleLabel', e.target.value)} />
                      <Input id="scheduleHeading" label="Section heading" value={event.templateContent?.scheduleHeading ?? ''} placeholder={resolved.scheduleHeading || 'Heading (optional)'} onChange={(e) => updateContent('scheduleHeading', e.target.value)} />
                      <p className="text-xs text-ink-muted">Schedule entries are managed in the Sub-Events tab.</p>
                    </>
                  )}
                </div>

                {/* Location */}
                <div className="bg-cream rounded-xl border border-border p-4 space-y-3">
                  <SectionToggle label="Location section" checked={sections.location} onChange={(v) => updateSection('location', v)} />
                  {sections.location && (
                    <Input id="locationLabel" label="Section label" value={event.templateContent?.locationLabel ?? ''} placeholder={resolved.locationLabel} onChange={(e) => updateContent('locationLabel', e.target.value)} />
                  )}
                </div>

                {/* Gallery */}
                <div className="bg-cream rounded-xl border border-border p-4 space-y-3">
                  <SectionToggle label="Gallery section" checked={sections.gallery} onChange={(v) => updateSection('gallery', v)} />
                  {sections.gallery && (
                    <>
                      <Input id="galleryLabel" label="Section label" value={event.templateContent?.galleryLabel ?? ''} placeholder={resolved.galleryLabel} onChange={(e) => updateContent('galleryLabel', e.target.value)} />
                      <Input id="galleryHeading" label="Section heading" value={event.templateContent?.galleryHeading ?? ''} placeholder={resolved.galleryHeading || 'Heading (optional)'} onChange={(e) => updateContent('galleryHeading', e.target.value)} />
                      <p className="text-sm font-medium text-ink">Images</p>
                      {imgs.map((url, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <Input
                            id={`gallery-img-${i}`}
                            label=""
                            value={url}
                            placeholder="https://example.com/image.jpg"
                            onChange={(e) => {
                              const next = [...imgs]
                              next[i] = e.target.value
                              updateContent('galleryImages', next)
                            }}
                          />
                          <button
                            type="button"
                            onClick={() => updateContent('galleryImages', imgs.filter((_, j) => j !== i))}
                            className="p-2 text-ink-muted hover:text-danger transition-colors cursor-pointer shrink-0 mt-0.5"
                            aria-label="Remove image"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={imgs.length >= 6}
                        onClick={() => updateContent('galleryImages', [...imgs, ''])}
                        className="gap-2"
                      >
                        <Plus className="w-4 h-4" />
                        Add Image
                      </Button>
                    </>
                  )}
                </div>

                {/* Gift */}
                <div className="bg-cream rounded-xl border border-border p-4 space-y-3">
                  <SectionToggle label="Gift section" checked={sections.gift} onChange={(v) => updateSection('gift', v)} />
                  {sections.gift && (
                    <>
                      <Input id="giftLabel" label="Section label" value={event.templateContent?.giftLabel ?? ''} placeholder={resolved.giftLabel} onChange={(e) => updateContent('giftLabel', e.target.value)} />
                      <Input id="giftHeading" label="Heading" value={event.templateContent?.giftHeading ?? ''} placeholder={resolved.giftHeading} onChange={(e) => updateContent('giftHeading', e.target.value)} />
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="giftBody" className="text-sm font-medium text-ink">Message</label>
                        <textarea
                          id="giftBody"
                          rows={3}
                          value={event.templateContent?.giftBody ?? ''}
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
                  <SectionToggle label="RSVP section" checked={sections.rsvp} onChange={(v) => updateSection('rsvp', v)} />
                  {sections.rsvp && (
                    <>
                      <Input id="rsvpLabel" label="Section label" value={event.templateContent?.rsvpLabel ?? ''} placeholder={resolved.rsvpLabel} onChange={(e) => updateContent('rsvpLabel', e.target.value)} />
                      <Input id="rsvpHeading" label="Heading" value={event.templateContent?.rsvpHeading ?? ''} placeholder={resolved.rsvpHeading} onChange={(e) => updateContent('rsvpHeading', e.target.value)} />
                    </>
                  )}
                </div>
              </div>
            )
          })()}

          {/* Cover */}
          {activeTab === 'Cover' && (
            <div className="space-y-4">
              <div className="border-2 border-dashed border-border rounded-2xl p-12 flex flex-col items-center gap-4 text-center">
                <div className="w-12 h-12 rounded-xl bg-accent-light flex items-center justify-center">
                  <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-ink text-sm">Upload cover photo</p>
                  <p className="text-xs text-ink-muted mt-1">Recommended: 1200×600px, JPG or PNG</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => toast.info('File upload coming soon')}>
                  Choose Photo
                </Button>
              </div>
            </div>
          )}

          {/* Settings */}
          {activeTab === 'Settings' && (
            <div className="space-y-6">
              <Input
                id="slug"
                label="Custom URL"
                value={event.slug}
                onChange={(e) => updateField('slug', e.target.value)}
                helper={`Your invite will be at: dawat.app/i/${event.slug}`}
              />
              <div className="bg-cream rounded-xl border border-border p-4">
                <p className="text-sm font-medium text-ink mb-1">Access expiry</p>
                <p className="text-sm text-ink-muted">
                  Your invite link will be accessible until <span className="font-medium text-ink">{event.expiresAt}</span>
                </p>
              </div>

              <PlanGate requiredPlan="wedding" currentPlan={event.plan} featureName="Save the Date page">
                <div className="flex items-center justify-between p-4 bg-cream rounded-xl border border-border">
                  <div>
                    <p className="text-sm font-medium text-ink">Save the Date</p>
                    <p className="text-xs text-ink-muted">Show a teaser page before your full invite goes live</p>
                  </div>
                  <div className="w-10 h-5 bg-border rounded-full cursor-not-allowed opacity-50" />
                </div>
              </PlanGate>
            </div>
          )}
        </motion.div>

        <motion.div variants={fadeUp} className="mt-8 pt-6 border-t border-border flex justify-end">
          <Button onClick={handleSave} loading={saving}>
            Save Changes
          </Button>
        </motion.div>
      </motion.div>
    </div>
  )
}
