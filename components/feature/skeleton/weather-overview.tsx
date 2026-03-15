import Skeleton from "@/components/ui/skeleton";
import Spinner from "@/components/ui/spinner";
import clsx from "clsx";

export function WeatherOverviewSkeleton({ className }: { className?: string }) {
  return (
    <Skeleton
      className={clsx(
        "flex h-hero-section w-full items-center justify-center gap-2 rounded-xl",
        className,
      )}
    >
      <Spinner />
      Loading...
    </Skeleton>
  );
}
