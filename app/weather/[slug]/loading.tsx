import Headline from "@/components/feature/headline";
import {
  DailyForecastsSkeleton,
  HourlyForecastsSkeleton,
  SearchbarSkeleton,
  WeatherDetailsSkeleton,
  WeatherOverviewSkeleton,
} from "@/components/feature/skeleton";

export default function Loading() {
  return (
    <>
      <main>
        <Headline className="mt-9.5 md:mt-14.5">
          How&#39;s the sky looking today?
        </Headline>
        <SearchbarSkeleton className="mt-8.5 md:mt-13.5" />
        <div className="lg:mt-11 lg:grid lg:grid-cols-3 lg:gap-7.5">
          <div className="lg:col-span-2">
            <WeatherOverviewSkeleton className="mt-7 lg:mt-0" />
            <WeatherDetailsSkeleton className="mt-5 lg:mt-8.5" />
            <DailyForecastsSkeleton className="mt-6.5 lg:mt-9.5" />
          </div>
          <HourlyForecastsSkeleton className="mt-7.5 lg:mt-0" />
        </div>
      </main>
    </>
  );
}
