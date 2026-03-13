import { WeatherInfo } from "@/domains/weather";
import clsx from "clsx";
import Image from "next/image";

export type WeatherOverviewData = {
  location: string;
  date: string;
  temperature: number;
  weather: WeatherInfo;
};

export type WeatherOverviewProps = {
  className?: string;
  overview: WeatherOverviewData;
};

export default function WeatherOverview({
  className,
  overview,
}: WeatherOverviewProps) {
  const { location, date, weather, temperature } = overview;

  return (
    <div
      className={clsx(
        "flex h-hero-section flex-col items-center justify-center rounded-xl bg-[url(@/public/bg-today-small.svg)] bg-cover bg-center md:flex-row md:justify-between md:bg-[url(@/public/bg-today-large.svg)] md:p-5",
        className,
      )}
    >
      <div className="text-center md:text-left">
        <h2 className="text-hero-section-city font-semibold capitalize">
          {location}
        </h2>
        <p className="text-text-secondary">{date}</p>
      </div>
      <div className="flex items-center">
        <Image
          src={weather.image}
          alt={weather.description}
          width={110}
          height={110}
        />
        <p className="text-hero-section-degree font-semibold">
          <span className="inline-block -skew-x-8">{temperature}</span>
          &deg;
        </p>
      </div>
    </div>
  );
}
