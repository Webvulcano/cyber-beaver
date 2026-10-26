// IndexNow (Bing, Yandex, Seznam…): a megváltozott URL-ek azonnali bejelentése a keresőknek.
// Kulcsfájl: public/<INDEXNOW_KEY>.txt (a protokoll szerint publikus). Deploykor: scripts/indexnow-deploy.mjs.
import { SITE_URL } from "@/content/site";

export const INDEXNOW_KEY = "d60119ca9c1c83da3974676fd9def2ff";

// paths: ["/", "/informaciobiztonsagi-felelos", …]. Csak éles környezetben küld; hibát nem dob (best effort).
export async function submitIndexNow(paths) {
  if (process.env.VERCEL_ENV !== "production" || !paths.length) return;
  const host = new URL(SITE_URL).host;
  try {
    await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host,
        key: INDEXNOW_KEY,
        keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
        urlList: paths.map((p) => `${SITE_URL}${p}`),
      }),
      signal: AbortSignal.timeout(5000),
    });
  } catch {
    // a keresők később úgyis bejárják az oldalt
  }
}
