import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});


export async function askAI(payload) {
  const messages = Array.isArray(payload)
    ? payload
    : [{ role: "system", content: String(payload) }];

  const completion = await openai.chat.completions.create({
    model: "gpt-4.0-mini",
    messages,
    temperature: 0.7
  });
  return completion.choices[0].message.content.trim();
}