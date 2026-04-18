import { Severity } from "../types";

export function getSeverityFromThreshold(
  value: number,
  threshold: { low: number; medium: number; high: number },
  direction: "asc" | "desc" = "asc",
): Severity {
  if (direction === "asc") {
    if (value >= threshold.high) return "high";
    if (value >= threshold.medium) return "medium";
    return "low";
  }

  // desc
  if (value <= threshold.high) return "high";
  if (value <= threshold.medium) return "medium";
  return "low";
}
