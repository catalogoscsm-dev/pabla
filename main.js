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
