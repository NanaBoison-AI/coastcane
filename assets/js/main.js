/* ============================================================
   COAST CANE® — boot + motion
   Animations are restrained by design and fully disabled when
   the visitor prefers reduced motion.
   ============================================================ */

(function () {
  'use strict';

  var CC = window.CoastCane;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ---------- scroll reveal ---------- */
  function initReveal() {
    var items = document.querySelectorAll('[data-reveal]');
    if (!items.length) return;
    if (reduced.matches || !('IntersectionObserver' in window)) {
      Array.prototype.forEach.call(items, function (el) { el.classList.add('is-in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.classList.add('is-in');
        obs.unobserve(en.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    Array.prototype.forEach.call(items, function (el) { io.observe(el); });
  }

  /* ---------- gentle parallax on the lifestyle band ---------- */
  function initParallax() {
    var els = document.querySelectorAll('[data-parallax]');
    if (!els.length || reduced.matches) return;
    var ticking = false;
    function frame() {
      ticking = false;
      var vh = window.innerHeight;
      Array.prototype.forEach.call(els, function (el) {
        var r = el.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) return;
        var progress = (r.top + r.height / 2 - vh / 2) / vh;   /* -1 .. 1 */
        var depth = parseFloat(el.getAttribute('data-parallax')) || 20;
        el.style.transform = 'translate3d(0,' + (progress * depth).toFixed(2) + 'px,0)';
      });
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; window.requestAnimationFrame(frame); }
    }, { passive: true });
    window.addEventListener('resize', frame, { passive: true });
    frame();
  }

  /* ---------- persistent mobile order bar ---------- */
  function initMobileBar() {
    var bar = document.querySelector('[data-mobile-cta]');
    var hero = document.querySelector('[data-hero]');
    /* The page already ends with an order CTA and the footer's own
       links, so the bar steps out of the way there. */
    var ends = document.querySelectorAll('[data-final-cta], .footer');
    if (!bar) return;

    var pastHero = false, endsSeen = 0;
    function apply() { bar.classList.toggle('is-visible', pastHero && endsSeen === 0); }

    if ('IntersectionObserver' in window && hero) {
      new IntersectionObserver(function (e) {
        pastHero = !e[0].isIntersecting; apply();
      }, { threshold: 0, rootMargin: '-120px 0px 0px 0px' }).observe(hero);
    } else { pastHero = true; }

    if ('IntersectionObserver' in window && ends.length) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          en.target.__ccSeen = en.isIntersecting;
        });
        endsSeen = 0;
        Array.prototype.forEach.call(ends, function (el) { if (el.__ccSeen) endsSeen++; });
        apply();
      }, { threshold: 0.12 });
      Array.prototype.forEach.call(ends, function (el) { io.observe(el); });
    }
    apply();
  }

  /* ---------- hero entrance ---------- */
  function initHero() {
    var hero = document.querySelector('[data-hero]');
    if (!hero) return;
    if (reduced.matches) { hero.classList.add('is-ready'); return; }
    window.requestAnimationFrame(function () {
      window.requestAnimationFrame(function () { hero.classList.add('is-ready'); });
    });
  }

  /* ---------- boot ---------- */
  function boot() {
    if (!CC || !CC.config) {
      console.error('[Coast Cane] config.js failed to load.');
      return;
    }
    /* Components render config-driven content into their mount points. */
    [CC.navbar, CC.hero, CC.brandIntro, CC.productGrid, CC.ingredients, CC.whyCoastCane,
     CC.lifestyle, CC.delivery, CC.instagramGallery, CC.siteFooter].forEach(function (c) {
      try { if (c && c.mount) c.mount(); }
      catch (err) { console.error('[Coast Cane] component failed:', err); }
    });

    /* Every order CTA is wired last, so it also catches the ones
       the components just rendered. */
    CC.ordering.wire(document);

    initHero();
    initReveal();
    initParallax();
    initMobileBar();
    document.documentElement.classList.add('js-ready');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else { boot(); }
})();
