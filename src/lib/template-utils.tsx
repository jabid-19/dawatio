'use client'

import { DawatEvent, Template, DUMMY_EVENTS } from '@/lib/dummy-data'
import NewTemplateRenderer from '@/components/templates/TemplateRenderer'

// Re-export the new TemplateRenderer under the same name so all consumers work unchanged
export { NewTemplateRenderer as TemplateRenderer }

// Category → event type mapping for preview events
const CATEGORY_EVENT_TYPE: Record<Template['category'], DawatEvent['type']> = {
  wedding:    'wedding',
  birthday:   'birthday',
  corporate:  'corporate',
  engagement: 'engagement',
  eid:        'eid',
  other:      'other',
  all:        'other',
}

// Base DUMMY_EVENTS indexed by type for fast lookup
const BASE_EVENTS: Partial<Record<DawatEvent['type'], DawatEvent>> = {
  wedding:  DUMMY_EVENTS[0],
  birthday: DUMMY_EVENTS[1],
}

function makeSyntheticEvent(type: DawatEvent['type'], templateId: string): DawatEvent {
  const titles: Record<DawatEvent['type'], string> = {
    wedding:    'Nadia & Rafiq Wedding',
    birthday:   "Aryan's 1st Birthday",
    corporate:  'Annual Leadership Summit',
    engagement: 'Laila & Hassan Engagement',
    eid:        'Eid Al-Fitr Gathering',
    other:      'Special Celebration',
  }
  return {
    id: `preview_${templateId}`,
    title: titles[type] ?? 'Your Event',
    type,
    slug: `preview-${templateId}`,
    status: 'draft',
    plan: 'free',
    createdAt: '2026-01-01',
    eventDate: '2026-06-15',
    expiresAt: '2026-09-15',
    coverImage: null,
    subEvents: [
      { id: 'se_p1', name: 'Main Event', date: '15 June 2026', time: '6:00 PM', venue: 'Grand Venue, Dhaka' },
      { id: 'se_p2', name: 'After Party', date: '15 June 2026', time: '9:00 PM', venue: 'Rooftop Lounge, Dhaka' },
    ],
    rsvpCount: 0,
    guestCount: 100,
    template: templateId,
    description: 'A wonderful celebration bringing loved ones together.',
  }
}

export function getPreviewEvent(template: Template): DawatEvent {
  const type = CATEGORY_EVENT_TYPE[template.category]
  const base = BASE_EVENTS[type]
  if (base) return { ...base, template: template.id }
  return makeSyntheticEvent(type, template.id)
}
