// =============================================
// POPUP ACCETTAZIONE OBBLIGATORIA DOPO "SCOPRI"
// =============================================

document.addEventListener("DOMContentLoaded", () => {
  const btnScopri = document.querySelector(".btn-scopri") || document.getElementById("btn-scopri");

  if (!btnScopri) return;

  btnScopri.addEventListener("click", (e) => {
    const hasAccepted = localStorage.getItem("acceptedTerms") === "true";

    if (!hasAccepted) {
      e.preventDefault(); // blocca l'azione normale
      showAcceptPopup();
    } else {
      // Già accettato → procedi normalmente
      enterMood(); // o la tua funzione per aprire il catalogo
    }
  });

  function showAcceptPopup() {
  const root = document.createElement("div");
  root.id = "accept-popup-root";
  document.body.appendChild(root);

  const shadow = root.attachShadow({ mode: "open" });

  // Prendi i testi tradotti in base alla lingua corrente
  const t = translations[currentLang].popup;

  shadow.innerHTML = `
      <style>
        #overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.92);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.5s ease;
        }
        #overlay.show { opacity: 1; }
        #modal {
          background: #111;
          border: 2px solid #b8860b;
          width: 92%;
          max-width: 600px;
          max-height: 85vh;
          overflow-y: auto;
          padding: 40px;
          border-radius: 12px;
          color: #eee;
          text-align: center;
          box-shadow: 0 20px 80px rgba(0,0,0,0.9);
        }
        h2 { color: #b8860b; margin-bottom: 20px; font-size: 36px; }
        p { line-height: 1.7; margin: 15px 0; font-size: 17px; }
        .checkbox-label { display: flex; align-items: center; justify-content: center; margin: 30px 0; font-size: 18px; }
        .accept-checkbox { margin-right: 12px; transform: scale(1.5); }
        .btn-accept {
          padding: 14px 40px;
          background: #b8860b;
          color: #000;
          border: none;
          border-radius: 50px;
          font-size: 18px;
          cursor: pointer;
          font-weight: bold;
        }
        .btn-accept:disabled { background: #555; cursor: not-allowed; }
      </style>

     <div id="overlay" class="show">
      <div id="modal">
        <h2>${t.title}</h2>
        <p>${t.text}</p>
        <p>L'AI risponde a domande sui progetti reali – tutto protetto da copyright.</p> <!-- questo puoi tradurlo o lasciarlo fisso -->

        <label class="checkbox-label">
          <input type="checkbox" id="accept-check" class="accept-checkbox">
          ${t.checkbox} <a href="javascript:void(0)" id="open-terms" style="color: #b8860b; text-decoration: underline;">${t.link}</a>
        </label>

        <button id="btn-accept" class="btn-accept" disabled>${t.button}</button>
      </div>
    </div>
  `;

    const overlay = shadow.querySelector("#overlay");
    const checkbox = shadow.querySelector("#accept-check");
    const btnAccept = shadow.querySelector("#btn-accept");
    const openTerms = shadow.querySelector("#open-terms");

    checkbox.addEventListener("change", () => {
      btnAccept.disabled = !checkbox.checked;
    });

    btnAccept.addEventListener("click", () => {
      if (checkbox.checked) {
        localStorage.setItem("acceptedTerms", "true");
        root.remove(); // chiudi popup
        enterMood(); // procedi al catalogo
      }
    });

    openTerms.addEventListener("click", () => {
      // Apri il modal termini
      document.querySelector('[data-action="termini"]').click();
    });
  }
});