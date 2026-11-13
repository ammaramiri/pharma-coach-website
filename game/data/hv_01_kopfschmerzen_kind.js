/* =====================================================================
   Falldaten · kopfschmerzen_kind
   Ausgelagert aus game/index.html am 12.11.2026 (Technik: Daten-Split).
   Inhalt woertlich uebernommen, nur Bildendungen .jpg/.png -> .webp.
   Geladen erst beim Start des Falls durch levelDaten(); der Stummel in
   index.html traegt nur Titel, Persona, Banner und src.
===================================================================== */
TOPICS.kopfschmerzen_kind = {
    de:"Kopfschmerzen beim Kind", en:"Headache in a child", ar:"صداع عند طفل",
    persona:"vater",
    banner:"assets/PCG_CARD_CUS001_v003.webp",
    steps:[
      { mech:"comic", data:{ kicker:"Szene 1 · Der Kunde kommt", title:"Ein Vater betritt mit seinem Sohn die Apotheke", img:"assets/PCG_SCN_CUS001_A_ENTRANCE_v003.webp", cta:"Reagieren →",
        bubbles:[ {who:"Vater",txt:"Guten Tag! Mein Sohn hat seit gestern Nachmittag Kopfschmerzen."},
                  {who:"Vater",txt:"Geben Sie mir bitte eine Packung <b>Aspirin</b> – das hilft bei mir immer!"} ] } },
      { mech:"mcq", data:{ scene:"assets/PCG_SCN_CUS001_B_COUNTER_v003.webp", kicker:"Entscheidung", title:"Aspirin für einen 8-Jährigen?", timeoutH:"Zeit abgelaufen", timeoutX:"Der Vater wird ungeduldig. Richtig wäre gewesen: erst korrigieren, dann fragen.",
        options:[
          {t:"Klar, eine Packung Aspirin. Kommt sofort.",p:0,tr:-15,h:"Gefährlicher Fehler",x:"ASS ist bei Kindern unter 12 mit fieberhaften Infekten kontraindiziert (Reye-Syndrom: seltene, lebensbedrohliche Leber- und Hirnschädigung). Rezeptfrei heißt nicht risikofrei."},
          {t:"Aspirin ist für Kinder unter 12 nicht geeignet. Darf ich Ihnen ein paar kurze Fragen stellen?",p:25,tr:10,ok:true,h:"Falle erkannt",x:"Sachliche Korrektur (Reye-Syndrom) ohne Belehrung, sofort in die strukturierte Anamnese. Genau so."},
          {t:"Nehmen Sie lieber Ibuprofen-Saft, der ist besser. Sonst noch etwas?",p:5,tr:-5,h:"Richtige Substanz, falscher Prozess",x:"Ibuprofen ist die richtige Klasse – aber eine Empfehlung ohne eine einzige Frage zum Kind ist ein Blindflug."},
          {t:"Bei Kindern gebe ich grundsätzlich nichts – gehen Sie zum Kinderarzt.",p:5,tr:-10,h:"Reflexhafte Abweisung",x:"Die meisten Kinderkopfschmerzen sind harmlos. Ihre Aufgabe ist die Unterscheidung durch Fragen."} ] } },
      { mech:"ask3", data:{ scene:"assets/PCG_SCN_CUS001_C_OTS_v003.webp", kicker:"Szene 2 · Anamnese – nur drei Fragen", title:"Der Vater hat es eilig. Sie haben Zeit für drei Fragen.",
        hint:"Noch {n} Fragen übrig. Wählen Sie die, die wirklich entscheiden.", pick:3,
        okH:"Die entscheidenden Fragen gestellt", badH:"Fragen verschenkt",
        expl:"Drei Fragen entscheiden hier alles: die Red Flags (Fieber, Erbrechen, Nackensteife, Sturz), das Körpergewicht und die Vorerkrankungen bzw. Dauermedikation. Ohne Gewicht ist bei Kindern jede Dosisangabe geraten, und ohne Red Flags weiß niemand, ob Selbstmedikation überhaupt vertretbar ist. Lieblingsgeschmack und Schulstress klingen freundlich, bringen aber keine Sicherheit.",
        questions:[
          {q:"Hat er Fieber, Erbrechen, Nackensteife – oder ist er gestürzt?",a:"Kein Fieber, gemessen. Gestürzt … doch, vorgestern beim Spielen. Und erbrochen hat heute Nacht jemand, ich glaube der Kleine.",val:25},
          {q:"Wie viel wiegt Ihr Sohn ungefähr?",a:"So etwa 30 Kilo, beim letzten Arztbesuch.",val:25},
          {q:"Allergien, Vorerkrankungen, andere Medikamente?",a:"Nichts von alledem. Er ist sonst kerngesund.",val:25},
          {q:"Seit wann genau bestehen die Schmerzen?",a:"Seit gestern Nachmittag, so gegen vier.",val:15},
          {q:"Trinkt er ausreichend und wie viel Bildschirmzeit hat er?",a:"Trinkt wenig, ehrlich gesagt. Und sitzt in den Ferien viel am Tablet.",val:15},
          {q:"Wo genau tut es weh?",a:"Vorne, sagt er. Er zeigt auf die Stirn.",val:10},
          {q:"Hat er in der Schule gerade Stress?",a:"Ferien. Also nein.",val:5},
          {q:"Welchen Geschmack mag er am liebsten?",a:"Erdbeere? Ist das wichtig?",val:0} ] } },
      { mech:"sort", data:{ scene:"assets/PCG_CU_CUS001_P05_CU-TALK_v003.webp", kicker:"Szene 3 · Red Flags sortieren", title:"Prüfen Sie jede Angabe des Vaters:",
        hint:"Antippen, dann Box wählen. Alle 6 zuordnen.", flagLabel:"Red Flag – nachfragen!", safeLabel:"Unbedenklich / erklärbar",
        okH:"Systematisch sortiert", badH:"Sortierung mit Lücken",
        expl:"Zwei echte Red Flags: nächtliches Erbrechen (Hirndruck?) und der Sturz (Trauma?). Beide MÜSSEN nachgefragt werden. Der Vater präzisiert: erbrochen hat der kleine Bruder (Magen-Darm), und beim Sturz war es das Knie, nicht der Kopf – beide lösen sich auf. Aber: Wer nicht nachfragt, weiß das nicht.",
        cards:[ {t:"Schmerzen seit gestern Nachmittag",flag:false},{t:"Kein Fieber (heute gemessen)",flag:false},
                {t:"Stundenlang am Tablet",flag:false},{t:"Hat nachts jemand erbrochen",flag:true},
                {t:"Trinkt sehr wenig",flag:false},{t:"Ist vorgestern hingefallen",flag:true} ] } },
      { mech:"shelf", data:{ kicker:"Szene 4 · Die Empfehlung", title:"30 kg, keine Red Flags, keine Allergien. Greifen Sie ins Regal:",
        boxes:[
          {n:"ASS 500",s:"Tabletten",col:"#2E7D32",p:0,tr:-15,h:"Die Falle schnappt zu",x:"ASS bleibt unter 12 kontraindiziert (Reye) – egal wie schwer das Kind ist. Stand absichtlich im Regal."},
          {n:"Ibuprofen 2%",s:"Kindersaft",col:"#1565C0",ok:true,p:20,tr:12,h:"Richtiger Griff",x:"Altersgerechte Darreichungsform, Dosierung nach Körpergewicht auf der Packung. Mit Dosierspritze abgeben und die Anwendung zeigen."},
          {n:"Sumatriptan",s:"Migräne",col:"#6A1B9A",p:0,tr:-8,h:"Nicht für Kinder",x:"Triptane sind in der Selbstmedikation für Kinder nicht zugelassen."},
          {n:"Paracetamol 1000",s:"Zäpfchen (Erw.)",col:"#E65100",p:0,tr:-8,h:"Erwachsenendosis",x:"1000 mg für 30 kg viel zu hoch. Und Zäpfchen teilen? Niemals – der Wirkstoff ist nicht homogen verteilt."},
          {n:"Halstabletten",s:"lokal",col:"#00838F",p:0,tr:-3,h:"Falsche Baustelle",x:"Bei Kopfschmerz? Der Vater schaut irritiert."},
          {n:"Vitamin C",s:"Brause",col:"#F9A825",p:0,tr:-3,h:"Keine Wirkung",x:"Keine evidenzbasierte Akuttherapie bei Kopfschmerz."} ] } },
      { mech:"truefalse", data:{ scene:"assets/PCG_CU_CUS001_P05_CU-TALK_v003.webp", kicker:"Szene 5 · Schnellrunde", title:"Der Vater fragt schnell nach. Richtig oder falsch?",
        trueLabel:"Richtig", falseLabel:"Falsch",
        okH:"Schnellrunde gemeistert", badH:"Ein paar Irrtümer",
        expl:"Die hartnäckigsten Irrtümer bei Kinderschmerzmitteln: Kinder werden nach Gewicht dosiert, nicht nach Alter; Ibuprofen wird zum oder nach dem Essen gegeben; und ein Erwachsenenzäpfchen zu teilen ist nie zulässig. Richtig sind: die Dosierung steht gewichtsbezogen auf der Packung, Ibuprofen wirkt zusätzlich entzündungshemmend, und ein Kopfschmerz, der nachts aufweckt, gehört immer abgeklärt.",
        items:[ {t:"Die Dosis für Kinder richtet sich nach dem Alter, nicht nach dem Gewicht.",ok:false,why:"Umgekehrt: das Körpergewicht ist maßgeblich. Zwei Achtjährige können 22 oder 35 kg wiegen."},
                {t:"Die gewichtsbezogene Dosierung steht auf der Packung.",ok:true,why:"Deshalb immer gemeinsam auf die Packung schauen und die Dosierspritze zeigen."},
                {t:"Ibuprofen sollte auf nüchternen Magen gegeben werden.",ok:false,why:"Zum oder nach dem Essen – das schont die Magenschleimhaut."},
                {t:"Ein Erwachsenenzäpfchen darf man halbieren, wenn man vorsichtig ist.",ok:false,why:"Niemals. Der Wirkstoff ist nicht homogen verteilt, die Dosis wird unkalkulierbar."},
                {t:"Ibuprofen wirkt zusätzlich entzündungshemmend, Paracetamol nicht.",ok:true,why:"Ein relevanter Unterschied bei der Auswahl."},
                {t:"Ein Kopfschmerz, der das Kind nachts aufweckt, ist harmlos.",ok:false,why:"Im Gegenteil: nächtliches Aufwachen ist ein Warnzeichen und gehört abgeklärt."} ] } },
      
      { mech:"mcq", data:{ scene:"assets/PCG_CU_CUS001_P04_CU-NEUTRAL_v003.webp", kicker:"Szene 7 · Abschluss", title:"„Woran erkenne ich, dass ich doch zum Arzt muss?“",
        options:[
          {t:"Sofort bei: Fieber mit Nackensteifheit, wiederholtem Erbrechen, Wesensveränderung oder nach Kopf-Sturz. Und: wenn Schmerzen nach 2-3 Tagen anhalten, stärker werden oder ihn nachts wecken.",p:25,tr:12,ok:true,h:"Perfekter Abschluss",x:"Zwei Kategorien: Notfallzeichen (sofort) und Verlaufszeichen (2-3 Tage). Nächtliches Aufwachen ist das oft vergessene Warnsignal beim Kind."},
          {t:"Wenn's schlimmer wird, gehen Sie halt zum Arzt.",p:5,tr:-4,h:"Zu vage",x:"Was heißt „schlimmer“ für einen Laien? Ohne Kriterien pendelt der Vater zwischen Panik und Verharmlosung."},
          {t:"Nicht nötig – die Anamnese war ja unauffällig.",p:0,tr:-8,h:"Falsche Sicherheit",x:"Eine Momentaufnahme ist keine Garantie. Kinderzustände ändern sich schnell."},
          {t:"Kommen Sie in 2-3 Tagen einfach nochmal bei mir vorbei.",p:10,tr:-2,h:"Bindung ersetzt keine Kriterien",x:"Bei echten Warnzeichen führt der Weg nicht über die Offizin, sondern direkt zum Arzt."} ] } }
    ],
    badges:[
      {icon:"🕵️",de:"Fallen-Detektor",en:"Trap Detector",ar:"كاشف الفخاخ",cond:function(s){return s.step1>=25;}},
      {icon:"🎯",de:"Fragen-Profi",en:"Question Pro",ar:"خبير الأسئلة",cond:function(s){return s.step2>=60;}},
      {icon:"🚩",de:"Red-Flag-Scanner",en:"Red-Flag Scanner",ar:"ماسح العلامات",cond:function(s){return s.step3>=25;}},
      {icon:"🤝",de:"Vertrauensperson",en:"Trusted Advisor",ar:"موضع الثقة",cond:function(s){return s.trust>=70;}}
    ]
  };

TOPICS.kopfschmerzen_kind.steps_en=[
 {mech:"comic",data:{kicker:"Scene 1 · The customer arrives",title:"A father enters the pharmacy with his son",img:"assets/PCG_SCN_CUS001_A_ENTRANCE_v003.webp",cta:"React →",
  bubbles:[{who:"Father",txt:"Hello! My son has had a headache since yesterday."},{who:"Father",txt:"Please give me a pack of <b>aspirin</b> - it always works for me!"}]}},
 {mech:"mcq",data:{scene:"assets/PCG_SCN_CUS001_B_COUNTER_v003.webp",kicker:"Decision",title:"Aspirin for an 8-year-old?",timeoutH:"Time's up",timeoutX:"The father grows impatient. The right move: correct first, then ask.",
  options:[
   {t:"Sure, one pack of aspirin. Right away.",p:0,tr:-15,h:"Dangerous mistake",x:"ASA is contraindicated in children under 12 with febrile infections (Reye's syndrome: rare, life-threatening liver and brain damage). Over-the-counter does not mean risk-free."},
   {t:"Aspirin isn't suitable for children under 12. May I ask you a few quick questions?",p:25,tr:10,ok:true,h:"Trap spotted",x:"Factual correction (Reye's syndrome) without lecturing, straight into a structured history. Exactly right."},
   {t:"Take ibuprofen syrup instead, it's better. Anything else?",p:5,tr:-5,h:"Right substance, wrong process",x:"Ibuprofen is the right class - but recommending for a child without a single question is flying blind."},
   {t:"I never give children anything - go to the pediatrician.",p:5,tr:-10,h:"Reflex refusal",x:"Most childhood headaches are harmless. Your job is to differentiate by asking."}]}},
 {mech:"ask3",data:{scene:"assets/PCG_SCN_CUS001_C_OTS_v003.webp",kicker:"Scene 2 · History - three questions only",title:"The father is in a hurry. You have time for three questions.",
  hint:"{n} questions left. Choose the ones that really decide.",pick:3,
  okH:"The decisive questions asked",badH:"Questions wasted",
  expl:"Three questions decide everything here: the red flags (fever, vomiting, neck stiffness, a fall), the body weight, and pre-existing conditions or medication. Without the weight every paediatric dose is a guess, and without red flags nobody knows whether self-medication is acceptable at all. Favourite flavour and school stress sound friendly but provide no safety.",
  questions:[
   {q:"Does he have fever, vomiting, neck stiffness - or has he fallen?",a:"No fever, I measured. Fallen … yes, two days ago while playing. And someone vomited last night, I think the little one.",val:25},
   {q:"How much does your son weigh, roughly?",a:"About 30 kilos, at the last check-up.",val:25},
   {q:"Any allergies, conditions or other medicines?",a:"None of that. He's otherwise perfectly healthy.",val:25},
   {q:"When exactly did the pain start?",a:"Yesterday afternoon, around four.",val:15},
   {q:"Is he drinking enough and how much screen time does he get?",a:"Drinks little, honestly. And sits at the tablet a lot during the holidays.",val:15},
   {q:"Where exactly does it hurt?",a:"At the front, he says. He points at his forehead.",val:10},
   {q:"Is he under stress at school right now?",a:"It's the holidays. So no.",val:5},
   {q:"Which flavour does he like best?",a:"Strawberry? Does that matter?",val:0}]}},
 {mech:"sort",data:{scene:"assets/PCG_CU_CUS001_P05_CU-TALK_v003.webp",kicker:"Scene 3 · Sorting the red flags",title:"Check each thing the father told you:",
  hint:"Tap a card, then the matching box. Sort all 6.",flagLabel:"Red flag - follow up!",safeLabel:"Harmless / explainable",
  okH:"Sorted systematically",badH:"Gaps in your triage",
  expl:"Two real red flags: night-time vomiting (raised pressure?) and the fall (trauma?). Both MUST be followed up. The father clarifies: the LITTLE brother vomited (stomach bug), and the fall hit the knee, not the head - both resolve. But: those who don't follow up never know.",
  cards:[{t:"Pain since yesterday afternoon",flag:false},{t:"No fever (measured today)",flag:false},{t:"Hours on the tablet every day",flag:false},{t:"Someone vomited during the night",flag:true},{t:"Drinks very little",flag:false},{t:"Fell over two days ago",flag:true}]}},
 {mech:"shelf",data:{kicker:"Scene 4 · The recommendation",title:"30 kg, no red flags, no allergies. Reach for the shelf:",
  boxes:[
   {n:"ASA 500",s:"tablets",col:"#2E7D32",p:0,tr:-15,h:"The trap snaps shut",x:"ASA stays contraindicated under 12 (Reye) - regardless of weight. It was on the shelf on purpose."},
   {n:"Ibuprofen 2%",s:"children's syrup",col:"#1565C0",ok:true,p:20,tr:12,h:"Right pick",x:"Age-appropriate form, weight-based dosing printed on the pack. Dispense with the dosing syringe and demonstrate its use."},
   {n:"Sumatriptan",s:"migraine",col:"#6A1B9A",p:0,tr:-8,h:"Not for children",x:"Triptans are not approved for pediatric self-medication."},
   {n:"Paracetamol 1000",s:"suppository (adult)",col:"#E65100",p:0,tr:-8,h:"Adult dose",x:"1000 mg is far too much for 30 kg. And splitting suppositories? Never - the active substance is not evenly distributed."},
   {n:"Throat lozenges",s:"local",col:"#00838F",p:0,tr:-3,h:"Wrong problem",x:"For a headache? The father looks puzzled."},
   {n:"Vitamin C",s:"effervescent",col:"#F9A825",p:0,tr:-3,h:"No effect",x:"No evidence-based acute therapy for headache."}]}},
 {mech:"truefalse",data:{scene:"assets/PCG_CU_CUS001_P05_CU-TALK_v003.webp",kicker:"Scene 5 · Rapid round",title:"The father fires off some questions. True or false?",
  trueLabel:"True",falseLabel:"False",
  okH:"Rapid round mastered",badH:"A few misconceptions",
  expl:"The most persistent misconceptions about children's analgesics: children are dosed by weight, not age; ibuprofen is given with or after food; and splitting an adult suppository is never permissible. Correct: the weight-based dosing is printed on the pack, ibuprofen is additionally anti-inflammatory, and a headache that wakes a child at night always needs assessment.",
  items:[{t:"The dose for children is based on age, not weight.",ok:false,why:"The other way round: body weight is what counts. Two eight-year-olds can weigh 22 or 35 kg."},
   {t:"The weight-based dosing is printed on the pack.",ok:true,why:"So always look at the pack together and show the dosing syringe."},
   {t:"Ibuprofen should be given on an empty stomach.",ok:false,why:"With or after food - that protects the gastric mucosa."},
   {t:"An adult suppository may be halved if you are careful.",ok:false,why:"Never. The active substance is not evenly distributed, the dose becomes incalculable."},
   {t:"Ibuprofen is additionally anti-inflammatory, paracetamol is not.",ok:true,why:"A relevant difference when choosing."},
   {t:"A headache that wakes the child at night is harmless.",ok:false,why:"On the contrary: waking at night is a warning sign and needs assessment."}]}},
 
 {mech:"mcq",data:{scene:"assets/PCG_CU_CUS001_P04_CU-NEUTRAL_v003.webp",kicker:"Scene 7 · Closing",title:"\u201cHow do I know we DO need a doctor?\u201d",
  options:[
   {t:"Immediately for: fever with neck stiffness, repeated vomiting, altered behaviour, or after a head injury. And: if pain persists past 2-3 days, worsens, or wakes him at night.",p:25,tr:12,ok:true,h:"Perfect closing",x:"Two categories: emergency signs (now) and course signs (2-3 days). Night waking is the often-forgotten warning sign in children."},
   {t:"If it gets worse, just see a doctor.",p:5,tr:-4,h:"Too vague",x:"What does 'worse' mean to a layperson? Without criteria he swings between panic and dismissal."},
   {t:"No need - the history was unremarkable.",p:0,tr:-8,h:"False reassurance",x:"A snapshot is no guarantee. Children change fast."},
   {t:"Just come back to me in 2-3 days.",p:10,tr:-2,h:"Loyalty is no substitute for criteria",x:"With true warning signs the path leads to the doctor, not through the pharmacy."}]}}
];

TOPICS.kopfschmerzen_kind.steps_ar=[
 {mech:"comic",data:{kicker:"المشهد 1 · وصول الزبون",title:"أب يدخل الصيدلية مع ابنه",img:"assets/PCG_SCN_CUS001_A_ENTRANCE_v003.webp",cta:"تصرّف ←",
  bubbles:[{who:"الأب",txt:"مرحباً! ابني يعاني من صداع منذ الأمس."},{who:"الأب",txt:"أعطني من فضلك علبة <b>أسبرين</b> – دائماً ينفع معي!"}]}},
 {mech:"mcq",data:{scene:"assets/PCG_SCN_CUS001_B_COUNTER_v003.webp",kicker:"قرار",title:"أسبرين لطفل عمره 8 سنوات؟",timeoutH:"انتهى الوقت",timeoutX:"نفد صبر الأب. الصحيح كان: صحّح أولاً ثم اسأل.",
  options:[
   {t:"طبعاً، علبة أسبرين. حالاً.",p:0,tr:-15,h:"خطأ خطير",x:"الأسبرين ممنوع لمن هم دون 12 سنة مع العدوى الحُمّية (متلازمة راي: تلف نادر مهدد للحياة في الكبد والدماغ). بدون وصفة لا يعني بدون خطر."},
   {t:"الأسبرين غير مناسب للأطفال دون 12 سنة. هل تسمح لي بأسئلة سريعة؟",p:25,tr:10,ok:true,h:"اكتشفت الفخ",x:"تصحيح علمي (متلازمة راي) بلا استعلاء، ثم مباشرة إلى الأنامنيزه المنظمة. هكذا بالضبط."},
   {t:"خذ شراب إيبوبروفين بدلاً منه، أفضل للأطفال. شيء آخر؟",p:5,tr:-5,h:"مادة صحيحة، مسار خاطئ",x:"الإيبوبروفين هو الفئة الصحيحة – لكن التوصية لطفل دون سؤال واحد طيران أعمى."},
   {t:"لا أعطي الأطفال شيئاً مطلقاً – اذهبوا لطبيب الأطفال.",p:5,tr:-10,h:"رفض انعكاسي",x:"معظم صداع الأطفال حميد. مهمتك التمييز عبر الأسئلة."}]}},
 {mech:"ask3",data:{scene:"assets/PCG_SCN_CUS001_C_OTS_v003.webp",kicker:"المشهد 2 · الأنامنيزه – ثلاثة أسئلة فقط",title:"الأب مستعجل. لديك وقت لثلاثة أسئلة.",
  hint:"بقي {n} من الأسئلة. اختر ما يحسم فعلاً.",pick:3,
  okH:"طرحت الأسئلة الحاسمة",badH:"أهدرت أسئلتك",
  expl:"ثلاثة أسئلة تحسم كل شيء هنا: العلامات الحمراء (حمى، قيء، تيبّس رقبة، سقوط)، ووزن الجسم، والأمراض المزمنة أو الأدوية. فبلا وزن تصبح كل جرعة طفل تخميناً، وبلا العلامات الحمراء لا يعرف أحد إن كان العلاج الذاتي مقبولاً أصلاً. أما النكهة المفضلة وضغط المدرسة فتبدو ودودة لكنها لا تقدم أماناً.",
  questions:[
   {q:"هل عنده حمى أو قيء أو تيبّس في الرقبة – أم سقط؟",a:"لا حمى، قِستُها. سقط … نعم، قبل يومين أثناء اللعب. وتقيأ أحدهم ليلاً، أظنه الصغير.",val:25},
   {q:"كم يزن ابنك تقريباً؟",a:"نحو 30 كيلوغراماً في آخر زيارة للطبيب.",val:25},
   {q:"هل لديه حساسية أو أمراض أو أدوية أخرى؟",a:"لا شيء من ذلك. هو سليم تماماً عدا هذا.",val:25},
   {q:"متى بدأ الألم بالضبط؟",a:"عصر الأمس، نحو الرابعة.",val:15},
   {q:"هل يشرب كفايته وكم وقت الشاشة عنده؟",a:"يشرب قليلاً بصراحة. ويجلس كثيراً على التابلت في العطلة.",val:15},
   {q:"أين يؤلمه بالضبط؟",a:"في المقدمة كما يقول. يشير إلى جبهته.",val:10},
   {q:"هل يعاني ضغطاً في المدرسة؟",a:"إنها العطلة. إذن لا.",val:5},
   {q:"أي نكهة يحب أكثر؟",a:"فراولة؟ وهل هذا مهم؟",val:0}]}},
 {mech:"sort",data:{scene:"assets/PCG_CU_CUS001_P05_CU-TALK_v003.webp",kicker:"المشهد 3 · فرز العلامات الحمراء",title:"افحص كل ما ذكره الأب:",
  hint:"انقر البطاقة ثم الصندوق المناسب. صنّف الست جميعاً.",flagLabel:"علامة حمراء – استوضح!",safeLabel:"غير مقلق / مفسَّر",
  okH:"تصنيف منهجي",badH:"ثغرات في الفرز",
  expl:"علامتان حقيقيتان: التقيؤ الليلي (ضغط دماغي؟) والسقوط (رضّ؟). ويجب الاستيضاح عنهما. يوضح الأب: الذي تقيأ هو الأخ الأصغر (نزلة معوية)، والسقوط كان على الركبة لا الرأس – فتنحلّ العلامتان. لكن: من لا يستوضح لا يعرف.",
  cards:[{t:"ألم منذ عصر الأمس",flag:false},{t:"لا حمى (مقاسة اليوم)",flag:false},{t:"ساعات يومياً على التابلت",flag:false},{t:"تقيأ أحدهم ليلاً",flag:true},{t:"يشرب قليلاً جداً",flag:false},{t:"سقط قبل يومين",flag:true}]}},
 {mech:"shelf",data:{kicker:"المشهد 4 · التوصية",title:"30 كغ، لا علامات حمراء، لا حساسية. مدّ يدك إلى الرف:",
  boxes:[
   {n:"أسبرين 500",s:"أقراص",col:"#2E7D32",p:0,tr:-15,h:"انغلق الفخ",x:"الأسبرين يبقى ممنوعاً دون 12 سنة (راي) – مهما كان الوزن. وُضع على الرف عمداً."},
   {n:"إيبوبروفين 2%",s:"شراب أطفال",col:"#1565C0",ok:true,p:20,tr:12,h:"الاختيار الصحيح",x:"شكل مناسب للعمر، والجرعة بحسب الوزن مكتوبة على العلبة. يُصرف مع محقنة المعايرة مع شرح طريقة الاستعمال."},
   {n:"سوماتريبتان",s:"شقيقة",col:"#6A1B9A",p:0,tr:-8,h:"ليس للأطفال",x:"التريبتانات غير مرخصة للعلاج الذاتي عند الأطفال."},
   {n:"باراسيتامول 1000",s:"تحميلة (بالغين)",col:"#E65100",p:0,tr:-8,h:"جرعة بالغين",x:"1000 ملغ كثيرة جداً لوزن 30 كغ. وتقسيم التحاميل؟ أبداً – فالمادة الفعالة غير موزّعة بانتظام."},
   {n:"أقراص مص للحلق",s:"موضعي",col:"#00838F",p:0,tr:-3,h:"مشكلة أخرى",x:"للصداع؟ الأب ينظر مستغرباً."},
   {n:"فيتامين C",s:"فوّار",col:"#F9A825",p:0,tr:-3,h:"بلا تأثير",x:"لا علاج حاد مبني على الدليل للصداع."}]}},
 {mech:"truefalse",data:{scene:"assets/PCG_CU_CUS001_P05_CU-TALK_v003.webp",kicker:"المشهد 5 · جولة سريعة",title:"الأب يسأل بسرعة. صح أم خطأ؟",
  trueLabel:"صح",falseLabel:"خطأ",
  okH:"أتقنت الجولة السريعة",badH:"بعض المفاهيم الخاطئة",
  expl:"أعند المفاهيم الخاطئة في مسكنات الأطفال: الجرعة بالوزن لا بالعمر؛ والإيبوبروفين يُعطى مع الطعام أو بعده؛ وتقسيم تحميلة البالغين غير جائز أبداً. والصحيح: الجرعة الوزنية مكتوبة على العلبة، والإيبوبروفين مضاد التهاب إضافةً للتسكين، والصداع الذي يوقظ الطفل ليلاً يستوجب التقييم دائماً.",
  items:[{t:"جرعة الأطفال تُحدَّد بالعمر لا بالوزن.",ok:false,why:"العكس: الوزن هو المعيار. فطفلان في الثامنة قد يزن أحدهما 22 والآخر 35 كغ."},
   {t:"الجرعة بحسب الوزن مكتوبة على العلبة.",ok:true,why:"ولذلك انظرا معاً إلى العلبة وأرِه محقنة المعايرة."},
   {t:"يُفضَّل إعطاء الإيبوبروفين على معدة فارغة.",ok:false,why:"بل مع الطعام أو بعده – فذلك يحمي مخاطية المعدة."},
   {t:"يجوز تنصيف تحميلة البالغين بحذر.",ok:false,why:"أبداً. المادة غير موزّعة بانتظام فتصبح الجرعة غير محسوبة."},
   {t:"الإيبوبروفين مضاد التهاب أيضاً بخلاف الباراسيتامول.",ok:true,why:"فرق مهم عند الاختيار."},
   {t:"الصداع الذي يوقظ الطفل ليلاً أمر حميد.",ok:false,why:"بالعكس: الاستيقاظ الليلي علامة إنذار تستوجب التقييم."}]}},
 
 {mech:"mcq",data:{scene:"assets/PCG_CU_CUS001_P04_CU-NEUTRAL_v003.webp",kicker:"المشهد 7 · الختام",title:"\u201cمتى أعرف أن علينا مراجعة الطبيب؟\u201d",
  options:[
   {t:"فوراً عند: حمى مع تيبّس الرقبة، تقيؤ متكرر، تغيّر في الوعي أو السلوك، أو بعد إصابة في الرأس. وأيضاً: إذا استمر الألم بعد 2-3 أيام أو اشتد أو أيقظه ليلاً.",p:25,tr:12,ok:true,h:"ختام مثالي",x:"فئتان: علامات طارئة (فوراً) وعلامات المسار (2-3 أيام). والاستيقاظ الليلي من الصداع هو العلامة المنسية عند الأطفال."},
   {t:"إذا ساءت الحالة راجعوا الطبيب.",p:5,tr:-4,h:"مبهم جداً",x:"ماذا تعني «ساءت» لغير المختص؟ بلا معايير يتأرجح بين الهلع والاستهانة."},
   {t:"لا داعي – الأنامنيزه كانت سليمة.",p:0,tr:-8,h:"طمأنة زائفة",x:"اللقطة الواحدة ليست ضماناً. حالات الأطفال تتغير بسرعة."},
   {t:"عودوا إليّ بعد 2-3 أيام فقط.",p:10,tr:-2,h:"الولاء لا يعوّض المعايير",x:"عند علامات الخطر الحقيقية الطريق إلى الطبيب مباشرة لا عبر الصيدلية."}]}}
];
