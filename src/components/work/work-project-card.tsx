"use client";

import Image from "next/image";

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
import type { ProjectItem } from "@/lib/projects";
import { cn } from "@/lib/utils";

interface WorkProjectCardProps {
  project: ProjectItem;
  onClick: () => void;
}

export function WorkProjectCard({ project, onClick }: WorkProjectCardProps) {
  const { isTapped, handleTouchStart, handleTouchEnd } = useTouchFeedback();

  return (
    <Card
      className={cn(
        "flex h-full flex-col overflow-hidden border transition-all duration-300 ease-out hover:shadow-lg cursor-pointer",
        isTapped && "shadow-lg",
      )}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onClick={onClick}
    >
      <div className="group block">
        {project.video && (
          <div className="bg-muted relative h-40 w-full overflow-hidden rounded-md sm:h-44 md:h-48">
            <video
              src={project.video}
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
              src={project.video}
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
        {!project.video && project.image && (
          <div className="bg-muted relative h-40 w-full overflow-hidden rounded-md sm:h-44 md:h-48">
            <Image
              src={project.image}
              alt={project.title}
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
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, 500px"
              className={cn(
                "pointer-events-none object-contain object-center transition-transform duration-500 ease-out will-change-transform select-none group-hover:scale-[1.02]",
                isTapped && "scale-[1.02]",
              )}
            />
          </div>
        )}
      </div>
      <CardHeader className="px-2">
        <div className="space-y-1">
          <CardTitle className="mt-1 text-base [&_img]:my-0 [&_img]:inline-block [&_img]:h-[1em] [&_img]:w-auto [&_img]:align-baseline">
            <CustomReactMarkdown>{project.title}</CustomReactMarkdown>
          </CardTitle>
          <time className="font-sans text-xs">{project.dates}</time>
          <div className="prose text-muted-foreground dark:prose-invert max-w-full font-sans text-xs text-pretty mt-1 mb-1 [&_p]:mt-1 [&_p]:mb-1 [&_img]:my-0 [&_img]:inline-block [&_img]:h-[1em] [&_img]:w-auto [&_img]:align-baseline">
            <CustomReactMarkdown>{project.description}</CustomReactMarkdown>
          </div>
        </div>
      </CardHeader>
      <CardContent className="mt-auto flex flex-col px-2">
        {project.categories && project.categories.length > 0 && (
          <div className="mb-2 flex flex-wrap gap-1">
            {project.categories.map((cat) => (
              <Badge
                className="px-1 py-0 text-[10px] capitalize"
                variant="outline"
                key={cat}
              >
                {cat}
              </Badge>
            ))}
          </div>
        )}
        {project.technologies && project.technologies.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {project.technologies.map((tag) => (
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
        {project.links && project.links.length > 0 && (
          <div className="flex flex-row flex-wrap items-start gap-1">
            {project.links.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                <Badge className="flex gap-2 px-2 py-1 text-[10px]">
                  {link.type}
                </Badge>
              </a>
            ))}
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
