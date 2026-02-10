import clsx from "clsx";
import Forecast, { DailyForecast } from "./forecast";

export type DailyForecastsProps = {
  forecasts: Array<DailyForecast>;
  className?: string;
};

export default function DailyForecasts(props: DailyForecastsProps) {
  const { forecasts, className } = props;

  return (
    <div className={clsx(className)}>
      <h3 className="mb-4 text-lg font-medium">Daily Forecast</h3>
      <div className="grid grid-cols-3 gap-3.5 md:grid-cols-7">
        {forecasts.map((forecast, index) => (
          <Forecast
            key={`daily-forecast-${index}`}
            forecast={{ ...forecast, id: `daily-forecast-${index}` }}
          />
        ))}
      </div>
    </div>
  );
}
