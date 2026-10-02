# AURELLE — Luxury Fine Jewelry & Swiss Watchmaking Website

**Tagline:** *“Precision in Every Moment.”*

A sophisticated, lightweight, multi-page luxury editorial website for **AURELLE**, an independent Swiss horology and fine jewelry atelier. It features an interactive Bespoke Workflow Manager portal, collection filtering, product details modal, custom animations, and mobile navigation overlay.

---

## 🌟 Features & Highlights

- **Lightweight Architecture**: Standard HTML5, CSS3, Vanilla ES6+ JS, Bootstrap 5 CDN, and Google Fonts CDN (`Cormorant Garamond` & `Manrope`). Zero heavy animation libraries or frameworks.
- **Strict Brand Identity**: Luxury palette combining Obsidian Black (`#101010`), Champagne Gold (`#C6A56B`), Warm Ivory (`#F7F4EE`), and Muted Graphite (`#5F5A53`).
- **Responsive Mobile & Tablet Navigation (< 992px)**: Strictly displays ONLY `AURELLE` brand name on the left and `[☰]` hamburger button on the right. Reveals a full-screen luxury dark menu with numbered items (`01` through `06`), tagline, and animated entrance.
- **6 Complete Pages**:
  1. **Home (`index.html`)**: 7 distinct sections including cinematic hero, signature collections, split-screen horological feature, jewelry spotlight, bespoke experience, workflow preview, and footer statement.
  2. **About (`about.html`)**: Philosophy of permanence, maison origins, 3 core pillars, artisan showcase, and 6-stage quality standard.
  3. **Collections (`collections.html`)**: Interactive category filters (All, Mechanical Watches, Fine Jewelry), product detail modal with full horological specs and inquiry CTA, and macro gallery.
  4. **Craftsmanship (`craftsmanship.html`)**: Noble material selection, 6-step animated process timeline, behind-the-bench documentary perspective, and finishing standards.
  5. **Workflow Manager (`workflow.html`)**: Live interactive client portal demo with project switcher (`AUR-024`, `AUR-019`, `AUR-031`), real-time completion status, chronological activity feed, and bespoke project request form.
  6. **Contact (`contact.html`)**: Private consultation form with inline JS validation, salon details, and interactive FAQ accordion.
- **Custom Signature Animation System**: CSS clip reveals, IntersectionObserver scroll reveals, desktop 3D pointer tilt effects, and top scroll progress indicator.

---

## 📁 Project Structure

```text
aurelle/
├── index.html
├── about.html
├── collections.html
├── craftsmanship.html
├── workflow.html
├── contact.html
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── main.js
│   └── images/
│       ├── hero_watch.jpg
│       ├── meridian_watch.jpg
│       ├── celeste_jewelry.jpg
│       ├── nocturne_watch.jpg
│       ├── watch_movement.jpg
│       ├── jewelry_spotlight_ring.jpg
│       ├── jewelry_spotlight_necklace.jpg
│       ├── jewelry_spotlight_earrings.jpg
│       ├── atelier_workshop.jpg
│       ├── materials_gold_steel.jpg
│       ├── artisan_crafting.jpg
│       ├── atelier_interior.jpg
│       ├── about_hero.jpg
│       ├── philosophy_craft.jpg
│       └── bespoke_atelier.jpg
└── README.md
```

---

## 🚀 How to Run Locally

Since this application uses vanilla HTML, CSS, JavaScript, and Bootstrap 5 CDN, no compilation or build steps are required.

### Option 1: Direct File Opening
Simply open `aurelle/index.html` in any modern web browser.

### Option 2: Local HTTP Dev Server (Recommended)

Using **Node.js (npx http-server)**:
```bash
npx http-server aurelle -p 8080 -o
```

Using **Python 3**:
```bash
cd aurelle
python -m http.server 8080
```
Then navigate to `http://localhost:8080` in your web browser.

---

## 🧪 Verification & Quality Check

- [x] All 6 pages built with consistent design system & footer.
- [x] Responsive layout tested across 320px to 1920px without horizontal overflow.
- [x] Mobile/Tablet navbar below 992px contains ONLY logo and hamburger button.
- [x] Collection category filter & product detail modal fully functional.
- [x] Workflow Manager project switcher updates status and activity feeds dynamically.
- [x] Form validations & confirmation states implemented.
- [x] FAQ accordion toggles smoothly.
- [x] Keyboard navigation and `prefers-reduced-motion` supported.
