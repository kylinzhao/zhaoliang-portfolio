import { SectionWrapper } from "@/components/section-wrapper";
import { getResumeData } from "@/lib/resume";

export async function About() {
  const resume = await getResumeData();

  // Extract the "个人简介" section from the markdown content
  const aboutMatch = resume.content.match(/## 个人简介\n\n([\s\S]+?)(?=\n##|$)/);
  const aboutText = aboutMatch ? aboutMatch[1].trim() : resume.content.trim();

  return (
    <SectionWrapper id="about">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-8 text-center">
          关于我
        </h2>
        <p className="text-lg sm:text-xl leading-relaxed text-muted-foreground text-center max-w-3xl mx-auto">
          {aboutText}
        </p>
      </div>
    </SectionWrapper>
  );
}
