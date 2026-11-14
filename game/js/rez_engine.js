/* =====================================================================
   REZEPTUR-MOTOR · Werkbank (PLAN §52) · 14.11.2026 (Technik)
   Geladen erst beim Oeffnen der Rezeptur-Arbeit (index.html:
   rezStarten). Laedt selbst data/rez_meta.js und die Falldatei.

   Wiederverwendet, nicht neu geschrieben:
   - Pistill-Geste aus game/proto/reibschale.html (Modus A: Finger am
     oberen Stiel, Bahn, Neigung, Tiefe, Schatten, Rauschton, Rasten).
   - Waagenplatz aus game/proto/waage.html (Tara, Tuer, Ruhe der
     Anzeige, Spatel mit Spuren, Halten = Dauerfluss, Abfall, Rueckgabe).
   - Rezeptformular M16 (M16.build, M16.ring, M16.teach) aus index.html.

   Regeln (Brief §2): keine Fehlermeldung an der Werkbank; jeder Fehler
   wird still notiert und zeigt sich erst bei Pruefung, Protokoll oder
   Freigabe. Tempo wird nie bestraft. Ton nur WebAudio. Kein Spielstand
   mitten im Fall: wer geht, beginnt neu.
===================================================================== */
(function(){
'use strict';

var META=null, F=null;           /* Kategorie und Fall */
var root=null, buehne=null, kopf=null, debugEl=null;
var R=null;                       /* Lauf */
var DEBUG=/[?&]debug=1/.test(location.search);
var LADEN={};

/* ---------- Woerter der Oberflaeche (de · en · ar) ---------- */
var WT={
  titel:['Rezeptur','Compounding','غرفة التحضير'],
  start:['Beginnen','Start','ابدأ'],
  weiter:['Weiter','Continue','متابعة'],
  pruefen:['Prüfen','Check','تحقّق'],
  ueberspringen:['Überspringen','Skip','تخطٍّ'],
  abbrechen:['Fall verlassen? Der Fall beginnt dann wieder von vorn.','Leave the case? It will start again from the beginning.','أترك الحالة؟ ستبدأ من جديد.'],
  laden:['Rezeptur wird geladen …','Loading the compounding bench …','جارٍ تحميل منضدة التحضير …'],
  ladeFehler:['Die Rezeptur konnte nicht geladen werden. Bitte Verbindung prüfen.','The compounding stage could not be loaded. Please check your connection.','تعذّر تحميل مرحلة التحضير. تحقّق من الاتصال.'],
  zurueck:['Zurück in die Rezeptur','Back to the compounding room','العودة إلى غرفة التحضير'],
  st:[['Rezept','Prescription','الوصفة'],['Plausibilität','Plausibility','المعقولية'],['Rechnen','Calculation','الحساب'],
      ['Wiegen','Weighing','الوزن'],['Herstellen','Compounding','التصنيع'],['Prüfen und Abfüllen','Check and fill','الفحص والتعبئة'],
      ['Etikett','Label','الملصق'],['Freigabe','Release','الإفراج']],
  gefunden:['Gefunden','Found','وجدتُها'],
  blatt:['Arbeitsblatt','Worksheet','ورقة العمل'],
  waage:['Waage','Balance','الميزان'],
  schale:['Fantaschale','Mixing bowl','الطاسة'],
  fertig:['Fertig','Done','انتهيت'],
  welcheZutat:['Was wiege ich ein?','What do I weigh?','ماذا أزن؟'],
  welcheWaage:['Welche Waage?','Which balance?','أيّ ميزان؟'],
  analyse:['Analysenwaage · d = 0,1 mg','Analytical balance · d = 0.1 mg','الميزان التحليلي · d = 0,1 mg'],
  praezision:['Präzisionswaage · d = 10 mg','Precision balance · d = 10 mg','الميزان الدقيق · d = 10 mg'],
  minMax:['Mindestlast {min} g · Höchstlast {max} g','Minimum load {min} g · maximum {max} g','الحد الأدنى {min} g · الأقصى {max} g'],
  tara:['Tara','Tare','تصفير'],
  uebernehmen:['Übernehmen','Accept','اعتماد'],
  tuerZu:['Tür schließen','Close door','أغلق الباب'],
  tuerAuf:['Tür öffnen','Open door','افتح الباب'],
  stabil:['stabil','stable','مستقر'], instabil:['instabil','unstable','غير مستقر'],
  uebernommen:['übernommen','accepted','معتمد'],
  sollIst:['Soll','Target','المطلوب'],
  zumBlatt:['Zum Arbeitsblatt','To the worksheet','إلى ورقة العمل'],
  tTippen:['Tippen = kleine Menge · Halten = Dauerfluss','Tap = small amount · hold = steady flow','نقرة = كمية صغيرة · ضغط مطوّل = تدفّق متواصل'],
  tTropfen:['Tippen = ein Tropfen · Halten = Tropfen in Folge','Tap = one drop · hold = drops in a row','نقرة = قطرة · ضغط مطوّل = قطرات متتابعة'],
  tBehaelter:['Behälter auf die Waagschale ziehen','Drag the container onto the pan','أسحب الوعاء إلى كفّة الميزان'],
  tGefaess:['Standgefäß antippen · öffnen oder schließen','Tap the stock jar · open or close','أنقر العبوة · فتح أو إغلاق'],
  tSpatel:['Spatel ins Gefäß, dann über den Behälter ziehen','Spatula into the jar, then over the container','الملعقة في العبوة، ثم فوق الوعاء'],
  tFlasche:['Tropfflasche über den Behälter ziehen','Drag the dropper bottle over the container','أسحب قارورة التنقيط فوق الوعاء'],
  tSchiff:['Wägeschiffchen über die Schale ziehen und kippen','Drag the weighing boat over the bowl to tip it','أسحب ورقة الوزن فوق الطاسة لتفريغها'],
  tPistill:['Pistill oben am Stiel fassen und kreisen','Hold the pestle at the top and circle','أمسك المدقة من أعلى المقبض وحرّكها دائرياً'],
  tKarte:['Kartenblatt an der Innenwand entlangziehen','Draw the scraper card along the inner wall','أمرّر البطاقة على الجدار الداخلي'],
  tFertig:['Alle Bestandteile verarbeitet','All ingredients worked in','دُمجت كل المكوّنات'],
  rechnenWert:['Wert','Value','القيمة'],
  protokoll:['Herstellungsprotokoll','Compounding record','محضر التحضير'],
  etikettAuf:['Ziehe die Angaben auf das Etikett. Antippen geht auch.','Drag the items onto the label. Tapping works too.','أسحب البيانات إلى الملصق. النقر يكفي أيضاً.'],
  etikettFertig:['Etikett fertig','Label done','الملصق جاهز'],
  vorschlag:['Vorschlag Prüfprogramm','check software suggestion','اقتراح برنامج الفحص'],
  freigabeFrage:['Protokoll und Etikett geprüft. Ich entscheide:','Record and label checked. My decision:','راجعتُ المحضر والملصق. قراري:'],
  freigeben:['freigeben','release','أُفرج'],
  nichtFreigeben:['nicht freigeben','do not release','لا أُفرج'],
  freigegeben:['Freigegeben','Released','أُفرج عنه'],
  gesperrt:['Nicht freigegeben','Not released','لم يُفرج عنه'],
  richtigEntschieden:['Richtig entschieden','Right decision','قرار صحيح'],
  falschEntschieden:['Falsch entschieden','Wrong decision','قرار خاطئ'],
  keineFehler:['Im Protokoll steht keine Abweichung. Die Creme ist abgabefähig.','The record shows no deviation. The cream can be dispensed.','لا انحراف في المحضر. الكريم صالح للصرف.'],
  fehlerListe:['Abweichungen im Protokoll','Deviations in the record','الانحرافات في المحضر'],
  auswertung:['Auswertung','Results','النتيجة'],
  punkte:['Punkte','Points','نقاط'],
  nochmal:['Noch einmal','Play again','إعادة'],
  station:['Station','Station','المحطة'],
  ersteMal:['Punkte zählen beim ersten Durchgang.','Points count on the first run.','النقاط تُحتسب في المرة الأولى.'],
  uebersprungen:['übersprungen','skipped','تخطّيت'],
  nachbearbeiten:['Weiter anreiben, bis die Creme homogen ist','Keep working until the cream is homogeneous','أواصل السحق حتى يتجانس الكريم'],
  spenderdose:['Spenderdose','Dispensing jar','علبة الصرف'],
  kruke:['Kruke','Ointment jar','علبة عادية'],
  tFuellen:['Spatel in die Schale, dann in das Gefäß · dreimal','Spatula into the bowl, then into the jar · three times','الملعقة في الطاسة ثم في العلبة · ثلاث مرات'],
  tDeckel:['Gefäß antippen, um es zu verschließen','Tap the jar to close it','أنقر العلبة لإغلاقها'],
  waageWahlFrei:['Waage','Balance','الميزان']
};
function w(k){ var i=(state.lang==='en')?1:(state.lang==='ar'?2:0); var v=WT[k]; return v? v[i] : k; }
function stName(n){ var i=(state.lang==='en')?1:(state.lang==='ar'?2:0); return WT.st[n-1][i]; }
function tr(o){ return (o && (o[state.lang]||o.de)) || ''; }
function pfad(p){ var o=F; p.split('.').forEach(function(k){ o=o&&o[k]; }); return o; }
function zahl(v,nk){ return (Math.round(v*Math.pow(10,nk))/Math.pow(10,nk)).toFixed(nk).replace('.',','); }
function esc(s){ return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];}); }

/* ---------- Datum ---------- */
function datum(d){ return ('0'+d.getDate()).slice(-2)+'.'+('0'+(d.getMonth()+1)).slice(-2)+'.'+d.getFullYear(); }
function plusMonate(n){ var d=new Date(); var t=d.getDate(); d.setDate(1); d.setMonth(d.getMonth()+n);
  var letzter=new Date(d.getFullYear(), d.getMonth()+1, 0).getDate(); d.setDate(Math.min(t,letzter)); return d; }
function ersetzen(s){
  var heute=new Date(), gestern=new Date(Date.now()-864e5);
  return String(s).replace('@heute',datum(heute)).replace('@gestern',datum(gestern))
    .replace('@plus2',datum(plusMonate(2))).replace('@plus6',datum(plusMonate(6)))
    .replace('@apotheke',F.apotheke)
    .replace('@datum',String(heute.getFullYear()).slice(2)+('0'+(heute.getMonth()+1)).slice(-2)+('0'+heute.getDate()).slice(-2));
}

/* ---------- DOM ---------- */
function el(tag,cls,eltern,text){ var e=document.createElement(tag); if(cls) e.className=cls; if(text!=null) e.textContent=text; if(eltern) eltern.appendChild(e); return e; }
function bildEl(src,cls,eltern){ var e=el('img',cls,eltern); e.alt=''; e.draggable=false; e.decoding='async'; e.src=src; return e; }
function knopf(text,fn,eltern,cls){ var b=el('button',cls||'rz-btn',eltern,text); b.type='button'; b.addEventListener('click',function(ev){ tonAn(); fn(ev); }); return b; }
function setze(e,p,breite){ e.style.left=(p.x/META.W*100)+'%'; e.style.top=(p.y/META.H*100)+'%'; if(breite!=null) e.style.width=(breite/META.W*100)+'%'; }
function inBild(ev){ var r=buehne.getBoundingClientRect(); if(!r.width) return {x:0,y:0};
  return { x:(ev.clientX-r.left)/r.width*META.W, y:(ev.clientY-r.top)/r.height*META.H }; }
function nah(p,q,r){ var dx=p.x-q.x, dy=p.y-q.y; return dx*dx+dy*dy<=r*r; }

/* ---------- Ton (WebAudio, keine Dateien) ---------- */
var AC=null, rausch=null;
function tonAn(){
  if(AC){ try{ if(AC.state==='suspended') AC.resume(); }catch(e){} return; }
  try{
    var C=window.AudioContext||window.webkitAudioContext; if(!C) return;
    AC=new C();
    var len=Math.floor(AC.sampleRate*2), buf=AC.createBuffer(1,len,AC.sampleRate), d=buf.getChannelData(0);
    for(var i=0;i<len;i++) d[i]=(Math.random()*2-1)*0.7;
    var q=AC.createBufferSource(); q.buffer=buf; q.loop=true;
    var f=AC.createBiquadFilter(); f.type='bandpass'; f.frequency.value=1150; f.Q.value=0.8;
    var g=AC.createGain(); g.gain.value=0;
    q.connect(f); f.connect(g); g.connect(AC.destination); q.start();
    rausch={f:f,g:g};
  }catch(e){ AC=null; }
}
function rauschen(laut,freq){
  if(!rausch) return;
  try{ rausch.g.gain.setTargetAtTime(laut,AC.currentTime,0.06);
       if(freq) rausch.f.frequency.setTargetAtTime(freq,AC.currentTime,0.08); }catch(e){}
}
function klack(f,dauer,typ){
  if(!AC) return;
  try{
    var o=AC.createOscillator(), g=AC.createGain(), t=AC.currentTime, d=dauer||0.12;
    o.type=typ||'triangle'; o.frequency.value=f||440;
    g.gain.setValueAtTime(0.0001,t); g.gain.exponentialRampToValueAtTime(0.12,t+0.01);
    g.gain.exponentialRampToValueAtTime(0.0001,t+d);
    o.connect(g); g.connect(AC.destination); o.start(t); o.stop(t+d+0.02);
  }catch(e){}
}
function tropfTon(){
  if(!AC) return;
  try{ var o=AC.createOscillator(), g=AC.createGain(), t=AC.currentTime;
    o.type='sine'; o.frequency.setValueAtTime(1400,t); o.frequency.exponentialRampToValueAtTime(520,t+0.09);
    g.gain.setValueAtTime(0.0001,t); g.gain.exponentialRampToValueAtTime(0.10,t+0.006); g.gain.exponentialRampToValueAtTime(0.0001,t+0.11);
    o.connect(g); g.connect(AC.destination); o.start(t); o.stop(t+0.13); }catch(e){}
}
function vib(ms){ try{ if(navigator.vibrate) navigator.vibrate(ms||8); }catch(e){} }
function gut(){ klack(660,0.12); setTimeout(function(){ klack(880,0.16); },110); }
function schlecht(){ klack(220,0.22,'sawtooth'); }

/* ---------- Laden ---------- */
function skript(src){
  if(LADEN[src]) return LADEN[src];
  LADEN[src]=new Promise(function(ok,nein){
    var s=document.createElement('script'); s.src=src; s.async=true;
    s.onload=function(){ ok(); }; s.onerror=function(){ delete LADEN[src]; s.remove(); nein(new Error(src)); };
    document.head.appendChild(s);
  });
  return LADEN[src];
}
function bilderVorladen(liste){ liste.forEach(function(u){ var i=new Image(); i.decoding='async'; i.src=u; }); }

/* ---------- Geruest ---------- */
function geruest(){
  stil();
  if(!root){
    root=el('section','screen',document.body); root.id='rezScreen';
  }
  root.replaceChildren();
  root.dir=state.lang==='ar'?'rtl':'ltr';
  var wrap=el('div','rz-wrap',root);
  kopf=el('header','rz-kopf',wrap);
  buehne=el('div','rz-buehne',wrap); buehne.dir='ltr';
  if(DEBUG){ debugEl=el('pre','rz-debug',root); }
  showNow('rezScreen');
}
function kopfZeichnen(nr){
  kopf.replaceChildren();
  var zu=knopf('✕',function(){ if(window.confirm(w('abbrechen'))) raus(); },kopf,'rz-zu');
  zu.setAttribute('aria-label','close');
  el('span','rz-kopf-titel',kopf, nr? (nr+' · '+stName(nr)) : tr(R.fall.titel));
  var p=el('span','rz-punkte',kopf);
  for(var i=1;i<=8;i++){ el('span','rz-dot'+(i<nr?' fertig':'')+(i===nr?' jetzt':''),p); }
  if(nr && nr>=1 && !R.uebersprungen[nr] && !R.fertig[nr]) knopf(w('ueberspringen'),function(){ ueberspringen(nr); },kopf,'rz-skip');
}
function stFertig(n){ R.fertig[n]=true; var x=kopf&&kopf.querySelector('.rz-skip'); if(x) x.remove(); }
function leeren(){
  /* Neue Buehne statt replaceChildren: so haengen keine Zeiger-Lauscher
     einer frueheren Ansicht mehr daran. */
  var neu=buehne.cloneNode(false); buehne.parentNode.replaceChild(neu,buehne); buehne=neu;
  rauschen(0); R.ticks=[]; zieht=null; sZieht=null;
}
function hintergrund(src){ bildEl(src,'rz-szene',buehne); }
function karte(cls){ var k=el('div','rz-karte '+(cls||''),buehne); k.dir=state.lang==='ar'?'rtl':'ltr'; return k; }
function raus(){
  stopSchleife();
  try{ enterRoom('rezeptur'); openWorld(); }catch(e){ try{ showNow('worldScreen'); }catch(e2){} }
}

/* ---------- Fehler und Punkte ---------- */
function fehler(id, wo, detail){
  var key=id+(wo?':'+wo:'');
  if(R.fehler.some(function(f){ return f.key===key; })) return;
  var def=F.fehler[id]; if(!def) return;
  R.fehler.push({ key:key, id:id, st:def.st, art:def.art, wo:wo||null, detail:detail||null });
  debugMalen();
}
function hatFehler(id){ return R.fehler.some(function(f){ return f.id===id; }); }
function grundText(id){ var g=F.fehler[id].grund; return typeof g==='string'? tr(pfad(g)) : tr(g); }
function stationsPunkte(){
  var P=F.punkte, a=META.abzug, out={};
  function minus(st,basis){
    var s=basis; R.fehler.forEach(function(f){ if(f.st===st) s-= (f.art==='leicht'?a.leicht:a.voll); });
    return Math.max(0,s);
  }
  out[1]=R.p1; out[2]=R.p2;
  out[3]=minus(3,P.rechnen); out[4]=minus(4,P.wiegen); out[5]=minus(5,P.herstellen);
  out[6]=minus(6,R.nachbearbeitet? P.pruefen/2 : P.pruefen);
  out[7]=minus(7,P.etikett); out[8]=R.p8;
  if(R.falsch){ out[3]=out[4]=out[5]=out[6]=0; out[8]=0; }
  for(var n=1;n<=8;n++) if(R.uebersprungen[n]) out[n]=0;
  return out;
}
function debugMalen(){
  if(!debugEl||!R) return;
  var p=stationsPunkte(), s=0; for(var k in p) s+=p[k]||0;
  debugEl.textContent='fps '+(R.fps||0)+' · Weg '+(R.falsch?'falsch':'richtig')+'\n'+
    'Punkte '+JSON.stringify(p)+' = '+s+'\n'+
    R.fehler.map(function(f){ return f.st+' '+f.id+(f.wo?' ('+f.wo+')':'')+' '+f.art; }).join('\n');
}

/* ---------- Schleife ---------- */
var raf=0, letzte=0, fpsN=0, fpsT=0;
function schleife(t){
  raf=requestAnimationFrame(schleife);
  if(!letzte) letzte=t; var dt=Math.max(0.001,Math.min(0.1,(t-letzte)/1000)); letzte=t;
  fpsN++; if(!fpsT) fpsT=t; if(t-fpsT>=500){ R.fps=Math.round(fpsN*1000/(t-fpsT)); fpsN=0; fpsT=t; if(DEBUG) debugMalen(); }
  (R.ticks||[]).forEach(function(f){ try{ f(t,dt); }catch(e){} });
}
function startSchleife(){ if(!raf){ letzte=0; raf=requestAnimationFrame(schleife); } }
function stopSchleife(){ if(raf){ cancelAnimationFrame(raf); raf=0; } rauschen(0); }

/* =====================================================================
   0 · EINSTIEG
===================================================================== */
function s0(){
  kopfZeichnen(0); leeren();
  hintergrund(F.szenen.intro);
  F.etiketten.intro.forEach(function(e){ etikettAuf(buehne,e,e.text,'rz-etik-klein'); });
  var k=karte('rz-unten');
  el('p','rz-text',k,tr(F.intro));
  knopf(w('start'),s1,k,'rz-btn rz-haupt');
}
function etikettAuf(eltern,pos,html,cls){
  var e=el('div','rz-etik '+(cls||''),eltern);
  e.style.left=pos.x0+'%'; e.style.top=pos.y0+'%';
  e.style.width=(pos.x1-pos.x0)+'%'; e.style.height=(pos.y1-pos.y0)+'%';
  var i=el('div','rz-etik-in',e); i.innerHTML=html; return e;
}

/* =====================================================================
   1 · REZEPT · M16 aus index.html
   Mech.rezept kennt genau ein richtiges Feld je Phase. Hier sind zwei
   Felder richtig und ihre Reihenfolge ist frei; darum baut der Motor das
   Formular mit M16.build und wertet selbst aus, nach dem Muster von
   rezeptStrafe: ein Fehlgriff kostet fuenf Punkte, Boden null.
===================================================================== */
function s1(){
  kopfZeichnen(1); leeren(); hintergrund(META.bilder.bank);
  var rz=F.rezept, r={}; Object.keys(rz.r).forEach(function(k){ r[k]=ersetzen(rz.r[k]); });
  var k=karte('rz-voll rz-papier');
  el('p','rz-frage',k,tr(rz.aufgabe));
  var host=el('div','rz-m16',k);
  host.innerHTML=M16.build({ r:r, open:rz.offen });
  var fb=el('div','rz-fb',k);
  var gefunden={}, punkte=25, fertig=false;
  host.querySelectorAll('.m16-f[data-k]').forEach(function(b){
    b.addEventListener('click',function(){
      if(fertig) return; tonAn();
      var key=b.dataset.k;
      if(rz.richtig.indexOf(key)<0){
        if(b.classList.contains('miss')) return;
        b.classList.add('miss'); punkte=Math.max(0,punkte-5); schlecht(); vib(20); return;
      }
      if(gefunden[key]) return;
      gefunden[key]=true; b.classList.add('hit'); b.disabled=true; klack(880,0.1);
      M16.ring(b,null);
      if(rz.richtig.every(function(x){ return gefunden[x]; })){
        fertig=true; R.p1=punkte; gut(); stFertig(1);
        host.querySelectorAll('.m16-f').forEach(function(x){ x.disabled=true; });
        rueckmeldung(fb,true,w('gefunden'),tr(rz.erkl),s2);
      }
    });
  });
  R.s1Loesen=function(){ rz.richtig.forEach(function(x){ var b=host.querySelector('[data-k="'+x+'"]'); if(b && !gefunden[x]){ gefunden[x]=true; b.classList.add('hit'); } });
    fertig=true; host.querySelectorAll('.m16-f').forEach(function(x){ x.disabled=true; }); rueckmeldung(fb,true,w('uebersprungen'),tr(rz.erkl),s2); };
}
function rueckmeldung(zone,gutes,kopfTxt,text,weiter){
  zone.innerHTML='';
  var b=el('div','rz-fbk '+(gutes?'gut':'schlecht'),zone);
  el('h5',null,b,kopfTxt); if(text) el('p',null,b,text);
  knopf(w('weiter'),weiter,zone,'rz-btn rz-haupt');
  try{ zone.scrollIntoView({block:'nearest',behavior:'smooth'}); }catch(e){}
}

/* =====================================================================
   2 · PLAUSIBILITAET · Weiche
   Option a setzt den falschen Weg, still. Keine Meldung, keine Zahl.
===================================================================== */
function s2(){
  kopfZeichnen(2); leeren(); hintergrund(META.bilder.bank);
  var P=F.plausi, k=karte('rz-voll');
  var mon=el('div','rz-monitor',k);
  el('div','rz-monitor-kopf',mon,'Plausibilitätsprüfung · Rezeptur');
  el('p','rz-cave',mon,tr(P.cave));
  el('p','rz-frage',k,tr(P.frage));
  var liste=el('div','rz-optionen',k), fb=el('div','rz-fb',k);
  var opts=P.optionen.slice(); mischen(opts);
  var fertig=false;
  opts.forEach(function(o){
    var b=knopf(tr(o.text),function(){
      if(fertig) return; fertig=true; stFertig(2);
      liste.querySelectorAll('button').forEach(function(x){ x.disabled=true; });
      b.classList.add('gewaehlt');
      if(o.pfad==='falsch'){ R.falsch=true; R.p2=0; klack(520,0.08); return setTimeout(s3,260); }
      if(o.richtig){ R.p2=25; gut(); return rueckmeldung(fb,true,'✓',tr(o.erkl),s3); }
      R.p2=0; schlecht();
      var d=P.optionen.filter(function(x){ return x.richtig; })[0];
      rueckmeldung(fb,false,'✕',tr(o.erkl)+'\n\n'+tr(d.text),s3);
    },liste,'rz-option');
  });
  R.s2Loesen=function(){ if(fertig) return; fertig=true; R.p2=0;
    var d=P.optionen.filter(function(x){ return x.richtig; })[0];
    rueckmeldung(fb,true,w('uebersprungen'),tr(d.text)+'\n\n'+tr(d.erkl),s3); };
}
function mischen(a){ for(var i=a.length-1;i>0;i--){ var j=Math.floor(Math.random()*(i+1)); var t=a[i]; a[i]=a[j]; a[j]=t; } return a; }

/* =====================================================================
   3 · RECHNEN · Ziffernfeld, keine Auswahl
   Werte gelten als Sollwerte fuer die Waage, auch falsche: gewogen wird,
   was gerechnet wurde. 0,30 fuer Erythromycin gilt ausdruecklich als
   angenommen und wird still als Fehler notiert.
===================================================================== */
function zutaten(){ return F.bestandteile.filter(function(b){ return !(b.nurMitSaeure && R.falsch); }); }
function richtigerWert(b){ return (b.id==='creme' && R.falsch)? b.korrFalsch : b.korr; }
function s3(){
  kopfZeichnen(3); leeren(); hintergrund(META.bilder.bank);
  var k=karte('rz-voll rz-papier');
  el('p','rz-frage',k,tr(F.rechnen.aufgabe));
  el('div','rz-hilfe',k,F.rechnen.hilfe);
  var tab=el('div','rz-rechnen',k), felder={}, aktiv=null;
  zutaten().forEach(function(b){
    var z=el('button','rz-rfeld',tab); z.type='button';
    el('span','rz-rname',z,b.name+(b.ad?' (ad '+zahl(b.ad,2)+' g)':(b.faktor?' · '+zahl(b.soll,2)+' g':'')));
    var v=el('span','rz-rwert',z,''); el('span','rz-reinh',z,'g');
    felder[b.id]={b:b,el:z,v:v,text:''};
    z.addEventListener('click',function(){ aktiv=b.id; markieren(); });
  });
  aktiv=zutaten()[0].id;
  function markieren(){ Object.keys(felder).forEach(function(id){ felder[id].el.classList.toggle('aktiv',id===aktiv); }); }
  markieren();
  var pad=el('div','rz-pad',k);
  ['7','8','9','4','5','6','1','2','3',',','0','⌫'].forEach(function(z){
    knopf(z,function(){
      var f=felder[aktiv]; if(!f) return;
      if(z==='⌫') f.text=f.text.slice(0,-1);
      else if(z===','){ if(f.text.indexOf(',')<0) f.text=(f.text||'0')+','; }
      else if(f.text.replace(',','').length<6) f.text+=z;
      f.v.textContent=f.text; klack(1200,0.03);
    },pad,'rz-taste');
  });
  var ok=knopf(w('pruefen'),pruefen,k,'rz-btn rz-haupt');
  var okWeg=function(){ ok.style.display='none'; };
  function pruefen(){
    var alle=true, werte={};
    Object.keys(felder).forEach(function(id){
      var v=parseFloat(felder[id].text.replace(',','.'));
      if(!isFinite(v)||v<=0||v>=100){ alle=false; felder[id].el.classList.add('leer'); setTimeout(function(){ felder[id].el.classList.remove('leer'); },500); }
      werte[id]=v;
    });
    if(!alle){ vib(20); return; }
    Object.keys(werte).forEach(function(id){
      var b=felder[id].b, soll=richtigerWert(b), v=werte[id];
      if(Math.abs(v-soll)<=b.tol+1e-9) return;
      if(b.falle!=null && Math.abs(v-b.falle)<1e-9) return fehler('faktor',id);
      fehler('rechnen',id);
    });
    R.werte=werte; ok.disabled=true; klack(900,0.1); stFertig(3);
    /* Nichts verraten: jeder Wert erscheint als uebernommen. */
    Object.keys(felder).forEach(function(id){ felder[id].el.classList.add('ok'); });
    setTimeout(s4,450);
  }
  R.s3Loesen=function(){ var werte={}; zutaten().forEach(function(b){ werte[b.id]=richtigerWert(b); felder[b.id].text=zahl(werte[b.id],b.nk); felder[b.id].v.textContent=felder[b.id].text; });
    R.werte=werte; var fb=el('div','rz-fb',k); ok.disabled=true; okWeg(); rueckmeldung(fb,true,w('uebersprungen'),tr(F.rechnen.erkl),s4); };
}

/* =====================================================================
   4 + 5 · WERKBANK · Wiegen und Herstellen als ein Arbeitsgang
===================================================================== */
var B=null;   /* Zustand der Werkbank */
function bankNeu(){
  B={
    ansicht:'blatt', zutat:null, waage:null,
    tara:{analyse:0,praezision:0}, tuerZu:false,
    schaleOrt:'bank', schiffOrt:'bank',
    schiff:0,                 /* Pulver auf dem Wägeschiffchen */
    inSchale:{ery:0,mct:0,cit:0,creme:0},
    gefaessOffen:false,
    spatel:{zustand:'leer',menge:0,rest:0,art:null},
    flascheUeber:false, spatelUeber:false,
    ist:{},                   /* je Zutat: masse, abgelesen, waage */
    erledigt:{},              /* angenommen (und bei ery umgefuellt) */
    schiffLeer:false,
    ruhigBis:0, fliesst:false,
    sitzungStart:0,           /* Cremeanteil zu Beginn der Sitzung */
    portionen:[], brauchtSchaben:false,
    anreib:0, misch:0, end:0, rot:0,
    wandSauber:0, karteCreme:false,
    phi:-Math.PI/2, greift:false, zeiger:null, letztePhi:0, tempoRoh:0, tempo:0, rastend:0
  };
}
function s4(){
  bankNeu(); startSchleife();
  bilderVorladen([META.waagen.analyse.bild,META.waagen.analyse.bildZu,META.waagen.praezision.bild,
    META.bilder.schaleKlein,META.bilder.flasche,META.bilder.topf,META.bilder.spatelCreme,META.bilder.pistill,META.bilder.rand]
    .concat(Object.keys(META.bilder.schale).map(function(k){ return META.bilder.schale[k]; })));
  blatt();
}
function cfg(){ return B.waage? META.waagen[B.waage] : null; }
function sollVon(id){ return R.werte[id]; }
function zutatDef(id){ return F.bestandteile.filter(function(b){ return b.id===id; })[0]; }
function cremeSoll(){ return sollVon('creme'); }
function alleDrin(){ return zutaten().every(function(b){ return B.erledigt[b.id]; }); }

/* ---------- Arbeitsblatt: Auswahl der Zutat ---------- */
function blatt(){
  kopfZeichnen(B.zutat? 4 : (B.inSchale.mct>0? 5:4));
  B.ansicht='blatt'; leeren(); hintergrund(META.bilder.bank);
  var k=karte('rz-voll');
  el('p','rz-frage',k,tr(F.wiegen.aufgabe));
  el('p','rz-klein',k,tr(F.herstellen.anleitung));
  el('h4','rz-h4',k,w('welcheZutat'));
  var liste=el('div','rz-optionen',k);
  zutaten().forEach(function(b){
    var gesperrt = b.id!=='ery' && !(B.inSchale.ery>0);
    var t=b.name+' · '+w('sollIst')+' '+zahl(sollVon(b.id),b.nk)+' g';
    var bt=knopf((B.erledigt[b.id]?'✓ ':'')+t,function(){ zutatWaehlen(b.id); },liste,'rz-option'+(B.erledigt[b.id]?' erledigt':''));
    if(gesperrt) bt.disabled=true;
  });
  var reihe=el('div','rz-reihe',k);
  if(B.inSchale.ery>0 || (B.eryAngenommen && B.schiff>0)) knopf(w('schale'),schaleAnsicht,reihe,'rz-btn');
}
function zutatWaehlen(id){
  B.zutat=id; B.spatelUeber=false; B.flascheUeber=false;
  B.spatel={zustand:'leer',menge:0,rest:0,art:null};
  if(id==='ery'){ B.schiffOrt=B.schiffOrt||'bank'; }
  /* Waage waehlen */
  leeren(); hintergrund(META.bilder.bank); kopfZeichnen(4);
  var k=karte('rz-voll');
  el('h4','rz-h4',k,w('welcheWaage'));
  ['analyse','praezision'].forEach(function(n){
    var c=META.waagen[n];
    var b=knopf('',function(){ waageWaehlen(n); },k,'rz-wkarte');
    el('b',null,b,w(n));
    el('span',null,b,w('minMax').replace('{min}',zahl(c.min,2)).replace('{max}',String(c.max)));
  });
  knopf(w('zumBlatt'),blatt,k,'rz-btn');
}
function waageWaehlen(n){
  B.waage=n; B.ansicht='waage'; B.tuerZu=false;
  if(B.zutat==='ery'){ B.schiffOrt='bank'; }
  else { B.schaleOrt='bank'; }
  /* Creme: Anteil zu Beginn der Sitzung merken (Portionen) */
  B.sitzungStart=B.inSchale.creme;
  /* Mindestlast: was unter 5 g liegt, gehoert nicht auf die Praezisionswaage */
  if(sollVon(B.zutat) < META.waagen[n].min) fehler('mindestlast',B.zutat);
  waageAnsicht();
}

/* ---------- Waagenplatz ---------- */
var WV={};   /* Elemente des Waagenplatzes */
function waageAnsicht(){
  kopfZeichnen(4); leeren();
  var c=cfg(), z=B.zutat, bank=META.bank;
  WV={};
  WV.szene=bildEl(c.bildZu && B.tuerZu? c.bildZu : c.bild,'rz-szene',buehne);
  WV.pos={};
  if(z==='ery'){
    WV.gefaess=teil(B.gefaessOffen?META.bilder.gefaessAuf:META.bilder.gefaessZu,'gefaess',bank.gefaess,147,true);
    WV.gefaessEt=el('div','rz-etik rz-etik-teil',buehne); WV.gefaessEt.innerHTML='<div class="rz-etik-in">Erythromycin</div>';
    WV.deckel=teil(META.bilder.deckel,'deckel',bank.deckel,95,false); WV.deckel.style.display=B.gefaessOffen?'block':'none';
    WV.schiff=teil(META.bilder.schiff,'schiff',bank.schiff,c.schiffBreite,true);
    WV.haufen=teil(META.bilder.haufen,'haufen',bank.schiff,60,false); WV.haufen.classList.add('rz-haufen');
    WV.spatel=teil(META.bilder.spatel,'spatel',bank.spatel,216,true);
    WV.abfall=teil(META.bilder.abfall,'abfall',bank.abfall,112,false);
  } else {
    WV.schale=teil(META.bilder.schaleKlein,'schale',bank.schale,c.schaleBreite,true); WV.schale.classList.add('rz-schale-klein');
    WV.blob=teil(META.bilder.blob,'blob',bank.schale,10,false); WV.blob.classList.add('rz-blob');
    if(z==='creme'){
      WV.topf=teil(META.bilder.topf,'topf',bank.topf,220,false);
      WV.topfEt=el('div','rz-etik rz-etik-teil',buehne); WV.topfEt.innerHTML='<div class="rz-etik-in">Basiscreme DAC</div>';
      WV.spatel=teil(META.bilder.spatel,'spatel',bank.spatel,216,true);
      WV.abfall=teil(META.bilder.abfall,'abfall',bank.abfall,112,false);
    } else {
      WV.flasche=teil(META.bilder.flasche,'flasche',bank.flasche,92,true);
      WV.flascheEt=el('div','rz-etik rz-etik-teil rz-etik-schmal',buehne);
      WV.flascheEt.innerHTML='<div class="rz-etik-in">'+esc(zutatDef(z).etikett)+'</div>';
    }
  }
  if(c.bildZu){
    WV.tuer=el('button','rz-tuer',buehne); WV.tuer.type='button';
    setze(WV.tuer,{x:c.tuer.x,y:c.tuer.y}); WV.tuer.style.width=(c.tuer.w/META.W*100)+'%'; WV.tuer.style.height=(c.tuer.h/META.H*100)+'%';
    el('span',null,WV.tuer,'');
    WV.tuer.addEventListener('pointerdown',function(ev){ tuer(); ev.preventDefault(); });
  }
  WV.anzeige=el('div','rz-anzeige',buehne); setze(WV.anzeige,c.anzeige);
  WV.wert=el('div','rz-wert',WV.anzeige,'0');
  var sm=el('small',null,WV.anzeige); WV.stabil=el('span','rz-stabil',sm); WV.stabilTxt=el('span',null,sm,'');
  WV.tara=knopf(w('tara'),tara,buehne,'rz-wknopf'); setze(WV.tara,c.tara);
  WV.ueber=knopf(w('uebernehmen'),uebernehmen,buehne,'rz-wknopf hell'); setze(WV.ueber,c.uebernehmen);
  WV.tipp=el('div','rz-tipp',buehne);
  var leiste=el('div','rz-leiste',buehne);
  knopf(w('zumBlatt'),sitzungEnde,leiste,'rz-btn');
  if(B.inSchale.ery>0 || B.eryAngenommen) knopf(w('schale'),function(){ sitzungEnde(true); },leiste,'rz-btn');
  WV.leiste=leiste;
  ['gefaess','schiff','spatel','schale','flasche'].forEach(function(n){ if(WV[n]) WV[n].addEventListener('pointerdown',runter,{passive:false}); });
  buehne.addEventListener('pointermove',bewegen,{passive:false});
  buehne.addEventListener('pointerup',hoch); buehne.addEventListener('pointercancel',hoch);
  R.ticks=[waageTick];
  waageZeichnen(); tuerMalen();
}
function teil(src,name,p,breite,greifbar){
  var e=bildEl(src,'rz-teil'+(greifbar?' greifbar':''),buehne); e.dataset.n=name;
  WV.pos[name]={x:p.x,y:p.y}; WV.pos[name+'_b']=breite; setze(e,p,breite); return e;
}
function aufPfanne(n){ return n==='schiff'? B.schiffOrt===B.waage : B.schaleOrt===B.waage; }
function brutto(){
  var m=0;
  if(B.zutat==='ery'){ if(aufPfanne('schiff')) m+=META.massen.schiffchen+B.schiff; }
  else if(aufPfanne('schale')){ var s=B.inSchale; m+=META.massen.schale+s.ery+s.mct+s.cit+s.creme; }
  return m;
}
function ruhig(t){
  var c=cfg(); if(!c) return false;
  if(c.bildZu && !B.tuerZu) return false;
  if(B.fliesst) return false;
  return t>=B.ruhigBis;
}
function ablesung(t){
  var c=cfg(); var roh=brutto()-B.tara[B.waage];
  var st=(!ruhig(t)? (Math.random()-0.5)*c.d*6 : 0) +
         (c.bildZu && !B.tuerZu ? Math.sin(t/180)*c.d*7 + (Math.random()-0.5)*c.d*5 : 0);
  return Math.round((roh+st)/c.d)*c.d;
}
function waageTick(t,dt){
  var c=cfg(); if(!c||B.ansicht!=='waage') return;
  if(brutto()>c.max){ WV.wert.textContent='OL'; }
  else WV.wert.textContent=zahl(ablesung(t),c.nk)+' g';
  var r=ruhig(t); WV.stabil.classList.toggle('an',r); WV.stabilTxt.textContent=r?w('stabil'):w('instabil');
  /* Halten: Dauerfluss am Spatel oder an der Tropfflasche */
  if(zieht && zieht.modus==='dosieren' && !zieht.bewegt && t-zieht.zeit>320){
    if(!B.fliesst){ B.fliesst=true; rauschen(zieht.el===WV.flasche?0:0.14,2600); }
    if(zieht.el===WV.flasche){
      /* Tropfen werden schneller, je laenger man drueckt: 4 bis 30 je Sekunde */
      var rate=Math.min(30, 4+ (t-zieht.zeit-320)/1000*9);
      B.flussRest=(B.flussRest||0)+rate*dt;
      while(B.flussRest>=1){ B.flussRest-=1; tropfen(); }
    } else {
      B.flussRest=(B.flussRest||0)+6*dt;
      if(B.flussRest>=1){ var n=Math.floor(B.flussRest); B.flussRest-=n; dosieren(n); }
    }
  }
  tippSetzen();
}
function tippSetzen(){
  var t;
  if(B.zutat==='ery'){
    if(!aufPfanne('schiff')) t=w('tBehaelter');
    else if(!B.gefaessOffen && B.spatel.menge<=0) t=w('tGefaess');
    else if(B.spatel.zustand!=='ueber') t=w('tSpatel');
    else t=w('tTippen');
  } else if(B.zutat==='creme'){
    if(!aufPfanne('schale')) t=w('tBehaelter');
    else if(B.spatel.zustand!=='ueber') t=w('tSpatel');
    else t=w('tTippen');
  } else {
    if(!aufPfanne('schale')) t=w('tBehaelter');
    else if(!B.flascheUeber) t=w('tFlasche');
    else t=w('tTropfen');
  }
  if(WV.tipp.textContent!==t) WV.tipp.textContent=t;
}
function waageZeichnen(){
  var c=cfg(), P=WV.pos;
  if(WV.schiff){
    var ps=aufPfanne('schiff')? c.pfanne : P.schiff; if(aufPfanne('schiff')){ P.schiff.x=c.pfanne.x; P.schiff.y=c.pfanne.y; }
    setze(WV.schiff,P.schiff,c.schiffBreite);
    if(B.schiff>0){ var f=Math.cbrt(B.schiff/Math.max(sollVon('ery'),1e-6));
      WV.haufen.style.display='block'; setze(WV.haufen,{x:P.schiff.x,y:P.schiff.y+6},Math.max(34,Math.min(150,118*f))); }
    else WV.haufen.style.display='none';
  }
  if(WV.schale){
    if(aufPfanne('schale')){ P.schale.x=c.pfanne.x; P.schale.y=c.pfanne.y; }
    setze(WV.schale,P.schale,c.schaleBreite);
    var cr=B.inSchale.creme;
    if(cr>0){ WV.blob.style.display='block'; setze(WV.blob,{x:P.schale.x,y:P.schale.y-c.schaleBreite*0.06},Math.max(30,c.schaleBreite*0.62*Math.cbrt(cr/30))); }
    else WV.blob.style.display='none';
  }
  if(WV.gefaess){ setze(WV.gefaess,P.gefaess,147); WV.gefaess.src=B.gefaessOffen?META.bilder.gefaessAuf:META.bilder.gefaessZu;
    WV.deckel.style.display=B.gefaessOffen?'block':'none';
    etikettTeil(WV.gefaessEt,P.gefaess,120,0.06); }
  if(WV.topfEt) etikettTeil(WV.topfEt,P.topf,150,0.06);
  if(WV.spatel){ setze(WV.spatel,P.spatel,216);
    WV.spatel.src = B.spatel.menge>0 ? (B.spatel.art==='creme'?META.bilder.spatelCreme:META.bilder.spatelVoll) : META.bilder.spatel; }
  if(WV.flasche){
    if(B.flascheUeber){ var pf=WV.pos.schale; P.flasche.x=pf.x; P.flasche.y=pf.y-210; WV.flasche.classList.add('kopf'); }
    else WV.flasche.classList.remove('kopf');
    setze(WV.flasche,P.flasche,92);
    etikettTeil(WV.flascheEt,{x:P.flasche.x,y:P.flasche.y+(B.flascheUeber?-30:30)},70,0.05);
    WV.flascheEt.classList.toggle('kopf',B.flascheUeber);
  }
}
function etikettTeil(e,p,breite,h){
  e.style.left=((p.x-breite/2)/META.W*100)+'%'; e.style.top=((p.y)/META.H*100-h*50)+'%';
  e.style.width=(breite/META.W*100)+'%'; e.style.height=(h*100)+'%';
}
function tuer(){
  tonAn(); B.tuerZu=!B.tuerZu; tuerMalen();
  rauschen(0.12,2600); setTimeout(function(){ rauschen(0); },170); vib(10);
  if(B.tuerZu) B.ruhigBis=performance.now()+700;
}
function tuerMalen(){
  var c=cfg(); if(!c||!WV.szene) return;
  WV.szene.src=c.bildZu && B.tuerZu? c.bildZu : c.bild;
  if(WV.tuer) WV.tuer.querySelector('span').textContent=B.tuerZu? w('tuerAuf') : w('tuerZu');
}
function tara(){
  B.tara[B.waage]=brutto(); B.ruhigBis=performance.now()+400; klack(700,0.08); vib(8);
}
function uebernehmen(){
  var c=cfg(), t=performance.now(), z=B.zutat;
  if(brutto()>c.max) return;
  var v=ablesung(t), r=ruhig(t);
  /* Ohne Behaelter auf der Schale gibt es nichts zu uebernehmen. */
  var behaelter = z==='ery'? aufPfanne('schiff') : aufPfanne('schale');
  if(!behaelter) { klack(300,0.06); return; }
  if(!r) fehler('instabil',z);
  /* Tara: was ausser der Zutat selbst auf der Schale liegt, muss weg sein */
  var eigen = z==='ery'? B.schiff : (z==='creme'? B.inSchale.creme : B.inSchale[z]);
  var basis = brutto()-eigen;
  if(B.tara[B.waage] < basis - 3*c.d) fehler('tara',z);
  var vorher=B.ist[z]||{};
  B.ist[z]={ masse:eigen, abgelesen:v, waage:B.waage, sitzungen:(vorher.sitzungen||0)+1 };
  B.erledigt[z]= z!=='ery' ? true : B.erledigt[z];
  if(z==='ery') B.eryAngenommen=true;
  klack(900,0.1); vib(12);
  WV.ueber.classList.add('ok'); setTimeout(function(){ if(WV.ueber) WV.ueber.classList.remove('ok'); },600);
}
function sitzungEnde(zurSchale){
  var z=B.zutat;
  if(z==='ery' && B.gefaessOffen){ fehler('offen','ery'); B.gefaessOffen=false; }
  if(z==='creme'){
    var portion=B.inSchale.creme-B.sitzungStart;
    if(portion>0){
      if(B.brauchtSchaben) fehler('abschaben');
      if(B.portionen.length===0 && B.anreib < META.schale.umdrehungen*2*Math.PI - 1e-6) fehler('anreiben');
      B.portionen.push(portion);
      if(B.portionen.length===1 && portion >= F.herstellen.einmal*cremeSoll()) fehler('einmal');
      B.brauchtSchaben=true; B.wandSauber=0; B.rot=0; B.misch=0;
    }
  }
  if((z==='mct'||z==='cit') && B.ist[z]){
    if(z==='cit'){
      if(B.brauchtSchaben) fehler('abschaben');
      if(B.inSchale.creme < 0.95*cremeSoll()) fehler('saeure');
      if(B.inSchale.creme<=0 && B.anreib < META.schale.umdrehungen*2*Math.PI - 1e-6) fehler('anreiben');
      B.end=0; B.rot=0;
    }
  }
  if(z==='creme' && B.ist.creme){ B.erledigt.creme = B.inSchale.creme >= 0.95*cremeSoll(); }
  B.schaleOrt='bank'; B.schiffOrt= z==='ery'? (B.schiff>0?'bank':'weg') : B.schiffOrt;
  B.zutat=null; B.waage=null; B.flascheUeber=false; B.fliesst=false; rauschen(0);
  if(zurSchale===true) schaleAnsicht(); else blatt();
}

/* ---------- Ziehen am Waagenplatz (nach waage.html) ---------- */
var zieht=null, FANG=230;
function runter(ev){
  tonAn();
  var p=inBild(ev), e=ev.currentTarget, n=e.dataset.n;
  if(n==='gefaess'){ B.gefaessOffen=!B.gefaessOffen; klack(B.gefaessOffen?320:260,0.1); vib(10); waageZeichnen(); ev.preventDefault(); return; }
  if((n==='spatel' && B.spatel.zustand==='ueber') || (n==='flasche' && B.flascheUeber)){
    zieht={el:e,n:n,modus:'dosieren',start:p,zeit:performance.now(),bewegt:false,id:ev.pointerId};
    try{ buehne.setPointerCapture(ev.pointerId); }catch(x){} ev.preventDefault(); return;
  }
  var pos=WV.pos[n]; if(!pos) return;
  zieht={el:e,n:n,modus:'ziehen',id:ev.pointerId,dx:pos.x-p.x,dy:pos.y-p.y,start:p,zeit:performance.now(),bewegt:false};
  try{ buehne.setPointerCapture(ev.pointerId); }catch(x){} ev.preventDefault();
}
function bewegen(ev){
  if(!zieht||ev.pointerId!==zieht.id) return;
  var p=inBild(ev);
  if(zieht.modus==='ziehen'){
    var pos=WV.pos[zieht.n]; pos.x=p.x+zieht.dx; pos.y=p.y+zieht.dy;
    if(Math.abs(p.x-zieht.start.x)+Math.abs(p.y-zieht.start.y)>18) zieht.bewegt=true;
    if(zieht.n==='schiff') B.schiffOrt='bank';
    if(zieht.n==='schale') B.schaleOrt='bank';
    waageZeichnen();
  } else if(Math.abs(p.x-zieht.start.x)+Math.abs(p.y-zieht.start.y)>26){
    zieht.bewegt=true; B.fliesst=false; rauschen(0); B.ruhigBis=performance.now()+600;
    if(zieht.n==='spatel') B.spatel.zustand = B.spatel.menge>0?'voll':'leer';
    if(zieht.n==='flasche') B.flascheUeber=false;
    zieht.modus='ziehen'; var ps=WV.pos[zieht.n]; zieht.dx=ps.x-p.x; zieht.dy=ps.y-p.y;
  }
  ev.preventDefault();
}
function hoch(ev){
  if(!zieht||ev.pointerId!==zieht.id) return;
  var z=zieht; zieht=null; B.fliesst=false; B.flussRest=0; rauschen(0);
  if(z.modus==='dosieren'){
    if(!z.bewegt && performance.now()-z.zeit<320){
      if(z.n==='flasche') tropfen();
      else if(B.spatel.menge>0) dosieren(1); else abnehmen();
    }
    B.ruhigBis=performance.now()+600; return;
  }
  ablegen(z.n);
}
function ablegen(n){
  var c=cfg(), p=WV.pos[n], bank=META.bank;
  if(n==='schiff' || n==='schale'){
    if(nah(p,c.pfanne,FANG)){
      if(n==='schiff') B.schiffOrt=B.waage; else B.schaleOrt=B.waage;
      B.ruhigBis=performance.now()+600; klack(520,0.08);
    }
    waageZeichnen(); return;
  }
  if(n==='flasche'){
    if(aufPfanne('schale') && nah(p,{x:WV.pos.schale.x,y:WV.pos.schale.y-120},FANG)){ B.flascheUeber=true; klack(420,0.08); }
    else { WV.pos.flasche.x=bank.flasche.x; WV.pos.flasche.y=bank.flasche.y; }
    waageZeichnen(); return;
  }
  if(n==='spatel'){
    var s=B.spatel, creme=B.zutat==='creme';
    var vorrat = creme? {x:WV.pos.topf.x,y:WV.pos.topf.y-40} : {x:WV.pos.gefaess.x,y:WV.pos.gefaess.y-90};
    var vorratOffen = creme || B.gefaessOffen;
    var behaelter = creme? (aufPfanne('schale')? {x:WV.pos.schale.x,y:WV.pos.schale.y} : null)
                         : (aufPfanne('schiff')? {x:WV.pos.schiff.x,y:WV.pos.schiff.y} : null);
    if(s.rest>0 && vorratOffen && nah(p,vorrat,FANG)){
      fehler('rueckgabe',B.zutat); s.menge=0; s.rest=0; s.zustand='leer'; klack(300,0.1);
      waageZeichnen(); return;
    }
    if(vorratOffen && nah(p,vorrat,FANG)){
      s.menge=raster(spur()*8); s.rest=0; s.zustand='voll'; s.art=creme?'creme':'pulver';
      klack(380,0.1); if(!creme){ rauschen(0.1,2600); setTimeout(function(){ rauschen(0); },160); }
      waageZeichnen(); return;
    }
    if(nah(p,{x:WV.pos.abfall.x,y:WV.pos.abfall.y-40},FANG)){
      s.menge=0; s.rest=0; s.zustand='leer'; klack(200,0.14); waageZeichnen(); return;
    }
    if(behaelter && nah(p,behaelter,FANG)){
      p.x=behaelter.x+150; p.y=behaelter.y-(creme?230:190); s.zustand='ueber'; waageZeichnen(); return;
    }
    if(s.zustand==='ueber') s.zustand='voll';
    waageZeichnen();
  }
}
function spur(){
  var c=cfg(), soll=sollVon(B.zutat); var roh=soll/25;
  return Math.max(c.d, Math.round(roh/c.d)*c.d);
}
function raster(v){ var c=cfg(); return Math.max(0, Math.round(v/c.d)*c.d); }
function istMenge(){ return B.zutat==='ery'? B.schiff : B.inSchale.creme - B.sitzungStart + (B.ist.creme? 0:0); }
function dosieren(n){
  var s=B.spatel; if(s.zustand!=='ueber') return;
  if(s.menge<=0){ klack(300,0.06); return; }
  var e=spur(), ab=0;
  for(var i=0;i<(n||1);i++){
    if(s.menge<=1e-9) break;
    var fehlt;
    if(B.zutat==='ery') fehlt=sollVon('ery')-B.schiff;
    else fehlt=cremeSoll()-B.inSchale.creme;
    /* Der letzte Tipp vor dem Soll gibt genau den Rest: so ist das Soll
       erreichbar, ohne dass Tempo bestraft wird. Halten schiesst ueber. */
    var gabe = (n===1 && fehlt>0 && fehlt<e) ? raster(fehlt) : e;
    gabe=Math.min(gabe,s.menge); ab+=gabe; s.menge=raster(s.menge-gabe);
  }
  if(B.zutat==='ery') B.schiff=raster(B.schiff+ab); else B.inSchale.creme=raster(B.inSchale.creme+ab);
  if(s.menge<=1e-9){ s.menge=0; s.rest=0; B.fliesst=false; rauschen(0); }
  B.ruhigBis=performance.now()+600; klack(1500,0.05); vib(6); waageZeichnen();
}
function abnehmen(){
  var e=spur(), s=B.spatel;
  var vorhanden = B.zutat==='ery'? B.schiff : (B.inSchale.creme-B.sitzungStart);
  if(vorhanden<=0) return;
  var ab=Math.min(vorhanden,e);
  if(B.zutat==='ery') B.schiff=raster(B.schiff-ab); else B.inSchale.creme=raster(B.inSchale.creme-ab);
  s.menge=raster(s.menge+ab); s.rest+=ab; s.art=B.zutat==='creme'?'creme':'pulver';
  B.ruhigBis=performance.now()+600; klack(1100,0.06); vib(6); waageZeichnen();
}
function tropfen(){
  if(!B.flascheUeber) return;
  var tf=F.wiegen, m=tf.tropfen+(Math.random()*2-1)*tf.tropfenStreu;
  m=Math.round(m*1e4)/1e4;
  B.inSchale[B.zutat]=Math.round((B.inSchale[B.zutat]+m)*1e4)/1e4;
  B.ruhigBis=performance.now()+500; tropfTon(); vib(4);
  /* Tropfen faellt sichtbar von der Spitze in die Schale */
  var t=el('div','rz-tropfen',buehne); var s=WV.pos.schale;
  setze(t,{x:s.x,y:s.y-150}); setTimeout(function(){ t.remove(); },360);
}

/* ---------- Fantaschale ---------- */
var SV={};
function inhaltZustand(){
  var s=B.inSchale;
  if(s.ery<=0) return 'EMPTY';
  if(s.mct<=0 && s.creme<=0) return 'POWDER';
  if(s.creme<=0) return 'PASTE';
  if(s.cit>0 && B.erledigt.creme) return 'ACID';
  if(R.falsch && B.erledigt.creme) return 'ENDE';
  return 'CREAM';
}
function schaleAnsicht(){
  B.ansicht='schale'; kopfZeichnen(5); leeren();
  var BS=META.bilder.schale; SV={};
  SV.leer=bildEl(BS.EMPTY,'rz-szene',buehne);
  SV.a=bildEl(BS.EMPTY,'rz-szene rz-blende',buehne);
  SV.b=bildEl(BS.EMPTY,'rz-szene rz-blende',buehne);
  SV.wand=el('canvas','rz-szene rz-wand',buehne); SV.wand.width=META.W; SV.wand.height=META.H;
  wandBauen();
  SV.schatten=el('div','rz-pschatten',buehne);
  SV.pistill=bildEl(META.bilder.pistill,'rz-pistill',buehne);
  SV.pistill.style.width=(META.schale.pistill.w*META.schale.pistill.scale/META.W*100)+'%';
  SV.griff=el('div','rz-griff',buehne);
  SV.griff.style.width=(340/META.W*100)+'%'; SV.griff.style.height=(320/META.H*100)+'%';
  SV.rand=bildEl(META.bilder.rand,'rz-szene rz-rand',buehne);
  SV.karte=bildEl(META.bilder.karte,'rz-teil greifbar rz-karteblatt',buehne);
  SV.kpos={x:700,y:1250}; setze(SV.karte,SV.kpos,190);
  if(B.erledigt.ery===undefined && B.eryAngenommen && B.schiff>0){
    SV.schiff=bildEl(META.bilder.schiff,'rz-teil greifbar',buehne); SV.spos={x:200,y:1250}; setze(SV.schiff,SV.spos,190);
    SV.haufen=bildEl(META.bilder.haufen,'rz-teil rz-haufen',buehne); setze(SV.haufen,{x:200,y:1256},90);
  }
  SV.ring=el('div','rz-ring',buehne); SV.ring.innerHTML='<svg viewBox="0 0 40 40"><circle class="bg" cx="20" cy="20" r="16"/><circle class="fg" cx="20" cy="20" r="16" stroke-dasharray="100.53" stroke-dashoffset="100.53" transform="rotate(-90 20 20)"/></svg>';
  SV.tipp=el('div','rz-tipp',buehne);
  var leiste=el('div','rz-leiste',buehne);
  knopf(w('zumBlatt'),blatt,leiste,'rz-btn');
  SV.fertig=knopf(w('fertig'),bankFertig,leiste,'rz-btn rz-haupt'); SV.fertig.style.display='none';
  buehne.addEventListener('pointerdown',schaleRunter,{passive:false});
  buehne.addEventListener('pointermove',schaleBewegen,{passive:false});
  buehne.addEventListener('pointerup',schaleHoch); buehne.addEventListener('pointercancel',schaleHoch);
  R.ticks=[schaleTick];
  schaleMalen();
}
/* Wandbelag: CREAM_PARTIAL zeigt Creme an der Innenwand. Abschaben
   legt die saubere Wand aus EMPTY darueber, nur ausserhalb des Sees. */
function wandBauen(){
  var cv=SV.wand, ctx=null; try{ ctx=cv.getContext('2d'); }catch(e){}
  if(!ctx) return;
  var leer=new Image(); leer.onload=function(){
    try{
      var o=META.schale.oeffnung, s=META.schale.see;
      var m=document.createElement('canvas'); m.width=META.W; m.height=META.H; var mc=m.getContext('2d');
      mc.drawImage(leer,0,0,META.W,META.H);
      mc.globalCompositeOperation='destination-in';
      mc.beginPath(); mc.ellipse(o.x,o.y,o.rx-4,o.ry-4,0,0,Math.PI*2); mc.fill();
      mc.globalCompositeOperation='destination-out';
      mc.save(); mc.translate(s.x,s.y); mc.scale(1,s.ry/s.rx);
      var g=mc.createRadialGradient(0,0,s.rx*0.85,0,0,s.rx*1.12);
      g.addColorStop(0,'rgba(0,0,0,1)'); g.addColorStop(1,'rgba(0,0,0,0)');
      mc.fillStyle=g; mc.beginPath(); mc.arc(0,0,s.rx*1.12,0,Math.PI*2); mc.fill(); mc.restore();
      ctx.clearRect(0,0,META.W,META.H); ctx.drawImage(m,0,0);
    }catch(e){}
  };
  leer.src=META.bilder.schale.EMPTY;
}
function schaleMalen(){
  var BS=META.bilder.schale, z=inhaltZustand(), U=META.schale.umdrehungen*2*Math.PI;
  var a='EMPTY', b=null, f=0, wand=0;
  if(z==='POWDER') a='POWDER';
  else if(z==='PASTE'){ a='PASTE_LUMPY'; b='PASTE_SMOOTH'; f=Math.min(1,B.anreib/U); }
  else if(z==='CREAM'){ a='CREAM_PARTIAL'; wand=B.wandSauber; }
  else if(z==='ACID'){ a='CREAM_ACID'; b='CREAM_SMOOTH'; f=Math.min(1,B.end/U); }
  else if(z==='ENDE'){ a='CREAM_PARTIAL'; b='CREAM_SMOOTH'; f=Math.min(1,B.end/U); wand=B.wandSauber; }
  if(SV.a.dataset.k!==a){ SV.a.src=BS[a]; SV.a.dataset.k=a; }
  SV.a.style.opacity='1';
  if(b){ if(SV.b.dataset.k!==b){ SV.b.src=BS[b]; SV.b.dataset.k=b; } SV.b.style.opacity=f.toFixed(3); } else SV.b.style.opacity='0';
  SV.wand.style.opacity = (a==='CREAM_PARTIAL'? wand*(1-f) : 0).toFixed(3);
  var aktiv=z!=='EMPTY' && z!=='POWDER';
  SV.pistill.style.display=aktiv?'block':'none'; SV.schatten.style.display=aktiv?'block':'none';
  SV.griff.style.display=aktiv && !B.greift?'block':'none';
  SV.karte.style.display=(z==='CREAM'||z==='ACID'||z==='ENDE')?'block':'none';
  SV.karte.src = B.karteCreme? META.bilder.karteCreme : META.bilder.karte;
  pistillMalen();
  /* Ring: Anreiben oder Endmischen */
  var rf=0; if(z==='PASTE') rf=Math.min(1,B.anreib/U); else if(z==='ACID'||z==='ENDE') rf=Math.min(1,B.end/U); else if(z==='CREAM') rf=Math.min(1,B.misch/(U/2));
  SV.ring.querySelector('.fg').setAttribute('stroke-dashoffset',(100.53*(1-rf)).toFixed(2));
  SV.ring.style.display=aktiv?'block':'none';
  var fertig = alleDrin() && (z==='ACID'||z==='ENDE') && f>=0.999;
  SV.fertig.style.display=fertig?'inline-block':'none';
  var t = SV.schiff? w('tSchiff') : (fertig? w('tFertig') : (z==='CREAM' && B.brauchtSchaben && B.misch>0? w('tKarte') : (aktiv? w('tPistill') : w('tSchiff'))));
  if(SV.tipp.textContent!==t) SV.tipp.textContent=t;
}
function spitze(phi){ var b=META.schale.bahn; return {x:b.x+b.rx*Math.cos(phi), y:b.y+b.ry*Math.sin(phi)}; }
function pistH(){ var P=META.schale.pistill; return P.h*P.scale; }
function griffPunkt(phi){ var s=spitze(phi); return {x:s.x, y:s.y-pistH()*META.schale.pistill.griff}; }
function pistillMalen(){
  var p=spitze(B.phi), tiefe=0.965+0.035*Math.sin(B.phi), grad=META.schale.pistill.neigung*Math.cos(B.phi);
  SV.pistill.style.left=(p.x/META.W*100)+'%'; SV.pistill.style.top=(p.y/META.H*100)+'%';
  SV.pistill.style.transform='translate(-50%,-100%) rotate('+grad.toFixed(2)+'deg) scale('+tiefe.toFixed(3)+')';
  var g=griffPunkt(B.phi); SV.griff.style.left=(g.x/META.W*100)+'%'; SV.griff.style.top=((g.y+40)/META.H*100)+'%';
  SV.schatten.style.left=(p.x/META.W*100)+'%'; SV.schatten.style.top=((p.y+10)/META.H*100)+'%';
  SV.schatten.style.opacity=(0.55+0.25*Math.sin(B.phi)).toFixed(2);
}
var sZieht=null;
function schaleRunter(ev){
  tonAn();
  var p=inBild(ev), z=inhaltZustand();
  if(SV.schiff && nah(p,SV.spos,140)){ sZieht={n:'schiff',id:ev.pointerId,dx:SV.spos.x-p.x,dy:SV.spos.y-p.y}; fang(ev); return; }
  if(SV.karte.style.display!=='none' && nah(p,SV.kpos,130)){ sZieht={n:'karte',id:ev.pointerId,dx:SV.kpos.x-p.x,dy:SV.kpos.y-p.y,bins:{}}; fang(ev); return; }
  if(z==='EMPTY'||z==='POWDER') return;
  var g=griffPunkt(B.phi);
  if(Math.abs(p.x-g.x)<=170 && p.y>=g.y-120 && p.y<=g.y+200){
    B.greift=true; B.zeiger=ev.pointerId; B.letztePhi=neuerWinkel(p); sZieht={n:'pistill',id:ev.pointerId}; fang(ev);
  }
}
function fang(ev){ try{ buehne.setPointerCapture(ev.pointerId); }catch(e){} ev.preventDefault(); }
function neuerWinkel(p){ var b=META.schale.bahn; var dy=pistH()*META.schale.pistill.griff;
  return Math.atan2((p.y+dy-b.y)/b.ry,(p.x-b.x)/b.rx); }
function schaleBewegen(ev){
  if(!sZieht||ev.pointerId!==sZieht.id) return;
  var p=inBild(ev);
  if(sZieht.n==='pistill'){ var neu=neuerWinkel(p), d=neu-B.letztePhi;
    while(d>Math.PI) d-=2*Math.PI; while(d<-Math.PI) d+=2*Math.PI; B.letztePhi=neu; drehen(d); }
  else if(sZieht.n==='schiff'){ SV.spos.x=p.x+sZieht.dx; SV.spos.y=p.y+sZieht.dy; setze(SV.schiff,SV.spos,190); setze(SV.haufen,{x:SV.spos.x,y:SV.spos.y+6},90);
    var o=META.schale.oeffnung; SV.schiff.style.transform='translate(-50%,-50%)'+(nah(SV.spos,{x:o.x,y:o.y-40},200)?' rotate(-28deg)':''); }
  else if(sZieht.n==='karte'){ SV.kpos.x=p.x+sZieht.dx; SV.kpos.y=p.y+sZieht.dy; setze(SV.karte,SV.kpos,190); karteSchaben(SV.kpos,sZieht.bins); }
  ev.preventDefault();
}
function schaleHoch(ev){
  if(!sZieht||ev.pointerId!==sZieht.id) return;
  var z=sZieht; sZieht=null; B.greift=false; rauschen(0);
  if(z.n==='schiff'){ var o=META.schale.oeffnung;
    if(nah(SV.spos,{x:o.x,y:o.y-40},200)) schiffLeeren();
    else { SV.spos={x:200,y:1250}; setze(SV.schiff,SV.spos,190); setze(SV.haufen,{x:200,y:1256},90); SV.schiff.style.transform=''; } }
  if(z.n==='karte'){
    if(B.karteCreme && nah(SV.kpos,{x:420,y:860},120)){ B.karteCreme=false; klack(500,0.08); }
    SV.kpos={x:700,y:1250}; setze(SV.karte,SV.kpos,190);
  }
  schaleMalen();
}
function schiffLeeren(){
  B.inSchale.ery=B.schiff; B.schiff=0; B.erledigt.ery=true;
  rauschen(0.14,2600); setTimeout(function(){ rauschen(0); },380); vib(15);
  if(SV.schiff){ SV.schiff.remove(); SV.haufen.remove(); SV.schiff=null; }
  schaleMalen();
}
function drehen(d){
  var z=inhaltZustand(); B.phi+=d; var a=Math.abs(d);
  if(z==='PASTE') B.anreib+=a;
  else if(z==='CREAM') B.misch+=a;
  else if(z==='ACID'||z==='ENDE') B.end+=a;
  B.tempoRoh=(B.tempoRoh||0)+a;
  var stufe=Math.floor((B.anreib+B.misch+B.end)/(Math.PI/2)); if(stufe!==B.rastend){ B.rastend=stufe; vib(8); }
}
function karteSchaben(p,bins){
  /* Hintere Haelfte der Oeffnung: phi von pi bis 2 pi, zwoelf Faecher */
  var o=META.schale.oeffnung, phi=Math.atan2((p.y-o.y)/o.ry,(p.x-o.x)/o.rx);
  var auf={x:o.x+o.rx*Math.cos(phi), y:o.y+o.ry*Math.sin(phi)};
  if(p.y>o.y+10 || !nah(p,auf,70)) return;
  var t=phi<0? phi+2*Math.PI : phi; var fach=Math.floor((t-Math.PI)/(Math.PI/12));
  if(fach<0||fach>11) return;
  if(!bins[fach]){ bins[fach]=true; rauschen(0.08,1700); setTimeout(function(){ rauschen(0); },90); }
  var n=Object.keys(bins).length;
  if(inhaltZustand()==='CREAM'||inhaltZustand()==='ENDE') B.wandSauber=Math.max(B.wandSauber,Math.min(1,n/9));
  if(n>=9 && B.brauchtSchaben){ B.brauchtSchaben=false; B.karteCreme=true; klack(640,0.1); vib(12); }
  schaleMalen();
}
function schaleTick(t,dt){
  var roh=(B.tempoRoh||0)/dt; B.tempoRoh=0; B.tempo=B.tempo+(roh-B.tempo)*0.25;
  if(B.greift) rauschen(Math.min(0.30,B.tempo*0.045),900+Math.min(900,B.tempo*110));
  if(B.greift||B.tempo>0.01) schaleMalen();
}
function bankFertig(){
  if(B.brauchtSchaben) fehler('abschaben');
  /* Toleranz: Ist gegen das eigene Soll */
  zutaten().forEach(function(b){
    var ist=B.ist[b.id], soll=sollVon(b.id);
    var masse = b.id==='ery'? B.inSchale.ery : B.inSchale[b.id];
    if(!ist || Math.abs(masse-soll) > F.wiegen.toleranz*soll) fehler('toleranz',b.id);
  });
  R.klumpen = hatFehler('anreiben')||hatFehler('einmal')||hatFehler('abschaben');
  R.fertig[4]=R.fertig[5]=true; s6();
}
function bankUeberspringen(){
  zutaten().forEach(function(b){ var v=richtigerWert(b);
    B.ist[b.id]={masse:v,abgelesen:v,waage:(v<5?'analyse':'praezision'),sitzungen:1}; B.inSchale[b.id]=v; B.erledigt[b.id]=true; });
  R.werte=R.werte||{};
  R.uebersprungen[4]=true; R.uebersprungen[5]=true;
  R.fehler=R.fehler.filter(function(f){ return f.st!==4 && f.st!==5; });
  R.klumpen=false;
  stopSchleifeTicks();
  leeren(); hintergrund(META.bilder.bank); kopfZeichnen(5);
  var k=karte('rz-voll'); var fb=el('div','rz-fb',k);
  rueckmeldung(fb,true,w('uebersprungen'),tr(F.wiegen.erkl)+'\n\n'+tr(F.herstellen.anleitung),s6);
}
function stopSchleifeTicks(){ R.ticks=[]; rauschen(0); }

/* =====================================================================
   6 · PRUEFEN UND ABFUELLEN
===================================================================== */
function s6(){
  stopSchleifeTicks(); kopfZeichnen(6); leeren();
  var BS=META.bilder.schale;
  var bild=bildEl(R.klumpen? BS.CREAM_LUMPS : BS.CREAM_SMOOTH,'rz-szene',buehne);
  var k=karte('rz-unten');
  el('p','rz-frage',k,tr(F.pruefen.frage));
  var liste=el('div','rz-optionen',k), fertig=false;
  [['homogen',F.pruefen.homogen],['nach',F.pruefen.nach]].forEach(function(o){
    knopf(o[1],function(){
      if(fertig) return; fertig=true; stFertig(6);
      R.pruefung=o[0];
      if(o[0]==='homogen'){ if(R.klumpen) fehler('homogen'); klack(700,0.1); fuellen(); }
      else { if(!R.klumpen){ fehler('unnoetig'); klack(700,0.1); fuellen(); } else { R.nachbearbeitet=true; nacharbeit(); } }
    },liste,'rz-option');
  });
  R.s6Loesen=function(){ R.uebersprungen[6]=true; R.klumpen=false; R.pruefung='homogen'; R.gefaess='dose'; R.fehler=R.fehler.filter(function(f){ return f.st!==6; });
    leeren(); kopfZeichnen(6); bildEl(META.bilder.dose.CLOSED,'rz-teil rz-mitte',buehne);
    var kk=karte('rz-unten'); var fb=el('div','rz-fb',kk); rueckmeldung(fb,true,w('uebersprungen'),tr(F.pruefen.fuellen)+'\n\n'+tr(F.pruefen.kruke),s7Protokoll); };
}
function nacharbeit(){
  /* Weiter anreiben: LUMPS blendet nach 16 Umdrehungen in SMOOTH */
  bankFortsetzen();
  leeren(); kopfZeichnen(6);
  var BS=META.bilder.schale; SV={};
  SV.a=bildEl(BS.CREAM_LUMPS,'rz-szene',buehne); SV.b=bildEl(BS.CREAM_SMOOTH,'rz-szene rz-blende',buehne); SV.b.style.opacity='0';
  SV.schatten=el('div','rz-pschatten',buehne);
  SV.pistill=bildEl(META.bilder.pistill,'rz-pistill',buehne);
  SV.pistill.style.width=(META.schale.pistill.w*META.schale.pistill.scale/META.W*100)+'%';
  SV.griff=el('div','rz-griff',buehne); SV.griff.style.width=(340/META.W*100)+'%'; SV.griff.style.height=(320/META.H*100)+'%';
  bildEl(META.bilder.rand,'rz-szene rz-rand',buehne);
  SV.tipp=el('div','rz-tipp',buehne,w('nachbearbeiten'));
  var leiste=el('div','rz-leiste',buehne);
  var weiter=knopf(w('weiter'),function(){ R.klumpen=false; fuellen(); },leiste,'rz-btn rz-haupt'); weiter.style.display='none';
  B.nach=0; B.phi=-Math.PI/2; pistillMalen();
  var U=META.schale.umdrehungen*2*Math.PI;
  function malen(){ var f=Math.min(1,B.nach/U); SV.b.style.opacity=f.toFixed(3); pistillMalen();
    SV.griff.style.display=B.greift?'none':'block'; if(f>=0.999) weiter.style.display='inline-block'; }
  R.nachDreh=function(d){ B.phi+=d; B.nach+=Math.abs(d); B.tempoRoh=(B.tempoRoh||0)+Math.abs(d); malen(); };
  buehne.addEventListener('pointerdown',function(ev){ tonAn(); var p=inBild(ev), g=griffPunkt(B.phi);
    if(Math.abs(p.x-g.x)<=170 && p.y>=g.y-120 && p.y<=g.y+200){ B.greift=true; B.letztePhi=neuerWinkel(p); sZieht={n:'pistill',id:ev.pointerId}; fang(ev); } },{passive:false});
  buehne.addEventListener('pointermove',function(ev){ if(!sZieht||ev.pointerId!==sZieht.id) return; var neu=neuerWinkel(inBild(ev)), d=neu-B.letztePhi;
    while(d>Math.PI) d-=2*Math.PI; while(d<-Math.PI) d+=2*Math.PI; B.letztePhi=neu; R.nachDreh(d); ev.preventDefault(); },{passive:false});
  var los=function(ev){ if(sZieht&&ev.pointerId===sZieht.id){ sZieht=null; B.greift=false; rauschen(0); malen(); } };
  buehne.addEventListener('pointerup',los); buehne.addEventListener('pointercancel',los);
  R.ticks=[function(t,dt){ var roh=(B.tempoRoh||0)/dt; B.tempoRoh=0; B.tempo=B.tempo+(roh-B.tempo)*0.25;
    if(B.greift) rauschen(Math.min(0.30,B.tempo*0.045),900+Math.min(900,B.tempo*110)); }];
  malen();
}
function bankFortsetzen(){ if(!B) bankNeu(); startSchleife(); }

var FV={};
function fuellen(){
  bankFortsetzen(); stopSchleifeTicks(); leeren(); kopfZeichnen(6);
  hintergrund(META.bilder.bank);
  FV={ ladungen:{dose:0,kruke:0}, zu:{dose:false,kruke:false}, wahl:null, spatelVoll:false };
  FV.pos={ schale:{x:250,y:830}, dose:{x:640,y:720}, kruke:{x:640,y:1110}, spatel:{x:300,y:1260} };
  FV.schale=bildEl(META.bilder.schaleKlein,'rz-teil',buehne); setze(FV.schale,FV.pos.schale,400);
  FV.blob=bildEl(META.bilder.blob,'rz-teil rz-blob',buehne); setze(FV.blob,{x:250,y:815},250);
  FV.dose=bildEl(META.bilder.dose.EMPTY,'rz-teil',buehne); setze(FV.dose,FV.pos.dose,190);
  FV.kruke=bildEl(META.bilder.kruke.EMPTY,'rz-teil',buehne); setze(FV.kruke,FV.pos.kruke,190);
  el('div','rz-schild',buehne,w('spenderdose')).style.cssText='left:'+(640/8.64)+'%;top:'+(870/15.36)+'%';
  el('div','rz-schild',buehne,w('kruke')).style.cssText='left:'+(640/8.64)+'%;top:'+(1255/15.36)+'%';
  FV.spatel=bildEl(META.bilder.spatel,'rz-teil greifbar',buehne); setze(FV.spatel,FV.pos.spatel,216);
  var k=karte('rz-oben'); el('p','rz-frage',k,tr(F.pruefen.fuellen));
  FV.tipp=el('p','rz-klein',k,w('tFuellen'));
  var leiste=el('div','rz-leiste',buehne);
  FV.weiter=knopf(w('weiter'),fuellenEnde,leiste,'rz-btn rz-haupt'); FV.weiter.style.display='none';
  var zh=null;
  buehne.addEventListener('pointerdown',function(ev){ tonAn(); var p=inBild(ev);
    if(nah(p,FV.pos.spatel,150)){ zh={id:ev.pointerId,dx:FV.pos.spatel.x-p.x,dy:FV.pos.spatel.y-p.y}; fang(ev); return; }
    ['dose','kruke'].forEach(function(g){ if(nah(p,FV.pos[g],120) && FV.ladungen[g]>=F.pruefen.ladungen && !FV.zu[g]) zumachen(g); });
  },{passive:false});
  buehne.addEventListener('pointermove',function(ev){ if(!zh||ev.pointerId!==zh.id) return; var p=inBild(ev);
    FV.pos.spatel={x:p.x+zh.dx,y:p.y+zh.dy}; setze(FV.spatel,FV.pos.spatel,216); ev.preventDefault(); },{passive:false});
  var los=function(ev){ if(!zh||ev.pointerId!==zh.id) return; zh=null; spatelAblegen(FV.pos.spatel); };
  buehne.addEventListener('pointerup',los); buehne.addEventListener('pointercancel',los);
}
function spatelAblegen(p){
  if(!FV.spatelVoll && nah(p,FV.pos.schale,190)){ FV.spatelVoll=true; FV.spatel.src=META.bilder.spatelCreme; klack(380,0.1); }
  else if(FV.spatelVoll){
    ['dose','kruke'].some(function(g){
      if(!nah(p,FV.pos[g],170) || FV.zu[g]) return false;
      if(FV.wahl && FV.wahl!==g) return false;
      if(!FV.wahl){ FV.wahl=g; R.gefaess=g; if(g==='kruke') fehler('kruke'); }
      FV.ladungen[g]++; FV.spatelVoll=false; FV.spatel.src=META.bilder.spatel; klack(520,0.1); vib(10);
      if(FV.ladungen[g]>=F.pruefen.ladungen){ FV[g].src=META.bilder[g==='dose'?'dose':'kruke'].FILLED; FV.tipp.textContent=w('tDeckel'); }
      FV.blob.style.width=((250*(1-FV.ladungen[g]/F.pruefen.ladungen)+20)/META.W*100)+'%';
      return true;
    });
  }
  FV.pos.spatel={x:300,y:1260}; setze(FV.spatel,FV.pos.spatel,216);
}
function zumachen(g){
  FV.zu[g]=true; FV[g].src=META.bilder[g==='dose'?'dose':'kruke'].CLOSED; klack(300,0.12); vib(15);
  FV.weiter.style.display='inline-block';
}
function fuellenEnde(){ s7Protokoll(); }

/* =====================================================================
   7 · PROTOKOLL · ETIKETT · FREIGABE
===================================================================== */
function fehlerBei(st,wo){ return R.fehler.some(function(f){ return f.st===st && (!wo || f.wo===wo); }); }
function s7Protokoll(){
  stopSchleifeTicks(); kopfZeichnen(7); leeren(); hintergrund(META.bilder.bank);
  var k=karte('rz-voll rz-papier rz-protokoll'); k.dir='ltr';
  el('h3','rz-doc-titel',k,'Herstellungsprotokoll');
  var kopfZ=el('div','rz-doc-zeile',k);
  kopfZ.innerHTML='<span>Erythromycin-Creme 1 % · 30 g</span><span>Charge '+esc(ersetzen(F.protokoll.charge))+'</span>';
  var tab=el('table','rz-tab',k);
  tab.innerHTML='<thead><tr><th>Bestandteil</th><th>Soll</th><th>Faktor</th><th>Soll korr.</th><th>Ist</th><th>Waage</th></tr></thead>';
  var tb=el('tbody',null,tab);
  zutaten().forEach(function(b){
    var ist=B&&B.ist[b.id], tr_=el('tr',null,tb);
    var rechenF=fehlerBei(3,b.id), wiegeF=fehlerBei(4,b.id)||(b.id==='ery'&&hatFehler('offen'));
    var soll=b.ad? 'ad '+zahl(b.ad,2) : zahl(b.soll,2);
    var masse = ist? (b.id==='ery'? (B.inSchale.ery||ist.masse) : B.inSchale[b.id]) : null;
    var zellen=[b.name, soll, b.faktor? zahl(b.faktor,3).replace(/0+$/,'').replace(/,$/,''):'—',
      zahl(R.werte[b.id],b.nk), masse!=null? zahl(masse,b.id==='ery'?4:2) : '—',
      ist? (ist.waage==='analyse'?'Analysenwaage':'Präzisionswaage') : '—'];
    zellen.forEach(function(z,i){ var td=el('td',null,tr_,z);
      if((i===3 && rechenF) || ((i===4||i===5) && wiegeF)) td.className='rz-abw'; });
  });
  var hz=el('div','rz-doc-zeile',k);
  var pr = R.pruefung==='nach'? 'Agglomerate · nachbearbeitet · homogen' : (R.klumpen? 'homogen (Agglomerate sichtbar)' : 'homogen');
  var herst = hatFehler('anreiben')||hatFehler('einmal')||hatFehler('abschaben')||hatFehler('saeure');
  hz.innerHTML='<span class="'+(herst?'rz-abw':'')+'">Herstellung: Fantaschale, Pistill, Kartenblatt</span>';
  var pz=el('div','rz-doc-zeile',k); pz.innerHTML='<span class="'+(fehlerBei(6,null)&&!hatFehler('kruke')?'rz-abw':'')+'">Inprozesskontrolle: '+esc(pr)+'</span>';
  var gz=el('div','rz-doc-zeile',k); gz.innerHTML='<span class="'+(hatFehler('kruke')?'rz-abw':'')+'">Abgabegefäß: '+(R.gefaess==='kruke'?'Kruke':'Spenderdose')+'</span><span>'+esc(datum(new Date()))+'</span>';
  var leiste=el('div','rz-reihe',k);
  knopf(w('weiter'),s7Etikett,leiste,'rz-btn rz-haupt');
  R.s7Loesen=s7Etikett;
}
function bausteinText(b){ return ersetzen(R.falsch && b.textFalsch? b.textFalsch : b.text); }
function s7Etikett(){
  kopfZeichnen(7); leeren(); hintergrund(META.bilder.bank);
  var k=karte('rz-voll');
  el('p','rz-frage',k,w('etikettAuf'));
  var etikett=el('div','rz-etikett-blatt',k); etikett.dir='ltr';
  var pool=el('div','rz-pool',k); pool.dir='ltr';
  var gesetzt=[];
  var bausteine=F.etikett.bausteine.slice(); var reihe=bausteine.slice(); mischen(reihe);
  function malen(){
    etikett.replaceChildren();
    if(!gesetzt.length) el('div','rz-etikett-leer',etikett,'—');
    bausteine.forEach(function(b){ if(gesetzt.indexOf(b.id)<0) return;
      var z=el('button','rz-chip gesetzt',etikett,bausteinText(b)); z.type='button';
      z.addEventListener('click',function(){ gesetzt.splice(gesetzt.indexOf(b.id),1); klack(400,0.05); malen(); }); });
    pool.replaceChildren();
    reihe.forEach(function(b){ if(gesetzt.indexOf(b.id)>=0) return;
      var z=el('button','rz-chip',pool); z.type='button'; el('span',null,z,bausteinText(b));
      if(b.auto) el('small',null,z,w('vorschlag'));
      ziehbar(z,etikett,function(){ gesetzt.push(b.id); klack(800,0.05); malen(); }); });
  }
  malen();
  var fb=el('div','rz-fb',k);
  var fertig=knopf(w('etikettFertig'),function(){
    fertig.disabled=true; fertig.style.display='none'; stFertig(7);
    bausteine.forEach(function(b){
      var drin=gesetzt.indexOf(b.id)>=0;
      if(b.falle && drin) fehler('etikettFalle',b.id);
      if(!b.falle && !drin) fehler('etikettFehlt',b.id);
    });
    R.etikett=bausteine.filter(function(b){ return gesetzt.indexOf(b.id)>=0; }).map(bausteinText);
    var falle=hatFehler('etikettFalle');
    if(falle) schlecht(); else gut();
    rueckmeldung(fb,!falle,'',tr(F.etikett.erkl),s7Freigabe);
  },k,'rz-btn rz-haupt');
  R.s7Loesen=function(){ R.uebersprungen[7]=true; R.fehler=R.fehler.filter(function(f){ return f.st!==7; });
    gesetzt=bausteine.filter(function(b){ return !b.falle; }).map(function(b){ return b.id; }); malen(); fertig.disabled=true; fertig.style.display='none';
    R.etikett=bausteine.filter(function(b){ return !b.falle; }).map(bausteinText);
    rueckmeldung(fb,true,w('uebersprungen'),tr(F.etikett.erkl),s7Freigabe); };
}
/* Ziehen auf das Etikett, mit Antippen als Abkuerzung */
function ziehbar(z,ziel,fn){
  var start=null, geist=null;
  z.addEventListener('pointerdown',function(ev){ tonAn(); start={x:ev.clientX,y:ev.clientY,id:ev.pointerId,zieht:false}; try{ z.setPointerCapture(ev.pointerId); }catch(e){} });
  z.addEventListener('pointermove',function(ev){
    if(!start||ev.pointerId!==start.id) return;
    if(!start.zieht && Math.abs(ev.clientX-start.x)+Math.abs(ev.clientY-start.y)>10){
      start.zieht=true; geist=z.cloneNode(true); geist.className='rz-chip rz-geist'; document.body.appendChild(geist); }
    if(geist){ geist.style.left=ev.clientX+'px'; geist.style.top=ev.clientY+'px'; }
    ev.preventDefault();
  });
  function ende(ev){
    if(!start||ev.pointerId!==start.id) return;
    var war=start.zieht; start=null;
    if(geist){ geist.remove(); geist=null; }
    if(!war){ fn(); return; }
    var r=ziel.getBoundingClientRect();
    if(ev.clientX>=r.left-20 && ev.clientX<=r.right+20 && ev.clientY>=r.top-20 && ev.clientY<=r.bottom+20) fn();
  }
  z.addEventListener('pointerup',ende); z.addEventListener('pointercancel',function(){ start=null; if(geist){ geist.remove(); geist=null; } });
}
function etikettHTML(zeilen){ return zeilen.map(function(z){ return '<div>'+esc(z)+'</div>'; }).join(''); }
function s7Freigabe(){
  kopfZeichnen(8); leeren(); hintergrund(META.bilder.bank);
  var k=karte('rz-unten');
  el('p','rz-frage',k,w('freigabeFrage'));
  var vorschau=el('div','rz-etikett-blatt klein',k); vorschau.dir='ltr'; vorschau.innerHTML=etikettHTML(R.etikett||[]);
  var reihe=el('div','rz-reihe',k);
  var de=state.lang==='de';
  knopf('freigeben'+(de?'':' · '+w('freigeben')),function(){ entscheiden(true); },reihe,'rz-btn rz-haupt');
  knopf('nicht freigeben'+(de?'':' · '+w('nichtFreigeben')),function(){ entscheiden(false); },reihe,'rz-btn rz-warn');
  R.s8Loesen=function(){ R.uebersprungen[8]=true; entscheiden(R.fehler.length===0 && !R.falsch, true); };
}
function entscheiden(frei, skip){
  if(R.fertig[8]) return; R.fertig[8]=true;
  var mitFehler = R.fehler.length>0;
  if(R.falsch){ R.p8=0; return falscherWeg(); }
  var richtig = frei? !mitFehler : mitFehler;
  R.p8 = richtig && !skip ? 25 : 0;
  R.freigegeben=frei;
  if(frei && !mitFehler) return freigabeSzene();
  ergebnisListe(richtig, frei);
}
function etikettSzene(szene,pos,mitLupe){
  leeren(); hintergrund(szene);
  var e=etikettAuf(buehne,pos,etikettHTML(R.etikett||[]),'rz-etik-mini');
  if(mitLupe){
    var lupe=el('div','rz-lupe',buehne); lupe.dir='ltr';
    lupe.innerHTML='<div class="rz-etikett-blatt">'+etikettHTML(R.etikett||[])+'</div>';
    var linie=document.createElementNS('http://www.w3.org/2000/svg','svg'); linie.setAttribute('class','rz-linie');
    linie.setAttribute('viewBox','0 0 100 100'); linie.setAttribute('preserveAspectRatio','none');
    var mx=(pos.x0+pos.x1)/2, my=pos.y1;
    linie.innerHTML='<line x1="'+(pos.x1)+'" y1="'+((pos.y0+pos.y1)/2)+'" x2="33" y2="62" stroke="#23272E" stroke-width="1.5" vector-effect="non-scaling-stroke"/>';
    buehne.appendChild(linie);
  }
}
function freigabeSzene(){
  gut(); kopfZeichnen(8);
  etikettSzene(F.szenen.freigabe,F.etiketten.freigabe,true);
  var k=karte('rz-oben'); el('h4','rz-h4',k,w('freigegeben')+' · '+w('richtigEntschieden')); el('p','rz-text',k,w('keineFehler'));
  knopf(w('auswertung'),auswertung,k,'rz-btn rz-haupt');
}
function falscherWeg(){
  schlecht(); kopfZeichnen(8);
  etikettSzene(F.szenen.kuehl,F.etiketten.kuehl,false);
  var k=karte('rz-unten'); el('p','rz-text',k,tr(F.falscherWeg));
  knopf(w('auswertung'),auswertung,k,'rz-btn rz-haupt');
}
function ergebnisListe(richtig,frei){
  if(richtig) gut(); else schlecht();
  kopfZeichnen(8); leeren(); hintergrund(META.bilder.bank);
  var k=karte('rz-voll');
  el('h4','rz-h4',k,(frei?w('freigegeben'):w('gesperrt'))+' · '+(richtig?w('richtigEntschieden'):w('falschEntschieden')));
  if(!R.fehler.length) el('p','rz-text',k,w('keineFehler'));
  else { el('p','rz-klein',k,w('fehlerListe')); fehlerAusgeben(k); }
  knopf(w('auswertung'),auswertung,k,'rz-btn rz-haupt');
}
function fehlerAusgeben(k){
  var ul=el('ul','rz-fehlerliste',k), gesehen={};
  R.fehler.forEach(function(f){
    var key=f.id; var g=grundText(f.id);
    var li=el('li',null,ul); el('b',null,li,stName(f.st)+(f.wo&&zutatDef(f.wo)?' · '+zutatDef(f.wo).name:''));
    if(!gesehen[key]){ el('span',null,li,g); gesehen[key]=true; }
  });
}

/* ---------- Auswertung und Spielstand ---------- */
function auswertung(){
  stopSchleife(); kopfZeichnen(0); leeren(); hintergrund(META.bilder.bank);
  var p=stationsPunkte(), summe=0; for(var n=1;n<=8;n++) summe+=p[n]||0;
  summe=Math.round(summe);
  var q=summe/200, S=META.sterne, sterne=q>=S[2]?3:q>=S[1]?2:q>=S[0]?1:0;
  var k=karte('rz-voll');
  bildEl(R.fall.karte,'rz-fallkarte',k);
  el('h3','rz-doc-titel',k,w('auswertung')+' · '+summe+' / 200 '+w('punkte'));
  el('div','rz-sterne',k,'★★★'.slice(0,sterne)+'☆☆☆'.slice(0,3-sterne));
  var tab=el('table','rz-tab rz-auswertung',k), tb=el('tbody',null,tab);
  for(n=1;n<=8;n++){ var z=el('tr',null,tb); el('td',null,z,n+' · '+stName(n)); el('td',null,z,(R.uebersprungen[n]?w('uebersprungen')+' · ':'')+(Math.round((p[n]||0)*2)/2)+' / 25'); }
  if(R.fehler.length){ el('p','rz-klein',k,w('fehlerListe')); fehlerAusgeben(k); }
  [F.rechnen.erkl,F.wiegen.erkl,F.herstellen.anleitung].forEach(function(t){ el('p','rz-klein rz-lehre',k,tr(t)); });
  var neu=sichern(summe,sterne);
  el('p','rz-klein',k,w('ersteMal'));
  var reihe=el('div','rz-reihe',k);
  knopf(w('nochmal'),function(){ start(R.fall.id); },reihe,'rz-btn');
  knopf(w('zurueck'),function(){ if(neu.rang) { try{ showRankup(neu.rang,raus); return; }catch(e){} } raus(); },reihe,'rz-btn rz-haupt');
}
function sichern(summe,sterne){
  var id=R.fall.level, best=state.levelBest[id], vorher=state.rankIdx, rang=null;
  if(!best){
    state.totalPts=(state.totalPts||0)+summe;
    if(typeof KRAFT_PRO_FALL!=='undefined') state.kraft=Math.max(0,(state.kraft||0)-KRAFT_PRO_FALL);
  }
  var rec=Object.assign({},best||{});
  if(!best || summe>best.score){ rec.score=summe; rec.stars=sterne; }
  rec.firstScore = best && best.firstScore!=null ? best.firstScore : (best?best.score:summe);
  rec.lastScore=summe; rec.lastStars=sterne; rec.lastAt=Date.now(); rec.attempts=(rec.attempts||(best?1:0))+1;
  state.levelBest[id]=rec;
  var neuRang=Math.max(state.rankIdx||0, rankForPts(state.totalPts));
  if(neuRang>vorher) rang=neuRang;
  state.rankIdx=neuRang;
  try{ save(); }catch(e){} try{ pcSync(); }catch(e){}
  return {rang:rang};
}

/* ---------- Ueberspringen (PLAN §24): Station richtig ausgefuehrt, null Punkte ---------- */
function ueberspringen(nr){
  if(R.uebersprungen[nr] || R.fertig[nr]) return;
  if(nr===1 && R.s1Loesen){ R.uebersprungen[1]=true; R.p1=0; R.s1Loesen(); }
  else if(nr===2 && R.s2Loesen){ R.uebersprungen[2]=true; R.s2Loesen(); }
  else if(nr===3 && R.s3Loesen){ R.uebersprungen[3]=true; R.fehler=R.fehler.filter(function(f){ return f.st!==3; }); R.s3Loesen(); }
  else if(nr===4 || nr===5){ bankUeberspringen(); }
  else if(nr===6 && R.s6Loesen){ R.s6Loesen(); }
  else if(nr===7 && R.s7Loesen){ R.s7Loesen(); }
  else if(nr===8 && R.s8Loesen){ R.s8Loesen(); }
  kopfZeichnen(nr===4?5:nr);
}

/* ---------- Stil ---------- */
var STIL=[
'#rezScreen{position:fixed;inset:0;z-index:60;background:#F6F3EC;color:#23272E;overflow:hidden}',
'#rezScreen.active{display:block}',
'.rz-wrap{height:100%;display:flex;flex-direction:column;align-items:center;padding-top:env(safe-area-inset-top,0px)}',
'.rz-kopf{width:100%;max-width:600px;display:flex;align-items:center;gap:8px;padding:6px 10px;min-height:44px;font:600 13px/1.2 Inter,system-ui,sans-serif}',
'.rz-kopf-titel{flex:1 1 auto;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-family:Montserrat,Inter,sans-serif;font-weight:800}',
'.rz-zu,.rz-skip{border:1.5px solid #E5E0D8;background:#fff;color:#23272E;border-radius:10px;padding:6px 10px;font:700 12px Inter,sans-serif;cursor:pointer}',
'.rz-punkte{display:flex;gap:4px}.rz-dot{width:7px;height:7px;border-radius:50%;background:#E5E0D8}.rz-dot.fertig{background:#16B8A6}.rz-dot.jetzt{background:#E8192B}',
'.rz-buehne{position:relative;flex:0 0 auto;width:min(100vw,calc((100dvh - 52px - env(safe-area-inset-top,0px)) * 864 / 1536));aspect-ratio:864/1536;overflow:hidden;background:#EDE9E1;border-radius:14px;touch-action:none;-webkit-user-select:none;user-select:none;-webkit-tap-highlight-color:transparent}',
'.rz-buehne img{position:absolute;display:block;pointer-events:none;-webkit-user-drag:none}',
'.rz-szene{left:0;top:0;width:100%;height:100%;object-fit:cover;position:absolute}',
'.rz-blende{transition:opacity .12s linear}.rz-wand{pointer-events:none;transition:opacity .25s}.rz-rand{z-index:40}',
'.rz-teil{transform:translate(-50%,-50%);z-index:20}.rz-buehne img.greifbar{pointer-events:auto;cursor:grab;touch-action:none}',
'.rz-haufen{z-index:24;transform:translate(-50%,-85%)}.rz-schale-klein{transform:translate(-50%,-62%)}.rz-blob{z-index:22;transform:translate(-50%,-70%)}',
'.rz-teil.kopf{transform:translate(-50%,-50%) rotate(180deg)}.rz-karteblatt{z-index:45}',
'.rz-pistill{z-index:30;transform-origin:50% 100%}.rz-pschatten{position:absolute;z-index:18;pointer-events:none;width:17.4%;height:3%;transform:translate(-50%,-50%);border-radius:50%;background:radial-gradient(closest-side,rgba(40,34,26,.34),rgba(40,34,26,0))}',
'.rz-griff{position:absolute;z-index:25;border-radius:999px;border:2px dashed rgba(22,184,166,.55);background:rgba(22,184,166,.08);transform:translate(-50%,-50%);pointer-events:none}',
'.rz-ring{position:absolute;z-index:46;right:3%;top:8%;width:38px;height:38px}.rz-ring circle{fill:none;stroke-width:4}.rz-ring .bg{stroke:rgba(35,39,46,.15)}.rz-ring .fg{stroke:#16B8A6;stroke-linecap:round;transition:stroke-dashoffset .12s linear}',
'.rz-karte{position:absolute;z-index:50;left:4%;right:4%;background:rgba(255,255,255,.97);border-radius:16px;padding:12px 14px;box-shadow:0 10px 30px rgba(35,39,46,.18);font:500 14px/1.45 Inter,system-ui,sans-serif;color:#23272E}',
'.rz-karte.rz-voll{top:2.5%;bottom:2.5%;overflow:auto;-webkit-overflow-scrolling:touch;touch-action:pan-y}',
'.rz-karte.rz-unten{bottom:3%;max-height:62%;overflow:auto;touch-action:pan-y}.rz-karte.rz-oben{top:2.5%;max-height:45%;overflow:auto}',
'.rz-papier{background:#FFFDF8}',
'.rz-text{margin:0 0 12px;font-size:15px}.rz-frage{margin:0 0 10px;font-weight:700;font-size:15px}.rz-klein{font-size:12.5px;color:#4B5563;margin:6px 0}.rz-h4{margin:4px 0 10px;font:800 15px Montserrat,Inter,sans-serif}',
'.rz-btn{font:700 14px Inter,sans-serif;border:1.5px solid #E5E0D8;background:#fff;color:#23272E;border-radius:12px;padding:10px 16px;cursor:pointer;margin:6px 6px 0 0}',
'.rz-btn.rz-haupt{background:#E8192B;border-color:#E8192B;color:#fff}.rz-btn.rz-warn{background:#23272E;border-color:#23272E;color:#fff}.rz-btn:disabled{opacity:.45}',
'.rz-optionen{display:flex;flex-direction:column;gap:8px}.rz-option{text-align:start;font:600 14px/1.4 Inter,sans-serif;border:2px solid #E5E0D8;background:#fff;border-radius:12px;padding:11px 12px;cursor:pointer;color:#23272E}',
'.rz-option.gewaehlt{border-color:#16B8A6;background:#E9FBF8}.rz-option.erledigt{border-color:#16B8A6}.rz-option:disabled{opacity:.6}',
'.rz-reihe{display:flex;flex-wrap:wrap;gap:4px;margin-top:8px}',
'.rz-fb{margin-top:10px}.rz-fbk{border-radius:12px;padding:10px 12px;white-space:pre-line}.rz-fbk.gut{background:#E9FBF8;border:1.5px solid #2DDDC4}.rz-fbk.schlecht{background:#FDECEE;border:1.5px solid #E8192B}.rz-fbk h5{margin:0 0 4px;font-size:14px}.rz-fbk p{margin:0}',
'.rz-m16 .m16{font-size:13px}.rz-m16 .m16-v{unicode-bidi:plaintext}',
'.rz-monitor{background:#11241F;color:#D9F2E7;border-radius:12px;padding:10px 12px;margin-bottom:12px;font:500 13.5px/1.5 Inter,sans-serif}.rz-monitor-kopf{font-weight:800;color:#9BE7C8;margin-bottom:6px;font-size:12px;letter-spacing:.04em}.rz-cave{margin:0}',
'.rz-hilfe{background:#FFF6D6;border:1px dashed #D4A574;border-radius:10px;padding:6px 10px;font-size:13px;margin-bottom:10px;direction:ltr}',
'.rz-rechnen{display:flex;flex-direction:column;gap:6px;direction:ltr}.rz-rfeld{display:flex;align-items:center;gap:8px;border:2px solid #E5E0D8;border-radius:10px;padding:8px 10px;background:#fff;font:600 13px Inter,sans-serif;color:#23272E;cursor:pointer}',
'.rz-rfeld.aktiv{border-color:#16B8A6}.rz-rfeld.leer{border-color:#E8192B}.rz-rfeld.ok{border-color:#2DDDC4;background:#F2FDFB}.rz-rname{flex:1 1 auto;text-align:left}.rz-rwert{min-width:70px;text-align:right;font:800 16px Inter,sans-serif;font-variant-numeric:tabular-nums}',
'.rz-pad{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin:10px 0;direction:ltr}.rz-taste{font:800 18px Inter,sans-serif;padding:10px 0;border-radius:10px;border:1.5px solid #E5E0D8;background:#fff;color:#23272E}',
'.rz-wkarte{display:block;width:100%;text-align:start;border:2px solid #E5E0D8;border-radius:14px;padding:12px 14px;background:#fff;color:#23272E;margin-bottom:10px;cursor:pointer}.rz-wkarte b{display:block;font-size:14px;margin-bottom:3px}.rz-wkarte span{font-size:12px;color:#4B5563}',
'.rz-anzeige{position:absolute;z-index:40;transform:translate(-50%,-50%);background:#11241F;color:#9BE7C8;border-radius:10px;padding:5px 10px;font-variant-numeric:tabular-nums;text-align:center;box-shadow:0 4px 12px rgba(0,0,0,.22);font-family:Inter,sans-serif}',
'.rz-wert{font-size:15px;font-weight:800;letter-spacing:.03em}.rz-anzeige small{display:block;font-size:10px;opacity:.75}.rz-stabil{display:inline-block;width:9px;height:9px;border-radius:50%;background:#6B7280;margin-inline-end:6px;vertical-align:middle}.rz-stabil.an{background:#36D399}',
'.rz-wknopf{position:absolute;z-index:42;transform:translate(-50%,-50%);font:700 12px/1 Inter,sans-serif;color:#fff;background:#16B8A6;border:0;border-radius:999px;padding:10px 14px;cursor:pointer;white-space:nowrap}.rz-wknopf.hell{background:#4B5563}.rz-wknopf.ok{background:#23272E}',
'.rz-tuer{position:absolute;z-index:35;transform:translate(-50%,-50%);border:2px dashed rgba(22,184,166,.45);border-radius:10px;display:grid;place-items:center;background:rgba(255,255,255,.08);cursor:pointer}.rz-tuer span{background:#16B8A6;color:#fff;border-radius:999px;padding:7px 13px;font:700 12px Inter,sans-serif;white-space:nowrap}',
'.rz-tipp{position:absolute;z-index:44;left:3%;right:3%;top:1.5%;background:rgba(17,36,31,.86);color:#D9F2E7;border-radius:10px;padding:7px 10px;font:600 12px/1.35 Inter,sans-serif;text-align:center;pointer-events:none}',
'.rz-leiste{position:absolute;z-index:48;left:3%;right:3%;bottom:2%;display:flex;justify-content:space-between;gap:6px}.rz-leiste .rz-btn{margin:0;padding:9px 12px;font-size:13px}',
'.rz-tropfen{position:absolute;z-index:41;width:1.2%;height:.9%;border-radius:50% 50% 50% 50%/60% 60% 40% 40%;background:rgba(255,236,170,.95);transform:translate(-50%,-50%);animation:rzTropf .35s ease-in forwards}',
'@keyframes rzTropf{to{transform:translate(-50%,900%);opacity:.3}}',
'.rz-etik{position:absolute;z-index:21;display:flex;align-items:center;justify-content:center;pointer-events:none;overflow:hidden}',
'.rz-etik-in{width:100%;text-align:center;color:#23272E;font:700 clamp(7px,2.4vw,13px)/1.15 Inter,sans-serif;padding:0 3%;word-break:break-word}',
'.rz-etik-mini .rz-etik-in{font:600 clamp(3px,.75vw,6px)/1.2 Inter,sans-serif;text-align:left}',
'.rz-etik-mini{background:rgba(255,255,255,.65);border-radius:4px;border-radius:2px/10px;box-shadow:inset 6px 0 6px -6px rgba(0,0,0,.25),inset -6px 0 6px -6px rgba(0,0,0,.25)}',
'.rz-etik-teil .rz-etik-in{font-size:clamp(6px,1.8vw,10px)}.rz-etik-schmal .rz-etik-in{font-size:clamp(5px,1.4vw,8px)}.rz-etik.kopf .rz-etik-in{transform:rotate(180deg)}',
'.rz-lupe{position:absolute;z-index:52;left:33%;top:60%;width:63%;max-height:38%;overflow:hidden;background:#fff;border-radius:12px;box-shadow:0 10px 30px rgba(35,39,46,.25);padding:6px}',
'.rz-linie{position:absolute;inset:0;width:100%;height:100%;z-index:51;pointer-events:none}',
'.rz-etikett-blatt{border:1.5px solid #23272E;border-radius:8px;background:#fff;padding:8px 10px;min-height:70px;font:600 12.5px/1.45 Inter,sans-serif;color:#23272E;display:flex;flex-direction:column;gap:3px;margin-bottom:10px}',
'.rz-etikett-blatt.klein{font-size:11.5px}.rz-lupe .rz-etikett-blatt{margin:0;font-size:10.5px;line-height:1.35;gap:1px;min-height:0}.rz-etikett-leer{color:#9CA3AF}',
'.rz-pool{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:8px}',
'.rz-chip{font:600 12.5px/1.3 Inter,sans-serif;border:1.5px solid #2DDDC4;background:#F2FDFB;color:#23272E;border-radius:10px;padding:7px 9px;text-align:left;cursor:grab;touch-action:none}.rz-chip small{display:block;font-size:10px;color:#6B7280}',
'.rz-chip.gesetzt{border:0;background:transparent;padding:1px 0;cursor:pointer}',
'.rz-geist{position:fixed;z-index:9999;pointer-events:none;transform:translate(-50%,-60%);box-shadow:0 8px 20px rgba(0,0,0,.2)}',
'.rz-doc-titel{margin:0 0 8px;font:800 16px Montserrat,Inter,sans-serif}.rz-doc-zeile{display:flex;justify-content:space-between;gap:8px;font-size:12.5px;margin:6px 0}',
'.rz-tab{width:100%;border-collapse:collapse;font-size:11.5px;margin:6px 0}.rz-tab th,.rz-tab td{border-bottom:1px solid #E5E0D8;padding:5px 3px;text-align:left;vertical-align:top}',
'.rz-abw{background:#FFF1D6}',
'.rz-fehlerliste{margin:6px 0;padding-inline-start:18px;font-size:13px}.rz-fehlerliste li{margin-bottom:6px}.rz-fehlerliste b{display:block}',
'.rz-sterne{font-size:28px;color:#E8192B;letter-spacing:4px;margin-bottom:6px}.rz-fallkarte{position:static!important;width:100%;border-radius:12px;margin-bottom:10px}.rz-lehre{border-inline-start:3px solid #2DDDC4;padding-inline-start:8px}',
'.rz-schild{position:absolute;z-index:23;transform:translate(-50%,0);background:#fff;border-radius:999px;padding:3px 9px;font:700 11px Inter,sans-serif;box-shadow:0 2px 6px rgba(0,0,0,.12)}',
'.rz-mitte{left:50%;top:45%;width:30%}',
'.rz-debug{position:fixed;z-index:9998;right:4px;top:48px;max-width:58vw;max-height:40vh;overflow:auto;margin:0;background:rgba(0,0,0,.72);color:#9BE7C8;font:10px/1.35 ui-monospace,monospace;padding:6px;border-radius:6px;pointer-events:none;white-space:pre-wrap}'
].join('\n');
function stil(){ if(document.getElementById('rzStil')) return; var s=document.createElement('style'); s.id='rzStil'; s.textContent=STIL; document.head.appendChild(s); }

/* ---------- Eintritt ---------- */
function start(id){
  stopSchleife();
  var fall=META.faelle.filter(function(f){ return f.id===id; })[0] || META.faelle[0];
  return skript(fall.src).then(function(){
    F=window.REZ_FAELLE[fall.id];
    R={ fall:fall, falsch:false, fehler:[], uebersprungen:{}, fertig:{}, p1:0, p2:0, p8:0, werte:{}, ticks:[] };
    B=null;
    geruest(); startSchleife(); s0();
    bilderVorladen([F.szenen.freigabe,F.szenen.kuehl,META.bilder.bank]);
  });
}
function open(id){
  stil(); geruest();
  el('p','rz-laden',buehne,w('laden')).style.cssText='position:absolute;inset:0;display:grid;place-items:center;font:600 14px Inter,sans-serif';
  return skript('data/rez_meta.js').then(function(){ META=window.REZ_META; return start(id||'01'); })
  .catch(function(){
    buehne.replaceChildren();
    var k=el('div','rz-karte rz-unten',buehne); el('p','rz-text',k,w('ladeFehler')); knopf(w('zurueck'),raus,k,'rz-btn rz-haupt');
  });
}

window.PCRez={ open:open,
  /* Nur zur Pruefung von aussen (jsdom, ?debug=1), nicht fuer das Spiel. */
  _t:{ R:function(){ return R; }, B:function(){ return B; }, F:function(){ return F; },
       punkte:stationsPunkte, s1:s1,s2:s2,s3:s3,s4:s4,s6:s6, blatt:blatt, zutatWaehlen:zutatWaehlen, waageWaehlen:waageWaehlen,
       ablegen:function(n,p){ WV.pos[n].x=p.x; WV.pos[n].y=p.y; ablegen(n); }, aufPfanne:function(n){ var c=cfg(); WV.pos[n].x=c.pfanne.x; WV.pos[n].y=c.pfanne.y; ablegen(n); },
       pos:function(){ return WV.pos; }, cfg:cfg, tara:tara, tuer:tuer, uebernehmen:uebernehmen, dosieren:dosieren, abnehmen:abnehmen, tropfen:tropfen,
       sitzungEnde:sitzungEnde, schaleAnsicht:schaleAnsicht, schiffLeeren:schiffLeeren, drehen:drehen,
       schaben:function(){ var o=META.schale.oeffnung, bins={}; for(var i=0;i<12;i++){ var ph=Math.PI+(i+0.5)*Math.PI/12; karteSchaben({x:o.x+o.rx*Math.cos(ph),y:o.y+o.ry*Math.sin(ph)},bins); } },
       bankFertig:bankFertig, inhaltZustand:inhaltZustand, nachDreh:function(d){ R.nachDreh(d); },
       fuellen:function(g){ for(var i=0;i<F.pruefen.ladungen;i++){ spatelAblegen(FV.pos.schale); spatelAblegen(FV.pos[g]); } zumachen(g); },
       ueberspringen:ueberspringen, entscheiden:entscheiden, s7Etikett:s7Etikett, s7Freigabe:s7Freigabe, auswertung:auswertung, start:start }
};
})();
