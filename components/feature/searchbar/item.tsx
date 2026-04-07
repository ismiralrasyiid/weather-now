import { GeoLocation } from "@/domains/location";
import { Autocomplete } from "@base-ui/react";

export function Item({
  location,
  onClickHandler,
}: {
  location: GeoLocation;
  onClickHandler: () => void;
}) {
  const locationDetails =
    `${location.admin2 ?? ""}, ${location.admin1 ?? ""}, ${location.country ?? ""}`.replace(
      // Replace ", " if there is any undefined prop
      /,\s,\s|^,\s+|,\s+$|/g,
      "",
    );

  return (
    <Autocomplete.Item
      value={location}
      onClick={onClickHandler}
      className="group relative cursor-pointer rounded-t-lg border border-background-primary p-1.75 text-sm data-highlighted:border-border data-highlighted:bg-background-primary-hover"
    >
      <div className="flex flex-col">
        <span>{location.name}</span>
        <span className="text-xs text-text-tertiary">{locationDetails}</span>
      </div>
      <span
        className="absolute bottom-0 left-0 h-px w-full origin-center scale-0 bg-text-tertiary opacity-0 transition-all delay-75 duration-300 ease-out group-hover:scale-100 group-hover:opacity-100"
        aria-hidden
      />
    </Autocomplete.Item>
  );
}
