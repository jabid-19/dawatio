'use client'

import { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react'
import { formatHijriDate } from '@/lib/useHijriDate'
import { easeOut, scaleIn } from '@/lib/motion'
import { cn } from '@/lib/utils'

interface DateTimePickerProps {
  value: string      // YYYY-MM-DD
  onChange: (date: string) => void
  label?: string
  className?: string
}

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

function formatDisplayDate(dateString: string): string {
  if (!dateString) return ''
  const parsed = new Date(dateString)
  if (isNaN(parsed.getTime())) return ''
  const d = new Date(parsed.getUTCFullYear(), parsed.getUTCMonth(), parsed.getUTCDate())
  return `${d.getDate()} ${MONTH_NAMES[d.getMonth()]} ${d.getFullYear()}`
}

function toYMD(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

function getCalendarDays(viewMonth: Date): { date: Date; isCurrentMonth: boolean }[] {
  const year = viewMonth.getFullYear()
  const month = viewMonth.getMonth()

  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)

  const startDow = firstDay.getDay() // 0=Sun
  const endDow = lastDay.getDay()

  const days: { date: Date; isCurrentMonth: boolean }[] = []

  // Fill leading days from previous month
  for (let i = startDow - 1; i >= 0; i--) {
    days.push({ date: new Date(year, month, -i), isCurrentMonth: false })
  }

  // Current month days
  for (let d = 1; d <= lastDay.getDate(); d++) {
    days.push({ date: new Date(year, month, d), isCurrentMonth: true })
  }

  // Fill trailing days from next month
  const trailingDays = endDow === 6 ? 0 : 6 - endDow
  for (let d = 1; d <= trailingDays; d++) {
    days.push({ date: new Date(year, month + 1, d), isCurrentMonth: false })
  }

  return days
}

export default function DateTimePicker({
  value,
  onChange,
  label,
  className,
}: DateTimePickerProps) {
  const [open, setOpen] = useState(false)
  const [viewMonth, setViewMonth] = useState<Date>(() => {
    if (value) {
      const parsed = new Date(value)
      if (!isNaN(parsed.getTime())) {
        return new Date(parsed.getUTCFullYear(), parsed.getUTCMonth(), 1)
      }
    }
    const now = new Date()
    return new Date(now.getFullYear(), now.getMonth(), 1)
  })

  const containerRef = useRef<HTMLDivElement>(null)

  // Close on outside click
  useEffect(() => {
    if (!open) return
    function handleMouseDown(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleMouseDown)
    return () => document.removeEventListener('mousedown', handleMouseDown)
  }, [open])

  const today = new Date()
  const todayYMD = toYMD(today)

  const displayDate = formatDisplayDate(value)
  const hijri = formatHijriDate(value)

  function prevMonth() {
    setViewMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))
  }

  function nextMonth() {
    setViewMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))
  }

  function selectDate(date: Date) {
    onChange(toYMD(date))
    setOpen(false)
  }

  const calendarDays = getCalendarDays(viewMonth)

  return (
    <div ref={containerRef} className={cn('relative', className)}>
      {label && (
        <label className="block text-sm font-medium text-ink mb-1.5">{label}</label>
      )}

      {/* Trigger button */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          'w-full flex items-center gap-3 rounded-xl border border-border bg-surface px-4 h-11 text-left',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:border-accent',
          'transition-colors',
          open && 'ring-2 ring-accent border-accent'
        )}
      >
        <Calendar size={16} className="text-ink-muted shrink-0" />
        <div className="flex-1 min-w-0">
          {displayDate ? (
            <>
              <span className="text-sm text-ink">{displayDate}</span>
              {hijri && (
                <span className="block text-xs text-ink-muted leading-tight">{hijri}</span>
              )}
            </>
          ) : (
            <span className="text-sm text-ink-light">Select date</span>
          )}
        </div>
      </button>

      {/* Calendar dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="calendar"
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            exit="hidden"
            style={{ originX: 0, originY: 0 }}
            className="absolute top-full left-0 right-0 mt-2 z-50 rounded-2xl border border-border bg-surface shadow-[var(--shadow-float)] overflow-hidden"
          >
            {/* Month navigation */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <button
                type="button"
                onClick={prevMonth}
                className="p-2.5 min-h-[44px] min-w-[44px] rounded-lg hover:bg-cream text-ink-muted hover:text-ink transition-colors"
                aria-label="Previous month"
              >
                <ChevronLeft size={16} />
              </button>
              <span className="text-sm font-semibold text-ink">
                {MONTH_NAMES[viewMonth.getMonth()]} {viewMonth.getFullYear()}
              </span>
              <button
                type="button"
                onClick={nextMonth}
                className="p-2.5 min-h-[44px] min-w-[44px] rounded-lg hover:bg-cream text-ink-muted hover:text-ink transition-colors"
                aria-label="Next month"
              >
                <ChevronRight size={16} />
              </button>
            </div>

            {/* Day grid */}
            <div className="p-3">
              {/* Day of week headers */}
              <div className="grid grid-cols-7 mb-1">
                {DAYS_OF_WEEK.map((dow) => (
                  <div key={dow} className="text-xs text-ink-muted text-center py-1">
                    {dow}
                  </div>
                ))}
              </div>

              {/* Day cells */}
              <div className="grid grid-cols-7 gap-y-0.5">
                {calendarDays.map(({ date, isCurrentMonth }, idx) => {
                  const ymd = toYMD(date)
                  const isSelected = ymd === value
                  const isToday = ymd === todayYMD

                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => selectDate(date)}
                      className={cn(
                        'w-11 h-11 rounded-full flex items-center justify-center text-sm cursor-pointer mx-auto transition-colors',
                        isSelected
                          ? 'bg-accent text-white'
                          : isCurrentMonth
                          ? 'text-ink hover:bg-accent-light'
                          : 'text-ink-light hover:bg-accent-light',
                        isToday && !isSelected && 'ring-1 ring-accent/40'
                      )}
                      aria-label={date.toLocaleDateString()}
                      aria-pressed={isSelected}
                    >
                      {date.getDate()}
                    </button>
                  )
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
