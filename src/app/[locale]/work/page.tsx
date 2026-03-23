import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { WorkPageClient } from "@/components/work/work-page-client";
import { routing } from "@/i18n/routing";
import { constructMetadata } from "@/lib/metadata";
import type { ProjectItem } from "@/lib/projects";

type MetadataProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: MetadataProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return constructMetadata({
    title: t("sections.work.title"),
    description: t("sections.work.tagline"),
    path: "/work",
    locale,
  });
}

export default async function WorkPage(props: {
  params: Promise<{ locale: string }>;
}) {
  const params = await props.params;
  const locale = params.locale || routing.defaultLocale;
  const t = await getTranslations({ locale });

  // Fetch projects from i18n collections
  let projects: ProjectItem[] = [];
  try {
    const raw = t.raw("projects.items") as ProjectItem[] | undefined;
    if (Array.isArray(raw)) {
      projects = raw;
    }
  } catch {
    projects = [];
  }

  // Extract unique categories
  const categorySet = new Set<string>();
  for (const project of projects) {
    if (project.categories) {
      for (const cat of project.categories) {
        categorySet.add(cat);
      }
    }
  }
  const categories = Array.from(categorySet).sort();

  return (
    <main className="pt-16 pb-12 sm:pt-24 sm:pb-14 md:pt-32 md:pb-16 lg:pt-36 xl:pt-40">
      <div className="mx-auto w-full max-w-5xl px-6 sm:px-8 md:px-10">
        <h1 className="mb-4 text-3xl font-semibold tracking-tighter md:text-4xl">
          {t("sections.work.title")}
        </h1>
        <p className="text-muted-foreground mb-8 max-w-2xl text-sm md:text-base">
          {t("sections.work.tagline")}
        </p>
      </div>

      <div className="mx-auto w-full max-w-5xl px-6 sm:px-8 md:px-10">
        <WorkPageClient
          projects={projects}
          categories={categories}
          labels={{
            allCategories: t("sections.work.allCategories"),
            technologies: t("sections.work.technologies"),
            gallery: t("sections.work.gallery"),
            noResults: t("sections.work.noResults"),
          }}
        />
      </div>
    </main>
  );
}
