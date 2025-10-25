// app/api/ask/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { question, player, history } = await req.json();

  if (!question || !player) {
    return NextResponse.json({ error: "Missing question or player" }, { status: 400 });
  }

  // stricter instruction set
  const system = `
You answer questions about one NBA player only using this JSON:

${JSON.stringify(player)}

Rules:
- Never reveal or mention the player's name.
- If asked directly about the name, reply "No comment."
- Use short factual replies (Yes/No or a brief phrase like "206 cm tall").
- Never restate units unless the question is about height.
- Never add stats not in the JSON.
- If the answer is not clearly in the JSON, reply exactly: I don't know.
`;

  // build message context: last 4 turns for pronoun disambiguation
  const context = Array.isArray(history)
    ? history.slice(-4).map((m: any) => ({ role: m.role, content: m.text }))
    : [];

  const body = {
    model: "llama3.1:8b",
    stream: false,
    messages: [
      { role: "system", content: system },
      ...context,
      { role: "user", content: question },
    ],
    options: { temperature: 0.1 },
  };

  try {
    const r = await fetch("http://127.0.0.1:11434/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await r.json();
    const answer = data?.message?.content?.trim() || "I don't know.";
    return NextResponse.json({ answer });
  } catch (err) {
    console.error("Local model error:", err);
    return NextResponse.json({ error: "Local model error" }, { status: 500 });
  }
}
