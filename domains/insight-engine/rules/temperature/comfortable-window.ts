import { getDayPeriod, getHourFromDateString } from "@/domains/time";
import { EngineData, Insight } from "../../core/types";
import { getTimeframeFromIndices } from "../../core/utils/get-timeframe-from-indices";

const MIN_HOURS = 2;
const MAX_HOURS = 4;

const PREFERRED_HOURS = {
  start: 6,
  end: 19,
};

const COMFORT_RANGE = {
  "°C": { min: 22, max: 30 },
  "°F": { min: 72, max: 86 },
} as const;

export function comfortableWindowRule(
  data: EngineData,
): Insight<"comfortable_window"> | null {
  const temps = data.hourly.temperature;
  const feels = data.hourly.apparentTemperature;
  const times = data.hourly.time;
  const unit = data.units.temperature;

  const range = COMFORT_RANGE[unit];

  const indices = temps
    .map((t, i) => {
      const f = feels[i];
      const hour = getHourFromDateString(times[i]);

      const isComfortTemp = t >= range.min && t <= range.max;
      const isComfortFeels = f >= range.min && f <= range.max;
      const isPreferredHour =
        hour >= PREFERRED_HOURS.start && hour < PREFERRED_HOURS.end;

      if (isComfortTemp && isComfortFeels && isPreferredHour) return i;

      return -1;
    })
    .filter((i) => i !== -1);

  const hours = indices.length;

  if (hours < MIN_HOURS) return null;

  const timeframe = getTimeframeFromIndices(times, indices);

  const midIndex = indices[Math.floor(indices.length / 2)];
  const midHour = getHourFromDateString(times[midIndex]);
  const durationType = getDayPeriod(midHour);

  const avgTemp = indices.reduce((sum, i) => sum + temps[i], 0) / hours;

  const avgFeels = indices.reduce((sum, i) => sum + feels[i], 0) / hours;

  return {
    id: "comfortable-window",
    type: "comfortable_window",
    category: "temperature",
    severity: "low",
    confidence: Math.min(1, hours / MAX_HOURS),
    timeframe,
    timezone: data.timezone,
    signals: {
      comfortWindow: {
        temperature: {
          avg: Math.round(avgTemp),
          unit,
        },
        feelsLike: {
          avg: Math.round(avgFeels),
          unit,
        },
        duration: {
          hours,
          type: durationType,
        },
      },
    },
  };
}
