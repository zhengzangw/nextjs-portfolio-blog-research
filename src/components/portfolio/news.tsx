"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

import { CustomReactMarkdown } from "@/components/react-markdown";
import { BlurFade } from "@/components/ui/blur-fade";
import { Button } from "@/components/ui/button";
import { useTouchFeedback } from "@/hooks/use-touch-feedback";

interface NewsItem {
  readonly date: string;
  readonly title: string;
  readonly content: string;
}

interface NewsSectionProps {
  news: readonly NewsItem[];
  delay?: number;
  title?: string;
  showAllText?: string;
}

const DEFAULT_DISPLAY_COUNT = 5;

function NewsItem({ item, delay }: { item: NewsItem; delay: number }) {
  const { isTapped, handleTouchStart, handleTouchEnd } = useTouchFeedback();

  return (
    <BlurFade key={`${item.date}-${item.title}`} delay={delay}>
      <div
        className={`hover:bg-accent/50 [&_a]:decoration-muted-foreground/50 [&:hover_a]:decoration-foreground rounded-md px-3 py-1 transition-colors [&_a]:underline ${
          isTapped ? "bg-accent/50 [&_a]:decoration-foreground" : ""
        }`}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="flex items-start gap-3">
          <span className="text-muted-foreground mt-0.5 text-xs font-medium whitespace-nowrap">
            {item.date}
          </span>
          <div className="min-w-0 flex-1">
            <h3 className="mb-0.5 text-sm leading-tight font-semibold">
              <span className="[&_img]:mr-1 [&_img]:ml-1 [&_img]:inline [&_img]:align-middle [&>p]:m-0 [&>p]:inline">
                <CustomReactMarkdown>{item.title}</CustomReactMarkdown>
              </span>
            </h3>
            <div className="text-muted-foreground text-xs leading-relaxed">
              <span className="[&_img]:mr-1 [&_img]:ml-1 [&_img]:inline [&_img]:align-middle [&>p]:m-0 [&>p]:inline">
                <CustomReactMarkdown>{item.content}</CustomReactMarkdown>
              </span>
            </div>
          </div>
        </div>
      </div>
    </BlurFade>
  );
}

export default function NewsSection({ 
  news, 
  delay = 0, 
  title = "Latest News",
  showAllText = "Show All"
}: NewsSectionProps) {
  const [showAll, setShowAll] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Show latest items by default, or all if showAll is true
  const displayedNews = showAll ? news : news.slice(0, DEFAULT_DISPLAY_COUNT);
  const hasMoreNews = news.length > DEFAULT_DISPLAY_COUNT;

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <div className="flex min-h-0 flex-col gap-y-1">
        <BlurFade delay={delay}>
          <h2 className="text-xl font-bold">{title}</h2>
        </BlurFade>
        <div className="space-y-0">
          {news.slice(0, DEFAULT_DISPLAY_COUNT).map((item, id) => (
            <NewsItem
              key={`${item.date}-${item.title}`}
              item={item}
              delay={delay + 0.05 + id * 0.05}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-0 flex-col gap-y-3">
      <BlurFade delay={delay}>
        <h2 className="text-xl font-bold">{title}</h2>
      </BlurFade>
      <div className="space-y-0.5">
        {displayedNews.map((item, id) => (
          <NewsItem
            key={`${item.date}-${item.title}`}
            item={item}
            delay={delay + 0.05 + id * 0.05}
          />
        ))}
      </div>
      {hasMoreNews && !showAll && (
        <BlurFade delay={delay + 0.3}>
          <div className="flex justify-center pt-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAll(true)}
              className="flex items-center gap-2"
            >
              <ChevronDown className="h-4 w-4" />
              {showAllText}
            </Button>
          </div>
        </BlurFade>
      )}
    </div>
  );
}
