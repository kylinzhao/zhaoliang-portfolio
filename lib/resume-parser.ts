import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { z } from "zod";
import type {
  Metric,
  Experience,
  TechStack,
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
});

/**
 * Resume file path
 */
const RESUME_FILE_PATH = path.join(process.cwd(), "content", "resume.md");

/**
 * Parse resume file from filesystem
 * @returns Parsed resume data
 * @throws Error if file reading fails
 */
function parseResumeFile(): { data: any; content: string } {
  try {
    const fileContents = fs.readFileSync(RESUME_FILE_PATH, "utf-8");
    const { data, content } = matter(fileContents);
    return { data, content };
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes("no such file")) {
        throw new Error(
          `简历文件不存在: ${RESUME_FILE_PATH}\n请确保 content/resume.md 文件存在`
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
 * @returns Parsed resume data with validated frontmatter
 */
export async function getResumeData(): Promise<ParsedResume> {
  const { data, content } = parseResumeFile();
  const frontmatter = validateResumeData(data);

  return {
    frontmatter,
    content,
  };
}

/**
 * Get resume data synchronously
 * Use this when you need synchronous data access
 * @returns Parsed resume data with validated frontmatter
 */
export function getResumeDataSync(): ParsedResume {
  const { data, content } = parseResumeFile();
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
