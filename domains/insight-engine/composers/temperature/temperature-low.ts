import { formatHourRange } from "@/domains/time";
import { Insight, InsightMessage } from "../../core/types";
import { createInsightMessage } from "../create-insight-message";

export function composeTemperatureLow(
  insight: Insight<"temperature_low">,
): InsightMessage {
  const temperature = insight.signals.temperature;

  const { min, coldHours, unit } = temperature;

  const timeLabel = formatHourRange(insight.timeframe);
  const hourLabel = coldHours === 1 ? "hour" : "hours";

  const title = "Cooler temperatures ahead";

  const description = `Temperatures around ${min}${unit} between ${timeLabel}, with about ${coldHours} ${hourLabel} of cooler conditions.`;

  const action = "Consider wearing an extra layer to stay comfortable";
  const icon = "🧥";

  return createInsightMessage(insight, {
    title,
    description,
    action,
    icon,
  });
}
