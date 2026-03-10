"use client";

import { SectionWrapper } from "@/components/section-wrapper";
import { motion } from "framer-motion";

interface AboutClientProps {
  aboutText: string;
}

export function AboutClient({ aboutText }: AboutClientProps) {
  // 简单的 markdown 转 HTML（只处理 **加粗**）
  const renderMarkdown = (text: string) => {
    // 将 **text** 转换为 <strong>text</strong>
    const html = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    return html;
  };

  return (
    <SectionWrapper id="about">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-2xl sm:text-3xl font-bold tracking-tight mb-8 text-center"
        >
          关于我
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-lg sm:text-xl leading-relaxed text-muted-foreground text-center max-w-3xl mx-auto"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(aboutText) }}
        />
      </div>
    </SectionWrapper>
  );
}
