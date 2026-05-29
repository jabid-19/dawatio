export const DUMMY_USER = {
  email: 'demo@dawat.app',
  password: 'demo1234',
  name: 'Jabid Rahman',
  avatar: null,
}

export type EventPlan = 'free' | 'basic' | 'wedding' | 'premium'
export type EventStatus = 'published' | 'draft'
export type EventType = 'wedding' | 'birthday' | 'engagement' | 'festive' | 'corporate' | 'other'

export interface SubEvent {
  id: string
  name: string
  date: string
  time: string
  venue: string
}

export type TemplateSectionKey =
  | 'about'
  | 'countdown'
  | 'schedule'
  | 'location'
  | 'gallery'
  | 'gift'
  | 'rsvp'

export interface TemplateContent {
  sections?: Partial<Record<TemplateSectionKey, boolean>>
  heroTagline?: string
  aboutLabel?: string
  aboutHeading?: string
  countdownLabel?: string
  scheduleLabel?: string
  scheduleHeading?: string
  locationLabel?: string
  galleryLabel?: string
  galleryHeading?: string
  galleryImages?: string[]
  giftLabel?: string
  giftHeading?: string
  giftBody?: string
  rsvpLabel?: string
  rsvpHeading?: string
}

export interface DawatEvent {
  id: string
  title: string
  type: EventType
  slug: string
  status: EventStatus
  plan: EventPlan
  createdAt: string
  eventDate: string
  expiresAt: string
  coverImage: string | null
  subEvents: SubEvent[]
  rsvpCount: number
  guestCount: number
  template: string
  colorScheme?: number
  description?: string
  templateContent?: TemplateContent
}

export const DUMMY_EVENTS: DawatEvent[] = [
  {
    id: 'evt_01',
    title: 'Nadia & Rafiq Wedding',
    type: 'wedding',
    slug: 'nadia-rafiq-2025',
    status: 'published',
    plan: 'wedding',
    createdAt: '2025-10-01',
    eventDate: '2025-12-14',
    expiresAt: '2026-03-14',
    coverImage: null,
    subEvents: [
      { id: 'se_01', name: 'Holud', date: '2025-12-12', time: '5:00 PM', venue: 'Family Residence, Dhanmondi' },
      { id: 'se_02', name: 'Akad', date: '2025-12-13', time: '11:00 AM', venue: 'Al-Noor Mosque, Gulshan' },
      { id: 'se_03', name: 'Reception', date: '2025-12-14', time: '7:00 PM', venue: 'Radisson Blu, Dhaka' },
    ],
    rsvpCount: 87,
    guestCount: 150,
    template: 'bloom',
    description: 'Join us as we celebrate the union of Nadia and Rafiq — a beautiful journey begins.',
  },
  {
    id: 'evt_02',
    title: "Aryan's 1st Birthday",
    type: 'birthday',
    slug: 'aryan-first-birthday',
    status: 'draft',
    plan: 'free',
    createdAt: '2025-11-10',
    eventDate: '2025-12-20',
    expiresAt: '2026-01-20',
    coverImage: null,
    subEvents: [
      { id: 'se_04', name: 'Birthday Party', date: '2025-12-20', time: '3:00 PM', venue: 'Home, Uttara' },
    ],
    rsvpCount: 12,
    guestCount: 40,
    template: 'confetti',
    description: "Our little star turns one! Come celebrate Aryan's first birthday with us.",
  },
]

export interface RSVP {
  id: string
  name: string
  phone: string
  attending: boolean
  subEventIds: string[]
  respondedAt: string
}

export const DUMMY_RSVPS: RSVP[] = [
  { id: 'r1', name: 'Ahmed Hossain', phone: '01711XXXXXX', attending: true, subEventIds: ['se_01', 'se_02', 'se_03'], respondedAt: '2025-11-15' },
  { id: 'r2', name: 'Fatema Begum', phone: '01811XXXXXX', attending: true, subEventIds: ['se_03'], respondedAt: '2025-11-16' },
  { id: 'r3', name: 'Karim Chowdhury', phone: '01911XXXXXX', attending: false, subEventIds: [], respondedAt: '2025-11-17' },
  { id: 'r4', name: 'Rina Akter', phone: '01712XXXXXX', attending: true, subEventIds: ['se_01', 'se_03'], respondedAt: '2025-11-18' },
  { id: 'r5', name: 'Shahid Islam', phone: '01812XXXXXX', attending: true, subEventIds: ['se_02', 'se_03'], respondedAt: '2025-11-19' },
  { id: 'r6', name: 'Nusrat Jahan', phone: '01912XXXXXX', attending: true, subEventIds: ['se_03'], respondedAt: '2025-11-20' },
  { id: 'r7', name: 'Rakib Hassan', phone: '01713XXXXXX', attending: false, subEventIds: [], respondedAt: '2025-11-21' },
  { id: 'r8', name: 'Sumaiya Khanam', phone: '01813XXXXXX', attending: true, subEventIds: ['se_01', 'se_02', 'se_03'], respondedAt: '2025-11-22' },
  { id: 'r9', name: 'Tariq Mahmud', phone: '01913XXXXXX', attending: true, subEventIds: ['se_03'], respondedAt: '2025-11-23' },
  { id: 'r10', name: 'Aisha Rahman', phone: '01714XXXXXX', attending: true, subEventIds: ['se_01', 'se_03'], respondedAt: '2025-11-24' },
  { id: 'r11', name: 'Farhan Kabir', phone: '01814XXXXXX', attending: false, subEventIds: [], respondedAt: '2025-11-25' },
  { id: 'r12', name: 'Mitu Akhter', phone: '01914XXXXXX', attending: true, subEventIds: ['se_02', 'se_03'], respondedAt: '2025-11-26' },
  { id: 'r13', name: 'Imran Khan', phone: '01715XXXXXX', attending: true, subEventIds: ['se_03'], respondedAt: '2025-11-27' },
  { id: 'r14', name: 'Sadia Afrin', phone: '01815XXXXXX', attending: true, subEventIds: ['se_01', 'se_02', 'se_03'], respondedAt: '2025-11-28' },
  { id: 'r15', name: 'Zahir Uddin', phone: '01915XXXXXX', attending: true, subEventIds: ['se_03'], respondedAt: '2025-11-29' },
]

export interface Template {
  id: string
  name: string
  category: 'wedding' | 'birthday' | 'corporate' | 'engagement' | 'festive' | 'other' | 'all'
  isPremium: boolean
  primaryColor: string
  accentColor: string
  defaultCover?: string | null
}

export const TEMPLATES: Template[] = [
  // Wedding
  { id: 'bloom',        name: 'Bloom',         category: 'wedding',    isPremium: false, primaryColor: '#C9622F', accentColor: '#D4A853', defaultCover: null },
  { id: 'midnight',     name: 'Midnight',      category: 'wedding',    isPremium: true,  primaryColor: '#C5AA6A', accentColor: '#E8D5A3', defaultCover: null },
  { id: 'minimaa',      name: 'Minimaa',       category: 'wedding',    isPremium: true,  primaryColor: '#1A1A1A', accentColor: '#C9622F', defaultCover: null },
  { id: 'garden',       name: 'Garden',        category: 'wedding',    isPremium: true,  primaryColor: '#3D6B4F', accentColor: '#D4A853', defaultCover: null },
  { id: 'royal',        name: 'Royal',         category: 'wedding',    isPremium: true,  primaryColor: '#5B2C6F', accentColor: '#D4A853', defaultCover: null },
  // Birthday
  { id: 'confetti',     name: 'Confetti',      category: 'birthday',   isPremium: false, primaryColor: '#E85D9A', accentColor: '#F5C842', defaultCover: null },
  { id: 'neon',         name: 'Neon',          category: 'birthday',   isPremium: true,  primaryColor: '#FF2D95', accentColor: '#00D4FF', defaultCover: null },
  { id: 'pastel-dream', name: 'Pastel Dream',  category: 'birthday',   isPremium: true,  primaryColor: '#F8B4D9', accentColor: '#D4B8FF', defaultCover: null },
  { id: 'bold-loud',    name: 'Bold & Loud',   category: 'birthday',   isPremium: true,  primaryColor: '#FF6B2B', accentColor: '#AAFF00', defaultCover: null },
  { id: 'elegant-age',  name: 'Elegant Age',   category: 'birthday',   isPremium: true,  primaryColor: '#1A1A2E', accentColor: '#C9A84C', defaultCover: null },
  // Corporate
  { id: 'clean-desk',   name: 'Clean Desk',    category: 'corporate',  isPremium: false, primaryColor: '#1E3A5F', accentColor: '#2C7BE5', defaultCover: null },
  { id: 'summit',       name: 'Summit',        category: 'corporate',  isPremium: true,  primaryColor: '#0D0D0D', accentColor: '#00C2FF', defaultCover: null },
  { id: 'boardroom',    name: 'Boardroom',     category: 'corporate',  isPremium: true,  primaryColor: '#1C1C1C', accentColor: '#B8860B', defaultCover: null },
  { id: 'launch',       name: 'Launch',        category: 'corporate',  isPremium: true,  primaryColor: '#0D4B5F', accentColor: '#FF6B35', defaultCover: null },
  { id: 'gala-night',   name: 'Gala Night',    category: 'corporate',  isPremium: true,  primaryColor: '#D4A853', accentColor: '#F2E6C9', defaultCover: null },
  // Engagement
  { id: 'first-yes',    name: 'First Yes',     category: 'engagement', isPremium: false, primaryColor: '#D4727A', accentColor: '#C9A84C', defaultCover: null },
  { id: 'golden-ring',  name: 'Golden Ring',   category: 'engagement', isPremium: true,  primaryColor: '#C9A84C', accentColor: '#B8960C', defaultCover: null },
  { id: 'modern-love',  name: 'Modern Love',   category: 'engagement', isPremium: true,  primaryColor: '#C9622F', accentColor: '#3D6B4F', defaultCover: null },
  { id: 'story',        name: 'Story',         category: 'engagement', isPremium: true,  primaryColor: '#7B5C3A', accentColor: '#C9A875', defaultCover: null },
  { id: 'celestial',    name: 'Celestial',     category: 'engagement', isPremium: true,  primaryColor: '#C0C8E8', accentColor: '#E8A0B0', defaultCover: null },
  // Festive
  { id: 'crescent',       name: 'Crescent',        category: 'festive', isPremium: false, primaryColor: '#2D7A4F', accentColor: '#C9A84C', defaultCover: null },
  { id: 'lantern',        name: 'Lantern',         category: 'festive', isPremium: true,  primaryColor: '#1B6B6B', accentColor: '#E8A030', defaultCover: null },
  { id: 'iftar-table',   name: 'Iftar Table',     category: 'festive', isPremium: true,  primaryColor: '#D4622F', accentColor: '#E8A030', defaultCover: null },
  { id: 'geometric',     name: 'Geometric',       category: 'festive', isPremium: true,  primaryColor: '#2D7A4F', accentColor: '#C9A84C', defaultCover: null },
  { id: 'festive-night', name: 'Festive Night',   category: 'festive', isPremium: true,  primaryColor: '#C9A84C', accentColor: '#8B1A2B', defaultCover: null },
  { id: 'puja-diyas',    name: 'Diyas',           category: 'festive', isPremium: true,  primaryColor: '#D4622F', accentColor: '#E8A030', defaultCover: null },
  { id: 'puja-mandap',   name: 'Floral Mandap',   category: 'festive', isPremium: true,  primaryColor: '#C9622F', accentColor: '#D4A853', defaultCover: null },
  { id: 'puja-gold',     name: 'Golden Prayer',   category: 'festive', isPremium: true,  primaryColor: '#8B1A2B', accentColor: '#D4A853', defaultCover: null },
  { id: 'nye-gala',      name: 'Midnight Gala',   category: 'festive', isPremium: true,  primaryColor: '#D4A853', accentColor: '#F2E6C9', defaultCover: null },
  { id: 'nye-fireworks', name: 'Fireworks Night', category: 'festive', isPremium: true,  primaryColor: '#1E3A8A', accentColor: '#D4A853', defaultCover: null },
  { id: 'nye-glam',      name: 'Midnight Glam',   category: 'festive', isPremium: true,  primaryColor: '#1A1A1A', accentColor: '#C0C0C8', defaultCover: null },
  // Other
  { id: 'simple',       name: 'Simple',        category: 'other',      isPremium: false, primaryColor: '#1A1A1A', accentColor: '#C9622F', defaultCover: null },
  { id: 'reunion',      name: 'Reunion',       category: 'other',      isPremium: true,  primaryColor: '#7B5C3A', accentColor: '#D4A853', defaultCover: null },
  { id: 'graduation',   name: 'Graduation',    category: 'other',      isPremium: true,  primaryColor: '#1E3A8A', accentColor: '#C9A84C', defaultCover: null },
  { id: 'housewarming', name: 'Housewarming',  category: 'other',      isPremium: true,  primaryColor: '#C9622F', accentColor: '#3D6B4F', defaultCover: null },
  { id: 'anniversary',  name: 'Anniversary',   category: 'other',      isPremium: true,  primaryColor: '#8B1A2B', accentColor: '#C9A84C', defaultCover: null },
]

export const PLAN_ORDER: Record<EventPlan, number> = {
  free: 0,
  basic: 1,
  wedding: 2,
  premium: 3,
}

export function planSatisfies(current: EventPlan, required: EventPlan): boolean {
  return PLAN_ORDER[current] >= PLAN_ORDER[required]
}

export const PLAN_PRICES: Record<EventPlan, string> = {
  free: 'Free',
  basic: '৳299',
  wedding: '৳599',
  premium: '৳999',
}
