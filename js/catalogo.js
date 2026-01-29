fetch("data/modelli.json")
  .then(res => res.json())
  .then(modelli => {
    const catalogo = document.getElementById("catalogo");

    modelli.forEach(modello => {
      const section = document.createElement("section");
      section.className = "catalogo-item";

      section.innerHTML = `
        <div class="catalogo-img">
          <img src="${modello.img}" alt="${modello.titolo}">
        </div>

        <div class="catalogo-text">
          <h2>${modello.titolo}</h2>
          <p class="manifesto" data-model="${modello.titolo}">${modello.manifesto}</p>
          <p class="descrizione">${modello.descrizione}</p>
        </div>
      `;

      catalogo.appendChild(section);
    });

    initObserver(); // avvia observer dopo aver caricato i modelli
  });

window.poolyContext = {
  page: "catalogo",
  model: null
};

function initObserver() {
  const manifesti = [...document.querySelectorAll('.manifesto[data-model]')];

  const observer = new IntersectionObserver((entries) => {
    let closest = null;
    let minDistance = Infinity;
    const viewportCenter = window.innerHeight / 2;

    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const rect = entry.target.getBoundingClientRect();
        const elCenter = rect.top + rect.height / 2;
        const distance = Math.abs(viewportCenter - elCenter);

        if (distance < minDistance) {
          minDistance = distance;
          closest = entry.target;
        }
      }
    });

    if (closest) {
      const model = closest.dataset.model;
      if (window.poolyContext.model !== model) {
        window.poolyContext.model = model;
        console.log("🎯 Modello attivo:", model);
      }
    }
  }, { threshold: [0.5] }); // almeno 50% visibile

  manifesti.forEach(m => observer.observe(m));
}