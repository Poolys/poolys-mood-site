function getXAIKey() {
  return process.env.XAI_API_KEY;
}

function extractResponseText(responseBody) {
  if (!responseBody) return "";
  if (typeof responseBody === "string") return responseBody;

  const output = responseBody.output;
  if (Array.isArray(output) && output.length > 0) {
    const first = output[0];
    const content = first.content;
    if (Array.isArray(content)) {
      return content
        .map(item => {
          if (typeof item === "string") return item;
          return item?.text || "";
        })
        .filter(Boolean)
        .join(" ")
        .trim();
    }
  }

  return "";
}

export async function askAI(prompt) {
  const apiKey = getXAIKey();
  if (!apiKey) {
    throw new Error("XAI_API_KEY is required");
  }

  const response = await fetch("https://api.x.ai/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: "grok_3_mini",
      input: `System: ${prompt}`,
      temperature: 0.7
    })
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`x.ai API error ${response.status}: ${text}`);
  }

  const data = await response.json();
  const text = extractResponseText(data);
  if (!text) {
    throw new Error(`x.ai response body missing text: ${JSON.stringify(data)}`);
  }
  return text;
}