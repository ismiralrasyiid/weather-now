import Skeleton from "@/components/ui/skeleton";
import clsx from "clsx";

export function WeatherDetailsSkeleton({ className }: { className?: string }) {
  return (
    <div className={clsx("grid grid-cols-2 gap-4 sm:grid-cols-4", className)}>
      {["Feels like", "Humidity", "Wind", "Precipitation"].map(
        (metric, index) => (
          <Skeleton
            className="h-26.25 rounded-xl p-3.5"
            key={`metric-skeleton-${index}`}
          >
            <p className="flex flex-col gap-4">
              <span className="font-medium text-text-tertiary">{metric}</span>
              <span className="text-3xl font-extralight">-</span>
            </p>
          </Skeleton>
        ),
      )}
    </div>
  );
}
