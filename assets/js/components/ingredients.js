/* Ingredients — taste and freshness only, no health claims. */
window.CoastCane = window.CoastCane || {};
window.CoastCane.ingredients = (function () {
  'use strict';
  function mount() {
    var host = document.querySelector('[data-ingredients]');
    if (!host) return;
    host.innerHTML = window.CoastCane.config.ingredients.map(function (ing, i) {
      return '<li class="ingredient reveal" data-reveal style="--i:' + i + '">' +
        '<span class="ingredient__art">' + window.CoastCane.art.ingredient(ing.art) + '</span>' +
        '<h3 class="ingredient__name">' + ing.name + '</h3>' +
        '<p class="ingredient__note">' + ing.note + '</p>' +
        '</li>';
    }).join('');
  }
  return { mount: mount };
})();
