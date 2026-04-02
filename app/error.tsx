"use client";

import Image from "next/image";
import Headline from "@/components/feature/headline";

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
        className="mx-auto"
        src="icon-error.svg"
        alt=""
        width={38}
        height={38}
        aria-hidden
      />
      <Headline>Something went wrong</Headline>
      <p className="max-w-120 text-center text-lg text-text-secondary">
        We couldn&#39;t connect to the server &#40;API error&#41;. Please try
        again in a few moments
      </p>
      <button
        className="flex cursor-pointer items-center gap-2.5 rounded-lg bg-background-primary px-3.5 py-2.5"
        onClick={reset}
      >
        <Image src="icon-retry.svg" alt="" width={15} height={15} aria-hidden />
        <span className="text-sm">Retry</span>
      </button>
    </div>
  );
}
