import clsx from "clsx";

export default function Headline({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <h2
      className={clsx(
        "text-center font-primary text-headline leading-headline font-semibold",
        className,
      )}
    >
      {children}
    </h2>
  );
}
