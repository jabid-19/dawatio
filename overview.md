# Dawat — Project Overview

Dawat is a frontend-only digital invitation platform for creating and sharing beautiful event invitations (weddings, birthdays, etc.). There is no backend — all data is mock/dummy, auth is client-side only, and state persists via `localStorage`.

---

## Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | Next.js (App Router) | 16.2.6 |
| Language | TypeScript | 5.x |
| Styling | Tailwind CSS v4 | ^4.3.0 |
| Animations | Motion (Framer Motion) | 12.40.0 |
| Icons | lucide-react | 1.16.0 |
| Toasts | Sonner | 2.0.7 |
| QR Codes | qrcode.react | 4.2.0 |
| Confetti | canvas-confetti | 1.9.4 |
| Class utils | clsx + tailwind-merge | 2.1.1 / 3.6.0 |
| Runtime | React 19 | 19.2.4 |

---

## Design System

### Color Palette (`src/app/globals.css`)

| Token | Hex | Usage |
|---|---|---|
| `--color-cream` | `#FAF8F4` | Page background |
| `--color-surface` | `#FFFFFF` | Cards, panels |
| `--color-ink` | `#1A1714` | Primary text |
| `--color-ink-muted` | `#6B6560` | Secondary text |
| `--color-ink-light` | `#B5B0AA` | Placeholders, disabled |
| `--color-border` | `#E8E4DF` | Borders, dividers |
| `--color-accent` | `#C9622F` | Primary CTA — warm terracotta |
| `--color-accent-hover` | `#B05525` | Accent hover state |
| `--color-accent-light` | `#F5E8E0` | Accent tint for badges |
| `--color-gold` | `#D4A853` | Premium / wedding highlights |
| `--color-success` | `#3D7A5A` | Success states |
| `--color-danger` | `#C03B3B` | Error states |

### Typography

Fonts loaded via `next/font/google` and applied as CSS variables:

| Variable | Font | Usage |
|---|---|---|
| `--font-playfair` | Playfair Display | Headings, hero text (`font-display`) |
| `--font-dm-sans` | DM Sans | Body text, UI (`font-body`) |
| `--font-dm-mono` | DM Mono | Codes, tags (`font-mono`) |

All `h1`–`h6` default to Playfair Display via `globals.css` base layer.

### Shadows

```css
--shadow-card:  0 1px 3px rgba(26,23,20,0.06), 0 4px 16px rgba(26,23,20,0.04);
--shadow-float: 0 8px 32px rgba(26,23,20,0.12);
--shadow-modal: 0 24px 64px rgba(26,23,20,0.18);
```

### Border Radius Conventions

| Element | Class |
|---|---|
| Cards | `rounded-2xl` |
| Buttons | `rounded-full` |
| Inputs | `rounded-xl` |
| Badges / pills | `rounded-full` |

### Motion Tokens (`src/lib/motion.ts`)

```ts
ease    = [0.25, 0.1, 0.25, 1]     // default cubic-bezier
easeOut = [0, 0, 0.3, 1]           // fast exit
spring  = { stiffness: 380, damping: 30 }
stagger = { staggerChildren: 0.06 }

fadeUp  = hidden(opacity 0, y 16) → visible(opacity 1, y 0, 0.4s)
fadeIn  = hidden(opacity 0)       → visible(opacity 1, 0.3s)
scaleIn = hidden(opacity 0, scale 0.95) → visible(opacity 1, scale 1, 0.3s)
```

---

## File Structure (Annotated)

```
src/
├── app/
│   ├── layout.tsx                   # Root layout — fonts, AuthProvider, Sonner toaster
│   ├── globals.css                  # Design tokens, Tailwind theme, base styles
│   ├── not-found.tsx                # 404 page with Dawat branding
│   │
│   ├── (marketing)/                 # Public routes, no auth
│   │   ├── layout.tsx               # Passthrough layout
│   │   ├── page.tsx                 # Landing page (Hero, HowItWorks, TemplatesPreview, Testimonials, Pricing, Footer)
│   │   ├── templates/page.tsx       # Full template gallery with category filter tabs
│   │   └── pricing/page.tsx         # Pricing page
│   │
│   ├── (auth)/                      # Auth routes
│   │   ├── layout.tsx               # Split-screen layout (left: branding, right: form)
│   │   ├── login/page.tsx           # Login form with dummy auth
│   │   └── register/page.tsx        # Register form (any input → demo session)
│   │
│   ├── dashboard/
│   │   ├── layout.tsx               # Protected layout (useRequireAuth + Sidebar)
│   │   ├── page.tsx                 # Event list with skeleton loaders
│   │   ├── account/page.tsx         # User profile + logout
│   │   ├── create/page.tsx          # 2-step event creation flow (template gallery → details + live preview)
│   │   └── events/[id]/
│   │       ├── page.tsx             # Event overview: stats, sub-events, quick links
│   │       ├── edit/page.tsx        # Tabbed edit form (6 tabs)
│   │       ├── guests/page.tsx      # RSVP list with filters
│   │       └── share/page.tsx       # Share link, WhatsApp, QR code
│   │
│   └── i/
│       └── [slug]/page.tsx          # Public invite page — routes to correct template
│
├── components/
│   ├── ui/
│   │   ├── Button.tsx               # variants: accent, ghost, outline, danger; sizes: sm/md/lg
│   │   ├── Input.tsx                # Label, error, helper text; focus ring on accent
│   │   ├── Badge.tsx                # variants: default, success, warning, danger, gold, muted
│   │   ├── Modal.tsx                # Animated backdrop modal with AnimatePresence
│   │   ├── Countdown.tsx            # Live DD:HH:MM:SS countdown, updates every second
│   │   └── PlanGate.tsx             # Blurred overlay with lock icon + upgrade modal
│   │
│   ├── create/                      # Create-flow components (used only by dashboard/create/page.tsx)
│   │   ├── TemplateGallery.tsx      # Step 1: horizontal carousels per occasion with scheme picker bar
│   │   ├── TemplatePreviewSheet.tsx # Shared bottom-sheet preview (used by create flow + landing pages)
│   │   ├── DetailsForm.tsx          # Step 2: full form (title/cover/date/ceremonies/description)
│   │   ├── LivePreview.tsx          # Desktop sticky live-preview pane; exports CreateFormState type
│   │   ├── StickyPreviewMobile.tsx  # Mobile sticky mini-preview → fullscreen sheet on tap
│   │   ├── CeremonyCard.tsx         # Collapsible sub-event card (name/date/time/venue + Hijri date)
│   │   ├── DateTimePicker.tsx       # Custom calendar widget with Gregorian + Hijri secondary line
│   │   ├── CoverUpload.tsx          # Drag-and-drop cover photo upload (base64, 5 MB limit)
│   │   └── SuccessScreen.tsx        # Post-create: animated check + URL pill + WhatsApp share + CTAs
│   │
│   ├── dashboard/
│   │   ├── Sidebar.tsx              # Desktop sidebar + mobile bottom nav
│   │   ├── EventCard.tsx            # Event card: gradient header, badges, RSVP ratio, countdown
│   │   └── EmptyState.tsx           # Empty state with CTA to create first event
│   │
│   ├── landing/
│   │   ├── Hero.tsx                 # Full-viewport hero with floating invite cards + grain texture
│   │   ├── HowItWorks.tsx           # 3-step process with whileInView stagger
│   │   ├── TemplatesPreview.tsx     # Home page: first 6 templates preview + "View all" CTA
│   │   ├── Templates.tsx            # /templates page: full grid with category filter tabs
│   │   ├── Pricing.tsx              # 4-tier pricing table (Free/Basic/Wedding/Premium)
│   │   ├── Testimonials.tsx         # 3 testimonial cards with star ratings
│   │   └── Footer.tsx               # Dark footer, 2-column links, branding
│   │
│   └── templates/                   # All 36 invite template components
│       ├── TemplateRenderer.tsx     # Resolves template + color scheme → renders correct component
│       ├── wedding/
│       │   ├── BloomTemplate.tsx    # Free — cream/terracotta, countdown, gallery, RSVP
│       │   ├── MidnightTemplate.tsx # Premium — dark/gold, 3 color schemes
│       │   ├── MinimaaTemplate.tsx  # Premium — minimal black/white, 3 color schemes
│       │   ├── GardenTemplate.tsx   # Premium — botanical green, 3 color schemes
│       │   └── RoyalTemplate.tsx    # Premium — deep purple/gold, 3 color schemes
│       ├── birthday/
│       │   ├── ConfettiTemplate.tsx # Free — pink/yellow, canvas-confetti on load
│       │   ├── NeonTemplate.tsx     # Premium — neon pink/cyan, 3 color schemes
│       │   ├── PastelDreamTemplate.tsx # Premium — soft pastels, 3 color schemes
│       │   ├── BoldLoudTemplate.tsx # Premium — orange/lime, 3 color schemes
│       │   └── ElegantAgeTemplate.tsx  # Premium — dark navy/gold, 3 color schemes
│       ├── corporate/
│       │   ├── CleanDeskTemplate.tsx   # Free — navy/blue, clean layout
│       │   ├── SummitTemplate.tsx      # Premium — dark/cyan, 3 color schemes
│       │   ├── BoardroomTemplate.tsx   # Premium — dark/gold, 3 color schemes
│       │   ├── LaunchTemplate.tsx      # Premium — teal/orange, 3 color schemes
│       │   └── GalaNightTemplate.tsx   # Premium — gold/champagne, 3 color schemes
│       ├── engagement/
│       │   ├── FirstYesTemplate.tsx    # Free — rose/gold
│       │   ├── GoldenRingTemplate.tsx  # Premium — champagne/gold, 3 color schemes
│       │   ├── ModernLoveTemplate.tsx  # Premium — terracotta/green, 3 color schemes
│       │   ├── StoryTemplate.tsx       # Premium — warm brown, 3 color schemes
│       │   └── CelestialTemplate.tsx   # Premium — periwinkle/blush, 3 color schemes
│       ├── festive/
│       │   ├── CrescentTemplate.tsx      # Free — green/gold (Eid)
│       │   ├── LanternTemplate.tsx       # Premium — teal/amber, 3 color schemes (Eid)
│       │   ├── IftarTableTemplate.tsx    # Premium — terracotta/amber, 3 color schemes (Eid)
│       │   ├── GeometricTemplate.tsx     # Premium — green/gold geometric, 3 color schemes (Eid)
│       │   ├── FestiveNightTemplate.tsx  # Premium — gold/crimson, 3 color schemes (Eid)
│       │   ├── DiyasTemplate.tsx         # Premium — saffron/vermillion, 3 color schemes (Puja)
│       │   ├── FloralMandapTemplate.tsx  # Premium — marigold/crimson, 3 color schemes (Puja)
│       │   ├── GoldenPrayerTemplate.tsx  # Premium — maroon/gold, 3 color schemes (Puja)
│       │   ├── MidnightGalaTemplate.tsx  # Premium — black/champagne, 3 color schemes (NYE)
│       │   ├── FireworksNightTemplate.tsx # Premium — dark navy/gold, 3 color schemes (NYE)
│       │   └── MidnightGlamTemplate.tsx  # Premium — black/silver, 3 color schemes (NYE)
│       ├── other/
│       │   ├── SimpleTemplate.tsx      # Free — clean black/white
│       │   ├── ReunionTemplate.tsx     # Premium — warm brown/gold, 3 color schemes
│       │   ├── GraduationTemplate.tsx  # Premium — navy/gold, 3 color schemes
│       │   ├── HousewarmingTemplate.tsx # Premium — terracotta/green, 3 color schemes
│       │   └── AnniversaryTemplate.tsx # Premium — crimson/gold, 3 color schemes
│       └── shared/
│           ├── RSVPForm.tsx            # Shared RSVP form (validation, sub-event checkboxes, success)
│           ├── CountdownTimer.tsx      # Live countdown used by templates
│           ├── DawatBranding.tsx       # "Made with Dawat" badge for free plan
│           ├── Gallery.tsx             # Image gallery grid
│           ├── MapEmbed.tsx            # Venue map embed
│           ├── ShareBar.tsx            # Share buttons row
│           └── SubEventCard.tsx        # Sub-event card in schedule sections
│
└── lib/
    ├── dummy-data.ts                # All mock data and types (see Data Layer section)
    ├── templates-data.ts            # TEMPLATE_CONFIGS — color schemes + TemplateProps type
    ├── template-utils.tsx           # TemplateRenderer component + getPreviewEvent helper
    ├── template-content.ts          # resolveContent() — merges user overrides over per-template defaults
    ├── events-store.ts              # localStorage CRUD for events + draft helpers
    ├── auth-context.tsx             # AuthProvider + useAuth + useRequireAuth
    ├── motion.ts                    # Shared animation variants/tokens
    ├── useCreateDraft.ts            # Hook: autosave create-form state to localStorage
    ├── useHijriDate.ts              # gregorianToHijri() + formatHijriDate()
    └── utils.ts                     # cn(), formatDate(), daysUntil()
```

---

## Data Layer

### Authentication (`src/lib/auth-context.tsx`)

Client-side only. No API calls.

- **Demo credentials:** `demo@dawat.app` / `demo1234`
- `AuthProvider` wraps the entire app in `layout.tsx`
- Login stores `isLoggedIn = 'true'` in `localStorage`
- `useAuth()` — returns `{ user, isLoading, login, logout }`
- `useRequireAuth()` — redirects to `/login` if not authenticated; used in dashboard layout

### Events Store (`src/lib/events-store.ts`)

Hybrid localStorage store. Seed data (DUMMY_EVENTS) is always present; user-created events are stored in `localStorage` under key `dawat_events`. Edits to dummy events are stored separately under `dawat_event_updates`.

| Function | Purpose |
|---|---|
| `getAllEvents()` | Merges DUMMY_EVENTS + localStorage events |
| `getEventById(id)` | Lookup by id |
| `getEventBySlug(slug)` | Lookup by URL slug (for public invite page) |
| `getEventForEdit(id)` | Returns edited version of an event if edits exist |
| `saveEvent(event)` | Updates existing event (handles dummy vs. user events separately) |
| `addNewEvent(event)` | Appends new event to localStorage |
| `saveDraft(data)` | Saves create-form draft to `dawat_draft_create` key |
| `loadDraft<T>()` | Loads draft; returns null if missing or parse fails |
| `clearDraft()` | Removes draft key |

SSR-safe — all functions check `typeof window` before accessing `localStorage`.

### Template Config (`src/lib/templates-data.ts`)

`TEMPLATE_CONFIGS` — one entry per template. Each config has:
- `id` — matches `DawatEvent.template`
- `name` — display name
- `colorSchemes: ColorScheme[]` — 3 schemes for premium templates, `[]` for free

**`ColorScheme` interface:**
```ts
interface ColorScheme {
  id: number      // 1 | 2 | 3
  label: string   // e.g. "Classic", "Warm", "Midnight"
  bg: string      // main background
  surface: string // card / secondary section bg
  primary: string // main accent (buttons, headings)
  secondary: string
  text: string    // body text
  muted: string   // captions / secondary text
}
```

**`TemplateProps` interface** (passed to every template component):
```ts
interface TemplateProps {
  event: DawatEvent
  branding?: boolean
  onRsvpSubmit?: (data: RSVPData) => void
  colors?: ColorScheme  // resolved active scheme; undefined = use template defaults
}
```

### Template Utils (`src/lib/template-utils.tsx`)

- `TemplateRenderer` — resolves `event.colorScheme` index → looks up `ColorScheme` from `TEMPLATE_CONFIGS` → passes as `colors` prop to the correct template component. Accepts `disableEffects?: boolean` for thumbnail renders.
- `getPreviewEvent(template)` — builds a sample `DawatEvent` for gallery thumbnails and previews.

### Template Content (`src/lib/template-content.ts`)

`resolveContent(event: DawatEvent)` — merges `event.templateContent` user overrides over per-template hardcoded defaults. All template components call this at the top of their render function.

### Dummy Data (`src/lib/dummy-data.ts`)

**DUMMY_USER**
```ts
{ email: 'demo@dawat.app', password: 'demo1234', name: 'Jabid Rahman', avatar: null }
```

**DUMMY_EVENTS** — 2 seed events:
- `evt_01` — "Nadia & Rafiq Wedding" (wedding, published, wedding plan, 3 sub-events, 87/150 RSVPs)
- `evt_02` — "Aryan's 1st Birthday" (birthday, draft, free plan, 1 sub-event, 12/40 RSVPs)

**`DawatEvent` key fields:**
```ts
{
  template: string       // template id
  colorScheme?: number   // 1 | 2 | 3 — which ColorScheme to apply (default 1)
  subEvents: SubEvent[]
  plan: 'free' | 'basic' | 'wedding' | 'premium'
  // ...
}
```

**DUMMY_RSVPS** — 15 sample RSVPs for `evt_01`

**TEMPLATES** — 36 templates across 6 categories:

| Category | Free | Premium |
|---|---|---|
| Wedding | Bloom | Midnight, Minimaa, Garden, Royal |
| Birthday | Confetti | Neon, Pastel Dream, Bold & Loud, Elegant Age |
| Corporate | Clean Desk | Summit, Boardroom, Launch, Gala Night |
| Engagement | First Yes | Golden Ring, Modern Love, Story, Celestial |
| Festive | Crescent | Lantern, Iftar Table, Geometric, Festive Night, Diyas, Floral Mandap, Golden Prayer, Midnight Gala, Fireworks Night, Midnight Glam |
| Other | Simple | Reunion, Graduation, Housewarming, Anniversary |

**Plan Tiers:**

| Plan | Price |
|---|---|
| free | ৳0 |
| basic | ৳299 |
| wedding | ৳599 |
| premium | ৳999 |

`planSatisfies(currentPlan, requiredPlan)` — returns `true` if current plan meets or exceeds required plan tier.

---

## Pages & Routes

| Route | Auth | Component | Description |
|---|---|---|---|
| `/` | No | `(marketing)/page.tsx` | Landing page |
| `/templates` | No | `(marketing)/templates/page.tsx` | Full template gallery |
| `/login` | No | `(auth)/login/page.tsx` | Login form |
| `/register` | No | `(auth)/register/page.tsx` | Register form |
| `/dashboard` | Yes | `dashboard/page.tsx` | Event list |
| `/dashboard/create` | Yes | `dashboard/create/page.tsx` | 2-step create flow |
| `/dashboard/account` | Yes | `dashboard/account/page.tsx` | Profile + logout |
| `/dashboard/events/[id]` | Yes | `dashboard/events/[id]/page.tsx` | Event overview |
| `/dashboard/events/[id]/edit` | Yes | `dashboard/events/[id]/edit/page.tsx` | Edit event (6 tabs) |
| `/dashboard/events/[id]/guests` | Yes | `dashboard/events/[id]/guests/page.tsx` | RSVP management |
| `/dashboard/events/[id]/share` | Yes | `dashboard/events/[id]/share/page.tsx` | Share tools |
| `/i/[slug]` | No | `i/[slug]/page.tsx` | Public invite page |

---

## Feature Implementation Status

### Phase 1 — Foundation & Landing Page
- [x] Next.js + TypeScript + Tailwind v4 + App Router
- [x] Motion installed and configured
- [x] Playfair Display + DM Sans + DM Mono via `next/font`
- [x] CSS variables in `globals.css`
- [x] `/lib/dummy-data.ts` with all mock data
- [x] `/lib/motion.ts` with animation tokens
- [x] Hero section (floating cards, grain texture, CTAs)
- [x] How It Works section (3-step, whileInView stagger)
- [x] Templates showcase — home page preview (first 6) + full gallery page with filter tabs
- [x] Pricing table (4 tiers, Wedding highlighted)
- [x] Testimonials (3 cards, star ratings)
- [x] Footer (dark, links, branding)

### Phase 2 — Auth
- [x] Login page (dummy auth, error state, redirect)
- [x] Register page (validation, success animation, redirect)
- [x] Auth guard via `useRequireAuth` in dashboard layout
- [x] `AuthProvider` + `useAuth` context
- [x] Split-screen auth layout (branding left, form right)

### Phase 3 — Dashboard
- [x] Dashboard layout with Sidebar (desktop + mobile bottom nav)
- [x] Events list (`/dashboard`) with EventCard, skeleton loaders, empty state
- [x] Event detail page (`/dashboard/events/[id]`) — stats, sub-events, quick links
- [x] Edit event page — 6 tabs (Basic Info, Sub-Events, Design, Content, Cover, Settings)
- [x] Guests & RSVP page — stats, filter tabs, table, dummy RSVPs
- [x] Share page — copy link, WhatsApp share, QR code (qrcode.react)
- [x] Account page — profile display, logout

### Phase 4 — Create Event Flow
- [x] Step 1: Template gallery — horizontal carousels per occasion (Weddings/Birthdays/Eid…)
- [x] Step 2: Details + live preview — title, cover upload, custom date picker (Hijri secondary), ceremonies, description
- [x] Live preview — desktop: sticky side-by-side pane; mobile: sticky mini-preview bar → fullscreen sheet
- [x] Autosave draft to localStorage; restore-on-return toast with Discard action
- [x] Success screen — animated check, invite URL copy, WhatsApp share, Add Guests / Edit Invite CTAs
- [x] Hijri date support — tabular algorithm, shown alongside Gregorian in ceremony cards and date picker
- [x] Color scheme selector — 3 curated schemes per premium template; sticky picker bar in Step 1; scheme dots on card; resets on template change

### Phase 5 — Templates (36 total)
- [x] All 36 template components across 6 categories (wedding/birthday/corporate/engagement/festive/other)
- [x] 30 premium templates support 3 color schemes each via `colors?: ColorScheme` prop
- [x] 6 free templates render with hardcoded colors (no scheme picker shown)
- [x] `TemplateRenderer` resolves active scheme from event and passes to template
- [x] `TemplatePreviewSheet` — shared bottom-sheet component used by create flow, `/templates`, and home page; scheme swatches + labels in header; mobile/desktop view toggle; footer with select/cancel only in create flow
- [x] RSVPForm (shared — validation, sub-event checkboxes, success state)
- [x] "Made with Dawat" branding on free plan invites

### Phase 6 — Plan Gates & Upgrade
- [x] `PlanGate` component (blur overlay, lock icon, upgrade modal)
- [x] Upgrade modal (plan info, price, CTA with "coming soon" toast)
- [x] `planSatisfies()` utility for plan comparison
- [ ] Actual payment integration (intentionally out of scope)

### Phase 7 — Polish & Micro-interactions
- [x] Page-level entrance animations (Motion fadeUp/stagger)
- [x] Button hover/tap scale animations
- [x] Card hover lift effect (EventCard)
- [x] Toast notifications (Sonner — success/info/error)
- [x] Skeleton loaders on dashboard
- [x] Countdown timer (Countdown component)
- [x] AnimatePresence on modals and sheets
- [x] whileInView on landing sections
- [x] Responsive layout (mobile sidebar → bottom nav)
- [ ] Page transition AnimatePresence between routes

---

## Known Gaps / Not Implemented

| Item | Notes |
|---|---|
| Real image upload | Cover photo tab shows placeholder UI only |
| Payment / upgrade | CTA shows "coming soon" toast |
| Export guests | Button shows "coming soon" toast |
| Send reminder | Button shows "coming soon" toast |
| Custom domain | Settings tab shows field, no functionality |
| Page route transitions | AnimatePresence not wired at layout level |

---

## Dev Notes

- **Test login:** `demo@dawat.app` / `demo1234`
- **Image placeholders:** `https://picsum.photos/` used as default gallery images — overridable via Content tab
- **No API calls anywhere** — all data from `dummy-data.ts` or `localStorage`
- **Theme:** Light only — no dark mode
- **AGENTS.md / CLAUDE.md note:** Read `node_modules/next/dist/docs/` before writing Next.js code — this version may differ from training data
- **Tailwind v4:** No `tailwind.config.*` file — theme defined entirely in `globals.css` via `@theme {}` and PostCSS via `postcss.config.mjs`
- **`cn()` utility:** Always use for conditional Tailwind classes to avoid conflicts
- **SSR safety:** Any code touching `localStorage` must check `typeof window !== 'undefined'`
- **Color schemes:** Free templates have `colorSchemes: []` in TEMPLATE_CONFIGS — no picker is shown. Premium templates have 3 schemes; `DawatEvent.colorScheme` is 1-indexed (1/2/3), converted to 0-indexed array access in `TemplateRenderer`
- **Category rename:** `'eid'` → `'festive'` everywhere (types, data, UI). Festive covers Eid, Puja, NYE, and future festive occasions. Template folder is `src/components/templates/festive/`
