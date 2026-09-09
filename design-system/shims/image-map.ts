// Design-system build only. The real site serves these from /public/images/*
// on its own server; an isolated component bundle has no server to resolve
// those paths against, so we inline the actual files as data URIs (esbuild's
// dataurl loader, configured in tsup.config.ts) and map the site's runtime
// path strings to them.
import aboutHero from "../../public/images/about-hero.png";
import founderGrisel from "../../public/images/founder-grisel.jpg";
import founderMonica from "../../public/images/founder-monica.png";

// Under tsup the loader above yields a plain data-URI string; under `next build`
// the same import is typed as StaticImageData. Accept either so both builds
// typecheck against the real shape rather than a cast.
type ImageImport = string | { src: string };

const toSrc = (image: ImageImport): string =>
  typeof image === "string" ? image : image.src;

export const imageMap: Record<string, string> = {
  "/images/about-hero.png": toSrc(aboutHero),
  "/images/founder-grisel.jpg": toSrc(founderGrisel),
  "/images/founder-monica.png": toSrc(founderMonica),
};
