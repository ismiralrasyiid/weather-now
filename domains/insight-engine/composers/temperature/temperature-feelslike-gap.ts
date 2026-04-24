import { formatHourRange } from "@/domains/time";
import { Insight, InsightMessage } from "../../core/types";
import { createInsightMessage } from "../create-insight-message";

export function composeTemperatureFeelsLikeGap(
  insight: Insight<"temperature_feelslike_gap">,
): InsightMessage {
  const gap = insight.signals;

  const { feelsLikeDelta, temperature, feelsLike } = gap;

  const timeLabel = formatHourRange(insight.timeframe);

  const title = "Feels hotter than it looks";

  const description = `Temperatures around ${temperature.avg}${temperature.unit} between ${timeLabel}, but it can feel like ${feelsLike.avg}${feelsLike.unit} — roughly ${feelsLikeDelta.avg}${feelsLikeDelta.unit} higher on average.`;

  const action = "Dress light and stay hydrated to stay comfortable";
  const icon = "🌡️";

  return createInsightMessage(insight, {
    title,
    description,
    action,
    icon,
  });
}
