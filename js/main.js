
/* =====================================================
   POOLY'S MOOD — MAIN JS (CLEAN VERSION)
   ===================================================== */

/* ---------- FORZA LANDING SEMPRE ---------- */
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

window.addEventListener('load', () => {
  window.scrollTo(0, 0);
  document.body.classList.add('locked');
});

/* ---------- ENTRA NEL MOOD ---------- */
function enterMood() {
  const hero = document.getElementById('hero');
  const main = document.getElementById('main-content');

  if (!hero || !main) return;

  // fade hero
  hero.classList.add('fade-out');

  setTimeout(() => {
    hero.style.display = 'none';

    main.style.display = 'block';
    main.style.opacity = '1';
    main.style.pointerEvents = 'auto';

    // sblocca scroll
    document.body.classList.remove('locked');
    document.body.style.overflow = 'auto';
    document.documentElement.style.overflow = 'auto';

    window.scrollTo(0, 0);
  }, 1200);
}

/* ---------- NAVIGAZIONE CATALOGO ---------- */
function goToCatalogo() {
  document.body.classList.add('exit-page');
  setTimeout(() => {
    window.location.href = 'catalogo.html';
  }, 800);
}

document.addEventListener('DOMContentLoaded', () => {
  const tasteImage = document.querySelector('.taste-section-image');
  if (tasteImage) {
    tasteImage.style.cursor = 'pointer';
    tasteImage.addEventListener('click', goToCatalogo);
  }
});

/* ---------- BACK / BFCache (mobile fix) ---------- */
window.addEventListener('pageshow', (event) => {
  if (event.persisted) {
    // torni indietro dal browser → reset totale
    window.location.reload();
  }
});