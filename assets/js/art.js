/* ============================================================
   COAST CANE® — ILLUSTRATION SYSTEM
   ------------------------------------------------------------
   Hand-built SVG artwork in the Coast Cane palette, used wherever
   real photography is not yet available. Every piece here is
   decorative and marked aria-hidden; none of it reproduces,
   redraws or alters the Coast Cane logo.

   Swap any of it out by adding `image` paths in config.js.
   ============================================================ */

window.CoastCane = window.CoastCane || {};

window.CoastCane.art = (function () {
  'use strict';

  /* ---------- small helpers ---------- */

  /* A sine wave as an SVG path, sampled every 4 units. */
  function wavePath(x0, x1, y, amp, cycles) {
    var d = '', step = 4;
    for (var x = x0; x <= x1; x += step) {
      var t = (x - x0) / (x1 - x0);
      var yy = (y + Math.sin(t * Math.PI * 2 * cycles) * amp).toFixed(2);
      d += (x === x0 ? 'M' : 'L') + x.toFixed(1) + ',' + yy + ' ';
    }
    return d.trim();
  }

  /* Stacked blue wave lines — the coastal motif. */
  function waves(opts) {
    opts = opts || {};
    var x0 = opts.x0 || 0, x1 = opts.x1 || 600, y = opts.y || 0;
    var rows = opts.rows || 3, gap = opts.gap || 18;
    var amp = opts.amp || 7, cycles = opts.cycles || 6;
    var w = opts.width || 7, color = opts.color || '#039ED5';
    var op = opts.opacity == null ? 1 : opts.opacity;
    var out = '';
    for (var i = 0; i < rows; i++) {
      out += '<path d="' + wavePath(x0, x1, y + i * gap, amp, cycles) + '" fill="none" stroke="' +
        color + '" stroke-width="' + w + '" stroke-linecap="round" opacity="' + op + '"/>';
    }
    return out;
  }

  /* A single sugarcane stalk: segmented culm with node bands.
     Pass opts {color, node} to render it as a flat silhouette. */
  function stalk(x, yTop, yBot, w, tilt, opts) {
    opts = opts || {};
    var body = opts.color || '#41602F';
    var node = opts.node || '#C9A227';
    var shade = opts.node ? opts.node : '#2E4720';
    var segs = Math.max(2, Math.round((yBot - yTop) / 78));
    var segH = (yBot - yTop) / segs;
    var out = '<rect x="' + x + '" y="' + yTop + '" width="' + w + '" height="' + (yBot - yTop) +
      '" rx="' + (w / 2.4).toFixed(1) + '" fill="' + body + '"/>';
    for (var i = 1; i < segs; i++) {
      var ny = yTop + i * segH;
      out += '<path d="M' + x + ',' + ny.toFixed(1) + ' h' + w + '" stroke="' + node +
        '" stroke-width="3.5" stroke-linecap="round" opacity="' + (opts.node ? '.55' : '.85') + '"/>';
      out += '<path d="M' + x + ',' + (ny + 5).toFixed(1) + ' h' + w + '" stroke="' + shade +
        '" stroke-width="2" opacity=".5"/>';
    }
    if (tilt) {
      out = '<g transform="rotate(' + tilt + ' ' + (x + w / 2) + ' ' + yBot + ')">' + out + '</g>';
    }
    return out;
  }

  /* Cane leaf blade — a true leaf: pointed at both ends, full in the middle. */
  function blade(x, y, dx, dy, curve, color, op) {
    var len = Math.sqrt(dx * dx + dy * dy) || 1;
    var px = -dy / len, py = dx / len;          /* unit perpendicular */
    var w = len * (curve == null ? 0.22 : curve);
    /* belly sits past the midpoint so the leaf tapers to a tip */
    var ax = x + dx * 0.42, ay = y + dy * 0.42;
    var bx = x + dx * 0.55, by = y + dy * 0.55;
    var tipX = (x + dx).toFixed(1), tipY = (y + dy).toFixed(1);
    var d = 'M' + x.toFixed(1) + ',' + y.toFixed(1) +
      ' Q' + (ax + px * w).toFixed(1) + ',' + (ay + py * w).toFixed(1) + ' ' + tipX + ',' + tipY +
      ' Q' + (bx - px * w).toFixed(1) + ',' + (by - py * w).toFixed(1) + ' ' +
      x.toFixed(1) + ',' + y.toFixed(1) + ' Z';
    var rib = 'M' + x.toFixed(1) + ',' + y.toFixed(1) +
      ' Q' + (ax + px * w * 0.12).toFixed(1) + ',' + (ay + py * w * 0.12).toFixed(1) +
      ' ' + tipX + ',' + tipY;
    return '<g opacity="' + (op == null ? 1 : op) + '">' +
      '<path d="' + d + '" fill="' + (color || '#41602F') + '"/>' +
      '<path d="' + rib + '" fill="none" stroke="#2E4720" stroke-width="' +
      Math.max(0.8, len * 0.018).toFixed(1) + '" opacity=".35"/></g>';
  }

  /* Lime wheel — rind ring, pale flesh, radial segments. */
  function limeWheel(cx, cy, r) {
    var segs = '';
    for (var i = 0; i < 8; i++) {
      var a = (i / 8) * Math.PI * 2 + 0.39;
      segs += '<path d="M' + cx + ',' + cy + ' L' + (cx + Math.cos(a) * r * 0.74).toFixed(1) + ',' +
        (cy + Math.sin(a) * r * 0.74).toFixed(1) + '" stroke="#9DBE45" stroke-width="' +
        (r * 0.07).toFixed(1) + '" stroke-linecap="round"/>';
    }
    return '<g>' +
      '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="#5E8C2A"/>' +
      '<circle cx="' + cx + '" cy="' + cy + '" r="' + (r * 0.86).toFixed(1) + '" fill="#CFE07E"/>' +
      '<circle cx="' + cx + '" cy="' + cy + '" r="' + (r * 0.78).toFixed(1) + '" fill="#EAF3C2"/>' +
      segs +
      '<circle cx="' + cx + '" cy="' + cy + '" r="' + (r * 0.1).toFixed(1) + '" fill="#CFE07E"/>' +
      '</g>';
  }

  /* Mint sprig — paired leaves on a stem. */
  function mintSprig(cx, cy, s, rot) {
    function leaf(dx, dy, rz) {
      return '<g transform="translate(' + (cx + dx * s) + ' ' + (cy + dy * s) + ') rotate(' + rz + ') scale(' + s + ')">' +
        '<path d="M0,0 C11,-9 24,-7 28,2 C24,11 11,13 0,0 Z" fill="#4E9C2B"/>' +
        '<path d="M1,0 C10,-2 20,0 27,2" stroke="#2F6B18" stroke-width="1.4" fill="none" opacity=".7"/>' +
        '</g>';
    }
    return '<g transform="rotate(' + (rot || 0) + ' ' + cx + ' ' + cy + ')">' +
      '<path d="M' + cx + ',' + (cy + 26 * s) + ' C' + cx + ',' + (cy + 8 * s) + ' ' + cx + ',' + (cy + 4 * s) +
      ' ' + cx + ',' + (cy - 10 * s) + '" stroke="#3B7A20" stroke-width="' + (2.6 * s).toFixed(1) + '" fill="none" stroke-linecap="round"/>' +
      leaf(0, -2, -28) + leaf(0, 6, 200) + leaf(0, -12, -8) +
      '</g>';
  }

  /* Ginger root — a body with finger-like rhizomes, built from
     overlapping fills so it reads as ginger and not as a blob. */
  function gingerRoot(cx, cy, s, opts) {
    opts = opts || {};
    var body = opts.color || '#D89A3C';
    var crease = opts.crease || '#A9701C';
    var fingers = '';
    [[26, -16, -32, 15, 10], [4, -26, -8, 13, 9], [-24, -16, 26, 12, 8]].forEach(function (f) {
      fingers += '<ellipse cx="' + f[0] + '" cy="' + f[1] + '" rx="' + f[3] + '" ry="' + f[4] +
        '" transform="rotate(' + f[2] + ' ' + f[0] + ' ' + f[1] + ')" fill="' + body + '"/>';
    });
    return '<g transform="translate(' + cx + ' ' + cy + ') scale(' + s + ')">' +
      fingers +
      '<ellipse cx="0" cy="6" rx="34" ry="23" transform="rotate(-9 0 6)" fill="' + body + '"/>' +
      '<ellipse cx="-20" cy="14" rx="15" ry="11" transform="rotate(18 -20 14)" fill="' + body + '"/>' +
      '<ellipse cx="22" cy="14" rx="14" ry="10" transform="rotate(-14 22 14)" fill="' + body + '"/>' +
      '<path d="M-18,-2 q6,10 2,20 M4,-6 q7,10 3,22 M22,-2 q5,9 1,18" fill="none" stroke="' + crease +
      '" stroke-width="2.2" stroke-linecap="round" opacity=".5"/>' +
      '<path d="M16,-22 q4,6 6,10 M-2,-30 q2,6 3,10" fill="none" stroke="' + crease +
      '" stroke-width="2" stroke-linecap="round" opacity=".38"/>' +
      '</g>';
  }

  /* Pineapple — body with crosshatch and a leaf crown. */
  var pineappleSeq = 0;
  function pineapple(cx, cy, s) {
    var uid = 'pcl' + (++pineappleSeq);
    var hatch = '';
    for (var i = -3; i <= 3; i++) {
      hatch += '<path d="M' + (i * 9 - 26) + ',-24 L' + (i * 9 + 14) + ',30" stroke="#D9941C" stroke-width="1.6" opacity=".55"/>';
      hatch += '<path d="M' + (i * 9 + 26) + ',-24 L' + (i * 9 - 14) + ',30" stroke="#D9941C" stroke-width="1.6" opacity=".55"/>';
    }
    var crown = '';
    [[-17, -32], [-9, -17], [0, 0], [9, 17], [17, 32]].forEach(function (p) {
      crown += '<g transform="rotate(' + p[1] + ' ' + p[0] + ' -26)">' +
        '<path d="M' + p[0] + ',-26 q-7,-19 0,-36 q7,17 0,36 Z" fill="#4E9C2B"/>' +
        '</g>';
    });
    return '<g transform="translate(' + cx + ' ' + cy + ') scale(' + s + ')">' +
      crown +
      '<ellipse cx="0" cy="4" rx="30" ry="34" fill="#F2B928"/>' +
      '<clipPath id="' + uid + '"><ellipse cx="0" cy="4" rx="30" ry="34"/></clipPath>' +
      '<g clip-path="url(#' + uid + ')">' + hatch + '</g>' +
      '<ellipse cx="0" cy="4" rx="30" ry="34" fill="none" stroke="#D08E12" stroke-width="2"/>' +
      '</g>';
  }

  /* Palm tree — curved trunk with a crown of drooping fronds. */
  function palm(x, baseY, h, dir, color, op) {
    dir = dir || 1;
    color = color || '#2E4720';
    var topX = x + 26 * dir, topY = baseY - h;
    var trunk = '<path d="M' + (x - 8) + ',' + baseY + ' C' + (x - 4) + ',' + (baseY - h * 0.55) +
      ' ' + (topX - 10) + ',' + (topY + h * 0.22) + ' ' + (topX - 6) + ',' + topY +
      ' L' + (topX + 6) + ',' + topY + ' C' + (topX + 2) + ',' + (topY + h * 0.22) +
      ' ' + (x + 10) + ',' + (baseY - h * 0.55) + ' ' + (x + 8) + ',' + baseY + ' Z" fill="' + color + '"/>';
    /* trunk ring texture */
    var rings = '';
    for (var r = 1; r < 6; r++) {
      var ry = topY + (baseY - topY) * (r / 6);
      var rx = topX + (x - topX) * (r / 6);
      rings += '<path d="M' + (rx - 7) + ',' + ry.toFixed(1) + ' h14" stroke="#22381A" stroke-width="1.6" opacity=".35"/>';
    }
    var fronds = '';
    [[-158, 1.0], [-126, 1.12], [-92, 1.0], [-58, 1.12], [-20, .92], [16, .8]].forEach(function (a) {
      var rad = a[0] * Math.PI / 180;
      var len = h * 0.42 * a[1];
      var ex = Math.cos(rad) * len * dir;
      var ey = Math.sin(rad) * len * 0.66 + len * 0.2;   /* droop */
      fronds += blade(topX, topY + 4, ex, ey, 0.19, color, 1);
    });
    return '<g opacity="' + (op == null ? 1 : op) + '">' + trunk + rings + fronds +
      '<circle cx="' + topX + '" cy="' + (topY + 2) + '" r="7" fill="' + color + '"/></g>';
  }

  /* Wide lifestyle band — a sunlit coastal horizon in silhouette.
     Graphic and calm rather than literal; replace with a photograph
     any time (see SITE.md). */
  function lifestyleScene() {
    var GROUND = 470, DARK = '#2E4720';

    /* a clump of cane stalks rising from the ground line */
    function clump(x, n, base, spread) {
      var g = '';
      for (var i = 0; i < n; i++) {
        var sx = x + (i - (n - 1) / 2) * spread;
        var hh = base * (0.74 + ((i * 7919) % 100) / 190);
        var top = GROUND - hh;
        g += blade(sx + 6, top + 10, -34 - hh * 0.12, -26, 0.2, DARK, 1) +
             blade(sx + 6, top + 18, 36 + hh * 0.12, -20, 0.2, DARK, 1) +
             stalk(sx, top, GROUND + 6, 12, (i % 2 ? 3 : -3), { color: DARK, node: '#24391B' });
      }
      return '<g fill="' + DARK + '">' + g + '</g>';
    }

    var clumps =
      clump(352, 4, 128, 17) + clump(596, 3, 104, 15) +
      clump(806, 4, 138, 18) + clump(1006, 3, 112, 16) + clump(150, 3, 96, 15);

    return '' +
      '<defs>' +
      '<linearGradient id="ls-sky" x1="0" y1="0" x2="0" y2="1">' +
      '<stop offset="0%" stop-color="#FFDE7C"/>' +
      '<stop offset="46%" stop-color="#FFF3BE"/>' +
      '<stop offset="100%" stop-color="#FDF7C5"/></linearGradient>' +
      '<radialGradient id="ls-sun" cx="50%" cy="50%" r="50%">' +
      '<stop offset="0%" stop-color="#FFCB06" stop-opacity=".85"/>' +
      '<stop offset="40%" stop-color="#FFCB06" stop-opacity=".3"/>' +
      '<stop offset="100%" stop-color="#FFCB06" stop-opacity="0"/></radialGradient>' +
      '<linearGradient id="ls-sea" x1="0" y1="0" x2="0" y2="1">' +
      '<stop offset="0%" stop-color="#7FD0EE" stop-opacity=".55"/>' +
      '<stop offset="100%" stop-color="#039ED5" stop-opacity=".3"/></linearGradient>' +
      '</defs>' +

      '<rect width="1440" height="560" fill="url(#ls-sky)"/>' +
      '<circle cx="1118" cy="146" r="238" fill="url(#ls-sun)"/>' +
      '<circle cx="1118" cy="146" r="86" fill="#FFCB06" opacity=".92"/>' +

      /* sea */
      '<rect y="396" width="1440" height="80" fill="url(#ls-sea)"/>' +
      waves({ x0: -20, x1: 1460, y: 416, rows: 3, gap: 17, amp: 6, cycles: 14, width: 7, opacity: .8 }) +

      /* silhouette horizon */
      clumps +
      palm(1214, GROUND + 6, 300, 1, DARK, 1) +
      palm(1330, GROUND + 6, 232, 1, DARK, 1) +
      palm(1096, GROUND + 6, 196, -1, DARK, 1) +
      '<path d="M0,' + GROUND + ' C240,' + (GROUND - 16) + ' 460,' + (GROUND + 12) + ' 720,' + GROUND +
      ' C980,' + (GROUND - 14) + ' 1200,' + (GROUND + 10) + ' 1440,' + (GROUND - 4) +
      ' L1440,560 L0,560 Z" fill="' + DARK + '"/>';
  }

  function hero() {
    /* Cane cluster flanks the glass so nothing reads as passing through it. */
    var canes =
      blade(96, 226, -66, -52, 0.2, '#41602F', 1) +
      blade(96, 240, 62, -44, 0.2, '#4E7038', 1) +
      stalk(84, 214, 566, 26, -7) +
      blade(157, 180, 70, -56, 0.2, '#41602F', 1) +
      blade(157, 196, -62, -40, 0.2, '#4E7038', 1) +
      stalk(146, 168, 566, 22, -3) +
      blade(464, 198, 72, -58, 0.2, '#41602F', 1) +
      blade(464, 214, -60, -42, 0.2, '#4E7038', 1) +
      stalk(452, 186, 566, 25, 4) +
      blade(522, 244, 60, -46, 0.2, '#4E7038', 1) +
      blade(522, 258, -56, -34, 0.2, '#41602F', 1) +
      stalk(512, 232, 566, 21, 8);

    /* glass geometry, hero scale */
    var topY = 262, botY = 648, topL = 196, topR = 426, botL = 228, botR = 394, juiceY = 320;
    var t = (juiceY - topY) / (botY - topY);
    var jL = (topL + (botL - topL) * t).toFixed(1);
    var jR = (topR + (botR - topR) * t).toFixed(1);
    var shape = 'M' + topL + ',' + topY + ' L' + botL + ',' + (botY - 14) +
      ' Q' + botL + ',' + botY + ' ' + (botL + 15) + ',' + botY +
      ' L' + (botR - 15) + ',' + botY + ' Q' + botR + ',' + botY + ' ' + botR + ',' + (botY - 14) +
      ' L' + topR + ',' + topY + ' Z';
    var juice = 'M' + jL + ',' + juiceY + ' L' + botL + ',' + (botY - 14) +
      ' Q' + botL + ',' + botY + ' ' + (botL + 15) + ',' + botY +
      ' L' + (botR - 15) + ',' + botY + ' Q' + botR + ',' + botY + ' ' + botR + ',' + (botY - 14) +
      ' L' + jR + ',' + juiceY + ' Z';

    var ice =
      '<g opacity=".5" fill="#FFFFFF">' +
      '<rect x="238" y="360" width="62" height="56" rx="14" transform="rotate(-12 269 388)"/>' +
      '<rect x="300" y="440" width="56" height="52" rx="13" transform="rotate(13 328 466)"/>' +
      '<rect x="246" y="510" width="50" height="46" rx="12" transform="rotate(-6 271 533)"/>' +
      '</g>';
    var drops = '';
    [[214, 372, 6], [222, 448, 4.4], [208, 524, 5], [404, 350, 5.4], [396, 430, 6.6],
     [388, 512, 4.6], [374, 586, 5.8], [230, 590, 4.4]].forEach(function (d) {
      drops += '<circle cx="' + d[0] + '" cy="' + d[1] + '" r="' + d[2] + '" fill="#FFFFFF" opacity=".7"/>';
    });

    return '' +
      '<defs>' +
      '<radialGradient id="ch-sun" cx="50%" cy="50%" r="50%">' +
      '<stop offset="0%" stop-color="#FFCB06" stop-opacity=".55"/>' +
      '<stop offset="62%" stop-color="#FFCB06" stop-opacity=".16"/>' +
      '<stop offset="100%" stop-color="#FFCB06" stop-opacity="0"/>' +
      '</radialGradient>' +
      '<linearGradient id="ch-juice" x1="0" y1="0" x2="0" y2="1">' +
      '<stop offset="0%" stop-color="#E2EE6A"/><stop offset="100%" stop-color="#A2C438"/>' +
      '</linearGradient>' +
      '<clipPath id="ch-clip"><path d="' + shape + '"/></clipPath>' +
      '</defs>' +

      '<circle cx="322" cy="300" r="248" fill="url(#ch-sun)"/>' +
      '<g class="hero-art__canes">' + canes + '</g>' +
      '<ellipse cx="310" cy="660" rx="128" ry="17" fill="#41602F" opacity=".15"/>' +

      '<g class="hero-art__glass">' +
      '<path d="' + shape + '" fill="#FFFFFF" opacity=".82"/>' +
      '<g clip-path="url(#ch-clip)">' +
      '<path d="' + juice + '" fill="url(#ch-juice)"/>' + ice +
      '<path d="M' + (topL + 17) + ',' + (topY + 20) + ' L' + (botL + 19) + ',' + (botY - 20) +
      '" stroke="#FFFFFF" stroke-width="7" opacity=".34" stroke-linecap="round"/>' +
      '</g>' +
      '<ellipse cx="311" cy="' + juiceY + '" rx="' + ((jR - jL) / 2).toFixed(1) + '" ry="12" fill="#E2EE6A"/>' +
      '<ellipse cx="311" cy="' + juiceY + '" rx="' + ((jR - jL) / 2 - 10).toFixed(1) + '" ry="7.5" fill="#FFFFFF" opacity=".32"/>' +
      '<path d="' + shape + '" fill="none" stroke="#41602F" stroke-width="4" opacity=".26"/>' +
      '<ellipse cx="311" cy="' + topY + '" rx="' + ((topR - topL) / 2).toFixed(1) + '" ry="14" fill="none" stroke="#41602F" stroke-width="4" opacity=".26"/>' +
      drops +
      limeWheel(214, 268, 46) +
      mintSprig(399, 256, 1.55, 22) +
      '</g>' +
      '<g class="hero-art__waves">' + waves({ x0: 46, x1: 574, y: 676, rows: 3, gap: 16, amp: 7, cycles: 6, width: 8 }) + '</g>';
  }


  /* Brand-intro artwork — a cane bundle. Deliberately NOT the glass:
     the glass is the hero's moment and appears once on the page. */
  function storyArt() {
    var stalks = '';
    [[68, 196, 26, -7], [126, 148, 22, -3], [186, 214, 28, 2],
     [248, 132, 21, 5], [306, 190, 25, 8], [358, 160, 19, 12]
    ].forEach(function (c, i) {
      var x = c[0], top = c[1], w = c[2], tilt = c[3];
      stalks +=
        blade(x + w / 2, top + 10, -(58 + i * 5), -44, 0.2, i % 2 ? '#4E7038' : '#41602F', 1) +
        blade(x + w / 2, top + 22, 54 + i * 4, -36, 0.2, i % 2 ? '#41602F' : '#4E7038', 1) +
        stalk(x, top, 520, w, tilt);
    });
    return '' +
      '<defs><radialGradient id="st-sun" cx="50%" cy="50%" r="50%">' +
      '<stop offset="0%" stop-color="#FFCB06" stop-opacity=".55"/>' +
      '<stop offset="100%" stop-color="#FFCB06" stop-opacity="0"/></radialGradient></defs>' +
      '<circle cx="252" cy="212" r="212" fill="url(#st-sun)"/>' +
      stalks +
      limeWheel(342, 348, 62) +
      mintSprig(120, 336, 2.1, -14) +
      waves({ x0: 18, x1: 462, y: 486, rows: 3, gap: 17, amp: 6, cycles: 5, width: 8 });
  }

  /* Product artwork — a flat colour field per flavour with the
     ingredient cropped by the frame. Each product owns a colour, so the
     menu grid reads as four things rather than one thing recoloured. */
  var FLAVOUR_PANELS = {
    lime:      { bg: '#C7DE5C', tint: '#D6E783' },
    mint:      { bg: '#8FC79A', tint: '#AAD5B2' },
    pineapple: { bg: '#FFD24E', tint: '#FFE083' },
    ginger:    { bg: '#F7CE8A', tint: '#FADEAF' },
    cane:      { bg: '#B8CF6A', tint: '#CBDC91' }
  };

  function flavourPanel(kind) {
    var f = FLAVOUR_PANELS[kind] || FLAVOUR_PANELS.lime;
    var art;
    if (kind === 'lime')           art = limeWheel(228, 112, 118);
    else if (kind === 'mint')      art = mintSprig(196, 112, 4.4, 12);
    else if (kind === 'pineapple') art = pineapple(224, 150, 2.4);
    else if (kind === 'ginger')    art = gingerRoot(226, 126, 2.7);
    else art = blade(150, 70, -76, -48, 0.2, '#41602F', 1) +
               blade(150, 86, 80, -40, 0.2, '#4E7038', 1) +
               stalk(136, 52, 268, 30, -5);
    return '<svg class="art--panel" viewBox="0 0 320 260" preserveAspectRatio="xMidYMid slice" ' +
      'role="img" aria-hidden="true" focusable="false">' +
      '<rect width="320" height="260" fill="' + f.bg + '"/>' +
      '<circle cx="62" cy="212" r="104" fill="' + f.tint + '" opacity=".55"/>' +
      art + '</svg>';
  }

  /* Final-CTA decoration: cane clusters at the margins over a wave base. */
  function finalDecor() {
    return '' +
      blade(126, 150, -76, -50, 0.25, '#41602F', 1) +
      blade(126, 168, 72, -40, 0.25, '#41602F', 1) +
      stalk(112, 128, 420, 26, -6) +
      blade(150, 210, 64, -44, 0.25, '#41602F', 1) +
      stalk(142, 190, 420, 20, 5) +
      blade(1310, 168, 74, -48, 0.25, '#41602F', 1) +
      blade(1310, 186, -70, -38, 0.25, '#41602F', 1) +
      stalk(1298, 146, 420, 26, 6) +
      blade(1272, 224, -62, -42, 0.25, '#41602F', 1) +
      stalk(1264, 204, 420, 20, -5) +
      waves({ x0: -20, x1: 1460, y: 372, rows: 3, gap: 20, amp: 8, cycles: 11, width: 9 });
  }

  return {
    waves: waves,
    wavePath: wavePath,
    hero: hero,
    flavourPanel: flavourPanel,
    palm: palm,
    lifestyleScene: lifestyleScene,
    storyArt: storyArt,
    finalDecor: finalDecor,
    limeWheel: limeWheel,
    mintSprig: mintSprig,
    stalk: stalk,
    blade: blade
  };
})();
