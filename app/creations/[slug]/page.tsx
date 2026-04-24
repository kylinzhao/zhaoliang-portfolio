import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { creations, getCreationBySlug } from "@/lib/creations";

export function generateStaticParams() {
  return creations.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = getCreationBySlug(slug);

  if (!entry) {
    return {};
  }

  return {
    title: `${entry.title} | 赵梁`,
    description: entry.summary,
  };
}

export default async function CreationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = getCreationBySlug(slug);

  if (!entry) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background pt-28 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="space-y-5">
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">
              首页
            </Link>
            <span>/</span>
            <Link href="/creations" className="hover:text-foreground transition-colors">
              创作实验室
            </Link>
            <span>/</span>
            <span className="text-foreground">{entry.title}</span>
          </div>

          <div className="space-y-4 max-w-3xl">
            <div className="text-5xl">{entry.icon}</div>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground">
                {entry.category}
              </span>
              <span className="inline-flex rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground">
                最近更新 {entry.updatedAt}
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
              {entry.title}
            </h1>
            <p className="text-lg text-muted-foreground leading-8">
              {entry.summary}
            </p>
          </div>
        </div>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {entry.metrics.map((metric) => (
            <div
              key={metric}
              className="rounded-2xl border border-border bg-card px-5 py-4 text-sm font-medium text-foreground"
            >
              {metric}
            </div>
          ))}
        </section>

        <section className="rounded-3xl border border-border bg-muted/30 p-6 sm:p-8">
          <h2 className="text-2xl font-semibold tracking-tight mb-5">为什么把它放上网站</h2>
          <ul className="space-y-4">
            {entry.highlights.map((highlight) => (
              <li key={highlight} className="flex gap-3 text-sm sm:text-base leading-7">
                <span className="mt-2 h-2 w-2 rounded-full bg-primary" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-6">
          {entry.sections.map((section) => (
            <article
              key={section.title}
              className="rounded-3xl border border-border bg-card p-6 sm:p-8"
            >
              <h2 className="text-2xl font-semibold tracking-tight mb-5">
                {section.title}
              </h2>
              <div className="space-y-4 text-sm sm:text-base text-muted-foreground leading-8">
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
