import { cn } from '@/lib/utils'
import { HTMLAttributes } from 'react'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'gold' | 'muted'
}

export default function Badge({ className, variant = 'default', children, ...props }: BadgeProps) {
  const variants = {
    default: 'bg-accent-light text-accent',
    success: 'bg-green-100 text-success',
    warning: 'bg-amber-100 text-amber-700',
    danger: 'bg-red-100 text-danger',
    gold: 'bg-amber-100 text-amber-700',
    muted: 'bg-border text-ink-muted',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}
