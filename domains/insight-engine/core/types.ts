import { DayPeriod } from "@/domains/time";
import { TemperatureUnitSymbol } from "@/domains/unit";

export type Rule = (data: EngineData) => AnyInsight | null;
export type RuleType = keyof RuleMap;
type RuleMap = {
  temperature_high: {
    category: "temperature";
    signals: {
      temperature: {
        max: number;
        hotHours: number;
        unit: TemperatureUnitSymbol;
      };
    };
  };
  temperature_low: {
    category: "temperature";
    signals: {
      temperature: {
        min: number;
        coldHours: number;
        unit: TemperatureUnitSymbol;
      };
    };
  };
  feelslike_high: {
    category: "temperature";
    signals: {
      feelsLike: {
        max: number;
        hotHours: number;
        unit: TemperatureUnitSymbol;
      };
    };
  };
  feelslike_peak_hours: {
    category: "temperature";
    signals: {
      peak: {
        feelsLike: number;
        duration: number;
        unit: TemperatureUnitSymbol;
      };
    };
  };
  temperature_feelslike_gap: {
    category: "temperature";
    signals: {
      feelsLikeDelta: {
        max: number;
        avg: number;
        unit: TemperatureUnitSymbol;
      };
      temperature: {
        avg: number;
        unit: TemperatureUnitSymbol;
      };
      feelsLike: {
        avg: number;
        unit: TemperatureUnitSymbol;
      };
    };
  };
  comfortable_window: {
    category: "temperature";
    signals: {
      comfortWindow: {
        temperature: {
          avg: number;
          unit: TemperatureUnitSymbol;
        };
        feelsLike: {
          avg: number;
          unit: TemperatureUnitSymbol;
        };
        duration: {
          hours: number;
          type: DayPeriod;
        };
      };
    };
  };
  weather_event: {
    category: "weather";
    signals: {
      weatherEvent: {
        type: "drizzle" | "rain" | "storm" | "snow" | "other";
        description: string;
        severity: Severity;
        durationHours: number;
        peak: {
          time: string;
          probability: number;
        };
      };
    };
  };
};

export type Severity = "low" | "medium" | "high";
export type Timeframe = {
  start: string;
  end: string;
};

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
    apparentTemperature: number[];
    precipitationProbability: number[];
    weatherCode: number[];
    time: string[];
  };
  units: {
    temperature: TemperatureUnitSymbol;
    time: string;
  };
  timezone: string;
};

export type InsightMessage = {
  id: string;
  title: string;
  description: string;
  icon: string;
  action: string;
  confidence: number;
  severity: Severity;
};
