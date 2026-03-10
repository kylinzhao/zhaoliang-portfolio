import { getResumeData } from "@/lib/resume";
import { ExperienceClient } from "./experience-client";

export async function Experience() {
  const resume = await getResumeData();
  const experiences = resume.frontmatter.experiences || [];
  return <ExperienceClient experiences={experiences} />;
}
