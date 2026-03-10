import React from "react";

export function TechIcon({ name, className = "w-16 h-16" }: { name: string; className?: string }) {
  // 使用 Simple Icons (simpleicons.org) 的官方 logo
  const iconUrls: Record<string, string> = {
    React: "https://cdn.simpleicons.org/react/61DAFB",
    "React Native": "https://cdn.simpleicons.org/react/61DAFB",
    Next: "https://cdn.simpleicons.org/nextdotjs/000000",
    "Node.js": "https://cdn.simpleicons.org/nodedotjs/339933",
    TypeScript: "https://cdn.simpleicons.org/typescript/3178C6",
    "Tailwind CSS": "https://cdn.simpleicons.org/tailwindcss/06B6D4",
    Tableau: "https://cdn.simpleicons.org/tableau/E96627",
  };

  // 对于没有官方 logo 的概念性技能，使用通用图标
  const genericIcons: Record<string, React.ReactElement> = {
    "数据分析": (
      <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="2">
        <path d="M3 3v18h18" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M18 17V9M13 17V5M8 17v-3" strokeLinecap="round"/>
      </svg>
    ),
    "6Sigma": (
      <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="9"/>
        <path d="M12 12L16 8M12 12L8 16" strokeLinecap="round"/>
        <circle cx="12" cy="12" r="2" fill="currentColor"/>
      </svg>
    ),
    SEO: (
      <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="8"/>
        <path d="M21 21l-4.35-4.35M11 8a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" strokeLinecap="round"/>
      </svg>
    ),
    SSR: (
      <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="2">
        <path d="M12 2L2 7l10 5 10-5-10-5z" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 17l10 5 10-5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    Dify: (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        <circle cx="12" cy="8" r="4" fill="#155EEF"/>
        <path d="M4 20c0-4 4-6 8-6s8 2 8 6" stroke="#155EEF" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="18" cy="6" r="2" fill="#155EEF" opacity="0.6"/>
      </svg>
    ),
    Agent: (
      <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="2">
        <path d="M12 2a5 5 0 0 0-5 5v2a5 5 0 0 0 10 0V7a5 5 0 0 0-5-5z"/>
        <path d="M12 14c-4 0-7 2-7 5v1h14v-1c0-3-3-5-7-5z"/>
        <circle cx="16" cy="6" r="2" fill="currentColor" opacity="0.5"/>
        <path d="M18 8l2 2" strokeLinecap="round"/>
      </svg>
    ),
  };

  const url = iconUrls[name];

  if (url) {
    return <img src={url} alt={name} className={className} />;
  }

  return genericIcons[name] || genericIcons["数据分析"];
}
