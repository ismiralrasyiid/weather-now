"use client";

import { Menu } from "@base-ui/react";
import Trigger from "./trigger";
import RadioGroup from "./radio-group";
import {
  precipitationUnitOptions,
  temperatureUnitOptions,
  unitsByType,
  windSpeedUnitOptions,
} from "@/domains/unit";
import Link from "next/link";
import { useUnitTypeParam } from "@/hooks";
import clsx from "clsx";

export default function MenuDropdown() {
  const { currentUnitType, toSwitchUnitType, switchUnitTypeHref } =
    useUnitTypeParam();
  const unitTypeOptions = unitsByType[currentUnitType];

  return (
    <Menu.Root>
      <Trigger />
      <Menu.Portal>
        <Menu.Positioner sideOffset={10} align="end">
          <Menu.Popup
            className={clsx(
              "flex min-w-menu-dropdown flex-col gap-2 rounded-xl border border-border bg-background-primary p-1.5 font-primary text-sm tracking-wide text-text-primary",
              "origin-top transition-[transform,scale,opacity] data-ending-style:scale-90 data-ending-style:opacity-0 data-starting-style:scale-90 data-starting-style:opacity-0",
            )}
          >
            <Link
              className="group relative inline-block cursor-pointer rounded-t-lg p-2 transition-colors hover:bg-background-secondary-hover data-checked:bg-background-secondary"
              href={switchUnitTypeHref}
            >
              <Menu.Item>
                Switch to <span className="capitalize">{toSwitchUnitType}</span>
              </Menu.Item>
              <span
                className="absolute bottom-0 left-0 h-px w-0 bg-white transition-all duration-200 group-hover:w-full"
                aria-hidden
              />
            </Link>
            <RadioGroup
              {...temperatureUnitOptions}
              value={unitTypeOptions.temperature}
            />
            <RadioGroup
              {...windSpeedUnitOptions}
              value={unitTypeOptions.windSpeed}
            />
            <RadioGroup
              {...precipitationUnitOptions}
              value={unitTypeOptions.precipitation}
            />
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
}
