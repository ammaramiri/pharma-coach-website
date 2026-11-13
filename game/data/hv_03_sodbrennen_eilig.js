/* =====================================================================
   Falldaten · sodbrennen_eilig
   Ausgelagert aus game/index.html am 12.11.2026 (Technik: Daten-Split).
   Inhalt woertlich uebernommen, nur Bildendungen .jpg/.png -> .webp.
   Geladen erst beim Start des Falls durch levelDaten(); der Stummel in
   index.html traegt nur Titel, Persona, Banner und src.
===================================================================== */
TOPICS.sodbrennen_eilig = {
  de:"Sodbrennen", en:"Heartburn", ar:"حرقة المعدة",
  persona:"eilig",
  banner:"assets/PCG_CARD_CUS003_v003.webp",
  steps:[
   {mech:"comic",data:{kicker:"Szene 1 · Der Kunde kommt",title:"Ein Mann eilt herein – Jacke offen, Blick zur Tür zurück",img:"assets/PCG_SCN_CUS003_A_ENTRANCE_v003.webp",cta:"Reagieren →",
    bubbles:[{who:"Kunde",txt:"Schnell bitte – <b>Sodbrennen</b>, seit Tagen jeden Abend. Ich muss in fünf Minuten weiter."},{who:"Kunde",txt:"Geben Sie mir einfach <b>das Stärkste</b>, was Sie haben."}]}},
   {mech:"mcq",data:{scene:"assets/PCG_SCN_CUS003_B_COUNTER_v003.webp",kicker:"Entscheidung",title:"Der Eilige will das Stärkste – sofort. Ihre Reaktion?",timeoutH:"Zeit abgelaufen",timeoutX:"Er dreht sich demonstrativ zur Tür. Richtig wäre gewesen: Tempo zusagen, Führung behalten.",
    options:[
     {t:"Kommt sofort – hier, ein Protonenpumpenhemmer.",p:5,tr:-3,h:"Schnell, aber blind",x:"Tempo ersetzt keine Triage. Ohne eine einzige Frage wissen Sie nicht, ob Selbstmedikation überhaupt vertretbar ist."},
     {t:"Geht ganz schnell: Zwei gezielte Fragen, dann haben Sie in einer Minute genau das Richtige.",p:25,tr:10,ok:true,h:"Führung + Tempo",x:"Sie nehmen sein Zeitlimit ernst UND behalten die fachliche Kontrolle. Genau die Sprache, die dieser Kundentyp versteht."},
     {t:"Dafür brauche ich erst eine ausführliche Anamnese – etwa zehn Minuten.",p:5,tr:-12,h:"Kunde verloren",x:"Fachlich gemeint, kommunikativ tödlich. Der Eilige ist zur Tür raus, bevor Sie zu Ende gesprochen haben."},
     {t:"Dann nehmen Sie irgendein Antazidum aus dem Regal da drüben.",p:0,tr:-8,h:"Beratung abgegeben",x:"Sie delegieren Ihre Kernaufgabe an ein Regal. Das ist Abverkauf, keine Beratung."}]}},
   {mech:"mcq",data:{scene:"assets/PCG_SCN_CUS003_C_OTS_v003.webp",kicker:"Turbo-Anamnese",title:"Zeit für EINE Frage zuerst. Welche?",timeoutH:"Zeit abgelaufen",timeoutX:"Zu langsam für den Eiligen. Richtig wäre gewesen: vier Alarmzeichen in einer Frage.",
    options:[
     {t:"Haben Sie Schluckbeschwerden, Blut im Stuhl, ungewollten Gewichtsverlust – oder die Beschwerden seit mehr als zwei Wochen täglich?",p:25,tr:10,ok:true,h:"Red Flags im Paket",x:"Eine Frage, vier Alarmzeichen – maximale Sicherheit pro Sekunde. Er verneint alles: seit fünf Tagen, nach späten Geschäftsessen, viel Kaffee, Stress. Selbstmedikation vertretbar."},
     {t:"Was genau haben Sie zuletzt gegessen?",p:5,tr:0,h:"Nebenschauplatz",x:"Auslöser sind interessant – aber erst NACH dem Ausschluss der Alarmzeichen."},
     {t:"Nehmen Sie regelmäßig Schmerzmittel wie Ibuprofen oder ASS?",p:15,tr:3,h:"Gut, aber zweite Priorität",x:"NSAR sind ein relevanter Ulkus-Faktor – doch die Red Flags kommen zuerst. Er verneint übrigens."},
     {t:"Möchten Sie lieber Tabletten oder Kautabletten?",p:0,tr:-6,h:"Produktfrage vor Sicherheit",x:"Sie planen die Abgabe, bevor Sie wissen, ob abgegeben werden darf."}]}},
   {mech:"sequence",data:{scene:"assets/PCG_SCN_CUS003_C_OTS_v003.webp",kicker:"Szene 3b · Die Einnahme ordnen",title:"Bringen Sie die Anwendung des PPI in die richtige Reihenfolge:",hint:"Tippen Sie die Schritte in der Reihenfolge an, in der sie ablaufen.",okH:"Einnahme sitzt",badH:"Reihenfolge durcheinander",expl:"Der PPI wird morgens vor dem Frühstück eingenommen, weil er nur an aktiven Protonenpumpen wirkt – die werden durch die erste Mahlzeit aktiviert. Danach folgt die Wirkung über Tage, nicht Minuten. Und die Vierzehn-Tage-Grenze steht am Ende: wer sie überschreitet, gehört zum Arzt.",steps:["Morgens nüchtern, 30 Minuten vor dem Frühstück einnehmen","Kapsel unzerkaut mit Wasser schlucken","Volle Wirkung erst nach 2-3 Tagen erwarten","Auslöser reduzieren: späte Mahlzeiten, Kaffee, Alkohol","Nach 14 Tagen ohne Besserung zum Arzt"]}},
 {mech:"shelf",data:{kicker:"Szene 3 · Die Empfehlung",title:"Seit 5 Tagen abendlich, keine Red Flags, kein NSAR. Griff ins Regal:",
    boxes:[
     {n:"Omeprazol 20",s:"OTC, max. 14 Tage",col:"#1565C0",ok:true,p:20,tr:12,h:"Richtiger Griff",x:"Bei mehrtägigem, wiederkehrendem Sodbrennen ist der OTC-PPI erste Wahl: 1x täglich morgens nüchtern, maximal 14 Tage ohne Arzt."},
     {n:"Antazida",s:"Kautabletten",col:"#2E7D32",p:12,tr:4,h:"Schnell, aber kurz",x:"Wirkt in Minuten – gut für den Akutmoment, bei täglichen Beschwerden seit fünf Tagen aber zu kurz gedacht. Als Ergänzung ok."},
     {n:"Omeprazol 40",s:"hochdosiert",col:"#E65100",p:0,tr:-8,h:"Nicht ohne Rezept",x:"Die 40-mg-Stärke ist verschreibungspflichtig. Das Stärkste hat in der Selbstmedikation Grenzen."},
     {n:"Pfefferminz",s:"Dragees",col:"#00838F",p:0,tr:-6,h:"Verschlimmert es",x:"Pfefferminzöl senkt den Tonus des unteren Ösophagussphinkters – der Reflux wird schlimmer. Beliebte Laienfalle."},
     {n:"Natron",s:"Hausmittel-Pulver",col:"#F9A825",p:0,tr:-4,h:"Von gestern",x:"Säure-Rebound und CO2-Bildung – überholtes Hausmittel."},
     {n:"Ibuprofen 400",s:"Tabletten",col:"#6A1B9A",p:0,tr:-8,h:"Kontraproduktiv",x:"NSAR reizen die Magenschleimhaut – bei Sodbrennen genau die falsche Richtung."}]}},
   {mech:"truefalse",data:{scene:"assets/PCG_CU_CUS003_P05_CU-TALK_v003.webp",kicker:"Szene 4 · Schnellrunde · Tempo",title:"Er hat noch zwei Minuten. Richtig oder falsch?",trueLabel:"Richtig",falseLabel:"Falsch",okH:"Schnellrunde gemeistert",badH:"Ein paar Irrtümer",expl:"Die klassischen Sodbrennen-Irrtümer: Milch puffert nur kurz und regt danach die Säureproduktion an, Pfefferminze entspannt den unteren Ösophagussphinkter und verschlimmert den Reflux, und ein PPI wirkt nicht sofort. Richtig sind: Antazida wirken in Minuten, spätes Essen ist ein Hauptauslöser, und eine erhöhte Oberkörperlage hilft nachts messbar.",items:[{t:"Ein Glas Milch ist gut gegen Sodbrennen.",ok:false,why:"Puffert kurz, regt danach die Säureproduktion an."},{t:"Pfefferminztee beruhigt den Magen bei Reflux.",ok:false,why:"Pfefferminzöl senkt den Sphinktertonus – der Reflux wird schlimmer."},{t:"Antazida wirken innerhalb weniger Minuten.",ok:true,why:"Deshalb sind sie für den Akutmoment sinnvoll, nicht für die Dauertherapie."},{t:"Ein PPI wirkt sofort nach der ersten Tablette.",ok:false,why:"Die volle Wirkung baut sich über 2-3 Tage auf."},{t:"Späte Mahlzeiten sind ein Hauptauslöser.",ok:true,why:"Deshalb: letzte Mahlzeit 3 Stunden vor dem Hinlegen."},{t:"Mit erhöhtem Oberkörper zu schlafen bringt nichts.",ok:false,why:"Erhöhte Lage reduziert nächtlichen Reflux messbar."}]}},
 {mech:"mcq",data:{scene:"assets/PCG_SCN_CUS003_D_HANDOVER_v003.webp",kicker:"Szene 4 · Abschluss",title:"„Und wann muss ich damit zum Arzt?“",
    options:[
     {t:"Sofort bei Schluckbeschwerden, Blut oder schwarzem Stuhl, ungewolltem Gewichtsverlust. Und: wenn es nach 14 Tagen PPI nicht weg ist – oder Beschwerden neu auftreten und Sie über 55 sind.",p:25,tr:12,ok:true,h:"Sicherheit im Eilige-Format",x:"Alle relevanten Kriterien in fünfzehn Sekunden, plus der 14-Tage-Deckel des OTC-PPI. Er speichert es auf dem Weg zur Tür."},
     {t:"Wenn es nicht besser wird, kommen Sie einfach wieder.",p:5,tr:-4,h:"Zu vage",x:"Ohne konkrete Kriterien weiß er nicht, worauf er achten soll."},
     {t:"Gar nicht – das reguliert der Magen von allein.",p:0,tr:-8,h:"Falsche Sicherheit",x:"Anhaltendes Sodbrennen kann eine Refluxkrankheit oder Schlimmeres maskieren."},
     {t:"Lesen Sie einfach die Packungsbeilage.",p:5,tr:-6,h:"Delegiert",x:"Die liest er nie – das wissen Sie beide."}]}}
  ],
  badges:[
   {icon:"⚡",de:"Tempo-Berater",en:"Speed Advisor",ar:"مستشار السرعة",cond:function(s){return s.step1>=25;}},
   {icon:"🎯",de:"Eine-Frage-Meister",en:"One-Question Master",ar:"سيد السؤال الواحد",cond:function(s){return s.step2>=25;}},
   {icon:"🚩",de:"Red-Flag-Scanner",en:"Red-Flag Scanner",ar:"ماسح العلامات",cond:function(){return true;}},
   {icon:"🤝",de:"Vertrauensperson",en:"Trusted Advisor",ar:"موضع الثقة",cond:function(s){return s.trust>=70;}}
  ]
};

TOPICS.sodbrennen_eilig.steps_en=[
 {mech:"comic",data:{kicker:"Scene 1 · The customer arrives",title:"A man rushes in - jacket open, glancing back at the door",img:"assets/PCG_SCN_CUS003_A_ENTRANCE_v003.webp",cta:"React →",
  bubbles:[{who:"Customer",txt:"Quick please - <b>heartburn</b>, every evening for days. I have to leave in five minutes."},{who:"Customer",txt:"Just give me <b>the strongest thing</b> you have."}]}},
 {mech:"mcq",data:{scene:"assets/PCG_SCN_CUS003_B_COUNTER_v003.webp",kicker:"Decision",title:"He wants the strongest - now. Your reaction?",timeoutH:"Time's up",timeoutX:"He turns pointedly towards the door. The right move: promise speed, keep the lead.",
  options:[
   {t:"Coming right up - here, a proton pump inhibitor.",p:5,tr:-3,h:"Fast but blind",x:"Speed is no substitute for triage. Without a single question you don't even know if self-medication is acceptable."},
   {t:"Super quick: two targeted questions, and in one minute you'll have exactly the right thing.",p:25,tr:10,ok:true,h:"Lead + speed",x:"You take his time limit seriously AND keep professional control. Exactly the language this type understands."},
   {t:"First I need a thorough history - about ten minutes.",p:5,tr:-12,h:"Customer lost",x:"Professionally meant, communicatively fatal. He's out the door before you finish the sentence."},
   {t:"Then just grab any antacid from that shelf over there.",p:0,tr:-8,h:"Counselling abandoned",x:"You delegate your core duty to a shelf. That's selling, not pharmacy."}]}},
 {mech:"mcq",data:{scene:"assets/PCG_SCN_CUS003_C_OTS_v003.webp",kicker:"Turbo history",title:"Time for ONE question first. Which?",timeoutH:"Time's up",timeoutX:"Too slow for this one. The right move: four alarm signs in one question.",
  options:[
   {t:"Any trouble swallowing, blood in the stool, unintended weight loss - or daily symptoms for more than two weeks?",p:25,tr:10,ok:true,h:"Red flags bundled",x:"One question, four alarm signs - maximum safety per second. He denies all: five days, late business dinners, lots of coffee, stress. Self-medication acceptable."},
   {t:"What exactly did you eat last?",p:5,tr:0,h:"Side issue",x:"Triggers are interesting - but only AFTER ruling out the alarm signs."},
   {t:"Do you regularly take painkillers like ibuprofen or ASA?",p:15,tr:3,h:"Good, second priority",x:"NSAIDs are a relevant ulcer factor - but red flags come first. He denies, by the way."},
   {t:"Would you prefer tablets or chewables?",p:0,tr:-6,h:"Product before safety",x:"You plan the sale before knowing whether selling is allowed."}]}},
 {mech:"sequence",data:{scene:"assets/PCG_SCN_CUS003_C_OTS_v003.webp",kicker:"Scene 3b · Order the intake",title:"Put the PPI regimen in the correct order:",hint:"Tap the steps in the order they happen.",okH:"Regimen correct",badH:"Order muddled",expl:"The PPI is taken in the morning before breakfast because it only acts on active proton pumps - and these are activated by the first meal. The effect then builds over days, not minutes. And the fourteen-day limit comes last: whoever exceeds it belongs with a doctor.",steps:["Take in the morning, 30 minutes before breakfast","Swallow the capsule whole with water","Expect full effect only after 2-3 days","Reduce triggers: late meals, coffee, alcohol","See a doctor if no improvement after 14 days"]}},
 {mech:"shelf",data:{kicker:"Scene 3 · The recommendation",title:"Five evenings running, no red flags, no NSAIDs. Reach for the shelf:",
  boxes:[
   {n:"Omeprazole 20",s:"OTC, max 14 days",col:"#1565C0",ok:true,p:20,tr:12,h:"Right pick",x:"For recurring multi-day heartburn the OTC PPI is first choice: once daily, morning, empty stomach, max 14 days without a doctor."},
   {n:"Antacid",s:"chewables",col:"#2E7D32",p:12,tr:4,h:"Fast but short",x:"Works in minutes - fine for the acute moment, too little for five daily evenings. Ok as an add-on."},
   {n:"Omeprazole 40",s:"high dose",col:"#E65100",p:0,tr:-8,h:"Not without prescription",x:"The 40 mg strength is prescription-only. The strongest has limits in self-medication."},
   {n:"Peppermint",s:"dragees",col:"#00838F",p:0,tr:-6,h:"Makes it worse",x:"Peppermint oil lowers the pressure of the lower esophageal sphincter - reflux worsens. A popular lay trap."},
   {n:"Baking soda",s:"home remedy",col:"#F9A825",p:0,tr:-4,h:"Outdated",x:"Acid rebound and CO2 - an obsolete home remedy."},
   {n:"Ibuprofen 400",s:"tablets",col:"#6A1B9A",p:0,tr:-8,h:"Counterproductive",x:"NSAIDs irritate the gastric mucosa - exactly the wrong direction for heartburn."}]}},
 {mech:"truefalse",data:{scene:"assets/PCG_CU_CUS003_P05_CU-TALK_v003.webp",kicker:"Scene 4 · Rapid round · pace",title:"He has two minutes left. True or false?",trueLabel:"True",falseLabel:"False",okH:"Rapid round mastered",badH:"A few misconceptions",expl:"The classic heartburn misconceptions: milk buffers only briefly and then stimulates acid production, peppermint relaxes the lower esophageal sphincter and worsens reflux, and a PPI does not work immediately. Correct: antacids work within minutes, late meals are a main trigger, and sleeping with the upper body raised measurably helps.",items:[{t:"A glass of milk is good against heartburn.",ok:false,why:"Buffers briefly, then stimulates acid production."},{t:"Peppermint tea soothes the stomach in reflux.",ok:false,why:"Peppermint oil lowers sphincter tone - reflux worsens."},{t:"Antacids work within a few minutes.",ok:true,why:"Which is why they suit the acute moment, not long-term therapy."},{t:"A PPI works immediately after the first tablet.",ok:false,why:"Full effect builds over 2-3 days."},{t:"Late meals are a main trigger.",ok:true,why:"Hence: last meal 3 hours before lying down."},{t:"Sleeping with the upper body raised achieves nothing.",ok:false,why:"An elevated position measurably reduces nocturnal reflux."}]}},
 {mech:"mcq",data:{scene:"assets/PCG_SCN_CUS003_D_HANDOVER_v003.webp",kicker:"Scene 4 · Closing",title:"\u201cAnd when do I need a doctor for this?\u201d",
  options:[
   {t:"Immediately for trouble swallowing, blood or black stool, unintended weight loss. And: if it's not gone after 14 days of PPI - or symptoms are new and you're over 55.",p:25,tr:12,ok:true,h:"Safety in express format",x:"All relevant criteria in fifteen seconds, plus the 14-day cap of the OTC PPI. He memorizes it on his way out."},
   {t:"If it doesn't get better, just come back.",p:5,tr:-4,h:"Too vague",x:"Without concrete criteria he doesn't know what to watch for."},
   {t:"You don't - the stomach sorts itself out.",p:0,tr:-8,h:"False reassurance",x:"Persistent heartburn can mask reflux disease or worse."},
   {t:"Just read the package leaflet.",p:5,tr:-6,h:"Delegated",x:"He'll never read it - you both know that."}]}}
];

TOPICS.sodbrennen_eilig.steps_ar=[
 {mech:"comic",data:{kicker:"المشهد 1 · وصول الزبون",title:"رجل يدخل مسرعاً - سترته مفتوحة وعينه على الباب",img:"assets/PCG_SCN_CUS003_A_ENTRANCE_v003.webp",cta:"تصرّف ←",
  bubbles:[{who:"الزبون",txt:"بسرعة من فضلك - <b>حرقة معدة</b> كل مساء منذ أيام. عليّ المغادرة خلال خمس دقائق."},{who:"الزبون",txt:"أعطني <b>أقوى ما عندك</b> وحسب."}]}},
 {mech:"mcq",data:{scene:"assets/PCG_SCN_CUS003_B_COUNTER_v003.webp",kicker:"قرار",title:"يريد الأقوى - فوراً. ردّك؟",timeoutH:"انتهى الوقت",timeoutX:"يلتفت إلى الباب باستعراض. الصحيح كان: عِد بالسرعة واحتفظ بالقيادة.",
  options:[
   {t:"حاضر فوراً - تفضل، مثبط مضخة البروتون.",p:5,tr:-3,h:"سريع لكنه أعمى",x:"السرعة لا تعوّض الفرز. بلا سؤال واحد لا تعرف حتى إن كان العلاج الذاتي مقبولاً."},
   {t:"بسرعة تامة: سؤالان محددان، وخلال دقيقة يكون معك الصحيح تماماً.",p:25,tr:10,ok:true,h:"قيادة + سرعة",x:"أخذت وقته على محمل الجد واحتفظت بالسيطرة المهنية. هذه بالضبط اللغة التي يفهمها هذا النمط."},
   {t:"أحتاج أولاً أنامنيزه مفصلة - نحو عشر دقائق.",p:5,tr:-12,h:"خسرت الزبون",x:"صحيح مهنياً، قاتل تواصلياً. سيخرج من الباب قبل أن تُنهي جملتك."},
   {t:"خذ أي مضاد حموضة من ذاك الرف هناك.",p:0,tr:-8,h:"تخلٍّ عن الاستشارة",x:"فوّضت مهمتك الجوهرية إلى رف. هذا بيع، لا صيدلة."}]}},
 {mech:"mcq",data:{scene:"assets/PCG_SCN_CUS003_C_OTS_v003.webp",kicker:"أنامنيزه سريعة",title:"وقتك يتسع لسؤال واحد أولاً. أيّها؟",timeoutH:"انتهى الوقت",timeoutX:"أبطأ من إيقاعه. الصحيح كان: أربع علامات إنذار في سؤال واحد.",
  options:[
   {t:"هل لديك صعوبة بلع، دم في البراز، نقصان وزن غير مقصود - أو الأعراض يومية منذ أكثر من أسبوعين؟",p:25,tr:10,ok:true,h:"العلامات الحمراء في حزمة",x:"سؤال واحد، أربع علامات إنذار - أقصى أمان في الثانية. ينفي كل شيء: خمسة أيام، عشاءات عمل متأخرة، قهوة كثيرة، توتر. العلاج الذاتي مقبول."},
   {t:"ماذا أكلت آخر مرة بالضبط؟",p:5,tr:0,h:"موضوع جانبي",x:"المحفزات مهمة - لكن بعد استبعاد علامات الإنذار."},
   {t:"هل تتناول مسكنات بانتظام مثل الإيبوبروفين أو الأسبرين؟",p:15,tr:3,h:"جيد، لكنه أولوية ثانية",x:"مضادات الالتهاب عامل قرحة مهم - لكن العلامات الحمراء أولاً. وهو ينفي بالمناسبة."},
   {t:"تفضل أقراصاً أم أقراص مضغ؟",p:0,tr:-6,h:"سؤال المنتج قبل الأمان",x:"تخطط للبيع قبل أن تعرف إن كان البيع جائزاً."}]}},
 {mech:"sequence",data:{scene:"assets/PCG_SCN_CUS003_C_OTS_v003.webp",kicker:"المشهد 3ب · رتّب الاستعمال",title:"رتّب طريقة استعمال مثبط مضخة البروتون:",hint:"انقر الخطوات بالترتيب الذي تجري به.",okH:"الاستعمال سليم",badH:"الترتيب مختلّ",expl:"يُؤخذ المثبط صباحاً قبل الفطور لأنه لا يعمل إلا على المضخات النشطة – وهي تنشط بأول وجبة. ثم يتراكم المفعول على أيام لا دقائق. وحدّ الأربعة عشر يوماً في النهاية: من تجاوزه فمكانه عند الطبيب.",steps:["يؤخذ صباحاً قبل الفطور بثلاثين دقيقة","تُبلع الكبسولة كاملة مع الماء","المفعول الكامل بعد يومين إلى ثلاثة","تقليل المحفزات: الوجبات المتأخرة والقهوة والكحول","مراجعة الطبيب إن لم يتحسن خلال 14 يوماً"]}},
 {mech:"shelf",data:{kicker:"المشهد 3 · التوصية",title:"خمس أمسيات متتالية، لا علامات حمراء، لا مضادات التهاب. مدّ يدك إلى الرف:",
  boxes:[
   {n:"أوميبرازول 20",s:"OTC، حتى 14 يوماً",col:"#1565C0",ok:true,p:20,tr:12,h:"الاختيار الصحيح",x:"في الحرقة المتكررة لعدة أيام مثبط مضخة البروتون OTC هو الخيار الأول: مرة صباحاً على معدة فارغة، بحد أقصى 14 يوماً دون طبيب."},
   {n:"مضاد حموضة",s:"أقراص مضغ",col:"#2E7D32",p:12,tr:4,h:"سريع لكنه قصير",x:"يعمل خلال دقائق - جيد للحظة الحادة، وقليل لخمس أمسيات يومية. مقبول كإضافة."},
   {n:"أوميبرازول 40",s:"جرعة عالية",col:"#E65100",p:0,tr:-8,h:"ليس بلا وصفة",x:"عيار 40 ملغ بوصفة طبية فقط. «الأقوى» له حدود في العلاج الذاتي."},
   {n:"نعناع",s:"دراجيه",col:"#00838F",p:0,tr:-6,h:"يزيدها سوءاً",x:"زيت النعناع يرخي المصرة المريئية السفلى - فيزداد الارتجاع. فخ شائع لدى العامة."},
   {n:"بيكربونات الصودا",s:"وصفة منزلية",col:"#F9A825",p:0,tr:-4,h:"من الماضي",x:"ارتداد حمضي وتولّد CO2 - وصفة منزلية متجاوزة."},
   {n:"إيبوبروفين 400",s:"أقراص",col:"#6A1B9A",p:0,tr:-8,h:"عكس المطلوب",x:"مضادات الالتهاب تهيّج مخاطية المعدة - الاتجاه الخاطئ تماماً مع الحرقة."}]}},
 {mech:"truefalse",data:{scene:"assets/PCG_CU_CUS003_P05_CU-TALK_v003.webp",kicker:"المشهد 4 · جولة سريعة · إيقاع",title:"بقيت له دقيقتان. صح أم خطأ؟",trueLabel:"صح",falseLabel:"خطأ",okH:"أتقنت الجولة السريعة",badH:"بعض المفاهيم الخاطئة",expl:"مفاهيم حرقة المعدة الخاطئة الكلاسيكية: الحليب يعادل الحموضة لفترة قصيرة ثم يحفّز إفرازها، والنعناع يرخي المصرة المريئية السفلى فيزيد الارتجاع، والمثبط لا يعمل فوراً. أما الصحيح: مضادات الحموضة تعمل خلال دقائق، والوجبات المتأخرة محفّز رئيسي، ورفع الجزء العلوي من الجسم أثناء النوم يساعد فعلياً.",items:[{t:"كأس حليب مفيد ضد حرقة المعدة.",ok:false,why:"يعادل لفترة قصيرة ثم يحفّز إفراز الحمض."},{t:"شاي النعناع يهدّئ المعدة في الارتجاع.",ok:false,why:"زيت النعناع يخفض توتر المصرة – فيزداد الارتجاع سوءاً."},{t:"مضادات الحموضة تعمل خلال دقائق قليلة.",ok:true,why:"ولهذا تناسب اللحظة الحادة لا العلاج المديد."},{t:"مثبط المضخة يعمل فوراً بعد القرص الأول.",ok:false,why:"المفعول الكامل يتراكم خلال يومين إلى ثلاثة."},{t:"الوجبات المتأخرة محفّز رئيسي.",ok:true,why:"ولذلك: آخر وجبة قبل الاستلقاء بثلاث ساعات."},{t:"النوم مع رفع الجزء العلوي من الجسم لا يفيد.",ok:false,why:"الوضعية المرتفعة تقلل الارتجاع الليلي بشكل ملموس."}]}},
 {mech:"mcq",data:{scene:"assets/PCG_SCN_CUS003_D_HANDOVER_v003.webp",kicker:"المشهد 4 · الختام",title:"\u201cومتى أراجع الطبيب بسببها؟\u201d",
  options:[
   {t:"فوراً عند صعوبة البلع، دم أو براز أسود، نقصان وزن غير مقصود. وأيضاً: إن لم تزل بعد 14 يوماً من المثبط - أو ظهرت حديثاً وعمرك فوق 55.",p:25,tr:12,ok:true,h:"الأمان بصيغة المستعجل",x:"كل المعايير المهمة في خمس عشرة ثانية، مع سقف الـ14 يوماً للمثبط. سيحفظها في طريقه إلى الباب."},
   {t:"إن لم تتحسن عُد إلينا وحسب.",p:5,tr:-4,h:"مبهم",x:"بلا معايير ملموسة لا يعرف ما الذي يراقبه."},
   {t:"لا داعي - المعدة تنظم نفسها بنفسها.",p:0,tr:-8,h:"طمأنة زائفة",x:"الحرقة المستمرة قد تخفي داء ارتجاع أو أسوأ."},
   {t:"اقرأ النشرة الداخلية فقط.",p:5,tr:-6,h:"تفويض",x:"لن يقرأها أبداً - وكلاكما يعرف ذلك."}]}}
];
