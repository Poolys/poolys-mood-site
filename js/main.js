// FORZA IL RESET SULLA LANDING AL REFRESH
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

window.addEventListener('load', () => {
  sessionStorage.removeItem('poolyEntered');
  window.scrollTo(0, 0);
  document.body.classList.add("locked");
  document.body.classList.add("loaded");
  
  // Animazione leggera sul pulsante quando si carica (da prova)
  const btn = document.querySelector(".btn-scopri");
  if (btn) {
    btn.style.opacity = "0";
    setTimeout(() => {
      btn.style.transition = "opacity 1.2s ease";
      btn.style.opacity = "1";
    }, 800);
  }
});

// funzione chiamata dal bottone onclick="enterMood()"
function enterMood() {
  const hero = document.getElementById('hero');
  const main = document.getElementById('main-content');
  const event=new CustomEvent('enterMoodDone');
  
window.dispatchEvent(event);
  sessionStorage.setItem('poolyEntered', 'true');
  // INVIA UN SEGNALE alla chat
  window.dispatchEvent(new CustomEvent('mood-entered'));
  if (hero) {
    hero.style.opacity = '0';
    hero.style.pointerEvents = 'none';      
    setTimeout(() => {
      hero.style.display = 'none';
    }, 400);
  }

  if (main) {
    main.style.display = 'block';
    requestAnimationFrame(() => {
      main.style.opacity = '1';
      main.style.pointerEvents = 'auto';
    });
  }


  document.body.classList.remove('locked');
  document.body.style.overflow = 'hidden';
  document.documentElement.style.overflow = 'auto';

  window.scrollTo(0, 0);
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

// sicurezza extra: se torni indietro dal browser
window.addEventListener('pageshow', (event) => {
  if (event.persisted) {
    sessionStorage.removeItem('poolyEntered');
    window.scrollTo(0, 0);
    window.location.reload(); // BFCache
  }
});
const header = document.querySelector('.site-header');
if (header) {
  header.style.opacity = '0';
  header.style.transition = 'opacity 0.6s ease';
  setTimeout(() => { header.style.opacity = '1'; }, 300);
};
const translations = {
  it: {
    title: "Pooly's Mood",
    manifesto: "\"Gaudium Vino\"",
    claim: "Non esponiamo oggetti,<br>accogliamo presenze.",
    btnScopri: "Scopri",
    btnTermini: "Termini e Condizioni",
    acceptTitle: "Prima di continuare",
    acceptText: "Per accedere al catalogo e all'AI devi accettare i Termini e Condizioni.",
    acceptCheckbox: "Ho letto e accetto i",
    acceptLink: "Termini e Condizioni",
    acceptButton: "Accetto e continuo",
    // Aggiungi tutti i testi del sito, modal, ecc.
  },
  de: {
    title: "Pooly's Mood",
    manifesto: "\"Gaudium Vino\"",
    claim: "Wir stellen keine Objekte aus,<br>wir begrüßen Präsenzen.",
    btnScopri: "Entdecken",
    btnTermini: "Allgemeine Geschäftsbedingungen",
    acceptTitle: "Bevor Sie fortfahren",
    acceptText: "Um auf den Katalog und die KI zuzugreifen, müssen Sie die Allgemeinen Geschäftsbedingungen akzeptieren.",
    acceptCheckbox: "Ich habe die gelesen und akzeptiere die",
    acceptLink: "Allgemeine Geschäftsbedingungen",
    acceptButton: "Akzeptieren und fortfahren",
  },
  en: {
    title: "Pooly's Mood",
    manifesto: "\"Gaudium Vino\"",
    claim: "We do not display objects,<br>we welcome presences.",
    btnScopri: "Discover",
    btnTermini: "Terms and Conditions",
    acceptTitle: "Before continuing",
    acceptText: "To access the catalog and AI, you must accept the Terms and Conditions.",
    acceptCheckbox: "I have read and accept the",
    acceptLink: "Terms and Conditions",
    acceptButton: "Accept and continue",
  }
};
// CAMBIO LINGUA
let currentLang = localStorage.getItem("lang") || "it";

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem("lang", lang);

  // Aggiorna pulsanti attivi
  document.querySelectorAll(".lang-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });

  // Aggiorna testi
  document.querySelector("h1").textContent = translations[lang].title;
  document.querySelector(".manifesto").innerHTML = translations[lang].manifesto;
  document.querySelector(".claim").innerHTML = translations[lang].claim;
  document.querySelector(".btn-scopri").textContent = translations[lang].btnScopri;

  // Aggiorna modal termini (se aperto)
  // Puoi aggiungere logica simile per altri elementi
}

document.querySelectorAll(".lang-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    setLanguage(btn.dataset.lang);
  });
});

// Imposta lingua iniziale
setLanguage(currentLang);
