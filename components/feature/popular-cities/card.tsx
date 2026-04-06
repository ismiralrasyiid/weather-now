import Image from "next/image";
import Content from "./content";
import { Suspense } from "react";
import Fallback from "./fallback";
import { City, mapCityToGeoLocation } from "@/domains/location";
import { getWeatherPageUrl } from "@/domains/weather";
import Link from "next/link";

export default function Card({
  city,
  unitType,
}: {
  city: City;
  unitType?: string;
}) {
  return (
    <Link href={getWeatherPageUrl(mapCityToGeoLocation(city))}>
      <div className="group relative cursor-pointer overflow-hidden rounded-2xl">
        <Image
          src={city.image}
          alt={city.name}
          className="h-56 w-89 object-cover transition duration-300 group-hover:scale-105"
          width={356}
          height={224}
          priority
          fetchPriority="high"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent" />

        <Suspense fallback={<Fallback name={city.name} />}>
          <Content city={city} unitType={unitType} />
        </Suspense>
      </div>
    </Link>
  );
}
