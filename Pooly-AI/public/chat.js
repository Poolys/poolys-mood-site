// ===============================
// POOLY AI — SHADOW CHAT (FINAL)
// ===============================
window.addEventListener("DOMContentLoaded", () => {
  (function () {

    /* ===============================
       1️⃣ ROOT NEL DOM NORMALE
    =============================== */
    let root = document.getElementById("pooly-ai-root");
    if (!root) {
      root = document.createElement("div");
      root.id = "pooly-ai-root";
      document.body.appendChild(root);
    }

    /* ===============================
       2️⃣ SHADOW ROOT
    =============================== */
    const shadow = root.attachShadow({ mode: "open" });

    /* ===============================
       3️⃣ CSS — COMPLETAMENTE ISOLATO
    =============================== */
    const style = document.createElement("style");
    style.textContent = `
      * { box-sizing: border-box; font-family: system-ui, -apple-system, sans-serif; }

      /* === PALLINO === */
      #poolyPallino {
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: #9c0404d2;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 13px;
        font-weight: 600;
        cursor: pointer;
        box-shadow: 0 6px 16px rgba(0,0,0,.35);
        transition: all .35s ease;
        z-index: 9999;
      }
      #poolyPallino.closed {
        opacity: 0;
        transform: scale(.8);
        pointer-events: none;
      }

      /* === CHAT === */
      #poolyChat {
        position: fixed;
        left: 10px;
        right: 10px;
        bottom: 10px;
        max-height: 85vh;
        background: #fdf5e6;
        border-radius: 16px;
        display: flex;
        flex-direction: column;
        opacity: 0;
        transform: translateY(100%);
        pointer-events: none;
        transition: all .35s ease;
        box-shadow: 0 -8px 24px rgba(0,0,0,.25);
        z-index: 9998;
      }
      #poolyChat.open {
        opacity: 1;
        transform: translateY(0);
        pointer-events: all;
      }

      /* === HEADER === */
      #chatHeader {
        padding: 6px 10px;
        font-size: 12px;
        font-weight: 600;
        text-align: center;
        background: linear-gradient(90deg, #138808, #fff, #d30000);
        color: #111;
        border-radius: 16px 16px 0 0;
      }

      /* === BODY === */
      #chatBody {
        flex: 1;
        padding: 12px;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      #chatBody p {
        max-width: 85%;
        padding: 10px 14px;
        border-radius: 18px;
        font-size: 14px;
        line-height: 1.4;
        color: #000;
      }
      .userMessage { align-self: flex-end; background: #e0e0e0; }
      .aiMessage { align-self: flex-start; background: #fff; }

      /* === INPUT === */
      #chatInputWrapper {
        display: flex;
        gap: 8px;
        padding: 10px;
        background: #fafafa;
        border-radius: 0 0 16px 16px;
      }
      #msg {
        flex: 1;
        padding: 12px 14px;
        border-radius: 22px;
        border: 1px solid #ccc;
        font-size: 16px; /* BLOCCA ZOOM MOBILE */
        outline: none;
      }
      #sendBtn {
        padding: 0 18px;
        border-radius: 22px;
        border: none;
        background: #555;
        color: #fff;
        font-weight: 600;
        cursor: pointer;
      }

      /* ===============================
         📱 MOBILE — MODALITÀ SCRITTURA
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
          background: #fafafa;
        }
      }
    `;
    shadow.appendChild(style);

    /* ===============================
       4️⃣ HTML
    =============================== */
    const wrapper = document.createElement("div");
    wrapper.innerHTML = `
      <div id="poolyPallino">PoolyAI</div>
      <div id="poolyChat">
        <div id="chatHeader">PoolyAI</div>
        <div id="chatBody"></div>
        <div id="chatInputWrapper">
          <input id="msg" placeholder="Scrivi qui..." />
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
       6️⃣ JS LOGIC
    =============================== */
    const pallino = shadow.getElementById("poolyPallino");
    const chat = shadow.getElementById("poolyChat");
    const chatBody = shadow.getElementById("chatBody");
    const input = shadow.getElementById("msg");
    const sendBtn = shadow.getElementById("sendBtn");

    let chatHistory = JSON.parse(localStorage.getItem("poolyChatHistory")) || [];

    function renderHistory() {
      chatBody.innerHTML = "";
      chatHistory.forEach(m => {
        const p = document.createElement("p");
        p.className = m.role === "user" ? "userMessage" : "aiMessage";
        p.textContent = m.content;
        chatBody.appendChild(p);
      });
      chatBody.scrollTop = chatBody.scrollHeight;
    }

    /* === OPEN CHAT === */
    pallino.addEventListener("click", e => {
      e.stopPropagation();
      pallino.classList.add("closed");
      chat.classList.add("open");

      if (!chatHistory.length) {
        chatHistory.push({ role: "ai", content: "Ciao! Come posso aiutarti?" });
      }
      renderHistory();
    });

    /* === CLOSE ON OUTSIDE CLICK (SHADOW SAFE) === */
    document.addEventListener("click", e => {
      if (chat.classList.contains("open") && !root.contains(e.target)) {
        chat.classList.remove("open");
        pallino.classList.remove("closed");
        chat.classList.remove("writing");
      }
    });

    /* === WRITING MODE MOBILE === */
    input.addEventListener("focus", () => chat.classList.add("writing"));
    input.addEventListener("blur", () => chat.classList.remove("writing"));

    input.style.fontSize = "16px";
    input.setAttribute("inputmode", "text");
    input.addEventListener("focus", () => {
  chat.classList.add("writing");
  setTimeout(() => {
    input.scrollIntoView({ block: "center" });
  }, 300);
});

    sendBtn.addEventListener("click", sendMessage);
    input.addEventListener("keydown", e => e.key === "Enter" && sendMessage());

    async function sendMessage() {
      const text = input.value.trim();
      if (!text) return;

      chatHistory.push({ role: "user", content: text });
      input.value = "";
      renderHistory();

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
    }

  })();
});
