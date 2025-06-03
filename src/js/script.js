document.addEventListener('DOMContentLoaded', () => {
  // 1) Menu mobile
  const toggle = document.querySelector('.nav__toggle');
  const list   = document.querySelector('.nav__list');
  toggle.addEventListener('click', () => list.classList.toggle('open'));

  // 2) Slideshow
  const slides  = Array.from(document.querySelectorAll('.slide'));
  const prevBtn = document.querySelector('.slideshow__prev');
  const nextBtn = document.querySelector('.slideshow__next');
  let current = 0, timer;

  function goTo(n) {
    slides[current].classList.remove('active');
    current = (n + slides.length) % slides.length;
    slides[current].classList.add('active');
  }
  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  nextBtn.addEventListener('click', () => { next(); reset(); });
  prevBtn.addEventListener('click', () => { prev(); reset(); });

  function start() { timer = setInterval(next, 5000); }
  function reset() { clearInterval(timer); start(); }

  start();
});
