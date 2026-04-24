export default function Fallback({ name }: { name: string }) {
  return (
    <div className="absolute top-0 flex h-full w-full animate-pulse flex-col justify-between p-4 text-white">
      <div>
        <h3 className="text-md mb-1.25 font-semibold tracking-wide">{name}</h3>
        <div className="h-15 w-45 rounded-xs bg-white/30" />
      </div>
      <div className="mb-1.5 w-full">
        <div className="mb-1.5 h-4 w-full rounded-xs bg-white/20" />
        <div className="h-4 w-full rounded-xs bg-white/20" />
      </div>
    </div>
  );
}
