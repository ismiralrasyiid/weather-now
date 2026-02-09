import { usePathname, useSearchParams } from "next/navigation";
import { parseUnitType, UnitType } from "@/domains/unit";

export function useUnitTypeParam() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentUnitType: UnitType = parseUnitType(searchParams.get("unitType"));
  const toSwitchUnitType: UnitType =
    currentUnitType === UnitType.Metric ? UnitType.Imperial : UnitType.Metric;

  const newSearchParams = new URLSearchParams(searchParams.toString());
  newSearchParams.set("unitType", toSwitchUnitType);

  const switchUnitTypeHref = `${pathname}?${newSearchParams.toString()}`;

  return { currentUnitType, toSwitchUnitType, switchUnitTypeHref };
}
