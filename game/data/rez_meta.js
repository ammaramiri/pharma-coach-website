/* =====================================================================
   REZEPTUR · Metadaten der Kategorie
   Erstellt 14.11.2026 (Technik). Geladen von js/rez_engine.js erst,
   wenn der Spieler die Rezeptur-Arbeit oeffnet, nie beim Spielstart.
   Hier steht nur, was fuer alle Faelle der Kategorie gilt: die Liste
   der Faelle, die Geraete, die Werkbank. Der Inhalt eines Falls liegt
   in seiner eigenen Datei (data/rez_01.js usw.).
===================================================================== */
window.REZ_META = {
  v: 1,

  /* Faelle der Kategorie. Jeder Fall: Kennung, Datei, Stufen-Id fuer
     den Spielstand (state.levelBest), Karte 640 x 360. */
  faelle: [
    { id:"01", level:"R1", src:"data/rez_01.js",
      karte:"assets/rezeptur/PCG_REZ01_CARD_v001.webp",
      titel:{ de:"Erythromycin-Creme 1 %", en:"Erythromycin cream 1%", ar:"كريم الإريثرومايسين 1%" } }
  ],

  /* Sterne wie bei allen Faellen (finishLevel in index.html). */
  sterne: [0.225, 0.375, 0.55],
  /* Abzug je Fehler: voll und leicht. Eine Station sinkt nie unter null. */
  abzug: { voll:10, leicht:5 },

  /* Bildflaeche aller Szenen */
  W: 864, H: 1536,

  /* ---------- Waagen ----------
     Werte aus der Apotheke (Text REZ_01, "Die festen Zahlen").
     Bildlagen aus game/proto/waage.html uebernommen. */
  waagen: {
    analyse: {
      bild:"assets/lab/PCG_LAB_WAAGE_ANALYSE_OPEN_v001.webp",
      bildZu:"assets/lab/PCG_LAB_WAAGE_ANALYSE_CLOSED_v001.webp",
      d:0.0001, nk:4, min:0.01, max:120,
      pfanne:{x:427,y:622}, tuer:{x:430,y:300,w:380,h:330},
      tara:{x:132,y:548}, uebernehmen:{x:132,y:786}, anzeige:{x:640,y:150},
      /* Breite der Behaelter auf der Schale, in Bildpixeln */
      schiffBreite:190, schaleBreite:250
    },
    praezision: {
      bild:"assets/lab/PCG_LAB_WAAGE_PRAEZISION_v001.webp", bildZu:null,
      d:0.01, nk:2, min:5, max:3600,
      pfanne:{x:435,y:525},
      tara:{x:207,y:742}, uebernehmen:{x:612,y:742}, anzeige:{x:640,y:150},
      schiffBreite:190, schaleBreite:300
    }
  },

  /* Eigengewichte. Die Fantaschale wiegt 72,40 g: so bleibt sie mit
     30 g Creme unter der Hoechstlast der Analysenwaage (120 g). */
  massen: { schiffchen:1.20, schale:72.40 },

  /* Ruheplaetze auf der Bank (Bildkoordinaten), wie im Prototyp */
  bank: {
    gefaess:{x:150,y:1180}, deckel:{x:330,y:1255}, spatel:{x:690,y:1180},
    schiff:{x:430,y:1290}, abfall:{x:780,y:1300}, schale:{x:430,y:1300},
    flasche:{x:150,y:1210}, topf:{x:180,y:1250}
  },

  /* ---------- Fantaschale (Text-Brief §6) ---------- */
  schale: {
    oeffnung:{x:420,y:672,rx:276,ry:178},
    bahn:{x:420,y:745,rx:165,ry:100},       /* Weg der Pistillspitze */
    /* Cremesee in CREAM_PARTIAL, am Bild gemessen: was ausserhalb liegt,
       ist Wandbelag und verschwindet beim Abschaben. */
    see:{x:420,y:752,rx:190,ry:105},
    pistill:{w:341,h:940,scale:0.66,griff:0.82,neigung:7},
    umdrehungen:16
  },

  /* ---------- Bilder ---------- */
  bilder: {
    bank:"assets/lab/PCG_LAB_ANCHOR_BENCH_v001.webp",
    schale:{
      EMPTY:"assets/lab/PCG_LAB_FANTASCHALE_EMPTY_v001.webp",
      POWDER:"assets/lab/PCG_LAB_FANTASCHALE_POWDER_v001.webp",
      PASTE_LUMPY:"assets/lab/PCG_LAB_FANTASCHALE_PASTE_LUMPY_v001.webp",
      PASTE_SMOOTH:"assets/lab/PCG_LAB_FANTASCHALE_PASTE_SMOOTH_v001.webp",
      CREAM_PARTIAL:"assets/lab/PCG_LAB_FANTASCHALE_CREAM_PARTIAL_v001.webp",
      CREAM_ACID:"assets/lab/PCG_LAB_FANTASCHALE_CREAM_ACID_v001.webp",
      CREAM_SMOOTH:"assets/lab/PCG_LAB_FANTASCHALE_CREAM_SMOOTH_v001.webp",
      CREAM_LUMPS:"assets/lab/PCG_LAB_FANTASCHALE_CREAM_LUMPS_v001.webp"
    },
    rand:"assets/lab/PCG_LAB_FANTASCHALE_RIM_FRONT_v001.webp",
    schaleKlein:"assets/lab/PCG_LAB_FANTASCHALE_CUT_v001.webp",
    pistill:"assets/lab/PCG_LAB_PISTILL_v001.webp",
    karte:"assets/lab/PCG_LAB_KARTENBLATT_v001.webp",
    karteCreme:"assets/lab/PCG_LAB_KARTENBLATT_CREME_v001.webp",
    flasche:"assets/lab/PCG_LAB_TROPFFLASCHE_v001.webp",
    topf:"assets/lab/PCG_LAB_CREMETOPF_OPEN_v001.webp",
    blob:"assets/lab/PCG_LAB_CREME_BLOB_v001.webp",
    schiff:"assets/lab/PCG_LAB_WAEGESCHIFFCHEN_v001.webp",
    haufen:"assets/lab/PCG_LAB_PULVER_HEAP_v001.webp",
    spatel:"assets/lab/PCG_LAB_SPATEL_v001.webp",
    spatelVoll:"assets/lab/PCG_LAB_SPATEL_LOADED_v001.webp",
    spatelCreme:"assets/lab/PCG_LAB_SPATEL_CREME_v001.webp",
    gefaessZu:"assets/lab/PCG_LAB_STANDGEFAESS_CLOSED_v002.webp",
    gefaessAuf:"assets/lab/PCG_LAB_STANDGEFAESS_OPEN_v002.webp",
    deckel:"assets/lab/PCG_LAB_DECKEL_v002.webp",
    abfall:"assets/lab/PCG_LAB_ABFALL_v001.webp",
    dose:{ EMPTY:"assets/lab/PCG_LAB_SPENDERDOSE_EMPTY_v001.webp",
           FILLED:"assets/lab/PCG_LAB_SPENDERDOSE_FILLED_v001.webp",
           CLOSED:"assets/lab/PCG_LAB_SPENDERDOSE_CLOSED_v001.webp",
           DECKEL:"assets/lab/PCG_LAB_SPENDERDOSE_DECKEL_v001.webp" },
    kruke:{ EMPTY:"assets/lab/PCG_LAB_KRUKE_EMPTY_v001.webp",
            FILLED:"assets/lab/PCG_LAB_KRUKE_FILLED_v001.webp",
            CLOSED:"assets/lab/PCG_LAB_KRUKE_CLOSED_v001.webp",
            DECKEL:"assets/lab/PCG_LAB_KRUKE_DECKEL_v001.webp" }
  }
};
