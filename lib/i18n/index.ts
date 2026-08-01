"use client";

import { en } from "./en";
import { es } from "./es";
import { useLocale, type Locale } from "./locale";
import type { Content } from "./types";

export type { Content, Locale };
export { LocaleProvider, useLocale } from "./locale";
export { en } from "./en";
export { es } from "./es";

const dictionaries: Record<Locale, Content> = { en, es };

export function getContent(locale: Locale): Content {
  return dictionaries[locale];
}

export function useContent(): Content {
  const { locale } = useLocale();
  return dictionaries[locale];
}
