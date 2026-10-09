/**
 * ENSON SUSHI - ULTRA HIGH-PERFORMANCE CANVAS FRAME SEQUENCE ENGINE
 * With GSAP ScrollTrigger PINNING: Screen stays 100% pinned in place until all 240 frames are played.
 * Prevents the page from scrolling into the next section prematurely.
 */

const CRAFT_STAGES_DATA = [
  {
    num: "STAGE 01 / 厳選",
    title: "Ikejime Line-Caught Harvest",
    desc: "Spinal cord deactivation at sea in Honshu waters preserves pristine cellular integrity and umami freshness."
  },
  {
    num: "STAGE 02 / 熟成",
    title: "Micro-Climate Dry Ageing",
    desc: "Cured in Himalayan salt chambers for up to 21 days to amplify natural amino acids and melt-in-mouth fat texture."
  },
  {
    num: "STAGE 03 / 包丁",
    title: "Kizami Diamond Blade Cuts",
    desc: "Single-bevel Yanagiba steel scores micro-diamond incisions that perfectly absorb aged Nikiri soy sauce."
  },
  {
    num: "STAGE 04 / 炙り",
    title: "Binchotan Charcoal Flash Sear",
    desc: "Kissed over 1,000°C Kishu white oak coals to caramelize surface lipids while preserving the silky raw core."
  }
];

class CanvasFrameScrubber {
  constructor(options) {
    this.container = document.querySelector(options.container);
    this.canvas = document.querySelector(options.canvas);
    this.frameCount = options.frameCount || 240;
    this.framePath = options.framePath;
    this.onProgress = options.onProgress || null;
    
    if (!this.canvas || !this.container) return;
    
    this.ctx = this.canvas.getContext('2d', { alpha: false });
    this.images = new Array(this.frameCount);
    this.currentFrame = 0;
    this.targetFrame = 0;
    this.lastDrawnIndex = -1;
    this.isRendering = false;
    this.preloadQueue = [];
    this.isPreloading = false;
    
    this.init();
  }
  
  init() {
    this.resizeCanvas();
    window.addEventListener('resize', () => {
      this.resizeCanvas();
      this.requestRender();
    });
    
    // Load first frame immediately
    const firstImg = new Image();
    firstImg.src = this.framePath(1);
    firstImg.onload = () => {
      this.images[0] = firstImg;
      this.drawFrame(0);
      this.startProgressivePreload();
    };
  }
  
  resizeCanvas() {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }
  
  startProgressivePreload() {
    // Fill queue prioritizing early frames, then the rest
    for (let i = 2; i <= this.frameCount; i++) {
      this.preloadQueue.push(i);
    }
    this.processPreloadBatch();
  }
  
  processPreloadBatch() {
    if (this.preloadQueue.length === 0) return;
    
    // Load 3 frames per batch to avoid choking network or UI thread
    const batchSize = 3;
    const batch = this.preloadQueue.splice(0, batchSize);
    let loadedInBatch = 0;
    
    batch.forEach(frameNum => {
      const idx = frameNum - 1;
      if (this.images[idx]) {
        loadedInBatch++;
        if (loadedInBatch === batch.length) {
          setTimeout(() => this.processPreloadBatch(), 12);
        }
        return;
      }
      
      const img = new Image();
      img.src = this.framePath(frameNum);
      
      const onDone = () => {
        this.images[idx] = img;
        loadedInBatch++;
        if (loadedInBatch === batch.length) {
          setTimeout(() => this.processPreloadBatch(), 12);
        }
      };
      
      if ('decode' in img) {
        img.decode().then(onDone).catch(onDone);
      } else {
        img.onload = onDone;
        img.onerror = onDone;
      }
    });
  }
  
  drawFrame(index) {
    const img = this.images[index];
    if (!img || !this.ctx) return;
    
    const cw = this.canvas.width;
    const ch = this.canvas.height;
    const iw = img.naturalWidth || 1280;
    const ih = img.naturalHeight || 720;
    
    const scale = Math.max(cw / iw, ch / ih);
    const sw = iw * scale;
    const sh = ih * scale;
    const sx = (cw - sw) / 2;
    const sy = (ch - sh) / 2;
    
    this.ctx.drawImage(img, sx, sy, sw, sh);
    this.lastDrawnIndex = index;
  }
  
  update(rawScrollProgress) {
    const remappedProgress = Math.min(1, Math.max(0, rawScrollProgress / 0.85));
    this.targetFrame = Math.min(this.frameCount - 1, Math.floor(remappedProgress * (this.frameCount - 1)));
    
    if (this.onProgress) {
      this.onProgress(remappedProgress);
    }
    
    this.requestRender();
  }
  
  requestRender() {
    if (!this.isRendering) {
      this.isRendering = true;
      requestAnimationFrame(() => this.render());
    }
  }
  
  render() {
    const diff = this.targetFrame - this.currentFrame;
    if (Math.abs(diff) > 0.05) {
      this.currentFrame += diff * 0.40;
    } else {
      this.currentFrame = this.targetFrame;
    }
    
    const targetIdx = Math.round(this.currentFrame);
    
    let frameToDraw = targetIdx;
    if (!this.images[frameToDraw]) {
      // Find closest already loaded frame
      for (let offset = 1; offset < 30; offset++) {
        if (targetIdx - offset >= 0 && this.images[targetIdx - offset]) {
          frameToDraw = targetIdx - offset;
          break;
        }
        if (targetIdx + offset < this.frameCount && this.images[targetIdx + offset]) {
          frameToDraw = targetIdx + offset;
          break;
        }
      }
    }
    
    if (frameToDraw !== this.lastDrawnIndex) {
      this.drawFrame(frameToDraw);
    }
    
    if (Math.abs(this.targetFrame - this.currentFrame) > 0.05) {
      requestAnimationFrame(() => this.render());
    } else {
      this.isRendering = false;
    }
  }
}

// Global initialization with GSAP PINNING
window.initVideoScrollers = function() {
  if (typeof ScrollTrigger === 'undefined') return;

  // 1. Hero Canvas Scroller (scroll1.mp4)
  const heroContainer = document.querySelector('.hero-scrolly-section');
  const heroCanvas = document.querySelector('#hero-canvas');
  
  if (heroContainer && heroCanvas) {
    const heroScroller = new CanvasFrameScrubber({
      container: '.hero-scrolly-section',
      canvas: '#hero-canvas',
      frameCount: 240,
      framePath: (i) => `frames/hero/f_${String(i).padStart(4, '0')}.jpg`,
      onProgress: (progress) => {
        const outlineText = document.querySelector('.hero-outline-text');
        if (outlineText) {
          if (progress > 0.35) {
            outlineText.style.color = 'rgba(230, 57, 70, 0.9)';
          } else {
            outlineText.style.color = 'transparent';
          }
        }
      }
    });

    ScrollTrigger.create({
      trigger: heroContainer,
      start: 'top top',
      end: '+=2800', // Pinned scrub travel distance
      pin: true,
      pinSpacing: true,
      scrub: 0.2,
      onUpdate: (self) => {
        heroScroller.update(self.progress);
      }
    });

    // Header transparency trigger: 100% transparent during hero video, fills ONLY when hero is fully exited
    ScrollTrigger.create({
      trigger: '#philosophy',
      start: 'top 84px',
      onEnter: () => {
        const h = document.querySelector('.site-header');
        if (h) h.classList.add('has-bg');
      },
      onLeaveBack: () => {
        const h = document.querySelector('.site-header');
        if (h) h.classList.remove('has-bg');
      }
    });
  }

  // 2. Craft Canvas Scroller (scroll2.mp4)
  const craftContainer = document.querySelector('.craft-scrolly-section');
  const craftCanvas = document.querySelector('#craft-canvas');
  const stageNumEl = document.querySelector('#craft-hud-stage');
  const stageTitleEl = document.querySelector('#craft-hud-title');
  const stageDescEl = document.querySelector('#craft-hud-desc');
  
  if (craftContainer && craftCanvas) {
    const craftScroller = new CanvasFrameScrubber({
      container: '.craft-scrolly-section',
      canvas: '#craft-canvas',
      frameCount: 240,
      framePath: (i) => `frames/craft/f_${String(i).padStart(4, '0')}.jpg`,
      onProgress: (progress) => {
        const stageIdx = Math.min(CRAFT_STAGES_DATA.length - 1, Math.floor(progress * CRAFT_STAGES_DATA.length));
        const stage = CRAFT_STAGES_DATA[stageIdx];
        if (stageNumEl && stageTitleEl && stageDescEl) {
          if (stageNumEl.textContent !== stage.num) {
            stageNumEl.textContent = stage.num;
            stageTitleEl.textContent = stage.title;
            stageDescEl.textContent = stage.desc;
          }
        }
      }
    });

    ScrollTrigger.create({
      trigger: craftContainer,
      start: 'top top',
      end: '+=2800', // Pinned scrub travel distance
      pin: true,
      pinSpacing: true,
      scrub: 0.2,
      onUpdate: (self) => {
        craftScroller.update(self.progress);
      }
    });
  }
};
