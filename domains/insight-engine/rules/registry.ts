import { Rule } from "../core/types";
import { feelsLikeHighRule } from "./temperature/feelslike-high";
import { temperatureHighRule } from "./temperature/temperature-high";
import { temperatureLowRule } from "./temperature/temperature-low";

export const temperatureRules: Rule[] = [
  temperatureHighRule,
  feelsLikeHighRule,
  temperatureLowRule,
];

export const allRules: Rule[] = [...temperatureRules];
