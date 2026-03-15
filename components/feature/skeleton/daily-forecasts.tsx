import Skeleton from "@/components/ui/skeleton";
import clsx from "clsx";

export function DailyForecastsSkeleton({ className }: { className?: string }) {
  return (
    <div className={clsx(className)}>
      <p className="mb-4 text-lg font-medium">Daily Forecast</p>
      <div className="grid grid-cols-3 gap-3.5 md:grid-cols-7">
        {Array.from({ length: 7 }).map((_, index) => (
          <Skeleton
            className="h-37.5"
            key={`daily-forecast-skeleton-${index}`}
          />
        ))}
      </div>
    </div>
  );
}
