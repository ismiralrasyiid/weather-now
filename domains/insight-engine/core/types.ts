export type Rule = (data: EngineData) => AnyInsight | null;
type RuleType = keyof RuleMap;
type RuleMap = {
  temperature_high: {
    category: "temperature";
    signals: {
      maxTemp: number;
      hotHours: number;
    };
  };
  temperature_low: {
    category: "temperature";
    signals: {
      minTemp: number;
      feelsLike: number;
    };
  };
};

export type Severity = "low" | "medium" | "high";

export type Insight<TRuleType extends RuleType> = {
  id: string;
  category: RuleMap[TRuleType]["category"];
  type: TRuleType;
  severity: Severity;
  confidence: number;
  timeframe: {
    start: string;
    end: string;
  };
  timezone: string;
  signals: RuleMap[TRuleType]["signals"];
};

export type AnyInsight = Insight<RuleType>;

export type EngineData = {
  hourly: {
    temperature: number[];
    time: string[];
  };
  units: {
    temperature: string;
    time: string;
  };
  timezone: string;
};
