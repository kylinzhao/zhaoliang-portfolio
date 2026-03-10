import { getResumeData } from "@/lib/resume";
import { HeroClient } from "./hero-client";

export async function Hero({ locale = 'zh' }: { locale?: string }) {
  const resume = await getResumeData(locale);
  return <HeroClient resume={resume.frontmatter} />;
}
