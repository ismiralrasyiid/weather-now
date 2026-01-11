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
const windSpeedUnits = {
  label: "Wind Speed",
  options: [
    { id: "", label: "km/h", value: "kmh" },
    { id: "", label: "mph", value: "mph" },
  ],
};
const precipitationUnits = {
  label: "Precipitation",
  options: [
    { id: "", label: "Millimeters (mm)", value: "millimeters" },
    { id: "", label: "Inches (in)", value: "inches" },
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
            <RadioGroup
              label={windSpeedUnits.label}
              options={windSpeedUnits.options}
            />
            <RadioGroup
              label={precipitationUnits.label}
              options={precipitationUnits.options}
            />
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
}
