import { getResumeData } from "@/lib/resume";
import { AboutClient } from "./about-client";

export async function About({ locale = 'zh' }: { locale?: string }) {
  const resume = await getResumeData(locale);

  // Extract the "个人简介" or "About Me" section from the markdown content
  const sectionTitle = locale === 'en' ? "About Me" : "个人简介";
  const aboutMatch = resume.content.match(new RegExp(`## ${sectionTitle}\\n\\n([\\s\\S]+?)(?=\\n##|$)`));
  const aboutText = aboutMatch ? aboutMatch[1].trim() : resume.content.trim();

  return <AboutClient aboutText={aboutText} />;
}
