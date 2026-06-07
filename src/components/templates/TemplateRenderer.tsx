'use client'

import type { DawatEvent } from '@/lib/dummy-data'
import type { TemplateProps, RSVPFormData } from '@/lib/templates-data'
import { TEMPLATE_CONFIGS } from '@/lib/templates-data'
import { resolveContent } from '@/lib/template-content'

// ─── Wedding ──────────────────────────────────────────────────────────────────
import BloomTemplate from './wedding/BloomTemplate'
import MidnightTemplate from './wedding/MidnightTemplate'
import MinimaaTemplate from './wedding/MinimaaTemplate'
import GardenTemplate from './wedding/GardenTemplate'
import RoyalTemplate from './wedding/RoyalTemplate'

// ─── Birthday ─────────────────────────────────────────────────────────────────
import ConfettiTemplate from './birthday/ConfettiTemplate'
import NeonTemplate from './birthday/NeonTemplate'
import PastelDreamTemplate from './birthday/PastelDreamTemplate'
import BoldLoudTemplate from './birthday/BoldLoudTemplate'
import ElegantAgeTemplate from './birthday/ElegantAgeTemplate'

// ─── Corporate ────────────────────────────────────────────────────────────────
import CleanDeskTemplate from './corporate/CleanDeskTemplate'
import SummitTemplate from './corporate/SummitTemplate'
import BoardroomTemplate from './corporate/BoardroomTemplate'
import LaunchTemplate from './corporate/LaunchTemplate'
import GalaNightTemplate from './corporate/GalaNightTemplate'

// ─── Engagement ───────────────────────────────────────────────────────────────
import FirstYesTemplate from './engagement/FirstYesTemplate'
import GoldenRingTemplate from './engagement/GoldenRingTemplate'
import ModernLoveTemplate from './engagement/ModernLoveTemplate'
import StoryTemplate from './engagement/StoryTemplate'
import CelestialTemplate from './engagement/CelestialTemplate'

// ─── Festive ──────────────────────────────────────────────────────────────────
import CrescentTemplate from './festive/CrescentTemplate'
import LanternTemplate from './festive/LanternTemplate'
import IftarTableTemplate from './festive/IftarTableTemplate'
import GeometricTemplate from './festive/GeometricTemplate'
import FestiveNightTemplate from './festive/FestiveNightTemplate'
import DiyasTemplate from './festive/DiyasTemplate'
import FloralMandapTemplate from './festive/FloralMandapTemplate'
import GoldenPrayerTemplate from './festive/GoldenPrayerTemplate'
import MidnightGalaTemplate from './festive/MidnightGalaTemplate'
import FireworksNightTemplate from './festive/FireworksNightTemplate'
import MidnightGlamTemplate from './festive/MidnightGlamTemplate'

// ─── Other ────────────────────────────────────────────────────────────────────
import SimpleTemplate from './other/SimpleTemplate'
import ReunionTemplate from './other/ReunionTemplate'
import GraduationTemplate from './other/GraduationTemplate'
import HousewarmingTemplate from './other/HousewarmingTemplate'
import AnniversaryTemplate from './other/AnniversaryTemplate'

// ─── Adapter: DawatEvent → TemplateProps.event ────────────────────────────────
function toTemplateEvent(event: DawatEvent): TemplateProps['event'] {
  const resolved = resolveContent(event)
  const gallery = resolved.galleryImages

  return {
    title: event.title,
    type: event.type,
    description: event.description ?? '',
    coverImage: event.coverImage,
    eventDate: event.eventDate,
    subEvents: event.subEvents,
    gallery,
    coupleNames: event.coupleNames ?? (
      event.type === 'wedding' || event.type === 'engagement'
        ? { partner1: event.title.split('&')[0]?.trim() ?? 'Partner 1', partner2: event.title.split('&')[1]?.trim().split(' ')[0] ?? 'Partner 2' }
        : undefined
    ),
    personName: event.personName ?? (event.type === 'birthday' ? event.title.split("'s")[0] ?? event.title : undefined),
    companyName: event.companyName ?? (event.type === 'corporate' ? event.title : undefined),
    hostName: event.hostName ?? event.title,
    message: event.message ?? (resolved.aboutHeading || undefined),
    sections: resolved.sections,
  }
}

interface TemplateRendererProps {
  event: DawatEvent
  disableEffects?: boolean
}

export default function TemplateRenderer({ event, disableEffects }: TemplateRendererProps) {
  const templateEvent = toTemplateEvent(event)
  const branding = { showDawatBranding: event.plan === 'free' }
  const onRsvpSubmit = (_data: RSVPFormData) => {}

  const config = TEMPLATE_CONFIGS.find((t) => t.id === event.template)
  const schemeIdx = (event.colorScheme ?? 1) - 1
  const resolvedColors = config?.colorSchemes?.[schemeIdx]

  const props: TemplateProps = { event: templateEvent, branding, onRsvpSubmit, colors: resolvedColors, disableEffects }

  switch (event.template) {
    // Wedding
    case 'bloom':     return <BloomTemplate {...props} />
    case 'midnight':  return <MidnightTemplate {...props} />
    case 'minimaa':   return <MinimaaTemplate {...props} />
    case 'garden':    return <GardenTemplate {...props} />
    case 'royal':     return <RoyalTemplate {...props} />
    // Birthday
    case 'confetti':      return <ConfettiTemplate {...props} />
    case 'neon':          return <NeonTemplate {...props} />
    case 'pastel-dream':  return <PastelDreamTemplate {...props} />
    case 'bold-loud':     return <BoldLoudTemplate {...props} />
    case 'elegant-age':   return <ElegantAgeTemplate {...props} />
    // Corporate
    case 'clean-desk':  return <CleanDeskTemplate {...props} />
    case 'summit':      return <SummitTemplate {...props} />
    case 'boardroom':   return <BoardroomTemplate {...props} />
    case 'launch':      return <LaunchTemplate {...props} />
    case 'gala-night':  return <GalaNightTemplate {...props} />
    // Engagement
    case 'first-yes':     return <FirstYesTemplate {...props} />
    case 'golden-ring':   return <GoldenRingTemplate {...props} />
    case 'modern-love':   return <ModernLoveTemplate {...props} />
    case 'story':         return <StoryTemplate {...props} />
    case 'celestial':     return <CelestialTemplate {...props} />
    // Festive
    case 'crescent':       return <CrescentTemplate {...props} />
    case 'lantern':        return <LanternTemplate {...props} />
    case 'iftar-table':    return <IftarTableTemplate {...props} />
    case 'geometric':      return <GeometricTemplate {...props} />
    case 'festive-night':  return <FestiveNightTemplate {...props} />
    case 'puja-diyas':     return <DiyasTemplate {...props} />
    case 'puja-mandap':    return <FloralMandapTemplate {...props} />
    case 'puja-gold':      return <GoldenPrayerTemplate {...props} />
    case 'nye-gala':       return <MidnightGalaTemplate {...props} />
    case 'nye-fireworks':  return <FireworksNightTemplate {...props} />
    case 'nye-glam':       return <MidnightGlamTemplate {...props} />
    // Other
    case 'simple':        return <SimpleTemplate {...props} />
    case 'reunion':       return <ReunionTemplate {...props} />
    case 'graduation':    return <GraduationTemplate {...props} />
    case 'housewarming':  return <HousewarmingTemplate {...props} />
    case 'anniversary':   return <AnniversaryTemplate {...props} />
    default:              return <SimpleTemplate {...props} />
  }
}
