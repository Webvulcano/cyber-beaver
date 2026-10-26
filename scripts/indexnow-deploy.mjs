// postbuild: éles deploynál a friss build sitemapjének URL-jeit bejelenti az IndexNow-nak (Bing, Yandex…).
// A kulcs a public/<32 hex>.txt fájl neve. Preview / lokális buildnél nem fut. Hiba esetén sem buktatja a buildet.
import { readdirSync, readFileSync } from "node:fs";

if (process.env.VERCEL_ENV !== "production") process.exit(0);

try {
  const keyFile = readdirSync("public").find((f) => /^[0-9a-f]{32}\.txt$/.test(f));
  const sitemap = readFileSync(".next/server/app/sitemap.xml.body", "utf8");
  const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  if (!keyFile || !urlList.length) process.exit(0);
  const key = keyFile.replace(".txt", "");
  const { origin, host } = new URL(urlList[0]);
  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host, key, keyLocation: `${origin}/${keyFile}`, urlList }),
    signal: AbortSignal.timeout(10000),
  });
  console.log(`[indexnow] ${urlList.length} URL → HTTP ${res.status}`);
} catch (err) {
  console.log(`[indexnow] kihagyva: ${err.message}`);
}
