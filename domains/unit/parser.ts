import { UnitType } from "./constants";
import {
  PrecipitationUnitSymbol,
  TemperatureUnitSymbol,
  WindSpeedUnitSymbol,
} from "./types";

export function parseUnitType(value: string | null) {
  if (value === UnitType.Imperial) return UnitType.Imperial;
  return UnitType.Metric;
}

export function parseTemperatureUnitSymbol(
  symbol: string,
): TemperatureUnitSymbol {
  return symbol === "°F" ? symbol : "°C";
}

export function parseWindSpeedUnitSymbol(symbol: string): WindSpeedUnitSymbol {
  return symbol === "mp/h" ? symbol : "km/h";
}

export function parsePrecipitationUnitSymbol(
  symbol: string,
): PrecipitationUnitSymbol {
  return symbol === "inch" ? symbol : "mm";
}
