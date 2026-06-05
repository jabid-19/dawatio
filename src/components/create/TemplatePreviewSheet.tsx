'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { X, Smartphone, Monitor, Check, Sparkles } from 'lucide-react'
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

  useEffect(() => {
    if (preview) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [preview])

  const previewConfig = preview
    ? TEMPLATE_CONFIGS.find((t) => t.id === preview.template.id)
    : null
  const schemes = previewConfig?.colorSchemes ?? []
  const previewEvent = preview ? { ...preview.event, colorScheme: selectedScheme } : null
  const isSelected = selected === preview?.template.id

  return (
    <AnimatePresence>
      {preview && previewEvent && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Sheet */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 32, stiffness: 320 }}
            className="fixed bottom-0 left-0 right-0 z-50 flex flex-col bg-white rounded-t-3xl"
            style={{
              height: '92dvh',
              boxShadow: '0 -8px 60px rgba(26,23,20,0.22)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drag handle */}
            <div className="flex justify-center pt-3 pb-2 shrink-0">
              <div className="w-9 h-1 rounded-full bg-ink-light/60" />
            </div>

            {/* Header */}
            <div className="shrink-0 px-4 pb-3 border-b border-border">
              {/* Top row: title + close */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-accent" />
                  <span className="font-semibold text-ink text-sm leading-tight">
                    {preview.template.name}
                  </span>
                  {preview.template.isPremium && (
                    <span className="text-[10px] font-semibold bg-ink text-white rounded-full px-2 py-0.5 leading-none">
                      Premium
                    </span>
                  )}
                </div>

                <button
                  onClick={onClose}
                  aria-label="Close preview"
                  className="cursor-pointer w-8 h-8 flex items-center justify-center rounded-full bg-surface hover:bg-border transition-colors"
                >
                  <X className="w-4 h-4 text-ink-muted" />
                </button>
              </div>

              {/* Bottom row: color schemes + view toggle */}
              <div className="flex items-center gap-3 flex-wrap">
                {schemes.length > 0 && (
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar py-1.5 px-1.5">
                      {schemes.map((s) => (
                        <button
                          key={s.id}
                          onClick={() => onSchemeChange(s.id)}
                          title={s.label}
                          aria-pressed={selectedScheme === s.id}
                          className="group relative shrink-0 flex flex-col items-center gap-1 cursor-pointer"
                        >
                          {/* Circle swatch: left=bg, right=primary */}
                          <div
                            className={`relative w-8 h-8 rounded-full transition-all duration-150 ${
                              selectedScheme === s.id
                                ? 'ring-2 ring-accent ring-offset-2 scale-110'
                                : 'ring-1 ring-border group-hover:scale-110 group-hover:ring-ink-light'
                            }`}
                            style={{
                              background: `linear-gradient(135deg, ${s.bg} 50%, ${s.primary} 50%)`,
                            }}
                          >
                            {selectedScheme === s.id && (
                              <div className="absolute inset-0 rounded-full flex items-center justify-center bg-black/15">
                                <Check className="w-3 h-3 text-white drop-shadow-sm" />
                              </div>
                            )}
                          </div>
                          <span className={`text-[10px] leading-none transition-colors ${
                            selectedScheme === s.id ? 'text-accent font-semibold' : 'text-ink-muted'
                          }`}>
                            {s.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* View toggle */}
                <div className="shrink-0 flex items-center gap-0.5 bg-surface rounded-xl p-1 border border-border">
                  <button
                    onClick={() => setViewMode('mobile')}
                    aria-pressed={viewMode === 'mobile'}
                    className={`cursor-pointer flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 ${
                      viewMode === 'mobile'
                        ? 'bg-white shadow-sm text-ink'
                        : 'text-ink-muted hover:text-ink'
                    }`}
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>Mobile</span>
                  </button>
                  <button
                    onClick={() => setViewMode('desktop')}
                    aria-pressed={viewMode === 'desktop'}
                    className={`cursor-pointer flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 ${
                      viewMode === 'desktop'
                        ? 'bg-white shadow-sm text-ink'
                        : 'text-ink-muted hover:text-ink'
                    }`}
                  >
                    <Monitor className="w-3.5 h-3.5" />
                    <span>Desktop</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Preview area */}
            <div
              className="flex-1 overflow-y-auto"
              style={{
                background: 'radial-gradient(ellipse at top, #F5E8E0 0%, #FAF8F4 60%)',
              }}
            >
              <AnimatePresence mode="wait">
                {viewMode === 'mobile' ? (
                  <motion.div
                    key="mobile"
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                    className="flex justify-center py-8 px-4"
                  >
                    {/* Phone frame */}
                    <div className="relative">
                      <div
                        className="relative rounded-[2.5rem] overflow-hidden"
                        style={{
                          width: '100%',
                          maxWidth: '360px',
                          boxShadow: '0 0 0 8px #1a1714, 0 0 0 10px #3d3a36, 0 24px 60px rgba(26,23,20,0.35)',
                        }}
                      >
                        {/* Phone notch bar */}
                        <div className="relative bg-[#1a1714] h-8 flex items-center justify-center shrink-0">
                          <div className="w-20 h-4 bg-[#1a1714] rounded-full border border-[#3d3a36]" />
                        </div>
                        <div className="pointer-events-none select-none">
                          <TemplateRenderer event={previewEvent} />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="desktop"
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                    className="py-8 px-4"
                  >
                    <div
                      className="bg-white rounded-2xl overflow-hidden"
                      style={{ boxShadow: '0 0 0 1px rgba(0,0,0,0.08), 0 16px 56px rgba(26,23,20,0.2)' }}
                    >
                      {/* Browser chrome */}
                      <div className="flex items-center gap-2 px-4 py-2.5 bg-[#F0EDE8] border-b border-border">
                        <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                        <span className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
                        <span className="w-3 h-3 rounded-full bg-[#28C840]" />
                        <div className="ml-4 flex-1 bg-white rounded-md px-3 py-1 text-xs text-ink-muted font-mono border border-border truncate max-w-xs">
                          dawat.app/i/{previewEvent.slug}
                        </div>
                      </div>
                      <div className="pointer-events-none select-none">
                        <TemplateRenderer event={previewEvent} />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer — create flow only */}
            {onSelect && (
              <div className="shrink-0 px-4 py-4 border-t border-border bg-white flex gap-3">
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
                  {isSelected ? (
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
