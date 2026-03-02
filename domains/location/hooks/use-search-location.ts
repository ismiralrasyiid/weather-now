"use client";

import { useQuery } from "@tanstack/react-query";
import { searchLocationsByName } from "../services/search-locations-by-name";
import { useDebounce } from "@/hooks/use-debounce";

export function useSearchLocation(name: string) {
  const debouncedName = useDebounce(name, 300);
  const isTyping = debouncedName !== name;

  const query = useQuery({
    queryKey: ["location", "search", debouncedName],
    queryFn: ({ signal }) => searchLocationsByName(debouncedName, { signal }),
    enabled: debouncedName.length > 1,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  return { ...query, isTyping };
}
