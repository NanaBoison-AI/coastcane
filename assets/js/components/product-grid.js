/* ProductGrid / ProductCard — each flavour owns a colour territory.
   The card is one large link target, so the whole thing is tappable. */
window.CoastCane = window.CoastCane || {};
window.CoastCane.productGrid = (function () {
  'use strict';

  var ARROW = '<svg class="btn__arrow" viewBox="0 0 20 20" aria-hidden="true" focusable="false">' +
    '<path d="M3 10h13M11 5l5 5-5 5" fill="none" stroke="currentColor" stroke-width="2" ' +
    'stroke-linecap="round" stroke-linejoin="round"/></svg>';

  function media(p) {
    if (p.image) {
      return '<picture>' +
        (p.imageWebp ? '<source srcset="' + p.imageWebp + '" type="image/webp">' : '') +
        '<img class="card__img" src="' + p.image + '" alt="" loading="lazy" ' +
        'decoding="async" width="640" height="520"></picture>';
    }
    return window.CoastCane.art.flavourPanel(p.art || 'lime');
  }

  function card(p, cfg) {
    var price = (cfg.showPrices && p.price)
      ? '<span class="card__price">' + (cfg.currency ? cfg.currency + ' ' : '') + p.price + '</span>'
      : '';
    return '' +
      '<li class="card reveal" data-reveal>' +
      '<a class="card__link" data-order-link data-order-product="' + p.name + '" ' +
      'data-order-label="Order the ' + p.name + '">' +
      '<span class="card__media">' + media(p) + '</span>' +
      '<span class="card__body">' +
      '<span class="card__title">' + p.name + '</span>' +
      '<span class="card__desc">' + p.description + '</span>' +
      '<span class="card__foot">' + price +
      '<span class="card__cta">' + cfg.cta.product + ARROW + '</span>' +
      '</span></span></a></li>';
  }

  function mount() {
    var host = document.querySelector('[data-products]');
    if (!host) return;
    var cfg = window.CoastCane.config;
    host.innerHTML = cfg.products.map(function (p) { return card(p, cfg); }).join('');
  }

  return { mount: mount };
})();
