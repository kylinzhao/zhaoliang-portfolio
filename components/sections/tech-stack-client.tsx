"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/section-wrapper";
import type { TechStack } from "@/types/resume";

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

interface TechStackClientProps {
  techStack: TechStack[];
}

export function TechStackClient({ techStack }: TechStackClientProps) {
  return (
    <SectionWrapper id="skills" className="bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-12 text-center">
          技术栈
        </h2>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {techStack.map((tech, index) => (
            <motion.div
              key={tech.name}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{ scale: 1.02 }}
              className="bg-card border border-border rounded-lg p-8 hover:border-primary/50 transition-all duration-200 flex flex-col items-center justify-center text-center"
            >
              {/* Icon */}
              <div className="text-5xl mb-4">{tech.icon}</div>

              {/* Name */}
              <h3 className="text-xl font-bold mb-2">{tech.name}</h3>

              {/* Description */}
              <p className="text-sm text-muted-foreground">{tech.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
