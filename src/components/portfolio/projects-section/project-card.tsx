"use client";

import Image from "next/image";
import Link from "next/link";

import { CustomReactMarkdown } from "@/components/react-markdown";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTouchFeedback } from "@/hooks/use-touch-feedback";
import { cn } from "@/lib/utils";

interface Props {
  title: string;
  href?: string;
  description: string;
  dates: string;
  tags?: readonly string[];
  link?: string;
  image?: string;
  video?: string;
  links?: readonly {
    icon: React.ReactNode;
    type: string;
    href: string;
  }[];
  authors?: string;
  className?: string;
}

export function ProjectCard({
  title,
  href,
  description,
  dates,
  tags,
  link,
  image,
  video,
  links,
  authors,
  className,
}: Props) {
  const { isTapped, handleTouchStart, handleTouchEnd } = useTouchFeedback();

  return (
    <Card
      className={cn(
        "flex h-full flex-col overflow-hidden border transition-all duration-300 ease-out hover:shadow-lg",
        isTapped && "shadow-lg",
      )}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <Link
        href={href || "#"}
        className={cn("group block cursor-pointer", className)}
        aria-label={`View project: ${title}`}
      >
        {video && (
          <div className="bg-muted relative h-40 w-full overflow-hidden rounded-md sm:h-44 md:h-48">
            {/* blurred background video to fill empty space */}
            <video
              src={video}
              autoPlay
              loop
              muted
              playsInline
              className="pointer-events-none absolute inset-0 h-full w-full scale-110 object-cover opacity-60 blur-xl select-none dark:opacity-40"
              aria-hidden
            />
            {/* subtle gradient overlay for polish and readability */}
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-black/0 to-black/10 dark:via-white/0 dark:to-white/10"
              aria-hidden
            />
            {/* foreground video kept fully visible */}
            <video
              src={video}
              autoPlay
              loop
              muted
              playsInline
              className={cn(
                "pointer-events-none absolute inset-0 h-full w-full object-contain object-center transition-transform duration-500 ease-out will-change-transform select-none group-hover:scale-[1.02]",
                isTapped && "scale-[1.02]",
              )}
            >
              <track
                kind="captions"
                srcLang="en"
                label="English captions"
                default
              />
            </video>
          </div>
        )}
        {image && (
          <div className="bg-muted relative h-40 w-full overflow-hidden rounded-md sm:h-44 md:h-48">
            {/* blurred background to fill empty space */}
            <Image
              src={image}
              alt={title}
              aria-hidden
              fill
              sizes="(max-width: 768px) 100vw, 500px"
              className="pointer-events-none scale-110 object-cover opacity-60 blur-xl select-none dark:opacity-40"
            />
            {/* subtle gradient overlay for polish and readability */}
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-black/0 to-black/10 dark:via-white/0 dark:to-white/10"
              aria-hidden
            />
            {/* foreground image kept fully visible */}
            <Image
              src={image}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, 500px"
              className={cn(
                "pointer-events-none object-contain object-center transition-transform duration-500 ease-out will-change-transform select-none group-hover:scale-[1.02]",
                isTapped && "scale-[1.02]",
              )}
            />
          </div>
        )}
      </Link>
      <CardHeader className="px-2">
        <div className="space-y-1">
          <CardTitle className="mt-1 text-base [&_img]:my-0 [&_img]:inline-block [&_img]:h-[1em] [&_img]:w-auto [&_img]:align-baseline">
            <CustomReactMarkdown>{title}</CustomReactMarkdown>
          </CardTitle>
          <time className="font-sans text-xs">{dates}</time>
          <div className="hidden font-sans text-xs underline print:visible">
            {link?.replace("https://", "").replace("www.", "").replace("/", "")}
          </div>
          <div className="prose text-muted-foreground dark:prose-invert max-w-full font-sans text-xs text-pretty mt-1 mb-1 [&_p]:mt-1 [&_p]:mb-1 [&_img]:my-0 [&_img]:inline-block [&_img]:h-[1em] [&_img]:w-auto [&_img]:align-baseline">
            <CustomReactMarkdown>{description}</CustomReactMarkdown>
          </div>
          {authors && authors.trim() !== "" && (
            <div className="prose text-muted-foreground dark:prose-invert max-w-full font-sans text-xs text-pretty mt-1 mb-1 [&_p]:mt-1 [&_p]:mb-1">
              <CustomReactMarkdown>{authors}</CustomReactMarkdown>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="mt-auto flex flex-col px-2">
        {tags && tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {tags?.map((tag) => (
              <Badge
                className="px-1 py-0 text-[10px]"
                variant="secondary"
                key={tag}
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="px-2 pb-2">
        {links && links.length > 0 && (
          <div className="flex flex-row flex-wrap items-start gap-1">
            {links?.map((link, idx) => (
              <Link href={link?.href} key={idx} target="_blank">
                <Badge key={idx} className="flex gap-2 px-2 py-1 text-[10px]">
                  {link.icon}
                  {link.type}
                </Badge>
              </Link>
            ))}
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
