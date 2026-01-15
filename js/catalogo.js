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

      catalogo.appendChild(section);
    });
  });
