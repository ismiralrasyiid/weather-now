import { OpenMeteoWeatherResponse } from "@/domains/weather";
import { EngineData } from "./types";
import { slice24Hours } from "@/domains/time";

export function mapEngineData(
  data: OpenMeteoWeatherResponse,
): EngineData | null {
  const temperatures = data.hourly?.temperature_2m;
  const temperatureUnit = data.hourly_units?.temperature_2m;
  const hasValidTemps =
    temperatures && temperatures.length >= 24 && temperatureUnit;

  if (!hasValidTemps) return null;

  return {
    hourly: {
      temperature: slice24Hours(temperatures),
    },
    units: {
      temperature: temperatureUnit,
    },
  };
}
