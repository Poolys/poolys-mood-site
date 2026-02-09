// Traduzione del catalogo
function translateCatalogo(lang) {
  try {
    // Traduci tutti i pulsanti CTA
    const ctaButtons = document.querySelectorAll("button.cta");
    if (ctaButtons.length > 0 && translations[lang] && translations[lang].ctaButton) {
      ctaButtons.forEach(btn => {
        btn.textContent = translations[lang].ctaButton;
      });
    }

    // Traduci il footer
    const footerSmalls = document.querySelectorAll("footer small");
    if (footerSmalls.length >= 4 && translations[lang]) {
      if (translations[lang].footerCredits) footerSmalls[0].textContent = translations[lang].footerCredits;
      if (translations[lang].footerMaterials) footerSmalls[1].textContent = translations[lang].footerMaterials;
      if (translations[lang].footerEmail) footerSmalls[2].textContent = translations[lang].footerEmail;
      if (translations[lang].footerLicensing) footerSmalls[3].textContent = translations[lang].footerLicensing;
    }
  } catch (e) {
    console.error("Errore nella traduzione del catalogo:", e);
  }
}

// Registra il callback
if (!window.poolyOnLanguageChange) {
  window.poolyOnLanguageChange = [];
}
window.poolyOnLanguageChange.push(translateCatalogo);

// Applica la lingua attuale al caricamento
if (document.readyState === 'loading') {
  document.addEventListener("DOMContentLoaded", () => {
    const currentLang = localStorage.getItem("lang") || "it";
    if (typeof translateCatalogo === 'function') {
      translateCatalogo(currentLang);
    }
  });
} else {
  const currentLang = localStorage.getItem("lang") || "it";
  if (typeof translateCatalogo === 'function') {
    setTimeout(() => translateCatalogo(currentLang), 100);
  }
}
