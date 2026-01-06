import Image from "next/image";

export default function Logo() {
  return (
    <div>
      <h1 className="sr-only">Weather Now</h1>
      <Image src="/logo.svg" alt="Logo" height={30} width={125} />
    </div>
  );
}
