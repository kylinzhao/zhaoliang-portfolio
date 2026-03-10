import { getResumeData } from "@/lib/resume";
import { CoreMetricsClient } from "./core-metrics-client";

export async function CoreMetrics({ locale = 'zh' }: { locale?: string }) {
  const resume = await getResumeData(locale);
  return <CoreMetricsClient metrics={resume.frontmatter.metrics} />;
}
