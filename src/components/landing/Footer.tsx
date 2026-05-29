import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-ink text-ink-light py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <Image
              src="/logo.png"
              alt="Dawatio"
              width={120}
              height={40}
              className="mb-3"
              style={{ objectFit: 'contain' }}
            />
            <p className="text-sm leading-relaxed text-ink-light max-w-xs">
              Create beautiful digital invitation websites for every celebration — in minutes.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wide">Product</h4>
            <ul className="space-y-3 text-sm">
              {[
                { label: 'Features', href: '/#how-it-works' },
                { label: 'Templates', href: '/templates' },
                { label: 'Pricing', href: '/pricing' },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wide">Account</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/login" className="hover:text-white transition-colors">Login</Link></li>
              <li><Link href="/register" className="hover:text-white transition-colors">Create Free Account</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex items-center justify-between gap-4 flex-wrap">
          <p className="text-xs text-ink-light/60">
            &copy; 2025 Dawatio. Made with love in Bangladesh.
          </p>
          <p className="text-xs text-ink-light/40">
            Made with Dawatio ✦
          </p>
        </div>
      </div>
    </footer>
  )
}
