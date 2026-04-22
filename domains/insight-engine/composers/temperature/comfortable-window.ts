import {
  ActiveDayPeriod,
  assertActiveDayPeriod,
  formatHourRange,
} from "@/domains/time";
import { Insight, InsightMessage } from "../../core/types";
import { createInsightMessage } from "../create-insight-message";

const PERIOD_META: Record<ActiveDayPeriod, { action: string; icon: string }> = {
  morning: {
    action: "Nice time for a morning walk",
    icon: "🌤️",
  },
  afternoon: {
    action: "Good window for outdoor plans",
    icon: "☀️",
  },
  evening: {
    action: "Pleasant time to unwind outside",
    icon: "🌇",
  },
};

export function composeComfortableWindow(
  insight: Insight<"comfortable_window">,
): InsightMessage {
  const comfortWindow = insight.signals.comfortWindow;

  const temp = comfortWindow.temperature.avg;
  const feels = comfortWindow.feelsLike.avg;
  const unit = comfortWindow.temperature.unit;
  const hours = comfortWindow.duration.hours;
  const period = comfortWindow.duration.type;

  assertActiveDayPeriod(period);

  const timeLabel = formatHourRange(insight.timeframe);
  const hourLabel = hours === 1 ? "hour" : "hours";

  const metaUI = PERIOD_META[period];

  const title = `Comfortable ${period} ahead`;

  const description = `Expect ~${hours} ${hourLabel} of comfortable weather between ${timeLabel}, with temperatures around ${temp}${unit} (feels like ${feels}${unit}).`;

  return createInsightMessage(insight, {
    title,
    description,
    action: metaUI.action,
    icon: metaUI.icon,
  });
}
