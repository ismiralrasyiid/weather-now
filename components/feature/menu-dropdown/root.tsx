import { Menu } from "@base-ui/react";
import Image from "next/image";

export default function MenuDropdown() {
  return (
    <Menu.Root>
      <Menu.Trigger
        className="flex cursor-pointer items-center gap-1.5 rounded-md bg-background-primary p-2 text-xs lg:gap-2.5 lg:px-3.25 lg:text-sm"
        openOnHover
      >
        <Image
          className="lg:hidden"
          src="/icon-units.svg"
          alt=""
          width={13}
          height={13}
          aria-hidden
        />
        <Image
          className="hidden lg:block"
          src="/icon-units.svg"
          alt=""
          width={15}
          height={15}
          aria-hidden
        />
        Units
        <Image
          className="lg:hidden"
          src="/icon-dropdown.svg"
          alt=""
          width={9}
          height={9}
          aria-hidden
        />
        <Image
          className="hidden lg:block"
          src="/icon-dropdown.svg"
          alt=""
          width={13}
          height={13}
          aria-hidden
        />
      </Menu.Trigger>
      <Menu.Portal>
        <Menu.Positioner sideOffset={10} align="end">
          <Menu.Popup className="flex min-w-menu-dropdown flex-col gap-2 rounded-xl border border-border bg-background-primary p-1.5 font-primary text-sm tracking-wide text-text-primary">
            <Menu.Item className="cursor-pointer rounded-lg p-2 hover:bg-background-secondary-hover data-checked:bg-background-secondary">
              Switch to Imperial
            </Menu.Item>
            <Menu.Group className="flex flex-col gap-1">
              <Menu.GroupLabel className="ml-2.5 text-xs text-text-tertiary">
                Temperature
              </Menu.GroupLabel>
              <Menu.RadioGroup className="flex flex-col gap-1">
                <Menu.RadioItem
                  value="celsius"
                  className="flex cursor-pointer items-center justify-between rounded-lg p-2 hover:bg-background-secondary-hover data-checked:bg-background-secondary"
                >
                  <span>Celsius &#40;&deg;C&#41;</span>
                  <Menu.RadioItemIndicator>
                    <Image
                      src="/icon-checkmark.svg"
                      width={13}
                      height={13}
                      alt=""
                      aria-hidden
                    />
                  </Menu.RadioItemIndicator>
                </Menu.RadioItem>
                <Menu.RadioItem
                  value="fahrenheit"
                  className="flex cursor-pointer items-center justify-between rounded-lg p-2 hover:bg-background-secondary-hover data-checked:bg-background-secondary"
                >
                  <span>Fahrenheit &#40;&deg;F&#41;</span>
                  <Menu.RadioItemIndicator>
                    <Image
                      src="/icon-checkmark.svg"
                      width={13}
                      height={13}
                      alt=""
                      aria-hidden
                    />
                  </Menu.RadioItemIndicator>
                </Menu.RadioItem>
              </Menu.RadioGroup>
            </Menu.Group>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
}
