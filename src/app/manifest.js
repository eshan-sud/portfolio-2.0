// src/app/manifest.js

// Next.js App Router special file — auto-served at /manifest.webmanifest
// and linked via <link rel="manifest"> in the <head>.
// See: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/manifest

export default function manifest() {
  return {
    name: "Eshan Sud - Software Engineer Portfolio",
    short_name: "Eshan Sud",
    description:
      "Portfolio of Eshan Sud featuring AI/ML projects, research publications, and professional experience",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#0D1A3C",
    theme_color: "#FACC15",
    orientation: "portrait-primary",
    icons: [
      {
        src: "/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable any",
      },
      {
        src: "/web-app-manifest-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable any",
      },
    ],
    categories: ["portfolio", "technology", "education"],
    lang: "en-US",
    dir: "ltr",
  };
}
