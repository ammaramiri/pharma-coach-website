/* =====================================================================
   QMS · Motor der Stufe · eigene Datei ausserhalb der index.html
   Spezifikation: QMS_Mechanik_Spezifikation.md (17.10.2026)
   Daten: data/qms_meta.js und data/qms_ch01.js .. qms_ch08.js

   Der Motor baut seinen eigenen Bildschirm (#qmsScreen), genau wie
   PCRevision es tut, und benutzt aus der index.html nur, was dort
   global ist: state, save, showNow, SND, node-freie DOM-Arbeit.
   Alle Klassen heissen qms-, damit nichts in andere Stufen faerbt.
===================================================================== */
window.PCQms = (function(){
'use strict';

var meta=null, kapitel=null, root=null, body=null, laden=null;
var view='intro', introIdx=0, aktKap=null, aktEv=null, reviewIdx=0, reviewListe=null;

/* ---------- Worte der Oberflaeche ---------- */
var W={
  titel:['QMS','QMS','نظام إدارة الجودة (QMS)'],
  weiter:['Weiter','Continue','متابعة'],
  los:['Verstanden – los geht\u2019s','Got it – let\u2019s start','فهمت، لنبدأ'],
  jahr:['Das Jahr','The year','سنة الجودة'],
  wieSpielen:['Wie es geht','How it works','طريقة اللعب'],
  ueberspringen:['Überspringen','Skip','تخطّي'],
  handbuchSub:['Welcher Teil des Handbuchs ist aktuell, welcher nicht.',
               'Which part of the handbook is up to date, which is not.',
               'حالة أقسام كتيّب الجودة الثمانية: أيّها صار محدَّثاً، وأيّها ما زال ناقصاً أو لم يُعالَج.'],
  bewertungSub:['Ende des Jahres: drei Situationen prüfen, ob dein Handbuch hält.',
                'End of the year: three situations test whether your handbook holds.',
                'نهاية السنة: ثلاثة مواقف حقيقية تختبر ما كتبته في الكتيّب. تستطيع فتحها في أي وقت.'],
  kapitelSub:['Fünf Ereignisse, nach Monaten geordnet.','Five events, ordered by month.',
              'خمسة أحداث مرتّبة بحسب أشهر السنة. اختر أيّها شئت.'],
  zurueck:['Zurück','Back','رجوع'],
  zurApo:['Zurück · Apotheke','Back · pharmacy','رجوع إلى الصيدلية'],
  handbuch:['Handbuch','Handbook','الكتيّب'],
  bewertung:['Jahresbewertung','Annual review','المراجعة السنوية'],
  monat:['Monat','Month','الشهر'],
  monate:[
    ['Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember'],
    ['January','February','March','April','May','June','July','August','September','October','November','December'],
    ['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر']],
  pruefen:['Auswerten','Check','تحقّق'],
  fertigSop:['Verfahren fertig','Finish procedure','انتهيت من الإجراء'],
  meine:['Mein Verfahren','My procedure','الإجراء الذي أبنيه'],
  stapel:['Kartenstapel','Card pile','البطاقات المتاحة'],
  leerSop:['Noch keine Karte gewählt','No card chosen yet','لم تختر أي بطاقة بعد · انقر بطاقة من الأسفل لتضيفها'],
  lernpunkt:['Lernpunkt','Lesson','الدرس'],
  quelle:['Grundlage','Basis','السند القانوني'],
  punkte:['Punkte','Points','نقاط'],
  von:['von','of','من'],
  erledigt:['erledigt','done','منجزة'],
  offen:['offen','open','لم يُلعب بعد'],
  aktualisiert:['aktualisiert','updated','محدَّث'],
  teilweise:['teilweise','partial','جزئي'],
  unbearbeitet:['unbearbeitet','untouched','لم يُعالَج'],
  kapFertig:['Kapitel abgeschlossen','Chapter finished','أنهيت هذا الفصل'],
  wasGeaendert:['Was sich im Handbuch geändert hat','What changed in the handbook','ما الذي تغيّر في كتيّب الجودة'],
  reviewStart:['Jahresbewertung starten','Start the annual review','ابدأ المراجعة السنوية'],
  reviewOffen:['Noch offene Kapitel zählen als unbearbeitet.','Unfinished chapters count as untouched.','ما لم تلعبه من الفصول يُحسب قسماً لم يُعالَج في الكتيّب.'],
  vorfallA:['Das ist passiert','This happened','وقع هذا فعلاً'],
  vorfallB:['Das Handbuch hat es verhindert','The handbook prevented it','كتيّبك منع وقوعه'],
  ergebnis:['Ergebnis','Result','النتيجة'],
  nochmal:['Kapitel wiederholen','Repeat a chapter','اختر فصلاً لإعادته'],
  rollenFrage:['Wer darf das?','Who may do this?','من يجوز له ذلك؟'],
  aufgabe:['Aufgabe','Task','مهمة'],
  richtigL:['richtig','correct','صحيح'],
  teilL:['teilweise','partial','جزئي'],
  falschL:['falsch','wrong','خطأ'],
  verbotenL:['rechtlich unzulässig','not legally allowed','ممنوع قانوناً'],
  pflichtFehlt:['Pflichtschritt fehlt','Mandatory step missing','خطوة واجبة ناقصة'],
  falleDrin:['Falle eingebaut','Trap included','فخّ أُدخل'],
  fuellDrin:['Füllkarte eingebaut','Filler included','حشو أُدخل'],
  reihenfolgeFalsch:['Reihenfolge stimmt nicht','Order is wrong','الترتيب غير صحيح'],
  laden:['Wird geladen …','Loading …','جارٍ التحميل …'],
  fehler:['Die Daten konnten nicht geladen werden.','The data could not be loaded.','تعذّر تحميل البيانات.']
};
function w(k){ var i=(state.lang==='en')?1:(state.lang==='ar'?2:0); var v=W[k]; return v? v[i] : k; }
function tr(o){ return (o && (o[state.lang]||o.de)) || ''; }
function monatName(n){ var i=(state.lang==='en')?1:(state.lang==='ar'?2:0); return W.monate[i][(n||1)-1]; }

/* ---------- kleine DOM-Hilfen ---------- */
function node(tag,text,parent,cls){
  var e=document.createElement(tag);
  if(cls) e.className=cls;
  if(text!=null){ e.textContent=text; e.dir='auto'; }
  if(parent) parent.appendChild(e);
  return e;
}
function button(text,fn,parent,cls){
  var b=node('button',text,parent,cls||'qms-btn');
  b.type='button';
  if(fn) b.addEventListener('click',fn);
  return b;
}
function bild(src,alt,parent){
  /* Das Bild haengt sofort im Dokument und bekommt erst dann seine
     Quelle. Ein losgeloestes Image mit loading="lazy" laedt in
     manchen Browsern nie: kein onload, kein onerror, nur ein leerer
     Kasten. Genau das war am 06.11.2026 auf dem Telefon zu sehen. */
  var f=node('figure',null,parent,'qms-figure'), box=node('div',null,f,'qms-image');
  var img=document.createElement('img');
  img.alt=alt||''; img.decoding='async';
  img.addEventListener('error', function(){
    box.classList.add('qms-image-leer');
    box.textContent=src.split('/').pop();
    try{ console.warn('QMS: Bild fehlt ·', src); }catch(e){}
  });
  box.appendChild(img);
  img.src=src;
  return f;
}
function mischen(a){
  var x=a.slice();
  for(var i=x.length-1;i>0;i--){ var j=Math.floor(Math.random()*(i+1)); var h=x[i]; x[i]=x[j]; x[j]=h; }
  return x;
}
function ton(gut){ try{ gut? SND.good() : SND.bad(); }catch(e){} }

/* ---------- Spielstand ---------- */
function q(){
  if(!state.qms || state.qms.v!==1){
    state.qms={ v:1, introGesehen:false, ev:{}, review:null, fertig:false };
  }
  if(!state.qms.ev) state.qms.ev={};
  return state.qms;
}
function sichern(){ try{ save(); }catch(e){} }

/* ---------- Daten laden ---------- */
function script(src){
  return new Promise(function(ok,fail){
    var vorhanden=document.querySelector('script[data-qms="'+src+'"]');
    if(vorhanden){ return ok(); }
    var s=document.createElement('script');
    s.src=src; s.async=true; s.dataset.qms=src;
    s.onload=function(){ ok(); };
    s.onerror=function(){ fail(new Error(src)); };
    document.head.appendChild(s);
  });
}
function laden_(){
  if(laden) return laden;
  laden=script('data/qms_meta.js').then(function(){
    meta=window.PCQmsMeta;
    return Promise.all(meta.reihenfolge.map(function(id){ return script('data/qms_'+id+'.js'); }));
  }).then(function(){
    kapitel=window.PCQmsChapters||{};
  });
  return laden;
}

/* ---------- Ereignisse und Rechnen ---------- */
function alleEreignisse(){
  var out=[];
  (meta.reihenfolge||[]).forEach(function(id){
    var ch=kapitel[id]; if(!ch) return;
    (ch.ereignisse||[]).forEach(function(e){ out.push({ch:id, ev:e}); });
  });
  return out;
}
function evListe(chId){
  var ch=kapitel[chId]; if(!ch) return [];
  return (ch.ereignisse||[]).slice().sort(function(a,b){ return (a.monat||0)-(b.monat||0); });
}
function maxPunkte(e){
  var b=meta.bewertung;
  if(e.typ==='ereignis') return (e.fragen||[]).length*b.ereignis.richtig;
  if(e.typ==='baukasten'){
    var pf=(e.karten||[]).filter(function(k){ return k.rolle==='pflicht'; }).length;
    return pf*b.baukasten.pflicht + b.baukasten.freigabe_richtig;
  }
  if(e.typ==='zuordnung'){
    var s=0;
    (e.aufgaben||[]).forEach(function(a){ s+=(a.richtig||[]).length*b.zuordnung.richtig; });
    return s;
  }
  return 0;
}
function evStand(id){ return q().ev[id]||null; }
function kapStand(chId){
  var liste=evListe(chId), fertig=0, p=0, max=0;
  liste.forEach(function(e){
    var s=evStand(e.id); max+=maxPunkte(e);
    if(s){ fertig++; p+=s.punkte; }
  });
  return { fertig:fertig, anzahl:liste.length, punkte:p, max:max };
}
function jahrStand(){
  var p=0,max=0,fertig=0,anzahl=0;
  (meta.reihenfolge||[]).forEach(function(id){
    var k=kapStand(id); p+=k.punkte; max+=k.max; fertig+=k.fertig; anzahl+=k.anzahl;
  });
  return { punkte:p, max:max, fertig:fertig, anzahl:anzahl };
}
function alleFertig(){ var j=jahrStand(); return j.anzahl>0 && j.fertig>=j.anzahl; }

/* ---------- Geruest ---------- */
function geruest(titel, zurueckFn){
  if(!root){ root=node('section',null,document.body,'screen'); root.id='qmsScreen'; }
  root.replaceChildren();
  root.dir = state.lang==='ar' ? 'rtl' : 'ltr';
  var kopf=node('header',null,root,'qms-head');
  button(w(zurueckFn? 'zurueck':'zurApo'), zurueckFn || function(){ raus(); }, kopf, 'qms-back');
  node('h1',titel,kopf,'qms-titel');
  var j=jahrStand();
  node('span',j.punkte.toFixed(1).replace(/\.0$/,'')+' / '+j.max.toFixed(1).replace(/\.0$/,'')+' '+w('punkte'), kopf,'qms-punkte');
  body=node('main',null,root,'qms-body');
  showNow('qmsScreen');
  try{ window.scrollTo(0,0); }catch(e){}
}
function raus(){
  try{ showNow('worldScreen'); }catch(e){}
}

/* ---------- 1 · Erklaerung ---------- */
function intro(){
  geruest(w('titel'), null);
  var d=meta.intro[introIdx];
  bild(d.img, '', body);
  node('p', tr(d.text), body, 'qms-text');
  var reihe=node('div',null,body,'qms-row');
  (meta.intro||[]).forEach(function(_,i){
    var p=node('span',null,reihe,'qms-dot'+(i===introIdx?' an':''));
    p.setAttribute('aria-hidden','true');
  });
  if(introIdx < meta.intro.length-1){
    button(w('weiter'), function(){ introIdx++; intro(); }, body, 'qms-btn qms-primary');
    button(w('ueberspringen'), function(){ q().introGesehen=true; sichern(); jahr(); }, body, 'qms-btn');
  } else {
    button(w('los'), function(){ q().introGesehen=true; sichern(); jahr(); }, body, 'qms-btn qms-primary');
  }
}

/* ---------- 2 · Jahresbrett ---------- */
function jahr(){
  geruest(w('jahr'), null);
  var grid=node('div',null,body,'qms-grid');
  (meta.reihenfolge||[]).forEach(function(id){
    var k=meta.chapters[id], st=kapStand(id);
    var karte=button('', function(){ aktKap=id; kapitelSchirm(); }, grid, 'qms-card');
    var f=bild(k.card, tr(k.titel), karte);
    f.classList.add('qms-card-bild');
    node('h3', tr(k.titel), karte, 'qms-card-titel');
    node('p', st.fertig+' / '+st.anzahl+' '+w('erledigt'), karte, 'qms-card-meta');
    var bar=node('div',null,karte,'qms-bar'); node('span',null,bar).style.width=
      (st.anzahl? st.fertig/st.anzahl*100 : 0)+'%';
  });
  /* Zwei Knoepfe, die niemand von selbst versteht. Also steht unter
     jedem in einem Satz, wofuer er da ist. */
  var k1=node('div',null,body,'qms-tor');
  button(w('handbuch'), handbuch, k1, 'qms-btn');
  node('p', w('handbuchSub'), k1, 'qms-note');
  var k2=node('div',null,body,'qms-tor');
  button(w('bewertung'), function(){ reviewStart(); }, k2, 'qms-btn qms-primary');
  node('p', w('bewertungSub'), k2, 'qms-note');
  if(!alleFertig()) node('p', w('reviewOffen'), k2, 'qms-note');
  button(w('wieSpielen'), function(){ introIdx=0; intro(); }, body, 'qms-btn');
}

/* ---------- 3 · Kapitel ---------- */
function kapitelSchirm(){
  var ch=kapitel[aktKap], k=meta.chapters[aktKap];
  geruest(tr(k.titel), jahr);
  bild(k.card, tr(k.titel), body);
  if(ch.einleitung) node('p', tr(ch.einleitung), body, 'qms-text');
  node('p', w('kapitelSub'), body, 'qms-note');
  var liste=node('div',null,body,'qms-liste');
  evListe(aktKap).forEach(function(e){
    var s=evStand(e.id);
    var z=button('', function(){ aktEv=e; ereignisSchirm(); }, liste, 'qms-zeile'+(s?' fertig':''));
    node('span', monatName(e.monat), z, 'qms-monat');
    node('span', tr(e.titel), z, 'qms-zeile-titel');
    node('span', s? (s.punkte+' / '+maxPunkte(e)) : w('offen'), z, 'qms-zeile-stand');
  });
  var st=kapStand(aktKap);
  if(st.fertig>=st.anzahl && st.anzahl>0) kapitelEnde(liste);
}
function kapitelEnde(parent){
  var kasten=node('div',null,parent.parentNode,'qms-ende');
  node('h3', w('kapFertig'), kasten);
  node('p', w('wasGeaendert'), kasten, 'qms-ende-kopf');
  evListe(aktKap).forEach(function(e){
    if(e.lernpunkt) node('p', '· '+tr(e.lernpunkt), kasten, 'qms-lern');
  });
}

/* ---------- 4 · Ereignis mit zwei Fragen ---------- */
function ereignisSchirm(){
  var e=aktEv;
  if(e.typ==='baukasten') return baukastenSchirm();
  if(e.typ==='zuordnung') return zuordnungSchirm();
  geruest(tr(e.titel), kapitelSchirm);
  node('p', monatName(e.monat), body, 'qms-monat-gross');
  bild(e.img, tr(e.titel), body);
  node('p', tr(e.text), body, 'qms-text');

  var gewaehlt={}, fertig=false;
  var kasten=node('div',null,body,'qms-fragen');
  (e.fragen||[]).forEach(function(f){
    var block=node('div',null,kasten,'qms-frage');
    node('h3', tr(f.frage), block);
    var opts=mischen(f.optionen||[]);
    opts.forEach(function(o){
      var b=button(tr(o.text), function(){
        if(fertig) return;
        gewaehlt[f.key]=o;
        Array.prototype.forEach.call(block.querySelectorAll('.qms-opt'), function(x){ x.classList.remove('an'); });
        b.classList.add('an');
        if(Object.keys(gewaehlt).length===(e.fragen||[]).length) pruefBtn.disabled=false;
      }, block, 'qms-opt');
      b.dataset.id=o.id;
    });
  });
  var pruefBtn=button(w('pruefen'), function(){
    if(fertig) return; fertig=true; pruefBtn.remove();
    auswertenEreignis(e, gewaehlt, kasten);
  }, body, 'qms-btn qms-primary');
  pruefBtn.disabled=true;
}
function auswertenEreignis(e, gewaehlt, kasten){
  var b=meta.bewertung.ereignis, punkte=0, antworten={};
  (e.fragen||[]).forEach(function(f, i){
    var o=gewaehlt[f.key];
    var p=(o.stufe==='richtig')? b.richtig : (o.stufe==='teil'? b.teil : b.falsch);
    punkte+=p; antworten[f.key]={ id:o.id, stufe:o.stufe };
    var block=kasten.children[i];
    Array.prototype.forEach.call(block.querySelectorAll('.qms-opt'), function(x){ x.disabled=true; });
    var ziel=block.querySelector('.qms-opt[data-id="'+o.id+'"]');
    if(ziel) ziel.classList.add(o.stufe);
    var erk=node('div',null,block,'qms-erkl '+o.stufe);
    node('b', zeichen(o.stufe)+' '+stufeWort(o.stufe), erk);
    node('p', tr(o.erkl), erk);
  });
  ton(punkte>=((e.fragen||[]).length*b.richtig));
  speichern(e, punkte, { antworten:antworten });
  nachlauf(e);
}
function zeichen(st){ return st==='richtig'?'\u2714':(st==='teil'?'\u25D0':'\u2718'); }
function stufeWort(st){ return st==='richtig'?w('richtigL'):(st==='teil'?w('teilL'):w('falschL')); }

/* ---------- 5 · Baukasten ---------- */
function baukastenSchirm(){
  var e=aktEv;
  geruest(tr(e.titel), kapitelSchirm);
  node('p', monatName(e.monat), body, 'qms-monat-gross');
  bild(e.img, tr(e.titel), body);
  node('p', tr(e.text), body, 'qms-text');

  var stapel=mischen(e.karten||[]), gewaehlt=[];
  var sp=node('div',null,body,'qms-sop');
  node('h3', w('meine'), sp);
  var meineBox=node('div',null,sp,'qms-meine');
  node('h3', w('stapel'), sp);
  var stapelBox=node('div',null,sp,'qms-stapel');

  function malen(){
    meineBox.replaceChildren();
    if(!gewaehlt.length) node('p', w('leerSop'), meineBox, 'qms-note');
    gewaehlt.forEach(function(k, i){
      var z=node('div',null,meineBox,'qms-karte gewaehlt');
      node('span', (i+1)+'', z, 'qms-nr');
      node('span', tr(k.text), z, 'qms-karte-text');
      var st=node('span',null,z,'qms-karte-tasten');
      var hoch=button('\u25B2', function(){ if(i>0){ var h=gewaehlt[i-1]; gewaehlt[i-1]=gewaehlt[i]; gewaehlt[i]=h; malen(); } }, st, 'qms-mini');
      var runter=button('\u25BC', function(){ if(i<gewaehlt.length-1){ var h=gewaehlt[i+1]; gewaehlt[i+1]=gewaehlt[i]; gewaehlt[i]=h; malen(); } }, st, 'qms-mini');
      hoch.disabled=(i===0); runter.disabled=(i===gewaehlt.length-1);
      button('\u2715', function(){ gewaehlt.splice(i,1); malen(); }, st, 'qms-mini');
    });
    stapelBox.replaceChildren();
    stapel.forEach(function(k){
      if(gewaehlt.indexOf(k)>=0) return;
      var z=button('', function(){ gewaehlt.push(k); malen(); }, stapelBox, 'qms-karte');
      node('span', tr(k.text), z, 'qms-karte-text');
    });
    fertigBtn.disabled = gewaehlt.length===0;
  }
  var fertigBtn=button(w('fertigSop'), function(){
    fertigBtn.remove(); sp.classList.add('fest');
    Array.prototype.forEach.call(sp.querySelectorAll('button'), function(b){ b.disabled=true; });
    freigabeFragen(e, gewaehlt);
  }, body, 'qms-btn qms-primary');
  malen();
}
function freigabeFragen(e, gewaehlt){
  var kasten=node('div',null,body,'qms-fragen');
  var block=node('div',null,kasten,'qms-frage');
  node('h3', tr(e.freigabe.frage), block);
  var wahl=null;
  mischen(e.freigabe.optionen||[]).forEach(function(o){
    var b=button(tr(o.text), function(){
      wahl=o;
      Array.prototype.forEach.call(block.querySelectorAll('.qms-opt'), function(x){ x.classList.remove('an'); });
      b.classList.add('an'); pruef.disabled=false;
    }, block, 'qms-opt');
    b.dataset.id=o.id;
  });
  var pruef=button(w('pruefen'), function(){
    pruef.remove();
    Array.prototype.forEach.call(block.querySelectorAll('.qms-opt'), function(x){ x.disabled=true; });
    var ziel=block.querySelector('.qms-opt[data-id="'+wahl.id+'"]');
    if(ziel) ziel.classList.add(wahl.stufe);
    var erk=node('div',null,block,'qms-erkl '+wahl.stufe);
    node('b', zeichen(wahl.stufe)+' '+stufeWort(wahl.stufe), erk);
    node('p', tr(wahl.erkl), erk);
    auswertenBaukasten(e, gewaehlt, wahl);
  }, body, 'qms-btn qms-primary');
  pruef.disabled=true;
}
function auswertenBaukasten(e, gewaehlt, freigabe){
  var b=meta.bewertung.baukasten, punkte=0;
  var ids=gewaehlt.map(function(k){ return k.id; });
  var fehlend=[], fallen=[], fuell=[];
  (e.karten||[]).forEach(function(k){
    var drin=ids.indexOf(k.id)>=0;
    if(k.rolle==='pflicht'){ if(drin) punkte+=b.pflicht; else fehlend.push(k); }
    else if(k.rolle==='falle' && drin){ punkte+=b.falle; fallen.push(k); }
    else if(k.rolle==='fuell' && drin){ punkte+=b.fuell; fuell.push(k); }
  });
  /* Reihenfolge nur pruefen, wo sie wirklich zaehlt. */
  var ordnungFalsch=false, krit=e.reihenfolge_kritisch||[];
  if(krit.length>1){
    var folge=ids.filter(function(id){ return krit.indexOf(id)>=0; });
    ordnungFalsch = folge.join(',')!==krit.filter(function(id){ return ids.indexOf(id)>=0; }).join(',');
    if(ordnungFalsch) punkte+=b.reihenfolge_fehler;
  }
  if(freigabe.stufe==='richtig') punkte+=b.freigabe_richtig;
  punkte=Math.max(b.minimum, punkte);

  var out=node('div',null,body,'qms-bilanz');
  gewaehlt.forEach(function(k){
    var z=node('div',null,out,'qms-erkl '+(k.rolle==='pflicht'?'richtig':(k.rolle==='falle'?'falsch':'teil')));
    node('b', zeichen(k.rolle==='pflicht'?'richtig':(k.rolle==='falle'?'falsch':'teil'))+' '+
      (k.rolle==='pflicht'? tr(k.text) : (k.rolle==='falle'? w('falleDrin') : w('fuellDrin'))), z);
    node('p', tr(k.erkl), z);
  });
  fehlend.forEach(function(k){
    var z=node('div',null,out,'qms-erkl falsch');
    node('b', '\u2718 '+w('pflichtFehlt'), z);
    node('p', tr(k.text)+' — '+tr(k.erkl), z);
  });
  if(ordnungFalsch){
    var z=node('div',null,out,'qms-erkl teil');
    node('b', '\u25D0 '+w('reihenfolgeFalsch'), z);
  }
  ton(fehlend.length===0 && fallen.length===0);
  speichern(e, punkte, { karten:ids, fehlend:fehlend.map(function(k){ return k.id; }),
                         freigabe:freigabe.stufe });
  nachlauf(e);
}

/* ---------- 6 · Zuordnung ---------- */
function zuordnungSchirm(){
  var e=aktEv;
  geruest(tr(e.titel), kapitelSchirm);
  node('p', monatName(e.monat), body, 'qms-monat-gross');
  bild(e.img, tr(e.titel), body);
  node('p', tr(e.text), body, 'qms-text');

  var idx=0, punkte=0, verbotenGewaehlt=false;
  var b=meta.bewertung.zuordnung;
  var feld=node('div',null,body,'qms-zuordnung');
  naechste();

  function naechste(){
    feld.replaceChildren();
    if(idx>=(e.aufgaben||[]).length){
      punkte=Math.max(b.minimum, punkte);
      speichern(e, punkte, { verboten:verbotenGewaehlt });
      nachlauf(e);
      return;
    }
    var a=e.aufgaben[idx];
    node('p', w('aufgabe')+' '+(idx+1)+' / '+e.aufgaben.length, feld, 'qms-note');
    node('h3', tr(a.text), feld);
    var gewaehlt=[];
    var reihe=node('div',null,feld,'qms-rollen');
    (e.rollen||Object.keys(meta.rollen)).forEach(function(rid){
      var r=meta.rollen[rid]; if(!r) return;
      var k=button('', function(){
        if(k.disabled) return;
        var pos=gewaehlt.indexOf(rid);
        if(pos>=0){ gewaehlt.splice(pos,1); k.classList.remove('an'); }
        else { gewaehlt.push(rid); k.classList.add('an'); }
        ok.disabled=gewaehlt.length===0;
      }, reihe, 'qms-rolle');
      var f=bild(r.img, tr(r.name), k); f.classList.add('qms-rolle-bild');
      node('span', tr(r.name), k, 'qms-rolle-name');
      k.dataset.rolle=rid;
    });
    var ok=button(w('pruefen'), function(){
      ok.remove();
      Array.prototype.forEach.call(reihe.querySelectorAll('.qms-rolle'), function(x){ x.disabled=true; });
      gewaehlt.forEach(function(rid){
        var k=reihe.querySelector('.qms-rolle[data-rolle="'+rid+'"]');
        if((a.richtig||[]).indexOf(rid)>=0){ punkte+=b.richtig; if(k) k.classList.add('richtig'); }
        else if((a.verboten||[]).indexOf(rid)>=0){ punkte+=b.verboten; verbotenGewaehlt=true; if(k) k.classList.add('falsch'); }
        else if(k) k.classList.add('teil');
      });
      (a.richtig||[]).forEach(function(rid){
        var k=reihe.querySelector('.qms-rolle[data-rolle="'+rid+'"]');
        if(k && !k.classList.contains('richtig')) k.classList.add('soll');
      });
      var erk=node('div',null,feld,'qms-erkl richtig');
      node('p', tr(a.erkl), erk);
      button(w('weiter'), function(){ idx++; naechste(); }, feld, 'qms-btn qms-primary');
    }, feld, 'qms-btn qms-primary');
    ok.disabled=true;
  }
}

/* ---------- Abschluss eines Ereignisses ---------- */
function speichern(e, punkte, extra){
  var s=q();
  s.ev[e.id]=Object.assign({ punkte:Math.round(punkte*2)/2, max:maxPunkte(e), kap:aktKap }, extra||{});
  sichern();
}
function nachlauf(e){
  if(e.quelle) node('p', w('quelle')+': '+e.quelle, body, 'qms-quelle');
  if(e.lernpunkt){
    var l=node('div',null,body,'qms-lernpunkt');
    node('b', w('lernpunkt'), l);
    node('p', tr(e.lernpunkt), l);
  }
  var naechstes=null, liste=evListe(aktKap), i=liste.indexOf(e);
  for(var k=i+1;k<liste.length;k++){ if(!evStand(liste[k].id)){ naechstes=liste[k]; break; } }
  var reihe=node('div',null,body,'qms-row');
  if(naechstes) button(w('weiter'), function(){ aktEv=naechstes; ereignisSchirm(); }, reihe, 'qms-btn qms-primary');
  button(tr(meta.chapters[aktKap].titel), kapitelSchirm, reihe, 'qms-btn');
  button(w('jahr'), jahr, reihe, 'qms-btn');
}

/* ---------- 7 · Handbuch ---------- */
function handbuch(){
  geruest(w('handbuch'), jahr);
  node('p', w('wasGeaendert'), body, 'qms-text');
  var liste=node('div',null,body,'qms-liste');
  (meta.reihenfolge||[]).forEach(function(id){
    var st=kapStand(id), zustand, cls;
    if(st.fertig===0){ zustand=w('unbearbeitet'); cls='offen'; }
    else if(st.fertig<st.anzahl || st.punkte < st.max*0.75){ zustand=w('teilweise'); cls='teil'; }
    else { zustand=w('aktualisiert'); cls='fertig'; }
    var z=node('div',null,liste,'qms-zeile '+cls);
    node('span', tr(meta.chapters[id].titel), z, 'qms-zeile-titel');
    node('span', zustand, z, 'qms-zeile-stand');
  });
}

/* ---------- 8 · Jahresbewertung und Vorfaelle ---------- */
function vorfallAusgeloest(v){
  var s=evStand(v.ausloeser.ereignis);
  if(!s) return false;                       /* nicht gespielt = kein Vorfall */
  var a=v.ausloeser;
  if(a.frage){
    var ant=(s.antworten||{})[a.frage];
    return !!ant && ant.stufe!==(a.nicht||'richtig');
  }
  if(a.karten_fehlend){
    var f=s.fehlend||[];
    return a.karten_fehlend.some(function(id){ return f.indexOf(id)>=0; });
  }
  if(a.verboten_gewaehlt) return !!s.verboten;
  return false;
}
function vorfallVerhindert(v){
  var s=evStand(v.ausloeser.ereignis);
  return !!s && !vorfallAusgeloest(v);
}
function reviewStart(){
  var alle=[];
  (meta.reihenfolge||[]).forEach(function(id){
    (kapitel[id].vorfaelle||[]).forEach(function(v){ alle.push(v); });
  });
  var passiert=alle.filter(vorfallAusgeloest);
  var verhindert=alle.filter(vorfallVerhindert);
  var liste=mischen(passiert).slice(0,2).map(function(v){ return { v:v, ok:false }; });
  mischen(verhindert).forEach(function(v){
    if(liste.length<3 && !liste.some(function(x){ return x.v.id===v.id; })) liste.push({ v:v, ok:true });
  });
  reviewListe=liste; reviewIdx=-1;
  q().review={ passiert:passiert.length, gezeigt:liste.map(function(x){ return x.v.id; }) };
  sichern();
  reviewSchirm();
}
function reviewSchirm(){
  if(reviewIdx<0){
    geruest(w('bewertung'), jahr);
    bild(meta.review.img, '', body);
    node('p', tr(meta.review.text), body, 'qms-text');
    button(w('reviewStart'), function(){ reviewIdx=0; reviewSchirm(); }, body, 'qms-btn qms-primary');
    return;
  }
  if(reviewIdx>=reviewListe.length) return ergebnis();
  var x=reviewListe[reviewIdx], v=x.v;
  geruest(w('bewertung'), jahr);
  node('p', (reviewIdx+1)+' / '+reviewListe.length, body, 'qms-note');
  bild(v.img, tr(v.titel), body);
  node('h3', tr(v.titel), body, 'qms-vorfall-titel');
  var kasten=node('div',null,body,'qms-erkl '+(x.ok?'richtig':'falsch'));
  node('b', x.ok? w('vorfallB') : w('vorfallA'), kasten);
  node('p', x.ok? tr(v.text_ok) : tr(v.text), kasten);
  button(w('weiter'), function(){ reviewIdx++; reviewSchirm(); }, body, 'qms-btn qms-primary');
}

/* ---------- 9 · Ergebnis ---------- */
function ergebnis(){
  geruest(w('ergebnis'), jahr);
  bild(meta.result.img, '', body);
  node('p', tr(meta.result.text), body, 'qms-text');
  var liste=node('div',null,body,'qms-liste');
  (meta.reihenfolge||[]).forEach(function(id){
    var st=kapStand(id);
    var z=node('div',null,liste,'qms-zeile');
    node('span', tr(meta.chapters[id].titel), z, 'qms-zeile-titel');
    node('span', (st.max? Math.round(st.punkte/st.max*100):0)+' %', z, 'qms-zeile-stand');
  });
  var fehlt=[];
  alleEreignisse().forEach(function(p){
    var s=evStand(p.ev.id);
    if(s && s.max && s.punkte < s.max && p.ev.lernpunkt) fehlt.push(tr(p.ev.lernpunkt));
  });
  if(fehlt.length){
    var box=node('div',null,body,'qms-lernpunkt');
    node('b', w('lernpunkt'), box);
    fehlt.slice(0,8).forEach(function(l){ node('p','· '+l, box); });
  }
  q().fertig=true; sichern();
  button(w('nochmal'), jahr, body, 'qms-btn qms-primary');
}

/* ---------- Stil ---------- */
var STIL=[
'#qmsScreen{--qms:#16B8A6;--qms-dark:#0E7C6B;background:#F6F3EC;color:#23272E;padding-bottom:40px}',
'#qmsScreen *{box-sizing:border-box}',
'#qmsScreen button{font:inherit;cursor:pointer;color:inherit}',
'#qmsScreen .qms-head{position:sticky;top:0;z-index:5;display:flex;align-items:center;gap:10px;',
'  padding:10px 12px;background:#FFFDF8;border-bottom:1px solid #E5E0D8;flex-wrap:wrap}',
'#qmsScreen .qms-titel{font-size:16px;margin:0;flex:1 1 auto}',
'#qmsScreen .qms-punkte{font-size:12px;font-weight:700;color:var(--qms-dark)}',
'#qmsScreen .qms-back{border:1.5px solid #E5E0D8;background:#fff;border-radius:999px;padding:6px 12px;font-size:12px;font-weight:700}',
'#qmsScreen .qms-body{max-width:640px;margin:0 auto;padding:12px}',
'#qmsScreen .qms-figure{margin:0 0 12px}',
'#qmsScreen .qms-image{aspect-ratio:16/9;background:#E9E4DA;border-radius:14px;overflow:hidden;display:grid;place-items:center}',
'#qmsScreen .qms-image img{width:100%;height:100%;object-fit:cover;display:block}',
'#qmsScreen .qms-image-leer{font-size:11px;color:#8A8F98;padding:10px;text-align:center;word-break:break-all}',
'#qmsScreen .qms-image-leer img{display:none}',
'#qmsScreen .qms-text{font-size:14.5px;line-height:1.55;margin:0 0 14px}',
'#qmsScreen .qms-note{font-size:12px;color:#6B7280;margin:6px 0;line-height:1.5}',
'#qmsScreen .qms-tor{margin:14px 0 0}',
'#qmsScreen .qms-tor .qms-btn{margin-bottom:4px}',
'#qmsScreen .qms-quelle{font-size:11.5px;color:#6B7280;margin:10px 0 0}',
'#qmsScreen .qms-btn{display:block;width:100%;margin:8px 0;padding:12px 16px;border-radius:12px;',
'  border:2px solid #E5E0D8;background:#fff;font-weight:700;font-size:14px}',
'#qmsScreen .qms-btn.qms-primary{background:var(--qms-dark);border-color:var(--qms-dark);color:#fff}',
'#qmsScreen .qms-btn:disabled{opacity:.45}',
'#qmsScreen .qms-row{display:flex;gap:8px;flex-wrap:wrap;margin-top:10px}',
'#qmsScreen .qms-row .qms-btn{flex:1 1 140px;width:auto}',
'#qmsScreen .qms-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}',
'#qmsScreen .qms-card{text-align:start;padding:0 0 10px;border:2px solid #E5E0D8;border-radius:14px;background:#fff;overflow:hidden}',
'#qmsScreen .qms-card-bild .qms-image{border-radius:0}',
'#qmsScreen .qms-card-titel{font-size:13px;margin:8px 10px 2px}',
'#qmsScreen .qms-card-meta{font-size:11.5px;color:#6B7280;margin:0 10px 6px}',
'#qmsScreen .qms-bar{height:5px;background:#E9E4DA;border-radius:3px;margin:0 10px;overflow:hidden}',
'#qmsScreen .qms-bar span{display:block;height:100%;background:var(--qms-dark)}',
'#qmsScreen .qms-liste{display:flex;flex-direction:column;gap:8px;margin:10px 0}',
'#qmsScreen .qms-zeile{display:flex;align-items:center;gap:10px;width:100%;text-align:start;',
'  padding:11px 12px;border:2px solid #E5E0D8;border-radius:12px;background:#fff;font-size:13.5px}',
'#qmsScreen .qms-zeile.fertig,#qmsScreen .qms-zeile.fertig *{color:var(--qms-dark)}',
'#qmsScreen .qms-zeile.fertig{border-color:var(--qms-dark);background:#EAF4F1}',
'#qmsScreen .qms-zeile.teil{border-color:#D89A2C;background:#FDF6E8}',
'#qmsScreen .qms-monat{font-size:11px;font-weight:800;color:#6B7280;min-width:64px}',
'#qmsScreen .qms-monat-gross{font-size:12px;font-weight:800;color:var(--qms-dark);margin:0 0 6px;letter-spacing:.06em}',
'#qmsScreen .qms-zeile-titel{flex:1 1 auto;font-weight:700}',
'#qmsScreen .qms-zeile-stand{font-size:11.5px;color:#6B7280;white-space:nowrap}',
'#qmsScreen .qms-fragen{margin-top:6px}',
'#qmsScreen .qms-frage{margin:0 0 18px}',
'#qmsScreen .qms-frage h3{font-size:14px;margin:0 0 8px}',
'#qmsScreen .qms-opt{display:block;width:100%;text-align:start;margin:6px 0;padding:11px 13px;',
'  border:2px solid #E5E0D8;border-radius:12px;background:#fff;font-size:13.5px;line-height:1.45}',
'#qmsScreen .qms-opt.an{border-color:var(--qms-dark);background:#EAF4F1}',
'#qmsScreen .qms-opt.richtig{border-color:#0E7C6B;background:#E6F4F0}',
'#qmsScreen .qms-opt.teil{border-color:#D89A2C;background:#FDF6E8}',
'#qmsScreen .qms-opt.falsch{border-color:#C1121F;background:#FBECEC}',
'#qmsScreen .qms-erkl{margin:8px 0;padding:10px 12px;border-radius:12px;border:2px solid #E5E0D8;background:#fff;font-size:13px}',
'#qmsScreen .qms-erkl.richtig{border-color:#0E7C6B;background:#E6F4F0}',
'#qmsScreen .qms-erkl.teil{border-color:#D89A2C;background:#FDF6E8}',
'#qmsScreen .qms-erkl.falsch{border-color:#C1121F;background:#FBECEC}',
'#qmsScreen .qms-erkl p{margin:4px 0 0}',
'#qmsScreen .qms-sop{margin:10px 0}',
'#qmsScreen .qms-sop h3{font-size:13px;margin:12px 0 6px;color:#6B7280;letter-spacing:.04em}',
'#qmsScreen .qms-karte{display:flex;align-items:center;gap:8px;width:100%;text-align:start;',
'  margin:6px 0;padding:10px 12px;border:2px solid #E5E0D8;border-radius:12px;background:#fff;font-size:13px;line-height:1.4}',
'#qmsScreen .qms-karte.gewaehlt{border-color:var(--qms-dark);background:#EAF4F1}',
'#qmsScreen .qms-karte-text{flex:1 1 auto}',
'#qmsScreen .qms-nr{min-width:22px;height:22px;border-radius:50%;background:var(--qms-dark);color:#fff;',
'  display:grid;place-items:center;font-size:11px;font-weight:800;flex:0 0 auto}',
'#qmsScreen .qms-karte-tasten{display:flex;gap:4px;flex:0 0 auto}',
'#qmsScreen .qms-mini{width:30px;height:30px;border-radius:8px;border:1.5px solid #E5E0D8;background:#fff;font-size:12px}',
'#qmsScreen .qms-mini:disabled{opacity:.35}',
'#qmsScreen .qms-rollen{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin:10px 0}',
'#qmsScreen .qms-rolle{padding:0 0 6px;border:2px solid #E5E0D8;border-radius:12px;background:#fff;overflow:hidden}',
'#qmsScreen .qms-rolle .qms-image{aspect-ratio:1/1;border-radius:0}',
'#qmsScreen .qms-rolle-name{display:block;font-size:11.5px;font-weight:700;padding:6px 4px 0}',
'#qmsScreen .qms-rolle.an{border-color:var(--qms-dark);background:#EAF4F1}',
'#qmsScreen .qms-rolle.richtig{border-color:#0E7C6B;background:#E6F4F0}',
'#qmsScreen .qms-rolle.falsch{border-color:#C1121F;background:#FBECEC}',
'#qmsScreen .qms-rolle.teil{border-color:#D89A2C;background:#FDF6E8}',
'#qmsScreen .qms-rolle.soll{border-style:dashed;border-color:#0E7C6B}',
'#qmsScreen .qms-lernpunkt{margin:12px 0;padding:11px 13px;border-radius:12px;background:#EAF4F1;border:2px solid var(--qms-dark);font-size:13px}',
'#qmsScreen .qms-lernpunkt p{margin:4px 0 0}',
'#qmsScreen .qms-ende{margin:14px 0;padding:12px;border-radius:14px;background:#fff;border:2px solid var(--qms-dark)}',
'#qmsScreen .qms-ende h3{margin:0 0 4px;font-size:14px}',
'#qmsScreen .qms-ende-kopf{font-size:12px;color:#6B7280;margin:0 0 8px}',
'#qmsScreen .qms-lern{font-size:13px;margin:4px 0;line-height:1.45}',
'#qmsScreen .qms-dot{width:7px;height:7px;border-radius:50%;background:#D7D2C8;display:inline-block;margin:0 3px}',
'#qmsScreen .qms-dot.an{background:var(--qms-dark)}',
'#qmsScreen .qms-vorfall-titel{font-size:15px;margin:0 0 8px}',
'@media (max-width:420px){#qmsScreen .qms-grid{grid-template-columns:minmax(0,1fr)}}'
].join('\n');
function stil(){
  if(document.getElementById('qmsStil')) return;
  var s=document.createElement('style'); s.id='qmsStil'; s.textContent=STIL;
  document.head.appendChild(s);
}

/* ---------- Eintritt ---------- */
function open(){
  stil();
  if(!root){ root=node('section',null,document.body,'screen'); root.id='qmsScreen'; }
  root.replaceChildren();
  node('p', w('laden'), node('main',null,root,'qms-body'), 'qms-text');
  showNow('qmsScreen');
  return laden_().then(function(){
    /* Die Erklaerung kommt bei jedem Eintritt, nicht nur beim ersten
       Mal: wer nach Wochen zurueckkehrt, hat sie vergessen
       (Ammar 06.11.2026). Ueberspringen geht mit einem Knopf, und
       vom Jahresbrett aus ist sie jederzeit wieder erreichbar. */
    introIdx=0; intro();
  }).catch(function(){
    root.replaceChildren();
    var b=node('main',null,root,'qms-body');
    node('p', w('fehler'), b, 'qms-text');
    button(w('zurApo'), raus, b, 'qms-btn qms-primary');
  });
}

return { open:open, jahr:jahr, handbuch:handbuch, reviewStart:reviewStart,
         stand:function(){ return { jahr:jahrStand(), q:q() }; },
         daten:function(){ return { meta:meta, kapitel:kapitel }; } };
})();
