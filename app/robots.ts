import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

/**
 * Served at /robots.txt. Everything is crawlable except the API route, which
 * has nothing to index, and the internal logo library, which is for us rather
 * than for visitors. Pointing at the sitemap here means crawlers find it
 * without waiting on a manual submission.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/brand", "/es/brand"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
