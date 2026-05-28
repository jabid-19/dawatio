import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/dashboard/', '/i/'],
      },
    ],
    sitemap: 'https://dawatio.vercel.app/sitemap.xml',
  }
}
