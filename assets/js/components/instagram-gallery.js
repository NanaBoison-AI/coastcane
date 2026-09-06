/* InstagramGallery — the real Coast Cane posts only, plus a follow panel.
   Add more in config.instagram.posts and the grid absorbs them. */
window.CoastCane = window.CoastCane || {};
window.CoastCane.instagramGallery = (function () {
  'use strict';

  function tile(post, cfg, i) {
    var href = post.href || cfg.instagram.url;
    return '<li class="tile reveal" data-reveal style="--i:' + i + '">' +
      '<a class="tile__link" href="' + href + '" target="_blank" rel="noopener" ' +
      'aria-label="' + post.alt + ' — view on Instagram">' +
      '<picture>' +
      (post.webp ? '<source srcset="' + post.webp + '" type="image/webp">' : '') +
      '<img src="' + post.src + '" alt="' + post.alt + '" loading="lazy" decoding="async" ' +
      'width="720" height="720">' +
      '</picture><span class="tile__veil" aria-hidden="true"></span>' +
      '</a></li>';
  }

  function followPanel(cfg, i) {
    return '<li class="tile tile--follow reveal" data-reveal style="--i:' + i + '">' +
      '<a class="tile__link tile__follow" href="' + cfg.instagram.url + '" target="_blank" rel="noopener">' +
      '<svg class="tile__ig" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
      '<path fill="currentColor" d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16Zm0 2.16c-3.14 0-3.51.01-4.75.07-.9.04-1.39.19-1.71.32-.43.17-.74.37-1.06.69-.32.32-.52.63-.69 1.06-.13.32-.28.81-.32 1.71-.06 1.24-.07 1.61-.07 4.75s.01 3.51.07 4.75c.4.9.19 1.39.32 1.71.17.43.37.74.69 1.06.32.32.63.52 1.06.69.32.13.81.28 1.71.32 1.24.06 1.61.07 4.75.07s3.51-.01 4.75-.07c.9-.04 1.39-.19 1.71-.32.43-.17.74-.37 1.06-.69.32-.32.52-.63.69-1.06.13-.32.28-.81.32-1.71.06-1.24.07-1.61.07-4.75s-.01-3.51-.07-4.75c-.04-.9-.19-1.39-.32-1.71a2.86 2.86 0 0 0-.69-1.06 2.86 2.86 0 0 0-1.06-.69c-.32-.13-.81-.28-1.71-.32-1.24-.06-1.61-.07-4.75-.07Zm0 3.67a6.01 6.01 0 1 1 0 12.02 6.01 6.01 0 0 1 0-12.02Zm0 9.91a3.9 3.9 0 1 0 0-7.8 3.9 3.9 0 0 0 0 7.8Zm7.65-10.15a1.4 1.4 0 1 1-2.81 0 1.4 1.4 0 0 1 2.81 0Z"/>' +
      '</svg>' +
      '<span class="tile__handle">' + cfg.instagram.handle + '</span>' +
      '<span class="tile__follow-cta">Follow us</span>' +
      '</a></li>';
  }

  function mount() {
    var host = document.querySelector('[data-gallery]');
    if (!host) return;
    var cfg = window.CoastCane.config;
    var posts = cfg.instagram.posts.filter(function (p) { return p.src; });
    host.innerHTML = posts.map(function (p, i) { return tile(p, cfg, i); }).join('') +
      followPanel(cfg, posts.length);

    document.querySelectorAll('[data-ig-handle]').forEach(function (el) {
      el.textContent = cfg.instagram.handle;
    });
    document.querySelectorAll('[data-ig-link]').forEach(function (el) {
      el.setAttribute('href', cfg.instagram.url);
    });
  }
  return { mount: mount };
})();
