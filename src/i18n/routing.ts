import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

import { siteConfig } from "@/data/site";

export const LOCALES = ["en", "fr"];
export const DEFAULT_LOCALE = "en";
export const LOCALE_ICONS = {
  en: "En",
  fr: "Fr",
};
export const LOCALE_TO_HREFLANG: Record<Locale, string> = {
  en: "en-US",
  fr: "fr-FR",
};

export const routing = defineRouting({
  locales: LOCALES,
  defaultLocale: DEFAULT_LOCALE,
  localePrefix: "as-needed",
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);

export type Locale = (typeof routing.locales)[number];

/*
 * Helper function to generate locale-based URLs
 */
export function getLocaleUrl(locale: Locale, path: string = ""): string {
  const pathname = getPathname({ locale, href: path || "/" });
  return new URL(pathname, siteConfig.url).toString();
}
