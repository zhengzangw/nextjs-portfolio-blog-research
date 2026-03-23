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
    title: t("privacyPolicy.title"),
    description: `${t("privacyPolicy.title")} for ${t("name.full")}'s portfolio website`,
    path: "/privacy-policy",
    locale,
  });

  return metadata;
}

export default async function PrivacyPolicy(props: {
  params: Promise<{ locale: string }>;
}) {
  const params = await props.params;
  const locale = params.locale || routing.defaultLocale;
  const t = await getTranslations({ locale });

  const dateLocale = locale === "fr" ? "fr-FR" : "en-US";

  return (
    <main className="mx-auto max-w-4xl px-6 pt-16 pb-16 sm:px-16 md:px-20 md:pt-24 lg:px-24 xl:px-32">
      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <h1 className="mb-8 text-3xl font-bold">{t("privacyPolicy.title")}</h1>

        <p className="text-muted-foreground mb-6">
          <strong>{t("privacyPolicy.lastUpdated")}:</strong>{" "}
          {new Date().toLocaleDateString(dateLocale, {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>

        <div className="space-y-6">
          <section>
            <h2 className="mb-4 text-2xl font-semibold">
              {t("privacyPolicy.sections.informationWeCollect.title")}
            </h2>
            <p>
              {t("privacyPolicy.sections.informationWeCollect.description")}
            </p>
            <ul className="mt-2 list-disc pl-6">
              {(
                t.raw(
                  "privacyPolicy.sections.informationWeCollect.items",
                ) as string[]
              ).map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <p className="mt-2">
              {t("privacyPolicy.sections.informationWeCollect.note")}
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">
              {t("privacyPolicy.sections.howWeUseInformation.title")}
            </h2>
            <p>{t("privacyPolicy.sections.howWeUseInformation.description")}</p>
            <ul className="mt-2 list-disc pl-6">
              {(
                t.raw(
                  "privacyPolicy.sections.howWeUseInformation.items",
                ) as string[]
              ).map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">
              {t("privacyPolicy.sections.dataSharing.title")}
            </h2>
            <p>{t("privacyPolicy.sections.dataSharing.description")}</p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">
              {t("privacyPolicy.sections.cookies.title")}
            </h2>
            <p>{t("privacyPolicy.sections.cookies.description")}</p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">
              {t("privacyPolicy.sections.contact.title")}
            </h2>
            <p>{t("privacyPolicy.sections.contact.description")}</p>
          </section>
        </div>
      </div>
    </main>
  );
}
