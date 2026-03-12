/**
 * 核心成就数据
 */
export interface Metric {
  icon: string;
  value: string;
  label: string;
  description: string;
}

/**
 * 工作经历数据
 */
export interface Experience {
  title: string;
  period: string;
  company: string;
  logo?: string; // 公司 logo URL 或路径
  details: string[];
}

/**
 * 技术栈数据
 */
export interface TechStack {
  name: string;
  icon: string;
  description: string;
}

/**
 * 联系方式数据
 */
export interface Contact {
  email: string;
  phone: string;
}

/**
 * 个人项目数据
 */
export type { Project } from './project';

/**
 * 简历 Front Matter (YAML 元数据)
 */
export interface ResumeFrontmatter {
  /** 姓名 */
  name: string;

  /** 职位 */
  title: string;

  /** 邮箱 */
  email: string;

  /** 电话 */
  phone: string;

  /** 所在城市 */
  location?: string;

  /** 技能列表 */
  skills: string[];

  /** 核心成就 */
  metrics: Metric[];

  /** 工作经历 */
  experiences?: Experience[];

  /** 技术栈 */
  techStack?: TechStack[];

  /** 社交媒体链接 */
  social?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };

  /** 个人项目 */
  projects?: Project[];
}

/**
 * 简历内容（Markdown 正文部分）
 */
export interface ResumeContent {
  /** 个人简介 */
  about: string;

  /** 工作经历（Markdown 格式） */
  experience?: string;

  /** 联系方式（Markdown 格式） */
  contact?: string;
}

/**
 * 解析后的完整简历数据
 */
export interface ParsedResume {
  /** YAML Front Matter 数据 */
  frontmatter: ResumeFrontmatter;

  /** Markdown 正文内容 */
  content: string;

  /** 解析后的内容结构（可选） */
  parsedContent?: ResumeContent;
}
