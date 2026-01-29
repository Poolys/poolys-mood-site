// Pooly-AI/public/chat.js
// Versione con Shadow DOM isolato – pallino nel light DOM

(function () {
  const host = document.getElementById("pooly-ai-host");
  if (!host) {
    console.warn("Host #pooly-ai-host non trovato");
    return;
  }

  const shadow = host.attachShadow({ mode: "open" });

  // ── Struttura + stili isolati ────────────────────────────────────────
  shadow.innerHTML = `
    <style>
      :host {
        all: initial;
        position: fixed;
        inset: auto 20px 20px auto;
        width: 360px;
        max-height: 70vh;
        z-index: 10000;
        pointer-events: none;
        font-family: system-ui, sans-serif;
      }

      .chat-container {
        width: 100%;
        height: 100%;
        background: #fdf5e6;
        border-radius: 16px;
        box-shadow: 0 10px 38px rgba(0,0,0,0.25);
        display: flex;
        flex-direction: column;
        overflow: hidden;
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.35s ease, transform 0.35s ease;
        pointer-events: auto;
      }

      .chat-container.open {
        opacity: 1;
        transform: translateY(0);
      }

      header {
        padding: 12px;
        background: linear-gradient(90deg, #138808, #d30000);
        color: white;
        text-align: center;
        font-weight: bold;
        font-size: 15px;
      }

      .body {
        flex: 1;
        overflow-y: auto;
        padding: 14px;
        display: flex;
        flex-direction: column;
        gap: 10px;
      }

      .body p {
        padding: 10px 14px;
        border-radius: 18px;
        max-width: 82%;
        line-height: 1.45;
        font-size: 14.5px;
      }

      .user {
        align-self: flex-end;
        background: #350606;
        color: #fdf5e6;
      }

      .ai {
        align-self: flex-start;
        background: #3d091b;
        color: #fdf5e6;
      }

      .input-area {
        display: flex;
        gap: 8px;
        padding: 12px;
        border-top: 1px solid #d0b8a0;
        background: #fdf5e6;
      }

      input {
        flex: 1;
        padding: 12px 16px;
        border-radius: 24px;
        border: 1px solid #ccc;
        font-size: 15px;
      }

      button {
        padding: 0 20px;
        border-radius: 24px;
        border: none;
        background: #555;
        color: white;
        font-weight: 600;
        cursor: pointer;
      }

      /* Mobile full-screen */
      @media (max-width: 767px) {
        :host {
          inset: 0;
          width: 100%;
          height: 100%;
          max-height: none;
        }
        .chat-container {
          border-radius: 0;
          height: 100%;
        }
        .body p {
          font-size: 16px;
          max-width: 88%;
        }
      }
    </style>

    <div class="chat-container" id="chat">
      <header>PoolyAI</header>
      <div class="body" id="body"></div>
      <div class="input-area">
        <input id="msg" placeholder="Scrivi qui…" autocomplete="off">
        <button id="sendBtn">Invia</button>
      </div>
    </div>
  `;

  // ── Riferimenti ───────────────────────────────────────────────────────
  const chatEl = shadow.getElementById("chat");
  const bodyEl = shadow.getElementById("body");
  const inputEl = shadow.getElementById("msg");
  const sendBtn = shadow.getElementById("sendBtn");

  const pallino = document.getElementById("poolyPallino");
  if (!pallino) {
    console.warn("Pallino #poolyPallino non trovato nel light DOM");
    return;
  }

  // ── Stato ─────────────────────────────────────────────────────────────
  let history = JSON.parse(localStorage.getItem("poolyChatHistory")) || [];

  // ── Render messaggi ───────────────────────────────────────────────────
  function render() {
    bodyEl.innerHTML = "";
    history.forEach(msg => {
      const p = document.createElement("p");
      p.className = msg.role === "user" ? "user" : "ai";
      p.textContent = msg.content;
      bodyEl.appendChild(p);
    });
    bodyEl.scrollTop = bodyEl.scrollHeight;
  }

  // ── Apertura / chiusura ───────────────────────────────────────────────
  function toggleChat() {
    const isOpening = !chatEl.classList.contains("open");

    if (isOpening) {
      render();
      if (history.length === 0) {
        const welcome = "Ciao! Sono PoolyAI, come posso aiutarti oggi?";
        history.push({ role: "ai", content: welcome });
        render();
      }
      inputEl.focus();
    }

    chatEl.classList.toggle("open");
  }

  pallino.addEventListener("click", e => {
    e.stopPropagation();
    toggleChat();
  });

  // Chiudi cliccando fuori
  document.addEventListener("click", e => {
    if (!chatEl.classList.contains("open")) return;
    if (!host.contains(e.target) && !pallino.contains(e.target)) {
      chatEl.classList.remove("open");
    }
  });

  // ── Invio messaggio ───────────────────────────────────────────────────
  sendBtn.addEventListener("click", sendMessage);
  inputEl.addEventListener("keydown", e => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  async function sendMessage() {
    const text = inputEl.value.trim();
    if (!text) return;

    history.push({ role: "user", content: text });
    render();
    inputEl.value = "";

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ history })
      });

      if (!res.ok) throw new Error("API error");

      const data = await res.json();
      history.push({ role: "ai", content: data.reply || "..." });
      render();
      localStorage.setItem("poolyChatHistory", JSON.stringify(history));
    } catch (err) {
      console.error(err);
      const errMsg = document.createElement("p");
      errMsg.className = "ai";
      errMsg.textContent = "Ops... qualcosa non ha funzionato. Riprova?";
      bodyEl.appendChild(errMsg);
      bodyEl.scrollTop = bodyEl.scrollHeight;
    }
  }

  // ── Salvataggio su chiusura pagina (beacon) ───────────────────────────
  window.addEventListener("beforeunload", () => {
    if (history.length > 0) {
      navigator.sendBeacon("/api/saveAndClear", JSON.stringify({ history }));
      localStorage.removeItem("poolyChatHistory");
    }
  });
})();