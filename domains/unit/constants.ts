import { RadioSelectOptions } from "@/components/feature/menu-dropdown/radio-group";
import { PrecipitationUnit, TemperatureUnit, WindSpeedUnit } from "./types";

export enum UnitType {
  Metric = "metric",
  Imperial = "imperial",
}

export const VALID_UNIT_TYPES = Object.values(UnitType) as readonly UnitType[];

export const temperatureUnitOptions: RadioSelectOptions<TemperatureUnit> = {
  label: "Temperature",
  id: "temperature",
  options: [
    { label: "Celsius (°C)", value: "celsius" },
    { label: "Fahrenheit (°F)", value: "fahrenheit" },
  ],
};

export const windSpeedUnitOptions: RadioSelectOptions<WindSpeedUnit> = {
  label: "Wind Speed",
  id: "wind-speed",
  options: [
    { label: "km/h", value: "kmh" },
    { label: "mph", value: "mph" },
  ],
};

export const precipitationUnitOptions: RadioSelectOptions<PrecipitationUnit> = {
  label: "Precipitation",
  id: "precipitation",
  options: [
    { label: "Millimeters (mm)", value: "millimeters" },
    { label: "Inches (in)", value: "inch" },
  ],
};

export const unitOptionValuesByType = {
  metric: {
    temperature: "celsius",
    windSpeed: "kmh",
    precipitation: "millimeters",
  },
  imperial: {
    temperature: "fahrenheit",
    windSpeed: "mph",
    precipitation: "inch",
  },
} as const;
