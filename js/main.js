// FORZA IL RESET SULLA LANDING AL REFRESH
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

window.addEventListener('load', () => {
  sessionStorage.removeItem('poolyEntered');
  window.scrollTo(0, 0);
  document.body.classList.add("locked");
  document.body.classList.add("loaded");
  
  // Animazione leggera sul pulsante quando si carica (da prova)
  const btn = document.querySelector(".btn-scopri");
  if (btn) {
    btn.style.opacity = "0";
    setTimeout(() => {
      btn.style.transition = "opacity 1.2s ease";
      btn.style.opacity = "1";
    }, 800);
  }
});

// funzione chiamata dal bottone onclick="enterMood()"
function enterMood() {
  const hero = document.getElementById('hero');
  const main = document.getElementById('main-content');
  const event=new CustomEvent('enterMoodDone');
  
window.dispatchEvent(event);
  sessionStorage.setItem('poolyEntered', 'true');
  // INVIA UN SEGNALE alla chat
  window.dispatchEvent(new CustomEvent('mood-entered'));
  if (hero) {
    hero.style.opacity = '0';
    hero.style.pointerEvents = 'none';      
    setTimeout(() => {
      hero.style.display = 'none';
    }, 400);
  }

  if (main) {
    main.style.display = 'block';
    requestAnimationFrame(() => {
      main.style.opacity = '1';
      main.style.pointerEvents = 'auto';
    });
  }


  document.body.classList.remove('locked');
  document.body.style.overflow = 'hidden';
  document.documentElement.style.overflow = 'auto';

  window.scrollTo(0, 0);
}

function goToCatalogo() {
  document.body.classList.add("exit-page");
  setTimeout(() => {
    window.location.href = "catalogo.html";
  }, 800);
}

document.addEventListener("DOMContentLoaded", () => {
  const tasteImage = document.querySelector(".taste-section-image");
  if (tasteImage) {
    tasteImage.style.cursor = "pointer";
    tasteImage.addEventListener("click", goToCatalogo);
  }
});

// sicurezza extra: se torni indietro dal browser
window.addEventListener('pageshow', (event) => {
  if (event.persisted) {
    sessionStorage.removeItem('poolyEntered');
    window.scrollTo(0, 0);
    window.location.reload(); // BFCache
  }
});
const header = document.querySelector('.site-header');
if (header) {
  header.style.opacity = '0';
  header.style.transition = 'opacity 0.6s ease';
  setTimeout(() => { header.style.opacity = '1'; }, 300);
}
