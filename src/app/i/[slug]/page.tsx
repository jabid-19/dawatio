'use client'

import { use, useEffect, useState } from 'react'
import { notFound } from 'next/navigation'
import { getEventBySlug } from '@/lib/events-store'
import { DawatEvent } from '@/lib/dummy-data'
import TemplateRenderer from '@/components/templates/TemplateRenderer'

export default function InvitePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const [event, setEvent] = useState<DawatEvent | null | undefined>(undefined)

  useEffect(() => {
    const e = getEventBySlug(slug)
    setEvent(e ?? null)
  }, [slug])

  if (event === undefined) return null
  if (event === null) notFound()

  return <TemplateRenderer event={event!} />
}
