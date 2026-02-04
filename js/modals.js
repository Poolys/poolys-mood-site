document.addEventListener("DOMContentLoaded", () => {
  // ====================
  // MODAL PROGETTI REALIZZATI
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
          max-width: 1200px;
          max-height: 90vh;
          overflow-y: auto;
          padding: 40px;
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
          transition: color 0.3s;
        }
        .close-btn:hover { color: #fff; }
        h2 { color: var(--oro); margin-bottom: 30px; font-size: 42px; text-align: center; letter-spacing: 0.05em; }
        .progetti-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 40px;
        }
        .progetto img {
          width: 100%;
          border: 1px solid rgba(212,175,55,0.4);
          border-radius: 6px;
        }
        .progetto p {
          margin-top: 12px;
          text-align: center;
          font-style: italic;
          color: #ccc;
          font-size: 17px;
        }
      </style>

      <div id="modal-overlay">
        <div id="modal-content">
          <button class="close-btn">×</button>
          <h2>Alcuni lavori realizzati</h2>
          <div class="progetti-grid">
            <div class="progetto">
              <img src="assets/img/progetti/scala-chiocciola.jpg" alt="Scala a chiocciola">
              <p>Scala a chiocciola inox – 7.8 tonnellate, 1 mese di lavorazione</p>
            </div>
            <div class="progetto">
              <img src="assets/img/progetti/baule-bruciato.jpg" alt="Baule bruciato">
              <p>Espositore baule bruciato – venduto</p>
            </div>
            <div class="progetto">
              <img src="assets/img/progetti/tronco-bottiglie.jpg" alt="Tronco bottiglie">
              <p>Portabottiglie tronco naturale – venduto</p>
            </div>
            <!-- Aggiungi altre tue foto qui -->
          </div>
        </div>
      </div>
    `;

    // Apri modal progetti
    const progettiLink = document.querySelector('a[href="#progetti"]');
    if (progettiLink) {
      progettiLink.addEventListener("click", (e) => {
        e.preventDefault(); // BLOCCA lo scroll di default
        shadowProgetti.querySelector("#modal-overlay").classList.add("open");
      });
    }

    // Chiudi modal
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
  // MODAL LICENSING (stesso stile, testo diverso)
  // ====================
  const licensingRoot = document.getElementById("licensing-modal-root");
  if (licensingRoot) {
    const shadowLicensing = licensingRoot.attachShadow({ mode: "open" });

    shadowLicensing.innerHTML = `
      <!-- Stessi stili del modal progetti – copia-incolla per uniformità -->
      <style>
        /* ... copia tutto lo <style> del modal progetti qui ... */
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
            <li>Materiali premium: legno Piemonte + inox specchio/satinato</li>
            <li>Foto e proof of concept (lavori venduti)</li>
          </ul>
          <p>Interessato a partnership, prototipi o produzione? Contattami:</p>
          <p><strong>Email:</strong> <a href="mailto:info@poolysmood.com">info@poolysmood.com</a></p>
          <p><strong>WhatsApp:</strong> +39 [INSERISCI IL TUO NUMERO]</p>
          <p>Gaudium Vino – accogliamo presenze.</p>
        </div>
      </div>
    `;

    // Apri modal licensing
    const licensingLink = document.querySelector('a[href="#licensing"]');
    if (licensingLink) {
      licensingLink.addEventListener("click", (e) => {
        e.preventDefault(); // BLOCCA lo scroll di default
        shadowLicensing.querySelector("#modal-overlay").classList.add("open");
      });
    }

    // Chiudi modal
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