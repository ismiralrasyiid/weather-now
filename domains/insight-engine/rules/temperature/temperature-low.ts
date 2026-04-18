import { EngineData, Insight, Severity, Timeframe } from "../../core/types";
import { getSeverityFromThreshold } from "../../core/utils/get-severity-from-threshold";
import { getTimeframeFromIndices } from "../../core/utils/get-timeframe-from-indices";

const MIN_COLD_HOURS = 3;
const MAX_COLD_HOURS = 6;
const THRESHOLD_BY_UNIT = {
  "°C": { low: 15, medium: 10, high: 5 },
  "°F": { low: 59, medium: 50, high: 41 },
} as const;

export function temperatureLowRule(
  data: EngineData,
): Insight<"temperature_low"> | null {
  const temps = data.hourly.temperature;
  const times = data.hourly.time;
  const unit = data.units.temperature;

  const minTemp = Math.min(...temps);
  const threshold = THRESHOLD_BY_UNIT[unit];

  const coldIndices = temps
    .map((t, i) => (t <= threshold.low ? i : -1))
    .filter((i) => i !== -1);

  const coldHours = coldIndices.length;

  if (minTemp > threshold.low || coldHours < MIN_COLD_HOURS) {
    return null;
  }

  const timeframe: Timeframe = getTimeframeFromIndices(times, coldIndices);
  const severity: Severity = getSeverityFromThreshold(
    minTemp,
    threshold,
    "desc",
  );
  const confidence = Math.min(1, coldHours / MAX_COLD_HOURS);

  return {
    id: "temperature-low",
    type: "temperature_low",
    category: "temperature",
    severity,
    confidence,
    timeframe,
    timezone: data.timezone,
    signals: {
      temperature: {
        min: Math.round(minTemp),
        coldHours,
        unit,
      },
    },
  };
}
