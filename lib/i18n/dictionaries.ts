/**
 * Server-safe dictionary lookup. `lib/i18n/index.ts` is a client module, so
 * server components (layouts, pages, JSON-LD) read copy through here instead.
 */
import type { Content } from "./types";
import type { Locale } from "./config";
import { en } from "./en";
import { es } from "./es";

const dictionaries: Record<Locale, Content> = { en, es };

export function getDictionary(locale: Locale): Content {
  return dictionaries[locale];
}
