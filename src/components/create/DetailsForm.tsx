'use client'

import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import CeremonyCard from './CeremonyCard'
import DateTimePicker from './DateTimePicker'
import CoverUpload from './CoverUpload'
import { StickyPreviewMobile } from './StickyPreviewMobile'
import { LivePreview } from './LivePreview'
import type { CreateFormState } from './LivePreview'
import { TEMPLATES } from '@/lib/dummy-data'
import type { SubEvent } from '@/lib/dummy-data'
import type { TemplateConfig } from '@/lib/templates-data'

const MAX_DESCRIPTION = 500

interface DetailsFormProps {
  form: CreateFormState
  templateConfig: TemplateConfig | undefined
  onChange: (form: CreateFormState) => void
  onBack: () => void
  onNext: () => void
  onSubmit: () => void
  submitting: boolean
  isLastStep: boolean
}

export function DetailsForm({
  form,
  templateConfig,
  onChange,
  onBack,
  onNext,
  onSubmit,
  submitting,
  isLastStep,
}: DetailsFormProps) {
  function update<K extends keyof CreateFormState>(key: K, value: CreateFormState[K]) {
    onChange({ ...form, [key]: value })
  }

  const selectedTemplate = TEMPLATES.find((t) => t.id === form.template)
  const supportedFields = templateConfig?.supportedFields ?? []

  function addCeremony() {
    const newCeremony: SubEvent = {
      id: Date.now().toString(),
      name: 'Ceremony',
      date: '',
      time: '6:00 PM',
      venue: '',
    }
    update('ceremonies', [...form.ceremonies, newCeremony])
  }

  function updateCeremony(index: number, updated: SubEvent) {
    update('ceremonies', form.ceremonies.map((c, i) => (i === index ? updated : c)))
  }

  function removeCeremony(index: number) {
    update('ceremonies', form.ceremonies.filter((_, i) => i !== index))
  }

  const canAdvance = !!form.title.trim() && !!form.date

  return (
    <>
      {/* Mobile sticky preview — hidden on lg+ */}
      <StickyPreviewMobile form={form} className="lg:hidden" />

      <div className="lg:flex lg:gap-8">
        {/* Left column: form fields */}
        <div className="flex-[0_0_60%] min-w-0 space-y-6 py-6 lg:py-0">

          {/* 1. Event title */}
          <Input
            id="title"
            label="Event title"
            placeholder="Nadia & Rafiq Wedding"
            value={form.title}
            onChange={(e) => update('title', e.target.value)}
            required
          />

          {/* 2. Cover photo */}
          <div>
            <label className="text-sm font-medium text-ink mb-2 block">
              Cover photo{' '}
              <span className="text-ink-light font-normal">(optional)</span>
            </label>
            <CoverUpload
              value={form.coverImage}
              fallback={selectedTemplate?.defaultCover ?? null}
              onChange={(url) => update('coverImage', url)}
            />
          </div>

          {/* 3. Event date */}
          <DateTimePicker
            label="Event date"
            value={form.date}
            onChange={(date) => update('date', date)}
          />

          {/* 4. Ceremonies & Venues */}
          <div>
            <h3 className="text-base font-semibold text-ink mb-3">
              Ceremonies &amp; Venues
            </h3>
            {form.ceremonies.map((ceremony, index) => (
              <CeremonyCard
                key={ceremony.id}
                ceremony={ceremony}
                index={index}
                canRemove={form.ceremonies.length > 1}
                onChange={(updated) => updateCeremony(index, updated)}
                onRemove={() => removeCeremony(index)}
              />
            ))}
            <button
              type="button"
              onClick={addCeremony}
              className="mt-1 text-sm text-accent font-medium hover:text-accent-hover transition-colors py-2"
            >
              + Add ceremony
            </button>
          </div>

          {/* 5. Description */}
          <div>
            <label
              htmlFor="description"
              className="text-sm font-medium text-ink mb-1.5 block"
            >
              Description{' '}
              <span className="text-ink-light font-normal">(optional)</span>
            </label>
            <div className="relative">
              <textarea
                id="description"
                value={form.description}
                onChange={(e) => update('description', e.target.value.slice(0, MAX_DESCRIPTION))}
                placeholder="A few words about this celebration — will appear on your invite page"
                rows={4}
                maxLength={MAX_DESCRIPTION}
                className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-ink placeholder:text-ink-light focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:border-accent transition-colors resize-none min-h-[44px]"
              />
              <span className="absolute bottom-2.5 right-3 text-xs text-ink-light pointer-events-none">
                {form.description.length}/{MAX_DESCRIPTION}
              </span>
            </div>
          </div>

          {/* 6. Identity fields — driven by template's supportedFields */}
          {supportedFields.length > 0 && (
            <div className="bg-cream rounded-xl border border-border p-4 space-y-4">
              <p className="text-sm font-semibold text-ink">About the event</p>

              {supportedFields.includes('coupleNames') && (
                <div className="space-y-3">
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

              {supportedFields.includes('personName') && (
                <Input
                  id="personName"
                  label="Celebrant's name"
                  value={form.personName ?? ''}
                  placeholder={form.title.split("'s")[0] || form.title || 'Name'}
                  onChange={(e) => update('personName', e.target.value)}
                />
              )}

              {supportedFields.includes('companyName') && (
                <Input
                  id="companyName"
                  label="Company / Organisation"
                  value={form.companyName ?? ''}
                  placeholder={form.title || 'Company name'}
                  onChange={(e) => update('companyName', e.target.value)}
                />
              )}

              {supportedFields.includes('hostName') && (
                <Input
                  id="hostName"
                  label="Host name"
                  value={form.hostName ?? ''}
                  placeholder={form.title || 'Host name'}
                  onChange={(e) => update('hostName', e.target.value)}
                />
              )}

              {supportedFields.includes('message') && (
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
                    onChange={(e) => update('message', e.target.value.slice(0, 300))}
                    className="rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-ink placeholder:text-ink-light focus:outline-none focus-visible:ring-2 focus-visible:ring-accent resize-none min-h-[44px]"
                  />
                </div>
              )}
            </div>
          )}

          {/* 7. Actions */}
          <div className="flex gap-3 mt-8">
            <Button
              variant="ghost"
              onClick={onBack}
              className="border border-border"
            >
              ← Back
            </Button>
            {isLastStep ? (
              <Button
                className="flex-1 justify-center gap-2"
                size="lg"
                onClick={onSubmit}
                loading={submitting}
                disabled={!canAdvance}
              >
                Create My Invite →
              </Button>
            ) : (
              <Button
                className="flex-1 justify-center gap-2"
                size="lg"
                onClick={onNext}
                disabled={!canAdvance}
              >
                Next: Customize →
              </Button>
            )}
          </div>

          {!isLastStep && (
            <button
              type="button"
              onClick={onSubmit}
              disabled={!canAdvance || submitting}
              className="mt-3 w-full text-sm text-ink-muted hover:text-ink text-center py-2 transition-colors disabled:opacity-40 cursor-pointer"
            >
              {submitting ? 'Creating…' : 'Skip & Create Invite'}
            </button>
          )}
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
