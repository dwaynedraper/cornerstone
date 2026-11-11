/**
 * Renders schema.org structured data. Invisible to visitors, read by search
 * engines and AI assistants. `<` is escaped so text can never close the tag.
 */
export default function JsonLd({ data }: { data: object | null }) {
  if (!data) return null;
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
