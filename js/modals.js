document.addEventListener("DOMContentLoaded", () => {
  console.log("modals.js caricato – versione stabile tablet/mobile");

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
          background: rgba(0,0,0,0.95);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 99999 !important;
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
          border: 2px solid #D4AF37;
          width: 92%;
          max-width: 1200px;
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
          color: #D4AF37;
          cursor: pointer;
        }
        h2 { color: #D4AF37; margin-bottom: 30px; font-size: 42px; text-align: center; }
        .progetti-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 40px;
        }
        .progetto img { width: 100%; border: 1px solid rgba(212,175,55,0.4); border-radius: 6px; }
        .progetto p { margin-top: 12px; text-align: center; color: #ccc; font-size: 17px; }
      </style>

      <div id="modal-overlay">
        <div id="modal-content">
          <button class="close-btn">×</button>
          <h2>Alcuni lavori realizzati</h2>
          <div class="progetti-grid">
            <!-- Aggiungi le tue 4 foto qui -->
            <div class="progetto">
              <img src="assets/img/progetti/baule-bruciato-1.jpg" alt="Baule 1">
              <p>Espositore baule bruciato – dettaglio 1</p>
            </div>
            <div class="progetto">
              <img src="assets/img/progetti/baule-bruciato-2.jpg" alt="Baule 2">
              <p>Espositore baule bruciato – dettaglio 2</p>
            </div>
            <div class="progetto">
              <img src="assets/img/progetti/tronco-bottiglie-1.jpg" alt="Tronco 1">
              <p>Portabottiglie tronco – dettaglio 1</p>
            </div>
            <div class="progetto">
              <img src="assets/img/progetti/tronco-bottiglie-2.jpg" alt="Tronco 2">
              <p>Portabottiglie tronco – dettaglio 2</p>
            </div>
          </div>
        </div>
      </div>
    `;

    // Apri modal progetti
    document.querySelectorAll('[data-action="progetti"]').forEach(link => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log("Click Progetti – apro modal");
        shadowProgetti.querySelector("#modal-overlay").classList.add("open");
      });
    });

    // Chiudi
    shadowProgetti.querySelector(".close-btn").addEventListener("click", () => {
      shadowProgetti.querySelector("#modal-overlay").classList.remove("open");
    });
    shadowProgetti.querySelector("#modal-overlay").addEventListener("click", (e) => {
      if (e.target.id === "modal-overlay") {
        shadowProgetti.querySelector("#modal-overlay").classList.remove("open");
      }
    });
  }

  // ====================
  // MODAL LICENSING (stesso schema)
  // ====================
  const licensingRoot = document.getElementById("licensing-modal-root");
  if (licensingRoot) {
    const shadowLicensing = licensingRoot.attachShadow({ mode: "open" });

    shadowLicensing.innerHTML = `
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Prata', serif; }
        #modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.95); display: flex; align-items: center; justify-content: center; z-index: 99999 !important; opacity: 0; pointer-events: none; transition: opacity 0.4s ease; }
        #modal-overlay.open { opacity: 1; pointer-events: all; }
        #modal-content { background: #111; border: 2px solid #D4AF37; width: 92%; max-width: 900px; max-height: 90vh; overflow-y: auto; padding: 50px; border-radius: 12px; color: #eee; box-shadow: 0 20px 80px rgba(0,0,0,0.9); }
        .close-btn { position: absolute; top: 20px; right: 30px; background: none; border: none; font-size: 40px; color: #D4AF37; cursor: pointer; }
        h2 { color: #D4AF37; margin-bottom: 30px; font-size: 42px; text-align: center; }
        p { line-height: 1.7; margin-bottom: 20px; font-size: 18px; }
        ul { list-style: none; padding-left: 0; margin: 20px 0; }
        li { margin: 12px 0; font-size: 17px; }
        a { color: #D4AF37; text-decoration: none; }
        a:hover { text-decoration: underline; }
      </style>

      <div id="modal-overlay">
        <div id="modal-content">
          <button class="close-btn">×</button>
          <h2>Licensing & Produzione</h2>
          <p>Pooly’s Mood è una linea completa pronta per produzione o licensing esclusivo.</p>
          <p><strong>Pacchetto chiavi in mano include:</strong></p>
          <ul>
            <li>10 modelli base (con varianti e personalizzazioni)</li>
            <li>Disegni CAD 3D/2D (in arrivo)</li>
            <li>PDF tecnico completo (misure, materiali, tecniche)</li>
            <li>Sito web professionale con AI chat integrata</li>
            <li>Materiali premium: legno preggiato del Piemonte + inox specchio/satinato</li>
            <li>Foto e proof of concept (lavori venduti)</li>
          </ul>
          <p>Interessato? Contattami:</p>
          <p><strong>Email:</strong> <a href="mailto:pooly.s_mood@outlook.com">pooly.s_mood@outlook.com</a></p>
          <p><strong>WhatsApp:</strong> +39 [TUO NUMERO]</p>
        </div>
      </div>
    `;

    document.querySelectorAll('[data-action="licensing"]').forEach(link => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log("Click Licensing – apro modal");
        shadowLicensing.querySelector("#modal-overlay").classList.add("open");
      });
    });

    shadowLicensing.querySelector(".close-btn").addEventListener("click", () => {
      shadowLicensing.querySelector("#modal-overlay").classList.remove("open");
    });
    shadowLicensing.querySelector("#modal-overlay").addEventListener("click", (e) => {
      if (e.target.id === "modal-overlay") {
        shadowLicensing.querySelector("#modal-overlay").classList.remove("open");
      }
    });
  }
});