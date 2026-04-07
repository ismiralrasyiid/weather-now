import { parseUnitType, unitsByType, UnitType } from "../unit";
import {
  openMeteoCurrentWeatherVariables,
  openMeteoDailyWeatherVariables,
  openMeteoHourlyWeatherVariables,
} from "./constants";
import { WeatherParams } from "./types";

export function buildWeatherSearchParams({
  lat,
  lon,
  tzone,
  unitType,
}: WeatherParams): URLSearchParams {
  const openMeteoSearchParams = new URLSearchParams({
    current: openMeteoCurrentWeatherVariables,
    hourly: openMeteoHourlyWeatherVariables,
    daily: openMeteoDailyWeatherVariables,
  });

  if (lat) openMeteoSearchParams.set("latitude", lat);
  if (lon) openMeteoSearchParams.set("longitude", lon);
  if (tzone) openMeteoSearchParams.set("timezone", tzone);

  // Set non default open meteo units
  if (unitType) {
    if (parseUnitType(unitType) === UnitType.Imperial) {
      const units = unitsByType[UnitType.Imperial];
      openMeteoSearchParams.set("temperature_unit", units.temperature);
      openMeteoSearchParams.set("wind_speed_unit", units.windSpeed);
      openMeteoSearchParams.set("precipitation_unit", units.precipitation);
    }
  }

  return openMeteoSearchParams;
}
