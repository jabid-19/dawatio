# Login Page Redesign — Split Screen Layout

## Overview

Redesign the auth pages (`/login`, `/register`) from a centered card layout to a full-screen two-column split: form on the left, decorative geometric panel on the right. Inspired by a split-screen SaaS login reference.

---

## Layout Structure

File: `src/app/(auth)/layout.tsx`

Change from centered `flex` layout to a full-screen two-column CSS grid:

```
grid grid-cols-1 lg:grid-cols-2 min-h-dvh
```

- **Left column**: `bg-surface` (white), full-height, vertically and horizontally centered, contains logo + `{children}`
- **Right column**: decorative panel, hidden on mobile (`hidden lg:block`)
- Both `/login` and `/register` inherit the split automatically

Remove the current `<header>` + `<main>` wrapper. The logo moves inside the left column panel above the form content.

---

## Left Panel

- Background: `bg-surface` (white)
- Padding: `px-12 py-12` desktop, `px-6 py-8` mobile
- Top of column: Dawat wordmark (Playfair Display, links to `/`)
- Below: `{children}` — the form content (login or register page)
- Login/register page forms: remove the `bg-surface rounded-2xl shadow border` card wrapper — the left panel is now the white surface. Keep a `max-w-[400px] w-full` constraint on form content for readability on wide screens.

---

## Right Decorative Panel

Inlined as a sibling `<div>` in `layout.tsx`. No separate component file.

### Background
- Base: `--color-accent` (#C9622F terracotta)
- Subtle radial gradient: `radial-gradient(ellipse at 60% 40%, #B05525 0%, #C9622F 60%, #8B3A1A 100%)`

### Geometric Shapes
All shapes: `absolute`, `rounded-full`, `pointer-events-none`. Parent: `relative overflow-hidden`.

| Shape | Size | Color | Opacity | Position |
|---|---|---|---|---|
| Circle 1 | 320px | `--color-gold` (#D4A853) | 35% | top-right, `-40px -60px` |
| Circle 2 | 200px | white | 10% | bottom-left, `-60px 60%` |
| Circle 3 | 120px | `--color-accent-light` (#F5E8E0) | 25% | center, `30% 40%` |
| Circle 4 | 80px | `--color-gold` | 50% | bottom-right, `20% bottom-20px` |
| Circle 5 | 240px | white | 8% | `50% 70%` — slightly blurred |

Circle 5 uses `blur-2xl` for depth.

### Centered Tagline
Positioned with `absolute inset-0 flex flex-col items-center justify-center z-10`:

```
"Beautiful invitations,
made simple"
```

- Font: Playfair Display, `text-2xl lg:text-3xl`, white, `text-center`, `leading-snug`
- Below tagline: "Dawat" wordmark, white at 50% opacity, `text-sm font-mono tracking-widest uppercase`, `mt-4`

---

## Responsive Behavior

| Breakpoint | Layout |
|---|---|
| `< lg` (< 1024px) | Single column, left panel full-width, right panel hidden |
| `>= lg` | Two equal columns, both visible |

---

## Files Changed

| File | Change |
|---|---|
| `src/app/(auth)/layout.tsx` | Full rewrite — grid layout, left panel, right decorative panel |
| `src/app/(auth)/login/page.tsx` | Remove outer card wrapper (`bg-surface rounded-2xl shadow-modal border`) — form renders directly |
| `src/app/(auth)/register/page.tsx` | Same card wrapper removal |

---

## Out of Scope

- Motion animations on shapes (pure CSS, no Framer Motion)
- Register page form content changes
- Any other auth page changes
