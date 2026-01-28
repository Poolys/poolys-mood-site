function enterMood() {
  const hero = document.querySelector("#hero");
  const main = document.querySelector("#main-content");

  hero.classList.add("fade-out");


  // CARICAMENTO POOLY AI (CORRETTO)
  fetch("Pooly-AI/public/index.html")
    .then(res => { 
      if (!res.ok)throw new Error("Errore " + res.status);
      return res.text();
    })
     .then(html => {
      const container = document.getElementById("pooly-ai-container");
      if (!container) return;

      container.innerHTML = "";

      const wrapper = document.createElement("div");
      wrapper.className = "pooly-ai-container";
      wrapper.innerHTML = html;

      container.appendChild(wrapper);

      // ORA carichiamo chat.js DOPO l'HTML
      const script = document.createElement("script");
      script.src = "Pooly-AI/public/chat.js";
      document.body.appendChild(script);
    })
    .catch(err => console.error("Errore PoolyAI:", err));

  setTimeout(() => {
    main.style.opacity = "1";
    main.style.pointerEvents = "auto";
    document.body.classList.remove("locked");
    main.scroll({ behavior: "smooth" });
  }, 1200);
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

// forza sempre il landing a ogni refresh
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

window.addEventListener('load', () => {
  sessionStorage.removeItem('poolyEntered');
  window.scrollTo(0, 0);
});

// funzione chiamata dal bottone onclick="enterMood()"
function enterMood() {
  const hero = document.getElementById('hero');
  const main = document.getElementById('main-content');

  sessionStorage.setItem('poolyEntered', 'true');

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
  document.body.style.overflow = 'auto';
  document.documentElement.style.overflow = 'auto';

  window.scrollTo(0, 0);
}

// sicurezza extra: se torni indietro dal browser
window.addEventListener('pageshow', (event) => {
  if (event.persisted) {
    sessionStorage.removeItem('poolyEntered');
    window.scrollTo(0, 0);
  }
});