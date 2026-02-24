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
  document.body.style.overflow = 'auto';
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

// CAMBIO LINGUA
let currentLang = localStorage.getItem("lang") || "it";

function updateLanguage(lang) {
  if (!translations[lang]) return;
  
  currentLang = lang;
  localStorage.setItem("lang", lang);

  // Aggiorna pulsanti lingua attivi
  document.querySelectorAll("[data-lang]").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });

  // Landing
  const h1 = document.querySelector("h1");
  if (h1) h1.textContent = translations[lang].landing.title;

  const manifesto = document.querySelector(".manifesto");
  if (manifesto) manifesto.innerHTML = translations[lang].landing.manifesto;

  const claim = document.querySelector(".claim");
  if (claim) claim.innerHTML = translations[lang].landing.claim;

  const btnDiscover = document.querySelector(".btn-scopri");
  if (btnDiscover) btnDiscover.textContent = translations[lang].landing.btnDiscover;

  // Menu
  document.querySelectorAll("[data-menu]").forEach(link => {
    const key = link.dataset.menu;
    if (translations[lang].menu[key]) {
      link.textContent = translations[lang].menu[key];
    }
  });

  // Modal titles
  document.querySelectorAll("[data-modal]").forEach(elem => {
    const key = elem.dataset.modal;
    if (translations[lang].modal[key]) {
      // Se l'elemento è un div, usa innerHTML (per testo con HTML)
      // Se è un h2 o simile, usa textContent (per testo semplice)
      if (elem.tagName === "DIV") {
        elem.innerHTML = translations[lang].modal[key];
      } else {
        elem.textContent = translations[lang].modal[key];
      }
    }
  });

  // Footer
  document.querySelectorAll("[data-footer]").forEach(elem => {
    const key = elem.dataset.footer;
    if (translations[lang].footer[key]) {
      elem.textContent = translations[lang].footer[key];
    }
  });

  // Catalogo - general handler for elements with data-catalog
  document.querySelectorAll("[data-catalog]").forEach(elem => {
    const key = elem.dataset.catalog;
    // special-case existing keys
    if (key === 'request-info' && translations[lang].catalog.requestInfo) {
      elem.textContent = translations[lang].catalog.requestInfo;
      return;
    }
    if (key === 'projects-section' && translations[lang].catalog.projectsSection) {
      elem.textContent = translations[lang].catalog.projectsSection;
      return;
    }

    // if translations contain the key, populate (use innerHTML for lists)
    if (translations[lang].catalog && translations[lang].catalog[key]) {
      if (elem.tagName === 'UL' || elem.tagName === 'DIV') {
        elem.innerHTML = translations[lang].catalog[key];
      } else {
        elem.textContent = translations[lang].catalog[key];
      }
    }
  });
}

// Inizializza con lingua salvata
document.addEventListener("DOMContentLoaded", () => {
  updateLanguage(currentLang);

  // Ensure modals script is initialized (guard no-op)
  if (typeof window.initModals === 'function') window.initModals();

  // Aggiorna contenuti modali (dentro shadow DOM)
  updateModalContents(currentLang);
});

// Funzione per aggiornare i contenuti inside shadow DOM
function updateModalContents(lang) {
  // Aggiorna genericamente i modali che usano shadow DOM: cerca elementi con
  // `data-modal` o `data-placeholder` dentro ogni shadowRoot e applica le
  // traduzioni disponibili per `modal` o per `personaliza`.
  const modalRoots = [
    'licensing-modal-root',
    'termini-modal-root',
    'contatti-modal-root',
    'progetti-modal-root',
    'personalizza-modal-root'
  ];

  modalRoots.forEach(id => {
    const root = document.getElementById(id);
    if (!root || !root.shadowRoot) return;

    // Aggiorna elementi con data-modal (testi e HTML)
    root.shadowRoot.querySelectorAll('[data-modal]').forEach(elem => {
      const key = elem.getAttribute('data-modal');

      // Prima prova a leggere dalle traduzioni generali per i modal
      if (translations[lang] && translations[lang].modal && translations[lang].modal[key]) {
        const val = translations[lang].modal[key];
        if (elem.tagName === 'DIV') elem.innerHTML = val; else elem.textContent = val;
        return;
      }

      // Se il key è del tipo personaliza_xxx, cerca nelle traduzioni personaliza
      if (key && key.startsWith('personaliza_')) {
        const pkey = key.replace('personaliza_', '');
        if (translations[lang] && translations[lang].personaliza && translations[lang].personaliza[pkey]) {
          const val = translations[lang].personaliza[pkey];
          if (elem.tagName === 'DIV') elem.innerHTML = val; else elem.textContent = val;
        }
      }
    });

    // Aggiorna placeholder per personalizza (se presenti)
    root.shadowRoot.querySelectorAll('[data-placeholder]').forEach(el => {
      const phKey = el.getAttribute('data-placeholder');
      if (!phKey) return;
      const key = phKey.replace('personaliza_', '');
      if (translations[lang] && translations[lang].personaliza && translations[lang].personaliza[key]) {
        el.setAttribute('placeholder', translations[lang].personaliza[key]);
      }
    });
  });

  // Se fosse disponibile la funzione di popolamento personalizzata, chiamala
  // (compatibilità con implementazioni precedenti)
  const personalizzaRoot = document.getElementById('personalizza-modal-root');
  if (personalizzaRoot && personalizzaRoot._populateModal) {
    personalizzaRoot._populateModal(lang);
  }
}

// Aggiungi event listeners ai pulsanti lingua
document.querySelectorAll("[data-lang]").forEach(btn => {
  btn.addEventListener("click", () => {
    updateLanguage(btn.dataset.lang);
    updateModalContents(btn.dataset.lang);
  });
});
