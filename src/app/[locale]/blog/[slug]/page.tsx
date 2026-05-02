import { Suspense } from "react";
import { getTranslations } from "next-intl/server";

import { ViewCount } from "@/components/blog/view-count";
import { DEFAULT_LOCALE, routing } from "@/i18n/routing";
import { getBlogPosts, getPost } from "@/lib/blog";
import { formatDate } from "@/lib/utils";

export async function generateStaticParams() {
  const enPosts = await getBlogPosts("en");
  const frPosts = await getBlogPosts("fr");

  const params: Array<{ locale: string; slug: string }> = [];

  // Ensure we have arrays before iterating
  const enArray = Array.isArray(enPosts) ? enPosts : [];
  const frArray = Array.isArray(frPosts) ? frPosts : [];

  enArray.forEach((post) => {
    if (post?.slug) {
      params.push({ locale: "en", slug: post.slug });
    }
  });

  frArray.forEach((post) => {
    if (post?.slug) {
      params.push({ locale: "fr", slug: post.slug });
    }
  });

  return params;
}

export default async function Blog(props: {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}) {
  const params = await props.params;
  const locale = params.locale || routing.defaultLocale;
  const post = await getPost(params.slug, locale);
  const t = await getTranslations({ locale });

  if (!post) {
    return null; // Layout will handle notFound()
  }

  const readingTime = post.metadata.readingTime || 1;

  return (
    <div className="mx-auto w-full max-w-3xl px-6 sm:px-8 md:px-10">
      <h1 className="mb-3 text-3xl font-semibold tracking-tighter md:text-4xl">
        {post.metadata.title}
      </h1>
      <div className="mb-8 flex items-center justify-between text-sm">
        <Suspense fallback={<p className="h-5" />}>
          <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
            <p>{formatDate(post.metadata.date, locale)}</p>
            <span className="mx-1">·</span>
            <p>{t("blog.readingTime", { minutes: readingTime })}</p>
            <span className="mx-1">·</span>
            <ViewCount
              path={
                locale === DEFAULT_LOCALE
                  ? `/blog/${params.slug}`
                  : `/${locale}/blog/${params.slug}`
              }
            />
          </div>
        </Suspense>
      </div>
      <article
        className="prose dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: post.source }}
      ></article>
    </div>
  );
}
