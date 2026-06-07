'use client'

import { useRef, useState } from 'react'
import { Upload, X, GripVertical } from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

const MAX_IMAGES = 6
const MAX_SIZE_BYTES = 5 * 1024 * 1024

interface GalleryUploaderProps {
  images: string[]
  onChange: (images: string[]) => void
}

export function GalleryUploader({ images, onChange }: GalleryUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null)
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null)
  const [isDropZoneDragOver, setIsDropZoneDragOver] = useState(false)

  function processFiles(files: FileList) {
    const remaining = MAX_IMAGES - images.length
    if (remaining <= 0) {
      toast.error(`Max ${MAX_IMAGES} photos allowed`)
      return
    }

    const toProcess = Array.from(files).slice(0, remaining)
    const newImages: string[] = []
    let processed = 0

    toProcess.forEach((file) => {
      if (!file.type.startsWith('image/')) {
        processed++
        return
      }
      if (file.size > MAX_SIZE_BYTES) {
        toast.error(`"${file.name}" is too large — max 5MB`)
        processed++
        if (processed === toProcess.length && newImages.length > 0) {
          onChange([...images, ...newImages])
        }
        return
      }
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result
        if (typeof result === 'string') newImages.push(result)
        processed++
        if (processed === toProcess.length && newImages.length > 0) {
          onChange([...images, ...newImages])
        }
      }
      reader.readAsDataURL(file)
    })
  }

  function handleFileInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) processFiles(e.target.files)
    e.target.value = ''
  }

  function handleDropZoneDrop(e: React.DragEvent) {
    e.preventDefault()
    setIsDropZoneDragOver(false)
    if (e.dataTransfer.files.length) processFiles(e.dataTransfer.files)
  }

  function removeImage(index: number) {
    onChange(images.filter((_, i) => i !== index))
  }

  // ─── Drag-to-reorder ──────────────────────────────────────────────────────

  function handleDragStart(e: React.DragEvent, index: number) {
    setDraggingIndex(index)
    e.dataTransfer.effectAllowed = 'move'
  }

  function handleDragEnd() {
    setDraggingIndex(null)
    setDragOverIndex(null)
  }

  function handleItemDragOver(e: React.DragEvent, index: number) {
    e.preventDefault()
    if (draggingIndex === null || draggingIndex === index) return
    setDragOverIndex(index)
  }

  function handleItemDrop(e: React.DragEvent, targetIndex: number) {
    e.preventDefault()
    if (draggingIndex === null || draggingIndex === targetIndex) return
    const next = [...images]
    const [removed] = next.splice(draggingIndex, 1)
    next.splice(targetIndex, 0, removed)
    onChange(next)
    setDraggingIndex(null)
    setDragOverIndex(null)
  }

  const canAddMore = images.length < MAX_IMAGES

  return (
    <div className="space-y-3">
      <p className="text-xs text-ink-muted">Up to {MAX_IMAGES} photos · drag to reorder</p>

      <div className="grid grid-cols-3 gap-2">
        {images.map((src, i) => (
          <div
            key={src + i}
            draggable
            onDragStart={(e) => handleDragStart(e, i)}
            onDragEnd={handleDragEnd}
            onDragOver={(e) => handleItemDragOver(e, i)}
            onDrop={(e) => handleItemDrop(e, i)}
            className={cn(
              'relative aspect-square rounded-xl overflow-hidden bg-surface ring-1 ring-black/5 transition-opacity',
              draggingIndex === i && 'opacity-40',
              dragOverIndex === i && draggingIndex !== i && 'ring-2 ring-accent'
            )}
          >
            <img src={src} alt={`Gallery photo ${i + 1}`} className="w-full h-full object-cover" />

            {/* Drag handle */}
            <div className="absolute top-1 left-1 w-6 h-6 rounded-md bg-black/40 flex items-center justify-center cursor-grab active:cursor-grabbing">
              <GripVertical className="w-3 h-3 text-white" />
            </div>

            {/* Remove button */}
            <button
              type="button"
              onClick={() => removeImage(i)}
              className="absolute top-1 right-1 w-6 h-6 rounded-md bg-black/40 flex items-center justify-center hover:bg-black/60 transition-colors cursor-pointer"
              aria-label={`Remove photo ${i + 1}`}
            >
              <X className="w-3 h-3 text-white" />
            </button>
          </div>
        ))}

        {/* Add tile */}
        {canAddMore && (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); setIsDropZoneDragOver(true) }}
            onDragLeave={() => setIsDropZoneDragOver(false)}
            onDrop={handleDropZoneDrop}
            className={cn(
              'aspect-square rounded-xl border-2 border-dashed border-border bg-surface flex flex-col items-center justify-center gap-1.5 transition-colors cursor-pointer hover:border-accent hover:bg-accent/5',
              isDropZoneDragOver && 'border-accent bg-accent/10'
            )}
            aria-label="Add photo"
          >
            <Upload className="w-5 h-5 text-ink-muted" />
            <span className="text-xs text-ink-muted">Add photo</span>
          </button>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleFileInputChange}
        aria-label="Upload gallery photos"
      />
    </div>
  )
}
