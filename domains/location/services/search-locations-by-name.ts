import { searchApi } from "../constants";
import { GeoLocation } from "../types";

export async function searchLocationsByName(
  name: string,
  options?: { signal?: AbortSignal },
): Promise<ReadonlyArray<GeoLocation>> {
  const response = await fetch(`${searchApi}?name=${name}`, {
    signal: options?.signal,
  });

  if (!response.ok) {
    throw new Error("Failed to fetch locations");
  }

  const data = await response.json();

  return data.results;
}
