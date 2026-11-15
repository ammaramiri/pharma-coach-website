/* =====================================================================
   m16.js · Muster 16 · das eine Rezeptformular des Spiels
   Quelle: muster16.html (Leitung, September 2026, 14.397 Bytes),
   umgebaut am 14.11.2026 (Technik) nach Arbeitspaket der Leitung:
   - Beispieldaten entfernt (kein Aufblitzen von "Reinhardt/Katrin").
   - Die sechs Funktionen bleiben woertlich: set · check · target ·
     onTap · reveal · clear. Erweitert nur durch neue Funktionen.
   - Mehrere Formulare gleichzeitig: M16.create(el). Die sechs globalen
     Funktionen wirken auf das zuletzt erzeugte Formular.
   - Groesse: das Blatt rechnet in cqw, also in Teilen seiner eigenen
     Breite. Es wird nicht umgebrochen, nur breiter gezogen: Lupe 1x/2x.
   - Keine Uebersetzung im Formular. Das Rezept ist deutsch.
   Geladen nur bei Bedarf (M16.laden in index.html oder im Motor).

   Datenvertrag · die 24 Schluessel fuer set():
     kasse · kassen_nr · vnr · status · bsnr · lanr · datum
     vname · vvorname · vstrasse · vort · geb · gueltig
     rx1 · rx2 · rx3 · rx4
     st1 · st2 · st3 · st4 · st5
     apo_ik · barcode
   Jede Station beginnt mit clear(), dann set(). Fehlt ein Schluessel,
   bleibt das Feld leer, wie auf echtem Papier.

   Die 31 antippbaren Felder (data-field):
     Kreuze (9): gebuehr_frei · gebuehr_pflicht · noctu · sonstige ·
       unfall · arbeitsunfall · autidem_1 · autidem_2 · autidem_3
     Felder (22): abgabedatum · apo_ik · begr · brutto · bsnr · bvg ·
       datum · hilfsmittel · impfstoff · kasse · kassen_nr · lanr ·
       rx1 · rx2 · rx3 · rx4 · ssb · status · stempel · versicherter ·
       vnr · zuzahlung
===================================================================== */
(function(){
'use strict';
var CSS=".m16r{--red:#e3000f;--paper:#fbdce0;--hi:#c9a400}\n.m16r,.m16r *{box-sizing:border-box;margin:0;padding:0}\n.m16r{width:min(98vw,1240px);aspect-ratio:148/105;background:var(--paper); display:flex;gap:.5%;padding:1.2%;color:#111;user-select:none; box-shadow:0 3px 14px rgba(0,0,0,.28);container-type:inline-size;overflow:hidden}\n.m16r .lb{color:var(--red);font-size:1.05cqw;line-height:1.06;letter-spacing:-.01em}\n.m16r .vl{font-size:1.45cqw;line-height:1.1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}\n.m16r .bx{border:.14cqw solid var(--red);background:#fff;display:flex;flex-direction:column; padding:.5% .8%;min-height:0;overflow:hidden}\n.m16r .bx.t{border-width:.28cqw}\n.m16r .strip{width:5.4%;display:flex;flex-direction:column;justify-content:space-between}\n.m16r .cell{display:flex;flex-direction:column;align-items:center;gap:.12cqw}\n.m16r .cell .lb{font-size:.86cqw;text-align:center}\n.m16r .ck{width:62%;aspect-ratio:1;border:.14cqw solid var(--red);background:#fff; display:flex;align-items:center;justify-content:center;cursor:pointer}\n.m16r .ck .x{font-size:1.5cqw;visibility:hidden}\n.m16r .ck.on .x{visibility:visible}\n.m16r .body{flex:1;display:flex;flex-direction:column;gap:.5%;min-width:0}\n.m16r .top{display:flex;gap:.7%;height:46%}\n.m16r .tl{width:57%;display:flex;flex-direction:column;gap:0;min-width:0}\n.m16r .tr{flex:1;display:flex;flex-direction:column;gap:.6%;min-width:0}\n.m16r .tl>.bx{border-bottom-width:0}\n.m16r .tl>.bx:last-child{border-bottom-width:.14cqw}\n.m16r .rowfields{display:flex;flex:1;min-width:0}\n.m16r .rowfields>div{flex:1;display:flex;flex-direction:column;padding:0 .8%;min-width:0; border-left:.14cqw solid var(--red)}\n.m16r .rowfields>div:first-child{border-left:0}\n.m16r .kz{display:flex;gap:.6%;height:26%}\n.m16r .kzc{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;min-width:0}\n.m16r .kzc .lb{font-size:.82cqw;text-align:center}\n.m16r .kzc .b{width:100%;flex:0 0 46%;border:.14cqw solid var(--red);background:#fff; display:flex;align-items:center;justify-content:center;color:var(--red);font-size:1.3cqw}\n.m16r .apo{flex:2.4;border:.14cqw solid var(--red);background:#fff;display:flex; flex-direction:column;justify-content:center;padding:0 .6%;min-width:0}\n.m16r .zz{display:flex;gap:.6%;height:20%}\n.m16r .zz>div{display:flex;flex-direction:column;min-width:0}\n.m16r .zz .cap{color:var(--red);font-size:1.05cqw;line-height:1.05}\n.m16r .zz .b{flex:1;border:.28cqw solid var(--red);background:#fff}\n.m16r .vo{flex:1;display:flex;flex-direction:column;min-width:0}\n.m16r .vohd{display:flex;color:var(--red);font-size:1.02cqw;line-height:1.1}\n.m16r .vohd b{font-weight:normal}\n.m16r .vorow{flex:1;display:flex;border:.14cqw solid var(--red);border-bottom-width:0;background:#fff}\n.m16r .vorow:last-child{border-bottom-width:.14cqw}\n.m16r .vorow>span{padding:0 .8%;display:flex;align-items:center;color:var(--red);font-size:.95cqw}\n.m16r .vorow>i{border-left:.14cqw solid var(--red)}\n.m16r .rpline{display:flex;align-items:baseline;gap:1%;height:5%}\n.m16r .rpline b{color:var(--red);font-size:1.7cqw}\n.m16r .mid{flex:1;display:flex;gap:.7%;min-height:0}\n.m16r .rx{width:57%;display:flex;flex-direction:column;justify-content:flex-start;gap:2.2%;padding-top:.6%}\n.m16r .rx .vl{cursor:pointer;padding:.2% .6%}\n.m16r .stempel{flex:1;display:flex;flex-direction:column;min-width:0}\n.m16r .stempel .cap{color:var(--red);font-size:1.05cqw;text-align:right}\n.m16r .stempel .box{flex:1;display:flex;flex-direction:column;align-items:center; justify-content:center;gap:2%;cursor:pointer}\n.m16r .stempel .box span{font-size:1.25cqw;line-height:1.1}\n.m16r .foot{height:20%;display:flex;flex-direction:column;gap:2%}\n.m16r .f1{display:flex;align-items:center;gap:1.4%;height:44%}\n.m16r .f1 .num{font-size:1.5cqw;letter-spacing:.1em}\n.m16r .grid6{display:flex;height:100%;width:20%}\n.m16r .grid6 i{flex:1;border:.14cqw solid var(--red);border-left-width:0;background:#fff}\n.m16r .grid6 i:first-child{border-left-width:.14cqw}\n.m16r .f2{flex:1;display:flex;gap:1.4%;align-items:stretch}\n.m16r .warn{color:var(--red);font-size:1.05cqw;font-weight:bold;line-height:1.08; display:flex;flex-direction:column;justify-content:center;width:16%}\n.m16r .unfall{width:44%;display:flex;border:.14cqw solid var(--red);background:#fff}\n.m16r .unfall>div{padding:.4% .8%;display:flex;flex-direction:column}\n.m16r .unfall>div+div{border-left:.14cqw solid var(--red);flex:1}\n.m16r .sig{flex:1;display:flex;flex-direction:column;align-items:flex-end;justify-content:space-between}\n.m16r .bar{font-size:1.5cqw;letter-spacing:.16em;font-family:'Courier New',monospace}\n.m16r .tap{cursor:pointer}\n.m16r .tap:hover{background:#fff8dc}\n.m16r .hit{outline:.25cqw solid var(--hi);background:rgba(255,225,77,.55)}";
var HTML="<div class=\"m16r\"> <div class=\"strip\"> <div class=\"cell\"><div class=\"lb\">Gebühr<br>frei</div> <div class=\"ck tap\" data-field=\"gebuehr_frei\"><span class=\"x\">X</span></div></div> <div class=\"cell\"><div class=\"lb\">Geb.-<br>pfl.</div> <div class=\"ck tap\" data-field=\"gebuehr_pflicht\"><span class=\"x\">X</span></div></div> <div class=\"cell\"><div class=\"lb\">noctu</div> <div class=\"ck tap\" data-field=\"noctu\"><span class=\"x\">X</span></div></div> <div class=\"cell\"><div class=\"lb\">Sonstige</div> <div class=\"ck tap\" data-field=\"sonstige\"><span class=\"x\">X</span></div></div> <div class=\"cell\"><div class=\"lb\">Unfall</div> <div class=\"ck tap\" data-field=\"unfall\"><span class=\"x\">X</span></div></div> <div class=\"cell\"><div class=\"lb\">Arbeits-<br>unfall</div> <div class=\"ck tap\" data-field=\"arbeitsunfall\"><span class=\"x\">X</span></div></div> <div class=\"cell\"><div class=\"lb\">aut<br>idem</div> <div class=\"ck tap\" data-field=\"autidem_1\"><span class=\"x\">X</span></div></div> <div class=\"cell\"><div class=\"lb\">aut<br>idem</div> <div class=\"ck tap\" data-field=\"autidem_2\"><span class=\"x\">X</span></div></div> <div class=\"cell\"><div class=\"lb\">aut<br>idem</div> <div class=\"ck tap\" data-field=\"autidem_3\"><span class=\"x\">X</span></div></div> </div> <div class=\"body\"> <div class=\"top\"> <div class=\"tl\"> <div class=\"bx tap\" data-field=\"kasse\" style=\"flex:1.15\"> <div class=\"lb\">Krankenkasse bzw. Kostenträger</div> <div class=\"vl\" data-val=\"kasse\" style=\"margin-top:auto\"></div> </div> <div class=\"bx tap\" data-field=\"versicherter\" style=\"flex:2.3\"> <div class=\"lb\">Name, Vorname des Versicherten</div> <div style=\"display:flex;flex:1;min-width:0\"> <div style=\"flex:1;display:flex;flex-direction:column;justify-content:space-evenly;min-width:0\"> <div class=\"vl\" data-val=\"vname\"></div> <div class=\"vl\" data-val=\"vvorname\"></div> <div class=\"vl\" data-val=\"vstrasse\"></div> <div class=\"vl\" data-val=\"vort\"></div> </div> <div style=\"width:34%;display:flex;flex-direction:column;justify-content:space-evenly; align-items:flex-end;min-width:0\"> <div class=\"lb\">geb. am</div> <div class=\"vl\" data-val=\"geb\"></div> <div></div> <div class=\"vl\" data-val=\"gueltig\"></div> </div> </div> </div> <div class=\"bx\" style=\"flex:1;padding:0\"> <div class=\"rowfields\"> <div class=\"tap\" data-field=\"kassen_nr\"><span class=\"lb\">Kassen-Nr.</span> <span class=\"vl\" data-val=\"kassen_nr\" style=\"margin-top:auto\"></span></div> <div class=\"tap\" data-field=\"vnr\"><span class=\"lb\">Versicherten-Nr.</span> <span class=\"vl\" data-val=\"vnr\" style=\"margin-top:auto\"></span></div> <div class=\"tap\" data-field=\"status\"><span class=\"lb\">Status</span> <span class=\"vl\" data-val=\"status\" style=\"margin-top:auto\"></span></div> </div> </div> <div class=\"bx\" style=\"flex:1;padding:0\"> <div class=\"rowfields\"> <div class=\"tap\" data-field=\"bsnr\"><span class=\"lb\">Betriebsstätten-Nr.</span> <span class=\"vl\" data-val=\"bsnr\" style=\"margin-top:auto\"></span></div> <div class=\"tap\" data-field=\"lanr\"><span class=\"lb\">Arzt-Nr.</span> <span class=\"vl\" data-val=\"lanr\" style=\"margin-top:auto\"></span></div> <div class=\"tap\" data-field=\"datum\"><span class=\"lb\">Datum</span> <span class=\"vl\" data-val=\"datum\" style=\"margin-top:auto\"></span></div> </div> </div> </div> <div class=\"tr\"> <div class=\"kz\"> <div class=\"kzc\"><div class=\"lb\">BVG</div> <div class=\"b tap\" data-field=\"bvg\">6</div></div> <div class=\"kzc\"><div class=\"lb\">Hilfs-<br>mittel</div> <div class=\"b tap\" data-field=\"hilfsmittel\">7</div></div> <div class=\"kzc\"><div class=\"lb\">Impf-<br>stoff</div> <div class=\"b tap\" data-field=\"impfstoff\">8</div></div> <div class=\"kzc\"><div class=\"lb\">Spr.-St.<br>Bedarf</div> <div class=\"b tap\" data-field=\"ssb\">9</div></div> <div class=\"kzc\"><div class=\"lb\">Begr.-<br>Pflicht</div> <div class=\"b tap\" data-field=\"begr\"></div></div> <div class=\"apo tap\" data-field=\"apo_ik\"> <span class=\"lb\">Apotheken-Nummer / IK</span> <span class=\"vl\" data-val=\"apo_ik\"></span></div> </div> <div class=\"zz\"> <div style=\"width:38%\"> <span class=\"cap\">Zuzahlung</span> <div class=\"b tap\" data-field=\"zuzahlung\"></div></div> <div style=\"flex:1\"> <span class=\"cap\">Gesamt-Brutto</span> <div class=\"b tap\" data-field=\"brutto\"></div></div> </div> <div class=\"vo\"> <div class=\"vohd\"> <b style=\"flex:1\">Arzneimittel-/Hilfsmittel-Nr.</b> <b style=\"width:18%;text-align:center\">Faktor</b> <b style=\"width:22%;text-align:center\">Taxe</b> </div> <div class=\"vorow\"><span style=\"flex:1\">1. Verordnung</span> <i style=\"width:18%\"></i><i style=\"width:22%\"></i></div> <div class=\"vorow\"><span style=\"flex:1\">2. Verordnung</span> <i style=\"width:18%\"></i><i style=\"width:22%\"></i></div> <div class=\"vorow\"><span style=\"flex:1\">3. Verordnung</span> <i style=\"width:18%\"></i><i style=\"width:22%\"></i></div> </div> </div> </div> <div class=\"rpline\"><b>Rp.</b><span class=\"lb\">(Bitte Leerräume durchstreichen)</span></div> <div class=\"mid\"> <div class=\"rx\"> <div class=\"vl\" data-field=\"rx1\" data-val=\"rx1\"></div> <div class=\"vl\" data-field=\"rx2\" data-val=\"rx2\"></div> <div class=\"vl\" data-field=\"rx3\" data-val=\"rx3\"></div> <div class=\"vl\" data-field=\"rx4\" data-val=\"rx4\"></div> </div> <div class=\"stempel\"> <div class=\"cap\">Vertragsarztstempel</div> <div class=\"box\" data-field=\"stempel\"> <span data-val=\"st1\"></span><span data-val=\"st2\"></span> <span data-val=\"st3\" style=\"font-weight:bold\"></span> <span data-val=\"st4\"></span> <span data-val=\"st5\" style=\"font-weight:bold\"></span> </div> </div> </div> <div class=\"foot\"> <div class=\"f1\"> <span class=\"num\">6664</span> <div class=\"grid6 tap\" data-field=\"abgabedatum\"> <i></i><i></i><i></i><i></i><i></i><i></i></div> <span class=\"lb\">Abgabedatum<br>in der Apotheke</span> <div class=\"sig\"><span class=\"lb\">Unterschrift des Arztes</span> <span class=\"lb\" style=\"font-size:.92cqw\">Muster 16 (7.2008)</span></div> </div> <div class=\"f2\"> <div class=\"warn\">Bei Arbeitsunfall<br>auszufüllen!</div> <div class=\"unfall\"> <div style=\"width:34%\"><span class=\"lb\">Unfalltag</span></div> <div><span class=\"lb\">Unfallbetrieb oder<br>Arbeitgebernummer</span></div> </div> <div style=\"flex:1;display:flex;align-items:flex-end;justify-content:flex-end; border-top:.28cqw solid var(--red)\"> <span class=\"bar\" data-val=\"barcode\"></span></div> </div> </div> </div> </div>";
/* Ergaenzungen des Spiels: Rahmen mit Lupe, Fehlgriff, Fund, Lehrblick */
var CSS_SPIEL=[
'.m16r-rahmen{position:relative;width:100%;overflow-x:auto;overflow-y:hidden;-webkit-overflow-scrolling:touch;border-radius:6px;background:#e9e7e2;touch-action:pan-x pan-y}',
'.m16r-rahmen .m16r{width:calc(100% * var(--m16z,1));max-width:none;box-shadow:0 3px 14px rgba(0,0,0,.22)}',
'.m16r-lupe{position:sticky;left:calc(100% - 42px);top:0;float:right;z-index:3;width:36px;height:36px;margin:-36px 0 0 0;border-radius:50%;border:0;background:#23272E;color:#fff;font:700 13px Inter,Arial,sans-serif;box-shadow:0 2px 8px rgba(0,0,0,.25);cursor:pointer}',
'.m16r .tap:hover,.m16r [data-field]:hover{background:#fff8dc}',
'.m16r [data-field]{cursor:pointer}',
/* Schutz gegen globale Klassen der Spielseite (.box in index.html) */
'.m16r .stempel .box{background:transparent;border:0;border-radius:0;padding:0;box-shadow:none;min-width:0;max-width:none;transition:none;text-align:center}',
'.m16r .miss{outline:.25cqw solid #D89A2C;background:rgba(216,154,44,.18);animation:m16rWack .2s ease-in-out}',
'@keyframes m16rWack{25%{transform:translateX(-2px)}75%{transform:translateX(2px)}}',
'.m16r.lehre [data-field]:not(.hit){opacity:.45}',
/* Ganzes Blatt auf dem Telefon (opt.gross): Blatt in Bildschirmbreite,
   kein Wischen, keine Lupe. Die eingetragenen Werte werden groesser
   gesetzt, die Vordruck-Beschriftung bleibt klein wie auf Papier. */
'.m16r-gross .m16r-lupe{display:none}',
'.m16r-gross .m16r{width:100%}',
'.m16r-gross .m16r .vl{font-size:2.55cqw;line-height:1.12}',
'.m16r-gross .m16r .lb{font-size:1.45cqw}',
'.m16r-gross .m16r .rx{gap:1.2%}',
'.m16r-gross .m16r .rx .vl{white-space:normal;overflow:visible;font-size:2.75cqw;font-weight:600}',
'.m16r-gross .m16r .stempel .box span{font-size:2cqw}',
'.m16r-gross .m16r .f1 .num,.m16r-gross .m16r .bar{font-size:2.2cqw}',
'.m16r-gross .m16r .rpline b{font-size:2.6cqw}',
'.m16r-gelb.m16r{--red:#C4566A;--paper:#F3E4C8}.m16r-gelb.m16r .bx,.m16r-gelb.m16r .ck,.m16r-gelb.m16r .b,.m16r-gelb.m16r .apo,.m16r-gelb.m16r .vorow,.m16r-gelb.m16r .grid6 i,.m16r-gelb.m16r .unfall{background:#F8ECE2}'
].join('\n');
function stil(){
  if(document.getElementById('m16rStil')) return;
  var s=document.createElement('style'); s.id='m16rStil'; s.textContent=CSS+'\n'+CSS_SPIEL; document.head.appendChild(s);
}

/* Ein Formular. Die sechs Funktionen sind die aus muster16.html, mit
   zwei Erweiterungen, die nichts an den Signaturen aendern:
   target() nimmt auch eine Liste; das Blatt sperrt erst, wenn alle
   Felder der Liste gefunden sind. Ein Fehlgriff traegt .miss statt .hit. */
function erzeugen(el, opt){
  stil(); opt=opt||{};
  var rahmen=document.createElement('div'); rahmen.className='m16r-rahmen';
  rahmen.innerHTML=HTML;
  var r=rahmen.firstChild;
  if(opt.gelb) r.classList.add('m16r-gelb');
  var lupe=document.createElement('button'); lupe.type='button'; lupe.className='m16r-lupe';
  rahmen.insertBefore(lupe,r);
  el.appendChild(rahmen);
  var exp=null, h=null, fertigFn=null, lock=false, gefunden={};
  function ziele(){ return exp==null? [] : (Array.isArray(exp)? exp : [exp]); }
  var I={ el:r, rahmen:rahmen };
  I.set=function(o){ for(var k in o){ var e=r.querySelector('[data-val="'+k+'"]'); if(e) e.textContent=o[k]; } };
  I.check=function(f,on){ var e=r.querySelector('.ck[data-field="'+f+'"]'); if(e) e.classList.toggle('on',on!==false); };
  I.target=function(f){ exp=f; lock=false; gefunden={}; };
  I.onTap=function(f){ h=f; };
  I.reveal=function(){ ziele().forEach(function(z){ var e=r.querySelector('[data-field="'+z+'"]'); if(e) e.classList.add('hit'); }); };
  I.clear=function(){
    r.querySelectorAll('[data-val]').forEach(function(e){ e.textContent=''; });
    r.querySelectorAll('.ck').forEach(function(e){ e.classList.remove('on'); });
    r.querySelectorAll('.hit,.miss').forEach(function(e){ e.classList.remove('hit','miss'); });
    r.classList.remove('lehre'); exp=null; lock=false; gefunden={};
  };
  /* Neu: Rueckruf, wenn alle Ziele gefunden sind */
  I.onDone=function(fn){ fertigFn=fn; };
  /* Neu: Lupe. 1 = ganzes Blatt, 2 = doppelt breit mit Wischen */
  I.zoom=function(z){ z=z||1; r.style.setProperty('--m16z',z); lupe.textContent=z>1?'1×':'2×'; I._z=z; };
  /* Neu: Lehrblick, die gefundenen Felder leuchten, der Rest tritt zurueck */
  I.lehre=function(an){ r.classList.toggle('lehre',an!==false); };
  lupe.addEventListener('click',function(){ I.zoom(I._z>1?1:2); });
  r.addEventListener('click',function(e){
    var t=e.target.closest('[data-field]'); if(!t||lock) return;
    var f=t.dataset.field, zs=ziele(), ok=zs.indexOf(f)>=0;
    if(ok){ if(gefunden[f]) return; gefunden[f]=true; t.classList.remove('miss'); t.classList.add('hit'); }
    else { t.classList.remove('miss'); void t.offsetWidth; t.classList.add('miss'); }
    var alle = zs.length>0 && zs.every(function(z){ return gefunden[z]; });
    if(alle) lock=true;
    if(h) h(f,ok);
    if(alle && fertigFn) fertigFn(Object.keys(gefunden));
  });
  /* Telefon hochkant: doppelte Breite mit Wischen, sonst ganzes Blatt.
     Gemessen bei 380 px: 1x = 4,7 px Schrift (unlesbar), 2x = 9,5 px. */
  if(opt.gross){ rahmen.classList.add('m16r-gross'); I.zoom(1); return I; }
  I.zoom(opt.zoom || ((el.clientWidth||400)<520 ? 2 : 1));
  return I;
}

/* Aus dem alten Datensatz (M16.build: r.name, r.adresse, r.verordnung …)
   die Werte fuer set() und die Zuordnung der Feldnamen. So laufen
   Stufen mit alten Daten ohne Aenderung an ihren Dateien. */
var ALT_FELD={ kasse:'kasse', ktk:'kassen_nr', name:'versicherter', geb:'versicherter', adresse:'versicherter',
  vers:'vnr', status:'status', bsnr:'bsnr', lanr:'lanr', datum:'datum', verordnung:'rx1', dosis:'rx2', stempel:'stempel' };
function ausAlt(r){
  r=r||{}; var o={};
  if(r.kasse!=null) o.kasse=r.kasse;
  if(r.name){ var n=String(r.name).split(','); o.vname=n[0].trim(); o.vvorname=(n[1]||'').trim(); }
  if(r.geb!=null) o.geb=r.geb;
  if(r.adresse){ var a=String(r.adresse).split(','); o.vstrasse=a[0].trim(); o.vort=a.slice(1).join(',').trim(); }
  if(r.ktk!=null) o.kassen_nr=r.ktk;
  if(r.vers!=null) o.vnr=r.vers;
  if(r.status!=null) o.status=r.status;
  if(r.bsnr!=null){ o.bsnr=r.bsnr; o.st1=r.bsnr; o.barcode=r.bsnr; }
  if(r.lanr!=null) o.lanr=r.lanr;
  if(r.datum!=null) o.datum=r.datum;
  if(r.verordnung!=null) o.rx1=r.verordnung;
  if(r.dosis!=null) o.rx2=r.dosis;
  if(r.stempel){ var s=String(r.stempel).split(','); o.st3=s[0].trim(); o.st4=s.slice(1).join(',').trim(); }
  return o;
}

var aktiv=null;
var API={
  create:function(el,opt){ aktiv=erzeugen(el,opt); return aktiv; },
  set:function(o){ if(aktiv) aktiv.set(o); },
  check:function(f,on){ if(aktiv) aktiv.check(f,on); },
  target:function(f){ if(aktiv) aktiv.target(f); },
  onTap:function(fn){ if(aktiv) aktiv.onTap(fn); },
  reveal:function(){ if(aktiv) aktiv.reveal(); },
  clear:function(){ if(aktiv) aktiv.clear(); },
  ausAlt:ausAlt, altFeld:function(k){ return ALT_FELD[k]||k; },
  v:1
};
/* Das alte M16-Objekt (M16.build, ring, teach) bleibt bis zum Ende des
   Umzugs bestehen. Die neuen Funktionen kommen dazu, nichts wird ersetzt. */
var M=window.M16 || {};
Object.keys(API).forEach(function(k){ if(M[k]===undefined) M[k]=API[k]; });
M.rot=API;
window.M16=M;
})();
