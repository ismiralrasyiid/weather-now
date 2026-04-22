import { formatHourRange } from "@/domains/time";
import { Insight, InsightMessage } from "../../core/types";
import { createInsightMessage } from "../create-insight-message";

export function composeFeelsLikePeakHours(
  insight: Insight<"feelslike_peak_hours">,
): InsightMessage {
  const peak = insight.signals.peak;

  const { feelsLike, duration, unit } = peak;

  const timeLabel = formatHourRange(insight.timeframe);
  const hourLabel = duration === 1 ? "hour" : "hours";

  const title = "Peak heat window expected";

  const description = `Feels like reaching ${feelsLike}${unit} between ${timeLabel}, with around ${duration} ${hourLabel} of peak heat.`;

  const action = "Avoid outdoor activities during this period if possible";
  const icon = "🔥";

  return createInsightMessage(insight, {
    title,
    description,
    action,
    icon,
  });
}
