import { Rule } from "../core/types";
import { feelsLikeHighRule } from "./temperature/feelslike-high";
import { temperatureHighRule } from "./temperature/temperature-high";

export const temperatureRules: Rule[] = [
  temperatureHighRule,
  feelsLikeHighRule,
];

export const allRules: Rule[] = [...temperatureRules];
