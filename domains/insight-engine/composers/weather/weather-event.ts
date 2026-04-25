import { formatHour12FromDate, formatHourRange } from "@/domains/time";
import { Insight, InsightMessage, Severity } from "../../core/types";
import { createInsightMessage } from "../create-insight-message";

type WeatherType = "rain" | "storm" | "snow" | "drizzle" | "other";

const WEATHER_META: Record<
  WeatherType,
  {
    icon: string;
    action: (severity: Severity) => string;
  }
> = {
  rain: {
    icon: "🌧️",
    action: () => "Carry an umbrella and plan indoor alternatives",
  },
  storm: {
    icon: "⛈️",
    action: (severity) =>
      severity === "high"
        ? "Avoid outdoor activity and stay in safe shelter"
        : "Be cautious of sudden weather changes",
  },
  snow: {
    icon: "❄️",
    action: () => "Dress warmly and watch for slippery surfaces",
  },
  drizzle: {
    icon: "🌦️",
    action: () => "Bring an umbrella just in case",
  },
  other: {
    icon: "🌦️",
    action: () => "Plan accordingly based on weather conditions",
  },
};

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function composeWeatherEvent(
  insight: Insight<"weather_event">,
): InsightMessage {
  const event = insight.signals.weatherEvent;

  const { type, description, durationHours, peak } = event;

  const meta = WEATHER_META[type];

  const timeLabel = formatHourRange(insight.timeframe);
  const hourLabel = durationHours === 1 ? "hour" : "hours";

  const title = `${capitalize(type !== "other" ? type : description)} expected`;

  const descriptionText = `${description} between ${timeLabel}, lasting around ${durationHours} ${hourLabel}. Peak intensity around ${formatHour12FromDate(
    peak.time,
  )} (~${peak.probability}% chance).`;

  return createInsightMessage(insight, {
    title,
    description: descriptionText,
    action: meta.action(insight.severity),
    icon: meta.icon,
  });
}
