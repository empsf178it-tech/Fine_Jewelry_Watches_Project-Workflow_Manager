/**
 * AURELLE — LUXURY FINE JEWELRY & WATCHES
 * Master Interactive Logic & UI Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initPageProgress();
  initMobileMenu();
  initIntersectionObserver();
  initCollectionFilters();
  initProductModal();
  initWorkflowSelector();
  initForms();
  initAccordion();
  initSpotlightTilt();
  initLiveSwissClock();
  initBackToTop();
});

/* --------------------------------------------------------------------------
   1. NAVBAR SCROLL & ACTIVE PAGE INDICATOR
   -------------------------------------------------------------------------- */
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar-aurelle');
  if (!navbar) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Set active nav link based on current page URL
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link-item, .mobile-menu-link');
  
  navLinks.forEach(link => {
    const linkHref = link.getAttribute('href');
    if (linkHref === currentPath || (currentPath === '' && linkHref === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/* --------------------------------------------------------------------------
   2. TOP SCROLL PROGRESS BAR
   -------------------------------------------------------------------------- */
function initPageProgress() {
  const progressBar = document.querySelector('.page-progress-bar');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight > 0) {
      const progress = (window.scrollY / totalHeight) * 100;
      progressBar.style.width = `${progress}%`;
    }
  }, { passive: true });
}

/* --------------------------------------------------------------------------
   3. MOBILE HAMBURGER MENU (STRICT REQUIREMENT)
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-toggle-btn');
  const menuOverlay = document.querySelector('.mobile-menu-overlay');
  const menuLinks = document.querySelectorAll('.mobile-menu-link');

  if (!toggleBtn || !menuOverlay) return;

  function openMenu() {
    toggleBtn.classList.add('active');
    toggleBtn.setAttribute('aria-expanded', 'true');
    menuOverlay.classList.add('open');
    document.body.classList.add('menu-open');
  }

  function closeMenu() {
    toggleBtn.classList.remove('active');
    toggleBtn.setAttribute('aria-expanded', 'false');
    menuOverlay.classList.remove('open');
    document.body.classList.remove('menu-open');
  }

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (menuOverlay.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  menuLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  const closeBtns = document.querySelectorAll('.mobile-close-btn');
  closeBtns.forEach(btn => {
    btn.addEventListener('click', closeMenu);
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuOverlay.classList.contains('open')) {
      closeMenu();
    }
  });
}

/* --------------------------------------------------------------------------
   4. INTERSECTION OBSERVER FOR SCROLL REVEALS
   -------------------------------------------------------------------------- */
function initIntersectionObserver() {
  const revealElements = document.querySelectorAll('.reveal-up, .gold-line-anim');
  if (!revealElements.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => observer.observe(el));
}

/* --------------------------------------------------------------------------
   5. COLLECTIONS FILTERING (COLLECTIONS PAGE)
   -------------------------------------------------------------------------- */
function initCollectionFilters() {
  const filterBtns = document.querySelectorAll('.filter-tab-btn');
  const collectionCards = document.querySelectorAll('.collection-item-card');

  if (!filterBtns.length || !collectionCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      collectionCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'block';
          setTimeout(() => card.style.opacity = '1', 50);
        } else {
          card.style.opacity = '0';
          setTimeout(() => card.style.display = 'none', 300);
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   6. PRODUCT DETAIL MODAL
   -------------------------------------------------------------------------- */
const productDatabase = {
  'meridian-automatic': {
    title: 'The Meridian Automatic',
    category: 'Mechanical Watch',
    material: '18K Rose Gold & Obsidian Sunray Dial',
    movement: 'Calibre A-101 Manufacture Self-Winding',
    reserve: '72 Hours Power Reserve',
    description: 'The Meridian Automatic embodies contemporary restraint and Swiss watchmaking precision. Featuring a hand-finished rose gold case and subtle gold indices.',
    image: 'assets/images/meridian_watch.jpg'
  },
  'celeste-diamond': {
    title: 'Celeste Diamond Suite',
    category: 'Fine Jewelry',
    material: '18K Champagne Gold & Flawless Solitaire Diamonds',
    gems: 'VVS1 Colorless Diamonds (3.45 Carats Total)',
    description: 'Sculpted with delicate precision, the Celeste suite reflects natural illumination with timeless balance and artisanal setting techniques.',
    image: 'assets/images/celeste_jewelry.jpg'
  },
  'nocturne-skeleton': {
    title: 'Nocturne Tourbillon Skeleton',
    category: 'Haute Horlogerie',
    material: 'Black Titanium & Satin Gold Accents',
    movement: 'Calibre A-305 Flying Tourbillon',
    reserve: '80 Hours Power Reserve',
    description: 'An architectural tribute to dark elegance. The skeletonized architecture reveals every hand-bevelled gear wheel and balance spring.',
    image: 'assets/images/meridian_watch.jpg'
  },
  'solenne-necklace': {
    title: 'Solenne Sculptural Pendant',
    category: 'Fine Jewelry',
    material: '18K Yellow Gold & Brilliant Pavé Settings',
    gems: 'Selected Pear-Cut Diamonds',
    description: 'An expressive statement of continuous form. Designed to drape effortlessly against the collar with handcrafted fluid linkage.',
    image: 'assets/images/celeste_jewelry.jpg'
  }
};

function initProductModal() {
  const modalBackdrop = document.querySelector('.product-modal-backdrop');
  if (!modalBackdrop) return;

  const modalClose = modalBackdrop.querySelector('.modal-close-btn');
  const triggerBtns = document.querySelectorAll('[data-product-id]');

  triggerBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const productId = btn.getAttribute('data-product-id');
      const product = productDatabase[productId];

      if (product) {
        document.getElementById('modal-img').src = product.image;
        document.getElementById('modal-title').textContent = product.title;
        document.getElementById('modal-category').textContent = product.category;
        document.getElementById('modal-material').textContent = product.material;
        document.getElementById('modal-desc').textContent = product.description;
        
        modalBackdrop.classList.add('active');
        document.body.classList.add('menu-open');
      }
    });
  });

  function closeModal() {
    modalBackdrop.classList.remove('active');
    document.body.classList.remove('menu-open');
  }

  if (modalClose) modalClose.addEventListener('click', closeModal);
  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('active')) closeModal();
  });
}

/* --------------------------------------------------------------------------
   7. WORKFLOW MANAGER INTERACTIVE DEMO (PAGE 5 & HOME)
   -------------------------------------------------------------------------- */
const sampleProjects = {
  'AUR-024': {
    ref: 'CHRONO-AUR-024',
    title: 'AUR-024 — Bespoke Engagement Ring',
    client: 'Victoria S.',
    specialist: 'Henrik Vane (Master Jeweler)',
    metal: '18K Champagne Gold',
    gem: '2.45ct D-IF Oval Solitaire',
    bench: 'Zurich Atelier (Bench #4)',
    image: 'assets/images/bespoke_sketch.jpg',
    stage: 'Crafting in Progress',
    progress: 72,
    completionDate: 'October 24, 2026',
    artisanNote: '"The 18K champagne gold alloy has been poured and density verified. Next step is precision hand-setting of the solitaire diamond halo."',
    activities: [
      { date: 'Oct 01, 2026', text: '18K Champagne gold casting completed and hand-inspected.', sub: 'Inspected by Senior Jeweler Henrik Vane · Purity: 750 Gold Stamp Passed.' },
      { date: 'Sep 24, 2026', text: 'Client approved 3D CAD render and central solitaire stone selection.', sub: 'GIA Certificate #64829104 locked for mounting assembly.' },
      { date: 'Sep 18, 2026', text: 'Initial private design consultation held in Zurich Atelier.', sub: 'Custom hand-sketch approved by client Victoria S.' }
    ]
  },
  'AUR-019': {
    ref: 'HORO-AUR-019',
    title: 'AUR-019 — Custom Meridian Chronograph',
    client: 'Alexander M.',
    specialist: 'Claire Dupont (Horological Engineer)',
    metal: 'Grade 5 Titanium & Rose Gold',
    gem: '26 Synthetic Sapphire Jewels',
    bench: 'Geneva Horology Studio (Bench #2)',
    image: 'assets/images/workflow_cad_rendering.jpg',
    stage: 'Quality Inspection Pending',
    progress: 90,
    completionDate: 'October 12, 2026',
    artisanNote: '"5-position chronometric timing calibration achieved +1.2s/day variance. Final casing and water resistance testing underway."',
    activities: [
      { date: 'Sep 29, 2026', text: '5-position chronometric timing calibration verified.', sub: 'COSC accuracy standard exceeded across 48-hour testing cycle.' },
      { date: 'Sep 21, 2026', text: 'Hand-engraved rotor and sapphire caseback assembly completed.', sub: 'Custom initials AM laser-inscribed on rotor edge.' },
      { date: 'Sep 10, 2026', text: 'Movement component hand-beveling approved.', sub: 'Côtes de Genève finishing verified under 10x loupe.' }
    ]
  },
  'AUR-031': {
    ref: 'SUITE-AUR-031',
    title: 'AUR-031 — Solenne Diamond Suite',
    client: 'Elena R.',
    specialist: 'Marcus Sterling (Gemologist)',
    metal: '950 Platinum & 18K Yellow Gold',
    gem: '3.20ct D-Flawless Cushion + 48 Baguettes',
    bench: 'Paris High Jewelry Bench #1',
    image: 'assets/images/quality_inspection.jpg',
    stage: 'Concept Approval',
    progress: 35,
    completionDate: 'November 15, 2026',
    artisanNote: '"Concept sketches and photorealistic raytraced 3D models submitted for client approval. Gemstone pairing verified."',
    activities: [
      { date: 'Oct 02, 2026', text: 'Concept sketches and photorealistic CAD submitted for review.', sub: 'Interactive 3D model link transmitted to client vault.' },
      { date: 'Sep 28, 2026', text: 'Pairing of round brilliant D-flawless diamonds finalized.', sub: 'Color and clarity matching certified by Zurich laboratory.' },
      { date: 'Sep 25, 2026', text: 'Consultation completed at Paris Atelier.', sub: 'Design brief and metal preference documented.' }
    ]
  }
};

function initWorkflowSelector() {
  const btns = document.querySelectorAll('.project-selector-btn');
  if (!btns.length) return;

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const projId = btn.getAttribute('data-project');
      const data = sampleProjects[projId];

      if (data) {
        const titleEl = document.getElementById('wf-proj-title');
        const clientEl = document.getElementById('wf-client-name');
        const specEl = document.getElementById('wf-specialist');
        const stageEl = document.getElementById('wf-stage');
        const targetEl = document.getElementById('wf-target-date');
        const progressLine = document.getElementById('wf-progress-line');
        const progressPct = document.getElementById('wf-progress-pct');
        const feedEl = document.getElementById('wf-activity-feed');
        const imgEl = document.getElementById('wf-proj-img');
        const metalEl = document.getElementById('wf-metal-spec');
        const gemEl = document.getElementById('wf-gem-spec');
        const benchEl = document.getElementById('wf-bench-spec');
        const refEl = document.getElementById('wf-ref-spec');
        const noteEl = document.getElementById('wf-artisan-note');

        if (titleEl) titleEl.textContent = data.title;
        if (clientEl) clientEl.textContent = data.client;
        if (specEl) specEl.textContent = data.specialist;
        if (stageEl) stageEl.textContent = data.stage;
        if (targetEl) targetEl.textContent = data.completionDate;
        if (progressPct) progressPct.textContent = `${data.progress}%`;
        if (progressLine) progressLine.style.width = `${data.progress}%`;
        if (imgEl && data.image) imgEl.src = data.image;
        if (metalEl) metalEl.textContent = data.metal;
        if (gemEl) gemEl.textContent = data.gem;
        if (benchEl) benchEl.textContent = data.bench;
        if (refEl) refEl.textContent = data.ref;
        if (noteEl && data.artisanNote) noteEl.textContent = data.artisanNote;

        if (feedEl) {
          feedEl.innerHTML = data.activities.map(act => `
            <div class="d-flex gap-3 align-items-start mb-3 pb-3 border-bottom border-light">
              <span class="badge bg-warm-ivory border border-gold text-obsidian fw-bold p-2" style="font-size:0.7rem;">${act.date}</span>
              <div>
                <p class="mb-1 text-obsidian fw-semibold" style="font-size:0.875rem;">${act.text}</p>
                <span class="text-muted-custom small">${act.sub || ''}</span>
              </div>
            </div>
          `).join('');
        }
      }
    });
  });
}

/* --------------------------------------------------------------------------
   8. FORM VALIDATION & NOTIFICATION STATE
   -------------------------------------------------------------------------- */
function initForms() {
  const forms = document.querySelectorAll('.form-aurelle-validate');

  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
      inputs.forEach(input => {
        if (!input.value.trim()) {
          isValid = false;
          input.style.borderColor = '#dc3545';
        } else {
          input.style.borderColor = 'var(--color-border-light)';
        }
      });

      if (isValid) {
        const container = form.parentElement;
        container.innerHTML = `
          <div class="text-center py-5">
            <div class="mb-3" style="font-size: 2.5rem; color: var(--color-champagne-gold);">✓</div>
            <h3 class="mb-2">Inquiry Received</h3>
            <p class="lead-text mb-4">Thank you for contacting AURELLE. A dedicated concierge will review your message and connect with you shortly.</p>
            <span class="section-label">CONFIRMATION REF: AUR-${Math.floor(100000 + Math.random() * 900000)}</span>
          </div>
        `;
      }
    });
  });
}

/* --------------------------------------------------------------------------
   9. FAQ ACCORDION TOGGLE
   -------------------------------------------------------------------------- */
function initAccordion() {
  const accordionItems = document.querySelectorAll('.faq-accordion-item');

  accordionItems.forEach(item => {
    const header = item.querySelector('.faq-accordion-header');
    const content = item.querySelector('.faq-accordion-content');

    if (!header || !content) return;

    header.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');

      accordionItems.forEach(i => {
        i.classList.remove('active');
        const c = i.querySelector('.faq-accordion-content');
        if (c) c.style.maxHeight = null;
      });

      if (!isOpen) {
        item.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });
}

/* --------------------------------------------------------------------------
   10. SPOTLIGHT IMAGE DESKTOP 3D TILT EFFECT
   -------------------------------------------------------------------------- */
function initSpotlightTilt() {
  if (window.innerWidth < 992) return;

  const cards = document.querySelectorAll('.spotlight-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const tiltX = (y - centerY) / 45;
      const tiltY = (centerX - x) / 45;

      card.style.zIndex = '10';
      card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.zIndex = '1';
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0deg)`;
    });
  });
}

/* --------------------------------------------------------------------------
   11. LIVE REAL-TIME SWISS HOROLOGICAL CLOCK (HERO WIDGET)
   -------------------------------------------------------------------------- */
function initLiveSwissClock() {
  const hourHand = document.getElementById('live-hour-hand');
  const minuteHand = document.getElementById('live-minute-hand');
  const secondHand = document.getElementById('live-second-hand');
  const digitalTimeDisplay = document.getElementById('live-clock-time-display');

  if (!hourHand || !minuteHand || !secondHand) return;

  function updateClock() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const milliseconds = now.getMilliseconds();

    // Smooth sweeping mechanical movement (60fps)
    const exactSeconds = seconds + milliseconds / 1000;
    const secondDeg = (exactSeconds / 60) * 360;
    const minuteDeg = ((minutes + exactSeconds / 60) / 60) * 360;
    const hourDeg = (((hours % 12) + minutes / 60) / 12) * 360;

    secondHand.style.transform = `rotate(${secondDeg}deg)`;
    minuteHand.style.transform = `rotate(${minuteDeg}deg)`;
    hourHand.style.transform = `rotate(${hourDeg}deg)`;

    if (digitalTimeDisplay) {
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const formattedHours = String(hours % 12 || 12).padStart(2, '0');
      const formattedMinutes = String(minutes).padStart(2, '0');
      const formattedSeconds = String(seconds).padStart(2, '0');
      digitalTimeDisplay.textContent = `${formattedHours}:${formattedMinutes}:${formattedSeconds} ${ampm}`;
    }

    requestAnimationFrame(updateClock);
  }

  requestAnimationFrame(updateClock);
}

/* --------------------------------------------------------------------------
   12. FLOATING BACK TO TOP BUTTON
   -------------------------------------------------------------------------- */
function initBackToTop() {
  const backBtn = document.getElementById('backToTopBtn');
  if (!backBtn) return;

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      backBtn.classList.add('visible');
    } else {
      backBtn.classList.remove('visible');
    }
  };

  window.addEventListener('scroll', toggleVisibility, { passive: true });
  toggleVisibility();

  backBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
