import { Autocomplete } from "@base-ui/react";

export function Status({ isTyping }: { isTyping: boolean }) {
  return (
    <Autocomplete.Status>
      <div className="flex items-center gap-2 py-1 pr-8 pl-4 text-sm text-text-tertiary">
        <div
          className="size-4 animate-spin rounded-full border-2 border-gray-200 border-t-gray-600"
          aria-hidden
        />
        {isTyping ? "Typing..." : "Loading..."}
      </div>
    </Autocomplete.Status>
  );
}
