export default function Content() {
  return (
    <div className="flex h-28 items-center rounded-xl bg-linear-to-b from-white/5 via-white/2 to-white/5 text-sm">
      <div className="flex min-w-1/2 items-center gap-4 p-6">
        <div className="text-3xl">🌤️</div>
        <div>
          <p className="font-semibold">Comfortable afternoon ahead</p>
          <p className="text-text-secondary">Good window for outdoor plans!</p>
        </div>
      </div>
      <div className="flex h-20 items-center border-l-2 border-white/10 px-6 text-text-secondary">
        <p className="line-clamp-4">
          {
            "Expect ~8 hours of comfortable weather between 9 AM – 6 PM,Expect ~8 hours of comfortable weather between 9 AM – 6 PM, Expect ~8 hours of comfortable weather between 9 AM – 6 PM,  "
          }
        </p>
      </div>
    </div>
  );
}
