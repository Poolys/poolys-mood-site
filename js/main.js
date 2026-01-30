// FORZA IL RESET SULLA LANDING AL REFRESH
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

window.addEventListener('load', () => {
  sessionStorage.removeItem('poolyEntered');
  window.scrollTo(0, 0);
  document.body.classList.add("locked");
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
