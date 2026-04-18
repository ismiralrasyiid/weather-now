import { EngineData, Insight, Severity, Timeframe } from "../../core/types";
import { getSeverityFromThreshold } from "../../core/utils/get-severity-from-threshold";
import { getTimeframeFromIndices } from "../../core/utils/get-timeframe-from-indices";

const THRESHOLD = {
  "°C": { low: 36, medium: 38, high: 40 },
  "°F": { low: 97, medium: 100, high: 104 },
} as const;

export function feelsLikePeakHoursRule(
  data: EngineData,
): Insight<"feelslike_peak_hours"> | null {
  const feelsLikes = data.hourly.apparentTemperature;
  const times = data.hourly.time;
  const unit = data.units.temperature;

  const maxFeelsLike = Math.max(...feelsLikes);
  const threshold = THRESHOLD[unit];

  const peakIndices = feelsLikes
    .map((t, i) => (t === maxFeelsLike ? i : -1))
    .filter((i) => i !== -1);

  const peakHours = peakIndices.length;

  if (maxFeelsLike < threshold.medium) {
    return null;
  }

  const timeframe: Timeframe = getTimeframeFromIndices(times, peakIndices);
  const severity: Severity = getSeverityFromThreshold(maxFeelsLike, threshold);

  return {
    id: "feelslike-peak-hours",
    type: "feelslike_peak_hours",
    category: "temperature",
    severity,
    confidence: 1,
    timeframe,
    timezone: data.timezone,
    signals: {
      peak: {
        feelsLike: Math.round(maxFeelsLike),
        duration: peakHours,
        unit,
      },
    },
  };
}
