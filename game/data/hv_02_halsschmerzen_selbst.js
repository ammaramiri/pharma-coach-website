/* =====================================================================
   Falldaten · halsschmerzen_selbst
   Ausgelagert aus game/index.html am 12.11.2026 (Technik: Daten-Split).
   Inhalt woertlich uebernommen, nur Bildendungen .jpg/.png -> .webp.
   Geladen erst beim Start des Falls durch levelDaten(); der Stummel in
   index.html traegt nur Titel, Persona, Banner und src.
===================================================================== */
TOPICS.halsschmerzen_selbst = {
    de:"Halsschmerzen", en:"Sore throat", ar:"التهاب الحلق",
    persona:"selbst",
    banner:"assets/PCG_CARD_CUS002_v003.webp",
    steps:[
      { mech:"comic", data:{ kicker:"Szene 1 · Der Kunde kommt", title:"Ein Herr betritt zielstrebig die Apotheke", img:"assets/PCG_SCN_CUS002_A_ENTRANCE_v003.webp", cta:"Reagieren →",
        bubbles:[ {who:"Kunde",txt:"Guten Tag! Ich habe seit gestern starke Halsschmerzen. Ich habe im Internet recherchiert – das ist sicher eine <b>Streptokokken-Infektion</b>."},
                  {who:"Kunde",txt:"Geben Sie mir bitte <b>Amoxicillin</b>. Ich weiß, was ich brauche."} ] } },
      { mech:"mcq", data:{ scene:"assets/PCG_SCN_CUS002_B_COUNTER_v003.webp", kicker:"Entscheidung", title:"Der Selbstdiagnostiker verlangt ein Antibiotikum. Ihre Reaktion?", timeoutH:"Zeit abgelaufen", timeoutX:"Der Kunde trommelt mit den Fingern. Richtig wäre gewesen: Eigeninitiative würdigen, dann die Führung übernehmen.",
        options:[
          {t:"Antibiotika gibt es nur auf Rezept. Da kann ich nichts machen – gehen Sie zum Arzt.",p:5,tr:-8,h:"Korrekt, aber verschenkt",x:"Sachlich richtig, kommunikativ schwach. Sie beenden das Gespräch, statt zu beraten – der Selbstdiagnostiker fühlt sich abgewiesen und geht in die nächste Apotheke."},
          {t:"Interessant, dass Sie schon recherchiert haben. Damit ich Ihnen wirklich helfen kann – darf ich kurz ein paar Fragen stellen?",p:25,tr:10,ok:true,h:"Meisterhaft",x:"Sie würdigen die Eigeninitiative, ohne die Selbstdiagnose zu bestätigen, und übernehmen die professionelle Führung. Genau so öffnet sich dieser Kundentyp."},
          {t:"Sie können keine Diagnose stellen. Das ist mein Job – ich bin der Apotheker hier.",p:0,tr:-15,h:"Konflikt provoziert",x:"Der Selbstdiagnostiker reagiert auf Bevormundung besonders empfindlich. Kompetenz zeigt man durch gute Fragen, nicht durch Belehrung."},
          {t:"Amoxicillin haben wir gerade nicht da. Möchten Sie ein anderes Antibiotikum?",p:0,tr:-12,h:"Schwerer Fehler",x:"Diese Antwort suggeriert, Sie könnten verschreibungspflichtige Antibiotika ohne Rezept abgeben. Rechtlich und fachlich inakzeptabel."} ] } },
      { mech:"ask3", data:{ scene:"assets/PCG_SCN_CUS002_C_OTS_v003.webp", kicker:"Szene 2 · Anamnese – nur drei Fragen", title:"Sie haben Zeit für drei Fragen. Welche bringen Sie weiter?", hint:"Noch {n} Fragen übrig. Wählen Sie mit Bedacht.", pick:3, okH:"Die richtigen Fragen gestellt", badH:"Fragen verschenkt", expl:"Fieber, einseitige Schmerzen und Dauermedikation bzw. Vorerkrankungen sind die drei Fragen, die hier über alles entscheiden: sie trennen die virale Pharyngitis vom Abszess, klären den Arztverweis und bestimmen die Produktauswahl. Die Diabetes-Angabe wird gleich am Regal entscheidend – wer sie nicht erfragt hat, greift daneben.", questions:[
          {q:"Haben Sie Fieber gemessen?",a:"Nein, heute Morgen 36,8 °C.",val:25},
          {q:"Nehmen Sie Medikamente oder haben Sie Vorerkrankungen?",a:"Ich bin Diabetiker, sonst nichts.",val:25},
          {q:"Ist der Schmerz beidseitig oder nur auf einer Seite?",a:"Erst dachte ich einseitig – aber eigentlich beidseitig.",val:25},
          {q:"Können Sie normal schlucken und atmen?",a:"Ja. Einmal habe ich mich verschluckt, sonst geht alles.",val:15},
          {q:"Seit wann bestehen die Beschwerden?",a:"Seit gestern Abend.",val:10},
          {q:"Sehen Sie weiße Beläge auf den Mandeln?",a:"Nein, ich habe im Spiegel geschaut.",val:15},
          {q:"Rauchen Sie?",a:"Nie geraucht.",val:5},
          {q:"Welchen Geschmack bevorzugen Sie?",a:"Ähm … Honig? Warum fragen Sie das?",val:0}
        ] } },
      { mech:"sort", data:{ scene:"assets/PCG_SCN_CUS002_C_OTS_v003.webp", kicker:"Szene 2b · Fakten prüfen", title:"Er erzählt – prüfen Sie jede Information:",
        hint:"Antippen, dann Box wählen. Alle 6 zuordnen.", flagLabel:"Red Flag – abklären!", safeLabel:"Unbedenklich / erklärbar",
        okH:"Systematisch geprüft", badH:"Prüfung mit Lücken",
        expl:"Die zwei scheinbaren Alarmzeichen lösen sich beim Nachfragen auf: die Schmerzen sind doch beidseitig (kein Abszess-Verdacht), und die 'Atemnot' war einmaliges Verschlucken beim hastigen Essen. Kein Fieber, kein Eiter, Schlucken möglich – virale Pharyngitis wahrscheinlich, Selbstmedikation vertretbar. Aber: Die Diabetes-Angabe wird gleich produktrelevant!",
        cards:[ {t:"Kratzen im Hals seit gestern Abend",flag:false},{t:"Kein Fieber (heute gemessen)",flag:false},
                {t:"Schmerzen angeblich nur einseitig, stark",flag:true},{t:"Ich bin übrigens Diabetiker",flag:false},
                {t:"Internet sagt: sicher Streptokokken",flag:false},{t:"Gestern kurz Atemnot beim Essen",flag:true} ] } },
      
      { mech:"shelf", data:{ kicker:"Szene 3 · Die Empfehlung", title:"Kein Fieber, kein Eiter, Diabetiker. Greifen Sie ins Regal:",
        boxes:[
          {n:"Flurbiprofen",s:"Lutschtabl., zuckerfrei",col:"#1565C0",ok:true,p:20,tr:12,h:"Richtiger Griff",x:"Lokal entzündungshemmend, schmerzlindernd, zuckerfrei – passend für Diabetiker. Hinweis: max. 3 Tage, Vorsicht bei NSAR-Kontraindikationen."},
          {n:"Lutschpastillen",s:"klassisch, mit Zucker",col:"#2E7D32",p:5,tr:-6,h:"Kontraindikation übersehen",x:"Er hat Ihnen gerade gesagt, dass er Diabetiker ist. Zuckerhaltige Pastillen sind hier die falsche Wahl – zuhören zahlt sich aus."},
          {n:"Ibuprofen 400",s:"Tabletten, systemisch",col:"#E65100",p:10,tr:0,h:"Wirksam, aber unnötig systemisch",x:"Bei lokalen Halsschmerzen ohne Fieber ist die lokale Therapie erste Wahl. Systemisches NSAR wäre die zweite Stufe."},
          {n:"Hydrogel-Pastillen",s:"zuckerfrei",col:"#00838F",p:15,tr:6,h:"Gute Alternative",x:"Schutzfilm-Prinzip, zuckerfrei, für Diabetiker geeignet. Bei stärkerer Entzündung wäre Flurbiprofen wirksamer."},
          {n:"Vitamin C",s:"Brausetabletten",col:"#F9A825",p:0,tr:-4,h:"Keine Akutwirkung",x:"Nett gemeint, aber keine evidenzbasierte Akuttherapie bei Halsschmerzen."},
          {n:"Erkältungsbad",s:"Zusatz",col:"#6A1B9A",p:0,tr:-4,h:"Falsche Baustelle",x:"Ein Bad gegen Halsschmerzen? Der Kunde runzelt die Stirn."} ] } },
      { mech:"truefalse", data:{ scene:"assets/PCG_CU_CUS002_P05_CU-TALK_v003.webp", kicker:"Szene 4 · Schnellrunde", title:"Er will es genau wissen. Richtig oder falsch?", trueLabel:"Richtig", falseLabel:"Falsch", okH:"Schnellrunde gemeistert", badH:"Ein paar Irrtümer", expl:"Die häufigsten Irrtümer bei Halsschmerzen: die große Mehrheit ist viral, Antibiotika wirken nicht gegen Viren, und Gurgeln mit hochprozentigem Alkohol reizt die Schleimhaut zusätzlich. Richtig dagegen: Lutschtabletten wirken lokal, ein einseitig starker Schmerz mit Kieferklemme gehört zum Arzt, und Rauchen verzögert die Abheilung deutlich.", items:[{t:"Die meisten Halsschmerzen sind viral bedingt.",ok:true,why:"Rund 70-90 % – deshalb ist ein Antibiotikum meist wirkungslos."},{t:"Antibiotika verkürzen auch virale Halsschmerzen.",ok:false,why:"Kein Effekt auf Viren, dafür Resistenzen und Nebenwirkungen."},{t:"Gurgeln mit hochprozentigem Alkohol desinfiziert den Hals.",ok:false,why:"Reizt die entzündete Schleimhaut zusätzlich."},{t:"Ein einseitig sehr starker Schmerz mit Kieferklemme gehört zum Arzt.",ok:true,why:"Verdacht auf Peritonsillarabszess – das ist keine Selbstmedikation mehr."},{t:"Lutschtabletten wirken nur über den Speichelfluss, nicht lokal.",ok:false,why:"Der lokale Wirkstoffkontakt ist der eigentliche Effekt."},{t:"Rauchen verzögert die Abheilung deutlich.",ok:true,why:"Ein Punkt, der in der Beratung fast immer fehlt."}] } },
      { mech:"mcq", data:{ scene:"assets/PCG_SCN_CUS002_D_HANDOVER_v003.webp", kicker:"Szene 4 · Abschluss", title:"„Und wenn es doch Streptokokken sind – woran merke ich das?“",
        options:[
          {t:"Zum Arzt bei: Fieber über 38,5°, eitrigen Belägen, starker einseitiger Schwellung, kloßiger Sprache oder Atemnot – und wenn es nach 3-4 Tagen nicht besser wird.",p:25,tr:12,ok:true,h:"Perfekter Abschluss",x:"Konkrete, überprüfbare Kriterien statt vager Beruhigung. Der Selbstdiagnostiker bekommt genau das, was er liebt: klare Daten – diesmal die richtigen."},
          {t:"Streptokokken sind es sicher nicht, vergessen Sie das Internet.",p:0,tr:-8,h:"Falsche Sicherheit + Frontalangriff",x:"Sie können eine bakterielle Infektion nicht ausschließen – und Sie greifen seine Recherche an, statt sie zu kanalisieren."},
          {t:"Wenn die Tabletten nicht helfen, kommen Sie wieder zu mir.",p:10,tr:-2,h:"Bindung ersetzt keine Kriterien",x:"Bei echten Warnzeichen (Abszess, Scharlach) führt der Weg direkt zum Arzt, nicht über die Offizin."},
          {t:"Googeln Sie einfach nochmal in drei Tagen.",p:0,tr:-10,h:"Kapitulation",x:"Sie delegieren Ihre Beratungsverantwortung an die Suchmaschine, die das Problem verursacht hat."} ] } }
    ],
    badges:[
      {icon:"🗣️",de:"Diplomat",en:"Diplomat",ar:"الدبلوماسي",cond:function(s){return s.step1>=25;}},
      {icon:"🚩",de:"Red-Flag-Scanner",en:"Red-Flag Scanner",ar:"ماسح العلامات",cond:function(){return true;}},
      {icon:"👂",de:"Zuhörer",en:"Good Listener",ar:"المستمع الجيد",cond:function(s){return s.total>=55;}},
      {icon:"🤝",de:"Vertrauensperson",en:"Trusted Advisor",ar:"موضع الثقة",cond:function(s){return s.trust>=70;}}
    ]
};

TOPICS.halsschmerzen_selbst.steps_en=[
 {mech:"comic",data:{kicker:"Scene 1 · The customer arrives",title:"A gentleman walks in with determination",img:"assets/PCG_SCN_CUS002_A_ENTRANCE_v003.webp",cta:"React →",
  bubbles:[{who:"Customer",txt:"Hello! Severe sore throat since yesterday. I researched online – it is definitely a <b>strep infection</b>."},{who:"Customer",txt:"Please give me <b>amoxicillin</b>. I know what I need."}]}},
 {mech:"mcq",data:{scene:"assets/PCG_SCN_CUS002_B_COUNTER_v003.webp",kicker:"Decision",title:"The self-diagnoser demands an antibiotic. Your reaction?",timeoutH:"Time's up",timeoutX:"He drums his fingers. The right move: honor initiative, then take the lead.",
  options:[
   {t:"Antibiotics need a prescription. Nothing I can do – see a doctor.",p:5,tr:-8,h:"Correct but wasted",x:"Factually right, communicatively weak. You end the conversation instead of advising – he walks to the next pharmacy."},
   {t:"Interesting that you researched already. So I can really help – may I ask a few quick questions?",p:25,tr:10,ok:true,h:"Masterful",x:"You honor the initiative without confirming the self-diagnosis and take professional lead. Exactly how this type opens up."},
   {t:"You can't diagnose yourself. That's my job – I'm the pharmacist here.",p:0,tr:-15,h:"Conflict provoked",x:"The self-diagnoser is hypersensitive to condescension. Competence shows through good questions, not lectures."},
   {t:"Amoxicillin is out of stock. Would you like a different antibiotic?",p:0,tr:-12,h:"Serious error",x:"This implies you could dispense prescription antibiotics without one. Legally and professionally unacceptable."}]}},
 {mech:"ask3",data:{scene:"assets/PCG_SCN_CUS002_C_OTS_v003.webp",kicker:"Scene 2 · History - three questions only",title:"You have time for three questions. Which ones move you forward?",hint:"{n} questions left. Choose carefully.",pick:3,okH:"The right questions asked",badH:"Questions wasted",expl:"Fever, one-sided pain and chronic medication or conditions are the three questions that decide everything here: they separate viral pharyngitis from an abscess, settle the referral, and determine the product choice. The diabetes detail becomes decisive at the shelf in a moment - whoever did not ask for it will pick wrong.",questions:[
   {q:"Have you measured your temperature?",a:"No fever - 36.8 °C this morning.",val:25},
   {q:"Do you take any medication or have chronic conditions?",a:"I am diabetic, nothing else.",val:25},
   {q:"Is the pain on both sides or only one?",a:"I thought one side at first - but actually both.",val:25},
   {q:"Can you swallow and breathe normally?",a:"Yes. I choked once while eating, otherwise fine.",val:15},
   {q:"How long have you had this?",a:"Since yesterday evening.",val:10},
   {q:"Any white coating on the tonsils?",a:"No, I checked in the mirror.",val:15},
   {q:"Do you smoke?",a:"Never have.",val:5},
   {q:"Which flavour do you prefer?",a:"Erm … honey? Why do you ask?",val:0}
 ]}},
 {mech:"sort",data:{scene:"assets/PCG_SCN_CUS002_C_OTS_v003.webp",kicker:"Scene 2b · Fact check",title:"He talks – check each piece of information:",
  hint:"Tap a card, then the matching box. Sort all 6.",flagLabel:"Red flag – clarify!",safeLabel:"Harmless / explainable",
  okH:"Checked systematically",badH:"Gaps in your check",
  expl:"The two apparent alarms resolve on questioning: pain is actually bilateral (no abscess suspicion), and the 'breathlessness' was one choking episode while eating fast. No fever, no pus, swallowing possible – viral pharyngitis likely, self-medication acceptable. And note: the diabetes remark becomes product-relevant!",
  cards:[{t:"Scratchy throat since last evening",flag:false},{t:"No fever (measured today)",flag:false},{t:"Pain supposedly one-sided, severe",flag:true},{t:"By the way, I'm diabetic",flag:false},{t:"Internet says: definitely strep",flag:false},{t:"Brief breathlessness while eating yesterday",flag:true}]}},
 
 {mech:"shelf",data:{kicker:"Scene 3 · The recommendation",title:"No fever, no pus, diabetic. Reach for the shelf:",
  boxes:[
   {n:"Flurbiprofen",s:"lozenges, sugar-free",col:"#1565C0",ok:true,p:20,tr:12,h:"Right pick",x:"Locally anti-inflammatory, analgesic, sugar-free – right for a diabetic. Note: max 3 days, mind NSAID contraindications."},
   {n:"Lozenges",s:"classic, with sugar",col:"#2E7D32",p:5,tr:-6,h:"Contraindication missed",x:"He just told you he is diabetic. Listening pays."},
   {n:"Ibuprofen 400",s:"tablets, systemic",col:"#E65100",p:10,tr:0,h:"Effective but needlessly systemic",x:"For local sore throat without fever, local therapy comes first."},
   {n:"Hydrogel lozenges",s:"sugar-free",col:"#00838F",p:15,tr:6,h:"Good alternative",x:"Protective-film principle, diabetic-friendly. For stronger inflammation flurbiprofen works better."},
   {n:"Vitamin C",s:"effervescent",col:"#F9A825",p:0,tr:-4,h:"No acute effect",x:"No evidence-based acute therapy for sore throat."},
   {n:"Cold bath",s:"additive",col:"#6A1B9A",p:0,tr:-4,h:"Wrong problem",x:"A bath for a sore throat? He frowns."}]}},
 {mech:"truefalse",data:{scene:"assets/PCG_CU_CUS002_P05_CU-TALK_v003.webp",kicker:"Scene 4 · Rapid round",title:"He wants precise answers. True or false?",trueLabel:"True",falseLabel:"False",okH:"Rapid round mastered",badH:"A few misconceptions",expl:"The commonest misconceptions about sore throat: the vast majority is viral, antibiotics do not work against viruses, and gargling with high-proof alcohol irritates the mucosa further. Correct: lozenges act locally, severe one-sided pain with trismus belongs with a doctor, and smoking clearly delays healing.",items:[{t:"Most sore throats are viral.",ok:true,why:"Around 70-90 % - which is why an antibiotic is usually ineffective."},{t:"Antibiotics also shorten viral sore throats.",ok:false,why:"No effect on viruses, but resistance and side effects."},{t:"Gargling with high-proof alcohol disinfects the throat.",ok:false,why:"It irritates the inflamed mucosa further."},{t:"Severe one-sided pain with jaw stiffness belongs with a doctor.",ok:true,why:"Suspected peritonsillar abscess - no longer self-medication."},{t:"Lozenges work only through saliva flow, not locally.",ok:false,why:"Local contact with the active substance is the actual effect."},{t:"Smoking clearly delays healing.",ok:true,why:"A point almost always missing from counselling."}]}},
 {mech:"mcq",data:{scene:"assets/PCG_SCN_CUS002_D_HANDOVER_v003.webp",kicker:"Scene 4 · Closing",title:"\u201cAnd if it IS strep – how would I know?\u201d",
  options:[
   {t:"See a doctor for: fever above 38.5°, purulent coating, severe one-sided swelling, muffled voice or breathing trouble – and if no better after 3-4 days.",p:25,tr:12,ok:true,h:"Perfect closing",x:"Concrete, checkable criteria instead of vague reassurance. The self-diagnoser gets what he loves: clear data – the right data this time."},
   {t:"It's definitely not strep, forget the internet.",p:0,tr:-8,h:"False certainty + frontal attack",x:"You cannot exclude a bacterial infection – and you attack his research instead of channeling it."},
   {t:"If the lozenges don't help, come back to me.",p:10,tr:-2,h:"Loyalty is no substitute for criteria",x:"With true warning signs (abscess, scarlet fever) the path leads straight to the doctor."},
   {t:"Just google it again in three days.",p:0,tr:-10,h:"Capitulation",x:"You delegate your counselling duty to the search engine that caused the problem."}]}}
];

TOPICS.halsschmerzen_selbst.steps_ar=[
 {mech:"comic",data:{kicker:"المشهد 1 · وصول الزبون",title:"رجل يدخل الصيدلية بخطى واثقة",img:"assets/PCG_SCN_CUS002_A_ENTRANCE_v003.webp",cta:"تصرّف ←",
  bubbles:[{who:"الزبون",txt:"مرحباً! التهاب حاد في الحلق منذ الأمس. بحثت في الإنترنت – إنها حتماً <b>عدوى بكتيرية عقدية</b>."},{who:"الزبون",txt:"أعطني <b>أموكسيسيلين</b> من فضلك. أنا أعرف ما أحتاج."}]}},
 {mech:"mcq",data:{scene:"assets/PCG_SCN_CUS002_B_COUNTER_v003.webp",kicker:"قرار",title:"صاحب التشخيص الذاتي يطلب مضاداً حيوياً. ردّك؟",timeoutH:"انتهى الوقت",timeoutX:"يقرع بأصابعه. الصحيح كان: قدّر مبادرته ثم تولَّ القيادة.",
  options:[
   {t:"المضادات الحيوية بوصفة فقط. لا أستطيع فعل شيء – راجع الطبيب.",p:5,tr:-8,h:"صحيح لكنه مُهدَر",x:"صحيح علمياً، ضعيف تواصلياً. أنهيت الحوار بدل أن تستشير – سيذهب إلى الصيدلية المجاورة."},
   {t:"جميل أنك بحثت مسبقاً. لأساعدك فعلاً – هل تسمح لي بأسئلة سريعة؟",p:25,tr:10,ok:true,h:"ببراعة",x:"قدّرت المبادرة دون تأكيد التشخيص الذاتي وتوليت القيادة المهنية. هكذا ينفتح هذا النمط."},
   {t:"لا يمكنك تشخيص نفسك. هذه وظيفتي – أنا الصيدلاني هنا.",p:0,tr:-15,h:"استفزاز للصراع",x:"هذا النمط شديد الحساسية للوصاية. الكفاءة تظهر بالأسئلة الجيدة لا بالمحاضرات."},
   {t:"الأموكسيسيلين غير متوفر حالياً. أتريد مضاداً حيوياً آخر؟",p:0,tr:-12,h:"خطأ جسيم",x:"هذا يوحي بإمكانية صرف مضاد حيوي بلا وصفة. مرفوض قانونياً ومهنياً."}]}},
 {mech:"ask3",data:{scene:"assets/PCG_SCN_CUS002_C_OTS_v003.webp",kicker:"المشهد 2 · الأنامنيزه – ثلاثة أسئلة فقط",title:"لديك وقت لثلاثة أسئلة. أيها يقدّمك فعلاً؟",hint:"بقي {n} من الأسئلة. اختر بعناية.",pick:3,okH:"طرحت الأسئلة الصحيحة",badH:"أهدرت أسئلتك",expl:"الحمى والألم أحادي الجانب والأدوية المزمنة أو الأمراض هي الأسئلة الثلاثة التي تحسم كل شيء هنا: تفصل التهاب البلعوم الفيروسي عن الخرّاج، وتحسم الإحالة، وتحدد اختيار المنتج. ومعلومة السكري ستصبح حاسمة عند الرف بعد قليل - ومن لم يسأل عنها سيخطئ الاختيار.",questions:[
   {q:"هل قست حرارتك؟",a:"لا حمى - 36,8 هذا الصباح.",val:25},
   {q:"هل تتناول أدوية أو لديك أمراض مزمنة؟",a:"أنا مصاب بالسكري، لا شيء غير ذلك.",val:25},
   {q:"هل الألم في الجهتين أم في جهة واحدة؟",a:"ظننته في جهة واحدة أولاً - لكنه في الجهتين فعلياً.",val:25},
   {q:"هل تستطيع البلع والتنفس بشكل طبيعي؟",a:"نعم. شرقت مرة أثناء الأكل، وما عدا ذلك جيد.",val:15},
   {q:"منذ متى تعاني؟",a:"منذ مساء الأمس.",val:10},
   {q:"هل ترى طبقة بيضاء على اللوزتين؟",a:"لا، نظرت في المرآة.",val:15},
   {q:"هل تدخن؟",a:"لم أدخن قط.",val:5},
   {q:"أي نكهة تفضّل؟",a:"إممم … عسل؟ ولماذا تسأل؟",val:0}
 ]}},
 {mech:"sort",data:{scene:"assets/PCG_SCN_CUS002_C_OTS_v003.webp",kicker:"المشهد 2ب · فحص الحقائق",title:"يحكي – افحص كل معلومة:",
  hint:"انقر البطاقة ثم الصندوق المناسب. صنّف الست جميعاً.",flagLabel:"علامة حمراء – استوضح!",safeLabel:"غير مقلق / مفسَّر",
  okH:"فحص منهجي",badH:"ثغرات في الفحص",
  expl:"العلامتان الظاهرتان تنحلّان بالسؤال: الألم في الجهتين فعلياً (لا شبهة خرّاج)، و«ضيق النفس» كان شرقة واحدة أثناء أكل سريع. لا حمى، لا قيح، البلع ممكن – التهاب بلعوم فيروسي مرجّح، والعلاج الذاتي مقبول. وانتبه: معلومة السكري ستصبح حاسمة عند اختيار المنتج!",
  cards:[{t:"حرقة في الحلق منذ مساء الأمس",flag:false},{t:"لا حمى (مقاسة اليوم)",flag:false},{t:"ألم شديد بجهة واحدة كما يدّعي",flag:true},{t:"بالمناسبة أنا مصاب بالسكري",flag:false},{t:"الإنترنت يقول: عقديات مؤكدة",flag:false},{t:"ضيق نفس قصير أثناء الأكل أمس",flag:true}]}},
 
 {mech:"shelf",data:{kicker:"المشهد 3 · التوصية",title:"لا حمى، لا قيح، مريض سكري. مدّ يدك إلى الرف:",
  boxes:[
   {n:"فلوربيبروفين",s:"أقراص مص، خالية من السكر",col:"#1565C0",ok:true,p:20,tr:12,h:"الاختيار الصحيح",x:"مضاد التهاب موضعي مسكّن، خالٍ من السكر – مناسب لمريض السكري. تنبيه: 3 أيام كحد أقصى، وانتبه لموانع مضادات الالتهاب."},
   {n:"أقراص مص",s:"تقليدية بالسكر",col:"#2E7D32",p:5,tr:-6,h:"فاتك المانع",x:"أخبرك للتو أنه مصاب بالسكري. الإصغاء يثمر."},
   {n:"إيبوبروفين 400",s:"أقراص جهازية",col:"#E65100",p:10,tr:0,h:"فعال لكنه جهازي بلا داعٍ",x:"في الألم الموضعي بلا حمى العلاج الموضعي أولاً."},
   {n:"أقراص هيدروجيل",s:"خالية من السكر",col:"#00838F",p:15,tr:6,h:"بديل جيد",x:"مبدأ الغشاء الواقي، مناسب للسكري. عند التهاب أشد يكون الفلوربيبروفين أنجع."},
   {n:"فيتامين C",s:"فوّار",col:"#F9A825",p:0,tr:-4,h:"بلا أثر حاد",x:"لا علاج حاد مبني على الدليل لالتهاب الحلق."},
   {n:"حمّام البرد",s:"إضافة",col:"#6A1B9A",p:0,tr:-4,h:"مشكلة أخرى",x:"حمّام لالتهاب الحلق؟ يعقد حاجبيه."}]}},
 {mech:"truefalse",data:{scene:"assets/PCG_CU_CUS002_P05_CU-TALK_v003.webp",kicker:"المشهد 4 · جولة سريعة",title:"يريد أجوبة دقيقة. صح أم خطأ؟",trueLabel:"صح",falseLabel:"خطأ",okH:"أتقنت الجولة السريعة",badH:"بعض المفاهيم الخاطئة",expl:"أشيع المفاهيم الخاطئة في التهاب الحلق: الغالبية العظمى فيروسية، والمضادات الحيوية لا تعمل ضد الفيروسات، والغرغرة بالكحول عالي التركيز تزيد تهيّج المخاطية. أما الصحيح فهو: أقراص المص تعمل موضعياً، والألم الشديد أحادي الجانب مع ضزز الفك يستوجب الطبيب، والتدخين يؤخر الشفاء بوضوح.",items:[{t:"معظم التهابات الحلق فيروسية.",ok:true,why:"نحو 70-90% – ولهذا يكون المضاد الحيوي عديم الجدوى غالباً."},{t:"المضادات الحيوية تختصر التهاب الحلق الفيروسي أيضاً.",ok:false,why:"لا أثر لها على الفيروسات، وتجلب المقاومة والآثار الجانبية."},{t:"الغرغرة بالكحول عالي التركيز تعقّم الحلق.",ok:false,why:"تزيد تهيّج المخاطية الملتهبة."},{t:"الألم الشديد في جهة واحدة مع صعوبة فتح الفم يستوجب الطبيب.",ok:true,why:"اشتباه بخرّاج حول اللوزة – ولم يعد علاجاً ذاتياً."},{t:"أقراص المص تعمل عبر زيادة اللعاب فقط لا موضعياً.",ok:false,why:"التماس الموضعي للمادة الفعالة هو الأثر الحقيقي."},{t:"التدخين يؤخر الشفاء بوضوح.",ok:true,why:"نقطة تغيب عن الاستشارة دائماً تقريباً."}]}},
 {mech:"mcq",data:{scene:"assets/PCG_SCN_CUS002_D_HANDOVER_v003.webp",kicker:"المشهد 4 · الختام",title:"\u201cوإن كانت عقديات فعلاً – كيف أعرف؟\u201d",
  options:[
   {t:"راجع الطبيب عند: حمى فوق 38.5°، طبقة قيحية، تورّم شديد بجهة واحدة، صوت مكتوم أو صعوبة تنفس – وإذا لم تتحسن خلال 3-4 أيام.",p:25,tr:12,ok:true,h:"ختام مثالي",x:"معايير ملموسة قابلة للتحقق بدل طمأنة مبهمة. حصل صاحب التشخيص الذاتي على ما يحب: بيانات واضحة – الصحيحة هذه المرة."},
   {t:"ليست عقديات حتماً، انسَ الإنترنت.",p:0,tr:-8,h:"يقين زائف + هجوم مباشر",x:"لا يمكنك استبعاد العدوى البكتيرية – وأنت تهاجم بحثه بدل توجيهه."},
   {t:"إن لم تنفع الأقراص عد إليّ.",p:10,tr:-2,h:"الولاء لا يعوّض المعايير",x:"عند علامات الخطر الحقيقية (خرّاج، حمى قرمزية) الطريق إلى الطبيب مباشرة."},
   {t:"ابحث في غوغل مجدداً بعد ثلاثة أيام.",p:0,tr:-10,h:"استسلام",x:"فوّضت واجبك الاستشاري لمحرك البحث الذي سبّب المشكلة."}]}}
];
