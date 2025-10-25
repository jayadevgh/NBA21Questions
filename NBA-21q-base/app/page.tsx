"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Header from "@/components/Header";
import ChatBubble from "@/components/ChatBubble";
import Controls from "@/components/Controls";
import type { Message, Player } from "@/lib/types";
import { fallbackAnswer, randomHint } from "@/lib/fallback";

export default function Page() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "system", text: "Game started. Ask yes/no questions to guess the player!" },
  ]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [player, setPlayer] = useState<Player | null>(null);
  const [input, setInput] = useState("");
  const [count, setCount] = useState(0);
  const maxQ = 21;
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/players.json")
      .then((r) => r.json())
      .then((data: Player[]) => {
        setPlayers(data);
        const p = data[Math.floor(Math.random() * data.length)];
        setPlayer(p);
      });
  }, []);

  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const gameOver = count >= maxQ;
  const status = useMemo(() => `Question ${count}/${maxQ}`, [count]);

  async function sendQuestion() {
    const q = input.trim();

    if (q.toLowerCase().includes("give up") && player) {
      setMessages(m => [...m, { role: "system", text: `Game over — it was ${player.name}.` }]);
      return;
    }

    if (!q || !player || gameOver) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", text: q }]);

    setCount((c) => c + 1);

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: q, player, history: messages }),
      });

      let answer: string;
      if (res.ok) {
        const data = await res.json();
        answer = data.answer || "I don't know.";
      } else {
        answer = fallbackAnswer(q, player);
      }
      setMessages((m) => [...m, { role: "bot", text: answer }]);
    } catch {
      const ans = fallbackAnswer(q, player);
      setMessages((m) => [...m, { role: "bot", text: ans }]);
    }
  }

  function guess() {
    if (!player) return;
    const name = prompt("Who is your guess?");
    if (!name) return;
    const correct = name.trim().toLowerCase() === player.name.toLowerCase();
    setMessages((m) => [
      ...m,
      { role: "system", text: correct ? `🎉 Correct! It was ${player.name}.` : `❌ Nope. It was ${player.name}.` },
    ]);
  }

  function restart() {
    if (!players.length) return;
    const p = players[Math.floor(Math.random() * players.length)];
    setPlayer(p);
    setMessages([{ role: "system", text: "New game! Ask away." }]);
    setCount(0);
  }

const [usedHints, setUsedHints] = useState<string[]>([]);

function hint() {
  if (!player) return;
  const h = randomHint(player, usedHints);
  setUsedHints([...usedHints, h]);
  setMessages(m => [...m, { role: "system", text: `Hint → ${h}` }]);
}


  return (
    <div className="min-h-screen w-full flex flex-col items-center p-4">
      <div className="w-full max-w-2xl">
        <Header status={status} />
        <div ref={chatRef} className="bg-card rounded-xl p-3 h-[60vh] overflow-y-auto scrollbar-thin border border-gray-800">
          {messages.map((m, i) => (
            <ChatBubble key={i} role={m.role} text={m.text} />
          ))}
        </div>
        <Controls
          input={input}
          setInput={setInput}
          onSend={sendQuestion}
          onGuess={guess}
          onRestart={restart}
          onHint={hint}
          disabled={gameOver}
        />
        <p className="mt-2 text-xs text-gray-500">
          Tip: ask about teams, MVPs, position, college, height, championships, active/retired.
        </p>
      </div>
    </div>
  );
}
