"use client";

import { getDictionary } from "./dictionaries";
import { useLocale } from "./locale";
import type { Locale } from "./config";
import type { Content } from "./types";

export type { Content, Locale };
export { LocaleProvider, useLocale } from "./locale";
export { LOCALES, DEFAULT_LOCALE, isLocale, localePath, stripLocale } from "./config";
export { en } from "./en";
export { es } from "./es";

export function getContent(locale: Locale): Content {
  return getDictionary(locale);
}

export function useContent(): Content {
  const { locale } = useLocale();
  return getDictionary(locale);
}
