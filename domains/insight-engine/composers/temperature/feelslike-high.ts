import { formatHourRange } from "@/domains/time";
import { Insight, InsightMessage } from "../../core/types";
import { createInsightMessage } from "../create-insight-message";

export function composeFeelsLikeHigh(
  insight: Insight<"feelslike_high">,
): InsightMessage {
  const feelsLike = insight.signals.feelsLike;

  const { max, hotHours, unit } = feelsLike;

  const timeLabel = formatHourRange(insight.timeframe);
  const hourLabel = hotHours === 1 ? "hour" : "hours";

  const title = "Hot & humid conditions ahead";

  const description = `Feels like up to ${max}${unit} between ${timeLabel}, with around ${hotHours} ${hourLabel} of intense heat.`;

  const action = "Limit prolonged sun exposure and stay hydrated";
  const icon = "🥵";

  return createInsightMessage(insight, {
    title,
    description,
    action,
    icon,
  });
}
