import React from "react";
import { Icons } from "@/components/icons";

const iconMap: Record<string, (props: React.HTMLAttributes<SVGElement>) => React.ReactElement> = {
  globe: Icons.globe,
  github: Icons.github,
  linkedin: Icons.linkedin,
  paper: Icons.paper,
  bookopen: Icons.bookopen,
  newspaper: Icons.newspaper,
};

export function getIconForLink(iconName: string) {
  const IconComponent = iconMap[iconName] || Icons.globe;
  return <IconComponent className="size-3" />;
}
