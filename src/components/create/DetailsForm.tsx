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

const MAX_DESCRIPTION = 200

interface DetailsFormProps {
  form: CreateFormState
  onChange: (form: CreateFormState) => void
  onBack: () => void
  onNext: () => void
  onSubmit: () => void
  submitting: boolean
}

export function DetailsForm({
  form,
  onChange,
  onBack,
  onNext,
  onSubmit,
  submitting,
}: DetailsFormProps) {
  function update<K extends keyof CreateFormState>(key: K, value: CreateFormState[K]) {
    onChange({ ...form, [key]: value })
  }

  const selectedTemplate = TEMPLATES.find((t) => t.id === form.template)

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
    const next = form.ceremonies.map((c, i) => (i === index ? updated : c))
    update('ceremonies', next)
  }

  function removeCeremony(index: number) {
    update('ceremonies', form.ceremonies.filter((_, i) => i !== index))
  }

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
                onChange={(e) =>
                  update(
                    'description',
                    e.target.value.slice(0, MAX_DESCRIPTION)
                  )
                }
                placeholder="A few words about this celebration — will appear on your invite page"
                rows={4}
                maxLength={MAX_DESCRIPTION}
                className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-ink placeholder:text-ink-light focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:border-accent transition-colors resize-none"
              />
              <span className="absolute bottom-2.5 right-3 text-xs text-ink-light pointer-events-none">
                {form.description.length}/{MAX_DESCRIPTION}
              </span>
            </div>
          </div>

          {/* 6. Actions */}
          <div className="flex gap-3 mt-8">
            <Button
              variant="ghost"
              onClick={onBack}
              className="border border-border"
            >
              ← Back
            </Button>
            <Button
              className="flex-1 justify-center gap-2"
              size="lg"
              onClick={onNext}
              disabled={!form.title.trim() || !form.date}
            >
              Next: Customize →
            </Button>
          </div>
          <button
            type="button"
            onClick={onSubmit}
            disabled={!form.title.trim() || !form.date || submitting}
            className="mt-3 w-full text-sm text-ink-muted hover:text-ink text-center py-2 transition-colors disabled:opacity-40 cursor-pointer"
          >
            {submitting ? 'Creating…' : 'Skip & Create Invite'}
          </button>
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
