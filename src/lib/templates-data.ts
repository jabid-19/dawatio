import type { SectionKey } from '@/lib/schemas/event'

export type TemplateCategory = 'wedding' | 'birthday' | 'corporate' | 'engagement' | 'festive' | 'other'

export type TemplateIdentityField = 'coupleNames' | 'personName' | 'companyName' | 'hostName' | 'message'

export interface ColorScheme {
  id: number
  label: string
  bg: string
  surface: string
  primary: string
  secondary: string
  text: string
  muted: string
}

export interface TemplateConfig {
  id: string
  name: string
  category: TemplateCategory
  isPremium: boolean
  description: string
  personality: string
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    text: string
    textMuted: string
  }
  fonts: {
    display: string
    body: string
    displayVar: string
    bodyVar: string
  }
  previewTags: string[]
  colorSchemes: ColorScheme[]
  isComplex: boolean
  supportedSections: SectionKey[]
  supportedFields: TemplateIdentityField[]
}

export interface RSVPFormData {
  name: string
  phone: string
  attending: boolean
  selectedSubEvents: string[]
  message: string
}

export interface SubEvent {
  id: string
  name: string
  date: string
  time: string
  venue: string
}

export interface TemplateProps {
  event: {
    title: string
    type: string
    description: string
    coverImage: string | null
    eventDate: string
    subEvents: SubEvent[]
    gallery: string[]
    coupleNames?: { partner1: string; partner2: string }
    personName?: string
    companyName?: string
    hostName?: string
    message?: string
    sections: Record<import('@/lib/dummy-data').TemplateSectionKey, boolean>
  }
  branding: {
    showDawatBranding: boolean
  }
  onRsvpSubmit: (data: RSVPFormData) => void
  colors?: ColorScheme
  disableEffects?: boolean
}

export const TEMPLATE_CONFIGS: TemplateConfig[] = [
  // ─── Wedding ───────────────────────────────────────────────
  {
    id: 'bloom',
    name: 'Bloom',
    category: 'wedding',
    isPremium: false,
    description: 'Romantic floral design with warm botanical illustrations',
    personality: 'Romantic, floral, warm, organic',
    colors: {
      primary: '#C9622F',
      secondary: '#D4A853',
      accent: '#8B5E3C',
      background: '#FAF6F0',
      text: '#2C2420',
      textMuted: '#8A7D74',
    },
    fonts: { display: 'Playfair Display', body: 'DM Sans', displayVar: '--font-playfair', bodyVar: '--font-dm-sans' },
    previewTags: ['romantic', 'floral', 'warm'],
    colorSchemes: [],
    isComplex: true,
    supportedSections: ['countdown', 'about', 'schedule', 'gallery', 'location', 'rsvp'],
    supportedFields: ['coupleNames'],
  },
  {
    id: 'midnight',
    name: 'Midnight',
    category: 'wedding',
    isPremium: true,
    description: 'Dramatic dark luxury with champagne gold accents',
    personality: 'Dramatic, luxury, dark-light contrast, cinematic',
    colors: {
      primary: '#C5AA6A',
      secondary: '#1C2036',
      accent: '#E8D5A3',
      background: '#0C0F1A',
      text: '#F0EDE6',
      textMuted: '#8A8070',
    },
    fonts: { display: 'Cormorant Garamond', body: 'Outfit', displayVar: '--font-cormorant', bodyVar: '--font-outfit' },
    previewTags: ['luxury', 'dark', 'cinematic'],
    colorSchemes: [
      { id: 1, label: 'Classic',  bg: '#0C0F1A', surface: '#1C2036', primary: '#C5AA6A', secondary: '#E8D5A3', text: '#F0EDE6', muted: '#8A8070' },
      { id: 2, label: 'Navy',     bg: '#05101A', surface: '#0D2236', primary: '#64A0C8', secondary: '#B8D4E8', text: '#E8EFF5', muted: '#7A9AB0' },
      { id: 3, label: 'Wine',     bg: '#120810', surface: '#260D24', primary: '#C56A8A', secondary: '#E8C4D0', text: '#F0E6EC', muted: '#907080' },
    ],
    isComplex: true,
    supportedSections: ['countdown', 'schedule', 'about', 'gallery', 'rsvp'],
    supportedFields: ['coupleNames'],
  },
  {
    id: 'minimaa',
    name: 'Minimaa',
    category: 'wedding',
    isPremium: true,
    description: 'Ultra-minimal editorial Swiss-design typography',
    personality: 'Ultra-minimal, editorial, Swiss-design, typography-only',
    colors: {
      primary: '#1A1A1A',
      secondary: '#1A1A1A',
      accent: '#C9622F',
      background: '#FFFFFF',
      text: '#1A1A1A',
      textMuted: '#999999',
    },
    fonts: { display: 'Libre Baskerville', body: 'Space Grotesk', displayVar: '--font-libre-baskerville', bodyVar: '--font-space-grotesk' },
    previewTags: ['minimal', 'editorial', 'clean'],
    colorSchemes: [
      { id: 1, label: 'Classic', bg: '#FFFFFF', surface: '#F5F5F5', primary: '#1A1A1A', secondary: '#C9622F', text: '#1A1A1A', muted: '#999999' },
      { id: 2, label: 'Stone',   bg: '#F5F4F0', surface: '#ECEAE4', primary: '#2C2C28', secondary: '#8B7355', text: '#2C2C28', muted: '#9A9080' },
      { id: 3, label: 'Cobalt',  bg: '#FFFFFF', surface: '#F0F4FF', primary: '#1A2C6B', secondary: '#C9622F', text: '#1A2C6B', muted: '#6B7A9A' },
    ],
    isComplex: true,
    supportedSections: ['countdown', 'schedule', 'about', 'gallery', 'rsvp'],
    supportedFields: ['coupleNames'],
  },
  {
    id: 'garden',
    name: 'Garden',
    category: 'wedding',
    isPremium: true,
    description: 'Fresh outdoor botanical with airy nature-inspired design',
    personality: 'Fresh, outdoor, botanical, airy, nature-inspired',
    colors: {
      primary: '#3D6B4F',
      secondary: '#D4A853',
      accent: '#8CB369',
      background: '#F4F7F0',
      text: '#2A3C2E',
      textMuted: '#6B7D6F',
    },
    fonts: { display: 'Lora', body: 'Nunito Sans', displayVar: '--font-lora', bodyVar: '--font-nunito' },
    previewTags: ['botanical', 'fresh', 'outdoor'],
    colorSchemes: [
      { id: 1, label: 'Garden',     bg: '#F4F7F0', surface: '#E8F0E0', primary: '#3D6B4F', secondary: '#D4A853', text: '#2A3C2E', muted: '#6B7D6F' },
      { id: 2, label: 'Terracotta', bg: '#FAF5EE', surface: '#F0E0D0', primary: '#8B4A2B', secondary: '#D4A853', text: '#2C1810', muted: '#8A7060' },
      { id: 3, label: 'Lavender',   bg: '#F8F4FF', surface: '#EDE4F8', primary: '#5B3D8B', secondary: '#C9A84C', text: '#2A1C3C', muted: '#7A6A8A' },
    ],
    isComplex: true,
    supportedSections: ['countdown', 'about', 'schedule', 'gallery', 'rsvp'],
    supportedFields: ['coupleNames'],
  },
  {
    id: 'royal',
    name: 'Royal',
    category: 'wedding',
    isPremium: true,
    description: 'Opulent South Asian luxury with ornate traditional patterns',
    personality: 'Opulent, traditional, grand, South Asian luxury, ornate',
    colors: {
      primary: '#5B2C6F',
      secondary: '#D4A853',
      accent: '#8B1A2B',
      background: '#F9F5F0',
      text: '#2C1810',
      textMuted: '#7A6B62',
    },
    fonts: { display: 'EB Garamond', body: 'Poppins', displayVar: '--font-eb-garamond', bodyVar: '--font-poppins' },
    previewTags: ['royal', 'ornate', 'traditional'],
    colorSchemes: [
      { id: 1, label: 'Royal',   bg: '#F9F5F0', surface: '#F0E8D8', primary: '#5B2C6F', secondary: '#D4A853', text: '#2C1810', muted: '#7A6B62' },
      { id: 2, label: 'Crimson', bg: '#F9F0F2', surface: '#F0D8DC', primary: '#8B1A2B', secondary: '#D4A853', text: '#2C1010', muted: '#7A5060' },
      { id: 3, label: 'Emerald', bg: '#F0F9F2', surface: '#D8F0DC', primary: '#1A5C3A', secondary: '#D4A853', text: '#0C2010', muted: '#5A7A62' },
    ],
    isComplex: true,
    supportedSections: ['countdown', 'schedule', 'about', 'gallery', 'rsvp'],
    supportedFields: ['coupleNames'],
  },

  // ─── Birthday ──────────────────────────────────────────────
  {
    id: 'confetti',
    name: 'Confetti',
    category: 'birthday',
    isPremium: false,
    description: 'Fun playful kids-friendly colorful party celebration',
    personality: 'Fun, playful, kids-friendly, colorful party',
    colors: {
      primary: '#E85D9A',
      secondary: '#47C1BF',
      accent: '#F5C842',
      background: '#FFFDF7',
      text: '#2D2D2D',
      textMuted: '#777777',
    },
    fonts: { display: 'Fredoka', body: 'Quicksand', displayVar: '--font-fredoka', bodyVar: '--font-quicksand' },
    previewTags: ['fun', 'colorful', 'party'],
    colorSchemes: [],
    isComplex: true,
    supportedSections: ['countdown', 'about', 'gallery', 'rsvp'],
    supportedFields: ['personName'],
  },
  {
    id: 'neon',
    name: 'Neon',
    category: 'birthday',
    isPremium: true,
    description: 'Gen-Z nightlife dark with glowing neon elements',
    personality: 'Gen-Z, party, nightlife, dark with glowing elements',
    colors: {
      primary: '#FF2D95',
      secondary: '#00D4FF',
      accent: '#8B5CF6',
      background: '#0A0A0F',
      text: '#F0F0F0',
      textMuted: '#888888',
    },
    fonts: { display: 'Space Grotesk', body: 'Inter', displayVar: '--font-space-grotesk', bodyVar: '--font-inter' },
    previewTags: ['neon', 'dark', 'nightlife'],
    colorSchemes: [
      { id: 1, label: 'Neon',   bg: '#0A0A0F', surface: '#14141F', primary: '#FF2D95', secondary: '#00D4FF', text: '#F0F0F0', muted: '#888888' },
      { id: 2, label: 'Purple', bg: '#080B12', surface: '#12101E', primary: '#8B5CF6', secondary: '#00D4FF', text: '#F0F0F8', muted: '#8080A0' },
      { id: 3, label: 'Green',  bg: '#080F0A', surface: '#101E12', primary: '#00FF87', secondary: '#00D4FF', text: '#F0FFF4', muted: '#70A080' },
    ],
    isComplex: true,
    supportedSections: ['countdown', 'gallery', 'rsvp'],
    supportedFields: ['personName'],
  },
  {
    id: 'pastel-dream',
    name: 'Pastel Dream',
    category: 'birthday',
    isPremium: true,
    description: 'Soft aesthetic Instagram-worthy dreamy pastel design',
    personality: 'Soft, aesthetic, Instagram-worthy, dreamy',
    colors: {
      primary: '#F8B4D9',
      secondary: '#FFD4B8',
      accent: '#D4B8FF',
      background: '#FFF9FB',
      text: '#4A4A4A',
      textMuted: '#9A9A9A',
    },
    fonts: { display: 'Josefin Sans', body: 'Poppins', displayVar: '--font-josefin', bodyVar: '--font-poppins' },
    previewTags: ['pastel', 'dreamy', 'aesthetic'],
    colorSchemes: [
      { id: 1, label: 'Blush', bg: '#FFF9FB', surface: '#FFE8F4', primary: '#E87BB0', secondary: '#FFD4B8', text: '#4A4A4A', muted: '#9A9A9A' },
      { id: 2, label: 'Sky',   bg: '#F8FEFF', surface: '#E0F8FF', primary: '#5AAACA', secondary: '#B8D4FF', text: '#1A3A4A', muted: '#6A8A9A' },
      { id: 3, label: 'Mint',  bg: '#F4FFF8', surface: '#E0F8E8', primary: '#4AAA80', secondary: '#B8FFD4', text: '#1A3A2A', muted: '#6A9A7A' },
    ],
    isComplex: true,
    supportedSections: ['countdown', 'about', 'gallery', 'rsvp'],
    supportedFields: ['personName'],
  },
  {
    id: 'bold-loud',
    name: 'Bold & Loud',
    category: 'birthday',
    isPremium: true,
    description: 'Maximalist expressive Gen-Z attention-grabbing design',
    personality: 'Maximalist, expressive, Gen-Z, attention-grabbing',
    colors: {
      primary: '#FF6B2B',
      secondary: '#FF2D6B',
      accent: '#AAFF00',
      background: '#FFFFFF',
      text: '#111111',
      textMuted: '#555555',
    },
    fonts: { display: 'Rubik', body: 'Rubik', displayVar: '--font-rubik', bodyVar: '--font-rubik' },
    previewTags: ['bold', 'maximalist', 'expressive'],
    colorSchemes: [
      { id: 1, label: 'Flame',    bg: '#FFFFFF', surface: '#F5F5F5', primary: '#FF6B2B', secondary: '#FF2D6B', text: '#111111', muted: '#555555' },
      { id: 2, label: 'Electric', bg: '#F5FF00', surface: '#E8EE00', primary: '#0000CC', secondary: '#FF0066', text: '#000000', muted: '#333333' },
      { id: 3, label: 'Dark',     bg: '#0A0A0A', surface: '#1A1A1A', primary: '#AAFF00', secondary: '#FF6B2B', text: '#FFFFFF', muted: '#888888' },
    ],
    isComplex: true,
    supportedSections: ['countdown', 'gallery', 'rsvp'],
    supportedFields: ['personName'],
  },
  {
    id: 'elegant-age',
    name: 'Elegant Age',
    category: 'birthday',
    isPremium: true,
    description: 'Sophisticated mature design for milestone adult birthdays',
    personality: 'Sophisticated, mature, for adult birthdays',
    colors: {
      primary: '#1A1A2E',
      secondary: '#B76E79',
      accent: '#C9A84C',
      background: '#FDFBF7',
      text: '#1A1A2E',
      textMuted: '#8A8698',
    },
    fonts: { display: 'Cormorant Garamond', body: 'Raleway', displayVar: '--font-cormorant', bodyVar: '--font-raleway' },
    previewTags: ['elegant', 'milestone', 'sophisticated'],
    colorSchemes: [
      { id: 1, label: 'Ink',  bg: '#FDFBF7', surface: '#F0EBE8', primary: '#1A1A2E', secondary: '#B76E79', text: '#1A1A2E', muted: '#8A8698' },
      { id: 2, label: 'Gold', bg: '#FDFBF5', surface: '#F0EAD0', primary: '#6B4C2A', secondary: '#C9A84C', text: '#2C2010', muted: '#8A7860' },
      { id: 3, label: 'Slate', bg: '#F5F5F8', surface: '#E8E8F0', primary: '#2C3E60', secondary: '#6B8AAA', text: '#1A2030', muted: '#6A7A8A' },
    ],
    isComplex: true,
    supportedSections: ['countdown', 'about', 'gallery', 'rsvp'],
    supportedFields: ['personName'],
  },

  // ─── Corporate ─────────────────────────────────────────────
  {
    id: 'clean-desk',
    name: 'Clean Desk',
    category: 'corporate',
    isPremium: false,
    description: 'Professional trustworthy clean agenda-focused design',
    personality: 'Professional, trustworthy, simple, clean',
    colors: {
      primary: '#1E3A5F',
      secondary: '#2C7BE5',
      accent: '#2C7BE5',
      background: '#FFFFFF',
      text: '#1A202C',
      textMuted: '#718096',
    },
    fonts: { display: 'DM Sans', body: 'DM Sans', displayVar: '--font-dm-sans', bodyVar: '--font-dm-sans' },
    previewTags: ['professional', 'clean', 'corporate'],
    colorSchemes: [],
    isComplex: false,
    supportedSections: ['about', 'schedule', 'countdown', 'location', 'rsvp'],
    supportedFields: ['companyName', 'hostName'],
  },
  {
    id: 'summit',
    name: 'Summit',
    category: 'corporate',
    isPremium: true,
    description: 'Premium conference bold speaker-centric magazine-style',
    personality: 'Premium conference, bold, speaker-centric, magazine-style',
    colors: {
      primary: '#0D0D0D',
      secondary: '#3B82F6',
      accent: '#00C2FF',
      background: '#FAFAFA',
      text: '#0D0D0D',
      textMuted: '#6B7280',
    },
    fonts: { display: 'Syne', body: 'Inter', displayVar: '--font-syne', bodyVar: '--font-inter' },
    previewTags: ['conference', 'bold', 'premium'],
    colorSchemes: [
      { id: 1, label: 'Mono',    bg: '#FAFAFA', surface: '#F0F0F0', primary: '#0D0D0D', secondary: '#3B82F6', text: '#0D0D0D', muted: '#6B7280' },
      { id: 2, label: 'Dark',    bg: '#0D0D12', surface: '#1A1A24', primary: '#3B82F6', secondary: '#00C2FF', text: '#F5F5F8', muted: '#8080A0' },
      { id: 3, label: 'Crimson', bg: '#FAFAFA', surface: '#F5F0F0', primary: '#8B1A2B', secondary: '#E85D9A', text: '#1A0A0D', muted: '#7A5060' },
    ],
    isComplex: false,
    supportedSections: ['countdown', 'schedule', 'rsvp'],
    supportedFields: ['companyName'],
  },
  {
    id: 'boardroom',
    name: 'Boardroom',
    category: 'corporate',
    isPremium: true,
    description: 'Executive conservative formal data-focused design',
    personality: 'Executive, conservative, formal, data-focused',
    colors: {
      primary: '#1C1C1C',
      secondary: '#B8860B',
      accent: '#B8860B',
      background: '#FDFDFC',
      text: '#1C1C1C',
      textMuted: '#6B6B6B',
    },
    fonts: { display: 'Source Serif 4', body: 'Source Sans 3', displayVar: '--font-source-serif', bodyVar: '--font-source-sans' },
    previewTags: ['executive', 'formal', 'conservative'],
    colorSchemes: [
      { id: 1, label: 'Gold',    bg: '#FDFDFC', surface: '#F0EFE8', primary: '#1C1C1C', secondary: '#B8860B', text: '#1C1C1C', muted: '#6B6B6B' },
      { id: 2, label: 'Navy',    bg: '#F8F9FC', surface: '#E8ECF5', primary: '#1A2C5F', secondary: '#4A6AAA', text: '#0D1830', muted: '#5A6A80' },
      { id: 3, label: 'Charcoal', bg: '#F5F5F5', surface: '#E5E5E5', primary: '#2C2C2C', secondary: '#888888', text: '#1A1A1A', muted: '#6B6B6B' },
    ],
    isComplex: false,
    supportedSections: ['about', 'schedule', 'location', 'rsvp'],
    supportedFields: ['companyName'],
  },
  {
    id: 'launch',
    name: 'Launch',
    category: 'corporate',
    isPremium: true,
    description: 'Startup product launch energetic modern tech design',
    personality: 'Startup, product launch, energetic, modern tech',
    colors: {
      primary: '#0D4B5F',
      secondary: '#FF6B35',
      accent: '#0ABAB5',
      background: '#FFFFFF',
      text: '#0D1117',
      textMuted: '#586069',
    },
    fonts: { display: 'Plus Jakarta Sans', body: 'Plus Jakarta Sans', displayVar: '--font-plus-jakarta', bodyVar: '--font-plus-jakarta' },
    previewTags: ['startup', 'launch', 'energetic'],
    colorSchemes: [
      { id: 1, label: 'Ocean',  bg: '#FFFFFF', surface: '#F0F8FA', primary: '#0D4B5F', secondary: '#FF6B35', text: '#0D1117', muted: '#586069' },
      { id: 2, label: 'Purple', bg: '#FFFFFF', surface: '#F4F0FF', primary: '#5B2D8B', secondary: '#FF6B35', text: '#0D1117', muted: '#6B6080' },
      { id: 3, label: 'Forest', bg: '#FFFFFF', surface: '#F0FFF4', primary: '#1A6B3A', secondary: '#00C87F', text: '#0D1117', muted: '#5A7060' },
    ],
    isComplex: false,
    supportedSections: ['countdown', 'schedule', 'rsvp'],
    supportedFields: ['companyName'],
  },
  {
    id: 'gala-night',
    name: 'Gala Night',
    category: 'corporate',
    isPremium: true,
    description: 'Black-tie awards formal dinner glamorous theatrical',
    personality: 'Black-tie, awards, formal dinner, glamorous',
    colors: {
      primary: '#D4A853',
      secondary: '#1A1A1A',
      accent: '#F2E6C9',
      background: '#0A0A0A',
      text: '#F2E6C9',
      textMuted: '#8A8070',
    },
    fonts: { display: 'Bodoni Moda', body: 'Montserrat', displayVar: '--font-bodoni', bodyVar: '--font-montserrat' },
    previewTags: ['gala', 'black-tie', 'glamorous'],
    colorSchemes: [
      { id: 1, label: 'Gold',   bg: '#0A0A0A', surface: '#1A1A1A', primary: '#D4A853', secondary: '#F2E6C9', text: '#F2E6C9', muted: '#8A8070' },
      { id: 2, label: 'Silver', bg: '#0A0A0A', surface: '#1A1A1A', primary: '#C0C0C8', secondary: '#E0E0E8', text: '#F2F2F8', muted: '#8A8A90' },
      { id: 3, label: 'Ruby',   bg: '#0A0A0A', surface: '#1A1A1A', primary: '#C8384A', secondary: '#F0B8C0', text: '#F2E8E8', muted: '#9A7A7A' },
    ],
    isComplex: false,
    supportedSections: ['schedule', 'location', 'rsvp'],
    supportedFields: ['companyName', 'hostName'],
  },

  // ─── Engagement ────────────────────────────────────────────
  {
    id: 'first-yes',
    name: 'First Yes',
    category: 'engagement',
    isPremium: false,
    description: 'Sweet romantic simple heartfelt engagement celebration',
    personality: 'Sweet, romantic, simple, heartfelt',
    colors: {
      primary: '#D4727A',
      secondary: '#F0C4C8',
      accent: '#C9A84C',
      background: '#FFF8F6',
      text: '#3A2525',
      textMuted: '#8A7070',
    },
    fonts: { display: 'Playfair Display', body: 'DM Sans', displayVar: '--font-playfair', bodyVar: '--font-dm-sans' },
    previewTags: ['romantic', 'sweet', 'heartfelt'],
    colorSchemes: [],
    isComplex: true,
    supportedSections: ['countdown', 'about', 'schedule', 'gallery', 'rsvp'],
    supportedFields: ['coupleNames'],
  },
  {
    id: 'golden-ring',
    name: 'Golden Ring',
    category: 'engagement',
    isPremium: true,
    description: 'Glamorous ring-centric gold and ivory celebration',
    personality: 'Glamorous, celebratory, ring-centric',
    colors: {
      primary: '#C9A84C',
      secondary: '#F2E6C9',
      accent: '#B8960C',
      background: '#FDFBF5',
      text: '#2C2010',
      textMuted: '#8A7A60',
    },
    fonts: { display: 'Cormorant Garamond', body: 'Lato', displayVar: '--font-cormorant', bodyVar: '--font-lato' },
    previewTags: ['gold', 'glamorous', 'ring'],
    colorSchemes: [
      { id: 1, label: 'Champagne', bg: '#FDFBF5', surface: '#F2E6C9', primary: '#C9A84C', secondary: '#B8960C', text: '#2C2010', muted: '#8A7A60' },
      { id: 2, label: 'Rose Gold', bg: '#FDF8F5', surface: '#F5E6E0', primary: '#C97B4C', secondary: '#E8B4A0', text: '#2C1810', muted: '#8A6A60' },
      { id: 3, label: 'Silver',    bg: '#F8F8FA', surface: '#E8E8F0', primary: '#8090B0', secondary: '#C0C8D8', text: '#1A2030', muted: '#6A7A90' },
    ],
    isComplex: true,
    supportedSections: ['countdown', 'about', 'schedule', 'gallery', 'rsvp'],
    supportedFields: ['coupleNames'],
  },
  {
    id: 'modern-love',
    name: 'Modern Love',
    category: 'engagement',
    isPremium: true,
    description: 'Clean couple-forward editorial split-screen design',
    personality: 'Clean, couple-forward, editorial',
    colors: {
      primary: '#C9622F',
      secondary: '#3D6B4F',
      accent: '#C9622F',
      background: '#FFFFFF',
      text: '#1A1A1A',
      textMuted: '#888888',
    },
    fonts: { display: 'Syne', body: 'DM Sans', displayVar: '--font-syne', bodyVar: '--font-dm-sans' },
    previewTags: ['modern', 'editorial', 'couple'],
    colorSchemes: [
      { id: 1, label: 'Flame', bg: '#FFFFFF', surface: '#F5F5F5', primary: '#C9622F', secondary: '#3D6B4F', text: '#1A1A1A', muted: '#888888' },
      { id: 2, label: 'Dark',  bg: '#0D0D0D', surface: '#1A1A1A', primary: '#E8854A', secondary: '#5D8B6F', text: '#F5F5F5', muted: '#888888' },
      { id: 3, label: 'Blue',  bg: '#FFFFFF', surface: '#F0F4FF', primary: '#2C4B8B', secondary: '#C9622F', text: '#0D1830', muted: '#6A7A9A' },
    ],
    isComplex: true,
    supportedSections: ['countdown', 'about', 'schedule', 'gallery', 'rsvp'],
    supportedFields: ['coupleNames'],
  },
  {
    id: 'story',
    name: 'Story',
    category: 'engagement',
    isPremium: true,
    description: 'Narrative photo-heavy scrollytelling love story design',
    personality: 'Narrative, photo-heavy, scrollytelling',
    colors: {
      primary: '#7B5C3A',
      secondary: '#C9A875',
      accent: '#7B5C3A',
      background: '#FAF5EE',
      text: '#3A2E22',
      textMuted: '#8A7A65',
    },
    fonts: { display: 'Libre Baskerville', body: 'Source Sans 3', displayVar: '--font-libre-baskerville', bodyVar: '--font-source-sans' },
    previewTags: ['narrative', 'story', 'photo-heavy'],
    colorSchemes: [
      { id: 1, label: 'Sepia',  bg: '#FAF5EE', surface: '#F0E5D0', primary: '#7B5C3A', secondary: '#C9A875', text: '#3A2E22', muted: '#8A7A65' },
      { id: 2, label: 'Slate',  bg: '#F0F5FA', surface: '#E0EAF5', primary: '#3A5C7B', secondary: '#7AAAC5', text: '#1A2A3A', muted: '#6A7A8A' },
      { id: 3, label: 'Forest', bg: '#F0FAF0', surface: '#D8F0D8', primary: '#2A5C3A', secondary: '#7AAA8A', text: '#1A2A1A', muted: '#5A7A5A' },
    ],
    isComplex: true,
    supportedSections: ['countdown', 'about', 'gallery', 'schedule', 'rsvp'],
    supportedFields: ['coupleNames'],
  },
  {
    id: 'celestial',
    name: 'Celestial',
    category: 'engagement',
    isPremium: true,
    description: 'Dreamy mystical star-themed poetic midnight design',
    personality: 'Dreamy, mystical, star-themed, poetic',
    colors: {
      primary: '#C0C8E8',
      secondary: '#E8A0B0',
      accent: '#9AA8D0',
      background: '#0B0F2A',
      text: '#E8EAF6',
      textMuted: '#8A8AB0',
    },
    fonts: { display: 'Cormorant Garamond', body: 'Raleway', displayVar: '--font-cormorant', bodyVar: '--font-raleway' },
    previewTags: ['celestial', 'dreamy', 'stars'],
    colorSchemes: [
      { id: 1, label: 'Cosmos',  bg: '#0B0F2A', surface: '#151A40', primary: '#C0C8E8', secondary: '#E8A0B0', text: '#E8EAF6', muted: '#8A8AB0' },
      { id: 2, label: 'Emerald', bg: '#060F0A', surface: '#0D1F15', primary: '#70D8A0', secondary: '#A0D8C0', text: '#E0F8EC', muted: '#70A080' },
      { id: 3, label: 'Gold',    bg: '#0F0B02', surface: '#1F1508', primary: '#D4A853', secondary: '#F0D890', text: '#F8F0D8', muted: '#A09060' },
    ],
    isComplex: true,
    supportedSections: ['countdown', 'about', 'schedule', 'gallery', 'rsvp'],
    supportedFields: ['coupleNames'],
  },

  // ─── Festive ───────────────────────────────────────────────
  {
    id: 'crescent',
    name: 'Crescent',
    category: 'festive',
    isPremium: false,
    description: 'Traditional warm family-oriented Eid gathering design',
    personality: 'Traditional, warm, family-oriented',
    colors: {
      primary: '#2D7A4F',
      secondary: '#C9A84C',
      accent: '#C9A84C',
      background: '#FDFAF2',
      text: '#1A2E1A',
      textMuted: '#6B7A60',
    },
    fonts: { display: 'Amiri', body: 'DM Sans', displayVar: '--font-amiri', bodyVar: '--font-dm-sans' },
    previewTags: ['festive', 'traditional', 'warm'],
    colorSchemes: [],
    isComplex: false,
    supportedSections: ['countdown', 'about', 'schedule', 'rsvp'],
    supportedFields: ['hostName', 'message'],
  },
  {
    id: 'lantern',
    name: 'Lantern',
    category: 'festive',
    isPremium: true,
    description: 'Festive glowing night celebration with amber lanterns',
    personality: 'Festive, glowing, night celebration',
    colors: {
      primary: '#1B6B6B',
      secondary: '#E8A030',
      accent: '#C9A84C',
      background: '#0D1F1F',
      text: '#F0E8D8',
      textMuted: '#8A8070',
    },
    fonts: { display: 'Playfair Display', body: 'Nunito Sans', displayVar: '--font-playfair', bodyVar: '--font-nunito' },
    previewTags: ['lantern', 'festive', 'night'],
    colorSchemes: [
      { id: 1, label: 'Teal',  bg: '#F5F9F9', surface: '#E0EDED', primary: '#1A6B6B', secondary: '#D4841A', text: '#1A2A2A', muted: '#6A8A8A' },
      { id: 2, label: 'Night', bg: '#0D1F1F', surface: '#1A3030', primary: '#D4841A', secondary: '#E8A030', text: '#F0E8D8', muted: '#8A8070' },
      { id: 3, label: 'Rose',  bg: '#F9F5F5', surface: '#EDE0E0', primary: '#8B3A3A', secondary: '#D4841A', text: '#2A1A1A', muted: '#8A6A6A' },
    ],
    isComplex: false,
    supportedSections: ['countdown', 'about', 'schedule', 'rsvp'],
    supportedFields: ['hostName'],
  },
  {
    id: 'iftar-table',
    name: 'Iftar Table',
    category: 'festive',
    isPremium: true,
    description: 'Warm intimate food-focused Iftar gathering invitation',
    personality: 'Warm, intimate, food-focused',
    colors: {
      primary: '#D4622F',
      secondary: '#8B5A2B',
      accent: '#E8A030',
      background: '#FDF6EE',
      text: '#2C1810',
      textMuted: '#8A6A50',
    },
    fonts: { display: 'Lora', body: 'Quicksand', displayVar: '--font-lora', bodyVar: '--font-quicksand' },
    previewTags: ['iftar', 'food', 'warm'],
    colorSchemes: [
      { id: 1, label: 'Spice',   bg: '#FAF5EE', surface: '#F0E0C8', primary: '#C9622F', secondary: '#8B5A2B', text: '#2C1810', muted: '#8A6A50' },
      { id: 2, label: 'Emerald', bg: '#F0FAF2', surface: '#D8F0DC', primary: '#2A6B3A', secondary: '#8B5A2B', text: '#0C2010', muted: '#5A7A5A' },
      { id: 3, label: 'Ocean',   bg: '#F0F4FA', surface: '#D8E4F5', primary: '#2A4B7B', secondary: '#C9622F', text: '#0A1830', muted: '#5A6A8A' },
    ],
    isComplex: false,
    supportedSections: ['countdown', 'about', 'schedule', 'rsvp'],
    supportedFields: ['hostName', 'message'],
  },
  {
    id: 'geometric',
    name: 'Geometric',
    category: 'festive',
    isPremium: true,
    description: 'Modern Islamic geometric pattern-driven clean design',
    personality: 'Modern Islamic aesthetic, pattern-driven, clean',
    colors: {
      primary: '#2D7A4F',
      secondary: '#C9A84C',
      accent: '#C9A84C',
      background: '#FFFFFF',
      text: '#1A2E1A',
      textMuted: '#6B7A60',
    },
    fonts: { display: 'Plus Jakarta Sans', body: 'Plus Jakarta Sans', displayVar: '--font-plus-jakarta', bodyVar: '--font-plus-jakarta' },
    previewTags: ['geometric', 'islamic', 'modern'],
    colorSchemes: [
      { id: 1, label: 'Emerald', bg: '#FFFFFF', surface: '#F0F8F0', primary: '#2D7A4F', secondary: '#C9A84C', text: '#1A2E1A', muted: '#6B7A60' },
      { id: 2, label: 'Navy',    bg: '#FFFFFF', surface: '#F0F4FF', primary: '#1A2C6B', secondary: '#C9A84C', text: '#0A1030', muted: '#5A6A8A' },
      { id: 3, label: 'Crimson', bg: '#FFFFFF', surface: '#FFF0F0', primary: '#8B1A2B', secondary: '#C9A84C', text: '#2C0010', muted: '#7A5060' },
    ],
    isComplex: false,
    supportedSections: ['countdown', 'about', 'schedule', 'rsvp'],
    supportedFields: ['hostName', 'message'],
  },
  {
    id: 'festive-night',
    name: 'Festive Night',
    category: 'festive',
    isPremium: true,
    description: 'Grand celebratory Eid party with gold and ruby accents',
    personality: 'Grand, celebratory, Eid party',
    colors: {
      primary: '#C9A84C',
      secondary: '#8B1A2B',
      accent: '#C9A84C',
      background: '#0A0A12',
      text: '#F0E8D8',
      textMuted: '#8A8070',
    },
    fonts: { display: 'EB Garamond', body: 'Outfit', displayVar: '--font-eb-garamond', bodyVar: '--font-outfit' },
    previewTags: ['festive', 'grand', 'party'],
    colorSchemes: [
      { id: 1, label: 'Gold',   bg: '#080808', surface: '#161616', primary: '#D4A853', secondary: '#9B1C1C', text: '#F0E8D8', muted: '#8A8070' },
      { id: 2, label: 'Purple', bg: '#080812', surface: '#14142A', primary: '#9B4EAA', secondary: '#D4A853', text: '#F0E8F8', muted: '#8A80A0' },
      { id: 3, label: 'Teal',   bg: '#040C0C', surface: '#0A1818', primary: '#00B8A8', secondary: '#D4A853', text: '#E0F8F8', muted: '#6A9A9A' },
    ],
    isComplex: false,
    supportedSections: ['countdown', 'about', 'schedule', 'rsvp'],
    supportedFields: ['hostName', 'message'],
  },

  // ─── Festive: Puja ─────────────────────────────────────────
  {
    id: 'puja-diyas',
    name: 'Diyas',
    category: 'festive',
    isPremium: true,
    description: 'Warm saffron and vermillion celebration of light for Puja',
    personality: 'Warm, devotional, luminous, traditional South Asian',
    colors: {
      primary: '#D4622F',
      secondary: '#E8A030',
      accent: '#C9622F',
      background: '#FDF6EE',
      text: '#2C1810',
      textMuted: '#8A6A50',
    },
    fonts: { display: 'Playfair Display', body: 'DM Sans', displayVar: '--font-playfair', bodyVar: '--font-dm-sans' },
    previewTags: ['puja', 'diyas', 'warm'],
    colorSchemes: [
      { id: 1, label: 'Saffron',    bg: '#FDF6EE', surface: '#F5E0C8', primary: '#D4622F', secondary: '#E8A030', text: '#2C1810', muted: '#8A6A50' },
      { id: 2, label: 'Marigold',   bg: '#FFF8E8', surface: '#F5E8C0', primary: '#B8860B', secondary: '#D4622F', text: '#2C2010', muted: '#8A7050' },
      { id: 3, label: 'Vermillion', bg: '#FFF0F0', surface: '#F5D8D8', primary: '#8B1A2B', secondary: '#D4622F', text: '#2C0810', muted: '#8A5060' },
    ],
    isComplex: false,
    supportedSections: ['countdown', 'about', 'schedule', 'rsvp'],
    supportedFields: [],
  },
  {
    id: 'puja-mandap',
    name: 'Floral Mandap',
    category: 'festive',
    isPremium: true,
    description: 'Marigold and crimson mandap floral celebration design',
    personality: 'Floral, festive, vibrant, South Asian celebration',
    colors: {
      primary: '#C9622F',
      secondary: '#D4A853',
      accent: '#8B1A2B',
      background: '#FBF5EC',
      text: '#2C2010',
      textMuted: '#8A7060',
    },
    fonts: { display: 'Lora', body: 'Nunito Sans', displayVar: '--font-lora', bodyVar: '--font-nunito' },
    previewTags: ['puja', 'mandap', 'floral'],
    colorSchemes: [
      { id: 1, label: 'Marigold', bg: '#FBF5EC', surface: '#F0E0C0', primary: '#C9622F', secondary: '#D4A853', text: '#2C2010', muted: '#8A7060' },
      { id: 2, label: 'Rose',     bg: '#FDF5F8', surface: '#F5E0E8', primary: '#8B3A5A', secondary: '#D4A853', text: '#2C1020', muted: '#8A6070' },
      { id: 3, label: 'Forest',   bg: '#F5FAF5', surface: '#E0F0E0', primary: '#2A6B3A', secondary: '#D4A853', text: '#1A2A1A', muted: '#5A7A5A' },
    ],
    isComplex: false,
    supportedSections: ['countdown', 'about', 'schedule', 'rsvp'],
    supportedFields: [],
  },
  {
    id: 'puja-gold',
    name: 'Golden Prayer',
    category: 'festive',
    isPremium: true,
    description: 'Deep maroon and gold traditional prayer aesthetic',
    personality: 'Devotional, opulent, traditional, spiritual',
    colors: {
      primary: '#8B1A2B',
      secondary: '#D4A853',
      accent: '#C9A84C',
      background: '#FDFAF5',
      text: '#2C1810',
      textMuted: '#8A7060',
    },
    fonts: { display: 'EB Garamond', body: 'Poppins', displayVar: '--font-eb-garamond', bodyVar: '--font-poppins' },
    previewTags: ['puja', 'prayer', 'gold'],
    colorSchemes: [
      { id: 1, label: 'Maroon',  bg: '#FDFAF5', surface: '#F0E8D0', primary: '#8B1A2B', secondary: '#D4A853', text: '#2C1810', muted: '#8A7060' },
      { id: 2, label: 'Purple',  bg: '#FAF5FF', surface: '#EDE0F8', primary: '#5B2C6F', secondary: '#D4A853', text: '#2A1030', muted: '#7A6A8A' },
      { id: 3, label: 'Teal',    bg: '#F0FAF8', surface: '#D8F0EC', primary: '#1A5C5A', secondary: '#E8A030', text: '#0A2020', muted: '#5A7A78' },
    ],
    isComplex: false,
    supportedSections: ['countdown', 'about', 'schedule', 'rsvp'],
    supportedFields: [],
  },

  // ─── Festive: New Year's Eve ────────────────────────────────
  {
    id: 'nye-gala',
    name: 'Midnight Gala',
    category: 'festive',
    isPremium: true,
    description: 'Black-tie New Year celebration with champagne and gold',
    personality: 'Glamorous, celebratory, elegant, black-tie',
    colors: {
      primary: '#D4A853',
      secondary: '#F2E6C9',
      accent: '#C9A84C',
      background: '#0A0A0A',
      text: '#F2E6C9',
      textMuted: '#8A8070',
    },
    fonts: { display: 'Cormorant Garamond', body: 'Montserrat', displayVar: '--font-cormorant', bodyVar: '--font-montserrat' },
    previewTags: ['new year', 'gala', 'champagne'],
    colorSchemes: [
      { id: 1, label: 'Champagne', bg: '#0A0A0A', surface: '#1A1A1A', primary: '#D4A853', secondary: '#F2E6C9', text: '#F2E6C9', muted: '#8A8070' },
      { id: 2, label: 'Silver',   bg: '#080810', surface: '#141420', primary: '#C0C0C8', secondary: '#E0E0E8', text: '#F0F0F8', muted: '#8A8A90' },
      { id: 3, label: 'Rose Gold', bg: '#0A0808', surface: '#1A1010', primary: '#C8826A', secondary: '#F0C8B8', text: '#F8EDE8', muted: '#9A7A70' },
    ],
    isComplex: false,
    supportedSections: ['countdown', 'about', 'schedule', 'rsvp'],
    supportedFields: [],
  },
  {
    id: 'nye-fireworks',
    name: 'Fireworks Night',
    category: 'festive',
    isPremium: true,
    description: 'Dark navy with bursting gold fireworks New Year design',
    personality: 'Dramatic, explosive, celebratory, night sky',
    colors: {
      primary: '#1E3A8A',
      secondary: '#D4A853',
      accent: '#C9A84C',
      background: '#030818',
      text: '#E8EAF6',
      textMuted: '#8A8AB0',
    },
    fonts: { display: 'Syne', body: 'Inter', displayVar: '--font-syne', bodyVar: '--font-inter' },
    previewTags: ['new year', 'fireworks', 'navy'],
    colorSchemes: [
      { id: 1, label: 'Navy Gold',  bg: '#030818', surface: '#0D1830', primary: '#D4A853', secondary: '#F0D890', text: '#E8EAF6', muted: '#8A8AB0' },
      { id: 2, label: 'Midnight',   bg: '#080308', surface: '#180818', primary: '#C85CF6', secondary: '#E8A0F8', text: '#F8EAF8', muted: '#A070B0' },
      { id: 3, label: 'Teal Burst', bg: '#020C10', surface: '#081820', primary: '#00C8B8', secondary: '#80E8D8', text: '#E0F8F8', muted: '#6A9A9A' },
    ],
    isComplex: false,
    supportedSections: ['countdown', 'about', 'schedule', 'rsvp'],
    supportedFields: [],
  },
  {
    id: 'nye-glam',
    name: 'Midnight Glam',
    category: 'festive',
    isPremium: true,
    description: 'Black and silver glam party design for New Year countdown',
    personality: 'Sleek, glam, modern, party night',
    colors: {
      primary: '#1A1A1A',
      secondary: '#C0C0C8',
      accent: '#E0E0E8',
      background: '#0A0A0A',
      text: '#F5F5F8',
      textMuted: '#8A8A90',
    },
    fonts: { display: 'Space Grotesk', body: 'DM Sans', displayVar: '--font-space-grotesk', bodyVar: '--font-dm-sans' },
    previewTags: ['new year', 'glam', 'silver'],
    colorSchemes: [
      { id: 1, label: 'Silver',    bg: '#0A0A0A', surface: '#1A1A1A', primary: '#C0C0C8', secondary: '#E0E0E8', text: '#F5F5F8', muted: '#8A8A90' },
      { id: 2, label: 'Emerald',   bg: '#020A06', surface: '#081A0E', primary: '#00C878', secondary: '#80E8B8', text: '#E0F8EC', muted: '#6A9A7A' },
      { id: 3, label: 'Burgundy',  bg: '#0A0204', surface: '#1A060C', primary: '#C83A5A', secondary: '#F0A0B8', text: '#F8E0E8', muted: '#9A6070' },
    ],
    isComplex: false,
    supportedSections: ['countdown', 'about', 'schedule', 'rsvp'],
    supportedFields: [],
  },

  // ─── Other ─────────────────────────────────────────────────
  {
    id: 'simple',
    name: 'Simple',
    category: 'other',
    isPremium: false,
    description: 'Universal no-frills clean fast-loading for any event',
    personality: 'Universal, no-frills, fast, clean',
    colors: {
      primary: '#1A1A1A',
      secondary: '#C9622F',
      accent: '#C9622F',
      background: '#FFFFFF',
      text: '#1A1A1A',
      textMuted: '#888888',
    },
    fonts: { display: 'DM Sans', body: 'DM Sans', displayVar: '--font-dm-sans', bodyVar: '--font-dm-sans' },
    previewTags: ['simple', 'universal', 'clean'],
    colorSchemes: [],
    isComplex: false,
    supportedSections: ['countdown', 'about', 'schedule', 'rsvp'],
    supportedFields: ['hostName', 'message'],
  },
  {
    id: 'reunion',
    name: 'Reunion',
    category: 'other',
    isPremium: true,
    description: 'Nostalgic warm group gathering with vintage photo style',
    personality: 'Nostalgic, warm, group gathering',
    colors: {
      primary: '#7B5C3A',
      secondary: '#D4A853',
      accent: '#B8860B',
      background: '#FBF5EC',
      text: '#2C2010',
      textMuted: '#8A7060',
    },
    fonts: { display: 'Merriweather', body: 'Open Sans', displayVar: '--font-merriweather', bodyVar: '--font-open-sans' },
    previewTags: ['nostalgic', 'reunion', 'warm'],
    colorSchemes: [
      { id: 1, label: 'Warm',   bg: '#FBF5EC', surface: '#F0E0C0', primary: '#7B4A1E', secondary: '#D4A853', text: '#2C2010', muted: '#8A7060' },
      { id: 2, label: 'Forest', bg: '#F0F8F0', surface: '#D8F0D8', primary: '#2A5C2A', secondary: '#D4A853', text: '#0C200C', muted: '#5A7A5A' },
      { id: 3, label: 'Slate',  bg: '#F0F4FA', surface: '#D8E4F5', primary: '#2A4B7B', secondary: '#7B4A1E', text: '#0A1830', muted: '#5A6A8A' },
    ],
    isComplex: true,
    supportedSections: ['countdown', 'about', 'gallery', 'schedule', 'rsvp'],
    supportedFields: ['hostName', 'message'],
  },
  {
    id: 'graduation',
    name: 'Graduation',
    category: 'other',
    isPremium: true,
    description: 'Achievement milestone pride celebration design',
    personality: 'Achievement, milestone, pride',
    colors: {
      primary: '#1E3A8A',
      secondary: '#C9A84C',
      accent: '#B45309',
      background: '#FFFFFF',
      text: '#0D1117',
      textMuted: '#586069',
    },
    fonts: { display: 'Syne', body: 'DM Sans', displayVar: '--font-syne', bodyVar: '--font-dm-sans' },
    previewTags: ['graduation', 'achievement', 'milestone'],
    colorSchemes: [
      { id: 1, label: 'Navy',    bg: '#F8F9FD', surface: '#E8ECF8', primary: '#1E3A5F', secondary: '#C9A84C', text: '#0D1117', muted: '#586069' },
      { id: 2, label: 'Crimson', bg: '#FDF8F8', surface: '#F8E8E8', primary: '#8B1A2B', secondary: '#C9A84C', text: '#1A0A0D', muted: '#7A5060' },
      { id: 3, label: 'Forest',  bg: '#F0FDF4', surface: '#D8F5E0', primary: '#1A5C3A', secondary: '#C9A84C', text: '#0C200C', muted: '#5A7A5A' },
    ],
    isComplex: false,
    supportedSections: ['countdown', 'about', 'schedule', 'rsvp'],
    supportedFields: ['personName', 'hostName', 'message'],
  },
  {
    id: 'housewarming',
    name: 'Housewarming',
    category: 'other',
    isPremium: true,
    description: 'Cozy homey intimate warm new home welcome design',
    personality: 'Cozy, homey, intimate, warm',
    colors: {
      primary: '#C9622F',
      secondary: '#3D6B4F',
      accent: '#C9622F',
      background: '#FDF6EE',
      text: '#2C2010',
      textMuted: '#8A7060',
    },
    fonts: { display: 'Lora', body: 'Nunito Sans', displayVar: '--font-lora', bodyVar: '--font-nunito' },
    previewTags: ['housewarming', 'cozy', 'homey'],
    colorSchemes: [
      { id: 1, label: 'Terracotta', bg: '#FAF7F3', surface: '#F0E0D0', primary: '#C9622F', secondary: '#3D6B4F', text: '#2C2010', muted: '#8A7060' },
      { id: 2, label: 'Ocean',      bg: '#F0F4FA', surface: '#D8E4F5', primary: '#2A4B7B', secondary: '#3D6B4F', text: '#0A1830', muted: '#5A6A8A' },
      { id: 3, label: 'Olive',      bg: '#F5F8F0', surface: '#E0ECD8', primary: '#4B6B2A', secondary: '#C9622F', text: '#1A2010', muted: '#6A7A5A' },
    ],
    isComplex: false,
    supportedSections: ['countdown', 'about', 'schedule', 'rsvp'],
    supportedFields: ['hostName', 'message'],
  },
  {
    id: 'anniversary',
    name: 'Anniversary',
    category: 'other',
    isPremium: true,
    description: 'Romantic milestone mature celebration with gold accents',
    personality: 'Romantic, milestone, mature celebration',
    colors: {
      primary: '#8B1A2B',
      secondary: '#C9A84C',
      accent: '#C9A84C',
      background: '#FDFAF5',
      text: '#2C1810',
      textMuted: '#8A7060',
    },
    fonts: { display: 'Cormorant Garamond', body: 'Raleway', displayVar: '--font-cormorant', bodyVar: '--font-raleway' },
    previewTags: ['anniversary', 'romantic', 'milestone'],
    colorSchemes: [
      { id: 1, label: 'Rose',   bg: '#FBF5F8', surface: '#F0E0E8', primary: '#9B3A5A', secondary: '#C9A84C', text: '#2E1020', muted: '#8A6070' },
      { id: 2, label: 'Navy',   bg: '#F0F4FA', surface: '#D8E4F5', primary: '#2A4B7B', secondary: '#C9A84C', text: '#0A1030', muted: '#5A6A8A' },
      { id: 3, label: 'Forest', bg: '#F0FAF4', surface: '#D8F0DC', primary: '#2A5C3A', secondary: '#C9A84C', text: '#0C200C', muted: '#5A7A5A' },
    ],
    isComplex: true,
    supportedSections: ['countdown', 'about', 'gallery', 'schedule', 'rsvp'],
    supportedFields: ['coupleNames', 'message'],
  },
]

export function getTemplateConfig(id: string): TemplateConfig | undefined {
  return TEMPLATE_CONFIGS.find((t) => t.id === id)
}

export function getTemplatesByCategory(category: TemplateCategory): TemplateConfig[] {
  return TEMPLATE_CONFIGS.filter((t) => t.category === category)
}
