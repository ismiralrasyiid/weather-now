import { Menu } from "@base-ui/react";
import Trigger from "./trigger";
import RadioGroup from "./radio-group";

const temperatureUnits = {
  label: "Temperature",
  options: [
    { id: "", label: "Celsius (°C)", value: "celsius" },
    { id: "", label: "Fahrenheit (°F)", value: "fahrenheit" },
  ],
};

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
            <RadioGroup
              label={temperatureUnits.label}
              options={temperatureUnits.options}
            />
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
}
