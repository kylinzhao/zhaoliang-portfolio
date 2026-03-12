import type { Metadata } from "next";
import { ThemeProvider } from "@/app/providers";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { getResumeData } from "@/lib/resume";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const resume = await getResumeData();

  // Extract "个人简介" section for description
  const aboutMatch = resume.content.match(/## 个人简介\n\n([\s\S]+?)(?=\n##|$)/);
  const description = aboutMatch ? aboutMatch[1].trim() : resume.frontmatter.title;

  const title = `${resume.frontmatter.name} - ${resume.frontmatter.title} | 17年前端开发经验`;
  const siteUrl = "https://zhaoliang.space";

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    keywords: [
      ...resume.frontmatter.skills,
      "大前端技术负责人",
      "React Native",
      "Next.js",
      "前端架构",
      "AI落地",
      "赵梁",
    ].join(", "),
    authors: [{ name: resume.frontmatter.name, url: siteUrl }],
    creator: resume.frontmatter.name,
    publisher: resume.frontmatter.name,

    // Open Graph / Facebook
    openGraph: {
      type: "website",
      locale: "zh_CN",
      url: siteUrl,
      title,
      description,
      siteName: `${resume.frontmatter.name}的个人网站`,
      images: [
        {
          url: "/logo.png",
          width: 1014,
          height: 1012,
          alt: `${resume.frontmatter.name} - ${resume.frontmatter.title}`,
        },
      ],
    },

    // Twitter
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/logo.png"],
      creator: "@zhaoliang",
    },

    // Canonical URL & Language Alternates
    alternates: {
      canonical: siteUrl,
      languages: {
        'en': 'https://zhaoliang.space/en',
        'zh': siteUrl,
        'x-default': siteUrl,
      },
    },

    // Robots
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },

    // Icons
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon.ico",
      apple: "/apple-icon.png",
    },

    // Verification
    verification: {
      google: "7Lez3KSV0uZxDwvgtJvGuLQH2QNrgU0TkU_dm4cW5I4",
      // yandex: "your-yandex-verification-code",
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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const STORAGE_KEY = "user-preferences";
                  const stored = localStorage.getItem(STORAGE_KEY);
                  let preferences = {};

                  if (stored) {
                    try {
                      preferences = JSON.parse(stored);
                    } catch (e) {
                      console.error("Failed to parse preferences:", e);
                    }
                  }

                  const themeType = preferences.themeType || "original";
                  const colorMode = preferences.colorMode || "light";

                  const root = document.documentElement;

                  // 设置主题类型
                  if (themeType !== "original") {
                    root.setAttribute("data-theme", themeType);
                  }

                  // 设置颜色模式
                  root.setAttribute("data-color-mode", colorMode);

                  // 设置 dark class（为了向后兼容）
                  if (colorMode === "dark") {
                    root.classList.add("dark");
                  }
                } catch (e) {
                  console.error("Failed to apply theme:", e);
                }
              })();
            `,
          }}
        />
        <noscript>
          <style>{`
            /* 默认主题的兜底样式（当 JavaScript 被禁用时） */
            html {
              --background: #ffffff;
              --foreground: #0a0a0a;
            }
          `}</style>
        </noscript>
      </head>
      <body className="font-sans antialiased">
        <GoogleAnalytics gaId="G-CLJ47S8F90" />
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
