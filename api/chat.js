import fs from "fs";
import path from "path";
import { askAI } from "../ai/openaiClient.js";

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
  catalogoModelli = {
    regole: "Non inventare modelli o informazioni che non esistono nella fixedMemory.json o data/modelli.json."
  };
}

function findCatalogModel(modelName) {
  if (!catalogoModelli || !Array.isArray(catalogoModelli.modelli)) return null;
  const normalized = modelName.trim().toLowerCase();
  return catalogoModelli.modelli.find(modello => {
    const nome = String(modello.nome || "").toLowerCase();
    return nome === normalized || nome.includes(normalized) || normalized.includes(nome);
  }) || null;
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

    const cleanedHistory = history
      .filter(msg =>
        msg &&
        (msg.role === "user" || msg.role === "ai") &&
        typeof msg.content === "string" &&
        msg.content.trim() !== ""
      )
      .map(msg => ({ role: msg.role, content: msg.content.trim() }));

    if (cleanedHistory.length === 0) {
      return res.status(400).json({ reply: "Conversazione vuota." });
    }

    const lastMessage = cleanedHistory[cleanedHistory.length - 1].content;
    const conversationHistory = cleanedHistory.slice(0, -1);
    let modelContext = "";

    if (context?.page === "catalogo" && context?.model) {
      const selectedModel = findCatalogModel(context.model);
      if (selectedModel) {
        const details = [
          selectedModel.tipo ? `Tipo: ${selectedModel.tipo}` : null,
          selectedModel.descrizione_breve ? `Descrizione: ${selectedModel.descrizione_breve}` : null,
          selectedModel.utilizzo_ideale ? `Uso ideale: ${selectedModel.utilizzo_ideale}` : null,
          Array.isArray(selectedModel.caratteristiche) ? `Caratteristiche: ${selectedModel.caratteristiche.join(', ')}` : null
        ].filter(Boolean).join("\n");

        modelContext = `
L’utente sta osservando il modello:
"${selectedModel.nome}"
${details}
Rispondi come una guida museale del catalogo.
Descrivi questo modello usando solo le informazioni presenti nel catalogo.
`;
      } else {
        modelContext = `
L’utente sta osservando il modello:
"${context.model}"
Rispondi come una guida museale del catalogo e concentra la risposta su questo modello.
`;
      }
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
      ...(modelContext ? [{ role: "system", content: modelContext }] : []),

      // memoria conversazionale (senza l’ultimo messaggio)
      ...conversationHistory.map(m => ({
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