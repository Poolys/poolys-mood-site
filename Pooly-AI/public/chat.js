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
  z-index: 1001;
  transition: all 0.4s ease;
}

#poolyPallino:hover {
  transform: scale(1.1);
}

#poolyPallino.closed {
  opacity: 0;
  transform: scale(0.8);
  pointer-events: none;
}

/* Chat – chiusa di default */
#poolyChat {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  background: #e2b35ac4;
  display: flex;
  flex-direction: column;
  z-index: 1000;
  opacity: 0;
  transform: translateY(100%);
  pointer-events: none;
  transition: opacity 0.3s ease, transform 0.3s ease;
  box-shadow: 0 -4px 20px rgba(0,0,0,0.2);
}

#poolyChat.open {
  opacity: 1;
  transform: translateY(0);
  pointer-events: all;
}

/* Header con bandiera – sempre basso e compatto */
#chatHeader {
  background: linear-gradient(90deg, #138808, #ffffff, #d30000);
  padding: 8px 12px;
  text-align: center;
  font-size: 12px;
  font-weight: 500;
  color: #222;
  flex-shrink: 0;
  min-height: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Corpo messaggi */
#chatBody {
  flex: 1;
  overflow-y: auto;
  padding: 12px;
  background: rgba(253,245,230,0.95);
  display: flex;
  flex-direction: column;
  gap: 10px;
}

#chatBody p {
  margin: 0;
  padding: 10px 14px;
  border-radius: 18px;
  max-width: 85%;
  line-height: 1.1;
  align-self: flex-start;
  background: #fdf5e6;
}

#chatBody p.userMessage {
  align-self: flex-end;
  background: #e0e0e0;
  border-bottom-right-radius: 4px;
}

#chatBody p.aiMessage {
  align-self: flex-start;
  background: #fdf5e6;
  border-bottom-left-radius: 4px;
}

/* Input */
#chatInputWrapper {
  display: flex;
  padding: 10px;
  gap: 10px;
  background: #f9f9f9;
  border-top: 1px solid #ddd;
  flex-shrink: 0;
}

#msg {
  flex: 1;
  padding: 14px 16px;
  border: 1px solid #ccc;
  border-radius: 25px;
  font-size: 16px;
  outline: none;
}

#sendBtn {
  padding: 0 24px;
  background: #555;
  color: #fdf5e6;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-size: 15px;
}

/* === SMARTPHONE (default mobile-first) === */
@media (max-width: 767px) {
  #poolyChat.open {
    height: calc(100vh - 80px);
    max-height: none;
    border-radius: 50px 50px 0 0;
  }

  #chatHeader {
    font-size: 10px;
    padding: 12px;
    color: #1a1816;
  }
}

/* === TABLET === */
@media (min-width: 768px) and (max-width: 1023px) {
  #poolyChat.open {
    width: 100%;
    max-width: none;
    height: 420px; /* circa 7-8 righe di messaggi + header + input */
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 0;
    transform: translateY(0);
  }

  #chatHeader {
    font-size: 10px;
  }
}
/* ===== INTRO POOLY DESKTOP ===== */
#poolyIntro {
  position: fixed;
  bottom: 95px;
  right: 20px;
  background: rgba(253,245,230,0.95);
  color: #1a1816;
  padding: 10px 14px;
  border-radius: 18px;
  font-size: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.4s ease;
  z-index: 1002;
  pointer-events: none;
}

#poolyIntro.show {
  opacity: 1;
  transform: translateY(0);
}

/* === DESKTOP === */
@media (min-width: 1024px) {
  #poolyChat.open {
    width: 100%;
    height: 280px; /* fisso: header + ~7 righe messaggi + input */
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 0;
    transform: translateY(0);
  }

  #chatHeader {
    font-size: 10px;
  }

  #chatBody p {
    font-size: 12px;
    color: #1a1816;
  }
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
  `;// --- controllo Landing ---
const hero = document.getElementById('hero');
if (hero && window.getComputedStyle(hero).display !== 'none') {
  // Landing visibile → nascondi chat
  root.style.display = 'none';
} else {
  // Landing nascosto → mostra chat
  root.style.display = 'block';
}

// Listener per enterMood() (quando Landing scompare)
window.addEventListener('enterMoodDone', () => {
  root.style.display = 'block',smoodly;
});
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

 // 1. Gestione dell'apertura (Click sul pallino)
pallino.addEventListener("click", (e) => {
    // BLOCCA la propagazione del click alla window
    e.stopPropagation(); 
    
    pallino.classList.add("closed");
    chat.classList.add("open");
    
    if (!chatHistory.length) {
        chatHistory.push({ role: "ai", content: "Benvenuto! Come posso aiutarti?" });
    }
    renderHistory();
});

// Questo ora funzionerà solo quando clicchi realmente fuori
window.addEventListener("click", (e) => {
    if (chat.classList.contains("open") && !chat.contains(e.target)) {
        chat.classList.remove("open");
        pallino.classList.remove("closed");
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
});