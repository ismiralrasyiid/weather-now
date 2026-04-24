import { InsightMessage } from "../core/types";

type Evaluation = "hotter" | "colder" | "same";

function evaluateTemperature(temp: number, feelsLike: number): Evaluation {
  if (feelsLike > temp) return "hotter";
  if (feelsLike < temp) return "colder";
  return "same";
}

const EVALUATION_META: Record<
  Evaluation,
  {
    title: string;
    description: string;
    action: string;
    icon: string;
  }
> = {
  hotter: {
    title: "Feels hotter than it looks",
    description: "Conditions may feel warmer than the actual temperature.",
    action: "Stay hydrated and dress light",
    icon: "🔥",
  },
  colder: {
    title: "Feels colder than it looks",
    description: "It may feel cooler than the actual temperature.",
    action: "Consider wearing an extra layer",
    icon: "❄️",
  },
  same: {
    title: "Feels as expected",
    description: "The perceived temperature matches actual conditions.",
    action: "No special precautions needed",
    icon: "🌡️",
  },
};

export function composeFallback({
  temp,
  apparentTemp,
  tempUnit,
}: {
  temp: number;
  apparentTemp: number;
  tempUnit: string;
}): InsightMessage {
  const evaluation = evaluateTemperature(temp, apparentTemp);
  const meta = EVALUATION_META[evaluation];
  const description = `Feels like ${apparentTemp}${tempUnit} now. ${meta.description}`;

  return {
    id: "fallback-insight",
    title: meta.title,
    description,
    action: meta.action,
    icon: meta.icon,
    confidence: 1,
    severity: "low",
  };
}
