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