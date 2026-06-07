import type { ColorScheme } from './templates-data'

/**
 * Merges a ColorScheme override into a template's own defaults.
 * Template-specific keys (card, border, accent, etc.) are always preserved.
 * Only the 6 standard ColorScheme keys (bg, surface, primary, secondary, text, muted)
 * are overridden when a scheme is provided.
 */
export function resolveColors<T extends Record<string, string>>(
  colors: ColorScheme | undefined,
  defaults: T
): T {
  if (!colors) return defaults
  return {
    ...defaults,
    ...(colors.bg        ? { bg: colors.bg }               : {}),
    ...(colors.surface   ? { surface: colors.surface }     : {}),
    ...(colors.primary   ? { primary: colors.primary }     : {}),
    ...(colors.secondary ? { secondary: colors.secondary } : {}),
    ...(colors.text      ? { text: colors.text }           : {}),
    ...(colors.muted     ? { muted: colors.muted }         : {}),
  } as T
}
