/* =====================================================================
   Falldaten · husten_raucher
   Ausgelagert aus game/index.html am 12.11.2026 (Technik: Daten-Split).
   Inhalt woertlich uebernommen, nur Bildendungen .jpg/.png -> .webp.
   Geladen erst beim Start des Falls durch levelDaten(); der Stummel in
   index.html traegt nur Titel, Persona, Banner und src.
===================================================================== */
TOPICS.husten_raucher = {
  de:"Husten", en:"Cough", ar:"السعال",
  persona:"raucher",
  banner:"assets/PCG_CARD_CUS019_v003.webp",
  steps:[
   {mech:"comic",data:{kicker:"Szene 1 · Der Kunde kommt",title:"Ein Mann kommt herein – Lederjacke, wettergegerbtes Gesicht",img:"assets/PCG_SCN_CUS019_A_ENTRANCE_v003.webp",cta:"Reagieren →",
    bubbles:[{who:"Kunde",txt:"Tag. Ich bräuchte was gegen <b>Husten</b>. Am besten was Starkes, das ihn wegmacht."},{who:"Kunde",txt:"Ist nichts Ernstes, ich hab den schon länger. Gehört bei mir irgendwie dazu."}]}},
   {mech:"mcq",data:{scene:"assets/PCG_SCN_CUS019_B_COUNTER_v003.webp",kicker:"Szene 2 · Der überhörte Satz",title:"„Ich hab den schon länger.“ Wie reagieren Sie?",
    options:[
     {t:"Wie lange ist länger – Wochen oder Monate? Und ist er trocken oder kommt Schleim hoch? Das entscheidet, was überhaupt hilft.",p:25,tr:12,ok:true,h:"Genau nachgehakt",x:"„Schon länger“ ist der wichtigste Satz des Gesprächs, und die meisten überhören ihn. Husten über acht Wochen ist chronisch und gehört abgeklärt – unabhängig davon, wie normal er dem Kunden erscheint. Und trocken oder produktiv entscheidet die gesamte Therapierichtung."},
     {t:"Klar, hier ist ein starker Hustenstiller.",p:0,tr:-12,h:"Doppelt falsch",x:"Sie unterdrücken einen möglicherweise produktiven Husten und übergehen ein potenziell chronisches Geschehen. Bei einem Raucher mit langbestehendem Husten ist genau das die Konstellation, in der man nichts unterdrücken, sondern abklären lässt."},
     {t:"Rauchen Sie? Dann ist ja klar, woher der Husten kommt.",p:5,tr:-10,h:"Richtig vermutet, falsch gesagt",x:"Der Zusammenhang ist wahrscheinlich, aber so formuliert klingt es wie ein Vorwurf. Dieser Kundentyp macht sofort zu – und das Gespräch, in dem Sie ihm hätten helfen können, ist beendet."},
     {t:"Nehmen Sie Hustensaft und trinken Sie viel, das gibt sich.",p:5,tr:-4,h:"Beruhigt statt abgeklärt",x:"Freundlich, aber ohne jede Einordnung. Die Dauer bleibt ungeklärt und damit die entscheidende Frage offen."}]}},
   {mech:"ask3",data:{scene:"assets/PCG_SCN_CUS019_B_COUNTER_v003.webp",kicker:"Szene 2b · Nur drei Fragen",title:"Er ist wortkarg. Drei Fragen – welche öffnen den Fall?",hint:"Noch {n} Fragen übrig. Ein falscher Ton und er ist weg.",pick:3,okH:"Die entscheidenden Fragen gestellt",badH:"Fragen verschenkt",expl:"Dauer, Atemnot bei Belastung und Gewichtsverlust sind die drei Fragen, die diesen Fall aufschließen: zusammen ergeben sie das Bild, das eine ärztliche Abklärung zwingend macht. Die Frage nach dem Rauchen ist fachlich naheliegend, aber sie bringt hier keine neue Information – und je nach Tonfall verschließt sie den Kunden.",questions:[{q:"Wie lange ist \u201eschon länger\u201c – Wochen oder Monate?",a:"Vier Monate vielleicht. Man gewöhnt sich dran.",val:25},{q:"Kommen Sie beim Treppensteigen außer Atem?",a:"In letzter Zeit schon, ja. Dachte, das ist das Alter.",val:25},{q:"Haben Sie ungewollt Gewicht verloren?",a:"Vier Kilo. Aber ich esse auch unregelmäßig.",val:25},{q:"Ist der Husten trocken oder kommt Schleim hoch?",a:"Morgens etwas Schleim, danach geht es.",val:20},{q:"Haben Sie Blut im Auswurf bemerkt?",a:"Nein. Darauf achte ich.",val:20},{q:"Nehmen Sie Medikamente?",a:"Nichts. Ich war seit Jahren nicht beim Arzt.",val:15},{q:"Rauchen Sie?",a:"Sie sehen es mir wohl an. Ja.",val:10},{q:"Haben Sie es schon mit Hustensaft versucht?",a:"Ein paar Mal. Hilft für ein paar Stunden.",val:10}]}},
 {mech:"sort",data:{scene:"assets/PCG_SCN_CUS019_C_OTS_v003.webp",kicker:"Szene 3 · Anamnese",title:"Er antwortet knapp. Sortieren Sie:",
    hint:"Antippen, dann Box wählen. Alle 6 zuordnen.",flagLabel:"Abklärungsbedürftig",safeLabel:"Unbedenklich / erklärbar",
    okH:"Sauber abgegrenzt",badH:"Warnzeichen übersehen",
    expl:"Drei abklärungsbedürftige Punkte: Husten seit etwa vier Monaten (weit über der Achtwochengrenze für chronischen Husten), Kurzatmigkeit beim Treppensteigen seit einigen Wochen (Belastungsdyspnoe – zusammen mit dem Raucherstatus ein COPD-Verdacht) und ungewollter Gewichtsverlust von vier Kilogramm (das gewichtigste Alarmzeichen überhaupt). Kein Blut im Auswurf und morgendlicher Schleim allein wären für sich noch keine Alarmzeichen – aber die Kombination macht diesen Fall eindeutig zu einem Arztfall.",
    cards:[{t:"Husten besteht seit etwa vier Monaten",flag:true},{t:"Kurzatmig beim Treppensteigen, seit einigen Wochen",flag:true},{t:"Vier Kilo abgenommen, ohne es zu wollen",flag:true},{t:"Kein Blut im Auswurf",flag:false},{t:"Morgens etwas Schleim, danach besser",flag:false},{t:"Schläft bei offenem Fenster",flag:false}]}},
   {mech:"mcq",data:{scene:"assets/PCG_CU_CUS019_P05_CU-TALK_v003.webp",kicker:"Szene 4 · Die schwierige Nachricht",title:"Vier Monate Husten, Belastungsluftnot, Gewichtsverlust. Wie sagen Sie es ihm?",
    options:[
     {t:"Ich gebe Ihnen gern etwas für die Beschwerden. Aber ein Husten über vier Monate zusammen mit der Luftnot und dem Gewichtsverlust gehört einmal beim Arzt abgeklärt – nicht um Sie zu erschrecken, sondern weil sich das meist gut behandeln lässt, wenn man weiß, was es ist.",p:25,tr:12,ok:true,h:"Klar, ruhig, ohne Drohung",x:"Sie benennen die drei Befunde sachlich, ohne eine Diagnose zu stellen oder Angst zu erzeugen, und geben ihm einen positiven Grund hinzugehen. Bei einem Menschen, der das Thema seit Monaten meidet, ist genau dieser Ton der Unterschied zwischen einem Arztbesuch und keinem."},
     {t:"Das klingt nach COPD, vielleicht sogar schlimmer. Da müssen Sie sofort zum Arzt.",p:5,tr:-10,h:"Diagnose und Angst",x:"Sie stellen eine Verdachtsdiagnose, die Ihnen nicht zusteht, und erzeugen Angst. Bei diesem Kundentyp führt Angst häufig zu Vermeidung, nicht zum Arztbesuch."},
     {t:"Solange Sie rauchen, wird das sowieso nicht besser.",p:0,tr:-15,h:"Vorwurf statt Beratung",x:"Fachlich nicht falsch, menschlich verheerend. Sie verlieren ihn – und mit ihm die einzige Chance, dass die Warnzeichen überhaupt jemandem auffallen."},
     {t:"Nehmen Sie erst mal zwei Wochen einen Schleimlöser, wenn es dann nicht besser ist, gehen Sie zum Arzt.",p:5,tr:-6,h:"Gefährlicher Aufschub",x:"Bei Gewichtsverlust und Belastungsluftnot gibt es kein Zuwarten. Zwei Wochen Selbstmedikation sind hier keine vertretbare Zwischenstufe."}]}},
   {mech:"shelf",data:{kicker:"Szene 5 · Was Sie mitgeben",title:"Arztempfehlung ausgesprochen. Was geben Sie für die Zwischenzeit mit?",
    boxes:[
     {n:"Ambroxol",s:"Saft, Schleimlöser",col:"#1565C0",ok:true,p:20,tr:12,h:"Vertretbare Überbrückung",x:"Bei produktivem Husten mit zähem Schleim sinnvoll und unbedenklich bis zum Arzttermin – und es verschleiert keinen Befund. Wichtig: ausreichend trinken, sonst wirkt kein Sekretolytikum."},
     {n:"Efeu-Extrakt",s:"Saft, pflanzlich",col:"#2E7D32",p:14,tr:4,h:"Milde Alternative",x:"Gut verträglich, akzeptable Evidenz bei produktivem Husten. Als sanfterer Einstieg brauchbar."},
     {n:"Dextromethorphan",s:"Hustenstiller",col:"#E65100",p:0,tr:-12,h:"Genau falsch",x:"Ein Antitussivum bei produktivem Husten blockiert den Abtransport des Sekrets – und bei einem unabgeklärten chronischen Husten unterdrückt es zusätzlich das Symptom, das gerade zum Arzt führen soll."},
     {n:"Codein-Saft",s:"rezeptpflichtig",col:"#6A1B9A",p:0,tr:-10,h:"Nicht abgebbar",x:"Verschreibungspflichtig – und bei Verdacht auf eine chronische Lungenerkrankung mit Atemdepressionsrisiko ohnehin die falsche Richtung."},
     {n:"Stiller + Löser",s:"Kombipackung",col:"#F9A825",p:0,tr:-10,h:"Widerspruch in einer Packung",x:"Schleim lösen und gleichzeitig den Hustenreiz unterdrücken hebt sich gegenseitig auf – der gelöste Schleim bleibt liegen. Einer der klassischen Beratungsfehler beim Husten."},
     {n:"Erkältungsbalsam",s:"zum Einreiben",col:"#00838F",p:8,tr:0,h:"Angenehm, aber nebensächlich",x:"Subjektiv wohltuend, ohne relevanten Effekt auf das eigentliche Problem. Als Zusatz erwähnenswert, mehr nicht."}]}},
   
 {mech:"mcq",data:{scene:"assets/PCG_SCN_CUS019_D_HANDOVER_v003.webp",kicker:"Szene 6 · Abschluss",title:"„Und wenn ich doch nicht zum Arzt gehe?“",
    options:[
     {t:"Das ist Ihre Entscheidung. Ich sage Ihnen nur, woran Sie es dann selbst merken: Blut im Auswurf, Fieber, zunehmende Luftnot oder weiterer Gewichtsverlust – dann bitte nicht mehr warten. Und wenn Sie irgendwann übers Aufhören nachdenken: kommen Sie einfach vorbei, ohne Termin.",p:25,tr:12,ok:true,h:"Respekt, Kriterien, offene Tür",x:"Sie akzeptieren seine Autonomie, geben ihm trotzdem konkrete Warnzeichen an die Hand, und lassen eine niedrigschwellige Tür für das Rauchstopp-Thema offen – ohne ihn heute damit zu belasten. Genau so gewinnt man einen Menschen, der Gesundheitsthemen seit Jahren meidet."},
     {t:"Dann kann ich Ihnen auch nicht helfen.",p:0,tr:-12,h:"Tür zugeschlagen",x:"Sie bestrafen ihn für seine Entscheidung. Er kommt nicht wieder – auch nicht, wenn es schlimmer wird."},
     {t:"Dann müssen Sie eben mit den Folgen leben.",p:0,tr:-15,h:"Moralisiert",x:"Ein Satz, der nichts bewirkt außer Scham. Und Scham ist bei Rauchern der stärkste Vermeidungstreiber überhaupt."},
     {t:"Sie sollten wirklich gehen, ich meine es ernst.",p:10,tr:2,h:"Gut gemeint, aber ohne Werkzeug",x:"Die Dringlichkeit stimmt, aber Wiederholung überzeugt niemanden. Ohne konkrete Warnzeichen hat er nichts in der Hand, woran er es selbst festmachen kann."}]}}
  ],
  badges:[
   {icon:"⏳",de:"Dauer-Detektiv",en:"Duration Detective",ar:"محقق المدة",cond:function(s){return s.step1>=25;}},
   {icon:"🫁",de:"Alarmzeichen-Profi",en:"Alarm-Sign Pro",ar:"خبير علامات الإنذار",cond:function(s){return s.step3>=25;}},
   {icon:"🕊️",de:"Ohne Vorwurf",en:"No Blame",ar:"بلا لوم",cond:function(s){return s.trust>=60;}},
   {icon:"🚪",de:"Offene Tür",en:"Open Door",ar:"الباب المفتوح",cond:function(s){return s.step5>=25;}}
  ]
};

TOPICS.husten_raucher.steps_en=[
 {mech:"comic",data:{kicker:"Scene 1 · The customer arrives",title:"A man walks in - leather jacket, weathered face",img:"assets/PCG_SCN_CUS019_A_ENTRANCE_v003.webp",cta:"React →",
  bubbles:[{who:"Customer",txt:"Hi. I need something for a <b>cough</b>. Preferably something strong that gets rid of it."},{who:"Customer",txt:"It's nothing serious, I've had it for a while. Sort of comes with the territory for me."}]}},
 {mech:"mcq",data:{scene:"assets/PCG_SCN_CUS019_B_COUNTER_v003.webp",kicker:"Scene 2 · The overlooked sentence",title:"\u201cI've had it for a while.\u201d How do you respond?",
  options:[
   {t:"How long is a while - weeks or months? And is it dry or does phlegm come up? That decides what actually helps.",p:25,tr:12,ok:true,h:"Followed up precisely",x:"\u201cFor a while\u201d is the most important sentence in the conversation, and most people overlook it. A cough beyond eight weeks is chronic and needs assessment - regardless of how normal it seems to the customer. And dry versus productive determines the entire direction of therapy."},
   {t:"Sure, here's a strong cough suppressant.",p:0,tr:-12,h:"Doubly wrong",x:"You suppress a possibly productive cough and ignore a potentially chronic process. In a smoker with a long-standing cough, that is precisely the constellation where you assess rather than suppress."},
   {t:"Do you smoke? Then it's obvious where the cough comes from.",p:5,tr:-10,h:"Right suspicion, wrong delivery",x:"The link is likely, but phrased that way it sounds like an accusation. This customer type shuts down instantly - and the conversation in which you could have helped him is over."},
   {t:"Take cough syrup and drink plenty, it'll pass.",p:5,tr:-4,h:"Reassured instead of assessed",x:"Friendly, but without any framing. The duration stays unclarified and with it the decisive question."}]}},
 {mech:"ask3",data:{scene:"assets/PCG_SCN_CUS019_B_COUNTER_v003.webp",kicker:"Scene 2b · Three questions only",title:"He is terse. Three questions - which open the case?",hint:"{n} questions left. One wrong tone and he is gone.",pick:3,okH:"The decisive questions asked",badH:"Questions wasted",expl:"Duration, exertional breathlessness and weight loss are the three questions that open this case: together they form the picture that makes medical assessment mandatory. Asking about smoking is professionally obvious but adds no new information here - and depending on tone it closes the customer down.",questions:[{q:"How long is \u201cfor a while\u201d - weeks or months?",a:"Four months maybe. You get used to it.",val:25},{q:"Do you get short of breath climbing stairs?",a:"Lately yes. I thought it was age.",val:25},{q:"Have you lost weight without trying?",a:"Four kilos. But I eat irregularly too.",val:25},{q:"Is the cough dry or does phlegm come up?",a:"Some phlegm in the morning, then it settles.",val:20},{q:"Have you noticed blood in the sputum?",a:"No. I watch for that.",val:20},{q:"Do you take any medication?",a:"Nothing. I have not seen a doctor in years.",val:15},{q:"Do you smoke?",a:"You can probably tell. Yes.",val:10},{q:"Have you tried cough syrup?",a:"A few times. Helps for a couple of hours.",val:10}]}},
 {mech:"sort",data:{scene:"assets/PCG_SCN_CUS019_C_OTS_v003.webp",kicker:"Scene 3 · History",title:"He answers tersely. Sort it:",
  hint:"Tap a card, then the matching box. Sort all 6.",flagLabel:"Needs assessment",safeLabel:"Harmless / explainable",
  okH:"Cleanly distinguished",badH:"Warning signs missed",
  expl:"Three points needing assessment: a cough for about four months (far beyond the eight-week threshold for chronic cough), breathlessness climbing stairs for some weeks (exertional dyspnoea - together with smoking status a suspicion of COPD) and unintentional weight loss of four kilograms (the single weightiest alarm sign). No blood in the sputum and some morning phlegm alone would not be alarm signs - but the combination makes this unambiguously a case for a doctor.",
  cards:[{t:"Cough present for about four months",flag:true},{t:"Breathless on stairs for some weeks",flag:true},{t:"Lost four kilos without trying",flag:true},{t:"No blood in the sputum",flag:false},{t:"Some phlegm in the morning, better afterwards",flag:false},{t:"Sleeps with the window open",flag:false}]}},
 {mech:"mcq",data:{scene:"assets/PCG_CU_CUS019_P05_CU-TALK_v003.webp",kicker:"Scene 4 · The difficult message",title:"Four months of cough, exertional breathlessness, weight loss. How do you say it?",
  options:[
   {t:"I'll gladly give you something for the symptoms. But a cough over four months together with the breathlessness and the weight loss should be assessed once by a doctor - not to frighten you, but because these things are usually treatable well once you know what they are.",p:25,tr:12,ok:true,h:"Clear, calm, without threat",x:"You name the three findings factually, without making a diagnosis or creating fear, and give him a positive reason to go. In a person who has avoided the topic for months, this exact tone is the difference between a doctor's visit and none."},
   {t:"That sounds like COPD, maybe worse. You need to see a doctor immediately.",p:5,tr:-10,h:"Diagnosis and fear",x:"You make a suspected diagnosis that is not yours to make, and create fear. In this customer type fear frequently leads to avoidance, not to the doctor."},
   {t:"As long as you keep smoking it won't get better anyway.",p:0,tr:-15,h:"Blame instead of counselling",x:"Not professionally wrong, humanly devastating. You lose him - and with him the only chance that anyone notices the warning signs at all."},
   {t:"Take an expectorant for two weeks first, and if it's not better then see a doctor.",p:5,tr:-6,h:"Dangerous delay",x:"With weight loss and exertional breathlessness there is no waiting. Two weeks of self-medication is not an acceptable intermediate step here."}]}},
 {mech:"shelf",data:{kicker:"Scene 5 · What you give him",title:"Referral made. What do you give for the meantime?",
  boxes:[
   {n:"Ambroxol",s:"syrup, expectorant",col:"#1565C0",ok:true,p:20,tr:12,h:"Acceptable bridge",x:"Sensible and harmless until the appointment in productive cough with viscous phlegm - and it masks no findings. Important: drink enough, otherwise no secretolytic works."},
   {n:"Ivy extract",s:"syrup, herbal",col:"#2E7D32",p:14,tr:4,h:"Mild alternative",x:"Well tolerated, acceptable evidence in productive cough. Usable as a gentler option."},
   {n:"Dextromethorphan",s:"cough suppressant",col:"#E65100",p:0,tr:-12,h:"Exactly wrong",x:"An antitussive in productive cough blocks clearance of secretions - and in an unassessed chronic cough it additionally suppresses the very symptom that should lead him to a doctor."},
   {n:"Codeine syrup",s:"prescription only",col:"#6A1B9A",p:0,tr:-10,h:"Not dispensable",x:"Prescription-only - and with suspected chronic lung disease and respiratory depression risk the wrong direction anyway."},
   {n:"Suppressant + expectorant",s:"combination pack",col:"#F9A825",p:0,tr:-10,h:"A contradiction in one box",x:"Loosening phlegm while suppressing the cough reflex cancels itself out - the loosened secretion stays put. One of the classic counselling errors in cough."},
   {n:"Cold rub",s:"topical balm",col:"#00838F",p:8,tr:0,h:"Pleasant but peripheral",x:"Subjectively soothing, without relevant effect on the actual problem. Worth mentioning as an addition, nothing more."}]}},
 
 {mech:"mcq",data:{scene:"assets/PCG_SCN_CUS019_D_HANDOVER_v003.webp",kicker:"Scene 6 · Closing",title:"\u201cAnd what if I don't go to a doctor after all?\u201d",
  options:[
   {t:"That's your decision. I'll just tell you what to watch for yourself: blood in the sputum, fever, increasing breathlessness or further weight loss - then please don't wait any longer. And if you ever think about quitting: just drop by, no appointment needed.",p:25,tr:12,ok:true,h:"Respect, criteria, open door",x:"You accept his autonomy, still hand him concrete warning signs, and leave a low-threshold door open for the smoking-cessation topic without burdening him with it today. That is how you keep a person who has avoided health topics for years."},
   {t:"Then I can't help you either.",p:0,tr:-12,h:"Door slammed",x:"You punish him for his decision. He won't come back - not even when it gets worse."},
   {t:"Then you'll have to live with the consequences.",p:0,tr:-15,h:"Moralizing",x:"A sentence that achieves nothing but shame. And shame is the strongest avoidance driver there is among smokers."},
   {t:"You really should go, I mean it.",p:10,tr:2,h:"Well meant, but no tool",x:"The urgency is right, but repetition convinces nobody. Without concrete warning signs he has nothing to judge it by himself."}]}}
];

TOPICS.husten_raucher.steps_ar=[
 {mech:"comic",data:{kicker:"المشهد 1 · وصول الزبون",title:"رجل يدخل - جاكيت جلدي ووجه أنهكته السنوات",img:"assets/PCG_SCN_CUS019_A_ENTRANCE_v003.webp",cta:"تصرّف ←",
  bubbles:[{who:"الزبون",txt:"مرحباً. أريد شيئاً لل<b>سعال</b>. ويُفضَّل شيئاً قوياً يُنهيه."},{who:"الزبون",txt:"ليس أمراً خطيراً، معي منذ فترة. صار جزءاً مني تقريباً."}]}},
 {mech:"mcq",data:{scene:"assets/PCG_SCN_CUS019_B_COUNTER_v003.webp",kicker:"المشهد 2 · الجملة التي يفوّتها الجميع",title:"\u201cمعي منذ فترة.\u201d كيف تتصرف؟",
  options:[
   {t:"كم تعني «فترة» - أسابيع أم أشهراً؟ وهل هو جاف أم يخرج معه بلغم؟ هذا يحدد ما ينفع أصلاً.",p:25,tr:12,ok:true,h:"تقصٍّ دقيق",x:"«منذ فترة» أهم جملة في الحوار كله، ومعظم الناس يفوّتونها. فالسعال الذي يتجاوز ثمانية أسابيع مزمن ويستوجب تقييماً - مهما بدا عادياً للزبون. والتمييز بين الجاف والمنتج يحدد اتجاه العلاج كله."},
   {t:"طبعاً، تفضل مثبطاً قوياً للسعال.",p:0,tr:-12,h:"خطأ مضاعف",x:"تكبح سعالاً قد يكون منتجاً وتتجاوز حالة قد تكون مزمنة. ومع مدخّن لديه سعال طويل الأمد فهذه بالضبط الحالة التي لا يُكبَح فيها بل تُقيَّم."},
   {t:"هل تدخن؟ إذن السبب واضح.",p:5,tr:-10,h:"استنتاج صحيح بصياغة خاطئة",x:"العلاقة مرجّحة، لكن الصياغة تبدو كاتهام. وهذا النمط من الزبائن ينغلق فوراً - وينتهي الحوار الذي كان بوسعك مساعدته فيه."},
   {t:"خذ شراب سعال واشرب كثيراً وسيزول.",p:5,tr:-4,h:"طمأنة بدل تقييم",x:"ودود لكن بلا أي تأطير. تبقى المدة غير موضّحة ومعها السؤال الحاسم مفتوحاً."}]}},
 {mech:"ask3",data:{scene:"assets/PCG_SCN_CUS019_B_COUNTER_v003.webp",kicker:"المشهد 2ب · ثلاثة أسئلة فقط",title:"هو مقتضب. ثلاثة أسئلة – أيها يفتح الحالة؟",hint:"بقي {n} من الأسئلة. ونبرة خاطئة واحدة تُذهبه.",pick:3,okH:"طرحت الأسئلة الحاسمة",badH:"أهدرت أسئلتك",expl:"المدة وضيق النفس الجهدي ونقص الوزن هي الأسئلة الثلاثة التي تفتح هذه الحالة: فهي معاً تشكّل الصورة التي تجعل التقييم الطبي إلزامياً. أما السؤال عن التدخين فبديهي مهنياً لكنه لا يضيف معلومة جديدة هنا – وقد يُغلق الزبون بحسب النبرة.",questions:[{q:"كم تعني \u201cمنذ فترة\u201d – أسابيع أم أشهراً؟",a:"أربعة أشهر ربما. يعتاد المرء عليها.",val:25},{q:"هل ينقطع نفسك عند صعود الدرج؟",a:"مؤخراً نعم. ظننته العمر.",val:25},{q:"هل نقص وزنك دون قصد؟",a:"أربعة كيلوغرامات. لكني آكل بشكل غير منتظم أيضاً.",val:25},{q:"هل السعال جاف أم يخرج معه بلغم؟",a:"بعض البلغم صباحاً ثم يهدأ.",val:20},{q:"هل لاحظت دماً في القشع؟",a:"لا. أنتبه لذلك.",val:20},{q:"هل تتناول أدوية؟",a:"لا شيء. لم أراجع طبيباً منذ سنوات.",val:15},{q:"هل تدخن؟",a:"يبدو أنك تلاحظ ذلك. نعم.",val:10},{q:"هل جرّبت شراب السعال؟",a:"مرات قليلة. ينفع لبضع ساعات.",val:10}]}},
 {mech:"sort",data:{scene:"assets/PCG_SCN_CUS019_C_OTS_v003.webp",kicker:"المشهد 3 · الأنامنيزه",title:"يجيب باقتضاب. صنّف:",
  hint:"انقر البطاقة ثم الصندوق المناسب. صنّف الست جميعاً.",flagLabel:"يستوجب تقييماً",safeLabel:"غير مقلق / مفسَّر",
  okH:"تمييز سليم",badH:"فوّتك علامات الإنذار",
  expl:"ثلاث نقاط تستوجب التقييم: سعال منذ نحو أربعة أشهر (أبعد بكثير من حدّ الثمانية أسابيع للسعال المزمن)، وضيق نفس عند صعود الدرج منذ أسابيع (زلة جهدية - ومع كونه مدخّناً تثير الاشتباه بالداء الرئوي الانسدادي المزمن)، ونقص وزن غير مقصود بأربعة كيلوغرامات (أثقل علامة إنذار على الإطلاق). أما غياب الدم في القشع وبعض البلغم الصباحي فليسا بذاتهما علامتي إنذار - لكن التجمّع يجعل هذه الحالة حالة طبيب بلا لبس.",
  cards:[{t:"السعال موجود منذ نحو أربعة أشهر",flag:true},{t:"ضيق نفس عند صعود الدرج منذ أسابيع",flag:true},{t:"نقص أربعة كيلوغرامات دون قصد",flag:true},{t:"لا دم في القشع",flag:false},{t:"بعض البلغم صباحاً ثم يتحسن",flag:false},{t:"ينام والنافذة مفتوحة",flag:false}]}},
 {mech:"mcq",data:{scene:"assets/PCG_CU_CUS019_P05_CU-TALK_v003.webp",kicker:"المشهد 4 · الرسالة الصعبة",title:"أربعة أشهر سعال، زلة جهدية، نقص وزن. كيف تقولها له؟",
  options:[
   {t:"سأعطيك بكل سرور شيئاً للأعراض. لكن سعالاً يتجاوز أربعة أشهر مع ضيق النفس ونقص الوزن يجب أن يُقيَّم عند الطبيب مرة - لا لأخيفك، بل لأن هذه الأمور تُعالَج جيداً غالباً حين يُعرف سببها.",p:25,tr:12,ok:true,h:"واضح وهادئ وبلا تهديد",x:"تسمّي النتائج الثلاث بموضوعية دون أن تشخّص أو تخيف، وتمنحه سبباً إيجابياً للذهاب. ومع شخص يتجنب الموضوع منذ أشهر تكون هذه النبرة تحديداً هي الفرق بين زيارة طبيب ولا شيء."},
   {t:"يبدو داءً رئوياً انسدادياً مزمناً، وربما أسوأ. عليك مراجعة طبيب فوراً.",p:5,tr:-10,h:"تشخيص وخوف",x:"تضع تشخيصاً مشتبهاً ليس من حقك، وتصنع خوفاً. والخوف عند هذا النمط يقود إلى التجنّب لا إلى الطبيب."},
   {t:"ما دمت تدخن فلن يتحسن الأمر على أي حال.",p:0,tr:-15,h:"لوم بدل استشارة",x:"ليس خاطئاً علمياً لكنه مدمّر إنسانياً. تخسره - وتخسر معه الفرصة الوحيدة لأن ينتبه أحد لعلامات الإنذار."},
   {t:"خذ مذيباً للبلغم أسبوعين، وإن لم يتحسن راجع طبيباً.",p:5,tr:-6,h:"تأجيل خطر",x:"مع نقص الوزن والزلة الجهدية لا مجال للانتظار. وأسبوعان من العلاج الذاتي ليسا مرحلة وسطى مقبولة هنا."}]}},
 {mech:"shelf",data:{kicker:"المشهد 5 · ما تعطيه إياه",title:"صدرت التوصية بالطبيب. ماذا تعطيه في الأثناء؟",
  boxes:[
   {n:"أمبروكسول",s:"شراب مذيب للبلغم",col:"#1565C0",ok:true,p:20,tr:12,h:"جسر مقبول",x:"مفيد وغير ضار حتى موعد الطبيب في السعال المنتج ذي البلغم اللزج - ولا يُخفي أي علامة. والمهم: شرب كافٍ وإلا لم يعمل أي مذيب."},
   {n:"مستخلص اللبلاب",s:"شراب نباتي",col:"#2E7D32",p:14,tr:4,h:"بديل لطيف",x:"جيد التحمّل وأدلته مقبولة في السعال المنتج. صالح كخيار ألطف."},
   {n:"ديكستروميتورفان",s:"مثبط سعال",col:"#E65100",p:0,tr:-12,h:"الخطأ بعينه",x:"مثبط السعال مع سعال منتج يعيق إخراج المفرزات - ومع سعال مزمن غير مُقيَّم يكبح إضافةً العَرَض الذي يُفترض أن يقوده إلى الطبيب."},
   {n:"شراب كوديين",s:"بوصفة طبية",col:"#6A1B9A",p:0,tr:-10,h:"غير قابل للصرف",x:"بوصفة - ومع الاشتباه بداء رئوي مزمن وخطر تثبيط التنفس هو الاتجاه الخاطئ أصلاً."},
   {n:"مثبط + مذيب",s:"عبوة مركّبة",col:"#F9A825",p:0,tr:-10,h:"تناقض في علبة واحدة",x:"إذابة البلغم مع كبح منعكس السعال يلغي أحدهما الآخر - فيبقى البلغم المذاب مكانه. من أشهر أخطاء الاستشارة في السعال."},
   {n:"مرهم صدر",s:"للدهن",col:"#00838F",p:8,tr:0,h:"مريح لكنه هامشي",x:"مريح ذاتياً وبلا أثر مهم على المشكلة الحقيقية. يُذكر كإضافة لا أكثر."}]}},
 
 {mech:"mcq",data:{scene:"assets/PCG_SCN_CUS019_D_HANDOVER_v003.webp",kicker:"المشهد 6 · الختام",title:"\u201cوإن لم أذهب إلى الطبيب؟\u201d",
  options:[
   {t:"هذا قرارك. سأخبرك فقط بما تنتبه إليه بنفسك: دم في القشع، أو حمى، أو ازدياد ضيق النفس، أو نقص وزن إضافي - عندها لا تنتظر أكثر. وإن فكّرت يوماً في الإقلاع: مرّ علينا بلا موعد.",p:25,tr:12,ok:true,h:"احترام ومعايير وباب مفتوح",x:"تقبل استقلاليته، وتمنحه رغم ذلك علامات إنذار ملموسة، وتترك باباً منخفض العتبة لموضوع الإقلاع دون أن تُثقله به اليوم. هكذا تكسب إنساناً تجنّب المواضيع الصحية سنوات."},
   {t:"إذن لا أستطيع مساعدتك أيضاً.",p:0,tr:-12,h:"باب مُوصَد",x:"تعاقبه على قراره. ولن يعود - ولا حتى حين يسوء الأمر."},
   {t:"إذن عليك تحمّل العواقب.",p:0,tr:-15,h:"وعظ",x:"جملة لا تُحدث شيئاً سوى الخجل. والخجل أقوى دافع للتجنّب عند المدخنين."},
   {t:"عليك الذهاب فعلاً، أنا جاد.",p:10,tr:2,h:"نية حسنة بلا أداة",x:"الإلحاح صحيح، لكن التكرار لا يقنع أحداً. وبلا علامات إنذار ملموسة لا يملك ما يقيس عليه بنفسه."}]}}
];
