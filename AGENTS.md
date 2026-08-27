<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:figma-design-system-rules -->
# Figma → Code Design System Rules

Use this when integrating Figma designs via MCP (`get_design_context`, `get_screenshot`, etc.) into this repo.

**Source file:** [System Weavers — Direction A (Warm & Clear)](https://www.figma.com/design/YqZfBeXXZiuvg10LxhQKmO/System-Weavers)  
**File key:** `YqZfBeXXZiuvg10LxhQKmO`  
**Cached reference exports:** `.figma-ref/` (local design-context snapshots; gitignored)

## MCP workflow

1. Load the `figma-design-to-code` skill before calling `get_design_context`.
2. Treat MCP output as **reference**, not paste-ready code — adapt to patterns below.
3. Reuse existing components (`Button`, `TextInput`, `Header`, `Selvage`, etc.) before creating new ones.
4. Map Figma CSS variables to `:root` tokens in `app/globals.css` (names already align with Figma).
5. Prefer Code Connect mappings when available; otherwise match by visual intent.
6. For icons: use `lucide-react` via `components/ui/icon.tsx` when the glyph matches; otherwise export asset from Figma MCP and commit to `public/`.

### Figma frame IDs (Direction A)

| Page | Desktop | Tablet | Mobile |
|------|---------|--------|--------|
| Home | `42:9` | `45:135` (992px) | `46:219` (390px) |
| About | `335:1150` | `335:1293` | `335:1431` |

---

## 1. Token definitions

**Location:** `app/globals.css` (`:root` + `@theme inline`)

Tokens are CSS custom properties — no JSON/token-transform pipeline. Figma variable names map 1:1 to code.

### Colors (semantic)

```css
/* Text */
--color-text-brand: #19646b;
--color-text-primary: #283e6b;
--color-text-muted: #5c6670;
--color-text-on-brand: #ffffff;
--color-text-on-accent: #203155;
--color-text-on-brand-soft: #d9e8e9;
--color-text-accent-on-dark: #f0d588;

/* Backgrounds */
--color-bg-page: #ffffff;
--color-bg-accent: #e8c038;
--color-bg-brand: #19646b;
--color-bg-hero: #eff6f6;
--color-bg-cream: #f7f1e4;
--color-bg-footer: #0e3f44;
--color-bg-tint: #d9e8e9;

/* Borders & states */
--color-border-default: #dad4c6;
--color-border-brand: #19646b;
--color-focus: #068f88;
--color-error: #b42318;
```

### Colors (palette — use for chips, selvage, accents)

```css
--green-50 … --green-900
--teal-100, --teal-500
--gold-100, --gold-500
--navy-100, --navy-800, --navy-900
```

### Radius

```css
--radius-md: 8px;
--radius-lg: 16px;
```

### Typography

Loaded in `app/[locale]/layout.tsx` via `next/font/google`:

| Role | Font | CSS variable | Tailwind usage |
|------|------|--------------|----------------|
| Body / UI | Public Sans | `--font-public-sans` | `font-sans` (default on `body`) |
| Display / headings | Fraunces | `--font-fraunces` | `font-[family-name:var(--font-fraunces)]` |

**Figma type styles → code patterns:**

| Figma style | Code pattern |
|-------------|--------------|
| Label/Overline | `text-[13px] font-semibold leading-4 tracking-[1.5px]` |
| Label/Nav | `text-base font-medium` or `font-bold` for active |
| Label/Button | `text-base font-semibold leading-6` |
| Body/Default | `text-base leading-[26px]` |
| Body/Large | `text-lg leading-7` |
| Heading/Section | `font-[family-name:var(--font-fraunces)] text-[40px] font-semibold leading-[50px]` |
| Heading/H3 | Fraunces `text-[28px] leading-9` |

### Usage in Tailwind

Always reference tokens with arbitrary values — **do not hardcode hex** when a token exists:

```tsx
className="bg-[var(--color-bg-hero)] text-[var(--color-text-primary)]"
className="border border-[var(--color-border-default)] rounded-[var(--radius-md)]"
```

`@theme inline` exposes shorthand aliases (`--color-brand`, `--color-hero`, etc.) but components consistently use the full `--color-*` names above.

---

## 2. Component library

**Location:** `components/ui/` (primitives) + `components/` (composed)

No Storybook. No component docs site.

### Primitives (`components/ui/`)

| Component | File | Notes |
|-----------|------|-------|
| `Button` | `button.tsx` | Variants: `accent` (default), `brand`, `outline`. Supports `href` → renders `Link`. **Always includes `inline-flex` in base** — do not rely on `hidden` in `className` alone; wrap in a `hidden md:block` container for responsive visibility. |
| `TextInput` / `TextTextarea` | `input.tsx` | Label + field + error; WCAG focus ring via `ring-[var(--color-focus)]`. |
| `Icon` | `icon.tsx` | Typed wrapper over `lucide-react` icons listed in `icons` map. |

### Composed / layout

| Component | File | Role |
|-----------|------|------|
| `Header` | `header.tsx` | Client component; sticky nav, mobile menu, EN/ES language toggle (links to the current page's counterpart URL). |
| `Footer` | `footer.tsx` | Server component; mobile/tablet vs desktop layouts at `xl:`. |
| `Selvage` / `SelvageMark` | `selvage.tsx` | Brand stripe divider (green/teal/gold/navy weighted flex segments). |
| `ContactForm` | `contact-form.tsx` | Client form → `POST /api/leads`. |
| `HomePage` | `home/home-page.tsx` | All Home sections. |
| `GetToKnowUs` | `home/get-to-know-us.tsx` | Founder portraits section. |
| `AboutPage` | `about/about-page.tsx` | About hero, services accordion, contact. |

### Component architecture

- **App Router pages** (`app/[locale]/*/page.tsx`) are thin wrappers importing page components.
- **Server components by default**; add `"use client"` only for interactivity (forms, nav state, accordions).
- **Copy/data** lives in `lib/i18n/en.ts` and `lib/i18n/es.ts` — add strings there (both locales), not inline in JSX. Use `useContent()` from `@/lib/i18n`. `lib/content.ts` re-exports English for legacy imports.
- **Composition over abstraction** — section markup stays in page components; no over-abstracted layout primitives.

### Example: mapping a Figma button

Figma `Button` (gold fill, navy text, 8px radius, 28×14 padding):

```tsx
import { Button } from "@/components/ui/button";

<Button href="#contact">Contact Us</Button>
// default variant = accent → matches Figma gold CTA
```

Outline CTA from hero:

```tsx
<Button href="/about" variant="outline">Explore our capabilities</Button>
```

---

## 3. Frameworks & libraries

| Layer | Choice |
|-------|--------|
| Framework | **Next.js 16** (App Router) + **React 19** + **TypeScript** |
| Styling | **Tailwind CSS v4** (`@import "tailwindcss"` in `globals.css`) |
| PostCSS | `@tailwindcss/postcss` (`postcss.config.mjs`) |
| Icons | `lucide-react` |
| Validation | `zod` (`lib/validations/`) |
| Backend | Supabase (`lib/supabase/server.ts`), Resend (`lib/resend.ts`) |
| Bundler | Turbopack (dev + build via Next.js) |

**Path alias:** `@/*` → repo root (`tsconfig.json`).

---

## 4. Asset management

| Type | Location | Pattern |
|------|----------|---------|
| Photos | `public/images/` | Referenced as `/images/filename.png` |
| Figma MCP temp assets | `.figma-ref/assets/` | Reference only; copy needed files into `public/` for production |
| Favicon | `app/favicon.ico` | App Router convention |

### Images

Use `next/image` with `fill` + `sizes` for responsive photos:

```tsx
import Image from "next/image";

<div className="relative aspect-[312/353] w-full overflow-hidden rounded-2xl">
  <Image
    src="/images/founder-monica.png"
    alt="Monica Ortiz"
    fill
    className="object-cover object-top"
    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 45vw, 360px"
  />
</div>
```

Image paths for founders and hero are defined in `lib/i18n/en.ts` / `lib/i18n/es.ts`.

No CDN config — static assets served from Next.js `public/`.

---

## 5. Icon system

**Primary:** `lucide-react` via `components/ui/icon.tsx`

```tsx
import { Icon } from "@/components/ui/icon";

<Icon name="HeartHandshake" className="size-6" strokeWidth={1.75} />
```

**Registered icons:** `HeartHandshake`, `CircleCheck`, `ChartColumn`, `Megaphone`, `Network`, `Users`, `Menu`, `Minus`, `Plus`, `ArrowUpRight`

**Naming:** PascalCase matching Lucide export names. Add new icons to the `icons` map in `icon.tsx`.

**Nav menu icons:** Imported directly in `header.tsx` (`Menu`, `X` from lucide) — not through `Icon` wrapper.

**Figma custom icons:** If Lucide has no match, export SVG/PNG from Figma MCP, save to `public/icons/`, use `next/image` or inline `<img>` — do not hand-draw SVG paths.

---

## 6. Styling approach

**Methodology:** Utility-first Tailwind v4. No CSS Modules, no styled-components.

**Global styles:** `app/globals.css` only — tokens, smooth scroll, body defaults, `:focus-visible`, `::selection`.

**Responsive breakpoints** (Tailwind defaults):

| Prefix | Min width | Figma frame |
|--------|-----------|-------------|
| (none) | 0 | Mobile 390px |
| `md:` | 768px | Tablet ~992px (closest match) |
| `lg:` | 1024px | Small desktop |
| `xl:` | 1280px | Desktop 1440px content |
| `2xl:` | 1536px | Wide desktop padding |

**Layout conventions:**

- Max content width: `max-w-[1440px]` centered with `mx-auto`
- Section padding scales: `px-6 py-12` → `md:px-10 md:py-16` → `lg:px-16` → `xl:px-20`
- Anchor sections: `scroll-mt-24` (sticky header offset)
- Sticky header: `sticky top-0 z-50 bg-white`

**Mobile nav pattern** (do not combine into one crowded row):

```tsx
{/* Mobile: logo · language · menu — Contact lives in dropdown only */}
<div className="flex items-center justify-between md:hidden">…</div>
{/* Tablet+: inline nav + language + Contact */}
<div className="hidden items-center justify-between md:flex">…</div>
```

**Selvage placement:** Under header on `md+`; below hero on mobile (`home-page.tsx`).

**Tone chips** (capability/weave icons):

```tsx
const toneStyles = {
  teal: "bg-[var(--teal-100)] text-[var(--teal-500)]",
  navy: "bg-[var(--navy-100)] text-[var(--navy-800)]",
  gold: "bg-[var(--gold-100)] text-[#c4a035]",
  green: "bg-[var(--green-100)] text-[var(--green-700)]",
} as const;
```

---

## 7. Project structure

```
proxy.ts              # Locale URL mapping (Next 16 name for middleware)

app/
  [locale]/
    layout.tsx        # Root layout: <html lang>, fonts, Header/Footer shell
    page.tsx          # Home route → HomePage (+ FAQPage JSON-LD)
    about/page.tsx    # About route → AboutPage
    not-found.tsx     # Localized 404
  globals.css         # Design tokens + base styles
  api/leads/route.ts  # Contact form API

components/
  ui/                 # Reusable primitives (Button, Input, Icon)
  home/               # Home page sections (incl. faq.tsx)
  about/              # About page sections
  header.tsx          # Global nav (client)
  footer.tsx          # Global footer
  selvage.tsx         # Brand stripe
  contact-form.tsx    # Lead capture form (client)

lib/
  content.ts          # Legacy EN re-exports (prefer lib/i18n/)
  i18n/
    config.ts         # Locale type, localePath/stripLocale (no deps — safe anywhere)
    dictionaries.ts   # getDictionary() for server components
    index.ts          # useContent()/useLocale() (client)
  seo.ts              # canonical + hreflang helper
  validations/        # Zod schemas
  supabase/           # Server Supabase client
  resend.ts           # Email helper

public/
  images/             # Static photos

.figma-ref/           # Figma MCP exports (gitignored, local reference)
```

### Localized routing

Locale lives in the **URL**, not in state: English is unprefixed (`/`, `/about`)
so existing indexed URLs keep working, Spanish is prefixed (`/es`, `/es/about`).
`proxy.ts` rewrites unprefixed paths to the `/en` tree and redirects `/en/*`
back out so no page is reachable at two addresses.

- Build internal links with `localePath(locale, "/about")` — never hardcode
  `href="/about"`, or Spanish pages will bounce visitors into English.
- Compare routes with `stripLocale(pathname)` so `/es/about` counts as "about".
- Server components read copy via `getDictionary(locale)`; client components
  use `useContent()`. `lib/i18n/index.ts` is `"use client"` — importing it from
  a server component gives you client references, not data.
- Page `<title>`/description live in `meta` in each dictionary, and each page
  sets `alternates: alternatesFor(locale, path)` for canonical + hreflang.

### Feature organization pattern

1. Add route in `app/[locale]/<route>/page.tsx`
2. Build page component in `components/<feature>/`
3. Add copy to `lib/i18n/en.ts` and `lib/i18n/es.ts`
4. Reuse `components/ui/*` and layout chrome (`Header`, `Footer`, `Selvage`)
5. Match Figma spacing/type using tokens — verify at mobile, tablet, and desktop breakpoints

---

## Figma → code checklist

- [ ] Map colors to `--color-*` / palette vars — no raw hex unless token missing
- [ ] Use Fraunces for display headings, Public Sans for body/UI
- [ ] Reuse `Button`, `TextInput`, `Selvage`, `Header`, `Footer`
- [ ] Separate mobile vs tablet/desktop nav rows — never show Contact + hamburger together on mobile
- [ ] Put new copy in `lib/i18n/en.ts` and `lib/i18n/es.ts`
- [ ] Commit images to `public/images/`, not `.figma-ref/`
- [ ] Add `"use client"` only when needed
- [ ] Preserve WCAG focus styles (`--color-focus` ring, 3px on buttons)
- [ ] Test `hidden` + responsive classes — wrap `Button` in container if toggling visibility
<!-- END:figma-design-system-rules -->
