window.PCQmsChapters=window.PCQmsChapters||{};
window.PCQmsChapters.ch01={
  "id": "ch01",
  "titel": {
    "de": "System & Verantwortung",
    "en": "System & responsibility",
    "ar": "النظام والمسؤوليات"
  },
  "card": "assets/QMS/qms_card_ch01.webp",
  "einleitung": {
    "de": "Das Handbuch hält nur, wenn jemand es hält: Wer ist wofür zuständig, welche Version gilt, und wann schaut die Apotheke auf ihr eigenes Jahr zurück?",
    "en": "The handbook only holds if someone holds it: who is responsible for what, which version is valid, and when does the pharmacy look back on its own year?",
    "ar": "الكتيّب لا يصمد إلا إذا حمله أحد: من المسؤول عن ماذا، وأي نسخة سارية، ومتى تراجع الصيدلية سنتها؟"
  },
  "ereignisse": [
    {
      "id": "q01_01",
      "monat": 1,
      "typ": "zuordnung",
      "profil": "immer",
      "img": "assets/QMS/qms_ev_ch01_01.webp",
      "quelle": "§§ 2, 2a, 3, 7, 34 ApBetrO",
      "titel": {
        "de": "Wer macht was?",
        "en": "Who does what?",
        "ar": "من يفعل ماذا؟"
      },
      "text": {
        "de": "Januar. Die Zuständigkeitsliste im Handbuch ist drei Jahre alt; zwei der genannten Personen arbeiten nicht mehr hier. Du verteilst die Aufgaben neu – nach Rollen, nicht nach Namen.",
        "en": "January. The responsibility list in the handbook is three years old; two of the people named no longer work here. You reassign the tasks – by role, not by name.",
        "ar": "يناير. قائمة المسؤوليات في الكتيّب عمرها ثلاث سنوات، واثنان ممن ذُكروا فيها لم يعودا يعملان هنا. ستعيد توزيع المهام، بحسب الأدوار لا الأسماء."
      },
      "rollen": [
        "leitung",
        "apotheker",
        "pta",
        "pka",
        "bote",
        "reinigung"
      ],
      "aufgaben": [
        {
          "id": "t1",
          "text": {
            "de": "SOPs und QM-Handbuch freigeben",
            "en": "Approve SOPs and the QM handbook",
            "ar": "الإفراج عن الإجراءات وكتيّب الجودة"
          },
          "richtig": [
            "leitung"
          ],
          "moeglich": [],
          "verboten": [
            "pka",
            "bote",
            "reinigung"
          ],
          "erkl": {
            "de": "Das QMS verantwortet die Apothekenleitung (§ 2a ApBetrO).",
            "en": "The pharmacy manager is responsible for the QMS (§ 2a ApBetrO).",
            "ar": "نظام إدارة الجودة (QMS) مسؤولية المدير (المادة 2a)."
          }
        },
        {
          "id": "t2",
          "text": {
            "de": "Plausibilitätsprüfung einer Rezeptur",
            "en": "Plausibility check of a compounding prescription",
            "ar": "فحص معقولية وصفة تحضير"
          },
          "richtig": [
            "apotheker",
            "leitung"
          ],
          "moeglich": [],
          "verboten": [
            "pta",
            "pka",
            "bote",
            "reinigung"
          ],
          "erkl": {
            "de": "Nur ein Apotheker darf die Plausibilität prüfen.",
            "en": "Only a pharmacist may check plausibility.",
            "ar": "فحص المعقولية للصيدلي وحده."
          }
        },
        {
          "id": "t3",
          "text": {
            "de": "Freigabe einer hergestellten Rezeptur",
            "en": "Release of a compounded medicine",
            "ar": "الإفراج عن تحضير منتهٍ"
          },
          "richtig": [
            "apotheker",
            "leitung"
          ],
          "moeglich": [],
          "verboten": [
            "pta",
            "pka",
            "bote",
            "reinigung"
          ],
          "erkl": {
            "de": "Herstellen darf die PTA – freigeben nur der Apotheker.",
            "en": "The PTA may compound – only the pharmacist may release.",
            "ar": "الـPTA يحضّر، والإفراج للصيدلي وحده."
          }
        },
        {
          "id": "t4",
          "text": {
            "de": "Wochendosetten für das Pflegeheim stellen",
            "en": "Fill weekly pill organizers for the care home",
            "ar": "تجهيز علب الجرعات الأسبوعية لدار المسنين"
          },
          "richtig": [
            "pta",
            "apotheker"
          ],
          "moeglich": [
            "leitung"
          ],
          "verboten": [
            "pka",
            "bote",
            "reinigung"
          ],
          "erkl": {
            "de": "Stellen ist pharmazeutische Tätigkeit – PTA oder Apotheker.",
            "en": "Filling is a pharmaceutical activity – PTA or pharmacist.",
            "ar": "التجهيز عمل صيدلاني: الـPTA أو الصيدلي."
          }
        },
        {
          "id": "t5",
          "text": {
            "de": "Bestellung und Abgleich des Lieferscheins beim Wareneingang",
            "en": "Ordering and matching the delivery note at goods receipt",
            "ar": "الطلب ومطابقة إشعار التسليم عند الاستلام"
          },
          "richtig": [
            "pka"
          ],
          "moeglich": [
            "pta",
            "apotheker",
            "leitung"
          ],
          "verboten": [
            "bote",
            "reinigung"
          ],
          "erkl": {
            "de": "Logistik ist die Kernaufgabe der PKA; die Stichprobenprüfung bleibt beim pharmazeutischen Personal.",
            "en": "Logistics is the PKA's core task; the sample check stays with pharmaceutical staff.",
            "ar": "اللوجستيات المهمة الأساسية للـPKA، والفحص بالعيّنة يبقى للطاقم الصيدلاني."
          }
        },
        {
          "id": "t6",
          "text": {
            "de": "Zustellung an der Haustür mit Übergabe an den Patienten",
            "en": "Delivery at the door with hand-over to the patient",
            "ar": "التسليم عند باب البيت للمريض"
          },
          "richtig": [
            "bote"
          ],
          "moeglich": [
            "pta",
            "apotheker",
            "pka",
            "leitung"
          ],
          "verboten": [
            "reinigung"
          ],
          "erkl": {
            "de": "Der Bote übergibt – beraten tut er nicht.",
            "en": "The courier hands over – he does not counsel.",
            "ar": "السائق يسلّم، ولا يستشير."
          }
        },
        {
          "id": "t7",
          "text": {
            "de": "Tägliche Reinigung nach Hygieneplan in Verkaufsraum und Pausenraum",
            "en": "Daily cleaning per hygiene plan in the sales room and staff room",
            "ar": "التنظيف اليومي بحسب خطة النظافة في صالة البيع وغرفة الاستراحة"
          },
          "richtig": [
            "reinigung"
          ],
          "moeglich": [
            "pka",
            "pta"
          ],
          "verboten": [],
          "erkl": {
            "de": "Die Reinigungskraft arbeitet nach dem Plan; die Rezeptur reinigt das Rezepturteam selbst.",
            "en": "The cleaner works by the plan; the compounding room is cleaned by the compounding team.",
            "ar": "عاملة التنظيف تعمل بحسب الخطة، ومكان التحضير (Rezeptur) ينظّفه فريقه."
          }
        }
      ],
      "lernpunkt": {
        "de": "Zuständigkeiten gehören zu Rollen. Namen kommen und gehen.",
        "en": "Responsibilities belong to roles. Names come and go.",
        "ar": "المسؤوليات للأدوار. والأسماء تأتي وتذهب."
      },
      "vorfall": "v01_01"
    },
    {
      "id": "q01_02",
      "monat": 3,
      "typ": "ereignis",
      "profil": "immer",
      "img": "assets/QMS/qms_ev_ch01_02.webp",
      "quelle": "§ 2a ApBetrO",
      "titel": {
        "de": "Zwei Versionen",
        "en": "Two versions",
        "ar": "نسختان"
      },
      "text": {
        "de": "März. Auf dem Schreibtisch liegen zwei Fassungen derselben SOP – die alte und die neue. Niemand weiß sicher, welche gilt.",
        "en": "March. Two versions of the same SOP lie on the desk – the old and the new. Nobody knows for sure which is valid.",
        "ar": "مارس. على المكتب نسختان من الإجراء نفسه: القديمة والجديدة، ولا أحد يعرف يقيناً أيهما السارية."
      },
      "fragen": [
        {
          "key": "massnahme",
          "frage": {
            "de": "Was ändert sich im Handbuch?",
            "en": "What changes in the handbook?",
            "ar": "ما الذي يتغيّر في الكتيّب؟"
          },
          "optionen": [
            {
              "id": "a",
              "stufe": "richtig",
              "text": {
                "de": "Lenkung der Dokumente regeln: Versionsnummer und Datum auf jeder SOP, ein Verteiler, und alte Versionen werden eingezogen und als ungültig archiviert.",
                "en": "Regulate document control: version number and date on every SOP, a distribution list, and old versions are withdrawn and archived as invalid.",
                "ar": "تنظيم ضبط الوثائق: رقم إصدار وتاريخ على كل إجراء، وقائمة توزيع، وسحب النسخ القديمة وأرشفتها بوصفها غير سارية."
              },
              "erkl": {
                "de": "Eine neue SOP hilft nur, wenn die alte verschwindet.",
                "en": "A new SOP only helps if the old one disappears.",
                "ar": "الإجراء الجديد لا ينفع إلا إذا اختفى القديم."
              }
            },
            {
              "id": "b",
              "stufe": "teil",
              "text": {
                "de": "Die alte Version wegwerfen.",
                "en": "Throw the old version away.",
                "ar": "رمي النسخة القديمة."
              },
              "erkl": {
                "de": "Heute ist es klar – bei der nächsten Änderung liegen wieder zwei Fassungen herum.",
                "en": "Today it is clear – at the next change two versions lie around again.",
                "ar": "اليوم الأمر واضح، وعند التعديل القادم ستكون هناك نسختان من جديد."
              }
            },
            {
              "id": "c",
              "stufe": "falsch",
              "text": {
                "de": "Beide liegen lassen – die Kollegen wissen ja, welche neu ist.",
                "en": "Leave both – colleagues know which is new.",
                "ar": "ترك النسختين، فالزملاء يعرفون أيهما الجديدة."
              },
              "erkl": {
                "de": "Genau das weiß gerade niemand sicher.",
                "en": "That is exactly what nobody knows for sure right now.",
                "ar": "هذا بالضبط ما لا يعرفه أحد يقيناً الآن."
              }
            }
          ]
        },
        {
          "key": "wer",
          "frage": {
            "de": "Wer muss handeln?",
            "en": "Who needs to act?",
            "ar": "من يجب أن يتصرّف؟"
          },
          "optionen": [
            {
              "id": "a",
              "stufe": "richtig",
              "text": {
                "de": "Die für das Handbuch zuständige Person; das Team erfährt, wo die gültige Fassung liegt.",
                "en": "The person responsible for the handbook; the team learns where the valid version is.",
                "ar": "المسؤول عن الكتيّب، والفريق يُعلَم بمكان النسخة السارية."
              },
              "erkl": {
                "de": "Die Lenkung trägt eine Person. Alle anderen brauchen nur den Weg zur gültigen Fassung.",
                "en": "One person owns document control. Everyone else only needs the way to the valid version.",
                "ar": "ضبط الوثائق يحمله شخص واحد، والبقية يحتاجون فقط معرفة مكان النسخة السارية."
              }
            },
            {
              "id": "b",
              "stufe": "falsch",
              "text": {
                "de": "Alle, mit einer neuen Unterweisung zu jeder SOP.",
                "en": "Everyone, with a new instruction on every SOP.",
                "ar": "الجميع، مع تعليم جديد لكل إجراء."
              },
              "erkl": {
                "de": "Am Inhalt der SOPs hat sich nichts geändert.",
                "en": "Nothing in the content of the SOPs has changed.",
                "ar": "لم يتغيّر شيء في مضمون الإجراءات."
              }
            },
            {
              "id": "c",
              "stufe": "falsch",
              "text": {
                "de": "Niemand.",
                "en": "Nobody.",
                "ar": "لا أحد."
              },
              "erkl": {
                "de": "Dann liegen bald drei Versionen herum.",
                "en": "Then three versions will soon lie around.",
                "ar": "حينها ستكون هناك ثلاث نسخ قريباً."
              }
            }
          ]
        }
      ],
      "lernpunkt": {
        "de": "Was gilt, muss man finden können – und was nicht mehr gilt, darf man nicht mehr finden.",
        "en": "What is valid must be findable – and what is no longer valid must not be.",
        "ar": "السارية يجب أن تُوجد بسهولة، وغير السارية يجب ألا تُوجد."
      },
      "vorfall": "v01_02"
    },
    {
      "id": "q01_03",
      "monat": 5,
      "typ": "ereignis",
      "profil": "immer",
      "img": "assets/QMS/qms_ev_ch01_03.webp",
      "quelle": "§ 2a ApBetrO",
      "titel": {
        "de": "Drei leere Zeilen",
        "en": "Three empty lines",
        "ar": "ثلاثة أسطر فارغة"
      },
      "text": {
        "de": "Mai. Eine neue SOP gilt seit sechs Wochen. Auf der Unterweisungsliste fehlen noch drei Unterschriften – zwei Teilzeitkräfte und eine Kollegin aus der Elternzeit.",
        "en": "May. A new SOP has been valid for six weeks. Three signatures are still missing on the instruction list – two part-timers and a colleague back from parental leave.",
        "ar": "مايو. إجراء جديد ساري منذ ستة أسابيع، وما زالت ثلاثة تواقيع ناقصة في قائمة التعليم: موظفان بدوام جزئي، وزميلة عائدة من إجازة الأمومة."
      },
      "fragen": [
        {
          "key": "massnahme",
          "frage": {
            "de": "Was ändert sich im Handbuch?",
            "en": "What changes in the handbook?",
            "ar": "ما الذي يتغيّر في الكتيّب؟"
          },
          "optionen": [
            {
              "id": "a",
              "stufe": "richtig",
              "text": {
                "de": "Nichts an der SOP. Die drei werden mit Frist unterwiesen und unterschreiben; wer zurückkehrt, wird künftig vor dem ersten Dienst unterwiesen.",
                "en": "Nothing in the SOP. The three are instructed with a deadline and sign; anyone returning is instructed before their first shift from now on.",
                "ar": "لا شيء في الإجراء. الثلاثة يُعلَّمون بمهلة محددة ويوقّعون، ومن يعود من غياب يُعلَّم مستقبلاً قبل أول دوام له."
              },
              "erkl": {
                "de": "Die SOP stimmt. Es fehlen Menschen, nicht Regeln.",
                "en": "The SOP is right. People are missing, not rules.",
                "ar": "الإجراء صحيح. الناقص أشخاص لا قواعد."
              }
            },
            {
              "id": "b",
              "stufe": "teil",
              "text": {
                "de": "Den dreien die SOP per E-Mail schicken.",
                "en": "Email the SOP to the three.",
                "ar": "إرسال الإجراء للثلاثة بالبريد الإلكتروني."
              },
              "erkl": {
                "de": "Geschickt ist nicht gelesen, und gelesen ist nicht unterwiesen.",
                "en": "Sent is not read, and read is not instructed.",
                "ar": "المُرسل ليس مقروءاً، والمقروء ليس تعليماً."
              }
            },
            {
              "id": "c",
              "stufe": "falsch",
              "text": {
                "de": "Die Liste so lassen – sie haben es ja mündlich mitbekommen.",
                "en": "Leave the list – they heard about it verbally.",
                "ar": "ترك القائمة كما هي، فقد سمعوا بالأمر شفهياً."
              },
              "erkl": {
                "de": "Ohne Nachweis ist für die Aufsicht niemand unterwiesen.",
                "en": "Without a record nobody is instructed as far as the inspector is concerned.",
                "ar": "من دون إثبات لا أحد تلقّى التعليم في نظر المفتّش."
              }
            }
          ]
        },
        {
          "key": "wer",
          "frage": {
            "de": "Wer muss handeln?",
            "en": "Who needs to act?",
            "ar": "من يجب أن يتصرّف؟"
          },
          "optionen": [
            {
              "id": "a",
              "stufe": "richtig",
              "text": {
                "de": "Die drei und die Person, die unterweist.",
                "en": "The three and the person who instructs.",
                "ar": "الثلاثة، ومن يعلّمهم."
              },
              "erkl": {
                "de": "Vier Personen, eine Aufgabe – der Rest des Teams ist erledigt.",
                "en": "Four people, one task – the rest of the team is done.",
                "ar": "أربعة أشخاص ومهمة واحدة، وبقية الفريق أنهى ما عليه."
              }
            },
            {
              "id": "b",
              "stufe": "falsch",
              "text": {
                "de": "Das ganze Team noch einmal.",
                "en": "The whole team again.",
                "ar": "كل الفريق من جديد."
              },
              "erkl": {
                "de": "Die anderen haben längst unterschrieben.",
                "en": "The others signed long ago.",
                "ar": "الآخرون وقّعوا منذ زمن."
              }
            },
            {
              "id": "c",
              "stufe": "falsch",
              "text": {
                "de": "Die Apothekenleitung allein.",
                "en": "The manager alone.",
                "ar": "المدير وحده."
              },
              "erkl": {
                "de": "Die Leitung kann nicht für andere unterschreiben.",
                "en": "The manager cannot sign for others.",
                "ar": "المدير لا يستطيع التوقيع عن غيره."
              }
            }
          ]
        }
      ],
      "lernpunkt": {
        "de": "Eine SOP gilt für jeden erst ab seiner eigenen Unterschrift.",
        "en": "An SOP applies to each person only from their own signature.",
        "ar": "الإجراء يسري على كل شخص من لحظة توقيعه هو."
      },
      "vorfall": null
    },
    {
      "id": "q01_04",
      "monat": 7,
      "typ": "ereignis",
      "profil": "immer",
      "img": "assets/QMS/qms_ev_ch01_04.webp",
      "quelle": "§ 2a ApBetrO",
      "titel": {
        "de": "Das ungeöffnete Paket",
        "en": "The unopened parcel",
        "ar": "الطرد المغلق"
      },
      "text": {
        "de": "Juli. Das Paket für den Ringversuch liegt seit vier Wochen ungeöffnet in der Rezeptur. Jeder dachte, jemand anderes kümmere sich darum. Auch die Selbstinspektion hat in diesem Jahr niemand terminiert.",
        "en": "July. The proficiency-test parcel has been lying unopened in the compounding room for four weeks. Everyone thought someone else was dealing with it. Nobody has scheduled this year's self-inspection either.",
        "ar": "يوليو. طرد اختبار المقارنة مغلق في مكان التحضير (Rezeptur) منذ أربعة أسابيع، وكل واحد ظنّ أن غيره سيتولاه. ولم يحدّد أحد موعداً للتفتيش الذاتي هذا العام أيضاً."
      },
      "fragen": [
        {
          "key": "massnahme",
          "frage": {
            "de": "Was ändert sich im Handbuch?",
            "en": "What changes in the handbook?",
            "ar": "ما الذي يتغيّر في الكتيّب؟"
          },
          "optionen": [
            {
              "id": "a",
              "stufe": "richtig",
              "text": {
                "de": "Einen QMS-Jahresplan ins Handbuch: Selbstinspektion, Ringversuche, Geräteprüfungen und Unterweisungen – jeweils mit Termin und Zuständigem.",
                "en": "Add a QMS annual plan to the handbook: self-inspection, proficiency tests, device checks and instructions – each with date and owner.",
                "ar": "إضافة خطة سنوية لنظام إدارة الجودة (QMS) إلى الكتيّب: التفتيش الذاتي، واختبارات المقارنة، وفحص الأجهزة، والتعليم، ولكل منها موعد ومسؤول."
              },
              "erkl": {
                "de": "Alles, was jährlich wiederkehrt, braucht einen Platz im Kalender und einen Namen daneben.",
                "en": "Everything that recurs yearly needs a place in the calendar and a name next to it.",
                "ar": "كل ما يتكرر سنوياً يحتاج مكاناً في التقويم واسماً بجانبه."
              }
            },
            {
              "id": "b",
              "stufe": "teil",
              "text": {
                "de": "Das Paket jetzt sofort bearbeiten.",
                "en": "Process the parcel right now.",
                "ar": "معالجة الطرد فوراً الآن."
              },
              "erkl": {
                "de": "Vielleicht noch rechtzeitig – aber die Selbstinspektion bleibt weiter ohne Termin.",
                "en": "Perhaps still in time – but the self-inspection still has no date.",
                "ar": "ربما ما زال الوقت كافياً، لكن التفتيش الذاتي يبقى بلا موعد."
              }
            },
            {
              "id": "c",
              "stufe": "falsch",
              "text": {
                "de": "Die Teilnahme am Ringversuch abmelden.",
                "en": "Withdraw from the proficiency test.",
                "ar": "الانسحاب من اختبار المقارنة."
              },
              "erkl": {
                "de": "Externe Qualitätsprüfung gehört zum QMS – Abmelden löst nichts.",
                "en": "External quality checks are part of the QMS – withdrawing solves nothing.",
                "ar": "ضبط الجودة الخارجي جزء من نظام إدارة الجودة (QMS)، والانسحاب لا يحل شيئاً."
              }
            }
          ]
        },
        {
          "key": "wer",
          "frage": {
            "de": "Wer muss handeln?",
            "en": "Who needs to act?",
            "ar": "من يجب أن يتصرّف؟"
          },
          "optionen": [
            {
              "id": "a",
              "stufe": "richtig",
              "text": {
                "de": "Die Apothekenleitung legt den Plan fest; jede Aufgabe bekommt eine zuständige Rolle.",
                "en": "The manager sets the plan; each task gets a responsible role.",
                "ar": "المدير يضع الخطة، وكل مهمة تُسند إلى دور مسؤول."
              },
              "erkl": {
                "de": "„Alle“ ist bei Jahresaufgaben dasselbe wie „niemand“.",
                "en": "For yearly tasks, \"everyone\" is the same as \"nobody\".",
                "ar": "في المهام السنوية «الجميع» يعني «لا أحد»."
              }
            },
            {
              "id": "b",
              "stufe": "falsch",
              "text": {
                "de": "Das ganze Team gemeinsam.",
                "en": "The whole team together.",
                "ar": "كل الفريق معاً."
              },
              "erkl": {
                "de": "Genau so blieb das Paket liegen.",
                "en": "That is exactly how the parcel was left lying.",
                "ar": "بهذا بالضبط بقي الطرد مغلقاً."
              }
            },
            {
              "id": "c",
              "stufe": "falsch",
              "text": {
                "de": "Die PTA, die zuletzt in der Rezeptur war.",
                "en": "The PTA who was last in the compounding room.",
                "ar": "الـPTA التي كانت آخر من في مكان التحضير (Rezeptur)."
              },
              "erkl": {
                "de": "Zufall ist keine Zuständigkeit.",
                "en": "Chance is not responsibility.",
                "ar": "المصادفة ليست مسؤولية."
              }
            }
          ]
        }
      ],
      "lernpunkt": {
        "de": "Was allen gehört, erledigt niemand.",
        "en": "What belongs to everyone gets done by nobody.",
        "ar": "ما يخص الجميع لا ينجزه أحد."
      },
      "vorfall": null
    },
    {
      "id": "q01_05",
      "monat": 12,
      "typ": "ereignis",
      "profil": "immer",
      "img": "assets/QMS/qms_ev_ch01_05.webp",
      "quelle": "§ 2a ApBetrO",
      "titel": {
        "de": "Der leere Tisch im Dezember",
        "en": "The empty table in December",
        "ar": "الطاولة الفارغة في ديسمبر"
      },
      "text": {
        "de": "Dezember. Der Termin für die Jahresbewertung des QMS ist zweimal verschoben worden. Der Besprechungstisch ist leer, der Jahresplaner an der Wand ist seit Januar unberührt.",
        "en": "December. The date for the annual QMS review has been postponed twice. The meeting table is empty; the annual planner on the wall has not been touched since January.",
        "ar": "ديسمبر. موعد المراجعة السنوية لنظام إدارة الجودة (QMS) أُجّل مرتين، وطاولة الاجتماعات فارغة، ومخطط السنة على الجدار لم يمسّه أحد منذ يناير."
      },
      "fragen": [
        {
          "key": "massnahme",
          "frage": {
            "de": "Was ist jetzt zu tun?",
            "en": "What must be done now?",
            "ar": "ما الذي يجب فعله الآن؟"
          },
          "optionen": [
            {
              "id": "a",
              "stufe": "richtig",
              "text": {
                "de": "Die Jahresbewertung durchführen: Fehler, Beschwerden, Rückrufe, Selbstinspektion, Ringversuche und Unterweisungen auswerten; Ziele fürs neue Jahr festlegen; dokumentieren und unterschreiben.",
                "en": "Carry out the annual review: evaluate errors, complaints, recalls, self-inspection, proficiency tests and instructions; set goals for the new year; document and sign.",
                "ar": "إجراء المراجعة السنوية: تقييم الأخطاء والشكاوى والاستدعاءات والتفتيش الذاتي واختبارات المقارنة والتعليم، وتحديد أهداف العام الجديد، مع التوثيق والتوقيع."
              },
              "erkl": {
                "de": "Ohne Rückblick wiederholt das neue Jahr das alte.",
                "en": "Without looking back, the new year repeats the old.",
                "ar": "من دون مراجعة يكرّر العام الجديد القديم."
              }
            },
            {
              "id": "b",
              "stufe": "teil",
              "text": {
                "de": "Die Fehlerliste des Jahres kurz durchlesen.",
                "en": "Quickly read through the year's error list.",
                "ar": "قراءة سريعة لقائمة أخطاء السنة."
              },
              "erkl": {
                "de": "Ein Teil des Bildes, aber keine Bewertung und keine Ziele.",
                "en": "Part of the picture, but no evaluation and no goals.",
                "ar": "جزء من الصورة، لكن بلا تقييم ولا أهداف."
              }
            },
            {
              "id": "c",
              "stufe": "falsch",
              "text": {
                "de": "Ausfallen lassen – das Jahr lief ja gut.",
                "en": "Skip it – the year went well.",
                "ar": "إلغاؤها، فالسنة مرّت جيداً."
              },
              "erkl": {
                "de": "Ob es gut lief, zeigt erst die Bewertung.",
                "en": "Whether it went well is shown only by the review.",
                "ar": "المراجعة وحدها تُظهر هل مرّت السنة جيداً."
              }
            }
          ]
        },
        {
          "key": "wer",
          "frage": {
            "de": "Wer trägt die Jahresbewertung?",
            "en": "Who owns the annual review?",
            "ar": "من يتحمّل المراجعة السنوية؟"
          },
          "optionen": [
            {
              "id": "a",
              "stufe": "richtig",
              "text": {
                "de": "Die Apothekenleitung – mit den Ergebnissen und Ideen des Teams.",
                "en": "The manager – with the team's results and ideas.",
                "ar": "المدير، بنتائج الفريق وأفكاره."
              },
              "erkl": {
                "de": "Verantwortung liegt bei der Leitung; das Wissen liegt im Team.",
                "en": "Responsibility lies with the manager; knowledge lies in the team.",
                "ar": "المسؤولية عند المدير، والمعرفة عند الفريق."
              }
            },
            {
              "id": "b",
              "stufe": "falsch",
              "text": {
                "de": "Ein externer Berater.",
                "en": "An external consultant.",
                "ar": "مستشار خارجي."
              },
              "erkl": {
                "de": "Er kann helfen, aber die Verantwortung bleibt in der Apotheke.",
                "en": "He can help, but responsibility stays in the pharmacy.",
                "ar": "قد يساعد، لكن المسؤولية تبقى في الصيدلية."
              }
            },
            {
              "id": "c",
              "stufe": "falsch",
              "text": {
                "de": "Die PTA mit den meisten Dienstjahren.",
                "en": "The longest-serving PTA.",
                "ar": "الـPTA الأقدم في العمل."
              },
              "erkl": {
                "de": "Erfahrung ist wertvoll – die Verantwortung trägt trotzdem die Leitung.",
                "en": "Experience is valuable – responsibility still lies with the manager.",
                "ar": "الخبرة قيّمة، لكن المسؤولية تبقى عند المدير."
              }
            }
          ]
        }
      ],
      "lernpunkt": {
        "de": "Das QMS endet nicht im Dezember – es beginnt dort neu.",
        "en": "The QMS does not end in December – it starts again there.",
        "ar": "نظام إدارة الجودة (QMS) لا ينتهي في ديسمبر، بل يبدأ من جديد."
      },
      "vorfall": null
    }
  ],
  "vorfaelle": [
    {
      "id": "v01_01",
      "img": "assets/QMS/qms_vf_ch01_01.webp",
      "ausloeser": {
        "ereignis": "q01_01",
        "verboten_gewaehlt": true
      },
      "titel": {
        "de": "August: die Freigabe im Urlaub",
        "en": "August: the release during holidays",
        "ar": "أغسطس: الإفراج في الإجازة"
      },
      "text": {
        "de": "Während der Urlaubszeit gibt eine PTA eine Rezeptur frei – die neue Zuständigkeitsliste nennt sie dafür. Bei der Kontrolle der Aufsicht wird es beanstandet; die Rezeptur hätte so nicht abgegeben werden dürfen.",
        "en": "During the holidays a PTA releases a compounded medicine – the new responsibility list names her for it. The inspection objects; the medicine should not have been dispensed like that.",
        "ar": "في فترة الإجازات تُفرج PTA عن تحضير، لأن قائمة المسؤوليات الجديدة تسمّيها لذلك. ويعترض التفتيش: ما كان يجوز صرف التحضير بهذه الطريقة."
      },
      "text_ok": {
        "de": "Während der Urlaubszeit ist kein zweiter Apotheker im Haus. Die Liste ist eindeutig: Die PTA stellt her, die Freigabe macht die Leitung am nächsten Morgen. Der Patient ist informiert und holt einen Tag später ab.",
        "en": "During the holidays there is no second pharmacist present. The list is clear: the PTA compounds, the manager releases the next morning. The patient is informed and collects a day later.",
        "ar": "في فترة الإجازات لا صيدلي ثانياً في الصيدلية. والقائمة واضحة: الـPTA تحضّر، والمدير يُفرج صباح اليوم التالي. والمريض يُعلَم ويستلم بعد يوم."
      }
    },
    {
      "id": "v01_02",
      "img": "assets/QMS/qms_vf_ch01_02.webp",
      "ausloeser": {
        "ereignis": "q01_02",
        "frage": "massnahme",
        "nicht": "richtig"
      },
      "titel": {
        "de": "Oktober: die alte Fassung in der Schublade",
        "en": "October: the old version in the drawer",
        "ar": "أكتوبر: النسخة القديمة في الدرج"
      },
      "text": {
        "de": "Eine Aushilfe arbeitet im Wareneingang nach einer alten SOP aus der Schublade – dort steht noch nichts von der Kühlbox. Zwei Packungen Insulin bleiben eine Stunde bei Raumtemperatur liegen.",
        "en": "A temp in goods receipt works from an old SOP found in a drawer – it says nothing yet about the cool box. Two packs of insulin stay at room temperature for an hour.",
        "ar": "عامل مؤقت في استلام البضاعة يعمل بإجراء قديم وجده في درج، لا يذكر الصندوق المبرّد بعد. فتبقى علبتا إنسولين ساعة في حرارة الغرفة."
      },
      "text_ok": {
        "de": "Eine Aushilfe sucht die Wareneingangs-SOP. Die Schublade ist leer; im Ordner findet er nur die gültige Fassung – mit der Kühlbox an zweiter Stelle.",
        "en": "A temp looks for the goods-receipt SOP. The drawer is empty; in the binder he finds only the valid version – with the cool box as step two.",
        "ar": "عامل مؤقت يبحث عن إجراء الاستلام. الدرج فارغ، وفي الملف لا يجد إلا النسخة السارية، والصندوق المبرّد فيها الخطوة الثانية."
      }
    }
  ]
};
