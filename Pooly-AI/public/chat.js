window.addEventListener("DOMContentLoaded", () => {
// POOLY AI — SHADOW CHAT
// ===============================

(function () {
  // 1️⃣ ROOT NEL DOM NORMALE
  let root = document.getElementById("pooly-ai-root");
  if (!root) {
    root = document.createElement("div");
    root.id = "pooly-ai-root";
    document.body.appendChild(root);
  }
  const host = document.getElementById("pooly-ai-root");
  if (!host) {
    console.warn("PoolyAI: #pooly-ai-root non trovato");
    return;
  }

  // 2️⃣ SHADOW ROOT
  const shadow = host.attachShadow({ mode: "open" });

  // ===============================
  // 3️⃣ CSS (ex style.css AI)
  // ===============================
  const POOLY_CSS = `
    /* PoolyAI Chat Style */
  `;
  const style = document.createElement("style");
  style.textContent = `
    * { box-sizing: border-box; }

    #poolyPallino {
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: #9c0404d2;
      color: #1a1816;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 13px;
      font-weight: bold;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      transition: all 0.4s ease;
      z-index: 9999;
    }

    #poolyPallino.closed {
      opacity: 0;
      transform: scale(0.8);
      pointer-events: none;
    }

    #poolyChat {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background: #e2b35ac4;
      display: flex;
      flex-direction: column;
      opacity: 0;
      transform: translateY(100%);
      pointer-events: none;
      transition: 0.3s ease;
      box-shadow: 0 -4px 20px rgba(0,0,0,0.2);
    }

    #poolyChat.open {
      opacity: 1;
      transform: translateY(0);
      pointer-events: all;
    }

    #chatHeader {
      background: linear-gradient(90deg, #138808, #fff, #d30000);
      padding: 3px;
      text-align: center;
      font-size: 12px;
      color: #1a1816;
      font-weight: bold;
    }

    #chatBody {
      flex: 1;
      padding: 12px;
      overflow-y: hidden;
      background: rgba(253,245,230,.95);
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    #chatBody p {
      padding: 10px 14px;
      border-radius: 18px;
      max-width: 85%;
      font-size: 14px;
      color: #000000;
    }

    .userMessage { align-self: flex-end; background: #e0e0e0; }
    .aiMessage { align-self: flex-start; background: #fdf5e6; }

    #chatInputWrapper {
      display: flex;
      gap: 10px;
      padding: 10px;
      background: #f9f9f9;
    }

    #msg {
      flex: 1;
      padding: 12px;
      border-radius: 25px;
      border: 1px solid #ccc;
    }

    #sendBtn {
      padding: 0 20px;
      border-radius: 25px;
      background: #555;
      color: #fff;
      border: none;
      cursor: pointer;
    }
    @media (max-width: 767px) {
      #chatBody p { font-size: 14px; color: #000000; line-height: 1.4; }
    }
  `;
  shadow.appendChild(style);

  // ===============================
  // 4️⃣ HTML (ex index.html AI)
  // ===============================
  const wrapper = document.createElement("div");
  wrapper.innerHTML = `
  <style>${POOLY_CSS}</style>

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

  // ===============================
  // 5️⃣ JS LOGIC (ex chat.js)
  // ===============================
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

  pallino.addEventListener("click", () => {
    pallino.classList.add("closed");
    chat.classList.add("open");
    renderHistory();
    if (!chatHistory.length) {
      chatHistory.push({ role: "ai", content: "Benvenuto! Come posso aiutarti?" });
      renderHistory();

  if (!chat.contains(e.target) && !pallino.contains(e.target)) {
    chat.classList.remove("open");
    pallino.classList.remove("closed");
  };
    }
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
      body: JSON.stringify({ history: chatHistory, context: window.poolyContext || null })
    });

    const data = await res.json();
    chatHistory.push({ role: "ai", content: data.reply });
    renderHistory();
    localStorage.setItem("poolyChatHistory", JSON.stringify(chatHistory));
  }
})();
})
