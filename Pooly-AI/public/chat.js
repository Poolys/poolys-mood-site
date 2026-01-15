const pallino = document.getElementById("poolyPallino");
const chat = document.getElementById("poolyChat");
const chatBody = document.getElementById("chatBody");
const input = document.getElementById("msg");
const sendBtn = document.getElementById("sendBtn");

let chatHistory = JSON.parse(localStorage.getItem('poolyChatHistory')) || [];

function renderHistory() {
  chatBody.innerHTML = '';
  chatHistory.forEach(msg => {
    const p = document.createElement('p');
    p.className = msg.role === 'user' ? 'userMessage' : 'aiMessage';
    p.innerHTML = `<strong>${msg.role === 'user' ? 'Tu' : 'PoolyAI'}:</strong> ${msg.content}`;
    chatBody.appendChild(p);
  });
  chatBody.scrollTop = chatBody.scrollHeight;
}

// Apri chat
pallino.addEventListener("click", (e) => {
  e.stopPropagation();
  pallino.classList.add("closed");
  
  setTimeout(() => {
    chat.classList.add("open");
    renderHistory();

    // Mostra messaggio di benvenuto SOLO alla prima apertura
    if (chatHistory.length === 0) {
      const p = document.createElement('p');
      p.className = 'aiMessage';
      p.innerHTML = "Benvenuto! Sono PoolyAI, il assistente per consigli e dettagli sui nostri espositori. Come posso aiutarti? ";
      chatBody.appendChild(p);
      chatBody.scrollTop = chatBody.scrollHeight;
    }
  }, 400);
});

// Chiudi con click fuori (su tutti i dispositivi)
document.addEventListener("click", (e) => {
  if (!chat.classList.contains("open")) return;
  if (!chat.contains(e.target) && !pallino.contains(e.target)) {
    chat.classList.remove("open");
    pallino.classList.remove("closed");
  }
});

// Invio messaggio
sendBtn.addEventListener("click", sendMessage);

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    sendMessage();
  }
});

async function sendMessage() {
  const message = input.value.trim();
  if (!message) return;

  chatHistory.push({ role: 'user', content: message });
  renderHistory();
  input.value = '';

  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ history: chatHistory })
  });

  const data = await res.json();
  chatHistory.push({ role: 'ai', content: data.reply });
  renderHistory();

  localStorage.setItem('poolyChatHistory', JSON.stringify(chatHistory));
}

// Salva e pulisci alla chiusura pagina
window.addEventListener('beforeunload', () => {
  if (chatHistory.length > 0) {
    navigator.sendBeacon('/api/saveAndClear', JSON.stringify({ history: chatHistory }));
    localStorage.removeItem('poolyChatHistory');
  }
});