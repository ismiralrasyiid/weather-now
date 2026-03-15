import Skeleton from "@/components/ui/skeleton";
import clsx from "clsx";
import Image from "next/image";

export function SearchbarSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={clsx(
        "md:flex md:items-center md:justify-center md:gap-3.5",
        className,
      )}
    >
      <div className="relative">
        <p className="absolute top-1/2 left-5 -translate-y-1/2">
          <Image
            className="size-5"
            src="/icon-search.svg"
            alt="Search icon"
            width={20}
            height={20}
            aria-hidden
          />
        </p>
        <p className="w-full rounded-xl bg-background-primary py-3.5 pr-10 pl-13.5 text-lg text-text-secondary md:w-search-input">
          Search for a place...
        </p>
      </div>
      <Skeleton className="mt-3 w-full rounded-xl px-6 py-4 text-sm md:mt-0 md:w-auto">
        Clear Input
      </Skeleton>
    </div>
  );
}
