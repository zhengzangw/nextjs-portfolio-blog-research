"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { useTouchFeedback } from "@/hooks/use-touch-feedback";

interface AwardItem {
  readonly year: number;
  readonly title: string;
}

interface AwardsSectionProps {
  awards: readonly AwardItem[];
  showAllText?: string;
}

const DEFAULT_DISPLAY_COUNT = 5;

function AwardItem({ award }: { award: AwardItem }) {
  const { isTapped, handleTouchStart, handleTouchEnd } = useTouchFeedback();

  return (
    <div
      className={`hover:bg-accent/50 rounded-md px-3 py-1 transition-colors ${
        isTapped ? "bg-accent/50" : ""
      }`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="flex items-start gap-3">
        <span className="text-muted-foreground mt-0.5 text-xs font-medium whitespace-nowrap">
          {award.year}
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="mb-0.5 text-sm leading-tight font-semibold">
            {award.title}
          </h3>
        </div>
      </div>
    </div>
  );
}

export default function AwardsSection({
  awards,
  showAllText = "Show All",
}: AwardsSectionProps) {
  const [showAll, setShowAll] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Show latest items by default, or all if showAll is true
  const displayedAwards = showAll
    ? awards
    : awards.slice(0, DEFAULT_DISPLAY_COUNT);
  const hasMoreAwards = awards.length > DEFAULT_DISPLAY_COUNT;

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <div className="flex min-h-0 flex-col gap-y-1">
        <div className="space-y-0">
          {awards.slice(0, DEFAULT_DISPLAY_COUNT).map((award) => (
            <AwardItem key={`${award.year}-${award.title}`} award={award} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-0 flex-col gap-y-3">
      <div className="space-y-0.5">
        {displayedAwards.map((award) => (
          <AwardItem key={`${award.year}-${award.title}`} award={award} />
        ))}
      </div>
      {hasMoreAwards && !showAll && (
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
      )}
    </div>
  );
}
