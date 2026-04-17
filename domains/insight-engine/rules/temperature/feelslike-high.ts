import { EngineData, Insight, Severity } from "../../core/types";

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

  const startIndex = hotIndices[0];
  const endIndex = hotIndices[hotIndices.length - 1];

  const timeframe = {
    start: times[startIndex],
    end: times[endIndex],
  };

  let severity: Severity = "low";

  if (maxFeelsLike >= threshold.high) {
    severity = "high";
  } else if (maxFeelsLike >= threshold.medium) {
    severity = "medium";
  }

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
