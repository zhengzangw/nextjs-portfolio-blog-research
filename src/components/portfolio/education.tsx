import { ResumeCard } from "@/components/portfolio/resume-card";

interface Education {
  school: string;
  href?: string;
  logoUrl: string;
  degree: string;
  start: string;
  end: string;
  location?: string;
  description?: string;
}

interface EducationProps {
  educations: readonly Education[];
}

export default function Education({ educations }: EducationProps) {
  return (
    <div className="flex flex-col gap-y-3">
      {educations.map((education) => (
        <ResumeCard
          key={education.school}
          href={education.href}
          logoUrl={education.logoUrl}
          altText={education.school}
          title={education.school}
          subtitle={education.degree}
          period={`${education.start} - ${education.end}`}
          location={education.location}
          description={education.description}
          useMarkdown={!!education.description}
        />
      ))}
    </div>
  );
}
