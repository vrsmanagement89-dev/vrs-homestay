/* ============================================
   VRS HOMESTAY - GALLERY JS
============================================ */
document.addEventListener('DOMContentLoaded', function () {

  // --- Scroll Reveal ---
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); revealObserver.unobserve(entry.target); }
    });
  }, { threshold: 0.1 });
  revealEls.forEach(el => revealObserver.observe(el));

  // --- Filter ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const gItems = document.querySelectorAll('.g-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.filter;
      gItems.forEach(item => {
        if (cat === 'all' || item.dataset.cat === cat) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });

  // --- Lightbox ---
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lbImg');
  const lbClose = document.getElementById('lbClose');
  const lbPrev = document.getElementById('lbPrev');
  const lbNext = document.getElementById('lbNext');
  const lbCounter = document.getElementById('lbCounter');

  let currentIndex = 0;
  const visibleItems = () => [...gItems].filter(i => !i.classList.contains('hidden'));

  gItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      const visible = visibleItems();
      currentIndex = visible.indexOf(item);
      openLightbox(visible, currentIndex);
    });
  });

  function openLightbox(items, idx) {
    const img = items[idx].querySelector('img');
    lbImg.src = img.src;
    lbCounter.textContent = `${idx + 1} / ${items.length}`;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  lbClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });

  lbPrev.addEventListener('click', () => {
    const items = visibleItems();
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    openLightbox(items, currentIndex);
  });

  lbNext.addEventListener('click', () => {
    const items = visibleItems();
    currentIndex = (currentIndex + 1) % items.length;
    openLightbox(items, currentIndex);
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') lbPrev.click();
    if (e.key === 'ArrowRight') lbNext.click();
  });

});