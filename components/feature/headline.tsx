import clsx from "clsx";

export default function Headline({ className }: { className?: string }) {
  return (
    <h2
      className={clsx(
        "text-center font-primary text-headline leading-headline font-semibold",
        className,
      )}
    >
      How&#39;s the sky looking today?
    </h2>
  );
}
