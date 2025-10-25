type Props = {
  input: string;
  setInput: (s: string) => void;
  onSend: () => void;
  onGuess: () => void;
  onRestart: () => void;
  onHint: () => void;
  disabled?: boolean;
};

export default function Controls({ input, setInput, onSend, onGuess, onRestart, onHint, disabled }: Props) {
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      <input
        className="flex-1 min-w-[220px] rounded-lg bg-gray-800 px-3 py-2 outline-none"
        placeholder={disabled ? "Game over — start a new one!" : "Type your question..."}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSend()}
        disabled={disabled}
      />
      <button onClick={onSend} disabled={disabled} className="rounded-lg bg-blue-600 px-4 py-2 disabled:opacity-50">
        Send
      </button>
      <button onClick={onGuess} className="rounded-lg bg-green-600 px-4 py-2">Guess</button>
      <button onClick={onHint} className="rounded-lg bg-amber-600 px-4 py-2">Hint</button>
      <button onClick={onRestart} className="rounded-lg bg-gray-700 px-4 py-2">Restart</button>
    </div>
  );
}
