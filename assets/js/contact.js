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
  document.getElementById("bookingForm").addEventListener("submit", function(e){
  e.preventDefault();

  const fname = document.getElementById("fname").value;
  const lname = document.getElementById("lname").value;
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value;
  const checkin = document.getElementById("checkin").value;
  const checkout = document.getElementById("checkout").value;
  const guests = document.getElementById("guests").value;
  const message = document.getElementById("message").value;

  const whatsappNumber = "919363004340";

  const text =
`Hello VRS Homestay,

I would like to enquire about a stay.

Name: ${fname} ${lname}
Phone: ${phone}
Email: ${email}

Check-in Date: ${checkin}
Check-out Date: ${checkout}
Guests: ${guests}

Special Request:
${message}`;

  const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;

  window.open(url, "_blank");
});

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