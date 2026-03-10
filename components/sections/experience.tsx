"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/section-wrapper";

const experiences = [
  {
    title: "商家服务大前端总监",
    period: "2023.01 — 至今",
    company: "瓜子二手车",
    details: [
      "27人团队管理 | 5条业务线",
      "GRN 2.0架构 | SSR/SEO体系建设",
      "可视化降本62% | 月均节约7.5万元",
      "出海SSR体系建设 | 72万页面SEO收录",
      "AI Code Review | 184个项目接入",
    ],
  },
  {
    title: "商家服务前端负责人",
    period: "2021.03 — 2022.12",
    company: "瓜子二手车",
    details: [
      "10人团队管理",
      "GRN 1.0架构 | 技术栈统一为React",
      "核心模块67%同构化（RN/H5/Native）",
      "67%需求不依赖发版",
    ],
  },
  {
    title: "商家服务前端Leader",
    period: "2019.06 — 2021.02",
    company: "瓜子二手车",
    details: [
      "车速拍客户端从零搭建",
      "完成Vue到React技术栈迁移",
    ],
  },
  {
    title: "前端工程师",
    period: "2016.09 — 2019.05",
    company: "瓜子二手车",
    details: [
      "负责车商业务前端开发",
      "参与拍卖、开放平台等核心功能",
    ],
  },
];

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

export function Experience() {
  return (
    <SectionWrapper id="experience">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-12 text-center">
          工作经历
        </h2>

        {/* Company Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <span className="text-3xl">🏢</span>
          </div>
          <h3 className="text-xl font-semibold">瓜子二手车</h3>
          <p className="text-muted-foreground">2016 — 至今</p>
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
