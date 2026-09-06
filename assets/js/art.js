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

  /* Flavour palettes for the juice in the glass. */
  var FLAVOURS = {
    lime:      { top: '#E2EE6A', bot: '#A8C93B', garnish: 'lime'  },
    mint:      { top: '#D8EC8E', bot: '#7FB93F', garnish: 'mint'  },
    pineapple: { top: '#FBE07A', bot: '#EFB524', garnish: 'wedge' },
    ginger:    { top: '#F6D77E', bot: '#D89A2A', garnish: 'root'  },
    cane:      { top: '#DDE96B', bot: '#AECB43', garnish: 'cane'  }
  };

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

  /* Ginger root — knobbly rhizome. */
  function gingerRoot(cx, cy, s) {
    return '<g transform="translate(' + cx + ' ' + cy + ') scale(' + s + ')">' +
      '<path d="M-30,4 C-34,-10 -18,-16 -8,-10 C-2,-22 14,-20 16,-8 C30,-10 36,4 26,12 ' +
      'C30,24 16,32 6,25 C-4,34 -22,28 -22,16 C-32,15 -34,10 -30,4 Z" fill="#E0A64B"/>' +
      '<path d="M-30,4 C-34,-10 -18,-16 -8,-10 C-2,-22 14,-20 16,-8 C30,-10 36,4 26,12 ' +
      'C30,24 16,32 6,25 C-4,34 -22,28 -22,16 C-32,15 -34,10 -30,4 Z" fill="none" stroke="#B87D24" stroke-width="2"/>' +
      '<path d="M-14,-6 C-8,2 -6,12 -10,20 M6,-12 C10,-2 10,10 4,20" stroke="#C98C2C" stroke-width="1.8" fill="none" opacity=".55"/>' +
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

  /* ---------- the glass ---------- */

  /* Tapered tumbler of juice. Reused at every size. */
  function glass(flavourKey, uid) {
    var f = FLAVOURS[flavourKey] || FLAVOURS.lime;
    var gid = 'jg-' + uid;

    /* geometry */
    var topY = 40, botY = 214, topL = 52, topR = 148, botL = 69, botR = 131;
    var juiceY = 72;
    var t = (juiceY - topY) / (botY - topY);
    var jL = (topL + (botL - topL) * t).toFixed(1);
    var jR = (topR + (botR - topR) * t).toFixed(1);

    var shape = 'M' + topL + ',' + topY + ' L' + botL + ',' + (botY - 10) +
      ' Q' + botL + ',' + botY + ' ' + (botL + 11) + ',' + botY +
      ' L' + (botR - 11) + ',' + botY + ' Q' + botR + ',' + botY + ' ' + botR + ',' + (botY - 10) +
      ' L' + topR + ',' + topY + ' Z';
    var juice = 'M' + jL + ',' + juiceY + ' L' + botL + ',' + (botY - 10) +
      ' Q' + botL + ',' + botY + ' ' + (botL + 11) + ',' + botY +
      ' L' + (botR - 11) + ',' + botY + ' Q' + botR + ',' + botY + ' ' + botR + ',' + (botY - 10) +
      ' L' + jR + ',' + juiceY + ' Z';

    /* ice cubes + condensation */
    var ice =
      '<g opacity=".55" fill="#FFFFFF">' +
      '<rect x="76"  y="96"  width="30" height="28" rx="7" transform="rotate(-13 91 110)"/>' +
      '<rect x="102" y="128" width="27" height="25" rx="6" transform="rotate(11 115 140)"/>' +
      '<rect x="79"  y="152" width="24" height="22" rx="6" transform="rotate(-7 91 163)"/>' +
      '</g>';
    var drops = '';
    [[64, 118, 3.1], [70, 152, 2.3], [136, 106, 2.7], [131, 145, 3.4], [126, 182, 2.4], [74, 190, 2.9]]
      .forEach(function (d) {
        drops += '<circle cx="' + d[0] + '" cy="' + d[1] + '" r="' + d[2] + '" fill="#FFFFFF" opacity=".72"/>';
      });

    /* rim garnish */
    var garnish = '';
    if (f.garnish === 'lime') garnish = limeWheel(63, 42, 21);
    else if (f.garnish === 'mint') garnish = mintSprig(137, 38, 0.82, 18);
    else if (f.garnish === 'wedge') garnish = pineapple(139, 41, 0.44);
    else if (f.garnish === 'root') garnish = gingerRoot(139, 43, 0.52);
    else if (f.garnish === 'cane') garnish = '<g transform="rotate(16 138 30)">' + stalk(133, 4, 62, 13, 0) + '</g>';

    return '' +
      '<defs>' +
      '<linearGradient id="' + gid + '" x1="0" y1="0" x2="0" y2="1">' +
      '<stop offset="0%" stop-color="' + f.top + '"/><stop offset="100%" stop-color="' + f.bot + '"/>' +
      '</linearGradient>' +
      '<clipPath id="' + gid + '-c"><path d="' + shape + '"/></clipPath>' +
      '</defs>' +
      /* shadow */
      '<ellipse cx="100" cy="221" rx="44" ry="7" fill="#41602F" opacity=".16"/>' +
      /* glass body */
      '<path d="' + shape + '" fill="#FFFFFF" opacity=".55"/>' +
      '<g clip-path="url(#' + gid + '-c)">' +
      '<path d="' + juice + '" fill="url(#' + gid + ')"/>' +
      ice +
      '<path d="M' + (topL + 6) + ',' + (topY + 6) + ' L' + (botL + 7) + ',' + (botY - 8) +
      '" stroke="#FFFFFF" stroke-width="5" opacity=".5" stroke-linecap="round"/>' +
      '</g>' +
      /* juice surface + rim */
      '<ellipse cx="100" cy="' + juiceY + '" rx="' + ((jR - jL) / 2).toFixed(1) + '" ry="5.5" fill="' + f.top + '"/>' +
      '<ellipse cx="100" cy="' + juiceY + '" rx="' + ((jR - jL) / 2 - 4).toFixed(1) + '" ry="3.6" fill="#FFFFFF" opacity=".3"/>' +
      '<path d="' + shape + '" fill="none" stroke="#41602F" stroke-width="2.4" opacity=".28"/>' +
      '<ellipse cx="100" cy="' + topY + '" rx="' + ((topR - topL) / 2).toFixed(1) + '" ry="6.5" fill="none" stroke="#41602F" stroke-width="2.4" opacity=".28"/>' +
      drops + garnish;
  }

  /* Product-card artwork. */
  function productArt(flavourKey, id) {
    return '<svg class="art art--glass" viewBox="0 0 200 236" role="img" aria-hidden="true" focusable="false">' +
      glass(flavourKey, id) + '</svg>';
  }

  /* ---------- hero composition ---------- */

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
      '<g class="hero-art__waves">' + waves({ x0: 52, x1: 568, y: 692, rows: 3, gap: 18, amp: 7, cycles: 6, width: 8 }) + '</g>';
  }


  /* Brand-intro portrait artwork. */
  function storyArt() {
    return '' +
      '<defs><radialGradient id="st-sun" cx="50%" cy="50%" r="50%">' +
      '<stop offset="0%" stop-color="#FFCB06" stop-opacity=".5"/>' +
      '<stop offset="100%" stop-color="#FFCB06" stop-opacity="0"/></radialGradient></defs>' +
      '<circle cx="286" cy="196" r="196" fill="url(#st-sun)"/>' +
      blade(106, 142, -64, -50, 0.2, '#41602F', 1) +
      blade(106, 158, 60, -42, 0.2, '#4E7038', 1) +
      blade(106, 176, -52, -12, 0.2, '#4E7038', 1) +
      stalk(94, 128, 486, 24, -5) +
      blade(366, 114, 66, -52, 0.2, '#41602F', 1) +
      blade(366, 130, -58, -40, 0.2, '#4E7038', 1) +
      blade(366, 148, 54, -10, 0.2, '#4E7038', 1) +
      stalk(356, 100, 486, 21, 5) +
      '<g transform="translate(88 152) scale(1.52)">' + glass('lime', 'story') + '</g>' +
      waves({ x0: 24, x1: 456, y: 508, rows: 2, gap: 16, amp: 6, cycles: 5, width: 7 });
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

  /* ---------- ingredient badges ---------- */

  function ingredient(kind) {
    var inner = '';
    if (kind === 'cane') {
      inner =
        blade(58, 30, -34, -20, 0.26, '#41602F', 1) +
        blade(58, 34, 32, -22, 0.26, '#41602F', 1) +
        blade(76, 46, 30, -12, 0.28, '#4E7038', 1) +
        stalk(50, 26, 100, 17, -6) +
        stalk(70, 42, 100, 13, 7);
    } else if (kind === 'lime') {
      inner = limeWheel(60, 62, 30);
    } else if (kind === 'mint') {
      inner = mintSprig(58, 56, 1.15, -6);
    } else if (kind === 'ginger') {
      inner = gingerRoot(60, 62, 0.98);
    } else if (kind === 'pineapple') {
      inner = pineapple(60, 66, 0.82);
    }
    return '<svg class="art art--badge" viewBox="0 0 120 120" role="img" aria-hidden="true" focusable="false">' +
      '<circle cx="60" cy="60" r="58" fill="#FDF7C5"/>' + inner + '</svg>';
  }

  /* ---------- feature line icons ---------- */

  var ICONS = {
    leaf: '<path d="M8 40C8 22 22 8 42 8c0 20-14 34-34 32Z"/><path d="M8 40c10-4 20-12 26-22"/>',
    press: '<path d="M10 12h28M14 12v10a10 10 0 0 0 20 0V12"/><path d="M24 32v6"/><path d="M13 40h22l-3 6H16Z"/>',
    drop: '<path d="M24 6c8 11 14 18 14 25a14 14 0 0 1-28 0c0-7 6-14 14-25Z"/>',
    sun: '<circle cx="24" cy="24" r="9"/><path d="M24 4v5M24 39v5M4 24h5M39 24h5M10 10l3.5 3.5M34.5 34.5 38 38M38 10l-3.5 3.5M13.5 34.5 10 38"/>'
  };

  function icon(name) {
    return '<svg class="art art--icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" ' +
      'stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" role="img" ' +
      'aria-hidden="true" focusable="false">' + (ICONS[name] || ICONS.leaf) + '</svg>';
  }

  /* Branded gallery tile — stands in for a post until real feed
     images are added in config.instagram.posts. */
  var TILES = {
    cane: { bg: '#41602F', ink: '#FDF7C5', wave: '#7FD0EE', label: 'FRESH CANE' },
    lime: { bg: '#FFCB06', ink: '#2C4520', wave: '#039ED5', label: 'FRESH LIME' },
    mint: { bg: '#F6EFB4', ink: '#2C4520', wave: '#039ED5', label: 'COOL MINT' }
  };

  function patternTile(kind) {
    var t = TILES[kind] || TILES.cane;
    var art;
    if (kind === 'lime') {
      art = limeWheel(100, 88, 46);
    } else if (kind === 'mint') {
      art = mintSprig(100, 84, 1.9, -8);
    } else {
      art = blade(102, 44, -50, -30, 0.19, t.ink, 1) +
        blade(102, 56, 52, -26, 0.19, t.ink, 1) +
        blade(102, 70, -40, -6, 0.19, t.ink, 1) +
        stalk(92, 34, 136, 20, -5, { color: t.ink, node: t.bg }) +
        blade(124, 70, 46, -26, 0.19, t.ink, 1) +
        blade(124, 82, -34, -12, 0.19, t.ink, 1) +
        stalk(116, 60, 136, 15, 6, { color: t.ink, node: t.bg });
    }
    return '<svg class="art--tile" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice" ' +
      'role="img" aria-hidden="true" focusable="false">' +
      '<rect width="200" height="200" fill="' + t.bg + '"/>' +
      art +
      '<text x="100" y="160" text-anchor="middle" fill="' + t.ink + '" ' +
      'font-family="Manrope, sans-serif" font-size="14" font-weight="800" ' +
      'letter-spacing="2.6">' + t.label + '</text>' +
      waves({ x0: -6, x1: 206, y: 182, rows: 2, gap: 11, amp: 4, cycles: 4, width: 5,
              color: t.wave, opacity: .95 }) +
      '</svg>';
  }

  return {
    waves: waves,
    wavePath: wavePath,
    glass: glass,
    productArt: productArt,
    hero: hero,
    ingredient: ingredient,
    icon: icon,
    patternTile: patternTile,
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
