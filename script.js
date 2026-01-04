// Handle contact form submission with a small toast message
function submitForm(event) {
  // support inline or listener-invoked calls
  if (event && event.preventDefault) event.preventDefault();

  // create toast if not exists
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerText = 'Thank you! We will contact you soon.';
    document.body.appendChild(toast);
  }

  // show toast
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3600);

  // clear form fields if submit came from a form
  const form = event && event.target ? event.target : document.querySelector('form');
  if (form) form.reset();
  return false;
}

// Intersection reveal for elements with .fade-up
function setupRevealOnScroll() {
  const elems = document.querySelectorAll('.fade-up');
  if (!('IntersectionObserver' in window)) {
    elems.forEach(el => el.classList.add('reveal'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  elems.forEach(el => observer.observe(el));
}

// Count-up animation for stats
function animateCounters() {
  const counters = document.querySelectorAll('.stat-number');
  counters.forEach(counter => {
    const targetAttr = counter.getAttribute('data-target');
    let raw = targetAttr || counter.innerText || '';
    // strip non-digit and convert
    const target = parseInt(raw.toString().replace(/[^0-9]/g, ''), 10) || 0;
    let current = 0;
    const step = Math.max(1, Math.floor(target / 60));

    const usePlus = counter.dataset.plus === 'true';
    const suffix = counter.dataset.suffix || '';

    function update() {
      current += step;
      if (current >= target) {
        if (suffix) {
          // example: 5000000 with suffix L+ -> show 50L+
          let formatted = target;
          if (suffix.toUpperCase().includes('L')) formatted = Math.round(target / 100000);
          counter.innerText = String(formatted) + suffix;
        } else {
          counter.innerText = String(target) + (usePlus ? '+' : '');
        }
      } else {
        counter.innerText = current;
        requestAnimationFrame(update);
      }
    }
    // trigger when visible
    const obs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        update();
        obs.disconnect();
      }
    }, { threshold: 0.3 });
    obs.observe(counter);
  });
}

// Initialize enhancements
document.addEventListener('DOMContentLoaded', () => {
  setupRevealOnScroll();
  animateCounters();
  // add pulse to main hero button if present
  const heroBtn = document.querySelector('.hero .btn');
  if (heroBtn) heroBtn.classList.add('pulse');
});
