import Spinner from "@/components/ui/spinner";
import { Autocomplete } from "@base-ui/react";

export function Status({ isTyping }: { isTyping: boolean }) {
  return (
    <Autocomplete.Status>
      <div className="flex items-center gap-2 py-1 pr-8 pl-4 text-sm text-text-tertiary">
        <Spinner />
        {isTyping ? "Typing..." : "Loading..."}
      </div>
    </Autocomplete.Status>
  );
}
