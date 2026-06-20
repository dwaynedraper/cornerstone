import { ChevronDownIcon } from "@heroicons/react/24/outline";
import Reveal from "@/components/motion/Reveal";
import { faqs as defaultFaqs, type Faq as FaqItem } from "@/data/faqs";

export default function Faq({
  faqs = defaultFaqs,
}: {
  /** FAQ entries to render. Defaults to the seed data in `src/data/faqs.ts`. */
  faqs?: FaqItem[];
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <section className="bg-sand-light py-20 sm:py-28">
      {/* FAQ structured data: rich results in Google + a source AI can quote */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <Reveal>
          <div>
            <p className="font-heading text-sm font-semibold uppercase tracking-[0.2em] text-blueprint">
              Questions
            </p>
            <h2 className="mt-2 font-heading text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Frequently asked
            </h2>
            <div className="mt-4 h-0.5 w-16 bg-amber" />
          </div>
        </Reveal>

        <div className="mt-10 divide-y divide-ink/10 border-y border-ink/10">
          {faqs.map((f) => (
            <details key={f.question} className="group py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-heading text-base font-semibold text-ink [&::-webkit-details-marker]:hidden">
                <span>{f.question}</span>
                <ChevronDownIcon className="h-5 w-5 shrink-0 text-blueprint transition-transform duration-300 group-open:rotate-180" />
              </summary>
              <p className="mt-3 leading-7 text-ink-500">{f.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
