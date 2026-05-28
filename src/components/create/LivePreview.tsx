'use client'

import { useMemo } from 'react'
import { DawatEvent, EventType, SubEvent } from '@/lib/dummy-data'
import { TemplateRenderer } from '@/lib/template-utils'

export interface CreateFormState {
  type: EventType | null
  title: string
  date: string
  time: string
  venue: string
  description: string
  template: string
  colorScheme: number
  coverImage: string | null
  ceremonies: SubEvent[]
}

export interface LivePreviewProps {
  form: CreateFormState
  className?: string
}

function formToEvent(form: CreateFormState): DawatEvent {
  const slug = form.title
    ? form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    : 'preview'
  return {
    id: 'preview',
    title: form.title || 'Your Event',
    type: form.type || 'other',
    slug,
    status: 'draft',
    plan: 'free',
    createdAt: new Date().toISOString().split('T')[0],
    eventDate: form.date || new Date().toISOString().split('T')[0],
    expiresAt: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
    coverImage: form.coverImage,
    subEvents:
      form.ceremonies.length > 0
        ? form.ceremonies
        : [
            {
              id: 'se_preview',
              name: form.title || 'The Event',
              date: form.date || '',
              time: form.time || '6:00 PM',
              venue: form.venue || 'Venue TBD',
            },
          ],
    rsvpCount: 0,
    guestCount: 50,
    template: form.template,
    colorScheme: form.colorScheme,
    description: form.description,
  }
}

export function LivePreview({ form, className }: LivePreviewProps) {
  const event = useMemo(
    () => formToEvent(form),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      form.type,
      form.title,
      form.date,
      form.time,
      form.venue,
      form.description,
      form.template,
      form.colorScheme,
      form.coverImage,
      form.ceremonies,
    ]
  )

  return (
    <div className={className}>
      {/* Phone mockup frame */}
      <div className="max-w-[390px] mx-auto rounded-[2.5rem] overflow-hidden bg-white shadow-[var(--shadow-modal)] ring-2 ring-black/5">
        {/* Status bar */}
        <div className="h-7 bg-black flex items-center justify-center">
          <div className="w-16 h-1.5 bg-zinc-700 rounded-full" />
        </div>

        {/* Template content */}
        <div className="max-w-[390px] w-full mx-auto">
          <TemplateRenderer event={event} disableEffects />
        </div>
      </div>

      <p className="text-xs text-ink-muted text-center mt-3">Live preview</p>
    </div>
  )
}
