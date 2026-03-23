"use client";

import { ChevronRightIcon } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import React from "react";

import { CustomReactMarkdown } from "@/components/react-markdown";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader } from "@/components/ui/card";
import { useTouchFeedback } from "@/hooks/use-touch-feedback";
import { cn } from "@/lib/utils";

interface ResumeCardProps {
  logoUrl: string;
  altText: string;
  title: string;
  subtitle?: string;
  href?: string;
  badges?: readonly string[];
  period: string;
  description?: string;
  useMarkdown?: boolean;
  location?: string;
}
export const ResumeCard = ({
  logoUrl,
  altText,
  title,
  subtitle,
  href,
  badges,
  period,
  description,
  useMarkdown = false,
  location,
}: ResumeCardProps) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const { isTapped, handleTouchStart, handleTouchEnd } = useTouchFeedback();

  const handleClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (description) {
      e.preventDefault();
      setIsExpanded(!isExpanded);
    }
  };

  const cardContent = (
    <Card
      className={`flex transition-[box-shadow] duration-300 ease-out hover:shadow-lg ${
        isTapped ? "shadow-lg" : ""
      }`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="flex-none">
        <Avatar className="bg-muted dark:bg-foreground m-auto size-12 border">
          <AvatarImage src={logoUrl} alt={altText} className="object-contain" />
          <AvatarFallback>{altText[0]}</AvatarFallback>
        </Avatar>
      </div>
      <div className="group ml-4 grow flex-col items-center">
        <CardHeader>
          <div className="flex items-center justify-between gap-x-2 text-base">
            <h3 className="inline-flex items-center justify-center text-xs leading-none font-semibold sm:text-sm">
              {useMarkdown ? (
                <CustomReactMarkdown>{title}</CustomReactMarkdown>
              ) : (
                title
              )}
              {badges && (
                <span className="inline-flex gap-x-1">
                  {badges.map((badge, index) => (
                    <Badge
                      variant="secondary"
                      className="align-middle text-xs"
                      key={index}
                    >
                      {badge}
                    </Badge>
                  ))}
                </span>
              )}
              <ChevronRightIcon
                className={cn(
                  "size-4 translate-x-0 transform opacity-0 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:opacity-100",
                  isTapped ? "translate-x-1 opacity-100" : "",
                  isExpanded ? "rotate-90" : "rotate-0",
                )}
              />
            </h3>
            <div className="text-muted-foreground text-right text-xs tabular-nums sm:text-sm">
              {location ? `${location} | ${period}` : period}
            </div>
          </div>
          {subtitle && (
            <div className="font-sans text-xs">
              {useMarkdown ? (
                <CustomReactMarkdown>{subtitle}</CustomReactMarkdown>
              ) : (
                subtitle
              )}
            </div>
          )}
        </CardHeader>
        {description && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: isExpanded ? 1 : 0,

              height: isExpanded ? "auto" : 0,
            }}
            transition={{
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mt-2 text-xs sm:text-sm"
          >
            {useMarkdown ? (
              <CustomReactMarkdown>{description}</CustomReactMarkdown>
            ) : (
              description
            )}
          </motion.div>
        )}
      </div>
    </Card>
  );

  // If href is empty or undefined, render as a div instead of a link
  if (!href || href.trim() === "") {
    return (
      <div className="block cursor-pointer" onClick={handleClick}>
        {cardContent}
      </div>
    );
  }

  return (
    <Link href={href} className="block cursor-pointer" onClick={handleClick}>
      {cardContent}
    </Link>
  );
};
