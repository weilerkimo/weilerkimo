/*!
 * QV 27 Grafik Zürich – Embed-Dummy: Motion-Video + interaktive variable Schrift
 * Einbinden:  <div id="qv27-kv"></div>
 *             <script src="https://DEINE-ADRESSE/qv27-embed.js" defer></script>
 * Mehrere:    <div data-qv27-kv></div>
 */
(function () {
  'use strict';
  if (window.QV27Embed) return;
  var me = document.currentScript;
  var BASE = me && me.src ? me.src.replace(/[^\/]*$/, '') : '';
  var MAT = '#17765A', MATD = '#0E5843', GRID = '#E9E27A', CUT = '#FFD200';
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Schrift: Roboto Flex (Open Font License), variabel in Stärke (wght) und Breite (wdth).
  // Für den Livebetrieb: Datei selbst hosten statt Google Fonts (Datenschutz).
  if (!document.getElementById('qv27-font')) {
    var l = document.createElement('link'); l.id = 'qv27-font'; l.rel = 'stylesheet';
    l.href = 'https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wdth,wght@8..144,25..151,100..1000&display=swap';
    document.head.appendChild(l);
  }
  if (!document.getElementById('qv27-style')) {
    var st = document.createElement('style'); st.id = 'qv27-style';
    st.textContent =
      '.qv27{position:relative;width:100%;aspect-ratio:16/9;overflow:hidden;background:' + MAT + ';container-type:inline-size;border-radius:inherit;touch-action:pan-y;-webkit-tap-highlight-color:transparent;font-family:"Roboto Flex",system-ui,sans-serif;color:' + GRID + '}' +
      '.qv27 video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block}' +
      '.qv27 .qv27-t{position:absolute;left:4cqw;right:4cqw;top:50%;transform:translateY(-58%);margin:0;font-size:11.5cqw;line-height:.9;letter-spacing:-.01em;font-weight:400;text-transform:uppercase;user-select:none;-webkit-user-select:none;white-space:nowrap;text-shadow:.35cqw .55cqw 0 ' + MATD + '}' +
      '.qv27 .qv27-t span{display:inline-block;font-variation-settings:"wght" 400,"wdth" 100;will-change:font-variation-settings}' +
      '.qv27 .qv27-l2{white-space:nowrap}' +
      '.qv27 .qv27-m{position:absolute;left:4cqw;right:4cqw;font:500 clamp(10px,1.4cqw,16px)/1.3 ui-monospace,Menlo,Consolas,monospace;display:flex;justify-content:space-between;gap:12px}' +
      '.qv27 .qv27-top{top:3.5cqw}.qv27 .qv27-bot{bottom:3.5cqw}' +
      '.qv27 .qv27-hint{color:' + CUT + ';transition:opacity .4s}' +
      '@media (max-width:480px){.qv27 .qv27-hide-s{display:none}}';
    document.head.appendChild(st);
  }

  function mount(el) {
    if (!el || el.__qv27) return; el.__qv27 = true;
    var box = document.createElement('div'); box.className = 'qv27';
    box.setAttribute('role', 'img');
    box.setAttribute('aria-label', 'Key Visual QV 27 Grafik Zürich – Abschlussfeier Donnerstag, 15. Juli 2027, 16.00 Uhr, F+F Zürich');

    var v = document.createElement('video');
    v.muted = true; v.defaultMuted = true; v.loop = true; v.playsInline = true; v.setAttribute('playsinline', ''); v.setAttribute('muted', '');
    v.setAttribute('aria-hidden', 'true'); v.preload = 'metadata'; v.poster = BASE + 'kv-poster.jpg';
    var srcEl = document.createElement('source'); srcEl.src = BASE + 'kv-loop.mp4'; srcEl.type = 'video/mp4'; v.appendChild(srcEl);
    box.appendChild(v);

    var top = document.createElement('div'); top.className = 'qv27-m qv27-top';
    top.innerHTML = '<span>Grafiker*in EFZ 2027</span><span class="qv27-hint">↔ Maus / Finger bewegen</span>';
    var bot = document.createElement('div'); bot.className = 'qv27-m qv27-bot';
    bot.innerHTML = '<span>Do 15.07.2027 · 16.00 Uhr</span><span class="qv27-hide-s">Übergabe EFZ · Abschlussfeier · Ausstellung</span><span>F+F Zürich</span>';

    var h = document.createElement('p'); h.className = 'qv27-t';
    var L = [];
    ['QV 27', 'GRAFIK ZÜRICH'].forEach(function (line, li) {
      var row = document.createElement('span'); row.className = 'qv27-l2'; row.style.display = 'block';
      line.split('').forEach(function (ch) { var s = document.createElement('span'); s.textContent = ch === ' ' ? ' ' : ch; row.appendChild(s); L.push({ el: s, line: li }); });
      h.appendChild(row);
    });
    box.appendChild(h); box.appendChild(top); box.appendChild(bot);
    el.appendChild(box);
    var hint = top.querySelector('.qv27-hint');

    // Positionen der Buchstaben (relativ zur Box) cachen
    var bw = 1, bh = 1;
    function measure() { var r = box.getBoundingClientRect(); bw = r.width || 1; bh = r.height || 1; L.forEach(function (o) { var q = o.el.getBoundingClientRect(); o.cx = q.left - r.left + q.width / 2; o.cy = q.top - r.top + q.height / 2; }); }

    var px = -1, py = -1, lastMove = -10, cur = L.map(function () { return { w: 400, d: 100 }; });
    function setP(e) { var r = box.getBoundingClientRect(); px = e.clientX - r.left; py = e.clientY - r.top; lastMove = performance.now() / 1000; hint.style.opacity = '0'; }
    box.addEventListener('pointermove', setP);
    box.addEventListener('pointerdown', setP);
    box.addEventListener('pointerleave', function () { lastMove = -10; });

    var running = false, visible = true, sizeDirty = true;
    function frame(ts) {
      if (!running) return;
      if (sizeDirty) { measure(); sizeDirty = false; }
      var t = ts / 1000, interact = t - lastMove < 1.6, R = bw * 0.22;
      L.forEach(function (o, i) {
        var tw, td;
        if (interact) { var d = Math.hypot(o.cx - px, (o.cy - py) * 1.4), k = Math.max(0, 1 - d / R); k = k * k * (3 - 2 * k); tw = 250 + 750 * k; td = 75 + 76 * k; }
        else if (reduced) { tw = o.line ? 650 : 900; td = 100; }
        else { var wv = 0.5 + 0.5 * Math.sin(t * 2.2 - i * 0.45); tw = 300 + 650 * wv; td = 80 + 50 * wv; }
        var c = cur[i]; c.w += (tw - c.w) * 0.18; c.d += (td - c.d) * 0.18;
        o.el.style.fontVariationSettings = '"wght" ' + c.w.toFixed(0) + ',"wdth" ' + c.d.toFixed(1);
      });
      if (!interact && t - lastMove > 6) hint.style.opacity = '1';
      requestAnimationFrame(frame);
    }
    function setRun(on) {
      if (on === running) return; running = on;
      if (on) { if (!reduced) { var p = v.play(); if (p && p.catch) p.catch(function () {}); } requestAnimationFrame(frame); }
      else v.pause();
    }
    function check() { setRun(visible && !document.hidden); }
    if ('IntersectionObserver' in window) new IntersectionObserver(function (en) { visible = en[0].isIntersecting; check(); }, { threshold: 0.05 }).observe(box);
    document.addEventListener('visibilitychange', check);
    if ('ResizeObserver' in window) new ResizeObserver(function () { sizeDirty = true; }).observe(box);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { sizeDirty = true; });
    check();
  }

  function auto() { var n = document.querySelectorAll('#qv27-kv, [data-qv27-kv]'); for (var i = 0; i < n.length; i++) mount(n[i]); }
  window.QV27Embed = { mount: mount };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', auto); else auto();
})();
