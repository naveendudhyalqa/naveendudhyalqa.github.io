/* =============================================
   MAIN.JS — Loader, Navbar, Burger, Scroll,
   Active Nav, Skills Tabs, Project Tabs, Back-to-Top
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- LOADER ---- */
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');
      document.body.style.overflow = '';
    }, 1800);
  });
  document.body.style.overflow = 'hidden';

  /* ---- SCROLL PROGRESS BAR ---- */
  const progressBar = document.createElement('div');
  progressBar.id = 'scrollProgress';
  document.body.prepend(progressBar);

  window.addEventListener('scroll', () => {
    const scrollTop  = window.scrollY;
    const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
    const pct        = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = pct + '%';
  }, { passive: true });

  /* ---- NAVBAR SCROLL EFFECT ---- */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });

  /* ---- BURGER MENU ---- */
  const burger        = document.getElementById('burger');
  const mobileOverlay = document.getElementById('mobileOverlay');
  const overlayClose  = document.getElementById('overlayClose');
  const overlayLinks  = document.querySelectorAll('.overlay-link');

  function openMenu() {
    burger.classList.add('open');
    mobileOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeMenu() {
    burger.classList.remove('open');
    mobileOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  burger.addEventListener('click', () => {
    mobileOverlay.classList.contains('open') ? closeMenu() : openMenu();
  });
  overlayClose.addEventListener('click', closeMenu);
  overlayLinks.forEach(link => link.addEventListener('click', closeMenu));

  /* ---- SMOOTH SCROLL (anchor links) ---- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = navbar.offsetHeight + 8;
      const top    = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ---- ACTIVE NAV LINK (Intersection Observer) ---- */
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  const observerOpts = {
    root: null,
    rootMargin: `-${navbar.offsetHeight + 20}px 0px -55% 0px`,
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, observerOpts);

  sections.forEach(sec => sectionObserver.observe(sec));

  /* ---- SKILLS TABS ---- */
  const skillTabs  = document.querySelectorAll('.skill-tab');
  const tabPanes   = document.querySelectorAll('.tab-pane');

  skillTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      skillTabs.forEach(t => t.classList.remove('active'));
      tabPanes.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const target = document.getElementById('tab-' + tab.dataset.tab);
      if (target) target.classList.add('active');
    });
  });

  /* ---- PROJECT TABS ---- */
  const projTabs  = document.querySelectorAll('.proj-tab');
  const projPanes = document.querySelectorAll('.project-pane');

  projTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      projTabs.forEach(t => t.classList.remove('active'));
      projPanes.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const target = document.getElementById('proj-' + tab.dataset.proj);
      if (target) target.classList.add('active');
    });
  });

  /* ---- BACK TO TOP ---- */
  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('show', window.scrollY > 400);
  }, { passive: true });
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---- AOS INIT ---- */
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 700,
      once: true,
      easing: 'ease-out-cubic',
      offset: 80
    });
  }

});

/* ---- LIGHTBOX ---- */
function openLightbox(src, caption) {
  const lb  = document.getElementById('lightbox');
  const img = document.getElementById('lightboxImg');
  const cap = document.getElementById('lightboxCaption');
  img.src      = src;
  img.alt      = caption;
  cap.textContent = caption;
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLightbox();
});
