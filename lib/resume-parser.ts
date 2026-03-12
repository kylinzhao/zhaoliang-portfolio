import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { z } from "zod";
import type {
  Metric,
  Experience,
  TechStack,
  Project,
  ResumeFrontmatter,
  ParsedResume,
} from "@/types/resume";

/**
 * Zod Schema for Metric validation
 */
const MetricSchema: z.ZodType<Metric> = z.object({
  icon: z.string(),
  value: z.string(),
  label: z.string(),
  description: z.string(),
});

/**
 * Zod Schema for Experience validation
 */
const ExperienceSchema: z.ZodType<Experience> = z.object({
  title: z.string(),
  period: z.string(),
  company: z.string(),
  details: z.array(z.string()),
});

/**
 * Zod Schema for TechStack validation
 */
const TechStackSchema: z.ZodType<TechStack> = z.object({
  name: z.string(),
  icon: z.string(),
  description: z.string(),
});

/**
 * Zod Schema for Project validation
 */
const ProjectSchema: z.ZodType<Project> = z.object({
  name: z.string(),
  icon: z.string(),
  description: z.string(),
  linkType: z.enum(['internal', 'external']),
  url: z.string(),
  status: z.enum(['active', 'wip', 'planned']),
  tags: z.array(z.string()).optional(),
});

/**
 * Zod Schema for ResumeFrontmatter validation
 */
const ResumeFrontmatterSchema: z.ZodType<ResumeFrontmatter> = z.object({
  name: z.string().min(1, "姓名不能为空"),
  title: z.string().min(1, "职位不能为空"),
  email: z.string().email("邮箱格式不正确"),
  phone: z.string().min(1, "电话不能为空"),
  location: z.string().optional(),
  skills: z.array(z.string()).min(1, "至少需要一项技能"),
  metrics: z.array(MetricSchema).min(1, "至少需要一项成就"),
  experiences: z.array(ExperienceSchema).optional(),
  techStack: z.array(TechStackSchema).optional(),
  social: z
    .object({
      github: z.string().optional(),
      linkedin: z.string().optional(),
      twitter: z.string().optional(),
    })
    .optional(),
  projects: z.array(ProjectSchema).optional(),
});

/**
 * Get resume file path based on locale
 * @param locale - Locale code ('zh' or 'en')
 * @returns Resume file path
 */
function getResumeFilePath(locale: string = 'zh'): string {
  const fileName = locale === 'en' ? 'resume-en.md' : 'resume.md';
  return path.join(process.cwd(), "content", fileName);
}

/**
 * Parse resume file from filesystem
 * @param locale - Locale code ('zh' or 'en')
 * @returns Parsed resume data
 * @throws Error if file reading fails
 */
function parseResumeFile(locale: string = 'zh'): { data: any; content: string } {
  const filePath = getResumeFilePath(locale);

  try {
    const fileContents = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContents);
    return { data, content };
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes("no such file")) {
        throw new Error(
          `简历文件不存在: ${filePath}\n请确保文件存在`
        );
      }
      throw new Error(`读取简历文件失败: ${error.message}`);
    }
    throw new Error("读取简历文件时发生未知错误");
  }
}

/**
 * Validate resume data using Zod schema
 * @param data - Raw frontmatter data
 * @returns Validated resume frontmatter
 * @throws ZodError if validation fails
 */
function validateResumeData(data: any): ResumeFrontmatter {
  try {
    return ResumeFrontmatterSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessages = error.issues.map((err) => {
        const path = err.path.join(".");
        return `  - ${path}: ${err.message}`;
      }).join("\n");
      throw new Error(
        `简历数据验证失败:\n${errorMessages}\n\n请检查 content/resume.md 文件的 YAML Front Matter 格式`
      );
    }
    throw error;
  }
}

/**
 * Get resume data asynchronously
 * This is the recommended function for Next.js Server Components
 * @param locale - Locale code ('zh' or 'en'), defaults to 'zh'
 * @returns Parsed resume data with validated frontmatter
 */
export async function getResumeData(locale: string = 'zh'): Promise<ParsedResume> {
  const { data, content } = parseResumeFile(locale);
  const frontmatter = validateResumeData(data);

  return {
    frontmatter,
    content,
  };
}

/**
 * Get resume data synchronously
 * Use this when you need synchronous data access
 * @param locale - Locale code ('zh' or 'en'), defaults to 'zh'
 * @returns Parsed resume data with validated frontmatter
 */
export function getResumeDataSync(locale: string = 'zh'): ParsedResume {
  const { data, content } = parseResumeFile(locale);
  const frontmatter = validateResumeData(data);

  return {
    frontmatter,
    content,
  };
}

/**
 * Re-export types for convenience
 */
export type { Metric, Experience, TechStack, ResumeFrontmatter, ParsedResume };
