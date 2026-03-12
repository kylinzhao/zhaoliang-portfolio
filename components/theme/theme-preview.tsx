"use client";

import type { ThemeType } from "@/types/theme";
import { useEffect, useRef } from "react";

interface ThemePreviewProps {
  themeType: ThemeType;
  colorMode: "light" | "dark";
  className?: string;
}

export function ThemePreview({ themeType, colorMode, className }: ThemePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    // 检查是否已经存在 shadow root，如果不存在则创建
    let shadowContainer = container.shadowRoot;
    if (!shadowContainer) {
      shadowContainer = container.attachShadow({ mode: "open" });
    }

    // 清空现有内容
    while (shadowContainer.firstChild) {
      shadowContainer.removeChild(shadowContainer.firstChild);
    }

    // 注入样式
    const style = document.createElement("style");
    style.textContent = getThemeStyles(themeType, colorMode);
    shadowContainer.appendChild(style);

    // 创建预览内容
    const content = document.createElement("div");
    content.className = "theme-preview-content";
    shadowContainer.appendChild(content);

    return () => {
      // 清理 shadow root 的内容
      if (container.shadowRoot) {
        while (container.shadowRoot.firstChild) {
          container.shadowRoot.removeChild(container.shadowRoot.firstChild);
        }
      }
    };
  }, [themeType, colorMode]);

  return <div ref={containerRef} className={className} />;
}

function getThemeStyles(themeType: ThemeType, colorMode: "light" | "dark"): string {
  const themes = {
    original: {
      light: {
        background: "oklch(1 0 0)",
        foreground: "oklch(0.145 0 0)",
        primary: "oklch(0.205 0 0)",
      },
      dark: {
        background: "oklch(0.145 0 0)",
        foreground: "oklch(0.985 0 0)",
        primary: "oklch(0.87 0.00 0)",
      },
    },
    warm: {
      light: {
        background: "oklch(0.98 0.01 60)",
        foreground: "oklch(0.15 0.02 50)",
        primary: "oklch(0.60 0.15 40)",
      },
      dark: {
        background: "oklch(0.18 0.02 50)",
        foreground: "oklch(0.95 0.01 60)",
        primary: "oklch(0.75 0.12 60)",
      },
    },
    noir: {
      light: {
        background: "oklch(1 0 0)",
        foreground: "oklch(0.05 0 0)",
        primary: "oklch(0 0 0)",
      },
      dark: {
        background: "oklch(0.10 0 0)",
        foreground: "oklch(0.95 0 0)",
        primary: "oklch(1 0 0)",
      },
    },
  };

  const theme = themes[themeType][colorMode];

  return `
    .theme-preview-content {
      background-color: ${theme.background};
      color: ${theme.foreground};
      padding: 8px;
      border-radius: 4px;
      height: 100%;
      display: flex;
      flex-direction: column;
      gap: 8px;
      font-size: 10px;
      font-family: system-ui, -apple-system, sans-serif;
    }

    .preview-header {
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .preview-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: ${theme.primary};
    }

    .preview-line {
      height: 6px;
      border-radius: 2px;
      background-color: ${theme.primary};
      opacity: 0.3;
    }

    .preview-line.short {
      width: 60%;
    }

    @supports not (color: oklch(0 0 0)) {
      .theme-preview-content {
        background-color: ${getFallbackColor(themeType, colorMode, "background")};
        color: ${getFallbackColor(themeType, colorMode, "foreground")};
      }

      .preview-dot {
        background-color: ${getFallbackColor(themeType, colorMode, "primary")};
      }

      .preview-line {
        background-color: ${getFallbackColor(themeType, colorMode, "primary")};
      }
    }
  `;
}

function getFallbackColor(
  themeType: ThemeType,
  colorMode: "light" | "dark",
  variant: "background" | "foreground" | "primary"
): string {
  const fallbacks = {
    original: {
      light: { background: "#ffffff", foreground: "#0a0a0a", primary: "#171717" },
      dark: { background: "#0a0a0a", foreground: "#fafafa", primary: "#e4e4e7" },
    },
    warm: {
      light: { background: "#fafaf8", foreground: "#2c2416", primary: "#8b4513" },
      dark: { background: "#2c2416", foreground: "#f5f0e8", primary: "#d4a574" },
    },
    noir: {
      light: { background: "#ffffff", foreground: "#000000", primary: "#000000" },
      dark: { background: "#0a0a0a", foreground: "#f5f5f5", primary: "#ffffff" },
    },
  };

  return fallbacks[themeType][colorMode][variant];
}
