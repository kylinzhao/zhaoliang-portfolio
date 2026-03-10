import type { Metadata } from "next";
import { ThemeProvider } from "@/app/providers";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "赵梁 - 大前端技术负责人",
  description:
    "资深前端技术专家，拥有10年+开发经验。擅长跨端架构（RN/H5/Native同构）、SSR/SEO、工程化体系建设。27人团队管理经验，具备极强的业务敏锐度和技术决策能力。",
  keywords: [
    "前端",
    "React",
    "React Native",
    "Next.js",
    "跨端架构",
    "SSR",
    "SEO",
    "工程化",
    "大前端",
    "技术负责人",
  ],
  authors: [{ name: "赵梁" }],
  openGraph: {
    title: "赵梁 - 大前端技术负责人",
    description:
      "资深前端技术专家，拥有10年+开发经验。擅长跨端架构（RN/H5/Native同构）、SSR/SEO、工程化体系建设。",
    url: "https://zhaoliang.space",
    siteName: "赵梁的个人网站",
    locale: "zh_CN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
