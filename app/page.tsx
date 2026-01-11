import { DailyForecasts } from "@/components/feature/daily-forecasts";
import { DailyForecast } from "@/components/feature/daily-forecasts/forecast";
import Headline from "@/components/feature/headline";
import HeroSection from "@/components/feature/hero-section";
import { HourlyForecasts } from "@/components/feature/hourly-forecasts";
import { HourlyForecast } from "@/components/feature/hourly-forecasts/forecast";
import Brand from "@/components/feature/brand";
import { MenuDropdown } from "@/components/feature/menu-dropdown";
import { Searchbar } from "@/components/feature/searchbar";
import { WeatherDetails } from "@/components/feature/weather-details";
import { MetricData } from "@/components/feature/weather-details/metric";

const mockData = {
  metrics: Array.from<MetricData>({ length: 4 }).fill({
    id: "",
    name: "Feels like",
    value: 18,
    unit: "°",
  }),
  dailyForecasts: Array.from<DailyForecast>({ length: 7 }).fill({
    id: "",
    day: "Tue",
    url: "/icon-sunny.webp",
    highestTemp: 20,
    lowestTemp: 14,
    indicator: "Sunny",
  }),
  hourlyForecasts: Array.from<HourlyForecast>({ length: 24 }).fill({
    id: "",
    hour: "3 PM",
    url: "/icon-overcast.webp",
    indicator: "Cloudy",
    temperature: 20,
  }),
};

export default function Home() {
  return (
    <>
      <header className="flex items-center justify-between">
        <Brand />
        <nav>
          <MenuDropdown />
        </nav>
      </header>
      <main>
        <Headline className="mt-9.5 md:mt-14.5" />
        <Searchbar className="mt-8.5 md:mt-13.5" />
        <HeroSection className="mt-7" />
        <WeatherDetails className="mt-5" metrics={mockData.metrics} />
        <DailyForecasts
          className="mt-6.5"
          forecasts={mockData.dailyForecasts}
        />
        <HourlyForecasts
          className="mt-7.5"
          forecasts={mockData.hourlyForecasts}
        />
      </main>
    </>
  );
}
