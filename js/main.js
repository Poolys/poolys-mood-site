function enterMood() {
  const hero = document.querySelector('#hero');
  const main = document.querySelector('#main-content');

  hero.classList.add('fade-out');

  // CARICAMENTO POOLY AI (ISOLATO)
fetch("Pooly-AI/public/index.html")
  .then(res => {
    console.log("Status fetch:", res.status);
    if (!res.ok) {
      throw new Error(`Errore server: ${res.status} ${res.statusText}`);
    }
    return res.text();
  })
  .then(html => {
    const container = document.getElementById("pooly-ai-container");
    if (!container) {
      console.error("Container non trovato!");
      return;
    }

    const wrapper = document.createElement("div");
    wrapper.className = "pooly-ai-sandbox";
    wrapper.innerHTML = html;

    container.appendChild(wrapper);

    // 🔥 ORA carichiamo lo script dell’AI (QUESTO MANCAVA)
    const script = document.createElement("script");
    script.src = "Pooly-AI/public/chat.js";
    script.defer = true;
    document.body.appendChild(script);

    console.log("PoolyAI inserito e script caricato!");
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