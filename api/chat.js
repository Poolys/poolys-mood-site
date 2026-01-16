import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function askAI(prompt) {
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo", // o gpt-3.5-turbo se vuoi più potenza
    messages: [{ role: "system", content: prompt }],
    temperature: 0.7
  });
  return completion.choices[0].message.content.trim();
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fixedMemoryPath = path.join(__dirname, "..", "Pooly-AI", "ai", "fixedMemory.json");

let fixedMemory = {};
try {
  fixedMemory = JSON.parse(fs.readFileSync(fixedMemoryPath, "utf8"));
} catch (err) {
  fixedMemory = { regole: "Assicura risposte professionali e rispetta le politiche Pooly's Mood" };
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