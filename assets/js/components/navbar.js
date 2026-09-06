/* Navbar — sticky, compacts on scroll, mobile drawer, active section. */
window.CoastCane = window.CoastCane || {};
window.CoastCane.navbar = (function () {
  'use strict';

  function linkMarkup(items, cls) {
    return items.map(function (i) {
      return '<li><a class="' + cls + '" href="' + i.href + '">' + i.label + '</a></li>';
    }).join('');
  }

  function mount() {
    var cfg = window.CoastCane.config;
    var desktop = document.querySelector('[data-nav-links]');
    var mobile = document.querySelector('[data-nav-links-mobile]');
    if (desktop) desktop.innerHTML = linkMarkup(cfg.nav, 'nav__link');
    if (mobile) mobile.innerHTML = linkMarkup(cfg.nav, 'drawer__link');

    var header = document.querySelector('[data-nav]');
    var toggle = document.querySelector('[data-nav-toggle]');
    var drawer = document.querySelector('[data-drawer]');

    /* compact on scroll */
    if (header) {
      var compact = false;
      var onScroll = function () {
        var want = window.scrollY > 40;
        if (want !== compact) { compact = want; header.classList.toggle('is-compact', want); }
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }

    /* mobile drawer */
    if (toggle && drawer) {
      var setOpen = function (open) {
        toggle.setAttribute('aria-expanded', String(open));
        drawer.classList.toggle('is-open', open);
        drawer.hidden = !open;
        document.body.classList.toggle('has-drawer-open', open);
      };
      toggle.addEventListener('click', function () {
        setOpen(toggle.getAttribute('aria-expanded') !== 'true');
      });
      drawer.addEventListener('click', function (e) {
        if (e.target.closest('a')) setOpen(false);
      });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
          setOpen(false); toggle.focus();
        }
      });
      setOpen(false);
    }

    /* active section highlight */
    var targets = cfg.nav
      .map(function (i) { return document.querySelector(i.href); })
      .filter(Boolean);
    if (targets.length && 'IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          var id = '#' + en.target.id;
          document.querySelectorAll('.nav__link, .drawer__link').forEach(function (a) {
            a.classList.toggle('is-active', a.getAttribute('href') === id);
          });
        });
      }, { rootMargin: '-45% 0px -50% 0px' });
      targets.forEach(function (t) { io.observe(t); });
    }
  }

  return { mount: mount };
})();
