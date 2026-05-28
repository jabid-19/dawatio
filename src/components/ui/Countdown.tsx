'use client'

import { useEffect, useState } from 'react'

interface CountdownProps {
  targetDate: string
  className?: string
}

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

export default function Countdown({ targetDate, className }: CountdownProps) {
  const [time, setTime] = useState<TimeLeft>(getTimeLeft(targetDate))

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft(targetDate)), 1000)
    return () => clearInterval(id)
  }, [targetDate])

  const units = [
    { label: 'Days', value: time.days },
    { label: 'Hours', value: time.hours },
    { label: 'Mins', value: time.minutes },
    { label: 'Secs', value: time.seconds },
  ]

  return (
    <div className={`flex gap-3 ${className ?? ''}`}>
      {units.map(({ label, value }) => (
        <div key={label} className="flex flex-col items-center min-w-[52px]">
          <span className="text-3xl font-bold tabular-nums font-mono leading-none">
            {String(value).padStart(2, '0')}
          </span>
          <span className="text-xs uppercase tracking-widest opacity-60 mt-1">{label}</span>
        </div>
      ))}
    </div>
  )
}
