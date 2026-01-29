/* =====================================================
   POOLY’S MOOD – MAIN JS DEFINITIVO
   ===================================================== */

/* =========================
   STATO INIZIALE – LANDING
   ========================= */
document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("locked"); // blocca scroll al landing
  window.scrollTo(0, 0);
});

/* =========================
   ENTER MOOD (click bottone)
   ========================= */
function enterMood() {
  const hero = document.getElementById("hero");
  const main = document.getElementById("main-content");
  const poolyContainer = document.getElementById("pooly-ai-container");

  // segna ingresso SOLO per questa sessione
  sessionStorage.setItem("poolyEntered", "true");

  /* --- HERO FADE OUT --- */
  if (hero) {
    hero.classList.add("fade-out");
    hero.style.pointerEvents = "none";

    setTimeout(() => {
      hero.style.display = "none";
    }, 1200);
  }

  /* --- MAIN APPEAR --- */
  if (main) {
    main.style.display = "block";
    requestAnimationFrame(() => {
      main.style.opacity = "1";
      main.style.pointerEvents = "auto";
    });
  }

  /* --- SBLOCCO SCROLL --- */
  document.body.classList.remove("locked");
  window.scrollTo(0, 0);

  /* =========================
     LOAD POOLY AI (UNA VOLTA)
     ========================= */
  if (poolyContainer && !poolyContainer.dataset.loaded) {
    poolyContainer.dataset.loaded = "true";

    fetch("Pooly-AI/public/index.html")
      .then(res => {
        if (!res.ok) throw new Error("PoolyAI error " + res.status);
        return res.text();
      })
      .then(html => {
        poolyContainer.innerHTML = "";

        const wrapper = document.createElement("div");
        wrapper.className = "pooly-ai-wrapper";
        wrapper.innerHTML = html;
        poolyContainer.appendChild(wrapper);

        // carica chat.js DOPO l’HTML
        const script = document.createElement("script");
        script.src = "Pooly-AI/public/chat.js";
        script.defer = true;
        document.body.appendChild(script);
      })
      .catch(err => console.error("Errore Pooly AI:", err));
  }
}

/* =========================
   CLICK → CATALOGO
   ========================= */
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

/* =========================
   BACK / REFRESH → LANDING
   ========================= */
window.addEventListener("pageshow", () => {
  sessionStorage.removeItem("poolyEntered");
  document.body.classList.add("locked");
  window.scrollTo(0, 0);
});

/* =========================
   SCROLL RESTORATION OFF
   ========================= */
if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

