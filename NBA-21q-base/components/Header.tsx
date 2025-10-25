export default function Header({ status }: { status: string }) {
  return (
    <header className="flex items-center justify-between mb-4">
      <h1 className="text-2xl md:text-3xl font-bold">🏀 NBA 21 Questions</h1>
      <div className="text-xs md:text-sm text-gray-400">{status}</div>
    </header>
  );
}
