import { getResumeData } from "@/lib/resume";
import { CoreMetricsClient } from "./core-metrics-client";

export async function CoreMetrics() {
  const resume = await getResumeData();
  return <CoreMetricsClient metrics={resume.frontmatter.metrics} />;
}
