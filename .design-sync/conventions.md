## Using these components

System Weavers is a Tailwind v4 marketing site. There is **no theme provider
to wrap** — components read design tokens straight from CSS custom
properties and read copy from a locale context that already has a safe
default (`en`), so every component below renders correctly with zero setup:

```jsx
import { Button, TextInput } from "system-weavers";

<Button variant="brand">Start a conversation</Button>
<TextInput id="fullName" label="Full name (required)" placeholder="Jane Rivera" />
```

Two things worth knowing when composing new screens:
- `Header` and any component reading the current route always behaves as if
  the route is `/` — there's no router outside the real site, so nav-active
  styling won't reflect a different "page" you're designing.
- `AboutPage`/`GetToKnowUs` reference real site photos (the two founders,
  the about-page hero) via plain string paths. Only those specific images
  are wired up — new photos you add need a real, reachable URL string.

## Styling idiom

No utility-class shorthand system, no styled-components. Every color/radius
value is a CSS custom property, applied via Tailwind arbitrary values:

```jsx
className="bg-[var(--color-bg-accent)] text-[var(--color-text-on-accent)] rounded-[var(--radius-md)]"
```

**Semantic tokens** (the ones components actually use):

| Purpose | Token |
|---|---|
| Brand text / links | `--color-text-brand`, `--color-border-brand` |
| Body text | `--color-text-primary`, `--color-text-muted` |
| Text on dark/brand backgrounds | `--color-text-on-brand`, `--color-text-on-brand-soft`, `--color-text-on-accent`, `--color-text-accent-on-dark` |
| Page/section backgrounds | `--color-bg-page`, `--color-bg-hero`, `--color-bg-cream`, `--color-bg-footer`, `--color-bg-tint` |
| Accent (gold CTA fill) | `--color-bg-accent` |
| Borders / focus / error | `--color-border-default`, `--color-focus`, `--color-error` |
| Corners | `--radius-md` (8px), `--radius-lg` (16px) |

**Palette** (chips, icon tone backgrounds, the brand-stripe `Selvage`):
`--green-50/100/700/900`, `--teal-100/500`, `--gold-100/500`,
`--navy-100/800/900`. Never hardcode a hex value when one of the tokens
above already names it.

**Type**: Public Sans is the default body font (no class needed). Fraunces
is the display face for headings — apply it explicitly:

```jsx
className="font-[family-name:var(--font-fraunces)] text-[28px] font-semibold"
```

## Where the truth lives

Read `styles.css` (and what it `@import`s) before styling anything new — it
has the full token list and every utility class these components use. Each
component's own `<Name>.prompt.md` has its real prop signature and usage
examples ported from this site's actual sections.

## Layout

Sections use `max-w-[1440px]` centered content and scale padding across
breakpoints: `px-6 py-12` (mobile) → `md:px-10 md:py-16` → `xl:px-20`.
`Selvage` (the four-color brand stripe) marks the boundary under a header or
hero — it's a full-width divider, not a decorative one-off.
