import { getSession } from "./_lib/auth.js";

// Every place in the frontend that used to call api.anthropic.com directly
// from the browser (LessonEngine's graded-write, the flash-forward scene)
// should call this instead. The key never reaches the client.
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const session = getSession(req);
  if (!session) {
    res.status(401).json({ error: "Not signed in" });
    return;
  }

  const { prompt, maxTokens } = req.body || {};
  if (!prompt) {
    res.status(400).json({ error: "prompt is required" });
    return;
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: "Server is not configured with an Anthropic API key" });
    return;
  }

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: maxTokens || 1000,
        messages: [{ role: "user", content: prompt }],
      }),
    });
    const data = await response.json();
    const text = (data.content || []).filter((b) => b.type === "text").map((b) => b.text).join("\n");
    res.status(200).json({ text });
  } catch (err) {
    res.status(502).json({ error: "Coach is temporarily unavailable" });
  }
}
