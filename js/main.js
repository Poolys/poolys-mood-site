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

/* ===============================
   POOLY'S MOOD — HERO / MAIN FLOW
   =============================== */

/* Disabilita il ripristino automatico dello scroll */
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

/* Al caricamento pagina: sempre Landing */
window.addEventListener('load', () => {
  window.scrollTo(0, 0);
});

/* Gestione ritorno pagina / refresh */
window.addEventListener('pageshow', () => {
  const entered = sessionStorage.getItem('poolyEntered') === 'true';

  const hero = document.getElementById('hero');
  const main = document.getElementById('main-content');

  if (!entered) {
    /* STATO LANDING */
    if (hero) hero.style.display = 'block';
    if (main) {
      main.style.display = 'none';
      main.style.opacity = '0';
      main.style.pointerEvents = 'none';
    }

    document.body.classList.add('locked');
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    window.scrollTo(0, 0);
    return;
  }

  /* STATO MAIN (solo dopo click consapevole) */
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

/* ===============================
   CLICK SU "LA INVIT..."
   =============================== */

const enterBtn = document.getElementById('enterSite');
const hero = document.getElementById('hero');

if (enterBtn) {
  enterBtn.addEventListener('click', () => {
    sessionStorage.setItem('poolyEntered', 'true');

    document.body.classList.remove('locked');
    document.body.style.overflow = 'auto';
    document.documentElement.style.overflow = 'auto';

    if (hero) hero.style.height = 'auto';

    hero.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}
