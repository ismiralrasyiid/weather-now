import { OpenMeteoWeatherResponse } from "@/domains/weather";
import { AnyInsight, Insight, InsightMessage, RuleType } from "../core/types";
import { composeComfortableWindow } from "./temperature/comfortable-window";
import { composeFeelsLikeHigh } from "./temperature/feelslike-high";
import { composeFeelsLikePeakHours } from "./temperature/feelslike-peak-hours";
import { composeTemperatureFeelsLikeGap } from "./temperature/temperature-feelslike-gap";
import { composeTemperatureHigh } from "./temperature/temperature-high";
import { composeTemperatureLow } from "./temperature/temperature-low";
import { composeWeatherEvent } from "./weather/weather-event";
import { composeFallback } from "./fallback";

type ComposerMap = {
  [K in RuleType]: (insight: Insight<K>) => InsightMessage;
};

const composerMap: ComposerMap = {
  comfortable_window: composeComfortableWindow,
  feelslike_high: composeFeelsLikeHigh,
  feelslike_peak_hours: composeFeelsLikePeakHours,
  temperature_feelslike_gap: composeTemperatureFeelsLikeGap,
  temperature_high: composeTemperatureHigh,
  temperature_low: composeTemperatureLow,
  weather_event: composeWeatherEvent,
};

export function composeInsightMessage<T extends RuleType>(
  insight: Insight<T>,
): InsightMessage {
  const composer = composerMap[insight.type];

  if (!composer) {
    throw new Error(`No composer found for insight type: ${insight.type}`);
  }

  return composer(insight);
}

export function resolveInsightMessages(
  insights: AnyInsight[],
  fallbackData: OpenMeteoWeatherResponse,
): InsightMessage[] {
  if (insights.length === 0) {
    return [
      composeFallback({
        temp: Math.round(fallbackData.current.temperature_2m),
        apparentTemp: Math.round(fallbackData.current.apparent_temperature),
        tempUnit: fallbackData.current_units.temperature_2m,
      }),
    ];
  }

  return insights.map((insight) => composeInsightMessage(insight));
}
