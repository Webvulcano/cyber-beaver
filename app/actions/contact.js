"use server";

// Kapcsolat-űrlap: validálás → SimplyForms (ő küldi az értesítő e-mailt).
// Env: SIMPLYFORMS_FORM_ID (publikus form ID, API key nem kell). Amíg nincs megadva, a Footer
// az űrlap helyett "karbantartás alatt" üzenetet mutat, ide el sem jut kérés.

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

  const sent = await sendToSimplyForms(data);
  if (!sent) {
    return {
      ok: false,
      values: data,
      error: "Nem sikerült elküldeni az üzenetet. Próbáld újra, vagy hívj fel telefonon.",
    };
  }
  return { ok: true };
}

async function sendToSimplyForms({ name, company, email, phone, message }) {
  const formId = process.env.SIMPLYFORMS_FORM_ID;
  if (!formId) {
    console.error("[kapcsolat-űrlap] Hiányzó SIMPLYFORMS_FORM_ID");
    return false;
  }

  // A kulcsok nevei jelennek meg az értesítő e-mailben
  const body = new FormData();
  body.append("subject", `Weboldal üzenet: ${name}${company ? ` (${company})` : ""}`);
  body.append("Név", name);
  body.append("Cég", company);
  body.append("E-mail", email);
  body.append("Telefon", phone);
  body.append("Üzenet", message);
  // "_" előtag: nem jelenik meg a levélben, csak Reply-To lesz → Balázs válasza a kitöltőhöz megy
  body.append("_replyto", email);

  try {
    const res = await fetch(`https://api.simplyforms.app/v1/forms/${formId}`, { method: "POST", body });
    if (!res.ok) {
      console.error("[kapcsolat-űrlap] SimplyForms hiba:", res.status, await res.text());
      return false;
    }
    return true;
  } catch (err) {
    console.error("[kapcsolat-űrlap] SimplyForms hiba:", err);
    return false;
  }
}
