/* =====================================================================
   Falldaten · rauchstopp_entschl
   Ausgelagert aus game/index.html am 12.11.2026 (Technik: Daten-Split).
   Inhalt woertlich uebernommen, nur Bildendungen .jpg/.png -> .webp.
   Geladen erst beim Start des Falls durch levelDaten(); der Stummel in
   index.html traegt nur Titel, Persona, Banner und src.
===================================================================== */
TOPICS.rauchstopp_entschl = {
  de:"Rauchstopp", en:"Smoking cessation", ar:"الإقلاع عن التدخين",
  persona:"entschl",
  banner:"assets/PCG_CARD_CUS014_v003.webp",
  steps:[
   {mech:"comic",data:{kicker:"Szene 1 · Der Kunde kommt",title:"Ein Mann kommt herein – entschlossener Blick",img:"assets/PCG_SCN_CUS014_A_ENTRANCE_v003.webp",cta:"Reagieren →",
    bubbles:[{who:"Kunde",txt:"Guten Tag. Ich <b>höre auf zu rauchen</b>. Ab Montag, endgültig. Meine Tochter hat mich gefragt, ob ich ihre Hochzeit noch erlebe – das hat gesessen."},{who:"Kunde",txt:"Ich brauche <b>Nikotinpflaster</b>. Geben Sie mir die kleinste Stärke, ich will nicht von einer Sucht in die nächste rutschen."}]}},
   {mech:"mcq",data:{scene:"assets/PCG_SCN_CUS014_B_COUNTER_v003.webp",kicker:"Szene 2 · Die entscheidende Frage",title:"Er will die kleinste Pflasterstärke. Was tun Sie?",
    options:[
     {t:"Respekt für die Entscheidung. Damit es klappt, brauche ich zwei Zahlen: Wie viele Zigaretten rauchen Sie am Tag, und wie schnell nach dem Aufwachen kommt die erste?",p:25,tr:12,ok:true,h:"Die zwei Zahlen, die alles bestimmen",x:"Zigarettenzahl und Zeit bis zur ersten Zigarette sind die Standardparameter zur Abschätzung der Abhängigkeit. Sie entscheiden über die Pflasterstärke – und Unterdosierung ist der häufigste Grund, warum eine Nikotinersatztherapie scheitert."},
     {t:"Sehr vernünftig, hier ist das schwächste Pflaster.",p:0,tr:-10,h:"Unterdosierung vorprogrammiert",x:"Die kleinste Stärke klingt vorsichtig, ist aber bei einem starken Raucher zu wenig: die Entzugssymptome bleiben, er raucht wieder und schließt daraus, dass Pflaster nicht wirken. Genau so scheitern die meisten Versuche."},
     {t:"Pflaster allein reichen selten, nehmen Sie besser das verschreibungspflichtige Präparat vom Arzt.",p:8,tr:-2,h:"Zu früh delegiert",x:"Nikotinersatztherapie ist eine wirksame, gut belegte Selbstmedikation. Der Arztverweis ist eine Option für später, nicht der erste Satz."},
     {t:"Willensstärke ist am wichtigsten – versuchen Sie es doch erst mal ohne.",p:0,tr:-12,h:"Fachlich falsch und demotivierend",x:"Ohne Unterstützung liegt die Erfolgsquote im niedrigen einstelligen Bereich; mit Nikotinersatz verdoppelt bis verdreifacht sie sich. Sie schicken einen hochmotivierten Menschen in einen wahrscheinlichen Misserfolg."}]}},
   {mech:"ask3",data:{scene:"assets/PCG_SCN_CUS014_B_COUNTER_v003.webp",kicker:"Szene 2b · Nur drei Fragen",title:"Er ist entschlossen. Drei Fragen – welche bringen die Therapie voran?",hint:"Noch {n} Fragen übrig. Zwei Zahlen und ein Muster bestimmen die Dosis.",pick:3,okH:"Die Dosis-Parameter erfasst",badH:"Fragen verschenkt",expl:"Zigarettenzahl, Zeit bis zur ersten Zigarette und die Auslösesituationen bestimmen die gesamte Therapie: die ersten beiden ergeben die Pflasterstärke, die dritte entscheidet, ob ein zusätzliches schnell wirkendes Präparat nötig ist. Frühere Versuche und Marke sind Kontext, keine Therapieparameter.",questions:[{q:"Wie viele Zigaretten rauchen Sie am Tag?",a:"Fünfundzwanzig. Manchmal mehr, wenn Stress ist.",val:25},{q:"Wie schnell nach dem Aufwachen kommt die erste?",a:"Sofort. Noch vor dem Kaffee, innerhalb von fünf Minuten.",val:25},{q:"In welchen Situationen fällt es Ihnen am schwersten?",a:"Beim Kaffee morgens und im Auto. Da geht es automatisch.",val:25},{q:"Haben Sie einen festen Termin zum Aufhören?",a:"Montag. Das steht.",val:20},{q:"Haben Sie es schon einmal versucht?",a:"Vor zehn Jahren, ein halbes Jahr lang. Dann kam die Trennung.",val:15},{q:"Raucht jemand in Ihrem Haushalt?",a:"Nein, meine Frau hat nie geraucht.",val:15},{q:"Welche Marke rauchen Sie?",a:"Immer dieselbe seit Jahren.",val:5},{q:"Warum jetzt gerade?",a:"Meine Tochter. Das habe ich Ihnen ja erzählt.",val:5}]}},
 {mech:"sort",data:{scene:"assets/PCG_SCN_CUS014_C_OTS_v003.webp",kicker:"Szene 3 · Die Einschätzung",title:"Er antwortet ausführlich. Sortieren Sie:",
    hint:"Antippen, dann Box wählen. Alle 6 zuordnen.",flagLabel:"Bestimmt die Therapie",safeLabel:"Nebengeräusch",
    okH:"Sauber erfasst",badH:"Wichtiges übersehen",
    expl:"Vier bestimmende Punkte: 25 Zigaretten täglich und die erste innerhalb von fünf Minuten nach dem Aufwachen sprechen für eine ausgeprägte Abhängigkeit – hier gehört die höchste Pflasterstärke hin. Der feste Rauchstopptermin ist ein starker Erfolgsfaktor. Und die Situation, in der es ihm am schwersten fällt (Kaffee und Autofahrt), bestimmt, wo ein schnell wirkendes Präparat zusätzlich gebraucht wird. Marke und frühere Versuche sind Kontext, keine Therapieparameter.",
    cards:[{t:"Raucht 25 Zigaretten am Tag",flag:true},{t:"Erste Zigarette innerhalb von fünf Minuten nach dem Aufwachen",flag:true},{t:"Hat einen festen Termin: kommenden Montag",flag:true},{t:"Am schwersten fällt es beim Kaffee und im Auto",flag:true},{t:"Raucht seit Jahren dieselbe Marke",flag:false},{t:"Hat vor zehn Jahren schon mal aufgehört, für ein halbes Jahr",flag:false}]}},
   {mech:"dose",data:{kicker:"Szene 4 · Die Pflasterstärke",title:"25 Zigaretten täglich, erste innerhalb von 5 Minuten – Pflasterstärke wählen:",
    min:7,max:28,step:7,unit:"mg/24h",target:21,tol:0,starts:[7,14,28],cta:"Stärke bestätigen",
    exactH:"Richtig dosiert",exactX:"Über 20 Zigaretten täglich und die erste innerhalb von 30 Minuten: das ist die Konstellation für die höchste Stufe, 21 mg über 24 Stunden. Nach sechs bis acht Wochen wird schrittweise auf 14 und dann 7 mg reduziert.",
    closeH:"Knapp daneben",closeX:"Bei über 20 Zigaretten täglich ist 21 mg/24h die Standardstärke. Zu niedrig dosiert bleiben die Entzugssymptome bestehen.",
    wrongH:"Falsche Stärke",highX:"Über der zugelassenen Einzelstärke – 21 mg/24h ist die höchste reguläre Stufe.",lowX:"Deutlich zu niedrig für 25 Zigaretten täglich. Unterdosierung ist der häufigste Grund für einen Rückfall."}},
   {mech:"shelf",data:{kicker:"Szene 5 · Die Ergänzung",title:"Pflaster gewählt. Was für die akuten Momente beim Kaffee und im Auto?",
    boxes:[
     {n:"Nikotin-Kaugummi",s:"2 mg, akut",col:"#1565C0",ok:true,p:20,tr:12,h:"Richtiger Griff",x:"Die Kombination aus Pflaster als Basis und einem schnell wirkenden Präparat für akutes Verlangen ist wirksamer als das Pflaster allein – und genau für seine Auslösesituationen gedacht. Wichtig: langsam kauen und parken, nicht wie Kaugummi kauen."},
     {n:"Nikotin-Lutschtabletten",s:"2 mg",col:"#00838F",p:18,tr:8,h:"Gleichwertige Alternative",x:"Gleiches Prinzip wie das Kaugummi, oft angenehmer in der Anwendung – besonders für jemanden, der im Auto sitzt."},
     {n:"Nikotin-Spray",s:"schnell wirksam",col:"#2E7D32",p:16,tr:6,h:"Schnellste Option",x:"Wirkt am schnellsten von allen Ersatzprodukten, gut bei plötzlichem starkem Verlangen. Etwas teurer und anfangs im Rachen reizend."},
     {n:"Zweites Pflaster",s:"zusätzlich 21 mg",col:"#E65100",p:0,tr:-10,h:"Überdosierung",x:"Pflaster werden nicht verdoppelt. Für Spitzen nimmt man ein kurz wirksames Präparat, nicht mehr Basisdosis."},
     {n:"Kräuterzigaretten",s:"nikotinfrei",col:"#F9A825",p:0,tr:-8,h:"Kontraproduktiv",x:"Sie halten das Rauchritual aufrecht und erzeugen ebenfalls schädlichen Rauch. Fachlich nicht empfehlenswert."},
     {n:"Beruhigungstee",s:"pflanzlich",col:"#6A1B9A",p:5,tr:0,h:"Nett, aber wirkungslos",x:"Gegen Nikotinentzug ohne belegte Wirkung. Als Ritual-Ersatz beim Kaffee erwähnenswert, mehr nicht."}]}},
   
 {mech:"mcq",data:{scene:"assets/PCG_SCN_CUS014_D_HANDOVER_v003.webp",kicker:"Szene 6 · Abschluss",title:"„Und wenn ich schwach werde?“",
    options:[
     {t:"Ein Rückfall ist kein Scheitern – die meisten brauchen mehrere Anläufe, und jeder Versuch erhöht die Erfolgschance. Wichtig: nicht rauchen und Pflaster gleichzeitig absetzen, sondern weitermachen. Kommen Sie in zwei Wochen vorbei, dann schauen wir, ob die Stärke passt.",p:25,tr:12,ok:true,h:"Perfekter Abschluss",x:"Sie nehmen dem Rückfall die Endgültigkeit, verhindern den klassischen Abbruch nach dem ersten Ausrutscher und vereinbaren eine Nachbetreuung. Genau diese Begleitung verdoppelt die Erfolgsquote gegenüber der reinen Abgabe."},
     {t:"Dann müssen Sie eben durchhalten, Sie haben es sich ja vorgenommen.",p:5,tr:-8,h:"Druck statt Unterstützung",x:"Moralischer Druck erhöht bei einem Rückfall nur die Scham – und Scham führt dazu, dass er nicht wiederkommt."},
     {t:"Wenn Sie rückfällig werden, hören Sie mit den Pflastern auf.",p:0,tr:-10,h:"Fachlich falsch",x:"Ein einzelner Ausrutscher ist kein Grund, die Therapie zu beenden. Genau dieser Abbruch macht aus einem Ausrutscher einen kompletten Rückfall."},
     {t:"Probieren Sie es dann mit E-Zigaretten.",p:0,tr:-8,h:"Nicht die Empfehlung der Apotheke",x:"E-Zigaretten sind kein zugelassenes Arzneimittel zur Rauchentwöhnung, die Langzeitdaten fehlen. Mit einer wirksamen zugelassenen Therapie in der Hand ist das der falsche Rat."}]}}
  ],
  badges:[
   {icon:"🔢",de:"Dosis-Rechner",en:"Dose Calculator",ar:"حاسب الجرعة",cond:function(s){return s.step3>=20;}},
   {icon:"🤲",de:"Motivations-Coach",en:"Motivation Coach",ar:"مدرّب التحفيز",cond:function(s){return s.step1>=25;}},
   {icon:"🔁",de:"Rückfall-Realist",en:"Relapse Realist",ar:"واقعي الانتكاس",cond:function(s){return s.step5>=25;}},
   {icon:"🤝",de:"Vertrauensperson",en:"Trusted Advisor",ar:"موضع الثقة",cond:function(s){return s.trust>=70;}}
  ]
};

TOPICS.rauchstopp_entschl.steps_en=[
 {mech:"comic",data:{kicker:"Scene 1 · The customer arrives",title:"A man walks in - determined look",img:"assets/PCG_SCN_CUS014_A_ENTRANCE_v003.webp",cta:"React →",
  bubbles:[{who:"Customer",txt:"Good day. I am <b>quitting smoking</b>. From Monday, for good. My daughter asked me whether I'd live to see her wedding - that hit home."},{who:"Customer",txt:"I need <b>nicotine patches</b>. Give me the lowest strength, I don't want to slide from one addiction into the next."}]}},
 {mech:"mcq",data:{scene:"assets/PCG_SCN_CUS014_B_COUNTER_v003.webp",kicker:"Scene 2 · The decisive question",title:"He wants the lowest patch strength. What do you do?",
  options:[
   {t:"Respect for the decision. To make it work I need two numbers: how many cigarettes a day, and how soon after waking is the first one?",p:25,tr:12,ok:true,h:"The two numbers that determine everything",x:"Cigarette count and time to the first cigarette are the standard parameters for estimating dependence. They decide the patch strength - and under-dosing is the commonest reason nicotine replacement therapy fails."},
   {t:"Very sensible, here's the weakest patch.",p:0,tr:-10,h:"Under-dosing pre-programmed",x:"The lowest strength sounds cautious but is too little for a heavy smoker: withdrawal symptoms persist, he smokes again and concludes that patches don't work. That is how most attempts fail."},
   {t:"Patches alone rarely suffice, better get the prescription product from your doctor.",p:8,tr:-2,h:"Delegated too early",x:"Nicotine replacement is an effective, well-evidenced self-medication. A referral is an option for later, not the opening line."},
   {t:"Willpower matters most - why not try without anything first?",p:0,tr:-12,h:"Wrong and demotivating",x:"Without support the success rate is in the low single digits; with nicotine replacement it doubles to triples. You send a highly motivated person into probable failure."}]}},
 {mech:"ask3",data:{scene:"assets/PCG_SCN_CUS014_B_COUNTER_v003.webp",kicker:"Scene 2b · Three questions only",title:"He is determined. Three questions - which advance the therapy?",hint:"{n} questions left. Two numbers and one pattern determine the dose.",pick:3,okH:"Dosing parameters captured",badH:"Questions wasted",expl:"Cigarette count, time to the first cigarette and the trigger situations determine the entire therapy: the first two give the patch strength, the third decides whether an additional fast-acting product is needed. Past attempts and brand are context, not therapy parameters.",questions:[{q:"How many cigarettes do you smoke a day?",a:"Twenty-five. Sometimes more when it is stressful.",val:25},{q:"How soon after waking is the first one?",a:"Immediately. Before coffee, within five minutes.",val:25},{q:"In which situations is it hardest for you?",a:"With morning coffee and in the car. It happens automatically there.",val:25},{q:"Do you have a fixed quit date?",a:"Monday. That is settled.",val:20},{q:"Have you tried before?",a:"Ten years ago, for six months. Then came the separation.",val:15},{q:"Does anyone else in your household smoke?",a:"No, my wife has never smoked.",val:15},{q:"Which brand do you smoke?",a:"The same one for years.",val:5},{q:"Why now of all times?",a:"My daughter. I told you already.",val:5}]}},
 {mech:"sort",data:{scene:"assets/PCG_SCN_CUS014_C_OTS_v003.webp",kicker:"Scene 3 · The assessment",title:"He answers at length. Sort it:",
  hint:"Tap a card, then the matching box. Sort all 6.",flagLabel:"Determines the therapy",safeLabel:"Background noise",
  okH:"Captured cleanly",badH:"Missed the essentials",
  expl:"Four determining points: 25 cigarettes daily and the first within five minutes of waking indicate marked dependence - this calls for the highest patch strength. The fixed quit date is a strong predictor of success. And the situation where it is hardest (coffee and driving) determines where a fast-acting product is additionally needed. Brand and past attempts are context, not therapy parameters.",
  cards:[{t:"Smokes 25 cigarettes a day",flag:true},{t:"First cigarette within five minutes of waking",flag:true},{t:"Has a fixed date: this coming Monday",flag:true},{t:"Hardest with coffee and in the car",flag:true},{t:"Has smoked the same brand for years",flag:false},{t:"Quit once ten years ago, for six months",flag:false}]}},
 {mech:"dose",data:{kicker:"Scene 4 · The patch strength",title:"25 cigarettes daily, first within 5 minutes - choose the patch strength:",
  min:7,max:28,step:7,unit:"mg/24h",target:21,tol:0,starts:[7,14,28],cta:"Confirm strength",
  exactH:"Correctly dosed",exactX:"More than 20 cigarettes daily and the first within 30 minutes: that is the constellation for the highest step, 21 mg over 24 hours. After six to eight weeks it is tapered to 14 and then 7 mg.",
  closeH:"Close",closeX:"Above 20 cigarettes daily, 21 mg/24h is the standard strength. Dosed too low, withdrawal symptoms persist.",
  wrongH:"Wrong strength",highX:"Above the approved single strength - 21 mg/24h is the highest regular step.",lowX:"Far too low for 25 cigarettes a day. Under-dosing is the commonest reason for relapse."}},
 {mech:"shelf",data:{kicker:"Scene 5 · The addition",title:"Patch chosen. What for the acute moments with coffee and in the car?",
  boxes:[
   {n:"Nicotine gum",s:"2 mg, acute",col:"#1565C0",ok:true,p:20,tr:12,h:"Right pick",x:"Combining a patch as the base with a fast-acting product for acute cravings is more effective than the patch alone - and aimed exactly at his trigger situations. Important: chew slowly and park it, not like ordinary chewing gum."},
   {n:"Nicotine lozenges",s:"2 mg",col:"#00838F",p:18,tr:8,h:"Equivalent alternative",x:"Same principle as the gum, often more pleasant to use - especially for someone at the wheel."},
   {n:"Nicotine spray",s:"fast-acting",col:"#2E7D32",p:16,tr:6,h:"Fastest option",x:"Acts fastest of all replacement products, good for sudden strong cravings. Somewhat pricier and initially irritating in the throat."},
   {n:"A second patch",s:"another 21 mg",col:"#E65100",p:0,tr:-10,h:"Overdose",x:"Patches are not doubled. For peaks you use a short-acting product, not more base dose."},
   {n:"Herbal cigarettes",s:"nicotine-free",col:"#F9A825",p:0,tr:-8,h:"Counterproductive",x:"They maintain the smoking ritual and still produce harmful smoke. Not professionally recommendable."},
   {n:"Calming tea",s:"herbal",col:"#6A1B9A",p:5,tr:0,h:"Pleasant but ineffective",x:"No proven effect against nicotine withdrawal. Worth mentioning as a ritual substitute with coffee, nothing more."}]}},
 
 {mech:"mcq",data:{scene:"assets/PCG_SCN_CUS014_D_HANDOVER_v003.webp",kicker:"Scene 6 · Closing",title:"\u201cAnd what if I slip?\u201d",
  options:[
   {t:"A slip is not failure - most people need several attempts, and each attempt raises the odds. Important: don't stop the patches along with it, carry on. Come back in two weeks and we'll check whether the strength fits.",p:25,tr:12,ok:true,h:"Perfect closing",x:"You remove the finality from a relapse, prevent the classic abandonment after the first slip, and arrange follow-up. Precisely this accompaniment doubles the success rate compared with dispensing alone."},
   {t:"Then you'll just have to stick with it, you decided to after all.",p:5,tr:-8,h:"Pressure instead of support",x:"Moral pressure only adds shame after a slip - and shame means he won't come back."},
   {t:"If you relapse, stop using the patches.",p:0,tr:-10,h:"Professionally wrong",x:"A single slip is no reason to end the therapy. That abandonment is exactly what turns a slip into a full relapse."},
   {t:"Then try e-cigarettes.",p:0,tr:-8,h:"Not the pharmacy's recommendation",x:"E-cigarettes are not an approved medicinal product for cessation and long-term data are lacking. With an effective approved therapy in hand, that is the wrong advice."}]}}
];

TOPICS.rauchstopp_entschl.steps_ar=[
 {mech:"comic",data:{kicker:"المشهد 1 · وصول الزبون",title:"رجل يدخل بنظرة عازمة",img:"assets/PCG_SCN_CUS014_A_ENTRANCE_v003.webp",cta:"تصرّف ←",
  bubbles:[{who:"الزبون",txt:"طاب يومك. سأ<b>قلع عن التدخين</b>. من يوم الاثنين ونهائياً. سألتني ابنتي إن كنت سأعيش لأحضر زفافها - وأصابتني الكلمة في مقتل."},{who:"الزبون",txt:"أريد <b>لصقات نيكوتين</b>. أعطني أضعف عيار، لا أريد أن أنتقل من إدمان إلى آخر."}]}},
 {mech:"mcq",data:{scene:"assets/PCG_SCN_CUS014_B_COUNTER_v003.webp",kicker:"المشهد 2 · السؤال الحاسم",title:"يريد أضعف عيار لصقة. ماذا تفعل؟",
  options:[
   {t:"احترامي لقرارك. ولكي ينجح أحتاج رقمين: كم سيجارة يومياً، وبعد كم من الوقت من استيقاظك تأتي الأولى؟",p:25,tr:12,ok:true,h:"الرقمان اللذان يحسمان كل شيء",x:"عدد السجائر وزمن أول سيجارة هما المعياران القياسيان لتقدير درجة الاعتماد، وهما يحددان عيار اللصقة - ونقص الجرعة هو السبب الأشيع لفشل العلاج ببدائل النيكوتين."},
   {t:"قرار حكيم، تفضل أضعف لصقة.",p:0,tr:-10,h:"نقص جرعة مبرمج",x:"أضعف عيار يبدو حذراً لكنه قليل جداً لمدخن شره: تبقى أعراض الانسحاب فيعود للتدخين ويستنتج أن اللصقات لا تنفع. هكذا تفشل معظم المحاولات."},
   {t:"اللصقات وحدها نادراً ما تكفي، خذ المستحضر الموصوف من الطبيب.",p:8,tr:-2,h:"تفويض مبكر",x:"العلاج ببدائل النيكوتين علاج ذاتي فعّال ومدعوم بالأدلة. إحالة الطبيب خيار لاحق لا جملة افتتاحية."},
   {t:"الإرادة هي الأهم - جرّب أولاً بلا شيء.",p:0,tr:-12,h:"خاطئ ومُحبِط",x:"بلا دعم تكون نسبة النجاح في خانة الآحاد الدنيا؛ ومع بدائل النيكوتين تتضاعف مرتين إلى ثلاث. أنت ترسل شخصاً بالغ التحفيز إلى فشل مرجّح."}]}},
 {mech:"ask3",data:{scene:"assets/PCG_SCN_CUS014_B_COUNTER_v003.webp",kicker:"المشهد 2ب · ثلاثة أسئلة فقط",title:"هو عازم. ثلاثة أسئلة – أيها يقدّم العلاج فعلاً؟",hint:"بقي {n} من الأسئلة. رقمان ونمط واحد يحددون الجرعة.",pick:3,okH:"رصدت معايير الجرعة",badH:"أهدرت أسئلتك",expl:"عدد السجائر وزمن أول سيجارة والمواقف المحفِّزة تحدد العلاج كله: الأولان يعطيان عيار اللصقة، والثالث يحسم الحاجة إلى مستحضر سريع المفعول إضافي. أما المحاولات السابقة والماركة فسياق لا معايير علاج.",questions:[{q:"كم سيجارة تدخن يومياً؟",a:"خمس وعشرون. وأحياناً أكثر مع التوتر.",val:25},{q:"بعد كم من الوقت من استيقاظك تأتي الأولى؟",a:"فوراً. قبل القهوة، خلال خمس دقائق.",val:25},{q:"في أي المواقف يصعب عليك الأمر أكثر؟",a:"مع قهوة الصباح وفي السيارة. تحدث تلقائياً هناك.",val:25},{q:"هل لديك موعد ثابت للإقلاع؟",a:"الاثنين. وهذا محسوم.",val:20},{q:"هل حاولت من قبل؟",a:"قبل عشر سنوات لستة أشهر. ثم جاء الانفصال.",val:15},{q:"هل يدخّن أحد آخر في بيتك؟",a:"لا، زوجتي لم تدخن قط.",val:15},{q:"أي ماركة تدخن؟",a:"الماركة نفسها منذ سنوات.",val:5},{q:"ولماذا الآن تحديداً؟",a:"ابنتي. وقد أخبرتك بذلك.",val:5}]}},
 {mech:"sort",data:{scene:"assets/PCG_SCN_CUS014_C_OTS_v003.webp",kicker:"المشهد 3 · التقييم",title:"يجيب بإسهاب. صنّف:",
  hint:"انقر البطاقة ثم الصندوق المناسب. صنّف الست جميعاً.",flagLabel:"يحدد العلاج",safeLabel:"كلام جانبي",
  okH:"رصد دقيق",badH:"فوّتك المهم",
  expl:"أربع نقاط محددة: 25 سيجارة يومياً وأول سيجارة خلال خمس دقائق من الاستيقاظ تدلان على اعتماد واضح - وهنا يلزم أعلى عيار لصقة. وتحديد موعد ثابت للإقلاع عامل نجاح قوي. أما الموقف الأصعب عليه (القهوة والقيادة) فيحدد أين يحتاج مستحضراً سريع المفعول إضافياً. الماركة والمحاولات السابقة سياق لا معايير علاج.",
  cards:[{t:"يدخن 25 سيجارة يومياً",flag:true},{t:"أول سيجارة خلال خمس دقائق من الاستيقاظ",flag:true},{t:"لديه موعد ثابت: الاثنين القادم",flag:true},{t:"الأصعب عليه مع القهوة وفي السيارة",flag:true},{t:"يدخن الماركة نفسها منذ سنوات",flag:false},{t:"أقلع مرة قبل عشر سنوات لستة أشهر",flag:false}]}},
 {mech:"dose",data:{kicker:"المشهد 4 · عيار اللصقة",title:"25 سيجارة يومياً، والأولى خلال 5 دقائق – اختر عيار اللصقة:",
  min:7,max:28,step:7,unit:"ملغ/24س",target:21,tol:0,starts:[7,14,28],cta:"تأكيد العيار",
  exactH:"جرعة صحيحة",exactX:"أكثر من 20 سيجارة يومياً والأولى خلال 30 دقيقة: هذه تركيبة أعلى درجة، 21 ملغ على مدى 24 ساعة. وبعد ستة إلى ثمانية أسابيع يُخفَّض تدريجياً إلى 14 ثم 7 ملغ.",
  closeH:"قريب",closeX:"فوق 20 سيجارة يومياً يكون 21 ملغ/24س هو العيار القياسي. وبجرعة أقل تبقى أعراض الانسحاب.",
  wrongH:"عيار خاطئ",highX:"أعلى من العيار المفرد المرخّص - 21 ملغ/24س هو أعلى درجة نظامية.",lowX:"أقل بكثير من اللازم لـ25 سيجارة يومياً. ونقص الجرعة أشيع أسباب الانتكاس."}},
 {mech:"shelf",data:{kicker:"المشهد 5 · الإضافة",title:"اختير عيار اللصقة. فماذا للحظات الحادة مع القهوة وفي السيارة؟",
  boxes:[
   {n:"علكة نيكوتين",s:"2 ملغ، حاد",col:"#1565C0",ok:true,p:20,tr:12,h:"الاختيار الصحيح",x:"الجمع بين اللصقة كأساس ومستحضر سريع المفعول للرغبة الحادة أنجع من اللصقة وحدها - وهو موجّه بالضبط لمواقفه المحفِّزة. والمهم: مضغ بطيء ثم إراحتها في الخد، لا مضغها كعلكة عادية."},
   {n:"أقراص مص نيكوتين",s:"2 ملغ",col:"#00838F",p:18,tr:8,h:"بديل مكافئ",x:"المبدأ نفسه وأسهل استعمالاً غالباً - خاصة لمن يجلس خلف المقود."},
   {n:"بخاخ نيكوتين",s:"سريع المفعول",col:"#2E7D32",p:16,tr:6,h:"الأسرع",x:"أسرع بدائل النيكوتين مفعولاً، جيد للرغبة المفاجئة الشديدة. أغلى قليلاً ويهيّج الحلق في البداية."},
   {n:"لصقة ثانية",s:"21 ملغ إضافية",col:"#E65100",p:0,tr:-10,h:"جرعة زائدة",x:"اللصقات لا تُضاعَف. وللذروات يُستعمل مستحضر قصير المفعول لا مزيد من الجرعة الأساسية."},
   {n:"سجائر أعشاب",s:"بلا نيكوتين",col:"#F9A825",p:0,tr:-8,h:"عكس المطلوب",x:"تُبقي طقس التدخين وتنتج دخاناً ضاراً أيضاً. غير موصى بها مهنياً."},
   {n:"شاي مهدّئ",s:"نباتي",col:"#6A1B9A",p:5,tr:0,h:"لطيف لكنه بلا مفعول",x:"لا أثر مثبت على انسحاب النيكوتين. يُذكر كبديل طقسي مع القهوة، لا أكثر."}]}},
 
 {mech:"mcq",data:{scene:"assets/PCG_SCN_CUS014_D_HANDOVER_v003.webp",kicker:"المشهد 6 · الختام",title:"\u201cوماذا لو ضعفتُ؟\u201d",
  options:[
   {t:"الزلة ليست فشلاً - أغلب الناس يحتاجون محاولات عدة، وكل محاولة ترفع فرص النجاح. والمهم: لا توقف اللصقات معها بل واصل. وعُد بعد أسبوعين لنرى إن كان العيار مناسباً.",p:25,tr:12,ok:true,h:"ختام مثالي",x:"نزعت عن الانتكاس صفة النهائية، ومنعت التوقف الكلاسيكي بعد أول زلة، ورتّبت متابعة. وهذه المرافقة تحديداً تضاعف نسبة النجاح مقارنة بالصرف المجرد."},
   {t:"إذن عليك أن تصمد، فأنت من قرر.",p:5,tr:-8,h:"ضغط بدل دعم",x:"الضغط الأخلاقي يزيد الخجل بعد الزلة - والخجل يعني أنه لن يعود."},
   {t:"إن انتكست فأوقف اللصقات.",p:0,tr:-10,h:"خطأ علمي",x:"زلة واحدة ليست سبباً لإنهاء العلاج. وهذا التوقف بالذات هو ما يحوّل الزلة إلى انتكاس كامل."},
   {t:"جرّب حينها السجائر الإلكترونية.",p:0,tr:-8,h:"ليست توصية الصيدلية",x:"السجائر الإلكترونية ليست دواءً مرخّصاً للإقلاع وبياناتها بعيدة المدى ناقصة. ومع وجود علاج مرخّص فعّال بيدك تكون نصيحة خاطئة."}]}}
];
