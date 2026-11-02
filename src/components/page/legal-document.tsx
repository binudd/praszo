import { Container } from "@/components/ui/container";
import type { LegalDocument as LegalDocumentData } from "@/data/pages/legal";

/**
 * Long-form legal text: a sticky "On this page" index beside numbered sections on large screens,
 * a single reading column below. In-page links use plain anchors; Lenis smooths them (anchors option).
 */
export function LegalDocument({ document }: { document: LegalDocumentData }) {
  return (
    <section aria-label="Policy details" className="border-t border-line py-16 md:py-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-20">
          <nav aria-label="On this page" className="lg:sticky lg:top-28 lg:self-start">
            <p className="label text-ink-3">On this page</p>
            <ol className="mt-2 flex flex-col border-l border-line pl-4 lg:mt-4 lg:gap-2.5">
              {document.sections.map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`} className="flex min-h-11 items-center text-sm font-semibold text-ink-2 transition-colors hover:text-ink lg:block lg:min-h-0">
                    {section.title}
                  </a>
                </li>
              ))}
              <li>
                <a href="#legal-contact" className="flex min-h-11 items-center text-sm font-semibold text-ink-2 transition-colors hover:text-ink lg:block lg:min-h-0">
                  Contact us
                </a>
              </li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            {document.sections.map((section, index) => (
              <article key={section.id} id={section.id} className="scroll-mt-28 border-t border-line-strong pt-6 pb-10 first:border-t-0 first:pt-0">
                <p className="label text-ink-3 tabular-nums">{String(index + 1).padStart(2, "0")}</p>
                <h2 className="heading mt-3 text-ink">{section.title}</h2>
                {section.blocks.map((block, blockIndex) =>
                  block.type === "p" ? (
                    <p key={blockIndex} className="copy mt-4">
                      {block.text}
                    </p>
                  ) : (
                    <ul key={blockIndex} className="copy mt-4 flex list-disc flex-col gap-2 pl-5 marker:text-brand">
                      {block.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ),
                )}
              </article>
            ))}

            <article id="legal-contact" className="scroll-mt-28 border-t border-line-strong pt-6">
              <p className="label text-ink-3">Contact</p>
              <h2 className="heading mt-3 text-ink">Contact us</h2>
              <p className="copy mt-4">If you have any questions or concerns about this Privacy Policy, please contact us:</p>
              <address className="copy mt-4 not-italic">
                <span className="block font-semibold text-ink">{document.contact.name}</span>
                <a href={`mailto:${document.contact.email}`} className="tap-target block w-fit font-semibold text-ink hover:text-brand-strong">
                  {document.contact.email}
                </a>
                <a href={document.contact.phone.href} className="tap-target block w-fit font-semibold text-ink hover:text-brand-strong">
                  {document.contact.phone.display}
                </a>
              </address>
            </article>
          </div>
        </div>
      </Container>
    </section>
  );
}
