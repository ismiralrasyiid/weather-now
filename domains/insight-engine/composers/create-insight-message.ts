import { AnyInsight, InsightMessage } from "../core/types";

type MessageOptions = {
  title: string;
  description: string;
  icon: string;
  action: string;
};

export function createInsightMessage(
  insight: AnyInsight,
  options: MessageOptions,
): InsightMessage {
  return {
    id: `message-${insight.id}`,

    title: options.title,
    description: options.description,

    icon: options.icon,
    action: options.action,

    confidence: insight.confidence,
    severity: insight.severity,
  };
}
