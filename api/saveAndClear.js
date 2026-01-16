import { sendEmail } from "../utils/sendEmail.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { history } = req.body;

  if (!history || !Array.isArray(history) || history.length === 0) {
    return res.status(200).end(); // Niente da fare
  }

  const text = history
    .map((m) => `${m.role === "user" ? "Utente" : "PoolyAI"}: ${m.content}`)
    .join("\n\n");

  try {
    await sendEmail({
      subject: "Nuova conversazione PoolyAI – " + new Date().toLocaleDateString("it-IT"),
      text: `Conversazione completata:\n\n${text}`,
    });
    console.log("Email conversazione inviata con successo");
  } catch (error) {
    console.error("Errore invio email:", error);
    // Non blocchiamo la risposta anche se l'email fallisce
  }

  res.status(200).end();
}
