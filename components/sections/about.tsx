import { SectionWrapper } from "@/components/section-wrapper";

export function About() {
  return (
    <SectionWrapper id="about">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-8 text-center">
          关于我
        </h2>
        <p className="text-lg sm:text-xl leading-relaxed text-muted-foreground text-center max-w-3xl mx-auto">
          资深前端技术专家，拥有10年+开发经验。擅长跨端架构（RN/H5/Native同构）、
          SSR/SEO、工程化体系建设。27人团队管理经验，具备极强的业务敏锐度和技术决策能力。
        </p>
      </div>
    </SectionWrapper>
  );
}
