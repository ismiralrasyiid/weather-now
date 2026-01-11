import { Menu } from "@base-ui/react";
import Image from "next/image";

export default function Trigger() {
  return (
    <Menu.Trigger
      className="flex cursor-pointer items-center gap-1.5 rounded-md bg-background-primary p-2 text-xs md:gap-2.5 md:px-3.25 md:text-sm"
      openOnHover
    >
      <Image
        className="md:hidden"
        src="/icon-units.svg"
        alt=""
        width={13}
        height={13}
        aria-hidden
      />
      <Image
        className="hidden md:block"
        src="/icon-units.svg"
        alt=""
        width={15}
        height={15}
        aria-hidden
      />
      <span>Units</span>
      <Image
        className="md:hidden"
        src="/icon-dropdown.svg"
        alt=""
        width={9}
        height={9}
        aria-hidden
      />
      <Image
        className="hidden md:block"
        src="/icon-dropdown.svg"
        alt=""
        width={12}
        height={12}
        aria-hidden
      />
    </Menu.Trigger>
  );
}
