// IBF-aloldal alapszövegei (→ cms.manifest.js, élesben az Ügyfél Adminból jön).
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
Az információbiztonsági felelős (IBF) – a törvény nyelvén az *elektronikus információs rendszer biztonságáért felelős személy* – az a szakember, aki egy szervezetnél összefogja és felügyeli az információbiztonsági feladatokat, a kockázatkezeléstől az incidensek bejelentéséig. A kiberbiztonsági törvény hatálya alá tartozó szervezeteknek kötelező ilyen személyt kijelölniük – és ez a szerep **külső szakértőre is bízható**.

Kiszervezett IBF-ként havidíjas alapon látom el ezt a szerepet, Big4-ban szerzett több mint 10 év tapasztalattal.
`),
    cta: "Kérj ajánlatot",
  },
  sections: [
    {
      title: "Kinek kötelező információbiztonsági felelőst kijelölni?",
      body: mdToDoc(`
A 2024. évi LXIX. törvény (Magyarország kiberbiztonságáról – a NIS2 irányelv magyar átültetése) 2025. január 1-je óta hatályos. A hatálya alá tartozó szervezet vezetőjének ki kell neveznie vagy meg kell bíznia az információbiztonsági felelőst. A törvény alá tartozik többek között:

- **minden közigazgatási szerv** – például minisztériumok, kormányhivatalok, önkormányzati hivatalok;
- a **többségi állami tulajdonú cégek**, ha legalább 50 főt foglalkoztatnak, vagy az árbevételük és mérlegfőösszegük meghaladja a 10 millió eurót;
- a törvény mellékleteiben felsorolt ágazatokban – például energia, közlekedés, bank- és pénzügy, egészségügy, ivóvíz, digitális infrastruktúra, gyártás, élelmiszeripar, hulladékgazdálkodás – működő **közép- és nagyvállalatok** (nagyjából 50 főtől vagy 10 millió eurós árbevételtől);
- **méretüktől függetlenül** például a távközlési szolgáltatók, bizalmi szolgáltatók, DNS-szolgáltatók és domainregisztrátorok;
- a hatóság által **alapvető vagy fontos szervezetként azonosított** szervezetek, valamint a honvédelmi érdekű tevékenységet végző cégek.

**Nem vagy biztos benne, hogy rátok vonatkozik?** Egy rövid egyeztetésen megnézem a tevékenységi kört, a létszámot és az árbevételt, és megmondom, érintett-e a céged – és ha igen, mi a teendő.
`),
    },
    {
      title: "Mik az információbiztonsági felelős feladatai?",
      body: mdToDoc(`
A törvény szerint az IBF felel az elektronikus információs rendszerek védelmével kapcsolatos feladatokért, működteti a kockázatmenedzsment-keretrendszert, és ő tartja a kapcsolatot az incidenskezelő központtal – beleértve a kiberbiztonsági incidensek bejelentését. A gyakorlatban kiszervezett IBF-ként ezeket végzem:

- **Információbiztonsági irányítási rendszer** és a kapcsolódó dokumentáció elkészítése és karbantartása – szabályzatok, eljárásrendek, biztonsági osztályba sorolás.
- **Kockázatelemzés**, tudatossági oktatás és üzletmenet-folytonossági tervezés.
- **Kapcsolattartás a hatósággal**, audit-támogatás, a jogszabályi változások követése.
- **Incidenskezelés támogatása**, a releváns sérülékenységek nyomon követése.
- **Vezetői döntéstámogatás:** a törvény szerint az IBF-et minden információbiztonságot érintő döntés előkészítésébe be kell vonni – ott vagyok, amikor új rendszert vezettek be, beszállítót választotok vagy fejlesztésbe kezdtek.

Fontos: a felelősség kiszervezés esetén is a szervezet vezetőjénél marad. Az én dolgom, hogy ez a felelősség megalapozott döntéseken és rendben tartott dokumentáción nyugodjon.
`),
    },
    {
      title: "Milyen végzettség kell az információbiztonsági felelőshöz?",
      body: mdToDoc(`
A követelmény attól függ, milyen típusú szervezetről van szó:

- **Közigazgatási szerveknél, többségi állami cégeknél, a hatóság által azonosított alapvető és fontos szervezeteknél** (és néhány további körben) a törvény és a 17/2025. (VII. 24.) EM rendelet szerint az IBF **felsőfokú végzettségű** legyen, és rendelkezzen a nemzeti koordinációs központ által elfogadott **szakképzettséggel** – ennek hiányában **2027. december 31-ig legalább ötéves** információbiztonsági szakmai tapasztalat is elfogadható. Évente **legalább 20 óra továbbképzés** kötelező (a 2025 végéig kinevezett IBF-eknek először 2026. december 31-ig). A hatóság megvizsgálja, hogy a kijelölt személy megfelel-e, és nyilvántartásba veszi.
- **A NIS2 miatt érintett vállalkozásoknál** a törvény ennél kevesebbet ír elő: az IBF legyen cselekvőképes és büntetlen előéletű. Ez azonban csak a jogi minimum – a szerepet érdemben csak az tudja ellátni, aki érti a kockázatkezelést, a szabályzatokat és az auditori elvárásokat.
`),
    },
    {
      title: "Belsős vagy kiszervezett IBF?",
      body: mdToDoc(`
A törvény kifejezetten megengedi, hogy a szervezet vezetője az IBF-et **a szervezeten belül jelölje ki, vagy külső személlyel kössön rá megállapodást**. Hogy melyik a jobb, az a szervezet méretén és érettségén múlik – a legtöbb szervezetnek nincs szüksége teljes állású IBF-re, de szüksége van egy tapasztalt szakemberre, aki biztosítja a megfelelést.

**Miért éri meg kiszervezni?**

- **Kiszámítható költség:** havidíj egy teljes állású szakember bére helyett.
- **Függetlenség:** állami és alapvető szervezeteknél a törvény szerint az IBF nem lehet a gazdasági vezető, sem informatikai üzemeltető vagy fejlesztő, sem az ő beosztottjuk. Egy külső szakértőnél ez az összeférhetetlenség eleve nem áll fenn.
- **Rálátás:** sok szervezet és iparág tapasztalatát hozom – tudom, mit kérdeznek az auditorok, és mi működik a gyakorlatban.
- **Folytonosság:** nem áll meg a megfelelés szabadság, betegség vagy felmondás miatt.

Kiszervezés esetén is meg kell nevezni azt a természetes személyt, aki a feladatot ténylegesen ellátja – nálam ez mindig én vagyok, személyesen.
`),
    },
    {
      title: "Hogyan dolgozom?",
      body: mdToDoc(`
1. **Felmérés** – megnézem, hol tart ma a szervezet: rendszerek, meglévő szabályzatok, kockázatok, jogszabályi kötelezettségek.
2. **Alapok lerakása** – biztonsági osztályba sorolás, információbiztonsági szabályzat, eljárásrendek, kockázatelemzés.
3. **Folyamatos működtetés (havidíj)** – rendszeres egyeztetések, döntéstámogatás, oktatás, incidenskezelés, a dokumentáció naprakészen tartása.
4. **Audit és hatóság** – felkészítés az auditra, kapcsolattartás a hatósággal, a megállapítások javítása.
`),
    },
    {
      title: "Miért engem válassz?",
      body: mdToDoc(`
- **Több mint 10 év a Big4-ban** információbiztonság, adatvédelem és IT audit területén.
- **Jelenleg is IBF-ként** támogatom egy hazai energiacég megfelelését (2025–).
- **Bankoknál** NIST CSF alapú érettségelemzés és DORA GAP-elemzés, **KKV-knál** NIS2 felkészítés.
- **NIS2 auditokban** alvállalkozóként is részt vettem – tudom, mire figyel az auditor.
- **CIPM** (Certified Information Privacy Manager) tanúsítvány.
- Big4-os precizitás, egy kisvállalkozás gyorsaságával és közvetlenségével: **velem dolgozol, nem egy kijelölt junior kollégával.**
`),
    },
  ],
  faqTitle: "Gyakori kérdések",
  // A havi óraszám kérdése Balázs válaszáig kimarad (tervezet: projektek/ibf-aloldal-szovegtervezet.md).
  faq: [
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
