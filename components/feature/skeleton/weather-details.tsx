import Skeleton from "@/components/ui/skeleton";
import clsx from "clsx";

export function WeatherDetailsSkeleton({ className }: { className?: string }) {
  return (
    <div className={clsx("grid grid-cols-2 gap-4 sm:grid-cols-4", className)}>
      {Array.from({ length: 4 }).map((_, index) => (
        <Skeleton className="h-26.25" key={`metric-skeleton-${index}`} />
      ))}
    </div>
  );
}
