// Egyszerű markdown → Tiptap doc a rich text ALAPÉRTÉKEKHEZ (content/pages/*.js).
// Csak amit a RichText renderel: bekezdés, "- " lista, "1. " számozott lista, **félkövér**, *dőlt*, [link](url).
// Blokkok üres sorral elválasztva.

const INLINE = /(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/;

function inline(text) {
  return text
    .split(INLINE)
    .filter(Boolean)
    .map((part) => {
      if (part.startsWith("**")) return { type: "text", text: part.slice(2, -2), marks: [{ type: "bold" }] };
      if (part.startsWith("*")) return { type: "text", text: part.slice(1, -1), marks: [{ type: "italic" }] };
      const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (link) return { type: "text", text: link[1], marks: [{ type: "link", attrs: { href: link[2] } }] };
      return { type: "text", text: part };
    });
}

const paragraph = (text) => ({ type: "paragraph", content: inline(text) });

function list(lines, ordered) {
  return {
    type: ordered ? "orderedList" : "bulletList",
    content: lines.map((l) => ({ type: "listItem", content: [paragraph(l.replace(/^(-|\d+\.)\s+/, ""))] })),
  };
}

export function mdToDoc(md) {
  const blocks = md.trim().split(/\n{2,}/);
  return {
    type: "doc",
    content: blocks.map((block) => {
      const lines = block.split("\n").map((l) => l.trim());
      if (lines.every((l) => l.startsWith("- "))) return list(lines, false);
      if (lines.every((l) => /^\d+\.\s/.test(l))) return list(lines, true);
      return paragraph(lines.join(" "));
    }),
  };
}
