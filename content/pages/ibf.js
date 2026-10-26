// IBF-aloldal alapszövegei (→ cms.manifest.js, élesben az Ügyfél Adminból jön). Blokk-típusok: components/service-page/blocks.jsx.
// Forrás: projektek/ibf-aloldal-szovegtervezet.md. Balázs válaszaiig a nyitott pontok semleges szöveggel szerepelnek
// (ár, havi óraszám, végzettség-mondat, DPO-vállalás). Jogi hivatkozások: 2024. évi LXIX. tv., 17/2025. (VII. 24.) EM r.
import { mdToDoc } from "../../lib/md-doc";

export const IBF = {
  path: "/informaciobiztonsagi-felelos",
  seo: {
    title: "Információbiztonsági felelős (IBF) kiszervezve | Cyber Beaver",
    description:
      "Kiszervezett információbiztonsági felelős havidíjas alapon: kinek kötelező, mik a feladatai, milyen végzettség kell – és hogyan veszem le a terhet a válladról.",
  },
  // OG-kép sorai (kódban, nem CMS)
  og: { highlight: "Kiszervezett", title: "információbiztonsági felelős (IBF)" },
  hero: {
    eyebrow: "Szolgáltatás",
    title: "Kiszervezett információbiztonsági felelős (IBF)",
    lead: mdToDoc(`
A kiberbiztonsági törvény alá tartozó szervezeteknek kötelező információbiztonsági felelőst kijelölniük, és a törvény szerint ez külső szakértő is lehet. Havidíjas alapon, személyesen látom el ezt a szerepet.
`),
    cta: "Kérj ajánlatot",
  },
  blocks: [
    {
      key: "who",
      type: "cards",
      nav: "Kinek kötelező?",
      label: "Kinek kötelező",
      title: "Kinek kötelező információbiztonsági felelőst kijelölni?",
      intro:
        "A 2024. évi LXIX. törvény (a NIS2 irányelv magyar átültetése) 2025. január 1. óta kötelezővé teszi az IBF kijelölését a hatálya alá tartozó szervezeteknél:",
      items: [
        { icon: "building", title: "Közigazgatási szervek", text: "Minisztériumok, kormányhivatalok, önkormányzati hivatalok – méretüktől függetlenül." },
        { icon: "bank", title: "Állami többségű cégek", text: "Legalább 50 fő, vagy 10 millió eurót meghaladó árbevétel és mérlegfőösszeg esetén." },
        {
          icon: "factory",
          title: "Érintett ágazatok cégei",
          text: "Energia, közlekedés, pénzügy, egészségügy, ivóvíz, digitális infrastruktúra, gyártás, élelmiszeripar és más ágazatok közép- és nagyvállalatai.",
        },
        { icon: "signal", title: "Méretüktől függetlenül", text: "Távközlési és bizalmi szolgáltatók, DNS-szolgáltatók, domainregisztrátorok." },
        { icon: "badge", title: "Kijelölt szervezetek", text: "A hatóság által alapvetőnek vagy fontosnak azonosított szervezetek és a honvédelmi érdekű cégek." },
      ],
      note: "Nem vagy biztos benne, hogy rátok vonatkozik? Egy rövid egyeztetésen megnézem a tevékenységi kört, a létszámot és az árbevételt, és megmondom, mi a teendő.",
      noteCta: "Nézzük meg együtt",
    },
    {
      key: "tasks",
      type: "checklist",
      nav: "Feladatai",
      label: "Feladatai",
      title: "Mik az információbiztonsági felelős feladatai?",
      intro:
        "A törvény szerint az IBF felel a rendszerek védelméért, működteti a kockázatmenedzsmentet, és tartja a kapcsolatot az incidenskezelő központtal. A gyakorlatban kiszervezett IBF-ként ezeket végzem:",
      items: [
        { text: "Információbiztonsági szabályzatok, eljárásrendek és a biztonsági osztályba sorolás elkészítése, karbantartása" },
        { text: "Kockázatelemzés és üzletmenet-folytonossági tervezés" },
        { text: "Munkatársi tudatossági oktatás" },
        { text: "Kapcsolattartás a hatósággal, audit-támogatás, a jogszabályváltozások követése" },
        { text: "Incidenskezelés támogatása, a releváns sérülékenységek nyomon követése" },
        { text: "Vezetői döntéstámogatás: ott vagyok, amikor új rendszert vezettek be, beszállítót választotok vagy fejlesztésbe kezdtek" },
      ],
      note: "A felelősség kiszervezéskor is a vezetőnél marad – az én dolgom, hogy megalapozott döntésekre és rendben tartott dokumentációra épüljön.",
    },
    {
      key: "numbers",
      type: "stats",
      label: "Fontos számok",
      title: "Fontos határidők és számok",
      items: [
        { value: "30 nap", label: "az IBF adatainak bejelentésére a hatóságnak" },
        { value: "14 nap", label: "az adatok változásának bejelentésére" },
        { value: "20 óra", label: "évente kötelező továbbképzés (állami és kijelölt körben)" },
        { value: "2027 végéig", label: "elég 5 év szakmai tapasztalat a szakképzettség helyett" },
      ],
    },
    {
      key: "requirements",
      type: "duo",
      nav: "Végzettség",
      label: "Végzettség",
      title: "Milyen végzettség kell az információbiztonsági felelőshöz?",
      intro: "A követelmény attól függ, milyen típusú szervezetről van szó:",
      items: [
        {
          title: "Állami és kijelölt szervezeteknél",
          points:
            "Felsőfokú végzettség\nElfogadott szakképzettség – 2027. december 31-ig helyette 5 év szakmai tapasztalat is elég\nÉvi legalább 20 óra továbbképzés\nA hatóság megvizsgálja és nyilvántartásba veszi",
        },
        {
          title: "NIS2-es vállalkozásoknál",
          points:
            "Jogi minimum: cselekvőképes, büntetlen előéletű\nA gyakorlatban: kockázatkezelés, szabályzatok és az auditori elvárások ismerete\nEnélkül az IBF csak papíron létezik",
        },
      ],
      note: "A részletes szabályokat a 17/2025. (VII. 24.) EM rendelet tartalmazza.",
    },
    {
      key: "compare",
      type: "compare",
      nav: "Belsős vagy külsős?",
      label: "Belsős vagy kiszervezett",
      title: "Belsős vagy kiszervezett?",
      intro: "A törvény mindkettőt megengedi: a vezető kijelölhet belső munkatársat, vagy megállapodhat egy külső szakértővel.",
      colA: "Belsős",
      colB: "Kiszervezett",
      rows: [
        { label: "Költség", a: "Teljes állású bér és járulékok", b: "Kiszámítható havidíj" },
        { label: "Függetlenség", a: "Állami és alapvető szervezeteknél nem lehet IT-üzemeltető vagy gazdasági vezető", b: "Külső szakértő, nincs összeférhetetlenség" },
        { label: "Tapasztalat", a: "Egy szervezet rálátása", b: "Több iparág és audit tapasztalata" },
        { label: "Folytonosság", a: "Szabadság, betegség, felmondás megakaszthatja", b: "Folyamatos ellátás" },
      ],
      note: "Kiszervezéskor is meg kell nevezni, ki látja el ténylegesen a feladatot. Nálam ez mindig én vagyok.",
    },
    {
      key: "cta",
      type: "cta",
      label: "Köztes ajánlatkérés",
      title: "Beszéljük át, mire van szükségetek",
      text: "Egy rövid egyeztetésen felmérem, hol tartotok, és fix havidíjas ajánlatot adok – rejtett költségek nélkül.",
      cta: "Kérj ajánlatot",
    },
    {
      key: "process",
      type: "steps",
      nav: "Hogyan dolgozom?",
      label: "Hogyan dolgozom",
      title: "Hogyan dolgozom?",
      items: [
        { title: "Felmérés", text: "Rendszerek, meglévő szabályzatok, kockázatok és jogszabályi kötelezettségek." },
        { title: "Alapok lerakása", text: "Biztonsági osztályba sorolás, információbiztonsági szabályzat, eljárásrendek, kockázatelemzés." },
        { title: "Folyamatos működtetés", text: "Havidíjas alapon: egyeztetések, döntéstámogatás, oktatás, incidenskezelés, naprakész dokumentáció." },
        { title: "Audit és hatóság", text: "Felkészítés az auditra, kapcsolattartás a hatósággal, a megállapítások javítása." },
      ],
    },
    {
      key: "why",
      type: "trust",
      nav: "Miért én?",
      label: "Miért engem",
      title: "Miért engem válassz?",
      stats: [
        { value: "10+ év", label: "a Big4-ban információbiztonság, adatvédelem és IT audit területen" },
        { value: "2025–", label: "IBF-ként egy hazai energiacégnél" },
        { value: "CIPM", label: "adatvédelmi tanúsítvány (IAPP)" },
      ],
      points: [
        { text: "Bankoknál NIST CSF érettségelemzés és DORA GAP-elemzés" },
        { text: "KKV-knál NIS2 felkészítés" },
        { text: "NIS2 auditokban alvállalkozóként – tudom, mire figyel az auditor" },
      ],
      quote: "Big4-os precizitás, egy kisvállalkozás gyorsaságával: velem dolgozol, nem egy kijelölt junior kollégával.",
    },
  ],
  faqTitle: "Gyakori kérdések",
  // A havi óraszám kérdése Balázs válaszáig kimarad (tervezet: projektek/ibf-aloldal-szovegtervezet.md).
  faq: [
    {
      question: "Mi az az információbiztonsági felelős (IBF)?",
      answer:
        "Az információbiztonsági felelős – a törvény nyelvén az elektronikus információs rendszer biztonságáért felelős személy – összefogja és felügyeli egy szervezet információbiztonsági feladatait, a kockázatkezeléstől az incidensek bejelentéséig. A kiberbiztonsági törvény hatálya alá tartozó szervezeteknek kötelező ilyen személyt kijelölniük.",
    },
    {
      question: "Kötelező-e a cégünknek információbiztonsági felelőst kijelölni?",
      answer:
        "Ha a szervezet a 2024. évi LXIX. törvény hatálya alá tartozik, igen. Ez minden közigazgatási szervre, a többségi állami cégek egy részére és az érintett ágazatokban működő közép- és nagyvállalatokra vonatkozik, egyes szolgáltatókra (pl. távközlés, bizalmi szolgáltatás) méretüktől függetlenül. Ha nem vagy biztos benne, egy rövid egyeztetésen megnézzük.",
    },
    {
      question: "Lehet-e külső szakértő az információbiztonsági felelős?",
      answer:
        "Igen. A törvény szerint a szervezet vezetője az IBF-et a szervezeten belül is kijelölheti, vagy külső személlyel is köthet rá megállapodást. Ilyenkor is meg kell nevezni a feladatot ténylegesen ellátó természetes személyt.",
    },
    {
      question: "Mennyibe kerül egy kiszervezett információbiztonsági felelős?",
      answer:
        "A havidíj a szervezet méretétől, a rendszerek számától és a szükséges rendelkezésre állástól függ. Egy rövid felmérés után fix havidíjas ajánlatot adok – rejtett költségek nélkül.",
    },
    {
      question: "Mi a különbség az információbiztonsági felelős és az adatvédelmi tisztviselő (DPO) között?",
      answer:
        "Az adatvédelmi tisztviselőt a GDPR írja elő, és a személyes adatok védelmére figyel. Az információbiztonsági felelőst a kiberbiztonsági törvény, és a szervezet elektronikus információs rendszereinek biztonságáért felel – nemcsak a személyes adatokért, hanem minden rendszerért és adatért. A két terület sok ponton összeér.",
    },
    {
      question: "Kell-e helyettest is kijelölni?",
      answer:
        "A törvény szerint indokolt esetben – például az IBF tartós távolléte vagy akadályoztatása esetére – helyettes is kijelölhető; rá ugyanazok a szabályok vonatkoznak, mint az IBF-re. Hogy nálatok szükséges-e, az a szervezet méretén és kockázatain múlik.",
    },
    {
      question: "Mit és mikor kell bejelenteni a hatóságnak?",
      answer:
        "A szervezet az IBF adatait a törvény hatálya alá kerülésétől számított 30 napon belül bejelenti a hatóságnak (a NIS2 alá tartozó vállalkozások az SZTFH-nak), az adatok változását pedig 14 napon belül. A bejelentést kiszervezett IBF-ként előkészítem.",
    },
    {
      question: "Mi történik, ha nincs információbiztonsági felelősünk?",
      answer:
        "A hatóság először figyelmeztet és határidőt szab, majd bírságot szabhat ki – a szervezet vezetőjére is. Súlyosabb esetben információbiztonsági felügyelőt rendelhet ki a szervezet költségére. Ennél olcsóbb és nyugodtabb megoldás időben kijelölni a felelőst.",
    },
  ],
};
