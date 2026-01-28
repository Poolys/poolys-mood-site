import express from 'express';
import dotenv from 'dotenv';
import chatHandler from './api/chat.js';
import saveAndClearHandler from './api/saveAndClear.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 2025; // Puoi anche fissarlo a 2025

// Middleware
app.use(express.static('public')); // Serve i file statici (html, css, js)
app.use(express.json({ limit: '15mb' })); // Per gestire corpi JSON grandi (utile per sendBeacon)

// Rotte API
app.post('/api/chat', chatHandler);
app.post('/api/saveAndClear', saveAndClearHandler);

// Avvio server
app.listen(PORT, () => {
  console.log(`🚀 PoolyAI è attivo su http://localhost:${PORT}`);
  console.log(`Premi Ctrl+C per fermarlo`);
});
// Forza il reset dello stato ad ogni caricamento della pagina
window.onbeforeunload = function() {
    // Cancella i dati che i browser usano per "ricordare" la posizione
    localStorage.clear(); 
    sessionStorage.clear();
    
    // Cancella i cookie tecnici (se hanno nomi specifici, vanno indicati)
    document.cookie.split(";").forEach(function(c) { 
        document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); 
    });
};

// All'avvio della pagina, forza la visualizzazione della landing
document.addEventListener("DOMContentLoaded", function() {
    // Nascondi il Main
    document.getElementById('main-content').style.display = 'none';
    // Mostra la Landing
    document.getElementById('landing-section').style.display = 'block';
    
    // Se usi le "Ancore" (es. miosito.it/#main), questo resetta l'URL
    if (window.location.hash) {
        window.location.hash = '';
    }
});