/* Footer — nav, contact and delivery days, all from config. */
window.CoastCane = window.CoastCane || {};
window.CoastCane.siteFooter = (function () {
  'use strict';
  function mount() {
    var cfg = window.CoastCane.config;

    var nav = document.querySelector('[data-footer-nav]');
    if (nav) {
      nav.innerHTML = cfg.nav.map(function (i) {
        return '<li><a href="' + i.href + '">' + i.label + '</a></li>';
      }).join('');
    }

    var days = document.querySelector('[data-footer-days]');
    if (days) {
      days.innerHTML = cfg.delivery.days.map(function (d) {
        return '<li>' + d + '</li>';
      }).join('');
    }

    var contact = document.querySelector('[data-footer-contact]');
    if (contact) {
      var ordering = window.CoastCane.ordering;
      var rows = [];
      rows.push('<li><a data-order-link data-order-label="WhatsApp">WhatsApp</a></li>');
      rows.push('<li><a href="' + cfg.instagram.url + '" target="_blank" rel="noopener">Instagram</a></li>');
      if (cfg.contact.email) {
        rows.push('<li><a href="mailto:' + cfg.contact.email + '">' + cfg.contact.email + '</a></li>');
      }
      if (cfg.contact.location) rows.push('<li>' + cfg.contact.location + '</li>');
      contact.innerHTML = rows.join('');
      if (!ordering.hasWhatsApp()) {
        var wa = contact.querySelector('[data-order-link]');
        if (wa) wa.textContent = 'Order via ' + ordering.channel();
      }
    }

    var year = document.querySelector('[data-year]');
    if (year) year.textContent = String(new Date().getFullYear());
  }
  return { mount: mount };
})();
