// src/components/BreadcrumbJsonLd.jsx
// Server component — injects BreadcrumbList JSON-LD for a given page.

/**
 * @param {{ items: Array<{ name: string; url: string }> }} props
 *   items[0] is always Home; subsequent items are the page hierarchy.
 */
export default function BreadcrumbJsonLd({ items }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
