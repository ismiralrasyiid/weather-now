import { OpenMeteoWeatherResponse } from "@/domains/weather";
import { AnyInsight, Rule } from "./types";
import { mapEngineData } from "./mapper";

function isNotNull<T>(value: T | null): value is T {
  return value !== null;
}

export function runInsightEngine(
  data: OpenMeteoWeatherResponse,
  rules: Rule[],
): AnyInsight[] {
  const engineData = mapEngineData(data);

  if (!engineData) return [];

  return rules.map((rule) => rule(engineData)).filter(isNotNull);
}
