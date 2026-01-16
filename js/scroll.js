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

// Esempio di funzione unlockPage (adatta al tuo codice)
function unlockPage() {
    document.body.style.overflow = 'auto'; // Sblocca scroll
    // Qui nascondi il pulsante o la splash screen, se lo fai
    document.getElementById('unlockButton').style.display = 'none';
    // Oppure mostra il main: document.getElementById('mainContent').style.display = 'block';
}


sections.forEach(section => observer.observe(section));