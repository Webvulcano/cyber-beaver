import { Figtree } from "next/font/google";
import "./globals.css";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin", "latin-ext"],
});

export const metadata = {
  title: "Kiszervezett információbiztonsági felelős | Cyber Beaver",
  description:
    "Kiszervezett információbiztonsági felelős havidíjas alapon, Big4-os tapasztalattal. NIS2 és DORA felkészítés, TISAX, kockázatelemzés és IT audit.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="hu" className={`${figtree.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
