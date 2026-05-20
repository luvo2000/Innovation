// ═══════════════════════════════════════════════
//  NAVBAR — scroll effect + active link highlight
// ═══════════════════════════════════════════════
const navbar   = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  // Scrolled shadow
  navbar.classList.toggle('scrolled', window.scrollY > 40);

  // Active link via IntersectionObserver fallback (simple version)
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
});

// ═══════════════════════════════════════════════
//  HAMBURGER MENU
// ═══════════════════════════════════════════════
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

// Close on link click
mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

// ═══════════════════════════════════════════════
//  TABS
// ═══════════════════════════════════════════════
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const tab = btn.dataset.tab;

    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

    btn.classList.add('active');
    document.getElementById(`tab-${tab}`).classList.add('active');
  });
});

// ═══════════════════════════════════════════════
//  FADE-IN ON SCROLL
// ═══════════════════════════════════════════════
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

// Apply fade-in to cards and key elements
document.querySelectorAll(
  '.mission__card, .company-card, .issue-card, .pillar, .kpi, .stat-card, .data-item'
).forEach((el, i) => {
  el.classList.add('fade-in');
  el.style.transitionDelay = `${(i % 4) * 80}ms`;
  observer.observe(el);
});

// ═══════════════════════════════════════════════
//  SUBSCRIBE FORM
// ═══════════════════════════════════════════════
function handleSubscribe(e) {
  e.preventDefault();
  e.target.style.display = 'none';
  document.getElementById('subscribeConfirm').style.display = 'block';
}

// ═══════════════════════════════════════════════
//  CONTACT FORM
// ═══════════════════════════════════════════════
function handleContact(e) {
  e.preventDefault();
  e.target.style.display = 'none';
  document.getElementById('contactConfirm').style.display = 'block';
}

// ═══════════════════════════════════════════════
//  SMOOTH SCROLL for navbar height offset
// ═══════════════════════════════════════════════
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = document.getElementById('navbar').offsetHeight;
    window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
  });
});
