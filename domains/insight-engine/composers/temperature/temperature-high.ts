import { formatHourRange } from "@/domains/time";
import { Insight, InsightMessage } from "../../core/types";
import { createInsightMessage } from "../create-insight-message";

export function composeTemperatureHigh(
  insight: Insight<"temperature_high">,
): InsightMessage {
  const temperature = insight.signals.temperature;

  const { max, hotHours, unit } = temperature;

  const timeLabel = formatHourRange(insight.timeframe);
  const hourLabel = hotHours === 1 ? "hour" : "hours";

  const title = "Hot temperatures expected";

  const description = `Temperatures reaching up to ${max}${unit} between ${timeLabel}, with around ${hotHours} ${hourLabel} of heat.`;

  const action = "Stay hydrated and limit prolonged sun exposure";
  const icon = "🌡️";

  return createInsightMessage(insight, {
    title,
    description,
    action,
    icon,
  });
}
