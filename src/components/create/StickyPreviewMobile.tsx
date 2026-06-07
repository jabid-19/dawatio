'use client'

import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Eye, ChevronRight, X } from 'lucide-react'
import { TemplateRenderer } from '@/lib/template-utils'
import { LivePreview, formToEvent } from './LivePreview'
import type { CreateFormState } from './LivePreview'
import { spring } from '@/lib/motion'

interface StickyPreviewMobileProps {
  form: CreateFormState
  className?: string
}

export function StickyPreviewMobile({ form, className }: StickyPreviewMobileProps) {
  const [open, setOpen] = useState(false)

  const displayTitle = form.title || 'Your event'
  const templateName = form.template
    ? form.template.charAt(0).toUpperCase() + form.template.slice(1)
    : 'Default'

  const previewEvent = useMemo(() => formToEvent(form), [form])

  return (
    <>
      {/* Sticky strip */}
      <div
        className={`sticky top-0 z-30 bg-cream/95 backdrop-blur-sm border-b border-border py-3 px-4 lg:hidden ${className ?? ''}`}
      >
        <div
          onClick={() => setOpen(true)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && setOpen(true)}
          className="flex items-center gap-3 w-full cursor-pointer"
          aria-label="Open live preview"
        >
          {/* Mini thumbnail */}
          <div className="w-16 h-20 rounded-xl overflow-hidden relative shrink-0 bg-white ring-1 ring-black/5">
            <div
              className="pointer-events-none select-none"
              style={{
                transform: 'scale(0.41)',
                transformOrigin: 'top left',
                width: '383px',
                position: 'absolute',
                top: 0,
                left: 0,
              }}
            >
              <TemplateRenderer event={previewEvent} disableEffects />
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0 text-left">
            <p className="text-sm font-semibold text-ink truncate">{displayTitle}</p>
            <p className="text-xs text-ink-muted mt-0.5">{templateName}</p>
            <p className="flex items-center gap-1 text-xs text-ink-light mt-1">
              <Eye className="w-3 h-3" />
              Tap to preview
            </p>
          </div>

          {/* Right chevron */}
          <ChevronRight className="w-4 h-4 text-ink-muted shrink-0" />
        </div>
      </div>

      {/* Fullscreen preview sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={spring}
            className="fixed inset-0 z-50 flex flex-col bg-cream"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border shrink-0">
              <button
                onClick={() => setOpen(false)}
                aria-label="Close preview"
                className="p-3 rounded-full hover:bg-surface transition-colors"
              >
                <X className="w-5 h-5 text-ink" />
              </button>
              <span className="text-sm font-semibold text-ink">Preview</span>
              {/* Spacer to center title */}
              <div className="w-9" />
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto">
              <LivePreview form={form} className="mx-auto px-4 py-6 w-full max-w-sm" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
