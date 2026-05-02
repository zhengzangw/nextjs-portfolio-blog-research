import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";

import { siteConfig } from "@/data/site";
import type { Locale } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import { getPost } from "@/lib/blog";

// Helper function to load Google Font dynamically
async function loadGoogleFont(
  font: string,
  weight: number,
  text?: string,
): Promise<ArrayBuffer> {
  const weightParam = `wght@${weight}`;
  const textParam = text ? `&text=${encodeURIComponent(text)}` : "";
  const url = `https://fonts.googleapis.com/css2?family=${font}:${weightParam}${textParam}`;
  const css = await (await fetch(url)).text();
  const resource = css.match(
    /src: url\((.+)\) format\('(opentype|truetype|woff2)'\)/,
  );

  if (resource) {
    const response = await fetch(resource[1]);
    if (response.status === 200) {
      return await response.arrayBuffer();
    }
  }

  throw new Error(`Failed to load font data for ${font} weight ${weight}`);
}

// Image metadata
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Format date for display
function formatDate(dateString: string, locale: string): string {
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(locale === "fr" ? "fr-FR" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  } catch {
    return dateString;
  }
}

// Truncate text to fit within a certain length
function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + "...";
}

// Image generation
export default async function Image({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const resolvedLocale = (locale || routing.defaultLocale) as Locale;

  // Get blog post data
  const post = await getPost(slug, resolvedLocale);

  if (!post) {
    // Return a default image if post not found
    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#1a1a1a",
            color: "#ffffff",
            fontSize: "48px",
            fontFamily: "Inter",
          }}
        >
          Blog Post Not Found
        </div>
      ),
      { ...size },
    );
  }

  const { title, summary, date } = post.metadata;
  const blogTitle = title || "Blog Post";
  const blogSummary = summary || "";
  const formattedDate = date ? formatDate(date, resolvedLocale) : "";

  // Get author name
  const t = await getTranslations({ locale: resolvedLocale });
  const authorName = t("name.full");
  const authorLabel = t("blog.authorLabel");
  const authorText = `${authorLabel} ${authorName}`;

  // Collect all text that will be rendered for font subsetting
  const allText = `${blogTitle}${blogSummary}${formattedDate}${authorText}${siteConfig.url}`;

  // Load Inter font from Google Fonts dynamically
  const [interMedium, interBold, interSemiBold] = await Promise.all([
    loadGoogleFont("Inter", 500, allText),
    loadGoogleFont("Inter", 700, allText),
    loadGoogleFont("Inter", 600, allText),
  ]);

  // Truncate title and summary to fit the image
  const displayTitle = truncateText(blogTitle, 80);
  const displaySummary = truncateText(blogSummary, 150);

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#1a1a1a",
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px",
          fontFamily: "Inter",
          padding: "80px",
        }}
      >
        {/* Top URL bubble */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              display: "flex",
              border: "2px solid #ffffff",
              borderRadius: "9999px",
              padding: "6px 12px",
              fontSize: "16px",
              color: "#ffffff",
              fontWeight: 500,
              backgroundColor: "transparent",
              lineHeight: "1.2",
              letterSpacing: "0.02em",
            }}
          >
            {siteConfig.url}/blog
          </div>
        </div>

        {/* Main content block */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            backgroundColor: "#000000",
            borderRadius: "24px",
            padding: "60px 80px",
            width: "100%",
            maxWidth: "1200px",
            gap: "24px",
          }}
        >
          {/* Blog Title */}
          <div
            style={{
              display: "flex",
              fontSize: "56px",
              fontWeight: 700,
              color: "#ffffff",
              lineHeight: "1.2",
              letterSpacing: "-0.01em",
              width: "100%",
            }}
          >
            {displayTitle}
          </div>

          {/* Author */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: "20px",
              color: "#ffffff",
              fontWeight: 500,
              opacity: 0.7,
              marginTop: "-8px",
              fontStyle: "italic",
            }}
          >
            {authorText}
          </div>

          {/* Blog Summary */}
          <div
            style={{
              display: displaySummary ? "flex" : "none",
              fontSize: "24px",
              color: "#ffffff",
              fontWeight: 400,
              opacity: 0.85,
              lineHeight: "1.5",
              width: "100%",
            }}
          >
            {displaySummary}
          </div>

          {/* Date */}
          <div
            style={{
              display: formattedDate ? "flex" : "none",
              alignItems: "center",
              gap: "8px",
              marginTop: "8px",
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: "18px",
                color: "#ffffff",
                fontWeight: 500,
                opacity: 0.6,
              }}
            >
              {formattedDate}
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Inter",
          data: interMedium,
          style: "normal",
          weight: 500,
        },
        {
          name: "Inter",
          data: interSemiBold,
          style: "normal",
          weight: 600,
        },
        {
          name: "Inter",
          data: interBold,
          style: "normal",
          weight: 700,
        },
      ],
    },
  );
}

// Alt text - will be dynamically generated based on post title
export const alt = "Blog Post";
