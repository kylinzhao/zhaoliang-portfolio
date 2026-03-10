import React from "react";

export function TechIcon({ name, className = "w-16 h-16" }: { name: string; className?: string }) {
  const icons: Record<string, React.ReactElement> = {
    React: (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S12 22 12 22zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z" fill="#61DAFB"/>
        <path d="M12 15.5a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7zm0-2a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" fill="#61DAFB"/>
        <circle cx="12" cy="12" r="1.5" fill="#61DAFB"/>
      </svg>
    ),

    "React Native": (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="#61DAFB"/>
        <path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" fill="#61DAFB"/>
      </svg>
    ),

    Next: (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),

    "Node.js": (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M12 2L2 7v10l10 5 10-5V7L12 2z" stroke="#339933" strokeWidth="2" fill="none"/>
        <text x="12" y="16" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#339933">JS</text>
      </svg>
    ),

    TypeScript: (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        <rect width="20" height="20" x="2" y="2" rx="2" fill="#3178C6"/>
        <text x="12" y="16" textAnchor="middle" fontSize="10" fontWeight="bold" fill="white">TS</text>
      </svg>
    ),

    "Tailwind CSS": (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M12 6c-2 0-3 1-4 2 1 1 2 2 4 2s3-1 4-2c-1-1-2-2-4-2zM4 14c2 0 3 1 4 2-1 1-2 2-4 2s-3-1-4-2c1-1 2-2 4-2zM20 14c-2 0-3 1-4 2 1 1 2 2 4 2s3-1 4-2c-1-1-2-2-4-2z" fill="#06B6D4"/>
      </svg>
    ),

    "数据分析": (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M3 3v18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M18 17V9M13 17V5M8 17v-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),

    Tableau: (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        <rect x="2" y="2" width="9" height="9" rx="1" fill="#E96627"/>
        <rect x="13" y="2" width="9" height="9" rx="1" fill="#5C8DBC"/>
        <rect x="2" y="13" width="9" height="9" rx="1" fill="#EB9125"/>
        <rect x="13" y="13" width="9" height="9" rx="1" fill="#5081A6"/>
      </svg>
    ),

    "6Sigma": (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" fill="none"/>
        <path d="M12 12L16 8M12 12L8 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="12" cy="12" r="2" fill="currentColor"/>
      </svg>
    ),

    SEO: (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" fill="none"/>
        <path d="M21 21l-4.35-4.35M11 8a3 3 0 0 1 0 6 3 3 0 0 1 0-6z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),

    SSR: (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 17l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
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
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M12 2a5 5 0 0 0-5 5v2a5 5 0 0 0 10 0V7a5 5 0 0 0-5-5z" stroke="currentColor" strokeWidth="2" fill="none"/>
        <path d="M12 14c-4 0-7 2-7 5v1h14v-1c0-3-3-5-7-5z" stroke="currentColor" strokeWidth="2" fill="none"/>
        <circle cx="16" cy="6" r="2" fill="currentColor" opacity="0.5"/>
        <path d="M18 8l2 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  };

  return icons[name] || icons["React"];
}
