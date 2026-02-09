const translations = {
  it: {
    // Landing
    title: "Pooly's Mood",
    manifesto: "\"Gaudium Vino\"",
    claim: "Non esponiamo oggetti,<br>accogliamo presenze.",
    btnDiscover: "Scopri",
    // Header / Menu
    menuHome: "Home",
    menuCatalogo: "Catalogo",
    menuProgetti: "Progetti realizzati",
    menuLicensing: "Licensing",
    menuContatti: "Contatti",
    menuTermini: "Termini e Condizioni",
    // Modal Termini (titolo e testo base)
    terminiTitle: "Termini e Condizioni",
    terminiIntro: "Utilizzando il sito e i servizi accetti i seguenti termini...",
    // Popup accept
    acceptTitle: "Prima di continuare",
    acceptText: "Per accedere al catalogo e all'AI devi accettare i Termini e Condizioni.",
    acceptCheckbox: "Ho letto e accetto i",
    acceptLink: "Termini e Condizioni",
    acceptButton: "Accetto e continuo",
    // Footer / altri testi comuni
    footerCopyright: "© 2025 Pooly's Mood – Gaudium Vino"
  },
  de: {
    // Landing
    title: "Pooly's Mood",
    manifesto: "\"Gaudium Vino\"",
    claim: "Wir stellen keine Objekte aus,<br>wir empfangen Präsenzen.",
    btnDiscover: "Entdecken",
    // Header / Menu
    menuHome: "Startseite",
    menuCatalogo: "Katalog",
    menuProgetti: "Durchgeführte Projekte",
    menuLicensing: "Lizenzierung",
    menuContatti: "Kontakt",
    menuTermini: "Geschäftsbedingungen",
    // Modal Termini
    terminiTitle: "Geschäftsbedingungen",
    terminiIntro: "Durch die Nutzung der Website und der Dienstleistungen akzeptieren Sie die folgenden Bedingungen...",
    // Popup accept
    acceptTitle: "Bevor Sie fortfahren",
    acceptText: "Für den Zugriff auf den Katalog und die KI müssen Sie den Geschäftsbedingungen zustimmen.",
    acceptCheckbox: "Ich habe die",
    acceptLink: "Geschäftsbedingungen",
    acceptButton: "Ich akzeptiere und fahre fort",
    // Footer
    footerCopyright: "© 2025 Pooly's Mood – Gaudium Vino"
  },
  en: {
    // Landing
    title: "Pooly's Mood",
    manifesto: "\"Gaudium Vino\"",
    claim: "We do not display objects,<br>we welcome presences.",
    btnDiscover: "Discover",
    // Header / Menu
    menuHome: "Home",
    menuCatalogo: "Catalog",
    menuProgetti: "Completed Projects",
    menuLicensing: "Licensing",
    menuContatti: "Contact",
    menuTermini: "Terms and Conditions",
    // Modal Termini
    terminiTitle: "Terms and Conditions",
    terminiIntro: "By using the site and services you accept the following terms...",
    // Popup accept
    acceptTitle: "Before continuing",
    acceptText: "To access the catalog and AI you must accept the Terms and Conditions.",
    acceptCheckbox: "I have read and accept the",
    acceptLink: "Terms and Conditions",
    acceptButton: "Accept and continue",
    // Footer
    footerCopyright: "© 2025 Pooly's Mood – Gaudium Vino"
  }
};

// Funzione per aggiornare tutti i testi
function updateLanguage(lang) {
  localStorage.setItem("lang", lang);
  currentLang = lang;

  // Pulsanti lingua attivi
  document.querySelectorAll(".lang-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });

  // Landing
  if (document.querySelector("h1")) document.querySelector("h1").textContent = translations[lang].title;
  if (document.querySelector(".manifesto")) document.querySelector(".manifesto").innerHTML = translations[lang].manifesto;
  if (document.querySelector(".claim")) document.querySelector(".claim").innerHTML = translations[lang].claim;
  if (document.querySelector(".btn-scopri")) document.querySelector(".btn-scopri").textContent = translations[lang].btnDiscover;

  // Header / Menu (se hai id o classi)
  if (document.querySelector("#menu-catalogo")) document.querySelector("#menu-catalogo").textContent = translations[lang].menuCatalogo;
  if (document.querySelector("#menu-progetti")) document.querySelector("#menu-progetti").textContent = translations[lang].menuProgetti;
  if (document.querySelector("#menu-licensing")) document.querySelector("#menu-licensing").textContent = translations[lang].menuLicensing;
  if (document.querySelector("#menu-contatti")) document.querySelector("#menu-contatti").textContent = translations[lang].menuContatti;
  if (document.querySelector("#menu-termini")) document.querySelector("#menu-termini").textContent = translations[lang].menuTermini;

  // Modal termini (se aperto)
  if (document.querySelector("[data-action='termini']")) {
    // Puoi aggiornare il titolo del modal se è aperto
  }

  // Popup accept (se è visibile)
  // ... simile logica
}