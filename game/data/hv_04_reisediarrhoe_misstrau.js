/* =====================================================================
   Falldaten · reisediarrhoe_misstrau
   Ausgelagert aus game/index.html am 12.11.2026 (Technik: Daten-Split).
   Inhalt woertlich uebernommen, nur Bildendungen .jpg/.png -> .webp.
   Geladen erst beim Start des Falls durch levelDaten(); der Stummel in
   index.html traegt nur Titel, Persona, Banner und src.
===================================================================== */
TOPICS.reisediarrhoe_misstrau = {
  de:"Reisediarrhö", en:"Traveler's diarrhea", ar:"إسهال المسافر",
  persona:"misstrau",
  banner:"assets/PCG_CARD_CUS004_v003.webp",
  steps:[
   {mech:"comic",data:{kicker:"Szene 1 · Der Kunde kommt",title:"Ein Herr kommt herein – Arme locker, Blick prüfend",img:"assets/PCG_SCN_CUS004_A_ENTRANCE_v003.webp",cta:"Reagieren →",
    bubbles:[{who:"Kunde",txt:"Ich fliege morgen nach Ägypten. Meine Frau will, dass ich etwas gegen <b>Reisedurchfall</b> mitnehme."},{who:"Kunde",txt:"Aber ehrlich gesagt: Im Internet steht, das meiste davon ist <b>Geldmacherei</b>."}]}},
   {mech:"mcq",data:{scene:"assets/PCG_SCN_CUS004_B_COUNTER_v003.webp",kicker:"Szene 2 · Der Skeptiker testet Sie",title:"„Das meiste ist doch Geldmacherei.“ Ihre Antwort?",
    options:[
     {t:"Da ist sogar etwas dran – lassen Sie uns kurz trennen, was wirklich belegt ist und was nicht.",p:25,tr:12,ok:true,h:"Ehrlichkeit entwaffnet",x:"Sie bestätigen den berechtigten Kern seiner Skepsis, statt dagegen anzukämpfen – und positionieren sich als Verbündeter der Faktenlage. Genau so gewinnt man diesen Typ."},
     {t:"Glauben Sie nicht alles, was im Internet steht.",p:0,tr:-12,h:"Frontalangriff",x:"Sie greifen seine Informationsquelle an, ohne etwas Besseres anzubieten. Der Skeptiker verhärtet sich sofort."},
     {t:"Unsere Produkte wirken alle – sonst würden wir sie nicht führen.",p:0,tr:-10,h:"Werbespruch",x:"Genau die Antwort, die er erwartet hat. Sie haben seine These gerade bestätigt."},
     {t:"Dann nehmen Sie eben nichts mit.",p:5,tr:-8,h:"Beleidigt statt beraten",x:"Sie geben auf, bevor die Beratung begonnen hat. Seine Frau hatte übrigens recht."}]}},
   {mech:"ask3",data:{scene:"assets/PCG_SCN_CUS004_C_OTS_v003.webp",kicker:"Szene 2b · Nur drei Fragen",title:"Der Skeptiker gibt Ihnen wenig Zeit. Drei Fragen – welche?",hint:"Noch {n} Fragen übrig. Er merkt sofort, ob eine Frage Substanz hat.",pick:3,okH:"Substanz statt Small Talk",badH:"Fragen verschenkt",expl:"Reiseziel und Reiseart, Dauermedikation und Vorerkrankungen sowie die Frage nach Kindern oder Schwangerschaft bestimmen hier alles: sie entscheiden über Malariaprophylaxe, Loperamid-Eignung und die Zusammensetzung der Reiseapotheke. Fragen nach Lieblingsessen oder Hotelkategorie klingen beim Skeptiker sofort nach Verkaufsgespräch.",questions:[{q:"Wohin genau, und Hotel oder Rundreise?",a:"Ägypten, Nilkreuzfahrt mit Landausflügen.",val:25},{q:"Nehmen Sie regelmäßig Medikamente oder gibt es Vorerkrankungen?",a:"Nichts. Ich war seit Jahren nicht beim Arzt.",val:25},{q:"Reisen Kinder mit oder ist Ihre Frau schwanger?",a:"Nein, nur wir zwei. Kinder sind längst aus dem Haus.",val:25},{q:"Waren Sie schon einmal in einem ähnlichen Reiseland?",a:"Tunesien, vor zehn Jahren. Da ging alles gut.",val:15},{q:"Wie lange dauert die Reise?",a:"Zwölf Tage.",val:15},{q:"Haben Sie schon eine Reiseapotheke zu Hause?",a:"Ein paar alte Sachen. Weiß nicht, ob die noch gut sind.",val:10},{q:"Welche Hotelkategorie haben Sie gebucht?",a:"Vier Sterne. Ist das relevant?",val:5},{q:"Essen Sie gerne scharf?",a:"Was hat das jetzt damit zu tun?",val:0}]}},
 {mech:"sort",data:{scene:"assets/PCG_SCN_CUS004_C_OTS_v003.webp",kicker:"Szene 3 · Fakten-Check",title:"Er zählt auf, was er gelesen hat. Sortieren Sie:",
    hint:"Antippen, dann Box wählen. Alle 6 zuordnen.",flagLabel:"Mythos",safeLabel:"Fakt",
    okH:"Sauber getrennt",badH:"Fakten-Check mit Lücken",
    expl:"Cola und Salzstangen: zu viel Zucker, falsche Elektrolyte – Mythos. Schnaps desinfiziert nichts – Mythos. Loperamid hemmt nur die Darmbewegung, nicht die Infektion – Mythos. Dagegen Fakt: Eiswürfel sind eine klassische Quelle, die Küchenregel schützt wirklich, und die Elektrolytlösung ist wichtiger als jedes Stopfmittel.",
    cards:[{t:"Cola und Salzstangen sind die beste Behandlung",flag:true},{t:"Eiswürfel im Getränk können die Quelle sein",flag:false},{t:"Loperamid bekämpft die Infektion selbst",flag:true},{t:"Peel it, boil it, cook it – or forget it",flag:false},{t:"Ein Schnaps desinfiziert den Magen",flag:true},{t:"Elektrolytlösung ist wichtiger als Stopfmittel",flag:false}]}},
   {mech:"mcq",data:{scene:"assets/PCG_CU_CUS004_P05_CU-TALK_v003.webp",kicker:"Szene 4 · Die Vertrauensfrage",title:"„Und woher weiß ich, dass Sie mir nicht einfach das Teuerste andrehen?“",
    options:[
     {t:"Das Wichtigste ist hier das Günstigste: eine Elektrolytlösung für wenige Euro. Alles andere ist optional – ich zeige es Ihnen gleich am Regal.",p:25,tr:12,ok:true,h:"Preistransparenz schlägt Misstrauen",x:"Sie führen mit dem billigsten, wichtigsten Produkt. Damit kollabiert seine Verkaufs-These in einem Satz – jetzt hört er Ihnen wirklich zu."},
     {t:"Vertrauen Sie mir einfach – ich bin der Fachmann.",p:5,tr:-8,h:"Autorität statt Argument",x:"Der Skeptiker vertraut Belegen, nicht Titeln. Diese Antwort füttert sein Misstrauen."},
     {t:"Wenn Sie mir nicht glauben, können Sie gerne woanders kaufen.",p:0,tr:-12,h:"Eskalation",x:"Sie machen aus einer Testfrage einen Konflikt. Er nimmt Sie beim Wort."},
     {t:"Ich zeige Ihnen zu jedem Präparat die komplette Studienlage – dauert etwa zwanzig Minuten.",p:10,tr:-2,h:"Überkompensation",x:"Gut gemeint, aber unverhältnismäßig. Transparenz heißt nicht Vorlesung."}]}},
   {mech:"shelf",data:{kicker:"Szene 5 · Die Empfehlung",title:"Morgen Flug, gesunder Erwachsener. Griff ins Regal:",
    boxes:[
     {n:"Elektrolyte",s:"Pulver, WHO-Formel",col:"#1565C0",ok:true,p:20,tr:12,h:"Das Fundament",x:"Erste Wahl bei jedem Durchfall: Flüssigkeit und Salze ersetzen. Günstig, belegt, unverzichtbar – besonders auf Reisen."},
     {n:"Loperamid",s:"akut, max. 2 Tage",col:"#2E7D32",p:12,tr:4,h:"Sinnvolle Ergänzung",x:"Für den Notfall im Bus oder Flieger legitim – aber nur symptomatisch, maximal 48 Stunden, und niemals bei Fieber oder Blut im Stuhl."},
     {n:"Antibiotikum",s:"Tabletten",col:"#E65100",p:0,tr:-10,h:"Nicht ohne Rezept",x:"Verschreibungspflichtig – und zur Selbst-Prophylaxe ohnehin nicht empfohlen."},
     {n:"Kohle",s:"Tabletten",col:"#6A1B9A",p:5,tr:-2,h:"Dünne Datenlage",x:"Traditionsprodukt mit schwacher Evidenz. Ausgerechnet beim Skeptiker riskieren Sie damit Ihre gerade gewonnene Glaubwürdigkeit."},
     {n:"Probiotikum",s:"Kapseln",col:"#00838F",p:8,tr:0,h:"Ehrlich einordnen",x:"Datenlage gemischt, Effekte moderat. Als Option mit ehrlicher Einordnung vertretbar – als Heilsversprechen nicht."},
     {n:"Heilerde",s:"Pulver",col:"#F9A825",p:0,tr:-4,h:"Folklore",x:"Keine belastbare Evidenz bei Reisediarrhö. Er hätte es gegoogelt – und Sie erwischt."}]}},
   
 {mech:"mcq",data:{scene:"assets/PCG_SCN_CUS004_D_HANDOVER_v003.webp",kicker:"Szene 6 · Abschluss",title:"„Fair. Und wann muss ich unterwegs zum Arzt?“",
    options:[
     {t:"Bei Fieber über 38,5°, Blut im Stuhl, starker Austrocknung – oder wenn es nach drei Tagen nicht besser wird. Und: Loperamid sofort absetzen, falls Fieber dazukommt.",p:25,tr:12,ok:true,h:"Klare Kriterien, klare Grenze",x:"Vier überprüfbare Warnzeichen plus die wichtigste Loperamid-Regel. Der Skeptiker bekommt, was er respektiert: präzise, ehrliche Grenzen der Selbstmedikation."},
     {t:"Wenn es schlimm wird, gehen Sie halt ins Krankenhaus.",p:5,tr:-4,h:"Zu vage",x:"Was heißt schlimm? Ohne Kriterien nützt der Rat nichts."},
     {t:"Mit meiner Empfehlung brauchen Sie keinen Arzt.",p:0,tr:-10,h:"Überversprechen",x:"Genau die Sorte Satz, wegen der er Apotheken misstraut."},
     {t:"Steht alles im Beipackzettel.",p:5,tr:-6,h:"Abgeschoben",x:"Der letzte Eindruck: Sie wollten ihn loswerden."}]}}
  ],
  badges:[
   {icon:"🤝",de:"Skeptiker-Flüsterer",en:"Skeptic Whisperer",ar:"مروّض المتشككين",cond:function(s){return s.step1>=25;}},
   {icon:"🔬",de:"Fakten-Checker",en:"Fact Checker",ar:"مدقق الحقائق",cond:function(s){return s.total>=60;}},
   {icon:"💶",de:"Transparenz-Profi",en:"Transparency Pro",ar:"محترف الشفافية",cond:function(s){return s.step3>=25;}},
   {icon:"🚩",de:"Red-Flag-Scanner",en:"Red-Flag Scanner",ar:"ماسح العلامات",cond:function(){return true;}}
  ]
};

TOPICS.reisediarrhoe_misstrau.steps_en=[
 {mech:"comic",data:{kicker:"Scene 1 · The customer arrives",title:"A man walks in - relaxed arms, appraising look",img:"assets/PCG_SCN_CUS004_A_ENTRANCE_v003.webp",cta:"React →",
  bubbles:[{who:"Customer",txt:"I fly to Egypt tomorrow. My wife wants me to take something for <b>traveler's diarrhea</b>."},{who:"Customer",txt:"But honestly: the internet says most of it is a <b>money grab</b>."}]}},
 {mech:"mcq",data:{scene:"assets/PCG_SCN_CUS004_B_COUNTER_v003.webp",kicker:"Scene 2 · The skeptic tests you",title:"\u201cMost of it is a money grab.\u201d Your answer?",
  options:[
   {t:"There's actually some truth to that - let's quickly separate what's proven from what isn't.",p:25,tr:12,ok:true,h:"Honesty disarms",x:"You validate the legitimate core of his skepticism instead of fighting it - and position yourself as an ally of the evidence. Exactly how you win this type."},
   {t:"Don't believe everything on the internet.",p:0,tr:-12,h:"Frontal attack",x:"You attack his source without offering anything better. The skeptic hardens instantly."},
   {t:"All our products work - otherwise we wouldn't stock them.",p:0,tr:-10,h:"Sales slogan",x:"Exactly the answer he expected. You just confirmed his thesis."},
   {t:"Then don't take anything.",p:5,tr:-8,h:"Offended, not advising",x:"You quit before the consultation began. His wife was right, by the way."}]}},
 {mech:"ask3",data:{scene:"assets/PCG_SCN_CUS004_C_OTS_v003.webp",kicker:"Scene 2b · Three questions only",title:"The skeptic gives you little time. Three questions - which?",hint:"{n} questions left. He notices instantly whether a question has substance.",pick:3,okH:"Substance instead of small talk",badH:"Questions wasted",expl:"Destination and type of travel, chronic medication and conditions, and the question about children or pregnancy determine everything here: they decide on malaria prophylaxis, loperamide suitability and the composition of the travel kit. Questions about favourite food or hotel category immediately sound like a sales pitch to a skeptic.",questions:[{q:"Where exactly, and hotel or touring?",a:"Egypt, a Nile cruise with shore excursions.",val:25},{q:"Do you take regular medication or have any conditions?",a:"Nothing. I have not seen a doctor in years.",val:25},{q:"Are children travelling with you, or is your wife pregnant?",a:"No, just the two of us. The children left home long ago.",val:25},{q:"Have you been to a similar destination before?",a:"Tunisia, ten years ago. That went fine.",val:15},{q:"How long is the trip?",a:"Twelve days.",val:15},{q:"Do you already have a travel kit at home?",a:"A few old things. Not sure if they are still good.",val:10},{q:"Which hotel category did you book?",a:"Four stars. Is that relevant?",val:5},{q:"Do you like spicy food?",a:"What does that have to do with it?",val:0}]}},
 {mech:"sort",data:{scene:"assets/PCG_SCN_CUS004_C_OTS_v003.webp",kicker:"Scene 3 · Fact check",title:"He lists what he read. Sort it:",
  hint:"Tap a card, then the matching box. Sort all 6.",flagLabel:"Myth",safeLabel:"Fact",
  okH:"Cleanly separated",badH:"Fact check with gaps",
  expl:"Cola and pretzel sticks: too much sugar, wrong electrolytes - myth. Schnapps disinfects nothing - myth. Loperamide only slows the gut, it doesn't fight the infection - myth. Facts: ice cubes are a classic source, the kitchen rule really protects, and oral rehydration beats any stopper.",
  cards:[{t:"Cola and pretzel sticks are the best treatment",flag:true},{t:"Ice cubes in drinks can be the source",flag:false},{t:"Loperamide fights the infection itself",flag:true},{t:"Peel it, boil it, cook it - or forget it",flag:false},{t:"A shot of schnapps disinfects the stomach",flag:true},{t:"Rehydration solution matters more than stoppers",flag:false}]}},
 {mech:"mcq",data:{scene:"assets/PCG_CU_CUS004_P05_CU-TALK_v003.webp",kicker:"Scene 4 · The trust question",title:"\u201cAnd how do I know you won't just push the priciest thing?\u201d",
  options:[
   {t:"The most important item here is the cheapest: an electrolyte solution for a few euros. Everything else is optional - I'll show you at the shelf.",p:25,tr:12,ok:true,h:"Price transparency beats distrust",x:"You lead with the cheapest, most essential product. His sales thesis collapses in one sentence - now he's actually listening."},
   {t:"Just trust me - I'm the professional.",p:5,tr:-8,h:"Authority instead of argument",x:"The skeptic trusts evidence, not titles."},
   {t:"If you don't believe me, feel free to buy elsewhere.",p:0,tr:-12,h:"Escalation",x:"You turned a test question into a conflict. He'll take you at your word."},
   {t:"I'll show you the full study data for every product - takes about twenty minutes.",p:10,tr:-2,h:"Overcompensation",x:"Well meant, disproportionate. Transparency is not a lecture."}]}},
 {mech:"shelf",data:{kicker:"Scene 5 · The recommendation",title:"Flying tomorrow, healthy adult. Reach for the shelf:",
  boxes:[
   {n:"Electrolytes",s:"powder, WHO formula",col:"#1565C0",ok:true,p:20,tr:12,h:"The foundation",x:"First choice for any diarrhea: replace fluids and salts. Cheap, proven, indispensable - especially when traveling."},
   {n:"Loperamide",s:"acute, max 2 days",col:"#2E7D32",p:12,tr:4,h:"Sensible add-on",x:"Legitimate for the bus-or-plane emergency - but symptomatic only, max 48 hours, and never with fever or bloody stool."},
   {n:"Antibiotic",s:"tablets",col:"#E65100",p:0,tr:-10,h:"Not without prescription",x:"Prescription-only - and not recommended for self-prophylaxis anyway."},
   {n:"Charcoal",s:"tablets",col:"#6A1B9A",p:5,tr:-2,h:"Thin evidence",x:"Traditional product, weak evidence. With a skeptic, of all people, you'd gamble away your fresh credibility."},
   {n:"Probiotic",s:"capsules",col:"#00838F",p:8,tr:0,h:"Frame it honestly",x:"Mixed data, moderate effects. Acceptable as an option with honest framing - not as a promise."},
   {n:"Healing clay",s:"powder",col:"#F9A825",p:0,tr:-4,h:"Folklore",x:"No solid evidence for traveler's diarrhea. He would have googled it - and caught you."}]}},
 
 {mech:"mcq",data:{scene:"assets/PCG_SCN_CUS004_D_HANDOVER_v003.webp",kicker:"Scene 6 · Closing",title:"\u201cFair. And when do I need a doctor on the road?\u201d",
  options:[
   {t:"For fever above 38.5°, blood in the stool, severe dehydration - or no improvement after three days. And: stop loperamide immediately if fever appears.",p:25,tr:12,ok:true,h:"Clear criteria, clear limits",x:"Four checkable warning signs plus the key loperamide rule. The skeptic gets what he respects: precise, honest limits of self-medication."},
   {t:"If it gets bad, go to a hospital.",p:5,tr:-4,h:"Too vague",x:"What does bad mean? Without criteria the advice is useless."},
   {t:"With my recommendation you won't need a doctor.",p:0,tr:-10,h:"Overpromise",x:"Exactly the kind of sentence that makes him distrust pharmacies."},
   {t:"It's all in the leaflet.",p:5,tr:-6,h:"Brushed off",x:"The last impression: you wanted him gone."}]}}
];

TOPICS.reisediarrhoe_misstrau.steps_ar=[
 {mech:"comic",data:{kicker:"المشهد 1 · وصول الزبون",title:"رجل يدخل - ذراعان مسترخيتان ونظرة فاحصة",img:"assets/PCG_SCN_CUS004_A_ENTRANCE_v003.webp",cta:"تصرّف ←",
  bubbles:[{who:"الزبون",txt:"أسافر غداً إلى مصر. زوجتي تريد أن آخذ شيئاً ضد <b>إسهال المسافر</b>."},{who:"الزبون",txt:"لكن بصراحة: الإنترنت يقول إن معظم هذه الأشياء <b>استنزاف للجيوب</b>."}]}},
 {mech:"mcq",data:{scene:"assets/PCG_SCN_CUS004_B_COUNTER_v003.webp",kicker:"المشهد 2 · المتشكك يختبرك",title:"\u201cمعظمها استنزاف للجيوب.\u201d ردّك؟",
  options:[
   {t:"في كلامك جانب من الصحة فعلاً - دعنا نفصل سريعاً بين المثبت وغير المثبت.",p:25,tr:12,ok:true,h:"الصدق يُسقط الدرع",x:"أكدت الجوهر المشروع في شكوكه بدل محاربتها - ووضعت نفسك حليفاً للدليل. هكذا تكسب هذا النمط."},
   {t:"لا تصدق كل ما يُكتب في الإنترنت.",p:0,tr:-12,h:"هجوم مباشر",x:"هاجمت مصدره دون أن تقدم بديلاً أفضل. يتصلب المتشكك فوراً."},
   {t:"كل منتجاتنا فعالة - وإلا لما بعناها.",p:0,tr:-10,h:"شعار مبيعات",x:"الإجابة التي توقعها بالضبط. أكدت أطروحته للتو."},
   {t:"إذن لا تأخذ شيئاً.",p:5,tr:-8,h:"انفعال لا استشارة",x:"استسلمت قبل أن تبدأ الاستشارة. وزوجته كانت محقة بالمناسبة."}]}},
 {mech:"ask3",data:{scene:"assets/PCG_SCN_CUS004_C_OTS_v003.webp",kicker:"المشهد 2ب · ثلاثة أسئلة فقط",title:"المتشكك لا يمنحك وقتاً كثيراً. ثلاثة أسئلة – أيها؟",hint:"بقي {n} من الأسئلة. وهو يلاحظ فوراً إن كان السؤال ذا مضمون.",pick:3,okH:"مضمون لا مجاملة",badH:"أهدرت أسئلتك",expl:"الوجهة ونوع الرحلة، والأدوية المزمنة والأمراض، والسؤال عن الأطفال أو الحمل تحدد كل شيء هنا: فهي تحسم الوقاية من الملاريا وملاءمة اللوبيراميد وتركيبة حقيبة السفر. أما السؤال عن الطعام المفضل أو تصنيف الفندق فيبدو للمتشكك بيعاً فورياً.",questions:[{q:"إلى أين بالضبط، وهل هي إقامة فندقية أم جولة؟",a:"مصر، رحلة نيلية مع جولات برية.",val:25},{q:"هل تتناول أدوية بانتظام أو لديك أمراض؟",a:"لا شيء. لم أراجع طبيباً منذ سنوات.",val:25},{q:"هل يسافر أطفال معكم أو زوجتك حامل؟",a:"لا، نحن اثنان فقط. والأولاد غادروا البيت منذ زمن.",val:25},{q:"هل سافرت إلى وجهة مشابهة من قبل؟",a:"تونس قبل عشر سنوات. وكان كل شيء بخير.",val:15},{q:"كم مدة الرحلة؟",a:"اثنا عشر يوماً.",val:15},{q:"هل عندك حقيبة سفر دوائية في البيت؟",a:"بعض الأشياء القديمة. لا أعرف إن كانت ما زالت صالحة.",val:10},{q:"أي تصنيف فندقي حجزت؟",a:"أربع نجوم. وهل لهذا علاقة؟",val:5},{q:"هل تحب الطعام الحار؟",a:"وما دخل هذا بالموضوع؟",val:0}]}},
 {mech:"sort",data:{scene:"assets/PCG_SCN_CUS004_C_OTS_v003.webp",kicker:"المشهد 3 · فحص الحقائق",title:"يسرد ما قرأه. صنّفه:",
  hint:"انقر البطاقة ثم الصندوق المناسب. صنّف الست جميعاً.",flagLabel:"خرافة",safeLabel:"حقيقة",
  okH:"فصل نظيف",badH:"فحص فيه ثغرات",
  expl:"الكولا وأعواد الملح: سكر كثير وأملاح خاطئة - خرافة. كأس الشنابس لا يعقّم شيئاً - خرافة. اللوبيراميد يبطئ الأمعاء فقط ولا يحارب العدوى - خرافة. أما الحقائق: مكعبات الثلج مصدر كلاسيكي، وقاعدة المطبخ تحمي فعلاً، ومحلول الإماهة أهم من أي موقف للإسهال.",
  cards:[{t:"الكولا وأعواد الملح أفضل علاج",flag:true},{t:"مكعبات الثلج في المشروب قد تكون المصدر",flag:false},{t:"اللوبيراميد يحارب العدوى نفسها",flag:true},{t:"قشّره أو اسلقه أو اطبخه - أو انسَه",flag:false},{t:"كأس شنابس يعقّم المعدة",flag:true},{t:"محلول الإماهة أهم من موقفات الإسهال",flag:false}]}},
 {mech:"mcq",data:{scene:"assets/PCG_CU_CUS004_P05_CU-TALK_v003.webp",kicker:"المشهد 4 · سؤال الثقة",title:"\u201cوكيف أعرف أنك لن تبيعني الأغلى وحسب؟\u201d",
  options:[
   {t:"الأهم هنا هو الأرخص: محلول أملاح بيوروهات قليلة. كل ما عداه اختياري - سأريك عند الرف.",p:25,tr:12,ok:true,h:"شفافية السعر تهزم الريبة",x:"قدت بالمنتج الأرخص والأكثر ضرورة. انهارت أطروحته في جملة واحدة - الآن يصغي إليك فعلاً."},
   {t:"ثق بي وحسب - أنا المختص.",p:5,tr:-8,h:"سلطة بلا حجة",x:"المتشكك يثق بالأدلة لا بالألقاب."},
   {t:"إن لم تصدقني فاشترِ من مكان آخر.",p:0,tr:-12,h:"تصعيد",x:"حوّلت سؤال اختبار إلى صراع. وسيأخذك على محمل كلامك."},
   {t:"سأعرض لك دراسات كل مستحضر بالتفصيل - نحو عشرين دقيقة.",p:10,tr:-2,h:"إفراط تعويضي",x:"نية حسنة بلا تناسب. الشفافية ليست محاضرة."}]}},
 {mech:"shelf",data:{kicker:"المشهد 5 · التوصية",title:"سفر غداً، بالغ سليم. مدّ يدك إلى الرف:",
  boxes:[
   {n:"أملاح الإماهة",s:"مسحوق، تركيبة WHO",col:"#1565C0",ok:true,p:20,tr:12,h:"الأساس",x:"الخيار الأول في أي إسهال: تعويض السوائل والأملاح. رخيص، مثبت، لا غنى عنه - خاصة في السفر."},
   {n:"لوبيراميد",s:"حاد، يومان كحد أقصى",col:"#2E7D32",p:12,tr:4,h:"إضافة معقولة",x:"مشروع لطوارئ الحافلة أو الطائرة - لكنه عرضي فقط، 48 ساعة كحد أقصى، وممنوع مع الحمى أو الدم في البراز."},
   {n:"مضاد حيوي",s:"أقراص",col:"#E65100",p:0,tr:-10,h:"ليس بلا وصفة",x:"بوصفة فقط - ولا يُنصح به وقائياً ذاتياً أصلاً."},
   {n:"فحم طبي",s:"أقراص",col:"#6A1B9A",p:5,tr:-2,h:"أدلة هزيلة",x:"منتج تقليدي بدليل ضعيف. مع المتشكك تحديداً تراهن بمصداقيتك التي كسبتها للتو."},
   {n:"بروبيوتيك",s:"كبسولات",col:"#00838F",p:8,tr:0,h:"قدّمه بصدق",x:"بيانات متباينة وأثر متواضع. مقبول كخيار بتأطير صادق - لا كوعد شفاء."},
   {n:"طين علاجي",s:"مسحوق",col:"#F9A825",p:0,tr:-4,h:"فولكلور",x:"لا دليل متين في إسهال المسافر. كان سيبحث عنه - ويمسك بك."}]}},
 
 {mech:"mcq",data:{scene:"assets/PCG_SCN_CUS004_D_HANDOVER_v003.webp",kicker:"المشهد 6 · الختام",title:"\u201cمنصف. ومتى أراجع الطبيب في السفر؟\u201d",
  options:[
   {t:"عند حمى فوق 38.5°، دم في البراز، جفاف شديد - أو إن لم يتحسن خلال ثلاثة أيام. وأوقف اللوبيراميد فوراً إذا ظهرت حمى.",p:25,tr:12,ok:true,h:"معايير واضحة وحدود واضحة",x:"أربع علامات قابلة للتحقق مع قاعدة اللوبيراميد الأهم. نال المتشكك ما يحترمه: حدود دقيقة صادقة للعلاج الذاتي."},
   {t:"إذا ساءت الحال اذهب لمستشفى.",p:5,tr:-4,h:"مبهم",x:"ماذا تعني ساءت؟ بلا معايير لا ينفع النصح."},
   {t:"مع توصيتي لن تحتاج طبيباً.",p:0,tr:-10,h:"وعد مفرط",x:"هذه بالضبط نوعية الجمل التي تجعله لا يثق بالصيدليات."},
   {t:"كل شيء في النشرة الداخلية.",p:5,tr:-6,h:"صرف انتباه",x:"الانطباع الأخير: أردت التخلص منه."}]}}
];
