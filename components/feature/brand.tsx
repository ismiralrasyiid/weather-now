import Image from "next/image";

export default function Brand() {
  return (
    <div>
      <h1 className="sr-only">Weather Now</h1>
      <Image
        className="md:hidden"
        src="/logo.svg"
        alt=""
        height={30}
        width={125}
        aria-hidden
      />
      <Image
        className="hidden md:block"
        src="/logo.svg"
        alt=""
        height={36}
        width={175}
        aria-hidden
      />
    </div>
  );
}
