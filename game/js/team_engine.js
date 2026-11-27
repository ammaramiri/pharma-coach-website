/* =====================================================================
   TEAMGESPRAECH-MOTOR · Kueche · 14.11.2026 (Technik)
   Spielt eine Stufe aus window.PC_TEAM[id] (data/team_*.js). Die
   Datei enthaelt nur Daten; alle Logik steht hier.
   Geladen erst, wenn der Spieler am Kuechentisch eine Stufe waehlt
   (index.html: teamStarten). Kein Spielstand mitten in der Stufe:
   wer geht, beginnt neu. Die Endpunkte zaehlen wie bei allen Faellen.

   Schrittarten (Spezifikation TEAM01 §2): intro · timer · choice ·
   dialog · cards. Dazu (PLAN01, 16.11.2026): story · board (Plantafel).
   Dazu (TEAM03, 27.11.2026, Brief v002): evidence · aufgabentafel ·
   timeskip. board bleibt der Plantafel vorbehalten.
   Teamplan-Stufen stehen in window.PC_PLAN, Gespraeche in PC_TEAM. Reihenfolge der Antworten wird bei jedem Spiel neu
   gemischt; die Buchstaben-ids erscheinen nie.
===================================================================== */
(function(){
'use strict';

var root=null, bild=null, text=null, kopf=null;
var T=null;      /* Stufendaten */
var L=null;      /* Lauf */
var GELADEN={};

var WT={
  weiter:['Weiter','Continue','متابعة'],
  bestaetigen:['Bestätigen','Confirm','تأكيد'],
  besser:['Besser wäre gewesen:','The best choice was:','الأفضل كان:'],
  punkte:['Punkte','points','نقاط'],
  abbrechen:['Gespräch verlassen? Es beginnt dann wieder von vorn.','Leave the conversation? It will start again from the beginning.','أترك الحديث؟ سيبدأ من جديد.'],
  laden:['Wird geladen …','Loading …','جارٍ التحميل …'],
  ladeFehler:['Die Stufe konnte nicht geladen werden. Bitte Verbindung prüfen.','The stage could not be loaded. Please check your connection.','تعذّر تحميل المرحلة. تحقّق من الاتصال.'],
  zurueck:['Zurück in die Küche','Back to the kitchen','العودة إلى المطبخ'],
  nochmal:['Noch einmal','Play again','إعادة'],
  waehle:['Wähle genau {n}.','Choose exactly {n}.','أختار {n} بالضبط.'],
  gewaehlt:['{k} von {n} gewählt','{k} of {n} chosen','اخترت {k} من {n}'],
  ich:['Ich','Me','أنا'],
  quelle:['Quelle','Source','المرجع'],
  ersteMal:['Punkte zählen beim ersten Durchgang.','Points count on the first run.','النقاط تُحتسب في المرة الأولى.'],
  /* Plantafel (Bedienung, kein Fachtext) */
  planOk:['Plan bestätigen','Confirm the plan','تأكيد الخطة'],
  keineWarnung:['Keine Warnung.','No warnings.','لا إنذار.'],
  tafelHilfe:['Feld antippen = füllen oder leeren · über eine Zeile wischen = mehrere Felder. Zum Blättern über die Uhrzeiten oder eine graue Zeile wischen.',
              'Tap a slot to fill or clear it · swipe along a row for several slots. To scroll, swipe over the times or a grey row.',
              'انقر خانة لتملأها أو تفرّغها · اسحب على الصف لعدة خانات. للتمرير اسحب على شريط الساعات أو على صف رمادي.'],
  pauseHilfe:['Pause in die Zeile von {n} ziehen, oder antippen und dann ein Feld wählen.',
              'Drag the break into {n}\'s row, or tap it and then pick a slot.',
              'اسحب الاستراحة إلى صف {n}، أو انقرها ثم اختر خانة.'],
  pauseBereit:['Jetzt ein Feld in der Zeile von {n} antippen.','Now tap a slot in {n}\'s row.','الآن انقر خانة في صف {n}.'],
  meinPlan:['Mein Plan','My plan','خطتي'],
  musterPlan:['Musterplan','Model plan','الخطة النموذجية'],
  pauseFenster:['Gestrichelt: hier darf die Pause beginnen.','Dashed: the break may start here.','المنقّط: هنا يجوز أن تبدأ الاستراحة.'],
  rolle_apotheker:['Apotheker','Pharmacist','صيدلاني'],
  rolle_pta:['PTA','PTA','PTA'],
  /* TEAM03 · Belege, Aufgabentafel */
  ansehen:['Tabelle ansehen','View table','عرض الجدول'],
  waehlen:['Als Beleg wählen','Choose as evidence','أختاره دليلاً'],
  abwaehlen:['Abwählen','Deselect','إلغاء الاختيار'],
  schliessen:['Schließen','Close','إغلاق'],
  fertig:['Fertig','Done','انتهيت'],
  offen:['Offen','Open','غير موزّعة'],
  hierAblegen:['hier antippen, um die Karte abzulegen','tap here to put the card back','اضغط هنا لإعادة البطاقة'],
  vertretung:['Vertretung','Deputy','نائب'],
  nichtSelbst:['Die Vertretung muss eine andere Person sein.','The deputy must be someone else.','النائب يجب أن يكون شخصاً آخر.']
};
function li(){ return state.lang==='en'?1:(state.lang==='ar'?2:0); }
function w(k){ var v=WT[k]; return v? v[li()] : k; }
function tr(o){ return (o && (o[state.lang]||o.de)) || ''; }
function el(tag,cls,eltern,txt){ var e=document.createElement(tag); if(cls) e.className=cls; if(txt!=null) e.textContent=txt; if(eltern) eltern.appendChild(e); return e; }
function knopf(txt,fn,eltern,cls){ var b=el('button',cls||'tm-btn',eltern,txt); b.type='button'; b.addEventListener('click',fn); return b; }
function mischen(a){ a=a.slice(); for(var i=a.length-1;i>0;i--){ var j=Math.floor(Math.random()*(i+1)); var t=a[i]; a[i]=a[j]; a[j]=t; } return a; }
function absatz(eltern,txt,cls){ String(txt||'').split('\n').forEach(function(z){ if(z.trim()) el('p',cls||'tm-p',eltern,z); }); }
function farbe(g){ return g==='green'?'gruen':(g==='yellow'?'gelb':'rot'); }

/* ---------- Bild mit weicher Ueberblendung ----------
   Zwei Ebenen. Das neue Bild wird erst dekodiert, dann blendet es ueber
   das alte: kein weisser Blitz zwischen zwei Gesichtern. */
var ebenen=null, oben=0, bildToken=0;
function bildSetzen(src, dauer){
  var token=++bildToken;
  var a=ebenen[oben], b=ebenen[1-oben];
  if(a.getAttribute('src')===src && a.style.opacity!=='0') return Promise.resolve();
  b.style.transition='none'; b.style.opacity='0'; b.src=src;
  var fertig=(b.decode? b.decode() : Promise.resolve()).catch(function(){});
  return fertig.then(function(){
    if(token!==bildToken) return;
    b.style.transition='opacity '+(dauer==null?250:dauer)+'ms ease';
    /* Erzwingt den Stil, sonst springt der Uebergang. */
    void b.offsetWidth;
    b.style.opacity='1'; b.style.zIndex='2'; a.style.zIndex='1';
    oben=1-oben;
    return new Promise(function(ok){ setTimeout(function(){ if(token===bildToken){ a.style.opacity='0'; } ok(); }, (dauer==null?250:dauer)+20); });
  });
}
function vorladen(liste){ liste.forEach(function(u){ if(!u) return; var i=new Image(); i.decoding='async'; i.src=u; }); }

/* ---------- Geruest ---------- */
function geruest(){
  stil();
  if(!root){ root=el('section','screen',document.body); root.id='teamScreen'; }
  root.replaceChildren();
  var wrap=el('div','tm-wrap',root);
  kopf=el('header','tm-kopf',wrap);
  var zu=knopf('✕',function(){ if(window.confirm(w('abbrechen'))) raus(); },kopf,'tm-zu'); zu.setAttribute('aria-label','close');
  el('span','tm-titel',kopf, T? tr(T.title) : '');
  L && (L.fortschrittEl=el('span','tm-dots',kopf));
  var spalte=el('div','tm-spalte',wrap);
  bild=el('div','tm-bild',spalte);
  ebenen=[el('img','tm-ebene',bild), el('img','tm-ebene',bild)];
  ebenen.forEach(function(i){ i.alt=''; i.decoding='async'; i.style.opacity='0'; });
  oben=0;
  text=el('div','tm-text',spalte);
  text.dir=state.lang==='ar'?'rtl':'ltr';
  showNow('teamScreen');
}
function fortschritt(){
  if(!L||!L.fortschrittEl) return;
  L.fortschrittEl.replaceChildren();
  var n=T.steps.length+2;
  for(var i=0;i<n;i++) el('span','tm-dot'+(i<L.idx?' fertig':'')+(i===L.idx?' jetzt':''),L.fortschrittEl);
}
function textLeeren(){ text.replaceChildren(); try{ root.querySelector('.tm-spalte').scrollTo(0,0); }catch(e){} }
function raus(){
  stopUhr();
  try{ enterRoom('kueche'); openWorld(); }catch(e){ try{ showNow('worldScreen'); }catch(e2){} }
}

/* ---------- Ablauf ---------- */
function weiterSchritt(){
  L.idx++; fortschritt();
  var s=T.steps[L.idx-1];
  if(!s) return epilog();
  if(s.type==='intro' || s.type==='story') return introSchritt(s);
  /* board = Plantafel (PLAN01). Aufgabentafel TEAM03 heisst aufgabentafel (Brief v002). */
  if(s.type==='board') return tafelSchritt(s);
  if(s.type==='aufgabentafel') return aufgabenTafel(s);
  if(s.type==='evidence') return evidenceSchritt(s);
  if(s.type==='timeskip') return zeitsprungSchritt(s);
  if(s.type==='timer') return wahlSchritt(s,true);
  if(s.type==='choice') return wahlSchritt(s,false);
  if(s.type==='dialog') return dialogSchritt(s);
  if(s.type==='cards') return kartenSchritt(s);
  weiterSchritt();
}
function introSchritt(s){
  textLeeren(); bild.classList.remove('flach');
  bildSetzen(s.img,0);
  absatz(text,tr(s.text));
  knopf(w('weiter'),weiterSchritt,text,'tm-btn tm-haupt');
}

/* ---------- Folgekarte ---------- */
function folge(eltern, opt, alle, haupttext, extra){
  var k=el('div','tm-folge '+farbe(opt.grade),eltern);
  if(extra) el('p','tm-extra',k,tr(extra));
  absatz(k,tr(haupttext));
  el('div','tm-pkt',k,'+'+(opt.points||0)+' '+w('punkte'));
  if(opt.grade!=='green'){
    var g=alle.filter(function(o){ return o.grade==='green'; })[0];
    if(g){ el('p','tm-besser',k,w('besser')); absatz(k,tr(g.line||g.text),'tm-p tm-gruen'); }
  }
  try{ k.scrollIntoView({block:'nearest',behavior:'smooth'}); }catch(e){}
  return k;
}

/* ---------- timer / choice ---------- */
var uhr=null;
function stopUhr(){ if(uhr){ cancelAnimationFrame(uhr.raf); uhr=null; } }
function wahlSchritt(s, mitUhr){
  textLeeren(); stopUhr(); bild.classList.remove('flach');
  vorladen(s.options.map(function(o){ return o.img; }).concat(s.outro? [s.outro.img] : []));
  var geladen=bildSetzen(s.img,0);
  absatz(text,tr(s.text));
  var balken=null;
  if(mitUhr){ var bb=el('div','tm-uhr',text); balken=el('div','tm-uhr-in',bb); }
  var liste=el('div','tm-optionen',text), zone=el('div',null,text), fertig=false;
  var opts=mischen(s.options);
  function waehlen(o, extra){
    if(fertig) return; fertig=true; stopUhr();
    liste.querySelectorAll('button').forEach(function(b){ b.disabled=true; if(b._o===o) b.classList.add('gewaehlt'); });
    L.punkte[s.id]=(o.points||0); L.wahl[s.id]=o.id;
    if(o.img) bildSetzen(o.img);
    folge(zone,o,s.options,o.result,extra);
    var nx=el('div','tm-reihe',zone);
    knopf(w('weiter'),function(){
      if(s.outro){ textLeeren(); bildSetzen(s.outro.img); absatz(text,tr(s.outro.text)); knopf(w('weiter'),weiterSchritt,text,'tm-btn tm-haupt'); }
      else weiterSchritt();
    },nx,'tm-btn tm-haupt');
  }
  opts.forEach(function(o){ var b=knopf(tr(o.text),function(){ waehlen(o); },liste,'tm-option'); b._o=o; });
  if(mitUhr){
    /* Die Uhr laeuft erst, wenn Bild und Text vollstaendig da sind. */
    var sek=s.seconds||10;
    geladen.then(function(){
      if(fertig || T.steps[L.idx-1]!==s) return;
      var start=performance.now();
      uhr={raf:0};
      (function tick(){
        if(!uhr) return;
        var rest=Math.max(0,sek-(performance.now()-start)/1000);
        balken.style.width=(rest/sek*100).toFixed(2)+'%';
        balken.parentNode.classList.toggle('knapp',rest<=3);
        if(rest<=0){ var t=s.options.filter(function(o){ return o.id===s.timeoutOption; })[0]; uhr=null; waehlen(t,s.timeoutExtra); return; }
        uhr.raf=requestAnimationFrame(tick);
      })();
      L.uhrLaeuft=true;
    });
  }
  L.aktuell={ waehlen:function(id){ waehlen(s.options.filter(function(o){ return o.id===id; })[0]); }, opts:opts };
}

/* ---------- dialog: Gesicht reagiert auf jeden Satz ---------- */
function dialogSchritt(s){
  textLeeren();
  vorladen(Object.keys(s.faces).map(function(k){ return s.faces[k]; }));
  bildSetzen(s.faces[s.startFace],0);
  absatz(text,tr(s.opening),'tm-p tm-rede');
  var verlauf=el('div','tm-verlauf',text);
  var runde=0; L.punkte[s.id]=0;
  function rundeZeigen(){
    var r=s.rounds[runde];
    var liste=el('div','tm-optionen',verlauf), fertig=false;
    mischen(r.options).forEach(function(o){
      var b=knopf(tr(o.line),function(){
        if(fertig) return; fertig=true;
        liste.remove();
        L.punkte[s.id]+=(o.points||0);
        /* Erst das Gesicht, dann mein Satz, dann seine Antwort, dann die Folge */
        bildSetzen(s.faces[o.face]||s.faces[s.startFace]).then(function(){
          var ich=el('div','tm-sprech ich',verlauf); el('b',null,ich,w('ich')); absatz(ich,tr(o.line));
          var folgeK=folge(verlauf,o,r.options,o.reply||{de:'',en:'',ar:''});
          var nx=el('div','tm-reihe',folgeK);
          runde++;
          knopf(w('weiter'),function(){ nx.remove(); if(runde<s.rounds.length) rundeZeigen(); else weiterSchritt(); },nx,'tm-btn tm-haupt');
        });
      },liste,'tm-option');
      b._o=o;
    });
    try{ liste.scrollIntoView({block:'nearest',behavior:'smooth'}); }catch(e){}
    L.aktuell={ waehlen:function(id){ var b=[].slice.call(liste.querySelectorAll('button')).filter(function(x){ return x._o.id===id; })[0]; b.click(); } };
  }
  rundeZeigen();
}

/* ---------- cards: genau pick Karten ---------- */
function kartenSchritt(s){
  textLeeren();
  /* Ohne eigenes Bild bleibt das letzte stehen (TEAM03: Systemkarten nach dem Ende) */
  if(s.img) bildSetzen(s.img,0);
  absatz(text,tr(s.text),'tm-p tm-rede');
  var n=s.pick||2;
  el('p','tm-hinweis',text,w('waehle').replace('{n}',n));
  var gitter=el('div','tm-karten',text), gew=[], zaehler=el('p','tm-zaehler',text);
  var ok=knopf(w('bestaetigen'),bestaetigen,text,'tm-btn tm-haupt'); ok.disabled=true;
  var karten=mischen(s.cards), knoepfe=[];
  karten.forEach(function(c){
    var b=el('button','tm-karte',gitter); b.type='button'; b._c=c;
    absatz(b,tr(c.text),'tm-p');
    b.addEventListener('click',function(){
      if(ok.dataset.fertig) return;
      var i=gew.indexOf(c);
      if(i>=0){ gew.splice(i,1); b.classList.remove('gewaehlt'); }
      else { if(gew.length>=n) return; gew.push(c); b.classList.add('gewaehlt'); }
      malen();
    });
    knoepfe.push(b);
  });
  function malen(){
    zaehler.textContent=w('gewaehlt').replace('{k}',gew.length).replace('{n}',n);
    ok.disabled = gew.length!==n;
    knoepfe.forEach(function(b){ b.disabled = !b.classList.contains('gewaehlt') && gew.length>=n; });
  }
  malen();
  function bestaetigen(){
    if(gew.length!==n) return;
    ok.dataset.fertig='1'; ok.remove(); zaehler.remove();
    var p=0; gew.forEach(function(c){ p+=(c.good?(c.points||0):0); });
    L.punkte[s.id]=p; L.wahl[s.id]=gew.map(function(c){ return c.id; });
    /* Alle Karten drehen sich um: gute gruen, schlechte rot mit Begruendung */
    knoepfe.forEach(function(b){
      var c=b._c; b.disabled=true; b.classList.add('gedreht', c.good?'gut':'schlecht');
      if(!c.good && c.why) el('p','tm-why',b,tr(c.why));
    });
    var k=el('div','tm-folge '+(p>=20?'gruen':(p>0?'gelb':'rot')),text);
    el('div','tm-pkt',k,'+'+p+' '+w('punkte'));
    var nx=el('div','tm-reihe',text);
    knopf(w('weiter'),weiterSchritt,nx,'tm-btn tm-haupt');
    try{ k.scrollIntoView({block:'nearest',behavior:'smooth'}); }catch(e){}
  }
  L.aktuell={ waehlen:function(ids){ ids.forEach(function(id){ knoepfe.filter(function(b){ return b._c.id===id; })[0].click(); }); ok.click(); } };
}


/* =====================================================================
   board · Plantafel (PLAN01 §3, 16.11.2026)
   Zeilen = Personen, Spalten = 30-Minuten-Felder. Fuellen per Tippen
   oder Wischen in der Zeile; Pause als eigene Karte, die auf einem
   Feld liegt (darunter bleibt der Plan, wie er war). Warnungen nach
   jeder Beruehrung. Blaettern: Uhrzeitleiste und graue Zeilen lassen
   das native Wischen durch, Arbeitszeilen nicht (touch-action pan-y).
===================================================================== */
var SCHLOSS='<svg viewBox="0 0 16 16" width="13" height="13" aria-hidden="true"><rect x="3" y="7" width="10" height="8" rx="1.5" fill="currentColor"/><path d="M5 7V5a3 3 0 0 1 6 0v2" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>';
var ALARM_REIHE=['noPharmacist','tooLong','breakAlone','overTen','noBreak'];
function minuten(t){ var m=String(t).split(':'); return (+m[0])*60+(+m[1]); }
function uhrText(m){ return Math.floor(m/60)+':'+('0'+(m%60)).slice(-2); }

function tafelModell(s){
  var st=minuten(s.day.start), en=minuten(s.day.end), d=s.day.slotMinutes||30, n=Math.round((en-st)/d);
  var M={ s:s, st:st, d:d, n:n, arbeit:{}, pause:-1, pid:(s.breakTile&&s.breakTile.for)||null };
  s.people.forEach(function(p){ M.arbeit[p.id]=[]; for(var i=0;i<n;i++) M.arbeit[p.id].push(false); });
  return M;
}
function person(M,id){ return M.s.people.filter(function(p){ return p.id===id; })[0]; }
function zeit(M,i){ return M.st+i*M.d; }
function gesperrtGrund(M,p,i){
  var a=zeit(M,i), b=a+M.d, g=null;
  (p.locked||[]).forEach(function(l){ if(a>=minuten(l.from) && b<=minuten(l.to)) g=l; });
  return g;
}
function frei(M,p,i){
  if(p.blocked || !p.available) return false;
  var a=zeit(M,i);
  if(a<minuten(p.available[0]) || a+M.d>minuten(p.available[1])) return false;
  return !gesperrtGrund(M,p,i);
}
function arbeitet(M,id,i){ return M.arbeit[id][i] && !(id===M.pid && M.pause===i); }

/* Warnungen: Typen fuer die Punkte, Orte fuer die Anzeige */
function tafelAlarme(M){
  var s=M.s, R=s.rules||{}, A={typen:{}, spalten:{}, zellen:{}, namen:{}};
  var ap=s.people.filter(function(p){ return p.role==='apotheker' && !p.blocked; }).map(function(p){ return p.id; });
  if(R.pharmacistAlways!==false){
    for(var i=0;i<M.n;i++){
      if(!ap.some(function(id){ return arbeitet(M,id,i); })){ A.spalten[i]=1; A.typen.noPharmacist=1; }
    }
  }
  var k=M.pid; if(!k) return A;
  var maxAm=(R.maxContinuousHours||6)*60, maxTag=(R.maxDailyHours||10)*60, lauf=0, summe=0;
  for(var j=0;j<M.n;j++){
    if(arbeitet(M,k,j)){ lauf+=M.d; summe+=M.d;
      if(lauf>maxAm){ A.zellen[k+'_'+j]='tooLong'; A.typen.tooLong=1; } }
    else lauf=0;
  }
  if(M.pause>=0 && R.breakNeedsOtherPharmacist!==false){
    var andere=ap.filter(function(id){ return id!==k; }).some(function(id){ return arbeitet(M,id,M.pause); });
    if(!andere){ A.zellen[k+'_'+M.pause]='breakAlone'; A.typen.breakAlone=1; }
  }
  if(summe>maxTag){ A.namen[k]=1; A.typen.overTen=1; }
  if(summe>maxAm && M.pause<0){ A.namen[k]=1; A.typen.noBreak=1; }
  return A;
}

/* Tafel zeichnen. nurLesen: Musterplan und Plan nach dem Bestaetigen */
function tafelZeichnen(host, M, opt){
  opt=opt||{};
  host.replaceChildren();
  var s=M.s, A=tafelAlarme(M);
  var rahmen=el('div','tb-scroll',host); rahmen.dir=state.lang==='ar'?'rtl':'ltr';
  var g=el('div','tb-grid',rahmen);
  g.style.gridTemplateColumns='var(--tbName) repeat('+M.n+', minmax(var(--tbZelle),1fr))';
  g.style.minWidth='calc(var(--tbName) + '+M.n+' * var(--tbZelle))';
  var zeile=1;
  /* Uhrzeiten */
  el('div','tb-ecke',g).style.gridRow=zeile;
  for(var i=0;i<M.n;i++){
    var h=el('div','tb-uhr',g);
    if(zeit(M,i)%60===0) el('span',null,h,uhrText(zeit(M,i))).dir='ltr';
    h.style.gridRow=zeile; h.style.gridColumn=(i+2);
  }
  s.people.forEach(function(p){
    zeile++;
    var nm=el('div','tb-name '+(p.role==='pta'?'pta':'apo')+(A.namen[p.id]?' alarm':''),g);
    nm.style.gridRow=zeile;
    el('b',null,nm,tr(p.name)); el('small',null,nm,w('rolle_'+(p.role==='pta'?'pta':'apotheker')));
    if(p.blocked){
      var bl=el('div','tb-block',g); bl.style.gridRow=zeile; bl.style.gridColumn='2 / span '+M.n;
      bl.innerHTML=SCHLOSS; bl._grund=p.blocked; bl._name=p.name;
      return;
    }
    for(var j=0;j<M.n;j++){
      var z=el('div','tb-z',g); z.style.gridRow=zeile; z.style.gridColumn=(j+2);
      z.dataset.p=p.id; z.dataset.i=j;
      var gr=gesperrtGrund(M,p,j);
      if(gr) z.classList.add('gesperrt');
      else if(!frei(M,p,j)) z.classList.add('aus');
      else { z.classList.add('frei'); if(M.arbeit[p.id][j]) z.classList.add(p.role==='pta'?'an-pta':'an-apo'); }
      if(p.id===M.pid && M.pause===j){ z.classList.add('pause'); z.title=tr(s.breakTile.label); }
      if(A.zellen[p.id+'_'+j]) z.classList.add('alarm');
      if(opt.fenster && p.id===M.pid && opt.fenster.indexOf(j)>=0) z.classList.add('fenster');
    }
    /* Text ueber gesperrten Bloecken */
    (p.locked||[]).forEach(function(l){
      var a=Math.round((minuten(l.from)-M.st)/M.d), b=Math.round((minuten(l.to)-M.st)/M.d);
      if(b<=0||a>=M.n) return;
      var t=el('div','tb-sperrtext',g,tr(l.reason)); t.style.gridRow=zeile; t.style.gridColumn=(Math.max(a,0)+2)+' / '+(Math.min(b,M.n)+2);
    });
  });
  /* rote Linie unter Spalten ohne Apotheker */
  zeile++;
  el('div','tb-ecke',g).style.gridRow=zeile;
  for(var c=0;c<M.n;c++){ var r=el('div','tb-rot'+(A.spalten[c]?' an':''),g); r.style.gridRow=zeile; r.style.gridColumn=(c+2); }
  return {g:g, A:A, rahmen:rahmen};
}

function tafelSchritt(s){
  textLeeren();
  bild.classList.add('flach');
  bildSetzen(s.img,0);
  absatz(text,tr(s.text),'tm-p tm-rede');
  var M=tafelModell(s), fertig=false, scharf=false;
  var pName=M.pid? tr(person(M,M.pid).name) : '';
  el('p','tb-hilfe',text,w('tafelHilfe'));
  var host=el('div','tb-host',text);
  var info=el('div','tb-info',text);
  var ablage=el('div','tb-ablage',text), chip=null;
  if(s.breakTile){
    chip=el('button','tb-chip',ablage,tr(s.breakTile.label)+' · '+s.breakTile.minutes+' min'); chip.type='button';
    el('span','tb-chiphilfe',ablage,w('pauseHilfe').replace('{n}',pName));
  }
  var warnBox=el('div','tb-warn',text);
  var ok=knopf(w('planOk'),bestaetigen,el('div','tm-reihe',text),'tm-btn tm-haupt');
  var zone=el('div',null,text);
  var ansicht=null;

  function malen(){
    var sl=ansicht? ansicht.rahmen.scrollLeft : null;
    ansicht=tafelZeichnen(host,M);
    if(sl!=null) ansicht.rahmen.scrollLeft=sl;
    warnungen(warnBox,ansicht.A);
    if(chip){ chip.classList.toggle('gelegt',M.pause>=0); chip.classList.toggle('scharf',scharf); }
  }
  function zeigeInfo(t){ info.textContent=t||''; info.classList.toggle('an',!!t); }

  /* ---- Fuellen und Leeren ---- */
  var zug=null;
  function zelleAus(x,y){ var e=document.elementFromPoint(x,y); return e && e.classList && e.classList.contains('tb-z')? e : null; }
  function setzen(pid,i,an){
    var p=person(M,pid); if(!p || !frei(M,p,i)) return false;
    if(pid===M.pid && M.pause===i) return false;
    if(M.arbeit[pid][i]===an) return false;
    M.arbeit[pid][i]=an; return true;
  }
  function pauseLegen(i){
    var p=person(M,M.pid); if(!p || !frei(M,p,i)) return false;
    M.pause=i; return true;
  }
  host.addEventListener('pointerdown',function(ev){
    if(fertig) return;
    var t=ev.target;
    var blk=t.closest && t.closest('.tb-block');
    if(blk){ zeigeInfo(tr(blk._name)+': '+tr(blk._grund)); return; }
    var z=t.closest && t.closest('.tb-z');
    if(!z) return;
    if(z.classList.contains('gesperrt')){ var p0=person(M,z.dataset.p), g0=gesperrtGrund(M,p0,+z.dataset.i); zeigeInfo(g0? tr(g0.reason):''); return; }
    if(!z.classList.contains('frei')) return;
    var pid=z.dataset.p, i=+z.dataset.i;
    if(pid===M.pid && M.pause===i){ zug={art:'pause',x:ev.clientX,y:ev.clientY,id:ev.pointerId,bewegt:false}; }
    else zug={art:'malen',pid:pid,i:i,an:!M.arbeit[pid][i],x:ev.clientX,y:ev.clientY,id:ev.pointerId,bewegt:false,besucht:{}};
    try{ host.setPointerCapture(ev.pointerId); }catch(e){}
  });
  host.addEventListener('pointermove',function(ev){
    if(!zug||ev.pointerId!==zug.id) return;
    if(!zug.bewegt && Math.abs(ev.clientX-zug.x)+Math.abs(ev.clientY-zug.y)<7) return;
    if(zug.art==='malen'){
      if(!zug.bewegt){ zug.bewegt=true; if(setzen(zug.pid,zug.i,zug.an)) malen(); zug.besucht[zug.i]=1; }
      var z=zelleAus(ev.clientX,ev.clientY);
      /* in der eigenen Zeile bleiben: Hoehe der Startzeile, Spalte vom Finger */
      if(!z || z.dataset.p!==zug.pid){
        var zeilen=host.querySelectorAll('.tb-z[data-p="'+zug.pid+'"]'); if(!zeilen.length) return;
        var r0=zeilen[0].getBoundingClientRect(); z=zelleAus(ev.clientX, r0.top+r0.height/2);
        if(!z || z.dataset.p!==zug.pid) return;
      }
      var j=+z.dataset.i, a=Math.min(j,zug.i), b=Math.max(j,zug.i), geaendert=false;
      for(var k=a;k<=b;k++){ if(setzen(zug.pid,k,zug.an)) geaendert=true; }
      if(geaendert){ malen(); try{ navigator.vibrate&&navigator.vibrate(5); }catch(e){} }
    } else {
      zug.bewegt=true; geistBewegen(ev.clientX,ev.clientY);
    }
  });
  function hoch(ev){
    if(!zug||ev.pointerId!==zug.id) return;
    var z0=zug; zug=null;
    if(z0.art==='malen'){
      if(!z0.bewegt){
        if(scharf && z0.pid===M.pid){ scharf=false; pauseLegen(z0.i); zeigeInfo(''); }
        else setzen(z0.pid,z0.i,z0.an);
        malen();
      }
    } else {
      geistWeg();
      if(!z0.bewegt){ M.pause=-1; malen(); return; }
      var z=zelleAus(ev.clientX,ev.clientY);
      if(z && z.dataset.p===M.pid) pauseLegen(+z.dataset.i); else M.pause=-1;
      malen();
    }
  }
  host.addEventListener('pointerup',hoch); host.addEventListener('pointercancel',function(ev){ if(zug&&zug.art==='pause') geistWeg(); zug=null; });

  /* ---- Pausenkarte ziehen oder antippen ---- */
  var geist=null;
  function geistBewegen(x,y){
    if(!geist){ geist=el('div','tb-geist',document.body,tr(s.breakTile.label)); }
    geist.style.left=x+'px'; geist.style.top=y+'px';
  }
  function geistWeg(){ if(geist){ geist.remove(); geist=null; } }
  if(chip){
    var cz=null;
    chip.addEventListener('pointerdown',function(ev){
      if(fertig) return;
      cz={x:ev.clientX,y:ev.clientY,id:ev.pointerId,bewegt:false};
      try{ chip.setPointerCapture(ev.pointerId); }catch(e){} ev.preventDefault();
    });
    chip.addEventListener('pointermove',function(ev){
      if(!cz||ev.pointerId!==cz.id) return;
      if(!cz.bewegt && Math.abs(ev.clientX-cz.x)+Math.abs(ev.clientY-cz.y)<7) return;
      cz.bewegt=true; geistBewegen(ev.clientX,ev.clientY);
    });
    chip.addEventListener('pointerup',function(ev){
      if(!cz||ev.pointerId!==cz.id) return;
      var c0=cz; cz=null; geistWeg();
      if(!c0.bewegt){ scharf=!scharf; zeigeInfo(scharf? w('pauseBereit').replace('{n}',pName):''); malen(); return; }
      var z=zelleAus(ev.clientX,ev.clientY);
      if(z && z.dataset.p===M.pid && pauseLegen(+z.dataset.i)){ scharf=false; zeigeInfo(''); }
      malen();
    });
    chip.addEventListener('pointercancel',function(){ cz=null; geistWeg(); });
  }

  malen();

  function bestaetigen(){
    if(fertig) return; fertig=true; scharf=false; zeigeInfo('');
    host.classList.add('fest'); ok.parentNode.remove(); ablage.remove();
    text.querySelector('.tb-hilfe').remove();
    var A=tafelAlarme(M), anzahl=Object.keys(A.typen).length;
    var pkt=Math.max(0,(s.points||0)-(s.penaltyPerAlarm||0)*anzahl);
    L.punkte[s.id]=pkt; L.wahl[s.id]={arbeit:M.arbeit, pause:M.pause, alarme:Object.keys(A.typen)};
    host.insertAdjacentElement('beforebegin', el('h4','tb-h4',null,w('meinPlan')));
    var k=el('div','tm-folge '+(pkt>=(s.points||0)?'gruen':(pkt>0?'gelb':'rot')),zone);
    el('div','tm-pkt',k,'+'+pkt+' '+w('punkte'));
    /* Musterplan in denselben Farben */
    if(s.solution){
      var MM=tafelModell(s), sol=s.solution;
      Object.keys(sol).forEach(function(pid){
        if(!MM.arbeit[pid]) return;
        sol[pid].forEach(function(r){
          for(var i=0;i<MM.n;i++){ var a=zeit(MM,i); if(a>=minuten(r[0]) && a+MM.d<=minuten(r[1])) MM.arbeit[pid][i]=true; }
        });
      });
      var fenster=(sol.karimBreakStartAllowed||[]).map(function(t){ return Math.round((minuten(t)-MM.st)/MM.d); });
      if(fenster.length) MM.pause=fenster[0];
      el('h4','tb-h4',zone,w('musterPlan'));
      var mh=el('div','tb-host fest',zone);
      tafelZeichnen(mh,MM,{fenster:fenster});
      if(fenster.length) el('p','tb-klein',zone,w('pauseFenster'));
      if(s.solutionText) absatz(zone,tr(s.solutionText));
    }
    knopf(w('weiter'),weiterSchritt,el('div','tm-reihe',zone),'tm-btn tm-haupt');
    try{ k.scrollIntoView({block:'nearest',behavior:'smooth'}); }catch(e){}
  }
  L.aktuell={ M:M,
    setzen:function(pid,von,bis){ for(var i=0;i<M.n;i++){ var a=zeit(M,i); if(a>=minuten(von)&&a+M.d<=minuten(bis)) setzen(pid,i,true); } malen(); },
    pause:function(t){ pauseLegen(Math.round((minuten(t)-M.st)/M.d)); malen(); },
    alarme:function(){ return Object.keys(tafelAlarme(M).typen); },
    bestaetigen:bestaetigen };
}
function warnungen(box,A){
  box.replaceChildren();
  var aktiv=ALARM_REIHE.filter(function(k){ return A.typen[k]; });
  var s=T.steps[L.idx-1];
  if(!aktiv.length){ el('p','tb-ok',box,w('keineWarnung')); return; }
  var ul=el('ul','tb-warnliste',box);
  aktiv.forEach(function(k){ el('li',null,ul,tr(s.alarms && s.alarms[k])); });
}

/* =====================================================================
   evidence · Belege (TEAM03 §4, 25.11.2026)
   Vier Karten, genau pick antippen, dann Bestaetigen. Punkte = Summe
   der points der gewaehlten Karten. Danach alle why-Texte, gute gruen.
   Karte mit overlay: Antippen oeffnet das Bild gross mit einer eigenen
   Papierkarte darueber (die Raster im Bild passen nicht zu den Daten,
   darum nicht aufs Bild geklebt, Brief §4 Ausweichweg).
===================================================================== */
function evidenceSchritt(s){
  textLeeren();
  bildSetzen(s.items.filter(function(i){ return i.img; })[0].img,0);
  absatz(text,tr(s.text),'tm-p tm-rede');
  var n=s.pick||2;
  el('p','tm-hinweis',text,w('waehle').replace('{n}',n));
  var gitter=el('div','ev-gitter',text), gew=[], knoepfe=[];
  var zaehler=el('p','tm-zaehler',text);
  var ok=knopf(w('bestaetigen'),bestaetigen,text,'tm-btn tm-haupt'); ok.disabled=true;
  vorladen(s.items.map(function(i){ return i.img; }));
  s.items.forEach(function(it){
    var b=el('button','ev-karte'+(it.img?'':' nurtext'),gitter); b.type='button'; b._it=it;
    if(it.img){ var im=el('img',null,b); im.src=it.img; im.alt=''; im.decoding='async'; }
    var unt=el('div','ev-label',b);
    if(it.overlay) el('span','ev-lupe',unt,w('ansehen'));
    el('span',null,unt,tr(it.label));
    b.addEventListener('click',function(){
      if(ok.dataset.fertig) return;
      if(it.overlay) return grossZeigen(it);
      umschalten(it);
    });
    knoepfe.push(b);
  });
  function umschalten(it){
    var i=gew.indexOf(it);
    if(i>=0) gew.splice(i,1); else { if(gew.length>=n) return; gew.push(it); }
    malen();
  }
  function malen(){
    zaehler.textContent=w('gewaehlt').replace('{k}',gew.length).replace('{n}',n);
    ok.disabled = gew.length!==n;
    knoepfe.forEach(function(b){ var an=gew.indexOf(b._it)>=0; b.classList.toggle('gewaehlt',an);
      b.classList.toggle('blass', !an && gew.length>=n); });
  }
  malen();
  /* Grosse Ansicht mit Zeittabelle */
  function grossZeigen(it){
    var O=s.overlays && s.overlays[it.overlay];
    var hg=el('div','ev-gross',root); hg.dir=state.lang==='ar'?'rtl':'ltr';
    var box=el('div','ev-box',hg);
    var bb=el('div','ev-bildbox',box); var im=el('img',null,bb); im.src=it.img; im.alt='';
    if(O){
      var pap=el('div','ev-papier',bb);
      var tab=el('table','ev-tab',pap), kopfz=el('tr',null,el('thead',null,tab));
      el('th',null,kopfz,'');
      tr(O.days).forEach(function(d){ el('th',null,kopfz,d); });
      var tb=el('tbody',null,tab);
      O.weeks.forEach(function(wk,r){
        var z=el('tr',null,tb); el('th',null,z,wk);
        O.hours[r].forEach(function(h,c){
          var rot=(O.highlight||[]).some(function(x){ return x[0]===r && x[1]===c; });
          var td=el('td',rot?'rot':null,z); var bd=el('bdi',null,td,h);
        });
      });
    }
    el('p','ev-gtitel',box,tr(it.label));
    var reihe=el('div','tm-reihe',box);
    var an=gew.indexOf(it)>=0;
    knopf(an?w('abwaehlen'):w('waehlen'),function(){ umschalten(it); hg.remove(); },reihe,'tm-btn tm-haupt')
      .disabled = !an && gew.length>=n;
    knopf(w('schliessen'),function(){ hg.remove(); },reihe,'tm-btn');
    hg.addEventListener('click',function(e){ if(e.target===hg) hg.remove(); });
  }
  function bestaetigen(){
    if(gew.length!==n) return;
    ok.dataset.fertig='1'; ok.remove(); zaehler.remove();
    var p=0; gew.forEach(function(it){ p+=(it.points||0); });
    L.punkte[s.id]=p; L.wahl[s.id]=gew.map(function(it){ return it.id; });
    knoepfe.forEach(function(b){
      var it=b._it; b.disabled=true; b.classList.remove('blass');
      b.classList.add('gedreht', it.good?'gut':'schlecht');
      el('p','ev-why',b,tr(it.why));
    });
    var max=s.items.reduce(function(a,it){ return a+(it.good?(it.points||0):0); },0);
    var k=el('div','tm-folge '+(p>=max?'gruen':(p>0?'gelb':'rot')),text);
    el('div','tm-pkt',k,'+'+p+' '+w('punkte'));
    var nx=el('div','tm-reihe',text);
    knopf(w('weiter'),weiterSchritt,nx,'tm-btn tm-haupt');
    try{ k.scrollIntoView({block:'nearest',behavior:'smooth'}); }catch(e){}
  }
  L.aktuell={ waehlen:function(ids){ ids.forEach(function(id){ var it=s.items.filter(function(x){ return x.id===id; })[0]; umschalten(it); }); ok.click(); } };
}

/* =====================================================================
   aufgabentafel · Aufgabentafel (TEAM03 §5, Brief v002)
   Personen und Aufgaben als eigene HTML-Ebene unter dem Tafelbild.
   Bedienung nur Tippen: Karte antippen, dann Person. Vertretung ueber das
   kleine Feld an Rezeptur/QMS. Abgelehnt wird nur nach Rolle (roles) und
   Person (notPerson); Ueberlast ist erlaubt und kostet erst bei Fertig.
===================================================================== */
function aufgabenTafel(s){
  textLeeren(); bild.classList.add('flach');
  bildSetzen(s.img,0);
  absatz(text,tr(s.text),'tm-p tm-rede');
  var wo={}, vertr={}, wahl=null, fertig=false;   /* wahl={task, dep:bool} */
  s.tasks.forEach(function(t){ wo[t.id]=t.start||null; });
  (s.deputyFor||[]).forEach(function(id){ vertr[id]=null; });
  var dl=s.deputyLoad||1;
  function last(pid){
    var l=0;
    s.tasks.forEach(function(t){ if(wo[t.id]===pid) l+=t.load||0; });
    Object.keys(vertr).forEach(function(id){ if(vertr[id]===pid) l+=dl; });
    return l;
  }
  function aufg(id){ return s.tasks.filter(function(t){ return t.id===id; })[0]; }
  function pers(id){ return s.people.filter(function(p){ return p.id===id; })[0]; }
  var info=el('div','tb-info',text);
  var offen=el('div','at-offen',text);
  var gitter=el('div','at-gitter',text);
  var fert=knopf(w('fertig'),auswerten,text,'tm-btn tm-haupt');
  var erg=el('div',null,text);
  var infoUhr=null;
  function sag(t){ info.textContent=t||''; info.classList.toggle('an',!!t);
    clearTimeout(infoUhr); if(t) infoUhr=setTimeout(function(){ info.textContent=''; info.classList.remove('an'); },3200); }
  function chip(t, dep, eltern){
    var c=el('button','at-chip'+(dep?' dep':'')+(t.critical&&!dep?' krit':''),eltern); c.type='button';
    var ist=wahl && wahl.task===t.id && !!wahl.dep===!!dep;
    if(ist) c.classList.add('scharf');
    el('span','at-cn',c,(dep?w('vertretung')+': ':'')+tr(t.name));
    el('span','at-last',c,'●'.repeat(dep?dl:(t.load||0)));
    c.addEventListener('click',function(e){
      e.stopPropagation(); if(fertig) return;
      wahl = ist ? null : {task:t.id, dep:!!dep};
      sag(''); malen();
    });
    /* Feld "Vertretung" an der Hauptkarte */
    if(!dep && vertr.hasOwnProperty(t.id) && !vertr[t.id]){
      var v=el('span','at-vfeld'+(wahl&&wahl.task===t.id&&wahl.dep?' scharf':''),c,'+ '+w('vertretung'));
      v.addEventListener('click',function(e){
        e.stopPropagation(); if(fertig) return;
        wahl = (wahl&&wahl.task===t.id&&wahl.dep) ? null : {task:t.id, dep:true};
        sag(''); malen();
      });
    }
    return c;
  }
  function ziel(pid){
    if(fertig || !wahl) return;
    var t=aufg(wahl.task), p=pid?pers(pid):null;
    if(wahl.dep){
      if(pid && pid===wo[t.id]){ sag(w('nichtSelbst')); return; }
      vertr[t.id]=pid||null;
    } else {
      if(pid && t.roles && t.roles.indexOf(p.role)<0){ sag(tr(t.reject)); try{ SND.bad(); }catch(e){} return; }
      if(pid && t.notPerson && t.notPerson.indexOf(pid)>=0){ sag(tr(t.reject)); try{ SND.bad(); }catch(e){} return; }
      wo[t.id]=pid||null;
      if(pid && vertr[t.id]===pid) vertr[t.id]=null;
    }
    wahl=null; sag(''); malen();
  }
  function malen(){
    offen.replaceChildren();
    var ok=el('div','at-okopf',offen); el('b',null,ok,w('offen'));
    if(wahl) ok.appendChild(document.createTextNode(' · '+w('hierAblegen')));
    offen.classList.toggle('ziel',!!wahl);
    var oliste=el('div','at-chips',offen);
    s.tasks.forEach(function(t){ if(!wo[t.id]) chip(t,false,oliste); });
    if(!oliste.children.length) el('span','at-leer',oliste,'—');
    gitter.replaceChildren();
    s.people.forEach(function(p){
      var l=last(p.id), cap=p.capacity||0, ueber=l>cap;
      var k=el('div','at-person'+(wahl?' ziel':'')+(ueber?' ueber':''),gitter);
      var h=el('div','at-pkopf',k);
      el('b',null,h,tr(p.name));
      el('small',null,h,w('rolle_'+p.role));
      var bal=el('div','at-balken',k);
      var gr=Math.max(cap,l,1);
      var g=el('i','at-gruen',bal); g.style.width=(Math.min(l,cap)/gr*100)+'%';
      if(ueber){ var r=el('i','at-rot',bal); r.style.width=((l-cap)/gr*100)+'%'; }
      var mark=el('span','at-kap',bal); mark.style.insetInlineStart=(cap/gr*100)+'%';
      var zahl=el('div','at-zahl',k); zahl.dir='ltr'; zahl.textContent=l+' / '+cap;
      var liste=el('div','at-chips',k);
      s.tasks.forEach(function(t){ if(wo[t.id]===p.id) chip(t,false,liste); });
      Object.keys(vertr).forEach(function(id){ if(vertr[id]===p.id) chip(aufg(id),true,liste); });
      k.addEventListener('click',function(){ ziel(p.id); });
    });
  }
  offen.addEventListener('click',function(){ ziel(null); });
  malen();
  function auswerten(){
    if(fertig) return; fertig=true; wahl=null; malen();
    fert.remove(); gitter.classList.add('fest'); offen.classList.add('fest');
    var E={}, p=0;
    var ein=wo.einarbeitung;
    E.emre_frei = last('emre')<=4;
    E.ich_frei  = last('ich')<=4;
    E.michael_ok = last('michael')<=3 && (wo.rezeptur!=='michael' || !!ein);
    E.karim_rolle = ein==='karim' ? 'ok' : (ein ? 'teil' : false);
    E.vertretung_rezeptur = !!vertr.rezeptur;
    E.vertretung_qms = !!vertr.qms;
    var ul=el('ul','at-checks',erg);
    s.checks.forEach(function(c){
      var r=E[c.id], pk, txt, kl;
      if(r==='ok' || r===true){ pk=c.points||0; txt=tr(c.ok); kl='ok'; }
      else if(r==='teil'){ pk=c.partial||0; txt=tr(c.partialText); kl='teil'; }
      else { pk=0; txt=tr(c.fail); kl='fail'; }
      p+=pk;
      var li=el('li',kl,ul); el('span','at-cp',li,'+'+pk); el('span',null,li,txt);
    });
    L.punkte[s.id]=p; L.tafel={ergebnis:E, wo:wo, vertr:vertr};
    var max=s.checks.reduce(function(a,c){ return a+(c.points||0); },0);
    var k=el('div','tm-folge '+(p>=max?'gruen':(p>=max/2?'gelb':'rot')),erg);
    el('div','tm-pkt',k,'+'+p+' '+w('punkte'));
    var nx=el('div','tm-reihe',erg);
    knopf(w('weiter'),function(){ bild.classList.remove('flach'); weiterSchritt(); },nx,'tm-btn tm-haupt');
    try{ ul.scrollIntoView({block:'start',behavior:'smooth'}); }catch(e){}
  }
  L.aktuell={
    setzen:function(tid,pid,dep){ wahl={task:tid,dep:!!dep}; ziel(pid); },
    fertig:auswerten, last:last, wo:wo, vertr:vertr };
}

/* =====================================================================
   timeskip (TEAM03 §6): Kalender mit Text, dann Ende A, B oder C.
   Ende nach den Punkten bis einschliesslich Tafel (max 140):
   B wenn emre_frei verfehlt oder < 75 · A wenn >= 110 und beide
   Vertretungen · sonst C. Keine Punkte fuer den Zeitsprung selbst.
===================================================================== */
function zeitsprungSchritt(s){
  textLeeren(); bild.classList.remove('flach');
  bildSetzen(s.img,0);
  var t1=el('p','ts-gross',text,tr(s.text));
  var bis=0, idx=T.steps.indexOf(s);
  T.steps.slice(0,idx).forEach(function(x){ bis+=(L.punkte[x.id]||0); });
  var E=(L.tafel&&L.tafel.ergebnis)||{};
  var ende = (!E.emre_frei || bis<75) ? 'B' : ((bis>=110 && E.vertretung_rezeptur && E.vertretung_qms) ? 'A' : 'C');
  L.ende=ende;
  var D=s.endings[ende];
  vorladen(D.imgs);
  var weiter=false, L0=L;
  function zeigeEnde(){
    if(weiter || L!==L0) return; weiter=true;
    root.removeEventListener('click',tipp);
    var imgs=D.imgs.slice(), i=0;
    textLeeren();
    var box=el('div',null,text);
    (function naechstes(){
      bildSetzen(imgs[i],400).then(function(){
        i++;
        if(i<imgs.length) setTimeout(naechstes,1700);
      });
    })();
    absatz(box,tr(D.text));
    knopf(w('weiter'),weiterSchritt,text,'tm-btn tm-haupt');
  }
  function tipp(e){ if(e.target.closest && e.target.closest('.tm-zu')) return; zeigeEnde(); }
  setTimeout(function(){ root.addEventListener('click',tipp); },50);
  setTimeout(zeigeEnde,1500);
  L.aktuell={ ende:ende, bis:bis, weiter:zeigeEnde };
}

/* ---------- Abschluss ---------- */
function epilog(){
  if(!T.epilogue) return zusammenfassung();
  textLeeren(); fortschritt(); bild.classList.remove('flach');
  bildSetzen(T.epilogue.img);
  absatz(text,tr(T.epilogue.text));
  knopf(w('weiter'),zusammenfassung,text,'tm-btn tm-haupt');
}
function summe(){ var s=0; Object.keys(L.punkte).forEach(function(k){ s+=L.punkte[k]; }); return s; }
function zusammenfassung(){
  L.idx++; fortschritt(); textLeeren();
  var S=T.summary;
  bildSetzen(S.img);
  el('h3','tm-h3',text,tr(S.heading));
  var ul=el('ul','tm-liste',text);
  S.points.forEach(function(p){ el('li',null,ul,tr(p)); });
  var max=T.maxPoints||110, s=summe(), q=s/max;
  var sterne=q>=0.55?3:q>=0.375?2:q>=0.225?1:0;
  var erg=el('div','tm-ergebnis',text); erg.dir='ltr';
  el('div','tm-summe',erg,s+' / '+max+' '+w('punkte'));
  el('div','tm-sterne',erg,'★★★'.slice(0,sterne)+'☆☆☆'.slice(0,3-sterne));
  var neu=sichern(s,sterne);
  el('p','tm-klein',text,w('ersteMal'));
  var reihe=el('div','tm-reihe',text);
  knopf(w('nochmal'),function(){ start(T.id); },reihe,'tm-btn');
  knopf(w('zurueck'),function(){ if(neu.rang){ try{ showRankup(neu.rang,raus); return; }catch(e){} } raus(); },reihe,'tm-btn tm-haupt');
  if(S.source){
    /* "Name · URL · Name · URL": jeder Name wird Link auf die URL danach (TEAM03 §7) */
    var q2=el('p','tm-quelle',text); q2.dir='ltr';
    q2.appendChild(document.createTextNode(w('quelle')+': '));
    var teile=S.source.split(/\s*·\s*/), erst=true;
    for(var qi=0;qi<teile.length;qi++){
      var tx=teile[qi]; if(/^https?:\/\//.test(tx)) continue;
      var url=/^https?:\/\//.test(teile[qi+1]||'') ? teile[qi+1] : null;
      if(!erst) q2.appendChild(document.createTextNode(' · ')); erst=false;
      if(url){ var a=el('a',null,q2,tx); a.href=url; a.target='_blank'; a.rel='noopener'; }
      else q2.appendChild(document.createTextNode(tx));
    }
  }
  L.fertig=true;
}
function sichern(s,sterne){
  var id=T.id, best=state.levelBest[id], vorher=state.rankIdx||0, rang=null;
  if(!best){
    state.totalPts=(state.totalPts||0)+s;
    if(typeof KRAFT_PRO_FALL!=='undefined') state.kraft=Math.max(0,(state.kraft||0)-KRAFT_PRO_FALL);
  }
  var rec=Object.assign({},best||{});
  if(!best || s>best.score){ rec.score=s; rec.stars=sterne; }
  rec.firstScore = best && best.firstScore!=null ? best.firstScore : (best?best.score:s);
  rec.lastScore=s; rec.lastStars=sterne; rec.lastAt=Date.now(); rec.attempts=(rec.attempts||(best?1:0))+1;
  state.levelBest[id]=rec;
  var neuR=Math.max(vorher, rankForPts(state.totalPts)); if(neuR>vorher) rang=neuR;
  state.rankIdx=neuR;
  try{ save(); }catch(e){} try{ pcSync(); }catch(e){}
  return {rang:rang};
}

/* ---------- Stil ---------- */
var STIL=[
'#teamScreen{position:fixed;inset:0;z-index:60;background:#F6F3EC;color:#23272E;overflow:hidden}',
'#teamScreen.active{display:block}',
'.tm-wrap{height:100%;display:flex;flex-direction:column;align-items:center;padding-top:env(safe-area-inset-top,0px)}',
'.tm-kopf{width:100%;max-width:600px;display:flex;align-items:center;gap:8px;padding:6px 10px;min-height:44px;font:600 13px Inter,system-ui,sans-serif}',
'.tm-zu{border:1.5px solid #E5E0D8;background:#fff;color:#23272E;border-radius:10px;padding:6px 10px;font:700 12px Inter,sans-serif;cursor:pointer}',
'.tm-titel{flex:1 1 auto;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font:800 14px Montserrat,Inter,sans-serif}',
'.tm-dots{display:flex;gap:4px}.tm-dot{width:7px;height:7px;border-radius:50%;background:#E5E0D8}.tm-dot.fertig{background:#16B8A6}.tm-dot.jetzt{background:#E8192B}',
'.tm-spalte{width:100%;max-width:600px;flex:1 1 auto;overflow-y:auto;-webkit-overflow-scrolling:touch;padding:0 10px 24px}',
'.tm-bild{position:relative;width:100%;aspect-ratio:16/9;border-radius:14px;overflow:hidden;background:#E6E1D8;flex:0 0 auto}',
'.tm-ebene{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block;-webkit-user-drag:none}',
'.tm-text{font:500 15px/1.5 Inter,system-ui,sans-serif;padding-top:12px}',
'.tm-p{margin:0 0 8px}.tm-rede{color:#23272E}',
'.tm-optionen{display:flex;flex-direction:column;gap:8px;margin:12px 0}',
'.tm-option{text-align:start;font:600 14.5px/1.45 Inter,sans-serif;border:2px solid #E5E0D8;background:#fff;border-radius:12px;padding:12px;cursor:pointer;color:#23272E}',
'.tm-option.gewaehlt{border-color:#23272E}.tm-option:disabled:not(.gewaehlt){opacity:.5}',
'.tm-btn{font:700 14px Inter,sans-serif;border:1.5px solid #E5E0D8;background:#fff;color:#23272E;border-radius:12px;padding:11px 18px;cursor:pointer;margin:8px 8px 0 0}',
'.tm-btn.tm-haupt{background:#E8192B;border-color:#E8192B;color:#fff}.tm-btn:disabled{opacity:.4}',
'.tm-reihe{display:flex;flex-wrap:wrap}',
'.tm-uhr{height:8px;border-radius:99px;background:#E5E0D8;overflow:hidden;margin:10px 0 2px}',
'.tm-uhr-in{height:100%;width:100%;background:#16B8A6;border-radius:99px}.tm-uhr.knapp .tm-uhr-in{background:#E8192B}',
'.tm-folge{border:2.5px solid;border-radius:14px;padding:11px 13px;margin:10px 0;background:#fff}',
'.tm-folge.gruen{border-color:#16B8A6}.tm-folge.gelb{border-color:#F2B33D}.tm-folge.rot{border-color:#E8192B}',
'.tm-pkt{font:800 13px Inter,sans-serif;margin-top:4px}.tm-extra{font-weight:800;margin:0 0 6px}',
'.tm-besser{margin:10px 0 3px;font-weight:800;font-size:13px}.tm-gruen{color:#0E6F64}',
'.tm-verlauf{display:flex;flex-direction:column}',
'.tm-sprech{background:#EEF7F5;border-radius:12px;padding:9px 12px;margin:10px 0 0}.tm-sprech b{display:block;font-size:12px;color:#4B5563;margin-bottom:2px}',
'.tm-hinweis{font-weight:800;margin:10px 0 6px}.tm-zaehler{font-size:13px;color:#4B5563;margin:6px 0 0}',
'.tm-karten{display:flex;flex-direction:column;gap:8px}',
'.tm-karte{text-align:start;font:600 14px/1.45 Inter,sans-serif;border:2px solid #E5E0D8;background:#fff;border-radius:12px;padding:12px;color:#23272E;cursor:pointer;transition:transform .35s,background .35s,border-color .35s}',
'.tm-karte.gewaehlt{border-color:#23272E;background:#F6F3EC}.tm-karte:disabled{cursor:default}.tm-karte:disabled:not(.gewaehlt):not(.gedreht){opacity:.55}',
'.tm-karte.gedreht{animation:tmDreh .45s ease}.tm-karte.gut{border-color:#16B8A6;background:#E9FBF8;opacity:1}.tm-karte.schlecht{border-color:#E8192B;background:#FDECEE;opacity:1}',
'@keyframes tmDreh{0%{transform:rotateY(0)}50%{transform:rotateY(90deg)}100%{transform:rotateY(0)}}',
'.tm-why{margin:6px 0 0;font-weight:700;color:#B3121F}',
'.tm-h3{font:800 17px Montserrat,Inter,sans-serif;margin:4px 0 8px}.tm-liste{margin:0 0 10px;padding-inline-start:20px}.tm-liste li{margin-bottom:6px}',
'.tm-ergebnis{display:flex;align-items:center;gap:14px;margin:8px 0}.tm-summe{font:800 20px Montserrat,Inter,sans-serif}.tm-sterne{font-size:26px;color:#E8192B;letter-spacing:3px}',
/* Plantafel */
'.tm-bild.flach{aspect-ratio:16/6}',
'.tb-hilfe{font-size:12.5px;color:#4B5563;margin:4px 0 6px}',
'.tb-host{--tbName:66px;--tbZelle:26px;margin:4px 0}',
/* breiter Bildschirm: der ganze Tag ohne Blaettern */
'@media (min-width:600px){.tb-host{--tbName:60px;--tbZelle:24px}}',
'.tb-scroll{overflow-x:auto;overflow-y:hidden;-webkit-overflow-scrolling:touch;border:1.5px solid #E5E0D8;border-radius:12px;background:#fff;overscroll-behavior-x:contain}',
'.tb-grid{display:grid;grid-auto-rows:34px;width:100%;position:relative}',
'.tb-grid>div{border-bottom:1px solid #F0ECE5}',
'.tb-ecke,.tb-name{position:sticky;inset-inline-start:0;z-index:3;background:#fff;grid-column:1;border-inline-end:1.5px solid #E5E0D8}',
'.tb-uhr{font:700 10px/1 Inter,sans-serif;color:#4B5563;white-space:nowrap;padding-top:12px;padding-inline-start:2px;overflow:visible;text-align:start;border-inline-start:1px solid #E5E0D8}',
'.tb-name{display:flex;flex-direction:column;justify-content:center;padding:0 6px;font:800 12px/1.1 Inter,sans-serif;min-width:0}',
'.tb-name small{font:600 9.5px Inter,sans-serif;color:#6B7280}.tb-name.apo{box-shadow:inset 3px 0 0 #16B8A6}.tb-name.pta{box-shadow:inset 3px 0 0 #F2B33D}',
'[dir=rtl] .tb-name.apo{box-shadow:inset -3px 0 0 #16B8A6}[dir=rtl] .tb-name.pta{box-shadow:inset -3px 0 0 #F2B33D}',
'.tb-name.alarm{color:#B3121F;background:#FDECEE}.tb-name.alarm b::after{content:" !";color:#E8192B}',
'.tb-z{border-inline-end:1px solid #F0ECE5;touch-action:pan-y;cursor:pointer;display:flex;align-items:center;justify-content:center;font:800 11px Inter,sans-serif;color:#23272E;-webkit-user-select:none;user-select:none}',
'.tb-z.aus{background:#F4F2EE;cursor:default;touch-action:auto}',
'.tb-z.an-apo{background:#16B8A6}.tb-z.an-pta{background:#F2B33D}',
'.tb-z.gesperrt{background:repeating-linear-gradient(135deg,#E9E5DD 0 5px,#F6F3EC 5px 10px);cursor:default;touch-action:auto}',
'.tb-z.pause{background:repeating-linear-gradient(135deg,#fff 0 4px,#9ADFD6 4px 8px);outline:2px solid #0E6F64;outline-offset:-2px;cursor:grab;touch-action:none}',
'.tb-z.alarm{box-shadow:inset 0 0 0 2.5px #E8192B}',
'.tb-z.fenster{outline:2px dashed #0E6F64;outline-offset:-3px}',
'.tb-sperrtext{z-index:2;pointer-events:none;align-self:center;text-align:center;font:700 10px/1.15 Inter,sans-serif;color:#4B5563;padding:0 4px;white-space:normal;border:0!important;overflow:hidden}',
'.tb-block{display:flex;align-items:center;gap:6px;padding:0 8px;background:#ECEAE6;color:#8A8F98;cursor:pointer}',
'.tb-rot{height:6px}.tb-rot.an{background:#E8192B}',
'.tb-grid>.tb-rot,.tb-grid>.tb-ecke:last-of-type{border-bottom:0}',
'.tb-info{min-height:0;font:700 12.5px/1.4 Inter,sans-serif;color:#23272E}.tb-info.an{background:#FFF7E3;border-radius:10px;padding:7px 10px;margin:6px 0}',
'.tb-ablage{display:flex;align-items:center;flex-wrap:wrap;gap:8px;margin:8px 0}',
'.tb-chip{font:800 13px Inter,sans-serif;border:2px solid #0E6F64;border-radius:10px;padding:8px 12px;background:repeating-linear-gradient(135deg,#fff 0 4px,#C9EFEA 4px 8px);color:#0E6F64;touch-action:none;cursor:grab}',
'.tb-chip.scharf{box-shadow:0 0 0 3px #E8192B}.tb-chip.gelegt{opacity:.55}',
'.tb-chiphilfe{font-size:12px;color:#4B5563;flex:1 1 160px}',
'.tb-geist{position:fixed;z-index:9999;transform:translate(-50%,-120%);pointer-events:none;font:800 13px Inter,sans-serif;border:2px solid #0E6F64;border-radius:10px;padding:6px 10px;background:repeating-linear-gradient(135deg,#fff 0 4px,#C9EFEA 4px 8px);color:#0E6F64;box-shadow:0 6px 16px rgba(0,0,0,.25)}',
'.tb-warn{margin:6px 0}.tb-warnliste{margin:0;padding-inline-start:18px;color:#B3121F;font:700 13px/1.4 Inter,sans-serif}.tb-warnliste li{margin-bottom:3px}',
'.tb-ok{color:#0E6F64;font-weight:800;margin:0}',
'.tb-host.fest .tb-z{cursor:default;touch-action:auto}',
'.tb-h4{font:800 14px Montserrat,Inter,sans-serif;margin:12px 0 4px}.tb-klein{font-size:12px;color:#4B5563;margin:4px 0 8px}',
/* TEAM03 · Belege */
'.ev-gitter{display:grid;grid-template-columns:1fr 1fr;gap:8px}',
'.ev-karte{display:flex;flex-direction:column;text-align:start;border:2px solid #E5E0D8;background:#fff;border-radius:12px;padding:0;overflow:hidden;cursor:pointer;color:#23272E;font:600 13px/1.4 Inter,sans-serif}',
'.ev-karte img{display:block;width:100%;aspect-ratio:16/9;object-fit:cover}',
'.ev-karte.nurtext{justify-content:center;min-height:120px;background:#FBFAF7}',
'.ev-label{padding:8px 10px}.ev-lupe{display:inline-block;font:800 10.5px Inter,sans-serif;color:#0E6F64;background:#E9FBF8;border-radius:6px;padding:2px 6px;margin:0 0 4px}',
'.ev-label span:not(.ev-lupe){display:block}',
'.ev-karte.gewaehlt{border-color:#23272E;box-shadow:0 0 0 2px #23272E}.ev-karte.blass{opacity:.55}',
'.ev-karte.gut{border-color:#16B8A6;background:#E9FBF8;opacity:1}.ev-karte.schlecht{border-color:#E8192B;background:#FDECEE;opacity:1}',
'.ev-karte.gewaehlt.gut,.ev-karte.gewaehlt.schlecht{box-shadow:0 0 0 2px #23272E}',
'.ev-why{margin:0;padding:0 10px 10px;font:600 12.5px/1.45 Inter,sans-serif;color:#23272E}',
'.ev-karte.gedreht{animation:tmDreh .45s ease}',
'.ev-gross{position:fixed;inset:0;z-index:80;background:rgba(20,22,26,.72);display:flex;align-items:center;justify-content:center;padding:12px}',
'.ev-box{background:#fff;border-radius:16px;max-width:760px;width:100%;max-height:100%;overflow:auto;padding:10px}',
'.ev-bildbox{position:relative;border-radius:12px;overflow:hidden}',
'.ev-bildbox img{display:block;width:100%;aspect-ratio:16/9;object-fit:cover}',
'.ev-papier{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:min(92%,520px);background:rgba(255,253,248,.95);border-radius:10px;box-shadow:0 6px 18px rgba(0,0,0,.25);padding:6px}',
'.ev-tab{width:100%;border-collapse:collapse;font:700 clamp(10px,2.8vw,14px)/1.2 Inter,sans-serif;color:#23272E;text-align:center}',
'.ev-tab th{font-weight:800;color:#4B5563;padding:4px 2px;font-size:.88em}',
'.ev-tab td{border:1px solid #D9D3C8;padding:5px 2px}',
'.ev-tab td.rot{background:#F8C9CD;color:#B3121F}',
'.ev-gtitel{font:700 13px Inter,sans-serif;margin:8px 2px 0}',
/* TEAM03 · Aufgabentafel */
'.at-offen{border:2px dashed #CFC7BA;border-radius:12px;padding:8px 10px;margin:8px 0;background:#FBFAF7}',
'.at-offen.ziel{border-color:#23272E;cursor:pointer}.at-okopf{font-size:12px;color:#4B5563;margin-bottom:6px}',
'.at-gitter{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:6px 0 10px}',
'.at-person{border:2px solid #E5E0D8;border-radius:12px;background:#fff;padding:8px;min-width:0}',
'.at-person.ziel{border-color:#23272E;cursor:pointer}.at-person.ueber{border-color:#E8192B}',
'.at-pkopf{display:flex;align-items:baseline;gap:6px;flex-wrap:wrap}.at-pkopf b{font:800 14px Montserrat,Inter,sans-serif}.at-pkopf small{font:600 11px Inter,sans-serif;color:#6B7280}',
'.at-balken{position:relative;height:8px;border-radius:99px;background:#EEEAE3;margin:6px 0 2px;display:flex;overflow:hidden}',
'.at-gruen{display:block;height:100%;background:#16B8A6}.at-rot{display:block;height:100%;background:#E8192B}',
'.at-kap{position:absolute;top:0;bottom:0;width:2px;background:#23272E;opacity:.35}',
'.at-zahl{font:800 11px Inter,sans-serif;color:#4B5563;text-align:end}',
'.at-person.ueber .at-zahl{color:#B3121F}',
'.at-chips{display:flex;flex-direction:column;gap:5px;margin-top:4px}',
'.at-offen .at-chips{flex-direction:row;flex-wrap:wrap}',
'.at-chip{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:4px;text-align:start;border:1.5px solid #D9D3C8;background:#FFFDF8;border-radius:9px;padding:6px 7px;font:700 12px/1.25 Inter,sans-serif;color:#23272E;cursor:pointer;width:100%}',
'.at-offen .at-chip{width:auto}',
'.at-chip.krit{border-color:#F2B33D;background:#FFF7E3}.at-chip.dep{border-style:dashed;background:#F4F2EE;color:#4B5563}',
'.at-chip.scharf{box-shadow:0 0 0 3px #E8192B;border-color:#E8192B}',
'.at-cn{flex:1 1 auto;min-width:0}.at-last{font-size:8px;letter-spacing:1px;color:#8A8F98}',
'.at-vfeld{flex:1 0 100%;font:800 10.5px Inter,sans-serif;color:#0E6F64;border:1.5px dashed #16B8A6;border-radius:7px;padding:3px 6px;text-align:center;background:#fff}',
'.at-vfeld.scharf{box-shadow:0 0 0 3px #E8192B;border-color:#E8192B;color:#B3121F}',
'.at-leer{color:#8A8F98}',
'.at-gitter.fest .at-chip,.at-offen.fest .at-chip{cursor:default}',
'.at-checks{list-style:none;margin:10px 0 0;padding:0;display:flex;flex-direction:column;gap:6px}',
'.at-checks li{display:flex;gap:8px;border-radius:10px;padding:8px 10px;font:600 13px/1.4 Inter,sans-serif;border:2px solid}',
'.at-checks li.ok{border-color:#16B8A6;background:#E9FBF8}.at-checks li.teil{border-color:#F2B33D;background:#FFF7E3}.at-checks li.fail{border-color:#E8192B;background:#FDECEE}',
'.at-cp{font-weight:800;min-width:2.2em}',
'@media (min-width:600px){.at-gitter{grid-template-columns:1fr 1fr 1fr}}',
/* TEAM03 · Zeitsprung */
'.ts-gross{font:800 22px Montserrat,Inter,sans-serif;text-align:center;margin:18px 0}',
'.tm-klein{font-size:12.5px;color:#4B5563}.tm-quelle{font-size:11.5px;color:#6B7280;margin-top:14px;word-break:break-word}.tm-quelle a{color:#16B8A6}'
].join('\n');
function stil(){ if(document.getElementById('tmStil')) return; var s=document.createElement('style'); s.id='tmStil'; s.textContent=STIL; document.head.appendChild(s); }

/* ---------- Eintritt ---------- */
function skript(src){
  if(GELADEN[src]) return GELADEN[src];
  GELADEN[src]=new Promise(function(ok,nein){
    var s=document.createElement('script'); s.src=src; s.async=true;
    s.onload=function(){ ok(); }; s.onerror=function(){ delete GELADEN[src]; s.remove(); nein(new Error(src)); };
    document.head.appendChild(s);
  });
  return GELADEN[src];
}
function start(id){
  stopUhr();
  T=(window.PC_TEAM||{})[id] || (window.PC_PLAN||{})[id];
  L={ idx:0, punkte:{}, wahl:{}, fertig:false };
  geruest(); fortschritt();
  vorladen([T.intro && T.intro.img].concat(T.steps.map(function(s){ return s.img; })));
  /* Einstieg: intro steht in der Datei oben, nicht als Schritt */
  if(T.intro){ bildSetzen(T.intro.img,0); absatz(text,tr(T.intro.text)); knopf(w('weiter'),weiterSchritt,text,'tm-btn tm-haupt'); }
  else weiterSchritt();
}
function open(id, src){
  T=null; L=null; geruest();
  el('p','tm-p',text,w('laden'));
  return skript(src).then(function(){ start(id); }).catch(function(){
    text.replaceChildren(); el('p','tm-p',text,w('ladeFehler')); knopf(w('zurueck'),raus,text,'tm-btn tm-haupt');
  });
}

window.PCTeam={ open:open,
  /* Nur zur Pruefung von aussen, nicht fuer das Spiel. */
  _t:{ L:function(){ return L; }, T:function(){ return T; }, aktuell:function(){ return L&&L.aktuell; }, summe:summe, stopUhr:stopUhr } };
})();
