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
  document.body.style.overflow = 'fixed';
  document.documentElement.style.overflow = 'auto';

  window.scrollTo(0, 0);
});
