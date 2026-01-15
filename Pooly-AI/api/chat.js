import { askAI } from "../Pooly-AI/ai/openaiClient.js";
import fs from "fs";
import path from "path";

const fixedMemoryPath = path.join(process.cwd(), "Pooly-AI", "ai", "fixedMemory.json");

let fixedMemory = {};
try {
  fixedMemory = JSON.parse(fs.readFileSync(fixedMemoryPath, "utf8"));
} catch (err) {
  fixedMemory = { errore: "Errore caricamento memoria base." };
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  
  try {
    const { history } = req.body;
    if (!history || !Array.isArray(history) || history.length === 0) {
      return res.status(400).json({ reply: "Conversazione vuota." });
    }

    const lastMessage = history[history.length - 1].content;

    const systemPrompt = `
Sei PoolyAI, assistente ufficiale Pooly’s Mood.
Regole ASSOLUTE:
${JSON.stringify(fixedMemory)}

Contesto conversazione:
${JSON.stringify(history.slice(0, -1))}

Domanda utente:
"${lastMessage}"

Rispondi SOLO in italiano.
Sii chiaro, educato, professionale.
Non fare preventivi.
Non inventare informazioni.
    `.trim();
    
    const reply = await askAI(systemPrompt);
    res.status(200).json({ reply });

  } catch (error) {
    console.error("Errore Pooly-AI/api/chat:", error);
    res.status(500).json({ reply: "Errore temporaneo, riprova più tardi." });
  }
}