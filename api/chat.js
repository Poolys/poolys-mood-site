
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
// ===== CARICAMENTO CATALOGO MODELLI =====
const modelliPath = path.join(process.cwd(), "data", "modelli.json");

let catalogoModelli = {};
try {
  catalogoModelli = JSON.parse(fs.readFileSync(modelliPath, "utf8"));
} catch (err) {
  console.error("Errore nel caricamento modelli.json:", err);
  catalogoModelli = {};
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
Sei PoolyAI, guida silenziosa del catalogo Pooly’s Mood.
Parli come in una galleria: poche parole, scelte bene.

Regole fondamentali:
${JSON.stringify(fixedMemory, null, 2)}

Linee guida:
- Rispondi solo in italiano
- Usa frasi brevi e naturali
- Evoca prima, spiega dopo
- Non vendere, accompagna
- Consiglia solo se richiesto (un solo consiglio)
- Usa esclusivamente dati da data/modelli.json
- Le immagini sono in assets/img/catalogo/
- Se non c’è un’informazione, dillo con semplicità
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