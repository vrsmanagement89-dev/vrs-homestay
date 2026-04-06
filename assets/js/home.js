/* ============================================
   VRS HOMESTAY - HOME JS
   Testimonials, FAQ, House Thumbs, Reveal
============================================ */

document.addEventListener('DOMContentLoaded', function () {

  // --- Scroll Reveal ---
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => revealObserver.observe(el));

  // --- Stat Bars Animation ---
  const statBars = document.querySelectorAll('.stat-bar-fill');
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        bar.style.width = bar.dataset.width;
        barObserver.unobserve(bar);
      }
    });
  }, { threshold: 0.3 });

  statBars.forEach(bar => barObserver.observe(bar));

  // --- House Thumbnails Switcher ---
  const houseThumbs = document.querySelectorAll('.house-thumb');
  const mainImage = document.getElementById('main-house-img');
  const mainTitle = document.getElementById('main-house-title');

  const houseData = [
    {
      img: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80',
      title: 'VRS House — The Onyx Den',
      price: '₹4,500 / Night'
    },
    {
      img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80',
      title: 'VRS House — Ivory Palace',
      price: '₹4,500 / Night'
    },
    {
      img: 'https://images.unsplash.com/photo-1596436889106-be35e843f974?w=800&q=80',
      title: 'VRS House — Sky Loft',
      price: '₹4,500 / Night'
    },
    {
      img: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80',
      title: 'VRS House — Bronze Villa',
      price: '₹4,500 / Night'
    },
    {
      img: 'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800&q=80',
      title: 'VRS House — Azure Retreat',
      price: '₹4,500 / Night'
    },
    {
      img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
      title: 'VRS House — Gold Studio',
      price: '₹4,500 / Night'
    }
  ];

  let currentHouse = 0;

  function switchHouse(index) {
    if (!mainImage || !mainTitle) return;
    currentHouse = index;
    mainImage.style.opacity = '0';
    setTimeout(() => {
      mainImage.src = houseData[index].img;
      mainTitle.textContent = houseData[index].title;
      document.querySelector('.price-badge').textContent = houseData[index].price;
      mainImage.style.opacity = '1';
    }, 250);
    houseThumbs.forEach((t, i) => t.classList.toggle('active', i === index));
  }

  houseThumbs.forEach((thumb, index) => {
    thumb.addEventListener('click', () => switchHouse(index));
  });

  // Nav arrows
  const prevBtn = document.getElementById('res-prev');
  const nextBtn = document.getElementById('res-next');

  if (prevBtn) prevBtn.addEventListener('click', () => {
    switchHouse((currentHouse - 1 + houseData.length) % houseData.length);
  });

  if (nextBtn) nextBtn.addEventListener('click', () => {
    switchHouse((currentHouse + 1) % houseData.length);
  });

  // --- Testimonial Carousel ---
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.t-dot');
  let currentSlide = 0;

  function goToSlide(n) {
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
  }

  dots.forEach((dot, i) => dot.addEventListener('click', () => goToSlide(i)));

  // Auto-advance every 5s
  if (slides.length > 0) {
    setInterval(() => goToSlide(currentSlide + 1), 5000);
  }

  // --- FAQ Accordion ---
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      const isOpen = item.classList.contains('open');

      document.querySelectorAll('.faq-item.open').forEach(openItem => {
        openItem.classList.remove('open');
      });

      if (!isOpen) item.classList.add('open');
    });
  });

  // Image transition style
  if (mainImage) {
    mainImage.style.transition = 'opacity 0.25s ease';
  }

});