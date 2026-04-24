import { dayAbbreviations, days } from "./constants";

export type Day = (typeof days)[number];

export type DayAbbreviation = (typeof dayAbbreviations)[number];

export type DayPeriod = "morning" | "afternoon" | "evening" | "night";

export type ActiveDayPeriod = Exclude<DayPeriod, "night">;
