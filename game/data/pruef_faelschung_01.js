/* =====================================================================
   BÜRO · Rezeptprüfung · pruef_faelschung_01 · Eine von beiden ist gefälscht
   Inhalt: 02_Fallsammlungen/STUFE_pruef_faelschung_01_v1.0.md
   (Drive 1vDSvV5fnnDFMxVPLAsvp63lOq2cc8mM2), Texte woertlich.
   Mechaniken: js/pruef_engine.js (pruefkette · entscheidung · persona · bilanz)
   Rezepte: rotes Muster 16 aus js/m16.js, ganzes Blatt, kein Wischen.
   Punkte (kalibriert auf 200, Technik 25.11.2026, Freigabe Ammar offen):
     comic 0 · pruefkette 30 · entscheidung 50 · persona 25 ·
     comic 0 · pruefkette 30 · entscheidung 50 · bilanz 15 = 200
   Schritt 4 nur nach Verweigerung in Schritt 3 (step.wenn).
   Personen, Praxen, Kassen und Nummern konstruiert.
===================================================================== */
(function(){
var A="assets/Rezeptpruefung/";

var REZ1={
  kasse:"SPEKTRION", kassen_nr:"104212505", vnr:"S445120933", status:"1",
  bsnr:"987654300", lanr:"987654321", datum:"20.11.26",
  vname:"Vogt", vvorname:"Rainer", vstrasse:"Lindenweg 12", vort:"33442 Herzebrock", geb:"03.07.88",
  rx1:"Tilidin retard 200/16 mg", rx2:"100 St.   N3",
  st1:"BSNR 987654300", st2:"Dr. med. T. Reuter", st3:"Praxis für Allgemeinmedizin",
  st4:"Bahnhofstr. 4", st5:"32051 Herford",
  barcode:"123456700"
};
var REZ2={
  kasse:"NORDWALDT KASSE", kassen_nr:"103411401", vnr:"N771204558", status:"5",
  bsnr:"456789100", lanr:"456789123", datum:"20.11.26",
  vname:"Krüger", vvorname:"Werner", vstrasse:"Amselweg 9", vort:"33428 Harsewinkel", geb:"14.02.51",
  rx1:"Pregabalin 300 mg", rx2:"100 St.   N3", rx3:">>1-0-1<<",
  st1:"BSNR 456789100", st2:"Dr. med. S. Hoffmann", st3:"Fachärztin für Neurologie",
  st4:"Marktstr. 18", st5:"33428 Harsewinkel",
  barcode:"456789100"
};
/* Tippbereich des Blatts -> Befund. stempel_oben: Zeilen st1/st2 (BSNR),
   stempel_unten: Praxisname und Adresse. */
var MAP1={bsnr:"stempel", stempel_oben:"stempel", barcode:"stempel", stempelOben:["st1","st2"],
  rx1:"vo", rx2:"menge", stempel_unten:"adresse", datum:"datum", sig:"sig", kassen_nr:"ktk", status:"status"};
var MAP2={bsnr:"stempel", stempel_oben:"stempel", barcode:"stempel", stempelOben:["st1","st2"],
  rx1:"vo", rx2:"menge", rx3:"dos", stempel_unten:"adresse", datum:"datum", sig:"sig", versicherter:"name"};

var TX={
de:{
  titel:"Eine von beiden ist gefälscht",
  k1:"Rezept 1 · HV-Tisch", k2:"Rezept 1 · Prüfkette", k3:"Rezept 1 · Entscheidung", k4:"Rezept 1 · Kundentyp",
  k5:"Rezept 2 · HV-Tisch", k6:"Rezept 2 · Prüfkette", k7:"Rezept 2 · Entscheidung", k8:"Bilanz",
  wer:"HV-Tisch", cta:"Rezept prüfen →", t4:"Er wird laut.", t8:"Zwei Rezepte, zwei Entscheidungen",
  s1:"Halb zwölf. Ein Mann Mitte dreißig legt ein Blatt auf den Tresen und schiebt es mit den Fingerspitzen zu mir herüber. „Tilidin. Hundert Stück. Schnell bitte, ich steh im Halteverbot.“ Er sieht mich nicht an. Sein Blick bleibt auf dem Telefon.",
  quellen:"Drei Quellen stehen mir offen. Ich entscheide selbst, wann es mir reicht.",
  papierIntro:"Das Rezept in Bildschirmgröße. Ich tippe auf ein Feld und bekomme das Ergebnis seiner Prüfung.",
  kundeIntro:"Bis zu drei Fragen aus sechs.",
  leiste:"Objektive Hinweise: {n} von {m}",
  f1:{stempel:["Arztstempel","Die BSNR im Stempel stimmt nicht mit der aufgedruckten Codierzeile unten rechts überein."],
      vo:["Verordnungszeile","Das Arzneimittel ist handschriftlich eingetragen, alles andere ist gedruckt."],
      adresse:["Praxisadresse","Herford liegt 60 km entfernt, ohne erkennbaren Bezug zur Wohnadresse des Patienten."],
      datum:["Datum","Gestern. Innerhalb der Frist."],
      sig:["Unterschrift","Vorhanden und handschriftlich."],
      ktk:["Kostenträgerkennung","Neunstellig, Aufbau korrekt."],
      status:["Status","1, berufstätig. Passt zum Geburtsjahr."],
      menge:["Menge","N3. Groß, aber zulässig."]},
  fr1:[["Für wen ist das Rezept?","„Für mich.“ Eine Sekunde später: „Für meinen Bruder. Also, er hat das Rezept, aber er kann nicht kommen.“"],
       ["Waren Sie schon einmal bei uns?","„Ja, oft.“ Seine Kundendatei existiert im System nicht."],
       ["Nehmen Sie das Präparat zum ersten Mal?","„Nein nein, schon lange.“ Nach der Dosierung gefragt, weiß er sie nicht."],
       ["Sind Sie sicher, dass das ein echtes Rezept ist?","Er versteift sich und schweigt. Das Gespräch endet hier. Ein Verdacht wird geprüft, nicht ausgesprochen. Eine direkte Konfrontation verschließt die einzige Quelle, die noch geredet hätte."],
       ["Zahlen Sie bar oder mit Karte?","Bringt nichts. Eine verschenkte Frage."],
       ["Möchten Sie eine Tüte dazu?","Bringt nichts. Eine verschenkte Frage."]],
  praxis1:"Die Empfangskraft geht ran. Ich lese ihr die BSNR aus dem Stempel vor. „Das ist nicht unsere Nummer. Unsere beginnt mit 123. Woher haben Sie dieses Rezept?“",
  frage:"Abgeben oder verweigern?",
  ref2:"Bei begründetem Verdacht ist die Verweigerung Pflicht. Alles Weitere ist eine rechtliche Gratwanderung: Eine Strafanzeige kann mit der Schweigepflicht kollidieren, sie erfolgt deshalb nicht reflexhaft, sondern als Einzelfallentscheidung und mit Kenntnis der Apothekenleitung. Was ich ohne Zögern tue: den Vorgang intern dokumentieren, die im Stempel genannte Praxis informieren und meine Kolleginnen und Kollegen über die Beschreibung in Kenntnis setzen. Das Rezept wortlos zurückzugeben ist der häufigste Fehler — er schiebt das Problem nur zur nächsten Apotheke weiter.",
  ref0:"Ich habe verweigert und lag richtig. Aber ich habe verweigert, weil der Mann mir verdächtig vorkam, nicht weil das Papier etwas bewiesen hätte. Das ist keine Prüfung, das ist ein Urteil über das Auftreten. Käme morgen ein onkologischer Patient, angespannt und in Eile, würde ich ihn nach derselben Logik abweisen.",
  abg1:"Ich habe auf ein gefälschtes Rezept abgegeben. Der Vergütungsanspruch entfällt vollständig, dazu kommen straf- und sozialrechtliche Folgen. Und schwerer als das Geld: Hundert Stück Tilidin retard haben meine Apotheke verlassen, in einen Markt hinein, den ich nicht kenne.",
  hRef2:"Verweigert, belegt", hRef1:"Verweigert, ein Hinweis", hRef0:"Verweigert ohne Beleg", hAbg:"Abgegeben",
  zitat:"„Was soll das heißen, Sie geben das nicht raus? Wollen Sie mir sagen, dass ich lüge? Ich hab hier ein Rezept von einem Arzt und Sie machen mich zum Verbrecher.“",
  antw:[["A","„Ich verstehe Ihren Ärger, <b>aber</b> die Vorschriften sind eindeutig.“"],
        ["B","„Sie haben recht, dass Sie eine Erklärung verdienen. Ich habe in der Praxis angerufen, die auf dem Blatt steht. Die Nummer ist nicht ihre. Ich kann dieses Rezept nicht beliefern.“"],
        ["C","„Bitte beruhigen Sie sich, sonst muss ich Sie bitten zu gehen.“"],
        ["D","„Das ist nicht meine Entscheidung, das macht der Chef.“"]],
  persX:"Der Aggressive hat ein hohes Selbstwertbedürfnis und fühlt sich übergangen. Wirksam ist: sachlich bleiben, zuerst eine Übereinstimmung formulieren, dann zum Thema zurückkehren — und ohne „aber“, weil das Wort alles davor löscht. Genau daran scheitert Antwort A, die sonst richtig klänge. C erhöht die Eskalation, D gibt die Führung ab und signalisiert, dass Druck sich lohnt.",
  pOk:"Richtig gelesen", pNo:"Nicht getroffen",
  s5:"Zwanzig Minuten später. Ein junger Mann Ende zwanzig legt ein Rezept auf den Tresen und sieht auf seine Uhr. „Für meinen Vater. Er war gestern im Krankenhaus, sie haben ihn entlassen. Geht das schnell? Ich muss in einer Viertelstunde zur Arbeit.“ Seine Finger trommeln auf dem Tresen.",
  f2:{stempel:["Arztstempel","Die BSNR im Stempel stimmt mit der Codierzeile exakt überein."],
      vo:["Verordnungszeile","Gedruckt, wie das übrige Rezept."],
      adresse:["Praxisadresse","Neurologische Praxis am selben Ort wie die Wohnadresse."],
      datum:["Datum","Gestern."],
      sig:["Unterschrift","Vorhanden und handschriftlich."],
      dos:["Dosierung",">>1-0-1<< eingetragen."],
      name:["Patientenname","Weicht vom Namen des Mannes vor mir ab."],
      menge:["Menge","N3."]},
  alle2:"Kein einziger objektiver Hinweis. Das Papier ist vollständig in Ordnung.",
  fr2:[["Für wen ist das Rezept?","„Für meinen Vater. Ich hole seine Sachen, wenn meine Schwester nicht kann.“"],
       ["Nimmt Ihr Vater das Präparat schon?","„Ehrlich gesagt weiß ich es nicht. Meine Schwester kümmert sich darum. Ich helfe nur aus.“"],
       ["Haben Sie die Karte Ihres Vaters dabei?","Er zieht sie sofort aus der Tasche."],
       ["Wie schnell wirkt das Mittel?","„Keine Ahnung. Hauptsache, es wird besser. Gestern hat er vor Schmerzen geschrien.“"],
       ["Sind Sie sicher, dass das ein echtes Rezept ist?","Er erstarrt. „Was?“ Dann schweigt er. Ich habe einen Mann, dessen Vater seit gestern Schmerzen hat, vor dem Tresen des Diebstahls bezichtigt."],
       ["Zahlen Sie bar oder mit Karte?","Bringt nichts."]],
  praxis2:"Die Ärztin selbst geht ran. „Ja, das habe ich gestern ausgestellt. Er kam mit neuropathischen Schmerzen nach einer Gürtelrose aus dem Krankenhaus. Sein Sohn sagte, er kommt vorbei. Gibt es ein Problem?“",
  abgOk:"Ich habe geprüft, nichts gefunden und abgegeben. Das ist der ganze Unterschied: Das Papier entscheidet, nicht der Eindruck. Pregabalin gehört zu den in Deutschland am häufigsten gefälschten Verordnungen — genau deshalb verdient es die Prüfung. Aber geprüft wird das Papier, nicht das Gesicht des Menschen vor mir.",
  abgOhne:"Die Entscheidung war richtig, aber ich habe nichts geprüft. Wäre das Papier gefälscht gewesen, hätte ich es nicht bemerkt. Eine zufällig richtige Entscheidung ist keine Prüfung.",
  ref2b:"Ich habe ein einwandfreies Rezept abgewiesen. Alles, was mich gestört hat, war Verhalten: die Anspannung, die Eile, dass er das Präparat nicht kennt, dass er für einen anderen abholt. Nichts davon ist ein Fälschungsmerkmal. Ein Mann, dessen Vater gestern vor Schmerzen aus dem Krankenhaus kam, geht mit leeren Händen nach Hause, weil mir sein Auftreten nicht gefiel. Das ist keine Vorsicht. Das ist der Schaden, den die falsche Regel anrichtet: verdächtig gleich schuldig.",
  hAbgOk:"Abgegeben nach Prüfung", hAbgOhne:"Abgegeben ohne Prüfung", hRefB:"Verweigert",
  z1:"Rezept 1 · Tilidin", z1s:"gefälscht", z2:"Rezept 2 · Pregabalin", z2s:"echt",
  zEnt:"Entscheidung:", zHin:"Hinweise:", zGep:"Geprüft:",
  bRA:"Zweimal habe ich verschieden entschieden, weil die beiden Blätter verschieden waren. Das ist Prüfung: Das Papier entscheidet, nicht die Person.",
  bRR:"Ich habe beide abgewiesen und lag einmal richtig. Verweigern ist keine sichere Haltung. Wer alles abweist, was ihm verdächtig vorkommt, schützt sich vor Fälschungen und schadet jedem echten Patienten, der ihm begegnet. Und davon gibt es sehr viel mehr.",
  bAA:"Ich habe beide beliefert und lag einmal richtig. Hundert Stück Tilidin retard haben meine Apotheke verlassen, der Vergütungsanspruch dafür ist weg und die rechtliche Verantwortung bleibt.",
  bAR:"Ich habe die gefälschte beliefert und die echte abgewiesen. Ich habe die Menschen gelesen und nicht das Papier. Der Erste war ruhiger, weil er wusste, was er tut. Der Zweite war angespannt, weil sein Vater Schmerzen hat.",
  schluss:"Drei objektive Fälschungsmerkmale: eine BSNR, die zwischen Codierzeile und Stempel auseinanderfällt; ein handschriftlich eingetragenes Arzneimittel auf einem sonst gedruckten Rezept; eine weit entfernte Praxis ohne erkennbaren Grund. Und null Merkmale in Anspannung, Eile und Unkenntnis des Präparatnamens. Das E-Rezept hat die Sache nicht beendet: Im Ersatzverfahren bleibt die Papierverordnung im Umlauf, und genau dort konzentriert sich die Manipulation."
},
en:{
  titel:"One of the Two Is Forged",
  k1:"Prescription 1 · Counter", k2:"Prescription 1 · Check chain", k3:"Prescription 1 · Decision", k4:"Prescription 1 · Customer type",
  k5:"Prescription 2 · Counter", k6:"Prescription 2 · Check chain", k7:"Prescription 2 · Decision", k8:"Balance",
  wer:"Counter", cta:"Check the prescription →", t4:"He raises his voice.", t8:"Two prescriptions, two decisions",
  s1:"Half past eleven. A man in his mid-thirties puts a sheet on the counter and slides it over to me with his fingertips. \"Tilidine. A hundred. Quickly please, I'm parked illegally.\" He does not look at me. His eyes stay on his phone.",
  quellen:"Three sources are open to me. I decide for myself when I have enough.",
  papierIntro:"The prescription at full screen size. I tap a field and get the result of checking it.",
  kundeIntro:"Up to three questions out of six.",
  leiste:"Objective findings: {n} of {m}",
  f1:{stempel:["Arztstempel","The practice number in the stamp does not match the printed coding line at the bottom right."],
      vo:["Verordnungszeile","The medicine is handwritten; everything else is printed."],
      adresse:["Praxisadresse","Herford is 60 km away, with no recognisable link to the patient's address."],
      datum:["Datum","Yesterday. Within the deadline."],
      sig:["Unterschrift","Present and handwritten."],
      ktk:["Kostenträgerkennung","Nine digits, structure correct."],
      status:["Status","1, employed. Consistent with the year of birth."],
      menge:["Menge","N3. Large, but permissible."]},
  fr1:[["Who is the prescription for?","\"For me.\" A second later: \"For my brother. I mean, he has the prescription but he can't come.\""],
       ["Have you been to us before?","\"Yes, often.\" His customer record does not exist in the system."],
       ["Are you taking this for the first time?","\"No no, for a long time.\" Asked about the dosage, he does not know it."],
       ["Are you sure this is a genuine prescription?","He stiffens and goes silent. The conversation ends here. A suspicion is checked, not voiced. A direct confrontation closes the only source that would still have talked."],
       ["Cash or card?","Gets me nothing. A wasted question."],
       ["Would you like a bag?","Gets me nothing. A wasted question."]],
  praxis1:"The receptionist picks up. I read her the practice number from the stamp. \"That is not our number. Ours starts with 123. Where did you get this prescription?\"",
  frage:"Dispense or refuse?",
  ref2:"On reasonable suspicion, refusal is mandatory. Everything beyond is a legal tightrope: a criminal complaint can collide with professional confidentiality, so it is not reflexive but a case-by-case decision taken with the pharmacy management's knowledge. What I do without hesitation: document the incident internally, inform the practice named in the stamp, and tell my colleagues the description. Handing the prescription back without a word is the commonest error — it merely passes the problem to the next pharmacy.",
  ref0:"I refused and I was right. But I refused because the man struck me as suspicious, not because the paper proved anything. That is not checking, that is judging by appearance. If an oncology patient came in tomorrow, tense and in a hurry, the same logic would have me turn him away.",
  abg1:"I dispensed on a forged prescription. The payment claim is lost entirely, with criminal and social-law consequences on top. And heavier than the money: a hundred tilidine retard tablets left my pharmacy into a market I know nothing about.",
  hRef2:"Refused, with evidence", hRef1:"Refused, one finding", hRef0:"Refused without evidence", hAbg:"Dispensed",
  zitat:"\"What do you mean, you won't hand it over? Are you saying I'm lying? I have a prescription from a doctor and you're making me out to be a criminal.\"",
  antw:[["A","\"I understand your anger, <b>but</b> the rules are clear.\""],
        ["B","\"You are right that you deserve an explanation. I called the practice printed on the sheet. The number is not theirs. I cannot dispense this prescription.\""],
        ["C","\"Please calm down, or I'll have to ask you to leave.\""],
        ["D","\"That's not my call, the boss decides that.\""]],
  persX:"The aggressive type has a high need for self-esteem and feels overridden. What works: stay factual, first formulate an agreement, then return to the matter — and without \"but\", because that word erases everything before it. That is exactly where answer A fails, though it would otherwise sound right. C escalates; D surrenders control and signals that pressure pays.",
  pOk:"Read correctly", pNo:"Missed",
  s5:"Twenty minutes later. A young man in his late twenties puts a prescription on the counter and looks at his watch. \"For my father. He was in hospital yesterday, they discharged him. Can this be quick? I have to be at work in fifteen minutes.\" His fingers drum on the counter.",
  f2:{stempel:["Arztstempel","The practice number in the stamp matches the coding line exactly."],
      vo:["Verordnungszeile","Printed, like the rest of the prescription."],
      adresse:["Praxisadresse","Neurology practice in the same town as the home address."],
      datum:["Datum","Yesterday."],
      sig:["Unterschrift","Present and handwritten."],
      dos:["Dosierung",">>1-0-1<< entered."],
      name:["Patientenname","Differs from the name of the man in front of me."],
      menge:["Menge","N3."]},
  alle2:"Not a single objective finding. The paper is completely in order.",
  fr2:[["Who is the prescription for?","\"For my father. I collect his things when my sister can't.\""],
       ["Is your father already taking this?","\"Honestly I don't know. My sister handles that. I'm just helping out.\""],
       ["Do you have your father's card with you?","He pulls it out of his pocket at once."],
       ["How fast does it work?","\"No idea. The main thing is that it gets better. Yesterday he was screaming with pain.\""],
       ["Are you sure this is a genuine prescription?","He freezes. \"What?\" Then he goes silent. I have accused a man whose father has been in pain since yesterday of theft, at the counter."],
       ["Cash or card?","Gets me nothing."]],
  praxis2:"The physician herself picks up. \"Yes, I issued that yesterday. He came out of hospital with neuropathic pain after shingles. His son said he would come by. Is there a problem?\"",
  abgOk:"I checked, found nothing, and dispensed. That is the whole difference: the paper decides, not the impression. Pregabalin is among the most frequently forged prescriptions in Germany — which is exactly why it deserves checking. But what gets checked is the paper, not the face in front of me.",
  abgOhne:"The decision was right, but I checked nothing. Had the paper been forged, I would not have noticed. A decision that happens to be right is not a check.",
  ref2b:"I turned away a flawless prescription. Everything that bothered me was behaviour: the tension, the hurry, not knowing the medicine, collecting for someone else. None of that is a forgery marker. A man whose father came out of hospital yesterday in pain goes home empty-handed because I did not like how he came across. That is not caution. That is the damage the wrong rule does: suspicious equals guilty.",
  hAbgOk:"Dispensed after checking", hAbgOhne:"Dispensed without checking", hRefB:"Refused",
  z1:"Prescription 1 · Tilidine", z1s:"forged", z2:"Prescription 2 · Pregabalin", z2s:"genuine",
  zEnt:"Decision:", zHin:"Findings:", zGep:"Checked:",
  bRA:"I decided differently twice, because the two sheets were different. That is checking: the paper decides, not the person.",
  bRR:"I turned both away and was right once. Refusing is not a safe stance. Whoever turns away everything that seems suspicious protects himself from forgeries and harms every genuine patient he meets. And there are far more of those.",
  bAA:"I dispensed both and was right once. A hundred tilidine retard tablets left my pharmacy, the payment claim for them is gone and the legal responsibility remains.",
  bAR:"I dispensed the forged one and turned away the genuine one. I read the people and not the paper. The first was calmer because he knew what he was doing. The second was tense because his father is in pain.",
  schluss:"Three objective forgery markers: a practice number that diverges between the coding line and the stamp; a handwritten medicine on an otherwise printed prescription; a distant practice with no recognisable reason. And zero markers in tension, haste and not knowing the medicine's name. The e-prescription has not ended this: in the substitute procedure the paper prescription stays in circulation, and that is exactly where manipulation concentrates."
},
ar:{
  titel:"واحدة منهما مزوّرة",
  k1:"الوصفة 1 · الكاونتر", k2:"الوصفة 1 · سلسلة الفحص", k3:"الوصفة 1 · القرار", k4:"الوصفة 1 · نمط الزبون",
  k5:"الوصفة 2 · الكاونتر", k6:"الوصفة 2 · سلسلة الفحص", k7:"الوصفة 2 · القرار", k8:"الحساب",
  wer:"الكاونتر", cta:"أفحص الوصفة ←", t4:"يرفع صوته.", t8:"وصفتان وقراران",
  s1:"الساعة الحادية عشرة والنصف. يضع رجل في منتصف الثلاثينيات ورقة على الكاونتر ويدفعها نحوي بأطراف أصابعه. «تيليدين. مئة حبة. بسرعة لو سمحت، سيارتي في ممنوع الوقوف.» لا ينظر إليّ. عيناه على هاتفه.",
  quellen:"ثلاثة مصادر مفتوحة أمامي. أنا من يقرّر متى أكتفي.",
  papierIntro:"الوصفة بملء الشاشة. أضغط أي حقل فأحصل على نتيجة فحصه.",
  kundeIntro:"حتى ثلاثة أسئلة من ستة.",
  leiste:"أدلة موضوعية: {n} من {m}",
  f1:{stempel:["Arztstempel","رقم BSNR في الختم لا يطابق سطر الترميز المطبوع أسفل اليمين."],
      vo:["Verordnungszeile","سطر الدواء مكتوب بخط اليد، وكل ما عداه مطبوع."],
      adresse:["Praxisadresse","هيرفورد على بعد 60 كم، بلا علاقة ظاهرة بعنوان المريض."],
      datum:["Datum","أمس. ضمن المهلة."],
      sig:["Unterschrift","موجود وبخط اليد."],
      ktk:["Kostenträgerkennung","تسع خانات، بنيته صحيحة."],
      status:["Status","1، موظف. يوافق سنة الميلاد."],
      menge:["Menge","N3. كبيرة لكنها مشروعة."]},
  fr1:[["لمن هذه الوصفة؟","«لي.» ثم بعد ثانية: «لأخي. يعني، هو عندو الوصفة بس ما فيه يجي.»"],
       ["هل زرتنا من قبل؟","«أيوه، كتير.» وملفه غير موجود في النظام."],
       ["هل تأخذ هذا الدواء لأول مرة؟","«لا لا، من زمان.» ثم لا يعرف الجرعة حين أسأله."],
       ["هل أنت متأكد أن هذه وصفة حقيقية؟","يتصلّب ويصمت. الحوار ينتهي هنا. الشك يُفحص ولا يُقال. والمواجهة المباشرة تُغلق المصدر الوحيد الذي كان سيتكلّم."],
       ["نقداً أم ببطاقة؟","لا يفيد شيئاً. سؤال ضائع."],
       ["هل تريد كيساً؟","لا يفيد شيئاً. سؤال ضائع."]],
  praxis1:"ترد موظفة الاستقبال. أقرأ عليها رقم BSNR من الختم. «هذا ليس رقمنا. رقمنا يبدأ بـ123. من أين لكم هذه الوصفة؟»",
  frage:"أصرف أم أرفض؟",
  ref2:"الرفض عند الشك المعقول واجب. وما بعده منطقة رمادية قانونياً: البلاغ الجنائي قد يصطدم بكتمان السر المهني، فلا يكون انعكاسياً بل قراراً في كل حالة وبعلم إدارة الصيدلية. وما أفعله بلا تردّد: أوثّق الواقعة داخلياً، وأبلغ العيادة المذكورة في الختم، وأخبر زملائي بالأوصاف. أما إعادة الوصفة بلا كلمة فهي الخطأ الأشيع، وهي تنقل المشكلة إلى الصيدلية التالية.",
  ref0:"رفضتُ وكنتُ على حق. لكنني رفضتُ لأن الرجل بدا لي مريباً، لا لأن الورقة أثبتت شيئاً. هذا ليس تدقيقاً بل حكماً على المظهر. ولو جاء غداً مريض ورمي متوتر ومستعجل لرفضتُه بالمنطق نفسه.",
  abg1:"صرفتُ على وصفة مزوّرة. أفقد حق الأجر كاملاً، وتترتّب عليّ مساءلة جنائية واجتماعية. وأخطر من المال: مئة حبة تيليدين ممتد خرجت من صيدليتي إلى سوق لا أعرفه.",
  hRef2:"رفضتُ بدليل", hRef1:"رفضتُ بدليل واحد", hRef0:"رفضتُ بلا دليل", hAbg:"صرفتُ",
  zitat:"«شو يعني ما رح تعطيني؟ عم تقلّي إني كذّاب؟ معي ورقة من دكتور وإنت عم تطلّع فيي كأني مجرم.»",
  antw:[["A","«أفهم غضبك، <b>لكن</b> التعليمات واضحة.»"],
        ["B","«معك حق أنك تستحق توضيحاً. اتصلتُ بالعيادة المكتوبة على الورقة، والرقم ليس رقمهم. لا أستطيع صرف هذه الوصفة.»"],
        ["C","«أرجو أن تهدأ وإلا اضطررتُ لأن أطلب منك المغادرة.»"],
        ["D","«ليس قراري، المدير هو من يقرر.»"]],
  persX:"النمط العدواني ذو حاجة عالية لاحترام الذات ويشعر بأنه مُتجاوَز. والفعّال: أبقى موضوعياً، وأصوغ اتفاقاً أولاً، ثم أعود للموضوع، وبلا «لكن» لأنها تمحو كل ما قبلها. وهنا بالضبط يسقط الجواب A رغم أنه يبدو صحيحاً. والجواب C يرفع التصعيد، والجواب D يتخلّى عن القيادة ويُشعِره بأن الضغط مُجدٍ.",
  pOk:"قرأتُه صحيحاً", pNo:"لم أُصب",
  s5:"بعد عشرين دقيقة. شاب في أواخر العشرينيات يضع وصفة على الكاونتر وينظر إلى ساعته. «لوالدي. كان في المستشفى مبارح وطلّعوه. فيه يكون بسرعة؟ عندي دوام بعد ربع ساعة.» ينقر بأصابعه على الكاونتر.",
  f2:{stempel:["Arztstempel","رقم BSNR في الختم يطابق سطر الترميز تماماً."],
      vo:["Verordnungszeile","مطبوع مثل باقي الوصفة."],
      adresse:["Praxisadresse","عيادة أعصاب في البلدة نفسها."],
      datum:["Datum","أمس."],
      sig:["Unterschrift","موجود وبخط اليد."],
      dos:["Dosierung","مدوّنة."],
      name:["Patientenname","يختلف عن اسم من يقف أمامي."],
      menge:["Menge","N3."]},
  alle2:"لا دليل موضوعي واحد. الورقة سليمة تماماً.",
  fr2:[["لمن هذه الوصفة؟","«لوالدي. أنا بجيب أغراضو لما أختي ما تقدر.»"],
       ["هل يأخذ والدك هذا الدواء من قبل؟","«ما بعرف بصراحة. أختي هي يلي بتتابع. أنا بس عم أساعد.»"],
       ["هل معك بطاقة والدك؟","يخرجها من جيبه فوراً."],
       ["كم بسرعة بيشتغل هالدوا؟","«ما بعرف. المهم يرتاح. مبارح كان عم يصرخ من الوجع.»"],
       ["هل أنت متأكد أن هذه وصفة حقيقية؟","يتجمّد. «شو؟» ثم يصمت. اتّهمتُ أمام الكاونتر رجلاً يتألم أبوه منذ أمس."],
       ["نقداً أم ببطاقة؟","لا يفيد شيئاً."]],
  praxis2:"ترد الطبيبة نفسها. «نعم، كتبتُها أمس. خرج من المستشفى بألم عصبي بعد الحزام الناري. ابنه قال إنه سيمرّ. هل من مشكلة؟»",
  abgOk:"فحصتُ، وما وجدتُ شيئاً، فصرفتُ. وهذا هو الفرق كله: الورقة تقرّر، لا الانطباع. والبريغابالين من أكثر ما يُزوَّر في ألمانيا، ولهذا بالضبط يستحق الفحص. لكن الفحص يُجرى على الورقة، لا على وجه الواقف أمامي.",
  abgOhne:"كان القرار صحيحاً، لكنني لم أفحص شيئاً. ولو كانت الورقة مزوّرة لما عرفتُ. القرار الصحيح بالصدفة ليس تدقيقاً.",
  ref2b:"رفضتُ وصفة سليمة تماماً. كل ما أزعجني كان سلوكياً: التوتر، والاستعجال، وأنه لا يعرف الدواء، وأنه يستلم عن غيره. ولا واحد من هذه مؤشر تزوير. رجل خرج أبوه من المستشفى أمس يتألم، يعود إلى بيته بيدين فارغتين لأن مظهره لم يعجبني. هذا ليس حذراً، بل هو الضرر الذي تصنعه القاعدة الخاطئة: المريب مذنب.",
  hAbgOk:"صرفتُ بعد الفحص", hAbgOhne:"صرفتُ بلا فحص", hRefB:"رفضتُ",
  z1:"الوصفة 1 · تيليدين", z1s:"مزوّرة", z2:"الوصفة 2 · بريغابالين", z2s:"سليمة",
  zEnt:"قراري:", zHin:"الأدلة:", zGep:"الفحص:",
  bRA:"قرّرتُ مرتين بشكل مختلف، لأن الورقتين كانتا مختلفتين. هذا هو التدقيق: الورقة تقرّر، لا الشخص.",
  bRR:"رفضتُ الاثنتين وأصبتُ في واحدة. الرفض ليس موقفاً آمناً. من يرفض كل ما يريبه يحمي نفسه من التزوير ويضرّ كل مريض حقيقي يصادفه. وهؤلاء أكثر بكثير.",
  bAA:"صرفتُ الاثنتين وأصبتُ في واحدة. مئة حبة تيليدين ممتد خرجت من صيدليتي، وفقدتُ حق الأجر عليها، وبقيت المسؤولية القانونية.",
  bAR:"صرفتُ المزوّرة ورفضتُ السليمة. قرأتُ الناس ولم أقرأ الورق. الأول كان أهدأ لأنه يعرف ما يفعل، والثاني كان متوتراً لأن أباه يتألم.",
  schluss:"ثلاث علامات موضوعية للتزوير: تباين رقم BSNR بين سطر الترميز والختم، ودواء مكتوب بخط اليد على وصفة مطبوعة، وعيادة بعيدة بلا سبب ظاهر. وصفر علامة في التوتر والاستعجال وجهل اسم الدواء. والوصفة الإلكترونية لم تُنهِ المسألة: في إجراء البديل تبقى الوصفة الورقية في التداول، وهناك بالضبط يتركّز التلاعب."
}};

/* Klasse jedes Befunds (Abschnitt 1 und 6 der Stufendatei) */
var KL1={stempel:"hinweis", vo:"hinweis", adresse:"hinweis", datum:"sauber", sig:"sauber", ktk:"sauber", status:"sauber", menge:"neutral"};
var KL2={stempel:"sauber", vo:"sauber", adresse:"sauber", datum:"sauber", sig:"sauber", dos:"sauber", name:"neutral", menge:"neutral"};
var FK1=["verhalten","verhalten","verhalten","anklage","neutral","neutral"];
var FK2=["verhalten","verhalten","verhalten","verhalten","anklage","neutral"];

function felder(f, kl){ var o={}; Object.keys(f).forEach(function(k){ o[k]={name:f[k][0], text:f[k][1], kl:kl[k]}; }); return o; }
function fragen(f, kl){ return f.map(function(x,i){ return {q:x[0], a:x[1], kl:kl[i]}; }); }
function befundTexte(T, f, fr, praxis){
  var o={};
  Object.keys(f).forEach(function(k){ o['papier:'+k]='<b><bdi>'+f[k][0]+'</bdi></b> · '+f[k][1]; });
  fr.forEach(function(x,i){ o['kunde:'+i]='<b>'+x[0]+'</b> '+x[1]; });
  o.praxis=praxis;
  return o;
}
function hinweisText(f, kl){
  return Object.keys(f).filter(function(k){ return kl[k]==='hinweis'; })
    .map(function(k){ return '<b><bdi>'+f[k][0]+'</bdi></b> · '+f[k][1]; }).join(' <br>');
}
function nachVerweigerung(run){ return !!(run && run.pf && run.pf.r1 && run.pf.r1.entscheid==='verweigert'); }

function bau(L){
  var T=TX[L];
  return [
  {mech:"comic", data:{kicker:T.k1, title:T.titel, cta:T.cta, img:A+"faelsch_kunde01_ankunft.webp",
    bubbles:[{who:T.wer, txt:T.s1}]}},

  {mech:"pruefkette", data:{kicker:T.k2, title:T.quellen, key:"r1", p:30, leiste:T.leiste, hinweiseMax:4,
    punkte:{art:"hinweise"},
    quellen:{
      papier:{img:A+"faelsch_quelle_papier.webp", intro:T.papierIntro,
        rezept:{set:REZ1, checks:["gebuehr_pflicht"], hand:["rx1","rx2"], sig:"T. Reuter"},
        felder:felder(T.f1, KL1), map:MAP1},
      kunde:{img:A+"faelsch_quelle_kunde.webp", intro:T.kundeIntro, fragen:fragen(T.fr1, FK1)},
      praxis:{img:A+"faelsch_quelle_praxis.webp", anruf:{img:A+"faelsch_telefon_praxis.webp", text:T.praxis1, kl:"hinweis"}}},
    expl:hinweisText(T.f1, KL1)+' <br>'+T.praxis1}},

  {mech:"entscheidung", data:{kicker:T.k3, title:T.frage, key:"r1", p:50, img:A+"faelsch_entscheidung01.webp",
    leiste:T.leiste, hinweiseMax:4, befundTexte:befundTexte(T, T.f1, T.fr1, T.praxis1),
    stufen:{verweigert:[{ab:2,p:50,h:T.hRef2,text:T.ref2},{ab:1,p:30,h:T.hRef1,text:T.ref2},{ab:0,p:10,h:T.hRef0,text:T.ref0}],
            abgegeben:[{p:0,h:T.hAbg,text:T.abg1}]},
    bilder:{verweigert:[A+"faelsch_abgabe_verweigert.webp"], abgegeben:[A+"faelsch_abgabe_erfolgt.webp"]},
    expl:T.ref2}},

  {mech:"persona", wenn:nachVerweigerung, data:{kicker:T.k4, title:T.t4, key:"r1", p:25, pTyp:10, pAntwort:15,
    img:A+"faelsch_kunde01_aggressiv.webp", imgNach:A+"faelsch_kunde01_abgang.webp", zitat:T.zitat,
    typen:["Der Aggressive","Der Unsichere","Der Misstrauische","Der Eilige"], typOk:"Der Aggressive",
    antworten:T.antw.map(function(a){ return {l:a[0], t:a[1], ok:a[0]==="B", brauchtHinweis:a[0]==="B"}; }),
    okH:T.pOk, badH:T.pNo, expl:T.persX}},

  {mech:"comic", data:{kicker:T.k5, title:T.titel, cta:T.cta, img:A+"faelsch_kunde02_ankunft.webp",
    bubbles:[{who:T.wer, txt:T.s5}]}},

  {mech:"pruefkette", data:{kicker:T.k6, title:T.quellen, key:"r2", p:30, leiste:T.leiste, hinweiseMax:0,
    punkte:{art:"felder", felder:["stempel","vo","adresse"]},
    quellen:{
      papier:{img:A+"faelsch_quelle_papier_02.webp", intro:T.papierIntro,
        rezept:{set:REZ2, checks:["gebuehr_pflicht"], hand:[], sig:"S. Hoffmann"},
        felder:felder(T.f2, KL2), map:MAP2, alleText:T.alle2},
      kunde:{img:A+"faelsch_quelle_kunde_02.webp", intro:T.kundeIntro, fragen:fragen(T.fr2, FK2)},
      praxis:{img:A+"faelsch_quelle_praxis.webp", anruf:{img:A+"faelsch_telefon_praxis_02.webp", img2:A+"faelsch_kunde02_wartet.webp", text:T.praxis2, kl:"sauber"}}},
    expl:T.alle2}},

  {mech:"entscheidung", data:{kicker:T.k7, title:T.frage, key:"r2", p:50, img:A+"faelsch_entscheidung02.webp",
    leiste:T.leiste, hinweiseMax:0, befundTexte:befundTexte(T, T.f2, T.fr2, T.praxis2),
    stufen:{abgegeben:[{geprueft:true,p:50,h:T.hAbgOk,text:T.abgOk},{geprueft:false,p:25,h:T.hAbgOhne,text:T.abgOhne}],
            verweigert:[{p:0,h:T.hRefB,text:T.ref2b}]},
    bilder:{abgegeben:[A+"faelsch_abgabe02_erfolgt.webp"],
            verweigert:[A+"faelsch_abgabe02_verweigert.webp", A+"faelsch_kunde02_abgang.webp"]},
    expl:T.abgOk}},

  {mech:"bilanz", data:{kicker:T.k8, title:T.t8, p:15, img:A+"faelsch_bilanz_zwei_rezepte.webp",
    imgSchluss:A+"faelsch_bilanz_schluss.webp",
    zeilen:[{key:"r1", label:T.z1, soll:T.z1s, entLabel:T.zEnt, art:"hinweise", feld:T.zHin, max:4},
            {key:"r2", label:T.z2, soll:T.z2s, entLabel:T.zEnt, art:"geprueft", feld:T.zGep}],
    richtig:{r1:"verweigert", r2:"abgegeben"},
    texte:{"verweigert+abgegeben":T.bRA, "verweigert+verweigert":T.bRR,
           "abgegeben+abgegeben":T.bAA, "abgegeben+verweigert":T.bAR},
    schluss:T.schluss, expl:T.schluss}}
  ];
}

var stub=TOPICS.pruef_faelschung_01||{};
stub.steps=bau("de");
stub.steps_de=stub.steps;
stub.steps_en=bau("en");
stub.steps_ar=bau("ar");
TOPICS.pruef_faelschung_01=stub;
})();
