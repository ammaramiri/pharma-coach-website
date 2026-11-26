/* Pharma-Coach · Küche · Teamgespräch 03 · "Der Unersetzliche"
   Konzept freigegeben von Ammar am 21.11.2026. Nur Daten, keine Logik.
   Bildpfade relativ zu game/. Punkte: gruen 10 · gelb 5 · rot 0. Maximal 170.
   Neue Schritt-Typen gegenüber team_01: "evidence" und "board" sowie "timeskip".
   Logik und Auswertung: siehe TEAM03_Technik_v001.md. */
window.PC_TEAM = window.PC_TEAM || {};
window.PC_TEAM["team_03"] = {
  id: "team_03",
  card: "assets/Team/PCG_CARD_TEAM03_v001.webp",
  title: { de: "Der Unersetzliche", en: "The man who never says no", ar: "الرجل الذي لا يقول لا" },
  maxPoints: 170,

  intro: {
    img: "assets/Team/PCG_SCN_TEAM03_A_EMRE_ANGEBOT_v001.webp",
    text: {
      de: "Ich bin Filialleiter dieser Apotheke. Wer im Team was trägt, entscheide ich.\n\nDonnerstag, 17:10 Uhr. Ich komme in die Küche. Emre sitzt allein am Tisch, sein Kaffee ist kalt, das Handy liegt vor ihm. Er schaut auf.\nEmre: „Hast du kurz Zeit? Ich habe ein Angebot von einer anderen Apotheke.“",
      en: "I am the branch manager (Filialleiter) of this pharmacy. Who carries what in the team is my decision.\n\nThursday, 5:10 p.m. I walk into the kitchen. Emre is sitting alone at the table, his coffee has gone cold, his phone lies in front of him. He looks up.\nEmre: \"Have you got a minute? I've had an offer from another pharmacy.\"",
      ar: "أنا مدير هذا الفرع (Filialleiter). من يحمل ماذا في الفريق، قراري أنا.\n\nالخميس، 17:10. أدخل المطبخ. أمره جالس وحده إلى الطاولة، قهوته باردة، وهاتفه أمامه. يرفع رأسه.\nأمره: «عندك دقيقة؟ جاءني عرض من صيدلية أخرى.»"
    }
  },

  steps: [
    /* ---------- Teil 1 · Emre · Gesicht reagiert ---------- */
    {
      id: "emre", type: "dialog",
      faces: {
        erschoepft:  "assets/Team/PCG_CU_TEAM03_EMRE_ERSCHOEPFT_v001.webp",
        zu:          "assets/Team/PCG_CU_TEAM03_EMRE_ZU_v001.webp",
        offen:       "assets/Team/PCG_CU_TEAM03_EMRE_OFFEN_v001.webp",
        erleichtert: "assets/Team/PCG_CU_TEAM03_EMRE_ERLEICHTERT_v001.webp"
      },
      startFace: "erschoepft",
      opening: {
        de: "Ich setze mich ihm gegenüber. Er reibt sich den Nacken und wartet, was ich sage.",
        en: "I sit down opposite him. He rubs his neck and waits for what I'll say.",
        ar: "أجلس قبالته. يفرك رقبته وينتظر ما سأقوله."
      },
      rounds: [
        { options: [
          { id: "a", grade: "green", points: 10, face: "offen",
            line:  { de: "„Bevor wir über das Angebot reden: Ich will verstehen, was dich dahin gebracht hat.“", en: "\"Before we talk about the offer: I want to understand what brought you to this point.\"", ar: "«قبل أن نتكلم عن العرض: أريد أن أفهم ما الذي أوصلك إلى هنا.»" },
            reply: { de: "Er atmet aus. „Seit Monaten bin ich der Einzige für die Rezeptur und das QMS. Dazu die Touren, die Notdienst-Tausche, die Retax-Einsprüche. Freitags gehe ich um halb acht. Niemand fragt.“", en: "He breathes out. \"For months I've been the only one doing compounding and the QMS. Plus the delivery routes, the on-call swaps, the retax appeals. On Fridays I leave at half past seven. Nobody asks.\"", ar: "يزفر. «منذ أشهر وأنا الوحيد في مكان التحضير (Rezeptur) ونظام إدارة الجودة (QMS). وفوقها جولات التوصيل، وتبديلات المناوبة، واعتراضات الـRetax. أيام الجمعة أخرج في السابعة والنصف. ولا أحد يسأل.»" } },
          { id: "b", grade: "red", points: 0, face: "zu",
            line:  { de: "„Wie viel bieten sie dir?“", en: "\"How much are they offering you?\"", ar: "«كم يعطونك؟»" },
            reply: { de: "„Darum geht es nicht.“ Er verschränkt die Arme. Über das Gehalt entscheidet ohnehin der Inhaber, nicht ich, und das weiß er.", en: "\"That's not the point.\" He crosses his arms. Pay is decided by the owner anyway, not by me, and he knows it.", ar: "«ليس هذا الموضوع.» يعقد ذراعيه. ثم إن الراتب يقرره المالك لا أنا، وهو يعرف ذلك." } },
          { id: "c", grade: "yellow", points: 5, face: "zu",
            line:  { de: "„Du kannst uns jetzt nicht hängen lassen, ohne dich läuft hier nichts.“", en: "\"You can't let us down now, nothing works here without you.\"", ar: "«لا تستطيع أن تتركنا الآن، بدونك لا يمشي شيء هنا.»" },
            reply: { de: "„Genau das ist das Problem.“", en: "\"That's exactly the problem.\"", ar: "«هذه بالضبط هي المشكلة.»" } }
        ]},
        { options: [
          { id: "a", grade: "green", points: 10, face: "erleichtert",
            line:  { de: "„Du hast recht, und das ist mein Fehler, nicht deiner. Ich habe es zugelassen. Gib mir eine Woche: Ich verteile neu, und dann entscheidest du.“", en: "\"You're right, and that's my mistake, not yours. I allowed it. Give me a week: I'll redistribute the work, and then you decide.\"", ar: "«معك حق، وهذا خطئي لا خطؤك. أنا سمحت به. أعطني أسبوعاً: أعيد التوزيع، ثم تقرر أنت.»" },
            reply: { de: "„Eine Woche. Okay.“ Zum ersten Mal lehnt er sich zurück.", en: "\"A week. Okay.\" For the first time he leans back.", ar: "«أسبوع. حسناً.» لأول مرة يسند ظهره." } },
          { id: "b", grade: "yellow", points: 5, face: "zu",
            line:  { de: "„Warum hast du nie Nein gesagt?“", en: "\"Why did you never say no?\"", ar: "«لماذا لم تقل لا ولو مرة؟»" },
            reply: { de: "„Weil sonst niemand da war. Jetzt bin ich schuld?“", en: "\"Because there was nobody else. So now it's my fault?\"", ar: "«لأنه لم يكن هناك أحد غيري. والآن صار الذنب ذنبي؟»" } },
          { id: "c", grade: "red", points: 0, face: "zu",
            line:  { de: "„So ist Apotheke eben, das geht allen so.“", en: "\"That's just pharmacy, it's the same for everyone.\"", ar: "«هكذا هي الصيدلية، الكل هكذا.»" },
            reply: { de: "Er nickt langsam und schaut wieder auf sein Handy.", en: "He nods slowly and looks back down at his phone.", ar: "يومئ ببطء، ويعود ينظر إلى هاتفه." } }
        ]}
      ]
    },

    /* ---------- Teil 2 · Belege · zwei von vier antippen ---------- */
    {
      id: "belege", type: "evidence", pick: 2,
      text: {
        de: "Am Abend gehe ich die Unterlagen durch. Welche zwei Befunde verletzen ein Gesetz, für das ich als Filialleiter geradestehe?",
        en: "In the evening I go through the records. Which two findings break a law that I, as branch manager, am answerable for?",
        ar: "في المساء أراجع الأوراق. أيّ دليلين يخالفان قانوناً أنا كمدير فرع مسؤول عنه؟"
      },
      items: [
        { id: 1, good: true, points: 10,
          img: "assets/Team/PCG_CU_TEAM03_B_ZEITERFASSUNG_v001.webp",
          overlay: "zeiterfassung",
          label: { de: "Zeiterfassung der letzten vier Wochen", en: "Time records for the last four weeks", ar: "تسجيل الوقت للأسابيع الأربعة الأخيرة" },
          why: { de: "Zweimal 10,5 Stunden an einem Freitag. Über zehn Stunden pro Werktag ist auch mit Ausgleich nicht erlaubt (§ 3 ArbZG). Und die Stunden über acht muss der Arbeitgeber aufzeichnen (§ 16 Abs. 2 ArbZG).", en: "Twice 10.5 hours on a Friday. More than ten hours per working day is not allowed even with compensation (§ 3 ArbZG). And the employer must record the hours above eight (§ 16(2) ArbZG).", ar: "مرتين 10,5 ساعة في يوم جمعة. أكثر من عشر ساعات في يوم العمل غير مسموح حتى مع التعويض (§ 3 ArbZG). والساعات فوق الثماني يجب على صاحب العمل تسجيلها (§ 16 Abs. 2 ArbZG)." } },
        { id: 2, good: true, points: 10,
          img: "assets/Team/PCG_SCN_TEAM03_C_EMRE_STEHEND_v001.webp",
          label: { de: "Mittagspause im Stehen an der Rezeptur", en: "Lunch break standing at the compounding bench", ar: "استراحة الغداء واقفاً عند طاولة مكان التحضير" },
          why: { de: "Essen und gleichzeitig dokumentieren ist keine Pause. Ab mehr als sechs Stunden Arbeit sind mindestens 30 Minuten im Voraus feststehende Ruhepause Pflicht (§ 4 ArbZG).", en: "Eating while documenting is not a break. Above six hours of work, at least 30 minutes of rest break fixed in advance are mandatory (§ 4 ArbZG).", ar: "الأكل مع التوثيق في الوقت نفسه ليس استراحة. فوق ست ساعات عمل، استراحة لا تقل عن 30 دقيقة محددة مسبقاً إلزامية (§ 4 ArbZG)." } },
        { id: 3, good: false, points: 5,
          img: "assets/Team/PCG_SCN_TEAM03_D_EMRE_ABEND_v001.webp",
          label: { de: "Emre abends allein in der Rezeptur", en: "Emre alone in the compounding room in the evening", ar: "أمره وحده في مكان التحضير مساءً" },
          why: { de: "Ein Alarmzeichen, aber für sich allein kein Gesetzesverstoß. Der Verstoß steckt in den Stunden, die dieser Abend auf der Zeiterfassung ergibt.", en: "A warning sign, but not a breach of law on its own. The breach lies in the hours this evening adds to the time records.", ar: "علامة إنذار، لكنها وحدها ليست مخالفة قانونية. المخالفة في الساعات التي يضيفها هذا المساء إلى سجل الوقت." } },
        { id: 4, good: false, points: 0,
          label: { de: "Emres Bestellfehler von letzter Woche", en: "Emre's ordering mistake last week", ar: "خطأ أمره في طلبية الأسبوع الماضي" },
          why: { de: "Kein Gesetzesverstoß, und vor allem keine Ursache: Der Fehler ist die Folge der Überlastung. Wer ihn als Beleg gegen Emre nimmt, dreht Ursache und Wirkung um.", en: "Not a breach of law, and above all not a cause: the mistake is a result of the overload. Using it as evidence against Emre turns cause and effect upside down.", ar: "ليس مخالفة قانونية، والأهم أنه ليس سبباً: الخطأ نتيجة العبء. من يعدّه دليلاً ضد أمره يقلب السبب والنتيجة." } }
      ],
      overlays: {
        zeiterfassung: {
          weeks: ["KW 44", "KW 45", "KW 46", "KW 47"],
          days: { de: ["Mo", "Di", "Mi", "Do", "Fr", "Sa"], en: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], ar: ["الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"] },
          hours: [
            ["9,0", "8,5", "–",   "9,0", "9,5",  "5,0"],
            ["9,0", "9,0", "8,5", "–",   "10,5", "5,0"],
            ["8,5", "9,5", "9,0", "9,0", "9,5",  "–"  ],
            ["9,0", "9,0", "–",   "9,5", "10,5", "5,0"]
          ],
          highlight: [[1, 4], [3, 4]]
        }
      }
    },

    /* ---------- Teil 3 · Karim ---------- */
    {
      id: "karim", type: "dialog",
      faces: {
        gekraenkt:    "assets/Team/PCG_CU_TEAM03_KARIM_GEKRAENKT_v001.webp",
        nachdenklich: "assets/Team/PCG_CU_TEAM03_KARIM_NACHDENKLICH_v001.webp"
      },
      startFace: "gekraenkt",
      opening: {
        de: "Am nächsten Morgen bitte ich Karim in die Küche. Er ahnt, worum es geht.\nKarim: „Du willst mir also noch Arbeit geben. Meine Jahre in der Rezeptur habe ich hinter mir.“",
        en: "The next morning I ask Karim into the kitchen. He suspects what this is about.\nKarim: \"So you want to give me more work. I've done my years in compounding.\"",
        ar: "في صباح اليوم التالي أطلب كريم إلى المطبخ. يحدس ما الموضوع.\nكريم: «تريد إذن أن تحمّلني عملاً إضافياً. سنواتي في مكان التحضير انتهت.»"
      },
      rounds: [
        { options: [
          { id: "a", grade: "green", points: 10, face: "nachdenklich",
            line:  { de: "„Keine Zusatzarbeit. Ich brauche deine Erfahrung: Außer Emre kennt niemand die Rezeptur so wie du. Bring sie Michael bei.“", en: "\"Not extra work. I need your experience: apart from Emre, nobody knows compounding like you. Teach it to Michael.\"", ar: "«ليس عملاً إضافياً. أحتاج خبرتك: غير أمره لا أحد يعرف مكان التحضير مثلك. علّمه لميشائيل.»" },
            reply: { de: "„Michael beibringen …“ Er reibt sich das Kinn. „Das ist etwas anderes.“", en: "\"Teach Michael ...\" He rubs his chin. \"That's something else.\"", ar: "«أعلّم ميشائيل...» يفرك ذقنه. «هذا شيء آخر.»" } },
          { id: "b", grade: "red", points: 0, face: "gekraenkt",
            line:  { de: "„Jeder muss mitziehen, auch du.“", en: "\"Everyone has to pull their weight, you too.\"", ar: "«الكل يجب أن يشارك، وأنت أيضاً.»" },
            reply: { de: "„Ich ziehe seit sechsundzwanzig Jahren mit.“ Er steht auf.", en: "\"I've been pulling my weight for twenty-six years.\" He stands up.", ar: "«أنا أشارك منذ ست وعشرين سنة.» ويقوم." } },
          { id: "c", grade: "yellow", points: 5, face: "gekraenkt",
            line:  { de: "„Dann übernimm wenigstens die Retax-Einsprüche.“", en: "\"Then at least take over the retax appeals.\"", ar: "«إذن خذ على الأقل اعتراضات الـRetax.»" },
            reply: { de: "„Den Papierkram, den keiner will. Danke.“", en: "\"The paperwork nobody wants. Thanks.\"", ar: "«الأوراق التي لا يريدها أحد. شكراً.»" } }
        ]},
        { options: [
          { id: "a", grade: "green", points: 10, face: "nachdenklich",
            line:  { de: "„Wenn Michael Fehler macht, siehst du sie, bevor ein Patient sie sieht. Genau deshalb du.“", en: "\"If Michael makes mistakes, you'll see them before a patient does. That's exactly why it's you.\"", ar: "«إن أخطأ ميشائيل، تراها أنت قبل أن يراها مريض. لهذا بالذات أنت.»" },
            reply: { de: "„Gut. Aber in meinem Tempo, nicht im Tempo vom Freitag.“ Er lächelt fast.", en: "\"Fine. But at my pace, not at Friday pace.\" He almost smiles.", ar: "«حسناً. لكن على مهلي، لا على إيقاع يوم الجمعة.» يكاد يبتسم." } },
          { id: "b", grade: "yellow", points: 5, face: "nachdenklich",
            line:  { de: "„Er macht schon keine, er ist schnell.“", en: "\"He won't make any, he's quick.\"", ar: "«لن يخطئ، هو سريع.»" },
            reply: { de: "„Schnell ist nicht das Wort, das ich in der Rezeptur hören will.“", en: "\"Quick isn't the word I want to hear in compounding.\"", ar: "«سريع ليست الكلمة التي أريد سماعها في مكان التحضير.»" } },
          { id: "c", grade: "red", points: 0, face: "gekraenkt",
            line:  { de: "„Dann ist das seine Verantwortung, nicht deine.“", en: "\"Then that's his responsibility, not yours.\"", ar: "«إذن هي مسؤوليته لا مسؤوليتك.»" },
            reply: { de: "„Dann brauchst du mich ja nicht.“", en: "\"Then you don't need me.\"", ar: "«إذن لا تحتاجني.»" } }
        ]}
      ]
    },

    /* ---------- Teil 4 · Michael ---------- */
    {
      id: "michael", type: "dialog",
      faces: {
        begeistert:   "assets/Team/PCG_CU_TEAM03_MICHAEL_BEGEISTERT_v001.webp",
        ueberfordert: "assets/Team/PCG_CU_TEAM03_MICHAEL_UEBERFORDERT_v001.webp",
        gekraenkt:    "assets/Team/PCG_CU_TEAM01_MICHAEL_GEKRAENKT_v001.webp"
      },
      startFace: "begeistert",
      opening: {
        de: "Danach Michael. Er hat schon gehört, dass sich etwas ändert.\nMichael: „Ich mache alles! Rezeptur, QMS, Touren, gib mir, was du hast.“",
        en: "Then Michael. He has already heard that something is changing.\nMichael: \"I'll do anything! Compounding, QMS, routes, give me whatever you've got.\"",
        ar: "ثم ميشائيل. سمع أن شيئاً سيتغير.\nميشائيل: «أنا أعمل أي شيء! مكان التحضير، نظام الجودة، الجولات، أعطني ما عندك.»"
      },
      rounds: [
        { options: [
          { id: "a", grade: "green", points: 10, face: "begeistert",
            line:  { de: "„Eine Sache zuerst: die Rezeptur, mit Karim als Einarbeiter. In vier Wochen schauen wir gemeinsam, wie es läuft.“", en: "\"One thing first: compounding, with Karim training you. In four weeks we'll look together at how it's going.\"", ar: "«شيء واحد أولاً: مكان التحضير، وكريم يدرّبك. بعد أربعة أسابيع ننظر معاً كيف تسير الأمور.»" },
            reply: { de: "„Vier Wochen. Deal.“", en: "\"Four weeks. Deal.\"", ar: "«أربعة أسابيع. اتفقنا.»" } },
          { id: "b", grade: "red", points: 0, face: "ueberfordert",
            line:  { de: "„Gut, dann nimmst du die Rezeptur, das QMS und die Touren.“", en: "\"Good, then you take compounding, the QMS and the routes.\"", ar: "«ممتاز، إذن خذ مكان التحضير ونظام الجودة والجولات.»" },
            reply: { de: "„Alles … ab Montag?“ Sein Lächeln wird starr.", en: "\"All of it ... from Monday?\" His smile freezes.", ar: "«كلها... من الإثنين؟» تتجمد ابتسامته." } },
          { id: "c", grade: "yellow", points: 5, face: "gekraenkt",
            line:  { de: "„Du bist noch zu neu für Verantwortung.“", en: "\"You're still too new for responsibility.\"", ar: "«ما زلت جديداً على المسؤولية.»" },
            reply: { de: "„Wann bin ich denn nicht mehr neu?“", en: "\"So when am I not new any more?\"", ar: "«ومتى لن أعود جديداً؟»" } }
        ]},
        { options: [
          { id: "a", grade: "green", points: 10, face: "begeistert",
            line:  { de: "„Wenn du in der Rezeptur steckst und vorne eine Schlange ist, springe ich vorne ein. Das schreiben wir in den Plan, damit du nicht jedes Mal fragen musst.“", en: "\"If you're in the middle of compounding and there's a queue out front, I step in at the counter. We'll put that in the plan so you don't have to ask every time.\"", ar: "«إن كنت في مكان التحضير وفي الأمام طابور، أنا أنزل إلى الطاولة. نكتب هذا في الخطة، حتى لا تضطر إلى السؤال كل مرة.»" },
            reply: { de: "„Das hilft wirklich.“", en: "\"That really helps.\"", ar: "«هذا يساعد فعلاً.»" } },
          { id: "b", grade: "yellow", points: 5, face: "ueberfordert",
            line:  { de: "„Dann musst du eben schneller werden.“", en: "\"Then you'll just have to get faster.\"", ar: "«إذن عليك أن تصير أسرع.»" },
            reply: { de: "„Schneller. In der Rezeptur.“ Er schaut zu Karim hinüber.", en: "\"Faster. In compounding.\" He glances over at Karim.", ar: "«أسرع. في مكان التحضير.» ينظر نحو كريم." } },
          { id: "c", grade: "red", points: 0, face: "ueberfordert",
            line:  { de: "„Dann lässt du die Rezeptur halt liegen.“", en: "\"Then just leave the compounding.\"", ar: "«إذن اترك التحضير وخلاص.»" },
            reply: { de: "„Mitten in der Herstellung?“", en: "\"In the middle of preparing it?\"", ar: "«في منتصف التحضير؟»" } }
        ]}
      ]
    },

    /* ---------- Teil 5 · Aufgabentafel ---------- */
    {
      id: "tafel", type: "board",
      img: "assets/Team/PCG_SCN_TEAM03_E_TAFEL_v001.webp",
      text: {
        de: "Die Tafel in der Küche. Ich tippe eine Aufgabe an und dann die Person, die sie übernimmt. Die Balken zeigen, wie viel jeder trägt. Rezeptur und QMS brauchen außerdem eine Vertretung.",
        en: "The board in the kitchen. I tap a task, then the person who takes it over. The bars show how much each person carries. Compounding and QMS also need a deputy.",
        ar: "اللوحة في المطبخ. ألمس مهمة، ثم الشخص الذي سيتولاها. الأشرطة تبيّن ما يحمله كل واحد. ومكان التحضير ونظام إدارة الجودة يحتاجان أيضاً إلى نائب."
      },
      people: [
        { id: "karim",   role: "apotheker", capacity: 4, name: { de: "Karim", en: "Karim", ar: "كريم" } },
        { id: "emre",    role: "apotheker", capacity: 4, name: { de: "Emre", en: "Emre", ar: "أمره" } },
        { id: "michael", role: "apotheker", capacity: 3, name: { de: "Michael", en: "Michael", ar: "ميشائيل" } },
        { id: "lina",    role: "pta",       capacity: 3, name: { de: "Lina (PTA)", en: "Lina (PTA)", ar: "لينا (PTA)" } },
        { id: "julia",   role: "pta",       capacity: 3, name: { de: "Julia (PTA)", en: "Julia (PTA)", ar: "يوليا (PTA)" } },
        { id: "ich",     role: "apotheker", capacity: 4, name: { de: "Ich", en: "Me", ar: "أنا" } }
      ],
      tasks: [
        { id: "rezeptur",       load: 3, critical: true,  start: "emre",
          name: { de: "Rezeptur", en: "Compounding", ar: "مكان التحضير (Rezeptur)" } },
        { id: "qms",            load: 2, critical: true,  start: "emre",
          name: { de: "QMS-Beauftragter", en: "QMS officer", ar: "مسؤول نظام إدارة الجودة (QMS)" } },
        { id: "medikationsanalyse", load: 2, start: "ich", roles: ["apotheker"],
          name: { de: "Medikationsanalyse (pDL)", en: "Medication review (pDL)", ar: "التحليل الدوائي (pDL)" },
          reject: { de: "Die Medikationsanalyse ist Apothekerinnen und Apothekern vorbehalten (§ 1a Abs. 3 Nr. 6 ApBetrO).", en: "Medication review is reserved for pharmacists (§ 1a(3) no. 6 ApBetrO).", ar: "التحليل الدوائي محصور في الصيادلة (§ 1a Abs. 3 Nr. 6 ApBetrO)." } },
        { id: "touren",         load: 1, start: "emre",
          name: { de: "Botendienst-Touren planen", en: "Plan delivery routes", ar: "تخطيط جولات التوصيل" } },
        { id: "bestellung",     load: 2, start: "lina",
          name: { de: "Großhandelsbestellung", en: "Wholesaler orders", ar: "طلبيات تاجر الجملة" } },
        { id: "notdienst",      load: 1, start: "emre",
          name: { de: "Notdienst-Tausch organisieren", en: "Organise on-call swaps", ar: "تنظيم تبديلات المناوبة" } },
        { id: "rezeptkontrolle", load: 1, start: "julia",
          name: { de: "Rezeptkontrolle vor der Abrechnung", en: "Prescription check before billing", ar: "فحص الوصفات قبل المحاسبة" } },
        { id: "einarbeitung",   load: 2, start: null, notPerson: ["michael"],
          name: { de: "Michael in der Rezeptur einarbeiten", en: "Train Michael in compounding", ar: "تدريب ميشائيل في مكان التحضير" },
          reject: { de: "Michael kann sich nicht selbst einarbeiten.", en: "Michael can't train himself.", ar: "ميشائيل لا يستطيع أن يدرّب نفسه." } },
        { id: "retax",          load: 1, start: "emre",
          name: { de: "Retax-Einsprüche", en: "Retax appeals", ar: "اعتراضات الـRetax" } },
        { id: "pruefung",       load: 1, start: "ich",
          name: { de: "Prüfung der Fertigarzneimittel", en: "Checking finished medicines", ar: "فحص الأدوية الجاهزة" } }
      ],
      deputyLoad: 1,
      deputyFor: ["rezeptur", "qms"],
      checks: [
        { id: "emre_frei",   points: 10,
          ok:   { de: "Emre liegt in seiner Kapazität.", en: "Emre is within his capacity.", ar: "أمره ضمن طاقته." },
          fail: { de: "Emre trägt immer noch mehr, als er kann.", en: "Emre is still carrying more than he can.", ar: "أمره ما زال يحمل أكثر مما يستطيع." } },
        { id: "ich_frei",    points: 10,
          ok:   { de: "Ich habe mich nicht selbst überladen.", en: "I haven't overloaded myself.", ar: "لم أُثقل نفسي." },
          fail: { de: "Ich habe alles auf mich genommen. Jetzt bin ich der neue Emre.", en: "I took everything on myself. Now I'm the new Emre.", ar: "أخذت كل شيء على نفسي. صرت أنا أمره الجديد." } },
        { id: "michael_ok",  points: 10,
          ok:   { de: "Michael hat höchstens so viel, wie er tragen kann, und wird eingearbeitet, wo er Neues übernimmt.", en: "Michael has no more than he can carry, and is trained where he takes on something new.", ar: "ميشائيل لم يأخذ أكثر من طاقته، ويُدرَّب حيث يتولى جديداً." },
          fail: { de: "Michael ist überladen oder steht ohne Einarbeitung in der Rezeptur.", en: "Michael is overloaded, or stands in the compounding room without training.", ar: "ميشائيل مثقل، أو يقف في مكان التحضير بلا تدريب." } },
        { id: "karim_rolle", points: 10, partial: 5,
          ok:      { de: "Karim arbeitet Michael ein: seine Erfahrung als Rolle, nicht als Last.", en: "Karim trains Michael: his experience as a role, not a burden.", ar: "كريم يدرّب ميشائيل: خبرته دور، لا عبء." },
          partialText: { de: "Die Einarbeitung ist vergeben, aber nicht an Karim.", en: "The training is assigned, but not to Karim.", ar: "التدريب أُسند، لكن ليس إلى كريم." },
          fail:    { de: "Niemand arbeitet Michael ein.", en: "Nobody is training Michael.", ar: "لا أحد يدرّب ميشائيل." } },
        { id: "vertretung_rezeptur", points: 10,
          ok:   { de: "Die Rezeptur hat eine Vertretung.", en: "Compounding has a deputy.", ar: "لمكان التحضير نائب." },
          fail: { de: "Fällt der Verantwortliche aus, steht die Rezeptur still.", en: "If the person in charge is off, compounding stops.", ar: "إن غاب المسؤول، يتوقف مكان التحضير." } },
        { id: "vertretung_qms", points: 10,
          ok:   { de: "Das QMS hat eine Vertretung.", en: "The QMS has a deputy.", ar: "لنظام إدارة الجودة نائب." },
          fail: { de: "Das QMS hängt wieder an einer einzigen Person.", en: "The QMS hangs on a single person again.", ar: "نظام إدارة الجودة معلّق مجدداً بشخص واحد." } }
      ]
    },

    /* ---------- Teil 6 · Sechs Wochen später ---------- */
    {
      id: "spaeter", type: "timeskip",
      img: "assets/Team/PCG_SCN_TEAM03_F_SECHS_WOCHEN_v001.webp",
      text: { de: "Sechs Wochen später.", en: "Six weeks later.", ar: "بعد ستة أسابيع." },
      endings: {
        A: {
          imgs: ["assets/Team/PCG_SCN_TEAM03_G_FEIERABEND_v001.webp", "assets/Team/PCG_SCN_TEAM03_J_TEAM_ENTSPANNT_v001.webp"],
          text: {
            de: "Freitag, 18:00 Uhr. Emre zieht die Jacke an und winkt mir zu. Das Angebot hat er letzte Woche abgesagt.\nMittags sitzen wir zu viert am Tisch. Auf der Tafel sind die Karten über alle Spalten verteilt, und neben Rezeptur und QMS steht jetzt jeweils ein zweiter Name.",
            en: "Friday, 6:00 p.m. Emre puts on his jacket and waves to me. He turned the offer down last week.\nAt lunchtime the four of us sit at the table. On the board the cards are spread over every column, and compounding and QMS now each have a second name next to them.",
            ar: "الجمعة، 18:00. أمره يلبس سترته ويلوّح لي. رفض العرض الأسبوع الماضي.\nعند الظهر نجلس نحن الأربعة إلى الطاولة. على اللوحة البطاقات موزعة على كل الأعمدة، وبجانب مكان التحضير ونظام إدارة الجودة صار هناك اسم ثانٍ."
          }
        },
        B: {
          imgs: ["assets/Team/PCG_SCN_TEAM03_H_LEERER_STUHL_v001.webp"],
          text: {
            de: "Emres Stuhl ist leer. Auf dem Tisch steht seine Tasse, daneben eine Abschiedskarte.\nIn der ersten Woche ohne ihn bleibt die Rezeptur zwei Tage zu, weil niemand sonst sie wirklich kennt. Zwei Rezepturen gehen an die Apotheke in der Nachbarstraße.",
            en: "Emre's chair is empty. His mug stands on the table, a farewell card beside it.\nIn the first week without him the compounding room stays closed for two days, because nobody else really knows it. Two prescriptions for compounded medicines go to the pharmacy down the street.",
            ar: "كرسي أمره فارغ. فنجانه على الطاولة، وبجانبه بطاقة وداع.\nفي الأسبوع الأول بدونه بقي مكان التحضير مغلقاً يومين، لأن لا أحد غيره يعرفه فعلاً. وذهبت وصفتا تحضير إلى الصيدلية في الشارع المجاور."
          }
        },
        C: {
          imgs: ["assets/Team/PCG_SCN_TEAM03_I_KARIM_LEHRT_v001.webp"],
          text: {
            de: "Karim steht neben Michael an der Rezeptur und zeigt ihm, wie man die Salbe richtig anreibt. Das läuft.\nEmre lehnt an der Tür. Er ist geblieben, aber er sieht immer noch müde aus. Gestern hat er mir gesagt, dass die andere Apotheke ihr Angebot verlängert hat.",
            en: "Karim stands next to Michael at the compounding bench and shows him how to rub the ointment down properly. That part is working.\nEmre leans against the door. He has stayed, but he still looks tired. Yesterday he told me the other pharmacy has extended its offer.",
            ar: "كريم يقف بجانب ميشائيل عند طاولة التحضير ويريه كيف يُسحق المرهم بالطريقة الصحيحة. هذا الجزء يسير.\nأمره يستند إلى الباب. بقي، لكنه ما زال يبدو متعباً. أمس قال لي إن الصيدلية الأخرى مدّدت عرضها."
          }
        }
      }
    },

    /* ---------- Teil 7 · Systemkarten ---------- */
    {
      id: "system", type: "cards", pick: 3,
      text: {
        de: "Damit sich das nicht wiederholt: Welche drei Maßnahmen führe ich ein?",
        en: "So that this doesn't happen again: which three measures do I introduce?",
        ar: "حتى لا يتكرر هذا: أيّ ثلاثة إجراءات أعتمد؟"
      },
      cards: [
        { id: 1, good: true, points: 10,
          text: { de: "Regelmäßiges Einzelgespräch mit jedem im Team.", en: "Regular one-to-one talks with everyone in the team.", ar: "حديث فردي منتظم مع كل واحد في الفريق." },
          why:  { de: "Emre hat monatelang geschwiegen, weil niemand gefragt hat.", en: "Emre stayed silent for months because nobody asked.", ar: "أمره سكت أشهراً لأن أحداً لم يسأل." } },
        { id: 2, good: true, points: 10,
          text: { de: "Monatlicher Blick auf die Zeiterfassung.", en: "A monthly look at the time records.", ar: "نظرة شهرية على تسجيل الوقت." },
          why:  { de: "Die zwei Freitage mit 10,5 Stunden standen schwarz auf weiß da. Gesehen hat sie niemand.", en: "The two 10.5-hour Fridays were there in black and white. Nobody saw them.", ar: "يوما الجمعة بعشر ساعات ونصف كانا مكتوبين بوضوح. ولم يرهما أحد." } },
        { id: 3, good: true, points: 10,
          text: { de: "Aufgabenmatrix mit Vertretung für jede kritische Aufgabe, festgehalten im QMS.", en: "A task matrix with a deputy for every critical task, recorded in the QMS.", ar: "مصفوفة مهام بنائب لكل مهمة حرجة، موثّقة في نظام إدارة الجودة (QMS)." },
          why:  { de: "Eine Apotheke, die von einer Person abhängt, steht still, sobald diese Person fehlt.", en: "A pharmacy that depends on one person stops the moment that person is missing.", ar: "الصيدلية التي تعتمد على شخص واحد تتوقف لحظة يغيب." } },
        { id: 4, good: true, points: 10,
          text: { de: "Gefährdungsbeurteilung, die auch psychische Belastung erfasst.", en: "A risk assessment that also covers psychological strain.", ar: "تقييم مخاطر يشمل الضغط النفسي أيضاً." },
          why:  { de: "Keine freiwillige Maßnahme: § 5 ArbSchG nennt psychische Belastungen bei der Arbeit ausdrücklich als Gefährdung, die beurteilt werden muss.", en: "Not optional: § 5 ArbSchG explicitly names psychological strain at work as a hazard that must be assessed.", ar: "ليست اختيارية: § 5 ArbSchG يذكر الضغوط النفسية في العمل صراحةً خطراً يجب تقييمه." } },
        { id: 5, good: false, points: 0,
          text: { de: "Emre eine Gehaltserhöhung zusagen.", en: "Promise Emre a pay rise.", ar: "أعد أمره بزيادة راتب." },
          why:  { de: "Über das Gehalt entscheidet der Inhaber. Und mehr Geld hätte keine einzige Stunde von Emres Last genommen.", en: "Pay is the owner's decision. And more money wouldn't have taken a single hour off Emre's load.", ar: "الراتب قرار المالك. والمال لم يكن ليرفع ساعة واحدة من عبء أمره." } },
        { id: 6, good: false, points: 0,
          text: { de: "„Wer Hilfe braucht, soll sich melden.“", en: "\"Anyone who needs help should speak up.\"", ar: "«من يحتاج مساعدة فليطلبها.»" },
          why:  { de: "Genau die, die nie Nein sagen, melden sich nie.", en: "The very people who never say no never speak up.", ar: "الذين لا يقولون لا هم بالضبط من لا يطلبون أبداً." } },
        { id: 7, good: false, points: 0,
          text: { de: "Emres Aufgaben komplett an Karim übergeben.", en: "Hand all of Emre's tasks over to Karim.", ar: "نقل كل مهام أمره إلى كريم." },
          why:  { de: "Damit wechselt nur der Name des Unersetzlichen.", en: "That only changes the name of the indispensable one.", ar: "هكذا يتغير اسم الذي لا غنى عنه فقط." } }
      ]
    }
  ],

  summary: {
    img: "assets/Team/PCG_CARD_TEAM03_v001.webp",
    heading: { de: "Was ich als Filialleiter gelernt habe", en: "What I learned as branch manager", ar: "ما تعلّمته كمدير فرع" },
    points: [
      { de: "Erst zuhören, dann verteilen: Wer nie Nein sagt, meldet sich erst, wenn er schon geht.", en: "Listen first, then redistribute: someone who never says no only speaks up when they're already leaving.", ar: "استمع أولاً، ثم وزّع: من لا يقول لا لا يتكلم إلا وهو على وشك الرحيل." },
      { de: "Höchstens zehn Stunden pro Werktag, im Durchschnitt acht; ab mehr als sechs Stunden mindestens 30 Minuten feste Pause. Der Samstag ist ein Werktag. Die Verantwortung trägt der Arbeitgeber, im Alltag also ich.", en: "No more than ten hours per working day, eight on average; above six hours at least 30 minutes of fixed break. Saturday is a working day. The employer is responsible, which day to day means me.", ar: "عشر ساعات في يوم العمل كحد أقصى، وثمانٍ في المتوسط؛ وفوق ست ساعات استراحة ثابتة لا تقل عن 30 دقيقة. السبت يوم عمل. المسؤولية على صاحب العمل، أي عليّ أنا في الممارسة اليومية." },
      { de: "Der beste Mitarbeiter ist die größte Schwachstelle, wenn er keine Vertretung hat.", en: "Your best employee is your biggest weak point if he has no deputy.", ar: "أفضل موظف عندك هو أكبر نقطة ضعف إن لم يكن له نائب." }
    ],
    source: "ArbZG §§ 3, 4, 16 · https://www.gesetze-im-internet.de/arbzg/ · ArbSchG § 5 · https://www.gesetze-im-internet.de/arbschg/__5.html · ApBetrO § 1a · https://www.gesetze-im-internet.de/apobetro_1987/"
  }
};
