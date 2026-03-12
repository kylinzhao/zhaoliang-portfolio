"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ComponentProps, createContext, useContext, useEffect, useState } from "react";
import type { ThemeConfig, ThemeType, ColorMode } from "@/types/theme";
import { DEFAULT_THEME_CONFIG } from "@/types/theme";
import { getCurrentTheme, setTheme, listenToThemeChanges } from "@/lib/theme-manager";

interface ThemeContextValue {
  config: ThemeConfig;
  setThemeType: (themeType: ThemeType) => void;
  setColorMode: (colorMode: ColorMode) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

// 自定义 hook 用于访问多主题系统
export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within ThemeProvider");
  }
  return context;
}

// 兼容性：导出 useTheme 别名指向 next-themes 的 hook
export { useTheme } from "next-themes";

export function ThemeProvider({ children, ...props }: ComponentProps<typeof NextThemesProvider>) {
  const [config, setConfig] = useState<ThemeConfig>(DEFAULT_THEME_CONFIG);
  const [mounted, setMounted] = useState(false);

  // 初始化主题
  useEffect(() => {
    setMounted(true);
    const currentConfig = getCurrentTheme();
    setConfig(currentConfig);
  }, []);

  // 监听跨标签页的主题变更
  useEffect(() => {
    if (!mounted) return;

    const unsubscribe = listenToThemeChanges((newConfig) => {
      setConfig(newConfig);
    });

    return unsubscribe;
  }, [mounted]);

  const setThemeType = (themeType: ThemeType) => {
    const newConfig = { ...config, themeType };
    setConfig(newConfig);
    setTheme({ themeType });
  };

  const setColorMode = (colorMode: ColorMode) => {
    const newConfig = { ...config, colorMode };
    setConfig(newConfig);
    setTheme({ colorMode });
  };

  const contextValue: ThemeContextValue = {
    config,
    setThemeType,
    setColorMode,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      <NextThemesProvider {...props}>{children}</NextThemesProvider>
    </ThemeContext.Provider>
  );
}
