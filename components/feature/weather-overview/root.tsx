import Infotip from "@/components/ui/infotip";
import { WeatherInfo } from "@/domains/weather";
import clsx from "clsx";
import Image from "next/image";
import { InsightRotator } from "./insight-rotator";
import { InsightMessage } from "@/domains/insight-engine/core/types";

export type WeatherOverviewData = {
  location: string;
  date: string;
  temperature: number;
  weather: WeatherInfo;
};

export type WeatherOverviewProps = {
  className?: string;
  overview: WeatherOverviewData;
  messages: InsightMessage[];
};

export function WeatherOverview({
  className,
  overview,
  messages,
}: WeatherOverviewProps) {
  const { location, date, weather, temperature } = overview;

  return (
    <div
      className={clsx(
        "h-hero-section rounded-xl bg-[url(@/public/bg-today-small.svg)] bg-cover bg-center p-4 md:bg-[url(@/public/bg-today-large.svg)] md:px-8 md:pb-6",
        className,
      )}
    >
      <div className="flex h-full flex-col justify-between">
        <div className="flex flex-col items-center md:flex-row md:justify-between">
          <div className="text-center md:text-left">
            <h2 className="text-hero-section-city font-semibold capitalize">
              {location}
            </h2>
            <p className="text-text-secondary">{date}</p>
          </div>
          <div className="flex items-center">
            <Infotip description={weather.description} forOverview>
              <Image
                className="size-22.5"
                src={weather.image}
                alt={weather.description}
                width={90}
                height={90}
              />
            </Infotip>
            <p className="text-6xl leading-none font-semibold">
              <span className="inline-block -skew-x-8">{temperature}</span>
              &deg;
            </p>
          </div>
        </div>
        <InsightRotator messages={messages} />
      </div>
    </div>
  );
}
