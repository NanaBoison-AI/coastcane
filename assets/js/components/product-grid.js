/* ProductGrid / ProductCard — rendered from config.products. */
window.CoastCane = window.CoastCane || {};
window.CoastCane.productGrid = (function () {
  'use strict';

  var ARROW = '<svg class="btn__arrow" viewBox="0 0 20 20" aria-hidden="true" focusable="false">' +
    '<path d="M3 10h13M11 5l5 5-5 5" fill="none" stroke="currentColor" stroke-width="1.9" ' +
    'stroke-linecap="round" stroke-linejoin="round"/></svg>';

  function media(p) {
    if (p.image) {
      var src = p.imageWebp
        ? '<source srcset="' + p.imageWebp + '" type="image/webp">' : '';
      return '<picture>' + src + '<img class="card__img" src="' + p.image +
        '" alt="' + p.name + ' — Coast Cane sugarcane juice" loading="lazy" decoding="async" width="600" height="700"></picture>';
    }
    return window.CoastCane.art.productArt(p.art || 'lime', p.id);
  }

  function card(p, cfg) {
    var price = (cfg.showPrices && p.price)
      ? '<p class="card__price">' + (cfg.currency ? cfg.currency + ' ' : '') + p.price + '</p>'
      : '';
    return '' +
      '<article class="card reveal" data-reveal>' +
      '<div class="card__media">' + media(p) + '</div>' +
      '<div class="card__body">' +
      '<h3 class="card__title">' + p.name + '</h3>' +
      '<p class="card__desc">' + p.description + '</p>' +
      price +
      '<a class="btn btn--ghost card__cta" data-order-link data-order-product="' + p.name + '">' +
      '<span>' + cfg.cta.product + '</span>' + ARROW + '</a>' +
      '</div>' +
      '</article>';
  }

  function mount() {
    var host = document.querySelector('[data-products]');
    if (!host) return;
    var cfg = window.CoastCane.config;
    host.innerHTML = cfg.products.map(function (p) { return card(p, cfg); }).join('');
  }

  return { mount: mount };
})();
