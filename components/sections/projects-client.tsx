"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/section-wrapper";
import { ExternalLink, ArrowRight } from "lucide-react";
import type { Project } from "@/types/project";

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

const statusStyles = {
  active: "bg-green-500/10 text-green-600 border-green-500/20",
  wip: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
  planned: "bg-gray-500/10 text-gray-600 border-gray-500/20",
};

const statusLabels = {
  active: "✅ 已上线",
  wip: "🚧 开发中",
  planned: "🔮 计划中",
};

interface ProjectsClientProps {
  projects: Project[];
}

export function ProjectsClient({ projects }: ProjectsClientProps) {
  // 按状态排序：active -> wip -> planned
  const sortedProjects = [...projects].sort((a, b) => {
    const order = { active: 0, wip: 1, planned: 2 };
    return order[a.status] - order[b.status];
  });

  return (
    <SectionWrapper id="projects" className="bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4 text-center">
          工具集
        </h2>
        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          我的一些业余项目和个人作品
        </p>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedProjects.map((project, index) => (
            <motion.div
              key={project.name}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{ scale: 1.02 }}
              className="relative bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-all duration-200 flex flex-col"
            >
              {/* External Link Icon - Top Right */}
              <div className="absolute top-4 right-4 text-muted-foreground">
                {project.linkType === 'external' ? (
                  <ExternalLink className="w-5 h-5" />
                ) : (
                  <ArrowRight className="w-5 h-5" />
                )}
              </div>

              {/* Project Icon */}
              <div className="text-5xl mb-4">
                {project.icon}
              </div>

              {/* Project Name */}
              <h3 className="text-xl font-bold mb-2 pr-8">
                {project.name}
              </h3>

              {/* Description */}
              <p className="text-sm text-muted-foreground mb-4 flex-grow">
                {project.description}
              </p>

              {/* Tags */}
              {project.tags && project.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Status Badge */}
              <div className="mt-auto">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${statusStyles[project.status]}`}
                >
                  {statusLabels[project.status]}
                </span>
              </div>

              {/* Link Overlay */}
              {project.linkType === 'external' ? (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0"
                  aria-label={`访问 ${project.name}`}
                />
              ) : (
                <a
                  href={project.url}
                  className="absolute inset-0"
                  aria-label={`查看 ${project.name}`}
                />
              )}
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {projects.length === 0 && (
          <div className="text-center text-muted-foreground py-12">
            <p>更多项目敬请期待...</p>
          </div>
        )}
      </div>
    </SectionWrapper>
  );
}
