/* ============================================================
   COAST CANE® — SITE CONFIGURATION
   ------------------------------------------------------------
   This is the ONLY file you need to edit for day-to-day changes:
   WhatsApp number, Instagram link, products, prices, delivery
   days and contact details all live here.

   Nothing in this file is invented. Anything not yet confirmed
   is left EMPTY and clearly marked "CONFIGURE ME" below.
   ============================================================ */

window.CoastCane = window.CoastCane || {};

window.CoastCane.config = {

  brand: {
    name: 'Coast Cane',
    nameWithMark: 'Coast Cane®',
    category: 'sugarcane juice',
    tagline: 'Fresh. Natural. Refreshing.',
    description:
      "We're a cold-press sugarcane juice cottage company. We enjoy bringing " +
      'beautiful smiles unto the faces of our customers with our natural and ' +
      'tasty sugarcane juice!',
  },

  /* ----------------------------------------------------------
     CONTACT
     ----------------------------------------------------------
     whatsappNumber: full international format, DIGITS ONLY.
       No "+", no spaces, no dashes, no leading zero.
       e.g. Ghana +233 20 123 4567  ->  '233201234567'

     If this is ever emptied, every ORDER button safely falls back
     to the Coast Cane Instagram profile, so the site never shows a
     broken number.
     ---------------------------------------------------------- */
  contact: {
    whatsappNumber: '233592703051',                         // +233 59 270 3051
    whatsappMessage: "Hi Coast Cane! I'd like to place an order.",
    // {product} is replaced with the product name when ordering from a card.
    whatsappProductMessage: "Hi Coast Cane! I'd like to order the {product}.",
    email: '',                                              // optional
    location: '',                                           // optional
  },

  instagram: {
    handle: '@coast_cane',
    url: 'https://www.instagram.com/coast_cane/',
    /* Gallery tiles. Add or replace freely — the grid adapts to
       however many you list (6–9 looks best).
       Each: { src, webp, alt, href }  — href defaults to the profile.
       Set src to null for a branded pattern tile placeholder.      */
    posts: [
      { src: 'assets/img/ig-1.jpg', webp: 'assets/img/ig-1.webp',
        alt: 'Coast Cane logo surrounded by fresh ginger, lime, mint and pineapple' },
      { src: 'assets/img/ig-2.jpg', webp: 'assets/img/ig-2.webp',
        alt: 'The Coast Cane sugarcane juice logo' },
      { src: 'assets/img/ig-3.jpg', webp: 'assets/img/ig-3.webp',
        alt: 'Coast Cane delivery days: Mondays, Wednesday and Friday' },
      { src: null, art: 'cane',      alt: 'Fresh sugarcane' },
      { src: null, art: 'lime',      alt: 'Fresh lime' },
      { src: null, art: 'mint',      alt: 'Fresh mint' },
    ],
  },

  /* Confirmed from the supplied Coast Cane brand material. */
  delivery: {
    days: ['Monday', 'Wednesday', 'Friday'],
    heading: 'Coast Cane comes to you.',
    note: 'Fresh sugarcane juice delivered to you on our delivery days.',
    areas: '',                                              // optional, e.g. 'Accra & surrounding areas'
  },

  /* ----------------------------------------------------------
     PRICING
     Prices are NOT published until confirmed. Set showPrices to
     true and fill in each product's `price` to display them.
     ---------------------------------------------------------- */
  showPrices: false,
  currency: '',                                             // e.g. 'GH₵'

  /* ----------------------------------------------------------
     PRODUCTS
     Suggested from the current brand imagery — edit freely.
     `art` picks the built-in illustration until real product
     photography is available. Add `image` + `imageWebp` to use
     a photograph instead; it takes over automatically.
     ---------------------------------------------------------- */
  products: [
    {
      id: 'classic-lime',
      name: 'Classic Lime',
      description: 'Sugarcane juice + fresh lime.',
      price: '',
      art: 'lime',
      image: null,
      imageWebp: null,
    },
    {
      id: 'mint',
      name: 'Mint',
      description: 'Sugarcane juice + refreshing mint.',
      price: '',
      art: 'mint',
      image: null,
      imageWebp: null,
    },
    {
      id: 'pineapple',
      name: 'Pineapple',
      description: 'Sugarcane juice + tropical pineapple.',
      price: '',
      art: 'pineapple',
      image: null,
      imageWebp: null,
    },
    {
      id: 'ginger',
      name: 'Ginger',
      description: 'Sugarcane juice + fresh ginger.',
      price: '',
      art: 'ginger',
      image: null,
      imageWebp: null,
    },
  ],

  ingredients: [
    { art: 'cane',      name: 'Fresh sugarcane', note: 'Naturally sweet.' },
    { art: 'lime',      name: 'Fresh lime',      note: 'A bright citrus kick.' },
    { art: 'mint',      name: 'Mint',            note: 'Cool and refreshing.' },
    { art: 'ginger',    name: 'Ginger',          note: 'A little zing.' },
    { art: 'pineapple', name: 'Pineapple',       note: 'A tropical twist.' },
  ],

  features: [
    { n: '01', title: 'Fresh',        note: 'Prepared with freshness in mind.',        icon: 'leaf' },
    { n: '02', title: 'Cold-pressed', note: 'Fresh sugarcane juice extracted with care.', icon: 'press' },
    { n: '03', title: 'Natural',      note: 'Made with real ingredients.',             icon: 'drop' },
    { n: '04', title: 'Made fresh',   note: 'Prepared for our customers with care.',   icon: 'sun' },
  ],

  nav: [
    { label: 'Home',      href: '#top' },
    { label: 'Our Story', href: '#story' },
    { label: 'Menu',      href: '#menu' },
    { label: 'Delivery',  href: '#delivery' },
    { label: 'Instagram', href: '#instagram' },
  ],

  /* Rotating CTA wording — all lead to the same order channel. */
  cta: {
    nav: 'Order now',
    hero: 'Order now',
    heroSecondary: 'Discover Coast Cane',
    product: 'Order',
    delivery: 'Order via WhatsApp',
    lifestyle: 'Get your juice',
    final: 'Order your juice',
    mobile: 'Order now',
  },
};
