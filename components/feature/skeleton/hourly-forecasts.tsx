import Skeleton from "@/components/ui/skeleton";
import clsx from "clsx";
import Image from "next/image";

export function HourlyForecastsSkeleton({ className }: { className?: string }) {
  return (
    <div className="relative">
      <Skeleton
        className={clsx("rounded-xl border-none px-3.5 py-4", className)}
      >
        <div className="mb-3.5 flex justify-between">
          <p className="text-lg font-medium">Hourly Forecast</p>
          <Skeleton className="flex h-9 w-26.5 items-center justify-between bg-background-tertiary px-4">
            -
            <Image
              className="size-3"
              src="/icon-dropdown.svg"
              alt="Icon Dropdown"
              width={12}
              height={12}
              aria-hidden
            />
          </Skeleton>
        </div>
        <div className="flex h-scrollarea flex-col gap-3.75">
          {Array.from({ length: 8 }).map((_, index) => (
            <Skeleton
              className="h-13.5 w-full bg-background-secondary"
              key={`hourly-forecast-skeleton-${index}`}
            />
          ))}
        </div>
      </Skeleton>
      <Skeleton className="absolute top-17 right-0 h-45 w-0.75 bg-background-secondary" />
    </div>
  );
}
