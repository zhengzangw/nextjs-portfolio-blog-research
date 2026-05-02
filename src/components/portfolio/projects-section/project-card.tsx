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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useTouchFeedback } from "@/hooks/use-touch-feedback";
import { cn } from "@/lib/utils";

interface ProjectLink {
  icon: React.ReactNode;
  type: string;
  href: string;
}

interface Props {
  title: string;
  href?: string;
  description: string;
  longDescription?: string;
  dates: string;
  tags?: readonly string[];
  link?: string;
  image?: string;
  video?: string;
  links?: readonly ProjectLink[];
  authors?: string;
  className?: string;
}

export function ProjectCard({
  title,
  description,
  longDescription,
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
    <Dialog>
      <Card
        className={cn(
          "flex h-full flex-col overflow-hidden border transition-all duration-300 ease-out hover:shadow-lg",
          isTapped && "shadow-lg",
          className,
        )}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <DialogTrigger asChild>
          <button
            type="button"
            className="group block w-full cursor-pointer text-left"
            aria-label={`View project: ${title}`}
          >
            {video && (
              <div className="bg-muted relative h-40 w-full overflow-hidden rounded-md sm:h-44 md:h-48">
                <video
                  src={video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="pointer-events-none absolute inset-0 h-full w-full scale-110 object-cover opacity-60 blur-xl select-none dark:opacity-40"
                  aria-hidden
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-black/0 to-black/10 dark:via-white/0 dark:to-white/10"
                  aria-hidden
                />
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
                <Image
                  src={image}
                  alt={title}
                  aria-hidden
                  fill
                  sizes="(max-width: 768px) 100vw, 500px"
                  className="pointer-events-none scale-110 object-cover opacity-60 blur-xl select-none dark:opacity-40"
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-black/0 to-black/10 dark:via-white/0 dark:to-white/10"
                  aria-hidden
                />
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
          </button>
        </DialogTrigger>
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
              {links?.map((projectLink, idx) => (
                <Link
                  href={projectLink.href}
                  key={idx}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Badge className="flex gap-2 px-2 py-1 text-[10px]">
                    {projectLink.icon}
                    {projectLink.type}
                  </Badge>
                </Link>
              ))}
            </div>
          )}
        </CardFooter>
      </Card>

      <DialogContent className="max-h-[85vh] max-w-2xl overflow-y-auto sm:max-w-2xl">
        {(image || video) && (
          <div className="bg-muted relative -mt-2 h-44 w-full overflow-hidden rounded-md sm:h-56">
            {video ? (
              <video
                src={video}
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 h-full w-full object-contain"
              >
                <track kind="captions" srcLang="en" label="English captions" default />
              </video>
            ) : image ? (
              <Image
                src={image}
                alt={title}
                fill
                sizes="(max-width: 768px) 100vw, 700px"
                className="object-contain"
              />
            ) : null}
          </div>
        )}
        <DialogHeader>
          <DialogTitle className="text-xl [&_img]:inline-block [&_img]:h-[1em] [&_img]:w-auto [&_img]:align-baseline">
            <CustomReactMarkdown>{title}</CustomReactMarkdown>
          </DialogTitle>
          <time className="font-sans text-xs text-muted-foreground">{dates}</time>
        </DialogHeader>

        {longDescription ? (
          <div className="prose dark:prose-invert max-w-full text-sm">
            <CustomReactMarkdown>{longDescription}</CustomReactMarkdown>
          </div>
        ) : (
          <div className="prose dark:prose-invert max-w-full text-sm">
            <CustomReactMarkdown>{description}</CustomReactMarkdown>
          </div>
        )}

        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="px-1.5 py-0 text-[10px]"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {links && links.length > 0 && (
          <div className="flex flex-row flex-wrap items-center gap-2 pt-1">
            {links.map((projectLink, idx) => (
              <Link
                href={projectLink.href}
                key={idx}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Badge className="flex gap-2 px-3 py-1.5 text-xs">
                  {projectLink.icon}
                  {projectLink.type}
                </Badge>
              </Link>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
