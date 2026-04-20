import { Rule } from "../core/types";
import { comfortableWindowRule } from "./temperature/comfortable-window";
import { feelsLikeHighRule } from "./temperature/feelslike-high";
import { feelsLikePeakHoursRule } from "./temperature/feelslike-peak-hours";
import { temperatureFeelsLikeGapRule } from "./temperature/temperature-feelslike-gap";
import { temperatureHighRule } from "./temperature/temperature-high";
import { temperatureLowRule } from "./temperature/temperature-low";

export const temperatureRules: Rule[] = [
  temperatureHighRule,
  feelsLikeHighRule,
  feelsLikePeakHoursRule,
  temperatureFeelsLikeGapRule,
  temperatureLowRule,
  comfortableWindowRule,
];

export const allRules: Rule[] = [...temperatureRules];
