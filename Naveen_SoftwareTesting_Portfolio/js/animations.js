/* =============================================
   ANIMATIONS.JS — Photo Loop, Typing Effect
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- PHOTO LOOP ---- */
  const photos  = document.querySelectorAll('.profile-photo');
  let current   = 0;

  if (photos.length > 1) {
    setInterval(() => {
      photos[current].classList.remove('active');
      current = (current + 1) % photos.length;
      photos[current].classList.add('active');
    }, 2500);
  }

  /* ---- TYPING EFFECT ---- */
  const el = document.getElementById('typed-text');
  if (!el) return;

  const phrases = [
    'QA Automation Engineer',
    'ISTQB Certified Tester',
    'Playwright · Cypress · Selenium',
    'Building Quality at Scale'
  ];

  let phraseIdx = 0;
  let charIdx   = 0;
  let isDeleting = false;
  let isPaused   = false;

  function type() {
    if (isPaused) return;

    const current = phrases[phraseIdx];

    if (isDeleting) {
      el.textContent = current.substring(0, charIdx - 1);
      charIdx--;
    } else {
      el.textContent = current.substring(0, charIdx + 1);
      charIdx++;
    }

    let delay = isDeleting ? 50 : 90;

    if (!isDeleting && charIdx === current.length) {
      isPaused = true;
      setTimeout(() => {
        isPaused  = false;
        isDeleting = true;
        type();
      }, 2000);
      return;
    }

    if (isDeleting && charIdx === 0) {
      isDeleting = false;
      phraseIdx  = (phraseIdx + 1) % phrases.length;
      delay      = 400;
    }

    setTimeout(type, delay);
  }

  setTimeout(type, 800);

});
