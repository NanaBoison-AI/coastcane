/* WhyCoastCane — four numbered feature blocks. */
window.CoastCane = window.CoastCane || {};
window.CoastCane.whyCoastCane = (function () {
  'use strict';
  function mount() {
    var host = document.querySelector('[data-features]');
    if (!host) return;
    host.innerHTML = window.CoastCane.config.features.map(function (f, i) {
      return '<li class="feature reveal" data-reveal style="--i:' + i + '">' +
        '<span class="feature__icon">' + window.CoastCane.art.icon(f.icon) + '</span>' +
        '<span class="feature__n">' + f.n + '</span>' +
        '<h3 class="feature__title">' + f.title + '</h3>' +
        '<p class="feature__note">' + f.note + '</p>' +
        '</li>';
    }).join('');
  }
  return { mount: mount };
})();
