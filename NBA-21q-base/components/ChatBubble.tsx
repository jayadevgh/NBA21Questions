import clsx from "clsx";

export default function ChatBubble({ role, text }: { role: "user" | "bot" | "system"; text: string }) {
  const isUser = role === "user";
  const isSystem = role === "system";
  const bubble = clsx(
    "max-w-[80%] rounded-2xl px-3 py-2 text-sm leading-relaxed shadow-soft",
    isSystem ? "bg-gray-800 text-gray-300"
      : isUser ? "bg-blue-600 text-white"
      : "bg-gray-800 text-gray-100"
  );
  return (
    <div className={clsx("w-full flex mb-2", isUser ? "justify-end" : "justify-start")}>
      <div className={bubble}>{text}</div>
    </div>
  );
}
