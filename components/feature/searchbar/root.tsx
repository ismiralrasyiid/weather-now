"use client";

import Button from "@/components/ui/button";
import { useSearchLocation } from "@/domains/location/hooks/use-search-location";
import { Autocomplete, Form } from "@base-ui/react";
import clsx from "clsx";
import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import { Empty } from "./empty";
import { Status } from "./status";
import { Item } from "./item";

export default function Searchbar({ className }: { className?: string }) {
  const [searchInput, setSearchInput] = useState("");
  const { data, isFetching, isTyping, isPaused } =
    useSearchLocation(searchInput);
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
              <Autocomplete.Popup className="w-search-popup-mobile rounded-lg border border-border bg-background-primary p-1.75 text-text-primary md:w-search-popup-desktop">
                {showStatus ? (
                  <Status isTyping={isTyping} />
                ) : (
                  <>
                    <Empty
                      isPaused={isPaused}
                      searchInput={searchInput}
                      data={data}
                    />
                    <Autocomplete.List className="flex flex-col gap-1">
                      {(item) => (
                        <Item
                          key={item.id}
                          location={item}
                          onClickHandler={onClickHandler}
                        />
                      )}
                    </Autocomplete.List>
                  </>
                )}
              </Autocomplete.Popup>
            </Autocomplete.Positioner>
          </Autocomplete.Portal>
        </Autocomplete.Root>
      </div>
      <Button className="mt-3 w-full md:mt-0 md:w-auto">Search</Button>
    </Form>
  );
}
