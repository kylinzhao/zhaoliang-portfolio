import { getResumeData } from "@/lib/resume";
import { AboutClient } from "./about-client";

export async function About() {
  const resume = await getResumeData();

  // Extract the "个人简介" section from the markdown content
  const aboutMatch = resume.content.match(/## 个人简介\n\n([\s\S]+?)(?=\n##|$)/);
  const aboutText = aboutMatch ? aboutMatch[1].trim() : resume.content.trim();

  return <AboutClient aboutText={aboutText} />;
}
