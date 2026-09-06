/* WhyCoastCane — oversized numerals carry the rhythm; no stock line icons. */
window.CoastCane = window.CoastCane || {};
window.CoastCane.whyCoastCane = (function () {
  'use strict';
  function mount() {
    var host = document.querySelector('[data-features]');
    if (!host) return;
    host.innerHTML = window.CoastCane.config.features.map(function (f, i) {
      return '<li class="feature reveal" data-reveal style="--i:' + i + '">' +
        '<span class="feature__n" aria-hidden="true">' + f.n + '</span>' +
        '<div class="feature__body">' +
        '<h3 class="feature__title">' + f.title + '</h3>' +
        '<p class="feature__note">' + f.note + '</p>' +
        '</div></li>';
    }).join('');
  }
  return { mount: mount };
})();
