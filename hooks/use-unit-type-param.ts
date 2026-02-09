import { useSearchParams } from "next/navigation";
import { parseUnitType, UnitType } from "@/domains/unit";

export function useUnitTypeParam() {
  const searchParams = useSearchParams();
  const currentUnitType: UnitType = parseUnitType(searchParams.get("unitType"));
  const toSwitchUnitType: UnitType =
    currentUnitType === UnitType.Metric ? UnitType.Imperial : UnitType.Metric;
  return { currentUnitType, toSwitchUnitType };
}
