import ScrollArea from "@/components/ui/scroll-area";
import Forecast, { HourlyForecast } from "./forecast";
import Select from "@/components/ui/select";
import clsx from "clsx";

export type HourlyForecastsProps = {
  forecasts: Array<HourlyForecast>;
  className?: string;
};

const dayOptions = [
  { label: "Monday", value: "monday" },
  { label: "Tuesday", value: "tuesday" },
  { label: "Wednesday", value: "wednesday" },
  { label: "Thursday", value: "thursday" },
  { label: "Friday", value: "friday" },
  { label: "Saturday", value: "saturday" },
  { label: "Sunday", value: "sunday" },
];
const defaultDay = "tuesday";

export default function HourlyForecasts(props: HourlyForecastsProps) {
  const { className, forecasts } = props;
  return (
    <div
      className={clsx(
        "rounded-xl bg-background-primary px-3.5 py-4",
        className,
      )}
    >
      <div className="mb-3.5 flex justify-between">
        <h3 className="text-lg font-medium">Hourly Forecast</h3>
        <Select items={dayOptions} defaultValue={defaultDay} />
      </div>
      <ScrollArea
        className="flex h-scrollarea flex-col gap-3.75"
        thumbOffset={-14}
      >
        {forecasts.map((forecast, index) => (
          <Forecast
            key={`hourly-forecast-${index}`}
            forecast={{ ...forecast, id: `hourly-forecast-${index}` }}
          />
        ))}
      </ScrollArea>
    </div>
  );
}
