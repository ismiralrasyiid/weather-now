import { OpenMeteoWeatherResponse } from "@/domains/weather";
import { EngineData } from "./types";
import { slice24Hours } from "@/domains/time";
import { parseTemperatureUnitSymbol } from "@/domains/unit";

export function mapEngineData(
  data: OpenMeteoWeatherResponse,
): EngineData | null {
  const temperatures = data.hourly?.temperature_2m;
  const temperatureUnit = parseTemperatureUnitSymbol(
    data.hourly_units?.temperature_2m,
  );
  const hasValidTemps =
    temperatures && temperatures.length >= 24 && temperatureUnit;

  const times = data.hourly?.time;
  const timeUnit = data.hourly_units?.time;
  const hasValidTimes = times && times.length >= 24 && timeUnit;

  if (!hasValidTemps) return null;
  if (!hasValidTimes) return null;
  if (!data.timezone) return null;

  return {
    hourly: {
      temperature: slice24Hours(temperatures),
      time: slice24Hours(times),
    },
    units: {
      temperature: temperatureUnit,
      time: timeUnit,
    },
    timezone: data.timezone,
  };
}
