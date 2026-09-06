/* Ordering — the single source of truth for where every CTA points.
   Visitor -> sees product -> ORDER -> WhatsApp -> places order.

   If no WhatsApp number is configured yet, links fall back to the
   Coast Cane Instagram profile so the site is never broken and no
   phone number is ever invented. */

window.CoastCane = window.CoastCane || {};

window.CoastCane.ordering = (function () {
  'use strict';

  function cfg() { return window.CoastCane.config; }

  function number() {
    return String((cfg().contact && cfg().contact.whatsappNumber) || '').replace(/\D/g, '');
  }

  function hasWhatsApp() { return number().length >= 6; }

  function message(product) {
    var c = cfg().contact || {};
    if (product && c.whatsappProductMessage) {
      return c.whatsappProductMessage.replace('{product}', product);
    }
    return c.whatsappMessage || "Hi Coast Cane! I'd like to place an order.";
  }

  function orderUrl(product) {
    if (hasWhatsApp()) {
      return 'https://wa.me/' + number() + '?text=' + encodeURIComponent(message(product));
    }
    return cfg().instagram.url;
  }

  function channel() { return hasWhatsApp() ? 'WhatsApp' : 'Instagram'; }

  /* Point every [data-order-link] at the live order channel. */
  function wire(root) {
    var scope = root || document;
    var links = scope.querySelectorAll('[data-order-link]');
    Array.prototype.forEach.call(links, function (el) {
      var product = el.getAttribute('data-order-product') || '';
      el.setAttribute('href', orderUrl(product));
      el.setAttribute('target', '_blank');
      el.setAttribute('rel', 'noopener');
      /* Accessible name keeps the visible text, then names the destination. */
      var text = (el.getAttribute('data-order-label') || el.textContent || '').trim();
      if (text) el.setAttribute('aria-label', text + ' — opens ' + channel());
    });
    if (!hasWhatsApp() && window.console && console.info) {
      console.info(
        '[Coast Cane] No WhatsApp number configured yet — order buttons currently open Instagram.\n' +
        'Add one in assets/js/config.js -> contact.whatsappNumber (digits only, e.g. "233201234567").'
      );
    }
    return links.length;
  }

  return { orderUrl: orderUrl, wire: wire, hasWhatsApp: hasWhatsApp, channel: channel, message: message };
})();
