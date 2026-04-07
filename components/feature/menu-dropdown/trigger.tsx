import { Menu } from "@base-ui/react";
import Image from "next/image";

export default function Trigger() {
  return (
    <Menu.Trigger className="group flex cursor-pointer items-center gap-1.5 rounded-md bg-background-primary p-2 text-xs transition-colors hover:bg-background-primary-hover data-pressed:bg-background-primary-hover md:gap-2.5 md:px-3.25 md:text-sm">
      <Image
        className="size-3.25 md:size-3.75"
        src="/icon-units.svg"
        alt=""
        width={15}
        height={15}
        aria-hidden
      />
      <span>Units</span>
      <Image
        className="size-2.25 transition-transform duration-200 ease-in group-data-pressed:rotate-180 md:size-3"
        src="/icon-dropdown.svg"
        alt=""
        width={12}
        height={12}
        aria-hidden
      />
    </Menu.Trigger>
  );
}
