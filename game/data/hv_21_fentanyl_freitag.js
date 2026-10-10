/* =====================================================================
   HV-TISCH · CUS021 · Thomas Krämer · fentanyl_freitag
   Umgestellt von Büro-Fall (BtM B3) auf Kundenfall am HV-Tisch · 10.10.2026
   Quelle: Fachkonzept BtM-1 (Unterhaltung BtM, 02.-07.10.2026), von Ammar abgenommen
   Recht: BtMVV §§ 9, 12, 14 (Stand Gesetzestext 2026) · Rahmenvertrag § 9 Abs. 3
   Packungsdaten echt (ABDA, Stand 02.10.2026). Personen, Praxis, Kasse, Nummern konstruiert.
   Datum im Fall: ausgestellt Di 13.10.26, vorgelegt Fr 16.10.26
   Punkte: 0 + 25x6 + 50 = 200 · Fachinhalt unveraendert
   Benoetigt: BTM.build (doc type "btm") · Atlas "angeh" in PC_CUSTOMER_ATLASES (ohne Eigennamen, Beschluss 10.10.2026)
===================================================================== */

var KRAEMER_REZ = { logo:'retax_logo_nordwaldt_kasse.webp', kasse:'Nordwaldt Kasse',
  ktk:'103411401', name:'Krämer, Walter', geb:'03.04.44',
  adresse:'Lindenweg 12, 59609 Anröchte', vers:'K204518833', status:'5',
  bsnr:'123456700', lanr:'987654321', datum:'13.10.26',
  rezeptnr:'MUSTER 0000 0001', teil:'I',
  verordnung:'Fentanyl Matrixpflaster 25 µg/h', menge:'10 St. (zehn)',
  gebrauch:'alle 3 Tage 1 Pflaster wechseln', kennz:'',
  stempel:'Dr. med. Jürgen Haller\nAllgemeinmedizin\nMarktstraße 4\n59609 Anröchte\nTel. 02947-481120',
  unterschrift:'Haller',
  apo:'', abgabedatum:'', zeichen:'', vermerk:'' };

/* Teil I nach der Abgabe am Freitagabend: Zeichen und Vermerk fehlen (Schritt 7) */
var KRAEMER_REZ_ABGABE = objWith(KRAEMER_REZ, {
  apo:'Apotheke am Markt\nMarktstraße 9, 59609 Anröchte',
  abgabedatum:'16.10.26', zeichen:'', vermerk:'' });

var KRAEMER_PKG = {
  a25:"assets/PCG_PKG_CUS021_1A25_v001.webp",
  al25:"assets/PCG_PKG_CUS021_AL25_v001.webp",
  a50:"assets/PCG_PKG_CUS021_1A50_v001.webp" };

/* Vertrauen: jede Entscheidung wirkt auf Thomas. 100 = ruhig, 0 = er geht.
   Die Zahlen sind Vorschlag der Leitung, Technik darf sie an die
   bestehende Kundenmechanik angleichen. */
var KRAEMER_TRUST = {
  start: 60,
  steps: { s2:+10, s3:+10, s4:+15, s5:-10, s6:+10, s7:+5, s8:+10 },
  wrong: -10,
  faces: { hoch:"assets/PCG_CU_CUS021_P06_CU-HAPPY_v001.webp",
           mittel:"assets/PCG_CU_CUS021_P04_CU-NEUTRAL_v001.webp",
           tief:"assets/PCG_CU_CUS021_P07_CU-UPSET_v001.webp",
           spricht:"assets/PCG_CU_CUS021_P05_CU-TALK_v001.webp" } };

TOPICS.fentanyl_freitag = {
  persona:"angeh", cus:"CUS021", trust:KRAEMER_TRUST,
  de:"Fentanyl am Freitagabend", en:"Fentanyl on a Friday Evening", ar:"لصقة الفنتانيل مساء الجمعة",
  tag:"HV",
  banner:"assets/PCG_CARD_CUS021_v001.webp",
  sub:{de:"HV-Tisch · BtM-Rezept", en:"Counter · Narcotic prescription", ar:"الكاونتر · وصفة مخدّرات"},
  badges:[],

/* ============================== DEUTSCH ============================== */
  steps:[
 {mech:"comic",data:{kicker:"Szene 1 · Freitag, 17:40",
  title:"Ein gelbes Rezept auf dem HV-Tisch", cta:"Rezept prüfen →",
  visual:{seq:[{img:"assets/PCG_SCN_CUS021_A_ENTRANCE_v001.webp", ms:1600},
               {img:"assets/PCG_SCN_CUS021_B_COUNTER_v001.webp", ms:1800},
               {img:"assets/PCG_DET_CUS021_00_VATER_v001.webp", ms:1800}]},
  bubbles:[
   {who:"Thomas Krämer",txt:"Guten Abend. Ich komme wegen meinem Vater. Er liegt zu Hause, er kann nicht mehr selbst kommen."},
   {who:"Thomas Krämer",txt:"Das letzte Pflaster ist heute Mittag abgefallen. Ich war schon bei zwei Apotheken."},
   {who:"Thomas Krämer",txt:"Bitte. Es ist Freitagabend."},
   {who:"Ich",txt:"Ich ziehe das gelbe Rezept zu mir und beginne die Prüfung."}]}},

 {mech:"rezept",data:{kicker:"Prüfung · Das BtM-Rezept", penalty:true, p:25,
  title:"Eine Pflichtangabe fehlt. Tippe das Feld an.",
  scene:"assets/PCG_DET_CUS021_01_ZEILE_v001.webp",
  doc:{type:"btm", r:KRAEMER_REZ, open:["verordnung","datum","menge","gebrauch","stempel","unterschrift"]},
  answer:"verordnung", okH:"Die Beladung fehlt",
  wrong:{datum:"Das Datum ist da. Ob es noch reicht, kommt gleich.",
         menge:"Die Menge steht in Ziffern und in Worten. Korrekt.",
         gebrauch:"Die Gebrauchsanweisung ist angegeben. Korrekt.",
         stempel:"Name, Berufsbezeichnung, Anschrift und Telefon sind da.",
         unterschrift:"Die Unterschrift ist vorhanden."},
  expl:"„25 µg/h“ ist eine Freisetzungsrate, keine Wirkstoffmenge. Pflaster mit derselben Rate tragen je nach Hersteller unterschiedlich viel Fentanyl. Deshalb verlangt § 9 Abs. 1 Nr. 3 BtMVV die Gewichtsmenge je Pflaster. Dieses Rezept trägt weder PZN noch Hersteller: Aus dem Rezept selbst ist nicht zu erkennen, welches Pflaster gemeint ist."}},

 {mech:"truefalse",data:{kicker:"Schnellprüfung · Fristen und Mythen", title:"Richtig oder falsch?",
  scene:"assets/PCG_DET_CUS021_02_KALENDER_v001.webp",
  trueLabel:"Richtig", falseLabel:"Falsch", maxWrong:1,
  items:[
   {t:"Ausgestellt am Dienstag, 13.10., vorgelegt am Freitag, 16.10.: Das Rezept darf noch beliefert werden.",ok:true,p:6,
    why:"Belieferbar bis einschließlich 20.10."},
   {t:"Vorgelegt am Mittwoch, 21.10., dürfte dieses Rezept nicht mehr beliefert werden.",ok:true,p:6,
    why:"Am 21.10. ist es vor mehr als sieben Tagen ausgefertigt."},
   {t:"Zehn Fentanyl-Pflaster brauchen ein „A“ auf dem Rezept.",ok:false,p:6,
    why:"Höchstmengen und „A“ sind seit dem 8. April 2023 abgeschafft."},
   {t:"Ein BtM-Rezept darf mehr als zwei Betäubungsmittel tragen.",ok:true,p:7,
    why:"Die Begrenzung auf zwei BtM ist mit den Höchstmengen gefallen."}],
  okH:"Auf dem aktuellen Stand", badH:"Ein alter Stand",
  expl:"§ 12 Abs. 1 Nr. 1c BtMVV: Kein BtM auf ein Rezept, das bei Vorlage vor mehr als sieben Tagen ausgefertigt wurde. Höchstmengen, das „A“ und die Grenze von zwei BtM in 30 Tagen sind am 8. April 2023 entfallen. Wer aus Unterlagen vor 2023 gelernt hat, fällt genau hier."}},

 {mech:"mcq",data:{kicker:"Entscheidung · Was ich selbst ergänzen darf",
  title:"Die Beladung fehlt. Wann darf ich sie selbst eintragen, ohne Rücksprache mit dem Arzt?",
  scene:"assets/PCG_DET_CUS021_03_VERGLEICH_v001.webp",
  options:[
   {t:"Wenn die PZN auf dem Rezept selbst steht",p:25,tr:0,ok:true,h:"Die PZN bestimmt das Produkt",
    x:"Die PZN auf dem Rezept legt genau ein Präparat fest, und mit ihm die Beladung."},
   {t:"Wenn das übliche Pflaster in der Abgabehistorie steht",p:0,tr:0,h:"Die Historie ist nicht die Verordnung",
    x:"Sie zeigt, was früher abgegeben wurde, nicht, was diesmal verordnet ist."},
   {t:"Wenn der Sohn mir das Pflaster seines Vaters nennt",p:0,tr:0,h:"Eine Auskunft, keine Verordnung",
    x:"Angaben zum Arzneimittel ergänzt kein Überbringer."},
   {t:"Wenn im Tresor nur ein Hersteller mit dieser Rate liegt",p:0,tr:0,h:"Der Bestand verordnet nichts",
    x:"Was zufällig vorrätig ist, sagt nichts darüber, was der Arzt gemeint hat."}],
  okH:"Die PZN entscheidet", badH:"Das reicht nicht",
  expl:"Steht die PZN auf dem Rezept, ist das Präparat eindeutig, und ich trage die Beladung ein und vermerke die Ergänzung auf Teil I und II. Abgabehistorie, Auskunft des Sohnes und Lagerbestand sagen nur, was üblich ist, nicht, was verordnet wurde. Dieses Rezept trägt keine PZN: Ich kann die Beladung nicht selbst eintragen."}},

 {mech:"mcq",data:{kicker:"Szene 2 · 17:55 · Die Praxis ist zu",
  title:"Was erlaubt mir die BtMVV in dieser Lage?",
  scene:"assets/PCG_DET_CUS021_04_TELEFON_v001.webp",
  hint:"Anrufbeantworter: Praxis bis Montag geschlossen, keine Vertretung genannt. Das aktuelle Pflaster des Vaters endet heute Nacht, er hat seit dem Morgen Schmerzen.",
  options:[
   {t:"Jetzt abgeben, weil es dringend ist, den Arzt benachrichtigen und später korrigieren",p:25,tr:0,ok:true,h:"§ 12 Abs. 2 Satz 3",
    x:"Dringender Fall, Arzt nicht erreichbar: Abgabe ganz oder in Teilmengen ist erlaubt."},
   {t:"Die Beladung selbst aus der Abgabehistorie ergänzen und normal abgeben",p:0,tr:0,h:"Eine Änderung ohne Rücksprache",
    x:"Angaben zum Arzneimittel ändere ich nur nach Rücksprache."},
   {t:"Gar nichts, also die Abgabe bis Montag verweigern",p:0,tr:0,h:"Die BtMVV sieht diesen Fall vor",
    x:"Für genau diese Lage gibt es die Regel des dringenden Falls."},
   {t:"Ohne jeden Vermerk abgeben, der Arzt korrigiert später",p:0,tr:0,h:"Eine Abgabe ohne Spur",
    x:"Ohne Vermerk ist die Abgabe nicht nachvollziehbar."}],
  okH:"Der dringende Fall", badH:"Nicht, was die BtMVV vorsieht",
  expl:"§ 12 Abs. 2 Satz 3 BtMVV: Ist eine Rücksprache nicht möglich und ein dringender Fall glaubhaft oder erkennbar, darf ich das Verschriebene ganz oder in Teilmengen abgeben. Danach muss ich den Arzt unverzüglich benachrichtigen, und die Korrektur wird unverzüglich nachgeholt (Satz 4)."}},

 {mech:"shelf",data:{kicker:"Abgabe · Das richtige Pflaster",
  title:"Welche Packung gebe ich ab?",
  scene:"assets/PCG_DET_CUS021_05_TRESOR_v001.webp",
  hint:"Abgabehistorie: Fentanyl – 1 A Pharma 25 µg/h · 5,78 mg · PZN 00682784, seit drei Monaten.",
  boxes:[
   {img:KRAEMER_PKG.a25,n:"Fentanyl – 1 A Pharma 25 µg/h",s:"5,78 mg · 10,5 cm² · 10 Pfl.",ok:true,p:25,tr:0,h:"Gleiche Rate, gleiche Beladung",
    x:"Das Pflaster, das der Vater kennt: gleiche Rate, gleiche Beladung."},
   {img:KRAEMER_PKG.al25,n:"Fentanyl AL TTS 25 µg/h",s:"4,8 mg · 15 cm² · 10 Pfl.",p:0,tr:0,h:"Gleiche Rate, andere Beladung",
    x:"25 µg/h wie das gewohnte Pflaster, aber 4,8 statt 5,78 mg und ein anderes System."},
   {img:KRAEMER_PKG.a50,n:"Fentanyl – 1 A Pharma 50 µg/h",s:"11,56 mg · 21 cm² · 10 Pfl.",p:0,tr:0,h:"Die doppelte Rate",
    x:"Gleicher Hersteller, aber doppelte Freisetzungsrate."}]}},

 {mech:"connect",data:{kicker:"Dokumentation · Wohin gehört was?",
  title:"Verbinde jeden Eintrag mit seinem Ort.",
  scene:"assets/PCG_DET_CUS021_06_DREITEILE_v001.webp",
  hint:"Tippe einen Eintrag an, dann seinen Ort.",
  progress:"{a} von {b} Einträgen zugeordnet", per:5,
  items:[
   {n:"Teil I und II",s:"vermerke ich",col:"#C4566A"},
   {n:"Nur Teil I",s:"vermerke ich",col:"#C4566A"},
   {n:"Teil III",s:"vermerkt der Arzt",col:"#8A8F98"},
   {n:"BtM-Nachweis",s:"Karteikarte oder EDV",col:"#8A8F98"},
   {n:"Abgabe im dringenden Fall",s:"Arzt nicht erreichbar, Freitag 18:05",col:"#F3E4C8"},
   {n:"Apotheke, Abgabedatum, Namenszeichen",s:"die Abgabevermerke",col:"#F3E4C8"},
   {n:"Beladung 5,78 mg",s:"nach Rücksprache am Montag",col:"#F3E4C8"},
   {n:"Bestätigung der Korrektur",s:"durch den Arzt",col:"#F3E4C8"},
   {n:"Arzt und Rezeptnummer",s:"zur Abgabe",col:"#F3E4C8"}],
  pairs:[[4,0,"§ 12 Abs. 2 BtMVV"],[5,1,"§ 12 Abs. 3 BtMVV"],[6,0,"§ 12 Abs. 2 BtMVV"],[7,2,"§ 12 Abs. 2 BtMVV"],[8,3,"§ 14 Abs. 1 Nr. 5 BtMVV"]],
  okH:"Alles am richtigen Ort", badH:"Einiges am falschen Ort",
  expl:"Was ich tue, also Abgabe im dringenden Fall, Rücksprache oder Korrektur, vermerke ich auf Teil I und II. Der Arzt vermerkt es auf Teil III. Die Abgabevermerke gehören nur auf Teil I, den ich drei Jahre aufbewahre. Der BtM-Nachweis trägt Arzt und Rezeptnummer. Teil II geht an die Kasse: Jede Lücke dort ist ein Retaxrisiko."}},

 {mech:"rezept",data:{kicker:"Szene 3 · 18:15 · Kontrolle von Teil I", penalty:true,
  title:"Zwei Dinge fehlen auf Teil I",
  scene:"assets/PCG_SCN_CUS021_D_HANDOVER_v001.webp",
  doc:{type:"btm", r:KRAEMER_REZ_ABGABE, open:["apo","abgabedatum","zeichen","vermerk","verordnung"]},
  phases:[
   {q:"Ein Abgabevermerk fehlt. Tippe ihn an.",
    answer:"zeichen", p:25, okH:"Mein Namenszeichen",
    wrong:{verordnung:"Dieses Feld bleibt bis Montag leer. Korrigiert wird erst nach der Rücksprache.",
           apo:"Name und Anschrift der Apotheke sind da.",
           abgabedatum:"Das Abgabedatum ist da."},
    expl:"Drei Abgabevermerke gehören auf Teil I: Name und Anschrift der Apotheke, Abgabedatum, Namenszeichen der abgebenden Person (§ 12 Abs. 3 BtMVV). Fehlt einer, ist das eine Ordnungswidrigkeit."},
   {q:"Auch die Begründung der Abgabe fehlt. Tippe sie an.",
    answer:"vermerk", p:25, okH:"Der Vermerk zum dringenden Fall",
    wrong:{verordnung:"Dieses Feld bleibt bis Montag leer. Korrigiert wird erst nach der Rücksprache."},
    expl:"Erst der Vermerk „dringender Fall, Arzt nicht erreichbar“ rechtfertigt die Abgabe. Ohne ihn sieht sie aus wie die Belieferung eines unvollständigen Rezepts. Das leere Beladungsfeld ist kein Fehler: Wer es jetzt aus der Historie füllt, wiederholt den Fehler aus Schritt 3."}]}}
  ],

/* ============================== ENGLISH ============================== */
  steps_en:[
 {mech:"comic",data:{kicker:"Scene 1 · Friday, 5:40 pm",
  title:"A yellow prescription on the counter", cta:"Check the prescription →",
  visual:{seq:[{img:"assets/PCG_SCN_CUS021_A_ENTRANCE_v001.webp", ms:1600},
               {img:"assets/PCG_SCN_CUS021_B_COUNTER_v001.webp", ms:1800},
               {img:"assets/PCG_DET_CUS021_00_VATER_v001.webp", ms:1800}]},
  bubbles:[
   {who:"Thomas Krämer",txt:"Good evening. It is for my father. He is at home, he cannot come himself any more."},
   {who:"Thomas Krämer",txt:"The last patch came off at midday. I have already been to two pharmacies."},
   {who:"Thomas Krämer",txt:"Please. It is Friday evening."},
   {who:"I",txt:"I pull the yellow prescription towards me and start checking."}]}},

 {mech:"rezept",data:{kicker:"Check · The narcotics prescription", penalty:true, p:25,
  title:"A mandatory entry is missing. Tap the field.",
  scene:"assets/PCG_DET_CUS021_01_ZEILE_v001.webp",
  doc:{type:"btm", r:KRAEMER_REZ, open:["verordnung","datum","menge","gebrauch","stempel","unterschrift"]},
  answer:"verordnung", okH:"The drug load is missing",
  wrong:{datum:"The date is there. Whether it is still valid comes next.",
         menge:"The quantity is written in figures and in words. Correct.",
         gebrauch:"The directions for use are given. Correct.",
         stempel:"Name, profession, address and phone number are there.",
         unterschrift:"The signature is there."},
  expl:"“25 µg/h” is a release rate, not an amount of active substance. Patches with the same rate carry different amounts of fentanyl depending on the manufacturer. That is why § 9 (1) no. 3 BtMVV requires the weight per patch. This prescription carries neither a PZN nor a manufacturer: the prescription itself does not show which patch is meant."}},

 {mech:"truefalse",data:{kicker:"Quick check · Deadlines and myths", title:"True or false?",
  scene:"assets/PCG_DET_CUS021_02_KALENDER_v001.webp",
  trueLabel:"True", falseLabel:"False", maxWrong:1,
  items:[
   {t:"Issued on Tuesday 13 October, presented on Friday 16 October: the prescription may still be dispensed.",ok:true,p:6,
    why:"Dispensable up to and including 20 October."},
   {t:"Presented on Wednesday 21 October, this prescription could no longer be dispensed.",ok:true,p:6,
    why:"On 21 October it was issued more than seven days earlier."},
   {t:"Ten fentanyl patches need an “A” on the prescription.",ok:false,p:6,
    why:"Maximum quantities and the “A” were abolished on 8 April 2023."},
   {t:"A narcotics prescription may carry more than two narcotics.",ok:true,p:7,
    why:"The limit of two narcotics fell together with the maximum quantities."}],
  okH:"Up to date", badH:"An outdated rule",
  expl:"§ 12 (1) no. 1c BtMVV: no narcotic on a prescription issued more than seven days before it is presented. Maximum quantities, the “A” and the limit of two narcotics in 30 days were dropped on 8 April 2023. Anyone who learned from material older than 2023 trips exactly here."}},

 {mech:"mcq",data:{kicker:"Decision · What I may add myself",
  title:"The drug load is missing. When may I add it myself, without asking the doctor?",
  scene:"assets/PCG_DET_CUS021_03_VERGLEICH_v001.webp",
  options:[
   {t:"When the PZN is on the prescription itself",p:25,tr:0,ok:true,h:"The PZN defines the product",
    x:"A PZN on the prescription fixes exactly one product, and with it the drug load."},
   {t:"When the usual patch appears in the dispensing history",p:0,tr:0,h:"History is not the prescription",
    x:"It shows what was dispensed before, not what is prescribed this time."},
   {t:"When the son tells me which patch his father uses",p:0,tr:0,h:"Information, not a prescription",
    x:"No messenger completes details about the medicine."},
   {t:"When only one manufacturer with this rate is in the safe",p:0,tr:0,h:"Stock prescribes nothing",
    x:"What happens to be in stock says nothing about what the doctor meant."}],
  okH:"The PZN decides", badH:"That is not enough",
  expl:"If the PZN is on the prescription, the product is unambiguous: I enter the drug load and note the addition on parts I and II. Dispensing history, the son’s information and stock only show what is usual, not what was prescribed. This prescription has no PZN: I cannot enter the drug load myself."}},

 {mech:"mcq",data:{kicker:"Scene 2 · 5:55 pm · The practice is closed",
  title:"What does the BtMVV allow me to do here?",
  scene:"assets/PCG_DET_CUS021_04_TELEFON_v001.webp",
  hint:"Answering machine: practice closed until Monday, no deputy named. The father’s current patch runs out tonight, and he has been in pain since the morning.",
  options:[
   {t:"Dispense now because it is urgent, notify the doctor, correct later",p:25,tr:0,ok:true,h:"§ 12 (2) sentence 3",
    x:"Urgent case, doctor unreachable: dispensing in full or in part is allowed."},
   {t:"Add the drug load from the dispensing history and dispense as usual",p:0,tr:0,h:"A change without consultation",
    x:"I change details about the medicine only after consulting the doctor."},
   {t:"Nothing, so refuse to dispense until Monday",p:0,tr:0,h:"The BtMVV covers this case",
    x:"The urgent-case rule exists for exactly this situation."},
   {t:"Dispense without any note, the doctor will correct later",p:0,tr:0,h:"A dispensing without a trace",
    x:"Without a note the dispensing cannot be traced."}],
  okH:"The urgent case", badH:"Not what the BtMVV provides",
  expl:"§ 12 (2) sentence 3 BtMVV: if consultation is impossible and an urgent case is credible or evident, I may dispense what was prescribed in full or in part. I must then notify the doctor without delay, and the correction is made without delay (sentence 4)."}},

 {mech:"shelf",data:{kicker:"Dispensing · The right patch",
  title:"Which pack do I dispense?",
  scene:"assets/PCG_DET_CUS021_05_TRESOR_v001.webp",
  hint:"Dispensing history: Fentanyl – 1 A Pharma 25 µg/h · 5.78 mg · PZN 00682784, for three months.",
  boxes:[
   {img:KRAEMER_PKG.a25,n:"Fentanyl – 1 A Pharma 25 µg/h",s:"5.78 mg · 10.5 cm² · 10 patches",ok:true,p:25,tr:0,h:"Same rate, same drug load",
    x:"The patch the father knows: same rate, same drug load."},
   {img:KRAEMER_PKG.al25,n:"Fentanyl AL TTS 25 µg/h",s:"4.8 mg · 15 cm² · 10 patches",p:0,tr:0,h:"Same rate, different drug load",
    x:"25 µg/h like the usual patch, but 4.8 instead of 5.78 mg and a different system."},
   {img:KRAEMER_PKG.a50,n:"Fentanyl – 1 A Pharma 50 µg/h",s:"11.56 mg · 21 cm² · 10 patches",p:0,tr:0,h:"Double the rate",
    x:"Same manufacturer, but twice the release rate."}]}},

 {mech:"connect",data:{kicker:"Documentation · Where does each entry go?",
  title:"Connect each entry with its place.",
  scene:"assets/PCG_DET_CUS021_06_DREITEILE_v001.webp",
  hint:"Tap an entry, then its place.",
  progress:"{a} of {b} entries placed", per:5,
  items:[
   {n:"Parts I and II",s:"I note it",col:"#C4566A"},
   {n:"Part I only",s:"I note it",col:"#C4566A"},
   {n:"Part III",s:"the doctor notes it",col:"#8A8F98"},
   {n:"Narcotics record",s:"index card or software",col:"#8A8F98"},
   {n:"Dispensed as an urgent case",s:"doctor unreachable, Friday 6:05 pm",col:"#F3E4C8"},
   {n:"Pharmacy, date, initials",s:"the dispensing notes",col:"#F3E4C8"},
   {n:"Drug load 5.78 mg",s:"after consultation on Monday",col:"#F3E4C8"},
   {n:"Confirmation of the correction",s:"by the doctor",col:"#F3E4C8"},
   {n:"Doctor and prescription number",s:"for the dispensing",col:"#F3E4C8"}],
  pairs:[[4,0,"§ 12 (2) BtMVV"],[5,1,"§ 12 (3) BtMVV"],[6,0,"§ 12 (2) BtMVV"],[7,2,"§ 12 (2) BtMVV"],[8,3,"§ 14 (1) no. 5 BtMVV"]],
  okH:"Everything in its place", badH:"Some entries misplaced",
  expl:"What I do, an urgent dispensing, a consultation or a correction, I note on parts I and II. The doctor notes it on part III. The dispensing notes belong on part I only, which I keep for three years. The narcotics record carries the doctor and the prescription number. Part II goes to the insurer: every gap there is a claw-back risk."}},

 {mech:"rezept",data:{kicker:"Scene 3 · 6:15 pm · Checking part I", penalty:true,
  title:"Two things are missing on part I",
  scene:"assets/PCG_SCN_CUS021_D_HANDOVER_v001.webp",
  doc:{type:"btm", r:KRAEMER_REZ_ABGABE, open:["apo","abgabedatum","zeichen","vermerk","verordnung"]},
  phases:[
   {q:"A dispensing note is missing. Tap it.",
    answer:"zeichen", p:25, okH:"My initials",
    wrong:{verordnung:"This field stays empty until Monday. The correction comes only after consultation.",
           apo:"The pharmacy’s name and address are there.",
           abgabedatum:"The dispensing date is there."},
    expl:"Three dispensing notes belong on part I: the pharmacy’s name and address, the dispensing date, and the initials of the person dispensing (§ 12 (3) BtMVV). If one is missing, it is an administrative offence."},
   {q:"The reason for dispensing is missing too. Tap it.",
    answer:"vermerk", p:25, okH:"The urgent-case note",
    wrong:{verordnung:"This field stays empty until Monday. The correction comes only after consultation."},
    expl:"Only the note “urgent case, doctor unreachable” justifies the dispensing. Without it, it looks like filling an incomplete prescription. The empty drug-load field is not an error: anyone who fills it now from the history repeats the mistake from step 3."}]}}
  ],

/* ============================== العربية ============================== */
  steps_ar:[
 {mech:"comic",data:{kicker:"المشهد 1 · الجمعة 17:40",
  title:"وصفة صفراء على الكاونتر", cta:"افحص الوصفة ←",
  visual:{seq:[{img:"assets/PCG_SCN_CUS021_A_ENTRANCE_v001.webp", ms:1600},
               {img:"assets/PCG_SCN_CUS021_B_COUNTER_v001.webp", ms:1800},
               {img:"assets/PCG_DET_CUS021_00_VATER_v001.webp", ms:1800}]},
  bubbles:[
   {who:"توماس كريمر",txt:"مساء الخير. أنا هنا من أجل أبي. هو في البيت ولم يعد يستطيع المجيء بنفسه."},
   {who:"توماس كريمر",txt:"آخر لصقة سقطت عنه ظهر اليوم. وقد مررت على صيدليتين قبلكم."},
   {who:"توماس كريمر",txt:"أرجوك. اليوم مساء جمعة."},
   {who:"أنا",txt:"أسحب الوصفة الصفراء إليّ وأبدأ الفحص."}]}},

 {mech:"rezept",data:{kicker:"الفحص · وصفة BtM", penalty:true, p:25,
  title:"ينقص بيان إلزامي. ألمس الخانة.",
  scene:"assets/PCG_DET_CUS021_01_ZEILE_v001.webp",
  doc:{type:"btm", r:KRAEMER_REZ, open:["verordnung","datum","menge","gebrauch","stempel","unterschrift"]},
  answer:"verordnung", okH:"كمية التحميل ناقصة",
  wrong:{datum:"التاريخ موجود. أما هل ما زال صالحاً فذلك في الخطوة التالية.",
         menge:"الكمية مكتوبة بالأرقام وبالحروف. صحيح.",
         gebrauch:"طريقة الاستعمال مكتوبة. صحيح.",
         stempel:"الاسم والتخصص والعنوان والهاتف موجودة.",
         unterschrift:"التوقيع موجود."},
  expl:"«25 µg/h» معدل إطلاق، لا كمية مادة. اللصقات بالمعدل نفسه تختلف في كمية الفنتانيل المحمّلة فيها من مصنّع إلى آخر، ولذلك يوجب § 9 Abs. 1 Nr. 3 BtMVV ذكر وزن المادة في كل لصقة. وهذه الوصفة ليس عليها رقم PZN ولا اسم مصنّع، فلا أعرف من الوصفة نفسها أي لصقة قصد الطبيب."}},

 {mech:"truefalse",data:{kicker:"فحص سريع · المهل والخرافات", title:"صح أم خطأ؟",
  scene:"assets/PCG_DET_CUS021_02_KALENDER_v001.webp",
  trueLabel:"صح", falseLabel:"خطأ", maxWrong:1,
  items:[
   {t:"أُصدرت الوصفة يوم الثلاثاء 13.10، وقُدّمت يوم الجمعة 16.10، فهي صالحة للصرف.",ok:true,p:6,
    why:"تصلح للصرف حتى 20.10 ضمناً."},
   {t:"لو قُدّمت هذه الوصفة يوم الأربعاء 21.10، لما جاز صرفها.",ok:true,p:6,
    why:"يوم 21.10 تكون قد أُصدرت قبل أكثر من سبعة أيام."},
   {t:"عشر لصقات فنتانيل تحتاج حرف «A» على الوصفة.",ok:false,p:6,
    why:"الحدود القصوى وحرف «A» أُلغيت في 8 أبريل 2023."},
   {t:"يجوز أن تحمل وصفة BtM أكثر من مادتين من BtM.",ok:true,p:7,
    why:"حدّ المادتين سقط مع الحدود القصوى."}],
  okH:"معلومة حديثة", badH:"معلومة قديمة",
  expl:"§ 12 Abs. 1 Nr. 1c BtMVV: لا يُصرف BtM على وصفة أُصدرت قبل أكثر من سبعة أيام من يوم تقديمها. والحدود القصوى وحرف «A» وحدّ «مادتان من BtM خلال ثلاثين يوماً» أُلغيت كلها في 8 أبريل 2023. ومن تعلّم من مراجع أقدم من 2023 يخطئ هنا بالذات."}},

 {mech:"mcq",data:{kicker:"قرار · ما أكمله بنفسي",
  title:"كمية التحميل ناقصة. متى يجوز لي أن أكتبها بنفسي، دون التواصل مع الطبيب؟",
  scene:"assets/PCG_DET_CUS021_03_VERGLEICH_v001.webp",
  options:[
   {t:"إذا كان رقم PZN مكتوباً على الوصفة نفسها",p:25,tr:0,ok:true,h:"رقم PZN يحدّد المنتج",
    x:"رقم PZN على الوصفة يحدّد منتجاً واحداً، ومعه كمية التحميل."},
   {t:"إذا ظهرت اللصقة المعتادة في سجل الصرف",p:0,tr:0,h:"السجل ليس الوصفة",
    x:"السجل يخبرني بما صُرف من قبل، لا بما وُصف هذه المرة."},
   {t:"إذا أخبرني الابن باسم لصقة أبيه",p:0,tr:0,h:"معلومة لا وصفة",
    x:"لا يُكمل حامل الوصفة أي بيان عن الدواء."},
   {t:"إذا لم يكن في خزنتي إلا مصنّع واحد بهذا المعدل",p:0,tr:0,h:"المخزون لا يصف شيئاً",
    x:"ما يصادف وجوده عندي لا يقول شيئاً عمّا قصده الطبيب."}],
  okH:"رقم PZN هو الفيصل", badH:"هذا لا يكفي",
  expl:"إذا كان رقم PZN على الوصفة، فالمنتج محدد بلا لبس: أكتب كمية التحميل، وأدوّن على الجزأين I وII أنني أكملتها. أما سجل الصرف وكلام الابن والمخزون فتخبرني بما هو معتاد، لا بما وُصف. وهذه الوصفة بلا PZN، فلا أستطيع إكمالها بنفسي."}},

 {mech:"mcq",data:{kicker:"المشهد 2 · 17:55 · العيادة مغلقة",
  title:"ما الذي تجيزه لي BtMVV في هذا الموقف؟",
  scene:"assets/PCG_DET_CUS021_04_TELEFON_v001.webp",
  hint:"جهاز الرسائل: العيادة مغلقة حتى الاثنين، ولا ذكر لطبيب ينوب. لصقة الأب الحالية تنتهي الليلة، وهو يتألم منذ الصباح.",
  options:[
   {t:"أصرف الآن لأن الحالة عاجلة، وأبلغ الطبيب، وتُستكمل الوصفة لاحقاً",p:25,tr:0,ok:true,h:"§ 12 Abs. 2 Satz 3",
    x:"حالة عاجلة والطبيب لا يُصل إليه: الصرف كاملاً أو جزئياً مسموح."},
   {t:"أكمل كمية التحميل بنفسي من سجل الصرف، ثم أصرف كالمعتاد",p:0,tr:0,h:"تغيير دون تواصل مع الطبيب",
    x:"لا أغيّر بيانات الدواء إلا بعد التواصل مع الطبيب."},
   {t:"لا يجيز لي شيئاً، فأرفض الصرف حتى يوم الاثنين",p:0,tr:0,h:"BtMVV تنص على هذه الحالة",
    x:"قاعدة الحالة العاجلة وُضعت لهذا الموقف بالذات."},
   {t:"أصرف دون أي ملاحظة، والطبيب يصحّح لاحقاً",p:0,tr:0,h:"صرف بلا أثر",
    x:"دون ملاحظة لا يمكن تتبّع الصرف."}],
  okH:"الحالة العاجلة", badH:"ليس ما تنص عليه BtMVV",
  expl:"§ 12 Abs. 2 Satz 3 BtMVV: إن تعذّر التواصل مع الطبيب، وكانت الحالة عاجلة عجلةً يؤكدها حامل الوصفة أو تظهر من الموقف، جاز لي صرف الدواء الموصوف كاملاً أو جزءاً منه. وعليّ بعدها أن أبلغ الطبيب دون تأخير، وأن يُستكمل التصحيح دون تأخير (Satz 4)."}},

 {mech:"shelf",data:{kicker:"الصرف · اللصقة الصحيحة",
  title:"أي عبوة أصرف؟",
  scene:"assets/PCG_DET_CUS021_05_TRESOR_v001.webp",
  hint:"سجل الصرف: Fentanyl – 1 A Pharma 25 µg/h · 5,78 mg · PZN 00682784، منذ ثلاثة أشهر.",
  boxes:[
   {img:KRAEMER_PKG.a25,n:"Fentanyl – 1 A Pharma 25 µg/h",s:"5,78 mg · 10,5 cm² · 10 لصقات",ok:true,p:25,tr:0,h:"المعدل نفسه وكمية التحميل نفسها",
    x:"اللصقة التي يعرفها الأب: المعدل نفسه وكمية التحميل نفسها."},
   {img:KRAEMER_PKG.al25,n:"Fentanyl AL TTS 25 µg/h",s:"4,8 mg · 15 cm² · 10 لصقات",p:0,tr:0,h:"المعدل نفسه وكمية تحميل أخرى",
    x:"25 µg/h كاللصقة المعتادة، لكن 4,8 لا 5,78 mg، ونظام لصقة مختلف."},
   {img:KRAEMER_PKG.a50,n:"Fentanyl – 1 A Pharma 50 µg/h",s:"11,56 mg · 21 cm² · 10 لصقات",p:0,tr:0,h:"ضعف المعدل",
    x:"المصنّع نفسه، لكن معدل الإطلاق ضعفان."}]}},

 {mech:"connect",data:{kicker:"التوثيق · أين يُكتب كل شيء؟",
  title:"اربط كل ملاحظة بمكانها.",
  scene:"assets/PCG_DET_CUS021_06_DREITEILE_v001.webp",
  hint:"ألمس الملاحظة، ثم مكانها.",
  progress:"{a} من {b} ملاحظات في مكانها", per:5,
  items:[
   {n:"الجزآن I وII",s:"أكتبها أنا",col:"#C4566A"},
   {n:"الجزء I وحده",s:"أكتبها أنا",col:"#C4566A"},
   {n:"الجزء III",s:"يكتبها الطبيب",col:"#8A8F98"},
   {n:"سجل BtM",s:"الكرت أو EDV",col:"#8A8F98"},
   {n:"صرف عاجل",s:"الطبيب لم يُصل إليه، الجمعة 18:05",col:"#F3E4C8"},
   {n:"الصيدلية والتاريخ والحروف الأولى من اسمي",s:"بيانات الصرف",col:"#F3E4C8"},
   {n:"كمية التحميل 5,78 mg",s:"بعد التواصل يوم الاثنين",col:"#F3E4C8"},
   {n:"تأكيد التصحيح",s:"من الطبيب",col:"#F3E4C8"},
   {n:"اسم الطبيب ورقم الوصفة",s:"لعملية الصرف",col:"#F3E4C8"}],
  pairs:[[4,0,"§ 12 Abs. 2 BtMVV"],[5,1,"§ 12 Abs. 3 BtMVV"],[6,0,"§ 12 Abs. 2 BtMVV"],[7,2,"§ 12 Abs. 2 BtMVV"],[8,3,"§ 14 Abs. 1 Nr. 5 BtMVV"]],
  okH:"كل شيء في مكانه", badH:"بعض الملاحظات في غير مكانها",
  expl:"ما أفعله أنا من صرف عاجل أو تواصل مع الطبيب أو تصحيح، أكتبه على الجزأين I وII، ويكتبه الطبيب على الجزء III. وبيانات الصرف مكانها الجزء I وحده، وهو الجزء الذي يبقى عندي ثلاث سنوات. والسجل يحمل اسم الطبيب ورقم الوصفة. أما الجزء II فيذهب إلى صندوق التأمين، وكل نقص فيه خطر ريتاكس."}},

 {mech:"rezept",data:{kicker:"المشهد 3 · 18:15 · مراجعة الجزء I", penalty:true,
  title:"شيئان ناقصان على الجزء I",
  scene:"assets/PCG_SCN_CUS021_D_HANDOVER_v001.webp",
  doc:{type:"btm", r:KRAEMER_REZ_ABGABE, open:["apo","abgabedatum","zeichen","vermerk","verordnung"]},
  phases:[
   {q:"ينقص أحد بيانات الصرف. ألمسه.",
    answer:"zeichen", p:25, okH:"الحروف الأولى من اسمي",
    wrong:{verordnung:"هذا الحقل يبقى فارغاً حتى الاثنين. التصحيح يأتي بعد التواصل مع الطبيب، لا قبله.",
           apo:"اسم الصيدلية وعنوانها موجودان.",
           abgabedatum:"تاريخ الصرف موجود."},
    expl:"بيانات الصرف على الجزء I ثلاثة: اسم الصيدلية وعنوانها، وتاريخ الصرف، والحروف الأولى من اسم من صرف (§ 12 Abs. 3 BtMVV). وغياب أي منها مخالفة إدارية."},
   {q:"وتنقص أيضاً ملاحظة سبب الصرف. ألمسها.",
    answer:"vermerk", p:25, okH:"ملاحظة الصرف العاجل",
    wrong:{verordnung:"هذا الحقل يبقى فارغاً حتى الاثنين. التصحيح يأتي بعد التواصل مع الطبيب، لا قبله."},
    expl:"ملاحظة «صرف عاجل، الطبيب لم يُصل إليه» هي التي تبرّر الصرف أصلاً، فبدونها يبدو الصرف صرفاً لوصفة ناقصة. أما حقل كمية التحميل الفارغ فليس خطأً، ومن ملأه الآن من سجل الصرف كرّر خطأ الخطوة 3."}]}}
  ]
};
