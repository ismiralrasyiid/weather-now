"use client";

import { Menu } from "@base-ui/react";
import Trigger from "./trigger";
import RadioGroup from "./radio-group";
import {
  precipitationUnitOptions,
  temperatureUnitOptions,
  unitOptionValuesByType,
  windSpeedUnitOptions,
} from "@/domains/unit";
import Link from "next/link";
import { useUnitTypeParam } from "@/hooks";

export default function MenuDropdown() {
  const { currentUnitType, toSwitchUnitType, switchUnitTypeHref } =
    useUnitTypeParam();
  const unitTypeOptions = unitOptionValuesByType[currentUnitType];

  return (
    <Menu.Root>
      <Trigger />
      <Menu.Portal>
        <Menu.Positioner sideOffset={10} align="end">
          <Menu.Popup className="flex min-w-menu-dropdown flex-col gap-2 rounded-xl border border-border bg-background-primary p-1.5 font-primary text-sm tracking-wide text-text-primary">
            <Link href={switchUnitTypeHref}>
              <Menu.Item className="cursor-pointer rounded-lg p-2 hover:bg-background-secondary-hover data-checked:bg-background-secondary">
                Switch to <span className="capitalize">{toSwitchUnitType}</span>
              </Menu.Item>
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
