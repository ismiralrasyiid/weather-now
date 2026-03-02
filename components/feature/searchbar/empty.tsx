import { GeoLocation } from "@/domains/location";
import { Autocomplete } from "@base-ui/react";

export type EmptyProps = {
  isTyping: boolean;
  isPaused: boolean;
  searchInput: string;
  data: ReadonlyArray<GeoLocation> | undefined;
};

export function Empty(props: EmptyProps) {
  const { isTyping, isPaused, searchInput, data } = props;

  let message: string | null = null;

  if (!isTyping && searchInput.length < 2) {
    message = "Search input should be 2 characters or more!";
  }

  if (isPaused) {
    message = "No network connection!";
  }

  if (data && data.length === 0) {
    message = "Place not found!";
  }

  return (
    <Autocomplete.Empty className="p-1.75 text-sm text-text-secondary empty:p-0">
      {message}
    </Autocomplete.Empty>
  );
}
