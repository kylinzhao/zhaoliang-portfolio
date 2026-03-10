"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/section-wrapper";
import type { Experience as ExperienceType } from "@/types/resume";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1] as const,
      delay: i * 0.15,
    },
  }),
};

interface ExperienceClientProps {
  experiences: ExperienceType[];
}

export function ExperienceClient({ experiences }: ExperienceClientProps) {
  // Get unique companies and their overall date range
  const companies = Array.from(new Set(experiences.map((exp) => exp.company)));

  return (
    <SectionWrapper id="experience">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-12 text-center">
          工作经历
        </h2>

        {/* Company Header */}
        {companies.map((company) => {
          const companyExperiences = experiences.filter((exp) => exp.company === company);
          const periods = companyExperiences.map((exp) => exp.period);
          const startYear = periods[0]?.split(" — ")[0];
          const endYear = periods[periods.length - 1]?.split(" — ")[1];

          return (
            <div key={company} className="mb-12 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4 overflow-hidden bg-white">
                {companyExperiences[0]?.logo ? (
                  <img
                    src={companyExperiences[0].logo}
                    alt={`${company} logo`}
                    className="w-12 h-12 object-contain"
                    onError={(e) => {
                      // Logo 加载失败时回退到默认图标
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const fallback = target.nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = 'block';
                    }}
                  />
                ) : null}
                <span className="text-3xl" style={{ display: companyExperiences[0]?.logo ? 'none' : 'block' }}>🏢</span>
              </div>
              <h3 className="text-xl font-semibold">{company}</h3>
              <p className="text-muted-foreground">{startYear} — {endYear}</p>
            </div>
          );
        })}

        {/* Experience Timeline */}
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.period}
              custom={index}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="relative pl-8 border-l-2 border-border"
            >
              {/* Timeline Dot */}
              <div className="absolute left-0 top-0 w-4 h-4 -translate-x-[9px] rounded-full bg-primary" />

              {/* Content */}
              <div className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-all duration-200">
                {/* Period */}
                <div className="text-sm font-medium text-primary mb-2">
                  {exp.period}
                </div>

                {/* Title */}
                <h4 className="text-lg font-semibold mb-3">
                  {exp.title}
                </h4>

                {/* Details */}
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {exp.details.map((detail, i) => (
                    <li key={i} className="flex items-start">
                      <span className="mr-2 text-primary">•</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
