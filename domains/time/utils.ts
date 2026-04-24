import { ActiveDayPeriod, DayPeriod } from "./types";

const hourFormatter = new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  hour12: true,
});

export function formatHour12FromDate(dateString: string) {
  return hourFormatter.format(new Date(dateString));
}

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  month: "short",
  day: "numeric",
  year: "numeric",
});

export function formatDate(dateString: string) {
  return dateFormatter.format(new Date(dateString));
}

function isValidTimeZone(timeZone: string) {
  try {
    new Intl.DateTimeFormat("en-US", { timeZone });
    return true;
  } catch {
    return false;
  }
}

export function getDayIndexByTZ(timeZone: string | null): number {
  if (!timeZone || !isValidTimeZone(timeZone)) {
    return new Date().getDay();
  }

  const tzDate = new Date().toLocaleString("en-US", { timeZone });
  return new Date(tzDate).getDay();
}

export function slice24Hours<T>(arr: readonly T[]): T[] {
  return arr.slice(0, 24);
}

export function getDayPeriod(hour: number): DayPeriod {
  if (!Number.isInteger(hour) || hour < 0 || hour > 23) {
    throw new Error("Hour must be an integer between 0 and 23");
  }

  if (hour < 5) return "night";
  if (hour < 12) return "morning";
  if (hour < 17) return "afternoon";
  if (hour < 21) return "evening";

  return "night";
}

export function assertActiveDayPeriod(
  period: DayPeriod,
): asserts period is ActiveDayPeriod {
  if (period === "night") {
    throw new Error("Unexpected night period");
  }
}

export function getHourFromDateString(dateString: string): number {
  return new Date(dateString).getHours();
}

const formatterCache = new Map<string, Intl.DateTimeFormat>();
export function createHourFormatterFromTZ(
  timezone: string,
): Intl.DateTimeFormat {
  const key = `en-US-${timezone}-hour12`;

  if (formatterCache.has(key)) {
    return formatterCache.get(key)!;
  }

  try {
    const formatter = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      hour12: true,
      timeZone: timezone,
    });

    formatterCache.set(key, formatter);
    return formatter;
  } catch {
    return hourFormatter;
  }
}

export function formatHourRange(
  timeframe: { start: string; end: string },
  opt?: {
    timezone?: string;
  },
): string {
  const start = new Date(timeframe.start);
  const end = new Date(timeframe.end);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return "invalid time";
  }

  let formatter = hourFormatter;
  if (opt?.timezone) formatter = createHourFormatterFromTZ(opt?.timezone);

  const startParts = formatter.formatToParts(start);
  const endParts = formatter.formatToParts(end);

  const getPart = (
    type: "hour" | "dayPeriod",
    parts: Intl.DateTimeFormatPart[],
  ) => parts.find((p) => p.type === type)?.value;

  const startHour = getPart("hour", startParts);
  const endHour = getPart("hour", endParts);

  const startPeriod = getPart("dayPeriod", startParts);
  const endPeriod = getPart("dayPeriod", endParts);

  if (!startHour || !endHour || !startPeriod || !endPeriod) {
    return "invalid time";
  }

  if (start.getTime() === end.getTime()) {
    return `${startHour} ${startPeriod}`;
  }

  if (startPeriod === endPeriod) {
    return `${startHour}–${endHour} ${endPeriod}`;
  }

  return `${startHour} ${startPeriod} – ${endHour} ${endPeriod}`;
}
