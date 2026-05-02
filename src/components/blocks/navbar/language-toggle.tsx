"use client";

import { useLocale } from "next-intl";

import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "@/i18n/routing";
import { cn } from "@/lib/utils";

interface LanguageToggleProps {
  disabled?: boolean;
}

export function LanguageToggle({ disabled = false }: LanguageToggleProps) {
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();

  // Check if current locale is French
  const isFrench = locale === "fr";

  const handleLanguageToggle = (e: React.MouseEvent) => {
    if (disabled) {
      e.preventDefault();
      return;
    }
    e.preventDefault();

    // Save current scroll position before switching language
    if (typeof window !== "undefined") {
      const scrollPosition = window.scrollY || window.pageYOffset;
      const scrollKey = `scroll-${pathname}`;
      sessionStorage.setItem(scrollKey, scrollPosition.toString());
    }

    // Switch to the other locale while preserving the path
    const targetLocale = isFrench ? "en" : "fr";
    router.replace(pathname, { locale: targetLocale });
  };

  // Determine display text based on current locale
  // When disabled, always show "EN"
  const displayText = disabled ? "EN" : isFrench ? "Fr" : "EN";

  return (
    <Button
      variant="ghost"
      type="button"
      size="icon"
      className={cn("px-2", disabled && "cursor-not-allowed opacity-50")}
      onClick={handleLanguageToggle}
      aria-label="Toggle language"
      disabled={disabled}
    >
      <span className="text-sm font-medium">{displayText}</span>
    </Button>
  );
}
