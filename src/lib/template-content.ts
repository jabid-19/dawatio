import { DawatEvent, TemplateSectionKey } from './dummy-data'
import type { SectionKey } from './schemas/event'

type ResolvedSections = Record<TemplateSectionKey, boolean>

export type ResolvedContent = {
  galleryImages: string[]
  sections: ResolvedSections
}

const DEFAULT_GALLERY_IMAGES: string[] = [
  'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80',
  'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&q=80',
  'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600&q=80',
  'https://images.unsplash.com/photo-1464699908537-0954e50791ee?w=600&q=80',
]

const ALL_SECTIONS_VISIBLE: ResolvedSections = {
  about: true,
  countdown: true,
  schedule: true,
  location: true,
  gallery: true,
  rsvp: true,
}

export function resolveContent(event: DawatEvent): ResolvedContent {
  const tc = event.templateContent ?? {}
  return {
    galleryImages: tc.galleryImages ?? DEFAULT_GALLERY_IMAGES,
    sections: {
      ...ALL_SECTIONS_VISIBLE,
      ...tc.sections,
    },
  }
}

export function defaultSectionsForTemplate(supportedSections: SectionKey[]): ResolvedSections {
  return {
    about:     supportedSections.includes('about'),
    countdown: supportedSections.includes('countdown'),
    schedule:  supportedSections.includes('schedule'),
    location:  supportedSections.includes('location'),
    gallery:   supportedSections.includes('gallery'),
    rsvp:      supportedSections.includes('rsvp'),
  }
}
