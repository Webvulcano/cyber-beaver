// TISAX-aloldal alapszövegei (→ cms.manifest.js, élesben az Ügyfél Adminból jön). Balázs jóváhagyására vár.
// Tények (2026-10, hivatalos ENX-források): enx.com/en-US/TISAX/ (+ /faqs/, /ISA/, /xap/), enx.com/en-US/news/isa2027/,
// TISAX Participant Handbook v2.8 (portal.enx.com/handbook). ISA 6 érvényes; ISA2027 a 2027-01-01-től rendelt értékelésekre.
// Balázs állítása csak a főoldali TISAX-kártyáról: "Több ügyfelemet is segítettem már sikeres TISAX minősítés elérésben."
import { mdToDoc } from "../../lib/md-doc";

export const TISAX = {
  path: "/tisax-felkeszites",
  seo: {
    title: "TISAX felkészítés és tanácsadás | Cyber Beaver",
    description:
      "TISAX felkészítés autóipari beszállítóknak: címkék, értékelési szintek, a folyamat lépései és gyakorlati segítség az auditig – Big4-os tapasztalattal.",
  },
  og: { highlight: "TISAX", title: "felkészítés és tanácsadás" },
  hero: {
    eyebrow: "Szolgáltatás",
    title: "TISAX felkészítés és tanácsadás",
    lead: mdToDoc(`
A TISAX az autóipar egységes információbiztonsági értékelése. Ha a megrendelőd TISAX-címkét kér, felkészítem a céged az értékelésre, amelyet egy független, ENX által jóváhagyott audit szolgáltató végez. Több ügyfelemet segítettem már sikeres TISAX-címke elérésében.
`),
    cta: "Kérj ajánlatot",
  },
  blocks: [
    {
      key: "who",
      type: "cards",
      nav: "Kinek kell?",
      label: "Kinek kell",
      title: "Kinek kell TISAX?",
      intro:
        "A TISAX-ot jellemzően a megrendelő kéri: egy gépjárműgyártó vagy nagyobb beszállító attól a partnerétől, akivel bizalmas információt, prototípust vagy személyes adatot oszt meg.",
      items: [
        { icon: "factory", title: "Autóipari beszállítók", text: "Alkatrész- és rendszergyártók, akik a megrendelő bizalmas adataival dolgoznak." },
        { icon: "chart", title: "Mérnöki és fejlesztő cégek", text: "Tervezés, fejlesztés, szimuláció a megrendelő terveivel és adataival." },
        { icon: "lock", title: "IT- és szoftverszolgáltatók", text: "Rendszerek, szoftverek, üzemeltetés autóipari ügyfeleknek." },
        { icon: "car", title: "Prototípusokkal dolgozók", text: "Prototípus-gyártás, -tesztelés, -szállítás, rendezvények és fotózások." },
      ],
      note: "A megrendelő azt is megmondja, melyik címkére van szükség. Ha nem egyértelmű, segítek értelmezni az elvárást.",
      noteCta: "Kérdezz bátran",
    },
    {
      key: "levels",
      type: "duo",
      nav: "Szintek",
      label: "Értékelési szintek",
      title: "Értékelési szintek",
      intro:
        "A TISAX a VDA ISA követelménykatalógusára épül – ma az ISA 6 érvényes, a 2027. január 1-jétől megrendelt értékelésekre az ISA2027 vonatkozik. Címkét két szinten lehet szerezni:",
      items: [
        {
          title: "AL2 – 2-es szint",
          points:
            "Az audit szolgáltató ellenőrzi az önértékelést és a bizonyítékokat\nInterjú jellemzően videóhívásban\nHelyszíni ellenőrzés csak kérésre",
        },
        {
          title: "AL3 – 3-as szint",
          points: "Alapos, helyszíni ellenőrzés\nDokumentumok, bizonyítékok, interjúk a folyamatgazdákkal\nA helyszíni körülmények vizsgálata",
        },
      ],
    },
    {
      key: "labels",
      type: "chips",
      nav: "Címkék",
      label: "Címkék",
      title: "A választható címkék",
      intro: "A címke azt mutatja, milyen információ vagy prototípus védelmére készült fel a céged (az ENX hivatalos angol elnevezésével):",
      items: [
        { name: "Confidential", desc: "Bizalmas információ védelme", level: "AL2" },
        { name: "Strictly confidential", desc: "Szigorúan bizalmas információ védelme", level: "AL3" },
        { name: "High availability", desc: "Magas rendelkezésre állás", level: "AL2" },
        { name: "Very high availability", desc: "Nagyon magas rendelkezésre állás", level: "AL3" },
        { name: "Proto parts", desc: "Prototípus-alkatrészek védelme", level: "AL3" },
        { name: "Proto vehicles", desc: "Prototípus-járművek védelme", level: "AL3" },
        { name: "Test vehicles", desc: "Tesztjárművek kezelése", level: "AL2" },
        { name: "Proto events", desc: "Prototípus-rendezvények és -fotózások", level: "AL2" },
        { name: "Data", desc: "Személyes adatok kezelése a megrendelő megbízásából", level: "AL2" },
        { name: "Special data", desc: "Különleges adatok kezelése a megrendelő megbízásából", level: "AL3" },
      ],
    },
    {
      key: "numbers",
      type: "stats",
      label: "Fontos számok",
      title: "Fontos számok",
      items: [
        { value: "3 év", label: "a címke érvényessége az értékelés végétől" },
        { value: "9 hónap", label: "a feltárt hiányosságok lezárására" },
        { value: "10", label: "választható címke" },
        { value: "1 év", label: "ennyivel a lejárat előtt érdemes a megújítást elkezdeni" },
      ],
    },
    {
      key: "process",
      type: "steps",
      nav: "Folyamat",
      label: "A folyamat lépései",
      title: "A TISAX-folyamat lépései",
      items: [
        { title: "Regisztráció", text: "Az ENX portálon: hatókör, telephelyek, címkék. Díjköteles, a telephelyek számától függ." },
        { title: "Önértékelés", text: "Az ISA Excel-katalógus kitöltése: hol tart ma a céged." },
        { title: "Felkészülés", text: "A hiányzó szabályzatok, folyamatok és kontrollok kialakítása, a bizonyítékok összegyűjtése." },
        { title: "Audit szolgáltató", text: "Csak ENX által jóváhagyott szolgáltató értékelhet – ajánlatot több helyről is kérhetsz." },
        { title: "Értékelés és javítás", text: "Kisebb eltérésnél ideiglenes címke kérhető; a hiányosságokat legfeljebb 9 hónap alatt kell lezárni." },
        { title: "Címke", text: "Az eredmény az ENX portálra kerül (nem nyilvános), és te döntöd el, kivel osztod meg." },
      ],
    },
    {
      key: "cta",
      type: "cta",
      label: "Köztes ajánlatkérés",
      title: "Nézzük meg, mennyi munka van hátra",
      text: "Egy rövid egyeztetésen felmérem, milyen címke kell és hol tart ma a céged, és fix ajánlatot adok a felkészítésre.",
      cta: "Kérj ajánlatot",
    },
    {
      key: "help",
      type: "checklist",
      nav: "Hogyan segítek?",
      label: "Hogyan segítek",
      title: "Hogyan segítek?",
      items: [
        { text: "Hatókör és címkék meghatározása a megrendelő elvárásai alapján" },
        { text: "GAP-elemzés az ISA követelményei mentén" },
        { text: "Szabályzatok, eljárások és kontrollok bevezetése – gyakorlatias formában" },
        { text: "Az ISA-önértékelés kitöltése és a bizonyítékok összeállítása" },
        { text: "Felkészítés az értékelésre és jelenlét az auditon" },
        { text: "Javítási terv a feltárt eltérésekre" },
      ],
      note: "Az a cég, amelyik korábban tanácsot adott neked, nem lehet az audit szolgáltatód – a felkészítő és az értékelő mindig két külön szereplő. Én a te oldaladon állok.",
    },
    {
      key: "nis2",
      type: "prose",
      label: "TISAX és NIS2",
      title: "TISAX és NIS2 egyben",
      body: mdToDoc(`
A gyártási ágazat – köztük a gépjárműgyártás – a kiberbiztonsági törvény hatálya alá is tartozik, így egy közép- vagy nagyvállalat beszállító gyakran **NIS2-köteles is**. A két követelményrendszer sok ponton átfed: egy szabályzatrendszer, egy kockázatelemzés, kétféle megfelelés.

Ha információbiztonsági felelősre is szükséged van, azt is vállalom – erről az [információbiztonsági felelős](/informaciobiztonsagi-felelos) oldalon olvashatsz.
`),
    },
  ],
  faqTitle: "Gyakori kérdések",
  faq: [
    {
      question: "Mi a különbség a TISAX és az ISO 27001 között?",
      answer:
        "Az ISO 27001 egy általános, nemzetközi tanúsítás. A TISAX az autóipar saját értékelési rendszere: a VDA ISA katalógusára épül, amely az ISO 27001-re támaszkodik, de prototípus- és adatvédelmi követelményeket is tartalmaz. Az eredménye nem tanúsítvány, hanem címke, amelyet az ENX portálon osztasz meg a partnereiddel.",
    },
    {
      question: "Melyik TISAX-címkére van szükségem?",
      answer:
        "Ezt a megrendelőd határozza meg aszerint, milyen információt, prototípust vagy személyes adatot bíz rád. Ha bizonytalan vagy, a megrendelői elvárások alapján segítek eldönteni, melyik címke és értékelési szint kell.",
    },
    {
      question: "Meddig érvényes a TISAX-címke?",
      answer:
        "Általában három évig, az értékelési folyamat végétől számítva. A megújításhoz a teljes folyamatot újra végig kell járni, ezért érdemes legalább egy évvel a lejárat előtt elkezdeni.",
    },
    {
      question: "Mi történik, ha az értékelés hiányosságot tár fel?",
      answer:
        "Kisebb eltérés esetén javítási tervvel ideiglenes címke is kérhető, a hiányosságokat pedig legfeljebb 9 hónapon belül kell lezárni. Jelentős eltérésnél azonnali kompenzáló intézkedés kell. Ha a 9 hónap letelik, a folyamat elölről kezdődik.",
    },
    {
      question: "Te végzed a TISAX-auditot?",
      answer:
        "Nem: az értékelést csak ENX által jóváhagyott audit szolgáltató végezheti, és az nem lehet olyan cég, amely korábban tanácsot adott neked. Én a felkészítésben, az önértékelésben, a bizonyítékok összeállításában és az auditon való kísérésben segítek.",
    },
    {
      question: "Melyik ISA-verzió szerint értékelnek?",
      answer:
        "Jelenleg az ISA 6 szerint. A 2027. január 1-jétől megrendelt értékelésekre az ISA2027 vonatkozik, és ettől kezdve évente jelenik meg új verzió. Az a verzió számít, amely az első értékelés megrendelésekor érvényes.",
    },
    {
      question: "Mennyibe kerül a TISAX?",
      answer:
        "Három része van: az ENX regisztrációs díja (a telephelyek számától függ), az audit szolgáltató díja és a felkészítés. A felkészítésre egy rövid felmérés után fix ajánlatot adok.",
    },
  ],
};
