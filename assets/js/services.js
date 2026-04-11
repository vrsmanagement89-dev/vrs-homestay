/* ============================================
   VRS HOMESTAY - SERVICES JS
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
  }, { threshold: 0.1 });
  revealEls.forEach(el => revealObserver.observe(el));

  // --- Stat Bars ---
  const statBars = document.querySelectorAll('.stat-fill');
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.width = entry.target.dataset.width;
        barObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  statBars.forEach(bar => barObserver.observe(bar));

  // --- House Data ---
  const houses = [
    {
      name: 'VRS House — The Onyx Den',
      sub: 'House 01 · Premium Suite',
      price: '₹4,500 / Night',
      tags: ['3 Bedrooms', 'Private Pool', 'Garden View'],
      desc: 'A masterpiece of dark luxury — The Onyx Den features dramatic interiors with gold-accented finishes, premium bedding, and a private pool surrounded by lush gardens. Perfect for families seeking absolute privacy.',
      images: [
        '/assets/images/img/photo_6251431174458773275_y.jpg',
        '/assets/images/img/photo_6251431174458773277_y.jpg',
        '/assets/images/img/photo_6251431174458773278_y.jpg',
        '/assets/images/img/photo_6251431174458773280_y.jpg'
      ]
    },
    
  ];

  let currentHouse = 0;
  let currentSlide = 0;

  const sliderTrack = document.getElementById('sliderTrack');
  const sliderDots = document.querySelectorAll('.slider-dot');
  const houseName = document.getElementById('houseName');
  const houseSub = document.getElementById('houseSub');
  const housePriceBadge = document.getElementById('housePriceBadge');
  const houseTagsEl = document.getElementById('houseTags');
  const houseDesc = document.getElementById('houseDesc');
  const houseCards = document.querySelectorAll('.house-card');
  const prevHouseBtn = document.getElementById('prevHouse');
  const nextHouseBtn = document.getElementById('nextHouse');
  const prevSlideBtn = document.getElementById('prevSlide');
  const nextSlideBtn = document.getElementById('nextSlide');

  function buildSlider(houseIndex) {
    const h = houses[houseIndex];
    if (!sliderTrack) return;
    sliderTrack.innerHTML = h.images.map(src =>
      `<img src="${src}" alt="${h.name}" class="featured-slide-img" loading="lazy" />`
    ).join('');
    currentSlide = 0;
    updateSlider();
  }

  function updateSlider() {
    if (!sliderTrack) return;
    sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
    sliderDots.forEach((d, i) => d.classList.toggle('active', i === currentSlide));
  }

  function loadHouse(index) {
    currentHouse = index;
    const h = houses[index];
    if (houseName) houseName.textContent = h.name;
    if (houseSub) houseSub.textContent = h.sub;
    if (housePriceBadge) housePriceBadge.textContent = h.price;
    if (houseTagsEl) houseTagsEl.innerHTML = h.tags.map(t => `<span class="house-tag">${t}</span>`).join('');
    if (houseDesc) houseDesc.textContent = h.desc;
    buildSlider(index);
    houseCards.forEach((c, i) => {
      c.style.borderColor = i === index ? 'rgba(201,168,76,0.5)' : '';
    });
    // Scroll to featured section smoothly
    const featEl = document.getElementById('featuredHouse');
    if (featEl) featEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // Slider dots
  sliderDots.forEach((dot, i) => {
    dot.addEventListener('click', () => { currentSlide = i; updateSlider(); });
  });

  // Slider prev/next
  if (prevSlideBtn) prevSlideBtn.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + 4) % 4;
    updateSlider();
  });
  if (nextSlideBtn) nextSlideBtn.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % 4;
    updateSlider();
  });

  // House prev/next arrows
  if (prevHouseBtn) prevHouseBtn.addEventListener('click', () => {
    loadHouse((currentHouse - 1 + houses.length) % houses.length);
  });
  if (nextHouseBtn) nextHouseBtn.addEventListener('click', () => {
    loadHouse((currentHouse + 1) % houses.length);
  });

  // House card click
  houseCards.forEach((card, i) => {
    card.addEventListener('click', () => loadHouse(i));
  });

  // Init
  buildSlider(0);

});