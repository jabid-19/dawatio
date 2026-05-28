'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ChevronDown, Trash2 } from 'lucide-react'
import Input from '@/components/ui/Input'
import { formatHijriDate } from '@/lib/useHijriDate'
import { easeOut } from '@/lib/motion'

export interface SubEvent {
  id: string
  name: string
  date: string  // YYYY-MM-DD
  time: string  // e.g. "6:00 PM"
  venue: string
}

interface CeremonyCardProps {
  ceremony: SubEvent
  index: number
  canRemove: boolean
  onChange: (updated: SubEvent) => void
  onRemove: () => void
}

function parseTime(time: string): { hour: string; minute: string; period: string } {
  if (!time) return { hour: '6', minute: '00', period: 'PM' }
  const match = time.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i)
  if (!match) return { hour: '6', minute: '00', period: 'PM' }
  return { hour: match[1], minute: match[2], period: match[3].toUpperCase() }
}

function serializeTime(hour: string, minute: string, period: string): string {
  return `${hour}:${minute} ${period}`
}

export default function CeremonyCard({
  ceremony,
  index,
  canRemove,
  onChange,
  onRemove,
}: CeremonyCardProps) {
  const [expanded, setExpanded] = useState(true)

  const { hour, minute, period } = parseTime(ceremony.time)
  const hijri = formatHijriDate(ceremony.date)

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    onChange({ ...ceremony, name: e.target.value })
  }

  function handleDateChange(e: React.ChangeEvent<HTMLInputElement>) {
    onChange({ ...ceremony, date: e.target.value })
  }

  function handleVenueChange(e: React.ChangeEvent<HTMLInputElement>) {
    onChange({ ...ceremony, venue: e.target.value })
  }

  function handleTimeChange(field: 'hour' | 'minute' | 'period', value: string) {
    const newHour = field === 'hour' ? value : hour
    const newMinute = field === 'minute' ? value : minute
    const newPeriod = field === 'period' ? value : period
    onChange({ ...ceremony, time: serializeTime(newHour, newMinute, newPeriod) })
  }

  const selectClass =
    'h-11 rounded-xl border border-border bg-surface px-3 text-sm text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:border-accent transition-colors appearance-none cursor-pointer'

  return (
    <div className="rounded-2xl border border-border bg-surface p-4 mb-3">
      {/* Header row */}
      <div
        className="flex items-center gap-2 cursor-pointer select-none"
        onClick={() => setExpanded((prev) => !prev)}
        role="button"
        aria-expanded={expanded}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            setExpanded((prev) => !prev)
          }
        }}
      >
        <input
          value={ceremony.name}
          onChange={handleNameChange}
          onClick={(e) => e.stopPropagation()}
          className="flex-1 text-base font-semibold text-ink bg-transparent border-none outline-none focus:underline min-w-0"
          placeholder={`Ceremony ${index + 1}`}
          aria-label="Ceremony name"
        />
        <div className="flex items-center gap-1 shrink-0">
          {canRemove && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                onRemove()
              }}
              className="p-2.5 min-h-[44px] min-w-[44px] text-ink-light hover:text-danger transition-colors"
              aria-label="Remove ceremony"
            >
              <Trash2 size={16} />
            </button>
          )}
          <ChevronDown
            size={18}
            className="text-ink-muted transition-transform duration-200"
            style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 200ms ease' }}
          />
        </div>
      </div>

      {/* Expandable body */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: easeOut }}
            className="overflow-hidden"
          >
            <div className="flex flex-col gap-3 pt-3">
              {/* Date */}
              <div>
                <Input
                  type="date"
                  label="Date"
                  id={`ceremony-date-${ceremony.id}`}
                  value={ceremony.date}
                  onChange={handleDateChange}
                />
                {hijri && (
                  <p className="text-xs text-ink-muted mt-1">{hijri}</p>
                )}
              </div>

              {/* Time */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-ink">Time</label>
                <div className="flex gap-2">
                  <select
                    value={hour}
                    onChange={(e) => handleTimeChange('hour', e.target.value)}
                    className={selectClass}
                    aria-label="Hour"
                  >
                    {Array.from({ length: 12 }, (_, i) => String(i + 1)).map((h) => (
                      <option key={h} value={h}>{h}</option>
                    ))}
                  </select>
                  <select
                    value={minute}
                    onChange={(e) => handleTimeChange('minute', e.target.value)}
                    className={selectClass}
                    aria-label="Minute"
                  >
                    {['00', '15', '30', '45'].map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                  <select
                    value={period}
                    onChange={(e) => handleTimeChange('period', e.target.value)}
                    className={selectClass}
                    aria-label="AM/PM"
                  >
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                  </select>
                </div>
              </div>

              {/* Venue */}
              <Input
                label="Venue"
                id={`ceremony-venue-${ceremony.id}`}
                value={ceremony.venue}
                onChange={handleVenueChange}
                placeholder="e.g. Radisson Blu, Dhaka"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
