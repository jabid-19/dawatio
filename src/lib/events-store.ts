import { DUMMY_EVENTS, DawatEvent } from './dummy-data'

const STORAGE_KEY = 'dawat_events'

export function getAllEvents(): DawatEvent[] {
  if (typeof window === 'undefined') return DUMMY_EVENTS
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    const extra: DawatEvent[] = stored ? JSON.parse(stored) : []
    return [...DUMMY_EVENTS, ...extra]
  } catch {
    return DUMMY_EVENTS
  }
}

export function getEventById(id: string): DawatEvent | undefined {
  return getAllEvents().find((e) => e.id === id)
}

export function getEventBySlug(slug: string): DawatEvent | undefined {
  return getAllEvents().find((e) => e.slug === slug)
}

export function saveEvent(event: DawatEvent): void {
  if (typeof window === 'undefined') return
  const isDummy = DUMMY_EVENTS.some((e) => e.id === event.id)
  if (isDummy) {
    // For dummy events store updates separately
    const updates = getStoredUpdates()
    updates[event.id] = event
    localStorage.setItem('dawat_event_updates', JSON.stringify(updates))
    return
  }
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    const extra: DawatEvent[] = stored ? JSON.parse(stored) : []
    const idx = extra.findIndex((e) => e.id === event.id)
    if (idx >= 0) extra[idx] = event
    else extra.push(event)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(extra))
  } catch {
    // ignore
  }
}

export function getEventForEdit(id: string): DawatEvent | undefined {
  const updates = getStoredUpdates()
  if (updates[id]) return updates[id]
  return getEventById(id)
}

function getStoredUpdates(): Record<string, DawatEvent> {
  if (typeof window === 'undefined') return {}
  try {
    const stored = localStorage.getItem('dawat_event_updates')
    return stored ? JSON.parse(stored) : {}
  } catch {
    return {}
  }
}

export function addNewEvent(event: DawatEvent): void {
  if (typeof window === 'undefined') return
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    const extra: DawatEvent[] = stored ? JSON.parse(stored) : []
    extra.push(event)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(extra))
  } catch {
    // ignore
  }
}

const DRAFT_KEY = 'dawat_draft_create'

export function saveDraft(data: unknown): void {
  if (typeof window === 'undefined') return
  try { localStorage.setItem(DRAFT_KEY, JSON.stringify(data)) } catch { /* ignore */ }
}

export function loadDraft<T>(): T | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(DRAFT_KEY)
    return raw ? (JSON.parse(raw) as T) : null
  } catch { return null }
}

export function clearDraft(): void {
  if (typeof window === 'undefined') return
  try { localStorage.removeItem(DRAFT_KEY) } catch { /* ignore */ }
}
