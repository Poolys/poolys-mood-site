
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
          <p class="manifesto">${modello.manifesto}</p>
          <p class="descrizione">${modello.descrizione}</p>
        </div>
      `;

      "catalogo.appendChild(section)";
    });
  });
  

window.poolyContext = {
  page: "catalogo",
  model: null
};

const manifesti = [...document.querySelectorAll('.block.manifesto[data-model]')];

function updateActiveModel() {
  let closest = null;
  let minDistance = Infinity;
  const viewportCenter = window.innerHeight / 2;

  manifesti.forEach(el => {
    const rect = el.getBoundingClientRect();
    const elCenter = rect.top + rect.height / 2;
    const distance = Math.abs(viewportCenter - elCenter);

    if (distance < minDistance) {
      minDistance = distance;
      closest = el;
    }
  });

  if (closest) {
    const model = closest.dataset.model;
    if (window.poolyContext.model !== model) {
      window.poolyContext.model = model;
      console.log("🎯 Modello attivo:", model);
    }
  }
}

window.addEventListener('scroll', updateActiveModel);
window.addEventListener('load', updateActiveModel);
