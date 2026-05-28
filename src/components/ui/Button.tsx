'use client'

import { motion } from 'motion/react'
import { cn } from '@/lib/utils'
import { ButtonHTMLAttributes, forwardRef } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'accent' | 'ghost' | 'outline' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'accent', size = 'md', loading, disabled, children, ...props }, ref) => {
    const base = 'inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none'

    const variants = {
      accent: 'bg-accent text-white hover:bg-accent-hover',
      ghost: 'bg-transparent text-ink hover:bg-border',
      outline: 'border border-border text-ink hover:bg-surface',
      danger: 'bg-danger text-white hover:opacity-90',
    }

    const sizes = {
      sm: 'px-4 py-2 text-sm h-9',
      md: 'px-6 py-2.5 text-sm h-10',
      lg: 'px-8 py-3 text-base h-12',
    }

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
        whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
        className={cn(base, variants[variant], sizes[size], className)}
        disabled={disabled || loading}
        {...(props as object)}
      >
        {loading ? (
          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : null}
        {children}
      </motion.button>
    )
  }
)
Button.displayName = 'Button'
export default Button
