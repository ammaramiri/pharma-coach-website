/* =====================================================================
   TEAMGESPRAECH-MOTOR · Kueche · 14.11.2026 (Technik)
   Spielt eine Stufe aus window.PC_TEAM[id] (data/team_*.js). Die
   Datei enthaelt nur Daten; alle Logik steht hier.
   Geladen erst, wenn der Spieler am Kuechentisch eine Stufe waehlt
   (index.html: teamStarten). Kein Spielstand mitten in der Stufe:
   wer geht, beginnt neu. Die Endpunkte zaehlen wie bei allen Faellen.

   Schrittarten (Spezifikation TEAM01 §2): intro · timer · choice ·
   dialog · cards. Reihenfolge der Antworten wird bei jedem Spiel neu
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
  ersteMal:['Punkte zählen beim ersten Durchgang.','Points count on the first run.','النقاط تُحتسب في المرة الأولى.']
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
  if(s.type==='intro') return introSchritt(s);
  if(s.type==='timer') return wahlSchritt(s,true);
  if(s.type==='choice') return wahlSchritt(s,false);
  if(s.type==='dialog') return dialogSchritt(s);
  if(s.type==='cards') return kartenSchritt(s);
  weiterSchritt();
}
function introSchritt(s){
  textLeeren();
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
  textLeeren(); stopUhr();
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
  bildSetzen(s.img,0);
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

/* ---------- Abschluss ---------- */
function epilog(){
  textLeeren(); fortschritt();
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
    var q2=el('p','tm-quelle',text); q2.dir='ltr';
    var m=S.source.match(/https?:\/\/\S+/);
    var name=S.source.replace(/\s*·?\s*https?:\/\/\S+/,'');
    q2.appendChild(document.createTextNode(w('quelle')+': '));
    if(m){ var a=el('a',null,q2,name||m[0]); a.href=m[0]; a.target='_blank'; a.rel='noopener'; }
    else q2.appendChild(document.createTextNode(name));
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
  T=window.PC_TEAM[id];
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
