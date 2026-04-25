import Skeleton from "@/components/ui/skeleton";
import Spinner from "@/components/ui/spinner";
import clsx from "clsx";

export function WeatherOverviewSkeleton({ className }: { className?: string }) {
  return (
    <Skeleton
      className={clsx(
        "flex h-100.25 w-full items-center justify-center gap-2 rounded-xl sm:h-95.25 md:h-hero-section",
        className,
      )}
    >
      <Spinner />
      Loading...
    </Skeleton>
  );
}
