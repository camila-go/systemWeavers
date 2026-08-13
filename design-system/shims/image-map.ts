// Design-system build only. The real site serves these from /public/images/*
// on its own server; an isolated component bundle has no server to resolve
// those paths against, so we inline the actual files as data URIs (esbuild's
// dataurl loader, configured in tsup.config.ts) and map the site's runtime
// path strings to them.
import aboutHero from "../../public/images/about-hero.png";
import founderGrisel from "../../public/images/founder-grisel.png";
import founderMonica from "../../public/images/founder-monica.png";

export const imageMap: Record<string, string> = {
  "/images/about-hero.png": aboutHero,
  "/images/founder-grisel.png": founderGrisel,
  "/images/founder-monica.png": founderMonica,
};
