import { EngineData, Insight, Severity, Timeframe } from "../../core/types";
import { getSeverityFromThreshold } from "../../core/utils/get-severity-from-threshold";
import { getTimeframeFromIndices } from "../../core/utils/get-timeframe-from-indices";

const MIN_HOURS = 3;
const MAX_HOURS = 6;

const TEMP_THRESHOLD = {
  "°C": 32,
  "°F": 90,
} as const;

const GAP_THRESHOLD = {
  "°C": { low: 1, medium: 3, high: 5 },
  "°F": { low: 2, medium: 5, high: 9 },
} as const;

export function temperatureFeelsLikeGapRule(
  data: EngineData,
): Insight<"temperature_feelslike_gap"> | null {
  const temps = data.hourly.temperature;
  const feels = data.hourly.apparentTemperature;
  const times = data.hourly.time;
  const unit = data.units.temperature;

  const tempThreshold = TEMP_THRESHOLD[unit];
  const gapThreshold = GAP_THRESHOLD[unit];

  const indices = temps
    .map((t, i) => {
      const gap = feels[i] - t;

      const isHotEnough = t >= tempThreshold;
      const isGapSignificant = gap >= gapThreshold.medium;

      if (isHotEnough && isGapSignificant) return i;

      return -1;
    })
    .filter((i) => i !== -1);

  const hours = indices.length;

  if (hours < MIN_HOURS) return null;

  const gaps = indices.map((i) => feels[i] - temps[i]);
  const maxGap = Math.max(...gaps);
  const avgGap = gaps.reduce((a, b) => a + b, 0) / gaps.length;

  const timeframe: Timeframe = getTimeframeFromIndices(times, indices);
  const severity: Severity = getSeverityFromThreshold(maxGap, gapThreshold);
  const confidence = Math.min(1, hours / MAX_HOURS);

  return {
    id: "temperature-feelslike-gap",
    type: "temperature_feelslike_gap",
    category: "temperature",
    severity,
    confidence,
    timeframe,
    timezone: data.timezone,
    signals: {
      feelsLikeDelta: {
        max: Math.round(maxGap),
        avg: Math.round(avgGap),
        unit,
      },
      temperature: {
        avg: Math.round(indices.reduce((sum, i) => sum + temps[i], 0) / hours),
        unit,
      },
      feelsLike: {
        avg: Math.round(indices.reduce((sum, i) => sum + feels[i], 0) / hours),
        unit,
      },
    },
  };
}
