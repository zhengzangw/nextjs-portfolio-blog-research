"use client";

import { useMemo, useState } from "react";

import { BlurFade } from "@/components/ui/blur-fade";
import { ProjectDetailModal } from "@/components/work/project-detail-modal";
import { WorkProjectCard } from "@/components/work/work-project-card";
import { BLUR_FADE_DELAY } from "@/data/site";
import type { ProjectItem } from "@/lib/projects";
import { cn } from "@/lib/utils";

interface WorkPageClientProps {
  projects: ProjectItem[];
  categories: string[];
  labels: {
    allCategories: string;
    technologies: string;
    gallery: string;
    noResults: string;
  };
}

export function WorkPageClient({
  projects,
  categories,
  labels,
}: WorkPageClientProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(
    null,
  );

  const filteredProjects = activeCategory
    ? projects.filter((p) => p.categories.includes(activeCategory))
    : projects;

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const cat of categories) {
      counts[cat] = projects.filter((p) => p.categories.includes(cat)).length;
    }
    return counts;
  }, [projects, categories]);

  return (
    <>
      {/* Filter bar */}
      <BlurFade delay={BLUR_FADE_DELAY * 3}>
        <div className="mb-6 flex flex-nowrap gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setActiveCategory(null)}
            className={cn(
              "shrink-0 rounded-full px-3 py-1 text-xs font-medium transition-colors",
              activeCategory === null
                ? "bg-foreground text-background"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80",
            )}
          >
            {labels.allCategories} ({projects.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() =>
                setActiveCategory(activeCategory === cat ? null : cat)
              }
              className={cn(
                "shrink-0 rounded-full px-3 py-1 text-xs font-medium capitalize transition-colors",
                activeCategory === cat
                  ? "bg-foreground text-background"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80",
              )}
            >
              {cat} ({categoryCounts[cat]})
            </button>
          ))}
        </div>
      </BlurFade>

      {/* Project grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project, idx) => (
            <BlurFade key={project.slug} delay={BLUR_FADE_DELAY * 4 + idx * BLUR_FADE_DELAY}>
              <WorkProjectCard
                project={project}
                onClick={() => setSelectedProject(project)}
              />
            </BlurFade>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center py-16">
          <p className="text-muted-foreground text-sm">{labels.noResults}</p>
        </div>
      )}

      {/* Modal */}
      <ProjectDetailModal
        project={selectedProject}
        open={selectedProject !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedProject(null);
        }}
        labels={{
          technologies: labels.technologies,
          gallery: labels.gallery,
        }}
      />
    </>
  );
}
