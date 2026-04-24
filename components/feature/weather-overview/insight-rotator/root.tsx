"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { InsightMessage } from "@/domains/insight-engine/core/types";
import Content from "./content";
import DotIndicator from "./dot-indicator";

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
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -6, filter: "blur(2px)" }}
          animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, x: 6, filter: "blur(2px)" }}
          transition={{ duration: 0.3 }}
        >
          <Content />
        </motion.div>
      </AnimatePresence>
      {messages.length > 1 && (
        <div className="absolute -bottom-5 left-1/2 flex grow -translate-x-1/2 justify-center gap-1 text-xs">
          {messages.map((message, i) => (
            <DotIndicator key={`${message.id}-${i}`} isActive={i === index} />
          ))}
        </div>
      )}
    </div>
  );
}
