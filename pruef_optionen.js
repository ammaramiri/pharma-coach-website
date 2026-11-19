#!/usr/bin/env node
/* =====================================================================
   pruef_optionen.js · Pharma-Coach: The Game
   Prueft die Laenge der Antwortoptionen gegen PLAN §12:
   Die Spreizung zwischen kuerzester und laengster Option einer Frage
   darf 30 % nicht ueberschreiten, und die richtige Option darf nicht
   systematisch die laengste sein.

   Aufruf aus dem Wurzelverzeichnis des Repos:
     node pruef_optionen.js
     node pruef_optionen.js --max=30     (Schwelle in Prozent)
     node pruef_optionen.js --nur=hv_22  (nur passende Dateien)

   Exit 1, wenn eine Frage die Schwelle reisst. So kann der Aufruf als
   Tor vor dem Hochladen dienen.
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm');

const ARG = process.argv.slice(2);
const MAX = Number((ARG.find(a => a.startsWith('--max=')) || '--max=30').split('=')[1]) / 100;
const NUR = (ARG.find(a => a.startsWith('--nur=')) || '--nur=').split('=')[1];
const DATA = path.join(process.cwd(), 'game', 'data');
if (!fs.existsSync(DATA)) { console.error('game/data nicht gefunden. Aus dem Repo-Wurzelverzeichnis aufrufen.'); process.exit(2); }

/* Datendateien nutzen Helfer, die nur in index.html stehen.
   Fehlende Namen werden als harmlose Platzhalter nachgelegt. */
function laden(datei) {
  const code = fs.readFileSync(path.join(DATA, datei), 'utf8');
  let stubs = '';
  for (let i = 0; i < 80; i++) {
    const sb = { TOPICS: {}, PERSONAS: {} };
    sb.window = sb;
    vm.createContext(sb);
    try { vm.runInContext(stubs + code, sb, { timeout: 10000 }); return sb; }
    catch (e) {
      const m = /^(\w+) is not defined$/.exec(e.message);
      if (m) { stubs += 'var ' + m[1] + '=new Proxy(function(){},{get:()=>"",apply:()=>""});'; continue; }
      return { _fehler: e.message };
    }
  }
  return { _fehler: 'zu viele fehlende Namen' };
}

const treffer = [];   // jede gemessene Frage
function messen(quelle, id, texte, richtigIdx) {
  const L = texte.map(t => String(t || '').length);
  if (L.length < 2 || L.some(x => x <= 3)) return;
  const mn = Math.min(...L), mx = Math.max(...L);
  const spreizung = mn ? (mx - mn) / mn : 0;
  const laengsteIstRichtig = richtigIdx >= 0 && L[richtigIdx] === mx &&
                             L.filter(x => x === mx).length === 1;
  treffer.push({ quelle, id, mn, mx, spreizung, laengsteIstRichtig });
}

/* ---- 1 · HV-Tisch, Buero, BtM: TOPICS[...].steps[].data.options[] ---- */
for (const f of fs.readdirSync(DATA).filter(f => /^(hv_|buero_|btm_)/.test(f) && f.endsWith('.js')).sort()) {
  if (NUR && !f.includes(NUR)) continue;
  const sb = laden(f);
  if (sb._fehler) { console.log('! ' + f + ' nicht ladbar: ' + sb._fehler); continue; }
  for (const [thema, t] of Object.entries(sb.TOPICS || {})) {
    (t.steps || []).forEach((s, i) => {
      const o = ((s.data || {}).options) || [];
      if (o.length < 2) return;
      const pts = o.map(x => (typeof x.p === 'number' ? x.p : 0));
      const best = Math.max(...pts);
      messen(thema, (s.mech || '?') + ' · Schritt ' + i, o.map(x => x.t), pts.indexOf(best));
    });
  }
}

/* ---- 2 · QMS: ereignisse[].fragen[].optionen[] mit stufe:"richtig" ---- */
for (const f of fs.readdirSync(DATA).filter(f => /^qms_ch\d+\.js$/.test(f)).sort()) {
  if (NUR && !f.includes(NUR)) continue;
  const sb = { window: {} }; sb.window = sb;
  vm.createContext(sb);
  try { vm.runInContext(fs.readFileSync(path.join(DATA, f), 'utf8'), sb); }
  catch (e) { console.log('! ' + f + ' nicht ladbar: ' + e.message); continue; }
  const kap = Object.values(sb.PCQmsChapters || {})[0];
  if (!kap) continue;
  for (const ev of (kap.ereignisse || [])) for (const q of (ev.fragen || [])) {
    const o = q.optionen || [];
    if (o.length < 2) continue;
    messen('QMS ' + kap.id, ev.id + ' · ' + (q.key || '?'),
           o.map(x => (x.text && x.text.de) || ''),
           o.findIndex(x => x.stufe === 'richtig'));
  }
}

/* ---- Bericht ---- */
const reisser = treffer.filter(t => t.spreizung > MAX);
const tell = treffer.filter(t => t.laengsteIstRichtig);
console.log('Gemessene Fragen: ' + treffer.length);
console.log('Spreizung ueber ' + Math.round(MAX * 100) + '%: ' + reisser.length +
            ' (' + pct(reisser.length, treffer.length) + ')');
console.log('Richtige Option ist die eindeutig laengste: ' + tell.length +
            ' (' + pct(tell.length, treffer.length) + ')');

if (reisser.length) {
  console.log('\nDie 20 schlimmsten:');
  reisser.sort((a, b) => b.spreizung - a.spreizung).slice(0, 20).forEach(t =>
    console.log('  ' + String(Math.round(t.spreizung * 100) + '%').padStart(6) +
                '  ' + String(t.mn + '→' + t.mx).padStart(9) +
                '  ' + t.quelle + '  ' + t.id +
                (t.laengsteIstRichtig ? '   [laengste = richtig]' : '')));
}
function pct(a, b) { return b ? Math.round(a / b * 100) + '%' : '-'; }
process.exit(reisser.length ? 1 : 0);
