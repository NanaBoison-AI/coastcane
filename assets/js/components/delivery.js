/* DeliverySection — the high-priority conversion block. */
window.CoastCane = window.CoastCane || {};
window.CoastCane.delivery = (function () {
  'use strict';
  function mount() {
    var cfg = window.CoastCane.config;
    var host = document.querySelector('[data-delivery-days]');
    if (host) {
      host.innerHTML = cfg.delivery.days.map(function (d, i) {
        return '<li class="day reveal" data-reveal style="--i:' + i + '">' +
          '<span class="day__index" aria-hidden="true">0' + (i + 1) + '</span>' +
          '<span class="day__name">' + d + '</span>' +
          '</li>';
      }).join('');
    }
    var days = cfg.delivery.days;
    var inline = days.length > 1
      ? days.slice(0, -1).join(', ') + ' & ' + days[days.length - 1]
      : (days[0] || '');
    document.querySelectorAll('[data-delivery-inline]').forEach(function (el) {
      el.textContent = inline;
    });

    var areas = document.querySelector('[data-delivery-areas]');
    if (areas) {
      if (cfg.delivery.areas) { areas.textContent = cfg.delivery.areas; areas.hidden = false; }
      else { areas.hidden = true; }
    }
  }
  return { mount: mount };
})();
