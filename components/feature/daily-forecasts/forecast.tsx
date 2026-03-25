import Infotip from "@/components/ui/infotip";
import Image from "next/image";

export type DailyForecast = {
  day: string;
  image: string;
  highestTemp: number;
  lowestTemp: number;
  description: string;
};

export type ForecastProps = {
  forecast: DailyForecast;
};

export default function Forecast(props: ForecastProps) {
  const { forecast } = props;

  return (
    <div className="flex grow flex-col items-center gap-2.5 rounded-xl border border-border bg-background-primary px-2 py-3">
      <p className="capitalize">{forecast.day}</p>
      <Infotip description={forecast.description}>
        <Image
          src={forecast.image}
          alt={forecast.description}
          width={60}
          height={60}
        />
      </Infotip>
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
