import Image from "next/image";
import { CopyField } from "@/components/brand/copy-field";
import { SITE_URL } from "@/lib/seo";

/**
 * Internal logo library. Deliberately not in the header, the footer or the
 * sitemap, and marked noindex: the only way here is the URL itself.
 *
 * Copy is hardcoded in English rather than added to the dictionaries. The page
 * is for the two of us, not for visitors, and a Spanish translation of file
 * paths would be noise in both locale files.
 */

type Asset = {
  slug: string;
  name: string;
  file: string;
  width: number;
  height: number;
  /** Which ground the preview has to sit on for the artwork to read. */
  ground: "light" | "dark";
  format: string;
  use: string;
  live: string | null;
  /** Width to set on the <img> in an email signature, in CSS pixels. */
  signatureWidth: number;
  /** Whether this file is usable in a signature at all. */
  signature: boolean;
};

const ASSETS: Asset[] = [
  {
    slug: "logo-color",
    name: "Horizontal, full colour",
    file: "/images/logo-color.png",
    width: 900,
    height: 287,
    ground: "light",
    format: "transparent PNG",
    use: "The default. Any white or cream ground, print or screen.",
    live: "Site header",
    signatureWidth: 220,
    signature: true,
  },
  {
    slug: "logo-on-dark",
    name: "Horizontal, on dark",
    file: "/images/logo-on-dark.png",
    width: 1200,
    height: 382,
    ground: "dark",
    format: "transparent PNG",
    use: "Deep teal, navy or a dark photograph. The mark keeps its colour; the wordmark goes white.",
    live: null,
    signatureWidth: 220,
    signature: false,
  },
  {
    slug: "logo-stacked",
    name: "Stacked, full colour",
    file: "/images/logo-stacked.png",
    width: 900,
    height: 1224,
    ground: "light",
    format: "transparent PNG",
    use: "Square and portrait spaces: a slide cover, a profile picture, the first page of a proposal.",
    live: null,
    signatureWidth: 120,
    signature: true,
  },
  {
    slug: "logo-stacked-on-white",
    name: "Stacked, on a white card",
    file: "/images/logo-stacked-on-white.jpg",
    width: 900,
    height: 1217,
    ground: "light",
    format: "JPEG, white background",
    use: "The same artwork with the background baked in, for anything that mishandles transparency: Word, a funder portal, an email signature.",
    live: null,
    signatureWidth: 120,
    signature: true,
  },
  {
    slug: "logo-white",
    name: "Horizontal, all white",
    file: "/images/logo-white.png",
    width: 900,
    height: 291,
    ground: "dark",
    format: "transparent PNG",
    use: "One-colour placements where the mark cannot keep its palette: a sponsor wall, an embroidered shirt, a busy photograph.",
    live: "Site footer",
    signatureWidth: 220,
    signature: false,
  },
  {
    slug: "logo-mark-white",
    name: "Mark only, white",
    file: "/images/logo-mark-white.png",
    width: 281,
    height: 291,
    ground: "dark",
    format: "transparent PNG",
    use: "Where the wordmark is already on the page, or where the space is too small to set it.",
    live: "WEAVE Method section, home page",
    signatureWidth: 56,
    signature: false,
  },
];

/**
 * A signature is pasted into a mail client, where stylesheets are stripped and
 * only the width and height attributes survive. Both are set, in CSS pixels,
 * so the image cannot reflow the signature while it loads.
 */
function signatureTag(asset: Asset): string {
  const height = Math.round(asset.signatureWidth * (asset.height / asset.width));

  return [
    `<img src="${SITE_URL}${asset.file}"`,
    ` alt="System Weavers Collaborative Consulting"`,
    ` width="${asset.signatureWidth}" height="${height}">`,
  ].join("");
}

export function BrandPage() {
  return (
    <section className="bg-[var(--color-bg-page)] px-6 py-12 md:px-10 md:py-16 xl:px-20 xl:py-20 2xl:px-[240px]">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-10">
        <header className="flex max-w-3xl flex-col gap-4">
          <p className="text-[13px] font-semibold leading-4 tracking-[1.5px] text-[var(--color-text-brand)]">
            INTERNAL
          </p>
          <h1 className="font-[family-name:var(--font-fraunces)] text-[34px] font-semibold leading-[44px] text-[var(--color-text-primary)] md:text-[40px] md:leading-[50px]">
            Logo library
          </h1>
          <p className="text-base leading-[26px] text-[var(--color-text-muted)] md:text-lg md:leading-7">
            Every version of the lockup, which ground each one needs, and where
            it is already in use. This page is not linked from anywhere on the
            site and is excluded from search engines, so share the address
            rather than expecting anyone to find it.
          </p>
        </header>

        <ul className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-2">
          {ASSETS.map((asset) => (
            <li
              key={asset.slug}
              className="flex flex-col overflow-hidden rounded-2xl border border-[var(--color-border-default)]"
            >
              {/* Each preview sits on the ground the artwork was drawn for;
                  the white wordmark versions are invisible on anything else. */}
              <div
                className={`flex items-center justify-center p-8 md:p-12 ${
                  asset.ground === "dark"
                    ? "bg-[var(--color-bg-footer)]"
                    : "bg-[var(--color-bg-cream)]"
                }`}
              >
                <Image
                  src={asset.file}
                  alt={`${asset.name} lockup`}
                  width={asset.width}
                  height={asset.height}
                  sizes="(max-width: 1024px) 80vw, 440px"
                  className={`h-auto w-full ${
                    asset.height > asset.width ? "max-w-[240px]" : "max-w-[420px]"
                  }`}
                />
              </div>

              <div className="flex flex-1 flex-col gap-3 border-t border-[var(--color-border-default)] p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h2 className="font-[family-name:var(--font-fraunces)] text-[22px] font-semibold leading-[30px] text-[var(--color-text-primary)]">
                    {asset.name}
                  </h2>
                  {asset.live ? (
                    <span className="rounded-full bg-[var(--teal-100)] px-3 py-1 text-[12px] font-semibold uppercase tracking-[1px] text-[var(--teal-500)]">
                      In use
                    </span>
                  ) : (
                    <span className="rounded-full bg-[var(--gold-100)] px-3 py-1 text-[12px] font-semibold uppercase tracking-[1px] text-[#8a6c12]">
                      Library only
                    </span>
                  )}
                </div>

                <p className="text-base leading-[26px] text-[var(--color-text-muted)]">
                  {asset.use}
                </p>

                <dl className="mt-1 flex flex-col gap-1 text-[15px] leading-6">
                  <div className="flex flex-wrap gap-x-2">
                    <dt className="text-[var(--color-text-muted)]">Master size</dt>
                    <dd className="tabular-nums">
                      {asset.width} &times; {asset.height} px, {asset.format}
                    </dd>
                  </div>
                  <div className="flex flex-wrap gap-x-2">
                    <dt className="text-[var(--color-text-muted)]">On the site</dt>
                    <dd>{asset.live ?? "Not used yet"}</dd>
                  </div>
                </dl>

                {/* Each file is served straight from the site, so a signature
                    or a slide can point at this address and never go stale. */}
                <div className="mt-2 flex flex-col gap-3">
                  <CopyField
                    label="Direct link"
                    value={`${SITE_URL}${asset.file}`}
                  />
                  {asset.signature ? (
                    <CopyField
                      label="Email signature"
                      value={signatureTag(asset)}
                    />
                  ) : (
                    <p className="text-[13px] leading-5 text-[var(--color-text-muted)]">
                      Not for a signature: a white wordmark on an email&rsquo;s
                      white background leaves only the mark showing.
                    </p>
                  )}
                  <a
                    href={asset.file}
                    download
                    className="link-hover self-start text-[14px] font-medium text-[var(--color-text-brand)] underline-offset-2 hover:underline"
                  >
                    Download the file
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="flex max-w-3xl flex-col gap-3 border-t border-[var(--color-border-default)] pt-8">
          <h2 className="font-[family-name:var(--font-fraunces)] text-[22px] font-semibold leading-[30px] text-[var(--color-text-primary)]">
            Using these in an email signature
          </h2>
          <p className="text-base leading-[26px] text-[var(--color-text-muted)]">
            Paste the signature snippet into the HTML of your signature rather
            than dragging the image in. The picture then lives on the site, so
            it stays the current logo and does not travel as an attachment that
            some clients hide behind a &ldquo;download pictures&rdquo; prompt.
          </p>
          <p className="text-base leading-[26px] text-[var(--color-text-muted)]">
            Keep the width and height attributes. Without them a signature
            jumps as the image arrives, and Outlook renders the file at its
            full master size.
          </p>
          <h2 className="mt-4 font-[family-name:var(--font-fraunces)] text-[22px] font-semibold leading-[30px] text-[var(--color-text-primary)]">
            Two rules worth keeping
          </h2>
          <p className="text-base leading-[26px] text-[var(--color-text-muted)]">
            Pick the version that matches the ground rather than recolouring one
            that does not. The white wordmark disappears on cream, and the deep
            teal wordmark disappears on the footer.
          </p>
          <p className="text-base leading-[26px] text-[var(--color-text-muted)]">
            Leave clear space around the lockup equal to the height of the mark,
            and never set it narrower than about 120&nbsp;px, below which the
            tagline stops being legible.
          </p>
        </div>
      </div>
    </section>
  );
}
