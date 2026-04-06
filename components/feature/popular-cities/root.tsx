import { popularCities } from "@/domains/location";
import Card from "./card";
import clsx from "clsx";

export default function PopularCities({
  className,
  unitType,
}: {
  className?: string;
  unitType?: string;
}) {
  return (
    <div className={clsx(className)}>
      <h2 className="mb-4 text-center text-lg font-medium xl:text-left">
        Popular Cities
      </h2>
      <div className="flex flex-wrap justify-center gap-2.5">
        {popularCities.map((city, index) => (
          <Card key={`popular-city-${index}`} city={city} unitType={unitType} />
        ))}
      </div>
    </div>
  );
}
