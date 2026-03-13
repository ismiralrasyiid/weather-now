"use client";

import ScrollArea from "@/components/ui/scroll-area";
import Forecast, { HourlyForecast } from "./forecast";
import Select from "@/components/ui/select";
import clsx from "clsx";
import { Day, dayOptions, days } from "@/domains/time";
import { useState } from "react";

export type HourlyForecastsProps = {
  forecasts: Record<Day, HourlyForecast[]>;
  className?: string;
};

export default function HourlyForecasts(props: HourlyForecastsProps) {
  const { className, forecasts } = props;
  const today = days[new Date().getDay()];
  const [selectDay, setSelectDay] = useState<Day | null>(today);

  return (
    <div
      className={clsx(
        "rounded-xl bg-background-primary px-3.5 py-4",
        className,
      )}
    >
      <div className="mb-3.5 flex justify-between">
        <h3 className="text-lg font-medium">Hourly Forecast</h3>
        <Select<Day>
          items={dayOptions}
          value={selectDay}
          onChange={(value) => setSelectDay(value)}
        />
      </div>
      <ScrollArea
        className="flex h-scrollarea flex-col gap-3.75"
        thumbOffset={-14}
      >
        {forecasts[selectDay ?? today].map((forecast, index) => (
          <Forecast key={`hourly-forecast-${index}`} forecast={forecast} />
        ))}
      </ScrollArea>
    </div>
  );
}
