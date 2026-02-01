window.addEventListener("DOMContentLoaded", () => {
  (function () {

    /* ===============================
       1. ROOT
    =============================== */
    let root = document.getElementById("pooly-ai-root");
    if (!root) {
      root = document.createElement("div");
      root.id = "pooly-ai-root";
      document.body.appendChild(root);
    }

    const shadow = root.shadowRoot || root.attachShadow({ mode: "open" });

    /* ===============================
       2. CSS — TUTTO ESPLICITO
    =============================== */
    const style = document.createElement("style");
    style.textContent = `
      * { box-sizing: border-box; font-family: system-ui, -apple-system, sans-serif; }

      #poolyPallino {
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: #9c0404;
        color: #000;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 13px;
        font-weight: bold;
        cursor: pointer;
        z-index: 10000;
        transition: .3s;
      }

      #poolyPallino.closed {
        opacity: 0;
        pointer-events: none;
        transform: scale(.8);
      }

      #poolyChat {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        height: 280px;
        background: #fdf5e6;
        display: flex;
        flex-direction: column;
        transform: translateY(100%);
        opacity: 0;
        pointer-events: none;
        transition: .3s ease;
        z-index: 9999;
      }

      #poolyChat.open {
        transform: translateY(0);
        opacity: 1;
        pointer-events: auto;
      }

      #chatHeader {
        background: linear-gradient(90deg,#138808,#fff,#d30000);
        padding: 4px;
        text-align: center;
        line-height: 1.2;
        font-size: 11px;
        font-weight: 600;
        color: #000;
      }

      #chatBody {
        flex: 1;
        padding: 10px;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .userMessage {
        align-self: flex-end;
        background: #ddd;
        padding: 8px 12px;
        border-radius: 16px;
        font-size: 14px;
        color: #000;
      }

      .aiMessage {
        align-self: flex-start;
        background: #fff;
        padding: 8px 12px;
        border-radius: 16px;
        font-size: 14px;
        color: #000;
      }

      #chatInputWrapper {
        display: flex;
        gap: 8px;
        padding: 8px;
        border-top: 1px solid #ccc;
      }

      #msg {
        flex: 1;
        padding: 10px;
        border-radius: 20px;
        border: 1px solid #aaa;
        font-size: 16px;
      }

      #sendBtn {
        padding: 0 18px;
        border-radius: 20px;
        border: none;
        background: #333;
        color: #fff;
        cursor: pointer;
      }

      @media (max-width: 767px) {
        #poolyChat { height: calc(100vh - 80px); }
        .userMessage, .aiMessage { font-size: 16px; }
      }
    `;
    shadow.appendChild(style);

    /* ===============================
       3. HTML
    =============================== */
    const html = document.createElement("div");
    html.innerHTML = `
      <div id="poolyPallino">PoolyAI</div>
      <div id="poolyChat">
        <div id="chatHeader">PoolyAI</div>
        <div id="chatBody"></div>
        <div id="chatInputWrapper">
          <input id="msg" placeholder="Scrivi qui…" />
          <button id="sendBtn">Invia</button>
        </div>
      </div>
    `;
    shadow.appendChild(html);

    /* ===============================
       4. STATE
    =============================== */
    const pallino = shadow.getElementById("poolyPallino");
    const chat = shadow.getElementById("poolyChat");
    const chatBody = shadow.getElementById("chatBody");
    const input = shadow.getElementById("msg");
    const sendBtn = shadow.getElementById("sendBtn");

    let chatHistory = [];

    /* ===============================
       5. LANDING → NASCOSTA CHAT
    =============================== */
    const isLanding = document.getElementById("hero");

// LANDING → nascondi finché non entri
if (isLanding) {
  root.style.display = "none";

  window.addEventListener("enterMoodDone", () => {
    setTimeout(() => {
      root.style.display = "block";
    }, 500);
  });
}

// CATALOGO (o altre pagine) → visibile subito
else {
  root.style.display = "block";
}

    /* ===============================
       6. OPEN / CLOSE
    =============================== */
    pallino.addEventListener("click", e => {
      e.stopPropagation();
      pallino.classList.add("closed");
      chat.classList.add("open");

      if (!chatHistory.length) {
        chatHistory.push({ role: "ai", content: "Benvenuto! Come posso aiutarti?" });
        render();
      }
    });

    window.addEventListener("click", e => {
      const path = e.composedPath();
      if (chat.classList.contains("open") && !path.includes(chat)) {
        chat.classList.remove("open");
        pallino.classList.remove("closed");
      }
    });

    /* ===============================
       7. CHAT
    =============================== */
    sendBtn.addEventListener("click", send);
    input.addEventListener("keydown", e => e.key === "Enter" && send());

    function render() {
      chatBody.innerHTML = "";
      chatHistory.forEach(m => {
        const p = document.createElement("div");
        p.className = m.role === "user" ? "userMessage" : "aiMessage";
        p.textContent = m.content;
        chatBody.appendChild(p);
      });
      chatBody.scrollTop = chatBody.scrollHeight;
    }

    async function send() {
      const text = input.value.trim();
      if (!text) return;

      chatHistory.push({ role: "user", content: text });
      input.value = "";
      render();

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ history: chatHistory, context: window.poolyContext || null })
      });

      const data = await res.json();
      chatHistory.push({ role: "ai", content: data.reply });
      render();
    }

  })();
});