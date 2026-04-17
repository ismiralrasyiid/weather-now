import { Timeframe } from "../types";

export function getTimeframeFromIndices(
  times: string[],
  indices: number[],
): Timeframe {
  const startIndex = indices[0];
  const endIndex = indices[indices.length - 1];

  return {
    start: times[startIndex],
    end: times[endIndex],
  };
}
