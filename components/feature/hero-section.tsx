import clsx from "clsx";
import Image from "next/image";

export default function HeroSection({ className }: { className?: string }) {
  return (
    <div
      className={clsx(
        "flex h-hero-section flex-col items-center justify-center rounded-xl bg-[url(@/public/bg-today-small.svg)] bg-cover bg-center md:flex-row md:justify-between md:bg-[url(@/public/bg-today-large.svg)] md:p-5",
        className,
      )}
    >
      <div className="text-center md:text-left">
        <h2 className="text-hero-section-city font-semibold">
          Berlin, Germany
        </h2>
        <p className="text-text-secondary">Tuesday, Aug 5, 2025</p>
      </div>
      <div className="flex items-center">
        <Image src="/icon-sunny.webp" alt="sunny" width={110} height={110} />
        <p className="sr-only">Sunny</p>
        <p className="text-hero-section-degree font-semibold">
          <span className="inline-block -skew-x-8">20</span>&deg;
        </p>
      </div>
    </div>
  );
}
