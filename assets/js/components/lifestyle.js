/* LifestyleSection — illustrated coastal band.
   To use a photograph instead, see SITE.md ("Swapping in photography"). */
window.CoastCane = window.CoastCane || {};
window.CoastCane.lifestyle = (function () {
  'use strict';
  function mount() {
    var host = document.querySelector('[data-lifestyle-art]');
    if (!host) return;
    host.innerHTML =
      '<svg class="lifestyle__svg" viewBox="0 0 1440 560" preserveAspectRatio="xMidYMax slice" ' +
      'aria-hidden="true" focusable="false">' + window.CoastCane.art.lifestyleScene() + '</svg>';
    var fin = document.querySelector('[data-final-art]');
    if (fin) {
      fin.innerHTML =
        '<svg viewBox="0 0 1440 420" preserveAspectRatio="xMidYMax slice" ' +
        'aria-hidden="true" focusable="false">' + window.CoastCane.art.finalDecor() + '</svg>';
    }
  }
  return { mount: mount };
})();
