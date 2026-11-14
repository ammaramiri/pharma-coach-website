/* =====================================================================
   REZEPTUR · Fall 01 · Erythromycin-Creme 1 % · 30 g
   Quelle: REZ_01_TECHNIK_KOMPLETT.md, Anhang (A), von Ammar am
   14.11.2026 abgenommen. Alle Spielertexte woertlich aus dem Anhang.
   Ausnahme, als TECHNIK markiert: Begruendungen fuer Fehler, zu denen
   der Anhang keinen Satz hat. Sie gehen zur Pruefung an die Rezeptur.
   Alle Personen erfunden. Sprachfolge in jedem Text: de · en · ar.
===================================================================== */
window.REZ_FAELLE = window.REZ_FAELLE || {};
window.REZ_FAELLE["01"] = {
  id:"01", level:"R1",

  /* ---------- Szenen und Etikettlagen (Prozent der Bildflaeche) ---------- */
  szenen: {
    intro:"assets/rezeptur/PCG_REZ01_SCENE_INTRO_v001.webp",
    freigabe:"assets/rezeptur/PCG_REZ01_SCENE_FREIGABE_v002.webp",
    kuehl:"assets/rezeptur/PCG_REZ01_SCENE_KUEHLSCHRANK_v001.webp"
  },
  etiketten: {
    intro: [
      { x0:6.94,  x1:28.47, y0:25.00, y1:33.59, text:"Erythromycin" },
      { x0:39.24, x1:52.08, y0:22.46, y1:34.77, text:"MCT" },
      { x0:65.97, x1:90.97, y0:29.69, y1:35.16, text:"Basiscreme DAC" }
      /* Abgabegefaess offen: x 67.71-97.22, y 64.45-76.17, ohne Text */
    ],
    freigabe: { x0:12.96, x1:25.00, y0:64.06, y1:68.62 },
    kuehl:    { x0:28.13, x1:71.88, y0:44.92, y1:58.59 }
  },

  /* ---------- 0 · Einstieg ---------- */
  intro: {
    de:"Ein Rezepturauftrag liegt auf dem Tisch. Jonas, 16, holt die Creme morgen Nachmittag ab.",
    en:"A compounding order is on the bench. Jonas, 16, will pick up the cream tomorrow afternoon.",
    ar:"وصلتني وصفة تحضير. جوناس، 16 عاماً، سيستلم الكريم غداً بعد الظهر."
  },

  /* ---------- 1 · Rezept (M16) ---------- */
  rezept: {
    r: { kasse:"AOK NordWest", name:"Becker, Jonas", geb:"14.03.2010",
         adresse:"Lindenweg 8, 33428 Harsewinkel", datum:"@gestern",
         verordnung:"Erythromycin 1 % in Basiscreme DAC ad 30,0 g",
         dosis:"2 x tägl. dünn auf die betroffenen Hautstellen auftragen",
         stempel:"Dr. med. Stefan Krüger, Facharzt für Dermatologie" },
    /* kasse steht im Kopf von M16 und ist dort kein Feld (M16.build) */
    offen:["verordnung","dosis","geb","adresse"],
    richtig:["verordnung","dosis"],
    aufgabe:{
      de:"Was genau soll ich herstellen? Markiere die Felder, die ich für die Herstellung brauche.",
      en:"What exactly do I have to make? Mark the fields I need for compounding.",
      ar:"ماذا عليّ أن أحضّر بالضبط؟ أحدّد الحقول التي أحتاجها للتحضير."
    },
    erkl:{
      de:"Wirkstoff, Konzentration, Grundlage und Menge stehen in der Verordnung. Die Dosierung gehört aufs Etikett.",
      en:"Active ingredient, strength, base and quantity are in the prescription line. The dosage goes on the label.",
      ar:"المادة الفعالة والتركيز والقاعدة والكمية في سطر الوصفة. والجرعة ستُكتب على الملصق."
    }
  },

  /* ---------- 2 · Plausibilitaet ---------- */
  plausi: {
    cave:{
      de:"CAVE Erythromycin: In wasserhaltigen Zubereitungen reagiert Erythromycin basisch (pH ca. 10) und zersetzt sich. Stabilitätsoptimum pH 8–8,5. Hydrolyse- und lichtempfindlich.",
      en:"CAVE erythromycin: in water-containing preparations erythromycin reacts alkaline (pH about 10) and degrades. Stability optimum pH 8–8.5. Sensitive to hydrolysis and light.",
      ar:"تنبيه: الإريثرومايسين قاعدي في التحضيرات المائية (pH نحو 10)، فيتحلل. أفضل ثبات له بين pH 8 و8,5. وهو حسّاس للتحلل المائي وللضوء."
    },
    frage:{ de:"Wie gehe ich mit dieser Rezeptur um?", en:"How do I handle this prescription?", ar:"كيف أتعامل مع هذه الوصفة؟" },
    optionen: [
      { id:"a", pfad:"falsch",
        text:{ de:"Ich stelle die Rezeptur genau so her, wie sie verordnet ist.", en:"I make it exactly as prescribed.", ar:"أحضّرها كما كُتبت تماماً." } },
      { id:"b",
        text:{ de:"Ich lehne die Herstellung ab.", en:"I refuse to make it.", ar:"أرفض التحضير." },
        erkl:{ de:"Die Rezeptur ist mit einer einfachen Maßnahme stabil herstellbar. Ablehnen ist hier unverhältnismäßig.",
               en:"A simple measure makes this preparation stable. Refusing is disproportionate here.",
               ar:"إجراء بسيط يجعل التحضير ثابتاً. الرفض هنا مبالغة." } },
      { id:"c",
        text:{ de:"Ich rufe den Arzt an und schlage einen anderen Wirkstoff vor.", en:"I call the doctor and suggest a different active ingredient.", ar:"أتصل بالطبيب وأقترح مادة فعالة أخرى." },
        erkl:{ de:"Der Wirkstoff ist richtig. Das Problem liegt im pH-Wert, und den kann ich selbst korrigieren.",
               en:"The active ingredient is fine. The problem is the pH, and I can correct that myself.",
               ar:"المادة الفعالة صحيحة. المشكلة في الحموضة، وأستطيع تصحيحها بنفسي." } },
      { id:"d", richtig:true,
        text:{ de:"Ich säuere die Basiscreme mit Citronensäure-Lösung 0,5 % an und reibe Erythromycin mit mittelkettigen Triglyceriden an, wie im DAC/NRF-Rezepturhinweis beschrieben.",
               en:"I acidify the base cream with 0.5% citric acid solution and levigate erythromycin with medium-chain triglycerides, as described in the DAC/NRF compounding note.",
               ar:"أحمّض الكريم بمحلول حمض الستريك 0,5%، وأسحق الإريثرومايسين مع الدهون الثلاثية متوسطة السلسلة، كما في إرشاد DAC/NRF." },
        erkl:{ de:"Grundlage und Wirkstoff bleiben gleich, nur Hilfsstoffe kommen hinzu. Dafür ist keine Rücksprache mit dem Arzt nötig.",
               en:"Base and active ingredient stay the same; only excipients are added. No call to the doctor is needed for that.",
               ar:"القاعدة والمادة الفعالة تبقيان كما هما، وتُضاف مواد مساعدة فقط. هذا لا يحتاج اتصالاً بالطبيب." } }
    ]
  },

  /* ---------- Bestandteile und Rechnung ----------
     korrFalsch: Weg ohne Ansaeuerung (Option a), Creme ad 30 g.
     tol: erlaubte Abweichung beim Rechnen (letzte Dezimale). */
  bestandteile: [
    { id:"ery",   name:"Erythromycin",               soll:0.30, faktor:1.050, korr:0.315, nk:3, tol:0.001,
      art:"pulver", falle:0.30 },
    { id:"mct",   name:"Mittelkettige Triglyceride", soll:0.30, korr:0.30,  nk:2, tol:0.01, art:"tropfen",
      etikett:"MCT" },
    { id:"cit",   name:"Citronensäure-Lösung 0,5 %", soll:2.40, korr:2.40,  nk:2, tol:0.01, art:"tropfen",
      nurMitSaeure:true, etikett:"Citronensäure-Lösung 0,5 %" },
    { id:"creme", name:"Basiscreme DAC",             soll:null, ad:30.00, korr:26.99, korrFalsch:29.385, nk:2, tol:0.01,
      art:"creme", etikett:"Basiscreme DAC" }
  ],
  rechnen: {
    aufgabe:{
      de:"Berechne die Einwaagen für 30 g. Der Korrekturfaktor für Erythromycin steht im Prüfzertifikat: 1,050.",
      en:"Calculate the weights for 30 g. The correction factor for erythromycin is on the certificate: 1.050.",
      ar:"أحسب الأوزان لـ 30 g. معامل تصحيح الإريثرومايسين في شهادة التحليل: 1,050."
    },
    hilfe:"Citronensäure-Lösung 0,5 %: 8 g pro 100 g Creme",
    erkl:{
      de:"Erythromycin: 0,30 g × 1,050 = 0,315 g. Citronensäure-Lösung: 8 % von 30 g = 2,40 g. Basiscreme: 30,00 − 0,315 − 0,30 − 2,40 = 26,99 g (ad-Einwaage).",
      en:"Erythromycin: 0.30 g × 1.050 = 0.315 g. Citric acid solution: 8% of 30 g = 2.40 g. Base cream: 30.00 − 0.315 − 0.30 − 2.40 = 26.99 g (made up to weight).",
      ar:"الإريثرومايسين: 0,30 × 1,050 = 0,315 g. محلول الحمض: 8% من 30 g = 2,40 g. الكريم: 30,00 − 0,315 − 0,30 − 2,40 = 26,99 g، أي حتى الوزن الكلي."
    }
  },

  /* ---------- 4 · Wiegen ---------- */
  wiegen: {
    aufgabe:{ de:"Wiege alle Bestandteile ein.", en:"Weigh all ingredients.", ar:"أزن كل المكوّنات." },
    erkl:{
      de:"Kleine Mengen gehören auf die Analysenwaage. Unter der Mindestlast ist eine Waage nicht genau genug.",
      en:"Small amounts go on the analytical balance. Below its minimum load a balance is not accurate enough.",
      ar:"الكميات الصغيرة على الميزان التحليلي. تحت الحد الأدنى للوزن لا يكون الميزان دقيقاً بما يكفي."
    },
    tropfen:0.02, tropfenStreu:0.003,   /* g je Tropfen, kleine Streuung */
    toleranz:0.05                         /* TECHNIK: Abweichung Ist/Soll, ab der ein Fehler gilt */
  },

  /* ---------- 5 · Herstellung ---------- */
  herstellen: {
    anleitung:{
      de:"Erst anreiben, dann die Creme portionsweise einarbeiten, zum Schluss die Citronensäure-Lösung.",
      en:"Levigate first, then work in the cream in portions, add the citric acid solution last.",
      ar:"أسحق أولاً، ثم أدمج الكريم على دفعات، ومحلول الحمض في النهاية."
    },
    einmal:0.8    /* Anteil der Creme in einer Portion, ab dem "alles auf einmal" gilt */
  },

  /* ---------- 6 · Pruefung und Abfuellen ---------- */
  pruefen: {
    frage:{ de:"Ist die Creme homogen und frei von Agglomeraten?", en:"Is the cream homogeneous and free of agglomerates?", ar:"هل الكريم متجانس وخالٍ من الكتل؟" },
    homogen:"homogen, freigeben zur Abfüllung",
    nach:"Agglomerate, nachbearbeiten",
    fuellen:{ de:"Fülle die Creme in die Spenderdose und verschließe sie.", en:"Fill the cream into the dispensing jar and close it.", ar:"أعبّئ الكريم في علبة الصرف وأغلقها." },
    kruke:{ de:"Für wasserhaltige Cremes ist die Spenderdose hygienischer als eine offene Kruke.",
            en:"For water-containing creams a dispensing jar is more hygienic than an open jar.",
            ar:"علبة الصرف أنظف من العلبة المفتوحة للكريمات المائية." },
    ladungen:3
  },

  /* ---------- 7 · Protokoll, Etikett, Freigabe ---------- */
  protokoll: { charge:"R-@datum-01" },
  apotheke:"Apotheke am Lindenplatz · Marktstraße 4 · 33428 Harsewinkel",
  etikett: {
    /* Reihenfolge der Bausteine auf dem Etikett. falle: Fehler, wenn gesetzt. */
    bausteine: [
      { id:"name",   text:"Für Jonas Becker" },
      { id:"zus",    text:"Erythromycin 0,30 g · Mittelkettige Triglyceride · Citronensäure-Lösung 0,5 % · Basiscreme DAC",
        textFalsch:"Erythromycin 0,30 g · Mittelkettige Triglyceride · Basiscreme DAC" },
      { id:"inhalt", text:"Inhalt: 30 g" },
      { id:"dos",    text:"2 x täglich dünn auftragen" },
      { id:"herg",   text:"Hergestellt am: @heute" },
      { id:"verw2",  text:"Verwendbar bis: @plus2" },
      { id:"verw6",  text:"Verwendbar bis: @plus6", falle:true, auto:true },
      { id:"kuehl",  text:"Im Kühlschrank lagern (2–8 °C)" },
      { id:"raum",   text:"Bei Raumtemperatur lagern", falle:true },
      { id:"licht",  text:"Vor Licht geschützt aufbewahren" },
      { id:"apo",    text:"@apotheke" }
    ],
    erkl:{
      de:"Der automatische Vorschlag von 6 Monaten gilt nicht für diese Zubereitung. Für Erythromycin-Creme gelten 2 Monate im Kühlschrank.",
      en:"The automatic suggestion of 6 months does not apply here. Erythromycin cream keeps for 2 months in the refrigerator.",
      ar:"اقتراح الستة أشهر الآلي لا ينطبق على هذا التحضير. كريم الإريثرومايسين صالح شهرين في الثلاجة."
    }
  },
  falscherWeg:{
    de:"Ohne Ansäuerung zersetzt sich Erythromycin in der Creme. Die Creme sieht einwandfrei aus, verliert aber ihre Wirkung, lange bevor sie aufgebraucht ist. Sorgfältig hergestellt, aber nicht abgabefähig.",
    en:"Without acidification erythromycin degrades in the cream. The cream looks perfect but loses its effect long before it is used up. Carefully made, but not fit for dispensing.",
    ar:"بلا تحميض يتحلل الإريثرومايسين داخل الكريم. الكريم يبدو سليماً تماماً، لكنه يفقد فعاليته قبل أن يُستهلك بوقت طويل. تحضير متقن، لكنه غير صالح للصرف."
  },

  /* ---------- Fehler: Station, Gewicht, Begruendung ----------
     grund verweist auf einen Text oben (Pfad) oder steht hier selbst.
     TECHNIK = Satz von Technik, nicht aus dem Anhang. */
  fehler: {
    rechnen:     { st:3, art:"voll", grund:"rechnen.erkl" },
    faktor:      { st:3, art:"voll", grund:"rechnen.erkl" },
    mindestlast: { st:4, art:"voll", grund:"wiegen.erkl" },
    tara:        { st:4, art:"voll", grund:{ /* TECHNIK */
      de:"Ohne Tara wiegt die Waage das Gefäß mit. Die Einwaage im Protokoll stimmt dann nicht.",
      en:"Without taring, the balance weighs the container too. The weight in the record is then wrong.",
      ar:"بلا تصفير يزن الميزان الوعاء أيضاً، فيصير الوزن في المحضر خاطئاً." } },
    instabil:    { st:4, art:"voll", grund:{ /* TECHNIK */
      de:"Bei offener Tür kommt die Anzeige nicht zur Ruhe. Übernommen wird nur ein stabiler Wert.",
      en:"With the door open the reading never settles. Only a stable value is accepted.",
      ar:"والباب مفتوح لا تستقر القراءة. لا تُعتمد إلا قراءة مستقرة." } },
    rueckgabe:   { st:4, art:"voll", grund:{ /* TECHNIK */
      de:"Was einmal entnommen ist, geht nicht zurück ins Vorratsgefäß. Sonst wird der Vorrat verunreinigt.",
      en:"Nothing taken out goes back into the stock container. It would contaminate the stock.",
      ar:"ما أُخذ من العبوة لا يعود إليها، وإلا تلوّث المخزون." } },
    offen:       { st:4, art:"leicht", grund:{ /* TECHNIK, nach der Regel im Anhang: feuchtigkeitsempfindlich */
      de:"Erythromycin ist feuchtigkeitsempfindlich. Das Standgefäß wird nach der Entnahme gleich wieder verschlossen.",
      en:"Erythromycin is sensitive to moisture. The stock container is closed again right after use.",
      ar:"الإريثرومايسين حسّاس للرطوبة. تُغلق العبوة مباشرة بعد الأخذ منها." } },
    toleranz:    { st:4, art:"voll", grund:{ /* TECHNIK */
      de:"Die Einwaage weicht um mehr als 5 % vom Sollwert ab.",
      en:"The weighed amount differs from the target by more than 5%.",
      ar:"الوزن الفعلي يبتعد عن المطلوب بأكثر من 5%." } },
    anreiben:    { st:5, art:"voll", grund:"herstellen.anleitung" },
    einmal:      { st:5, art:"voll", grund:"herstellen.anleitung" },
    abschaben:   { st:5, art:"voll", grund:"herstellen.anleitung" },
    saeure:      { st:5, art:"voll", grund:"herstellen.anleitung" },
    homogen:     { st:6, art:"voll", grund:{ /* TECHNIK */
      de:"Die Creme zeigt Agglomerate. Sie wird nachbearbeitet, nicht abgefüllt.",
      en:"The cream shows agglomerates. It is reworked, not filled.",
      ar:"في الكريم كتل. يُعاد العمل عليه ولا يُعبّأ." } },
    unnoetig:    { st:6, art:"leicht", grund:{ /* TECHNIK */
      de:"Die Creme war bereits homogen.",
      en:"The cream was already homogeneous.",
      ar:"كان الكريم متجانساً أصلاً." } },
    kruke:       { st:6, art:"leicht", grund:"pruefen.kruke" },
    etikettFalle:{ st:7, art:"voll", grund:"etikett.erkl" },
    etikettFehlt:{ st:7, art:"leicht", grund:{ /* TECHNIK */
      de:"Auf dem Etikett fehlt eine Pflichtangabe.",
      en:"A required item is missing from the label.",
      ar:"ينقص الملصق بيان إلزامي." } }
  },

  /* ---------- Punkte (Brief §4) ---------- */
  punkte: { rezept:25, plausi:25, rechnen:25, wiegen:25, herstellen:25, pruefen:25, etikett:25, freigabe:25 }
};
