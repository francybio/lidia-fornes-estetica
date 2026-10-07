/* ==========================================================
   ESTÈTICA LÍDIA FORNÉS — interacción
   ========================================================== */
(() => {
'use strict';

/* ----------------------------------------------------------
   DATOS
---------------------------------------------------------- */
const WA_NUMBER = '34601926591';
// minutos desde medianoche · 0 = domingo
const HOURS = {
  0: null,
  1: [[540, 780], [900, 1140]],
  2: [[540, 780], [900, 1140]],
  3: [[540, 780], [900, 1140]],
  4: [[540, 780], [900, 1140]],
  5: [[540, 1140]],
  6: null
};
const DAY_NAMES = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

const CARTA = [
  { id: 'faciales', name: 'Faciales', img: 'cabina_2.jpg', items: [
    ['Higiene completa', 45], ['Regenerador celular (peeling)', 60], ['Oxigenante con ácido hialurónico', 55],
    ['Antiacné y piel grasa', 50], ['Antiedad redensificante', 80], ['Despigmentante iluminador', 55],
    ['Antioxidante vitamina C', 65], ['Radiofrecuencia + concentrado específico', 50] ] },
  { id: 'corporales', name: 'Corporales', img: 'cabina_96.jpg', items: [
    ['Exfoliante + hidratación', 50], ['Reductor con aparatología', 50], ['Remodelante lipolítico', 60],
    ['Masaje relajante 30′', 30], ['Masaje relajante 60′', 50] ] },
  { id: 'manicura', name: 'Manicura', img: 'cabina_30.jpg', items: [
    ['Cortar + limar + cutícula', 12], ['Básica + esmaltado tradicional', 15], ['Semipermanente', 22],
    ['Refuerzo con gel', 25], ['Extensión con gel', 30], ['Parafina (manos)', 10] ] },
  { id: 'pedicura', name: 'Pedicura', img: 'cabina_36.jpg', items: [
    ['Cortar + limar + cutícula', 12], ['Básica + esmaltado tradicional', 15], ['Básica + esmaltado tradicional + durezas', 30],
    ['Esmaltado semipermanente', 22], ['Completa + esmaltado semipermanente', 32], ['Parafina (pies)', 12] ] },
  { id: 'cejas', name: 'Cejas & pestañas', img: 'cabina_76.jpg', items: [
    ['Lifting de pestañas', 40], ['Tinte de pestañas', 16], ['Laminado de cejas + diseño', 30], ['Tinte de cejas + diseño', 16] ] },
  { id: 'cera', name: 'Depilación con cera', img: 'cabina_51.jpg', items: [
    ['Labio superior', 5], ['Cejas', 9], ['Labio superior + cejas', 12], ['Medias piernas', 15], ['Piernas completas', 24],
    ['Brazos', 15], ['Axilas', 10], ['Ingles brasileñas', 12], ['Pubis completo + perianal', 18] ] }
];

const FACE = [
  { k: 'entrecejo', n: 'Entrecejo', p: 5 },
  { k: 'labio', n: 'Labio superior', p: 9 },
  { k: 'menton', n: 'Mentón', p: 10 },
  { k: 'pomulos', n: 'Pómulos', p: 10 },
  { k: 'patillas', n: 'Patillas', p: 10 },
  { k: 'facial', n: 'Facial completo', p: 13 },
  { k: 'barba', n: 'Barba', p: 15, male: true }
];
const ZONES = {
  axilas: { n: 'Axilas', p: 14 },
  pecho: { n: 'Pecho', p: 18 },
  abdomen: { n: 'Abdomen', p: 18 },
  lineaalba: { n: 'Línea alba', p: 6 },
  nuca: { n: 'Nuca', p: 12 },
  dorsal: { n: 'Dorsal', p: 15 },
  lumbar: { n: 'Lumbar', p: 15 },
  gluteos: { n: 'Glúteos', p: 20 },
  perianal: { n: 'Perianal', p: 10 },
  brazos: { lv: [null, { n: 'Medios brazos', p: 15 }, { n: 'Brazos completos', p: 18 }] },
  piernas: { lv: [null, { n: 'Medias piernas', p: 20 }, { n: 'Piernas completas', p: 40 }] },
  ingles: { lv: [null, { n: 'Ingles brasileñas', p: 15 }, { n: 'Pubis completo', p: 20 }] }
};
const PACKS = [
  { id: 'p1', n: 'Pecho + abdomen', p: 28, sel: { pecho: 1, abdomen: 1 } },
  { id: 'p2', n: 'Piernas + ingles + axilas', p: 65, sel: { piernas: 2, ingles: 1, axilas: 1 } },
  { id: 'p3', n: 'Axilas + pubis + perianal', p: 35, sel: { axilas: 1, ingles: 2, perianal: 1 } },
  { id: 'p4', n: 'Cuerpo completo mujer', p: 85, fixed: true },
  { id: 'p5', n: 'Cuerpo completo hombre', p: 100, fixed: true }
];
const TIERS = [[90, .20], [80, .14], [70, .10], [60, .05]];

// c = título del paso · d = explicación corta (catalán e inglés en i18n.js → steps)
const STEPS = [
  { src: 'cabina_2.jpg', c: 'Limpieza y masaje para preparar la piel', d: 'Retiramos el maquillaje y la suciedad del día con un limpiador suave. Un masaje ligero relaja la piel y la prepara para lo que viene.' },
  { src: 'cabina_30.jpg', c: 'Sérum aplicado gota a gota', d: 'Ponemos unas gotas de sérum, un concentrado que hidrata y nutre. Lo extendemos con las yemas de los dedos hasta que la piel lo absorbe.' },
  { src: 'cabina_36.jpg', c: 'Drenaje suave de cuello y escote', d: 'Con movimientos lentos y suaves en el cuello y el escote ayudamos a deshinchar y a soltar tensión. La cara se ve más descansada.' },
  { src: 'cabina_46.jpg', c: 'Mascarilla a pincel, adaptada a tu piel', d: 'Elegimos la mascarilla según lo que necesite tu piel (hidratar, calmar o purificar) y la aplicamos con pincel. La dejamos actuar unos minutos.' },
  { src: 'cabina_62.jpg', c: 'Retirada con toallas húmedas', d: 'Quitamos la mascarilla con toallas húmedas, con cuidado y sin frotar. La piel queda limpia y lista para el siguiente paso.' },
  { src: 'cabina_76.jpg', c: 'Extracción cuidadosa de impurezas', d: 'Con guantes y mucho cuidado, limpiamos los poros de puntos negros e impurezas. Así la piel respira mejor y se ve más uniforme.' },
  { src: 'cabina_41.jpg', c: 'Masaje relajante de cuello y hombros', d: 'Un masaje para soltar la tensión que acumulamos en el cuello y los hombros. Es el momento de desconectar del todo.' },
  { src: 'cabina_96.jpg', c: 'Masaje final: ese efecto buena cara', d: 'Terminamos con la crema adecuada para tu piel y un último masaje facial. Sales con la piel luminosa, hidratada y con cara de descanso.' }
];
const STORIES = [
  { src: 'DUQtpjYjNts_0.jpg', w: 'Febrero' }, { src: 'DUQtpjYjNts_1.jpg', w: 'Febrero' },
  { src: 'DVYQGoLFyph_0.jpg', w: 'Marzo' }, { src: 'DVYQGoLFyph_1.jpg', w: 'Marzo' },
  { src: 'DWmSH3yDuI9_0.jpg', w: 'Abril' }, { src: 'DX8xKnaun8d_0.jpg', w: 'Mayo' },
  { src: 'DZCev7FOLhl_0.jpg', w: 'Junio' }, { src: 'DbnDiDKOIC2_0.jpg', w: 'Agosto' },
  { src: 'Dcvcu5Eu2U1_0.jpg', w: 'Septiembre' }, { src: 'DOGA7NiDJd6_0.jpg', w: 'Láser' }
];

/* ----------------------------------------------------------
   UTILIDADES
---------------------------------------------------------- */
const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const IMG = f => 'assets/img/' + f;
const eur = n => (Math.round(n * 100) / 100).toLocaleString('es-ES', { minimumFractionDigits: Number.isInteger(Math.round(n * 100) / 100) ? 0 : 2, maximumFractionDigits: 2 }) + '€';
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const hasGsap = typeof window.gsap !== 'undefined';
const store = {
  get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* sin almacenamiento */ } }
};
const waLink = text => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;

/* ----------------------------------------------------------
   IDIOMAS (es por defecto · ca · en) — textos en i18n.js
---------------------------------------------------------- */
const LANGS = ['es', 'ca', 'en'];
const DICT = window.LF_I18N || {};
let LANG = (() => {
  const q = new URLSearchParams(location.search).get('lang');
  if (LANGS.includes(q)) return q;
  const saved = store.get('lf-lang', 'es');
  return LANGS.includes(saved) ? saved : 'es';
})();
const fill = (str, v) => v ? str.replace(/\{(\w+)\}/g, (m, k) => (k in v ? v[k] : m)) : str;
// T: texto por clave · N: nombre de tratamiento/zona/mes (la clave es el nombre en español)
const T = (k, v) => fill((DICT[LANG] && DICT[LANG][k]) ?? (DICT.es && DICT.es[k]) ?? k, v);
const N = name => (DICT[LANG] && DICT[LANG].names && DICT[LANG].names[name]) || name;
const num = (n, dec) => n.toFixed(dec).replace('.', LANG === 'en' ? '.' : ',');
const langHooks = [];
const onLang = fn => langHooks.push(fn);
const ORIG = new Map();     // texto original (español) de cada elemento traducible
function applyLang() {
  const d = LANG === 'es' ? {} : (DICT[LANG] || {});
  document.documentElement.lang = LANG;
  $$('[data-i18n]').forEach(el => {
    if (!ORIG.has(el)) ORIG.set(el, el.innerHTML);
    el.innerHTML = d[el.dataset.i18n] ?? ORIG.get(el);
  });
  $$('[data-i18n-attr]').forEach(el => {
    el.dataset.i18nAttr.split(';').forEach(pair => {
      const [attr, key] = pair.split(':');
      const id = 'attr:' + attr;
      if (!el[id]) el[id] = el.getAttribute(attr) || '';
      el.setAttribute(attr, d[key] ?? el[id]);
    });
  });
  $$('[data-lang]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.lang === LANG)));
}
function setLang(l) {
  if (!LANGS.includes(l) || l === LANG) return;
  LANG = l;
  store.set('lf-lang', l);
  try {
    const u = new URL(location.href);
    if (l === 'es') u.searchParams.delete('lang'); else u.searchParams.set('lang', l);
    history.replaceState(null, '', u);
  } catch (e) { /* sin history */ }
  applyLang();
  langHooks.forEach(fn => fn());
}
function setupLang() {
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-lang]');
    if (b) setLang(b.dataset.lang);
  });
  applyLang();
}

let toastT;
function toast(msg) {
  const t = $('.toast');
  t.textContent = msg;
  t.classList.add('is-show');
  clearTimeout(toastT);
  toastT = setTimeout(() => t.classList.remove('is-show'), 2600);
}

/* ----------------------------------------------------------
   HORARIO + ESTADO
---------------------------------------------------------- */
function madridNow() {
  const p = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Madrid', weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(new Date());
  const get = t => p.find(x => x.type === t).value;
  const wd = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'));
  return { d: wd, m: parseInt(get('hour'), 10) * 60 + parseInt(get('minute'), 10) };
}
const hhmm = m => `${Math.floor(m / 60)}:${String(m % 60).padStart(2, '0')}`;
const dayName = i => ((DICT[LANG] && DICT[LANG].days) || DAY_NAMES)[i];
function getStatus() {
  const { d, m } = madridNow();
  const today = HOURS[d];
  if (today) {
    for (const [a, b] of today) if (m >= a && m < b) return { open: true, text: T('status.open', { t: hhmm(b) }) };
    const next = today.find(([a]) => m < a);
    if (next) return { open: false, text: T('status.opensAt', { t: hhmm(next[0]) }) };
  }
  for (let i = 1; i <= 7; i++) {
    const nd = (d + i) % 7;
    if (!HOURS[nd]) continue;
    const t = hhmm(HOURS[nd][0][0]);
    if (i === 1) return { open: false, text: T('status.opensTomorrow', { t }) };
    const day = dayName(nd);
    return { open: false, text: T('status.opensDay', { t, d: LANG === 'en' ? day : day.toLowerCase() }) };
  }
  return { open: false, text: T('status.closed') };
}
function renderStatus() {
  const s = getStatus();
  $$('[data-status]').forEach(el => {
    el.classList.toggle('is-open', s.open);
    $('.status__text', el).textContent = s.text;
  });
}
function renderHours() {
  const { d } = madridNow();
  const order = [1, 2, 3, 4, 5, 6, 0];
  $('.hours').innerHTML = order.map(i => {
    const h = HOURS[i];
    const txt = h ? h.map(([a, b]) => `${hhmm(a)}–${hhmm(b)}`).join(' · ') : T('status.closed');
    return `<li class="${i === d ? 'is-today' : ''}"><span>${dayName(i)}</span><span>${txt}</span></li>`;
  }).join('');
}

/* ----------------------------------------------------------
   WHATSAPP
---------------------------------------------------------- */
function setupWa() {
  const href = waLink(T('wa.hello'));
  $$('[data-wa]').forEach(a => a.setAttribute('href', href));
}

/* ----------------------------------------------------------
   MI CITA (bolsa)
---------------------------------------------------------- */
let bag = store.get('lf-bag', []);
function bagSave() { store.set('lf-bag', bag); }
// cada línea guarda de dónde sale (src) para poder mostrarla en el idioma elegido
function itemText(i) {
  const s = i.src;
  if (s && s.t === 'c') {
    const c = CARTA[s.c], it = c && c.items[s.i];
    if (it) return { name: N(it[0]), note: N(c.name) };
  }
  if (s && s.t === 'promo') return { name: T('promo.bagName'), note: T('promo.bagNote') };
  if (s && s.t === 'laser') {
    const pack = s.pack && PACKS.find(p => p.id === s.pack);
    const zones = s.z.map(N).join(', ');
    if (pack) return { name: T('laser.bagPack', { n: N(pack.n) }), note: pack.fixed ? T('laser.fixedPackLower') : zones };
    return { name: T('laser.bagCustom'), note: zones + (s.rate ? ` · −${Math.round(s.rate * 100)}%` : '') };
  }
  return { name: i.name || '', note: i.note || '' };
}
function bagAdd(item, silent) {
  const entry = { id: item.id || ('i' + Date.now() + Math.random().toString(16).slice(2, 6)), price: item.price, src: item.src || null };
  Object.assign(entry, itemText(Object.assign({}, item, entry)));
  bag.push(entry);
  bagSave(); renderBag();
  const b = $('.bagbtn'); b.classList.remove('bump'); void b.offsetWidth; b.classList.add('bump');
  if (!silent) toast(T('toast.added', { n: entry.name }));
}
function bagRemove(id) { bag = bag.filter(i => i.id !== id); bagSave(); renderBag(); syncCartaButtons(); }
function renderBag() {
  const list = $('[data-bag-list]');
  const n = bag.length;
  $$('[data-bag-count]').forEach(el => el.textContent = n);
  $('.bagbtn').classList.toggle('has-items', n > 0);
  if (!n) {
    list.innerHTML = `<li class="bag__empty">${T('bag.empty')}</li>`;
  } else {
    list.innerHTML = bag.map(i => { const x = itemText(i); return `<li><div>${x.name}${x.note ? `<small>${x.note}</small>` : ''}</div><strong>${eur(i.price)}</strong><button type="button" data-rm="${i.id}" aria-label="${T('bag.removeItem', { n: x.name })}">×</button></li>`; }).join('');
  }
  const total = bag.reduce((s, i) => s + i.price, 0);
  $('[data-bag-total]').textContent = eur(total);
  const lines = bag.map(i => { const x = itemText(i); return `• ${x.name}${x.note ? ` (${x.note})` : ''} — ${eur(i.price)}`; }).join('\n');
  const msg = n ? T('wa.bag', { lines, total: eur(total) }) : T('wa.hello');
  const send = $('[data-bag-send]');
  send.setAttribute('href', waLink(msg));
  send.classList.toggle('is-disabled', !n);
}
function setBag(open) {
  $('.bag').classList.toggle('is-open', open);
  $('.bag').setAttribute('aria-hidden', String(!open));
  if (window.__lenis) open ? window.__lenis.stop() : window.__lenis.start();
}
function setupBag() {
  $$('[data-bag-open]').forEach(b => b.addEventListener('click', () => setBag(true)));
  $$('[data-bag-close]').forEach(b => b.addEventListener('click', () => setBag(false)));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setBag(false); });
  $('[data-bag-list]').addEventListener('click', e => {
    const b = e.target.closest('[data-rm]');
    if (b) bagRemove(b.dataset.rm);
  });
  renderBag();
}

/* ----------------------------------------------------------
   CARTA
---------------------------------------------------------- */
let cartaCat = 0;
function cartaId(c, i) { return `c-${CARTA[c].id}-${i}`; }
function syncCartaButtons() {
  $$('.mrow__add').forEach(b => {
    const on = bag.some(x => x.id === b.dataset.id);
    b.classList.toggle('is-in', on);
    b.setAttribute('aria-label', on ? T('bag.removeAria') : T('bag.add'));
  });
}
function renderCarta(animateImg) {
  const cat = CARTA[cartaCat];
  $$('.tab').forEach((t, i) => t.setAttribute('aria-selected', String(i === cartaCat)));
  $('[data-menu-list]').innerHTML = cat.items.map(([n, p], i) => `
    <li class="mrow" style="animation-delay:${i * 55}ms">
      <span class="mrow__name">${N(n)}</span>
      <span class="mrow__price">${p}€</span>
      <button type="button" class="mrow__add" data-id="${cartaId(cartaCat, i)}" data-i="${i}" aria-label="${T('bag.add')}"><svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg></button>
    </li>`).join('');
  $('[data-carta-cat]').textContent = N(cat.name);
  const img = $('[data-carta-img]');
  img.alt = N(cat.name);
  if (animateImg) {
    img.classList.add('is-swap');
    setTimeout(() => { img.src = IMG(cat.img); img.onload = () => img.classList.remove('is-swap'); }, 280);
  }
  syncCartaButtons();
}
function renderTabs() {
  $('.tabs').innerHTML = CARTA.map((c, i) => `<button class="tab" role="tab" type="button" data-i="${i}">${N(c.name)} <b>${c.items.length}</b></button>`).join('');
}
function setupCarta() {
  renderTabs();
  onLang(() => { renderTabs(); renderCarta(false); });
  $('.tabs').addEventListener('click', e => {
    const t = e.target.closest('.tab');
    if (!t || +t.dataset.i === cartaCat) return;
    cartaCat = +t.dataset.i;
    renderCarta(true);
  });
  $('[data-menu-list]').addEventListener('click', e => {
    const b = e.target.closest('.mrow__add');
    if (!b) return;
    const id = b.dataset.id;
    if (bag.some(x => x.id === id)) { bagRemove(id); return; }
    const [, p] = CARTA[cartaCat].items[+b.dataset.i];
    bagAdd({ id, price: p, src: { t: 'c', c: cartaCat, i: +b.dataset.i } });
    syncCartaButtons();
  });
  renderCarta(false);
}

/* ----------------------------------------------------------
   RASCA Y GANA
---------------------------------------------------------- */
function setupScratch() {
  const wrap = $('.scratch');
  const cv = $('.scratch__foil');
  const ctx = cv.getContext('2d');
  const addBtn = $('[data-promo-add]');
  let drawing = false, last = null, done = false, moves = 0, dpr = 1;

  function paint() {
    const r = wrap.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    cv.width = r.width * dpr; cv.height = r.height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const g = ctx.createLinearGradient(0, 0, r.width, r.height);
    g.addColorStop(0, '#CDB7D6'); g.addColorStop(.35, '#F2C6DE'); g.addColorStop(.6, '#E3D6EA'); g.addColorStop(1, '#B990C0');
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = g; ctx.fillRect(0, 0, r.width, r.height);
    // brillo y motivo
    ctx.globalAlpha = .18; ctx.fillStyle = '#fff';
    for (let i = 0; i < 70; i++) { ctx.beginPath(); ctx.arc(Math.random() * r.width, Math.random() * r.height, Math.random() * 2.4 + .4, 0, 7); ctx.fill(); }
    ctx.globalAlpha = .55; ctx.fillStyle = '#5B1F55';
    ctx.font = `400 ${Math.max(26, r.width / 14)}px 'Pinyon Script', cursive`;
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(T('promo.foil1'), r.width / 2, r.height / 2 - 6);
    ctx.globalAlpha = .45; ctx.font = `700 12px Quicksand, sans-serif`;
    ctx.fillText(T('promo.foil2'), r.width / 2, r.height / 2 + r.width / 18);
    ctx.globalAlpha = 1;
  }
  function pos(e) { const r = cv.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; }
  function scratchAt(p) {
    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineWidth = 46; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    ctx.beginPath();
    if (last) { ctx.moveTo(last.x, last.y); ctx.lineTo(p.x, p.y); ctx.stroke(); }
    ctx.arc(p.x, p.y, 23, 0, Math.PI * 2); ctx.fill();
    last = p;
    if (++moves % 8 === 0) check();
  }
  function check() {
    const { width: w, height: h } = cv;
    const data = ctx.getImageData(0, 0, w, h).data;
    let clear = 0, total = 0;
    for (let i = 3; i < data.length; i += 4 * 24) { total++; if (data[i] < 40) clear++; }
    if (clear / total > .5) reveal();
  }
  function reveal() {
    if (done) return;
    done = true;
    wrap.classList.add('is-done', 'is-touched');
    addBtn.classList.remove('is-disabled');
    const fl = $('[data-flip]'); if (fl) fl.classList.add('is-flipped');
    toast(T('promo.revealed'));
    burstPetals(wrap);
  }
  cv.addEventListener('pointerdown', e => { if (done) return; drawing = true; wrap.classList.add('is-touched'); last = null; cv.setPointerCapture(e.pointerId); scratchAt(pos(e)); });
  cv.addEventListener('pointermove', e => { if (drawing) scratchAt(pos(e)); });
  ['pointerup', 'pointercancel', 'pointerleave'].forEach(t => cv.addEventListener(t, () => { drawing = false; last = null; }));
  $('[data-promo-reveal]').addEventListener('click', reveal);
  addBtn.addEventListener('click', () => {
    if (bag.some(x => x.id === 'promo-oct')) { toast(T('promo.already')); return; }
    bagAdd({ id: 'promo-oct', price: 55, src: { t: 'promo' } });
  });
  onLang(() => { if (!done) paint(); });
  const ro = new ResizeObserver(() => { if (!done) paint(); });
  ro.observe(wrap);
  if (document.fonts) document.fonts.ready.then(() => { if (!done) paint(); });
}

function burstPetals(el) {
  if (reduce) return;
  const r = el.getBoundingClientRect();
  for (let i = 0; i < 26; i++) {
    const p = document.createElement('span');
    const s = 8 + Math.random() * 12;
    p.style.cssText = `position:fixed;z-index:95;pointer-events:none;left:${r.left + r.width / 2}px;top:${r.top + r.height / 2}px;width:${s}px;height:${s * 1.4}px;border-radius:50% 50% 50% 0;background:${['#F2C6DE', '#B45AA0', '#E7DFEB', '#7A3A72'][i % 4]};transform:translate(-50%,-50%)`;
    document.body.appendChild(p);
    const a = Math.random() * Math.PI * 2, d = 120 + Math.random() * 220;
    p.animate([
      { transform: 'translate(-50%,-50%) rotate(0deg)', opacity: 1 },
      { transform: `translate(${Math.cos(a) * d - 50}%, ${Math.sin(a) * d + 160}px) rotate(${Math.random() * 720}deg)`, opacity: 0 }
    ], { duration: 1400 + Math.random() * 800, easing: 'cubic-bezier(.2,.7,.1,1)' }).onfinish = () => p.remove();
  }
}

/* ----------------------------------------------------------
   MAPA LÁSER
---------------------------------------------------------- */
const L = { face: new Set(), z: {}, fixed: null, sex: 'mujer', view: 'front' };
function laserItems() {
  if (L.fixed) return [{ n: L.fixed.n, p: L.fixed.p }];
  const out = [];
  FACE.forEach(f => { if (L.face.has(f.k)) out.push({ n: f.n, p: f.p }); });
  Object.entries(L.z).forEach(([k, v]) => {
    if (!v) return;
    const z = ZONES[k];
    if (z.lv) out.push({ n: z.lv[v].n, p: z.lv[v].p });
    else out.push({ n: z.n, p: z.p });
  });
  // dorsal + lumbar = espalda completa (30€)
  const iD = out.findIndex(o => o.n === 'Dorsal'), iL = out.findIndex(o => o.n === 'Lumbar');
  if (iD > -1 && iL > -1) {
    out.splice(Math.max(iD, iL), 1); out.splice(Math.min(iD, iL), 1);
    out.push({ n: 'Espalda completa', p: 30 });
  }
  return out;
}
function laserMatchPack() {
  if (L.fixed || L.face.size) return null;
  const active = Object.entries(L.z).filter(([, v]) => v);
  return PACKS.find(p => p.sel && Object.keys(p.sel).length === active.length && active.every(([k, v]) => p.sel[k] === v)) || null;
}
function laserCalc() {
  const items = laserItems();
  const sub = items.reduce((s, i) => s + i.p, 0);
  if (L.fixed) return { items, sub, total: L.fixed.p, rate: 0, pack: L.fixed };
  const pack = laserMatchPack();
  if (pack) return { items, sub, total: pack.p, rate: 0, pack };
  const t = TIERS.find(([min]) => sub >= min);
  const rate = t ? t[1] : 0;
  return { items, sub, total: sub * (1 - rate), rate, pack: null };
}
let tipT;
function laserTip(text) {
  const t = $('.body__tip');
  t.textContent = text; t.classList.add('is-show');
  clearTimeout(tipT); tipT = setTimeout(() => t.classList.remove('is-show'), 1500);
}
function renderLaser() {
  // figura
  $$('.figure .z').forEach(el => {
    const k = el.dataset.z;
    let on = false, lvl2 = false;
    if (k === 'facial') on = L.face.size > 0;
    else if (k === 'brazos' || k === 'piernas') { const v = L.z[k] || 0; on = el.dataset.part === 'low' ? v >= 1 : v === 2; }
    else if (k === 'ingles') { const v = L.z[k] || 0; on = v >= 1; lvl2 = v === 2; }
    else on = !!L.z[k];
    if (L.fixed) on = !['facial'].includes(k) || on;
    el.classList.toggle('is-on', on);
    el.classList.toggle('lvl2', lvl2);
  });
  // chips faciales
  $$('[data-face-chips] .chip').forEach(c => {
    c.classList.toggle('is-on', L.face.has(c.dataset.k));
    c.hidden = c.dataset.male === '1' && L.sex !== 'hombre';
  });
  // packs
  const calc = laserCalc();
  $$('.pack').forEach(b => b.classList.toggle('is-on', !!calc.pack && calc.pack.id === b.dataset.id));
  // ticket
  const list = $('[data-pack-list]');
  list.innerHTML = calc.items.length
    ? calc.items.map((i, n) => `<li style="animation-delay:${n * 40}ms"><span>${N(i.n)}</span><span>${eur(i.p)}</span></li>`).join('')
    : `<li class="ticket__empty">${T('laser.empty')}</li>`;
  $('[data-sub]').textContent = eur(calc.sub);
  $('[data-pack-badge]').hidden = !calc.pack;
  if (calc.pack) {
    $('[data-disc-label]').textContent = T('laser.fixedPrice');
    $('[data-disc]').textContent = calc.sub > calc.total ? `−${eur(calc.sub - calc.total)}` : '✓';
  } else {
    $('[data-disc-label]').textContent = calc.rate ? T('laser.discountPct', { p: Math.round(calc.rate * 100) }) : T('laser.discount');
    $('[data-disc]').textContent = calc.rate ? `−${eur(calc.sub * calc.rate)}` : '—';
  }
  $('[data-total]').textContent = eur(calc.total);
  // escalones
  const pct = Math.min(calc.sub / 100, 1) * 100;
  $('[data-tier-fill]').style.width = pct + '%';
  $$('.tiers__marks span').forEach((s, i) => s.classList.toggle('is-hit', calc.sub >= [60, 70, 80, 90][i]));
  let msg;
  if (calc.pack) msg = T('laser.msgPack', { n: N(calc.pack.n) });
  else if (!calc.sub) msg = T('laser.msgStart');
  else {
    const next = [...TIERS].reverse().find(([min]) => calc.sub < min);
    msg = next ? T('laser.msgNext', { a: eur(next[0] - calc.sub), p: Math.round(next[1] * 100) }) : T('laser.msgMax');
  }
  $('[data-tier-msg]').textContent = msg;
  $('[data-laser-add]').classList.toggle('is-disabled', !calc.items.length);
}
function renderLaserLabels() {
  $('[data-face-chips]').innerHTML = FACE.map(f => `<button type="button" class="chip" data-k="${f.k}" data-male="${f.male ? 1 : 0}">${N(f.n)} <b>${f.p}€</b></button>`).join('');
  $('[data-packs]').innerHTML = PACKS.map(p => `<button type="button" class="pack" data-id="${p.id}">${N(p.n)}<b>${p.p}€</b></button>`).join('');
}
function setupLaser() {
  const fig = $('.figure');
  renderLaserLabels();
  onLang(() => { renderLaserLabels(); renderLaser(); });

  fig.addEventListener('click', e => {
    const el = e.target.closest('.z');
    if (!el) return;
    L.fixed = null;
    const k = el.dataset.z;
    let label = '';
    if (k === 'facial') {
      if (L.face.has('facial')) { L.face.delete('facial'); label = T('laser.tipRemoved', { n: N('Facial completo') }); }
      else { ['entrecejo', 'labio', 'menton', 'pomulos', 'patillas'].forEach(x => L.face.delete(x)); L.face.add('facial'); label = `${N('Facial completo')} · 13€`; }
    } else if (k === 'brazos' || k === 'piernas') {
      const want = el.dataset.part === 'low' ? 1 : 2;
      L.z[k] = L.z[k] === want ? 0 : want;
      label = L.z[k] ? `${N(ZONES[k].lv[L.z[k]].n)} · ${ZONES[k].lv[L.z[k]].p}€` : T('laser.tipRemoved', { n: N(k === 'brazos' ? 'Brazos' : 'Piernas') });
    } else if (k === 'ingles') {
      L.z[k] = ((L.z[k] || 0) + 1) % 3;
      label = L.z[k] ? `${N(ZONES[k].lv[L.z[k]].n)} · ${ZONES[k].lv[L.z[k]].p}€${L.z[k] === 1 ? T('laser.tipAgain') : ''}` : T('laser.tipRemoved', { n: N('Ingles') });
    } else {
      L.z[k] = L.z[k] ? 0 : 1;
      label = L.z[k] ? `${N(ZONES[k].n)} · ${ZONES[k].p}€` : T('laser.tipRemoved', { n: N(ZONES[k].n) });
    }
    $$(`.figure [data-z="${k}"]`).forEach(z => { z.classList.remove('pop'); void z.getBoundingClientRect(); z.classList.add('pop'); });
    laserTip(label);
    renderLaser();
  });
  $('[data-face-chips]').addEventListener('click', e => {
    const c = e.target.closest('.chip');
    if (!c) return;
    L.fixed = null;
    const k = c.dataset.k;
    if (L.face.has(k)) L.face.delete(k);
    else {
      if (k === 'facial') ['entrecejo', 'labio', 'menton', 'pomulos', 'patillas'].forEach(x => L.face.delete(x));
      else if (k !== 'barba') L.face.delete('facial');
      L.face.add(k);
    }
    renderLaser();
  });
  $('[data-packs]').addEventListener('click', e => {
    const b = e.target.closest('.pack');
    if (!b) return;
    const p = PACKS.find(x => x.id === b.dataset.id);
    L.face.clear(); L.z = {}; L.fixed = null;
    if (p.fixed) {
      L.fixed = p;
      if (p.id === 'p5') setSex('hombre'); else setSex('mujer');
    } else {
      Object.assign(L.z, p.sel);
      setView('front');
    }
    renderLaser();
  });
  function setView(v) {
    L.view = v;
    $$('[data-view]').forEach(b => b.classList.toggle('is-active', b.dataset.view === v));
    fig.classList.toggle('is-back', v === 'back');
    fig.classList.remove('flip'); void fig.getBoundingClientRect(); fig.classList.add('flip');
  }
  const SHAPES = {
    mujer: ['M112,110 C130,104 170,104 188,110 C200,114 206,124 204,138 C202,160 196,180 194,200 L106,200 C104,180 98,160 96,138 C94,124 100,114 112,110 Z',
            'M106,204 L194,204 C188,222 188,242 200,262 L100,262 C112,242 112,222 106,204 Z'],
    hombre: ['M106,110 C128,103 172,103 194,110 C208,114 212,126 210,142 C207,166 203,186 201,200 L99,200 C97,186 93,166 90,142 C88,126 92,114 106,110 Z',
             'M101,204 L199,204 C197,226 198,246 199,262 L101,262 C102,246 103,226 101,204 Z']
  };
  function setSex(s) {
    L.sex = s;
    const [up, low] = SHAPES[s];
    $$('.figure [data-z="pecho"], .figure [data-z="dorsal"]').forEach(p => p.setAttribute('d', up));
    $$('.figure [data-z="abdomen"], .figure [data-z="lumbar"]').forEach(p => p.setAttribute('d', low));
    $$('[data-sex]').forEach(b => b.classList.toggle('is-active', b.dataset.sex === s));
    if (s !== 'hombre') L.face.delete('barba');
    renderLaser();
  }
  $$('[data-view]').forEach(b => b.addEventListener('click', () => setView(b.dataset.view)));
  $$('[data-sex]').forEach(b => b.addEventListener('click', () => setSex(b.dataset.sex)));
  $('[data-laser-clear]').addEventListener('click', () => { L.face.clear(); L.z = {}; L.fixed = null; renderLaser(); });
  $('[data-laser-add]').addEventListener('click', () => {
    const c = laserCalc();
    if (!c.items.length) return;
    bagAdd({ price: Math.round(c.total * 100) / 100, src: { t: 'laser', pack: c.pack ? c.pack.id : null, z: c.items.map(i => i.n), rate: c.rate } });
  });
  setSex('mujer');
}

/* ----------------------------------------------------------
   CARRUSEL 3D (cabina)
---------------------------------------------------------- */
function setupCoverflow() {
  const root = $('[data-cf]');
  const track = $('[data-cf-track]');
  const n = STEPS.length;
  let cur = 0, timer = null, hover = false;
  const stepText = i => (DICT[LANG] && DICT[LANG].steps && DICT[LANG].steps[i]) || STEPS[i];
  const stepNo = i => String(i + 1).padStart(2, '0');
  track.innerHTML = STEPS.map((s, i) => `<figure class="cf__card" data-i="${i}"><img src="${IMG(s.src)}" alt="" loading="lazy" draggable="false"><span class="cf__step"></span></figure>`).join('');
  const cards = $$('.cf__card', track);
  const title = $('[data-cf-caption]'), desc = $('[data-cf-desc]');
  let shown = -1;
  function labels() {
    cards.forEach((c, i) => { $('img', c).alt = stepText(i).c; $('.cf__step', c).textContent = T('cf.step', { n: stepNo(i) }); });
  }
  function caption(force) {
    if (cur === shown && !force) return;
    shown = cur;
    title.textContent = stepText(cur).c;
    desc.textContent = stepText(cur).d;
    if (!reduce && title.animate) [title, desc].forEach((el, k) => el.animate([{ opacity: 0, transform: 'translateY(8px)' }, { opacity: 1, transform: 'none' }], { duration: 500, delay: k * 70, easing: 'cubic-bezier(.2,.7,.1,1)', fill: 'backwards' }));
  }
  labels();
  onLang(() => { labels(); caption(true); });
  $('[data-cf-n]').textContent = stepNo(n - 1);
  function layout() {
    const w = root.clientWidth;
    const spread = Math.min(w * .36, 420);
    cards.forEach((c, i) => {
      let d = i - cur;
      if (d > n / 2) d -= n; if (d < -n / 2) d += n;
      const a = Math.abs(d);
      c.style.transform = `translate(-50%,-50%) translateX(${d * spread}px) translateZ(${-a * 220}px) rotateY(${-d * 24}deg) scale(${1 - Math.min(a, 3) * .06})`;
      c.style.opacity = a > 2 ? 0 : 1 - a * .22;
      c.style.filter = a ? `saturate(${1 - a * .25}) brightness(${1 - a * .08})` : 'none';
      c.style.zIndex = 50 - a;
      c.style.pointerEvents = a > 2 ? 'none' : 'auto';
    });
    $('[data-cf-i]').textContent = stepNo(cur);
    caption();
  }
  const go = i => { cur = (i + n) % n; layout(); };
  const play = () => { stop(); if (!reduce) timer = setInterval(() => { if (!hover && !document.hidden) go(cur + 1); }, 4200); };
  const stop = () => clearInterval(timer);
  $('[data-cf-prev]').addEventListener('click', () => { go(cur - 1); play(); });
  $('[data-cf-next]').addEventListener('click', () => { go(cur + 1); play(); });
  root.addEventListener('keydown', e => { if (e.key === 'ArrowLeft') { go(cur - 1); play(); } if (e.key === 'ArrowRight') { go(cur + 1); play(); } });
  root.addEventListener('mouseenter', () => hover = true);
  root.addEventListener('mouseleave', () => hover = false);
  let sx = null, moved = false;
  root.addEventListener('pointerdown', e => { sx = e.clientX; moved = false; root.classList.add('is-drag'); });
  window.addEventListener('pointermove', e => {
    if (sx === null) return;
    const dx = e.clientX - sx;
    if (Math.abs(dx) > 60) { go(cur + (dx < 0 ? 1 : -1)); sx = e.clientX; moved = true; play(); }
  });
  window.addEventListener('pointerup', () => { sx = null; root.classList.remove('is-drag'); });
  track.addEventListener('click', e => {
    if (moved) return;
    const c = e.target.closest('.cf__card');
    if (c && +c.dataset.i !== cur) { go(+c.dataset.i); play(); }
  });
  window.addEventListener('resize', layout);
  layout(); play();
}

/* ----------------------------------------------------------
   REEL + STORIES
---------------------------------------------------------- */
function setupReel() {
  $$('[data-reel]').forEach(r => {
    const v = $('video', r);
    const bar = $('.reel__bar span', r);
    const sync = () => {
      r.classList.toggle('is-playing', !v.paused);
      r.classList.toggle('is-sound', !v.muted);
    };
    const toggle = () => {
      if (v.paused) { v.muted = false; v.play().catch(() => { v.muted = true; v.play(); }); }
      else v.pause();
    };
    $('.reel__play', r).addEventListener('click', e => { e.stopPropagation(); toggle(); });
    v.addEventListener('click', toggle);
    $('.reel__mute', r).addEventListener('click', e => { e.stopPropagation(); v.muted = !v.muted; if (v.paused) v.play(); sync(); });
    ['play', 'pause', 'volumechange'].forEach(t => v.addEventListener(t, sync));
    v.addEventListener('timeupdate', () => { if (v.duration) bar.style.width = (v.currentTime / v.duration * 100) + '%'; });
    new IntersectionObserver(([en]) => { if (!en.isIntersecting && !v.paused) v.pause(); }, { threshold: .2 }).observe(r);
  });
}
function setupStory() {
  const root = $('[data-story]');
  const frames = $('[data-story-frames]');
  const bars = $('[data-story-bars]');
  const DUR = 4600;
  frames.innerHTML = STORIES.map((s, i) => `<img src="${IMG(s.src)}" alt="" loading="lazy" data-i="${i}">`).join('');
  bars.innerHTML = STORIES.map(() => '<i><span></span></i>').join('');
  const imgs = $$('img', frames), segs = $$('i', bars);
  const alts = () => imgs.forEach((im, k) => { im.alt = T('story.alt', { w: N(STORIES[k].w) }); });
  alts();
  onLang(() => { alts(); $('[data-story-when]').textContent = N(STORIES[cur].w); });
  let cur = 0, prog = 0, last = performance.now(), paused = true, visible = false;
  function show(i) {
    cur = (i + STORIES.length) % STORIES.length;
    imgs.forEach((im, k) => im.classList.toggle('is-on', k === cur));
    segs.forEach((s, k) => { s.classList.toggle('is-done', k < cur); $('span', s).style.width = k < cur ? '100%' : '0%'; });
    $('[data-story-when]').textContent = N(STORIES[cur].w);
    prog = 0;
  }
  function tick(now) {
    const dt = Math.min(now - last, 100); last = now;
    if (!paused && visible) {
      prog += dt;
      $('span', segs[cur]).style.width = Math.min(prog / DUR * 100, 100) + '%';
      if (prog >= DUR) show(cur + 1);
    }
    requestAnimationFrame(tick);
  }
  function setPaused(p) { paused = p; root.classList.toggle('is-paused', p); }
  $('.story__zone--prev', root).addEventListener('click', () => show(cur - 1));
  $('.story__zone--next', root).addEventListener('click', () => show(cur + 1));
  $('.story__pause', root).addEventListener('click', () => { root.dataset.manual = '1'; setPaused(!paused); });
  root.addEventListener('keydown', e => { if (e.key === 'ArrowLeft') show(cur - 1); if (e.key === 'ArrowRight') show(cur + 1); if (e.key === ' ') { e.preventDefault(); setPaused(!paused); } });
  let holdT, held = false;
  root.addEventListener('pointerdown', e => { if (e.target.closest('.story__pause')) return; holdT = setTimeout(() => { held = true; setPaused(true); }, 280); });
  const release = () => { clearTimeout(holdT); if (held) { held = false; setPaused(false); } };
  root.addEventListener('pointerup', release);
  root.addEventListener('pointerleave', release);
  new IntersectionObserver(([en]) => {
    visible = en.isIntersecting;
    if (visible && paused && !root.dataset.manual) setPaused(false);
  }, { threshold: .35 }).observe(root);
  show(0);
  requestAnimationFrame(tick);
}

/* ----------------------------------------------------------
   PÉTALOS DEL HERO
---------------------------------------------------------- */
function setupPetals() {
  const cv = $('.hero__petals');
  if (!cv || reduce) return;
  const ctx = cv.getContext('2d');
  const hero = $('.hero');
  let W = 0, H = 0, dpr = 1, petals = [], mouse = { x: -999, y: -999 }, running = true;
  const COLORS = ['#F2C6DE', '#E7C2DA', '#D9CDE0', '#F8DDEB', '#C98BBE'];
  function size() {
    const r = hero.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = r.width; H = r.height;
    cv.width = W * dpr; cv.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = W < 700 ? 14 : 26;
    petals = Array.from({ length: count }, () => mk(true));
  }
  function mk(any) {
    return { x: Math.random() * W, y: any ? Math.random() * H : -30, s: 6 + Math.random() * 10, vy: .25 + Math.random() * .6, vx: 0, r: Math.random() * 6.28, vr: (Math.random() - .5) * .02, sw: Math.random() * 6.28, c: COLORS[Math.random() * COLORS.length | 0], a: .45 + Math.random() * .45 };
  }
  function draw() {
    if (running) {
      ctx.clearRect(0, 0, W, H);
      for (const p of petals) {
        p.sw += .012; p.r += p.vr;
        const dx = p.x - mouse.x, dy = p.y - mouse.y, d2 = dx * dx + dy * dy;
        if (d2 < 14000) { const f = (14000 - d2) / 14000; p.vx += dx / Math.sqrt(d2 + 1) * f * .9; p.vr += .004 * f; }
        p.vx *= .94;
        p.x += Math.sin(p.sw) * .5 + p.vx; p.y += p.vy;
        if (p.y > H + 30 || p.x < -40 || p.x > W + 40) Object.assign(p, mk(false));
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r); ctx.globalAlpha = p.a; ctx.fillStyle = p.c;
        ctx.beginPath(); ctx.moveTo(0, -p.s); ctx.bezierCurveTo(p.s * .9, -p.s * .5, p.s * .6, p.s * .8, 0, p.s); ctx.bezierCurveTo(-p.s * .6, p.s * .8, -p.s * .9, -p.s * .5, 0, -p.s); ctx.fill();
        ctx.restore();
      }
    }
    requestAnimationFrame(draw);
  }
  hero.addEventListener('pointermove', e => { const r = hero.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; });
  hero.addEventListener('pointerleave', () => { mouse.x = mouse.y = -999; });
  new IntersectionObserver(([en]) => running = en.isIntersecting).observe(hero);
  window.addEventListener('resize', size);
  size(); draw();
}

/* ----------------------------------------------------------
   CURSOR + MAGNÉTICOS
---------------------------------------------------------- */
function setupCursor() {
  if (window.matchMedia('(hover:none), (pointer:coarse)').matches) return;
  const c = $('.cursor'), label = $('.cursor__label');
  let x = -100, y = -100, cx = x, cy = y;
  window.addEventListener('pointermove', e => { x = e.clientX; y = e.clientY; });
  (function loop() { cx += (x - cx) * .2; cy += (y - cy) * .2; c.style.transform = `translate(${cx}px,${cy}px)`; requestAnimationFrame(loop); })();
  const targets = [['[data-cf]', 'cur.drag'], ['[data-reel]', 'cur.play'], ['[data-story]', 'cur.tap'], ['.scratch', 'cur.scratch'], ['.figure', 'cur.pick']];
  targets.forEach(([sel, key]) => $$(sel).forEach(el => {
    el.addEventListener('mouseenter', () => { c.classList.add('is-big'); label.textContent = T(key); });
    el.addEventListener('mouseleave', () => c.classList.remove('is-big'));
  }));
  $$('.magnetic').forEach(b => {
    b.addEventListener('mousemove', e => { const r = b.getBoundingClientRect(); b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .18}px,${(e.clientY - r.top - r.height / 2) * .28}px)`; });
    b.addEventListener('mouseleave', () => b.style.transform = '');
  });
}

/* ----------------------------------------------------------
   MENÚ Y NAVEGACIÓN
---------------------------------------------------------- */
function setupNav() {
  const nav = $('#nav'), burger = $('.burger'), menu = $('.menu');
  const setMenu = open => {
    burger.setAttribute('aria-expanded', String(open));
    menu.classList.toggle('is-open', open);
    menu.setAttribute('aria-hidden', String(!open));
  };
  burger.addEventListener('click', () => setMenu(burger.getAttribute('aria-expanded') !== 'true'));
  $$('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (id.length < 2) return;
    const t = $(id);
    if (!t) return;
    e.preventDefault(); setMenu(false);
    if (window.__lenis) window.__lenis.scrollTo(t, { offset: -70, duration: 1.4 });
    else t.scrollIntoView({ behavior: 'smooth' });
  }));
  const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 30);
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  // enlace activo
  const links = $$('.nav__links a');
  const io = new IntersectionObserver(ens => ens.forEach(en => {
    if (en.isIntersecting) links.forEach(l => l.classList.toggle('is-active', l.getAttribute('href') === '#' + en.target.id));
  }), { rootMargin: '-45% 0px -50% 0px' });
  ['servicios', 'laser', 'promo', 'cabina', 'opiniones', 'visitanos'].forEach(id => { const s = document.getElementById(id); if (s) io.observe(s); });
}

/* ----------------------------------------------------------
   CONTADORES
---------------------------------------------------------- */
function countUp(el) {
  const to = parseFloat(el.dataset.count), dec = +(el.dataset.dec || 0), pre = el.dataset.prefix || '';
  const t0 = performance.now(), D = 1600;
  (function f(now) {
    const k = Math.min((now - t0) / D, 1), e = 1 - Math.pow(1 - k, 3);
    el.textContent = pre + num(to * e, dec);
    if (k < 1) requestAnimationFrame(f); else el.dataset.counted = '1';
  })(t0);
}
function setupCounters() {
  const io = new IntersectionObserver(ens => ens.forEach(en => { if (en.isIntersecting) { countUp(en.target); io.unobserve(en.target); } }), { threshold: .6 });
  $$('[data-count]').forEach(el => io.observe(el));
  onLang(() => $$('[data-count][data-counted]').forEach(el => { el.textContent = (el.dataset.prefix || '') + num(parseFloat(el.dataset.count), +(el.dataset.dec || 0)); }));
}

/* ----------------------------------------------------------
   SCROLL (GSAP + Lenis)
---------------------------------------------------------- */
function setupScroll() {
  if (!hasGsap || reduce) { document.body.classList.add('no-gsap'); return; }
  gsap.registerPlugin(ScrollTrigger);
  if (window.Lenis) {
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    window.__lenis = lenis;
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(t => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }
  $$('[data-reveal]').forEach(el => {
    gsap.to(el, { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%' } });
  });
  $$('[data-parallax]').forEach(el => {
    const f = parseFloat(el.dataset.parallax);
    gsap.to(el, { y: () => window.innerHeight * f * 2, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
  });
  gsap.to('.arch--main img', { scale: 1, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
  gsap.fromTo('.promo__poster', { rotate: -6 }, { rotate: 2, ease: 'none', scrollTrigger: { trigger: '.promo', start: 'top bottom', end: 'bottom top', scrub: true } });
  gsap.fromTo('.footer__sign', { xPercent: -8 }, { xPercent: 4, ease: 'none', scrollTrigger: { trigger: '.footer', start: 'top bottom', end: 'bottom bottom', scrub: true } });
}
function heroIntro() {
  if (!hasGsap || reduce) return;
  gsap.from('.hero__title .line > span', { yPercent: 110, duration: 1.3, ease: 'power4.out', stagger: .12 });
  gsap.from('.hero__text > [data-hero]', { opacity: 0, y: 24, duration: 1, ease: 'power3.out', stagger: .1, delay: .35 });
  gsap.fromTo('.arch--main', { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.6, ease: 'power4.inOut' });
  gsap.from('.arch--mini, .ring, .hero__chip', { opacity: 0, scale: .8, duration: 1, ease: 'back.out(1.6)', stagger: .12, delay: .8 });
}

/* ----------------------------------------------------------
   LOADER
---------------------------------------------------------- */
function runLoader() {
  const loader = $('.loader'), num = $('.loader__count span');
  const t0 = performance.now(), D = reduce ? 200 : 2300;
  let done = false;
  (function f(now) {
    const k = Math.min((now - t0) / D, 1);
    num.textContent = Math.round(k * 100);
    if (k < 1) requestAnimationFrame(f); else finish();
  })(t0);
  function finish() {
    if (done) return; done = true;
    document.body.classList.remove('is-loading');
    if (hasGsap && !reduce) {
      gsap.to(loader, { yPercent: -100, duration: 1.1, ease: 'power4.inOut', onComplete: () => loader.remove() });
      setTimeout(heroIntro, 250);
    } else loader.remove();
  }
  setTimeout(finish, 5000);
}

/* ----------------------------------------------------------
   INIT
---------------------------------------------------------- */
function init() {
  setupLang();
  setupWa();
  renderStatus(); renderHours(); setInterval(renderStatus, 60000);
  onLang(() => { setupWa(); renderStatus(); renderHours(); renderBag(); syncCartaButtons(); });
  setupBag();
  setupCarta();
  setupScratch();
  setupLaser();
  setupCoverflow();
  setupReel();
  setupStory();
  setupPetals();
  setupCursor();
  setupNav();
  setupCounters();
  setupScroll();
  runLoader();
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
