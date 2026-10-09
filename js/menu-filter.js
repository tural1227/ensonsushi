/**
 * ENSON SUSHI - NATURAL ROTATING ROUND TABLE CONTROLLER (職人の回転膳)
 * Features:
 * 1. 3D Cylindrical Orbit Physics with Real Transparent Ceramic Plate Images (sushi/slider-*.webp)
 * 2. Smooth GSAP Table Rotation (Next/Prev buttons, Click-any-plate to front, Drag/Swipe with inertia)
 * 3. Synchronized Gastronomic Dossier with Dynamic Sensory Gauges & Counters
 * 4. Flying Particle FX into "My Omakase Tasting Flight" Island Tray
 * 5. Sommelier Cellar Modal Dossier & Reservation Sync
 */

const SUSHI_PLATE_DATABASE = [
  {
    id: 'sushi-platter-rainbow',
    category: 'platters',
    title: 'Supreme Rainbow Dragon Platter',
    subtitle: '16-Piece Signature Selection',
    kanji: 'レインボーロール盛り合わせ',
    price: '$48',
    rawPrice: 48,
    image: 'sushi/slider-8.webp',
    badge: 'Chef Signature',
    isFeatured: true,
    desc: 'An exquisite circle of flame-seared Ora King salmon, fresh yellowfin tuna, sliced Haas avocado, and Hokkaido ikura pearls on hand-pressed Akasu red vinegar rice.',
    tags: ['16 Pieces', 'Flame-Seared', 'Ikura Caviar', 'Chef Selection'],
    flavor: {
      umami: 96,
      richness: 92,
      seasonality: 98,
      temp: '36.5°C'
    },
    anatomy: [
      { layer: 'Crown', desc: 'Oscietra Caviar & Fresh Wasabi Mayo' },
      { layer: 'Drape', desc: 'Ora King Salmon & Yellowfin Tuna' },
      { layer: 'Core', desc: 'Crisp Cucumber & Soft Crab' },
      { layer: 'Shari', desc: '10-Year Aged Akasu Rice (36.5°C)' }
    ],
    details: {
      origin: 'Toyosu Fish Market, Tokyo',
      pairing: 'Kubota Manju Junmai Daiginjo (12°C)',
      technique: 'Precision diamond cross-hatch knife scoring & binchotan flash sear',
      allergens: 'Soy, Fish, Crustaceans, Sesame',
      sommelierNote: 'Velvety salmon oils balanced by the crisp mineral elegance of Junmai Daiginjo.'
    }
  },
  {
    id: 'sushi-platter-tempura',
    category: 'platters',
    title: 'Soft-Shell Crab & Tempura Platter',
    subtitle: 'Crispy Artisan Hand-Rolls',
    kanji: '天ぷら巻き寿司盛り合わせ',
    price: '$44',
    rawPrice: 44,
    image: 'sushi/slider-9.webp',
    badge: 'Crispy Tempura',
    isFeatured: true,
    desc: 'Golden crisp soft-shell crab, sweet tamago omelette, and tempura tiger prawn rolls finished with micro-herbs, spicy kabayaki tare, and freshly grated wasabi.',
    tags: ['Soft-Shell Crab', 'Tiger Prawn', 'Crispy Crunch'],
    flavor: {
      umami: 92,
      richness: 88,
      seasonality: 90,
      temp: '38.0°C'
    },
    anatomy: [
      { layer: 'Topping', desc: 'Spicy Unagi Glaze & Micro Shiso' },
      { layer: 'Shell', desc: 'Flash-Fried Soft-Shell Crab' },
      { layer: 'Inside', desc: 'Sweet Tamagoyaki & Crisp Lettuce' },
      { layer: 'Wrap', desc: 'Toasted Ariake Gold Nori' }
    ],
    details: {
      origin: 'Kagoshima & Ariake Bay',
      pairing: 'Isojiman Junmai Ginjo',
      technique: '180°C pure sesame oil flash frying for ultralight crispness',
      allergens: 'Shellfish, Gluten, Egg, Soy',
      sommelierNote: 'The savory tempura crunch pairs harmoniously with chilled dry Junmai.'
    }
  },
  {
    id: 'sushi-platter-kyoto',
    category: 'platters',
    title: 'Kyoto Artisan Maki & Nigiri Platter',
    subtitle: 'Seasonal Vegetarian Kaiseki',
    kanji: '精進寿司盛り合わせ',
    price: '$38',
    rawPrice: 38,
    image: 'sushi/slider-7.webp',
    badge: 'Shojin Kaiseki',
    isFeatured: false,
    desc: 'A refined temple-inspired plate featuring sweet baby corn nigiri, flame-grilled green asparagus with toasted sesame, and Haas avocado norimaki.',
    tags: ['Shojin Ryori', 'Vegetarian Art', 'Kyoto Heritage'],
    flavor: {
      umami: 86,
      richness: 75,
      seasonality: 100,
      temp: '36.0°C'
    },
    anatomy: [
      { layer: 'Glaze', desc: 'White Truffle & Sweet Mirin Tare' },
      { layer: 'Garden', desc: 'Sweet Baby Corn & Grilled Asparagus' },
      { layer: 'Wasabi', desc: 'Sharkskin Grated Shizuoka Wasabi' },
      { layer: 'Shari', desc: 'Spring Water Cooked Koshihikari' }
    ],
    details: {
      origin: 'Kyoto Organic Farms',
      pairing: 'Ippodo First-Harvest Sencha or Dassai 23',
      technique: 'Light binchotan charcoal grill to unlock natural vegetable sugars',
      allergens: 'Soy, Sesame',
      sommelierNote: 'Delicate herbal sweetness with profound mineral purity.'
    }
  },
  {
    id: 'sushi-roll-tamago',
    category: 'rolls',
    title: 'Beetroot Tamago Crepe Roll',
    subtitle: 'Kyoto Farmstead Creation',
    kanji: 'ビーツ玉子ロール',
    price: '$32',
    rawPrice: 32,
    image: 'sushi/slider-5.webp',
    badge: 'Artisan Roll',
    isFeatured: false,
    desc: 'Delicate ruby beetroot infused shari and fresh Ora King salmon wrapped in golden Japanese egg crepe, served with wild field greens and yuzu lemon dressing.',
    tags: ['Beetroot Crepe', 'King Salmon', 'Wild Greens'],
    flavor: {
      umami: 88,
      richness: 82,
      seasonality: 95,
      temp: '35.0°C'
    },
    anatomy: [
      { layer: 'Wrap', desc: 'Hand-Rolled Golden Tamago Crepe' },
      { layer: 'Color', desc: 'Natural Ruby Beetroot Infused Rice' },
      { layer: 'Core', desc: 'Fresh Ora King Salmon & Avocado' },
      { layer: 'Salad', desc: 'Kyoto Microgreens & Yuzu Kosho' }
    ],
    details: {
      origin: 'Kyoto & Hokkaido',
      pairing: 'Kenbishi Mizuho Junmai Sake',
      technique: 'Silky 7-layer dashi tamagoyaki pan-folding',
      allergens: 'Egg, Fish, Soy',
      sommelierNote: 'Subtle earthy sweetness and bright citrus acidity in complete balance.'
    }
  },
  {
    id: 'sushi-donburi-salmon-seared',
    category: 'donburi',
    title: 'Flame-Glazed Ora Salmon Donburi',
    subtitle: 'Torched Belly & Crispy Lotus Root',
    kanji: 'サーモン照り焼き丼',
    price: '$34',
    rawPrice: 34,
    image: 'sushi/slider-2.webp',
    badge: 'Aburi Sear',
    isFeatured: true,
    desc: 'Thick cut New Zealand Ora King salmon seared over white oak coals with sweet teriyaki mirin glaze, crispy renkon lotus root, and Japanese pickled ginger blossom.',
    tags: ['Ora King Belly', 'Aburi Flame', 'Crispy Lotus'],
    flavor: {
      umami: 94,
      richness: 90,
      seasonality: 95,
      temp: '40.0°C'
    },
    anatomy: [
      { layer: 'Crunch', desc: 'Fried Crispy Renkon Lotus Root' },
      { layer: 'Fish', desc: 'Flame-Torched Ora King Salmon Belly' },
      { layer: 'Tare', desc: 'House Sweet Mirin & Smoked Dashi' },
      { layer: 'Base', desc: 'Warm Steamed Koshihikari Rice' }
    ],
    details: {
      origin: 'Marlborough Sounds, New Zealand',
      pairing: 'Dassai Beyond or Hitachino White Ale',
      technique: 'Aburi direct surface flame caramelization',
      allergens: 'Fish, Soy, Sesame',
      sommelierNote: 'Smoky char and rich salmon omega oils cut cleanly by pickled ginger.'
    }
  },
  {
    id: 'sushi-donburi-salmon-raw',
    category: 'donburi',
    title: 'Imperial Salmon Sashimi & Ikura Bowl',
    subtitle: 'Ocean Fresh Sashimi Harvest',
    kanji: '生サーモンイクラ丼',
    price: '$38',
    rawPrice: 38,
    image: 'sushi/slider-4.webp',
    badge: 'Raw Sashimi',
    isFeatured: false,
    desc: 'Generous ribbons of melt-in-mouth wild salmon sashimi, marinated Hokkaido ikura pearls, Haas avocado, and fresh wasabi atop body-calibrated 36.5°C shari.',
    tags: ['Wild Salmon', 'Hokkaido Ikura', '36.5°C Shari'],
    flavor: {
      umami: 96,
      richness: 86,
      seasonality: 95,
      temp: '36.5°C'
    },
    anatomy: [
      { layer: 'Garnish', desc: 'Hokkaido Ikura & Sliced Avocado' },
      { layer: 'Sashimi', desc: 'Grade-AAA Wild Ora King Salmon Slices' },
      { layer: 'Wasabi', desc: 'Sharkskin Grated Mazuma Root' },
      { layer: 'Shari', desc: 'Warm Hand-Calibrated Akasu Rice' }
    ],
    details: {
      origin: 'Hokkaido & Toyosu Market',
      pairing: 'Juyondai Honmaru Special Junmai',
      technique: 'Sashimi diamond slicing against the grain for maximum tenderness',
      allergens: 'Fish, Soy',
      sommelierNote: 'Pure ocean sweetness and popping ikura texture in transcendent harmony.'
    }
  },
  {
    id: 'sushi-salad-kaisou',
    category: 'salad',
    title: 'Toyosu Seasonal Kaisou Salad Bowl',
    subtitle: 'Wild Seaweeds & Organic Garden',
    kanji: '旬の海藻彩りサラダ',
    price: '$22',
    rawPrice: 22,
    image: 'sushi/slider-10.webp',
    badge: 'Garden Fresh',
    isFeatured: false,
    desc: 'Crisp organic field arugula, cherry tomatoes, shaved radish, and seven varieties of wild coastal Japanese seaweeds tossed in toasted sesame yuzu dressing.',
    tags: ['7 Wild Seaweeds', 'Organic Greens', 'Yuzu Dressing'],
    flavor: {
      umami: 82,
      richness: 65,
      seasonality: 100,
      temp: '8.0°C'
    },
    anatomy: [
      { layer: 'Crown', desc: 'Purple Sea Sprout Microgreens' },
      { layer: 'Seaweed', desc: 'Seven Varieties of Coastal Kaisou' },
      { layer: 'Garden', desc: 'Crisp Arugula & Japanese Sweet Tomato' },
      { layer: 'Dressing', desc: 'First-Press Toasted Sesame & Kochi Yuzu' }
    ],
    details: {
      origin: 'Okinawa Coast & Kyoto Organic Farms',
      pairing: 'Chilled Sparkling Yuzu Sake',
      technique: 'Ice-water shock crisping to preserve vibrant crunch',
      allergens: 'Sesame, Soy',
      sommelierNote: 'Refreshing marine minerality and bright citrus aromatics.'
    }
  }
];

const KANJI_INDEX = ['壱', '弐', '参', '四', '五', '六', '七', '八', '九', '拾'];

class NaturalRotatingTableController {
  constructor() {
    this.dishes = [...SUSHI_PLATE_DATABASE];
    this.totalDishes = this.dishes.length;
    this.currentIndex = 0;
    this.currentAngle = 0; // In radians
    this.isDragging = false;
    this.startX = 0;
    this.startAngle = 0;
    this.hasMoved = false;

    // DOM Elements
    this.viewport = document.querySelector('#table-stage-viewport');
    this.platesOrbit = document.querySelector('#table-plates-orbit');
    this.activeDossier = document.querySelector('#table-active-dossier');
    this.prevBtn = document.querySelector('#table-prev-btn');
    this.nextBtn = document.querySelector('#table-next-btn');
    this.courseNumEl = document.querySelector('#table-course-num');
    this.courseTotalEl = document.querySelector('#table-course-total');
    this.hudTitle = document.querySelector('#table-hud-title');
    this.hudPrice = document.querySelector('#table-hud-price');
    this.catPills = document.querySelectorAll('.zen-cat-btn, .menu-cat-pill');

    // Modal Elements
    this.modal = document.querySelector('#dish-modal');
    this.modalContent = document.querySelector('#modal-dynamic-content');
    this.modalClose = document.querySelector('#modal-close-btn');

    this.init();
  }

  init() {
    this.initPlates();
    this.updatePlatePositions();
    this.updateHUD();
    this.bindControls();
    this.bindDragPhysics();
    this.bindCategories();
    this.bindModal();
    window.addEventListener('resize', () => this.updatePlatePositions());
  }

  /* --------------------------------------------------------------------------
     1. CREATE TRANSPARENT SUSHI PLATES IN 3D ORBIT
     -------------------------------------------------------------------------- */
  initPlates() {
    if (!this.platesOrbit) return;

    this.platesOrbit.innerHTML = this.dishes.map((dish, idx) => `
      <div class="table-plate-node ${idx === 0 ? 'active-front' : ''}" data-index="${idx}" data-id="${dish.id}">
        <img src="${dish.image}" alt="${dish.title}" class="table-plate-img" loading="lazy">
        <span class="plate-node-badge">${KANJI_INDEX[idx] || (idx + 1)}</span>
        <span class="plate-node-price">${dish.price}</span>
      </div>
    `).join('');

    // Click on any plate rotates it smoothly to the front
    this.platesOrbit.querySelectorAll('.table-plate-node').forEach(node => {
      node.addEventListener('click', (e) => {
        if (this.hasMoved) return; // Prevent click trigger when dragging
        const idx = parseInt(node.dataset.index, 10);
        if (idx !== this.currentIndex) {
          this.rotateToIndex(idx);
        }
      });
    });
  }

  /* --------------------------------------------------------------------------
     2. 3D ISOMETRIC ORBIT PHYSICS & POSITIONING
     -------------------------------------------------------------------------- */
  updatePlatePositions() {
    if (!this.platesOrbit) return;
    const plateEls = this.platesOrbit.querySelectorAll('.table-plate-node');
    if (!plateEls.length) return;

    const isMobile = window.innerWidth <= 768;
    const rx = isMobile ? Math.min(160, window.innerWidth * 0.36) : Math.min(320, window.innerWidth * 0.30);
    const ry = rx * 0.38;
    const N = this.totalDishes;
    const step = (2 * Math.PI) / N;

    plateEls.forEach((el, idx) => {
      // theta = 0 is at the FRONT (bottom center of isometric table)
      const theta = this.currentAngle + (idx * step);
      const x = rx * Math.sin(theta);
      const y = ry * Math.cos(theta);
      
      // Depth factor z: 1 (front) to -1 (back)
      const z = Math.cos(theta);
      // Normalized depth d: 0 (back) to 1 (front)
      const d = (z + 1) / 2;

      const scale = isMobile 
        ? (0.68 + 0.40 * d) 
        : (0.75 + 0.40 * d);

      const zIndex = Math.round(d * 100);

      el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
      el.style.opacity = 1;
      el.style.zIndex = zIndex;
      el.style.filter = 'none';

      if (idx === this.currentIndex) {
        el.classList.add('active-front');
      } else {
        el.classList.remove('active-front');
      }
    });
  }

  /* --------------------------------------------------------------------------
     3. ROTATION ENGINE & GSAP TWEEN
     -------------------------------------------------------------------------- */
  rotateToIndex(targetIdx, playAudio = true) {
    targetIdx = ((targetIdx % this.totalDishes) + this.totalDishes) % this.totalDishes;
    this.currentIndex = targetIdx;

    if (playAudio && window.zenAudio) {
      window.zenAudio.playTibetanBowl(432, 1.4);
    }

    const step = (2 * Math.PI) / this.totalDishes;
    // We want plate `targetIdx` to land at theta = 0 (cos = 1, front)
    let destAngle = -(targetIdx * step);

    // Compute shortest angular distance
    const diff = (destAngle - this.currentAngle) % (2 * Math.PI);
    let shortest = diff;
    if (diff > Math.PI) shortest = diff - 2 * Math.PI;
    if (diff < -Math.PI) shortest = diff + 2 * Math.PI;

    const finalAngle = this.currentAngle + shortest;

    if (typeof gsap !== 'undefined') {
      gsap.to(this, {
        currentAngle: finalAngle,
        duration: 0.75,
        ease: 'power2.out',
        onUpdate: () => {
          this.updatePlatePositions();
        },
        onComplete: () => {
          this.currentAngle = ((finalAngle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
          this.updatePlatePositions();
          this.updateHUD();
        }
      });
    } else {
      this.currentAngle = finalAngle;
      this.updatePlatePositions();
      this.updateHUD();
    }
  }

  nextDish() {
    this.rotateToIndex(this.currentIndex + 1);
  }

  prevDish() {
    this.rotateToIndex(this.currentIndex - 1);
  }

  updateHUD() {
    const curDish = this.dishes[this.currentIndex];
    if (this.courseNumEl) {
      this.courseNumEl.textContent = KANJI_INDEX[this.currentIndex] || (this.currentIndex + 1);
    }
    if (this.courseTotalEl) {
      this.courseTotalEl.textContent = `${String(this.totalDishes).padStart(2, '0')}`;
    }
    if (this.hudTitle && curDish) {
      this.hudTitle.textContent = curDish.title;
    }
    if (this.hudPrice && curDish) {
      this.hudPrice.textContent = curDish.price;
    }
  }

  /* --------------------------------------------------------------------------
     4. DRAG & SWIPE ON THE TURNTABLE
     -------------------------------------------------------------------------- */
  bindDragPhysics() {
    if (!this.viewport) return;

    const onStart = (clientX) => {
      this.isDragging = true;
      this.hasMoved = false;
      this.startX = clientX;
      this.startAngle = this.currentAngle;
    };

    const onMove = (clientX) => {
      if (!this.isDragging) return;
      const deltaX = clientX - this.startX;
      if (Math.abs(deltaX) > 4) {
        this.hasMoved = true;
      }
      this.currentAngle = this.startAngle + (deltaX * 0.005);
      this.updatePlatePositions();
    };

    const onEnd = () => {
      if (!this.isDragging) return;
      this.isDragging = false;

      // Snap to nearest plate
      const step = (2 * Math.PI) / this.totalDishes;
      let normalized = ((-this.currentAngle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
      let nearestIdx = Math.round(normalized / step) % this.totalDishes;
      this.rotateToIndex(nearestIdx, true);
    };

    // Mouse Events
    this.viewport.addEventListener('mousedown', (e) => onStart(e.clientX));
    window.addEventListener('mousemove', (e) => onMove(e.clientX));
    window.addEventListener('mouseup', () => onEnd());

    // Touch Events
    this.viewport.addEventListener('touchstart', (e) => {
      if (e.touches.length > 0) onStart(e.touches[0].clientX);
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) onMove(e.touches[0].clientX);
    }, { passive: true });

    window.addEventListener('touchend', () => onEnd());
  }

  /* --------------------------------------------------------------------------
     5. CONTROLS & CATEGORY PILLS
     -------------------------------------------------------------------------- */
  bindControls() {
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => this.prevDish());
    }
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => this.nextDish());
    }
  }

  bindCategories() {
    this.catPills.forEach(pill => {
      pill.addEventListener('click', () => {
        this.catPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');

        const cat = pill.dataset.category || 'all';
        if (cat === 'all') {
          this.rotateToIndex(0);
        } else {
          const foundIdx = this.dishes.findIndex(d => d.category === cat);
          if (foundIdx !== -1) {
            this.rotateToIndex(foundIdx);
          }
        }
      });
    });
  }

  /* --------------------------------------------------------------------------
     6. ACTIVE DISH SPOTLIGHT DOSSIER (Synchronized below table)
     -------------------------------------------------------------------------- */
  renderActiveDossier(dish, animate = true) {
    if (!this.activeDossier || !dish) return;

    this.activeDossier.innerHTML = `
      <!-- Left: Big Plate Spotlight View -->
      <div class="dossier-plate-spotlight">
        <img src="${dish.image}" alt="${dish.title}">
        <div style="position: absolute; top: 10px; left: 10px; display: flex; gap: 8px;">
          <span class="dish-badge featured">${dish.badge}</span>
          <span class="hanko-stamp" style="width: 28px; height: 28px; font-size: 0.78rem;">極</span>
        </div>
      </div>

      <!-- Right: Gastronomic Intelligence & Live Radar -->
      <div class="dossier-info-col">
        <div>
          <div class="dossier-top-line">
            <span class="dossier-course-badge">COURSE 0${this.currentIndex + 1} · ${dish.subtitle}</span>
            <span class="dossier-kanji-stamp">${dish.kanji}</span>
          </div>

          <div class="dossier-name-row">
            <h3 class="dossier-dish-title">${dish.title}</h3>
            <span class="dossier-dish-price">${dish.price}</span>
          </div>

          <p class="dossier-desc-copy">${dish.desc}</p>

          <!-- 4-Layer Anatomy Chips -->
          <div class="dossier-anatomy-chips">
            ${dish.anatomy.map(a => `
              <div class="dossier-chip">
                <span>${a.layer}:</span>
                ${a.desc}
              </div>
            `).join('')}
          </div>

          <!-- Live Neon Sensory Radar -->
          <div class="dossier-sensors-grid">
            <div class="meter-col">
              <div class="meter-head">
                <span>Umami Intensity (旨味)</span>
                <span class="sensory-val sensory-counter" data-val="${dish.flavor.umami}">0%</span>
              </div>
              <div class="meter-track">
                <div class="meter-fill red" data-target="${dish.flavor.umami}" style="width: 0%;"></div>
              </div>
            </div>

            <div class="meter-col">
              <div class="meter-head">
                <span>Lipid Richness (脂)</span>
                <span class="sensory-val sensory-counter" data-val="${dish.flavor.richness}">0%</span>
              </div>
              <div class="meter-track">
                <div class="meter-fill gold" data-target="${dish.flavor.richness}" style="width: 0%;"></div>
              </div>
            </div>
          </div>

          <!-- Sommelier Cellar Pairing Strip -->
          <div class="dossier-somm-strip">
            <i data-lucide="wine" style="width: 18px; height: 18px; color: var(--color-red-primary); flex-shrink: 0; margin-top: 2px;"></i>
            <div>
              <span style="font-family: var(--font-mono); font-size: 0.68rem; font-weight: 700; color: var(--color-red-primary); text-transform: uppercase; letter-spacing: 0.12em; display: block;">Sommelier Pairing · ${dish.details.origin}</span>
              <p style="font-size: 0.84rem; color: var(--text-light-secondary); line-height: 1.45; margin: 2px 0 0;">${dish.details.pairing} — <em>"${dish.details.sommelierNote}"</em></p>
            </div>
          </div>
        </div>

        <!-- Action CTAs -->
        <div class="dossier-ctas-row">
          <button class="btn-sketch primary" onclick="window.menuEngine.addToFlight('${dish.id}', event)">
            <span>+ Add to Tasting Flight</span>
            <i data-lucide="plus" style="width: 14px; height: 14px;"></i>
          </button>
          <button class="btn-sketch" onclick="window.menuEngine.openModal('${dish.id}')">
            <span>Full Anatomy & Provenance</span>
          </button>
        </div>
      </div>
    `;

    if (typeof lucide !== 'undefined') lucide.createIcons();

    if (animate) {
      if (typeof gsap !== 'undefined') {
        gsap.fromTo('.dossier-plate-spotlight img',
          { opacity: 0, scale: 0.94, y: 10 },
          { opacity: 1, scale: 1, y: 0, duration: 0.45, ease: 'power2.out' }
        );
        gsap.fromTo('.dossier-info-col',
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.4, delay: 0.08, ease: 'power2.out' }
        );
      }
      this.animateSensoryGauges(true);
    } else {
      this.animateSensoryGauges(false);
    }
  }

  animateSensoryGauges(animate = true) {
    if (!this.activeDossier) return;
    const fills = this.activeDossier.querySelectorAll('.meter-fill');
    const counters = this.activeDossier.querySelectorAll('.sensory-counter');

    fills.forEach((fill, idx) => {
      const target = parseFloat(fill.dataset.target) || 0;
      if (animate && typeof gsap !== 'undefined') {
        gsap.to(fill, {
          width: `${target}%`,
          duration: 0.8,
          delay: idx * 0.1,
          ease: 'power3.out'
        });
      } else {
        fill.style.width = `${target}%`;
      }
    });

    counters.forEach((cnt, idx) => {
      const target = parseInt(cnt.dataset.val, 10) || 0;
      if (animate && typeof gsap !== 'undefined') {
        let obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 0.8,
          delay: idx * 0.1,
          ease: 'power3.out',
          onUpdate: () => {
            cnt.textContent = `${Math.round(obj.val)}%`;
          }
        });
      } else {
        cnt.textContent = `${target}%`;
      }
    });
  }

  /* --------------------------------------------------------------------------
     7. TASTING FLIGHT ISLAND TRAY & FLYING PARTICLE
     -------------------------------------------------------------------------- */
  spawnFlyingParticle(originEl, imageSrc) {
    if (!originEl || !this.flightTray) return;
    const originRect = originEl.getBoundingClientRect();
    const trayRect = this.flightTray.getBoundingClientRect();

    const flyer = document.createElement('div');
    flyer.className = 'flying-flight-particle';
    flyer.style.cssText = `
      position: fixed;
      top: ${originRect.top}px;
      left: ${originRect.left}px;
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background-image: url(${imageSrc});
      background-size: cover;
      background-position: center;
      box-shadow: 0 0 16px rgba(230, 57, 70, 0.9), 0 4px 12px rgba(0,0,0,0.6);
      border: 2px solid var(--color-gold);
      z-index: 9999;
      pointer-events: none;
    `;
    document.body.appendChild(flyer);

    const targetX = trayRect.left + 50;
    const targetY = trayRect.top + 20;

    if (typeof gsap !== 'undefined') {
      gsap.to(flyer, {
        x: targetX - originRect.left,
        y: targetY - originRect.top,
        scale: 0.4,
        opacity: 0.8,
        duration: 0.65,
        ease: 'power2.inOut',
        onComplete: () => {
          flyer.remove();
          if (this.flightTray) {
            gsap.fromTo(this.flightTray,
              { scale: 1.03 },
              { scale: 1, duration: 0.3, ease: 'elastic.out(1.2, 0.4)' }
            );
          }
        }
      });
    } else {
      setTimeout(() => flyer.remove(), 600);
    }
  }

  addToFlight(dishId, event) {
    if (event) event.stopPropagation();
    const dish = this.dishes.find(d => d.id === dishId) || SUSHI_PLATE_DATABASE.find(d => d.id === dishId);
    if (!dish) return;

    if (this.userFlight.find(d => d.id === dishId)) {
      alert(`${dish.title} is already in your Custom Tasting Flight.`);
      return;
    }

    this.userFlight.push(dish);
    if (window.zenAudio) window.zenAudio.playTibetanBowl(540, 2);

    if (event && event.currentTarget) {
      this.spawnFlyingParticle(event.currentTarget, dish.image);
    }

    this.updateFlightUI();
  }

  removeFromFlight(dishId) {
    this.userFlight = this.userFlight.filter(d => d.id !== dishId);
    this.updateFlightUI();
  }

  clearFlight() {
    this.userFlight = [];
    this.updateFlightUI();
  }

  updateFlightUI() {
    if (!this.flightTray) return;

    if (this.userFlight.length > 0) {
      this.flightTray.classList.add('visible');
      if (this.flightCount) this.flightCount.textContent = `${this.userFlight.length} Course${this.userFlight.length > 1 ? 's' : ''} Selected`;

      const sum = this.userFlight.reduce((acc, curr) => acc + curr.rawPrice, 0);
      if (this.flightTotal) this.flightTotal.textContent = `$${sum}`;

      if (this.flightList) {
        this.flightList.innerHTML = this.userFlight.map(item => `
          <div class="flight-pill">
            <span>${item.title}</span>
            <button onclick="window.menuEngine.removeFromFlight('${item.id}')" title="Remove course">×</button>
          </div>
        `).join('');
      }
    } else {
      this.flightTray.classList.remove('visible');
    }
  }

  bookCustomFlight() {
    const flightNames = this.userFlight.map(d => d.title).join(', ');
    const noteInput = document.querySelector('#book-notes');
    if (noteInput) {
      noteInput.value = `Custom Tasting Flight: ${flightNames}`;
    }
    window.location.href = '#reservation';
  }

  /* --------------------------------------------------------------------------
     8. DISH MODAL EXPLORER
     -------------------------------------------------------------------------- */
  bindModal() {
    if (this.modalClose) {
      this.modalClose.addEventListener('click', () => this.closeModal());
    }
    if (this.modal) {
      this.modal.addEventListener('click', (e) => {
        if (e.target === this.modal) this.closeModal();
      });
    }
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.closeModal();
    });
  }

  openModal(dishId) {
    const dish = SUSHI_PLATE_DATABASE.find(d => d.id === dishId);
    if (!dish || !this.modal || !this.modalContent) return;

    if (window.zenAudio) window.zenAudio.playTibetanBowl(324, 2.5);

    this.modalContent.innerHTML = `
      <div class="modal-img-wrap">
        <img src="${dish.image}" alt="${dish.title}" style="object-fit: contain; padding: 20px;">
        <span class="dish-badge ${dish.isFeatured ? 'featured' : ''}" style="top: 16px; left: 16px;">${dish.badge}</span>
      </div>
      <div class="modal-content">
        <div>
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px;">
            <div>
              <span style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--color-red-vibrant); letter-spacing: 0.2em; text-transform: uppercase;">${dish.subtitle}</span>
              <h3 style="font-family: var(--font-serif); font-size: 1.6rem; color: #ffffff; line-height: 1.2;">${dish.title}</h3>
              <span style="font-family: var(--font-kanji); font-size: 1rem; color: var(--color-red-vibrant);">${dish.kanji}</span>
            </div>
            <span style="font-family: var(--font-mono); font-size: 1.6rem; font-weight: 700; color: var(--color-gold);">${dish.price}</span>
          </div>

          <p style="font-size: 0.92rem; color: #d4cfc5; line-height: 1.6; margin: 12px 0;">${dish.desc}</p>

          <!-- Sensory Profile Bar -->
          <div style="background: rgba(255, 255, 255, 0.03); border: 1px dashed rgba(255, 255, 255, 0.15); padding: 14px; margin-bottom: 16px;">
            <span style="font-family: var(--font-mono); font-size: 0.68rem; letter-spacing: 0.15em; color: var(--color-red-vibrant); text-transform: uppercase; display: block; margin-bottom: 8px;">Flavor & Sensory Calibration:</span>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;">
              <div>
                <span style="font-size: 0.75rem; color: #a1a1aa; display: block;">Umami (旨味)</span>
                <div style="height: 4px; background: rgba(255,255,255,0.1); border-radius: 2px; margin-top: 4px; overflow: hidden;">
                  <div style="width: ${dish.flavor.umami}%; height: 100%; background: var(--color-red-vibrant);"></div>
                </div>
                <span style="font-family: var(--font-mono); font-size: 0.75rem; color: #ffffff; font-weight: 700;">${dish.flavor.umami}%</span>
              </div>
              <div>
                <span style="font-size: 0.75rem; color: #a1a1aa; display: block;">Richness (脂)</span>
                <div style="height: 4px; background: rgba(255,255,255,0.1); border-radius: 2px; margin-top: 4px; overflow: hidden;">
                  <div style="width: ${dish.flavor.richness}%; height: 100%; background: var(--color-gold);"></div>
                </div>
                <span style="font-family: var(--font-mono); font-size: 0.75rem; color: #ffffff; font-weight: 700;">${dish.flavor.richness}%</span>
              </div>
              <div>
                <span style="font-size: 0.75rem; color: #a1a1aa; display: block;">Calibrated Temp</span>
                <span style="font-family: var(--font-mono); font-size: 0.9rem; color: #ffffff; font-weight: 700; display: block; margin-top: 2px;">${dish.flavor.temp}</span>
              </div>
            </div>
          </div>

          <!-- Culinary Provenance Details -->
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-bottom: 16px; padding: 14px; background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.1);">
            <div>
              <span style="font-family: var(--font-mono); font-size: 0.68rem; letter-spacing: 0.15em; color: #a1a1aa; text-transform: uppercase; display: block;">Provenance</span>
              <strong style="color: #ffffff; font-size: 0.85rem;">${dish.details.origin}</strong>
            </div>
            <div>
              <span style="font-family: var(--font-mono); font-size: 0.68rem; letter-spacing: 0.15em; color: #a1a1aa; text-transform: uppercase; display: block;">Sommelier Pairing</span>
              <strong style="color: var(--color-gold); font-size: 0.85rem;">${dish.details.pairing}</strong>
            </div>
            <div>
              <span style="font-family: var(--font-mono); font-size: 0.68rem; letter-spacing: 0.15em; color: #a1a1aa; text-transform: uppercase; display: block;">Artisan Technique</span>
              <strong style="color: #ffffff; font-size: 0.85rem;">${dish.details.technique}</strong>
            </div>
            <div>
              <span style="font-family: var(--font-mono); font-size: 0.68rem; letter-spacing: 0.15em; color: #a1a1aa; text-transform: uppercase; display: block;">Allergens</span>
              <strong style="color: #d4cfc5; font-size: 0.85rem;">${dish.details.allergens}</strong>
            </div>
          </div>
        </div>

        <div style="display: flex; gap: 10px; margin-top: 14px;">
          <button class="btn-sketch" onclick="window.menuEngine.addToFlight('${dish.id}', event); window.menuEngine.closeModal();" style="flex: 1;">
            <span>+ Add to Tasting Flight</span>
          </button>
          <a href="#reservation" class="btn-sketch primary" onclick="document.querySelector('#dish-modal').classList.remove('open')" style="flex: 1; text-align: center;">
            <span>Reserve Table</span>
          </a>
        </div>
      </div>
    `;

    if (typeof lucide !== 'undefined') lucide.createIcons();
    this.modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    if (!this.modal) return;
    this.modal.classList.remove('open');
    document.body.style.overflow = '';
  }
}

// Global initialization hooks
window.NaturalRotatingTableController = NaturalRotatingTableController;
window.OrganicOmakaseShowcase = NaturalRotatingTableController;
window.KaitenRotatingTableController = NaturalRotatingTableController;
window.GrandOmakaseAtelier = NaturalRotatingTableController;
window.MenuController = NaturalRotatingTableController;

window.initMenuController = function() {
  window.menuEngine = new NaturalRotatingTableController();
};
