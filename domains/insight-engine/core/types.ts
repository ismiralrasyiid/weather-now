type RuleType = keyof RuleMap;
type RuleMap = {
  temperature_high: {
    category: "temperature";
    signals: {
      maxTemp: number;
      feelsLike: number;
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

type Severity = "low" | "medium" | "high";

export type Insight<TRuleType extends RuleType> = {
  id: string;
  category: RuleMap[TRuleType]["category"];
  type: TRuleType;
  severity: Severity;
  confidence: number;
  timeframe: {
    start: number;
    end: number;
  };
  signals: RuleMap[TRuleType]["signals"];
};

export type AnyInsight = Insight<RuleType>;
