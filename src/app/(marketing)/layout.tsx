import { ReactNode } from 'react'
import Navbar from '@/components/landing/Navbar'

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div className='bg-cream'>
      <Navbar />
      <div className='pt-[120px]'>{children}</div>
    </div>
  )
}
