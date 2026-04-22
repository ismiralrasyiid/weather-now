import { formatHourRange } from "@/domains/time";
import { Insight, InsightMessage, Severity } from "../../core/types";
import { createInsightMessage } from "../create-insight-message";

type WeatherType = "rain" | "storm" | "snow" | "wind" | "fog" | "other";

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
  wind: {
    icon: "💨",
    action: () => "Secure loose items and be cautious outdoors",
  },
  fog: {
    icon: "🌫️",
    action: () => "Allow extra travel time due to reduced visibility",
  },
  other: {
    icon: "🌦️",
    action: () => "Plan accordingly based on weather conditions",
  },
};

function formatPeakTime(time: string, timezone: string) {
  return new Date(time).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: timezone,
  });
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function composeWeatherEvent(
  insight: Insight<"weather_event">,
): InsightMessage {
  const event = insight.signals.weatherEvent;

  const { type, description, durationHours, peak } = event;

  const weatherType = (type as WeatherType) ?? "other";
  const meta = WEATHER_META[weatherType];

  const timeLabel = formatHourRange(insight.timeframe);
  const hourLabel = durationHours === 1 ? "hour" : "hours";

  const title = `${capitalize(
    weatherType !== "other" ? weatherType : description,
  )} expected`;

  const descriptionText = `${description} between ${timeLabel}, lasting around ${durationHours} ${hourLabel}. Peak intensity around ${formatPeakTime(
    peak.time,
    insight.timezone,
  )} (~${peak.probability}% chance).`;

  return createInsightMessage(insight, {
    title,
    description: descriptionText,
    action: meta.action(insight.severity),
    icon: meta.icon,
  });
}
