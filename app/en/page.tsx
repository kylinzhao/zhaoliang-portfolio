import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { CoreMetrics } from "@/components/sections/core-metrics";
import { Experience } from "@/components/sections/experience";
import { TechStack } from "@/components/sections/tech-stack";
import { Contact } from "@/components/sections/contact";
import { SchemaOrg } from "@/components/schema-org";

export default function EnglishHome() {
  return (
    <>
      <SchemaOrg locale="en" />
      <main className="min-h-screen">
        <Hero locale="en" />
        <About locale="en" />
        <CoreMetrics locale="en" />
        <Experience locale="en" />
        <TechStack locale="en" />
        <Contact locale="en" />
      </main>
    </>
  );
}
