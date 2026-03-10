import { getResumeData } from "@/lib/resume";
import { HeroClient } from "./hero-client";

export async function Hero() {
  const resume = await getResumeData();
  return <HeroClient resume={resume.frontmatter} />;
}
