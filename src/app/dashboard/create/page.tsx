'use client'

import { useState, useCallback, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'motion/react'
import { toast } from 'sonner'
import { addNewEvent, clearDraft } from '@/lib/events-store'
import { EventType, DawatEvent, SubEvent } from '@/lib/dummy-data'
import { TEMPLATE_CONFIGS } from '@/lib/templates-data'
import { easeOut } from '@/lib/motion'
import { useCreateDraft } from '@/lib/useCreateDraft'
import { TemplateGallery } from '@/components/create/TemplateGallery'
import { DetailsForm } from '@/components/create/DetailsForm'
import { CustomizeForm } from '@/components/create/CustomizeForm'
import { SuccessScreen } from '@/components/create/SuccessScreen'
import type { CreateFormState } from '@/components/create/LivePreview'

function getDefaultCeremonies(type: EventType): SubEvent[] {
  const id = () => `se_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`
  switch (type) {
    case 'wedding':
      return [
        { id: id(), name: 'Holud',     date: '', time: '5:00 PM',  venue: '' },
        { id: id(), name: 'Akad',      date: '', time: '11:00 AM', venue: '' },
        { id: id(), name: 'Reception', date: '', time: '7:00 PM',  venue: '' },
      ]
    default:
      return [{ id: id(), name: 'The Event', date: '', time: '6:00 PM', venue: '' }]
  }
}

const initialForm: CreateFormState = {
  type: null,
  title: '',
  date: '',
  time: '6:00 PM',
  venue: '',
  description: '',
  template: 'simple',
  colorScheme: 1,
  coverImage: null,
  ceremonies: [],
  galleryImages: [],
  sections: {},
  coupleNames: undefined,
  personName: undefined,
  companyName: undefined,
  hostName: undefined,
  message: undefined,
}

export default function CreatePage() {
  const router = useRouter()
  const [step, setStep] = useState<1 | 2 | 3 | 'success'>(1)
  const [form, setForm] = useState<CreateFormState>(initialForm)
  const [submitting, setSubmitting] = useState(false)
  const [createdEvent, setCreatedEvent] = useState<DawatEvent | null>(null)

  const templateConfig = useMemo(
    () => TEMPLATE_CONFIGS.find((t) => t.id === form.template),
    [form.template]
  )

  const totalSteps = templateConfig?.isComplex ? 3 : 2

  const stepLabel = step === 1
    ? 'Choose your template'
    : step === 2
    ? 'Event details'
    : 'Customize'

  const stepNumber = step === 1 ? 1 : step === 2 ? 2 : 3
  const progressPct = step === 1
    ? `${Math.round(100 / totalSteps)}%`
    : step === 2
    ? totalSteps === 2 ? '100%' : '66%'
    : '100%'

  const handleRestore = useCallback((draft: CreateFormState) => {
    setForm(draft)
    toast('Continue your draft?', {
      action: {
        label: 'Discard',
        onClick: () => {
          setForm(initialForm)
          clearDraft()
        },
      },
      duration: 8000,
    })
  }, [])

  const draftUtils = useCreateDraft(form, handleRestore, step !== 'success')

  async function handleCreate() {
    setSubmitting(true)
    await new Promise<void>((r) => setTimeout(r, 600))
    const newId = `evt_new_${Date.now()}`
    const slug =
      form.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '') || 'my-event'
    const now = new Date()
    const newEvent: DawatEvent = {
      id: newId,
      title: form.title,
      type: form.type!,
      slug,
      status: 'draft',
      plan: 'free',
      createdAt: now.toISOString().split('T')[0],
      eventDate: form.date || now.toISOString().split('T')[0],
      expiresAt: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
      coverImage: form.coverImage,
      subEvents:
        form.ceremonies.length > 0
          ? form.ceremonies.map((c) => ({ ...c, id: c.id || `se_${Date.now()}` }))
          : [
              {
                id: `se_${Date.now()}`,
                name: form.title,
                date: form.date,
                time: form.time || '6:00 PM',
                venue: form.venue || 'TBD',
              },
            ],
      rsvpCount: 0,
      guestCount: 50,
      template: form.template,
      colorScheme: form.colorScheme,
      description: form.description,
      templateContent: {
        galleryImages: form.galleryImages,
        sections: form.sections as Partial<Record<import('@/lib/dummy-data').TemplateSectionKey, boolean>>,
      },
      coupleNames: form.coupleNames,
      personName: form.personName,
      companyName: form.companyName,
      hostName: form.hostName,
      message: form.message,
    }
    addNewEvent(newEvent)
    draftUtils.clearDraft()
    setCreatedEvent(newEvent)
    setSubmitting(false)
    setStep('success')
  }

  if (step === 'success' && createdEvent) {
    return (
      <SuccessScreen
        event={createdEvent}
        onAddGuests={() => router.push(`/dashboard/events/${createdEvent.id}/guests`)}
        onEditInvite={() => router.push(`/dashboard/events/${createdEvent.id}/edit`)}
      />
    )
  }

  return (
    <div className="p-6 lg:p-8 w-full">
      {/* Step indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h1
            className="text-2xl font-bold text-ink"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            {stepLabel}
          </h1>
          <span className="text-sm text-ink-muted">
            Step {stepNumber} of {totalSteps}
          </span>
        </div>
        <div className="h-1 bg-border rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-accent rounded-full"
            animate={{ width: progressPct }}
            transition={{ duration: 0.4, ease: easeOut }}
          />
        </div>
      </div>

      {/* Step content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={String(step)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {step === 1 && (
            <TemplateGallery
              selected={form.template}
              selectedScheme={form.colorScheme}
              onSelect={(templateId, eventType) => {
                const config = TEMPLATE_CONFIGS.find((t) => t.id === templateId)
                const hasPremiumSchemes = (config?.colorSchemes?.length ?? 0) > 0
                setForm((f) => ({
                  ...f,
                  template: templateId,
                  type: eventType,
                  colorScheme: 1,
                  ceremonies: getDefaultCeremonies(eventType),
                  sections: {},
                  galleryImages: [],
                  coupleNames: undefined,
                  personName: undefined,
                  companyName: undefined,
                  hostName: undefined,
                  message: undefined,
                }))
                if (!hasPremiumSchemes) setStep(2)
              }}
              onSchemeChange={(scheme) => setForm((f) => ({ ...f, colorScheme: scheme }))}
              onAdvance={() => setStep(2)}
            />
          )}

          {step === 2 && (
            <DetailsForm
              form={form}
              templateConfig={templateConfig}
              onChange={setForm}
              onBack={() => setStep(1)}
              onNext={() => setStep(3)}
              onSubmit={handleCreate}
              submitting={submitting}
              isLastStep={totalSteps === 2}
            />
          )}

          {step === 3 && (
            <CustomizeForm
              form={form}
              templateConfig={templateConfig}
              onChange={setForm}
              onBack={() => setStep(2)}
              onSubmit={handleCreate}
              submitting={submitting}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
