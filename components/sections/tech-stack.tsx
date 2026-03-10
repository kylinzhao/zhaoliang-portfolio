import { getResumeData } from "@/lib/resume";
import { TechStackClient } from "./tech-stack-client";

export async function TechStack({ locale = 'zh' }: { locale?: string }) {
  const resume = await getResumeData(locale);
  const techStack = resume.frontmatter.techStack || [];
  return <TechStackClient techStack={techStack} />;
}
