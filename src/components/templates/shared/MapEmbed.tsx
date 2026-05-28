import { MapPin, ExternalLink } from 'lucide-react'
import type { SubEvent } from '@/lib/templates-data'

interface MapEmbedProps {
  subEvent: SubEvent
  colors?: {
    card?: string
    border?: string
    text?: string
    accent?: string
  }
}

export default function MapEmbed({ subEvent, colors = {} }: MapEmbedProps) {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(subEvent.venue)}`

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ border: colors.border ? `1px solid ${colors.border}` : undefined }}
    >
      <div
        className="h-32 flex items-center justify-center opacity-20"
        style={{ background: colors.card || '#f0f0f0' }}
      >
        <MapPin className="w-10 h-10" style={{ color: colors.accent }} />
      </div>
      <div className="p-4" style={{ background: colors.card }}>
        <p className="font-semibold text-sm" style={{ color: colors.text }}>{subEvent.name}</p>
        <p className="text-sm mt-1 opacity-70" style={{ color: colors.text }}>{subEvent.venue}</p>
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-medium mt-3 hover:underline"
          style={{ color: colors.accent }}
        >
          <ExternalLink className="w-3.5 h-3.5" />
          Open in Google Maps
        </a>
      </div>
    </div>
  )
}
