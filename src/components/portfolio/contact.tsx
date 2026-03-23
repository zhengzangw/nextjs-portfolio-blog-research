import Link from "next/link";

interface ContactProps {
  emailUrl: string;
  calendlyUrl?: string;
  contactLabel?: string;
  getInTouch?: string;
  contactDescription?: string;
  viaEmail?: string;
  askQuestions?: string;
  exploreCollaboration?: string;
  coffeeChat?: string;
  schedule?: string;
}

export default function Contact({
  emailUrl,
  calendlyUrl,
  contactLabel = "Contact",
  getInTouch = "Get in Touch",
  contactDescription = "Want to chat? Feel free to reach out",
  viaEmail = "via email",
  askQuestions = "Ask questions",
  exploreCollaboration = "Explore collaboration opportunities",
  coffeeChat = "15-minute coffee chat",
  schedule = "Schedule",
}: ContactProps) {
  return (
    <div className="space-y-3">
      <div className="bg-foreground text-background inline-block rounded-lg px-3 py-1 text-sm">
        {contactLabel}
      </div>
      <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
        {getInTouch}
      </h2>
      <div className="mx-auto max-w-[600px] space-y-6">
        <p className="text-muted-foreground text-center text-lg leading-relaxed md:text-xl">
          {contactDescription}{" "}
          <Link
            href={emailUrl}
            className="group inline-flex items-center gap-1 text-foreground underline transition-colors hover:no-underline"
          >
            {viaEmail}
          </Link>{" "}
          <span className="inline-block transition-transform group-hover:translate-x-1">
            →
          </span>
        </p>

        <div className="flex flex-col items-center space-y-4">
          <ul className="text-muted-foreground grid gap-3 text-center text-lg leading-relaxed md:text-xl">
            <li className="hover:text-foreground transition-colors">
              • {askQuestions}
            </li>
            <li className="hover:text-foreground transition-colors">
              • {exploreCollaboration}
            </li>
            {calendlyUrl && (
              <li className="hover:text-foreground transition-colors">
                • {coffeeChat} (
                <Link
                  href={calendlyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground underline transition-colors hover:no-underline"
                >
                  {schedule}
                </Link>
                )
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
