import { getResumeData } from "@/lib/resume";
import { ContactClient } from "./contact-client";

export async function Contact() {
  const resume = await getResumeData();
  return <ContactClient resume={resume.frontmatter} />;
}
