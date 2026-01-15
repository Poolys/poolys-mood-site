function enterMood() {
  const hero = document.querySelector('#hero');
  const main = document.querySelector('#main-content');

  hero.classList.add('fade-out');

  // CARICAMENTO POOLY AI (ISOLATO)
  fetch("Pooly-AI/public/index.html")
    .then(res => res.text())
    .then(html => {
      const container = document.getElementById("pooly-ai-container");
      container.innerHTML = `
        <div class="pooly-ai-sandbox">
          ${html}
        </div>
      `;
    });

  setTimeout(() => {
    main.style.opacity = '1';
    main.style.pointerEvents = 'auto';
    document.body.classList.remove('locked');
    main.scrollIntoView({ behavior: 'smooth' });
  }, 1200);
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