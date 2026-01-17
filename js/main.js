function enterMood() {
  localStorage.setItem('poolyEntered', 'true');

  const hero = document.getElementById('hero');
  const main = document.getElementById('main-content');

  hero.classList.add('fade-out');

  setTimeout(() => {
    hero.style.display = 'none';
    main.style.opacity = '1';
    main.style.pointerEvents = 'auto';
    document.body.classList.remove('locked');
    document.body.style.overflow = 'auto';
    window.scrollTo(0, 0);
  }, 1200);
}

// FIX DEFINITIVO BACK DAL CATALOGO
window.addEventListener('pageshow', () => {
  const entered = localStorage.getItem('poolyEntered') === 'true';
  if (!entered) return;

  const hero = document.getElementById('hero');
  const main = document.getElementById('main-content');

  if (hero) hero.style.display = 'none';

  if (main) {
    main.style.display = 'block';
    main.style.opacity = '1';
    main.style.pointerEvents = 'auto';
  }

  document.body.classList.remove('locked');
  document.body.style.overflow = 'auto';
  document.documentElement.style.overflow = 'auto';

  window.scrollTo(0, 0);
});
