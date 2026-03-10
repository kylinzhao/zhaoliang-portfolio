import { AppGridClient } from "./app-showcase-client";

// 我负责过的 App 列表
// 注意：这些是示例 URL，需要替换为真实的 App icon
// 可以从 App Store、Google Play 或公司官网获取
const apps = [
  {
    name: "瓜子二手车",
    icon: "https://a.mzstatic.com/us/r1000/076/Purple116/v4/1a/f2/9c/1af29c7c-0f0d-9f5b-9f7a-9f7a9f7a9f7a/icon_512x512.png",
    appStoreUrl: "https://apps.apple.com/cn/app/id899714638",
    category: "ecommerce" as const,
  },
  {
    name: "去哪儿旅行",
    icon: "https://a.mzstatic.com/us/r1000/093/Purple126/v4/3c/62/3c/3c623c7c-0f0d-9f5b-9f7a-9f7a9f7a9f7a/icon_512x512.png",
    appStoreUrl: "https://apps.apple.com/cn/app/id394093307",
    category: "travel" as const,
  },
  {
    name: "便利蜂",
    icon: "https://a.mzstatic.com/us/r1000/087/Purple126/v4/8c/8c/8c/8c8c8c7c-0f0d-9f5b-9f7a-9f7a9f7a9f7a/icon_512x512.png",
    appStoreUrl: "https://apps.apple.com/cn/app/id1191468822",
    category: "convenience" as const,
  },
  {
    name: "车优多",
    icon: "", // 需要添加真实 URL
    appStoreUrl: "https://apps.apple.com/cn/app/id1114704724",
    category: "ecommerce" as const,
  },
  {
    name: "车速拍",
    icon: "", // 需要添加真实 URL
    appStoreUrl: "#",
    category: "ecommerce" as const,
  },
  {
    name: "车好卖",
    icon: "", // 需要添加真实 URL
    appStoreUrl: "#",
    category: "ecommerce" as const,
  },
  {
    name: "检瓜子",
    icon: "", // 需要添加真实 URL
    appStoreUrl: "#",
    category: "ecommerce" as const,
  },
  {
    name: "去哪儿睡",
    icon: "", // 需要添加真实 URL
    appStoreUrl: "#",
    category: "travel" as const,
  },
  {
    name: "揣着网",
    icon: "", // 需要添加真实 URL
    appStoreUrl: "#",
    category: "o2o" as const,
  },
];

export async function AppShowcase() {
  return (
    <section id="apps" className="py-24 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4 text-center">
          负责过的 App
        </h2>
        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          在多年的技术生涯中，我参与和负责了多个知名 App 的开发与架构设计
        </p>

        <AppGridClient apps={apps} />
      </div>
    </section>
  );
}
