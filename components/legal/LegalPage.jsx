import Link from "next/link";
import { Fragment } from "react";
import { getLegalDoc, parseInline } from "@/lib/legal";

// Jogi oldal (impresszum, adatkezelés): sötét fejléc logóval → főoldal, világos olvasófelület,
// alul ugyanaz a copyright + jogi linkek sáv, mint a főoldal footerén. Szöveg: content/legal/<name>.md.

const YEAR = new Date().getFullYear();

export const LEGAL_LINKS = [
  { label: "Impresszum", href: "/impresszum" },
  { label: "Adatkezelési tájékoztató", href: "/adatkezeles" },
];

const linkCls = "font-medium text-petrol-deep underline decoration-lime decoration-2 underline-offset-4 hover:text-petrol";

function Inline({ text }) {
  return parseInline(text).map((n, i) => {
    if (n.t === "bold") return <strong key={i} className="font-semibold text-petrol-deep">{n.text}</strong>;
    if (n.t === "link") {
      if (n.href.startsWith("/"))
        return <Link key={i} href={n.href} className={linkCls}>{n.text}</Link>;
      const external = n.href.startsWith("http");
      return (
        <a key={i} href={n.href} className={`${linkCls} break-words`} {...(external && { target: "_blank", rel: "noopener noreferrer" })}>
          {n.text}
        </a>
      );
    }
    return <Fragment key={i}>{n.text}</Fragment>;
  });
}

function Block({ block }) {
  switch (block.type) {
    case "heading":
      if (block.level === 1)
        return <h1 className="mb-10 text-3xl font-bold tracking-tight text-petrol-deep md:text-4xl">{block.text}</h1>;
      if (block.level === 2)
        return <h2 className="mt-12 mb-4 text-xl font-semibold text-petrol-deep">{block.text}</h2>;
      return <h3 className="mt-8 mb-3 text-lg font-semibold text-petrol-deep">{block.text}</h3>;
    case "list":
      return (
        <ul className="mb-5 list-disc space-y-2 pl-5 marker:text-lime">
          {block.items.map((it, i) => (
            <li key={i}><Inline text={it} /></li>
          ))}
        </ul>
      );
    case "table":
      return (
        <div className="mb-6 overflow-x-auto">
          <table className="w-full border-collapse text-left">
            {block.head && (
              <thead>
                <tr>
                  {block.head.map((c, i) => (
                    <th key={i} className="border-b-2 border-petrol/20 py-2 pr-4 align-bottom font-semibold text-petrol-deep">
                      <Inline text={c} />
                    </th>
                  ))}
                </tr>
              </thead>
            )}
            <tbody>
              {block.rows.map((row, r) => (
                <tr key={r} className="border-b border-petrol/10">
                  {row.map((c, i) => (
                    <td key={i} className={`py-3 pr-4 align-top ${!block.head && i === 0 ? "w-32 whitespace-nowrap" : "min-w-40"}`}>
                      <Inline text={c} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    default:
      return (
        <p className="mb-5">
          {block.lines.map((l, i) => (
            <Fragment key={i}>
              {i > 0 && <br />}
              <Inline text={l} />
            </Fragment>
          ))}
        </p>
      );
  }
}

export default async function LegalPage({ name }) {
  const blocks = await getLegalDoc(name);

  return (
    <>
      <header className="bg-petrol text-white">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-4 py-4">
          <Link href="/" className="flex items-center gap-3" aria-label="Cyber Beaver – főoldal">
            <img src="/logo-mark-white.png" alt="" width={579} height={516} className="h-9 w-auto" />
            <span className="text-lg tracking-wide">
              <span className="font-extrabold">CYBER</span>
              <span className="font-light">BEAVER</span>
            </span>
          </Link>
          <Link href="/" className="py-2 text-sm font-semibold text-lime hover:text-white">
            ← Főoldal
          </Link>
        </div>
      </header>

      <main className="flex-1 bg-mist px-4 py-16 md:py-24">
        <article className="mx-auto max-w-3xl text-petrol/80">
          {blocks.map((b, i) => (
            <Block key={i} block={b} />
          ))}
        </article>
      </main>

      <LegalBar />
    </>
  );
}

// Legalsó sáv: copyright + jogi linkek (a főoldal footere is ezt használja).
export function LegalBar({ rights = "Cyber Beaver Kft. Minden jog fenntartva.", rightsAttr = {} }) {
  return (
    <div className="border-t border-white/10 bg-petrol-deep px-4 py-4 text-center text-sm text-white/40">
      © {YEAR} <span {...rightsAttr}>{rights}</span>
      <span className="mt-1 flex flex-wrap justify-center gap-x-4 sm:mt-0 sm:ml-4 sm:inline-flex">
        {LEGAL_LINKS.map(({ label, href }) => (
          <Link key={href} href={href} className="inline-block py-1.5 hover:text-lime">
            {label}
          </Link>
        ))}
      </span>
    </div>
  );
}
