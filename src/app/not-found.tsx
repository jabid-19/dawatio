import Link from 'next/link'
import Button from '@/components/ui/Button'

export default function NotFound() {
  return (
    <div className="min-h-dvh bg-cream flex flex-col items-center justify-center px-4 text-center">
      <div className="max-w-sm">
        <p
          className="text-8xl font-bold text-accent mb-4"
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          404
        </p>
        <h1 className="text-2xl font-bold text-ink mb-3" style={{ fontFamily: 'var(--font-playfair)' }}>
          This invite isn&apos;t available
        </h1>
        <p className="text-ink-muted text-sm mb-8">
          The invitation you&apos;re looking for may have expired or the link might be incorrect.
        </p>
        <Link href="/register">
          <Button size="lg">Create Your Own Invite</Button>
        </Link>
      </div>
    </div>
  )
}
