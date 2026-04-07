export default function Fallback({ name }: { name: string }) {
  return (
    <div className="absolute bottom-0 animate-pulse p-4 text-white">
      <h3 className="text-lg font-semibold">{name}</h3>

      <div className="mb-2 h-6 w-20 rounded-xs bg-white/30" />
      <div className="h-4 w-40 rounded-xs bg-white/20" />
    </div>
  );
}
