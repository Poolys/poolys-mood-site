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