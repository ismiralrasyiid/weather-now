import clsx from "clsx";
import Metric, { MetricData } from "./metric";

export type WeatherDetailsProps = {
  className?: string;
  metrics: Array<MetricData>;
};

export default function WeatherDetails(props: WeatherDetailsProps) {
  const { metrics, className } = props;
  return (
    <div className={clsx("grid grid-cols-2 gap-4 sm:grid-cols-4", className)}>
      {metrics.map((metric, index) => (
        <Metric key={`metric-${index}`} metric={metric} />
      ))}
    </div>
  );
}
