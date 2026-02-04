document.addEventListener("DOMContentLoaded", () => {
  console.log("modals.js caricato – pronto per intercettare click");

  // ====================
  // MODAL PROGETTI REALIZZATI
  // ====================
  const progettiRoot = document.getElementById("progetti-modal-root");
  if (progettiRoot) {
    const shadowProgetti = progettiRoot.attachShadow({ mode: "open" });

    shadowProgetti.innerHTML = `
      <!-- stesso style e HTML del modal progetti che avevi prima – non cambio nulla qui per brevità -->
      <!-- copia-incolla il tuo <style> + <div id="modal-overlay"> ... </div> -->
    `;

    // Trova il link con selector più sicuro (usa href esatto)
    const progettiLink = document.querySelector('a[href="#progetti"]');
    if (progettiLink) {
      console.log("Link Progetti trovato – listener aggiunto");
      progettiLink.addEventListener("click", (e) => {
        e.preventDefault(); // BLOCCA lo scroll di default
        e.stopPropagation(); // blocca bubbling se altri listener
        console.log("Click su Progetti – apro modal");
        shadowProgetti.querySelector("#modal-overlay").classList.add("open");
      });
    } else {
      console.error("Link #progetti NON trovato!");
    }

    // Chiudi modal (stesso di prima)
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
  // MODAL LICENSING – stesso schema
  // ====================
  const licensingRoot = document.getElementById("licensing-modal-root");
  if (licensingRoot) {
    const shadowLicensing = licensingRoot.attachShadow({ mode: "open" });

    shadowLicensing.innerHTML = `
      <!-- stesso style e HTML del modal licensing -->
    `;

    const licensingLink = document.querySelector('a[href="#licensing"]');
    if (licensingLink) {
      console.log("Link Licensing trovato – listener aggiunto");
      licensingLink.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log("Click su Licensing – apro modal");
        shadowLicensing.querySelector("#modal-overlay").classList.add("open");
      });
    } else {
      console.error("Link #licensing NON trovato!");
    }

    // Chiudi (stesso di prima)
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