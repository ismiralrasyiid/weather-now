"use client";

import Button from "@/components/ui/button";
import { useSearchLocation } from "@/domains/location/hooks/use-search-location";
import { Autocomplete, Form } from "@base-ui/react";
import clsx from "clsx";
import Image from "next/image";
import { useMemo, useRef, useState } from "react";

export default function Searchbar({ className }: { className?: string }) {
  const [searchInput, setSearchInput] = useState("");
  const { data, isFetching, isTyping } = useSearchLocation(searchInput);
  const safeData = useMemo(() => (data ? [...data] : []), [data]);
  const isSelectingRef = useRef(false);

  const showStatus = isTyping || isFetching;

  const onValueChangeHandler = (value: string) => {
    if (isSelectingRef.current) {
      isSelectingRef.current = false;
      return;
    }
    setSearchInput(value);
  };

  const onClickHandler = () => {
    isSelectingRef.current = true;
  };

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
        <Autocomplete.Root
          items={safeData}
          onValueChange={onValueChangeHandler}
          itemToStringValue={(item) => item.name.toLowerCase()}
        >
          <Autocomplete.Input
            id="searchInput"
            className="w-full rounded-xl bg-background-primary py-3.5 pr-10 pl-13.5 placeholder:text-lg placeholder:text-text-secondary md:w-search-input"
            placeholder="Search for a place..."
          />
          <Autocomplete.Clear className="absolute top-1/2 right-0 -translate-y-1/2 cursor-pointer p-4 text-lg" />
          <Autocomplete.Portal>
            <Autocomplete.Positioner sideOffset={9}>
              <Autocomplete.Popup className="w-search-popup-mobile rounded-lg bg-background-primary p-1.75 text-text-primary md:w-search-popup-desktop">
                {showStatus ? (
                  <Autocomplete.Status>
                    <div className="flex items-center gap-2 py-1 pr-8 pl-4 text-sm text-text-tertiary">
                      <div
                        className="size-4 animate-spin rounded-full border-2 border-gray-200 border-t-gray-600"
                        aria-hidden
                      />
                      {isTyping ? "Typing..." : "Loading..."}
                    </div>
                  </Autocomplete.Status>
                ) : null}
                <Autocomplete.Empty className="p-1.75 text-sm text-text-secondary empty:p-0">
                  {searchInput.length < 2
                    ? "Search input should be 2 characters or more!"
                    : !data
                      ? null
                      : data.length
                        ? null
                        : "Place not found!"}
                </Autocomplete.Empty>
                <Autocomplete.List className="flex flex-col gap-1">
                  {(item) => (
                    <Autocomplete.Item
                      key={item.id}
                      value={item}
                      onClick={onClickHandler}
                      className="cursor-pointer rounded-lg border border-background-primary p-1.75 text-sm data-highlighted:border-border data-highlighted:bg-background-primary-hover"
                    >
                      <div className="flex flex-col">
                        <span>{item.name}</span>
                        <span className="text-xs text-text-tertiary">
                          {`${item.admin2 ?? ""}, ${item.admin1 ?? ""}, ${item.country ?? ""}`.replace(
                            /,\s,\s|^,\s+|,\s+$|/g,
                            "",
                          )}
                        </span>
                      </div>
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
