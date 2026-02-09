// Traduzione del catalogo
function translateCatalogo(lang) {
  // Traduci tutti i pulsanti CTA
  document.querySelectorAll("button.cta").forEach(btn => {
    btn.textContent = translations[lang].ctaButton;
  });

  // Traduci il menu header
  const navLinks = document.querySelectorAll("header nav a, header li a");
  const menuMap = {
    "Home": "menuHome",
    "Catalogo": "menuCatalogo",
    "Progetti realizzati": "menuProgetti",
    "Completed Projects": "menuProgetti",
    "Durchgeführte Projekte": "menuProgetti",
    "Licensing": "menuLicensing",
    "Contatti": "menuContatti",
    "Contact": "menuContatti",
    "Kontakt": "menuContatti",
    "Termini e Condizioni": "menuTermini",
    "Terms and Conditions": "menuTermini",
    "Geschäftsbedingungen": "menuTermini"
  };

  navLinks.forEach(link => {
    const text = link.textContent.trim();
    if (menuMap[text]) {
      const newText = translations[lang][menuMap[text]];
      if (newText) link.textContent = newText;
    }
  });

  // Traduci il footer
  const footerSmalls = document.querySelectorAll("footer small");
  if (footerSmalls.length >= 4) {
    footerSmalls[0].textContent = translations[lang].footerCredits;
    footerSmalls[1].textContent = translations[lang].footerMaterials;
    footerSmalls[2].textContent = translations[lang].footerEmail;
    footerSmalls[3].textContent = translations[lang].footerLicensing;
  }
}

// Ascolta i cambi di lingua
if (window.poolyOnLanguageChange) {
  window.poolyOnLanguageChange.push(translateCatalogo);
} else {
  window.poolyOnLanguageChange = [translateCatalogo];
}

// Applica la lingua attuale al caricamento
document.addEventListener("DOMContentLoaded", () => {
  const currentLang = localStorage.getItem("lang") || "it";
  translateCatalogo(currentLang);
});
