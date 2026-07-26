/* =========================================
   REALTOR AGRO — script.js
   ========================================= */

// ---- NAV SCROLL EFFECT ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ---- MOBILE BURGER MENU ----
const burger    = document.getElementById('burger');
const navLinks  = document.getElementById('navLinks');

burger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  // Animate burger to X
  const spans = burger.querySelectorAll('span');
  spans.forEach(s => s.classList.toggle('active'));
});

// Close mobile menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// ---- SCROLL REVEAL ----
const revealElements = document.querySelectorAll('[data-reveal]');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger sibling reveals
        const siblings = Array.from(entry.target.parentElement.querySelectorAll('[data-reveal]'));
        const index = siblings.indexOf(entry.target);
        setTimeout(() => {
          entry.target.classList.add('revealed');
        }, index * 100);
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealElements.forEach(el => revealObserver.observe(el));

// ---- ANIMATED COUNTERS ----
const countEls = document.querySelectorAll('[data-count]');

const countObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el       = entry.target;
        const target   = parseInt(el.getAttribute('data-count'), 10);
        const duration = 1800; // ms
        const step     = Math.ceil(target / (duration / 16));
        let current    = 0;

        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          el.textContent = current.toLocaleString();
        }, 16);

        countObserver.unobserve(el);
      }
    });
  },
  { threshold: 0.5 }
);

countEls.forEach(el => countObserver.observe(el));

// ---- CONTACT FORM ----
const form        = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Sending…';
    btn.disabled    = true;

    // Simulate async submit
    setTimeout(() => {
      formSuccess.classList.add('show');
      form.reset();
      btn.textContent = 'Send Message';
      btn.disabled    = false;

      setTimeout(() => {
        formSuccess.classList.remove('show');
      }, 5000);
    }, 1200);
  });
}

// ---- SMOOTH ACTIVE NAV LINK HIGHLIGHT ----
const sections     = document.querySelectorAll('section[id]');
const allNavLinks  = document.querySelectorAll('.nav__links a');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        allNavLinks.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === '#' + entry.target.id) {
            link.style.color = 'var(--green-accent)';
          }
        });
      }
    });
  },
  { rootMargin: '-40% 0px -50% 0px' }
);

sections.forEach(sec => sectionObserver.observe(sec));