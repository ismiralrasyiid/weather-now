import { DailyForecasts } from "@/components/feature/daily-forecasts";
import Headline from "@/components/feature/headline";
import WeatherOverview, {
  WeatherOverviewData,
} from "@/components/feature/weather-overview";
import { HourlyForecasts } from "@/components/feature/hourly-forecasts";
import { WeatherDetails } from "@/components/feature/weather-details";
import { Searchbar } from "@/components/feature/searchbar";
import {
  fetchWeather,
  getDailyForecasts,
  getHourlyForecasts,
  getWeatherMetrics,
  mapWeatherCode,
  openMeteoCurrentWeatherVariables,
  openMeteoDailyWeatherVariables,
  openMeteoHourlyWeatherVariables,
  OpenMeteoWeatherResponse,
  validateWeatherParams,
} from "@/domains/weather";
import { formatDate } from "@/domains/time";
import { notFound } from "next/navigation";

export default async function Weather({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ lat: string; lon: string; tzone: string }>;
}) {
  const { slug } = await params;
  const [locationName, country] = decodeURIComponent(slug).split("-");
  const { lat, lon, tzone } = await searchParams;

  if (!validateWeatherParams({ lat, lon, tzone })) {
    notFound();
  }

  const openMeteoSearchParams = new URLSearchParams({
    latitude: lat,
    longitude: lon,
    timezone: tzone,
    current: openMeteoCurrentWeatherVariables,
    hourly: openMeteoHourlyWeatherVariables,
    daily: openMeteoDailyWeatherVariables,
  });

  const data: OpenMeteoWeatherResponse = await fetchWeather(
    openMeteoSearchParams.toString(),
  );

  const weatherOverview: WeatherOverviewData = {
    location: `${locationName}, ${country}`,
    date: formatDate(data.current.time),
    weather: mapWeatherCode(data.current.weather_code),
    temperature: Math.round(data.current.temperature_2m),
  };

  const weatherMetrics = getWeatherMetrics({
    current: data.current,
    current_units: data.current_units,
  });

  const dailyForecasts = getDailyForecasts(data.daily);

  const hourlyForecasts = getHourlyForecasts(data.hourly);

  return (
    <main>
      <Headline className="mt-9.5 md:mt-14.5">
        How&#39;s the sky looking today?
      </Headline>
      <Searchbar className="mt-8.5 md:mt-13.5" />
      <div className="lg:mt-11 lg:grid lg:grid-cols-3 lg:gap-7.5">
        <div className="lg:col-span-2">
          <WeatherOverview
            className="mt-7 lg:mt-0"
            overview={weatherOverview}
          />
          <WeatherDetails className="mt-5 lg:mt-8.5" metrics={weatherMetrics} />
          <DailyForecasts
            className="mt-6.5 lg:mt-9.5"
            forecasts={dailyForecasts}
          />
        </div>
        <HourlyForecasts
          className="mt-7.5 lg:mt-0"
          forecasts={hourlyForecasts}
        />
      </div>
    </main>
  );
}
