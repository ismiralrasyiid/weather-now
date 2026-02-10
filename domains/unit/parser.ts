import { UnitType } from "./constants";

export function parseUnitType(value: string | null) {
  if (value === UnitType.Imperial) return UnitType.Imperial;
  return UnitType.Metric;
}
