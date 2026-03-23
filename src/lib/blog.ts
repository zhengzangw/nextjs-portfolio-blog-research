import fs from "fs";
import matter from "gray-matter";
import path from "path";
import rehypeKatex from "rehype-katex";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

// Reading speed constants (words/characters per minute)
const READING_SPEED_EN = 225; // English: words per minute
const READING_SPEED_FR = 250; // French: words per minute

// Define the expected metadata structure
interface BlogPostMetadata {
  title: string;
  date: string;
  summary: string;
  readingTime?: number; // Reading time in minutes
  [key: string]: unknown;
}

// Define the blog post type
export interface BlogPost {
  metadata: BlogPostMetadata;
  slug: string;
  source: string;
  locale: string;
}

function getMDXFiles(dir: string) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

/**
 * Calculate reading time based on content and locale
 * @param content - The markdown content (without frontmatter)
 * @param locale - The locale ('en' or 'fr')
 * @returns Reading time in minutes (rounded up)
 */
function calculateReadingTime(content: string, locale: string): number {
  // Remove markdown syntax, code blocks, and extra whitespace
  const text = content
    .replace(/```[\s\S]*?```/g, "") // Remove code blocks
    .replace(/`[^`]+`/g, "") // Remove inline code
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // Replace links with link text
    .replace(/[#*_~`]/g, "") // Remove markdown formatting characters
    .replace(/\n+/g, " ") // Replace newlines with spaces
    .trim();

  const speed = locale === "fr" ? READING_SPEED_FR : READING_SPEED_EN;
  const words = text.split(/\s+/).filter((w) => w.length > 0);
  return Math.max(1, Math.ceil(words.length / speed));
}

export async function markdownToHTML(markdown: string) {
  const p = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkMath)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeKatex)
    .use(rehypePrettyCode, {
      // https://rehype-pretty.pages.dev/#usage
      theme: {
        light: "github-light",
        dark: "github-dark-dimmed",
      },
      keepBackground: false,
    })
    .use(rehypeStringify)
    .process(markdown);

  return p.toString();
}

export async function getPost(
  slug: string,
  locale: string = "en",
): Promise<BlogPost | null> {
  const contentDir = `content/blog/${locale}`;
  const filePath = path.join(contentDir, `${slug}.mdx`);

  // Check if file exists
  if (!fs.existsSync(filePath)) {
    return null;
  }

  const source = fs.readFileSync(filePath, "utf-8");
  const { content: rawContent, data: rawMetadata } = matter(source);
  const content = await markdownToHTML(rawContent);

  // Calculate reading time
  const readingTime = calculateReadingTime(rawContent, locale);

  // Ensure required fields exist and type the metadata properly
  const metadata: BlogPostMetadata = {
    title: rawMetadata.title || "",
    date: rawMetadata.date || "",
    summary: rawMetadata.summary || "",
    readingTime,
    ...rawMetadata,
  };

  return {
    source: content,
    metadata,
    slug,
    locale,
  };
}

async function getAllPosts(
  dir: string,
  locale: string = "en",
): Promise<BlogPost[]> {
  const mdxFiles = getMDXFiles(dir);
  const posts = await Promise.all(
    mdxFiles.map(async (file) => {
      const slug = path.basename(file, path.extname(file));
      const post = await getPost(slug, locale);
      if (!post) {
        return null;
      }
      return post;
    }),
  );

  // Filter out null values (posts that don't exist)
  return posts.filter((post): post is BlogPost => post !== null);
}

export async function getBlogPosts(locale: string = "en"): Promise<BlogPost[]> {
  try {
    const contentDir = `content/blog/${locale}`;
    const fullPath = path.join(process.cwd(), contentDir);

    // Return empty array if directory doesn't exist
    if (!fs.existsSync(fullPath)) {
      return [];
    }

    const posts = await getAllPosts(fullPath, locale);
    return Array.isArray(posts) ? posts : [];
  } catch (error) {
    console.error(`Error getting blog posts for locale ${locale}:`, error);
    return [];
  }
}

export async function hasFrenchVersion(slug: string): Promise<boolean> {
  const frenchFilePath = path.join("content/blog/fr", `${slug}.mdx`);
  return fs.existsSync(frenchFilePath);
}

export async function hasEnglishVersion(slug: string): Promise<boolean> {
  const englishFilePath = path.join("content/blog/en", `${slug}.mdx`);
  return fs.existsSync(englishFilePath);
}

/**
 * Get all available locales for a blog post slug
 * @param slug - The blog post slug
 * @param locales - Array of all available locales to check
 * @returns Array of locales where the post exists
 */
export async function getAvailableLocales(
  slug: string,
  locales: string[],
): Promise<string[]> {
  const availableLocales: string[] = [];

  for (const locale of locales) {
    const contentDir = `content/blog/${locale}`;
    const filePath = path.join(process.cwd(), contentDir, `${slug}.mdx`);
    if (fs.existsSync(filePath)) {
      availableLocales.push(locale);
    }
  }

  return availableLocales;
}
