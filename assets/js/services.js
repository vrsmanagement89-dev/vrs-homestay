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
  }, { threshold: 0.3 });
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
        'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=900&q=80',
        'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=900&q=80',
        'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=900&q=80'
      ]
    },
    {
      name: 'VRS House — Ivory Palace',
      sub: 'House 02 · Deluxe Suite',
      price: '₹4,500 / Night',
      tags: ['4 Bedrooms', 'Marble Interiors', 'City View'],
      desc: 'Ivory Palace exudes timeless elegance with its pristine white marble floors, gold fixtures, and panoramic city views. A haven of sophistication for those who appreciate refined luxury.',
      images: [
        'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=900&q=80',
        'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=900&q=80',
        'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=900&q=80'
      ]
    },
    {
      name: 'VRS House — Sky Loft',
      sub: 'House 03 · Executive Suite',
      price: '₹4,500 / Night',
      tags: ['2 Bedrooms', 'Rooftop Deck', 'Open Plan'],
      desc: 'Soaring above the cityscape, Sky Loft offers an open-plan executive retreat with a private rooftop deck, floor-to-ceiling windows, and bespoke furnishings for the modern luxury traveler.',
      images: [
        'https://images.unsplash.com/photo-1596436889106-be35e843f974?w=900&q=80',
        'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=900&q=80',
        'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=900&q=80'
      ]
    },
    {
      name: 'VRS House — Bronze Villa',
      sub: 'House 04 · Luxury Villa',
      price: '₹4,500 / Night',
      tags: ['5 Bedrooms', 'Private Garden', 'BBQ Area'],
      desc: 'Bronze Villa is our grandest offering — a sprawling luxury villa with 5 bedrooms, a private garden, outdoor BBQ area, and rich bronze-toned interiors that radiate warmth and opulence.',
      images: [
        'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=900&q=80',
        'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=900&q=80',
        'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=900&q=80'
      ]
    },
    {
      name: 'VRS House — Azure Retreat',
      sub: 'House 05 · Poolside Suite',
      price: '₹4,500 / Night',
      tags: ['3 Bedrooms', 'Infinity Pool', 'Nature View'],
      desc: 'Azure Retreat wraps you in serene blue tones complemented by natural stone accents. An infinity pool merges seamlessly with the horizon, creating a resort-like experience in pure privacy.',
      images: [
        'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=900&q=80',
        'https://images.unsplash.com/photo-1596436889106-be35e843f974?w=900&q=80',
        'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=900&q=80'
      ]
    },
    {
      name: 'VRS House — Gold Studio',
      sub: 'House 06 · Boutique Studio',
      price: '₹4,500 / Night',
      tags: ['1 Bedroom', 'Work Lounge', 'Compact Luxury'],
      desc: 'Gold Studio is a thoughtfully designed boutique retreat for solo travelers and couples. Compact yet lavish, it features a dedicated work lounge, golden accents, and every modern comfort.',
      images: [
        'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=900&q=80',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900&q=80',
        'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=900&q=80'
      ]
    }
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
    currentSlide = (currentSlide - 1 + 3) % 3;
    updateSlider();
  });
  if (nextSlideBtn) nextSlideBtn.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % 3;
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