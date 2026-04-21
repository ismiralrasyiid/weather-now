import { weatherMap } from "@/domains/weather";
import { EngineData, Insight, Severity } from "../../core/types";
import { getTimeframeFromIndices } from "../../core/utils/get-timeframe-from-indices";
import { getHourFromDateString } from "@/domains/time";

const MAX_HOURS = 4;
const PROBABILITY_THRESHOLD = 60;
const PREFERRED_HOURS = {
  start: 6,
  end: 20,
};
const SEVERITY_WEIGHT = {
  other: 0,
  drizzle: 1,
  rain: 2,
  snow: 2,
  storm: 3,
};

function getWeatherCategory(code: number) {
  if ([51, 53, 55, 56, 57].includes(code)) return "drizzle";
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return "rain";
  if ([95, 96, 99].includes(code)) return "storm";
  if ([71, 73, 75, 77, 85, 86].includes(code)) return "snow";

  return "other";
}

function getWeatherSeverity(code: number): Severity {
  if ([51, 61, 80].includes(code)) return "low";
  if ([53, 63, 81].includes(code)) return "medium";
  if ([55, 65, 82, 95, 96, 99].includes(code)) return "high";

  return "low";
}

function groupConsecutiveIndices(indices: number[]): number[][] {
  const groups: number[][] = [];
  let current: number[] = [];

  for (let i = 0; i < indices.length; i++) {
    if (i === 0 || indices[i] === indices[i - 1] + 1) {
      current.push(indices[i]);
    } else {
      groups.push(current);
      current = [indices[i]];
    }
  }

  if (current.length) groups.push(current);

  return groups;
}

function evaluateGroup(
  group: number[],
  probs: number[],
  codes: number[],
): { dominantIndex: number; score: number } {
  let dominantIndex = group[0];
  let bestScore = -Infinity;

  for (const i of group) {
    const category = getWeatherCategory(codes[i]);
    const severityWeight = SEVERITY_WEIGHT[category];

    const score = severityWeight * 100 + probs[i];

    if (score > bestScore) {
      dominantIndex = i;
      bestScore = score;
    }
  }

  return { dominantIndex, score: bestScore };
}

function pickBestGroup(
  groups: number[][],
  probs: number[],
  codes: number[],
): { length: number; dominantIndex: number; group: number[] } {
  let bestGroup = groups[0] ?? [];
  let bestScore = -Infinity;
  let dominantIndex = 0;

  for (const group of groups) {
    const { score, dominantIndex: index } = evaluateGroup(group, probs, codes);

    if (score > bestScore) {
      bestScore = score;
      bestGroup = group;
      dominantIndex = index;
    }
  }

  return { length: bestGroup.length, dominantIndex, group: bestGroup };
}

export function weatherEventRule(
  data: EngineData,
): Insight<"weather_event"> | null {
  const probs = data.hourly.precipitationProbability;
  const codes = data.hourly.weatherCode;
  const times = data.hourly.time;

  const indices = probs
    .map((p, i) => {
      const hour = getHourFromDateString(times[i]);

      const isRainLikely = p >= PROBABILITY_THRESHOLD;
      const isPreferred =
        hour >= PREFERRED_HOURS.start && hour < PREFERRED_HOURS.end;

      if (isRainLikely && isPreferred) return i;
      return -1;
    })
    .filter((i) => i !== -1);

  if (indices.length === 0) return null;

  const groups = groupConsecutiveIndices(indices);
  const bestGroup = pickBestGroup(groups, probs, codes);

  const hours = bestGroup.length;
  const timeframe = getTimeframeFromIndices(times, bestGroup.group);

  const dominantIndex = bestGroup.dominantIndex;

  const code = codes[dominantIndex];

  const category = getWeatherCategory(code);
  const severity = getWeatherSeverity(code);
  const confidence = Math.min(
    1,
    hours / MAX_HOURS + (severity === "high" ? 0.25 : 0),
  );

  const description = weatherMap[code]?.description ?? "Unknown";

  return {
    id: "weather-event",
    type: "weather_event",
    category: "weather",
    severity: severity,
    confidence: confidence,
    timeframe,
    timezone: data.timezone,
    signals: {
      weatherEvent: {
        type: category,
        description,
        severity,
        durationHours: hours,
        peak: {
          time: times[dominantIndex],
          probability: probs[dominantIndex],
        },
      },
    },
  };
}
