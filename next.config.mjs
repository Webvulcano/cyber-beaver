// Only the CMS admin may embed this site in an iframe (visual editor).
const adminOrigins = (process.env.NEXT_PUBLIC_CMS_ADMIN_ORIGIN ?? "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Dev: telefonról (LAN IP-ről) is betöltődjön a JS/HMR (csak `next dev`-re hat).
  allowedDevOrigins: ["192.168.*.*", "10.*.*.*"],
  // cacheComponents (+ partialPrefetching) kikapcsolva: a CMS client-kit (fetch force-cache + tag) ebben a módban nincs tesztelve.
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async redirects() {
    // /admin → a központi Ügyfél Adminra (redirect, nem proxy → a login az admin saját domainjén fut).
    const dashboard = (process.env.DASHBOARD_URL || "https://analytics.webvulcano.hu").replace(/\/+$/, "");
    const slug = process.env.CMS_SITE_SLUG || "cyber-beaver";
    return [
      { source: "/admin", destination: `${dashboard}/${slug}`, permanent: false },
      { source: "/admin/:path*", destination: `${dashboard}/${slug}/:path*`, permanent: false },
      // A régi WordPress-oldal (cyberbeaver.hu) URL-jei → 301, hogy a meglévő linkek/indexelés ne vesszenek el.
      { source: "/about", destination: "/#rolam", statusCode: 301 },
      { source: "/:year(\\d{4})/:month(\\d{2})/:day(\\d{2})/:slug", destination: "/", statusCode: 301 },
      { source: "/feed", destination: "/", statusCode: 301 },
    ];
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
