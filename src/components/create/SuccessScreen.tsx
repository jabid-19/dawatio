'use client'

import { motion } from 'motion/react'
import { CheckCircle2, Copy, MessageCircle } from 'lucide-react'
import { toast } from 'sonner'
import Button from '@/components/ui/Button'
import type { DawatEvent } from '@/lib/dummy-data'

interface SuccessScreenProps {
  event: DawatEvent
  onAddGuests: () => void
  onEditInvite: () => void
}

export function SuccessScreen({ event, onAddGuests, onEditInvite }: SuccessScreenProps) {
  const inviteUrl = `https://dawat.app/i/${event.slug}`
  const whatsappUrl =
    'https://wa.me/?text=' +
    encodeURIComponent("You're invited! View the details here: " + inviteUrl)

  function handleCopy() {
    navigator.clipboard.writeText(inviteUrl)
    toast.success('Link copied!')
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[var(--color-cream)]">
      {/* Check circle */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className="w-20 h-20 rounded-full bg-[var(--color-accent-light)] flex items-center justify-center"
      >
        <CheckCircle2 className="w-10 h-10 text-[var(--color-accent)]" />
      </motion.div>

      {/* Headline */}
      <h1
        className="text-3xl font-bold text-[var(--color-ink)] mt-6 text-center"
        style={{ fontFamily: 'var(--font-playfair)' }}
      >
        Your invite is live!
      </h1>

      {/* Subtitle */}
      <p className="text-[var(--color-ink-muted)] text-center mt-2">
        Share it with your guests right now.
      </p>

      {/* Invite URL pill */}
      <div className="mt-8 flex items-center gap-2 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-full px-4 py-3 max-w-sm w-full">
        <span className="flex-1 text-sm text-[var(--color-ink-muted)] truncate font-mono">
          dawat.app/i/{event.slug}
        </span>
        <button
          onClick={handleCopy}
          className="w-8 h-8 rounded-full hover:bg-[var(--color-surface)] flex items-center justify-center transition-colors"
          aria-label="Copy invite link"
        >
          <Copy className="w-4 h-4 text-[var(--color-ink-muted)]" />
        </button>
      </div>

      {/* WhatsApp share button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 w-full max-w-sm bg-[#25D366] text-white rounded-full px-6 py-3 font-medium text-sm flex items-center justify-center gap-2"
      >
        <MessageCircle className="w-4 h-4" />
        Share on WhatsApp
      </a>

      {/* Divider */}
      <div className="mt-6 w-full max-w-sm flex items-center gap-3">
        <div className="flex-1 h-px bg-[var(--color-border)]" />
        <span className="text-xs text-[var(--color-ink-light)]">or</span>
        <div className="flex-1 h-px bg-[var(--color-border)]" />
      </div>

      {/* CTA buttons */}
      <Button
        size="lg"
        className="mt-6 w-full max-w-sm justify-center"
        onClick={onAddGuests}
      >
        Add your guests
      </Button>
      <Button
        variant="outline"
        size="md"
        className="mt-2 w-full max-w-sm justify-center"
        onClick={onEditInvite}
      >
        Edit invite
      </Button>

      {/* Bottom note */}
      <p className="mt-8 text-xs text-[var(--color-ink-light)] text-center">
        Starting on Free plan · upgrade anytime
      </p>
    </div>
  )
}
