import Infotip from "@/components/ui/infotip";
import { City } from "@/domains/location";
import {
  buildWeatherSearchParams,
  fetchWeather,
  mapWeatherCode,
  OpenMeteoWeatherResponse,
} from "@/domains/weather";
import clsx from "clsx";
import Image from "next/image";

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

function getApparentTemperature(
  data: Pick<OpenMeteoWeatherResponse, "current" | "current_units">,
): string {
  return `Feels like ${Math.round(data.current.apparent_temperature)}${data.current_units.apparent_temperature}`;
}

function getApparentTemperatureComparison(
  data: Pick<OpenMeteoWeatherResponse, "current" | "current_units">,
): string {
  if (
    Math.round(data.current.apparent_temperature) >
    Math.round(data.current.temperature_2m)
  )
    return "🔥 Hotter than usual";
  if (
    Math.round(data.current.apparent_temperature) <
    Math.round(data.current.temperature_2m)
  )
    return "❄️ Colder than usual";
  return "🌡️ Feels the same";
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

  return (
    <div className="absolute bottom-0 p-4 text-white">
      <h3 className="text-lg font-semibold">{cityName}</h3>

      <div className="h-12">
        <div className="flex items-center gap-1">
          <p className="text-xl font-bold">{`${Math.round(data.current.temperature_2m)}${data.current_units.temperature_2m}`}</p>
          <Infotip description={weather.description}>
            <div className="relative size-7 overflow-hidden">
              <Image
                className={clsx({
                  "absolute -top-1/4 size-11 object-cover": isSunnyIcon,
                  "size-7": !isSunnyIcon,
                })}
                src={weather.image}
                alt={weather.description}
                width={44}
                height={44}
              />
            </div>
          </Infotip>
        </div>

        <p className="text-sm text-white/80">
          {getApparentTemperature(data)}
          {" - "}
          {getApparentTemperatureComparison(data)}
        </p>
      </div>
    </div>
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
