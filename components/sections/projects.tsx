import { getResumeData } from "@/lib/resume";
import { ProjectsClient } from "./projects-client";

export async function Projects({ locale = 'zh' }: { locale?: string }) {
  const resume = await getResumeData(locale);
  const projects = resume.frontmatter.projects || [];
  return <ProjectsClient projects={projects} />;
}
