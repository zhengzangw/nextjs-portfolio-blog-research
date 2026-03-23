"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import { LanguageToggle } from "@/components/blocks/navbar/language-toggle";
import { ModeToggle } from "@/components/blocks/navbar/mode-toggle";
import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import { Dock, DockIcon } from "@/components/ui/dock";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Link as I18nLink } from "@/i18n/routing";
import { cn } from "@/lib/utils";

interface NavbarProps {
  languageToggleDisabled?: boolean;
}

export default function Navbar({
  languageToggleDisabled = false,
}: NavbarProps) {
  const t = useTranslations();
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 768); // md breakpoint
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  const navbarItems = t.raw("navbar.items") as Array<{
    href: string;
    icon: string;
    label: string;
  }>;

  const getIconComponent = (iconName: string) => {
    const iconMap: Record<string, typeof Icons.home> = {
      home: Icons.home,
      folder: Icons.folder,
      notebook: Icons.notebook,
      fileuser: Icons.fileuser,
    };
    return iconMap[iconName] || Icons.home;
  };

  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-x-0 bottom-0 z-40 mx-auto mb-9 flex h-full max-h-14 origin-bottom md:top-0 md:mb-0",
      )}
    >
      <div
        className={cn(
          "fixed inset-x-0 bottom-0 h-16 w-full backdrop-blur-lg [-webkit-mask-image:linear-gradient(to_top,black,transparent)] md:hidden",
        )}
      ></div>
      <Dock className="bg-background pointer-events-auto relative z-50 mx-auto flex h-full min-h-full transform-gpu items-center px-1 [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] md:mt-1 dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] dark:[border:1px_solid_rgba(255,255,255,.1)]">
        {navbarItems.map((item) => {
          // Use next-intl Link which automatically handles locale prefixes
          // With localePrefix: 'as-needed', en routes don't have /en prefix
          // For static files (e.g., .pdf, .png), use regular <a> tag to avoid routing issues
          // Otherwise use i18n Link for internal routes
          const href = item.href;
          const label = item.label;
          const IconComponent = getIconComponent(item.icon);
          const isStaticFile = href.includes(".") && (href.endsWith(".pdf") || href.endsWith(".png") || href.endsWith(".jpg") || href.endsWith(".jpeg"));
          const LinkComponent = isStaticFile ? "a" : I18nLink;

          return (
            <DockIcon key={item.href}>
              <Tooltip>
                <TooltipTrigger asChild>
                  {isStaticFile ? (
                    <a
                      href={href}
                      className={cn(
                        buttonVariants({ variant: "ghost", size: "icon" }),
                        "size-12",
                      )}
                      aria-label={label}
                    >
                      <IconComponent className="size-4" />
                    </a>
                  ) : (
                    <LinkComponent
                      href={href}
                      className={cn(
                        buttonVariants({ variant: "ghost", size: "icon" }),
                        "size-12",
                      )}
                      aria-label={label}
                    >
                      <IconComponent className="size-4" />
                    </LinkComponent>
                  )}
                </TooltipTrigger>
                <TooltipContent
                  side={isDesktop ? "bottom" : "top"}
                  sideOffset={8}
                >
                  <p>{label}</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          );
        })}
        <Separator orientation="vertical" className="h-full" />
        {/* {Object.entries(siteConfig.social)
          .filter(([, social]) => social.navbar)
          .map(([name, social]) => (
            <DockIcon key={name}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={social.url}
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "icon" }),
                      "size-12",
                    )}
                  >
                    <social.icon className="size-4" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{name}</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          ))}
        <Separator orientation="vertical" className="h-full py-2" /> */}
        <DockIcon>
          <Tooltip>
            <TooltipTrigger asChild>
              <ModeToggle />
            </TooltipTrigger>
            <TooltipContent side={isDesktop ? "bottom" : "top"} sideOffset={8}>
              <p>{t("navbar.theme")}</p>
            </TooltipContent>
          </Tooltip>
        </DockIcon>
        <DockIcon>
          <Tooltip>
            <TooltipTrigger asChild>
              <LanguageToggle disabled={languageToggleDisabled} />
            </TooltipTrigger>
            <TooltipContent side={isDesktop ? "bottom" : "top"} sideOffset={8}>
              <p>{t("navbar.language")}</p>
            </TooltipContent>
          </Tooltip>
        </DockIcon>
      </Dock>
    </div>
  );
}
