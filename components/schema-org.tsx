import { getResumeData } from "@/lib/resume";

export async function SchemaOrg() {
  const resume = await getResumeData();
  const baseUrl = "https://zhaoliang.space";

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
    url: baseUrl,
    sameAs: [
      // 未来可以添加社交媒体链接
      // "https://linkedin.com/in/yourprofile",
      // "https://github.com/yourusername",
    ],
    knowsAbout: resume.frontmatter.skills,
    description: resume.content.match(/## 个人简介\n\n([\s\S]+?)(?=\n##|$)/)?.[1].trim(),
  };

  // WebSite Schema
  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${resume.frontmatter.name}的个人网站`,
    url: baseUrl,
    description: personSchema.description,
    author: {
      "@type": "Person",
      name: resume.frontmatter.name,
    },
    publisher: {
      "@type": "Person",
      name: resume.frontmatter.name,
    },
    inLanguage: "zh-CN",
    potentialAction: {
      "@type": "SearchAction",
      target: `${baseUrl}/?q={search_term_string}`,
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
