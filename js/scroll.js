const sections = document.querySelectorAll(".taste");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.4 });
// All'avvio della pagina (ad es. in window.onload o DOMContentLoaded)
document.addEventListener('DOMContentLoaded', function() {
    if (localStorage.getItem('unlocked') === 'true') {
        unlockPage(); // Chiama la funzione che sblocca (overflow: auto, nascondi pulsante, etc.)
    }
});

// Funzione del click sul pulsante (assumi che il pulsante abbia id="unlockButton")
document.getElementById('unlockButton').addEventListener('click', function() {
    localStorage.setItem('unlocked', 'true'); // Salva lo stato
    unlockPage(); // Sblocca la pagina
});

// La tua funzione unlock (assicurati che nasconda TUTTO ciò che copre)
function unlockPage() {
    document.body.style.overflow = 'auto';
    document.documentElement.style.overflow = 'auto';

    // NASCONDI splash/overlay/pulsante (questo è spesso il colpevole!)
    const splash = document.getElementById('splash') || document.querySelector('.splash, .intro, .loader, .overlay');
    if (splash) {
        splash.style.display = 'none';
        splash.remove(); // O .remove() se vuoi eliminarlo dal DOM
    }

    const unlockBtn = document.getElementById('unlockButton');
    if (unlockBtn) unlockBtn.style.display = 'none';

    // Se il main è nascosto all'inizio
    const mainContent = document.getElementById('main') || document.querySelector('main, .main-content');
    if (mainContent) {
        mainContent.style.display = 'block'; // o 'flex', 'grid' come era
        mainContent.style.visibility = 'visible';
    }

    // Forza reflow (a volte risolve glitch visivi)
    document.body.offsetHeight;
}

// Se hai una funzione lockPage, assicurati che mostri splash
function lockPage() {
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    // Mostra splash se necessario
}

sections.forEach(section => observer.observe(section));