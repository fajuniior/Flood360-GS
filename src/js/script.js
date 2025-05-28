// src/js/script.js
document.addEventListener('DOMContentLoaded', () => {
  // 1) Menu hambúrguer
  const toggle = document.querySelector('.nav__toggle');
  const navList = document.querySelector('.nav__list');
  toggle.addEventListener('click', () => {
    navList.classList.toggle('open');
  });

  // 2) Slideshow
  const slides = document.querySelectorAll('.slide');
  const prevBtn = document.querySelector('.slideshow__prev');
  const nextBtn = document.querySelector('.slideshow__next');
  let current = 0, timer;

  function goTo(n) {
    slides[current].classList.remove('active');
    current = (n + slides.length) % slides.length;
    slides[current].classList.add('active');
  }
  function next() { goTo(current + 1); reset(); }
  function prev() { goTo(current - 1); reset(); }

  prevBtn.addEventListener('click', prev);
  nextBtn.addEventListener('click', next);

  function start() { timer = setInterval(next, 5000); }
  function reset() { clearInterval(timer); start(); }

  start();

  // 3) Modal de detalhes
  const carModal = document.getElementById('carModal');
  const modalTitle = document.getElementById('modal-title');
  const modalList = document.getElementById('modal-list');

  // Dados de exemplo; ajuste conforme seu carDetails
  const carDetails = {
    "Audi-e-tron": {
      "Lugares": "5",
      "Autonomia": "400 km",
      "Velocidade Máx": "200 km/h",
      "Potência": "300 cv"
    },
    "BYD-Dolphin-Mini": {
      "Lugares": "4",
      "Autonomia": "260 km",
      "Velocidade Máx": "130 km/h",
      "Potência": "95 cv"
    },
    "Ford_Mustang_Mach-E": {
      "Lugares": "5",
      "Autonomia": "465 km",
      "Velocidade Máx": "180 km/h",
      "Potência": "346 cv"
    },
    "Tesla_Model_S": {
      "Lugares": "5",
      "Autonomia": "652 km",
      "Velocidade Máx": "250 km/h",
      "Potência": "1020 cv"
    },
    // adicione os demais modelos aqui
  };

  document.querySelectorAll('.details-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      const key = e.currentTarget.dataset.model;
      const info = carDetails[key];
      if (!info) return;
      modalTitle.textContent = key.replace(/[-_]/g, ' ');
      modalList.innerHTML = Object.entries(info)
        .map(([k, v]) => `<li><strong>${k}:</strong> ${v}</li>`)
        .join('');
      carModal.style.display = 'flex';
    });
  });

  document.querySelector('.modal-close').addEventListener('click', () => {
    carModal.style.display = 'none';
  });
  window.addEventListener('click', e => {
    if (e.target === carModal) {
      carModal.style.display = 'none';
    }
  });
});
