/* =====================================================================
   Falldaten · buero_formfehler_01
   Ausgelagert aus game/index.html am 12.11.2026 (Technik: Daten-Split).
   Inhalt woertlich uebernommen, nur Bildendungen .jpg/.png -> .webp.
   Geladen erst beim Start des Falls durch levelDaten(); der Stummel in
   index.html traegt nur Titel, Persona, Banner und src.
===================================================================== */
/* =====================================================================
   BÜRO · REZEPTPRÜFUNG · B2 · buero_formfehler_01
   Quelle: LEVEL_buero_formfehler_01_v1.0.md · 12.09.2026
   Acht Schritte. Punkte auf den Hausstandard geeicht: 0 + 25x6 + 50 = 200.
   Spieldatum fest 19.08. Alle Texte stammen aus der Vorlage.
===================================================================== */
TOPICS.buero_formfehler_01 = {
  de:"Drei Rezepte, drei Fallen", en:"Three Prescriptions, Three Traps",
  ar:"ثلاث وصفات، ثلاثة فخاخ",
  tag:"Rezeptprüfung",
  banner:"assets/Retax/retax_scene_lupe.webp",
  sub:{de:"Büro · Rezeptprüfung", en:"Office · Prescription review", ar:"المكتب · تدقيق الوصفات"},
  badges:[],
  reqRank:0,
  steps:[
  {mech:"comic",data:{kicker:"Szene 1 · Der Prüfkorb",
    title:"Drei Rezepte aus der Frühschicht",
    img:"assets/Rezeptpruefung/pruef_korb_drei_rezepte.webp", cta:"Prüfen →",
    bubbles:[{who:"Büro",txt:"Der Prüfkorb auf deinem Schreibtisch. Drei Rezepte aus der Frühschicht, sie warten darauf, durch deine Hand zu gehen, bevor sie ins Rechenzentrum wandern. Was hier durchgeht, ist <b>deine Verantwortung</b>."}]}},

  {mech:"rezept",data:{kicker:"Rezept A · Nordwaldt Kasse", penalty:true, p:25,
    title:"Was stimmt an diesem Rezept nicht? Tippe direkt auf das Feld.",
    scene:"assets/Rezeptpruefung/pruef_stift_gebrochen_v002.webp",
    doc:{type:"m16", r:REZ_A, open:["unterschrift","datum","dosis","status","ktk"]},
    answer:"unterschrift", okH:"Die fehlende Unterschrift",
    wrong:{datum:"Das Datum liegt sieben Tage zurück. Die 28-Tage-Frist läuft.",
           dosis:"Korrekt. Das Kürzel bedeutet, dass eine schriftliche Dosierungsanweisung vorliegt.",
           status:"Status 5 bedeutet Rentnerin. Passt zum Geburtsdatum.",
           ktk:"Neunstellig und vorhanden. In Ordnung."},
    expl:"Die eigenhändige Unterschrift ist Pflicht nach § 2 Abs. 1 Nr. 10 AMVV. Eine fehlende Unterschrift lässt den Erstattungsanspruch gegenüber der Kasse verfallen. Das ist keine Ermessensfrage und keine Teilkürzung. Das Retaxverbot des § 129 Abs. 4d SGB V, das die meisten anderen Formfehler entschärft hat, greift hier nicht."}},

  {mech:"mcq",data:{kicker:"Szene 2 · Kundin wartet · HV 2 · 4 Min",
    scene:"assets/Rezeptpruefung/pruef_telefonhoerer.webp", title:"Was tust du?",
    options:[
      {t:"Abgeben und die Unterschrift später nachreichen lassen",p:0,tr:-6,h:"Verbreitet und trotzdem ungedeckt",
       x:"In der Praxis verbreitet und trotzdem ungedeckt. Der Vergütungsanspruch entsteht erst mit Belieferung einer ordnungsgemäßen Verordnung."},
      {t:"Selbst abzeichnen, die Praxis ist bekannt",p:0,tr:-10,h:"Das wäre Urkundenfälschung",
       x:"Ergänzen darfst du Ausstellungsdatum, Dosierung, LANR, Geburtsdatum und IK. Die Unterschrift nie. Das wäre Urkundenfälschung."},
      {t:"Praxis kontaktieren, Rezept zur Unterschrift zurückgeben, Kundin informieren",ok:true,p:25,tr:9,h:"Der tragfähige Weg",
       x:"Die Praxis korrigiert ihren eigenen Fehler, der Anspruch bleibt bestehen, und die Kundin weiß, woran sie ist."},
      {t:"Auf Privatrechnung abgeben",p:0,tr:-8,h:"Die Kundin zahlt für einen fremden Fehler",
       x:"Die Kundin verliert ihren Leistungsanspruch wegen eines Fehlers, den die Praxis gemacht hat."}]}},

  {mech:"rezept",data:{kicker:"Rezept B · Bruncker Classic", penalty:true,
    title:"Zwei Angaben fehlen",
    scene:"assets/Rezeptpruefung/pruef_lupe_rezept.webp",
    doc:{type:"m16", r:REZ_B, open:["datum","dosis","vers","status","verordnung"]},
    phases:[
      {q:"Eine fehlende Angabe stoppt hier jede weitere Prüfung. Tippe sie an.",
       answer:"datum", p:25, okH:"Ohne Datum keine Prüfung",
       img:"assets/Rezeptpruefung/pruef_feld_leer_lupe.webp",
       wrong:{dosis:"Richtig gesehen, und gleich ist sie dran. Aber diese Angabe hindert dich nicht daran, weiterzuprüfen."},
       expl:"Ohne Ausstellungsdatum kannst du die Gültigkeit überhaupt nicht beurteilen. Du weißt nicht, ob die 28-Tage-Frist läuft, abgelaufen ist oder im Drei-Tage-Puffer liegt. Das Datum ist die Voraussetzung jeder weiteren Prüfung."},
      {q:"Eine zweite Angabe fehlt ebenfalls. Tippe sie an.",
       answer:"dosis", p:25, okH:"Die fehlende Dosierung",
       img:"assets/Retax/retax_scene_textmarker.webp",
       expl:"Die fehlende Dosierung ist seit § 129 Abs. 4d SGB V retaxgeschützt und darf vom pharmazeutischen Personal ergänzt werden, wenn sie zweifelsfrei bekannt ist, etwa aus einem Medikationsplan, den der Patient bei sich trägt. Im dringenden Fall ist die Ergänzung auch ohne Rücksprache zulässig. Zwei fehlende Angaben auf einem Rezept, zwei völlig verschiedene Folgen. Genau diesen Unterschied misst dieses Level."}]}},

  {mech:"truefalse",data:{kicker:"Szene 3 · Schnellprüfung", title:"Richtig oder falsch?",
    scene:"assets/Rezeptpruefung/pruef_sanduhr_rezept.webp",
    trueLabel:"Richtig", falseLabel:"Falsch",
    okH:"Sauber unterschieden", badH:"Der Zusatz war die Falle",
    expl:"Der erste Teil stimmt, der Zusatz „auf jedem Rezepttyp\" nicht. Auf T-Rezepten darf das Ausstellungsdatum weder ergänzt noch korrigiert werden, auch nicht nach Rücksprache. T-Rezepte sind arztgebunden und nur 7 Tage inklusive Verschreibungstag gültig. Jede zulässige Ergänzung ist mit Datum und Handzeichen abzuzeichnen, ohne Ausnahme.",
    items:[{t:"„Ein fehlendes Ausstellungsdatum darf die Apotheke nach Rücksprache mit der Praxis ergänzen, auf jedem Rezepttyp.\"",ok:false,p:25,
      why:"Auf T-Rezepten gilt das nicht, auch nicht nach Rücksprache."}]}},

  {mech:"euro",data:{kicker:"Szene 4 · Was es kostet",
    title:"Rezept A wurde ohne Unterschrift abgerechnet. Was erstattet die Kasse?",
    p:25, okH:"Die zwei Stufen", badH:"Das ist die andere Stufe",
    options:[
      {t:"Erstattung zum Einkaufspreis", p:0},
      {t:"Erstattungsanspruch 0 €", ok:true, p:25},
      {t:"Keine Retaxation, alles bleibt", p:0}],
    scene:"assets/Retax/retax_scene_waage_zeit_geld.webp",
    scene2:"assets/Retax/retax_scene_zwei_packungsgroessen.webp",
    ledger:[
      {l:"Madopar LT 100 St. N3 · Apothekenverkaufspreis", v:"78 €"},
      {l:"Erstattungsanspruch", v:"0 €", cls:"bad"},
      {l:"Wareneinsatz bleibt bei der Apotheke", v:"−78 €", cls:"bad"},
      {l:"Zum Vergleich · Abweichung von der Abgaberangfolge ohne Dokumentation", v:"Erstattung = Einkaufspreis"}],
    expl:"Zwei verschiedene Schweregrade. Die fehlende Unterschrift lässt den gesamten Erstattungsanspruch verfallen. Weicht die Apotheke dagegen ohne Dokumentation von der Abgaberangfolge ab, wird seit § 129 Abs. 4d nicht mehr auf null retaxiert, sondern nur noch der Einkaufspreis erstattet: Die Marge ist weg, die Ware nicht."}},

  {mech:"hunt",data:{kicker:"Rezept C · Spektrion", penalty:true, p:25, title:"Formal ist alles korrekt. Finde trotzdem das Problem. 45 Sekunden.",
    doc:{type:"m16", r:REZ_C, kartei:karteiC(),
         open:["marcumar","panto","inr","abgabe","datum","verordnung","dosis","unterschrift"]},
    answer:"marcumar", okH:"Die Wechselwirkung gefunden", badH:"Nicht gefunden",
    timeoutH:"Zeit abgelaufen",
    timeoutX:"Zeit abgelaufen. Der Blick blieb auf dem Rezept, das Problem stand daneben.",
    missNote:"Formal in Ordnung. Das Problem liegt woanders.",
    expl:"Ibuprofen und Phenprocoumon zusammen erhöhen das Blutungsrisiko doppelt: NSAR hemmen die Thrombozytenaggregation und schädigen die Magenschleimhaut, zusätzlich kann die INR steigen. Das Pantoprazol schützt den Magen, nicht die Gerinnung. Das ist kein Retaxthema, sondern Patientensicherheit. Rücksprache mit der Praxis, Alternativvorschlag Metamizol oder Paracetamol je nach Indikation. Zusatz: Phenprocoumon steht auf der Substitutionsausschlussliste und darf auch ohne Aut-idem-Kreuz nicht ausgetauscht werden."}},

  {mech:"triage",data:{kicker:"Szene 5 \u00b7 Drei Fächer", per:5,
    scene:"assets/Rezeptpruefung/pruef_drei_stapel.webp",
    title:"In welches Fach gehört der Fehler?",
    progress:"{a} von {b} einsortiert",
    okH:"Alle fünf richtig einsortiert", badH:"Nicht alle saßen richtig",
    trays:[
      {n:"Vollständiger Verlust", s:"Der Erstattungsanspruch entfällt ganz"},
      {n:"Keine Retaxation", s:"Seit § 129 Abs. 4d folgenlos"},
      {n:"Nur der Einkaufspreis", s:"Die Marge fällt weg, die Ware nicht"}],
    items:[
      {n:"Fehlende Arztunterschrift", s:"Rezept A", tray:0,
       why:"Die eine Ausnahme, bei der es um alles geht."},
      {n:"Fehlendes Ausstellungsdatum", s:"Rezept B", tray:1,
       why:"Seit § 129 Abs. 4d retaxgeschützt und ergänzbar."},
      {n:"Fehlende Dosierungsangabe", s:"Rezept B", tray:1,
       why:"Ergänzbar durch pharmazeutisches Personal, retaxgeschützt."},
      {n:"Abweichung von der Abgaberangfolge", s:"ohne Dokumentation", tray:2,
       why:"Keine Nullretaxation mehr, aber die Marge ist weg."},
      {n:"Abgabe am 30. Tag", s:"Kassenrezept", tray:1,
       why:"Tag 30 liegt noch im Drei-Tage-Puffer."}],
    expl:"Drei Stufen statt einer. Vieles, was im Kopf noch als Nullretax gilt, ist heute entweder folgenlos oder nur noch eine Margenkürzung. Die eine Ausnahme, bei der es um alles geht, ist die fehlende Unterschrift. Die 28-Tage-Frist ist bis zu drei Tage geschützt: Tag 30 liegt noch im Puffer, Tag 32 nicht mehr. Vom Schutz ausgenommen bleiben BtM-Rezepte, T-Rezepte, Entlassrezepte und oral einzunehmende Retinoide bei Frauen im gebärfähigen Alter."}}
  ]
};

TOPICS.buero_formfehler_01.steps_en = [
  {mech:"comic",data:{kicker:"Scene 1 · The review basket",
    title:"Three prescriptions from the morning shift",
    img:"assets/Rezeptpruefung/pruef_korb_drei_rezepte.webp", cta:"Check →",
    bubbles:[{who:"Office",txt:"The review basket on your desk. Three prescriptions from the morning shift, waiting to pass through your hands before they go to the billing centre. Whatever gets through here is <b>your responsibility</b>."}]}},

  {mech:"rezept",data:{kicker:"Prescription A · Nordwaldt Kasse", penalty:true, p:25,
    title:"What is wrong with this prescription? Tap the field directly.",
    scene:"assets/Rezeptpruefung/pruef_stift_gebrochen_v002.webp",
    doc:{type:"m16", r:REZ_A, open:["unterschrift","datum","dosis","status","ktk"]},
    answer:"unterschrift", okH:"The missing signature",
    wrong:{datum:"The date is seven days old. The 28-day window is running.",
           dosis:"Correct. The marking means a written dosage instruction exists.",
           status:"Status 5 means pensioner. Consistent with the date of birth.",
           ktk:"Nine digits and present. Fine."},
    expl:"A handwritten signature is mandatory under § 2 (1) no. 10 AMVV. A missing signature forfeits the reimbursement claim against the insurer. This is not discretionary and not a partial reduction. The clawback ban in § 129 (4d) SGB V, which defused most other formal defects, does not apply here."}},

  {mech:"mcq",data:{kicker:"Scene 2 · Patient waiting · Counter 2 · 4 min",
    scene:"assets/Rezeptpruefung/pruef_telefonhoerer.webp", title:"What do you do?",
    options:[
      {t:"Dispense and have the signature added later",p:0,tr:-6,h:"Common and still unsupported",
       x:"Common in practice and still unsupported. The payment claim only arises upon dispensing a properly issued prescription."},
      {t:"Sign it yourself, the practice is known",p:0,tr:-10,h:"That would be document forgery",
       x:"You may add the issue date, dosage, physician number, date of birth and insurer code. Never the signature. That would be document forgery."},
      {t:"Contact the practice, return the prescription for signature, tell the patient about the delay",ok:true,p:25,tr:9,h:"The workable way",
       x:"The practice corrects its own mistake, the claim stands, and the patient knows where she is."},
      {t:"Dispense against a private invoice",p:0,tr:-8,h:"She pays for someone else's error",
       x:"The patient loses her benefit entitlement because of an error the practice made."}]}},

  {mech:"rezept",data:{kicker:"Prescription B · Bruncker Classic", penalty:true,
    title:"Two entries are missing",
    scene:"assets/Rezeptpruefung/pruef_lupe_rezept.webp",
    doc:{type:"m16", r:REZ_B, open:["datum","dosis","vers","status","verordnung"]},
    phases:[
      {q:"One missing entry stops every further check here. Tap it.",
       answer:"datum", p:25, okH:"No date, no check",
       img:"assets/Rezeptpruefung/pruef_feld_leer_lupe.webp",
       wrong:{dosis:"Well spotted, and its turn comes next. But that entry does not stop you from checking further."},
       expl:"Without an issue date you cannot assess validity at all. You do not know whether the 28-day window is running, expired, or inside the three-day buffer. The date is the precondition for every further check."},
      {q:"A second entry is missing too. Tap it.",
       answer:"dosis", p:25, okH:"The missing dosage",
       img:"assets/Retax/retax_scene_textmarker.webp",
       expl:"A missing dosage has been clawback-protected since § 129 (4d) SGB V and may be added by pharmacy staff when known beyond doubt, for instance from a medication plan the patient carries. In urgent cases it may be added without consultation. Two missing entries on one prescription, two entirely different consequences. That difference is exactly what this level measures."}]}},

  {mech:"truefalse",data:{kicker:"Scene 3 · Quick check", title:"True or false?",
    scene:"assets/Rezeptpruefung/pruef_sanduhr_rezept.webp",
    trueLabel:"True", falseLabel:"False",
    okH:"Cleanly distinguished", badH:"The qualifier was the trap",
    expl:"The first part is right, the qualifier \"on every type\" is not. On T-prescriptions the issue date may neither be added nor corrected, not even after consultation. T-prescriptions are tied to the prescriber and valid for only 7 days including the day of issue. Every permitted addition must be dated and initialled, without exception.",
    items:[{t:"\"A missing issue date may be added by the pharmacy after consulting the practice, on every type of prescription.\"",ok:false,p:25,
      why:"On T-prescriptions it does not apply, not even after consultation."}]}},

  {mech:"euro",data:{kicker:"Scene 4 · What it costs",
    title:"Prescription A was billed without a signature. What does the insurer reimburse?",
    p:25, okH:"The two tiers", badH:"That is the other tier",
    options:[
      {t:"Reimbursement at cost price", p:0},
      {t:"Reimbursement claim 0 €", ok:true, p:25},
      {t:"No clawback, everything stands", p:0}],
    scene:"assets/Retax/retax_scene_waage_zeit_geld.webp",
    scene2:"assets/Retax/retax_scene_zwei_packungsgroessen.webp",
    ledger:[
      {l:"Madopar LT 100 St. N3 · pharmacy retail price", v:"78 €"},
      {l:"Reimbursement claim", v:"0 €", cls:"bad"},
      {l:"Cost of goods stays with the pharmacy", v:"−78 €", cls:"bad"},
      {l:"For comparison · undocumented departure from the dispensing hierarchy", v:"reimbursement = cost price"}],
    expl:"Two different severities. A missing signature forfeits the entire reimbursement claim. Departing from the dispensing hierarchy without documentation, by contrast, no longer permits a zero clawback under § 129 (4d), only reimbursement at cost price: the margin is gone, the goods are not."}},

  {mech:"hunt",data:{kicker:"Prescription C · Spektrion", penalty:true, p:25, title:"Formally everything is correct. Find the problem anyway. 45 seconds.",
    doc:{type:"m16", r:REZ_C, kartei:karteiC(),
         open:["marcumar","panto","inr","abgabe","datum","verordnung","dosis","unterschrift"]},
    answer:"marcumar", okH:"Interaction found", badH:"Not found",
    timeoutH:"Time is up",
    timeoutX:"Time is up. Your eyes stayed on the prescription; the problem was sitting next to it.",
    missNote:"Formally fine. The problem is elsewhere.",
    expl:"Ibuprofen and phenprocoumon together raise bleeding risk twice over: NSAIDs inhibit platelet aggregation and damage gastric mucosa, and the INR may rise. The pantoprazole protects the stomach, not the coagulation. This is not a billing issue but patient safety. Consult the practice, propose metamizole or paracetamol depending on indication. Note: phenprocoumon is on the substitution-exclusion list and must not be substituted even without an aut-idem cross."}},

  {mech:"triage",data:{kicker:"Scene 5 · Three trays", per:5,
    scene:"assets/Rezeptpruefung/pruef_drei_stapel.webp",
    title:"Which tray does the defect belong in?",
    progress:"{a} of {b} sorted",
    okH:"All five sorted correctly", badH:"Not all of them landed right",
    trays:[
      {n:"Full loss", s:"The reimbursement claim is gone entirely"},
      {n:"No clawback", s:"Without consequence since § 129 (4d)"},
      {n:"Cost price only", s:"The margin goes, the goods do not"}],
    items:[
      {n:"Missing physician signature", s:"Prescription A", tray:0,
       why:"The one exception where everything is at stake."},
      {n:"Missing issue date", s:"Prescription B", tray:1,
       why:"Clawback-protected and addable since § 129 (4d)."},
      {n:"Missing dosage statement", s:"Prescription B", tray:1,
       why:"Addable by pharmacy staff, clawback-protected."},
      {n:"Departure from the dispensing hierarchy", s:"undocumented", tray:2,
       why:"No zero clawback any more, but the margin is gone."},
      {n:"Dispensing on day 30", s:"statutory prescription", tray:1,
       why:"Day 30 is still inside the three-day buffer."}],
    expl:"Three tiers, not one. Much that is still remembered as a zero clawback is today either without consequence or merely a margin cut. The one exception where everything is at stake is the missing signature. The 28-day window is protected for up to three days: day 30 is inside the buffer, day 32 is not. Excluded from protection: narcotics, T-prescriptions, discharge prescriptions and oral retinoids for women of childbearing potential."}}
];

TOPICS.buero_formfehler_01.steps_ar = [
  {mech:"comic",data:{kicker:"المشهد 1 · سلة المراجعة",
    title:"ثلاث وصفات من نوبة الصباح",
    img:"assets/Rezeptpruefung/pruef_korb_drei_rezepte.webp", cta:"ابدأ الفحص ←",
    bubbles:[{who:"المكتب",txt:"سلة المراجعة على مكتبك. ثلاث وصفات من نوبة الصباح، تنتظر أن تمرّ من يدك قبل أن تذهب إلى مركز الحساب. ما يمرّ من هنا يصير <b>مسؤوليتك</b>."}]}},

  {mech:"rezept",data:{kicker:"الوصفة A · Nordwaldt Kasse", penalty:true, p:25,
    title:"ما الخطأ في هذه الوصفة؟ اضغط الخانة مباشرة.",
    scene:"assets/Rezeptpruefung/pruef_stift_gebrochen_v002.webp",
    doc:{type:"m16", r:REZ_A, open:["unterschrift","datum","dosis","status","ktk"]},
    answer:"unterschrift", okH:"التوقيع الناقص",
    wrong:{datum:"التاريخ قبل سبعة أيام، ومهلة الـ28 يوماً ما زالت جارية.",
           dosis:"صحيح. الرمز يعني وجود تعليمة جرعة مكتوبة لدى المريضة.",
           status:"الحالة 5 تعني متقاعدة، وتوافق تاريخ الميلاد.",
           ktk:"تسع خانات وموجود. سليم."},
    expl:"التوقيع بخط اليد إلزامي بحسب AMVV §2 Abs. 1 Nr. 10. ونقص التوقيع يُسقط حق المطالبة تجاه الصندوق. هذه ليست مسألة تقدير ولا تخفيض جزئي. ومنع الريتاكس في §129 Abs. 4d SGB V، الذي أسقط معظم أخطاء الشكل الأخرى، لا يسري هنا."}},

  {mech:"mcq",data:{kicker:"المشهد 2 · مريضة تنتظر · طاولة 2 · 4 دقائق",
    scene:"assets/Rezeptpruefung/pruef_telefonhoerer.webp", title:"ماذا تفعل؟",
    options:[
      {t:"الصرف وطلب التوقيع لاحقاً",p:0,tr:-6,h:"شائع ومع ذلك غير مغطّى",
       x:"شائع عملياً ومع ذلك غير مغطّى. حق الأجر لا ينشأ إلا بصرف وصفة سليمة."},
      {t:"التوقيع بنفسك، فالعيادة معروفة",p:0,tr:-10,h:"هذا تزوير محرَّر",
       x:"يجوز لك إكمال تاريخ الإصدار والجرعة و LANR وتاريخ الميلاد ورقم IK. لا التوقيع أبداً. ذلك تزوير محرَّر."},
      {t:"الاتصال بالعيادة وإعادة الوصفة للتوقيع، وإبلاغ المريضة بمدة الانتظار",ok:true,p:25,tr:9,h:"الطريق الوحيد السليم",
       x:"العيادة تصحّح خطأها، ويبقى الحق قائماً، وتعرف المريضة موقفها."},
      {t:"الصرف على فاتورة خاصة",p:0,tr:-8,h:"تدفع المريضة ثمن خطأ غيرها",
       x:"تفقد المريضة حقها التأميني بسبب خطأ ارتكبته العيادة."}]}},

  {mech:"rezept",data:{kicker:"الوصفة B · Bruncker Classic", penalty:true,
    title:"بيانان ناقصان",
    scene:"assets/Rezeptpruefung/pruef_lupe_rezept.webp",
    doc:{type:"m16", r:REZ_B, open:["datum","dosis","vers","status","verordnung"]},
    phases:[
      {q:"بيان واحد ناقص هنا يوقف كل فحص لاحق. اضغطه.",
       answer:"datum", p:25, okH:"بلا تاريخ لا فحص",
       img:"assets/Rezeptpruefung/pruef_feld_leer_lupe.webp",
       wrong:{dosis:"ملاحظة صحيحة، وسيأتي دورها بعد قليل. لكن هذا البيان لا يمنعك من مواصلة الفحص."},
       expl:"بلا تاريخ الإصدار لا تستطيع تقدير الصلاحية إطلاقاً. لا تعرف إن كانت مهلة الـ28 يوماً جارية أم منتهية أم داخل هامش الأيام الثلاثة. التاريخ شرط لكل فحص لاحق."},
      {q:"بيان ثانٍ ناقص أيضاً. اضغطه.",
       answer:"dosis", p:25, okH:"الجرعة الناقصة",
       img:"assets/Retax/retax_scene_textmarker.webp",
       expl:"نقص الجرعة محميّ من الريتاكس منذ §129 Abs. 4d SGB V، ويجوز للكادر الصيدلاني إكماله متى كان معروفاً بيقين، مثلاً من خطة دوائية يحملها المريض. وفي الحالة العاجلة يجوز الإكمال بلا اتصال. نقصان في وصفة واحدة، وعاقبتاهما مختلفتان تماماً. وهذا هو الفرق الذي تقيسه المرحلة."}]}},

  {mech:"truefalse",data:{kicker:"المشهد 3 · فحص سريع", title:"صحيح أم خطأ؟",
    scene:"assets/Rezeptpruefung/pruef_sanduhr_rezept.webp",
    trueLabel:"صحيح", falseLabel:"خطأ",
    okH:"تمييز دقيق", badH:"الإضافة كانت الفخّ",
    expl:"الجزء الأول صحيح، والإضافة «على كل أنواع الوصفات» خاطئة. على T-Rezept لا يجوز إكمال تاريخ الإصدار ولا تصحيحه، ولا حتى بعد الاتصال. وهي مرتبطة بالطبيب وصلاحيتها سبعة أيام شاملة يوم الوصف. وكل إكمال مسموح يُؤشَّر بالتاريخ والحرف الأول للاسم، بلا استثناء.",
    items:[{t:"«يجوز للصيدلية إكمال تاريخ الإصدار الناقص بعد الاتصال بالعيادة، على كل أنواع الوصفات.»",ok:false,p:25,
      why:"على T-Rezept لا يسري ذلك، ولا حتى بعد الاتصال."}]}},

  {mech:"euro",data:{kicker:"المشهد 4 · ما الذي يكلّفه",
    title:"حوسبت الوصفة A بلا توقيع. ماذا يدفع الصندوق؟",
    p:25, okH:"الدرجتان", badH:"هذه هي الدرجة الأخرى",
    options:[
      {t:"التعويض بسعر الشراء", p:0},
      {t:"حق المطالبة صفر يورو", ok:true, p:25},
      {t:"لا ريتاكس، ويبقى كل شيء", p:0}],
    scene:"assets/Retax/retax_scene_waage_zeit_geld.webp",
    scene2:"assets/Retax/retax_scene_zwei_packungsgroessen.webp",
    ledger:[
      {l:"Madopar LT 100 St. N3 · سعر البيع في الصيدلية", v:"78 €"},
      {l:"حق المطالبة", v:"0 €", cls:"bad"},
      {l:"ثمن البضاعة يبقى على الصيدلية", v:"−78 €", cls:"bad"},
      {l:"للمقارنة · الخروج عن ترتيب الصرف بلا توثيق", v:"التعويض = سعر الشراء"}],
    expl:"درجتان مختلفتان. نقص التوقيع يُسقط حق المطالبة كله. أما الخروج عن ترتيب الصرف بلا توثيق فلم يعد يُصفَّر منذ §129 Abs. 4d، بل يُدفع سعر الشراء فقط: الهامش يضيع والبضاعة لا."}},

  {mech:"hunt",data:{kicker:"الوصفة C · Spektrion", penalty:true, p:25, title:"كل شيء سليم شكلياً. جد المشكلة رغم ذلك. 45 ثانية.",
    doc:{type:"m16", r:REZ_C, kartei:karteiC(),
         open:["marcumar","panto","inr","abgabe","datum","verordnung","dosis","unterschrift"]},
    answer:"marcumar", okH:"وجدت التداخل", badH:"لم تُوجد",
    timeoutH:"انتهى الوقت",
    timeoutX:"انتهى الوقت. بقي النظر على الوصفة، والمشكلة كانت بجانبها.",
    missNote:"سليم شكلياً. المشكلة في مكان آخر.",
    expl:"الإيبوبروفين مع الفينبروكومون يرفعان خطر النزف مرتين: مضادات الالتهاب اللاستيرويدية تثبّط تكدّس الصفيحات وتؤذي مخاطية المعدة، ويمكن أن يرتفع INR فوق ذلك. والبانتوبرازول يحمي المعدة لا التخثّر. هذه ليست مسألة ريتاكس بل سلامة مريض. الاتصال بالعيادة واقتراح ميتاميزول أو باراسيتامول بحسب الاستطباب. إضافة: الفينبروكومون على قائمة استثناء الاستبدال، فلا يُستبدل حتى بلا صليب Aut-idem."}},

  {mech:"triage",data:{kicker:"المشهد 5 · ثلاثة رفوف", per:5,
    scene:"assets/Rezeptpruefung/pruef_drei_stapel.webp",
    title:"في أي رفّ يوضع الخطأ؟",
    progress:"{a} من {b}",
    okH:"الخمسة في أماكنها", badH:"لم تستقرّ كلها في مكانها",
    trays:[
      {n:"فقدان كامل", s:"يسقط حق المطالبة كله"},
      {n:"لا ريتاكس", s:"بلا عاقبة منذ §129 Abs. 4d"},
      {n:"سعر الشراء فقط", s:"يضيع الهامش لا البضاعة"}],
    items:[
      {n:"نقص توقيع الطبيب", s:"الوصفة A", tray:0,
       why:"الاستثناء الوحيد الذي يُخسر فيه كل شيء."},
      {n:"نقص تاريخ الإصدار", s:"الوصفة B", tray:1,
       why:"محميّ وقابل للإكمال منذ §129 Abs. 4d."},
      {n:"نقص بيان الجرعة", s:"الوصفة B", tray:1,
       why:"يكمله الكادر الصيدلاني، ومحميّ من الريتاكس."},
      {n:"الخروج عن ترتيب الصرف", s:"بلا توثيق", tray:2,
       why:"لم يعد يُصفَّر، لكن الهامش يضيع."},
      {n:"الصرف في اليوم الثلاثين", s:"وصفة صندوق", tray:1,
       why:"اليوم الثلاثون ما زال داخل هامش الأيام الثلاثة."}],
    expl:"ثلاث درجات لا واحدة. كثير مما لا يزال في الأذهان بوصفه ريتاكس صفري صار اليوم إما بلا عاقبة أو مجرد قصّ للهامش. والاستثناء الوحيد الذي يُخسر فيه كل شيء هو نقص التوقيع. ومهلة الـ28 يوماً محمية حتى ثلاثة أيام: اليوم الثلاثون داخل الهامش والثاني والثلاثون خارجه. ويبقى خارج الحماية: وصفات المخدرات و T-Rezept ووصفات الخروج والريتينويدات الفموية للنساء في سن الإنجاب."}}
];
