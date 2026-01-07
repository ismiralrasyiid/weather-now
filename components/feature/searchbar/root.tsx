import Button from "@/components/ui/Button";
import { Autocomplete, Form } from "@base-ui/react";
import Image from "next/image";

export default function Searchbar({ className }: { className?: string }) {
  return (
    <Form className={className} role="search">
      <div className="relative">
        <label
          htmlFor="searchInput"
          className="absolute top-1/2 left-5 -translate-y-1/2 cursor-pointer"
        >
          <Image
            src="/icon-search.svg"
            alt="Search icon"
            width={20}
            height={20}
            aria-hidden
          />
          <span className="sr-only">Search</span>
        </label>
        <Autocomplete.Root>
          <Autocomplete.Input
            id="searchInput"
            className="w-full rounded-xl bg-background-primary py-3.5 pr-10 pl-13.5 placeholder:text-lg placeholder:text-text-secondary"
            placeholder="Search for a place..."
          />
          <Autocomplete.Clear className="absolute top-1/2 right-0 -translate-y-1/2 cursor-pointer p-4 text-lg" />
        </Autocomplete.Root>
      </div>
      <Button className="mt-3 w-full">Search</Button>
    </Form>
  );
}
