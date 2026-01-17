
import fs from "fs";
import path from "path";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

/**
 * askAI ora riceve un ARRAY di messaggi,
 * non una stringa
 */
export async function askAI(messages) {
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages,
    temperature: 0.7
  });

  return completion.choices[0].message.content.trim();
}

// ===== CARICAMENTO MEMORIA FISSA =====
const fixedMemoryPath = path.join(process.cwd(), "ai", "fixedMemory.json");

let fixedMemory = {};
try {
  fixedMemory = JSON.parse(fs.readFileSync(fixedMemoryPath, "utf8"));
} catch (err) {
  console.error("Errore nel caricamento di fixedMemory.json:", err);
  fixedMemory = {
    regole:
      "Assistente Pooly’s Mood. Tono calmo, evocativo, professionale. Nessuna consulenza esterna."
  };
}

// ===== HANDLER VERCEL =====
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { history, context } = req.body;


    if (!history || !Array.isArray(history) || history.length === 0) {
      return res.status(400).json({ reply: "Conversazione vuota." });
    }

    const lastMessage = history[history.length - 1].content;
    let modelContext = "";

if (context?.page === "catalogo" && context?.model) {
  modelContext = `
L’utente sta osservando il modello:
"${context.model}"

Rispondi come una guida museale.
Descrivi solo questo modello.
Collega forma, uso e atmosfera.
`;
}

    // ===== SYSTEM PROMPT (IDENTITÀ + REGOLE) =====
    const systemPrompt = `
Sei PoolyAI, guida della galeria del catalogo Pooly's Mood ,non inveti ,consigli solo se richiesto e pargli solo del catalogo nella cartella data /modelli.json.

Regole ASSOLUTE:
${JSON.stringify(fixedMemory, null, 2)}

${modelContext}

Linee guida:
- Rispondi SOLO in italiano
- Tono calmo, professionale, museale
- Chiedi una volta solo informazioni del cliente (es. misure disponibili, locazione, possibilmente nome e tipo di activita. Non insistere. )
- Prima evocazione, poi informazione
- Non fare preventivi
- se cliente chiede foto  dai adressa delle assets/img/catalogo/nomefile.jpg
- Se cliente chiede un consiglio, rispondi con un solo consiglio basato sui modelli presenti nel catalogo
- Non inventare informazioni
- fornisci solo informazioni presenti nel data/modelli.json e foto da  asests/img/catalogo.utti modelli, misure, detagli sono presenti in data/modelli.json e foto in assets/img/catalogo.
`.trim();

    // ===== COSTRUZIONE MESSAGGI CORRETTA =====
    const messages = [
      { role: "system", content: systemPrompt },

      // memoria conversazionale (senza l’ultimo messaggio)
      ...history.slice(0, -1).map(m => ({
        role: m.role === "ai" ? "assistant" : "user",
        content: m.content
      })),

      // ultima domanda utente
      { role: "user", content: lastMessage }
    ];

    const reply = await askAI(messages);
    res.status(200).json({ reply });

  } catch (error) {
    console.error("Errore Pooly-AI/api/chat:", error);
    res.status(500).json({
      reply: "Errore temporaneo. Riprova con calma."
    });
  }
}