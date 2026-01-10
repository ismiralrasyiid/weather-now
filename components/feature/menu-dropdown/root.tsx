import { Menu } from "@base-ui/react";
import Image from "next/image";

export default function MenuDropdown() {
  return (
    <Menu.Root>
      <Menu.Trigger
        className="flex cursor-pointer items-center gap-1.5 rounded-md bg-background-primary p-2 text-xs"
        openOnHover
      >
        <Image
          src="/icon-units.svg"
          alt=""
          width={13}
          height={13}
          aria-hidden
        />
        Units
        <Image
          src="/icon-dropdown.svg"
          alt=""
          width={9}
          height={9}
          aria-hidden
        />
      </Menu.Trigger>
    </Menu.Root>
  );
}
