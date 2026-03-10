import { getResumeData } from "@/lib/resume";
import { ExperienceClient } from "./experience-client";

export async function Experience({ locale = 'zh' }: { locale?: string }) {
  const resume = await getResumeData(locale);
  const experiences = resume.frontmatter.experiences || [];
  return <ExperienceClient experiences={experiences} />;
}
