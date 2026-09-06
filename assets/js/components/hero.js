/* Hero — mounts the hero artwork and the inline delivery line. */
window.CoastCane = window.CoastCane || {};
window.CoastCane.hero = (function () {
  'use strict';
  function mount() {
    var art = document.querySelector('[data-hero-art]');
    if (art) art.innerHTML = window.CoastCane.art.hero();
  }
  return { mount: mount };
})();
