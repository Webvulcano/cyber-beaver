"use server";

// Kapcsolat-űrlap: validálás + szerver-napló. E-mail küldés MÉG NINCS bekötve (demo) —
// TODO: e-mail szolgáltató bekötése élesítés előtt (addig a beküldött üzenet csak a szerver logban látszik).

const clean = (v, max) =>
  String(v ?? "")
    .trim()
    .slice(0, max);

export async function sendContact(_prev, formData) {
  // honeypot: emberek nem töltik ki (rejtett mező), botok igen → csendben "siker"
  if (clean(formData.get("website"), 200)) return { ok: true };

  const data = {
    name: clean(formData.get("name"), 120),
    company: clean(formData.get("company"), 160),
    email: clean(formData.get("email"), 200),
    phone: clean(formData.get("phone"), 40),
    message: clean(formData.get("message"), 5000),
  };

  const errors = {};
  if (!data.name) errors.name = "Add meg a neved.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errors.email = "Adj meg egy érvényes e-mail címet.";
  if (data.message.length < 10)
    errors.message = "Írj pár mondatot arról, miben segíthetek.";
  if (formData.get("consent") !== "on")
    errors.consent = "Az adatkezeléshez hozzá kell járulnod.";
  if (Object.keys(errors).length) return { ok: false, errors, values: data };

  const rows = [
    ["Név", data.name],
    ["Cég", data.company],
    ["E-mail", data.email],
    ["Telefon", data.phone],
  ].filter(([, v]) => v);
  const text = `${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\n${data.message}`;

  console.log(
    "[kapcsolat-űrlap] új üzenet (e-mail küldés még nincs bekötve):\n" + text,
  );
  return { ok: true };
}
