import clsx from "clsx";

export default function Spinner({ className }: { className?: string }) {
  return (
    <div
      className={clsx(
        "size-4 animate-spin rounded-full border-2 border-gray-200 border-t-gray-600",
        className,
      )}
      aria-hidden
    />
  );
}
