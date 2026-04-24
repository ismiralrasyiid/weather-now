import { EngineData, Insight, Severity, Timeframe } from "../../core/types";
import { getSeverityFromThreshold } from "../../core/utils/get-severity-from-threshold";
import { getTimeframeFromIndices } from "../../core/utils/get-timeframe-from-indices";

const MIN_HOT_HOURS = 3;
const MAX_HOT_HOURS = 6;
const THRESHOLD_BY_UNIT = {
  "°C": { low: 33, medium: 35, high: 37 },
  "°F": { low: 91, medium: 95, high: 99 },
} as const;

export function temperatureHighRule(
  data: EngineData,
): Insight<"temperature_high"> | null {
  const temps = data.hourly.temperature;
  const times = data.hourly.time;
  const unit = data.units.temperature;

  const maxTemp = Math.max(...temps);
  const threshold = THRESHOLD_BY_UNIT[unit];

  const hotIndices = temps
    .map((t, i) => (t >= threshold.low ? i : -1))
    .filter((i) => i !== -1);

  const hotHours = hotIndices.length;

  if (maxTemp < threshold.low || hotHours < MIN_HOT_HOURS) {
    return null;
  }

  const timeframe: Timeframe = getTimeframeFromIndices(times, hotIndices);
  const severity: Severity = getSeverityFromThreshold(maxTemp, threshold);
  const confidence = Math.min(1, hotHours / MAX_HOT_HOURS);

  return {
    id: "temperature-high",
    type: "temperature_high",
    category: "temperature",
    severity,
    confidence,
    timeframe,
    timezone: data.timezone,
    signals: {
      temperature: {
        max: Math.round(maxTemp),
        hotHours,
        unit,
      },
    },
  };
}
