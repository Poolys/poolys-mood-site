document.addEventListener("DOMContentLoaded", () => {
  // ====================
  // MODAL PROGETTI
  // ====================
  const progettiRoot = document.getElementById("progetti-modal-root");
  if (progettiRoot) {
    let shadowProgetti = progettiRoot.shadowRoot;
    if (!shadowProgetti) {
      shadowProgetti = progettiRoot.attachShadow({ mode: "open" });
    }
    shadowProgetti.innerHTML = `
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Prata', serif; }
        #modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.85);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.4s ease;
        }
        #modal-overlay.open {
          opacity: 1;
          pointer-events: all;
        }
        #modal-content {
          background: #111;
          border: 1px solid var(--oro, #D4AF37);
          max-width: 90%;
          width: 1200px;
          max-height: 90vh;
          overflow-y: auto;
          padding: 40px;
          border-radius: 8px;
          color: #eee;
          position: relative;
        }
        .close-btn {
          position: absolute;
          top: 20px;
          right: 30px;
          background: none;
          border: none;
          font-size: 32px;
          color: var(--oro);
          cursor: pointer;
        }
        h2 { color: var(--oro); margin-bottom: 30px; font-size: 36px; text-align: center; }
        .progetti-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
        }
        .progetto img {
          width: 100%;
          border: 1px solid rgba(212,175,55,0.3);
        }
        .progetto p { margin-top: 10px; text-align: center; font-style: italic; color: #ccc; }
      </style>

      <div id="modal-overlay">
        <div id="modal-content">
          <button class="close-btn">×</button>
          <h2 data-modal="projectsTitle">Progetti Realizzati</h2>
          <div class="progetti-grid">
            <div class="progetto">
              <img src="assets/img/progetti/baule-bruciato.jpg" alt="Baule bruciato">
              <img src="assets/img/progetti/baule-bruciato1.jpg" alt="Baule bruciato">
              <div data-modal="project1Desc">Espositore baule bruciato.</div>
            </div>
            <div class="progetto">
              <img src="assets/img/progetti/tronco-bottiglie.jpg" alt="Tronco bottiglie">
              <img src="assets/img/progetti/tronco-bottiglie1.jpg" alt="Tronco bottiglie">
              <div data-modal="project2Desc">Portabottiglie tronco naturale.</div>
            </div>
          </div>
        </div>
      </div>
    `;

    document.querySelector('a[href="#progetti"]').addEventListener("click", (e) => {
      e.preventDefault();
      shadowProgetti.querySelector("#modal-overlay").classList.add("open");
    });

    shadowProgetti.querySelector(".close-btn").addEventListener("click", () => {
      shadowProgetti.querySelector("#modal-overlay").classList.remove("open");
    });
    
    shadowProgetti.querySelector("#modal-overlay").addEventListener("click", (e) => {
      if (e.target.id === "modal-overlay") {
        shadowProgetti.querySelector("#modal-overlay").classList.remove("open");
      }
    });
  }
});

// ====================
// MODAL LICENSING
// ====================
const licensingRoot = document.getElementById("licensing-modal-root");
if (licensingRoot) {
  let shadowLicensing = licensingRoot.shadowRoot;
  if (!shadowLicensing) shadowLicensing = licensingRoot.attachShadow({ mode: "open" });

  shadowLicensing.innerHTML = `
    <style>
      * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Prata', serif; }
      #modal-overlay {
        position: fixed;
        inset: 0;
        background: rgba(0,0,0,0.92);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.4s ease;
      }
      #modal-overlay.open {
        opacity: 1;
        pointer-events: all;
      }
      #modal-content {
        background: #0f0f0f;
        border: 2px solid var(--oro, #D4AF37);
        width: 90%;
        max-width: 900px;
        max-height: 90vh;
        overflow-y: auto;
        padding: 50px;
        border-radius: 12px;
        color: #eee;
        position: relative;
        box-shadow: 0 20px 60px rgba(0,0,0,0.8);
      }
      .close-btn {
        position: absolute;
        top: 20px;
        right: 30px;
        background: none;
        border: none;
        font-size: 40px;
        color: var(--oro);
        cursor: pointer;
      }
      h2 { color: var(--oro); margin-bottom: 30px; font-size: 42px; text-align: center; }
      p { line-height: 1.7; margin-bottom: 20px; font-size: 18px; }
      ul { list-style: none; padding-left: 0; margin: 20px 0; }
      li { margin: 12px 0; font-size: 17px; }
      a { color: var(--oro); text-decoration: none; }
      a:hover { text-decoration: underline; }
      div[data-modal] h3 { color: var(--oro); margin-top: 20px; margin-bottom: 15px; }
      div[data-modal] p { margin: 10px 0; }
    </style>

    <div id="modal-overlay">
      <div id="modal-content">
        <button class="close-btn">×</button>
        <h2 data-modal="licensingTitle">Licensing & Produzione</h2>
        <div data-modal="licensingText"></div>
      </div>
    </div>
  `;

  const licensingLink = document.querySelector('a[href="#licensing"]');
  if (licensingLink) {
    licensingLink.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      shadowLicensing.querySelector("#modal-overlay").classList.add("open");
    });
  }

  shadowLicensing.querySelector(".close-btn").addEventListener("click", () => {
    shadowLicensing.querySelector("#modal-overlay").classList.remove("open");
  });
  
  shadowLicensing.querySelector("#modal-overlay").addEventListener("click", (e) => {
    if (e.target.id === "modal-overlay") {
      shadowLicensing.querySelector("#modal-overlay").classList.remove("open");
    }
  });

  // Popola il contenuto HTML del licensing (usa lingua da localStorage se presente)
  try {
    const initLang = (typeof localStorage !== 'undefined' && localStorage.getItem('lang')) ? localStorage.getItem('lang') : 'it';
    const licensingTextDiv = shadowLicensing.querySelector("[data-modal='licensingText']");
    if (licensingTextDiv && typeof translations !== 'undefined' && translations[initLang]) {
      licensingTextDiv.innerHTML = translations[initLang].modal.licensingText;
    }
  } catch (e) { /* localStorage not available in some envs */ }
}
;

// ====================
// MODAL CONTATTI
// ====================
const contattiRoot = document.getElementById("contatti-modal-root");
if (contattiRoot) {
  let shadowContatti = contattiRoot.shadowRoot;
  if (!shadowContatti) shadowContatti = contattiRoot.attachShadow({ mode: "open" });

  shadowContatti.innerHTML = `
    <style>
      * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Prata', serif; }
      #modal-overlay { position: fixed !important; inset: 0; background: rgba(0,0,0,0.95); display: none; align-items: center; justify-content: center; z-index: 99999; opacity: 0; transition: opacity 0.3s ease; }
      #modal-overlay.open { display: flex; opacity: 1; }
      #modal-content { background: #111; border: 2px solid #D4AF37; width: 92%; max-width: 800px; max-height: 90vh; overflow-y: auto; padding: 50px; border-radius: 12px; color: #eee; box-shadow: 0 20px 80px rgba(0,0,0,0.9); text-align: center; }
      .close-btn { position: absolute; top: 20px; right: 30px; background: none; border: none; font-size: 40px; color: #D4AF37; cursor: pointer; }
      h2 { color: #D4AF37; margin-bottom: 30px; font-size: 42px; }
      p { line-height: 1.7; margin: 20px 0; font-size: 18px; }
      .contatti-info { margin: 30px 0; }
      .contatti-info a { color: #D4AF37; text-decoration: none; font-size: 20px; }
      .contatti-info a:hover { text-decoration: underline; }
      .icon { font-size: 32px; margin-right: 10px; }
    </style>

    <div id="modal-overlay">
      <div id="modal-content">
        <button class="close-btn">×</button>
        <h2 data-modal="contactsTitle">Contatti</h2>

        <div class="contatti-info">
          <div data-modal="contactsEmail"><span class="icon">✉️</span> <a href="mailto:pooly.s_mood@outlook.com">pooly.s_mood@outlook.com</a></div>
          <div data-modal="contactsPhone"><span class="icon">📱</span> <a href="https://wa.me/39xxxxx" target="_blank">+39 333 123 4567 (WhatsApp)</a></div>
          <div data-modal="contactsLocation"><span class="icon">📍</span> Piemonte, Italia (dettagli su richiesta)</div>
        </div>

        <div data-modal="contactsClosing">Ti rispondo al più presto – Gaudium Vino!</div>
      </div>
    </div>
  `;

  document.querySelectorAll('[data-action="contatti"]').forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      e.stopPropagation();
      shadowContatti.querySelector("#modal-overlay").classList.add("open");
    });
  });

  shadowContatti.querySelector(".close-btn").addEventListener("click", () => {
    shadowContatti.querySelector("#modal-overlay").classList.remove("open");
  });
  
  shadowContatti.querySelector("#modal-overlay").addEventListener("click", e => {
    if (e.target.id === "modal-overlay") {
      shadowContatti.querySelector("#modal-overlay").classList.remove("open");
    }
  });
}

// ====================
// MODAL TERMINI
// ====================
const terminiRoot = document.getElementById("termini-modal-root");
if (terminiRoot) {
  let shadowTermini = terminiRoot.shadowRoot;
  if (!shadowTermini) shadowTermini = terminiRoot.attachShadow({ mode: "open" });
  
  shadowTermini.innerHTML = `
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Prata', serif; }
      #modal-overlay {
        position: fixed;
        inset: 0;
        background: rgba(0,0,0,0.95);
        display: none;
        align-items: center;
        justify-content: center;
        z-index: 99999;
        opacity: 0;
        transition: opacity 0.4s ease;
      }
      #modal-overlay.open { display: flex; opacity: 1; }
      #modal-content {
        background: #111;
        border: 2px solid #b8860b;
        width: 90%;
        max-width: 800px;
        max-height: 85vh;
        overflow-y: auto;
        padding: 50px;
        border-radius: 12px;
        color: #eee;
        box-shadow: 0 20px 80px rgba(0,0,0,0.9);
      }
      .close-btn {
        position: absolute;
        top: 20px;
        right: 30px;
        background: none;
        border: none;
        font-size: 40px;
        color: #b8860b;
        cursor: pointer;
      }
      h2 { color: #b8860b; margin-bottom: 30px; font-size: 42px; text-align: center; }
      div[data-modal] h3 { color: #b8860b; margin: 20px 0 15px; }
      p, li { line-height: 1.7; margin: 15px 0; font-size: 17px; }
      ul { list-style: none; padding-left: 0; }
      li { margin: 8px 0; }
    </style>

    <div id="modal-overlay">
      <div id="modal-content">
        <button class="close-btn">×</button>
        <h2 data-modal="termsTitle">Termini e Condizioni</h2>
        <div data-modal="termsText"></div>
      </div>
    </div>
  `;

  document.querySelectorAll('[data-action="termini"]').forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      e.stopPropagation();
      shadowTermini.querySelector("#modal-overlay").classList.add("open");
    });
  });

  shadowTermini.querySelector(".close-btn").addEventListener("click", () => {
    shadowTermini.querySelector("#modal-overlay").classList.remove("open");
  });

  shadowTermini.querySelector("#modal-overlay").addEventListener("click", e => {
    if (e.target.id === "modal-overlay") {
      shadowTermini.querySelector("#modal-overlay").classList.remove("open");
    }
  });

  // Popola il contenuto HTML dei termini (usa lingua da localStorage se presente)
  try {
    const initLang = (typeof localStorage !== 'undefined' && localStorage.getItem('lang')) ? localStorage.getItem('lang') : 'it';
    const termsTextDiv = shadowTermini.querySelector("[data-modal='termsText']");
    if (termsTextDiv && typeof translations !== 'undefined' && translations[initLang]) {
      termsTextDiv.innerHTML = translations[initLang].modal.termsText;
    }
  } catch (e) { }
}

// ====================
// MODAL PERSONALIZZAZIONE
// ====================
const personalizzaRoot = document.getElementById("personalizza-modal-root");
if (personalizzaRoot) {
  let shadow = personalizzaRoot.shadowRoot;
  if (!shadow) shadow = personalizzaRoot.attachShadow({ mode: "open" });

  shadow.innerHTML = `
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Prata', serif; }
      #overlay {
        position: fixed;
        inset: 0;
        background: rgba(0,0,0,0.92);
        display: none;
        align-items: center;
        justify-content: center;
        z-index: 99999;
        opacity: 0;
        transition: opacity 0.5s ease;
      }
      #overlay.open { display: flex; opacity: 1; }
      #modal {
        background: #111;
        border: 2px solid #b8860b;
        width: 92%;
        max-width: 750px;
        max-height: 90vh;
        overflow-y: auto;
        padding: 40px;
        border-radius: 12px;
        color: #eee;
        box-shadow: 0 20px 80px rgba(0,0,0,0.9);
      }
      .close-btn {
        position: absolute;
        top: 20px;
        right: 30px;
        background: none;
        border: none;
        font-size: 40px;
        color: #b8860b;
        cursor: pointer;
      }
      h2 {
        color: #b8860b;
        text-align: center;
        margin-bottom: 30px;
        font-size: 36px;
      }
      .section-title {
        color: #d4a017;
        font-size: 24px;
        margin: 30px 0 20px;
        border-bottom: 1px solid #b8860b;
        padding-bottom: 10px;
      }
      .form-group {
        margin-bottom: 20px;
      }
      label {
        display: block;
        margin-bottom: 8px;
        font-size: 18px;
        color: #ddd;
      }
      input[type="text"],
      input[type="number"],
      select {
        width: 100%;
        padding: 12px;
        background: #222;
        border: 1px solid #b8860b;
        color: #eee;
        border-radius: 8px;
        font-size: 16px;
      }
      textarea {
        width: 100%;
        min-height: 100px;
        padding: 12px;
        background: #222;
        border: 1px solid #b8860b;
        color: #eee;
        border-radius: 8px;
        font-size: 16px;
        resize: vertical;
      }
      .btn-container {
        display: flex;
        gap: 20px;
        margin-top: 40px;
      }
      .btn-invia, .btn-annulla {
        flex: 1;
        padding: 16px;
        border: none;
        border-radius: 50px;
        font-size: 18px;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s;
      }
      .btn-invia {
        background: #b8860b;
        color: #000;
      }
      .btn-invia:hover {
        background: #d4a017;
        transform: translateY(-3px);
      }
      .btn-annulla {
        background: #444;
        color: #eee;
      }
      .btn-annulla:hover {
        background: #666;
        transform: translateY(-3px);
      }
      .range-info {
        font-size: 14px;
        color: #aaa;
        margin-top: 6px;
      }
    </style>

    <div id="overlay">
      <div id="modal">
        <button class="close-btn">×</button>
        <h2 data-modal="personaliza_title">Personalizza il tuo modello</h2>

        <form id="form-personalizza">
          <div class="section-title" data-modal="personaliza_userInfo">Le tue informazioni</div>

          <div class="form-group">
            <label for="nome" data-modal="personaliza_name">Nome *</label>
            <input type="text" id="nome" required data-placeholder="personaliza_namePlaceholder">
          </div>

          <div class="form-group">
            <label for="cognome" data-modal="personaliza_surname">Cognome *</label>
            <input type="text" id="cognome" required data-placeholder="personaliza_surnamePlaceholder">
          </div>

          <div class="form-group">
            <label for="qualita" data-modal="personaliza_quality">In qualità di *</label>
            <input type="text" id="qualita" required data-placeholder="personaliza_qualityPlaceholder">
          </div>

          <div class="form-group">
            <label for="indirizzo" data-modal="personaliza_address">Indirizzo *</label>
            <input type="text" id="indirizzo" required data-placeholder="personaliza_addressPlaceholder">
          </div>

          <div class="form-group">
            <label for="rappresentante" data-modal="personaliza_representative">Rappresentante di</label>
            <input type="text" id="rappresentante" data-placeholder="personaliza_representativePlaceholder">
          </div>

          <div class="section-title" data-modal="personaliza_modelDetails">Dettagli del modello</div>

          <div class="form-group">
            <label for="altezza" data-modal="personaliza_height">Altezza (cm) *</label>
            <input type="number" id="altezza" min="50" max="250" step="1" value="180" required>
            <div class="range-info" data-modal="personaliza_heightRange">Min 50 cm – Max 250 cm</div>
          </div>

          <div class="form-group">
            <label for="larghezza" data-modal="personaliza_width">Larghezza (cm) *</label>
            <input type="number" id="larghezza" min="40" max="200" step="1" value="100" required>
            <div class="range-info" data-modal="personaliza_widthRange">Min 40 cm – Max 200 cm</div>
          </div>

          <div class="form-group">
            <label for="profondita" data-modal="personaliza_depth">Profondità (cm) *</label>
            <input type="number" id="profondita" min="30" max="80" step="1" value="50" required>
            <div class="range-info" data-modal="personaliza_depthRange">Min 30 cm – Max 80 cm</div>
          </div>

          <div class="form-group">
            <label for="bottiglie" data-modal="personaliza_bottles">Numero di bottiglie *</label>
            <input type="number" id="bottiglie" min="6" max="200" step="1" value="24" required>
            <div class="range-info" data-modal="personaliza_bottlesRange">Min 6 bottiglie – Max 200 bottiglie</div>
          </div>

          <div class="form-group">
            <label for="legno" data-modal="personaliza_wood">Tipo di legno *</label>
            <select id="legno" required>
              <option value="" data-modal="personaliza_selectOption">Seleziona</option>
              <option value="rovere" data-modal="personaliza_oakPiedmont">Rovere massello Piemonte</option>
              <option value="noce" data-modal="personaliza_italianWalnut">Noce italiano</option>
              <option value="castagno" data-modal="personaliza_ancientChestnut">Castagno antico</option>
              <option value="ciliegio" data-modal="personaliza_selectedCherry">Ciliegio selezionato</option>
            </select>
          </div>

          <div class="form-group">
            <label for="inox" data-modal="personaliza_inox">Tipo di inox *</label>
            <select id="inox" required>
              <option value="" data-modal="personaliza_selectOption">Seleziona</option>
              <option value="specchio" data-modal="personaliza_mirrorInox">Inox specchio</option>
              <option value="satinato" data-modal="personaliza_brushedInox">Inox satinato</option>
              <option value="nero" data-modal="personaliza_blackOpaque">Inox nero opaco</option>
            </select>
          </div>

          <div class="form-group">
            <label for="note" data-modal="personaliza_notes">Note aggiuntive (opzionale)</label>
            <textarea id="note" data-placeholder="personaliza_notesPlaceholder"></textarea>
          </div>

          <div class="btn-container">
            <button type="button" class="btn-annulla" data-modal="personaliza_cancel">Annulla</button>
            <button type="submit" class="btn-invia" data-modal="personaliza_submit">Invia richiesta preventivo</button>
          </div>
        </form>
      </div>
    </div>
  `;

  // Popola i testi tradotti al caricamento
  function populatePersonalizzaModal(lang) {
    const t = window.translations && window.translations[lang] ? window.translations[lang].personaliza : null;
    if (!t) return;

    // Update labels e elementi con data-modal
    shadow.querySelectorAll("[data-modal]").forEach(el => {
      const key = el.getAttribute("data-modal").replace("personaliza_", "");
      const value = t[key];
      if (value) {
        if (el.tagName === "OPTION" || el.tagName === "SELECT") {
          el.textContent = value;
        } else {
          el.textContent = value;
        }
      }
    });

    // Update placeholders
    shadow.querySelectorAll("[data-placeholder]").forEach(el => {
      const key = el.getAttribute("data-placeholder").replace("personaliza_", "");
      const value = t[key];
      if (value) {
        el.setAttribute("placeholder", value);
      }
    });
  }

  // Store reference per aggiornamenti linguistici
  personalizzaRoot._populateModal = populatePersonalizzaModal;

  // Popola il modal al caricamento iniziale
  const initialLang = localStorage.getItem("lang") || "it";
  populatePersonalizzaModal(initialLang);

  document.querySelectorAll('[data-action="personalizza"]').forEach(el => {
    el.addEventListener("click", e => {
      e.preventDefault();
      shadow.querySelector("#overlay").classList.add("open");
    });
  });

  shadow.querySelector(".close-btn").addEventListener("click", () => {
    shadow.querySelector("#overlay").classList.remove("open");
  });

  shadow.querySelector("#overlay").addEventListener("click", e => {
    if (e.target.id === "overlay") {
      shadow.querySelector("#overlay").classList.remove("open");
    }
  });

  shadow.querySelector(".btn-annulla").addEventListener("click", () => {
    shadow.querySelector("#overlay").classList.remove("open");
  });

  const form = shadow.querySelector("#form-personalizza");
  form.addEventListener("submit", e => {
    e.preventDefault();

    const currentLang = localStorage.getItem("lang") || "it";
    const t = window.translations && window.translations[currentLang] ? window.translations[currentLang].personaliza : null;
    const emailPrompt = t ? t.emailPrompt : "Inserisci la tua email per la risposta";
    const requestSent = t ? t.requestSent : "Richiesta inviata! Ti contatteremo presto.";

    const data = {
      nome: shadow.querySelector("#nome").value,
      cognome: shadow.querySelector("#cognome").value,
      qualita: shadow.querySelector("#qualita").value,
      indirizzo: shadow.querySelector("#indirizzo").value,
      rappresentante: shadow.querySelector("#rappresentante").value || "Non specificato",
      altezza: shadow.querySelector("#altezza").value,
      larghezza: shadow.querySelector("#larghezza").value,
      profondita: shadow.querySelector("#profondita").value,
      bottiglie: shadow.querySelector("#bottiglie").value,
      legno: shadow.querySelector("#legno").value,
      inox: shadow.querySelector("#inox").value,
      note: shadow.querySelector("#note").value || "Nessuna nota"
    };

    const subject = encodeURIComponent("Richiesta preventivo personalizzato - Pooly's Mood");
    const body = encodeURIComponent(
      `Richiesta da:\n` +
      `Nome: ${data.nome} ${data.cognome}\n` +
      `In qualità di: ${data.qualita}\n` +
      `Indirizzo: ${data.indirizzo}\n` +
      `Rappresentante di: ${data.rappresentante}\n\n` +
      `Personalizzazione:\n` +
      `Altezza: ${data.altezza} cm\n` +
      `Larghezza: ${data.larghezza} cm\n` +
      `Profondità: ${data.profondita} cm\n` +
      `Numero bottiglie: ${data.bottiglie}\n` +
      `Legno: ${data.legno}\n` +
      `Inox: ${data.inox}\n` +
      `Note: ${data.note}\n\n` +
      `Email utente: ${prompt(emailPrompt) || "non fornita"}`
    );

    window.location.href = `mailto:pooly.s_mood@outlook.com?subject=${subject}&body=${body}`;

    shadow.querySelector("#overlay").classList.remove("open");
    alert(requestSent);
  });
}

// Espongo una funzione inizializzatrice (no-op sicura) che può essere chiamata
// da `main.js` per garantire che lo script sia caricato e i guard siano applicati.
window.initModals = function() { /* init guards già applicati durante il parsing */ };
