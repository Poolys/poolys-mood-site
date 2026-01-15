function enterMood() {
  const hero = document.querySelector('#hero');
  const main = document.querySelector('#main-content');

  hero.classList.add('fade-out');

  // CARICAMENTO POOLY AI (ISOLATO)
 fetch("Pooly-AI/public/index.html") // ← metti il path ESATTO che funziona ora
  .then(res => {
    console.log("Status fetch:", res.status); // dovrebbe essere 200
    if (!res.ok) {
      throw new Error(`Errore server: ${res.status} ${res.statusText}`);
    }
    return res.text();
  })
  .then(html => {
    console.log("Contenuto caricato (prime 200 char):", html.substring(0, 200)); // debug: vedi se è davvero il tuo index.html

    const container = document.getElementById("pooly-ai-container");
    if (!container) {
      console.error("Container non trovato!");
      return;
    }

    // Metodo più sicuro: crea un div wrapper invece di template literal
    const wrapper = document.createElement("div");
    wrapper.className = "pooly-ai-sandbox";
    wrapper.innerHTML = html; // ← metti SOLO l'html qui, senza <div> extra se non serve

    container.appendChild(wrapper); // append invece di innerHTML = per evitare sovrascritture

    console.log("PoolyAI inserito correttamente!");
  })
  .catch(err => {
    console.error("Errore totale fetch/inserimento:", err);
  });

  setTimeout(() => {
    main.style.opacity = '1';
    main.style.pointerEvents = 'auto';
    document.body.classList.remove('locked');
    main.scrollIntoView({ behavior: 'smooth' });
  }, 200);
}

function goToCatalogo() {
  document.body.classList.add('exit-page');
  setTimeout(() => {
    window.location.href = 'catalogo.html';
  }, 800);
}

document.addEventListener('DOMContentLoaded', () => {
  const tasteImage = document.querySelector('.taste-section-image');
  if (tasteImage) {
    tasteImage.style.cursor = 'pointer';
    tasteImage.addEventListener('click', goToCatalogo);
  }
});