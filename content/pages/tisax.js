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
A TISAX (*Trusted Information Security Assessment Exchange*) az autóipar egységes információbiztonsági értékelése. Ha a megrendelőd TISAX-címkét kér, egy ENX által jóváhagyott audit szolgáltató értékeli a céged, az eredményt pedig az ENX portálon osztod meg – **egyszer értékelnek, sok partner elfogadja**.

Több ügyfelemet segítettem már sikeres TISAX-címke elérésében: a hatókör meghatározásától a hiányosságok javításáig végigkísérlek a folyamaton.
`),
    cta: "Kérj ajánlatot",
  },
  sections: [
    {
      title: "Kinek kell TISAX?",
      body: mdToDoc(`
A TISAX-ot jellemzően a megrendelő kéri: egy gépjárműgyártó vagy egy nagyobb beszállító attól a partnerétől, akivel bizalmas információt, prototípust vagy személyes adatot oszt meg. Tipikusan érintett:

- **autóipari beszállítók** – alkatrész- és rendszergyártók;
- **mérnöki és fejlesztő cégek**, amelyek a megrendelő terveivel, adataival dolgoznak;
- **IT- és szoftverszolgáltatók** autóipari ügyfeleknek;
- **prototípusokkal dolgozó cégek** – gyártás, tesztelés, szállítás, rendezvények.

Ha a megrendelőd TISAX-címkét kér, azt is megmondja, melyik címkére van szüksége – ettől függ az értékelés szintje és a felkészülés mélysége.
`),
    },
    {
      title: "Értékelési szintek és címkék",
      body: mdToDoc(`
A TISAX a VDA ISA (Information Security Assessment) követelménykatalógusára épül – ma az **ISA 6** érvényes, a 2027. január 1-jétől megrendelt értékelésekre pedig az **ISA2027** vonatkozik. Címkét két szinten lehet szerezni:

- **AL2 (2-es értékelési szint):** az audit szolgáltató ellenőrzi az önértékelést és a bizonyítékokat, az információbiztonsági felelőssel jellemzően videóhívásban egyeztet.
- **AL3 (3-as értékelési szint):** alapos, helyszíni ellenőrzés – dokumentumok, bizonyítékok, interjúk a folyamatgazdákkal és a helyszíni körülmények vizsgálata.

A választható címkék (az ENX hivatalos angol elnevezésével):

- **Confidential / Strictly confidential** – bizalmas, illetve szigorúan bizalmas információ védelme (AL2 / AL3);
- **High availability / Very high availability** – magas, illetve nagyon magas rendelkezésre állás (AL2 / AL3);
- **Proto parts / Proto vehicles** – prototípus-alkatrészek, illetve prototípus-járművek védelme (AL3);
- **Test vehicles / Proto events** – tesztjárművek, illetve prototípus-rendezvények és -fotózások (AL2);
- **Data / Special data** – személyes adatok, illetve különleges adatok kezelése a megrendelő megbízásából (AL2 / AL3).
`),
    },
    {
      title: "A TISAX-folyamat lépései",
      body: mdToDoc(`
1. **Regisztráció az ENX portálon** – a hatókör, a telephelyek és a szükséges címkék megadása. A regisztráció díjköteles, a díj a telephelyek számától függ.
2. **Önértékelés** – az ISA Excel-katalógus kitöltése: hol tart ma a céged az egyes követelményekben.
3. **Felkészülés** – a hiányzó szabályzatok, folyamatok és kontrollok kialakítása, a bizonyítékok összegyűjtése.
4. **Audit szolgáltató kiválasztása** – csak ENX által jóváhagyott szolgáltató értékelhet, ajánlatot több helyről is kérhetsz.
5. **Értékelés** – az eredmény lehet megfelelő, kisebb vagy jelentős eltérés. Kisebb eltérésnél ideiglenes címke is kérhető.
6. **Javítás** – a feltárt hiányosságokat legfeljebb 9 hónapon belül le kell zárni, különben a folyamat elölről kezdődik.
7. **Címke és megosztás** – az eredmény az ENX portálra kerül (nem nyilvános), és te döntöd el, kivel osztod meg. A címke általában **3 évig érvényes**; a megújítást érdemes egy évvel a lejárat előtt elkezdeni.
`),
    },
    {
      title: "Hogyan segítek?",
      body: mdToDoc(`
- **Hatókör és címkék** – a megrendelő elvárásai alapján meghatározzuk, milyen címkére és szintre van szükséged, és melyik telephelyekre.
- **GAP-elemzés** – az ISA követelményei mentén felmérem, mi hiányzik még.
- **Bevezetés** – szabályzatok, eljárások és kontrollok, gyakorlatias formában, hogy a mindennapokban is működjenek.
- **Önértékelés és bizonyítékok** – segítek kitölteni az ISA-katalógust és összeállítani a bizonyítékokat.
- **Audit-támogatás** – felkészítés az értékelésre, jelenlét az auditon, és a javítási terv a feltárt eltérésekre.

Az a cég, amelyik korábban tanácsot adott neked, nem lehet az audit szolgáltatód – a felkészítő és az értékelő tehát mindig két külön szereplő. Én a te oldaladon állok.
`),
    },
    {
      title: "TISAX és NIS2",
      body: mdToDoc(`
Sok autóipari beszállítónak nem csak a TISAX a feladata: a gyártási ágazat – köztük a gépjárműgyártás – a kiberbiztonsági törvény hatálya alá is tartozik, így egy közép- vagy nagyvállalat beszállító gyakran NIS2-köteles is. A két követelményrendszer sok ponton átfed, ezért érdemes egyben kezelni őket: egy szabályzatrendszer, egy kockázatelemzés, kétféle megfelelés.

Ha emellett információbiztonsági felelősre is szükséged van, azt is vállalom – erről az [információbiztonsági felelős](/informaciobiztonsagi-felelos) oldalon olvashatsz.
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
