import { getResumeData } from "@/lib/resume";
import { TechStackClient } from "./tech-stack-client";

export async function TechStack() {
  const resume = await getResumeData();
  const techStack = resume.frontmatter.techStack || [];
  return <TechStackClient techStack={techStack} />;
}
