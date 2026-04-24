import clsx from "clsx";

export default function DotIndicator({ isActive }: { isActive: boolean }) {
  return (
    <span
      className={clsx(
        "transition-colors duration-500",
        isActive ? "text-text-secondary" : "text-text-tertiary",
      )}
    >
      ●
    </span>
  );
}
