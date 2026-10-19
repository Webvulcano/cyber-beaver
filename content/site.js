// Az oldal alapszövegei. A CMS-manifest (cms.manifest.js) ezeket adja alapértéknek;
// élesben a szöveg az Ügyfél Adminból jön (lib/cms.js), ez csak az első feltöltés.

// Rich text alapérték: bekezdések, a { b: "…" } rész félkövér.
const doc = (...paragraphs) => ({
  type: "doc",
  content: paragraphs.map((parts) => ({
    type: "paragraph",
    content: parts.map((p) =>
      typeof p === "string" ? { type: "text", text: p } : { type: "text", text: p.b, marks: [{ type: "bold" }] },
    ),
  })),
});

export const SEO = {
  title: "Kiszervezett információbiztonsági felelős | Cyber Beaver",
  description:
    "Kiszervezett információbiztonsági felelős havidíjas alapon, Big4-os tapasztalattal. NIS2 és DORA felkészítés, TISAX, kockázatelemzés és IT audit.",
};

export const CONTACT_INFO = {
  email: "agardyb@protonmail.com",
  phone: "+36 30 239 24 75",
  linkedin: "https://www.linkedin.com/in/balazs-agardy-55802a51/",
};

export const HERO = {
  company: "Cyber Beaver Kft.",
  titleHighlight: "Kiszervezett",
  title: "információbiztonsági felelős",
  subtitle: "Információbiztonsági tanácsadás, felkészítés és audit",
  cta: "Kapcsolat",
  services: ["NIS2 felkészítés", "DORA / MNB", "TISAX", "GDPR", "Kockázatelemzés", "IT audit"],
};

export const ABOUT = {
  eyebrow: "Rólam",
  title: "Agárdy Balázs vagyok,",
  titleHighlight: "szabadúszó információbiztonsági tanácsadó.",
  body: doc(
    [
      "Több mint ",
      { b: "10+ évet dolgoztam a Big4-ban információbiztonság, adatvédelem és IT audit területen." },
      " Aztán úgy döntöttem, hogy szabadabban, rugalmasabb formában szeretném támogatni az ügyfeleimet.",
    ],
    [
      "A nagyvállalati kötöttségeket elengedve 2025-ben megalapítottam a Cyber Beaver-t, ahol a ",
      { b: "Big4-os precizitást és munkakultúrát ötvözöm a kisvállalkozások gyorsaságával és közvetlenségével." },
    ],
  ),
  certsTitle: "Tanusítványok",
};

export const SERVICES = {
  title: "Miben tudok segíteni?",
  ibfTitle: "Kiszervezett információbiztonsági felelős",
  ibfText: doc([
    "Kiszervezett információbiztonsági felelősként (IBF) elvégzem a kapcsolódó feladatokat, biztosítom a megfelelőséget. ",
    { b: "Havidíjas alapon" },
    ", megbízhatóan, szakszerűen.",
  ]),
  ibfCta: "Kérjen ajánlatot",
  // TODO: a feladatlistát Balázs pontosítsa (most általános IBF-feladatok).
  ibfTasks: [
    "Információbiztonsági szabályzatok elkészítése és karbantartása",
    "Kockázatelemzés és biztonsági osztályba sorolás",
    "Kapcsolattartás a hatósággal, auditokra felkészítés",
    "Incidenskezelés támogatása és munkatársi tudatossági oktatás",
  ],
  othersTitle: "További szolgáltatások",
  // Tartalom: szó szerint a régi cyberbeaver.hu-ról (sorrend is), a helyesírási hibák javítva.
  // icon: rejtett mező (az adminban nem látszik), a kártyával együtt mozog átrendezéskor → Services.jsx ICONS.
  items: [
    {
      icon: "checklist",
      title: "NIS2 felkészítés",
      text: "Teljeskörű NIS2 felkészítés a gap elemzéstől a megvalósításig. Számtalan iparágban tevékenykedő ügyféllel dolgoztam már együtt NIS2 megfelelőségen, továbbá végeztem NIS2 auditokat is. A felkészítés során figyelembe veszem az adott cég sajátosságait és az auditori elvárásokat, módszertanokat is.",
    },
    // TODO: szöveg később (Balázstól)
    { icon: "audit", title: "NIS2 audit támogatás", text: "" },
    {
      icon: "bank",
      title: "DORA és MNB megfelelőség",
      text: "A hazai bankszektor nagy részével dolgoztam már együtt törvényi megfelelőségi projekteken. Az elmúlt évek tapasztalatát felhasználva hatékonyan és célorientáltan tudok DORA vagy egyéb MNB megfelelőségben segíteni.",
    },
    {
      icon: "teach",
      title: "Tudatossági oktatás",
      text: "A tudatossági oktatások nem csak törvényi megfelelőség miatt fontosak, hanem gyakorlati hasznuk is van. Non-profit szervezeteknek, iskoláknak, közintézményeknek limitáltan pro-bono is vállalom oktatás megtartását.",
    },
    {
      icon: "lock",
      title: "Adatvédelem",
      text: "Ki emlékszik már a GDPR-ra?! Pedig az adatvédelem és annak IT oldali elvárásai továbbra is ugyanolyan relevánsak.",
    },
    {
      icon: "car",
      title: "TISAX tanácsadás és felkészítés",
      text: "Több ügyfelemet is segítettem már sikeres TISAX minősítés elérésben. Hatékony, gyors, a TISAX elvárásainak megfelelő és praktikus TISAX felkészítést vállalok.",
    },
    {
      icon: "chart",
      title: "Információbiztonsági kockázatelemzés",
      text: "Praktikus, a gyakorlatban is jól használható, az adott vállalatra szabott kockázatelemzést végzek, amely megfelel a törvényi elvárásoknak vagy iparági keretrendszereknek is.",
    },
    {
      icon: "link",
      title: "Harmadik felek kockázatkezelés (TPRM)",
      text: "Segítek kialakítani egy gyakorlatban is használható, ugyanakkor törvényi elvárásoknak is megfelelő TPRM folyamatot. Igény esetén elvégzem a szállítói auditokat is.",
    },
    {
      icon: "search",
      title: "IT audit",
      text: "Teljesen vagy részben kiszervezett IT belső ellenőri feladatok ellátása nagyvállalatok, pénzintézetek számára.",
    },
  ],
};

// Tartalom: a régi cyberbeaver.hu alapján. Ügyfélnevek nélkül (titoktartás).
// sector: rejtett mező (energy | bank | kkv), átrendezéskor a kártyával mozog → References.jsx SECTOR.
export const REFERENCES = {
  title: "Referenciák",
  intro: "10+ év Big4 tapasztalat után, a hazai bankszektortól a KKV-kig.",
  items: [
    {
      sector: "energy",
      years: "2025–",
      title: "Információbiztonsági felelős",
      client: "Energiaipari vállalat",
      text: "Kiszervezett információbiztonsági felelősként folyamatosan támogatom egy hazai energiacég megfelelését.",
      tags: ["IBF"],
    },
    {
      sector: "bank",
      years: "2025",
      title: "Kiberbiztonsági érettségelemzés",
      client: "Hazai bank",
      text: "NIST CSF alapú érettségelemzés és kiberbiztonsági akcióterv kidolgozása.",
      tags: ["NIST CSF"],
    },
    {
      sector: "kkv",
      years: "2024–2025",
      title: "NIS2 felkészítés",
      client: "Több hazai KKV",
      text: "Tanácsadás, folyamatbevezetés, oktatás és felkészítés a NIS2-auditra.",
      tags: ["NIS2"],
    },
    {
      sector: "bank",
      years: "2024",
      title: "DORA GAP-elemzés és implementáció",
      client: "Hazai bank",
      text: "Teljes, RTS/ITS szintű DORA GAP-elemzés és az implementáció támogatása.",
      tags: ["DORA", "MNB"],
    },
    {
      sector: "bank",
      years: "2023",
      title: "Kiberbiztonsági projektmenedzser",
      client: "Hazai nagybank",
      text: "Stratégiai kiberbiztonsági projekt vezetése: SIEM-bevezetés, ATM-biztonság fejlesztése, adatvédelem.",
      tags: ["SIEM", "ATM-biztonság"],
    },
  ],
};

export const CONTACT = {
  eyebrow: "Kapcsolat",
  title: "Kérj ajánlatot vagy egyeztessünk.",
  text: "Írd meg röviden, miben segíthetek, és 1 munkanapon belül jelentkezem. Ha sürgős, hívj fel bátran.",
  callCta: "Hívj fel:",
};

export const FOOTER = {
  quote: "„Mert csak a legokosabb hód tudja, merre dől a fa.”",
  addressLines: ["Cyber Beaver Kft.", "Budapest"],
  rights: "Cyber Beaver Kft. Minden jog fenntartva.",
};
