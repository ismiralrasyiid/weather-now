export type MetricData = {
  name: string;
  value: number;
  unit: string;
};

export type MetricProps = {
  metric: MetricData;
};

export default function Metric(props: MetricProps) {
  const { metric } = props;

  return (
    <div className="rounded-xl border border-border bg-background-primary p-3.5">
      <p className="flex flex-col gap-4">
        <span className="font-medium text-text-tertiary">{metric.name}</span>
        <span className="text-3xl font-extralight">
          {metric.value}
          {metric.unit}
        </span>
      </p>
    </div>
  );
}
