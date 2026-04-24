import { EngineData, Insight, Severity, Timeframe } from "../../core/types";
import { getSeverityFromThreshold } from "../../core/utils/get-severity-from-threshold";
import { getTimeframeFromIndices } from "../../core/utils/get-timeframe-from-indices";

const MIN_HOT_HOURS = 3;
const MAX_HOT_HOURS = 6;
const THRESHOLD_BY_UNIT = {
  "°C": { low: 36, medium: 38, high: 40 },
  "°F": { low: 97, medium: 100, high: 104 },
} as const;

export function feelsLikeHighRule(
  data: EngineData,
): Insight<"feelslike_high"> | null {
  const feelsLikes = data.hourly.apparentTemperature;
  const times = data.hourly.time;
  const unit = data.units.temperature;

  const maxFeelsLike = Math.max(...feelsLikes);
  const threshold = THRESHOLD_BY_UNIT[unit];

  const hotIndices = feelsLikes
    .map((t, i) => (t >= threshold.low ? i : -1))
    .filter((i) => i !== -1);

  const hotHours = hotIndices.length;

  if (maxFeelsLike < threshold.low || hotHours < MIN_HOT_HOURS) {
    return null;
  }

  const timeframe: Timeframe = getTimeframeFromIndices(times, hotIndices);
  const severity: Severity = getSeverityFromThreshold(maxFeelsLike, threshold);
  const confidence = Math.min(1, hotHours / MAX_HOT_HOURS);

  return {
    id: "feelslike-high",
    type: "feelslike_high",
    category: "temperature",
    severity,
    confidence,
    timeframe,
    timezone: data.timezone,
    signals: {
      feelsLike: {
        max: Math.round(maxFeelsLike),
        hotHours,
        unit,
      },
    },
  };
}
