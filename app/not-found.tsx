// "use client";

import Headline from "@/components/feature/headline";
import { Searchbar } from "@/components/feature/searchbar";

export default function NotFound() {
  return (
    <main>
      <Headline className="mt-9.5 md:mt-14.5">
        How&#39;s the sky looking today?
      </Headline>
      <Searchbar className="mt-8.5 md:mt-13.5" />
      <p className="mt-12 text-center text-2xl font-semibold">
        No search result found!
      </p>
    </main>
  );
}
