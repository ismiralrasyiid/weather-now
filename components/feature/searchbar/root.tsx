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
import { useRouter } from "next/navigation";
import { getWeatherPageUrl } from "@/domains/weather";

export default function Searchbar({ className }: { className?: string }) {
  const [searchInput, setSearchInput] = useState("");
  const { data, isFetching, isTyping, isPaused } =
    useSearchLocation(searchInput);
  const safeData = useMemo(() => (data ? [...data] : []), [data]);
  const isSelectingRef = useRef(false);

  const router = useRouter();

  const showStatus = isTyping || isFetching;

  const onValueChangeHandler = (value: string) => {
    if (isSelectingRef.current) {
      isSelectingRef.current = false;
      router.push(value);
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
          itemToStringValue={(item) => getWeatherPageUrl(item)}
          value={searchInput}
          filter={null}
        >
          <Autocomplete.Input
            id="searchInput"
            className="w-full rounded-xl bg-background-primary py-3.5 pr-10 pl-13.5 transition-all placeholder:text-lg placeholder:text-text-secondary focus:ring-1 focus:ring-text-secondary focus:outline-none md:w-search-input"
            placeholder="Search for a place..."
          />
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
      <Button
        className="mt-3 w-full py-4 text-sm transition-all focus:ring-2 focus:ring-accent-primary focus:ring-offset-3 focus:ring-offset-background-body focus:outline-none md:mt-0 md:w-auto"
        onClick={() => setSearchInput("")}
      >
        Clear Input
      </Button>
    </Form>
  );
}
