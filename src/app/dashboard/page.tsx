'use client'

import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import { getAllEvents } from '@/lib/events-store'
import { DawatEvent } from '@/lib/dummy-data'
import EventCard from '@/components/dashboard/EventCard'
import EmptyState from '@/components/dashboard/EmptyState'
import Button from '@/components/ui/Button'
import { stagger, fadeUp } from '@/lib/motion'

export default function DashboardPage() {
  const [events, setEvents] = useState<DawatEvent[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setEvents(getAllEvents())
    setLoading(false)
  }, [])

  return (
    <div className="p-6 lg:p-8 max-w-6xl">
      <div className="flex items-center justify-between mb-8">
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-ink"
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          Your Events
        </motion.h1>
        <Link href="/dashboard/create">
          <Button size="sm" className="gap-2">
            <Plus className="w-4 h-4" />
            Create New
          </Button>
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2].map((i) => (
            <div key={i} className="bg-surface rounded-2xl overflow-hidden border border-border animate-pulse">
              <div className="h-32 bg-border" />
              <div className="p-4 space-y-3">
                <div className="h-4 bg-border rounded w-3/4" />
                <div className="h-3 bg-border rounded w-1/2" />
                <div className="h-3 bg-border rounded w-2/3" />
              </div>
            </div>
          ))}
        </div>
      ) : events.length === 0 ? (
        <EmptyState />
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: stagger } }}
        >
          {events.map((event) => (
            <motion.div key={event.id} variants={fadeUp}>
              <EventCard event={event} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  )
}
