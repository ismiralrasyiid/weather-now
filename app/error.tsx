"use client";

import Image from "next/image";
import Headline from "@/components/feature/headline";
import clsx from "clsx";

function logError(error: Error) {
  if (process.env.NODE_ENV === "development") {
    console.error(error);
  }
}

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  logError(error);

  return (
    <div className="mt-25 flex flex-col items-center gap-4">
      <Image
        className="mx-auto size-9.5"
        src="/icon-error.svg"
        alt=""
        width={38}
        height={38}
        aria-hidden
      />
      <Headline>Something went wrong</Headline>
      <p className="max-w-120 text-center text-lg text-text-secondary">
        We couldn&#39;t complete your request. Please try again in a few moments
      </p>
      <div className="flex">
        <ResetButton
          className="rounded-l-lg border-r border-border"
          onClick={() => reset()}
        >
          Try Again
        </ResetButton>
        <ResetButton
          className="rounded-r-lg"
          onClick={() => window.location.reload()}
        >
          Reload Page
        </ResetButton>
      </div>
    </div>
  );
}

function ResetButton({
  className,
  children,
  onClick,
}: {
  className?: string;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      className={clsx(
        "flex cursor-pointer items-center gap-2.5 bg-background-primary px-3.5 py-2.5 transition-colors hover:bg-background-primary-hover",
        className,
      )}
      onClick={onClick}
    >
      <Image
        className="size-3.75"
        src="/icon-retry.svg"
        alt=""
        width={15}
        height={15}
        aria-hidden
      />
      <span className="text-sm">{children}</span>
    </button>
  );
}
