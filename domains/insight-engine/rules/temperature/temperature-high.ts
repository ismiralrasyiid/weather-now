import { EngineData, Insight, Severity } from "../../core/types";

export function temperatureHighRule(
  data: EngineData,
): Insight<"temperature_high"> | null {
  const temps = data.hourly.temperature;

  const maxTemp = Math.max(...temps);
  const hotHours = temps.filter((t) => t >= 33).length;

  if (maxTemp < 33 || hotHours < 3) {
    return null;
  }

  let severity: Severity = "low";

  if (maxTemp >= 36) {
    severity = "high";
  } else if (maxTemp >= 34) {
    severity = "medium";
  }

  const confidence = Math.min(1, hotHours / 6);

  return {
    id: "temperature-high",
    type: "temperature_high",
    category: "temperature",
    severity,
    confidence,
    timeframe: {
      start: 0,
      end: 24,
    },
    signals: {
      maxTemp,
      hotHours,
    },
  };
}
