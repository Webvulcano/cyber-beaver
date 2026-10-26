"use client";

// Kapcsolat-űrlap (server action: app/actions/contact.js → SimplyForms). Sikeres küldés után köszönő üzenet.
// enabled=false (nincs SIMPLYFORMS_FORM_ID): "karbantartás alatt" kártya az űrlap helyett.
import { useActionState } from "react";
import { sendContact } from "@/app/actions/contact";

const field =
  "mt-2 w-full rounded-xl border border-white/15 bg-white/[0.07] px-4 py-3 text-white placeholder:text-white/35 transition outline-none focus:border-lime focus:bg-white/[0.1]";

function Label({ htmlFor, children, optional }) {
  return (
    <label htmlFor={htmlFor} className="text-sm font-semibold text-white/80">
      {children}
      {optional && (
        <span className="font-normal text-white/45"> (nem kötelező)</span>
      )}
    </label>
  );
}

function Error({ id, msg }) {
  return msg ? (
    <p id={id} className="mt-1.5 text-sm text-risk">
      {msg}
    </p>
  ) : null;
}

function Notice({ icon, title, children, ...props }) {
  return (
    <div
      className="flex flex-col items-center justify-center rounded-3xl border border-white/10 bg-petrol-deep p-8 text-center shadow-2xl md:p-10"
      {...props}
    >
      <span className="flex size-12 items-center justify-center rounded-full bg-lime text-petrol-deep">
        <svg
          viewBox="0 0 24 24"
          className="size-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          {icon}
        </svg>
      </span>
      <h3 className="mt-6 text-xl font-semibold">{title}</h3>
      <p className="mt-3 text-white/70">{children}</p>
    </div>
  );
}

export default function ContactForm({ enabled, email }) {
  const [state, action, pending] = useActionState(sendContact, null);
  const e = state?.errors ?? {};
  const v = state?.values ?? {};

  if (!enabled) {
    return (
      <Notice
        role="status"
        title="Az űrlap karbantartás alatt"
        icon={<path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.6 2.6-2.4-.6-.6-2.4 2.6-2.6Z" />}
      >
        Addig hívj fel bátran, vagy írj e-mailt:{" "}
        <a href={`mailto:${email}`} className="mt-1 block break-words font-semibold text-lime hover:underline">
          {email}
        </a>
      </Notice>
    );
  }

  if (state?.ok) {
    return (
      <Notice role="status" title="Köszönöm, megkaptam!" icon={<path d="m5 12 5 5 9-10" />}>
        1 munkanapon belül válaszolok a megadott e-mail címre.
      </Notice>
    );
  }

  return (
    <form
      action={action}
      noValidate
      className="rounded-3xl border border-white/10 bg-petrol-deep shadow-2xl p-6 text-left sm:p-8 md:p-10"
    >
      {/* honeypot: rejtett, botcsapda */}
      <div aria-hidden="true" className="absolute -left-[9999px]">
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="cf-name">Név</Label>
          <input
            id="cf-name"
            name="name"
            autoComplete="name"
            required
            defaultValue={v.name}
            aria-invalid={!!e.name}
            aria-describedby="cf-name-err"
            className={field}
          />
          <Error id="cf-name-err" msg={e.name} />
        </div>
        <div>
          <Label htmlFor="cf-company" optional>
            Cég
          </Label>
          <input
            id="cf-company"
            name="company"
            autoComplete="organization"
            defaultValue={v.company}
            className={field}
          />
        </div>
        <div>
          <Label htmlFor="cf-email">E-mail</Label>
          <input
            id="cf-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            defaultValue={v.email}
            aria-invalid={!!e.email}
            aria-describedby="cf-email-err"
            className={field}
          />
          <Error id="cf-email-err" msg={e.email} />
        </div>
        <div>
          <Label htmlFor="cf-phone" optional>
            Telefon
          </Label>
          <input
            id="cf-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            defaultValue={v.phone}
            className={field}
          />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="cf-message">Üzenet</Label>
          <textarea
            id="cf-message"
            name="message"
            rows={5}
            required
            defaultValue={v.message}
            aria-invalid={!!e.message}
            aria-describedby="cf-message-err"
            placeholder="Pár mondat a cégedről és arról, mire van szükséged."
            className={`${field} resize-y`}
          />
          <Error id="cf-message-err" msg={e.message} />
        </div>
      </div>

      <label className="mt-6 flex cursor-pointer items-start gap-3 text-sm text-white/70">
        <input
          type="checkbox"
          name="consent"
          className="mt-0.5 size-4 shrink-0 accent-lime"
          aria-invalid={!!e.consent}
          aria-describedby="cf-consent-err"
        />
        <span>
          Hozzájárulok, hogy a megadott adataimat a megkeresésem megválaszolása
          céljából kezeld. Részletek az{" "}
          <a
            href="/adatkezeles"
            target="_blank"
            className="text-lime underline underline-offset-4 hover:text-white"
          >
            adatkezelési tájékoztatóban
          </a>
          .
        </span>
      </label>
      <Error id="cf-consent-err" msg={e.consent} />

      {state?.error && (
        <p
          role="alert"
          className="mt-5 rounded-xl bg-risk/15 px-4 py-3 text-sm text-white"
        >
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-8 w-full cursor-pointer rounded-full bg-lime px-8 py-4 font-semibold text-petrol-deep transition hover:brightness-110 disabled:cursor-wait disabled:opacity-60 sm:w-auto"
      >
        {pending ? "Küldés…" : "Üzenet küldése"}
      </button>
    </form>
  );
}
