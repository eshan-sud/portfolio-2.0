// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { dev }) => {
    if (dev) {
      // Suppress "Serializing big strings" warning from webpack's filesystem cache.
      // Large inline SVG path strings in LoaderSVGs.jsx exceed the default 128 KiB
      // threshold; raising infrastructureLogging to 'error' hides the hint.
      config.infrastructureLogging = {
        level: "error",
        debug: false,
      };
    }
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "https",
        hostname: "media.licdn.com",
      },
      {
        protocol: "https",
        hostname: "afilemanager.s3.dualstack.ap-southeast-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
      },
      {
        protocol: "https",
        hostname: "cdn.jsdelivr.net",
      },
    ],
  },
  // experimental: {
  //   serverActions: true, // Enable server actions for forms
  // },
};

export default nextConfig;
