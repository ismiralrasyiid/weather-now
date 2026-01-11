import { Menu } from "@base-ui/react";
import Image from "next/image";
import Trigger from "./trigger";

export default function MenuDropdown() {
  return (
    <Menu.Root>
      <Trigger />
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
