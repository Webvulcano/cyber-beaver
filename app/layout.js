import { Figtree } from "next/font/google";
import "./globals.css";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin", "latin-ext"],
});

export const metadata = {
  title: "Cyber Beaver — Információbiztonsági tanácsadás, felkészítés és audit",
  description:
    "NIS2 és DORA felkészítés, TISAX, adatvédelem, kockázatelemzés és IT audit. Big4-os precizitás, kisvállalkozói gyorsasággal.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="hu" className={`${figtree.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
