'use client'

interface CoverPhotoProps {
  src: string | null
  fallback: string
  alt?: string
  shape?: 'circle' | 'portrait' | 'landscape' | 'square'
  className?: string
}

const SHAPE_STYLES: Record<NonNullable<CoverPhotoProps['shape']>, string> = {
  circle:    'rounded-full aspect-square object-cover',
  portrait:  'rounded-2xl aspect-[3/4] object-cover',
  landscape: 'rounded-2xl aspect-[4/3] object-cover',
  square:    'rounded-2xl aspect-square object-cover',
}

export default function CoverPhoto({ src, fallback, alt = '', shape = 'landscape', className = '' }: CoverPhotoProps) {
  return (
    <img
      src={src ?? fallback}
      alt={alt}
      className={`w-full ${SHAPE_STYLES[shape]} ${className}`}
    />
  )
}
