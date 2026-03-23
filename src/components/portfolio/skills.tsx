import { Badge } from "@/components/ui/badge";

type SkillsProps = {
  skills: Record<string, readonly string[]> | readonly string[];
};

export default function Skills({ skills }: SkillsProps) {
  if (Array.isArray(skills)) {
    return (
      <div className="flex flex-wrap gap-1">
        {skills.map((skill) => (
          <Badge key={skill}>{skill}</Badge>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {Object.entries(skills as Record<string, readonly string[]>).map(([category, items]) => (
        <div key={category}>
          <p className="text-muted-foreground mb-1.5 text-xs font-medium">
            {category}
          </p>
          <div className="flex flex-wrap gap-1">
            {items.map((skill) => (
              <Badge key={skill}>{skill}</Badge>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
