import { getResumeData } from "@/lib/resume";
import { ContactClient } from "./contact-client";

export async function Contact({ locale = 'zh' }: { locale?: string }) {
  const resume = await getResumeData(locale);
  return <ContactClient resume={resume.frontmatter} />;
}
