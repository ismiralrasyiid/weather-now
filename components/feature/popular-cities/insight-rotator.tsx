"use client";

import { useEffect, useState } from "react";
import * as motion from "motion/react-client";
import { InsightMessage } from "@/domains/insight-engine/core/types";
import clsx from "clsx";

export default function InsightRotator({
  messages,
}: {
  messages: InsightMessage[];
}) {
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered || messages.length === 1) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 7000);

    return () => clearInterval(interval);
  }, [isHovered, messages.length]);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative"
    >
      <motion.div
        key={index}
        initial={{ opacity: 0, x: -2 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 2 }}
        transition={{ duration: 0.5 }}
      >
        <p className="line-clamp-2 text-sm text-text-secondary">
          {messages[index].description}
        </p>
      </motion.div>
      {messages.length > 1 && (
        <div className="absolute left-1/2 flex grow -translate-x-1/2 justify-center gap-1 text-xs">
          {messages.map((message, i) => (
            <div
              key={`${message.id}-${i}`}
              className={clsx("transition-colors duration-500", {
                "text-text-secondary": i === index,
                "text-text-tertiary": i !== index,
              })}
            >
              ●
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
