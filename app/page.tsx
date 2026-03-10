import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { CoreMetrics } from "@/components/sections/core-metrics";
import { Experience } from "@/components/sections/experience";
import { TechStack } from "@/components/sections/tech-stack";
import { Contact } from "@/components/sections/contact";
import { SchemaOrg } from "@/components/schema-org";

export default function Home() {
  return (
    <>
      <SchemaOrg />
      <main className="min-h-screen">
        <Hero />
        <About />
        <CoreMetrics />
        <Experience />
        <TechStack />
        <Contact />
      </main>
    </>
  );
}
