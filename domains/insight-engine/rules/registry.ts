import { Rule } from "../core/types";
import { temperatureHighRule } from "./temperature/temperature-high";

export const temperatureRules: Rule[] = [temperatureHighRule];

export const allRules: Rule[] = [...temperatureRules];
