(function () {
  // Rastreio: pode ser sobrescrito com ?origem=Instagram na URL
  var origem = new URLSearchParams(location.search).get('origem') || 'Panfleto';
  var base = 'https://wa.me/5519971357177?text=';
  var state = { env: '', style: '', when: '' };

  var preview = document.getElementById('preview');
  var send = document.getElementById('wa-send');

  var quick = 'Olá, Letícia! Vi sua página e quero conversar sobre um projeto. (Origem: ' + origem + ')';
  document.querySelectorAll('.js-wa-quick').forEach(function (a) {
    a.href = base + encodeURIComponent(quick);
  });

  function render() {
    var parts = ['Olá, Letícia! Vi sua página e quero agendar uma consultoria.'];
    if (state.env) parts.push('Ambiente: ' + state.env + '.');
    if (state.style) parts.push('Estilo: ' + state.style + '.');
    if (state.when) parts.push('Prazo: ' + state.when + '.');
    parts.push('(Origem: ' + origem + ')');
    var full = parts.join(' ');
    preview.textContent = full;
    send.href = base + encodeURIComponent(full);
  }

  document.querySelectorAll('.group').forEach(function (group) {
    var key = group.dataset.key;
    var chips = group.querySelectorAll('.chip');
    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        var label = chip.textContent.trim();
        state[key] = state[key] === label ? '' : label;
        chips.forEach(function (c) {
          c.setAttribute('aria-pressed', String(c.textContent.trim() === state[key]));
        });
        render();
      });
    });
  });

  render();
})();

/* ── Scroll reveal ──────────────────────────────────────────────────── */
(function () {
  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var el = entry.target;
      var delay = +(el.dataset.revealDelay || 0);
      if (delay) el.style.transitionDelay = delay + 'ms';
      el.classList.add('revealed');
      obs.unobserve(el);
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('[data-reveal]').forEach(function (el) { obs.observe(el); });
})();

/* ── Ornamento (line draw on scroll) ───────────────────────────────── */
(function () {
  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('revealed');
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.js-ornament').forEach(function (el) { obs.observe(el); });
})();

/* ── Contador de números ────────────────────────────────────────────── */
(function () {
  function countUp(el) {
    var target = +el.dataset.count;
    var after = el.dataset.after || '';
    var isBr = el.dataset.format === 'br';
    var fmt = isBr
      ? function (n) { return n.toLocaleString('pt-BR'); }
      : function (n) { return String(n); };
    var dur = 1600, start = null;
    function tick(ts) {
      if (!start) start = ts;
      var t = Math.min((ts - start) / dur, 1);
      var ease = 1 - Math.pow(1 - t, 3);
      el.textContent = fmt(Math.round(ease * target)) + after;
      if (t < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      countUp(entry.target);
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('[data-count]').forEach(function (el) { obs.observe(el); });
})();

/* ── Galeria — drag to scroll ───────────────────────────────────────── */
(function () {
  var track = document.getElementById('galleryTrack');
  if (!track) return;
  var isDown = false, startX, scrollLeft;
  track.addEventListener('mousedown', function (e) {
    isDown = true; startX = e.pageX - track.offsetLeft; scrollLeft = track.scrollLeft;
    track.style.cursor = 'grabbing';
  });
  document.addEventListener('mouseup', function () { isDown = false; track.style.cursor = 'grab'; });
  track.addEventListener('mousemove', function (e) {
    if (!isDown) return;
    e.preventDefault();
    track.scrollLeft = scrollLeft - (e.pageX - track.offsetLeft - startX) * 1.4;
  });
})();
