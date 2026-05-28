'use client'

import { use, useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { Download, Bell } from 'lucide-react'
import { toast } from 'sonner'
import { getEventForEdit } from '@/lib/events-store'
import { DUMMY_RSVPS, DawatEvent, RSVP } from '@/lib/dummy-data'
import { formatDate } from '@/lib/utils'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { stagger, fadeUp } from '@/lib/motion'

type Filter = 'all' | 'attending' | 'declined'

export default function GuestsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [event, setEvent] = useState<DawatEvent | null>(null)
  const [filter, setFilter] = useState<Filter>('all')

  useEffect(() => {
    const e = getEventForEdit(id)
    if (e) setEvent(e)
  }, [id])

  const rsvps: RSVP[] = event?.id === 'evt_01' ? DUMMY_RSVPS : []
  const filtered = rsvps.filter((r) => {
    if (filter === 'attending') return r.attending
    if (filter === 'declined') return !r.attending
    return true
  })

  const attending = rsvps.filter((r) => r.attending).length
  const declined = rsvps.filter((r) => !r.attending).length

  const stats = [
    { label: 'Total RSVPs', value: rsvps.length },
    { label: 'Attending', value: attending },
    { label: 'Declined', value: declined },
    { label: 'Pending', value: Math.max(0, (event?.guestCount ?? 0) - rsvps.length) },
  ]

  return (
    <div className="p-6 lg:p-8 max-w-4xl">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: stagger } }}
      >
        <motion.div variants={fadeUp} className="flex items-center justify-between gap-4 mb-8">
          <div>
            <p className="text-sm text-ink-muted mb-1">{event?.title}</p>
            <h1 className="text-2xl font-bold text-ink" style={{ fontFamily: 'var(--font-playfair)' }}>
              Guests & RSVPs
            </h1>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => toast.info('Feature coming soon')}
            >
              <Bell className="w-4 h-4" />
              <span className="hidden sm:inline">Remind</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => toast.info('Feature coming soon')}
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export</span>
            </Button>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div variants={fadeUp} className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map(({ label, value }) => (
            <div key={label} className="bg-surface rounded-2xl p-4 border border-border shadow-[var(--shadow-card)] text-center">
              <p className="text-2xl font-bold text-ink">{value}</p>
              <p className="text-xs text-ink-muted mt-1">{label}</p>
            </div>
          ))}
        </motion.div>

        {/* Filters */}
        <motion.div variants={fadeUp} className="flex gap-2 mb-6">
          {(['all', 'attending', 'declined'] as Filter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors cursor-pointer capitalize ${
                filter === f ? 'bg-accent text-white' : 'bg-surface border border-border text-ink-muted hover:text-ink'
              }`}
            >
              {f}
            </button>
          ))}
        </motion.div>

        {/* RSVP List */}
        <motion.div variants={fadeUp} className="space-y-2">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-ink-muted text-sm">No RSVPs yet</div>
          ) : (
            filtered.map((r) => (
              <div key={r.id} className="bg-surface rounded-xl border border-border p-4 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-accent-light flex items-center justify-center text-sm font-bold text-accent shrink-0">
                  {r.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-ink">{r.name}</p>
                  <p className="text-xs text-ink-muted font-mono">{r.phone}</p>
                  {r.subEventIds.length > 0 && (
                    <p className="text-xs text-ink-muted mt-0.5">
                      {r.subEventIds.length} event{r.subEventIds.length > 1 ? 's' : ''}
                    </p>
                  )}
                </div>
                <div className="flex flex-col items-end gap-1.5">
                  <Badge variant={r.attending ? 'success' : 'danger'}>
                    {r.attending ? 'Attending' : 'Declined'}
                  </Badge>
                  <p className="text-[10px] text-ink-light">{formatDate(r.respondedAt)}</p>
                </div>
              </div>
            ))
          )}
        </motion.div>
      </motion.div>
    </div>
  )
}
