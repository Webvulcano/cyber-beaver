// Teljes oldal színtémái. Az első az alapértelmezett — ennek értékei vannak az app/globals.css :root-jában is.
// base: nagy sötét felületek · baseDeep: sötétebb változat / sötét szöveg · accent: kiemelés, gombok
// surface: világos szekciók háttere. Az accent legyen világos (sötét szöveg megy rá) és ne piros
// (a hero pontrácsa piros "kockázatból" accent színűre "gyógyul").
export const THEMES = [
  { id: "smaragd-lagy", name: "Smaragd – lágy", base: "#22282a", baseDeep: "#181c1e", accent: "#6cc4a1", surface: "#f2f4f3" },
  { id: "smaragd-extra-lagy", name: "Smaragd – extra lágy", base: "#2b3133", baseDeep: "#1f2426", accent: "#86c9b0", surface: "#f3f5f4" },
  { id: "grafit-menta", name: "Grafit & menta", base: "#1b2428", baseDeep: "#11181b", accent: "#5ef0c4", surface: "#f1f5f4" },
  { id: "indigo-cian", name: "Indigó & cián", base: "#1e1b4b", baseDeep: "#141134", accent: "#67e8f9", surface: "#f4f4fb" },
  { id: "ejfekete-smaragd", name: "Éjfekete & smaragd", base: "#15181c", baseDeep: "#0b0d10", accent: "#34d399", surface: "#f3f5f4" },
  { id: "grafit-levendula", name: "Grafit & levendula", base: "#201d27", baseDeep: "#15131a", accent: "#b9a4ff", surface: "#f5f4f9" },
  { id: "erdo-barack", name: "Erdő & barack", base: "#173a2e", baseDeep: "#0f281f", accent: "#ffb38f", surface: "#f4f6f2" },
  { id: "szilva-rozsa", name: "Szilva & rózsa", base: "#2d1b33", baseDeep: "#1e1123", accent: "#f7a8c8", surface: "#f8f3f6" },
  { id: "hod-karamell", name: "Hód (barna & karamell)", base: "#2e221b", baseDeep: "#1f1611", accent: "#e9b78c", surface: "#f7f2ec" },
  { id: "bordo-puder", name: "Bordó & púder", base: "#3a1520", baseDeep: "#280d15", accent: "#ffc9bd", surface: "#faf4f2" },
];

export const themeVars = (t) => ({
  "--c-base": t.base,
  "--c-base-deep": t.baseDeep,
  "--c-accent": t.accent,
  "--c-surface": t.surface,
});
