interface DawatBrandingProps {
  show: boolean
  colors?: {
    text?: string
    border?: string
  }
}

export default function DawatBranding({ show, colors = {} }: DawatBrandingProps) {
  if (!show) return null

  return (
    <div
      className="py-4 text-center"
      style={{ borderTop: colors.border ? `1px solid ${colors.border}` : undefined }}
    >
      <a
        href="https://dawat.app"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-xs font-medium opacity-50 hover:opacity-80 transition-opacity"
        style={{ color: colors.text }}
      >
        Made with Dawatio
      </a>
    </div>
  )
}
