// ============================================================
//  PHARMA-COACH — data.js
//  Hier alle Texte, Preise und Inhalte bearbeiten.
//  Nach jeder Änderung: Datei speichern und auf GitHub hochladen.
// ============================================================

const SITE = {

  // ── Plattform-Link (Teachable) ──────────────────────────────
  platform_url: "https://pharma-coach-amiri.de",

  // ── Preis ───────────────────────────────────────────────────
  price_eur: "80",
  price_per_de: "/ Jahr",
  price_per_en: "/ year",

  // ── Kontakt ─────────────────────────────────────────────────
  email: "ammar@pharma-coach-amiri.de",
  youtube:   "https://youtube.com/@pharma-coach",
  linkedin:  "https://linkedin.com/in/ammar-amiri",
  instagram: "https://instagram.com/pharmacoach",
  tiktok:    "https://tiktok.com/@pharmacoach",

  // ── Sprachen ────────────────────────────────────────────────
  langs: {

    de: {
      nav: {
        otc:   "OTC-Kurs",
        preis: "Preis",
        soon:  "Demnächst",
        fsp:   "FSP & Prüfung",
        about: "Über mich",
        faq:   "FAQ",
        cta:   "Zur Plattform"
      },

      hero: {
        eyebrow: "Die digitale Lernplattform für Apotheken-Teams",
        title1:  "Sicher beraten.",
        title2:  "Bei jeder Indikation.",
        sub:     "Lerne in 10–15 Minuten genau das, was du am HV-Tisch brauchst.",
        cta1:    "Jetzt zur Plattform — Kurse buchen",
        cta2:    "OTC-Kurs ansehen",
        ctaNote: "Registrierung & Kursbuchung direkt auf der Plattform"
      },


      intro: {
        label:    "Projekt-Überblick",
        title:    "Pharma-Coach im Überblick",
        duration: "02:10",
        // YouTube-ID des Projektvorstellungs-Videos (leer lassen bis fertig)
        youtube_id: ""
      },
      prob: {
        eyebrow:   "Das Problem",
        title1:    "Die Konkurrenz wächst.",
        title2:    "Dein Wissen ist dein Vorsprung.",
        body:      "Die Konkurrenz in deutschen Apotheken wächst stetig — und genau deshalb zählt heute mehr als je zuvor, was du in der Beratung wirklich kannst. Wer viel weiß, kann dem Patienten das Wichtigste kurz und klar sagen.",
        statNum:   "#1",
        statLabel: "Grund, warum Kund:innen wiederkommen: kompetente Beratung."
      },

      otc: {
        eyebrow:    "Der OTC-Kurs",
        kicker:     "Der erste Baustein von Pharma-Coach",
        title:      "OTC-Beratung — nach Körpersystem sortiert",
        sub:        "Acht Themengebiete, rund 50 Indikationen. Jedes Thema als strukturierte Video-Lektion.",
        stepsLabel: "Jedes Thema in 6 Schritten:"
      },

      // ── OTC-Kategorien (Titel + Anzahl Indikationen) ──────────
      categories: [
        { title: "Atmungssystem",    count: "5 Indikationen"  },
        { title: "Augen",            count: "3 Indikationen"  },
        { title: "Haut, Nagel & Haar", count: "15 Indikationen" },
        { title: "Magen-Darm-System", count: "7 Indikationen" },
        { title: "Mundgesundheit",   count: "3 Indikationen"  },
        { title: "Nervensystem",     count: "4 Indikationen"  },
        { title: "Sexualgesundheit", count: "3 Indikationen"  },
        { title: "Sonstige",         count: "10 Indikationen" }
      ],

      // ── Lernschritte ─────────────────────────────────────────
      steps: ["Einführung", "Symptome", "Ursachen", "Wann zum Arzt", "Beratungsfragen", "Behandlung"],

      sample: {
        badge:      "GRATIS-LEKTION",
        title:      "Ein komplettes OTC-Thema — kostenlos ansehen",
        sub:        "Schau dir eine vollständige Indikation in allen 6 Schritten an und erlebe, wie Pharma-Coach funktioniert – ganz ohne Abo.",
        cta:        "Gratis-Lektion ansehen",
        videoTitle: "Beispiel-Lektion: OTC-Beratung",
        // YouTube-Link für die Gratis-Lektion (leer lassen wenn noch nicht vorhanden)
        youtube_id: ""
      },

      price: {
        eyebrow:   "Preis",
        title:     "Ein Abo, ständig neue Inhalte",
        sub:       "Ein einziger Jahreszugang – alle OTC-Inhalte plus sämtliche neuen Kurse, die laufend hinzukommen.",
        justify:   "Weniger als 7 € pro Monat · Jederzeit kündbar",
        highlight: "Neue Inhalte werden fortlaufend ergänzt — ohne Aufpreis.",
        badge:     "Ständig neue Inhalte",
        planName:  "Pharma-Coach Jahresabo",
        note:      "Jederzeit kündbar · FSP & Kenntnisprüfung separat",
        // ── Was ist im Abo enthalten? (Liste) ─────────────────
        includes: [
          "Kompletter OTC-Kurs (rund 50 Indikationen)",
          "Alle neuen Kurse automatisch inklusive",
          "Selbsttests & Lernnachweis",
          "Web sowie iOS- & Android-App",
          "Laufende Updates & neue Videos"
        ]
      },

      // ── Für wen ───────────────────────────────────────────────
      audience: {
        eyebrow: "Zielgruppe",
        title:   "Für wen ist Pharma-Coach?",
        cards: [
          { title: "Apotheker:innen",            desc: "Beratungswissen auffrischen und am HV-Tisch sicher auftreten." },
          { title: "PTA & PKA",                  desc: "Fundierte Empfehlungen für die tägliche Selbstmedikation." },
          { title: "Filialleitungen",             desc: "Das ganze Team einheitlich und effizient weiterbilden." },
          { title: "Internationale Apotheker:innen", desc: "Gezielte Vorbereitung auf FSP & Kenntnisprüfung." }
        ]
      },

      // ── Was macht Pharma-Coach anders ────────────────────────
      diff: {
        eyebrow: "Der Unterschied",
        title:   "Was macht Pharma-Coach anders?",
        points: [
          { title: "Strukturiert",     desc: "Jede Indikation in 6 klaren Schritten." },
          { title: "Praxisnah",        desc: "Direkt aus der Offizin, nicht aus dem Lehrbuch." },
          { title: "Kompakt",          desc: "10–15 Minuten pro Lektion." },
          { title: "Sofort anwendbar", desc: "Am nächsten Tag am HV-Tisch." }
        ]
      },

      // ── Social Proof ─────────────────────────────────────────
      social: {
        eyebrow:     "Social Proof",
        title:       "Das sagen Apotheker:innen",
        placeholder: "Bewertungen folgen in Kürze — die Plattform startet im Herbst 2026."
      },

      // ── Demnächst ─────────────────────────────────────────────
      soon: {
        eyebrow:  "Demnächst",
        title:    "Das kommt als Nächstes",
        sub:      "Dein Abo wächst mit — diese Kurse sind bereits in Arbeit und im Preis enthalten.",
        included: "Im Abo enthalten",
        planned:  "Geplant",
        rxTitle:  "Rx-Beratung",
        rxDesc:   "Beratung zu verschreibungspflichtigen Arzneimitteln — Wirkung, Einnahme, Wechselwirkungen und die richtigen Worte am HV-Tisch."
      },

      // ── Geplante Kurse (nach Rx) ──────────────────────────────
      upcoming: [
        { glyph: "⚕", title: "Pflichtschulungen",  desc: "QMS, Datenschutz, Hygiene, Arbeitsschutz & Erste Hilfe." },
        { glyph: "⇄", title: "Wechselwirkungen",   desc: "Arzneimittel, Nahrungsergänzung & Heilpflanzen sicher einschätzen." },
        { glyph: "◷", title: "Fallbeispiele",      desc: "Typische Beratungssituationen aus dem Apothekenalltag." }
      ],

      // ── FSP & Kenntnisprüfung ─────────────────────────────────
      fsp: {
        eyebrow: "Für internationale Apotheker:innen",
        title:   "FSP & Kenntnisprüfung — deine Vorbereitung auf die Approbation",
        body:    "Du machst deine Anerkennung als Apotheker:in in Deutschland? Pharma-Coach bereitet dich gezielt auf die Fachsprachprüfung und die Kenntnisprüfung vor — mit Fokus auf Sprache und Wissen, das in der Prüfung und am HV-Tisch wirklich zählt.",
        badge:   "In Vorbereitung",
        cards: [
          { abbr: "FSP", title: "Fachsprachprüfung", desc: "Medizinische Kommunikation, Fachvokabular und typische Prüfungssituationen — praxisnah trainiert." },
          { abbr: "KP",  title: "Kenntnisprüfung",   desc: "Pharmakologie, Recht und Praxis — strukturiert und gezielt auf die Prüfung vorbereitet." }
        ]
      },

      // ── Über Ammar ────────────────────────────────────────────
      about: {
        eyebrow: "Über Ammar",
        name:    "Ammar Amiri",
        role:    "Apotheker & Filialleiter · Engel-Apotheke Harsewinkel",
        bio:     "Approbiert seit 2015, mit über 17 Jahren Erfahrung in Offizin und Pharma-Marketing. MBA-Absolvent und Hauptautor von 'Dein Ratgeber für die Deutsche Approbation als Apotheker'.",
        chips:   ["Approbiert seit 2015", "17+ Jahre Erfahrung", "Filialleiter einer Apotheke in NRW", "MBA", "Autor: Approbations-Ratgeber"],
        cta:     "Mehr über Ammar"
      },

      // ── FAQ ───────────────────────────────────────────────────
      faq: {
        eyebrow: "FAQ",
        title:   "Häufig gestellte Fragen"
      },

      faqs: [
        { q: "Für wen ist Pharma-Coach gedacht?",
          a: "Pharma-Coach richtet sich an Apotheker:innen und PTA in Deutschland – besonders an Kolleg:innen, die ihre Beratung am HV-Tisch sicherer und strukturierter gestalten möchten. Auch internationale Apotheker:innen in der Anerkennung profitieren von den praxisnahen Inhalten." },
        { q: "Wie sind die Kurse aufgebaut?",
          a: "Jede Lektion folgt derselben klaren Struktur: Einführung · Symptome · Ursachen · Wann zum Arzt? · Beratungsfragen · Behandlung. So findest du dich in jedem Thema sofort zurecht." },
        { q: "Wie lange dauert eine Lektion?",
          a: "Die meisten Lektionen dauern zwischen 10 und 15 Minuten und konzentrieren sich auf das Wesentliche für die Praxis." },
        { q: "Kann ich die Inhalte jederzeit ansehen?",
          a: "Ja. Du kannst die Kurse jederzeit und beliebig oft ansehen – am Computer, Tablet oder Smartphone." },
        { q: "Gibt es ein Zertifikat?",
          a: "Nach Abschluss eines Kurses erhältst du einen Teilnahme- bzw. Lernnachweis. Offizielle Fortbildungspunkte sind für zukünftige Ausbaustufen geplant." },
        { q: "Was kostet der Zugang?",
          a: "Der Jahreszugang kostet 80 € und beinhaltet alle aktuell verfügbaren OTC-Kurse sowie alle neuen Inhalte, die während deiner Laufzeit veröffentlicht werden." },
        { q: "Muss ich pharmazeutische Vorkenntnisse haben?",
          a: "Ja. Pharma-Coach ist kein Gesundheitsportal für Patient:innen, sondern wurde speziell für Mitarbeitende in Apotheken entwickelt." },
        { q: "Werden regelmäßig neue Inhalte veröffentlicht?",
          a: "Ja. Die Plattform wird kontinuierlich erweitert. Geplant sind unter anderem Rx-Beratung, Wechselwirkungen, Pflichtschulungen und Fallbeispiele." },
        { q: "Bereitet Pharma-Coach auf die Approbation vor?",
          a: "Die aktuelle Plattform konzentriert sich auf die praktische Beratung in der Apotheke. Spezielle Kurse für Fachsprachprüfung und Kenntnisprüfung befinden sich bereits in Vorbereitung." },
        { q: "Ist Pharma-Coach auch für erfahrene Apotheker:innen geeignet?",
          a: "Ja. Viele Inhalte dienen nicht nur dem Wissensaufbau, sondern auch der Strukturierung und Auffrischung von Beratungsabläufen im Apothekenalltag." },
        { q: "Wodurch unterscheidet sich Pharma-Coach von Büchern?",
          a: "Bücher vermitteln Wissen. Pharma-Coach zeigt, wie dieses Wissen in der Beratung am HV-Tisch praktisch angewendet wird – kompakt, strukturiert und sofort umsetzbar." },
        { q: "Kann ich mein Abonnement kündigen?",
          a: "Ja. Das Abonnement kann jederzeit zum Ende der Laufzeit beendet werden. Es gibt keine langfristige Bindung." },
        { q: "Kann ich Pharma-Coach vor dem Kauf testen?",
          a: "Ja. Eine kostenlose Beispiel-Lektion steht zur Verfügung, damit du Aufbau, Qualität und Lernstil vorab kennenlernen kannst." }
      ],

      // ── Footer ────────────────────────────────────────────────
      footer: {
        tagline:    "Strukturierte Beratungs-Fortbildung für Apotheken-Teams.",
        kurseTitle: "Kurse",
        mehrTitle:  "Mehr",
        follow:     "FOLGEN",
        contact:    "Schreib mir",
        imprint:    "Impressum",
        privacy:    "Datenschutz",
        kurse: [
          { href: "#otc",        label: "OTC-Beratung" },
          { href: "#demnaechst", label: "Rx-Beratung (Geplant)" },
          { href: "#demnaechst", label: "Wechselwirkungen (Geplant)" },
          { href: "#demnaechst", label: "Medikationsanalyse (Geplant)" },
          { href: "#demnaechst", label: "Fallstudien (Geplant)" },
          { href: "#fsp",        label: "FSP & Kenntnisprüfung (Geplant)" }
        ],
        mehr: [
          { href: "#preis", label: "Preis" },
          { href: "#about", label: "Über Ammar" },
          { href: "mailto:ammar@pharma-coach-amiri.de", label: "Kontakt" }
        ]
      }
    }, // Ende DE

    en: {
      nav: {
        otc:   "OTC Course",
        preis: "Pricing",
        soon:  "Coming Soon",
        fsp:   "FSP & Exam",
        about: "About",
        faq:   "FAQ",
        cta:   "Go to Platform"
      },
      hero: {
        eyebrow: "The digital learning platform for pharmacy teams",
        title1:  "Advise confidently.",
        title2:  "For every indication.",
        sub:     "Learn in 10–15 minutes exactly what you need at the dispensing counter.",
        cta1:    "Go to Platform — Book Courses",
        cta2:    "View OTC Course",
        ctaNote: "Registration & course booking directly on the platform"
      },

      intro: {
        label:    "Project Overview",
        title:    "Pharma-Coach at a Glance",
        duration: "02:10",
        youtube_id: ""
      },
      prob: {
        eyebrow:   "The Problem",
        title1:    "Competition is growing.",
        title2:    "Your knowledge is your edge.",
        body:      "Competition among German pharmacies is growing steadily — and that is why today, more than ever, what you can truly do in consultation counts. Those who know a lot can tell patients the most important thing briefly and clearly.",
        statNum:   "#1",
        statLabel: "Reason customers return: competent consultation."
      },
      otc: {
        eyebrow:    "The OTC Course",
        kicker:     "The first building block of Pharma-Coach",
        title:      "OTC Counselling — sorted by body system",
        sub:        "Eight topic areas, around 50 indications. Each topic as a structured video lesson.",
        stepsLabel: "Each topic in 6 steps:"
      },
      categories: [
        { title: "Respiratory system",  count: "5 indications"  },
        { title: "Eyes",                count: "3 indications"  },
        { title: "Skin, Nail & Hair",   count: "15 indications" },
        { title: "Gastrointestinal",    count: "7 indications"  },
        { title: "Oral health",         count: "3 indications"  },
        { title: "Nervous system",      count: "4 indications"  },
        { title: "Sexual health",       count: "3 indications"  },
        { title: "Other",               count: "10 indications" }
      ],
      steps: ["Introduction", "Symptoms", "Causes", "When to see a doctor", "Consultation questions", "Treatment"],
      sample: {
        badge:      "FREE LESSON",
        title:      "One complete OTC topic — watch for free",
        sub:        "Watch a full indication across all 6 steps and see how Pharma-Coach works — without a subscription.",
        cta:        "Watch free lesson",
        videoTitle: "Sample Lesson: OTC Counselling",
        youtube_id: ""
      },
      price: {
        eyebrow:   "Pricing",
        title:     "One subscription, constantly new content",
        sub:       "A single annual access — all OTC content plus all new courses that are continuously added.",
        justify:   "Less than €7 per month · Cancel any time",
        highlight: "New content is added continuously — at no extra cost.",
        badge:     "Constantly new content",
        planName:  "Pharma-Coach Annual Plan",
        note:      "Cancel any time · FSP & Kenntnisprüfung separate",
        includes: [
          "Complete OTC course (around 50 indications)",
          "All new courses automatically included",
          "Self-tests & learning certificate",
          "Web plus iOS & Android app",
          "Ongoing updates & new videos"
        ]
      },
      audience: {
        eyebrow: "Target Audience",
        title:   "Who is Pharma-Coach for?",
        cards: [
          { title: "Pharmacists",           desc: "Refresh consultation knowledge and advise confidently at the counter." },
          { title: "Pharmacy technicians",  desc: "Well-founded recommendations for daily self-medication." },
          { title: "Branch managers",       desc: "Train the whole team consistently and efficiently." },
          { title: "International pharmacists", desc: "Targeted preparation for FSP & Kenntnisprüfung." }
        ]
      },
      diff: {
        eyebrow: "The Difference",
        title:   "What makes Pharma-Coach different?",
        points: [
          { title: "Structured",            desc: "Every indication in 6 clear steps." },
          { title: "Practical",             desc: "Directly from the pharmacy, not from the textbook." },
          { title: "Compact",               desc: "10–15 minutes per lesson." },
          { title: "Immediately applicable",desc: "The next day at the dispensing counter." }
        ]
      },
      social: {
        eyebrow:     "Social Proof",
        title:       "What pharmacists say",
        placeholder: "Reviews coming soon — the platform launches in autumn 2026."
      },
      soon: {
        eyebrow:  "Coming Soon",
        title:    "What's next",
        sub:      "Your subscription grows with you — these courses are already in development and included in the price.",
        included: "Included in subscription",
        planned:  "Planned",
        rxTitle:  "Rx Counselling",
        rxDesc:   "Advice on prescription medications — effects, dosage, interactions and the right words at the dispensing counter."
      },
      upcoming: [
        { glyph: "⚕", title: "Mandatory training", desc: "QMS, data protection, hygiene, occupational safety & first aid." },
        { glyph: "⇄", title: "Drug interactions",  desc: "Safely assess medications, food supplements & medicinal plants." },
        { glyph: "◷", title: "Case studies",       desc: "Typical consultation situations from everyday pharmacy practice." }
      ],
      fsp: {
        eyebrow: "For international pharmacists",
        title:   "FSP & Kenntnisprüfung — your preparation for approbation",
        body:    "Are you getting your recognition as a pharmacist in Germany? Pharma-Coach prepares you specifically for the Fachsprachprüfung and Kenntnisprüfung — with focus on language and knowledge that truly counts in the exam and at the counter.",
        badge:   "In preparation",
        cards: [
          { abbr: "FSP", title: "Fachsprachprüfung", desc: "Medical communication, technical vocabulary and typical exam situations — trained in a practical way." },
          { abbr: "KP",  title: "Kenntnisprüfung",   desc: "Pharmacology, law and practice — structured and targeted exam preparation." }
        ]
      },
      about: {
        eyebrow: "About Ammar",
        name:    "Ammar Amiri",
        role:    "Pharmacist & Branch Manager · Engel-Apotheke Harsewinkel",
        bio:     "Licensed since 2015, with over 17 years of experience in pharmacy and pharmaceutical marketing. MBA graduate and lead author of 'Your Guide to German Approbation as a Pharmacist'.",
        chips:   ["Licensed since 2015", "17+ years experience", "Branch manager of a pharmacy in NRW", "MBA", "Author: Approbation Guide"],
        cta:     "More about Ammar"
      },
      faq: {
        eyebrow: "FAQ",
        title:   "Frequently asked questions"
      },
      faqs: [
        { q: "Who is Pharma-Coach for?",
          a: "Pharma-Coach is aimed at pharmacists and pharmacy technicians in Germany – especially colleagues who want to make their consultation at the dispensing counter more confident and structured. International pharmacists in the recognition process also benefit from the practical content." },
        { q: "How are the courses structured?",
          a: "Each lesson follows the same clear structure: Introduction · Symptoms · Causes · When to see a doctor? · Consultation questions · Treatment." },
        { q: "How long does a lesson take?",
          a: "Most lessons take between 10 and 15 minutes and focus on what is essential for practice." },
        { q: "Can I watch the content at any time?",
          a: "Yes. You can watch the courses at any time and as often as you like – on a computer, tablet or smartphone." },
        { q: "Is there a certificate?",
          a: "After completing a course you receive a participation or learning certificate. Official continuing education credits are planned for future stages." },
        { q: "What does access cost?",
          a: "Annual access costs €80 and includes all currently available OTC courses plus all new content published during your subscription period." },
        { q: "Do I need pharmaceutical background knowledge?",
          a: "Yes. Pharma-Coach is not a health portal for patients, but was developed specifically for pharmacy staff." },
        { q: "Is new content published regularly?",
          a: "Yes. The platform is continuously expanded. Rx counselling, drug interactions, mandatory training and case studies are planned among others." },
        { q: "Does Pharma-Coach prepare for approbation?",
          a: "The current platform focuses on practical counselling in the pharmacy. Special courses for the Fachsprachprüfung and Kenntnisprüfung are already in preparation." },
        { q: "Is Pharma-Coach also suitable for experienced pharmacists?",
          a: "Yes. Many contents serve not only knowledge building, but also the structuring and refreshing of consultation procedures in everyday pharmacy life." },
        { q: "How does Pharma-Coach differ from books?",
          a: "Books convey knowledge. Pharma-Coach shows how this knowledge is practically applied in consultation at the dispensing counter – compact, structured and immediately applicable." },
        { q: "Can I cancel my subscription?",
          a: "Yes. The subscription can be cancelled at any time at the end of the subscription period." },
        { q: "Can I try Pharma-Coach before buying?",
          a: "Yes. A free sample lesson is available so you can get to know the structure, quality and learning style in advance." }
      ],
      footer: {
        tagline:    "Structured consultation training for pharmacy teams.",
        kurseTitle: "Courses",
        mehrTitle:  "More",
        follow:     "FOLLOW",
        contact:    "Write to me",
        imprint:    "Imprint",
        privacy:    "Privacy",
        kurse: [
          { href: "#otc",        label: "OTC counselling" },
          { href: "#demnaechst", label: "Rx counselling (Planned)" },
          { href: "#demnaechst", label: "Drug interactions (Planned)" },
          { href: "#demnaechst", label: "Medication review (Planned)" },
          { href: "#demnaechst", label: "Case studies (Planned)" },
          { href: "#fsp",        label: "FSP & Kenntnisprüfung (Planned)" }
        ],
        mehr: [
          { href: "#preis", label: "Pricing" },
          { href: "#about", label: "About Ammar" },
          { href: "mailto:ammar@pharma-coach-amiri.de", label: "Contact" }
        ]
      }
    } // Ende EN

  } // Ende langs
}; // Ende SITE
