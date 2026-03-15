import clsx from "clsx";

export default function Skeleton({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={clsx(
        "rounded-lg border border-border bg-background-primary",
        className,
      )}
    >
      {children}
    </div>
  );
}
