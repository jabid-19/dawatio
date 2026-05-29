'use client'

import { motion } from 'motion/react'
import Link from 'next/link'
import { Calendar, Users, Eye, Pencil, Share2 } from 'lucide-react'
import { DawatEvent } from '@/lib/dummy-data'
import { daysUntil, formatDate } from '@/lib/utils'
import Badge from '@/components/ui/Badge'

const EVENT_GRADIENTS: Record<string, string> = {
  wedding: 'linear-gradient(135deg, #C9622F 0%, #D4A853 100%)',
  birthday: 'linear-gradient(135deg, #E85D9A 0%, #F5C842 100%)',
  engagement: 'linear-gradient(135deg, #4A2C7A 0%, #D4A853 100%)',
  festive: 'linear-gradient(135deg, #3D7A5A 0%, #D4A853 100%)',
  corporate: 'linear-gradient(135deg, #1A1714 0%, #6B6560 100%)',
  other: 'linear-gradient(135deg, #6B6560 0%, #B5B0AA 100%)',
}

const PLAN_BADGE_VARIANTS = {
  free: 'muted',
  basic: 'default',
  wedding: 'gold',
  premium: 'warning',
} as const

export default function EventCard({ event }: { event: DawatEvent }) {
  const days = daysUntil(event.eventDate)
  const gradient = EVENT_GRADIENTS[event.type] ?? EVENT_GRADIENTS.other

  return (
    <motion.div
      whileHover={{ y: -2, boxShadow: 'var(--shadow-float)' }}
      transition={{ duration: 0.2 }}
      className="bg-surface rounded-2xl overflow-hidden border border-border shadow-[var(--shadow-card)]"
    >
      {/* Thumbnail */}
      <div className="h-32 relative" style={{ background: gradient }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white/80 text-lg font-bold" style={{ fontFamily: 'var(--font-playfair)' }}>
            {event.title}
          </span>
        </div>
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge variant={event.status === 'published' ? 'success' : 'muted'}>
            {event.status === 'published' ? 'Published' : 'Draft'}
          </Badge>
        </div>
        <div className="absolute top-3 right-3">
          <Badge variant={PLAN_BADGE_VARIANTS[event.plan]}>
            {event.plan.charAt(0).toUpperCase() + event.plan.slice(1)}
          </Badge>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-ink text-base mb-1 truncate">{event.title}</h3>
        <p className="text-xs text-ink-muted capitalize mb-3">{event.type}</p>

        <div className="flex items-center gap-4 text-xs text-ink-muted mb-4">
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {formatDate(event.eventDate)}
          </span>
          <span className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5" />
            {event.rsvpCount} / {event.guestCount}
          </span>
        </div>

        {days > 0 && (
          <p className="text-xs font-medium text-accent mb-4">
            {days} day{days !== 1 ? 's' : ''} to go
          </p>
        )}
        {days <= 0 && (
          <p className="text-xs text-ink-muted mb-4">Event passed</p>
        )}

        <div className="flex items-center gap-2 pt-3 border-t border-border">
          <Link
            href={`/dashboard/events/${event.id}/edit`}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-ink-muted hover:bg-cream hover:text-ink transition-colors"
          >
            <Pencil className="w-3.5 h-3.5" />
            Edit
          </Link>
          <Link
            href={`/dashboard/events/${event.id}/share`}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-ink-muted hover:bg-cream hover:text-ink transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            Share
          </Link>
          <Link
            href={`/i/${event.slug}`}
            target="_blank"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-ink-muted hover:bg-cream hover:text-ink transition-colors ml-auto"
          >
            <Eye className="w-3.5 h-3.5" />
            View
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
