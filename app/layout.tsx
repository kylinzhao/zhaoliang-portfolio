import type { Metadata } from "next";
import { ThemeProvider } from "@/app/providers";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { getResumeData } from "@/lib/resume";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const resume = await getResumeData();

  // Extract "个人简介" section for description
  const aboutMatch = resume.content.match(/## 个人简介\n\n([\s\S]+?)(?=\n##|$)/);
  const description = aboutMatch ? aboutMatch[1].trim() : resume.frontmatter.title;

  return {
    title: `${resume.frontmatter.name} - ${resume.frontmatter.title}`,
    description,
    keywords: resume.frontmatter.skills,
    authors: [{ name: resume.frontmatter.name }],
    openGraph: {
      title: `${resume.frontmatter.name} - ${resume.frontmatter.title}`,
      description,
      url: "https://zhaoliang.space",
      siteName: `${resume.frontmatter.name}的个人网站`,
      locale: "zh_CN",
      type: "website",
    },
  };
}

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
