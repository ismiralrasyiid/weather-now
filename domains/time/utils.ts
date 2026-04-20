import { DayPeriod } from "./types";

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

export function getHourFromDateString(dateString: string): number {
  return new Date(dateString).getHours();
}
