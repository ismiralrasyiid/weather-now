import Image from "next/image";

export type DailyForecast = {
  id: string;
  day: string;
  url: string;
  highestTemp: number;
  lowestTemp: number;
  indicator: string;
};

export type ForecastProps = {
  forecast: DailyForecast;
};

export default function Forecast(props: ForecastProps) {
  const { forecast } = props;

  return (
    <div className="flex grow flex-col items-center gap-2.5 rounded-xl border border-border bg-background-primary p-3">
      <p>{forecast.day}</p>
      <Image
        src={forecast.url}
        alt={forecast.indicator}
        width={60}
        height={60}
      />
      <div className="flex w-full justify-between text-sm">
        <p>
          <span className="sr-only">Highest temperature:</span>
          {forecast.highestTemp}&deg;
        </p>
        <p>
          <span className="sr-only">Lowest temperature:</span>
          {forecast.lowestTemp}&deg;
        </p>
      </div>
    </div>
  );
}
