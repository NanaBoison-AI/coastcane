/* BrandIntro — mounts the portrait artwork beside the story copy.
   Replace with a photograph any time: see SITE.md. */
window.CoastCane = window.CoastCane || {};
window.CoastCane.brandIntro = (function () {
  'use strict';
  function mount() {
    var host = document.querySelector('[data-story-art]');
    if (host) host.innerHTML = window.CoastCane.art.storyArt();
  }
  return { mount: mount };
})();
