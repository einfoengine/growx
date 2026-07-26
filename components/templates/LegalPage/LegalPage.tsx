import Eyebrow from "@/components/elements/Eyebrow";

export type LegalSection = {
  id: string;
  heading: string;
  /** Each string is a paragraph; strings beginning with "- " render as a
   *  bulleted list item within a shared list. */
  body: string[];
};

type LegalPageProps = {
  eyebrow: string;
  title: string;
  /** e.g. "Last updated July 2026". */
  updated: string;
  intro: string;
  sections: LegalSection[];
};

/** Shared shell for text-heavy legal documents (privacy, terms). Constrains
 *  copy to a readable measure and applies the site's prose rhythm. */
export default function LegalPage({
  eyebrow,
  title,
  updated,
  intro,
  sections,
}: LegalPageProps) {
  return (
    <section id="tpl-legal-page" className="relative overflow-hidden bg-background">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -z-10 left-1/2 -top-24 h-96 w-190 max-w-none -translate-x-1/2 bg-brand/6 blur-[120px]"
      />
      <div className="container-1200 py-24 sm:py-28 lg:py-32">
        <div className="mx-auto max-w-3xl">
          <Eyebrow text={eyebrow} />
          <h1 className="mt-4 text-3xl font-bold leading-[1.15] tracking-tight text-foreground sm:text-4xl md:text-5xl">
            {title}
          </h1>
          <p className="mt-4 text-sm text-muted">{updated}</p>
          <p className="mt-6 text-base leading-relaxed text-foreground/80 sm:text-lg">
            {intro}
          </p>

          <div className="mt-12 space-y-10">
            {sections.map((section) => {
              const bullets = section.body.filter((p) => p.startsWith("- "));
              const paragraphs = section.body.filter((p) => !p.startsWith("- "));
              return (
                <section key={section.id} aria-labelledby={section.id}>
                  <h2
                    id={section.id}
                    className="text-xl font-bold tracking-tight text-foreground sm:text-2xl"
                  >
                    {section.heading}
                  </h2>
                  {paragraphs.map((p, i) => (
                    <p
                      key={i}
                      className="mt-4 text-base leading-relaxed text-muted"
                    >
                      {p}
                    </p>
                  ))}
                  {bullets.length > 0 && (
                    <ul className="mt-4 space-y-2">
                      {bullets.map((b, i) => (
                        <li
                          key={i}
                          className="flex gap-3 text-base leading-relaxed text-muted"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand"
                          />
                          {b.slice(2)}
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              );
            })}
          </div>

          {/* TODO(legal): before public launch, have counsel confirm the
              registered legal entity, address, governing-law jurisdiction, and
              data-processing specifics referenced in these documents. */}
          <p className="mt-14 border-t border-border pt-6 text-sm italic text-muted">
            This document is a working draft and will be finalized before
            growX&apos;s public launch. Questions? Email{" "}
            <a href="mailto:hi@growx.studio" className="link">
              hi@growx.studio
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
