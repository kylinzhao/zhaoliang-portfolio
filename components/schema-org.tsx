import { getResumeData } from "@/lib/resume";

export async function SchemaOrg({ locale = 'zh' }: { locale?: string }) {
  const resume = await getResumeData(locale);
  const baseUrl = "https://zhaoliang.space";

  const sectionTitle = locale === 'en' ? "About Me" : "个人简介";
  const aboutMatch = resume.content.match(new RegExp(`## ${sectionTitle}\\n\\n([\\s\\S]+?)(?=\\n##|$)`));
  const description = aboutMatch ? aboutMatch[1].trim() : "";

  // Person Schema
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: resume.frontmatter.name,
    jobTitle: resume.frontmatter.title,
    email: resume.frontmatter.email,
    telephone: resume.frontmatter.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: resume.frontmatter.location,
      addressCountry: "CN",
    },
    url: locale === 'en' ? `${baseUrl}/en` : baseUrl,
    sameAs: [
      // 未来可以添加社交媒体链接
      // "https://linkedin.com/in/yourprofile",
      // "https://github.com/yourusername",
    ],
    knowsAbout: resume.frontmatter.skills,
    description,
  };

  // WebSite Schema
  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: locale === 'en' ? `${resume.frontmatter.name}'s Website` : `${resume.frontmatter.name}的个人网站`,
    url: locale === 'en' ? `${baseUrl}/en` : baseUrl,
    description: personSchema.description,
    author: {
      "@type": "Person",
      name: resume.frontmatter.name,
    },
    publisher: {
      "@type": "Person",
      name: resume.frontmatter.name,
    },
    inLanguage: locale === 'en' ? "en-US" : "zh-CN",
    potentialAction: {
      "@type": "SearchAction",
      target: `${locale === 'en' ? baseUrl + '/en' : baseUrl}/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  // Combine all schemas
  const schema = [personSchema, webSiteSchema];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
