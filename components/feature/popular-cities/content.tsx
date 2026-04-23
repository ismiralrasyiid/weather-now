import Infotip from "@/components/ui/infotip";
import { runInsightEngine } from "@/domains/insight-engine/core/engine";
import { allRules } from "@/domains/insight-engine/rules/registry";
import { City } from "@/domains/location";
import {
  buildWeatherSearchParams,
  fetchWeather,
  mapWeatherCode,
  OpenMeteoWeatherResponse,
} from "@/domains/weather";
import clsx from "clsx";
import Image from "next/image";
import InsightRotator from "./insight-rotator";
import { resolveInsightMessages } from "@/domains/insight-engine/composers/registry";

type WeatherResult =
  | { ok: true; data: OpenMeteoWeatherResponse }
  | { ok: false };

async function getWeatherResult(city: string): Promise<WeatherResult> {
  try {
    const data: OpenMeteoWeatherResponse = await fetchWeather(city);
    return { ok: true, data };
  } catch {
    return { ok: false };
  }
}

export default async function Content({
  city,
  unitType,
}: {
  city: City;
  unitType?: string;
}) {
  const result: WeatherResult = await getWeatherResult(
    buildWeatherSearchParams({
      lat: `${city.location.latitude}`,
      lon: `${city.location.longitude}`,
      tzone: `${city.location.timezone}`,
      unitType,
    }).toString(),
  );

  if (result.ok) {
    return <RenderSuccessRequest cityName={city.name} data={result.data} />;
  } else {
    return <RenderFailedRequest cityName={city.name} />;
  }
}

function RenderSuccessRequest({
  cityName,
  data,
}: {
  cityName: string;
  data: OpenMeteoWeatherResponse;
}) {
  const weather = mapWeatherCode(data.current.weather_code);
  const isSunnyIcon = weather.image === "/icon-sunny.webp";

  const insights = runInsightEngine(data, allRules);
  const messages = resolveInsightMessages(insights, data);

  return (
    <>
      <div className="absolute top-0 p-4 text-white">
        <h3 className="text-md mb-1.5 font-semibold tracking-wide">
          {cityName}
        </h3>

        <div className="flex items-center gap-1">
          <p className="text-5xl font-bold tracking-wide">{`${Math.round(data.current.temperature_2m)}${data.current_units.temperature_2m}`}</p>
          <Infotip description={weather.description}>
            <div className="relative size-15 overflow-hidden">
              <Image
                className={clsx({
                  "absolute -top-1/4 size-22 object-cover": isSunnyIcon,
                  "size-15": !isSunnyIcon,
                })}
                src={weather.image}
                alt={weather.description}
                width={44}
                height={44}
              />
            </div>
          </Infotip>
        </div>
      </div>

      <div className="absolute bottom-0 px-4 pb-5">
        <InsightRotator messages={messages} />
      </div>
    </>
  );
}

function RenderFailedRequest({ cityName }: { cityName: string }) {
  return (
    <div className="absolute bottom-0 p-4 text-white">
      <h3 className="text-lg font-semibold">{cityName}</h3>

      <div className="flex h-12 items-end">
        <p className="text-sm text-white/80">
          API request limit reached. Please try again in a few minutes.
        </p>
      </div>
    </div>
  );
}
