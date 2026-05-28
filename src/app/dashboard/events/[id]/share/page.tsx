'use client'

import { use, useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { Copy, MessageCircle, Check } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'
import { toast } from 'sonner'
import { getEventForEdit } from '@/lib/events-store'
import { DawatEvent } from '@/lib/dummy-data'
import Button from '@/components/ui/Button'
import { stagger, fadeUp } from '@/lib/motion'

export default function SharePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [event, setEvent] = useState<DawatEvent | null>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const e = getEventForEdit(id)
    if (e) setEvent(e)
  }, [id])

  const inviteUrl = event ? `https://dawat.app/i/${event.slug}` : ''
  const localUrl = event ? `${window.location.origin}/i/${event.slug}` : ''

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(localUrl)
      setCopied(true)
      toast.success('Link copied!')
      setTimeout(() => setCopied(false), 2000)
    } catch {
      toast.error('Could not copy link')
    }
  }

  function handleWhatsApp() {
    const text = encodeURIComponent(`You're invited! View your invitation here: ${localUrl}`)
    window.open(`https://wa.me/?text=${text}`, '_blank')
  }

  if (!event) return null

  return (
    <div className="p-6 lg:p-8 max-w-2xl">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: stagger } }}
      >
        <motion.div variants={fadeUp} className="mb-8">
          <p className="text-sm text-ink-muted mb-1">{event.title}</p>
          <h1 className="text-2xl font-bold text-ink" style={{ fontFamily: 'var(--font-playfair)' }}>
            Share Invite
          </h1>
        </motion.div>

        {/* Invite URL */}
        <motion.div variants={fadeUp} className="bg-surface rounded-2xl border border-border p-6 mb-6">
          <p className="text-sm font-medium text-ink mb-3">Your invite link</p>
          <div className="flex items-center gap-3 bg-cream rounded-xl px-4 py-3 border border-border mb-4">
            <p className="text-sm text-ink-muted font-mono truncate flex-1">{inviteUrl}</p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <Button onClick={handleCopy} variant={copied ? 'outline' : 'accent'} className="gap-2 flex-1 justify-center">
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied!' : 'Copy Link'}
            </Button>
            <Button onClick={handleWhatsApp} variant="outline" className="gap-2 flex-1 justify-center">
              <MessageCircle className="w-4 h-4" />
              Share on WhatsApp
            </Button>
          </div>
        </motion.div>

        {/* QR Code */}
        <motion.div variants={fadeUp} className="bg-surface rounded-2xl border border-border p-6 mb-6">
          <p className="text-sm font-medium text-ink mb-4">QR Code</p>
          <div className="flex flex-col items-center gap-4">
            <div className="p-4 bg-white rounded-xl border border-border">
              <QRCodeSVG value={localUrl} size={160} />
            </div>
            <p className="text-xs text-ink-muted text-center">
              Guests can scan this code to open the invite directly
            </p>
          </div>
        </motion.div>

        {/* Preview mockups */}
        <motion.div variants={fadeUp} className="bg-surface rounded-2xl border border-border p-6">
          <p className="text-sm font-medium text-ink mb-4">Preview</p>
          <div className="flex gap-6 items-start justify-center flex-wrap">
            {/* Mobile frame */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-24 h-40 border-2 border-ink/20 rounded-2xl overflow-hidden bg-cream relative">
                <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full bg-ink/20" />
                <div className="mt-5 mx-2 h-24 rounded-lg bg-gradient-to-br from-accent to-gold opacity-80" />
                <div className="mx-2 mt-2 space-y-1">
                  <div className="h-1.5 rounded bg-border" />
                  <div className="h-1.5 rounded bg-border w-3/4" />
                </div>
              </div>
              <p className="text-xs text-ink-muted">Mobile</p>
            </div>

            {/* Desktop frame */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-48 h-32 border-2 border-ink/20 rounded-xl overflow-hidden bg-cream">
                <div className="h-3 bg-border/50 flex items-center gap-1 px-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-ink/20" />
                  <div className="w-1.5 h-1.5 rounded-full bg-ink/20" />
                  <div className="w-1.5 h-1.5 rounded-full bg-ink/20" />
                </div>
                <div className="flex">
                  <div className="flex-1 bg-gradient-to-br from-accent to-gold opacity-80 m-2 rounded-lg" />
                  <div className="w-16 m-2 ml-0 space-y-1">
                    <div className="h-1.5 rounded bg-border" />
                    <div className="h-1.5 rounded bg-border" />
                    <div className="h-1.5 rounded bg-border w-3/4" />
                  </div>
                </div>
              </div>
              <p className="text-xs text-ink-muted">Desktop</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
