import { InsightMessage } from "@/domains/insight-engine/core/types";

export default function Content({ message }: { message: InsightMessage }) {
  return (
    <div className="flex h-full items-center text-sm">
      <div className="flex min-w-1/2 items-center gap-4 p-6">
        <div className="text-2xl">{message.icon}</div>
        <div>
          <p className="font-semibold">{message.title}</p>
          <p className="text-text-secondary">{message.action}</p>
        </div>
      </div>
      <div className="flex h-20 items-center border-l-2 border-white/10 px-6 text-text-secondary">
        <p className="line-clamp-4">{message.description}</p>
      </div>
    </div>
  );
}
