// postbuild: éles deploynál a friss build sitemapjének URL-jeit bejelenti az IndexNow-nak (Bing, Yandex…).
// A kulcs a public/<32 hex>.txt fájl neve. Preview / lokális buildnél nem fut. Hiba esetén sem buktatja a buildet.
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

if (process.env.VERCEL_ENV !== "production") process.exit(0);

// A build-kimenet helye környezetenként más (lokálisan .next/server/app/sitemap.xml.body, Vercelen az adapter
// .vercel/output alá is írhat) → a "sitemap.xml"-lel kezdődő, <urlset>-et tartalmazó első fájl.
function findSitemap() {
  const stack = [".next", ".vercel/output"].filter((d) => existsSync(d));
  while (stack.length) {
    const dir = stack.pop();
    for (const name of readdirSync(dir)) {
      const path = join(dir, name);
      if (statSync(path).isDirectory()) {
        if (name !== "cache" && name !== "node_modules") stack.push(path);
      } else if (name.startsWith("sitemap.xml")) {
        const text = readFileSync(path, "utf8");
        if (text.includes("<urlset")) return text;
      }
    }
  }
  return null;
}

try {
  const keyFile = readdirSync("public").find((f) => /^[0-9a-f]{32}\.txt$/.test(f));
  // tartalék: az élő sitemap (az előző deployé — az URL-lista ritkán változik)
  const site = (process.env.NEXT_PUBLIC_SITE_URL || "https://cyberbeaver.hu").replace(/\/$/, "");
  const sitemap = findSitemap() ?? (await (await fetch(`${site}/sitemap.xml`, { signal: AbortSignal.timeout(10000) })).text());
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
