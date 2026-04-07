import Image from "next/image";
import Link from "next/link";

export default function Brand() {
  return (
    <Link href="/">
      <h1 className="sr-only">Weather Now</h1>
      <Image
        className="h-7.5 w-31.25 md:h-9 md:w-43.75"
        src="/logo.svg"
        alt=""
        height={36}
        width={175}
        aria-hidden
      />
    </Link>
  );
}
