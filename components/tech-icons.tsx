import React from "react";

export function TechIcon({ name, className = "w-16 h-16" }: { name: string; className?: string }) {
  // 使用 Simple Icons (simpleicons.org) 的官方 logo
  const iconUrls: Record<string, string> = {
    JavaScript: "https://cdn.simpleicons.org/javascript/F7DF1E",
    "React Native": "https://cdn.simpleicons.org/react/61DAFB",
    "Next.js": "https://cdn.simpleicons.org/nextdotjs/000000",
    "Node.js": "https://cdn.simpleicons.org/nodedotjs/339933",
    Flink: "https://cdn.simpleicons.org/apache/E33531",
    OpenAI: "https://cdn.simpleicons.org/openai/000000",
  };

  // 对于需要特殊处理的图标（多 logo 组合或自定义）
  const genericIcons: Record<string, React.ReactElement> = {
    "iOS & Android": (
      <div className={`flex items-center justify-center gap-1 ${className}`}>
        <img
          src="https://cdn.simpleicons.org/apple/000000"
          alt="Apple"
          className="w-1/2 h-auto"
        />
        <img
          src="https://cdn.simpleicons.org/android/3DDC84"
          alt="Android"
          className="w-1/2 h-auto"
        />
      </div>
    ),
    IoT: (
      <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="2">
        <rect x="4" y="4" width="16" height="16" rx="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="12" cy="12" r="3" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 2v2M12 20v2M2 12h2M20 12h2" strokeLinecap="round"/>
      </svg>
    ),
    Networking: (
      <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="3" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 1v6M12 17v6M4.22 4.22l4.24 4.24M15.54 15.54l4.24 4.24M1 12h6M17 12h6M4.22 19.78l4.24-4.24M15.54 8.46l4.24-4.24" strokeLinecap="round"/>
      </svg>
    ),
  };

  const url = iconUrls[name];

  if (url) {
    return <img src={url} alt={name} className={className} />;
  }

  return genericIcons[name] || genericIcons["iOS & Android"];
}
