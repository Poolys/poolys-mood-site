/* =====================================================
   POOLY'S MOOD — MAIN JS
   Gestione hero → main transition, navigazione, fix mobile
   ===================================================== */

(function () {
  // ── Forza scroll in alto all'avvio ───────────────────────────────────
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }

  window.addEventListener('load', () => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.body.classList.add('locked');
  });

  // ── Transizione: entra nel mood (da hero a contenuto) ────────────────
  window.enterMood = function () {
    const hero = document.getElementById('hero');
    const main = document.getElementById('main-content');

    if (!hero || !main) return;

    hero.classList.add('fade-out');

    setTimeout(() => {
      hero.style.display = 'none';

      main.style.display = 'block';
      main.style.opacity = '1';
      main.style.pointerEvents = 'auto';

      // Sblocco scroll
      document.body.classList.remove('locked');
      document.body.style.overflow = ''; // resetta override
      document.documentElement.style.overflow = '';

      window.scrollTo({ top: 0, behavior: 'instant' });
    }, 1200); // deve corrispondere alla durata della transizione CSS
  };

  // ── Vai al catalogo con animazione di uscita ─────────────────────────
  window.goToCatalogo = function () {
    document.body.classList.add('exit-page');

    setTimeout(() => {
      window.location.href = 'catalogo.html';
    }, 800); // tempo per far vedere l'animazione di uscita
  };

  // ── Rendi cliccabile l'immagine nella sezione invite ─────────────────
  document.addEventListener('DOMContentLoaded', () => {
    const inviteImage = document.querySelector('.taste-section-image');
    if (inviteImage) {
      inviteImage.style.cursor = 'pointer';
      inviteImage.addEventListener('click', goToCatalogo);
    }
  });

  // ── Fix BFCache / back button su mobile ──────────────────────────────
  window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
      // Quando si torna indietro con browser history → ricarica pulita
      window.location.reload();
    }
  });
})();