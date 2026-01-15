function enterMood() {
  const hero = document.querySelector("#hero");
  const main = document.querySelector("#main-content");

  hero.classList.add("fade-out");

  // CARICAMENTO POOLY AI (CORRETTO)
  fetch("PoolyAI/public/index.html")
    .then(res => { 
      if (!res.ok)throw new Error("Errore " + res.status);
      return res.text();
    })
     .then(html => {
      const container = document.getElementById("pooly-ai-container");
      if (!container) return;

      container.innerHTML = "";

      const wrapper = document.createElement("div");
      wrapper.className = "pooly-ai-sandbox";
      wrapper.innerHTML = html;

      container.appendChild(wrapper);

      // ORA carichiamo chat.js DOPO l'HTML
      const script = document.createElement("script");
      script.src = "PoolyAI/public/chat.js";
      document.body.appendChild(script);
    })
    .catch(err => console.error("Errore PoolyAI:", err));

  setTimeout(() => {
    main.style.opacity = "1";
    main.style.pointerEvents = "auto";
    document.body.classList.remove("locked");
    main.scrollIntoView({ behavior: "smooth" });
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