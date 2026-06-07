import { DawatEvent, TemplateContent, TemplateSectionKey } from './dummy-data'

type ResolvedSections = Record<TemplateSectionKey, boolean>

export type ResolvedContent = Required<Omit<TemplateContent, 'sections'>> & {
  sections: ResolvedSections
}

type TextDefaults = Required<Omit<TemplateContent, 'sections'>>

const BLOOM_DEFAULTS: TextDefaults = {
  heroTagline: 'Join us beneath open skies',
  aboutLabel: 'Our Story',
  aboutHeading: 'A Beautiful Journey Begins',
  countdownLabel: 'Counting the days',
  scheduleLabel: 'Schedule',
  scheduleHeading: 'Events & Celebrations',
  locationLabel: 'Venue',
  galleryLabel: 'Gallery',
  galleryHeading: 'Moments',
  galleryImages: [
    'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80',
    'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&q=80',
    'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600&q=80',
    'https://images.unsplash.com/photo-1464699908537-0954e50791ee?w=600&q=80',
    'https://images.unsplash.com/photo-1510076857177-7470076d4098?w=600&q=80',
    'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=600&q=80',
  ],
  giftLabel: 'Gifts',
  giftHeading: 'Your presence blooms our day',
  giftBody: 'No gift is greater than your love and presence. Come empty-handed, leave with full hearts.',
  rsvpLabel: 'RSVP',
  rsvpHeading: 'Will you join us?',
}

const CONFETTI_DEFAULTS: TextDefaults = {
  heroTagline: "You're Invited!",
  aboutLabel: 'About',
  aboutHeading: 'The Birthday Star ⭐',
  countdownLabel: 'Counting the days',
  scheduleLabel: 'Party Details',
  scheduleHeading: 'Join the Celebration!',
  locationLabel: 'Party Venue',
  galleryLabel: 'Gallery',
  galleryHeading: 'Sweet Memories 📸',
  galleryImages: [
    'https://picsum.photos/seed/party1/600/400',
    'https://picsum.photos/seed/party2/600/400',
    'https://picsum.photos/seed/party3/600/400',
    'https://picsum.photos/seed/party4/600/400',
  ],
  giftLabel: 'Gifts',
  giftHeading: "Your Presence Is the Best Present!",
  giftBody: "Your love and hugs mean everything. No gift needed — just bring your smile!",
  rsvpLabel: 'RSVP',
  rsvpHeading: 'Will you come? 🥳',
}

const MINIMAL_DEFAULTS: TextDefaults = {
  heroTagline: 'You are invited',
  aboutLabel: 'About',
  aboutHeading: '',
  countdownLabel: 'Counting the days',
  scheduleLabel: 'Schedule',
  scheduleHeading: '',
  locationLabel: 'Venue',
  galleryLabel: 'Gallery',
  galleryHeading: '',
  galleryImages: [
    'https://picsum.photos/seed/min1/600/400',
    'https://picsum.photos/seed/min2/600/400',
    'https://picsum.photos/seed/min3/600/400',
    'https://picsum.photos/seed/min4/600/400',
  ],
  giftLabel: 'Gifts',
  giftHeading: 'Your Presence Is Our Gift',
  giftBody: 'No gift necessary — your attendance makes all the difference.',
  rsvpLabel: 'RSVP',
  rsvpHeading: 'Will you attend?',
}

const TEMPLATE_DEFAULTS: Record<string, TextDefaults> = {
  bloom: BLOOM_DEFAULTS,
  garden: BLOOM_DEFAULTS,
  midnight: BLOOM_DEFAULTS,
  confetti: CONFETTI_DEFAULTS,
  minimal: MINIMAL_DEFAULTS,
}

const ALL_SECTIONS_VISIBLE: ResolvedSections = {
  about: true,
  countdown: true,
  schedule: true,
  location: true,
  gallery: true,
  gift: true,
  rsvp: true,
}

export function resolveContent(event: DawatEvent): ResolvedContent {
  const defaults = TEMPLATE_DEFAULTS[event.template] ?? MINIMAL_DEFAULTS
  const tc = event.templateContent ?? {}

  return {
    heroTagline:     tc.heroTagline     ?? defaults.heroTagline,
    aboutLabel:      tc.aboutLabel      ?? defaults.aboutLabel,
    aboutHeading:    tc.aboutHeading    ?? defaults.aboutHeading,
    countdownLabel:  tc.countdownLabel  ?? defaults.countdownLabel,
    scheduleLabel:   tc.scheduleLabel   ?? defaults.scheduleLabel,
    scheduleHeading: tc.scheduleHeading ?? defaults.scheduleHeading,
    locationLabel:   tc.locationLabel   ?? defaults.locationLabel,
    galleryLabel:    tc.galleryLabel    ?? defaults.galleryLabel,
    galleryHeading:  tc.galleryHeading  ?? defaults.galleryHeading,
    galleryImages:   tc.galleryImages   ?? defaults.galleryImages,
    giftLabel:       tc.giftLabel       ?? defaults.giftLabel,
    giftHeading:     tc.giftHeading     ?? defaults.giftHeading,
    giftBody:        tc.giftBody        ?? defaults.giftBody,
    rsvpLabel:       tc.rsvpLabel       ?? defaults.rsvpLabel,
    rsvpHeading:     tc.rsvpHeading     ?? defaults.rsvpHeading,
    sections: {
      ...ALL_SECTIONS_VISIBLE,
      ...tc.sections,
    },
  }
}
