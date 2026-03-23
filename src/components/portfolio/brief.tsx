import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Brief({
  name,
  firstName,
  surname,
  initials,
  subtitle,
  description,
  avatarUrl,
  className = "",
  locale,
}: {
  name: string;
  firstName?: string;
  surname?: string;
  initials: string;
  subtitle: string;
  description: string;
  avatarUrl: string;
  className?: string;
  locale?: string;
}) {
  return (
    <div
      className={`flex flex-col-reverse items-center justify-center gap-6 sm:flex-row sm:justify-between md:gap-8 lg:gap-10 ${className || ""}`}
    >
      <div className="flex flex-1 flex-col items-center space-y-1.5 text-center sm:items-start sm:text-left">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
          {firstName && surname ? (
            <>
              <span>{firstName}</span>{" "}
              <span className="inline-block w-1"></span>
              <span>{surname}</span>
            </>
          ) : (
            name
          )}
        </h1>
        <p className="text-muted-foreground text-lg">{subtitle}</p>
        <p className="max-w-[600px] whitespace-pre-line md:text-xl">
          {description}
        </p>
      </div>
      <Avatar className="size-24 border sm:size-28 md:size-32 lg:size-36">
        <AvatarImage alt={name} src={avatarUrl} />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
    </div>
  );
}
