// Only the CMS admin may embed this site in an iframe (visual editor).
const adminOrigins = (process.env.NEXT_PUBLIC_CMS_ADMIN_ORIGIN ?? "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

/** @type {import('next').NextConfig} */
const nextConfig = {
  // cacheComponents (+ partialPrefetching) kikapcsolva: a CMS client-kit (fetch force-cache + tag) ebben a módban nincs tesztelve.
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: `frame-ancestors 'self' ${adminOrigins.join(" ")}`.trim(),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
