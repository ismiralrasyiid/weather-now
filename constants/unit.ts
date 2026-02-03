export enum UnitType {
  Metric = "metric",
  Imperial = "imperial",
}

export const VALID_UNIT_TYPES = Object.values(UnitType) as readonly UnitType[];

export type TemperatureUnit = "celsius" | "fahrenheit";
export type WindSpeedUnit = "kmh" | "mph";
export type PrecipitationUnit = "millimeters" | "inches";

export type SelectOption<TValue = string> = {
  label: string;
  value: TValue;
};

export type RadioSelectUnitOptions<TValue = string> = {
  label: string;
  id: string;
  options: ReadonlyArray<SelectOption<TValue>>;
};

export const temperatureUnitOptions: RadioSelectUnitOptions<TemperatureUnit> = {
  label: "Temperature",
  id: "temperature",
  options: [
    { label: "Celsius (°C)", value: "celsius" },
    { label: "Fahrenheit (°F)", value: "fahrenheit" },
  ],
};

export const windSpeedUnitOptions: RadioSelectUnitOptions<WindSpeedUnit> = {
  label: "Wind Speed",
  id: "wind-speed",
  options: [
    { label: "km/h", value: "kmh" },
    { label: "mph", value: "mph" },
  ],
};

export const precipitationUnitOptions: RadioSelectUnitOptions<PrecipitationUnit> =
  {
    label: "Precipitation",
    id: "precipitation",
    options: [
      { label: "Millimeters (mm)", value: "millimeters" },
      { label: "Inches (in)", value: "inches" },
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
    precipitation: "inches",
  },
} as const;
