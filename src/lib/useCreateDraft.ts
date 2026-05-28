'use client'

import { useEffect, useRef } from 'react'
import { saveDraft, loadDraft, clearDraft } from './events-store'

export function useCreateDraft<T>(
  data: T,
  onRestore: (data: T) => void,
  enabled: boolean = true
) {
  const restoredRef = useRef(false)
  const skipNextSaveRef = useRef(false)
  const onRestoreRef = useRef(onRestore)

  // Keep onRestoreRef current on every render
  useEffect(() => {
    onRestoreRef.current = onRestore
  })

  useEffect(() => {
    if (!enabled || restoredRef.current) return
    const draft = loadDraft<T>()
    if (draft) {
      skipNextSaveRef.current = true
      onRestoreRef.current(draft)
      restoredRef.current = true
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!enabled) return
    if (skipNextSaveRef.current) {
      skipNextSaveRef.current = false
      return
    }
    const t = setTimeout(() => saveDraft(data), 300)
    return () => clearTimeout(t)
  }, [data, enabled])

  return { clearDraft }
}
