import Image from "next/image";

export default function Brand() {
  return (
    <div>
      <h1 className="sr-only">Weather Now</h1>
      <Image
        className="lg:hidden"
        src="/logo.svg"
        alt="Logo"
        height={30}
        width={125}
      />
      <Image
        className="hidden lg:block"
        src="/logo.svg"
        alt="Logo"
        height={36}
        width={175}
      />
    </div>
  );
}
