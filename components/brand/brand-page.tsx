import Image from "next/image";

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
  use: string;
  live: string | null;
};

const ASSETS: Asset[] = [
  {
    slug: "logo-color",
    name: "Horizontal, full colour",
    file: "/images/logo-color.png",
    width: 900,
    height: 287,
    ground: "light",
    use: "The default. Any white or cream ground, print or screen.",
    live: "Site header",
  },
  {
    slug: "logo-on-dark",
    name: "Horizontal, on dark",
    file: "/images/logo-on-dark.png",
    width: 1200,
    height: 382,
    ground: "dark",
    use: "Deep teal, navy or a dark photograph. The mark keeps its colour; the wordmark goes white.",
    live: "Site footer",
  },
  {
    slug: "logo-stacked",
    name: "Stacked, full colour",
    file: "/images/logo-stacked.png",
    width: 900,
    height: 1224,
    ground: "light",
    use: "Square and portrait spaces: a slide cover, a profile picture, the first page of a proposal.",
    live: null,
  },
  {
    slug: "logo-white",
    name: "Horizontal, all white",
    file: "/images/logo-white.png",
    width: 900,
    height: 291,
    ground: "dark",
    use: "One-colour placements where the mark cannot keep its palette: a sponsor wall, an embroidered shirt, a busy photograph.",
    live: null,
  },
  {
    slug: "logo-mark-white",
    name: "Mark only, white",
    file: "/images/logo-mark-white.png",
    width: 281,
    height: 291,
    ground: "dark",
    use: "Where the wordmark is already on the page, or where the space is too small to set it.",
    live: "WEAVE Method section, home page",
  },
];

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
                    <dt className="text-[var(--color-text-muted)]">File</dt>
                    <dd>
                      <a
                        href={asset.file}
                        download
                        className="link-hover break-all font-medium text-[var(--color-text-brand)] underline-offset-2 hover:underline"
                      >
                        {asset.file}
                      </a>
                    </dd>
                  </div>
                  <div className="flex flex-wrap gap-x-2">
                    <dt className="text-[var(--color-text-muted)]">Master size</dt>
                    <dd className="tabular-nums">
                      {asset.width} &times; {asset.height} px, transparent PNG
                    </dd>
                  </div>
                  <div className="flex flex-wrap gap-x-2">
                    <dt className="text-[var(--color-text-muted)]">On the site</dt>
                    <dd>{asset.live ?? "Not used yet"}</dd>
                  </div>
                </dl>
              </div>
            </li>
          ))}
        </ul>

        <div className="flex max-w-3xl flex-col gap-3 border-t border-[var(--color-border-default)] pt-8">
          <h2 className="font-[family-name:var(--font-fraunces)] text-[22px] font-semibold leading-[30px] text-[var(--color-text-primary)]">
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
