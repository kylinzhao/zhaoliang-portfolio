/**
 * Resume data access module
 *
 * This module provides a simple API for accessing resume data
 * from the content/resume.md file.
 *
 * @example
 * ```tsx
 * import { getResumeData } from "@/lib/resume";
 *
 * async function Hero() {
 *   const resume = await getResumeData();
 *   return <h1>{resume.frontmatter.name}</h1>;
 * }
 * ```
 */

export { getResumeData, getResumeDataSync } from "./resume-parser";

export type {
  Metric,
  Experience,
  TechStack,
  ResumeFrontmatter,
  ParsedResume,
} from "./resume-parser";
