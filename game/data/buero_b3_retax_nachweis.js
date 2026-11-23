/* =====================================================================
   BÜRO · RETAX · B3 · retax_nachweis
   Quelle: FALL_Retax_Level_02_retax_nachweis_v2.md (02_Fallsammlungen)
   und TECHNIK_Brief_Retax_B3_retax_nachweis.md (20.11.2026).
   Gebaut von Technik am 20.11.2026. Geladen erst beim Start des Falls
   durch levelDaten(); der Stummel in index.html traegt nur Titel,
   Banner und src.
   Kasse in der Oberflaeche: Nordwaldt Kasse (keine echte Kasse).
   Punkte: 0 + 25×6 + 50 = 200
   Mit TECHNIK markierte Zeilen: kurze Bedienungs- und Rueckmeldetexte,
   die weder v2 noch der Brief enthalten (Option-Hinweise h/x, okH/badH,
   Titel und CTA der Szene 1, Sortier-Hinweis, why der Aussage). Sie
   stuetzen sich woertlich auf die Erklaerungen in v2 und warten auf
   die Durchsicht der Retax-Unterhaltung.
===================================================================== */

/* ---------- B3 · Nordwaldt Kasse · gemeinsame Bausteine ---------- */
var R2_GRUEN = "#004830";
var R2_LOGO  = "assets/Retax/retax_logo_nordwaldt_kasse.webp";

/* Bildschirm, weit — retax2_scene_01 */
var R2_SCREEN_FERN = {quad:[[50.4,6.2],[85.6,7.4],[84.9,46.1],[49.9,42.3]], ratio:0.60};
/* Bildschirm, nah — retax2_scene_03 */
var R2_SCREEN_NAH  = {quad:[[21.0,10.1],[76.9,7.1],[79.1,65.1],[24.0,71.0]], ratio:0.60};
/* Verbandsbrief in den eigenen Haenden — retax2_scene_02 */
var R2_BRIEF       = {quad:[[23.0,13.6],[55.7,1.2],[67.5,78.9],[35.3,95.0]], ratio:1.385};
/* Protokollstreifen unter der Lampe — retax2_scene_08 */
var R2_STREIFEN    = {quad:[[43.5,36.9],[55.8,37.0],[57.4,91.5],[42.8,91.2]], ratio:2.27};

/* Textebene · Bescheid auf dem Bildschirm. Prozente INNERHALB der Flaeche. */
var R2_L_BESCHEID = [
  {cls:"rx-band", l:0, t:0, w:100, h:15, bg:R2_GRUEN},
  {img:R2_LOGO,   l:3.5, t:2.2, w:11, h:11},
  {tx:"Nordwaldt Kasse",            l:17, t:4.2, w:80, fs:6.0, cls:"rx-w rx-b"},
  {tx:"Beanstandung 216",           l:5,  t:24,  w:60, fs:5.2, cls:"rx-b"},
  {tx:"Celecoxib 200 mg HKP N2",    l:5,  t:35,  w:88, fs:5.0},
  {tx:"Mehrkosten",                 l:5,  t:47,  w:50, fs:5.0},
  {tx:"− 5,24 EUR",            l:50, t:45,  w:47, fs:7.6, cls:"rx-b rx-r"},
  /* zweizeilig: einzeilig wuerde die Zeile mit drei Punkten abgeschnitten */
  {tx:"ggf. Nichtverfügbarkeits-",  l:5, t:72, w:90, fs:5.4},
  {tx:"nachweise nachreichen",      l:5, t:83, w:90, fs:5.4}
];

/* Verbandsbrief: Kopf und acht PZN, zweispaltig */
var R2_L_BRIEF = [
  /* Groesser als im Brief und zweizeilig, gemessen bei 390 px (Technik) */
  {tx:"Apothekerverband",  l:8, t:5,  w:84, fs:8.0, cls:"rx-b"},
  {tx:"Zu folgenden Absetzungen",  l:8, t:13, w:84, fs:5.6},
  {tx:"haben wir noch Fragen",     l:8, t:18, w:84, fs:5.6},
  {tx:"04656246", l:10, t:28, w:38, fs:6.2},{tx:"07245472", l:54, t:28, w:38, fs:6.2},
  {tx:"00658834", l:10, t:36, w:38, fs:6.2},{tx:"03525915", l:54, t:36, w:38, fs:6.2},
  {tx:"15784220", l:10, t:44, w:38, fs:6.2},{tx:"09273219", l:54, t:44, w:38, fs:6.2},
  {tx:"05450802", l:10, t:52, w:38, fs:6.2},{tx:"10398914", l:54, t:52, w:38, fs:6.2},
  {tx:"Rückmeldung per Fax unter",    l:8, t:64, w:84, fs:5.0},
  {tx:"Angabe der Vorgangsnummer",    l:8, t:69, w:84, fs:5.0}
];

/* Protokollstreifen: nur Marken, keine Saetze. Flaeche ~215 px breit. */
var R2_L_STREIFEN = [
  {tx:"ADG",        l:10, t:6,  w:80, fs:18, cls:"rx-b"},
  {tx:"04656246",   l:6,  t:17, w:90, fs:14},
  {tx:"23.01.2025", l:6,  t:25, w:90, fs:14, cls:"rx-b"},
  {tx:"08:12:44",   l:6,  t:33, w:90, fs:14, cls:"rx-b"}
];

/* Kamera naeher: auf dem Telefon ist das Blatt sonst zu klein zum Lesen */
var R2_ZOOM_NAH   = {k:1.5, x:18, y:4};
var R2_ZOOM_BRIEF = {k:1.4, x:17, y:3};

/* Bilder und Dokumente sind in allen drei Sprachen gleich: das Papier
   wechselt die Sprache nicht, nur die Erzaehlung. */
var R2_SEQ1 = [
  {img:"assets/Retax/retax2_scene_01_schreibtisch_bescheid_brief.webp",
   quad:R2_SCREEN_FERN.quad, ratio:R2_SCREEN_FERN.ratio, layers:R2_L_BESCHEID, ms:1500},
  {img:"assets/Retax/retax2_scene_03_bescheid_zeile_nah.webp",
   quad:R2_SCREEN_NAH.quad,  ratio:R2_SCREEN_NAH.ratio,  layers:R2_L_BESCHEID, zoom:R2_ZOOM_NAH, ms:1600},
  {img:"assets/Retax/retax2_scene_02_brief_verband_nah.webp",
   quad:R2_BRIEF.quad,       ratio:R2_BRIEF.ratio,       layers:R2_L_BRIEF, zoom:R2_ZOOM_BRIEF}
];
function r2Bescheid(){
  return {img:"assets/Retax/retax2_scene_03_bescheid_zeile_nah.webp",
          quad:R2_SCREEN_NAH.quad, ratio:R2_SCREEN_NAH.ratio, layers:R2_L_BESCHEID, zoom:R2_ZOOM_NAH};
}
function r2Schachteln(){
  return {img:"assets/Retax/retax2_scene_04_zwei_schachteln.webp",
          after:{onlyGood:true, seq:[{img:"assets/Retax/retax2_scene_05_quittung_muenzen.webp", ms:700}]}};
}
/* Vier Protokollstreifen in retax2_scene_06, gemessen am Bild (22.11.2026):
   eine Flaeche ueber alle vier, die Streifen liegen fast flach und parallel.
   Auf jedem Streifen Nummer, Mittel, Datum, Uhrzeit, wie in der Liste
   darunter. So zeigt das Bild die Suche selbst statt leerer Zettel. */
var R2_VIER = {quad:[[38.8,39.8],[91.3,39.9],[94.0,78.4],[35.1,77.2]], ratio:0.41};
function r2Streifenzeile(i,name,fsN,datum,zeit){
  var l=[1.6,27.6,53.6,80.0][i];
  return [
    {tx:String(i+1), l:l, t:6,  w:16, fs:6.4, cls:"rx-b"},
    {tx:name,        l:l, t:30, w:17, fs:fsN},
    {tx:datum,       l:l, t:46, w:19, fs:2.7, cls:"rx-b"},
    {tx:zeit,        l:l, t:60, w:17, fs:2.6}];
}
var R2_L_VIER = [].concat(
  r2Streifenzeile(0,"Amoxicillin",2.7,"07.02.2024","09:38:07"),
  r2Streifenzeile(1,"Celecoxib",  3.0,"23.01.2025","08:12:44"),
  r2Streifenzeile(2,"Celecoxib",  3.0,"11.03.2025","10:05:19"),
  r2Streifenzeile(3,"Rizatriptan",2.7,"19.12.2024","16:41:02"));
function r2Protokolle(){
  return {img:"assets/Retax/retax2_scene_06_vier_protokolle.webp",
          quad:R2_VIER.quad, ratio:R2_VIER.ratio, layers:R2_L_VIER, zoom:{k:1.7, x:36, y:30},
          after:{onlyGood:true, seq:[{img:"assets/Retax/retax2_scene_07_protokoll_in_hand.webp", ms:700}]}};
}
function r2Streifen(){
  return {img:"assets/Retax/retax2_scene_08_protokoll_unveraenderbar.webp",
          quad:R2_STREIFEN.quad, ratio:R2_STREIFEN.ratio, layers:R2_L_STREIFEN,
          zoom:{k:2.6, x:31, y:33}};
}
function r2Karten(){
  return {img:"assets/Retax/retax2_scene_10_fuenf_karten_zwei_faecher.webp", bg:true,
          after:{onlyGood:true, seq:[{img:"assets/Retax/retax2_scene_11_karte_wird_gelegt.webp", ms:700}]}};
}
function r2Muenzen(){
  return {img:"assets/Retax/retax2_scene_12_muenzen_zwei_haufen.webp",
          after:{count:{from:28.85, to:20.73, ms:1400, dec:",", suffix:" €", top:62, size:7}}};
}
var R2_PROTOKOLLE = {head:"Nichtverfügbarkeitsprotokolle · ADG", sub:"Archiv · Auszug",
  rows:[
   [{k:"p1", l:"1 · Amoxicillin Saft 250 · GEHE",   v:"PZN 00658834 · 07.02.2024 · 09:38:07"}],
   [{k:"p2", l:"2 · Celecoxib 200 mg · GEHE",       v:"PZN 04656246 · 23.01.2025 · 08:12:44"}],
   [{k:"p3", l:"3 · Celecoxib 200 mg · GEHE",       v:"PZN 04656246 · 11.03.2025 · 10:05:19"}],
   [{k:"p4", l:"4 · Rizatriptan AbZ 10 mg · GEHE",  v:"PZN 07245472 · 19.12.2024 · 16:41:02"}]],
  foot:"Strittige Abgabe: 23.01.2025"};
var R2_DATENSATZ = {head:"Abgabedatensatz", sub:"Celecoxib 200 mg HKP N2 20 St. · 23.01.2025",
  rows:[
   [{k:"pzn",  l:"PZN",                 v:"04656246"},
    {k:"sond", l:"Sonder-PZN",          v:"Nicht\u00ADverfügbarkeit"}],
   [{k:"mehr", l:"Mehrkosten­übernahme", v:"— leer —"},
    {k:"char", l:"Charge",              v:"L4429821"}],
   [{k:"zuz",  l:"Zuzahlung",           v:"5,00 EUR"},
    {k:"fakt", l:"Faktor",              v:"1"}]]};

TOPICS.retax_nachweis = {
  de:"Der Nachweis", en:"The Proof", ar:"الإثبات",
  tag:"Retax",
  banner:"assets/Retax/retax2_scene_07_protokoll_in_hand.webp",
  sub:{de:"Büro · Retax", en:"Office · Claw-back", ar:"المكتب · ريتاكس"},
  badges:[],
  steps:[
 {mech:"comic",data:{kicker:"Szene 1 · Büro",
  title:"Ein Bescheid der Nordwaldt Kasse und eine Liste vom Verband", /* TECHNIK */
  cta:"Bescheid prüfen →", /* TECHNIK */
  visual:{seq:R2_SEQ1},
  bubbles:[
   {who:"Büro",txt:"Büro. Auf dem Bildschirm ein geöffneter Bescheid der Nordwaldt Kasse, darin eine Position über fünf Euro vierundzwanzig zu Celecoxib."},
   {who:"Büro",txt:"Unter der Begründung eine gedruckte Zeile: <b>ggf. Nichtverfügbarkeitsnachweise nachreichen</b>."},
   {who:"Büro",txt:"Neben dem Bildschirm eine Liste des Apothekerverbandes mit acht PZN, überschrieben <b>Zu folgenden Absetzungen haben wir noch Fragen</b>."}]}},

 {mech:"mcq",data:{kicker:"Entscheidung · Was die Kasse verlangt",
  title:"Die Kasse kürzt die Mehrkosten. Was verlangt sie tatsächlich?",
  visual:r2Bescheid(),
  options:[
   {t:"Eine rechtliche Begründung",p:0,tr:0,h:"Die Rechtslage ist unstreitig", /* TECHNIK h/x */
    x:"Die Rechtslage ist beiden Seiten bekannt. Streitig ist eine Tatsache."},
   {t:"Einen Nachweis der Nichtverfügbarkeit",p:25,tr:0,ok:true,h:"Das Tor ist ein Nachweis",
    x:"Die Kasse schreibt es selbst: ggf. Nichtverfügbarkeitsnachweise nachreichen."},
   {t:"Eine Preiskorrektur im Datensatz",p:0,tr:0,h:"Der Preis ist nicht strittig",
    x:"Gekürzt wird mangels Nachweis, nicht wegen eines Rechenfehlers."},
   {t:"Eine nachträgliche Genehmigung",p:0,tr:0,h:"Keine Genehmigung vorgesehen",
    x:"Die Kasse genehmigt nicht nachträglich. Sie verlangt einen Beleg."}],
  okH:"Der Nachweis",badH:"Nicht das, was die Kasse verlangt", /* TECHNIK */
  expl:"Die Begründung lautet wörtlich: <b>Mehrkosten zu Lasten der GKV nur bei Nichtverfügbarkeit eines Rabattpartners und keiner Alternative unterhalb des Festbetrages abrechnungsfähig</b>. Und die Kasse ergänzt ausdrücklich <b>ggf. Nichtverfügbarkeitsnachweise nachreichen</b>. Das Tor ist ein Nachweis, keine Norm. Die Rechtslage ist beiden Seiten bekannt und unstreitig. Streitig ist eine Tatsache: War das Rabattarzneimittel verfügbar oder nicht? Und die entscheidet kein Plädoyer, sondern ein Blatt Papier. Praktisch heißt das: Ein juristisch elegant formulierter Einspruch ohne Anlage wird abgelehnt. Ein Einspruch aus einem Satz mit dem richtigen Protokoll wird anerkannt."}},

 {mech:"truefalse",data:{kicker:"Aussage · Mehrkosten ohne Rabattvertrag", title:"Richtig oder falsch?",
  visual:r2Schachteln(),
  trueLabel:"richtig", falseLabel:"falsch", maxWrong:0,
  items:[{t:"Ohne Rabattverträge zum Wirkstoff gehen die Mehrkosten zulasten der Kasse.",
    ok:false, p:25, why:"Ohne Rabattvertrag ist die Voraussetzung nicht erfüllt. Die Mehrkosten zahlt der Patient."}], /* TECHNIK why */
  okH:"Gegen die Intuition richtig", badH:"Die naheliegende Falle", /* TECHNIK */
  expl:"Das genaue Gegenteil dessen, was intuitiv erscheint. § 11 Abs. 3 Rahmenvertrag knüpft die Übernahme der Mehrkosten durch die Kasse daran, dass die Abgabe im Rahmen von Abs. 2 erfolgt, also die Abgabe eines Rabattarzneimittels. Gibt es überhaupt keine Rabattverträge, ist die Voraussetzung nicht erfüllt, und die Mehrkosten gehen nie zulasten der Kasse. Ein dokumentierter Fall: Phenytoin AWD 200 St. war nicht lieferbar, abgegeben wurde die 100er-Packung desselben Herstellers. Der Wirkstoff steht auf der Substitutionsausschlussliste, ein Austausch war ausgeschlossen, Rabattverträge bestanden nicht. Berechnet wurde der volle Preis von 18,91 € bei einem Festbetrag von 15,57 €. Retax: 3,34 €. Richtig ist: Die Mehrkosten werden privat beim Patienten erhoben, mit dem Hinweis, die Quittung bei seiner Kasse zur Erstattung einzureichen. Gestützt wird das durch ein Rundschreiben des Bundesamtes für Soziale Sicherung vom 19.01.2022, wonach lieferengpassbedingte Mehrkosten von der GKV zu tragen wären. In den Rahmenvertrag aufgenommen wurde das bis heute nicht. Und Mehrkosten zahlen auch Zuzahlungsbefreite, einschließlich derer, die die Belastungsgrenze nach § 62 SGB V erreicht haben, sowie Kinder und Jugendliche bis zur Vollendung des achtzehnten Lebensjahres. Das ist das schwierigste Gespräch am HV überhaupt."}},

 {mech:"hunt",data:{kicker:"Suche · vier Protokolle",
  title:"Einspruch zur Celecoxib-Position, Abgabe am 23.01.2025. Tippe das richtige Protokoll an.",
  visual:r2Protokolle(),
  penalty:true, p:25,
  doc:R2_PROTOKOLLE,
  answer:"p2",
  wrong:{
   p1:"Anderes Präparat, andere Position.",
   p3:"Die PZN stimmt. Das Datum liegt anderthalb Monate daneben.",
   p4:"Gehört zu einem anderen Bescheid."},
  okH:"PZN und Datum stimmen", badH:"Nur ein Filter geprüft", /* TECHNIK */
  expl:"Zwei Filter, nicht einer: die PZN und das Datum. Protokoll 3 trifft die PZN exakt und verfehlt das Datum um anderthalb Monate. Das ist hier die eigentliche Falle, weil das Auge den Namen greift und das Datum überliest. Nichtverfügbarkeit ist ein Momentzustand. Ein Protokoll aus dem März sagt nichts über den Januar. Protokoll 1 ist völlig korrekt, gehört aber zu einer anderen Position, Protokoll 4 zur Rizatriptan-Position in einem anderen Bescheid. Die wichtigste Lehre liegt davor: Es muss überhaupt ein Protokoll geben. Wird am Abgabetag nicht abgefragt und dokumentiert, ist ein Jahr später nichts zu suchen."}},

 {mech:"mcq",data:{kicker:"Entscheidung · Beweiskraft",
  title:"Worauf beruht die Beweiskraft des Protokolls?",
  visual:r2Streifen(),
  options:[
   {t:"Auf Briefpapier und Unterschrift",p:0,tr:0,h:"Keine Unterschrift nötig", /* TECHNIK h/x */
    x:"Das Protokoll trägt keine Unterschrift. Seine Kraft liegt woanders."},
   {t:"Auf seiner Unveränderbarkeit",p:25,tr:0,ok:true,h:"Unveränderbar",
    x:"Das Protokoll sagt es selbst: Änderungen daran sind ausgeschlossen."},
   {t:"Auf der Zuordnung zum Patienten",p:0,tr:0,h:"Der Patient spielt keine Rolle",
    x:"Das Protokoll nennt den Patienten nicht. Streitig ist die Verfügbarkeit im Markt."},
   {t:"Auf der Beglaubigung der Kammer",p:0,tr:0,h:"Keine Beglaubigung",
    x:"Keine Kammer beglaubigt es. Die Software erzeugt es technisch."}],
  okH:"Unveränderbar", badH:"Nicht die Quelle der Beweiskraft", /* TECHNIK */
  expl:"Der Text auf dem Protokoll selbst: <b>…gemäß den in der Apothekensoftware protokollierten Abfragezeitpunkten technisch durch die Software ADG erstellt. Änderungen daran sind ausgeschlossen.</b> Die Beweiskraft beruht auf der Unveränderbarkeit, nicht auf einer Unterschrift und nicht auf einer Beglaubigung. Deshalb lässt es sich rückwirkend abrufen: In einem dokumentierten Fall wurde am 07.02.2024 um 09:38:07 abgefragt und das Protokoll am 29.01.2025 gedruckt, fast ein Jahr später, für einen späteren Einspruch. Die Daten liegen in der Software, nicht auf dem Papier; der Druck ist nur ein Auszug. Enthalten sind: Apotheke und Inhaber, PZN, Artikelname, Packungsgröße, Hersteller, Lieferant mit IK-Nummer, Abfragezeitpunkt auf die Sekunde und Druckzeitpunkt. Antwort C führt in die Irre: Das Protokoll nennt den Patienten nicht und braucht ihn auch nicht. Streitig ist die Verfügbarkeit im Markt, nicht die Identität des Empfängers."}},

 {mech:"rezept",data:{kicker:"EDV · Abgabedatensatz",
  title:"Die Abgabe läuft. Tippe im Abgabedatensatz das Feld an, dessen Fehlen die Mehrkosten an der Apotheke hängen lässt.",
  visual:{img:"assets/Retax/retax2_scene_09_edv_abgabedatensatz.webp"},
  doc:R2_DATENSATZ,
  answer:"mehr", p:25, p2:10, tries:3,
  missNote:"Zwei Felder arbeiten zusammen. Eines davon ist leer.",
  okH:"Das leere Feld", badH:"Ein anderes Feld", /* TECHNIK */
  wrong:{
   pzn: "Die PZN stimmt.",
   sond:"Die Sonder-PZN ist gesetzt. Sie erklärt das Warum, nicht das Wer zahlt.",
   char:"Die Charge gehört zur Dokumentation, nicht zur Abrechnung der Differenz.",
   zuz: "Die Zuzahlung ist korrekt und eine andere Größe.",
   fakt:"Der Faktor ist gesetzt."},
  expl:"Die Sonder-PZN ist gesetzt, der Grund der Abweichung ist erklärt. Aber die Mehrkostenübernahme steht leer, und damit fehlt die Erklärung, dass die Differenz von der Kasse verlangt wird. Die beiden Felder arbeiten zusammen: <b>Nichtverfügbarkeit eines rabattbegünstigten Fertigarzneimittels (§ 14 Abs. 1 S. 1 Alt. 1 i.V.m. § 11 Abs. 2 S. 1)</b> erklärt das Warum, <b>Mehrkostenübernahme ja, nach § 129 Abs. 4c SGB V</b> erklärt das Wer zahlt. Fehlt allein das zweite, trägt die Apotheke die Differenz, ohne es zu merken, und im Bescheid Monate später sieht es aus wie ein Abgabefehler. Die Dokumentation ist kodiert, nicht frei: Ein freier Textvermerk wie „Rabattarzneimittel nicht lieferbar“ wird maschinell nicht gelesen und entfaltet keine Wirkung. Das Protokoll selbst wird nicht mit der Abrechnung eingereicht, sondern erst beim Einspruch Monate später gezogen. Ziehen lässt es sich aber nur, wenn seinerzeit abgefragt wurde. Die Reihenfolge lautet: Abfrage zum Abgabezeitpunkt, Dokumentation im Datensatz, Protokollauszug bei Eingang des Bescheids."}},

 {mech:"sort",data:{kicker:"Sortierung · fünf Ursachen",
  title:"Ein Einspruch zu einer Mehrkosten-Position wurde abgelehnt. Sortiere die möglichen Ursachen.",
  visual:r2Karten(),
  hint:"Fünf Karten, zwei Fächer.", pts:25, /* TECHNIK hint */
  flagLabel:"Plausible Ursache", safeLabel:"Ausgeschlossen",
  cards:[
   {t:"Protokoll deckt nur einen Rabattpartner",flag:true},
   {t:"Abfragedatum trifft den Abgabetag nicht",flag:true},
   {t:"Abfrage nur bei einem von zwei Lieferanten",flag:true},
   {t:"Der Betrag war zu klein zum Prüfen",flag:false},
   {t:"Die Kasse prüft Mehrkosten grundsätzlich nicht",flag:false}],
  okH:"Die Lücken erkannt", badH:"Ursachen verwechselt", /* TECHNIK */
  expl:"Der häufigste Ablehnungsgrund ist nicht das Fehlen des Nachweises, sondern seine Lücke. Alle drei plausiblen Ursachen sind Lücken: ein Protokoll, das einen Rabattpartner abdeckt, während die Kasse drei hat; ein Datum, das den Abgabetag nicht trifft; eine Abfrage bei einem Lieferanten, während die Apotheke mit zweien arbeitet. Karte 4 ist trotz ihrer Verlockung ausgeschlossen: Die Prüfung läuft maschinell, der Betrag beeinflusst sie nicht. Karte 5 ebenfalls: Die Kasse prüft, sie verlangt nur einen Nachweis. Beachtenswert ist die Verschärfung der Begründung: <b>951 Mehrkosten nur erstattungsfähig bei Nichtlieferfähigkeit rabattierter Arzneimittel</b> spricht von Nichtlieferfähigkeit statt Nichtverfügbarkeit und lässt die Wendung <b>ggf. nachreichen</b> weg. Die Kasse lädt also nicht mehr zum Nachreichen ein, sie hat entschieden. Daraus folgt die praktische Regel: Bei Nichtverfügbarkeit werden alle Rabattpartner dieser Kasse abgefragt, nicht nur der erste, und bei mehreren Lieferanten alle."}},

 {mech:"euro",data:{kicker:"Bilanz · Was zurückkommt",
  title:"Drei Positionen: 5,24 € · 15,49 € · 8,12 €. Protokolle nur für die ersten zwei. Ergebnis?",
  visual:r2Muenzen(),
  options:[{t:"28,85 € zurück",p:0},{t:"20,73 € zurück",p:50,ok:true},{t:"8,12 € zurück",p:0},{t:"Nichts zurück",p:0}],
  ledger:[
   {l:"Celecoxib · Protokoll vorhanden",  v:"5,24 €",  cls:"plus"},
   {l:"Position 2 · Protokoll vorhanden", v:"15,49 €", cls:"plus"},
   {l:"Salbutamol · ohne Protokoll",      v:"8,12 €",  cls:"minus"},
   {l:"Zurück",                           v:"20,73 €", cls:"big plus"}],
  okH:"Genau gerechnet", badH:"Die Rechnung geht anders", /* TECHNIK */
  expl:"5,24 + 15,49 = 20,73 €. Die Salbutamol-Position bleibt stehen, und sie blieb im realen Fall auch stehen. Drei Anmerkungen. Erstens der Summeneffekt: Die drei Positionen zusammen liegen bei knapp neunundzwanzig Euro, deutlich über der Lohnschwelle, während jede einzelne nahe daran liegt. Einsprüche gegen Mehrkosten-Positionen werden in einem Schreiben gebündelt, dadurch sinkt der Zeitaufwand je Position. Zweitens ist der Abstand zwischen 20,73 und 28,85 kein Zufall, sondern die Differenz einer nicht protokollierten Abfrage. Acht Euro sind in einem Moment verloren gegangen, in dem die richtige Handlung keine zehn Sekunden gedauert hätte. Drittens kann der Apothekerverband zwischen Ihnen und der Kasse stehen. Im realen Fall forderte der Verband Nachweise zu acht PZN per Fax unter Angabe der Vorgangsnummer und ergänzte: <b>Danach werden wir den Einspruch umgehend auf den Weg bringen</b>. Er kann den Einspruch aber auch gar nicht erst einlegen; dann endet die Sache bei Ihnen, ohne dass Sie es aus mehr erfahren als dem nächsten Schreiben. Das Schreiben des Verbandes ist damit eine interne Frist, die kürzer ist als die der Kasse."}}
],
  steps_en:[
 {mech:"comic",data:{kicker:"Scene 1 · The office",
  title:"A notice from Nordwaldt Kasse and a list from the association", /* TECHNIK */
  cta:"Check the notice →", /* TECHNIK */
  visual:{seq:R2_SEQ1},
  bubbles:[
   {who:"Office",txt:"The office. On the screen an open notice from Nordwaldt Kasse, containing a position of five euros twenty-four on Celecoxib."},
   {who:"Office",txt:"Below the reason, one printed line: <b>ggf. Nichtverfügbarkeitsnachweise nachreichen</b>."},
   {who:"Office",txt:"Beside the screen a list from the pharmacists' association carrying eight PZN, headed <b>Zu folgenden Absetzungen haben wir noch Fragen</b>."}]}},

 {mech:"mcq",data:{kicker:"Decision · What the insurer wants",
  title:"The insurer deducts the extra cost. What is it actually asking for?",
  visual:r2Bescheid(),
  options:[
   {t:"A legal argument",p:0,tr:0,h:"The law is not in dispute", /* TECHNIK h/x */
    x:"Both sides know the legal position. What is disputed is a fact."},
   {t:"Proof of unavailability",p:25,tr:0,ok:true,h:"The gate is evidence",
    x:"The insurer says so itself: ggf. Nichtverfügbarkeitsnachweise nachreichen."},
   {t:"A price correction in the record",p:0,tr:0,h:"The price is not in dispute",
    x:"The deduction is for missing evidence, not for a calculation error."},
   {t:"A retrospective authorisation",p:0,tr:0,h:"No authorisation foreseen",
    x:"The insurer does not authorise after the fact. It asks for proof."}],
  okH:"The proof",badH:"Not what the insurer asks for", /* TECHNIK */
  expl:"The reason reads literally: extra costs are billable to statutory insurance only where a rebate partner was unavailable and no alternative below the reference price existed. And the insurer expressly adds <b>ggf. Nichtverfügbarkeitsnachweise nachreichen</b>. The gate is evidence, not a provision. The legal position is known to both sides and undisputed. What is disputed is a fact: was the rebated product available or not? And that is settled by a sheet of paper, not by advocacy. In practice: a legally elegant appeal with no attachment is refused. A one-sentence appeal with the right protocol is granted."}},

 {mech:"truefalse",data:{kicker:"Statement · Extra cost without a rebate contract", title:"True or false?",
  visual:r2Schachteln(),
  trueLabel:"true", falseLabel:"false", maxWrong:0,
  items:[{t:"With no rebate contracts for the substance, the extra cost falls to the insurer.",
    ok:false, p:25, why:"Without a rebate contract the condition is not met. The patient pays the extra cost."}], /* TECHNIK why */
  okH:"Right against intuition", badH:"The obvious trap", /* TECHNIK */
  expl:"The exact opposite of what feels intuitive. § 11 (3) of the framework contract ties the insurer's assumption of extra costs to dispensing within Abs. 2, that is, dispensing a rebated product. Where no rebate contracts exist at all the condition is unmet, and the extra cost never falls to the insurer. A documented case: Phenytoin AWD 200 was unavailable, so the 100 pack from the same manufacturer was dispensed. The substance is on the substitution exclusion list, so no swap was permitted, and no rebate contracts existed. The full price of 18.91 € was billed against a reference price of 15.57 €. Claw-back: 3.34 €. The correct route: collect the extra cost privately from the patient, advising them to submit the receipt to their insurer for reimbursement. This is supported by a circular of the Federal Social Insurance Office of 19.01.2022, holding that shortage-driven extra costs should be borne by statutory insurance. To date it has not been written into the framework contract. And extra costs are paid even by those exempt from co-payment, including people who have reached the burden limit under § 62 SGB V, and children and adolescents up to the age of eighteen. That is the hardest conversation at the counter there is."}},

 {mech:"hunt",data:{kicker:"Search · four protocols",
  title:"Appeal on the Celecoxib position, dispensed 23.01.2025. Tap the correct protocol.",
  visual:r2Protokolle(),
  penalty:true, p:25,
  doc:R2_PROTOKOLLE,
  answer:"p2",
  wrong:{
   p1:"Different product, different position.",
   p3:"The PZN matches. The date is six weeks off.",
   p4:"Belongs to another notice."},
  okH:"PZN and date match", badH:"Only one filter checked", /* TECHNIK */
  expl:"Two filters, not one: the PZN and the date. Protocol 3 matches the PZN exactly and misses the date by six weeks. That is the real trap here, because the eye grabs the name and skims past the date. Unavailability is a momentary state. A protocol from March says nothing about January. Protocol 1 is entirely correct but belongs to a different position; protocol 4 to the Rizatriptan position in another notice. The most important lesson comes earlier: a protocol has to exist at all. If nothing is queried and documented on the day of dispensing, there is nothing to search for a year later."}},

 {mech:"mcq",data:{kicker:"Decision · Evidential force",
  title:"What gives the protocol its evidential force?",
  visual:r2Streifen(),
  options:[
   {t:"On letterhead and signature",p:0,tr:0,h:"No signature needed", /* TECHNIK h/x */
    x:"The protocol carries no signature. Its force lies elsewhere."},
   {t:"On its unalterability",p:25,tr:0,ok:true,h:"Unalterable",
    x:"The protocol says so itself: alterations to it are excluded."},
   {t:"On the link to the patient",p:0,tr:0,h:"The patient plays no part",
    x:"The protocol does not name the patient. What is disputed is availability in the market."},
   {t:"On certification by the chamber",p:0,tr:0,h:"No certification",
    x:"No chamber certifies it. The software generates it technically."}],
  okH:"Unalterable", badH:"Not the source of its force", /* TECHNIK */
  expl:"The text on the protocol itself: it is generated technically by the ADG software from the query times logged in the pharmacy system, and alterations to it are excluded. The evidential force rests on unalterability, not on a signature and not on certification. That is why it can be retrieved retrospectively: in a documented case the query was made on 07.02.2024 at 09:38:07 and the protocol printed on 29.01.2025, almost a year later, for a subsequent appeal. The data sit in the software, not on the paper; the printout is only an extract. It contains: pharmacy and proprietor, PZN, article name, pack size, manufacturer, wholesaler with IK number, query time to the second, and print time. Answer C misleads: the protocol does not name the patient and does not need to. What is disputed is availability in the market, not the identity of the recipient."}},

 {mech:"rezept",data:{kicker:"Pharmacy system · Dispensing record",
  title:"The dispensing is in progress. In the record, tap the field whose absence leaves the extra cost with the pharmacy.",
  visual:{img:"assets/Retax/retax2_scene_09_edv_abgabedatensatz.webp"},
  doc:R2_DATENSATZ,
  answer:"mehr", p:25, p2:10, tries:3,
  missNote:"Two fields work together. One of them is empty.",
  okH:"The empty field", badH:"A different field", /* TECHNIK */
  wrong:{
   pzn: "The PZN is correct.",
   sond:"The special PZN is set. It explains why, not who pays.",
   char:"The batch belongs to documentation, not to billing the difference.",
   zuz: "The co-payment is correct and a different quantity.",
   fakt:"The factor is set."},
  expl:"The special PZN is set and the reason for the deviation is stated. But the extra-cost assumption field is empty, so the statement that the difference is claimed from the insurer is missing. The two fields work together: the unavailability entry explains why, and the extra-cost entry explains who pays. If only the second is missing, the pharmacy bears the difference without noticing, and in the notice months later it looks like a dispensing error. The documentation is coded, not free-form: a free-text note such as \"rebated product unavailable\" is not machine-read and has no effect. The protocol itself is not submitted with the billing; it is pulled only at the appeal months later. But it can only be pulled if the query was made at the time. The sequence is: query at the moment of dispensing, documentation in the record, protocol extract when the notice arrives."}},

 {mech:"sort",data:{kicker:"Sorting · five causes",
  title:"An appeal on an extra-cost position was refused. Sort the possible causes.",
  visual:r2Karten(),
  hint:"Five cards, two trays.", pts:25, /* TECHNIK hint */
  flagLabel:"Plausible cause", safeLabel:"Ruled out",
  cards:[
   {t:"Protocol covers only one rebate partner",flag:true},
   {t:"Query date misses the day of dispensing",flag:true},
   {t:"Query at one of two wholesalers only",flag:true},
   {t:"The amount was too small to review",flag:false},
   {t:"The insurer never reviews extra costs",flag:false}],
  okH:"The gaps spotted", badH:"Causes mixed up", /* TECHNIK */
  expl:"The commonest ground for refusal is not the absence of evidence but its gap. All three plausible causes are gaps: a protocol covering one rebate partner while the insurer has three; a date that does not match the day of dispensing; a query at one wholesaler while the pharmacy works with two. Card 4 is ruled out despite its appeal: the review runs automatically and the amount does not affect it. Card 5 likewise: the insurer does review, it simply demands evidence. Note the sharpening of the reason: <b>951</b> speaks of inability to supply rather than unavailability and drops the invitation to submit evidence later. The insurer is no longer inviting completion; it has decided. From this follows the practical rule: on unavailability, query all rebate partners of that insurer, not only the first, and all wholesalers where there are several."}},

 {mech:"euro",data:{kicker:"Balance · What comes back",
  title:"Three positions: 5.24 € · 15.49 € · 8.12 €. Protocols for the first two only. Outcome?",
  visual:r2Muenzen(),
  options:[{t:"28.85 € recovered",p:0},{t:"20.73 € recovered",p:50,ok:true},{t:"8.12 € recovered",p:0},{t:"Nothing recovered",p:0}],
  ledger:[
   {l:"Celecoxib · protocol on file",  v:"5.24 €",  cls:"plus"},
   {l:"Position 2 · protocol on file", v:"15.49 €", cls:"plus"},
   {l:"Salbutamol · no protocol",      v:"8.12 €",  cls:"minus"},
   {l:"Recovered",                     v:"20.73 €", cls:"big plus"}],
  okH:"Exactly calculated", badH:"The sum works out differently", /* TECHNIK */
  expl:"5.24 + 15.49 = 20.73 €. The Salbutamol position stands, and it stood in the real case too. Three notes. First, the aggregation effect: the three positions together come to nearly twenty-nine euros, well above the worthwhile threshold, while each alone sits close to it. Appeals on extra-cost positions are bundled into one letter, which lowers the time cost per position. Second, the gap between 20.73 and 28.85 is not luck but the difference made by an unlogged query. Eight euros were lost in a moment where the right action would have taken under ten seconds. Third, the pharmacists' association may stand between you and the insurer. In the real case it requested evidence on eight PZN by fax quoting the case number and added that it would then put the appeal on its way immediately. But it can also decline to lodge the appeal at all, in which case the matter ends with you, and you learn of it only from the next letter. The association's letter is therefore an internal deadline shorter than the insurer's."}}
],
  steps_ar:[
 /* Arabisch neu geschrieben am 22.11.2026 (Ammar: die erste Fassung las
    sich wie eine woertliche Uebersetzung). Kurze Saetze, Ich-Form, jeder
    deutsche Fachbegriff einmal auf Arabisch erklaert. */
 {mech:"comic",data:{kicker:"المشهد 1 · المكتب",
  title:"إشعار خصم من Nordwaldt Kasse، ورسالة من اتحاد الصيادلة",
  cta:"أقرأ الإشعار ←",
  visual:{seq:R2_SEQ1},
  bubbles:[
   {who:"المكتب",txt:"صباح في المكتب. على شاشتي إشعار من Nordwaldt Kasse: خصمت 5,24 يورو من وصفة Celecoxib."},
   {who:"المكتب",txt:"تحت سبب الخصم سطر مطبوع، معناه: أرسلوا عند الحاجة ما يثبت أن الدواء لم يكن متوفراً.<br><b dir=\"ltr\">ggf. Nichtverfügbarkeitsnachweise nachreichen</b>"},
   {who:"المكتب",txt:"وفي يدي رسالة من اتحاد الصيادلة فيها ثمانية أرقام PZN، يسألني فيها عن خصومات لم يُعترض عليها بعد."}]}},

 {mech:"mcq",data:{kicker:"قرار · ماذا تريد الكاسة؟",
  title:"الكاسة خصمت فرق السعر. ماذا تطلب مني لتعيده؟",
  visual:r2Bescheid(),
  options:[
   {t:"حجة قانونية",p:0,tr:0,h:"القانون ليس موضع الخلاف",
    x:"القاعدة يعرفها الطرفان. الخلاف على ما حدث فعلاً."},
   {t:"إثباتاً أن الدواء لم يكن متوفراً",p:25,tr:0,ok:true,h:"تريد إثباتاً",
    x:"الكاسة كتبتها في الإشعار نفسه: أرسلوا إثبات عدم التوفر."},
   {t:"تصحيح السعر في بيانات الصرف",p:0,tr:0,h:"السعر ليس خطأ",
    x:"الخصم ليس بسبب خطأ في الحساب، بل لأن الإثبات غائب."},
   {t:"موافقة لاحقة من الكاسة",p:0,tr:0,h:"لا توجد موافقة لاحقة",
    x:"الكاسة لا توافق بعد الصرف. هي تطلب ورقة تثبت."}],
  okH:"المطلوب إثبات",badH:"ليس هذا ما تطلبه الكاسة",
  expl:"سبب الخصم في الإشعار: الكاسة تدفع فرق السعر (Mehrkosten) فقط إذا لم يكن دواء الشركة المتعاقدة معها (Rabattpartner) متوفراً، ولم يكن هناك بديل بسعر لا يتجاوز السعر الثابت (Festbetrag). ثم تضيف بنفسها: أرسلوا ما يثبت عدم التوفر.<br><br>القانون إذن واضح للطرفين، والسؤال الوحيد: هل كان الدواء متوفراً يوم الصرف أم لا؟ وهذا لا يحسمه كلام، تحسمه ورقة.<br><br>في الواقع: اعتراض طويل بلغة قانونية بلا مرفق يُرفض، واعتراض من سطر واحد ومعه سجلّ الاستعلام الصحيح يُقبل."}},

 {mech:"truefalse",data:{kicker:"صح أم خطأ · دواء بلا عقود خصم", title:"صح أم خطأ؟",
  visual:r2Schachteln(),
  trueLabel:"صح", falseLabel:"خطأ", maxWrong:0,
  items:[{t:"إذا لم يكن للمادة الفعالة أي عقد خصم مع الكاسة، تدفع الكاسة فرق السعر.",
    ok:false, p:25, why:"بلا عقد خصم لا تدفع الكاسة الفرق. يدفعه المريض."}],
  okH:"صحيح، رغم أنه يبدو غريباً", badH:"هذا ما يظنه أغلب الناس",
  expl:"العكس هو الصحيح. الكاسة تتحمّل فرق السعر فقط حين يكون السبب أن دواء الشركة المتعاقدة غير متوفر (§ 11 Abs. 3 Rahmenvertrag). فإن لم يوجد عقد خصم أصلاً، لا تتحمّل الكاسة الفرق أبداً.<br><br>مثال حقيقي: Phenytoin AWD عبوة 200 غير متوفرة، فصُرفت عبوة 100 من الشركة نفسها. المادة لا يجوز استبدالها، ولا عقد خصم عليها. السعر 18,91 € والسعر الثابت 15,57 €، فخصمت الكاسة 3,34 €.<br><br>الصحيح: آخذ الفرق من المريض نفسه، وأقول له إنه يستطيع تقديم الإيصال لكاسته ليطلب استرداده. هناك تعميم من Bundesamt für Soziale Sicherung بتاريخ 19.01.2022 يرى أن الكاسة يجب أن تتحمّل هذا الفرق عند نقص التوريد، لكنه لم يدخل العقد الإطاري حتى اليوم.<br><br>والفرق يدفعه حتى المعفى من المساهمة: من بلغ حدّ الإعفاء (§ 62 SGB V)، والأطفال حتى 18 سنة. وهذا من أصعب الأحاديث على الكاونتر."}},

 {mech:"hunt",data:{kicker:"بحث · أربعة سجلّات",
  title:"أريد الاعتراض على خصم Celecoxib. الصرف كان يوم 23.01.2025. أيّ سجلّ استعلام يثبت ذلك؟",
  visual:r2Protokolle(),
  penalty:true, p:25,
  doc:R2_PROTOKOLLE,
  answer:"p2",
  wrong:{
   p1:"دواء آخر، يخص خصماً آخر.",
   p3:"رقم PZN صحيح، لكن التاريخ بعد الصرف بشهر ونصف.",
   p4:"هذا يخص إشعاراً آخر."},
  okH:"الرقم والتاريخ صحيحان", badH:"نظرتُ إلى الاسم فقط",
  expl:"أبحث بشرطين لا بشرط واحد: رقم PZN والتاريخ.<br><br>السجلّ 3 رقمه صحيح لكن تاريخه بعد الصرف بشهر ونصف. هذا هو الفخ: العين تلتقط اسم الدواء وتنسى التاريخ. عدم التوفر حالة في يوم معيّن، فسجلّ من آذار لا يثبت شيئاً عن كانون الثاني.<br><br>السجلّ 1 صحيح لكنه لدواء آخر، والسجلّ 4 لخصم Rizatriptan في إشعار آخر.<br><br>والأهم قبل كل شيء: يجب أن يكون هناك سجلّ أصلاً. إن لم أستعلم وأوثّق يوم الصرف، فلن أجد شيئاً أبحث عنه بعد سنة."}},

 {mech:"mcq",data:{kicker:"قرار · لماذا يُصدَّق السجلّ؟",
  title:"لماذا تقبل الكاسة سجلّ الاستعلام دليلاً؟",
  visual:r2Streifen(),
  options:[
   {t:"لأنه على ورق الصيدلية وموقّع",p:0,tr:0,h:"لا يحتاج توقيعاً",
    x:"السجلّ ليس عليه توقيع. قوته من شيء آخر."},
   {t:"لأنه لا يمكن تعديله",p:25,tr:0,ok:true,h:"لا يُعدَّل",
    x:"مكتوب عليه نفسه: لا يمكن تغيير محتواه."},
   {t:"لأنه مرتبط باسم المريض",p:0,tr:0,h:"المريض ليس له دور هنا",
    x:"السجلّ لا يذكر المريض. السؤال عن توفر الدواء في السوق."},
   {t:"لأن غرفة الصيادلة تصدّقه",p:0,tr:0,h:"لا أحد يصدّقه",
    x:"لا جهة تصدّقه. البرنامج يصنعه آلياً."}],
  okH:"لا يمكن تعديله", badH:"ليس هذا سبب قوته",
  expl:"مكتوب على السجلّ نفسه أن برنامج ADG أنشأه آلياً من أوقات الاستعلام المحفوظة، وأن تعديله غير ممكن. فقوّته من أنه لا يُعدَّل، لا من توقيع ولا من ختم.<br><br>لهذا يمكن طباعته بعد وقت طويل: في حالة حقيقية كان الاستعلام يوم 07.02.2024 الساعة 09:38:07، وطُبع السجلّ يوم 29.01.2025، بعد سنة تقريباً، من أجل اعتراض. المعلومات محفوظة في البرنامج، والورقة مجرد نسخة منها.<br><br>فيه: الصيدلية وصاحبها، رقم PZN، اسم الدواء وحجم العبوة والشركة، المورّد، ووقت الاستعلام بالثانية، ووقت الطباعة. ولا يذكر المريض، لأن السؤال عن توفر الدواء في السوق، لا عن من أخذه."}},

 {mech:"rezept",data:{kicker:"البرنامج · بيانات الصرف",
  title:"أصرف الدواء الآن. أيّ حقل في بيانات الصرف إن بقي فارغاً أدفع أنا فرق السعر؟",
  visual:{img:"assets/Retax/retax2_scene_09_edv_abgabedatensatz.webp"},
  doc:R2_DATENSATZ,
  answer:"mehr", p:25, p2:10, tries:3,
  missNote:"حقلان يعملان معاً، وأحدهما فارغ.",
  okH:"الحقل الفارغ", badH:"حقل آخر",
  wrong:{
   pzn: "رقم PZN صحيح.",
   sond:"الرمز الخاص (Sonder-PZN) موجود. هو يقول لماذا صُرف غير المتعاقد، لا من يدفع الفرق.",
   char:"رقم التشغيلة للتوثيق، لا علاقة له بالفرق.",
   zuz: "المساهمة صحيحة، وهي شيء آخر.",
   fakt:"العامل موجود."},
  expl:"الرمز الخاص (Sonder-PZN) موجود، وهو يشرح أن الدواء المتعاقد لم يكن متوفراً. لكن حقل «تحمّل فرق السعر» (Mehrkostenübernahme) فارغ، فلم أطلب من الكاسة أن تدفع الفرق.<br><br>الحقلان يعملان معاً: الأول يقول لماذا، والثاني يقول من يدفع. إن نسيت الثاني أتحمّل الفرق دون أن أنتبه، وبعد أشهر يظهر في الإشعار كأنه خطأ في الصرف.<br><br>والتوثيق يكون بالحقول المخصّصة في البرنامج. ملاحظة مكتوبة بيدي مثل «الدواء غير متوفر» لا يقرؤها نظام الكاسة ولا تفيد.<br><br>والسجلّ نفسه لا يُرسل مع الفاتورة، أطبعه فقط حين يصل الإشعار. لكنه لا يوجد إلا إذا استعلمت يومها. فالترتيب: أستعلم وقت الصرف، ثم أعبّئ الحقلين، ثم أطبع السجلّ عند الاعتراض."}},

 {mech:"sort",data:{kicker:"فرز · خمسة أسباب",
  title:"رُفض اعتراضي على خصم فرق السعر. ما الأسباب الممكنة؟",
  visual:r2Karten(),
  hint:"خمس بطاقات ودُرجان.", pts:25,
  flagLabel:"سبب ممكن", safeLabel:"ليس سبباً",
  cards:[
   {t:"السجلّ يغطي شركة متعاقدة واحدة فقط",flag:true},
   {t:"تاريخ الاستعلام غير يوم الصرف",flag:true},
   {t:"استعلمتُ عند مورّد واحد من اثنين",flag:true},
   {t:"المبلغ صغير فلم يفحصوه",flag:false},
   {t:"الكاسة لا تفحص فرق السعر أبداً",flag:false}],
  okH:"عرفتُ أين النقص", badH:"خلطتُ الأسباب",
  expl:"أغلب الاعتراضات لا تُرفض لأن الإثبات غائب، بل لأنه ناقص. والأسباب الثلاثة الممكنة كلها نقص:<br>• السجلّ يغطي شركة متعاقدة واحدة، والكاسة متعاقدة مع ثلاث.<br>• تاريخ الاستعلام ليس يوم الصرف.<br>• استعلمتُ عند مورّد واحد، والصيدلية تتعامل مع اثنين.<br><br>البطاقة 4 ليست سبباً: الفحص آلي ولا يهمه حجم المبلغ. والبطاقة 5 كذلك: الكاسة تفحص، لكنها تطلب إثباتاً.<br><br>وفي إشعار الرفض تتغيّر لغة الكاسة: الرمز <b dir=\"ltr\">951</b> يتكلم عن عدم قدرة الشركة على التوريد، ولا يقول «أرسلوا إثباتاً». أي أنها لم تعد تنتظر شيئاً، بل قرّرت.<br><br>القاعدة العملية: إذا لم يتوفر الدواء أستعلم عند كل الشركات المتعاقدة مع تلك الكاسة، لا الأولى فقط، وعند كل المورّدين."}},

 {mech:"euro",data:{kicker:"الحساب · كم يعود إليّ؟",
  title:"ثلاثة خصومات: 5,24 € و15,49 € و8,12 €. عندي سجلّ للأول والثاني فقط. كم يعود؟",
  visual:r2Muenzen(),
  options:[{t:"يعود 28,85 €",p:0},{t:"يعود 20,73 €",p:50,ok:true},{t:"يعود 8,12 €",p:0},{t:"لا يعود شيء",p:0}],
  ledger:[
   {l:"Celecoxib · عندي سجلّ",       v:"5,24 €",  cls:"plus"},
   {l:"الخصم الثاني · عندي سجلّ",    v:"15,49 €", cls:"plus"},
   {l:"Salbutamol · لا سجلّ",        v:"8,12 €",  cls:"minus"},
   {l:"يعود إليّ",                   v:"20,73 €", cls:"big plus"}],
  okH:"حساب صحيح", badH:"الحساب غير ذلك",
  expl:"5,24 + 15,49 = 20,73 €. أما Salbutamol فيبقى مخصوماً، وهذا ما حدث فعلاً في الحالة الحقيقية.<br><br>ثلاث ملاحظات:<br>• كل خصم وحده صغير، لكن الثلاثة معاً قرابة 29 يورو، وهذا يستحق الاعتراض. وأجمع الاعتراضات في رسالة واحدة لأوفّر الوقت.<br>• الفرق بين 20,73 و28,85 ليس حظاً، بل استعلام لم أوثّقه. ثمانية يوروات ضاعت، وكان الاستعلام سيأخذ أقل من عشر ثوانٍ.<br>• اتحاد الصيادلة قد يكون الوسيط بيني وبين الكاسة. في الحالة الحقيقية طلب الإثباتات بالفاكس مع رقم المعاملة، ثم يرفع الاعتراض. وقد لا يرفعه أصلاً، فلا أعرف إلا من الرسالة التالية. لذلك موعد الاتحاد أقصر من موعد الكاسة، وألتزم به."}}
]
};
