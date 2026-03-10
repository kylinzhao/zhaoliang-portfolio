"use client";

import { motion } from "framer-motion";
import { Download, Mail } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
};

export function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center pt-16">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        {/* Name */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-6"
        >
          赵梁
        </motion.h1>

        {/* Title */}
        <motion.p
          variants={itemVariants}
          className="text-xl sm:text-2xl md:text-3xl font-semibold text-muted-foreground mb-8"
        >
          大前端技术负责人 · 27人团队管理
        </motion.p>

        {/* Core Skills */}
        <motion.div
          variants={itemVariants}
          className="text-lg sm:text-xl text-muted-foreground mb-12 space-y-2"
        >
          <p>React · React Native · Next.js</p>
          <p>跨端架构 · SSR/SEO · 工程化</p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a
            href="/简历.pdf"
            download
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8 group"
          >
            <Download className="mr-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            下载简历 PDF
          </a>
          <a
            href="mailto:zhaoliang.js@gmail.com"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 px-8 group"
          >
            <Mail className="mr-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            发送邮件
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
