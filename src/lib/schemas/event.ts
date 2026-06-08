import { z } from 'zod'

export const SECTION_KEYS = ['about', 'countdown', 'schedule', 'location', 'gallery', 'rsvp'] as const
export type SectionKey = typeof SECTION_KEYS[number]

export const subEventSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Ceremony name required'),
  date: z.string(),
  time: z.string(),
  venue: z.string(),
})

export const createEventSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title too long'),
  type: z.enum(['wedding', 'birthday', 'engagement', 'festive', 'corporate', 'other']),
  template: z.string().min(1),
  colorScheme: z.number().int().min(1).default(1),
  date: z.string().min(1, 'Date is required'),
  time: z.string().optional(),
  venue: z.string().optional(),
  description: z.string().max(500).optional(),
  coverImage: z.string().nullable().optional(),
  ceremonies: z.array(subEventSchema).default([]),
  coupleNames: z.object({
    partner1: z.string(),
    partner2: z.string(),
  }).optional(),
  personName: z.string().optional(),
  companyName: z.string().optional(),
  hostName: z.string().optional(),
  message: z.string().max(300).optional(),
  galleryImages: z.array(z.string()).default([]),
  sections: z.record(z.string(), z.boolean()).optional(),
})

export type CreateEventInput = z.infer<typeof createEventSchema>
export type SubEventInput = z.infer<typeof subEventSchema>
