/* Pharma-Coach · Küche · Teamgespräch 01 · "Streit am HV-Tisch"
   Inhalt freigegeben von Ammar am 14.11.2026. Nur Daten, keine Logik.
   Bildpfade relativ zu game/. Punkte: gruen 10 · gelb 5 · rot 0. Maximal 110. */
window.PC_TEAM = window.PC_TEAM || {};
window.PC_TEAM["team_01"] = {
  id: "team_01",
  card: "assets/Team/PCG_CARD_TEAM01_v002.webp",
  title: { de: "Streit am HV-Tisch", en: "The argument at the counter", ar: "شجار على الطاولة" },
  maxPoints: 110,

  intro: {
    img: "assets/Team/PCG_SCN_TEAM01_A_ANSTURM_v002.webp",
    text: {
      de: "Ich bin Filialleiter dieser Apotheke. Was in meinem Team passiert, liegt in meiner Verantwortung.\n\nSamstag, 9:40 Uhr. Die Schlange reicht bis zur Tür. Ich stehe am ersten HV-Tisch, Emre am zweiten mit einem älteren Herrn, der sich auf einen Stock stützt. Michael räumt hinter dem Tresen die Lieferung ein.",
      en: "I am the branch manager (Filialleiter) of this pharmacy. What happens in my team is my responsibility.\n\nSaturday, 9:40 a.m. The queue reaches the door. I am at the first counter, Emre at the second with an elderly man leaning on a walking stick. Michael is putting away the delivery behind the counter.",
      ar: "أنا مدير هذا الفرع (Filialleiter). ما يحدث في فريقي مسؤوليتي.\n\nالسبت، 9:40. الطابور يصل إلى الباب. أنا عند الطاولة الأولى، وأمره عند الثانية مع رجل مسنّ يتكئ على عصا، وميشائيل يرتّب الطلبية خلف الطاولة."
    }
  },

  steps: [
    /* ---------- Teil 1 · Timer ---------- */
    {
      id: "explosion", type: "timer", seconds: 10,
      img: "assets/Team/PCG_SCN_TEAM01_B_STREIT_v002.webp",
      text: {
        de: "Emres Stimme wird plötzlich laut: „Unterbrich mich nicht vor dem Kunden!“\nMichael zeigt auf die Packung in der Hand des Herrn: „Aber das ist Ibuprofen, und er nimmt Ramipril und Torasemid!“\nDie ganze Schlange dreht sich um. Der Herr schaut von einem zum anderen, die Packung in der Hand.",
        en: "Emre's voice suddenly rises: \"Don't interrupt me in front of the customer!\"\nMichael points at the pack in the old man's hand: \"But that's ibuprofen, and he takes ramipril and torasemide!\"\nThe whole queue turns. The man looks from one to the other, the pack in his hand.",
        ar: "صوت أمره يعلو فجأة: «لا تقاطعني أمام الزبون!»\nميشائيل يشير إلى العلبة في يد الرجل المسنّ: «لكن هذا Ibuprofen، وهو يأخذ Ramipril وTorasemid!»\nالطابور كله يلتفت. الرجل ينظر إلى هذا ثم إلى ذاك، والعلبة في يده."
      },
      timeoutOption: "c",
      timeoutExtra: { de: "Zögern ist auch eine Entscheidung.", en: "Hesitating is a decision too.", ar: "التردّد قرار أيضاً." },
      options: [
        { id: "a", grade: "green", points: 10,
          text: { de: "Ich lasse meinen Kunden kurz stehen und gehe sofort zum zweiten Tisch: „Einen Moment bitte, ich übernehme diesen Kunden.“ Dann bitte ich beide ruhig, mit der Schlange weiterzumachen.",
                  en: "I leave my customer for a moment and go straight to the second counter: \"One moment please, I'll take over this customer.\" Then I calmly ask both of them to carry on with the queue.",
                  ar: "أترك زبوني لحظة، وأذهب إلى الطاولة الثانية فوراً: «لحظة من فضلكم، سأتولى أنا هذا الزبون.» ثم أطلب من الاثنين بهدوء أن يكملا مع الطابور." },
          result: { de: "Die Stimmen beruhigen sich in Sekunden. Der Kunde hat noch nichts mitgenommen, die Schlange bewegt sich wieder.",
                    en: "The voices calm down within seconds. The customer hasn't taken anything yet, and the queue starts moving again.",
                    ar: "الأصوات تهدأ في ثوانٍ، الزبون لم يأخذ شيئاً بعد، والطابور يعود إلى الحركة." } },
        { id: "b", grade: "yellow", points: 5,
          text: { de: "Ich rufe von meinem Platz: „Emre, Michael, kommt sofort nach hinten.“",
                  en: "I call out from where I am: \"Emre, Michael, come to the back right now.\"",
                  ar: "أنادي من مكاني: «أمره، ميشائيل، تعالا إلى الخلف حالاً.»" },
          result: { de: "Der Streit ist vorbei, aber zwei Tische sind leer, die Schlange wird länger, und der Kunde steht allein da, die Packung in der Hand. Schlimmer: Niemand hat die Beratung korrigiert.",
                    en: "The argument stops, but two counters are now empty, the queue grows, and the customer is left alone holding the pack. Worse: nobody has corrected the advice yet.",
                    ar: "الشجار توقف، لكن الطاولتين فرغتا، والطابور يطول، والزبون بقي وحده والعلبة في يده. والأخطر: لم يصحّح أحد النصيحة بعد." } },
        { id: "c", grade: "red", points: 0,
          img: "assets/Team/PCG_SCN_TEAM01_B2_TUER_v002.webp",
          text: { de: "Ich mache mit meinem Kunden weiter, die beiden klären das schon.",
                  en: "I carry on with my customer; the two of them will sort it out.",
                  ar: "أكمل مع زبوني، فسيحلّان الأمر بينهما." },
          result: { de: "Der Herr bezahlt und geht mit dem Ibuprofen, der Streit läuft weiter. Ich finde seine Nummer über die Kundenkarte und rufe sofort an. Eine Viertelstunde später ist er wieder da. Diesmal ging es gut.",
                    en: "The man pays and leaves with the ibuprofen while the argument goes on. I find his number through his customer card and call him at once. A quarter of an hour later he is back. This time it worked out.",
                    ar: "الرجل يدفع ويخرج بالـIbuprofen، والشجار مستمر. أجد رقمه من بطاقة العميل وأتصل به فوراً، فيعود بعد ربع ساعة. هذه المرة نجوت." } }
      ]
    },

    /* ---------- Teil 2a ---------- */
    {
      id: "korrektur", type: "choice",
      img: "assets/Team/PCG_SCN_TEAM01_C_KUNDE_v001.webp",
      text: {
        de: "Der Herr steht vor mir, besorgt, die Packung an die Brust gedrückt. Hinter mir steht Emre mit rotem Gesicht. Ich muss die Beratung korrigieren, ohne meinen Kollegen vor einem Kunden bloßzustellen.",
        en: "The man stands in front of me, worried, pressing the pack to his chest. Behind me Emre stands, red in the face. I have to correct the advice without showing up my colleague in front of a customer.",
        ar: "الرجل أمامي، قلق، يضمّ العلبة إلى صدره. أمره خلفي، وجهه أحمر. عليّ أن أصحّح النصيحة دون أن أهين زميلي أمام زبون."
      },
      options: [
        { id: "a", grade: "green", points: 10,
          text: { de: "„Bevor Sie das mitnehmen: Haben Sie Ihren Medikationsplan dabei?“ Ich gehe ihn mit ihm durch und sage: „Zusammen mit diesen beiden Mitteln kann Ibuprofen die Nieren belasten. Ich habe etwas Passenderes für Ihr Knie.“",
                  en: "\"Before you take that: do you have your medication plan with you?\" I go through it with him and say: \"Together with these two medicines, ibuprofen can strain the kidneys. I have something better suited for your knee.\"",
                  ar: "«قبل أن تأخذها، هل معك خطة أدويتك؟» أراجعها معه، ثم أقول: «مع هذين الدواءين قد يُرهق الـIbuprofen الكلى. عندي ما هو أنسب لركبتك.»" },
          result: { de: "Die Korrektur kommt aus der Prüfung des Medikationsplans, nicht aus „mein Kollege hat sich geirrt“. Der Herr vertraut mir, und Emre wurde vor niemandem bloßgestellt.",
                    en: "The correction comes from reviewing the medication plan, not from \"my colleague got it wrong\". The man trusts me, and Emre wasn't shown up in front of anyone.",
                    ar: "التصحيح جاء من مراجعة خطة الأدوية، لا من «زميلي أخطأ». الرجل يثق، وأمره لم يُكسر أمام أحد." } },
        { id: "b", grade: "yellow", points: 5,
          text: { de: "„Mein Kollege hat sich geirrt, Michael hatte recht. Dieses Mittel ist gefährlich für Sie.“",
                  en: "\"My colleague was wrong, Michael was right. This medicine is dangerous for you.\"",
                  ar: "«زميلي أخطأ، وميشائيل كان محقاً. هذا الدواء خطر عليك.»" },
          result: { de: "Der Kunde ist sicher, aber jetzt verängstigt, und Emre wurde vor der ganzen Schlange bloßgestellt. Den Preis zahle ich später in der Küche.",
                    en: "The customer is safe, but now frightened, and Emre has been shown up in front of the whole queue. I'll pay the price later in the kitchen.",
                    ar: "الزبون في أمان، لكنه خائف الآن، وأمره أُهين أمام الطابور كله. الثمن ستدفعه في المطبخ." } },
        { id: "c", grade: "red", points: 0,
          text: { de: "Ich lasse ihn das Ibuprofen mitnehmen und rate ihm, es nicht länger als drei Tage zu nehmen.",
                  en: "I let him take the ibuprofen and advise him not to use it for more than three days.",
                  ar: "أتركه يأخذه، وأنصحه ألا يتجاوز ثلاثة أيام." },
          result: { de: "Das Risiko wartet nicht. Bei dieser Kombination ist die Gefahr für die Nieren in den ersten Wochen der gemeinsamen Einnahme am höchsten, nicht erst nach langer Zeit.",
                    en: "The risk doesn't wait. With this combination the danger to the kidneys is highest in the first weeks of taking them together, not after a long time.",
                    ar: "الخطر لا ينتظر. الخطر على الكلى في هذا المزيج أعلى ما يكون في الأسابيع الأولى من الجمع، لا بعد مدة طويلة." } }
      ]
    },

    /* ---------- Teil 2b ---------- */
    {
      id: "alternative", type: "choice",
      img: "assets/Team/PCG_CU_TEAM01_D_PLAN_v002.webp",
      text: {
        de: "Auf seinem Plan: Ramipril 5 mg morgens, Torasemid 10 mg morgens. Knieschmerzen seit einer Woche, keine Schwellung, keine Rötung, kein Fieber.",
        en: "On his plan: ramipril 5 mg in the morning, torasemide 10 mg in the morning. Knee pain for a week, no swelling, no redness, no fever.",
        ar: "في خطته: Ramipril 5 mg صباحاً، وTorasemid 10 mg صباحاً. ألم في الركبة منذ أسبوع، بلا تورّم ولا احمرار ولا حرارة."
      },
      options: [
        { id: "a", grade: "green", points: 10,
          text: { de: "Diclofenac-Gel auf das Knie, bei Bedarf kurzzeitig Paracetamol, und zum Arzt, wenn es in einigen Tagen nicht besser wird.",
                  en: "Diclofenac gel on the knee, paracetamol for a short time if needed, and see the doctor if it isn't better within a few days.",
                  ar: "جل Diclofenac على الركبة، وParacetamol عند الحاجة لفترة قصيرة، والطبيب إن لم يتحسن خلال أيام." },
          result: { de: "Das Gel wirkt dort, wo der Schmerz ist, und nur wenig davon gelangt ins Blut. Das ist bei Knieschmerzen älterer Menschen meist die empfohlene Wahl.",
                    en: "The gel works where the pain is, and only a little of it reaches the blood. For knee pain in older people this is usually the recommended choice.",
                    ar: "الجل يعمل حيث الألم، وما يصل منه إلى الدم قليل. هذا هو الخيار الموصى به عادةً لألم الركبة عند المسنّين." } },
        { id: "b", grade: "red", points: 0,
          text: { de: "Stattdessen Naproxen, das wirkt länger.",
                  en: "Naproxen instead, it lasts longer.",
                  ar: "Naproxen بدلاً منه، فمفعوله أطول." },
          result: { de: "Naproxen ist ebenfalls ein NSAR. Dasselbe Risiko, nur länger.",
                    en: "Naproxen is an NSAID too. The same risk, just for longer.",
                    ar: "Naproxen من فئة NSAR أيضاً. الخطر نفسه، ولمدة أطول." } },
        { id: "c", grade: "yellow", points: 5,
          text: { de: "Nichts, ich schicke ihn zum Arzt.",
                  en: "Nothing, I send him to the doctor.",
                  ar: "لا شيء، أرسله إلى الطبيب." },
          result: { de: "Sicher, aber er geht mit seinen Schmerzen ohne Lösung, obwohl die Apotheke ihm hier helfen kann.",
                    en: "Safe, but he leaves with his pain unsolved, although the pharmacy can help him here.",
                    ar: "آمن، لكنه يخرج بألمه بلا حل، والصيدلية قادرة على مساعدته في هذه الحالة." } }
      ],
      outro: {
        img: "assets/Team/PCG_SCN_TEAM01_E_LOESUNG_v001.webp",
        text: { de: "Er nimmt das Gel und hebt zum Gruß kurz seinen Stock: „Danke, junger Mann.“",
                en: "He takes the gel and lifts his walking stick slightly in greeting: \"Thank you, young man.\"",
                ar: "يأخذ الجل، ويرفع عصاه قليلاً تحيةً: «شكراً يا بني.»" }
      }
    },

    /* ---------- Teil 3 · Emre · Gesicht reagiert ---------- */
    {
      id: "emre", type: "dialog",
      faces: {
        wuetend: "assets/Team/PCG_CU_TEAM01_EMRE_WUETEND_v001.webp",
        abwehr:  "assets/Team/PCG_CU_TEAM01_EMRE_ABWEHR_v001.webp",
        zu:      "assets/Team/PCG_CU_TEAM01_EMRE_ZU_v001.webp",
        offen:   "assets/Team/PCG_CU_TEAM01_EMRE_OFFEN_v001.webp"
      },
      startFace: "wuetend",
      opening: {
        de: "Eine Stunde später ist es ruhiger. Ich bitte Emre in die Küche. Er setzt sich mir gegenüber, der Kiefer angespannt.\nEmre: „Wenn du mir sagen willst, dass der Neue schlauer ist als ich, spar dir die Zeit.“",
        en: "An hour later things have calmed down. I ask Emre into the kitchen. He sits down opposite me, jaw clenched.\nEmre: \"If you're here to tell me the new guy is smarter than me, save your time.\"",
        ar: "بعد ساعة خفّت الزحمة. أطلب من أمره أن يأتي إلى المطبخ. يجلس قبالتي، فكّه مشدود.\nأمره: «إن جئت لتقول لي إن الجديد أذكى مني، فوفّر وقتك.»"
      },
      rounds: [
        { options: [
          { id: "a", grade: "green", points: 10, face: "abwehr",
            line:  { de: "„Ich habe dich nicht gerufen, um über dich zu urteilen. Ich will verstehen, was aus deiner Sicht passiert ist.“", en: "\"I didn't call you in to judge you. I want to understand what happened from your side.\"", ar: "«لم أطلبك لأحاكمك. أريد أن أفهم ما حدث من جهتك.»" },
            reply: { de: "„Passiert ist, dass er mich vor dem Kunden unterbrochen hat. Acht Jahre bin ich hier.“", en: "\"What happened is that he interrupted me in front of the customer. I've been here eight years.\"", ar: "«ما حدث أنه قاطعني أمام الزبون. ثماني سنوات وأنا هنا.»" } },
          { id: "b", grade: "red", points: 0, face: "zu",
            line:  { de: "„Michael hatte recht, und das weißt du.“", en: "\"Michael was right, and you know it.\"", ar: "«ميشائيل كان محقاً، وأنت تعرف ذلك.»" },
            reply: { de: "Er starrt in seine Tasse und antwortet nicht.", en: "He stares into his cup and doesn't answer.", ar: "يحدّق في كوبه ولا يردّ." } },
          { id: "c", grade: "yellow", points: 5, face: "abwehr",
            line:  { de: "„Mach dir nichts draus, wir machen alle Fehler. Vergiss es.“", en: "\"Don't worry about it, we all make mistakes. Forget it.\"", ar: "«لا تهتم، كلنا نخطئ. انسَ الموضوع.»" },
            reply: { de: "„Warum sitzen wir dann hier?“", en: "\"Then why are we sitting here?\"", ar: "«إذن لماذا نحن هنا؟»" } }
        ]},
        { options: [
          { id: "a", grade: "green", points: 10, face: "offen",
            line:  { de: "„Das Unterbrechen vor dem Kunden war falsch, darüber rede ich mit Michael. Aber die Kombination selbst, ACE-Hemmer mit Diuretikum mit NSAR, was weißt du darüber?“", en: "\"Interrupting you in front of the customer was wrong, and I'll talk to Michael about it. But the combination itself, ACE inhibitor with diuretic with NSAID, what do you know about it?\"", ar: "«المقاطعة أمام الزبون كانت خطأ، وسأتكلم مع ميشائيل عنها. لكن المزيج نفسه، ACE مع مدرّ بول مع NSAR، ماذا تعرف عنه؟»" },
            reply: { de: "„… Triple Whammy. Kenne ich. Im Trubel habe ich nicht auf seinen Plan geschaut.“", en: "\"... Triple whammy. I know it. In the rush I didn't look at his plan.\"", ar: "«...Triple Whammy. أعرفه. في الزحمة لم أنظر إلى خطته.»" } },
          { id: "b", grade: "red", points: 0, face: "wuetend",
            line:  { de: "„Seit acht Jahren Apotheker, wie kannst du das nicht wissen?“", en: "\"A pharmacist for eight years, how can you not know this?\"", ar: "«صيدلاني منذ ثماني سنوات، كيف لا تعرف هذا؟»" },
            reply: { de: "„Jetzt bin ich also der Angeklagte?“", en: "\"So now I'm the one on trial?\"", ar: "«الآن صرت أنا المتهم؟»" } },
          { id: "c", grade: "yellow", points: 5, face: "abwehr",
            line:  { de: "„Nehmen wir an, Michael hat recht, nur zur Sicherheit.“", en: "\"Let's assume Michael is right, just to be safe.\"", ar: "«لنفترض أن ميشائيل محق، احتياطاً فقط.»" },
            reply: { de: "„Zur Sicherheit? Entweder gibt es ein Risiko oder nicht.“", en: "\"To be safe? Either there's a risk or there isn't.\"", ar: "«احتياطاً؟ إما أن هناك خطراً أو لا.»" } }
        ]},
        { options: [
          { id: "a", grade: "green", points: 10, face: "offen",
            line:  { de: "„Mein Vorschlag: Jeder Widerspruch vor einem Kunden geht mit einem vereinbarten Satz nach hinten. Und du hilfst Michael mit deiner Erfahrung beim Ton.“", en: "\"My suggestion: any disagreement in front of a customer moves to the back with one agreed sentence. And you help Michael with the tone, with your experience.\"", ar: "«اقتراحي: كل خلاف أمام زبون ينتقل إلى الخلف بجملة واحدة متفق عليها. وأنت بخبرتك ساعد ميشائيل في النبرة.»" },
            reply: { de: "„… Das ist fair. Und ich entschuldige mich bei ihm für das Anschreien.“", en: "\"... That's fair. And I'll apologise to him for shouting.\"", ar: "«...هذا عادل. وسأعتذر له عن الصراخ.»" } },
          { id: "b", grade: "red", points: 0, face: "zu",
            line:  { de: "„Ich will nicht, dass sich das wiederholt, sonst halte ich es schriftlich fest.“", en: "\"I don't want this to happen again, or I'll put it in writing.\"", ar: "«لا أريد أن يتكرر هذا، وإلا سأسجّله.»" },
            reply: { de: "„Verstanden.“ Danach kein Wort mehr.", en: "\"Understood.\" Not another word after that.", ar: "«مفهوم.» ولا كلمة بعدها." } },
          { id: "c", grade: "yellow", points: 5, face: "abwehr",
            line:  { de: "„Entschuldige dich bei Michael vor dem ganzen Team.“", en: "\"Apologise to Michael in front of the whole team.\"", ar: "«اعتذر لميشائيل أمام الفريق.»" },
            reply: { de: "„Vor dem Team? Er hat angefangen.“", en: "\"In front of the team? He started it.\"", ar: "«أمام الفريق؟ هو من بدأ.»" } }
        ]}
      ]
    },

    /* ---------- Teil 4 · Michael ---------- */
    {
      id: "michael", type: "dialog",
      faces: {
        trotz:     "assets/Team/PCG_CU_TEAM01_MICHAEL_TROTZ_v001.webp",
        unsicher:  "assets/Team/PCG_CU_TEAM01_MICHAEL_UNSICHER_v001.webp",
        gekraenkt: "assets/Team/PCG_CU_TEAM01_MICHAEL_GEKRAENKT_v001.webp",
        einsicht:  "assets/Team/PCG_CU_TEAM01_MICHAEL_EINSICHT_v001.webp"
      },
      startFace: "trotz",
      opening: {
        de: "Michael: „Ich hatte doch recht, oder? Hätte ich geschwiegen, wäre der Mann mit dem Ibuprofen rausgegangen.“",
        en: "Michael: \"I was right, wasn't I? If I'd kept quiet, the man would have walked out with the ibuprofen.\"",
        ar: "ميشائيل: «كنت محقاً، صح؟ لو سكتُّ لخرج الرجل بالـIbuprofen.»"
      },
      rounds: [
        { options: [
          { id: "a", grade: "green", points: 10, face: "einsicht",
            line:  { de: "„Ja, inhaltlich hattest du recht. Und danke, dass du nicht geschwiegen hast.“", en: "\"Yes, on the substance you were right. And thank you for not keeping quiet.\"", ar: "«نعم، في المضمون كنت محقاً. وشكراً لأنك لم تسكت.»" },
            reply: { de: "„Ich dachte, du stauchst mich zusammen.“", en: "\"I thought you were going to tear into me.\"", ar: "«ظننت أنك ستوبّخني.»" } },
          { id: "b", grade: "red", points: 0, face: "gekraenkt",
            line:  { de: "„Du hättest schweigen sollen, Emre ist länger dabei als du.“", en: "\"You should have kept quiet, Emre has been here longer than you.\"", ar: "«كان عليك أن تسكت، فأمره أقدم منك.»" },
            reply: { de: "„Also ist Dienstalter wichtiger als die Nieren des Patienten?“", en: "\"So seniority matters more than the patient's kidneys?\"", ar: "«يعني الأقدمية أهم من كلى المريض؟»" } },
          { id: "c", grade: "yellow", points: 5, face: "trotz",
            line:  { de: "„Wir reden jetzt nicht darüber, wer recht hatte.“", en: "\"We're not going to talk about who was right.\"", ar: "«لن نتكلم عن من كان محقاً.»" },
            reply: { de: "„Aber genau das ist doch das Wichtige.“", en: "\"But that's exactly what matters.\"", ar: "«لكن هذا هو المهم.»" } }
        ]},
        { options: [
          { id: "a", grade: "green", points: 10, face: "unsicher",
            line:  { de: "„Der Fehler war die Art: vor dem Kunden und laut. Der Kunde bekam Angst, und Emre wurde vor der ganzen Schlange bloßgestellt.“", en: "\"The mistake was the way you did it: in front of the customer and loudly. The customer got scared, and Emre was shown up in front of the whole queue.\"", ar: "«الخطأ كان في الطريقة: أمام الزبون، وبصوت عالٍ. الزبون خاف، وأمره انكسر أمام الطابور.»" },
            reply: { de: "„An den Kunden habe ich nicht gedacht. Ich wollte nur den Fehler stoppen.“", en: "\"I didn't think about the customer. I only wanted to stop the mistake.\"", ar: "«لم أفكر بالزبون. فكرت فقط أن أوقف الخطأ.»" } },
          { id: "b", grade: "red", points: 0, face: "gekraenkt",
            line:  { de: "„Dein Verhalten war völlig unprofessionell.“", en: "\"Your behaviour was completely unprofessional.\"", ar: "«تصرّفك كان غير مهني بالكامل.»" },
            reply: { de: "Er presst die Lippen zusammen und schaut zu Boden.", en: "He presses his lips together and looks at the floor.", ar: "يضغط شفتيه وينظر إلى الأرض." } },
          { id: "c", grade: "yellow", points: 5, face: "trotz",
            line:  { de: "„Schon gut, Hauptsache, dem Kunden geht es gut.“", en: "\"It's fine, the main thing is the customer is okay.\"", ar: "«لا بأس، المهم أن الزبون بخير.»" },
            reply: { de: "„Dann mache ich es beim nächsten Mal wieder so.“", en: "\"Then I'll do it the same way next time.\"", ar: "«إذن سأفعلها مرة أخرى.»" } }
        ]},
        { options: [
          { id: "a", grade: "green", points: 10, face: "einsicht",
            line:  { de: "„Nächstes Mal ein Satz: ‚Emre, kommst du kurz mit nach hinten?‘ Und nichts wird abgegeben, bis wir zurück sind.“", en: "\"Next time, one sentence: 'Emre, can you come to the back with me for a moment?' And nothing is handed over until we're back.\"", ar: "«في المرة القادمة جملة واحدة: \"أمره، تأتي معي لحظة إلى الخلف؟\" ولا شيء يُصرف حتى نعود.»" },
            reply: { de: "„Ein Satz. Das schaffe ich.“", en: "\"One sentence. I can do that.\"", ar: "«جملة واحدة. أستطيع ذلك.»" } },
          { id: "b", grade: "yellow", points: 5, face: "unsicher",
            line:  { de: "„Nächstes Mal kommst du zu mir.“", en: "\"Next time, come to me.\"", ar: "«في المرة القادمة تعال إليّ أنا.»" },
            reply: { de: "„Und wenn du nicht im Dienst bist?“", en: "\"And if you're not on shift?\"", ar: "«وإن لم تكن في الوردية؟»" } },
          { id: "c", grade: "red", points: 0, face: "unsicher",
            line:  { de: "„Nächstes Mal schreibst du eine Notiz aufs Rezept.“", en: "\"Next time, write a note on the prescription.\"", ar: "«في المرة القادمة اكتب ملاحظة على الوصفة.»" },
            reply: { de: "„Und der Kunde wartet, bis ich fertig geschrieben habe? Der ist dann längst weg.“", en: "\"And the customer waits until I've finished writing? He'll be long gone.\"", ar: "«والزبون ينتظر حتى أكتب؟ سيكون قد خرج.»" } }
        ]}
      ]
    },

    /* ---------- Teil 5 · Regelkarten: genau 2 wählen ---------- */
    {
      id: "regeln", type: "cards", pick: 2,
      img: "assets/Team/PCG_SCN_TEAM01_F_TEAMTISCH_v001.webp",
      text: {
        de: "Abends sitzt das ganze Team am Küchentisch. Karim faltet ruhig die Hände.\nKarim: „In fünfundzwanzig Jahren kamen die Fehler, die Patienten geschadet haben, nicht von den Neuen, die fragen, sondern von denen, die sich nicht getraut haben zu fragen.“\nIch bin der Filialleiter. Nur zwei Regeln werden Regeln dieser Filiale.",
        en: "In the evening the whole team sits around the kitchen table. Karim folds his hands calmly.\nKarim: \"In twenty-five years, the mistakes that harmed patients didn't come from the new ones who ask, but from those who were afraid to ask.\"\nI am the branch manager. Only two rules become rules of this branch.",
        ar: "المساء، الفريق كله حول طاولة المطبخ. كريم يضمّ يديه بهدوء:\nكريم: «في خمس وعشرين سنة، الأخطاء التي آذت المرضى لم تأتِ من الجدد الذين يسألون، بل ممّن خافوا أن يسألوا.»\nأنا المدير. قاعدتان فقط تصيران قاعدة الفرع."
      },
      cards: [
        { id: 1, good: true, points: 10,
          text: { de: "Der Widerspruchs-Satz: „Kommst du kurz mit nach hinten?“ Bedeutet: Stopp, nichts wird abgegeben, bis wir zurück sind.", en: "The disagreement sentence: \"Can you come to the back for a moment?\" It means: stop, nothing is handed over until we're back.", ar: "جملة الخلاف: «تأتي معي لحظة إلى الخلف؟» ومعناها: توقّف، لا شيء يُصرف حتى نعود." } },
        { id: 2, good: true, points: 10,
          text: { de: "Wer ein NSAR-Schmerzmittel verlangt, wird nach seiner Dauermedikation gefragt, besonders nach Blutdruckmitteln und Diuretika.", en: "Anyone asking for an NSAID painkiller is asked about their regular medication, especially blood pressure drugs and diuretics.", ar: "كل من يطلب مسكّناً من فئة NSAR يُسأل عن أدويته الدائمة، وخاصة أدوية الضغط ومدرّات البول." } },
        { id: 3, good: false, points: 0,
          text: { de: "Der Dienstälteste in der Schicht hat das letzte Wort.", en: "The most senior person on shift has the final word.", ar: "الأقدم في الوردية له الكلمة الأخيرة." },
          why:  { de: "Dienstalter schützt keinen Patienten.", en: "Seniority doesn't protect any patient.", ar: "الأقدمية لا تحمي المريض." } },
        { id: 4, good: false, points: 0,
          text: { de: "Gespräche zwischen Kollegen vor dem Kunden sind verboten.", en: "Talking between colleagues in front of the customer is forbidden.", ar: "يُمنع الكلام بين الزملاء أمام الزبون." },
          why:  { de: "Diese Regel hätte Michael zum Schweigen gebracht, und der Herr wäre mit dem Ibuprofen gegangen.", en: "This rule would have silenced Michael, and the man would have left with the ibuprofen.", ar: "هذه القاعدة كانت ستُسكت ميشائيل، والرجل كان سيخرج بالـIbuprofen." } },
        { id: 5, good: false, points: 0,
          text: { de: "Jeder Fehler wird mit Namen in einer Akte festgehalten.", en: "Every mistake is recorded with the person's name in a file.", ar: "كل خطأ يُسجَّل باسم صاحبه في ملف." },
          why:  { de: "Eine Schuldkultur versteckt Fehler, statt sie zu verhindern.", en: "A blame culture hides mistakes instead of preventing them.", ar: "ثقافة اللوم تُخفي الأخطاء ولا تمنعها." } }
      ]
    }
  ],

  /* ---------- Teil 6 · Abschluss ---------- */
  epilogue: {
    img: "assets/Team/PCG_SCN_TEAM01_G_VERSOEHNUNG_v002.webp",
    text: {
      de: "Eine Woche später. Emre hält ein Blatt, Michael zeigt auf eine Zeile. Sie diskutieren, aber leise, und hinter dem Tresen statt davor.",
      en: "A week later. Emre holds a sheet, Michael points at a line on it. They are arguing, but quietly, and behind the counter instead of in front of it.",
      ar: "بعد أسبوع. أمره يمسك ورقة، وميشائيل يشير إلى سطر فيها. يتجادلان، لكن بصوت منخفض، وخلف الطاولة لا أمامها."
    }
  },
  summary: {
    img: "assets/Team/PCG_SCN_TEAM01_H_ABSCHLUSS_v001.webp",
    heading: { de: "Was ich als Filialleiter gelernt habe", en: "What I learned as branch manager", ar: "ما تعلّمته كمدير فرع" },
    points: [
      { de: "Erst Sicherheit, dann Würde: den Fehler sofort stoppen, den Streit nach hinten verlegen.", en: "Safety first, then dignity: stop the mistake at once, move the disagreement to the back.", ar: "السلامة أولاً، ثم الكرامة: أوقف الخطأ فوراً، وانقل الخلاف إلى الخلف." },
      { de: "Triple Whammy: ACE-Hemmer oder Sartan plus Diuretikum plus NSAR = Risiko für akutes Nierenversagen, am höchsten in den ersten Wochen der gemeinsamen Einnahme.", en: "Triple whammy: ACE inhibitor or ARB plus diuretic plus NSAID = risk of acute kidney injury, highest in the first weeks of combined use.", ar: "Triple Whammy: مثبّط ACE أو Sartan، مع مدرّ بول، مع NSAR = خطر فشل كلوي حاد، وأعلى ما يكون في الأسابيع الأولى من الجمع." },
      { de: "Der Filialleiter ist kein Schiedsrichter zwischen zwei Kollegen: Er trennt Inhalt und Art, mit jedem einzeln.", en: "The branch manager is not a referee between two colleagues: he separates substance from manner, with each one separately.", ar: "المدير لا يحكم بين زميلين: يفصل المضمون عن الطريقة، مع كلٍّ منهما على حدة." }
    ],
    source: "Lapi F. et al. BMJ 2013;346:e8525 · https://www.bmj.com/content/346/bmj.e8525"
  }
};
