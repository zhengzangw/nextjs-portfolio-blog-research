import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { routing } from "@/i18n/routing";
import { constructMetadata } from "@/lib/metadata";

type MetadataProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: MetadataProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  const metadata = await constructMetadata({
    title: t("termsOfService.title"),
    description: `${t("termsOfService.title")} for ${t("name.full")}'s portfolio website`,
    path: "/terms-of-service",
    locale,
  });

  return metadata;
}

export default async function TermsAndDisclaimer(props: {
  params: Promise<{ locale: string }>;
}) {
  const params = await props.params;
  const locale = params.locale || routing.defaultLocale;
  const t = await getTranslations({ locale });

  const dateLocale = locale === "fr" ? "fr-FR" : "en-US";

  return (
    <main className="mx-auto max-w-4xl px-6 pt-16 pb-16 sm:px-16 md:px-20 md:pt-24 lg:px-24 xl:px-32">
      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <h1 className="mb-8 text-3xl font-bold">{t("termsOfService.title")}</h1>

        <p className="text-muted-foreground mb-6">
          <strong>{t("termsOfService.lastUpdated")}:</strong>{" "}
          {new Date().toLocaleDateString(dateLocale, {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>

        <div className="space-y-6">
          <section>
            <h2 className="mb-4 text-2xl font-semibold">
              {t("termsOfService.sections.termsOfService.title")}
            </h2>
            <p>{t("termsOfService.sections.termsOfService.description")}</p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">
              {t("termsOfService.sections.useLicense.title")}
            </h2>
            <p>{t("termsOfService.sections.useLicense.description")}</p>
            <ul className="mt-2 list-disc pl-6">
              {(
                t.raw("termsOfService.sections.useLicense.items") as string[]
              ).map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">
              {t("termsOfService.sections.disclaimer.title")}
            </h2>
            <p>{t("termsOfService.sections.disclaimer.description")}</p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">
              {t("termsOfService.sections.limitations.title")}
            </h2>
            <p>{t("termsOfService.sections.limitations.description")}</p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">
              {t("termsOfService.sections.accuracyOfMaterials.title")}
            </h2>
            <p>
              {t("termsOfService.sections.accuracyOfMaterials.description")}
            </p>
            <p className="mt-2 font-medium">
              {t("termsOfService.sections.accuracyOfMaterials.note")}
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">
              {t("termsOfService.sections.links.title")}
            </h2>
            <p>{t("termsOfService.sections.links.description")}</p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">
              {t("termsOfService.sections.modifications.title")}
            </h2>
            <p>{t("termsOfService.sections.modifications.description")}</p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">
              {t("termsOfService.sections.contact.title")}
            </h2>
            <p>{t("termsOfService.sections.contact.description")}</p>
          </section>
        </div>
      </div>
    </main>
  );
}
