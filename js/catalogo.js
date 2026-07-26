fetch("data/modelli.json")
  .then(res => res.json())
  .then(modelli => {
    const catalogo = document.getElementById("catalogo") || document.querySelector(".catalogo-wrapper");
    if (!catalogo) return;

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

      catalogo.appendChild(section);
    });
  });
  

window.poolyContext = {
  page: "catalogo",
  model: null
};

document.addEventListener('DOMContentLoaded', () => {
  const requestInfoButtons = document.querySelectorAll('button.cta[data-catalog="request-info"]');
  const modelNameMap = {
    "P Gaudium": "Pooly's Mood",
    "Scaffale Arco semplice/normale.": "Scaffal",
    "Imagine Capricci": "Capricci"
  };

  requestInfoButtons.forEach(button => {
    const detailsSection = button.closest('section.details');
    const manifestoSection = detailsSection ? detailsSection.previousElementSibling : null;
    const titleElement = manifestoSection ? manifestoSection.querySelector('h2') : null;
    let modelName = titleElement ? titleElement.textContent.trim() : button.dataset.model;

    if (modelNameMap[modelName]) {
      modelName = modelNameMap[modelName];
    }

    button.dataset.model = modelName;

    button.addEventListener('click', () => {
      if (!modelName) return;
      window.poolyContext = {
        page: 'catalogo',
        model: modelName
      };
      window.dispatchEvent(new CustomEvent('poolyModelSelected', { detail: { model: modelName } }));
      if (typeof window.openPoolyChat === 'function') {
        window.openPoolyChat();
      }
    });
  });
});

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
