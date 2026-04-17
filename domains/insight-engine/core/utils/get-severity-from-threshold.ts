import { Severity } from "../types";

export function getSeverityFromThreshold(
  value: number,
  threshold: { low: number; medium: number; high: number },
): Severity {
  if (value >= threshold.high) return "high";
  if (value >= threshold.medium) return "medium";
  return "low";
}
