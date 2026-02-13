document.addEventListener("DOMContentLoaded", () => {
  // ====================
  // MODAL PROGETTI
  // ====================
  const progettiRoot = document.getElementById("progetti-modal-root");
  if (progettiRoot) {
    const shadowProgetti = progettiRoot.attachShadow({ mode: "open" });
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
              <p>Espositore baule bruciato – venduto</p>
            </div>
            <div class="progetto">
              <img src="assets/img/progetti/tronco-bottiglie.jpg" alt="Tronco bottiglie">
              <img src="assets/img/progetti/tronco-bottiglie1.jpg" alt="Tronco bottiglie">
              <p>Portabottiglie tronco naturale – venduto</p>
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
  const shadowLicensing = licensingRoot.attachShadow({ mode: "open" });
  
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
}

// ====================
// MODAL CONTATTI
// ====================
const contattiRoot = document.getElementById("contatti-modal-root");
if (contattiRoot) {
  const shadowContatti = contattiRoot.attachShadow({ mode: "open" });

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
          <p><span class="icon">✉️</span> <a href="mailto:pooly.s_mood@outlook.com">pooly.s_mood@outlook.com</a></p>
          <p><span class="icon">📱</span> <a href="https://wa.me/39xxxxx" target="_blank">+39 333 123 4567 (WhatsApp)</a></p>
          <p><span class="icon">📍</span> Piemonte, Italia (dettagli su richiesta)</p>
        </div>

        <p>Ti rispondo al più presto – Gaudium Vino!</p>
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
  const shadowTermini = terminiRoot.attachShadow({ mode: "open" });
  
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
}
