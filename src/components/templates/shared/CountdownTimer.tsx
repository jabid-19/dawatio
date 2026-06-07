'use client'

import { useEffect, useState } from 'react'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function getTimeLeft(target: string): TimeLeft {
  const diff = new Date(target).getTime() - Date.now()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

interface CountdownTimerProps {
  targetDate: string
  boxStyle?: 'boxed' | 'circular' | 'minimal' | 'inline' | 'neon' | 'large'
  colors?: {
    box?: string
    number?: string
    label?: string
    border?: string
  }
  className?: string
}

export default function CountdownTimer({
  targetDate,
  boxStyle = 'boxed',
  colors = {},
  className = '',
}: CountdownTimerProps) {
  const [time, setTime] = useState<TimeLeft>(getTimeLeft(targetDate))

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft(targetDate)), 1000)
    return () => clearInterval(id)
  }, [targetDate])

  const units: { value: number; label: string }[] = [
    { value: time.days, label: 'Days' },
    { value: time.hours, label: 'Hours' },
    { value: time.minutes, label: 'Min' },
    { value: time.seconds, label: 'Sec' },
  ]

  if (boxStyle === 'inline') {
    return (
      <div className={`flex flex-wrap items-center justify-center gap-x-2 gap-y-1 ${className}`}>
        {units.map((u, i) => (
          <span key={u.label}>
            <span style={{ color: colors.number }} className="font-bold tabular-nums">
              {String(u.value).padStart(2, '0')}
            </span>
            <span style={{ color: colors.label }} className="text-sm ml-1 opacity-60">
              {u.label.toLowerCase()}
            </span>
            {i < units.length - 1 && (
              <span style={{ color: colors.label }} className="mx-2 opacity-40">·</span>
            )}
          </span>
        ))}
      </div>
    )
  }

  if (boxStyle === 'large') {
    return (
      <div className={`flex flex-wrap justify-center gap-6 @md:gap-12 ${className}`}>
        {units.map((u) => (
          <div key={u.label} className="text-center">
            <div
              style={{ color: colors.number, fontVariantNumeric: 'tabular-nums' }}
              className="text-7xl @md:text-9xl font-bold leading-none"
            >
              {String(u.value).padStart(2, '0')}
            </div>
            <div style={{ color: colors.label }} className="text-sm uppercase tracking-widest mt-2 opacity-70">
              {u.label}
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className={`grid grid-cols-2 @sm:grid-cols-4 gap-3 ${className}`}>
      {units.map((u) => (
        <div
          key={u.label}
          className={`flex flex-col items-center justify-center rounded-xl p-4 ${
            boxStyle === 'circular' ? 'rounded-full aspect-square' : ''
          }`}
          style={{
            background: colors.box,
            border: colors.border ? `1px solid ${colors.border}` : undefined,
          }}
        >
          <span
            style={{ color: colors.number, fontVariantNumeric: 'tabular-nums' }}
            className="text-3xl @md:text-4xl font-bold leading-none"
          >
            {String(u.value).padStart(2, '0')}
          </span>
          <span style={{ color: colors.label }} className="text-xs uppercase tracking-widest mt-1 opacity-70">
            {u.label}
          </span>
        </div>
      ))}
    </div>
  )
}
