const host = document.getElementById("pooly-ai-container");
const shadow = host.attachShadow({ mode: "open" });

shadow.innerHTML = `
  <style>
    :host {
      position: fixed;
      inset: auto 20px 20px auto;
      width: 460px;
      height: 720px;
      z-index: 9999;
      pointer-events: none;
    }

    :host(.open) {
      pointer-events: auto;
    }

    #pallino {
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: #9c0404d2;
      color: #1b0202;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 13px;
      font-weight: bold;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    }

    #chat {
      position: fixed;
      inset: auto 0 0 0;
      height: 280px;
      background: rgba(253,245,230,0.95);
      display: flex;
      flex-direction: column;
      transform: translateY(100%);
      transition: transform .3s ease;
    }

    #chat.open {
      transform: translateY(0);
    }

    #header {
      background: linear-gradient(90deg,#138808,#fff,#d30000);
      font-size: 12px;
      text-align: center;
    }

    #body {
      flex: 1;
      overflow-y: auto;
      padding: 12px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    #body p {
      padding: 10px 14px;
      border-radius: 18px;
      max-width: 90%;
      line-height: 1.4;
    }

    .user { align-self: flex-end; background:#350606; color:#fdf5e6 }
    .ai { align-self: flex-start; background:#3d091b; color:#fdf5e6 }

    #input {
      display: flex;
      gap: 10px;
      padding: 10px;
      border-top: 1px solid #ddd;
    }

    input {
      flex:1;
      padding:14px;
      border-radius:25px;
    }

    button {
      padding:0 20px;
      border-radius:25px;
      background:#555;
      color:#fff;
      border:none;
    }

    @media (max-width:767px) {
      :host {
        inset: 0;
        width: 100vw;
        height: 100vh;
      }
      #chat { height:100vh }
      #body p { font-size:18px }
      #pallino { display:none }
    }
  </style>

  <div id="pallino">PoolyAI</div>

  <div id="chat">
    <div id="header">PoolyAI</div>
    <div id="body"></div>
    <div id="input">
      <input id="msg" placeholder="Scrivi qui…">
      <button id="send">Invia</button>
    </div>
  </div>
`;

const pallino = shadow.getElementById("pallino");
const chat = shadow.getElementById("chat");
const body = shadow.getElementById("body");
const input = shadow.getElementById("msg");
const send = shadow.getElementById("send");

let history = JSON.parse(localStorage.getItem("poolyChatHistory")) || [];

function render() {
  body.innerHTML = "";
  history.forEach(m => {
    const p = document.createElement("p");
    p.className = m.role === "user" ? "user" : "ai";
    p.textContent = m.content;
    body.appendChild(p);
  });
  body.scrollTop = body.scrollHeight;
}

pallino.onclick = () => {
  host.classList.add("open");
  chat.classList.add("open");
  render();
};

send.onclick = async () => {
  if (!input.value.trim()) return;
  history.push({ role:"user", content:input.value });
  render();
  input.value = "";

  const res = await fetch("/api/chat", {
    method:"POST",
    headers:{ "Content-Type":"application/json" },
    body: JSON.stringify({ history })
  });

  const data = await res.json();
  history.push({ role:"ai", content:data.reply });
  render();
  localStorage.setItem("poolyChatHistory", JSON.stringify(history));
};