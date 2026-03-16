import Infotip from "@/components/ui/infotip";
import Image from "next/image";

export type HourlyForecast = {
  hour: string;
  image: string;
  description: string;
  temperature: number;
};

export type ForecastProps = {
  forecast: HourlyForecast;
};

export default function Forecast(props: ForecastProps) {
  const { forecast } = props;

  return (
    <div className="flex items-center justify-between rounded-lg border border-border bg-background-secondary p-2">
      <div className="flex items-center gap-2">
        <Infotip description={forecast.description}>
          <Image
            src={forecast.image}
            alt={forecast.description}
            width={36}
            height={36}
          />
        </Infotip>
        <p className="text-lg">{forecast.hour}</p>
      </div>
      <p
        className="text-sm"
        aria-label={`Temperature ${forecast.temperature} degree`}
      >
        {forecast.temperature}&deg;
      </p>
    </div>
  );
}
