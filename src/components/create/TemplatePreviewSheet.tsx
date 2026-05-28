'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { X, Smartphone, Monitor, Check } from 'lucide-react'
import { Template, DawatEvent } from '@/lib/dummy-data'
import { TEMPLATE_CONFIGS } from '@/lib/templates-data'
import { TemplateRenderer } from '@/lib/template-utils'
import Button from '@/components/ui/Button'

type ViewMode = 'mobile' | 'desktop'

interface TemplatePreviewSheetProps {
  preview: { template: Template; event: DawatEvent } | null
  onClose: () => void
  selectedScheme: number
  onSchemeChange: (n: number) => void
  // Create-flow only — omit on marketing pages
  selected?: string
  onSelect?: (id: string) => void
}

export function TemplatePreviewSheet({
  preview,
  onClose,
  selectedScheme,
  onSchemeChange,
  selected,
  onSelect,
}: TemplatePreviewSheetProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('mobile')

  const previewConfig = preview
    ? TEMPLATE_CONFIGS.find((t) => t.id === preview.template.id)
    : null
  const schemes = previewConfig?.colorSchemes ?? []
  const previewEvent = preview ? { ...preview.event, colorScheme: selectedScheme } : null

  return (
    <AnimatePresence>
      {preview && previewEvent && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60"
            onClick={onClose}
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 flex flex-col bg-white rounded-t-2xl shadow-2xl"
            style={{ height: '90dvh' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drag handle */}
            <div className="flex justify-center pt-3 pb-1 shrink-0">
              <div className="w-10 h-1 rounded-full bg-border" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border shrink-0 gap-3">
              <span className="text-sm font-semibold text-ink shrink-0">{preview.template.name}</span>

              {schemes.length > 0 && (
                <div className="flex items-center gap-3 flex-1">
                  {schemes.map((s) => (
                    <div key={s.id} className="flex flex-col items-center gap-1">
                      <button
                        onClick={() => onSchemeChange(s.id)}
                        title={s.label}
                        className={`relative rounded-md overflow-hidden h-6 w-16 flex ring-2 transition-all cursor-pointer ${
                          selectedScheme === s.id ? 'ring-accent scale-105' : 'ring-transparent hover:ring-border'
                        }`}
                      >
                        {[s.bg, s.surface, s.primary, s.text].map((c, i) => (
                          <div key={i} className="flex-1 h-full" style={{ background: c }} />
                        ))}
                        {selectedScheme === s.id && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Check className="w-2.5 h-2.5 text-white drop-shadow" />
                          </div>
                        )}
                      </button>
                      <span className={`text-[10px] leading-none transition-colors ${selectedScheme === s.id ? 'text-accent font-medium' : 'text-ink-muted'}`}>
                        {s.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex items-center gap-2 shrink-0">
                <div className="flex items-center gap-1 bg-surface rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('mobile')}
                    aria-pressed={viewMode === 'mobile'}
                    className={`flex items-center gap-1.5 px-3 py-2.5 min-h-[44px] rounded-md text-xs font-medium transition-colors ${
                      viewMode === 'mobile' ? 'bg-white shadow text-ink' : 'text-ink-muted hover:text-ink'
                    }`}
                  >
                    <Smartphone className="w-3.5 h-3.5" /> Mobile
                  </button>
                  <button
                    onClick={() => setViewMode('desktop')}
                    aria-pressed={viewMode === 'desktop'}
                    className={`flex items-center gap-1.5 px-3 py-2.5 min-h-[44px] rounded-md text-xs font-medium transition-colors ${
                      viewMode === 'desktop' ? 'bg-white shadow text-ink' : 'text-ink-muted hover:text-ink'
                    }`}
                  >
                    <Monitor className="w-3.5 h-3.5" /> Desktop
                  </button>
                </div>
                <button
                  onClick={onClose}
                  aria-label="Close preview"
                  className="p-2.5 rounded-full hover:bg-surface transition-colors"
                >
                  <X className="w-4 h-4 text-ink-muted" />
                </button>
              </div>
            </div>

            {/* Preview area */}
            <div className="flex-1 overflow-y-auto bg-surface/50">
              {viewMode === 'mobile' ? (
                <div className="flex justify-center py-6 px-4">
                  <div className="w-full max-w-[390px] bg-white rounded-2xl overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.15)] ring-1 ring-black/10">
                    <div className="pointer-events-none select-none">
                      <TemplateRenderer event={previewEvent} />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="py-6 px-4">
                  <div className="bg-white rounded-xl overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.15)] ring-1 ring-black/10">
                    <div className="flex items-center gap-1.5 px-3 py-2 bg-surface border-b border-border">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                      <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                      <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
                      <div className="ml-3 flex-1 bg-white rounded px-2 py-0.5 text-xs text-ink-muted font-mono border border-border truncate">
                        dawat.app/i/{previewEvent.slug}
                      </div>
                    </div>
                    <div className="pointer-events-none select-none">
                      <TemplateRenderer event={previewEvent} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer — create flow only */}
            {onSelect && (
              <div className="p-4 border-t border-border shrink-0 flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1 justify-center border-border"
                  onClick={onClose}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1 justify-center gap-2"
                  onClick={() => {
                    onSelect(preview.template.id)
                    onClose()
                  }}
                >
                  {selected === preview.template.id ? (
                    <><Check className="w-4 h-4" /> Selected</>
                  ) : (
                    <>Use this template</>
                  )}
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
