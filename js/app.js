/**
 * ENSON SUSHI - MAIN APPLICATION CONTROLLER
 * Orchestrates Lenis Smooth Scroll, GSAP, Web Audio Zen Ambience, Cursor Physics, and Interactivity.
 */

// 1. Zen Ambient Sound Synthesizer (Web Audio API)
class ZenAudioSynthesizer {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.oscNodes = [];
    this.gainNode = null;
    this.intervalId = null;
  }
  
  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
    }
  }
  
  toggle() {
    this.init();
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    
    this.isPlaying = !this.isPlaying;
    const btn = document.querySelector('#sound-toggle-btn');
    
    if (this.isPlaying) {
      if (btn) btn.classList.add('playing');
      this.startZenDrone();
    } else {
      if (btn) btn.classList.remove('playing');
      this.stopZenDrone();
    }
    return this.isPlaying;
  }
  
  playTibetanBowl(freq = 216, decay = 4.5) {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    
    // Fundamental Oscillator
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);
    // Subtle vibrato/detune
    osc.frequency.exponentialRampToValueAtTime(freq * 0.998, now + decay);
    
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + decay);
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.start(now);
    osc.stop(now + decay);
    
    // Harmonic overtone
    const osc2 = this.ctx.createOscillator();
    const gain2 = this.ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(freq * 2.76, now);
    gain2.gain.setValueAtTime(0.08, now);
    gain2.gain.exponentialRampToValueAtTime(0.0001, now + (decay * 0.7));
    
    osc2.connect(gain2);
    gain2.connect(this.ctx.destination);
    osc2.start(now);
    osc2.stop(now + decay);
  }
  
  startZenDrone() {
    this.playTibetanBowl(216, 5);
    // Play subtle ambient harmonic bells every 7-10 seconds
    const bellFrequencies = [216, 288, 324, 432, 540];
    this.intervalId = setInterval(() => {
      if (this.isPlaying) {
        const randomFreq = bellFrequencies[Math.floor(Math.random() * bellFrequencies.length)];
        this.playTibetanBowl(randomFreq, 6);
      }
    }, 7500);
  }
  
  stopZenDrone() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}

// 2. Custom Charcoal / Pencil Cursor
class CharcoalCursor {
  constructor() {
    this.cursor = document.querySelector('.custom-cursor');
    this.follower = document.querySelector('.custom-cursor-follower');
    if (!this.cursor || !this.follower) return;
    
    this.mouse = { x: -100, y: -100 };
    this.pos = { x: -100, y: -100 };
    this.isRendering = false;
    
    this.init();
  }
  
  init() {
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
      this.cursor.style.transform = `translate3d(${this.mouse.x}px, ${this.mouse.y}px, 0)`;
      if (!this.isRendering) {
        this.isRendering = true;
        this.render();
      }
    }, { passive: true });
    
    const interactiveElements = document.querySelectorAll('a, button, input, select, .dish-card, .exp-option-card, .hanko-stamp');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
  }
  
  render() {
    const dx = this.mouse.x - this.pos.x;
    const dy = this.mouse.y - this.pos.y;
    
    this.pos.x += dx * 0.24;
    this.pos.y += dy * 0.24;
    
    this.follower.style.transform = `translate3d(${this.pos.x}px, ${this.pos.y}px, 0)`;
    
    if (Math.abs(dx) > 0.15 || Math.abs(dy) > 0.15) {
      requestAnimationFrame(() => this.render());
    } else {
      this.isRendering = false;
    }
  }
}

// 3. Preloader Animation
function initPreloader() {
  const preloader = document.querySelector('#preloader');
  const progressBar = document.querySelector('.preloader-progress');
  const statusText = document.querySelector('.preloader-status');
  
  if (!preloader || !progressBar) return;
  
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.floor(Math.random() * 18) + 8;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      progressBar.style.width = '100%';
      if (statusText) statusText.textContent = 'Craft Ready';
      
      setTimeout(() => {
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';
        document.body.classList.add('loaded');
        
        // Trigger initial hero entry animations
        if (typeof gsap !== 'undefined') {
          gsap.from('.hero-single-statement > *', {
            y: 40,
            opacity: 0,
            stagger: 0.12,
            duration: 1.2,
            ease: 'expo.out'
          });
        }
      }, 400);
    } else {
      progressBar.style.width = `${progress}%`;
    }
  }, 60);
}

// 4. Avant-Garde Fullscreen Shokunin Navigation Controller & Tokyo Live Clock
class ShokuninNavigationController {
  constructor() {
    this.header = document.querySelector('.site-header');
    this.mobileToggle = document.querySelector('#mobile-toggle');
    this.overlay = document.querySelector('#shokunin-menu-overlay');
    this.closeBtn = document.querySelector('#shokunin-menu-close');
    this.navItems = document.querySelectorAll('.overlay-nav-item');
    this.previewImg = document.querySelector('#overlay-preview-img');
    this.previewKanji = document.querySelector('#overlay-preview-kanji');
    this.previewQuote = document.querySelector('#overlay-preview-quote');
    this.previewTag = document.querySelector('#overlay-preview-tag');
    this.kanjiBg = document.querySelector('#overlay-kanji-bg');
    this.isOpen = false;
    
    this.init();
  }

  init() {
    // 1. Real-time Tokyo Clock ticker (in overlay)
    this.startTokyoClock();

    // 2. Header Scroll state (100% transparent on Hero, frosted glass after)
    this.initHeaderScroll();

    // 3. Trigger Fullscreen Menu
    if (this.mobileToggle && this.overlay) {
      this.mobileToggle.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggle();
      });
    }

    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.close();
      });
    }

    // Keyboard ESC to close
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });

    // 4. Interactive Hover on Menu Items with dynamic visual preview
    this.initHoverPreview();

    // 5. Smooth Scroll on Click
    this.initNavLinks();

    // 6. Back to Top Button
    const backToTop = document.querySelector('#back-to-top');
    if (backToTop) {
      backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }

  startTokyoClock() {
    const updateTime = () => {
      // Tokyo is UTC+9
      const now = new Date();
      const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
      const tokyoDate = new Date(utc + (3600000 * 9));
      
      const hours = String(tokyoDate.getHours()).padStart(2, '0');
      const minutes = String(tokyoDate.getMinutes()).padStart(2, '0');
      const seconds = String(tokyoDate.getSeconds()).padStart(2, '0');

      const headerClock = document.querySelector('#header-clock-time');
      const overlayClock = document.querySelector('#overlay-tokyo-clock');

      if (headerClock) {
        headerClock.textContent = `TYO ${hours}:${minutes} JST`;
      }
      if (overlayClock) {
        overlayClock.textContent = `TOKYO ${hours}:${minutes}:${seconds} JST`;
      }
    };

    updateTime();
    setInterval(updateTime, 1000);
  }

  initHeaderScroll() {
    let isTicking = false;
    const update = () => {
      if (!this.header) return;
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollY > 600) {
        this.header.classList.add('has-bg', 'scrolled');
      } else {
        this.header.classList.remove('has-bg', 'scrolled');
      }
      isTicking = false;
    };

    window.addEventListener('scroll', () => {
      if (!isTicking) {
        requestAnimationFrame(update);
        isTicking = true;
      }
    }, { passive: true });
    update();
  }

  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  open() {
    if (!this.overlay) return;
    this.isOpen = true;
    this.overlay.classList.add('open');
    this.overlay.setAttribute('aria-hidden', 'false');
    if (this.triggerBtn) this.triggerBtn.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Stagger in links with GSAP
    if (typeof gsap !== 'undefined') {
      gsap.fromTo('.overlay-nav-item', 
        { y: 35, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.06, ease: 'power3.out', delay: 0.2 }
      );
      gsap.fromTo('.overlay-info-col > *', 
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: 'power3.out', delay: 0.25 }
      );
      gsap.fromTo('.overlay-visual-col > *', 
        { x: 30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: 'power3.out', delay: 0.25 }
      );
    }
  }

  close() {
    if (!this.overlay) return;
    this.isOpen = false;
    this.overlay.classList.remove('open');
    this.overlay.setAttribute('aria-hidden', 'true');
    if (this.triggerBtn) this.triggerBtn.classList.remove('active');
    document.body.style.overflow = '';
  }

  initHoverPreview() {
    this.navItems.forEach((item) => {
      item.addEventListener('mouseenter', () => {
        // Set active item visual class
        this.navItems.forEach(i => i.classList.remove('active-nav-hover'));
        item.classList.add('active-nav-hover');

        const previewSrc = item.getAttribute('data-preview');
        const kanji = item.getAttribute('data-kanji');
        const quote = item.getAttribute('data-quote');

        if (this.previewImg && previewSrc) {
          // Cross-fade image
          this.previewImg.style.opacity = '0.4';
          this.previewImg.style.transform = 'scale(1.08)';
          setTimeout(() => {
            this.previewImg.src = previewSrc;
            this.previewImg.style.opacity = '1';
            this.previewImg.style.transform = 'scale(1)';
          }, 150);
        }

        if (this.previewKanji && kanji) {
          this.previewKanji.textContent = kanji;
        }

        if (this.previewQuote && quote) {
          this.previewQuote.textContent = quote;
        }

        if (this.kanjiBg && kanji) {
          this.kanjiBg.textContent = `${kanji} · 円村`;
        }
      });
    });
  }

  initNavLinks() {
    const allLinks = document.querySelectorAll('.overlay-nav-item, .nav-link, .brand-logo-link, .header-reserve-btn');
    allLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
          this.close();
          const targetEl = document.querySelector(href);
          if (targetEl) {
            e.preventDefault();
            const topOffset = targetEl.getBoundingClientRect().top + window.pageYOffset - 70;
            window.scrollTo({
              top: topOffset,
              behavior: 'smooth'
            });
          }
        }
      });
    });
  }
}

// 5. 3D Tilt Cards
function init3DTilt() {
  const tiltCards = document.querySelectorAll('.tilt-card');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      const rotX = -(y / rect.height) * 10;
      const rotY = (x / rect.width) * 10;
      
      card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
    });
  });
}

// Main Bootstrapping
document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lenis Smooth Scroll with single GSAP ticker binding
  if (typeof Lenis !== 'undefined') {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true
    });
    
    if (typeof ScrollTrigger !== 'undefined') {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    } else {
      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    }
  }
  
  // Setup Subsystems
  initPreloader();
  new CharcoalCursor();
  window.shokuninNav = new ShokuninNavigationController();
  init3DTilt();
  
  // Initialize Zen Audio
  window.zenAudio = new ZenAudioSynthesizer();
  const soundBtn = document.querySelector('#sound-toggle-btn');
  if (soundBtn) {
    soundBtn.addEventListener('click', () => window.zenAudio.toggle());
  }
  
  // Initialize Submodules
  if (typeof window.initVideoScrollers === 'function') {
    window.initVideoScrollers();
  }
  
  if (typeof window.initMenuController === 'function') {
    window.initMenuController();
  }
  
  if (typeof window.initReservationWizard === 'function') {
    window.initReservationWizard();
  }

  // Parallax on fon1 graphic in Experience section
  const fon1El = document.querySelector('.fon1-symbol-wrap');
  const expSection = document.querySelector('#experience');
  if (fon1El && expSection && typeof ScrollTrigger !== 'undefined' && typeof gsap !== 'undefined') {
    gsap.fromTo(fon1El, 
      { y: -130 },
      {
        y: 170,
        ease: 'none',
        scrollTrigger: {
          trigger: expSection,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5
        }
      }
    );
  }

  // Refresh ScrollTrigger after assets settle
  window.addEventListener('load', () => {
    if (typeof ScrollTrigger !== 'undefined') {
      ScrollTrigger.refresh();
    }
  });
});
