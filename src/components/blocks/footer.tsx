"use client";

import { useTranslations } from "next-intl";
import NextLink from "next/link";
import type React from "react";

import { Icons } from "@/components/icons";
import { Separator } from "@/components/ui/separator";
import { siteConfig } from "@/data/site";
import { Link as I18nLink } from "@/i18n/routing";
import { transformSocialData } from "@/lib/social-icons";

interface FooterLinkProps {
  href: string;
  children?: React.ReactNode;
  className?: string;
  ariaLabel?: string;
  icon?: React.ComponentType<{ className?: string }>;
}

// Reusable function to render footer links with appropriate props
function FooterLink({
  href,
  children,
  className = "text-muted-foreground hover:text-foreground block text-sm transition-colors",
  ariaLabel,
  icon: Icon,
}: FooterLinkProps) {
  const isInternalLink = href.startsWith("/");
  const isFileLink =
    href.endsWith(".pdf") ||
    href.endsWith(".png") ||
    href.endsWith(".jpg") ||
    href.endsWith(".jpeg");
  const isExternalLink = !isInternalLink;
  const containsDot = href.includes(".");
  const LinkComponent = containsDot ? NextLink : I18nLink;

  // Determine target and rel attributes
  const target = isFileLink || isExternalLink ? "_blank" : undefined;
  const rel = isFileLink || isExternalLink ? "noopener noreferrer" : undefined;
  const prefetch = isInternalLink && !isFileLink ? false : undefined;

  return (
    <LinkComponent
      href={href}
      target={target}
      rel={rel}
      className={className}
      prefetch={prefetch}
      aria-label={ariaLabel}
    >
      {Icon ? <Icon className="h-5 w-5" /> : children || null}
    </LinkComponent>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const t = useTranslations();

  // Get data from i18n
  const socialData = transformSocialData(
    t.raw("social") as Record<
      string,
      {
        name: string;
        url: string;
        icon: string;
        navbar?: boolean;
        content?: boolean;
        footer?: boolean;
      }
    >,
  );
  const footerResources = t.raw("footer.resources") as Array<{
    name: string;
    url: string;
  }>;
  const footerDiscover = t.raw("footer.discover") as Array<{
    name: string;
    url: string;
  }>;

  // Create navigation sections with translations
  const translatedNavigationSections = [
    { name: t("footer.navigation.about"), href: "/#about" },
    { name: t("footer.navigation.projects"), href: "/#projects" },
    { name: t("footer.navigation.education"), href: "/#education" },
    { name: t("footer.navigation.experience"), href: "/#work" },
    { name: t("footer.navigation.skills"), href: "/#skills" },
    { name: t("footer.navigation.awards"), href: "/#awards" },
  ];

  return (
    <footer className="bg-background/95 supports-[backdrop-filter]:bg-background/60 border-t backdrop-blur">
      <div className="mx-auto max-w-7xl px-6 py-12 pb-20 sm:px-16 md:px-20 lg:px-24 xl:px-32">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Quick Navigation */}
          <div className="space-y-4">
            <h3 className="text-foreground text-sm font-semibold tracking-wider">
              {t("footer.sections.quickNavigation")}
            </h3>
            <nav className="space-y-2">
              {translatedNavigationSections.map((section) => (
                <FooterLink key={section.name} href={section.href}>
                  {section.name}
                </FooterLink>
              ))}
            </nav>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-foreground text-sm font-semibold tracking-wider">
              {t("footer.sections.connect")}
            </h3>
            <div className="flex flex-wrap gap-3">
              {Object.values(socialData)
                .filter((social) => social.footer)
                .map((social) => (
                  <FooterLink
                    key={social.name}
                    href={social.url}
                    ariaLabel={social.name}
                    icon={social.icon}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  />
                ))}
            </div>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="text-foreground text-sm font-semibold tracking-wider">
              {t("footer.sections.resources")}
            </h3>
            <nav className="space-y-2">
              {footerResources.map((resource) => (
                <FooterLink key={resource.name} href={resource.url}>
                  {resource.name}
                </FooterLink>
              ))}
            </nav>
          </div>

          {/* Discover */}
          <div className="space-y-4">
            <h3 className="text-foreground text-sm font-semibold tracking-wider">
              {t("footer.sections.discover")}
            </h3>
            <nav className="space-y-2">
              {footerDiscover.map((item) => (
                <FooterLink key={item.name} href={item.url}>
                  {item.name}
                </FooterLink>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-foreground text-sm font-semibold tracking-wider">
              {t("footer.sections.contact")}
            </h3>
            <div className="text-muted-foreground space-y-2 text-sm">
              <FooterLink
                href={t("location.mapUrl")}
                className="hover:text-foreground block transition-colors"
              >
                {t("location.name")}
              </FooterLink>
              <FooterLink
                href={socialData.email.url}
                className="hover:text-foreground block transition-colors"
              >
                {t("footer.contact.support")}
              </FooterLink>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Section */}
        <div className="space-y-2">
          {/* Copyright and Legal Links - Desktop: same line, Mobile: separate lines */}
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div className="text-muted-foreground flex items-center gap-2 text-sm">
              <span>
                © 2025 Zangwei Zheng
              </span>
              <span>•</span>
              <span>{t("footer.legal.mitLicense")}</span>
            </div>

            <div className="text-muted-foreground flex items-center gap-2 text-sm">
              <FooterLink
                href="/privacy-policy"
                className="hover:text-foreground transition-colors"
              >
                {t("footer.legal.privacyPolicy")}
              </FooterLink>
              <span>•</span>
              <FooterLink
                href="/terms-of-service"
                className="hover:text-foreground transition-colors"
              >
                {t("footer.legal.termsDisclaimer")}
              </FooterLink>
            </div>
          </div>

          {/* Last Updated and Made with - Desktop: same line, Mobile: separate lines */}
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div className="text-muted-foreground text-sm">
              {t("footer.bottom.lastUpdated")}: {siteConfig.lastUpdated}
            </div>

            <div className="text-muted-foreground flex items-center gap-2 text-sm">
              <span>{t("footer.bottom.modifiedFrom")}</span>
              <FooterLink
                href="https://github.com/zhengzangw/nextjs-portfolio-blog-research"
                className="hover:text-foreground inline-flex items-center gap-1 transition-colors"
              >
                <Icons.github className="h-4 w-4" />
                <span>zhengzangw/nextjs-portfolio-blog-research</span>
              </FooterLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
