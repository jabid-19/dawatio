import { MapPin, Clock, Calendar } from 'lucide-react'
import type { SubEvent } from '@/lib/templates-data'

interface SubEventCardProps {
  subEvent: SubEvent
  colors?: {
    card?: string
    border?: string
    title?: string
    detail?: string
    accent?: string
  }
  variant?: 'card' | 'timeline-left' | 'timeline-right' | 'minimal' | 'row'
}

export default function SubEventCard({ subEvent, colors = {}, variant = 'card' }: SubEventCardProps) {
  if (variant === 'row') {
    return (
      <div
        className="flex items-start gap-4 py-4 border-b last:border-b-0"
        style={{ borderColor: colors.border }}
      >
        <div className="flex-1">
          <p className="font-semibold text-base" style={{ color: colors.title }}>{subEvent.name}</p>
          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
            <span className="text-sm flex items-center gap-1" style={{ color: colors.detail }}>
              <Calendar className="w-3.5 h-3.5" />
              {subEvent.date}
            </span>
            <span className="text-sm flex items-center gap-1" style={{ color: colors.detail }}>
              <Clock className="w-3.5 h-3.5" />
              {subEvent.time}
            </span>
            <span className="text-sm flex items-center gap-1" style={{ color: colors.detail }}>
              <MapPin className="w-3.5 h-3.5" />
              {subEvent.venue}
            </span>
          </div>
        </div>
      </div>
    )
  }

  if (variant === 'minimal') {
    return (
      <div className="py-3">
        <div className="flex items-baseline gap-3">
          <span className="font-bold text-lg" style={{ color: colors.accent }}>·</span>
          <div>
            <p className="font-semibold" style={{ color: colors.title }}>{subEvent.name}</p>
            <p className="text-sm opacity-70 mt-0.5" style={{ color: colors.detail }}>
              {subEvent.date} · {subEvent.time} · {subEvent.venue}
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className="rounded-2xl p-5 flex flex-col gap-2"
      style={{
        background: colors.card,
        border: colors.border ? `1px solid ${colors.border}` : undefined,
      }}
    >
      <p
        className="font-bold text-lg leading-tight"
        style={{ color: colors.title }}
      >
        {subEvent.name}
      </p>
      <div className="flex flex-col gap-1.5">
        <span className="text-sm flex items-center gap-2" style={{ color: colors.detail }}>
          <Calendar className="w-4 h-4 flex-shrink-0" style={{ color: colors.accent }} />
          {subEvent.date}
        </span>
        <span className="text-sm flex items-center gap-2" style={{ color: colors.detail }}>
          <Clock className="w-4 h-4 flex-shrink-0" style={{ color: colors.accent }} />
          {subEvent.time}
        </span>
        <span className="text-sm flex items-center gap-2" style={{ color: colors.detail }}>
          <MapPin className="w-4 h-4 flex-shrink-0" style={{ color: colors.accent }} />
          {subEvent.venue}
        </span>
      </div>
    </div>
  )
}
