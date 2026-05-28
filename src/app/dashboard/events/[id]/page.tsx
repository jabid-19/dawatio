'use client'

import { use, useEffect, useState } from 'react'
import { motion } from 'motion/react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Calendar, Users, Clock, ChevronRight, Pencil, Share2, UserCheck } from 'lucide-react'
import { getEventForEdit } from '@/lib/events-store'
import { DUMMY_RSVPS } from '@/lib/dummy-data'
import { DawatEvent } from '@/lib/dummy-data'
import { daysUntil, formatDate } from '@/lib/utils'
import Badge from '@/components/ui/Badge'
import { stagger, fadeUp } from '@/lib/motion'

export default function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [event, setEvent] = useState<DawatEvent | null>(null)

  useEffect(() => {
    const e = getEventForEdit(id)
    if (!e) notFound()
    else setEvent(e)
  }, [id])

  if (!event) return null

  const days = daysUntil(event.eventDate)
  const rsvps = event.id === 'evt_01' ? DUMMY_RSVPS : []
  const attending = rsvps.filter((r) => r.attending).length
  const stats = [
    { label: 'Total Guests', value: event.guestCount, icon: Users },
    { label: 'RSVPs', value: `${event.rsvpCount}`, icon: UserCheck },
    { label: 'Days to Event', value: days > 0 ? days : 'Passed', icon: Clock },
    { label: 'Plan', value: event.plan.charAt(0).toUpperCase() + event.plan.slice(1), icon: Calendar },
  ]

  return (
    <div className="p-6 lg:p-8 max-w-4xl">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: stagger } }}
      >
        {/* Header */}
        <motion.div variants={fadeUp} className="flex items-start justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant={event.status === 'published' ? 'success' : 'muted'}>
                {event.status === 'published' ? 'Published' : 'Draft'}
              </Badge>
              <Badge variant="muted" className="capitalize">{event.type}</Badge>
            </div>
            <h1 className="text-2xl font-bold text-ink" style={{ fontFamily: 'var(--font-playfair)' }}>
              {event.title}
            </h1>
            <p className="text-ink-muted text-sm mt-1">{formatDate(event.eventDate)}</p>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div variants={fadeUp} className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map(({ label, value, icon: Icon }) => (
            <div key={label} className="bg-surface rounded-2xl p-4 border border-border shadow-[var(--shadow-card)]">
              <div className="flex items-center gap-2 mb-2">
                <Icon className="w-4 h-4 text-accent" />
                <p className="text-xs text-ink-muted">{label}</p>
              </div>
              <p className="text-xl font-bold text-ink">{value}</p>
            </div>
          ))}
        </motion.div>

        {/* Sub-events */}
        {event.subEvents.length > 0 && (
          <motion.div variants={fadeUp} className="mb-8">
            <h2 className="text-lg font-semibold text-ink mb-4">Event Schedule</h2>
            <div className="space-y-3">
              {event.subEvents.map((se) => (
                <div key={se.id} className="bg-surface rounded-xl border border-border p-4 flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-accent mt-2 shrink-0" />
                  <div>
                    <p className="font-semibold text-ink text-sm">{se.name}</p>
                    <p className="text-xs text-ink-muted">{formatDate(se.date)} · {se.time}</p>
                    <p className="text-xs text-ink-muted">{se.venue}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Recent RSVPs */}
        {rsvps.length > 0 && (
          <motion.div variants={fadeUp} className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-ink">Recent RSVPs</h2>
              <Link href={`/dashboard/events/${id}/guests`} className="text-sm text-accent hover:text-accent-hover font-medium flex items-center gap-1">
                View all <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="space-y-2">
              {rsvps.slice(0, 5).map((r) => (
                <div key={r.id} className="bg-surface rounded-xl border border-border p-3 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-accent-light flex items-center justify-center text-xs font-bold text-accent">
                    {r.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-ink truncate">{r.name}</p>
                    <p className="text-xs text-ink-muted">{r.phone}</p>
                  </div>
                  <Badge variant={r.attending ? 'success' : 'danger'}>
                    {r.attending ? 'Attending' : 'Declined'}
                  </Badge>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Quick links */}
        <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: 'Edit Details', href: `/dashboard/events/${id}/edit`, icon: Pencil, desc: 'Update event info & template' },
            { label: 'Manage Guests', href: `/dashboard/events/${id}/guests`, icon: Users, desc: 'View RSVPs & attendance' },
            { label: 'Share Invite', href: `/dashboard/events/${id}/share`, icon: Share2, desc: 'Copy link, QR code & more' },
          ].map(({ label, href, icon: Icon, desc }) => (
            <Link
              key={href}
              href={href}
              className="bg-surface rounded-2xl border border-border p-5 hover:border-accent hover:shadow-[var(--shadow-card)] transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-accent-light flex items-center justify-center mb-3 group-hover:bg-accent transition-colors">
                <Icon className="w-5 h-5 text-accent group-hover:text-white transition-colors" />
              </div>
              <p className="font-semibold text-ink text-sm">{label}</p>
              <p className="text-xs text-ink-muted mt-1">{desc}</p>
            </Link>
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}
