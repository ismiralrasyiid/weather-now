import { InsightMessage } from "@/domains/insight-engine/core/types";

export default function Content({ message }: { message: InsightMessage }) {
  return (
    <div className="h-full p-6 text-sm md:flex md:items-center md:p-0">
      <div className="md:flex md:min-w-1/2 md:items-center md:gap-4 md:p-6">
        <span className="hidden text-2xl md:block" aria-hidden>
          {message.icon}
        </span>
        <div>
          <p className="mb-5 text-center font-semibold md:mb-0 md:text-left">
            {message.title}
          </p>
          <p className="line-clamp-2 h-10 text-text-secondary sm:h-auto">
            {message.action}
          </p>
        </div>
      </div>
      <div className="h-20 text-text-secondary md:flex md:items-center md:border-l-2 md:border-white/10 md:px-6">
        <p className="line-clamp-4">{message.description}</p>
      </div>
    </div>
  );
}
