/* ============================================
   VRS HOMESTAY - CONTACT JS
============================================ */
document.addEventListener('DOMContentLoaded', function () {

  // --- Scroll Reveal ---
  const revealEls = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
    });
  }, { threshold: 0.1 });
  revealEls.forEach(el => observer.observe(el));

  // --- Booking Form ---
  const form = document.getElementById('bookingForm');
  const successMsg = document.getElementById('formSuccess');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = form.querySelector('.form-submit');
      btn.textContent = 'Sending...';
      btn.disabled = true;
      setTimeout(() => {
        form.reset();
        btn.textContent = 'Send Enquiry';
        btn.disabled = false;
        if (successMsg) successMsg.classList.add('show');
        setTimeout(() => successMsg.classList.remove('show'), 5000);
      }, 1500);
    });
  }

  // --- FAQ Accordion ---
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

});