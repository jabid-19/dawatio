'use client'

import { motion } from 'motion/react'
import { staggerContainer, staggerItem, viewport } from '@/lib/motion'

interface GalleryProps {
  images: string[]
  fallbackImages?: string[]
  variant?: 'grid' | 'masonry' | 'polaroid' | 'mosaic' | 'filmstrip'
  columns?: 2 | 3
  colors?: {
    border?: string
    overlay?: string
  }
}

const FALLBACK_IMAGES = [
  'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80',
  'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&q=80',
  'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600&q=80',
  'https://images.unsplash.com/photo-1464699908537-0954e50791ee?w=600&q=80',
  'https://images.unsplash.com/photo-1510076857177-7470076d4098?w=600&q=80',
  'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=600&q=80',
]

export default function Gallery({ images, fallbackImages, variant = 'grid', columns = 3, colors = {} }: GalleryProps) {
  const imgs = images.length > 0 ? images : (fallbackImages ?? FALLBACK_IMAGES)

  if (variant === 'polaroid') {
    const rotations = [-2, 1.5, -1, 2, -1.5, 1]
    return (
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={viewport}
        variants={staggerContainer}
        className="grid grid-cols-2 @sm:grid-cols-3 gap-6"
      >
        {imgs.slice(0, 6).map((src, i) => (
          <motion.div
            key={i}
            variants={staggerItem}
            className="bg-white p-3 pb-8 shadow-md"
            style={{ transform: `rotate(${rotations[i] ?? 0}deg)` }}
          >
            <img src={src} alt="" className="w-full aspect-square object-cover" />
          </motion.div>
        ))}
      </motion.div>
    )
  }

  if (variant === 'mosaic') {
    return (
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={viewport}
        variants={staggerContainer}
        className="grid grid-cols-3 grid-rows-2 gap-2"
        style={{ gridTemplateAreas: '"a a b" "a a c"' }}
      >
        {imgs.slice(0, 3).map((src, i) => (
          <motion.div
            key={i}
            variants={staggerItem}
            className="overflow-hidden rounded-xl"
            style={{ gridArea: ['a', 'b', 'c'][i] }}
          >
            <img src={src} alt="" className="w-full h-full object-cover" />
          </motion.div>
        ))}
      </motion.div>
    )
  }

  if (variant === 'filmstrip') {
    return (
      <div className="overflow-x-auto pb-4">
        <div className="flex gap-3" style={{ width: 'max-content' }}>
          {imgs.slice(0, 8).map((src, i) => (
            <div key={i} className="w-48 shrink-0 rounded-xl overflow-hidden">
              <img src={src} alt="" className="w-full h-36 object-cover" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  const colClass = columns === 2 ? 'grid-cols-2' : 'grid-cols-1 @sm:grid-cols-2 @md:grid-cols-3'

  return (
    <motion.div
      initial="initial"
      whileInView="animate"
      viewport={viewport}
      variants={staggerContainer}
      className={`grid ${colClass} gap-3`}
    >
      {imgs.slice(0, 6).map((src, i) => (
        <motion.div
          key={i}
          variants={staggerItem}
          className="overflow-hidden rounded-xl group relative"
          style={{ border: colors.border ? `1px solid ${colors.border}` : undefined }}
        >
          <img
            src={src}
            alt=""
            className="w-full aspect-4/3 object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {colors.overlay && (
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: colors.overlay }}
            />
          )}
        </motion.div>
      ))}
    </motion.div>
  )
}
