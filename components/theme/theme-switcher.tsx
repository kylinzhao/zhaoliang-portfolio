"use client";

import { useState } from "react";
import { useThemeContext } from "@/app/providers";
import { THEME_OPTIONS, type ThemeType } from "@/types/theme";
import { ThemePreview } from "./theme-preview";

export function ThemeSwitcher() {
  const themeContext = useThemeContext();
  const [isOpen, setIsOpen] = useState(false);

  // 防御性编程：确保 context 不为空
  if (!themeContext) {
    return null;
  }

  const { config, setThemeType, setColorMode } = themeContext;

  const handleThemeSelect = (themeType: ThemeType) => {
    setThemeType(themeType);
    setIsOpen(false);
  };

  const handleColorModeToggle = () => {
    setColorMode(config.colorMode === "light" ? "dark" : "light");
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
        aria-label="切换主题"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="m4.93 4.93 1.41 1.41" />
          <path d="m17.66 17.66 1.41 1.41" />
          <path d="M2 12h2" />
          <path d="M20 12h2" />
          <path d="m6.34 17.66-1.41 1.41" />
          <path d="m19.07 4.93-1.41 1.41" />
        </svg>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <div
            className="absolute right-0 top-full z-50 mt-2 w-80 rounded-lg border bg-popover p-4 shadow-lg animate-in fade-in-0 zoom-in-95 slide-in-from-top-2"
            role="dialog"
            aria-modal="true"
          >
            <div className="space-y-4">
              {/* 主题选项 */}
              <div>
                <h3 className="text-sm font-medium mb-3">选择主题风格</h3>
                <div className="grid grid-cols-3 gap-2">
                  {THEME_OPTIONS.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => handleThemeSelect(option.id)}
                      className={`relative flex flex-col items-center gap-2 rounded-lg border p-3 transition-all hover:bg-accent ${
                        config.themeType === option.id
                          ? "border-primary ring-2 ring-primary ring-offset-2"
                          : "border-border"
                      }`}
                    >
                      <ThemePreview
                        themeType={option.id}
                        colorMode={config.colorMode}
                        className="w-full h-16 rounded"
                      />
                      <div className="text-center">
                        <div className="text-xs font-medium">{option.name}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 颜色模式切换 */}
              <div className="border-t pt-4">
                <button
                  onClick={handleColorModeToggle}
                  className="w-full flex items-center justify-between rounded-lg border border-input bg-background p-3 hover:bg-accent transition-colors"
                >
                  <span className="text-sm font-medium">
                    {config.colorMode === "light" ? "浅色模式" : "深色模式"}
                  </span>
                  <div className="flex items-center gap-2">
                    {config.colorMode === "light" ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="4" />
                        <path d="M12 2v2" />
                        <path d="M12 20v2" />
                        <path d="m4.93 4.93 1.41 1.41" />
                        <path d="m17.66 17.66 1.41 1.41" />
                        <path d="M2 12h2" />
                        <path d="M20 12h2" />
                        <path d="m6.34 17.66-1.41 1.41" />
                        <path d="m19.07 4.93-1.41 1.41" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                      </svg>
                    )}
                  </div>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
