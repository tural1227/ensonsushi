/**
 * ENSON SUSHI - RESERVATION WIZARD CONTROLLER
 * 4-Step Interactive Table Reservation System with Instant Confirmation Pass
 */

class ReservationWizard {
  constructor() {
    this.currentStep = 1;
    this.totalSteps = 4;
    
    this.bookingData = {
      experience: 'omakase_counter',
      experienceName: 'Main Hinoki Omakase Counter (12 Seats)',
      date: '',
      timeSlot: '18:30',
      guests: '2',
      dietary: 'None',
      fullName: '',
      email: '',
      phone: '',
      specialNotes: '',
      bookingCode: ''
    };
    
    this.init();
  }
  
  init() {
    this.setupDefaults();
    this.setupEventListeners();
  }
  
  setupDefaults() {
    // Set default date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateStr = tomorrow.toISOString().split('T')[0];
    const dateInput = document.querySelector('#book-date');
    if (dateInput) {
      dateInput.value = dateStr;
      dateInput.min = dateStr;
      this.bookingData.date = dateStr;
    }
  }
  
  setupEventListeners() {
    // Experience Selection Cards
    const expCards = document.querySelectorAll('.exp-option-card');
    expCards.forEach(card => {
      card.addEventListener('click', () => {
        expCards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        this.bookingData.experience = card.dataset.experience;
        this.bookingData.experienceName = card.querySelector('.exp-title').textContent.trim();
      });
    });
    
    // Time Slot Selection
    const slotBtns = document.querySelectorAll('.time-slot-btn');
    slotBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        slotBtns.forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        this.bookingData.timeSlot = btn.dataset.time;
      });
    });
    
    // Step Navigation Buttons
    const nextBtns = document.querySelectorAll('[data-action="next-step"]');
    nextBtns.forEach(btn => {
      btn.addEventListener('click', () => this.nextStep());
    });
    
    const prevBtns = document.querySelectorAll('[data-action="prev-step"]');
    prevBtns.forEach(btn => {
      btn.addEventListener('click', () => this.prevStep());
    });
    
    // Form Inputs Binding
    const dateInput = document.querySelector('#book-date');
    if (dateInput) {
      dateInput.addEventListener('change', (e) => {
        this.bookingData.date = e.target.value;
      });
    }
    
    const guestsInput = document.querySelector('#book-guests');
    if (guestsInput) {
      guestsInput.addEventListener('change', (e) => {
        this.bookingData.guests = e.target.value;
      });
    }
    
    const dietaryInput = document.querySelector('#book-dietary');
    if (dietaryInput) {
      dietaryInput.addEventListener('change', (e) => {
        this.bookingData.dietary = e.target.value;
      });
    }
  }
  
  validateStep(step) {
    if (step === 2) {
      if (!this.bookingData.date) {
        alert('Please select a reservation date.');
        return false;
      }
      if (!this.bookingData.timeSlot) {
        alert('Please select an evening or lunch seating time slot.');
        return false;
      }
    }
    
    if (step === 3) {
      const name = document.querySelector('#book-name')?.value.trim();
      const email = document.querySelector('#book-email')?.value.trim();
      const phone = document.querySelector('#book-phone')?.value.trim();
      const notes = document.querySelector('#book-notes')?.value.trim();
      
      if (!name || !email || !phone) {
        alert('Please complete all contact details (Name, Email, and Phone).');
        return false;
      }
      
      this.bookingData.fullName = name;
      this.bookingData.email = email;
      this.bookingData.phone = phone;
      this.bookingData.specialNotes = notes || 'Standard Omakase Pairing';
      
      // Generate unique Japanese style booking code
      const randomId = Math.floor(1000 + Math.random() * 9000);
      this.bookingData.bookingCode = `ENSON-JP-${randomId}`;
    }
    
    return true;
  }
  
  nextStep() {
    if (!this.validateStep(this.currentStep)) return;
    
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
      if (this.currentStep === 4) {
        this.renderConfirmationPass();
      }
      this.updateUI();
    }
  }
  
  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.updateUI();
    }
  }
  
  updateUI() {
    // Update step progress dots
    const steps = document.querySelectorAll('.progress-step');
    steps.forEach((step, idx) => {
      const stepNum = idx + 1;
      step.classList.remove('active', 'completed');
      if (stepNum === this.currentStep) {
        step.classList.add('active');
      } else if (stepNum < this.currentStep) {
        step.classList.add('completed');
      }
    });
    
    // Switch active panel
    const panels = document.querySelectorAll('.booking-step-panel');
    panels.forEach(panel => {
      panel.classList.remove('active');
      if (parseInt(panel.dataset.step, 10) === this.currentStep) {
        panel.classList.add('active');
      }
    });
  }
  
  renderConfirmationPass() {
    const passContainer = document.querySelector('#booking-confirmation-container');
    if (!passContainer) return;
    
    passContainer.innerHTML = `
      <div class="booking-pass-card sketch-border">
        <div class="pass-header">
          <div>
            <span style="font-family: var(--font-kanji); font-size: 1.6rem; color: var(--color-red-vibrant); display: block;">円村 · 予約完了</span>
            <h3 style="font-family: var(--font-serif); font-size: 1.8rem; color: #ffffff;">VIP Reservation Confirmed</h3>
          </div>
          <div class="hanko-stamp large">極</div>
        </div>
        
        <div class="pass-details-grid">
          <div>
            <span class="pass-field-label">Confirmation Code</span>
            <div class="pass-field-val text-red" style="font-family: var(--font-mono);">${this.bookingData.bookingCode}</div>
          </div>
          <div>
            <span class="pass-field-label">Guest Name</span>
            <div class="pass-field-val">${this.bookingData.fullName}</div>
          </div>
          <div>
            <span class="pass-field-label">Experience</span>
            <div class="pass-field-val">${this.bookingData.experienceName}</div>
          </div>
          <div>
            <span class="pass-field-label">Date & Time</span>
            <div class="pass-field-val">${this.bookingData.date} @ ${this.bookingData.timeSlot}</div>
          </div>
          <div>
            <span class="pass-field-label">Party Size</span>
            <div class="pass-field-val">${this.bookingData.guests} Guests</div>
          </div>
          <div>
            <span class="pass-field-label">Dietary / Notes</span>
            <div class="pass-field-val">${this.bookingData.dietary}</div>
          </div>
        </div>
        
        <div style="padding: 16px; background: rgba(230, 57, 70, 0.08); border-left: 3px solid var(--color-red-vibrant); margin-top: 12px;">
          <p style="font-size: 0.85rem; color: var(--color-paper-muted); margin: 0;">
            A confirmation SMS and calendar invite have been dispatched to <strong>${this.bookingData.email}</strong>. Our Master Sommelier looks forward to welcoming you.
          </p>
        </div>
      </div>
      
      <div style="display: flex; gap: 16px; justify-content: center; margin-top: 24px;">
        <button class="btn-sketch" onclick="window.print()">
          <span>Print Reservation Pass</span>
        </button>
        <button class="btn-sketch primary" onclick="location.reload()">
          <span>Book Another Table</span>
        </button>
      </div>
    `;
  }
}

// Global initialization helper
window.initReservationWizard = function() {
  window.reservationEngine = new ReservationWizard();
};
