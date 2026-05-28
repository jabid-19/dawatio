'use client'

import { useState } from 'react'
import { Copy, Check, Share2 } from 'lucide-react'

interface ShareBarProps {
  colors?: {
    bar?: string
    button?: string
    buttonText?: string
    border?: string
  }
  floating?: boolean
}

export default function ShareBar({ colors = {}, floating = true }: ShareBarProps) {
  const [copied, setCopied] = useState(false)

  function copyLink() {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  function shareWhatsApp() {
    const url = `https://wa.me/?text=${encodeURIComponent(window.location.href)}`
    window.open(url, '_blank')
  }

  const wrapperClass = floating
    ? 'fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full shadow-lg backdrop-blur-sm'
    : 'flex items-center gap-2 px-4 py-2.5 rounded-full'

  return (
    <div
      className={wrapperClass}
      style={{ background: colors.bar || 'rgba(255,255,255,0.9)', border: colors.border ? `1px solid ${colors.border}` : undefined }}
    >
      <Share2 className="w-4 h-4 opacity-50" style={{ color: colors.buttonText }} />
      <button
        onClick={copyLink}
        className="flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-full transition-all"
        style={{ color: colors.buttonText, background: copied ? colors.button : 'transparent' }}
      >
        {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
        {copied ? 'Copied!' : 'Copy Link'}
      </button>
      <div className="w-px h-4 opacity-20" style={{ background: colors.buttonText }} />
      <button
        onClick={shareWhatsApp}
        className="flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-full transition-all"
        style={{ color: colors.buttonText }}
      >
        WhatsApp
      </button>
    </div>
  )
}
