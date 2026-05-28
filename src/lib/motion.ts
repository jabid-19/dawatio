// ─── Easing curves ────────────────────────────────────────────────────────────
export const ease = [0.25, 0.1, 0.25, 1] as const
export const easeOut = [0, 0, 0.3, 1] as const
export const easeIn = [0.4, 0, 1, 1] as const

// ─── Spring presets ───────────────────────────────────────────────────────────
export const spring = { type: 'spring', stiffness: 380, damping: 30 } as const
export const gentleSpring = { type: 'spring', stiffness: 200, damping: 20 } as const
export const bouncySpring = { type: 'spring', stiffness: 400, damping: 15 } as const
export const snappySpring = { type: 'spring', stiffness: 500, damping: 30 } as const

// ─── Stagger ──────────────────────────────────────────────────────────────────
export const stagger = { staggerChildren: 0.06 } as const

// ─── Variant presets (hidden/visible — for legacy components) ─────────────────
export const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: easeOut } },
}

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3, ease: easeOut } },
}

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: easeOut } },
}

// ─── Variant presets (initial/animate — for new template system) ──────────────
export const fadeUpAnim = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
}

export const fadeInAnim = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
}

export const scaleInAnim = {
  initial: { opacity: 0, scale: 0.92 },
  animate: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 25 } },
}

export const slideFromLeft = {
  initial: { opacity: 0, x: -40 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.6, ease } },
}

export const slideFromRight = {
  initial: { opacity: 0, x: 40 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.6, ease } },
}

export const staggerContainer = {
  animate: { transition: { staggerChildren: 0.08 } },
}

export const staggerItem = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
}

// ─── whileInView viewport config ──────────────────────────────────────────────
export const viewport = { once: true, margin: '-80px' } as const
