/* Ingredients — an editorial list, not a row of icon badges.
   Taste and freshness only; no health claims. */
window.CoastCane = window.CoastCane || {};
window.CoastCane.ingredients = (function () {
  'use strict';
  function mount() {
    var host = document.querySelector('[data-ingredients]');
    if (!host) return;
    host.innerHTML = window.CoastCane.config.ingredients.map(function (ing, i) {
      return '<li class="ing reveal" data-reveal style="--i:' + i + '">' +
        '<span class="ing__dot" style="background:' + ing.color + '" aria-hidden="true"></span>' +
        '<h3 class="ing__name">' + ing.name + '</h3>' +
        '<p class="ing__note">' + ing.note + '</p>' +
        '</li>';
    }).join('');
  }
  return { mount: mount };
})();
