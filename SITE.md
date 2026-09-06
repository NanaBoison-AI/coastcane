# Coast Cane® — website

A single-page site for Coast Cane, built to the brief in [`README.md`](README.md).

Plain HTML, CSS and JavaScript. No build step, no framework, no third-party
requests — open it on any static host and it works.

---

## Quick start

The site needs to be served over HTTP (web fonts are blocked on `file://`).
Any static server will do:

```bash
npx http-server -p 8080 .      # then open http://localhost:8080
# or
python3 -m http.server 8080
```

**Deploying to Cloudflare Pages:** connect this repository, and leave the
build command empty with the output directory set to `/` (the repository
root) — there is nothing to compile. Everything, fonts included, is served
from your own domain, so there are no third-party requests at runtime.

---

## The WhatsApp number

Set, and live on every order button:

```js
contact: {
  whatsappNumber: '233592703051',   // +233 59 270 3051
  ...
}
```

To change it, edit **`assets/js/config.js`**. Use the full international
format, digits only — no `+`, no spaces, no leading zero. For Ghana
`+233 59 270 3051` that is `233592703051`.

All 13 order buttons across the page point at WhatsApp with a pre-filled
message:

- General buttons → *"Hi Coast Cane! I'd like to place an order."*
- A product card → *"Hi Coast Cane! I'd like to order the Classic Lime."*

Both templates are editable in the same `contact` block; `{product}` is
replaced with the product name.

If the number is ever emptied, every button falls back to the Coast Cane
Instagram profile rather than breaking.

## Everything else you'll want to change

All of it lives in **`assets/js/config.js`** — you should not need to touch
the HTML or CSS for routine updates.

| What | Where in `config.js` |
|---|---|
| WhatsApp number & message | `contact` |
| Instagram handle + link | `instagram.handle`, `instagram.url` |
| Instagram gallery tiles | `instagram.posts` |
| Products, descriptions, prices | `products` |
| Show prices at all | `showPrices`, `currency` |
| Ingredients list | `ingredients` |
| "Why Coast Cane" blocks | `features` |
| Delivery days & note | `delivery` |
| Menu links | `nav` |
| Button wording | `cta` |

### Prices

Prices are hidden until you're ready. Set `showPrices: true`, add a
`currency` (e.g. `'GH₵'`), and fill in each product's `price`. Leave any
product's `price` empty and just that one hides its price.

### Products

Add, remove or reorder freely — the grid adapts. Each product needs an `id`,
`name`, `description`, and an `art` value (`lime`, `mint`, `pineapple`,
`ginger` or `cane`) which picks the built-in illustration.

### Delivery days

`delivery.days` drives the three big day cards, the line under the hero
headline, and the footer, all at once. Mondays / Wednesdays / Fridays are the
days confirmed in the supplied Coast Cane material.

---

## Swapping in photography

The site ships with custom-drawn illustrations because no product photography
was supplied. Every one of them is designed to be replaced.

**Product cards** — add image paths to the product in `config.js`; they take
over from the illustration automatically:

```js
{ id: 'classic-lime', name: 'Classic Lime', /* … */
  image: 'assets/img/lime.jpg', imageWebp: 'assets/img/lime.webp' }
```

**Instagram gallery** — add entries to `instagram.posts`. Anything with a
`src` renders as a photo; anything with `src: null` renders a branded tile.

```js
{ src: 'assets/img/post-4.jpg', webp: 'assets/img/post-4.webp',
  alt: 'Fresh sugarcane juice on the beach', href: 'https://instagram.com/p/…' }
```

**Hero, brand intro and lifestyle band** — these are larger compositions in
`assets/js/art.js`. To use a photograph instead, replace the element's
contents in `index.html`:

- Hero: the `<svg … data-hero-art>` inside `.hero__art`
- Brand intro: the `<svg … data-story-art>` inside `.story__frame`
- Lifestyle: the `<div data-lifestyle-art>` — swap for an `<img>` with
  `object-fit: cover`, or set a `background-image` on `.lifestyle__art`

Keep images landscape and reasonably light (≤200 KB); use WebP where you can.

---

## How it's put together

```
index.html                  all the page structure and editorial copy
assets/css/fonts.css        self-hosted Manrope + Inter (variable, woff2)
assets/css/styles.css       design tokens, layout, every component
assets/js/config.js         ← the file you edit
assets/js/art.js            the SVG illustration system
assets/js/components/       one file per component
assets/js/main.js           boot, scroll reveal, parallax, mobile order bar
assets/fonts/               2 font files, latin subset
assets/img/                 logo, favicons, OG image, gallery images
brands/                     original supplied artwork (source files)
```

Components mirror the names in the brief: `navbar`, `hero`, `brand-intro`,
`product-grid` (with `ProductCard` inside it), `ingredients`,
`why-coast-cane`, `lifestyle`, `delivery`, `instagram-gallery`,
`site-footer`, plus `ordering` which decides where every CTA points.

**Editorial copy** (headlines, body text) lives in `index.html` so the page
renders instantly and reads well to search engines. **Data that changes**
(products, days, links, gallery) is rendered from `config.js` by the
components, so there is a single place to edit it.

---

## Brand notes

- The logo is the supplied Coast Cane artwork, cropped from
  `brands/Screenshot_20260906_124240_Instagram.jpg` and given a transparent
  background. It is never redrawn, recoloured or distorted. On the dark green
  footer it sits on a cream panel so the dark green parts stay visible.
- Colours are sampled straight from the logo pixels: orange `#FE9C1B`, cane
  green `#41602F`, wave blue `#039ED5`, cream `#FDF7C5`, sun `#FFCB06`,
  lime `#43A52B`.
- Usage weighting is roughly 70% cream/white, 15% green, 10% orange,
  5% blue and lime.
- Orange buttons use dark green text, not white — white on orange fails
  contrast requirements, dark green passes comfortably at 7.5:1.

---

## Accessibility & performance

- Semantic landmarks, one `<h1>`, no skipped heading levels
- Every text/background pair meets WCAG AA (checked, zero failures)
- Skip link, visible focus rings, keyboard-operable menu (Escape closes it)
- `prefers-reduced-motion` disables all animation and parallax
- Works with JavaScript disabled: the hero, all copy and the delivery days
  still render, and every order button still reaches Instagram
- ~283 KB total, 20 requests, no third-party connections
- First contentful paint under 100 ms locally

---

## Two small things to know

1. **Preview over HTTP, not by double-clicking.** Opening `index.html`
   straight off disk shows system fonts instead of Manrope/Inter: browsers
   fetch fonts in CORS mode, and a `file://` page has a `null` origin, so
   they're blocked. This affects local preview only — on any real host
   (Cloudflare Pages, GitHub Pages, Netlify) the fonts are same-origin and
   load normally. Use the Quick start command to preview.
2. **Two Instagram URLs are hardcoded as fallbacks** — the `href` on each
   CTA in `index.html`, and the `<noscript>` block in the delivery section.
   These only matter if JavaScript fails; `config.js` is what the live site
   uses. If you change `instagram.url`, update those too if you care about
   the no-JavaScript case.
