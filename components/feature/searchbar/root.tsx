"use client";

import Button from "@/components/ui/button";
import { Autocomplete, Form } from "@base-ui/react";
import clsx from "clsx";
import Image from "next/image";

const items = [
  { id: "p1", value: "Pesanggrahan" },
  { id: "p2", value: "Ketetang" },
  { id: "p3", value: "Dlemer" },
  { id: "p4", value: "Tebul" },
  { id: "p5", value: "Karanganyar" },
  { id: "p6", value: "Batah" },
];

export default function Searchbar({ className }: { className?: string }) {
  return (
    <Form
      className={clsx(
        "md:flex md:items-center md:justify-center md:gap-3.5",
        className,
      )}
      role="search"
    >
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
        <Autocomplete.Root items={items}>
          <Autocomplete.Input
            id="searchInput"
            className="w-full rounded-xl bg-background-primary py-3.5 pr-10 pl-13.5 placeholder:text-lg placeholder:text-text-secondary md:w-search-input"
            placeholder="Search for a place..."
          />
          <Autocomplete.Clear className="absolute top-1/2 right-0 -translate-y-1/2 cursor-pointer p-4 text-lg" />
          <Autocomplete.Portal>
            <Autocomplete.Positioner sideOffset={9}>
              <Autocomplete.Popup className="w-search-popup-mobile rounded-lg bg-background-primary p-1.75 text-text-primary md:w-search-popup-desktop">
                <Autocomplete.Empty className="p-1.75 text-sm text-text-secondary empty:p-0">
                  Place not found!
                </Autocomplete.Empty>
                <Autocomplete.List className="flex flex-col gap-1">
                  {(item) => (
                    <Autocomplete.Item
                      key={item.id}
                      value={item}
                      className="cursor-pointer rounded-lg border border-background-primary p-1.75 text-sm hover:border-border hover:bg-background-primary-hover"
                    >
                      {item.value}
                    </Autocomplete.Item>
                  )}
                </Autocomplete.List>
              </Autocomplete.Popup>
            </Autocomplete.Positioner>
          </Autocomplete.Portal>
        </Autocomplete.Root>
      </div>
      <Button className="mt-3 w-full md:mt-0 md:w-auto">Search</Button>
    </Form>
  );
}
