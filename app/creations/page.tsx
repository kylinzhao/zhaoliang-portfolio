import Link from "next/link";
import { creations } from "@/lib/creations";

export const metadata = {
  title: "创作实验室 | 赵梁",
  description:
    "把每日视频任务、音乐改编和 GitHub Trending 做成统一的内容二级页面，持续沉淀可公开浏览的创作档案。",
};

const statusStyles = {
  active: "bg-green-500/10 text-green-600 border-green-500/20",
  wip: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
};

const statusLabels = {
  active: "持续更新",
  wip: "整理中",
};

export default function CreationsPage() {
  return (
    <main className="min-h-screen bg-background pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <section className="space-y-6">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← 返回首页
          </Link>

          <div className="max-w-3xl space-y-4">
            <span className="inline-flex rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground">
              Creative archive
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
              创作实验室
            </h1>
            <p className="text-lg text-muted-foreground leading-8">
              这里把我最近持续推进的三类内容做成网站二级页面：每日视频任务（含剧情）、音乐改编计划、以及 GitHub
              Trending 的中文笔记。目标不是堆素材，而是把可复用的方法、代表性成果和最近一期更新都沉淀下来。
            </p>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {creations.map((entry) => (
            <Link
              key={entry.slug}
              href={`/creations/${entry.slug}`}
              className="group rounded-3xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-4xl mb-4">{entry.icon}</div>
                  <h2 className="text-2xl font-semibold tracking-tight mb-2 group-hover:text-primary transition-colors">
                    {entry.title}
                  </h2>
                  <p className="text-sm text-muted-foreground leading-7">
                    {entry.summary}
                  </p>
                </div>
                <span
                  className={`inline-flex shrink-0 rounded-full border px-3 py-1 text-xs font-medium ${statusStyles[entry.status]}`}
                >
                  {statusLabels[entry.status]}
                </span>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {entry.metrics.map((metric) => (
                  <span
                    key={metric}
                    className="inline-flex rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground"
                  >
                    {metric}
                  </span>
                ))}
              </div>

              <ul className="mt-6 space-y-3 text-sm text-foreground/90">
                {entry.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-3 leading-6">
                    <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 inline-flex items-center text-sm font-medium text-primary">
                {entry.ctaLabel} →
              </div>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}
