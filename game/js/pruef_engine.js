/* =====================================================================
   pruef_engine.js · Rezeptprüfung · Mechaniken der Stufe pruef_faelschung_01
   Technik, 25.11.2026. Geladen nur bei Bedarf: TOPICS[...].engine,
   levelDaten() laedt diese Datei vor den Falldaten.

   Vier Mechaniken, alle allgemein gehalten (Daten tragen den Inhalt):
     pruefkette    drei Quellen offen zugleich (Papier, Kunde, Praxis),
                   der Spieler entscheidet selbst, wann es reicht.
                   Leiste unten zaehlt nur objektive Hinweise.
                   Jeder Befund: hinweis · sauber · neutral · verhalten.
                   Verhalten zaehlt nie in die Leiste.
     entscheidung  Abgeben oder verweigern, mit dem Gesammelten vor Augen.
                   Punkte nach Entscheidung und Zahl der Hinweise.
     persona       Kundentyp (PLAN Abschnitt 3): Satz lesen, Typ waehlen,
                   Antwort waehlen. Eine Option kann an einen Hinweis
                   gebunden sein (opt.brauchtHinweis).
     bilanz        beide Entscheidungen nebeneinander, Text nach Kombination,
                   fester Schluss.

   Gemeinsamer Zustand der Runde: run.pf[rezeptKey]
     {befunde:{id:klasse}, hinweise:n, papier:{feld:true}, praxis:bool,
      anklage:bool, fragen:n, entscheid:'verweigert'|'abgegeben'|null,
      hinweiseBeiEntscheid:n}
   Das Rezept ist das rote Muster 16 aus js/m16.js, ganzes Blatt, ohne
   Wischen (Regel 18.11.2026). m16.js bleibt unveraendert.
===================================================================== */
(function(){
'use strict';

var UI={
  de:{papier:'Das Papier', kunde:'Der Kunde', praxis:'Die Praxis',
      offen:'offen', geprueft:'geprüft', anrufen:'In der Praxis anrufen',
      genug:'Ich habe genug', fragenRest:'Noch {n} von 3 Fragen',
      fragenAus:'Keine Fragen mehr', nichts:'Hier gibt es nichts zu prüfen.',
      kl:{hinweis:'Objektiver Hinweis', sauber:'Unauffällig', neutral:'Neutral', verhalten:'Verhalten', anklage:'Anklage · −10'},
      fertigH:'Prüfung beendet', gesammelt:'Was ich gesammelt habe', keine:'Ich habe nichts geprüft.',
      abgeben:'Abgeben', verweigern:'Verweigern',
      typFrage:'Welcher Kundentyp steht vor mir?', antwortFrage:'Was sage ich?',
      typOk:'Typ erkannt', typNo:'Typ verfehlt',
      verweigert:'verweigert', abgegeben:'abgegeben', fehlt:'—', ja:'ja', nein:'nein',
      bilanzOk:'Beide Entscheidungen richtig', bilanzNo:'Nicht beide richtig'},
  en:{papier:'The paper', kunde:'The customer', praxis:'The practice',
      offen:'open', geprueft:'checked', anrufen:'Call the practice',
      genug:'I have enough', fragenRest:'{n} of 3 questions left',
      fragenAus:'No questions left', nichts:'Nothing to check here.',
      kl:{hinweis:'Objective finding', sauber:'Clean', neutral:'Neutral', verhalten:'Behaviour', anklage:'Accusation · −10'},
      fertigH:'Check finished', gesammelt:'What I collected', keine:'I checked nothing.',
      abgeben:'Dispense', verweigern:'Refuse',
      typFrage:'Which customer type is in front of me?', antwortFrage:'What do I say?',
      typOk:'Type recognised', typNo:'Type missed',
      verweigert:'refused', abgegeben:'dispensed', fehlt:'—', ja:'yes', nein:'no',
      bilanzOk:'Both decisions right', bilanzNo:'Not both right'},
  ar:{papier:'الورقة', kunde:'الزبون', praxis:'العيادة',
      offen:'مفتوح', geprueft:'فحصتُه', anrufen:'أتصل بالعيادة',
      genug:'اكتفيتُ', fragenRest:'بقي لي {n} من 3 أسئلة',
      fragenAus:'لم يبقَ لي أسئلة', nichts:'لا شيء يُفحص هنا.',
      kl:{hinweis:'دليل موضوعي', sauber:'نظيف', neutral:'محايد', verhalten:'سلوكي', anklage:'سؤال متّهم · −10'},
      fertigH:'انتهى الفحص', gesammelt:'ما جمعتُه', keine:'لم أفحص شيئاً.',
      abgeben:'أصرف', verweigern:'أرفض',
      typFrage:'أيّ نمط من الزبائن يقف أمامي؟', antwortFrage:'ماذا أقول؟',
      typOk:'عرفتُ النمط', typNo:'أخطأتُ النمط',
      verweigert:'رفضتُ', abgegeben:'صرفتُ', fehlt:'—', ja:'نعم', nein:'لا',
      bilanzOk:'القراران صحيحان', bilanzNo:'ليس القراران صحيحين'}
};
function U(k){ var L=UI[state.lang]||UI.de; return L[k]!=null?L[k]:UI.de[k]; }
function KL(k){ return (U('kl')||{})[k]||k; }

var CSS=[
'.pf-quellen{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin:4px 0 12px}',
'@media (min-width:700px){.pf-quellen{max-width:560px}}',
/* Ganzes Blatt auch am Rechner: Breite so, dass die Hoehe in den Bildschirm passt */
'.pf-m16 .m16r-rahmen{max-width:min(100%,calc((100vh - 200px) * 1.41));margin:0 auto}',
'.pf-q{border:2px solid var(--line);border-radius:12px;background:#fff;padding:0;overflow:hidden;cursor:pointer;font:inherit;color:var(--ink);text-align:center}',
'.pf-q img{display:block;width:100%;aspect-ratio:16/9;object-fit:cover}',
'.pf-q b{display:block;font-size:13px;padding:6px 4px 0}',
'.pf-q span{display:block;font-size:11px;color:var(--soft);padding:0 4px 7px}',
'.pf-q.an{border-color:var(--ink)}',
'.pf-q.fertig span{color:var(--teal-dark);font-weight:700}',
'.pf-panel{margin-bottom:12px}',
'.pf-intro{font-size:13px;color:var(--soft);margin:0 0 8px;line-height:1.45}',
'.pf-log{display:flex;flex-direction:column;gap:8px;margin:10px 0 0}',
'.pf-e{background:#fff;border:1px solid var(--line);border-radius:10px;padding:9px 11px;font-size:13px;line-height:1.45}',
'.pf-e .pf-f{font-weight:700;margin-right:4px}',
'body.rtl .pf-e .pf-f{margin-right:0;margin-left:4px}',
'.pf-chip{display:inline-block;font-size:10.5px;font-weight:700;letter-spacing:.04em;border-radius:20px;padding:2px 8px;margin:0 6px 3px 0;vertical-align:middle}',
'body.rtl .pf-chip{margin:0 0 3px 6px}',
'.pf-chip.hinweis{background:#fde2e4;color:#b3121f}',
'.pf-chip.sauber{background:#dff3ef;color:#1f6b5c}',
'.pf-chip.neutral{background:#eceae6;color:#555}',
'.pf-chip.verhalten{background:#fff1d6;color:#8a5a00}',
'.pf-chip.anklage{background:#3a1d1d;color:#fff}',
'.pf-fr{display:flex;flex-direction:column;gap:7px}',
'.pf-fr button{background:var(--bg);border:2px solid var(--line);border-radius:12px;padding:10px 12px;font:inherit;font-size:13px;line-height:1.4;text-align:start;cursor:pointer;color:var(--ink)}',
'.pf-fr button:disabled{opacity:.45;cursor:default}',
'.pf-fr button.gefragt{opacity:1;border-color:var(--ink);background:#fff}',
'.pf-rest{font-size:12px;color:var(--soft);margin:8px 0 0}',
'.pf-bild{border-radius:12px;overflow:hidden;border:2px solid var(--ink);margin:8px 0}',
'.pf-bild img{display:block;width:100%;aspect-ratio:16/9;object-fit:cover}',
'.pf-call{width:100%;padding:12px;border-radius:12px;border:0;background:var(--ink);color:#fff;font:inherit;font-weight:700;cursor:pointer}',
'.pf-leiste{position:fixed;left:0;right:0;bottom:0;z-index:60;background:#1A1A1A;color:#fff;display:flex;align-items:center;justify-content:space-between;gap:10px;padding:10px 16px calc(10px + env(safe-area-inset-bottom));box-shadow:0 -4px 16px rgba(0,0,0,.25)}',
'.pf-leiste .pf-zahl{font-size:13px;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0}',
'.pf-leiste .pf-zahl i{font-style:normal;display:inline-block;min-width:1.4em;text-align:center;background:#E63946;border-radius:6px;padding:1px 5px;margin:0 3px}',
'.pf-leiste button{border:0;border-radius:10px;padding:10px 16px;font:inherit;font-weight:700;background:#fff;color:#1A1A1A;cursor:pointer;white-space:nowrap}',
'.pf-leiste button:disabled{opacity:.4}',
'.pf-platz{height:76px}',
'.m16r-rahmen .m16r .pf-ok{outline:.3cqw solid #2C7A78;background:rgba(78,205,196,.18)}',
'.m16r-rahmen .m16r .pf-hw{outline:.3cqw solid #E63946;background:rgba(230,57,70,.16)}',
'.m16r-rahmen .m16r .pf-nt{outline:.3cqw solid #888;background:rgba(0,0,0,.06)}',
'.m16r .pf-hand{font-style:italic;font-family:"Segoe Script","Bradley Hand","Snell Roundhand","Comic Sans MS","Chalkboard SE",cursive;color:#1d3b8f;font-weight:400!important;letter-spacing:.01em}',
'.m16r .pf-sig{font-family:"Segoe Script","Bradley Hand","Snell Roundhand","Comic Sans MS",cursive;color:#1d3b8f;font-size:2.4cqw;line-height:1;transform:rotate(-4deg);padding:0 1cqw}',
'.m16r .sig{cursor:pointer}',
'.pf-sum{background:var(--bg);border:1px solid var(--line);border-radius:12px;padding:10px 12px;margin:0 0 12px}',
'.pf-sum h4{font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:var(--soft);margin:0 0 6px}',
'.pf-sum .pf-zl{font-weight:700;margin:6px 0 0;font-size:13px}',
'.pf-wahl{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:6px 0 12px}',
'.pf-wahl button{padding:14px;border-radius:12px;font:inherit;font-weight:700;font-size:15px;cursor:pointer;border:2px solid var(--ink);background:#fff;color:var(--ink)}',
'.pf-wahl button.v{background:var(--ink);color:#fff}',
'.pf-wahl button:disabled{opacity:.5;cursor:default}',
'.pf-zitat{background:#fff;border:1px solid var(--line);border-left:4px solid var(--red);border-radius:10px;padding:11px 13px;font-size:14px;line-height:1.5;margin:0 0 12px}',
'body.rtl .pf-zitat{border-left:1px solid var(--line);border-right:4px solid var(--red)}',
'.pf-frage{font-weight:700;font-size:14px;margin:4px 0 8px}',
'.pf-typen{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:12px}',
'.pf-typen button{padding:11px 8px;border-radius:12px;border:2px solid var(--line);background:var(--bg);font:inherit;font-weight:700;font-size:13px;cursor:pointer;color:var(--ink)}',
'.pf-typen button.correct,.pf-fr button.correct{border-color:#2C7A78;background:#dff3ef}',
'.pf-typen button.wrong,.pf-fr button.wrong{border-color:#E63946;background:#fde2e4}',
'.pf-tab{width:100%;border-collapse:collapse;font-size:13px;margin:0 0 12px}',
'.pf-tab td{border-top:1px solid var(--line);padding:9px 6px;vertical-align:top}',
'.pf-tab td:first-child{font-weight:700}',
'.pf-tab .gut{color:#1f6b5c;font-weight:700}',
'.pf-tab .schlecht{color:#b3121f;font-weight:700}',
'.pf-text{font-size:14px;line-height:1.55;margin:0 0 12px}'
].join('\n');
function stil(){
  if(document.getElementById('pfStil')) return;
  var s=document.createElement('style'); s.id='pfStil'; s.textContent=CSS; document.head.appendChild(s);
}
function pfZustand(key){
  run.pf=run.pf||{};
  if(!run.pf[key]) run.pf[key]={befunde:{}, hinweise:0, papier:{}, praxis:false, anklage:false,
                                 fragen:0, entscheid:null, hinweiseBeiEntscheid:0};
  return run.pf[key];
}
function bild(src){ return src ? '<div class="pf-bild"><img src="'+src+'" alt=""></div>' : ''; }
function chip(kl){ return '<span class="pf-chip '+kl+'">'+KL(kl)+'</span>'; }
function eintrag(feld, text, kl){
  return '<div class="pf-e">'+chip(kl)+(feld?'<span class="pf-f"><bdi>'+feld+'</bdi></span> · ':'')+'<span dir="auto">'+text+'</span>'+'</div>';
}

/* Leiste unten: haengt am body, damit sie ueber jeder Verwandlung der
   Buehne fest bleibt. Verschwindet von selbst, sobald die Stufe weg ist. */
function leisteBauen(stage, d, onGenug){
  var alt=document.getElementById('pfLeiste'); if(alt) alt.remove();
  var l=document.createElement('div'); l.className='pf-leiste'; l.id='pfLeiste';
  l.innerHTML='<div class="pf-zahl" id="pfZahl"></div><button type="button" id="pfGenug">'+U('genug')+'</button>';
  document.body.appendChild(l);
  l.querySelector('#pfGenug').addEventListener('click', onGenug);
  var w=setInterval(function(){
    if(!document.body.contains(stage) || !stage.querySelector('.pf-quellen')){ clearInterval(w); l.remove(); }
  }, 400);
  return l;
}
function leisteText(d, n){
  var vor=d.leiste||'Objektive Hinweise: {n} von {m}';
  return vor.replace('{n}','<i>'+n+'</i>').replace('{m}','<i>'+(d.hinweiseMax||0)+'</i>');
}

/* ---------------------------------------------------------------------
   pruefkette
   d = {kicker,title,key,p, leiste, hinweiseMax,
        punkte:{art:'hinweise'|'felder', felder:[...]} ,
        quellen:{papier:{img,intro,rezept:{set,checks,hand:[..],sig}, felder:{id:{name,text,kl}}, map:{...}, alleText},
                 kunde:{img,intro,fragen:[{q,a,kl}]},
                 praxis:{img,anruf:{img,img2,text,kl,name}}},
        expl}
--------------------------------------------------------------------- */
Mech.pruefkette=function(host, d, done){
  stil();
  var Z=pfZustand(d.key), fertig=false, offen=null;
  var Q=d.quellen;
  host.innerHTML='<div class="stage"><div class="stage-head"><div class="kicker">'+d.kicker+'</div>'+
    '<div class="stage-title">'+d.title+'</div></div><div class="stage-body">'+
    '<div class="pf-quellen">'+
      ['papier','kunde','praxis'].map(function(k){
        return '<button type="button" class="pf-q" data-q="'+k+'"><img src="'+Q[k].img+'" alt="">'+
          '<b>'+U(k)+'</b><span data-st>'+U('offen')+'</span></button>'; }).join('')+
    '</div>'+
    '<div class="pf-panel" data-p="papier" hidden><p class="pf-intro">'+Q.papier.intro+'</p><div class="pf-m16"></div><div class="pf-log" data-log></div></div>'+
    '<div class="pf-panel" data-p="kunde" hidden><p class="pf-intro">'+Q.kunde.intro+'</p><div class="pf-fr"></div><p class="pf-rest"></p><div class="pf-log" data-log></div></div>'+
    '<div class="pf-panel" data-p="praxis" hidden><button type="button" class="pf-call">'+U('anrufen')+'</button><div class="pf-log" data-log></div></div>'+
    '<div id="fbz"></div><div class="pf-platz"></div></div></div>';
  var stage=host.querySelector('.stage');
  var leiste=leisteBauen(stage, d, beenden);
  function zahl(){ var z=document.getElementById('pfZahl'); if(z) z.innerHTML=leisteText(d, Z.hinweise); }
  zahl();

  function befund(id, kl){
    if(Z.befunde[id]) return false;
    Z.befunde[id]=kl;
    if(kl==='hinweis') Z.hinweise++;
    zahl();
    if(kl==='hinweis') try{ SND.good(); }catch(e){}
    return true;
  }
  function status(k, txt, fertigKl){
    var b=stage.querySelector('.pf-q[data-q="'+k+'"]');
    b.querySelector('[data-st]').textContent=txt; if(fertigKl) b.classList.add('fertig');
  }
  function zeigen(k){
    offen=k;
    stage.querySelectorAll('.pf-q').forEach(function(b){ b.classList.toggle('an', b.dataset.q===k); });
    stage.querySelectorAll('.pf-panel').forEach(function(p){ p.hidden=(p.dataset.p!==k); });
    if(k==='papier') papierLaden();
    try{ stage.querySelector('.pf-panel[data-p="'+k+'"]').scrollIntoView({behavior:'smooth',block:'start'}); }catch(e){}
  }
  stage.querySelectorAll('.pf-q').forEach(function(b){
    b.addEventListener('click', function(){ if(!fertig) zeigen(b.dataset.q); });
  });

  /* Papier: rotes Muster 16, ganzes Blatt */
  var papierDa=false;
  function papierLaden(){
    if(papierDa) return; papierDa=true;
    var P=Q.papier, wrap=stage.querySelector('.pf-m16'), log=stage.querySelector('.pf-panel[data-p="papier"] [data-log]');
    pcM16Laden(function(fehler){
      if(fehler || !(window.M16 && M16.rot) || !document.body.contains(wrap)) return;
      var I=M16.rot.create(wrap);
      /* Blatt ganz ins Bild holen: Einleitung oben, Blatt darunter */
      setTimeout(function(){ try{ var y=wrap.parentNode.getBoundingClientRect().top+window.pageYOffset-12; window.scrollTo({top:y,behavior:'smooth'}); }catch(e){} }, 60);
      I.clear(); I.set(P.rezept.set||{});
      (P.rezept.checks||[]).forEach(function(c){ I.check(c,true); });
      var r=I.el;
      (P.rezept.hand||[]).forEach(function(k){ var e=r.querySelector('[data-val="'+k+'"]'); if(e) e.classList.add('pf-hand'); });
      var sig=r.querySelector('.sig');
      if(sig && P.rezept.sig){
        var s=document.createElement('span'); s.className='pf-sig'; s.textContent=P.rezept.sig;
        sig.insertBefore(s, sig.lastElementChild);
      }
      var anzahl=Object.keys(P.felder).length, gezaehlt={};
      /* Eigener Zuhoerer in der Fangphase: m16 markiert sonst jeden Griff
         als Fehlgriff. Hier gibt es keinen Fehlgriff, nur Befunde. */
      I.rahmen.addEventListener('click', function(e){
        e.stopPropagation(); e.preventDefault();
        if(fertig) return;
        var ziel=e.target, id=null, el=null;
        if(ziel.closest('.sig')){ id=P.map.sig; el=ziel.closest('.sig'); }
        else if(ziel.closest('[data-val="barcode"]')){ id=P.map.barcode; el=ziel.closest('[data-val="barcode"]').parentNode; }
        else {
          var f=ziel.closest('[data-field]'); if(!f) return;
          var k=f.dataset.field;
          if(k==='stempel'){
            var v=ziel.closest('[data-val]'), oben;
            if(v) oben=(P.map.stempelOben||[]).indexOf(v.dataset.val)>=0;
            else { var bx=f.getBoundingClientRect(); oben=(e.clientY-bx.top) < bx.height*0.4; }
            id=oben ? P.map.stempel_oben : P.map.stempel_unten;
          } else id=P.map[k];
          el=f;
        }
        if(!id || !P.felder[id]){ try{ fbNote(host, U('nichts')); }catch(x){} return; }
        var F=P.felder[id];
        if(el){ el.classList.remove('pf-ok','pf-hw','pf-nt');
          el.classList.add(F.kl==='hinweis'?'pf-hw':(F.kl==='sauber'?'pf-ok':'pf-nt')); }
        if(gezaehlt[id]) return;
        gezaehlt[id]=true; Z.papier[id]=true;
        befund('papier:'+id, F.kl);
        log.insertAdjacentHTML('afterbegin', eintrag(F.name, F.text, F.kl));
        var n=Object.keys(gezaehlt).length;
        status('papier', n+' / '+anzahl, n===anzahl);
        if(n===anzahl && P.alleText) log.insertAdjacentHTML('afterbegin', '<div class="pf-e"><b>'+P.alleText+'</b></div>');
      }, true);
    });
  }

  /* Kunde: drei Fragen aus sechs, die anklagende Frage beendet das Gespraech */
  (function(){
    var K=Q.kunde, box=stage.querySelector('.pf-panel[data-p="kunde"] .pf-fr'),
        rest=stage.querySelector('.pf-panel[data-p="kunde"] .pf-rest'),
        log=stage.querySelector('.pf-panel[data-p="kunde"] [data-log]');
    function restText(){
      var n=3-Z.fragen;
      rest.textContent=(Z.anklage||n<=0) ? U('fragenAus') : U('fragenRest').replace('{n}', n);
    }
    K.fragen.forEach(function(f, i){
      var b=document.createElement('button'); b.type='button'; b.innerHTML=f.q;
      b.addEventListener('click', function(){
        if(fertig || Z.anklage || Z.fragen>=3 || b.classList.contains('gefragt')) return;
        Z.fragen++; b.classList.add('gefragt'); b.disabled=true;
        befund('kunde:'+i, f.kl);
        if(f.kl==='anklage'){ Z.anklage=true; try{ SND.bad(); }catch(e){} }
        log.insertAdjacentHTML('afterbegin', eintrag('', '<b>'+f.q+'</b><br>'+f.a, f.kl));
        if(Z.anklage || Z.fragen>=3){
          box.querySelectorAll('button').forEach(function(x){ x.disabled=true; });
          status('kunde', Z.anklage ? KL('anklage') : U('geprueft'), true);
        } else status('kunde', Z.fragen+' / 3');
        restText();
      });
      box.appendChild(b);
    });
    restText();
  })();

  /* Praxis: Anruf, kostenlos */
  (function(){
    var A=Q.praxis.anruf, btn=stage.querySelector('.pf-call'),
        log=stage.querySelector('.pf-panel[data-p="praxis"] [data-log]');
    btn.addEventListener('click', function(){
      if(fertig || Z.praxis) return;
      Z.praxis=true; btn.disabled=true; btn.style.display='none';
      befund('praxis', A.kl);
      log.innerHTML=bild(A.img)+eintrag(A.name||'', A.text, A.kl)+bild(A.img2);
      status('praxis', U('geprueft'), true);
    });
  })();

  function punkte(){
    var P=d.punkte||{}, p=0, max=d.p||30;
    if(P.art==='felder'){
      var fs=P.felder||[], n=fs.filter(function(f){ return Z.papier[f]; }).length;
      p=fs.length ? Math.round(max*n/fs.length) : 0;
    } else {
      p=d.hinweiseMax ? Math.round(max*Z.hinweise/d.hinweiseMax) : 0;
    }
    if(Z.anklage) p-=10;
    return p;
  }
  function beenden(){
    if(fertig) return; fertig=true;
    var g=document.getElementById('pfGenug'); if(g) g.disabled=true;
    stage.querySelectorAll('.pf-q,.pf-fr button,.pf-call').forEach(function(b){ b.disabled=true; });
    var p=punkte();
    var z=document.getElementById('pfZahl');
    var zeile=z ? z.textContent : '';
    fbBlock(stage.querySelector('#fbz'), p>=(d.p||30), U('fertigH')+' · '+(p>0?'+':'')+p,
      zeile+(d.schlussText?'<br><br>'+d.schlussText:''), function(){
        var l=document.getElementById('pfLeiste'); if(l) l.remove();
        done(p, 0);
      });
    try{ stage.querySelector('#fbz').scrollIntoView({behavior:'smooth',block:'center'}); }catch(e){}
  }
};

/* ---------------------------------------------------------------------
   entscheidung
   d = {kicker,title,key,img,p, hinweiseMax,
        stufen:{verweigert:[{ab:2,p:50,text,h}], abgegeben:[{geprueft:true,p,text,h}]},
        bilder:{verweigert:[...], abgegeben:[...]}, expl}
   verweigert: erste Stufe mit hinweise>=ab · abgegeben: geprueft = mindestens
   ein Feld des Papiers angetippt.
--------------------------------------------------------------------- */
function befundListe(Z, d){
  var zeilen=[], txt=d.befundTexte||{};
  var RANG={hinweis:0,anklage:1,verhalten:2,neutral:3,sauber:4};
  Object.keys(Z.befunde).sort(function(a,b){ return (RANG[Z.befunde[a]]||9)-(RANG[Z.befunde[b]]||9); }).forEach(function(id){
    var kl=Z.befunde[id], name=txt[id];
    if(name) zeilen.push('<div class="pf-e">'+chip(kl)+name+'</div>');
  });
  return '<div class="pf-sum"><h4>'+U('gesammelt')+'</h4>'+
    (zeilen.length ? '<div class="pf-log">'+zeilen.join('')+'</div>' : '<div>'+U('keine')+'</div>')+
    '<div class="pf-zl">'+leisteText(d, Z.hinweise).replace(/<\/?i>/g,'')+'</div></div>';
}
Mech.entscheidung=function(host, d, done){
  stil();
  var Z=pfZustand(d.key), fin=false;
  host.innerHTML='<div class="stage"><div class="stage-head"><div class="kicker">'+d.kicker+'</div>'+
    '<div class="stage-title">'+d.title+'</div></div><div class="stage-body">'+
    bild(d.img)+befundListe(Z, d)+
    '<div class="pf-wahl"><button type="button" data-w="abgegeben">'+U('abgeben')+'</button>'+
    '<button type="button" class="v" data-w="verweigert">'+U('verweigern')+'</button></div>'+
    '<div id="pfFolge"></div><div id="fbz"></div></div></div>';
  host.querySelectorAll('.pf-wahl button').forEach(function(b){
    b.addEventListener('click', function(){
      if(fin) return; fin=true;
      host.querySelectorAll('.pf-wahl button').forEach(function(x){ x.disabled=true; });
      var w=b.dataset.w; Z.entscheid=w; Z.hinweiseBeiEntscheid=Z.hinweise;
      var geprueft=Object.keys(Z.papier).length>0;
      var stufe=(d.stufen[w]||[]).filter(function(s){
        if(s.ab!=null) return Z.hinweise>=s.ab;
        if(s.geprueft!=null) return s.geprueft===geprueft;
        return true;
      })[0] || {p:0,text:'',h:''};
      Z.punkteEntscheid=stufe.p||0;
      host.querySelector('#pfFolge').innerHTML=(d.bilder[w]||[]).map(bild).join('');
      fbBlock(host.querySelector('#fbz'), (stufe.p||0)>=(d.p||40), (stufe.h||'')+' · +'+(stufe.p||0),
        stufe.text, function(){ done(stufe.p||0, 0); });
      try{ host.querySelector('#pfFolge').scrollIntoView({behavior:'smooth',block:'start'}); }catch(e){}
    });
  });
};

/* ---------------------------------------------------------------------
   persona · Kundentyp (PLAN Abschnitt 3)
   d = {kicker,title,img,imgNach,zitat,typen:[..],typOk,pTyp,pAntwort,
        antworten:[{l:'A',t,ok,brauchtHinweis}], key, expl}
--------------------------------------------------------------------- */
Mech.persona=function(host, d, done){
  stil();
  var Z=pfZustand(d.key), pTyp=0;
  var mitHinweis=(Z.hinweiseBeiEntscheid||0)>0;
  host.innerHTML='<div class="stage"><div class="stage-head"><div class="kicker">'+d.kicker+'</div>'+
    '<div class="stage-title">'+d.title+'</div></div><div class="stage-body">'+
    bild(d.img)+'<div class="pf-zitat">'+d.zitat+'</div>'+
    '<div class="pf-frage">'+U('typFrage')+'</div><div class="pf-typen"></div>'+
    '<div id="pfAntw" hidden><div class="pf-frage">'+U('antwortFrage')+'</div><div class="pf-fr"></div></div>'+
    '<div id="pfNach"></div><div id="fbz"></div></div></div>';
  var tb=host.querySelector('.pf-typen');
  d.typen.forEach(function(ty){
    var b=document.createElement('button'); b.type='button'; b.textContent=ty;
    b.addEventListener('click', function(){
      if(tb.dataset.fertig) return; tb.dataset.fertig='1';
      var ok=(ty===d.typOk); pTyp=ok?(d.pTyp||10):0;
      tb.querySelectorAll('button').forEach(function(x){ x.disabled=true;
        if(x.textContent===d.typOk) x.classList.add('correct'); });
      if(!ok) b.classList.add('wrong');
      try{ (ok?SND.good:SND.bad)(); }catch(e){}
      fbNote(host, (ok?U('typOk'):U('typNo'))+' · +'+pTyp);
      antwortenZeigen();
    });
    tb.appendChild(b);
  });
  function antwortenZeigen(){
    var box=host.querySelector('#pfAntw'); box.hidden=false;
    var fr=box.querySelector('.pf-fr'), fin=false;
    d.antworten.filter(function(a){ return !a.brauchtHinweis || mitHinweis; }).forEach(function(a){
      var b=document.createElement('button'); b.type='button';
      b.innerHTML='<b>'+a.l+'</b> · '+a.t;
      b.addEventListener('click', function(){
        if(fin) return; fin=true;
        fr.querySelectorAll('button').forEach(function(x){ x.disabled=true; });
        b.classList.add(a.ok?'correct':'wrong');
        var pA=a.ok?(d.pAntwort||15):0, ges=pTyp+pA;
        host.querySelector('#pfNach').innerHTML=bild(d.imgNach);
        fbBlock(host.querySelector('#fbz'), ges>=(d.p||25), (a.ok?d.okH:d.badH)+' · +'+ges, d.expl,
          function(){ done(ges, 0); });
      });
      fr.appendChild(b);
    });
    try{ box.scrollIntoView({behavior:'smooth',block:'start'}); }catch(e){}
  }
};

/* ---------------------------------------------------------------------
   bilanz
   d = {kicker,title,img,imgSchluss,p, zeilen:[{key,label,soll,art:'hinweise'|'geprueft',feld}],
        texte:{'verweigert+abgegeben':..., ...}, schluss, richtig:{r1:'verweigert',r2:'abgegeben'}}
--------------------------------------------------------------------- */
Mech.bilanz=function(host, d, done){
  stil();
  run.pf=run.pf||{};
  var zeilen=d.zeilen.map(function(z){
    var Z=run.pf[z.key]||{}, e=Z.entscheid;
    var ent=e ? U(e) : U('fehlt');
    var gut=(e===d.richtig[z.key]);
    var wert = z.art==='hinweise'
      ? (Z.hinweiseBeiEntscheid!=null && e ? Z.hinweiseBeiEntscheid : (Z.hinweise||0))+' / '+z.max
      : (Z.papier && Object.keys(Z.papier).length ? U('ja') : U('nein'));
    return '<tr><td>'+z.label+'</td><td>'+z.soll+'</td><td class="'+(gut?'gut':'schlecht')+'">'+
      z.entLabel+' '+ent+'</td><td>'+z.feld+' '+wert+'</td></tr>';
  }).join('');
  var e1=(run.pf.r1||{}).entscheid, e2=(run.pf.r2||{}).entscheid;
  var kombi=d.texte[(e1||'-')+'+'+(e2||'-')]||'';
  var beide=(e1===d.richtig.r1 && e2===d.richtig.r2), p=beide?(d.p||15):0;
  host.innerHTML='<div class="stage"><div class="stage-head"><div class="kicker">'+d.kicker+'</div>'+
    '<div class="stage-title">'+d.title+'</div></div><div class="stage-body">'+
    bild(d.img)+'<table class="pf-tab">'+zeilen+'</table>'+
    (kombi?'<p class="pf-text">'+kombi+'</p>':'')+bild(d.imgSchluss)+
    '<div id="fbz"></div></div></div>';
  fbBlock(host.querySelector('#fbz'), beide, (beide?U('bilanzOk'):U('bilanzNo'))+' · +'+p, d.schluss,
    function(){ done(p, 0); });
};

window.PF_ENGINE=1;
})();
