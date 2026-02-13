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
          <h2>Alcuni lavori realizzati</h2>
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
            <!-- Aggiungi altre foto se ne hai -->
          </div>
        </div>
      </div>
    `;

    // Apri modal
    document.querySelector('a[href="#progetti"]').addEventListener("click", (e) => {
      e.preventDefault();
      shadowProgetti.querySelector("#modal-overlay").classList.add("open");
    });

    // Chiudi modal
    shadowProgetti.querySelector(".close-btn").addEventListener("click", () => {
      shadowProgetti.querySelector("#modal-overlay").classList.remove("open");
    });
    shadowProgetti.querySelector("#modal-overlay").addEventListener("click", (e) => {
      if (e.target.id === "modal-overlay") {
        shadowProgetti.querySelector("#modal-overlay").classList.remove("open");
      }
    });}
  });

  // ====================
// MODAL LICENSING
// ====================
const licensingRoot = document.getElementById("licensing-modal-root");
if (licensingRoot) {
  const shadowLicensing = licensingRoot.attachShadow({ mode: "open" });

  shadowLicensing.innerHTML = `
    <style>
      /* Stessi stili del modal progetti – copia-incolla per uniformità */
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
          <li>Materiali premium: legni preggiati + inox specchio/satinato</li>
          <li>Foto e proof of concept (lavori venduti)</li>
        </ul>
        <p>Interessato a partnership, prototipi o produzione? Contattami:</p>
        <p><strong>Email:</strong> <a href="mailto:pooly.s_mood@outlook.com">pooly.s_mood@outlook.com</a></p>
        <p><strong>WhatsApp:</strong> +39 [TUO NUMERO]</p>
        <p>Gaudium Vino – accogliamo presenze.</p>
      </div>
    </div>
  `;
  

  // Apri modal licensing
  const licensingLink = document.querySelector('a[href="#licensing"]');
  if (licensingLink) {
    console.log("Link Licensing trovato – listener aggiunto");
    licensingLink.addEventListener("click", (e) => {
      e.preventDefault(); // blocca scroll
      e.stopPropagation();
      console.log("Click su Licensing – apro modal");
      shadowLicensing.querySelector("#modal-overlay").classList.add("open");
    });
  } else {
    console.error("Link #licensing NON trovato!");
  }

  // Chiudi
  shadowLicensing.querySelector(".close-btn").addEventListener("click", () => {
    shadowLicensing.querySelector("#modal-overlay").classList.remove("open");
  });
  shadowLicensing.querySelector("#modal-overlay").addEventListener("click", (e) => {
    if (e.target.id === "modal-overlay") {
      shadowLicensing.querySelector("#modal-overlay").classList.remove("open");
    }
  });
};
// ====================
// MODAL CONTATTI
// ====================
const contattiRoot = document.getElementById("contatti-modal-root");
if (contattiRoot) {
  const shadowContatti = contattiRoot.attachShadow({ mode: "open" });

  shadowContatti.innerHTML = `
    <style>
      /* Stessi stili degli altri modal – copia per uniformità */
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
        <h2>Contatti</h2>
        <p>Per richieste, collaborazioni, licensing o semplicemente per un saluto 🍷</p>

        <div class="contatti-info">
          <p><span class="icon">✉️</span> <a href="mailto:pooly.s_mood@outlook.com">pooly.s_mood@outlook.com</a></p>
          <p><span class="icon">📱</span> <a href="https://wa.me/39xxxxx" target="_blank">+39 333 123 4567 (WhatsApp)</a></p>
          <p><span class="icon">📍</span> Piemonte, Italia (dettagli su richiesta)</p>
        </div>

        <p>Ti rispondo al più presto – Gaudium Vino!</p>
      </div>
    </div>
  `;

  // Apri modal contatti
  document.querySelectorAll('[data-action="contatti"]').forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      e.stopPropagation();
      console.log("Apro modal Contatti");
      shadowContatti.querySelector("#modal-overlay").classList.add("open");
    });
  });

  // Chiudi
  shadowContatti.querySelector(".close-btn").addEventListener("click", () => {
    shadowContatti.querySelector("#modal-overlay").classList.remove("open");
  });
  shadowContatti.querySelector("#modal-overlay").addEventListener("click", e => {
    if (e.target.id === "modal-overlay") {
      shadowContatti.querySelector("#modal-overlay").classList.remove("open");
    }
  });
};
// =============================================
// MODAL TERMINI E CONDIZIONI (testo completo)
// =============================================

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
      p, li { line-height: 1.7; margin: 15px 0; font-size: 17px; }
    </style>

    <div id="modal-overlay">
      <div id="modal-content">
        <button class="close-btn">×</button>
        <h2>Termini e Condizioni</h2>

        <!-- === QUI INSERISCI IL TESTO COMPLETO DEI TERMINI === -->
        <p>Benvenuto su Pooly's Mood. Utilizzando questo sito e i suoi servizi (inclusa l'AI) accetti i seguenti termini:</p>
        <p>1. Proprietà intellettuale: tutti i progetti, fotografie, testi, design e contenuti sono di proprietà esclusiva di Paul Șerbănescu. È vietato riprodurre, distribuire o utilizzare senza autorizzazione scritta.</p>
        <p>2. Uso dell'AI: l'AI è uno strumento di supporto informativo. Le risposte non costituiscono consulenza legale, tecnica o professionale vincolante.</p>
        <p>3. Responsabilità: l'utente è responsabile dell'uso delle informazioni ricevute. Pooly's Mood non è responsabile per danni derivanti da un uso improprio.</p>
        <p>4. Privacy: i dati personali sono trattati secondo il GDPR. Vedi Privacy Policy.</p>
        <p>5. Modifiche: i termini possono essere aggiornati. L'uso successivo del sito implica accettazione delle modifiche.</p>
        <p>Per informazioni o richieste: pooly.s_mood@outlook.com</p>
        <p> Termeni e condizioni completi:
        Benvenuto su **Pooly's Mood** (www.poolysmood.com).  
Utilizzando il sito, i suoi contenuti, l'AI assistente (“PoolyAI”) e/o richiedendo informazioni su prodotti, progetti, licensing o servizi, accetti integralmente i seguenti Termini e Condizioni.

Se non accetti questi termini, non utilizzare il sito, l'AI o contattarci per richieste professionali.

#### 1. Proprietà intellettuale e diritti d'autore
- Tutti i contenuti presenti sul sito (testi, fotografie, immagini, video, design, progetti, descrizioni tecniche, disegni, rendering, loghi, nome “Pooly's Mood”, slogan “Gaudium Vino”, ecc.) sono di proprietà esclusiva di **Paul Șerbănescu** o dei suoi licenziatari.
- È vietata qualsiasi riproduzione, modifica, distribuzione, pubblicazione, trasmissione, vendita o sfruttamento commerciale (anche parziale) senza autorizzazione scritta esplicita.
- I progetti fisici (es. bauli bruciati, tronchi portabottiglie, ecc.) sono opere artigianali protette dalla legge sul diritto d’autore e dalla proprietà industriale.

#### 2. Uso dell’AI (“PoolyAI”)
- PoolyAI è uno strumento di supporto informativo e conversazionale, non un consulente legale, tecnico o professionale.
- Le risposte dell’AI sono generate in base a informazioni generali, dati forniti dall’utente e dal contesto del sito. **Non costituiscono in nessun caso garanzia di fattibilità, correttezza tecnica, legale o commerciale**.
- L’utente è **esclusivamente responsabile** dell’uso che fa delle risposte dell’AI, inclusi eventuali progetti, prototipi, produzioni o decisioni commerciali.
- Pooly's Mood non è responsabile per danni, perdite economiche, errori di produzione o controversie derivanti dall’uso (o dal malinteso) delle informazioni fornite dall’AI.

#### 3. Informazioni sui prodotti e progetti
- Le fotografie, descrizioni e specifiche tecniche presenti sul sito sono indicative e rappresentano lo stato attuale dei progetti.
- Pooly's Mood si riserva il diritto di modificare, aggiornare o rimuovere prodotti/progetti senza preavviso.
- I progetti mostrati sono **protetti da copyright** e non possono essere riprodotti o realizzati senza autorizzazione scritta.

#### 4. Licensing e produzione
- Il licensing dei progetti Pooly's Mood è soggetto a contratto separato, NDA e accordi specifici.
- Le informazioni fornite (anche tramite AI) non costituiscono offerta vincolante di licensing o produzione.
- Ogni richiesta di licensing o produzione sarà valutata caso per caso.

#### 5. Limitazione di responsabilità
- Il sito e l’AI sono forniti “così come sono” e “come disponibili”.
- Pooly's Mood non garantisce che il sito sia privo di errori, virus, interruzioni o che l’AI dia sempre risposte corrette o complete.
- In nessun caso Pooly's Mood sarà responsabile per danni diretti, indiretti, consequenziali, perdita di profitto o dati derivanti dall’uso del sito o dell’AI.
- La responsabilità massima è limitata al valore di eventuali servizi acquistati (se applicabile).

#### 6. Privacy e trattamento dati
- Il trattamento dei dati personali avviene secondo il Regolamento UE 2016/679 (GDPR) e la normativa italiana.
- Per dettagli vedi la **Privacy Policy** (link da inserire quando la crei).
- L’AI potrebbe memorizzare temporaneamente il contesto della conversazione per migliorare la qualità delle risposte (nessun dato personale sensibile viene conservato permanentemente senza consenso).

#### 7. Legge applicabile e foro competente
- I presenti termini sono regolati dalla legge italiana.
- Per qualsiasi controversia è competente in via esclusiva il Foro di Milano.

#### 8. Modifiche ai Termini
- Pooly's Mood può aggiornare questi Termini in qualsiasi momento.
- L’uso continuato del sito dopo la pubblicazione delle modifiche implica accettazione dei nuovi termini.

#### 9. Contatti
Per qualsiasi domanda, chiarimento o richiesta relativa ai Termini e Condizioni:
- Email: pooly.s_mood@outlook.com
- WhatsApp: [inserisci tuo numero se vuoi condividerlo]

Accettando questi Termini confermi di averli letti, compresi e accettati integralmente.

Grazie per aver scelto Pooly's Mood.  
**Gaudium Vino – accogliamo presenze.**

---<p>

        <p style="margin-top: 40px; text-align: center; font-style: italic;">Grazie per aver letto e accettato.</p>
      </div>
    </div>
  `;

  // Apri modal quando si clicca il pulsante
  document.querySelectorAll('[data-action="termini"]').forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      e.stopPropagation();
      shadowTermini.querySelector("#modal-overlay").classList.add("open");
    });
  });

  // Chiudi modal
  shadowTermini.querySelector(".close-btn").addEventListener("click", () => {
    shadowTermini.querySelector("#modal-overlay").classList.remove("open");
  });

  shadowTermini.querySelector("#modal-overlay").addEventListener("click", e => {
    if (e.target.id === "modal-overlay") {
      shadowTermini.querySelector("#modal-overlay").classList.remove("open");
    }
  });
};

// =============================================
// MODAL PERSONALIZZAZIONE MODELLO (aggiornato con rubriche in cima)
// =============================================

const personalizzaRoot = document.getElementById("personalizza-modal-root");
if (personalizzaRoot) {
  const shadow = personalizzaRoot.attachShadow({ mode: "open" });

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
      input[type="number"]::-webkit-inner-spin-button,
      input[type="number"]::-webkit-outer-spin-button {
        opacity: 1;
      }
      .range-info {
        font-size: 14px;
        color: #aaa;
        margin-top: 6px;
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
      .btn-invia:disabled {
        background: #555;
        cursor: not-allowed;
      }
      .btn-annulla {
        background: #444;
        color: #eee;
      }
      .btn-annulla:hover {
        background: #666;
        transform: translateY(-3px);
      }
    </style>

    <div id="overlay">
      <div id="modal">
        <button class="close-btn">×</button>
        <h2>Personalizza il tuo modello</h2>

        <form id="form-personalizza">

          <!-- RUBRICHE INFORMAZIONI UTENTE (in cima) -->
          <div class="section-title">Le tue informazioni</div>

          <div class="form-group">
            <label for="nome">Nome *</label>
            <input type="text" id="nome" required placeholder="Es. Mario">
          </div>

          <div class="form-group">
            <label for="cognome">Cognome *</label>
            <input type="text" id="cognome" required placeholder="Es. Rossi">
          </div>

          <div class="form-group">
            <label for="qualita">In qualità di *</label>
            <input type="text" id="qualita" required placeholder="Es. Privato, Titolare enoteca, Architetto, Azienda...">
          </div>

          <div class="form-group">
            <label for="indirizzo">Indirizzo *</label>
            <input type="text" id="indirizzo" required placeholder="Es. Via Roma 12, Milano">
          </div>

          <div class="form-group">
            <label for="rappresentante">Rappresentante di</label>
            <input type="text" id="rappresentante" placeholder="Es. Cantina Rossi SRL, Enoteca Milano">
          </div>

          <!-- PERSONALIZZAZIONE MODELLO -->
          <div class="section-title">Dettagli del modello</div>

          <div class="form-group">
            <label for="altezza">Altezza (cm) *</label>
            <input type="number" id="altezza" min="50" max="250" step="1" value="180" required>
            <div class="range-info">Min 50 cm – Max 250 cm</div>
          </div>

          <div class="form-group">
            <label for="larghezza">Larghezza (cm) *</label>
            <input type="number" id="larghezza" min="40" max="200" step="1" value="100" required>
            <div class="range-info">Min 40 cm – Max 200 cm</div>
          </div>

          <div class="form-group">
            <label for="profondita">Profondità (cm) *</label>
            <input type="number" id="profondita" min="30" max="80" step="1" value="50" required>
            <div class="range-info">Min 30 cm – Max 80 cm</div>
          </div>

          <div class="form-group">
            <label for="bottiglie">Numero di bottiglie *</label>
            <input type="number" id="bottiglie" min="6" max="200" step="1" value="24" required>
            <div class="range-info">Min 6 bottiglie – Max 200 bottiglie</div>
          </div>

          <div class="form-group">
            <label for="legno">Tipo di legno *</label>
            <select id="legno" required>
              <option value="">Seleziona</option>
              <option value="rovere">Rovere massello Piemonte</option>
              <option value="noce">Noce italiano</option>
              <option value="castagno">Castagno antico</option>
              <option value="ciliegio">Ciliegio selezionato</option>
            </select>
          </div>

          <div class="form-group">
            <label for="inox">Tipo di inox *</label>
            <select id="inox" required>
              <option value="">Seleziona</option>
              <option value="specchio">Inox specchio</option>
              <option value="satinato">Inox satinato</option>
              <option value="nero">Inox nero opaco</option>
            </select>
          </div>

          <div class="form-group">
            <label for="note">Note aggiuntive (opzionale)</label>
            <textarea id="note" placeholder="Es. tipo bottiglie (Magnum, Standard), posizione, esigenze particolari..."></textarea>
          </div>

          <div class="btn-container">
            <button type="button" class="btn-annulla">Annulla</button>
            <button type="submit" class="btn-invia">Invia richiesta preventivo</button>
          </div>
        </form>
      </div>
    </div>
  `;

  // Apri modal
  document.querySelectorAll('[data-action="personalizza"]').forEach(el => {
    el.addEventListener("click", e => {
      e.preventDefault();
      shadow.querySelector("#overlay").classList.add("open");
    });
  });

  // Chiudi modal
  shadow.querySelector(".close-btn").addEventListener("click", () => {
    shadow.querySelector("#overlay").classList.remove("open");
  });

  shadow.querySelector("#overlay").addEventListener("click", e => {
    if (e.target.id === "overlay") {
      shadow.querySelector("#overlay").classList.remove("open");
    }
  });

  // Pulsante Annulla
  shadow.querySelector(".btn-annulla").addEventListener("click", () => {
    shadow.querySelector("#overlay").classList.remove("open");
  });

  // Gestione invio form
  const form = shadow.querySelector("#form-personalizza");
  form.addEventListener("submit", e => {
    e.preventDefault();

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

    // === INVIO VIA EMAIL ===
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
      `Email utente: ${prompt("Inserisci la tua email per la risposta") || "non fornita"}`
    );

    window.location.href = `mailto:pooly.s_mood@outlook.com?subject=${subject}&body=${body}`;

    // Chiudi modal
    shadow.querySelector("#overlay").classList.remove("open");
    alert("Richiesta inviata! Ti contatteremo presto.");
  });
}