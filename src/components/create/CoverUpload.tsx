'use client'

import { useRef, useState } from 'react'
import { Upload, Camera, X } from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

interface CoverUploadProps {
  value: string | null
  fallback: string | null
  onChange: (url: string | null) => void
  className?: string
}

const MAX_SIZE_BYTES = 5 * 1024 * 1024 // 5MB

export default function CoverUpload({
  value,
  fallback,
  onChange,
  className,
}: CoverUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isDragOver, setIsDragOver] = useState(false)

  function triggerFilePicker() {
    inputRef.current?.click()
  }

  function processFile(file: File) {
    if (file.size > MAX_SIZE_BYTES) {
      toast.error('Image too large — max 5MB')
      return
    }
    const reader = new FileReader()
    reader.onload = (e) => {
      const result = e.target?.result
      if (typeof result === 'string') {
        onChange(result)
      }
    }
    reader.readAsDataURL(file)
  }

  function handleFileInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) processFile(file)
    // Reset input so the same file can be re-selected
    e.target.value = ''
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault()
    setIsDragOver(true)
  }

  function handleDragEnter(e: React.DragEvent) {
    e.preventDefault()
    setIsDragOver(true)
  }

  function handleDragLeave(e: React.DragEvent) {
    e.preventDefault()
    setIsDragOver(false)
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setIsDragOver(false)
    const file = e.dataTransfer.files?.[0]
    if (file && file.type.startsWith('image/')) {
      processFile(file)
    }
  }

  const hasUpload = value !== null
  const hasFallback = fallback !== null

  return (
    <div
      className={cn(
        'relative rounded-2xl border-2 border-dashed border-border bg-surface overflow-hidden aspect-[2/1] transition-colors',
        isDragOver && !hasUpload && 'border-accent bg-accent-light/30',
        className
      )}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileInputChange}
        aria-label="Upload cover photo"
      />

      {hasUpload ? (
        /* Uploaded state */
        <>
          <img
            src={value}
            alt="Cover photo"
            className="w-full h-full object-cover"
          />
          <button
            type="button"
            onClick={() => onChange(null)}
            className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
            aria-label="Remove photo"
          >
            <X size={14} />
          </button>
        </>
      ) : hasFallback ? (
        /* Fallback state */
        <button
          type="button"
          onClick={triggerFilePicker}
          className="w-full h-full relative block"
          aria-label="Add your own photo"
        >
          <img
            src={fallback}
            alt="Template default cover"
            className="w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-black/25 flex flex-col items-center justify-center gap-2">
            <Camera size={22} className="text-white" />
            <span className="text-white text-sm font-medium">Add your own photo</span>
          </div>
        </button>
      ) : (
        /* Empty state */
        <button
          type="button"
          onClick={triggerFilePicker}
          className="w-full h-full flex flex-col items-center justify-center gap-2 text-ink-muted hover:text-ink-light transition-colors"
          aria-label="Upload cover photo"
        >
          <Upload size={24} />
          <div className="text-center">
            <p className="text-sm font-medium">Drop a photo or tap to upload</p>
            <p className="text-xs text-ink-light mt-0.5">Optional — template default will be used</p>
          </div>
        </button>
      )}
    </div>
  )
}
