import Link from 'next/link'
import { CalendarPlus } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
      <div className="w-16 h-16 rounded-2xl bg-accent-light flex items-center justify-center mb-6">
        <CalendarPlus className="w-8 h-8 text-accent" />
      </div>
      <h3 className="text-xl font-semibold text-ink mb-2">No events yet</h3>
      <p className="text-ink-muted text-sm max-w-xs mb-8">
        Create your first digital invitation and share it with your guests.
      </p>
      <Link href="/dashboard/create">
        <Button>Create Your First Event</Button>
      </Link>
    </div>
  )
}
