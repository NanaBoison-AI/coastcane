/* InstagramGallery — static, easily updated from config.instagram.posts. */
window.CoastCane = window.CoastCane || {};
window.CoastCane.instagramGallery = (function () {
  'use strict';

  function tile(post, i, cfg) {
    var href = post.href || cfg.instagram.url;
    var inner;
    if (post.src) {
      inner = '<picture>' +
        (post.webp ? '<source srcset="' + post.webp + '" type="image/webp">' : '') +
        '<img src="' + post.src + '" alt="' + post.alt + '" loading="lazy" decoding="async" ' +
        'width="720" height="720">' +
        '</picture>';
    } else {
      inner = window.CoastCane.art.patternTile(post.art || 'cane') +
        '<span class="sr-only">' + post.alt + '</span>';
      /* branded tiles are decorative stand-ins, not real posts */
    }
    return '<li class="tile reveal" data-reveal style="--i:' + i + '">' +
      '<a class="tile__link" href="' + href + '" target="_blank" rel="noopener" ' +
      'aria-label="' + post.alt + ' — view on Instagram">' + inner +
      '<span class="tile__veil" aria-hidden="true"></span>' +
      '</a></li>';
  }

  function mount() {
    var host = document.querySelector('[data-gallery]');
    if (!host) return;
    var cfg = window.CoastCane.config;
    host.innerHTML = cfg.instagram.posts.map(function (p, i) { return tile(p, i, cfg); }).join('');

    document.querySelectorAll('[data-ig-handle]').forEach(function (el) {
      el.textContent = cfg.instagram.handle;
    });
    document.querySelectorAll('[data-ig-link]').forEach(function (el) {
      el.setAttribute('href', cfg.instagram.url);
    });
  }
  return { mount: mount };
})();
