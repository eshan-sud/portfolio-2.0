// project/src/app/sitemap.js

export default function sitemap() {
  const baseUrl = "https://eshan-sud.vercel.app";

  // Use real dates so crawlers can see when each section was last meaningfully updated.
  // Update these when you add or significantly change content on that page.
  return [
    {
      url: baseUrl,
      lastModified: new Date("2025-08-15"),
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date("2025-08-15"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date("2025-08-15"),
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/experience`,
      lastModified: new Date("2025-08-15"),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/research`,
      lastModified: new Date("2025-08-15"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];
}
