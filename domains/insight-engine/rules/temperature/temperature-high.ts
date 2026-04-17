import { EngineData, Insight, Severity } from "../../core/types";

export function temperatureHighRule(
  data: EngineData,
): Insight<"temperature_high"> | null {
  const temps = data.hourly.temperature;
  const times = data.hourly.time;

  const maxTemp = Math.max(...temps);

  const hotIndexes = temps
    .map((t, i) => (t >= 33 ? i : -1))
    .filter((i) => i !== -1);

  const hotHours = hotIndexes.length;

  if (maxTemp < 33 || hotHours < 3) {
    return null;
  }

  const startIndex = hotIndexes[0];
  const endIndex = hotIndexes[hotIndexes.length - 1];

  const timeframe = {
    start: times[startIndex],
    end: times[endIndex],
  };

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
    timeframe,
    timezone: data.timezone,
    signals: {
      maxTemp,
      hotHours,
    },
  };
}
