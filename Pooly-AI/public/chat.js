// ==============================================
// POOLY AI — SHADOW CHAT (VERSIONE FINALE 2025)
// ==============================================

document.addEventListener("DOMContentLoaded", () => {
  (function () {

    /* ===============================
       1. ROOT NEL DOM NORMALE
    =============================== */
    let root = document.getElementById("pooly-ai-root");
    if (!root) {
      root = document.createElement("div");
      root.id = "pooly-ai-root";
      document.body.appendChild(root);
    }

    /* ===============================
       2. SHADOW ROOT
    =============================== */
    const shadow = root.attachShadow({ mode: "open" });

    /* ===============================
       3. CSS — ISOLATO E MIGLIORATO
    =============================== */
    const style = document.createElement("style");
    style.textContent = `
      * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Prata', serif; }

      /* === PALLINO === */
      #poolyPallino {
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 66px;
        height: 66px;
        border-radius: 50%;
        background: #bd0b0b;
        color: #000;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        font-weight: bold;
        cursor: pointer;
        box-shadow: 0 6px 20px rgba(0,0,0,0.5);
        transition: all 0.35s ease;
        z-index: 9999;
        user-select: none;
      }
      #poolyPallino:hover {
        transform: scale(1.08);
        box-shadow: 0 10px 30px rgba(212,175,55,0.4);
      }
      #poolyPallino.closed {
        opacity: 0;
        transform: scale(0.7);
        pointer-events: none;
      }

      /* === CHAT === */
      #poolyChat {
        position: fixed;
        bottom: 1px;
        right: 2px;
        width: 100%;
        height: 520px; /* ALTEZZA FISSA – non si allunga mai */
        max-height: 60vh;
        background: #111;
        border: 1.2px solid #D4AF37;
        border-radius: 16px;
        display: none;
        flex-direction: column;
        overflow: hidden;
        opacity: 0;
        transform: translateY(30px);
        pointer-events: none;
        transition: all 0.35s ease;
        box-shadow: 0 -10px 40px rgba(0,0,0,0.7);
        z-index: 9998;
      }
      #poolyChat.open {
        display: flex;
        opacity: 1;
        transform: translateY(0);
        pointer-events: all;
      }

      /* === HEADER === */
      #chatHeader {
         background: linear-gradient(90deg, #138808, #fff, #d30000);
        color: #11100eff;
        text-align: center;
        font-size: 15px;
        font-weight: bold;
        border-bottom: 1px solid #D4AF37;
        position: relative;
      }  

      #close-btn {
        position: absolute;
        top: 10px;
        right: 15px;
        background: none;
        border: none;
        color: #D4AF37;
        font-size: 28px;
        cursor: pointer;
      }

      /* === BODY === */
      #chatBody {
        flex: 1;
        padding: 16px;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        gap: 12px;
        background: #0a0a0a;
        scroll-behavior: smooth;
      }

      .message {
        max-width: 88%;
        border-radius: 18px;
        font-size: 12px;
        line-height: 1.45;
      }

      .userMessage {
        align-self: flex-end;
        background: #D4AF37;
        color: #000;
      }

      .aiMessage {
        align-self: flex-start;
        background: #222;
        color: #eee;
      }

      /* === INPUT === */
      #chatInputWrapper {
        display: flex;
        gap: 10px;
        padding: 12px;
        background: #000;
        border-top: 1px solid #D4AF37;
      }

      #msg {
        flex: 1;
        padding: 12px 16px;
        border-radius: 24px;
        border: 1px solid #D4AF37;
        background: #111;
        color: #eee;
        font-size: 16px;
        outline: none;
      }

      #msg:focus {
        border-color: #f0c14b;
        box-shadow: 0 0 0 2px rgba(212,175,55,0.3);
      }

      #sendBtn {
        padding: 0 20px;
        border-radius: 24px;
        border: none;
        background: #D4AF37;
        color: #000;
        font-weight: bold;
        cursor: pointer;
        transition: background 0.3s;
      }

      #sendBtn:hover {
        background: #f0c14b;
      }

      /* ===============================
         MOBILE — FULL SCREEN SCRITTURA
      =============================== */
      @media (max-width: 767px) {
        #poolyChat.writing {
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          max-height: none;
          height: 100dvh;
          border-radius: 0;
        }

        #chatHeader {
          position: sticky;
          top: 0;
          z-index: 2;
          border-radius: 0;
        }

        #chatInputWrapper {
          position: sticky;
          bottom: 0;
          z-index: 2;
        }
      }
    `;
    shadow.appendChild(style);

    /* ===============================
       4. HTML STRUTTURA
    =============================== */
    const wrapper = document.createElement("div");
    wrapper.innerHTML = `
      <div id="poolyPallino">PoolyAI</div>

      <div id="poolyChat">
        <div id="chatHeader">
          PoolyAI di Pooly’s Mood
          <button id="close-btn">×</button>
        </div>
        <div id="chatBody">
          <!-- Messaggio iniziale verrà aggiunto qui -->
        </div>
        <div id="chatInputWrapper">
          <input id="msg" placeholder="Scrivi qui..." autocomplete="off" />
          <button id="sendBtn">Invia</button>
        </div>
      </div>
    `;
    shadow.appendChild(wrapper);

    /* ===============================
       5️⃣ VISIBILITÀ (NO LANDING)
    =============================== */
    const hero = document.getElementById("hero");
    if (hero && getComputedStyle(hero).display !== "none") {
      root.style.display = "none";
    }
    window.addEventListener("enterMoodDone", () => {
      setTimeout(() => root.style.display = "block", 500);
    });

    /* ===============================
       5. ELEMENTI DOM
    =============================== */
    const pallino = shadow.getElementById("poolyPallino");
    const chat = shadow.getElementById("poolyChat");
    const chatBody = shadow.getElementById("chatBody");
    const input = shadow.getElementById("msg");
    const sendBtn = shadow.getElementById("sendBtn");
    const closeBtn = shadow.getElementById("close-btn");

    /* ===============================
       6. STATO E LOGICA
    =============================== */
    let chatHistory = JSON.parse(localStorage.getItem("poolyChatHistory")) || [];

    // Aggiungi messaggio iniziale solo la prima volta
    if (!chatHistory.length) {
      chatHistory.push({
        role: "ai",
        content: "Ciao! Sono PoolyAI, assistente di Pooly’s Mood.\nCome posso aiutarti oggi? "
      });
    }

    function renderHistory() {
      chatBody.innerHTML = "";
      chatHistory.forEach(msg => {
        const div = document.createElement("div");
        div.className = msg.role === "user" ? "message userMessage" : "message aiMessage";
        div.textContent = msg.content;
        chatBody.appendChild(div);
      });

      // Scroll automatico in basso (con piccolo delay per DOM)
      setTimeout(() => {
        chatBody.scrollTop = chatBody.scrollHeight;
      }, 30);
    }

    // Nascondi messaggio iniziale dopo primo messaggio utente
    function hideInitialMessage() {
      const initialMsg = chatBody.querySelector(".aiMessage:first-child");
      if (initialMsg) {
        initialMsg.style.display = "none";
      }
    }

    /* ===============================
       7. EVENTI
    =============================== */
    // Apri chat
    pallino.addEventListener("click", () => {
      chat.classList.add("open");
      pallino.classList.add("closed");
      renderHistory();
      input.focus();
    });

    // Chiudi chat
    closeBtn.addEventListener("click", () => {
      chat.classList.remove("open");
      pallino.classList.remove("closed");
    });

    // Invia messaggio
    async function sendMessage() {
      const text = input.value.trim();
      if (!text) return;

      chatHistory.push({ role: "user", content: text });
      input.value = "";
      renderHistory();

      // Nascondi messaggio iniziale dopo primo messaggio utente
      hideInitialMessage();

      // Chiamata API (la tua logica esistente)
      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            history: chatHistory,
            context: window.poolyContext || null
          })
        });

        const data = await res.json();
        chatHistory.push({ role: "ai", content: data.reply });
        renderHistory();
        localStorage.setItem("poolyChatHistory", JSON.stringify(chatHistory));
      } catch (err) {
        console.error("Errore API:", err);
        chatHistory.push({ role: "ai", content: "Scusa, c'è stato un errore. Riprova?" });
        renderHistory();
      }
    }

    sendBtn.addEventListener("click", sendMessage);
    input.addEventListener("keypress", e => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    });

    // Focus input quando chat si apre
    chat.addEventListener("transitionend", () => {
      if (chat.classList.contains("open")) {
        input.focus();
        chatBody.scrollTop = chatBody.scrollHeight;
      }
    });

    // Inizializza
    renderHistory();
  })();
});