/* Pharma-Coach · Küche · Teamplan 01 · "Schwarzer Montag"
   Inhalt freigegeben von Ammar am 16.11.2026. Nur Daten, keine Logik.
   Bildpfade relativ zu game/. Punkte: gruen 10 · gelb 5 · rot 0; Plantafel 40. Maximal 80. */
window.PC_PLAN = window.PC_PLAN || {};
window.PC_PLAN["plan_01"] = {
  id: "plan_01",
  card: "assets/Team/PCG_CARD_PLAN01_v001.webp",
  title: { de: "Schwarzer Montag", en: "Black Monday", ar: "الاثنين الأسود" },
  maxPoints: 80,

  intro: {
    img: "assets/Team/PCG_SCN_PLAN01_A_ANRUF_v001.webp",
    text: {
      de: "Ich bin Filialleiter dieser Apotheke. Was in meinem Team passiert, liegt in meiner Verantwortung.\n\nMontag, 7:20 Uhr. Um 8:00 Uhr öffnet die Apotheke. Heute habe ich von 13:30 bis 16:30 Uhr einen Termin beim Inhaber in der Hauptapotheke. Und das Telefon klingelt.",
      en: "I am the branch manager (Filialleiter) of this pharmacy. What happens in my team is my responsibility.\n\nMonday, 7:20 a.m. The pharmacy opens at 8:00. Today I have a meeting with the owner at the main pharmacy from 1:30 to 4:30 p.m. And the phone rings.",
      ar: "أنا مدير هذا الفرع (Filialleiter). ما يحدث في فريقي مسؤوليتي.\n\nالاثنين، 7:20. الصيدلية تفتح في 8:00. اليوم عندي موعد مع صاحب الصيدلية في الفرع الرئيسي من 13:30 إلى 16:30. والهاتف يرن."
    }
  },

  steps: [
    /* ---------- Teil 1 · Michael ---------- */
    {
      id: "michael", type: "choice",
      img: "assets/Team/PCG_SCN_PLAN01_B_MICHAEL_KRANK_v001.webp",
      text: {
        de: "Michael, mit heiserer Stimme: „Tut mir leid … 38,9 Fieber. Ich kann heute nicht kommen.“",
        en: "Michael, in a hoarse voice: \"I'm sorry ... 38.9 fever. I can't come in today.\"",
        ar: "ميشائيل بصوت مبحوح: «آسف... حرارتي 38,9. لا أستطيع المجيء اليوم.»"
      },
      options: [
        { id: "a", grade: "green", points: 10,
          text: { de: "„Gute Besserung, ruh dich aus. Wenn es länger als drei Tage dauert, geh zum Arzt, damit die Krankschreibung vorliegt.“",
                  en: "\"Get well, rest. If it lasts longer than three days, see the doctor so the sick note is in place.\"",
                  ar: "«سلامتك، ارتح. إن طال المرض أكثر من ثلاثة أيام اذهب إلى الطبيب لتُسجَّل شهادة المرض.»" },
          result: { de: "Genau so sieht es das Gesetz vor: Michael hat sich sofort gemeldet, und ab einer Krankheit von mehr als drei Kalendertagen braucht es eine ärztliche Bescheinigung.",
                    en: "That's exactly what the law says: Michael reported sick at once, and a doctor's certificate is needed once the illness lasts more than three calendar days.",
                    ar: "هذا هو القانون بالضبط. الإبلاغ الفوري هو ما فعله ميشائيل، والشهادة تُطلب إن زاد المرض عن ثلاثة أيام تقويمية." } },
        { id: "b", grade: "yellow", points: 5,
          text: { de: "„Ich brauche die Krankschreibung heute.“",
                  en: "\"I need the sick note today.\"",
                  ar: "«أريد شهادة الطبيب اليوم.»" },
          result: { de: "Das darf der Arbeitgeber verlangen. Aber ich schicke einen Mann mit fast 39 Fieber am Morgen in die Praxis, für ein Papier, das ich heute nicht brauche.",
                    en: "The employer is allowed to ask for that. But I'm sending a man with almost 39 fever to the practice in the morning, for a paper I don't need today.",
                    ar: "مسموح لصاحب العمل أن يطلبها أبكر، لكنك ترسل رجلاً حرارته 39 إلى العيادة صباحاً لورقة لا تحتاجها." } },
        { id: "c", grade: "red", points: 0,
          text: { de: "„Kannst du nicht wenigstens zwei Stunden kommen? Wir stecken in der Klemme.“",
                  en: "\"Can't you come in for at least two hours? We're in a bind.\"",
                  ar: "«ألا تستطيع أن تأتي ولو ساعتين؟ نحن في ورطة.»" },
          result: { de: "Ein kranker Kollege steckt Kunden und Team an und lernt, dass Kranksein in dieser Filiale eine Schande ist.",
                    en: "A sick colleague infects customers and the team, and learns that being ill is something to be ashamed of in this branch.",
                    ar: "زميل مريض يعدي الزبائن والفريق، ويتعلّم أن المرض في هذا الفرع عيب." } }
      ]
    },

    /* ---------- Teil 2 · Karim (nur Erzählung) ---------- */
    {
      id: "karim_anruf", type: "story",
      img: "assets/Team/PCG_SCN_PLAN01_C_KARIM_AUTO_v001.webp",
      text: {
        de: "Zwei Minuten später, Karim: „Das Auto ist unterwegs liegen geblieben. Abschleppdienst und Taxi … Ich bin um zehn da. Es tut mir wirklich leid.“",
        en: "Two minutes later, Karim: \"My car broke down on the way. Tow truck and taxi ... I'll be there at ten. I'm really sorry.\"",
        ar: "بعد دقيقتين، كريم: «السيارة تعطّلت في الطريق. ونش وتاكسي... أصل في العاشرة. آسف حقاً.»"
      }
    },

    /* ---------- Teil 3 · Emre ---------- */
    {
      id: "emre", type: "choice",
      img: "assets/Team/PCG_SCN_PLAN01_D_EMRE_NOTDIENST_v001.webp",
      text: {
        de: "Emre kommt gerade aus 24 Stunden Notdienst, von Sonntag 8:00 bis Montag 8:00 Uhr. Er hält seinen Kaffee mit müden Händen.\nEmre: „Hab's gehört. Ich bleibe, bis Karim kommt, kein Problem.“",
        en: "Emre has just finished a 24-hour emergency duty, from Sunday 8:00 to Monday 8:00. He holds his coffee with tired hands.\nEmre: \"I heard. I'll stay until Karim arrives, no problem.\"",
        ar: "أمره خارج للتو من مناوبة 24 ساعة، من الأحد 8:00 إلى الاثنين 8:00. يمسك قهوته بيدين متعبتين.\nأمره: «سمعت. سأبقى حتى يأتي كريم، لا مشكلة.»"
      },
      options: [
        { id: "a", grade: "green", points: 10,
          img: "assets/Team/PCG_SCN_PLAN01_E_EMRE_HEIM_v001.webp",
          text: { de: "„Danke, aber geh nach Hause. Ich bin ab acht hier, die Apotheke ist nicht ohne Apotheker.“",
                  en: "\"Thank you, but go home. I'm here from eight, the pharmacy isn't without a pharmacist.\"",
                  ar: "«شكراً، لكن اذهب إلى البيت. أنا هنا من الثامنة، والصيدلية ليست بلا صيدلاني.»" },
          result: { de: "Nach einem Notdienst von bis zu 24 Stunden hat er Anspruch auf mindestens 12 Stunden Freizeit. Die einzige Ausnahme sind dringende betriebliche Gründe, und die gibt es nicht, solange ich da bin.",
                    en: "After an emergency duty of up to 24 hours he is entitled to at least 12 hours off. The only exception is urgent operational reasons, and there are none as long as I'm here.",
                    ar: "بعد مناوبة 24 ساعة له حق 12 ساعة راحة على الأقل. الاستثناء الوحيد سبب تشغيلي ملحّ، ولا يوجد سبب ملحّ ما دمت أنت حاضراً." } },
        { id: "b", grade: "red", points: 0,
          img: "assets/Team/PCG_SCN_PLAN01_F_EMRE_GAEHNT_v001.webp",
          text: { de: "„Danke, das rettet uns.“",
                  en: "\"Thanks, that saves us.\"",
                  ar: "«شكراً، هذا ينقذنا.»" },
          result: { de: "26 Stunden ohne Schlaf hinter dem HV-Tisch. Das ist nicht nur ein Rechtsverstoß, die Müdigkeit selbst ist eine Gefahr für die Patienten.",
                    en: "26 hours without sleep behind the counter. It's not only against the rules; the tiredness itself is a danger to patients.",
                    ar: "26 ساعة بلا نوم وراء الطاولة. المخالفة ليست قانونية فقط، فالتعب نفسه خطر على المرضى." } },
        { id: "c", grade: "yellow", points: 5,
          text: { de: "„Wie du willst, du entscheidest.“",
                  en: "\"As you like, you decide.\"",
                  ar: "«كما تريد، أنت تقرّر.»" },
          result: { de: "Die Entscheidung liegt nicht bei ihm. Er ist müde und will nett sein, und ich bin der Filialleiter.",
                    en: "The decision isn't his. He is tired and trying to be nice, and I am the branch manager.",
                    ar: "القرار ليس قراره. هو متعب، ويحاول أن يكون لطيفاً، وأنت المدير." } }
      ]
    },

    /* ---------- Teil 4 · Plantafel ---------- */
    {
      id: "tafel", type: "board", points: 40, penaltyPerAlarm: 10,
      img: "assets/Team/PCG_SCN_PLAN01_G_PLANTAFEL_v001.webp",
      text: {
        de: "7:30 Uhr. Vor mir die Plantafel, die Karten in der Hand. Bevor ich öffne, muss der ganze Tag stehen.",
        en: "7:30 a.m. The planning board in front of me, the cards in my hand. Before I open, the whole day has to be planned.",
        ar: "7:30. أمامي اللوح، والبطاقات في يدي. عليّ أن أبني اليوم كله قبل أن أفتح."
      },
      day: { start: "08:00", end: "18:30", slotMinutes: 30 },
      people: [
        { id: "ich",      role: "apotheker", name: { de: "Ich", en: "Me", ar: "أنا" },
          available: ["08:00","18:30"], locked: [ { from: "13:30", to: "16:30", reason: { de: "Termin beim Inhaber", en: "Meeting with the owner", ar: "موعد مع صاحب الصيدلية" } } ] },
        { id: "karim",    role: "apotheker", name: { de: "Karim", en: "Karim", ar: "كريم" },
          available: ["10:00","18:30"], needsBreak: true },
        { id: "emre",     role: "apotheker", name: { de: "Emre", en: "Emre", ar: "أمره" },
          blocked: { de: "Ruhezeit nach dem Notdienst bis 20:00 Uhr", en: "Rest after emergency duty until 8 p.m.", ar: "راحة بعد المناوبة حتى 20:00" } },
        { id: "michael",  role: "apotheker", name: { de: "Michael", en: "Michael", ar: "ميشائيل" },
          blocked: { de: "Krank", en: "Sick", ar: "مريض" } },
        { id: "lena",     role: "pta", name: { de: "Lena", en: "Lena", ar: "لينا" },
          available: ["08:00","18:30"] },
        { id: "julia",    role: "pta", name: { de: "Julia", en: "Julia", ar: "يوليا" },
          blocked: { de: "Urlaub", en: "On holiday", ar: "في إجازة" } }
      ],
      breakTile: { minutes: 30, for: "karim", label: { de: "Pause", en: "Break", ar: "استراحة" } },
      rules: {
        pharmacistAlways: true,
        maxContinuousHours: 6,
        maxDailyHours: 10,
        breakNeedsOtherPharmacist: true
      },
      alarms: {
        noPharmacist:   { de: "Kein Apotheker in dieser Zeit. Eine PTA darf die Apotheke nicht allein öffnen.", en: "No pharmacist at this time. A PTA may not open the pharmacy alone.", ar: "لا صيدلاني في هذه الساعة. موظفة PTA لا تفتح الصيدلية وحدها." },
        tooLong:        { de: "Karim arbeitet mehr als 6 Stunden am Stück ohne Pause.", en: "Karim works more than 6 hours in a row without a break.", ar: "كريم يعمل أكثر من 6 ساعات متتالية بلا استراحة." },
        breakAlone:     { de: "Karims Pause liegt in einer Zeit ohne zweiten Apotheker.", en: "Karim's break falls at a time with no other pharmacist.", ar: "استراحة كريم في وقت لا يوجد فيه صيدلاني آخر." },
        overTen:        { de: "Karim arbeitet mehr als 10 Stunden.", en: "Karim works more than 10 hours.", ar: "كريم يتجاوز 10 ساعات عمل." },
        noBreak:        { de: "Karim hat noch keine Pause.", en: "Karim has no break yet.", ar: "كريم بلا استراحة بعد." }
      },
      solution: {
        ich:   [["08:00","13:30"],["16:30","18:30"]],
        karim: [["10:00","18:30"]],
        karimBreakStartAllowed: ["12:00","12:30","13:00"],
        lena:  [["08:00","18:30"]]
      },
      solutionText: {
        de: "Ich arbeite von 8:00 bis 13:30 und von 16:30 bis 18:30 Uhr. Karim von 10:00 bis 18:30 Uhr, seine Pause nur zwischen 12:00 und 13:30 Uhr: früher, und er arbeitet danach mehr als 6 Stunden am Stück; nach 13:30 Uhr bliebe die Apotheke ohne Apotheker.",
        en: "I work from 8:00 to 1:30 p.m. and from 4:30 to 6:30 p.m. Karim from 10:00 to 6:30 p.m., his break only between 12:00 and 1:30 p.m.: any earlier and he works more than 6 hours in a row afterwards; after 1:30 p.m. the pharmacy would be without a pharmacist.",
        ar: "أنا من 8:00 إلى 13:30، ثم من 16:30 إلى 18:30. كريم من 10:00 إلى 18:30، واستراحته بين 12:00 و13:30 فقط: قبل ذلك يعمل بعدها أكثر من 6 ساعات متتالية، وبعد 13:30 تبقى الصيدلية بلا صيدلاني."
      }
    },

    /* ---------- Teil 5 · Karim kommt (nur Erzählung) ---------- */
    {
      id: "karim_ankunft", type: "story",
      img: "assets/Team/PCG_SCN_PLAN01_H_KARIM_ANKUNFT_v001.webp",
      text: {
        de: "10:05 Uhr. Karim kommt außer Atem herein, den Schlüssel in der Hand: „Ich hatte noch nicht mal meinen Kaffee!“",
        en: "10:05 a.m. Karim comes in out of breath, the key in his hand: \"I haven't even had my coffee!\"",
        ar: "10:05. كريم يدخل لاهثاً، والمفتاح بيده: «لم أشرب قهوتي حتى!»"
      }
    },

    /* ---------- Teil 6 · Emres Nachricht ---------- */
    {
      id: "emre_nachricht", type: "choice",
      img: "assets/Team/PCG_CU_PLAN01_J_NACHRICHT_v001.webp",
      text: {
        de: "12:00 Uhr. Nachricht von Emre: „Hab vier Stunden geschlafen, mir geht's gut. Soll ich um drei kommen und Karim helfen?“",
        en: "12:00 noon. Message from Emre: \"Slept four hours, I'm fine. Shall I come at three and help Karim?\"",
        ar: "12:00. رسالة من أمره: «نمت أربع ساعات، أنا بخير. آتي في الثالثة أساعد كريم؟»"
      },
      options: [
        { id: "a", grade: "green", points: 10,
          text: { de: "„Nett von dir, aber nein. Deine Ruhezeit läuft bis 20 Uhr, und Karim ist abgedeckt.“",
                  en: "\"Kind of you, but no. Your rest period runs until 8 p.m., and Karim is covered.\"",
                  ar: "«لطيف منك، لكن لا. راحتك حتى الثامنة مساءً، وكريم مغطّى.»" },
          result: { de: "Die Ruhezeit nach dem Notdienst endet nicht, wenn sich der Mitarbeiter gut fühlt. Sie dauert 12 Stunden ab Ende des Dienstes.",
                    en: "The rest after emergency duty doesn't end when the employee feels fine. It lasts 12 hours from the end of the duty.",
                    ar: "الراحة بعد المناوبة لا تنتهي حين يشعر الموظف أنه بخير. 12 ساعة من نهاية المناوبة." } },
        { id: "b", grade: "red", points: 0,
          text: { de: "„Komm, Karim wird sich freuen.“",
                  en: "\"Come, Karim will be glad.\"",
                  ar: "«تعال، كريم سيكون سعيداً.»" },
          result: { de: "Emre arbeitet nur 7 Stunden nach dem Ende eines 24-Stunden-Dienstes, ohne dringenden Grund.",
                    en: "Emre works only 7 hours after the end of a 24-hour duty, with no urgent reason.",
                    ar: "أمره يعمل بعد 7 ساعات فقط من نهاية مناوبة 24 ساعة، وبلا سبب ملحّ." } },
        { id: "c", grade: "yellow", points: 5,
          text: { de: "„Komm nur, wenn wir dich brauchen, ich rufe an.“",
                  en: "\"Only come if we need you, I'll call.\"",
                  ar: "«تعال فقط إن احتجنا، سأتصل بك.»" },
          result: { de: "„Auf Abruf am Telefon“ ist keine Ruhe. Er wartet auf meinen Anruf, statt zu schlafen.",
                    en: "\"On call by phone\" isn't rest. He waits for my call instead of sleeping.",
                    ar: "«احتياط على الهاتف» ليس راحة. هو ينتظر اتصالك بدل أن ينام." } }
      ]
    },

    /* ---------- Teil 7 · Lenas Vorschlag ---------- */
    {
      id: "lena", type: "choice",
      img: "assets/Team/PCG_SCN_PLAN01_I_UEBERGABE_v001.webp",
      text: {
        de: "13:25 Uhr. Ich übergebe Karim die Schlüssel. Hinter mir sagt Lena:\nLena: „Karim, iss um zwei, wenn es ruhiger ist. Ich halte die Apotheke eine halbe Stunde.“\nKarim schaut mich an.",
        en: "1:25 p.m. I hand Karim the keys. Behind me Lena says:\nLena: \"Karim, eat at two when it's quieter. I'll hold the pharmacy for half an hour.\"\nKarim looks at me.",
        ar: "13:25. أسلّم كريم المفاتيح. لينا تقول من خلفي:\nلينا: «كريم، كُل في الثانية حين يهدأ المحل. أنا أدبّر الصيدلية نصف ساعة.»\nكريم ينظر إليّ."
      },
      options: [
        { id: "a", grade: "green", points: 10,
          img: "assets/Team/PCG_SCN_PLAN01_L_KARIM_ALLEIN_v001.webp",
          text: { de: "„Danke, Lena, aber nein. Karim hatte seine Pause, und ab jetzt geht er nicht weg, bis ich zurück bin.“",
                  en: "\"Thank you, Lena, but no. Karim has had his break, and from now on he doesn't leave until I'm back.\"",
                  ar: "«شكراً يا لينا، لكن لا. كريم أخذ استراحته، وبعد الآن لا يغادر حتى أعود.»" },
          result: { de: "Eine halbe Stunde ohne Apotheker lässt sich durch keine gute Absicht ausgleichen.",
                    en: "Half an hour without a pharmacist can't be made up for by any good intention.",
                    ar: "نصف ساعة بلا صيدلاني لا تُعوَّض بأي نية حسنة." } },
        { id: "b", grade: "red", points: 0,
          img: "assets/Team/PCG_CU_PLAN01_K_BUSSGELD_v001.webp",
          text: { de: "„Gute Idee, nur eine halbe Stunde.“",
                  en: "\"Good idea, just half an hour.\"",
                  ar: "«فكرة جيدة، نصف ساعة فقط.»" },
          result: { de: "Zwei Wochen später: unangekündigte Kontrolle durch die Aufsichtsbehörde, Apotheke geöffnet ohne Apotheker, Bußgeld bis zu 5.000 Euro.",
                    en: "Two weeks later: an unannounced inspection by the supervisory authority, pharmacy open without a pharmacist, a fine of up to 5,000 euros.",
                    ar: "بعد أسبوعين: فحص مفاجئ من الجهة الرقابية، صيدلية مفتوحة بلا صيدلاني، غرامة تصل إلى 5000 يورو." } },
        { id: "c", grade: "yellow", points: 5,
          text: { de: "„Entscheide du, Karim.“",
                  en: "\"You decide, Karim.\"",
                  ar: "«قرّر أنت يا كريم.»" },
          result: { de: "Ich bin der Filialleiter, und meine Abwesenheit ab 13:30 Uhr liegt in meiner Verantwortung. Karim vertritt mich, aber die Regel kommt von mir.",
                    en: "I am the branch manager, and my absence from 1:30 p.m. is my responsibility. Karim stands in for me, but the rule comes from me.",
                    ar: "أنت المدير، وغيابك من 13:30 مسؤوليتك. كريم ينوب عنك، لكن القاعدة تُقال منك." } }
      ]
    }
  ],

  /* ---------- Teil 8 · Abschluss ---------- */
  epilogue: {
    img: "assets/Team/PCG_SCN_PLAN01_M_FEIERABEND_v001.webp",
    text: {
      de: "18:30 Uhr. Ich schließe die Tür ab. Karim winkt vom Gehweg: „Ein verrückter Tag. Aber nichts ist schiefgegangen.“",
      en: "6:30 p.m. I lock the door. Karim waves from the pavement: \"A crazy day. But nothing went wrong.\"",
      ar: "18:30. أُغلق الباب. كريم يلوّح من الرصيف: «يوم مجنون. لكن لم يتعطّل شيء.»"
    }
  },
  summary: {
    img: "assets/Team/PCG_SCN_PLAN01_N_ABSCHLUSS_v001.webp",
    heading: { de: "Was ich als Filialleiter gelernt habe", en: "What I learned as branch manager", ar: "ما تعلّمته كمدير فرع" },
    points: [
      { de: "Keine Apotheke ohne Apotheker. Eine PTA öffnet sie nicht und bleibt nicht allein darin, keine einzige Minute.", en: "No pharmacy without a pharmacist. A PTA does not open it or stay in it alone, not for a single minute.", ar: "لا صيدلية بلا صيدلاني. موظفة PTA لا تفتحها ولا تبقى فيها وحدها، ولا دقيقة واحدة." },
      { de: "Meine Abwesenheit deckt ein Apotheker als Vertreter ab, höchstens drei Monate im Jahr.", en: "My absence is covered by a pharmacist as my deputy, for no more than three months a year.", ar: "غيابي يغطّيه صيدلاني ينوب عني، لا أكثر من ثلاثة أشهر في السنة." },
      { de: "Nach dem Notdienst mindestens 12 Stunden Ruhe, auch wenn der Mitarbeiter sagt, es geht ihm gut.", en: "At least 12 hours of rest after emergency duty, even if the employee says he is fine.", ar: "بعد المناوبة 12 ساعة راحة على الأقل، ولو قال الموظف إنه بخير." },
      { de: "Nicht mehr als 6 Stunden am Stück ohne Pause. Die Pause liegt dort, wo ein anderer Apotheker anwesend ist.", en: "No more than 6 hours in a row without a break. The break goes where another pharmacist is present.", ar: "لا أكثر من 6 ساعات متتالية بلا استراحة. والاستراحة توضع حيث يبقى صيدلاني آخر حاضراً." },
      { de: "Wer krank ist, bleibt zu Hause. Ab mehr als drei Kalendertagen ist die ärztliche Bescheinigung Pflicht.", en: "Whoever is sick stays at home. From more than three calendar days, a doctor's certificate is required.", ar: "المريض يبقى في البيت. شهادة الطبيب إلزامية إن زاد المرض عن ثلاثة أيام." }
    ],
    source: "ApBetrO § 2 · ArbZG §§ 3–5 · BRTV § 5 Nr. 5 · EntgFG § 5"
  }
};
