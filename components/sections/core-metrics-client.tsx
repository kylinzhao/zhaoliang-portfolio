"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/section-wrapper";
import type { Metric } from "@/types/resume";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1] as const,
      delay: i * 0.1,
    },
  }),
};

interface CoreMetricsClientProps {
  metrics: Metric[];
}

export function CoreMetricsClient({ metrics }: CoreMetricsClientProps) {
  return (
    <SectionWrapper id="metrics" className="bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-12 text-center">
          核心成就
        </h2>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{ scale: 1.02 }}
              className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-all duration-200"
            >
              {/* Icon */}
              <div className="text-4xl mb-4">{metric.icon}</div>

              {/* Value */}
              <div className="text-3xl sm:text-4xl font-bold mb-2">
                {metric.value}
              </div>

              {/* Label */}
              <div className="text-sm font-medium text-muted-foreground mb-1">
                {metric.label}
              </div>

              {/* Description */}
              <div className="text-xs text-muted-foreground">
                {metric.description}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
