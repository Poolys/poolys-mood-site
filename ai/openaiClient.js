import OpenAI from 'openai';

let openai;
function getOpenAI() {
  if (!openai) {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY missing');
    }
    openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });
  }
  return openai;
}

export async function askAI(payload) {
  const messages = Array.isArray(payload)
    ? payload
    : [{ role: "system", content: String(payload) }];

  const completion = await getOpenAI().chat.completions.create({
    model: "gpt-4o-mini",
    messages,
    temperature: 0.7
  });
  return completion.choices[0].message.content.trim();
}