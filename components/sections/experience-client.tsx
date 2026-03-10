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
  // 辅助函数：将日期字符串转换为可比较的数值
  const parseDate = (dateStr: string): number => {
    if (dateStr === "至今") return 9999.99; // 至今设为最大值
    const [year, month] = dateStr.split(".").map(Number);
    return year + month / 100;
  };

  // Get unique companies and their overall date range
  const companies = Array.from(new Set(experiences.map((exp) => exp.company)));

  return (
    <SectionWrapper id="experience">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-12 text-center">
          工作经历
        </h2>

        {/* Company Header */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4 mb-12">
          {companies.map((company) => {
            const companyExperiences = experiences.filter((exp) => exp.company === company);

            // 找出所有开始时间，选择最早的
            const startDates = companyExperiences.map((exp) => {
              const startDate = exp.period.split(" — ")[0];
              return { date: startDate, value: parseDate(startDate) };
            });
            const earliest = startDates.reduce((min, current) =>
              current.value < min.value ? current : min
            );
            const startYear = earliest.date;

            // 找出所有结束时间，选择最晚的
            const endDates = companyExperiences.map((exp) => {
              const endDate = exp.period.split(" — ")[1];
              return { date: endDate, value: parseDate(endDate) };
            });
            const latest = endDates.reduce((max, current) =>
              current.value > max.value ? current : max
            );
            const endYear = latest.date;

            return (
              <div key={company} className="text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-primary/10 mb-2 overflow-hidden bg-white mx-auto">
                  {companyExperiences[0]?.logo ? (
                    <img
                      src={companyExperiences[0].logo}
                      alt={`${company} logo`}
                      className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
                      onError={(e) => {
                        // Logo 加载失败时回退到默认图标
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const fallback = target.nextElementSibling as HTMLElement;
                        if (fallback) fallback.style.display = 'block';
                      }}
                    />
                  ) : null}
                  <span className="text-2xl sm:text-3xl" style={{ display: companyExperiences[0]?.logo ? 'none' : 'block' }}>🏢</span>
                </div>
                <h3 className="text-sm sm:text-base font-semibold truncate px-1">{company}</h3>
                <p className="text-xs text-muted-foreground truncate px-1">{startYear} — {endYear}</p>
              </div>
            );
          })}
        </div>

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
