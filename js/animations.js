/* =============================================
   ANIMATIONS.JS — Photo Loop, Typing Effect,
   Particle Background, Custom Cursor
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- PHOTO LOOP ---- */
  const photos  = document.querySelectorAll('.profile-photo');
  let current   = 0;
  if (photos.length > 0) photos[0].classList.add('active');

  if (photos.length > 1) {
    setInterval(() => {
      photos[current].classList.remove('active');
      current = (current + 1) % photos.length;
      photos[current].classList.add('active');
    }, 2500);
  }

  /* ---- TYPING EFFECT ---- */
  const el = document.getElementById('typed-text');
  if (el) {
    const phrases = [
      'QA Automation Engineer',
      'ISTQB Certified Tester',
      'Playwright · Cypress · Selenium',
      'Building Quality at Scale'
    ];
    let phraseIdx = 0, charIdx = 0, isDeleting = false, isPaused = false;

    function type() {
      if (isPaused) return;
      const current = phrases[phraseIdx];
      el.textContent = isDeleting
        ? current.substring(0, charIdx - 1)
        : current.substring(0, charIdx + 1);
      isDeleting ? charIdx-- : charIdx++;

      let delay = isDeleting ? 50 : 90;
      if (!isDeleting && charIdx === current.length) {
        isPaused = true;
        setTimeout(() => { isPaused = false; isDeleting = true; type(); }, 2000);
        return;
      }
      if (isDeleting && charIdx === 0) {
        isDeleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        delay = 400;
      }
      setTimeout(type, delay);
    }
    setTimeout(type, 800);
  }

  /* ---- PARTICLE BACKGROUND ---- */
  const canvas = document.getElementById('particleCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    const COUNT = window.innerWidth < 768 ? 35 : 70;

    function resizeCanvas() {
      canvas.width  = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
    }

    class Particle {
      constructor() { this.reset(); }
      reset() {
        this.x  = Math.random() * canvas.width;
        this.y  = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.45;
        this.vy = (Math.random() - 0.5) * 0.45;
        this.r  = Math.random() * 1.8 + 0.5;
        this.a  = Math.random() * 0.45 + 0.1;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width)  this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height)  this.vy *= -1;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,255,136,${this.a})`;
        ctx.fill();
      }
    }

    function initParticles() {
      particles = Array.from({ length: COUNT }, () => new Particle());
    }

    function drawLines() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx   = particles[i].x - particles[j].x;
          const dy   = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0,255,136,${0.18 * (1 - dist / 130)})`;
            ctx.lineWidth   = 0.6;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => { p.update(); p.draw(); });
      drawLines();
      requestAnimationFrame(animate);
    }

    window.addEventListener('resize', () => { resizeCanvas(); initParticles(); });
    resizeCanvas();
    initParticles();
    animate();
  }

  /* ---- CUSTOM CURSOR ---- */
  const dot  = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');

  if (dot && ring && window.matchMedia('(hover: hover)').matches) {
    let mouseX = -40, mouseY = -40;
    let ringX  = -40, ringY  = -40;

    document.addEventListener('mousemove', e => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = mouseX + 'px';
      dot.style.top  = mouseY + 'px';
    });

    function animateRing() {
      ringX += (mouseX - ringX) * 0.13;
      ringY += (mouseY - ringY) * 0.13;
      ring.style.left = ringX + 'px';
      ring.style.top  = ringY + 'px';
      requestAnimationFrame(animateRing);
    }
    animateRing();

    const hoverEls = document.querySelectorAll(
      'a, button, .skill-tab, .proj-tab, .cert-card, .blog-card, .tool-card, .lang-card'
    );
    hoverEls.forEach(el => {
      el.addEventListener('mouseenter', () => {
        dot.classList.add('cursor-hover');
        ring.classList.add('cursor-hover');
      });
      el.addEventListener('mouseleave', () => {
        dot.classList.remove('cursor-hover');
        ring.classList.remove('cursor-hover');
      });
    });

    document.addEventListener('mouseleave', () => {
      dot.style.opacity  = '0';
      ring.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
      dot.style.opacity  = '1';
      ring.style.opacity = '1';
    });
  }

  /* ---- SKILL PROGRESS BARS (trigger when Languages tab visible) ---- */
  function animateLangBars() {
    document.querySelectorAll('.lang-bar[data-width]').forEach(bar => {
      bar.style.width = bar.dataset.width + '%';
    });
  }

  // Trigger on tab click
  document.querySelectorAll('.skill-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      if (tab.dataset.tab === 'languages') {
        setTimeout(animateLangBars, 100);
      }
    });
  });

  // Also trigger if languages tab is already active on load
  const activeTab = document.querySelector('.skill-tab.active');
  if (activeTab && activeTab.dataset.tab === 'languages') animateLangBars();

  // Trigger via IntersectionObserver when section scrolls into view
  const langPane = document.getElementById('tab-languages');
  if (langPane) {
    const barObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateLangBars();
          barObserver.disconnect();
        }
      });
    }, { threshold: 0.3 });
    barObserver.observe(langPane);
  }

});
