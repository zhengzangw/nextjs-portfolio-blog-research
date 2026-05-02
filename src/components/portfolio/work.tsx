import { ResumeCard } from "@/components/portfolio/resume-card";

interface Work {
  company: string;
  logoUrl: string;
  title: string;
  href?: string;
  badges?: readonly string[];
  start: string;
  end?: string;
  description: string;
  location: string;
}

interface WorkProps {
  work: readonly Work[];
}

export default function Work({ work }: WorkProps) {
  return (
    <div className="flex flex-col gap-y-3">
      {work.map((item) => (
        <ResumeCard
          key={item.company}
          logoUrl={item.logoUrl}
          altText={item.company}
          title={item.company}
          location={item.location}
          subtitle={item.title}
          href={item.href}
          badges={item.badges}
          period={`${item.start} - ${item.end ?? "Present"}`}
          description={item.description}
          useMarkdown
        />
      ))}
    </div>
  );
}
