"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

import { CustomReactMarkdown } from "@/components/react-markdown";
import { Badge } from "@/components/ui/badge";
import { getIconForLink } from "@/lib/link-icons";
import type { ProjectItem } from "@/lib/projects";

interface ProjectDetailModalProps {
  project: ProjectItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  labels: {
    technologies: string;
    gallery: string;
  };
}

export function ProjectDetailModal({
  project,
  open,
  onOpenChange,
  labels,
}: ProjectDetailModalProps) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && project && (
          <DialogPrimitive.Portal forceMount>
            <DialogPrimitive.Overlay asChild>
              <motion.div
                className="fixed inset-0 z-50 bg-black/40 backdrop-blur-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            </DialogPrimitive.Overlay>
            <DialogPrimitive.Content
              asChild
              onOpenAutoFocus={(e) => e.preventDefault()}
            >
              <motion.div
                className="fixed inset-x-4 bottom-4 top-16 z-50 mx-auto max-w-2xl overflow-y-auto rounded-lg border bg-background p-6 shadow-lg sm:inset-x-auto sm:bottom-auto sm:left-[50%] sm:top-[50%] sm:w-full sm:translate-x-[-50%] sm:translate-y-[-50%] sm:max-h-[85vh]"
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.98 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                <DialogPrimitive.Close className="absolute right-4 top-4 z-10 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                  <Cross2Icon className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </DialogPrimitive.Close>

                <DialogPrimitive.Title className="sr-only">
                  {project.title}
                </DialogPrimitive.Title>
                <DialogPrimitive.Description className="sr-only">
                  {project.description}
                </DialogPrimitive.Description>

                {/* Hero image/video */}
                {project.video && (
                  <div className="bg-muted relative mb-4 h-48 w-full overflow-hidden rounded-lg sm:h-64">
                    <video
                      src={project.video}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="h-full w-full object-contain"
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
                  <div className="bg-muted relative mb-4 h-48 w-full overflow-hidden rounded-lg sm:h-64">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 672px"
                      className="object-contain"
                    />
                  </div>
                )}

                {/* Title + dates + active badge */}
                <div className="mb-3">
                  <h2 className="text-2xl font-semibold tracking-tight">
                    {project.title}
                  </h2>
                  <time className="text-muted-foreground mt-1 block text-sm">
                    {project.dates}
                  </time>
                </div>

                {/* Category badges */}
                {project.categories && project.categories.length > 0 && (
                  <div className="mb-3 flex flex-wrap gap-1">
                    {project.categories.map((cat) => (
                      <Badge
                        key={cat}
                        variant="outline"
                        className="px-2 py-0.5 text-xs capitalize"
                      >
                        {cat}
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Tech stack badges */}
                {project.technologies && project.technologies.length > 0 && (
                  <div className="mb-3">
                    <p className="text-muted-foreground mb-1 text-xs font-medium uppercase tracking-wider">
                      {labels.technologies}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.map((tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="px-1 py-0 text-[10px]"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* External links */}
                {project.links && project.links.length > 0 && (
                  <div className="mb-4 flex flex-wrap gap-1">
                    {project.links.map((link, idx) => (
                      <Link
                        key={idx}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Badge className="flex gap-2 px-2 py-1 text-[10px]">
                          {getIconForLink(link.icon)}
                          {link.type}
                        </Badge>
                      </Link>
                    ))}
                  </div>
                )}

                {/* Long description rendered as markdown */}
                {project.longDescription && (
                  <div className="prose dark:prose-invert max-w-none text-sm">
                    <CustomReactMarkdown>
                      {project.longDescription}
                    </CustomReactMarkdown>
                  </div>
                )}

                {/* Gallery grid */}
                {project.gallery && project.gallery.length > 0 && (
                  <div className="mt-6">
                    <p className="text-muted-foreground mb-2 text-xs font-medium uppercase tracking-wider">
                      {labels.gallery}
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {project.gallery.map((item, idx) =>
                        item.type === "video" ? (
                          <div
                            key={idx}
                            className="bg-muted relative overflow-hidden rounded-md"
                          >
                            <video
                              src={item.src}
                              autoPlay
                              loop
                              muted
                              playsInline
                              className="h-full w-full object-contain"
                            >
                              <track
                                kind="captions"
                                srcLang="en"
                                label="English captions"
                                default
                              />
                            </video>
                          </div>
                        ) : (
                          <div
                            key={idx}
                            className="bg-muted relative aspect-video overflow-hidden rounded-md"
                          >
                            <Image
                              src={item.src}
                              alt={item.alt}
                              fill
                              sizes="(max-width: 768px) 50vw, 336px"
                              className="object-contain"
                            />
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            </DialogPrimitive.Content>
          </DialogPrimitive.Portal>
        )}
      </AnimatePresence>
    </DialogPrimitive.Root>
  );
}
